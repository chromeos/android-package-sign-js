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

const SIZE = 22;

export class EndOfCentralDirectory {
  static SIGNATURE = 0x06054b50;
  readonly comment: string;
  public constructor(
    readonly signature: number,
    readonly diskNumber: number,
    readonly centralDirectoryStartDisk: number,
    readonly centralDirectoryRecordsOnDisk: number,
    readonly numberOfCentralDirectoryRecords: number,
    readonly centralDirectorySize: number,
    readonly centralDirectoryOffset: number,
    readonly rawComment: ArrayBuffer,
  ) {
    const decoder = new TextDecoder();
    this.comment = decoder.decode(rawComment);
  }

  size(): number {
    return SIZE + this.rawComment.byteLength;
  }

  async write(): Promise<ArrayBuffer> {
    const buffer = new Uint8Array(new ArrayBuffer(this.size()));
    const dataview = new DataView(buffer.buffer);
    dataview.setUint32(0, this.signature, true);
    dataview.setUint16(4, this.diskNumber, true);
    dataview.setUint16(6, this.centralDirectoryStartDisk, true);
    dataview.setUint16(8, this.centralDirectoryRecordsOnDisk, true);
    dataview.setUint16(10, this.numberOfCentralDirectoryRecords, true);
    dataview.setUint32(12, this.centralDirectorySize, true);
    dataview.setUint32(16, this.centralDirectoryOffset, true);
    dataview.setUint16(20, this.rawComment.byteLength, true);
    buffer.set(new Uint8Array(this.rawComment), SIZE);
    return buffer.buffer;
  }

  static parse(buffer: DataView, offset: number): EndOfCentralDirectory {
    const signature = buffer.getUint32(offset, true);
    const diskNumber = buffer.getUint16(offset + 4, true);
    const centralDirectoryStartDisk = buffer.getUint16(offset + 6, true);
    const centralDirectoryRecordsOnDisk = buffer.getUint16(offset + 8, true);
    const numberOfCentralDirectoryRecords = buffer.getUint16(offset + 10, true);
    const centralDirectorySize = buffer.getUint32(offset + 12, true);
    const centralDirectoryOffset = buffer.getUint32(offset + 16, true);
    const commentLength = buffer.getUint16(offset + 20, true);
    offset += SIZE;

    const comment = buffer.buffer.slice(offset, offset + commentLength);

    return new EndOfCentralDirectory(
      signature,
      diskNumber,
      centralDirectoryStartDisk,
      centralDirectoryRecordsOnDisk,
      numberOfCentralDirectoryRecords,
      centralDirectorySize,
      centralDirectoryOffset,
      comment,
    );
  }
}
