# android-package-sign-js

# What is this?

`android-package-sign-js` allows developers to generate signing keys and sign their Android packages (APK and AAB) in a browser.

# To build the package

```
npm ci
npm run build
```

# API

## Package Signer class

Everything is encapsulated in the PackageSigner class. To generate a package signer:

```typescript
const packageSigner = new PackageSigner(password: string, alias: string = 'android');
```

The password is a user generated minimum 6 character password.

## Key Generation

To generate a key, take your package signer and pass it a distinguished name JSON object

### DName

```typescript
export interface DName {
  commonName: string;
  organizationName: string;
  organizationUnit: string;
  countryCode: string;
}
```

### Generate Key

```typescipt
async generateKey(dname: DName): Promise<string>;
```

- The object that is passed to generateKey is a JSON object referencing a [DName](https://knowledge.digicert.com/generalinformation/INFO1745.html) used to identify the certificate owner.
- The password is a string and should be a minimum of six characters long. This will protect your keystore, so the longer the password, the better.
- The response from the `generateKey` function is a base64-encoded der formatted PKCS12 keystore.

## Package Signing

```typescript
async signPackage(
    zipBlob: File,
    base64DerKey: string | undefined = undefined,
    creator: string = `Web Package Signer (${VERSION})`,
  ): Promise<string>;
```

- `signPackage` signs a zip file that is read into the system and returns a base64 encoded zip file which the user can write to disk.
- The base64DerKey can either be used from the previous step or can be read from disk.
- The creator field is optional since by default it uses this package as the creator string.

# Examples

## Key generation

Generate a signing key for your Android app:

```typescript
import { PackageSigner } from 'android-package-sign-js/index';
async function keyGen(): Promise<string> {
  const packageSigner = new PackageSigner(password, alias);
  const base64Der = await packageSigner.generateKey({
      commonName: “Alexander Nohe”,
      organizationName: “Google, Inc”,
      organizationUnit: “DevRel”,
      countryCode: “US”,
    });

  // To download the keys.
  const downloadElement: HTMLAnchorElement = document.querySelector('#key-gen-results');
  downloadElement.href = base64Der;
  downloadElement.download = 'generatedKey.p12';
  downloadElement.innerText = 'Download Generated Key';
}

```

- To save this keystore to a file, download the `base64Der` string contents to a file. In the above example we use an anchor element with a href attribute containing the base64 encoded keystore.

## Bundle Signing

To sign Android App Bundles and APKs with v1 signing can be called like this:

```typescript
import { PackageSigner } from 'android-package-sign-js/index';

function loadStoredKeystore(): string {
  // returns a base64 encoded keystore that was previously loaded
}

async function signBundle(): Promise&lt;string> {
  const packageSigner = new PackageSigner(password, alias);
  let fileHandle;
  [fileHandle] = await window.showOpenFilePicker();
  const zipBlob = await fileHandle.getFile();
  const creator = '0.1.0 (Android App Signer JS)';
  const p12b64Der = loadStoredKeystore();
  await packageSigner.signPackage(zipBlob, p12b64Der, creator);
}

```

- The password is a string and should be a minimum of six characters. This should be the password used to load the already generated keystore.
- The alias references the alias supplied in keystore generation. This identifies the key used.
- Creator is the application creating the signed files (this is an optional parameter). By default we use `0.1.0 (Android App Signer JS)` but this string could be your applications name.
- p12b64Der is a base64 encoded keystore loaded from disk. This value can also be left as unspecified to use the keystore generated previously in `Key Generation` step.

# Sample app

The sample can be found in the `sample/` directory. To use this sample, run the following commands from the root folder:

```
npm ci
npm build
cd sample/
npm ci
npm build
npm serve
```

Then visit localhost:3000/sample.html in your browser to interact with the sample. If generating keys, the key will automatically be reused for package signing.

# Disclaimer

This is not an officially supported Google product.
