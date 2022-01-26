/**
 * Copyright 2022 Google LLC
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

const package = require('./package.json');
const {readFileSync, writeFileSync} = require('fs');

let content = readFileSync('./dist/lib/package-signer.js', 'utf-8');
content = content.replace('__REPLACE_ME_BUILD_STEP__', package.version);

writeFileSync('./dist/lib/package-signer.js', content);