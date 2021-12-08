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

import { SHA256ForString } from './digester';
import { wrapLongStrings } from './util';

/**
 * Bundle entry is an entry that can be found in the zipped
 * app bundle.
 */
export class BundleEntry {
  /**
   *
   * @param name - Specifies the filepath relative to the root of the project.
   * @param digest -This is the sha256 digest of the files contents.
   */
  constructor(readonly name: string, readonly digest: string) {
    const tmpName = `Name: ${name}`;
    this.name = wrapLongStrings(tmpName);

    const tmpDigest = `SHA-256-Digest: ${digest}`;
    this.digest = wrapLongStrings(tmpDigest);
  }

  /**
   *
   * @returns The formatted entry of a bundle file in the MANIFEST.MF file.
   */
  getManifestAttr(): string {
    return this.formatEntry(this.name, this.digest);
  }

  /**
   *
   * @returns The formatted entry of a bundle file in the ANDROID.SF file.
   */
  async getSignatureAttr(): Promise<string> {
    const tmpDigest = `SHA-256-Digest: ${await SHA256ForString(this.getManifestAttr())}`;
    const digest = wrapLongStrings(tmpDigest);

    return this.formatEntry(this.name, digest);
  }

  /**
   * This provides the proper formatting for entries listings in their respective files.
   * @param name - The file path relative to the root of the app bundle.
   * @param digest - The sha256 digest of that files contents.
   * @returns a formatted entry according to the jar signing specification.
   */
  private formatEntry(name: string, digest: string): string {
    return `${name}\r\n${digest}\r\n\r\n`;
  }
}
