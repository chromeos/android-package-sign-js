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

interface distinguishedName {
  commonName: string,
  organizationName: string,
  organizationUnit: string,
  countryCode: string,
}

/**
 * The distinguished name class for generating an x509 certificate. This class allows users to
 * generate a distinguished name which they can then use as input into the keytool suite to
 * generate their certificates for signing their uploads.
 */
export class DName {
  constructor(
    readonly attr: distinguishedName
  ) {
    this.validateInput(attr.commonName, 1, 0);
    this.validateInput(attr.organizationName, 1, 0);
    this.validateInput(attr.organizationUnit, 1, 0);
    this.validateInput(attr.countryCode, 1, 2);
  }

  /**
   * Performs simple length validation of the inputs to the distinguished name. Throws an error
   * if the input cannot be validated.
   *
   * @param content - The input to be validated.
   * @param minLength - The minimum length of the input to validate
   * @param maxLength - The maximum length of the output to validate (can be 0 for unlimited
   * length).
   */
  private validateInput(content: string, minLength: number, maxLength: number) {
    if (content.length > maxLength && maxLength != 0) {
      throw new Error(`${content} exceeded the maxLength of ${maxLength}`);
    }
    if (content.length < minLength) {
      throw new Error(`${content} needs to be longer than ${minLength}`);
    }
  }
}