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

import { SHA256ForString } from '../lib/digester';
// see https://github.com/avajs/ava/blob/main/docs/recipes/typescript.md#for-packages-with-type-module

import { readFileSync } from 'fs';

describe('Digester Suite', () => {
  it('text input sample\n is converted correctly', async () => {
    const output = await SHA256ForString('sample\n');
    expect(output).toBe('qvn/SI4HZ9peodVhGOb2WhbFYzsM78H6CJvTqxgQYT0=');
  });

  it('text from a file is converted correctly', async () => {
    const buf = readFileSync('src/test/data/sample.txt', { encoding: 'utf8' });
    const bufString = buf.toString();

    const output = await SHA256ForString(bufString);
    expect(output).toBe('qvn/SI4HZ9peodVhGOb2WhbFYzsM78H6CJvTqxgQYT0=');
  });

  it('dex from a file is converted correctly', async () => {
    const buf = readFileSync('src/test/data/resources.pb');
    const os = buf.toString('binary');

    const output = await SHA256ForString(os);
    expect(output).toBe('rWkohnRx6izh37EU/gbWa1sz/VKWmmOH1SkdYZ6nVZg=');
  });
});
