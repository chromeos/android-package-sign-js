/**
 * Copyright 2021 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { ZipWriter } from '../zipfile/ZipWriter';
import { ZipEntry } from '../zipfile/ZipEntry';
import { LocalFileHeader } from '../zipfile/records/LocalFile';

export class AlignedZipWriter extends ZipWriter {
  constructor(outStream: WritableStream, private alignment = 4, comment = '') {
    super(outStream, comment);
  }

  async write(entry: ZipEntry, data: ArrayBuffer): Promise<void> {
    // No need to align compressed files, so we just invoke the default write.
    if (entry.compressedSize !== entry.uncompressedSize) {
      return super.write(entry, data);
    }

    const encoder = new TextEncoder();
    const fileNameLength = encoder.encode(entry.filename).length;
    const extraLength = entry.extra.byteLength;

    // Calculate the offset to the start of the date for this record.
    const offset = this.bytesWritten + LocalFileHeader.BASE_SIZE + fileNameLength + extraLength;

    // Calculate how many bytes we need to pad. Subtracting the alignment from the offset
    // divide by the alignment gives us the number of bytes to offset.
    // Example:
    //   - Alignment = 4 / offset = 15 => 4 - (15 % 4) => 4 - 3 => 1 byte padded.
    //   - Alignment = 4 / offset = 13 => 4 - (13 % 4) => 4 - 1 => 3 bytes padded.
    //
    // However, we need to take the module of that value, so we special case insances where the
    // module is 0, since those would cause padding 4 bytes unnecessarily.
    // Example:
    //  - Alignment = 4 / offset = 16 => 4 - (16 % 4) => 4 - 0 => 4 bytes padded (incorrect).
    //
    // Using the module, this can be rectified:
    //  - padding = 1 => 1 % 4 => 1 (stays the same)
    //  - padding = 2 => 2 % 4 => 2 (stays the same)
    //  - padding = 4 => 4 % 4 => 0 (changes padding to 0)
    //
    const padding = (this.alignment - (offset % this.alignment)) % this.alignment;

    // No padding is required, so we invoke the default write.
    if (padding === 0) {
      return super.write(entry, data);
    }

    // Padding is requird. We extend extra with the size of padding.
    const extraArray = new Uint8Array(entry.extra);
    const newExtraArray = new Uint8Array(entry.extra.byteLength + padding);
    newExtraArray.set(extraArray, 0);
    newExtraArray.fill(extraArray.length, newExtraArray.length);

    // Then, write the data using the new extended extra.
    return super.write(
      {
        ...entry,
        extra: newExtraArray.buffer,
      } as ZipEntry,
      data,
    );
  }
}
