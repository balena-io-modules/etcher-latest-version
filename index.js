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

/**
 * @module etcher-latest-version
 */

var semver = require('semver');
var xml = require('xml2js');
var BUCKET_URL = 'https://resin-production-downloads.s3.amazonaws.com';
var NUMBER_OF_PACKAGES = 6;

/**
 * @summary Get Etcher latest version
 * @function
 * @public
 *
 * @description
 * In order to make this function easily usable in both NodeJS and the browser,
 * we decouple the latest version finder logic from the function that performs
 * the HTTP GET request to the bucket URL.
 *
 * You should pass a `request` function that takes two parameters: the `url` and
 * a `callback`, and should call the latter with result of making an HTTP GET
 * request to the passed URL.
 *
 * For example, if you're using Angular, the request function will look something
 * like this:
 *
 * ```
 * const request = (url, callback) => {
 *   $http.get(url).then((response) => {
 *     return callback(null, response.data);
 *   }).catch((error) => {
 *     return callback(error);
 *   });
 * };
 * ```
 *
 * @param {Function} request - HTTP GET request function
 * @param {Function} callback - callback (error, latestVersion)
 *
 * @example
 * const request = require('request');
 * const etcherLatestVersion = require('etcher-latest-version');
 *
 * etcherLatestVersion((url, callback) => {
 *   request(url, function(error, response, body) {
 *     return callback(error, body);
 *   });
 * }, (error, latestVersion) => {
 *   if (error) {
 *     throw error;
 *   }
 *
 *   console.log(`The latest version is: ${latestVersion}`);
 * });
 */
module.exports = function(request, callback) {
  request(BUCKET_URL, function(error, response) {
    if (error) {
      return callback(error);
    }

    xml.parseString(response, function(error, result) {
      if (error) {
        return callback(error);
      }

      var bucketEntries = result.ListBucketResult.Contents;

      return callback(null, bucketEntries.reduce(function(accumulator, entry) {
        var version = entry.Key[0].split('/')[1];
        accumulator[version] = accumulator[version] || 0;
        accumulator[version] += 1;

        if (accumulator[version] >= NUMBER_OF_PACKAGES &&
            semver.gt(version, accumulator.latest)) {
          accumulator.latest = version;
        }

        return accumulator;
      }, {

        // This is a good accumulator default value since
        // every version is semantically greater than this.
        latest: '0.0.0'

      }).latest);

    });
  });
};
