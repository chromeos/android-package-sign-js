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

import { ZipEntry } from '../ZipEntry';

const SIZE = 46;

export class CentralDirectory implements ZipEntry {
  static SIGNATURE = 0x02014b50;
  readonly filename: string;
  readonly comment: string;

  public constructor(
    readonly signature: number,
    readonly versionMadeBy: number,
    readonly versionNeededToExtract: number,
    readonly generalPurposeBitFlag: number,
    readonly compressionMethod: number,
    readonly modificationTime: number,
    readonly modificationDate: number,
    readonly crc32: number,
    readonly compressedSize: number,
    readonly uncompressedSize: number,
    readonly startDiskNumber: number,
    readonly internalFileAttributes: number,
    readonly externalFileAttributes: number,
    readonly offset: number,
    readonly rawFilename: ArrayBuffer,
    readonly extra: ArrayBuffer,
    readonly rawComment: ArrayBuffer,
  ) {
    const decoder = new TextDecoder();
    this.filename = decoder.decode(rawFilename);
    this.comment = decoder.decode(rawComment);
  }

  size(): number {
    return SIZE + this.rawFilename.byteLength + this.extra.byteLength + this.rawComment.byteLength;
  }

  dataOffset(): number {
    return this.offset + this.size();
  }

  async write(): Promise<ArrayBuffer> {
    const buffer = new Uint8Array(new ArrayBuffer(this.size()));
    const dataView = new DataView(buffer.buffer);

    dataView.setUint32(0, this.signature, true);
    dataView.setUint16(4, this.versionMadeBy, true);
    dataView.setUint16(6, this.versionNeededToExtract, true);
    dataView.setUint16(8, this.generalPurposeBitFlag, true);
    dataView.setUint16(10, this.compressionMethod, true);
    dataView.setUint16(12, this.modificationTime, true);
    dataView.setUint16(14, this.modificationDate, true);
    dataView.setUint32(16, this.crc32, true);
    dataView.setUint32(20, this.compressedSize, true);
    dataView.setUint32(24, this.uncompressedSize, true);
    dataView.setUint16(28, this.rawFilename.byteLength, true);
    dataView.setUint16(30, this.extra.byteLength, true);
    dataView.setUint16(32, this.rawComment.byteLength, true);
    dataView.setUint16(34, this.startDiskNumber, true);
    dataView.setUint16(36, this.internalFileAttributes, true);
    dataView.setUint32(38, this.externalFileAttributes, true);
    dataView.setUint32(42, this.offset, true);

    buffer.set(new Uint8Array(this.rawFilename), SIZE);
    buffer.set(new Uint8Array(this.extra), SIZE + this.rawFilename.byteLength);
    buffer.set(
      new Uint8Array(this.rawComment),
      SIZE + this.rawFilename.byteLength + this.extra.byteLength,
    );
    return buffer;
  }

  static parse(buffer: DataView, offset: number): CentralDirectory {
    const signature = buffer.getUint32(offset, true);
    const versionMadeBy = buffer.getUint16(offset + 4, true);
    const versionNeededToExtract = buffer.getUint16(offset + 6, true);
    const generalPurposeBitFlag = buffer.getUint16(offset + 8, true);
    const compressionMethod = buffer.getUint16(offset + 10, true);
    const modificationTime = buffer.getUint16(offset + 12, true);
    const modificationDate = buffer.getUint16(offset + 14, true);
    const crc32 = buffer.getUint32(offset + 16, true);
    const compressedSize = buffer.getUint32(offset + 20, true);
    const uncompressedSize = buffer.getUint32(offset + 24, true);
    const filenameLength = buffer.getUint16(offset + 28, true);
    const extraFieldLength = buffer.getUint16(offset + 30, true);
    const fileCommentLength = buffer.getUint16(offset + 32, true);
    const startDiskNumber = buffer.getUint16(offset + 34, true);
    const internalFileAttributes = buffer.getUint16(offset + 36, true);
    const externalFileAttributes = buffer.getUint32(offset + 38, true);
    const relativeLocalFileHeaderOffset = buffer.getUint32(offset + 42, true);
    offset += SIZE;

    const fileName = buffer.buffer.slice(offset, offset + filenameLength);
    offset += filenameLength;

    const extra = buffer.buffer.slice(offset, offset + extraFieldLength);
    console.log('<<<', extraFieldLength);
    offset += extraFieldLength;

    const comment = buffer.buffer.slice(offset, offset + fileCommentLength);

    return new CentralDirectory(
      signature,
      versionMadeBy,
      versionNeededToExtract,
      generalPurposeBitFlag,
      compressionMethod,
      modificationTime,
      modificationDate,
      crc32,
      compressedSize,
      uncompressedSize,
      startDiskNumber,
      internalFileAttributes,
      externalFileAttributes,
      relativeLocalFileHeaderOffset,
      fileName,
      extra,
      comment,
    );
  }
}
