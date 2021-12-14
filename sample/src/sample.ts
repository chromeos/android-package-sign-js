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

import { PackageSigner } from '../../dist/index';
const generateButton: HTMLButtonElement = document.querySelector('#generate') as HTMLButtonElement;
const loadBundleButton: HTMLButtonElement = document.querySelector(
  '#loadBundle',
) as HTMLButtonElement;
const signBundleButton: HTMLButtonElement = document.querySelector(
  '#signBundle',
) as HTMLButtonElement;
const statusVisSpan: HTMLSpanElement = document.querySelector('#status-span') as HTMLSpanElement;
const status: HTMLSpanElement = document.querySelector('#status') as HTMLSpanElement;
const aliasSpan: HTMLSpanElement = document.querySelector('#alias-span') as HTMLSpanElement;
const certpwSpan: HTMLSpanElement = document.querySelector('#certpw-span') as HTMLSpanElement;

let zipBlob: File;
let sf: string = '';
let ext = 'aab';
let packageSigner: PackageSigner;
const creator = '0.1.0 (Android App Signer JS)';
let keySet = false;

(async () => {
  generateButton.onclick = async function () {
    console.log('generating key...');
    await generateKey(
      (document.getElementById('cn') as HTMLInputElement).value,
      (document.getElementById('on') as HTMLInputElement).value,
      (document.getElementById('ou') as HTMLInputElement).value,
      (document.getElementById('c') as HTMLInputElement).value,
      (document.getElementById('pw') as HTMLInputElement).value,
      (document.getElementById('aliasKeyGen') as HTMLInputElement).value,
      document.getElementById('pk12output') as HTMLAnchorElement,
    );
  };

  async function generateKey(
    cn: string,
    on: string,
    ou: string,
    c: string,
    password: string,
    alias: string,
    downloadElement: HTMLAnchorElement,
  ) {
    packageSigner = new PackageSigner(password, alias);
    const base64Der = await packageSigner.generateKey({
      commonName: cn,
      organizationName: on,
      organizationUnit: ou,
      countryCode: c,
    });
    downloadElement.href = base64Der;
    downloadElement.download = 'generatedKey.p12';
    downloadElement.innerText = 'Download Generated Key';
    keySet = true;
  }

  function setOutputZip(zipBase64: string) {
    const resultBundle = document.getElementById('signedPackageOutput') as HTMLAnchorElement;
    resultBundle.href = zipBase64;
    resultBundle.download = ext != '' ? 'outputFile.' + ext : 'outputFile.' + 'aab';
    resultBundle.innerText = 'Signed package';
  }

  signBundleButton.onclick = async function () {
    let p12b64Der = '';
    let b64outputzip = '';
    if (!keySet) {
      let fileHandle;
      [fileHandle] = await window.showOpenFilePicker();
      const fileBlob = await fileHandle.getFile();
      if (fileBlob) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(fileBlob);
        fileReader.onload = async () => {
          if (!fileReader.result) {
            console.log('could not find file');
            return;
          }
          p12b64Der = fileReader.result.toString();
          b64outputzip = await packageSigner.signPackage(zipBlob, p12b64Der, creator);
          setOutputZip(b64outputzip);
        };
      }
      packageSigner = new PackageSigner(
        (document.getElementById('certpw') as HTMLInputElement).value,
        (document.getElementById('alias') as HTMLInputElement).value,
      );
    } else {
      b64outputzip = await packageSigner.signPackage(zipBlob, undefined, creator);
      setOutputZip(b64outputzip);
    }
  };

  loadBundleButton.onclick = async function () {
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    zipBlob = await fileHandle.getFile();
    ext = zipBlob.name.split('.')[1];
    signBundleButton.setAttribute('style', '');
    if (!keySet) {
      certpwSpan.setAttribute('style', '');
      aliasSpan.setAttribute('style', '');
    }
  };
})();
