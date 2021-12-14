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

import { BundleEntry } from './BundleEntry';
import { SHA256ForString } from './digester';
import * as JSZip from 'jszip';
import { SignedFiles } from './SignedFiles';
import { zipalign, ZipFile, AlignedZipWriter } from './zipalign-js/src/index';
import { Buffer } from 'buffer/';

/**
 * A class that allows loading of a zip file to extract the relevant data we need from a zip.
 */
export class Zip {
  private zip: JSZip;
  private entries: BundleEntry[] = [];
  private signedFile: SignedFiles | undefined;
  private previouslySigned: boolean = false;

  /**
   *
   * @param zip - A JSZip object of our project so we can load the zip entries.
   */
  private constructor(zip: JSZip) {
    this.zip = zip;
  }

  /**
   *
   * @returns An array of bundle entries contained within the zip file.
   */
  private async getManifestEntries(): Promise<BundleEntry[]> {
    let files: JSZip.JSZipObject[] = [];
    let entries: BundleEntry[] = [];
    this.zip.forEach((_: string, file: JSZip.JSZipObject) => {
      files.push(file);
    });
    for (let f of files) {
      if (f.name.startsWith('META-INF/MANIFEST.MF')) {
        // These files will be overwritten when we re-sign the package and the
        // overall signature would change. This is why we skip these.
        this.previouslySigned = true;
        continue;
      }
      if (!f.dir) {
        const binaryString = await f.async('binarystring');
        const entry = new BundleEntry(f.name, SHA256ForString(binaryString));
        entries.push(entry);
      }
    }
    return entries;
  }

  /**
   * This statically generates a Zip class so we can analyze the data within the class. This method
   * is the only way to generate a Zip object.
   *
   * @param zipBlob - A zip blob.
   * @returns The Zip class.
   */
  static async loadAsync(zipBlob: Blob): Promise<Zip> {
    const zipFile = await JSZip.loadAsync(zipBlob);
    return new Zip(zipFile);
  }

  /**
   * Generates a signed files class
   *
   * @param creator - Specifies the creator of the signed files.
   * @returns SignedFiles class.
   */
  private async getSignedFiles(creator: string): Promise<SignedFiles> {
    if (!this.signedFile) {
      this.signedFile = new SignedFiles(creator, await this.getEntries());
    }
    return this.signedFile;
  }

  /**
   *
   * @returns An array of bundle entries within the zip.
   */
  private async getEntries(): Promise<BundleEntry[]> {
    // Load the zip file entries if required.
    if (this.entries.length == 0) {
      this.entries = await this.getManifestEntries();
    }
    return this.entries;
  }

  /**
   *
   * @param creator - The entity used to generate the signed files class.
   * @returns The manifest file as a string.
   */
  async generateManifest(creator: string): Promise<string> {
    return (await this.getSignedFiles(creator)).getManifestString();
  }

  /**
   *
   * @param creator - The entity used to generate the signed files class.
   * @returns The signature file as a string.
   */
  async generateSignatureFile(creator: string): Promise<string> {
    return (await this.getSignedFiles(creator)).getSignatureFileOutput();
  }

  /**
   * Adds a file to the zip filewithout any additional decompression and does not generate missing
   * folders.
   *
   * @param fileContents - The file contents to be added to the zip. These contents can either be
   *  base64 encoded string or a blob.
   * @param path - The path to the file contents.
   * @param isbase64 - Specifiying whether the data to be stored is a base 64 encoded string or not
   */
  addFileToZip(fileContents: Blob | string, path: string, isbase64: boolean = false): void {
    // The create folders option needs to be false here as it will create a non-evaluated entry in
    // the app bundle and fail app bundle verification.
    // TODO(@nohe427|@nohe): Add compression here and test.
    this.zip.file(path, fileContents, { createFolders: false, base64: isbase64 });
  }

  /**
   *
   * @returns The zip file as a base64 encoded string for easy downloading.
   */
  async exportZipAsBase64(): Promise<string> {
    const preZipAlign = await this.zip.generateAsync({
      type: 'arraybuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 5 },
    });

    const postZipAlign = await this.alignZip(preZipAlign);
    return Buffer.from(await postZipAlign.arrayBuffer()).toString('base64');
  }

  /**
   * This zip aligns a zip file that is in the form of an arraybuffer. This
   *  zip aligns to the 32 bit page boundary by default.
   * @param zipBuffer - ArrayBuffer representing a zip file
   * @returns a zip Blob.
   */
  private async alignZip(zipBuffer: ArrayBuffer): Promise<Blob> {
    const chunks: Buffer[] = [];
    const outStream = new WritableStream({
      write: (chunk) => {
        chunks.push(chunk);
      },
    });
    const zipFile = await ZipFile.open(zipBuffer);
    const zipWriter = new AlignedZipWriter(outStream);
    await zipalign(zipFile, zipWriter);

    return new Blob(chunks);
  }

  isPreviouslySigned(): boolean {
    return this.previouslySigned;
  }
}
