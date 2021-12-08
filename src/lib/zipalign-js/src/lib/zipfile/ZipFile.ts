/**
 * Copyright 2020 Google Inc. All Rights Reserved.
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

import { EndOfCentralDirectory } from './records/EndOfCentralDirectory';
import { CentralDirectory } from './records/CentralDirectory';

export class ZipFile {
  private entryMap: Map<string, number>;

  private constructor(
    readonly comment = '',
    readonly entries: CentralDirectory[],
    readonly offsets: number[],
    private data: DataView,
  ) {
    this.entryMap = new Map();
    for (let i = 0; i < entries.length; i++) {
      this.entryMap.set(entries[i].filename, i);
    }
  }

  public getFileData(filename: string): ArrayBuffer {
    const position = this.entryMap.get(filename)!;
    const zipentry = this.entries[position];
    const encodedName = new TextEncoder().encode(zipentry.filename);

    //TODO(andreban): Read **actual** LocalFile and use that to calculate offset!
    const offset = this.offsets[position] + 30 + encodedName.byteLength;
    return this.data.buffer.slice(offset, offset + zipentry.compressedSize);
  }

  private static seekCentralDirectoryEnd(dataview: DataView): number {
    let offset = dataview.byteLength - 22; // end of central directory is at least 22 bytes long.
    while (offset >= 0) {
      const value = dataview.getUint32(offset, true);
      if (value === EndOfCentralDirectory.SIGNATURE) {
        return offset;
      }
      offset--;
    }
    throw new Error('Could not find end of central directory');
  }

  static async open(buffer: ArrayBuffer): Promise<ZipFile> {
    const dataview = new DataView(buffer);
    const endOfCentralDirectoryOffset = this.seekCentralDirectoryEnd(dataview);
    const endOfCentralDirectory = EndOfCentralDirectory.parse(
      dataview,
      endOfCentralDirectoryOffset,
    );

    let zipRecordOffset = endOfCentralDirectory.centralDirectoryOffset;
    const zipEntries = [];
    const offsets = [];

    for (let i = 0; i < endOfCentralDirectory.centralDirectoryRecordsOnDisk; i++) {
      const zipRecord = CentralDirectory.parse(dataview, zipRecordOffset);
      zipRecordOffset += zipRecord.size();
      offsets.push(zipRecord.offset);
      zipEntries.push(zipRecord);
    }

    return new ZipFile(endOfCentralDirectory.comment, zipEntries, offsets, dataview);
  }
}
