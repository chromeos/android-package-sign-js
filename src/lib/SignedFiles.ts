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
import { wrapLongStrings } from './util';

/**
 * SignedFiles class creates a manifest file and a signature file according the the jar
 * specifications. Generating this class allows the manifest and signature files to be tightly
 * coupled reducing the amount of differences between the two files.
 */
export class SignedFiles {
  private readonly manifestVersionHeader = 'Manifest-Version: 1.0\r\n';
  private readonly signatureVersionHeader = 'Signature-Version: 1.0\r\n';
  private readonly createdByHeader; //TODO(@nohe427|@nohe) Change to reflect our tool.

  /**
   * This generates a signed files class to hold all of the signed files info required for creating
   * a manifest and signature file.
   *
   * @param creator - The entity creating the files.
   * @param bundleEntries - An array of entries info from the zip file (a file location and a md5
   *  hash of the contents).
   */
  constructor(creator: string, private bundleEntries: BundleEntry[] = []) {
    this.createdByHeader = wrapLongStrings(`Created-By: ${creator}\r\n\r\n`);
  }

  /**
   *
   * @returns The manifest file as a string.
   */
  getManifestString(): string {
    let output = this.getManifestMainAttributes();
    this.bundleEntries.forEach((be: BundleEntry) => {
      output = output.concat(be.getManifestAttr());
    });
    return output;
  }

  /**
   *
   * @returns The header of a manifest file (Version Header + Created By Header).
   */
  getManifestMainAttributes(): string {
    let output = '';
    output = output.concat(this.manifestVersionHeader, this.createdByHeader);
    return output;
  }

  /**
   *
   * @returns A sha256 digest of the manifest file.
   */
  async getManifestDigest(): Promise<string> {
    return await SHA256ForString(this.getManifestString());
  }

  /**
   *
   * @returns A sha256 digest of the main attributes (Version Header + Created by header) of the
   * manifest file
   */
  async getManifestMainAttributesDigest(): Promise<string> {
    return await SHA256ForString(this.getManifestMainAttributes());
  }

  // TODO(nohe): Figure out a way to prevent duplicates. Will do in a later CL.
  /**
   *
   * @param bundleEntry - Adds a bundle entry to the list of existing bundle entries.
   */
  addBundleEntry(bundleEntry: BundleEntry) {
    this.bundleEntries.push(bundleEntry);
  }

  /**
   *
   * @returns The signature file as a string.
   */
  async getSignatureFileOutput(): Promise<string> {
    let output = '';
    const digestManifest = wrapLongStrings(
      `SHA-256-Digest-Manifest: ${await this.getManifestDigest()}`,
    );
    const digestManifestMainAttr = wrapLongStrings(
      `SHA-256-Digest-Manifest-Main-Attributes: ${await this.getManifestMainAttributesDigest()}`,
    );
    output = await output.concat(
      this.signatureVersionHeader,
      digestManifestMainAttr,
      '\r\n',
      digestManifest,
      '\r\n',
      this.createdByHeader,
    );
    for (const bundleEntry of this.bundleEntries) {
      output = output.concat(await bundleEntry.getSignatureAttr());
    }
    return output;
  }
}
