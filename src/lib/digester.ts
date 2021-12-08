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

import { md } from 'node-forge';
import { Buffer } from 'buffer/'; // required to run in the browser

/**
 * SHA256ForString takes content in the form of a string, runs the sha256
 * hashing function over it and returns the base64 encoded version of the
 * binary output from the hash.
 * @param content - The string representation of our content.
 * @returns A promise that resolves to the base64 encoded version of the
 *   hashed binary output.
 */
export function SHA256ForString(content: string): string {
  const sha256 = md.sha256.create();
  sha256.update(content, 'raw');
  const shaBytes = sha256.digest().getBytes();
  return Buffer.from(shaBytes, 'binary').toString('base64');
}
