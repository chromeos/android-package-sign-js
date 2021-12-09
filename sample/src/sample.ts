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

import { util } from 'node-forge';
import * as signer from '../../dist/index';
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

let zip: signer.Zip;
let sf: string = '';
let ext = 'aab';

(async () => {
  generateButton.onclick = async function () {
    console.log('generating key...');
    await generateKey(
      (document.getElementById('cn') as HTMLInputElement).value,
      (document.getElementById('on') as HTMLInputElement).value,
      (document.getElementById('ou') as HTMLInputElement).value,
      (document.getElementById('c') as HTMLInputElement).value,
      (document.getElementById('pw') as HTMLInputElement).value,
      document.getElementById('pk12output') as HTMLAnchorElement,
    );
  };

  async function generateKey(
    cn: string,
    on: string,
    ou: string,
    c: string,
    password: string,
    downloadElement: HTMLAnchorElement,
  ) {
    let dname = new signer.DName({
      commonName: cn,
      organizationName: on,
      organizationUnit:ou,
      countryCode: c});
    const base64Der = await signer.generateKey(dname, password);
    downloadElement.href = base64Der;
    downloadElement.download = 'generatedKey.p12';
    downloadElement.innerText = 'Download Generated Key';
  }

  signBundleButton.onclick = async function () {
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
        const p12b64 = fileReader.result.toString().split('base64,')[1];
        const p12der = util.decode64(p12b64);
        const signed = signer.SignString(
          sf,
          p12der,
          (document.getElementById('certpw') as HTMLInputElement).value,
          (document.getElementById('alias') as HTMLInputElement).value,
        );
        zip.addFileToZip(signed, 'META-INF/ANDROID.RSA', true);
        const b64outputzip = await zip.exportZipAsBase64();
        const resultBundle = document.getElementById('signedPackageOutput') as HTMLAnchorElement;
        resultBundle.href = 'data:application/zip;base64,' + b64outputzip;
        resultBundle.download = ext != '' ? 'outputFile.' + ext : 'outputFile.' + 'aab';
        resultBundle.innerText = 'Signed package';
      };
    }
  };

  loadBundleButton.onclick = async function () {
    let fileHandle;
    [fileHandle] = await window.showOpenFilePicker();
    const zipBlob = await fileHandle.getFile();
    ext = zipBlob.name.split('.')[1];
    const creator = '0.1.0 (Android App Signer JS)';
    zip = await signer.Zip.loadAsync(zipBlob);
    const mf = await zip.generateManifest(creator);
    sf = await zip.generateSignatureFile(creator);
    zip.addFileToZip(new Blob([mf]), 'META-INF/MANIFEST.MF');
    zip.addFileToZip(new Blob([sf]), 'META-INF/ANDROID.SF');
    signBundleButton.setAttribute('style', '');
    certpwSpan.setAttribute('style', '');
    aliasSpan.setAttribute('style', '');
  };
})();
