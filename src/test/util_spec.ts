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

import { wrapLongStrings } from '../lib/util';

describe('Util Suite', () => {
  it('short words are not modified', () => {
    const word = wrapLongStrings('sample');
    expect(word).toBe('sample');
  });

  it('wrap no word', () => {
    const word = wrapLongStrings('');
    expect(word).toBe('');
  });

  it('long words are wrapped correctly', () => {
    const input =
      'iamgoingtowriteareallylongstringthatisverylonganditskindofhardtodowowseve' + 'ntycharacters';
    const output = wrapLongStrings(input);
    const expecting =
      'iamgoingtowriteareallylongstringthatisverylonganditskindofhardtodowow' +
      's\r\n eventycharacters';
    expect(output).toBe(expecting);
  });

  it('extradoinarily long words are wrapped correctly', () => {
    const input =
      'iamgoingtowriteareallylongstringthatisverylonganditskindofhardtodowows' +
      'iamgoingtowriteareallylongstringthatisverylonganditskindofhardtodowows' +
      'iamgoingtowriteareallylongstringthatisverylonganditskindofhardtodowows' +
      'iamgoingtowriteareallylongstringthatisverylonganditskindofhardtodowows';
    const output = wrapLongStrings(input);

    const outcome =
      'iamgoingtowriteareallylongstringthatisverylonganditskindofhardtodowows' +
      '\r\n iamgoingtowriteareallylongstringthatisverylonganditskindofhardtodowowsi' +
      '\r\n amgoingtowriteareallylongstringthatisverylonganditskindofhardtodowowsia' +
      '\r\n mgoingtowriteareallylongstringthatisverylonganditskindofhardtodowows';
    expect(output).toBe(outcome);
  });

  it('lines exactly 70 characters long are not wrapped', () => {
    const input = 'Name: base/res/drawable-xhdpi-v4/notify_panel_notification_icon_bg.png';
    const output = wrapLongStrings(input);
    expect(output).toBe(input);
  });
});
