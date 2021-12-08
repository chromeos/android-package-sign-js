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

export class LocalFileHeader {
  static SIGNATURE = 0x04034b50;
  static BASE_SIZE = 30;
  readonly filename: string;

  public constructor(
    readonly signature: number,
    readonly version: number,
    readonly flag: number,
    readonly compressionMethod: number,
    readonly modificationTime: number,
    readonly modificationDate: number,
    readonly crc32: number,
    readonly compressedSize: number,
    readonly uncompressedSize: number,
    readonly rawFilename: ArrayBuffer,
    readonly extra: ArrayBuffer,
  ) {
    const decoder = new TextDecoder();
    this.filename = decoder.decode(rawFilename);
  }

  size(): number {
    return LocalFileHeader.BASE_SIZE + this.rawFilename.byteLength + this.extra.byteLength;
  }

  isCompressed(): boolean {
    return this.compressedSize !== this.uncompressedSize;
  }

  async write(): Promise<ArrayBuffer> {
    const output = new Uint8Array(new ArrayBuffer(this.size()));
    const dataview = new DataView(output.buffer);
    dataview.setUint32(0, this.signature, true);
    dataview.setUint16(4, this.version, true);
    dataview.setUint16(6, this.flag, true);
    dataview.setUint16(8, this.compressionMethod, true);
    dataview.setUint16(10, this.modificationTime, true);
    dataview.setUint16(12, this.modificationDate, true);
    dataview.setUint32(14, this.crc32, true);
    dataview.setUint32(18, this.compressedSize, true);
    dataview.setUint32(22, this.uncompressedSize, true);
    dataview.setUint16(26, this.rawFilename.byteLength, true);
    dataview.setUint16(28, this.extra.byteLength, true);
    output.set(new Uint8Array(this.rawFilename), 30);
    output.set(new Uint8Array(this.extra), 30 + this.rawFilename.byteLength);
    return output.buffer;
  }

  static parse(buffer: DataView, offset: number): LocalFileHeader {
    const signature = buffer.getUint32(offset, true);
    const version = buffer.getUint16(offset + 4, true);
    const flag = buffer.getUint16(offset + 6, true);
    const compressionMethod = buffer.getUint16(offset + 8, true);
    const modificationTime = buffer.getUint16(offset + 10, true);
    const modificationDate = buffer.getUint16(offset + 12, true);
    const crc32 = buffer.getUint32(offset + 14, true);
    const compressedSize = buffer.getUint32(offset + 18, true);
    const uncompressedSize = buffer.getUint32(offset + 22, true);
    const filenameLength = buffer.getUint16(offset + 26, true);
    const extraFieldLength = buffer.getUint16(offset + 28, true);
    offset += LocalFileHeader.BASE_SIZE;

    const fileName = buffer.buffer.slice(offset, offset + filenameLength);
    offset += filenameLength;

    const extra = buffer.buffer.slice(offset, offset + extraFieldLength);

    return new LocalFileHeader(
      signature,
      version,
      flag,
      compressionMethod,
      modificationTime,
      modificationDate,
      crc32,
      compressedSize,
      uncompressedSize,
      fileName,
      extra,
    );
  }
}
