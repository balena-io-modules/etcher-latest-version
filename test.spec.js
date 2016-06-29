/*
 * Copyright 2016 Resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var m = require('mochainon');
var etcherLatestVersion = require('./index');

function test(message, xml, expected) {

  describe(message, function() {

    beforeEach(function() {
      this.request = function(url, callback) {
        return callback(null, xml);
      };
    });

    it('should resolve the latest fully available version', function(done) {
      etcherLatestVersion(this.request, function(error, version) {
        m.chai.expect(error).to.not.exist;
        m.chai.expect(version).to.equal(expected);
        done();
      });
    });

  });

}

describe('EtcherLatestVersion', function() {

  test('given many available versions', '\
    <ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">\
      <Name>resin-production-downloads</Name>\
      <Prefix/>\
      <Marker/>\
      <MaxKeys>1000</MaxKeys>\
      <IsTruncated>false</IsTruncated>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-darwin-x64.dmg</Key>\
        <LastModified>2016-03-10T17:34:21.000Z</LastModified>\
        <ETag>"5a715255aa25686688bf1e23bc1d3fc6"</ETag>\
        <Size>46109720</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-darwin-x64.zip</Key>\
        <LastModified>2016-04-08T20:12:03.000Z</LastModified>\
        <ETag>"cc1d6d9d53385e3edd099416fcd894c1"</ETag>\
        <Size>47071474</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-linux-x64.AppImage</Key>\
        <LastModified>2016-04-08T19:03:18.000Z</LastModified>\
        <ETag>"5f1849f7781197ce2ee6129c16bcd498"</ETag>\
        <Size>48650090</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-linux-x86.AppImage</Key>\
        <LastModified>2016-04-08T19:03:18.000Z</LastModified>\
        <ETag>"5f1849f7781197ce2ee6129c16bcd498"</ETag>\
        <Size>48650090</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-win32-x64.exe</Key>\
        <LastModified>2016-04-18T01:32:09.000Z</LastModified>\
        <ETag>"c173895886f44d115c66e7206ce3dff8"</ETag>\
        <Size>50585335</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-win32-x86.exe</Key>\
        <LastModified>2016-04-18T01:32:09.000Z</LastModified>\
        <ETag>"c173895886f44d115c66e7206ce3dff8"</ETag>\
        <Size>50585335</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.1/Etcher-darwin-x64.dmg</Key>\
        <LastModified>2016-03-10T17:34:21.000Z</LastModified>\
        <ETag>"5a715255aa25686688bf1e23bc1d3fc6"</ETag>\
        <Size>46109720</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.1/Etcher-darwin-x64.zip</Key>\
        <LastModified>2016-04-08T20:12:03.000Z</LastModified>\
        <ETag>"cc1d6d9d53385e3edd099416fcd894c1"</ETag>\
        <Size>47071474</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.1/Etcher-linux-x64.AppImage</Key>\
        <LastModified>2016-04-08T19:03:18.000Z</LastModified>\
        <ETag>"5f1849f7781197ce2ee6129c16bcd498"</ETag>\
        <Size>48650090</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.1/Etcher-linux-x86.AppImage</Key>\
        <LastModified>2016-04-08T19:03:18.000Z</LastModified>\
        <ETag>"5f1849f7781197ce2ee6129c16bcd498"</ETag>\
        <Size>48650090</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.1/Etcher-win32-x64.exe</Key>\
        <LastModified>2016-04-18T01:32:09.000Z</LastModified>\
        <ETag>"c173895886f44d115c66e7206ce3dff8"</ETag>\
        <Size>50585335</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.1/Etcher-win32-x86.exe</Key>\
        <LastModified>2016-04-18T01:32:09.000Z</LastModified>\
        <ETag>"c173895886f44d115c66e7206ce3dff8"</ETag>\
        <Size>50585335</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
    </ListBucketResult>\
  ', '1.0.0-beta.1');

  test('given a version being uploaded at the moment', '\
    <ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">\
      <Name>resin-production-downloads</Name>\
      <Prefix/>\
      <Marker/>\
      <MaxKeys>1000</MaxKeys>\
      <IsTruncated>false</IsTruncated>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-darwin-x64.dmg</Key>\
        <LastModified>2016-03-10T17:34:21.000Z</LastModified>\
        <ETag>"5a715255aa25686688bf1e23bc1d3fc6"</ETag>\
        <Size>46109720</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-darwin-x64.zip</Key>\
        <LastModified>2016-04-08T20:12:03.000Z</LastModified>\
        <ETag>"cc1d6d9d53385e3edd099416fcd894c1"</ETag>\
        <Size>47071474</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-linux-x64.AppImage</Key>\
        <LastModified>2016-04-08T19:03:18.000Z</LastModified>\
        <ETag>"5f1849f7781197ce2ee6129c16bcd498"</ETag>\
        <Size>48650090</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-linux-x86.AppImage</Key>\
        <LastModified>2016-04-08T19:03:18.000Z</LastModified>\
        <ETag>"5f1849f7781197ce2ee6129c16bcd498"</ETag>\
        <Size>48650090</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-win32-x64.exe</Key>\
        <LastModified>2016-04-18T01:32:09.000Z</LastModified>\
        <ETag>"c173895886f44d115c66e7206ce3dff8"</ETag>\
        <Size>50585335</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.0/Etcher-win32-x86.exe</Key>\
        <LastModified>2016-04-18T01:32:09.000Z</LastModified>\
        <ETag>"c173895886f44d115c66e7206ce3dff8"</ETag>\
        <Size>50585335</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.1/Etcher-darwin-x64.dmg</Key>\
        <LastModified>2016-03-10T17:34:21.000Z</LastModified>\
        <ETag>"5a715255aa25686688bf1e23bc1d3fc6"</ETag>\
        <Size>46109720</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.1/Etcher-darwin-x64.zip</Key>\
        <LastModified>2016-04-08T20:12:03.000Z</LastModified>\
        <ETag>"cc1d6d9d53385e3edd099416fcd894c1"</ETag>\
        <Size>47071474</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.1/Etcher-linux-x64.AppImage</Key>\
        <LastModified>2016-04-08T19:03:18.000Z</LastModified>\
        <ETag>"5f1849f7781197ce2ee6129c16bcd498"</ETag>\
        <Size>48650090</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.1/Etcher-linux-x86.AppImage</Key>\
        <LastModified>2016-04-08T19:03:18.000Z</LastModified>\
        <ETag>"5f1849f7781197ce2ee6129c16bcd498"</ETag>\
        <Size>48650090</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
      <Contents>\
        <Key>etcher/1.0.0-beta.1/Etcher-win32-x64.exe</Key>\
        <LastModified>2016-04-18T01:32:09.000Z</LastModified>\
        <ETag>"c173895886f44d115c66e7206ce3dff8"</ETag>\
        <Size>50585335</Size>\
        <StorageClass>STANDARD</StorageClass>\
      </Contents>\
    </ListBucketResult>\
  ', '1.0.0-beta.0');

});
