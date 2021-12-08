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

import { LocalFileHeader } from '../lib/zipalign-js/src/index';

const BASE64_ENCODED_RECORD = 'UEsDBAAAAAAAAAAAAAAOZbXmdF0EAHRdBAAOAAMAcmVzb3VyY2VzLmFyc2MAAAA=';
const textDecoder = new TextDecoder();

describe('LocalFile', () => {
  describe('#parse', () => {
    it('parses a record', async () => {
      const buffer = Uint8Array.from(Buffer.from(BASE64_ENCODED_RECORD, 'base64')).buffer;
      const record = LocalFileHeader.parse(new DataView(buffer), 0);
      expect(record.signature).toEqual(LocalFileHeader.SIGNATURE);
      expect(record.version).toEqual(0);
      expect(record.flag).toEqual(0);
      expect(record.compressionMethod).toEqual(0);
      expect(record.modificationTime).toEqual(0);
      expect(record.modificationDate).toEqual(0);
      expect(record.crc32).toEqual(3870647566);
      expect(record.compressedSize).toEqual(286068);
      expect(record.uncompressedSize).toEqual(286068);
      expect(textDecoder.decode(record.rawFilename)).toEqual('resources.arsc');
      expect(record.extra.byteLength).toEqual(3);
    });
  });
  describe('#write', () => {
    it('writes a record', async () => {
      const buffer = Uint8Array.from(Buffer.from(BASE64_ENCODED_RECORD, 'base64')).buffer;
      const record = LocalFileHeader.parse(new DataView(buffer), 0);
      const result = await record.write();
      expect(Buffer.from(result).toString('base64')).toEqual(BASE64_ENCODED_RECORD);
    });
  });
});
