/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { asn1, md, pkcs12, pkcs7, pki, util, random } from 'node-forge';
import { DName } from './DName';
import { KeyGenerationError } from './Errors';

/**
 * This generates a x509 sigining certificate for code signing. It is the users responsibility to
 * protect this certificate from being lost or stolen as this can prevent future uploads to the App
 * Stores. See {@link https://chromeos.dev/en/publish/pwa-in-play#signing-key | this documentation}
 * for more info. The certificate generated has a lifespan of 25 years as recommended by the
 * Android documentation.
 *
 * @param dname - Distinguished Name
 * @param password - password to protect your key
 * @returns A promise of a base64 encoded pkcs12 der certificate.
 */
export async function generateX509(
  dname: DName,
  password: string,
  alias: string = 'android',
): Promise<string> {
  const keys = await pki.rsa.generateKeyPair({ bits: 2048, workers: 2 });
  let cert = pki.createCertificate();
  cert.serialNumber = generateSerialNumber();
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  // 25 years is the Android recommended amount of time.
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 25);
  const opt = [
    {
      shortName: 'CN',
      value: dname.commonName,
    },
    {
      shortName: 'OU',
      value: dname.organizationUnit,
    },
    {
      shortName: 'O',
      value: dname.organizationName,
    },
    {
      shortName: 'C',
      value: dname.countryCode,
    },
  ];
  cert.setSubject(opt);
  cert.setIssuer(opt);
  cert.publicKey = keys.publicKey;
  cert.privateKey = keys.privateKey;
  const digest = md.sha256.create();
  cert.sign(keys.privateKey, digest);
  const pem = pki.certificateToPem(cert);

  // aes256 algorithm not supported on JDK 8
  const asnResult = pkcs12.toPkcs12Asn1(keys.privateKey, [cert], password, {
    algorithm: 'aes256',
    friendlyName: alias,
    generateLocalKeyId: true,
  });
  const p12der = asn1.toDer(asnResult).getBytes();
  const p12b64 = util.encode64(p12der);
  return 'data:application/x-pkcs12;base64,' + p12b64;
}

/**
 * Generates a serial number conforming to the serial number specification.
 * @returns a hexadecimal serial number no longer than 20 octets
 */
function generateSerialNumber(): string {
  // NOTE: serialNumber is the hex encoded value of an ASN.1 INTEGER.
  // Conforming CAs should ensure serialNumber is:
  // - no more than 20 octets
  // - non-negative (prefix a '00' if your value starts with a '1' bit)
  // RFC Docs regarding certificate serial numbers : https://www.rfc-editor.org/rfc/rfc5280#section-4.1.2.2
  // Below from https://cabforum.org/wp-content/uploads/CA-Browser-Forum-BR-1.8.0.pdf (Section 7.1 Certificate Profile)
  // CAs SHALL generate non‐sequential Certificate serial numbers greater than zero (0)
  // containing at least 64 bits of output from a CSPRNG.
  // Math.random() is not cryptographically secure.
  // Prefer: https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
  // Forge wraps the above api in their random library, so we defer to that.
  // Prevents negative numbers. while staying in the 20 octet range.
  let hexString = '00' + util.bytesToHex(random.getBytesSync(19));
  return hexString;
}

/**
 * This signs the signature file using a certificate stored in a PKCS#12 keystore and returns a pem encoded
 * pkcs7 keystore of the signed file. More infomation can be found in these documents:
 * {@link https://github.com/digitalbazaar/forge#pkcs7|forge library documents} and
 * {@link https://docs.oracle.com/javase/7/docs/technotes/guides/jar/jar.html#:~:text=.RSA%20(PKCS7%20signature%2C%20SHA-256%20%2B%20RSA) | oracle jar signer spec}
 * @param signatureFile - contents of the signature file (a *.SF file)
 * @param keystoreContents - contents of the keystore that is der encoded read from disk.
 * @param password - The password to the keystore.
 * @param alias - The alias if the certificate within the keystore.
 * @returns
 */
export function SignString(
  signatureFile: string,
  keystoreContents: string,
  password: string,
  alias: string,
): string {
  const asn1Cert = asn1.fromDer(keystoreContents);
  const p12 = pkcs12.pkcs12FromAsn1(asn1Cert, password);
  let bag = p12.getBags({ friendlyName: alias, bagType: pki.oids.certBag });
  const cert = getCert(bag.friendlyName);
  bag = p12.getBags({ friendlyName: alias, bagType: pki.oids.pkcs8ShroudedKeyBag });
  const key = getKey(bag.friendlyName);

  var p7 = pkcs7.createSignedData();
  p7.content = util.createBuffer(signatureFile, 'utf8');
  p7.addCertificate(cert);
  p7.addSigner({
    key: key as pki.rsa.PrivateKey,
    certificate: cert,
    digestAlgorithm: pki.oids.sha256,
  });
  p7.sign({ detached: true });
  const asn1file = p7.toAsn1();
  const asn1Bytes = asn1.toDer(asn1file).bytes();
  return util.encode64(asn1Bytes);
}

/**
 * Get cert searches for the certificate wihtin the bags from the pkcs12 keystore.
 *
 * @param bags - An array of pkcs12 keystore bags.
 * @returns The certificate from the pkcs12 keystore bags.
 */
function getCert(bags: pkcs12.Bag[] | undefined): pki.Certificate {
  if (bags) {
    if (bags[0].cert) {
      return bags[0].cert;
    }
  }
  throw new KeyGenerationError('could not locate certificate from pkcs12 keystore');
}

/**
 * Gets the privatekey from the pkcs12 keystore bags.
 *
 * @param bags - An array of pkcs12 keystore bags.
 * @returns The private key from the PKCS12 keystore bags.
 */
function getKey(bags: pkcs12.Bag[] | undefined): pki.PrivateKey {
  if (bags) {
    if (bags[0].key) {
      return bags[0].key;
    }
  }
  throw new KeyGenerationError('could not locate key from pkcs12 keystore');
}
