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

import { BundleEntry } from '../lib/BundleEntry';

describe('BundleFile Suite', () => {
  it('getManifestAttr outputs correctly on sample input', async () => {
    const be = new BundleEntry(
      'base/res/xml/shortcuts.xml',
      'HvvzeWnS/a1/QlGtvHm3OW3CD1Omh/Ov6EN8AWijeeQ=',
    );
    const manifestAttr = be.getManifestAttr();
    const expectedAttr = `Name: base/res/xml/shortcuts.xml\r\nSHA-256-Digest: HvvzeWnS/a1/QlGtvHm3OW3CD1Omh/Ov6EN8AWijeeQ=\r\n\r\n`;
    expect(manifestAttr).toBe(expectedAttr);
  });

  it('getSignatureAttr outputs correctly on sample input', async () => {
    const be = new BundleEntry(
      'base/res/xml/shortcuts.xml',
      'HvvzeWnS/a1/QlGtvHm3OW3CD1Omh/Ov6EN8AWijeeQ=',
    );
    const expectedSig = `Name: base/res/xml/shortcuts.xml\r\nSHA-256-Digest: utb47goAd+I+IrfFqAkQeHcbXRdlNDrxH9K12UB7a6c=\r\n\r\n`;
    expect(await be.getSignatureAttr()).toBe(expectedSig);
  });

  it('long name is wrapped and digested correctly', async () => {
    const be = new BundleEntry(
      'BUNDLE-METADATA/com.android.tools.build.libraries/dependencies.pb',
      '3qDFnie1SoeSWFUuI2OF/W7VdL/csC6FJnd0f89H5yc=',
    );
    const expectedSig = `Name: BUNDLE-METADATA/com.android.tools.build.libraries/dependencies.p\r\n b\r\nSHA-256-Digest: 60A1PdQog5C9cRELjG++kY7jTBhfNaRstuRTtD6KluA=\r\n\r\n`;
    expect(await be.getSignatureAttr()).toBe(expectedSig);
  });
});
