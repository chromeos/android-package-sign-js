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

import { validateDName, DName, validateInput } from './DName';
import { formatAlias } from './util';
import { KeyGenerationError, KeyReadingError, ZipError } from './Errors';

const VERSION = '__REPLACE_ME_BUILD_STEP__';

export class PackageSigner {
  #password: string;
  #alias: string;
  #base64DerKey?: string;
  version: string;

  constructor(password: string, readonly alias: string = 'android') {
    validateInput(password, 6, 0);
    this.#password = password;
    this.#alias = alias;
    this.version = VERSION;
  }

  async generateKey(dname: DName): Promise<string> {
    validateDName(dname);
    // Async import
    const { generateX509 } = await import('./keytool');

    this.#base64DerKey = await generateX509(dname, this.#password, this.#alias);
    if (!this.#base64DerKey) {
      throw new KeyGenerationError('Key failed to generate.');
    }
    // Return key here to users can save to device
    return this.#base64DerKey;
  }

  async signPackage(
    zipBlob: File,
    base64DerKey: string | undefined = undefined,
    creator: string = `Web Package Signer (${VERSION})`,
  ): Promise<string> {
    // Check to see if a key was built in a previous step.
    let key = base64DerKey || this.#base64DerKey;
    if (!key) {
      throw new KeyReadingError('no base64 der encoded keystore found');
    }
    key = key.split('base64,')[1];
    // Async import
    const { Zip } = await import('./Zip');
    const zip = await Zip.loadAsync(zipBlob);
    const mf = await zip.generateManifest(creator);
    if (zip.isPreviouslySigned()) {
      throw new ZipError('Package was previously signed. Will not sign new package');
    }
    const sf = await zip.generateSignatureFile(creator);
    const formattedAlias = formatAlias(this.#alias);

    zip.addFileToZip(new Blob([mf]), 'META-INF/MANIFEST.MF');
    zip.addFileToZip(new Blob([sf]), `META-INF/${formattedAlias}.SF`);

    // Async import
    const { util } = await import('node-forge');
    const { SignString } = await import('./keytool');
    const p12der = util.decode64(key);
    const signed = SignString(sf, p12der, this.#password, this.#alias);
    zip.addFileToZip(signed, `META-INF/${formattedAlias}.RSA`, true);
    const b64outputzip = await zip.exportZipAsBase64();
    return 'data:application/zip;base64,' + b64outputzip;
  }
}
