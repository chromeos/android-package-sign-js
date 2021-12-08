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

/**
 * Wraps strings according to the jar file specification. This wraps strings that are longer
 * than 70 characters and indents subsequent strings with one character.
 *
 * @param word - The string that needs to be wrapped.
 * @returns
 */
export function wrapLongStrings(word: string) {
  let wordLength = word.length;
  const lineBreak = '\r\n ';
  let traverseLength = 0;
  if (wordLength == 70) {
    return word;
  }
  if (wordLength > 70) {
    wordLength -= 70;
    traverseLength = 70;
    word = concatString(word, lineBreak, traverseLength);
    traverseLength += 5;
    wordLength -= 69;
  }
  while (wordLength > 69) {
    wordLength -= 69;
    traverseLength += 69;
    word = concatString(word, lineBreak, traverseLength);
    traverseLength += 5;
  }
  return word;
}

/**
 * Helper function that concatenates the string with a substring at certain points in the string.
 *
 * @param word - The string to have a substring concatenated to.
 * @param substring - The substring to add to the existing string.
 * @param insertionPoint - The location from the beginning of the string to insert the substring.
 *  //TODO(nohe): Figure out what to do if insertion point is greater than word.length and document
 *  here.
 * @returns
 */
function concatString(word: string, substring: string, insertionPoint: number): string {
  //TODO(@nohe427|@nohe) Add a check to make sure the insertion point is not longer than the string.
  const beginningPhrase = word.substr(0, insertionPoint);
  const endPhrase = word.substr(insertionPoint, word.length);
  return beginningPhrase.concat(substring, endPhrase);
}

/**
 * Formats the alias for writing to the zip file.
 *
 * @param alias - The alias that we want to format to the specification.
 * @returns The formatted alias.
 */
export function formatAlias(alias: string): string {
  let returnAlias = alias;
  if (alias.length > 8) {
    returnAlias = alias.substr(0, 8);
  }
  return returnAlias.toUpperCase()
}