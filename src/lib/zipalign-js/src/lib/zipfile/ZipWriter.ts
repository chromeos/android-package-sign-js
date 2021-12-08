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

import { LocalFileHeader } from './records/LocalFile';
import { ZipEntry } from './ZipEntry';
import { CentralDirectory } from './records/CentralDirectory';
import { EndOfCentralDirectory } from './records/EndOfCentralDirectory';
import { Buffer } from 'buffer/'; // required to run in the browser

export class ZipWriter {
  protected finished = false;
  protected entries: CentralDirectory[] = [];
  protected writableStream: WritableStream;
  protected writer: WritableStreamDefaultWriter;
  protected bytesWritten = 0;

  constructor(outStream: WritableStream, protected comment = '') {
    this.writableStream = outStream;
    this.writer = this.writableStream.getWriter();
  }

  private async writeData(buffer: ArrayBuffer): Promise<void> {
    await this.writer.ready;
    await this.writer.write(buffer);
  }

  private async closeWriter(): Promise<void> {
    await this.writer.ready;
    await this.writer.close();
  }

  async write(entry: ZipEntry, data: ArrayBuffer): Promise<void> {
    if (this.finished) {
      throw new Error('Cannot write records after finish() was called');
    }

    const startoffset = this.bytesWritten;
    const encoder = new TextEncoder();
    const localFileHeader = new LocalFileHeader(
      LocalFileHeader.SIGNATURE,
      entry.versionNeededToExtract,
      entry.generalPurposeBitFlag,
      entry.compressionMethod,
      entry.modificationTime,
      entry.modificationDate,
      entry.crc32,
      entry.compressedSize,
      entry.uncompressedSize,
      encoder.encode(entry.filename),
      entry.extra,
    );

    await this.writer.ready;
    await this.writer.write(await localFileHeader.write());
    this.bytesWritten += localFileHeader.size();

    this.entries.push(
      new CentralDirectory(
        CentralDirectory.SIGNATURE,
        63, // versionMadeBy
        entry.versionNeededToExtract,
        entry.generalPurposeBitFlag,
        entry.compressionMethod,
        entry.modificationTime,
        entry.modificationDate,
        entry.crc32,
        entry.compressedSize,
        entry.uncompressedSize,
        0, // startDiskNumber
        0, // internalFileAttributes
        32, // externalFileAttributes
        startoffset,
        encoder.encode(entry.filename),
        entry.extra,
        encoder.encode(entry.comment),
      ),
    );

    await this.writeData(data);
    this.bytesWritten += data.byteLength;
  }

  async finish(): Promise<void> {
    if (this.finished) {
      throw new Error('finish() has already been called');
    }

    const centralDirectoryStart = this.bytesWritten;
    for (const entry of this.entries) {
      await this.writeData(await entry.write());
      this.bytesWritten += entry.size();
    }

    const centralDirectorySize = this.bytesWritten - centralDirectoryStart;
    const endOfCentryDirectory = new EndOfCentralDirectory(
      EndOfCentralDirectory.SIGNATURE,
      0, // diskNumber
      0, // startDisk,
      this.entries.length,
      this.entries.length,
      centralDirectorySize,
      centralDirectoryStart,
      new TextEncoder().encode(this.comment),
    );

    await this.writeData(Buffer.from(await endOfCentryDirectory.write()));
    await this.closeWriter();
    this.finished = true;
  }
}
