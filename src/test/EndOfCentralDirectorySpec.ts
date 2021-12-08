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

import { EndOfCentralDirectory } from '../lib/zipalign-js/src/index';

const BASE64_ENCODED_RECORD = 'UEsFBgAAAACyAbIByqsAAGiwDwAAAA==';
const textDecoder = new TextDecoder();

describe('EndOfCentralDirectory', () => {
  describe('#parse', () => {
    it('parses the EndOfCentralDirectory record', async () => {
      const buffer = Uint8Array.from(Buffer.from(BASE64_ENCODED_RECORD, 'base64')).buffer;
      const record = EndOfCentralDirectory.parse(new DataView(buffer), 0);
      expect(record.signature).toEqual(EndOfCentralDirectory.SIGNATURE);
      expect(record.diskNumber).toEqual(0);
      expect(record.centralDirectoryStartDisk).toEqual(0);
      expect(record.centralDirectoryRecordsOnDisk).toEqual(434);
      expect(record.numberOfCentralDirectoryRecords).toEqual(434);
      expect(record.centralDirectorySize).toEqual(43978);
      expect(record.centralDirectoryOffset).toEqual(1028200);
      expect(textDecoder.decode(record.rawComment)).toEqual('');
      expect(record.comment).toEqual('');
    });
  });

  describe('#write', () => {
    it('writes EndOfCentralDirectory record', async () => {
      const buffer = Uint8Array.from(Buffer.from(BASE64_ENCODED_RECORD, 'base64')).buffer;
      const record = EndOfCentralDirectory.parse(new DataView(buffer), 0);
      const result = await record.write();
      expect(Buffer.from(result).toString('base64')).toEqual(BASE64_ENCODED_RECORD);
    });
  });
});
