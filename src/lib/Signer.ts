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

 import { util } from "node-forge";
 import { SignString, Zip } from "..";
 
 async function SignPackage(zipBlob:File, password:string, b64DerKeystore: string, creator:string, alias: string): Promise<string> {
     const zip = await Zip.loadAsync(zipBlob);
     const mf = await zip.generateManifest(creator);
     const sf = await zip.generateSignatureFile(creator);
     zip.addFileToZip(new Blob([mf]), 'META-INF/MANIFEST.MF');
     zip.addFileToZip(new Blob([sf]), 'META-INF/ANDROID.SF');
     
     const p12der = util.decode64(b64DerKeystore);
     const signed = SignString(
         sf,
         p12der,
         password,
         alias,
       );
     zip.addFileToZip(signed, 'META-INF/ANDROID.RSA', true);
     const b64outputzip = await zip.exportZipAsBase64();
     return 'data:application/zip;base64,' + b64outputzip;
 }