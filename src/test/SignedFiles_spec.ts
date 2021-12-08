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

import { SignedFiles } from '../lib/SignedFiles';

import { BundleEntry } from '../lib/BundleEntry';

describe('Signed Files Suite', () => {
  it('validate empty signed files', async () => {
    const sf: SignedFiles = new SignedFiles('11.0.12 (Debian)');
    expect(sf.getManifestString()).toBe(
      'Manifest-Version: 1.0\r\nCreated-By: 11.0.12 (Debian)\r\n\r\n',
    );
  });

  it('one entry is formatted correctly', async () => {
    const be = new BundleEntry('sample.txt', 'qvn/SI4HZ9peodVhGOb2WhbFYzsM78H6CJvTqxgQYT0=');
    const sf: SignedFiles = new SignedFiles('11.0.12 (Debian)', [be]);
    expect(sf.getManifestString()).toBe(
      'Manifest-Version: 1.0\r\n' +
        'Created-By: 11.0.12 (Debian)\r\n\r\n' +
        'Name: sample.txt\r\n' +
        'SHA-256-Digest: qvn/SI4HZ9peodVhGOb2WhbFYzsM78H6CJvTqxgQYT0=\r\n\r\n',
    );
  });

  it('digesting a manifest file woks correctly', async () => {
    const be = new BundleEntry('sample.txt', 'qvn/SI4HZ9peodVhGOb2WhbFYzsM78H6CJvTqxgQYT0=');
    const sf: SignedFiles = new SignedFiles('11.0.12 (Debian)', [be]);
    const output = await sf.getManifestDigest();
    expect(output).toBe('hfsRcC3tjbOeo30cGSZVna9CKZeBsP5QidoEV3ETY98=');
  });

  it('manifest main attributes digested correctly', async () => {
    const be = new BundleEntry('sample.txt', 'qvn/SI4HZ9peodVhGOb2WhbFYzsM78H6CJvTqxgQYT0=');
    const sf: SignedFiles = new SignedFiles('11.0.12 (Debian)', [be]);
    const output = await sf.getManifestMainAttributesDigest();
    expect(output).toBe('/qCeIa4soW+ffKjq41Db9jkz4KnXj9XsSa47FCNzMzA=');
  });

  it('signature file output is formatted correctly', async () => {
    const be = new BundleEntry('sample.txt', 'qvn/SI4HZ9peodVhGOb2WhbFYzsM78H6CJvTqxgQYT0=');
    const sf: SignedFiles = new SignedFiles('11.0.12 (Debian)', [be]);
    const output = await sf.getSignatureFileOutput();
    expect(output).toBe(
      'Signature-Version: 1.0\r\n' +
        'SHA-256-Digest-Manifest-Main-Attributes: /qCeIa4soW+ffKjq41Db9jkz4KnXj\r\n' +
        ' 9XsSa47FCNzMzA=\r\n' +
        'SHA-256-Digest-Manifest: hfsRcC3tjbOeo30cGSZVna9CKZeBsP5QidoEV3ETY98=\r\n' +
        'Created-By: 11.0.12 (Debian)\r\n\r\n' +
        'Name: sample.txt\r\n' +
        'SHA-256-Digest: Szh7Pyojbg9KhZ/JekisUfrICHhI5gsTW4zzxrrRDa4=\r\n\r\n',
    );
  });
});
