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

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [
      'browserify',
      'mocha'
    ],
    files: [
      'index.js',
      'test.spec.js'
    ],
    exclude: [],
    preprocessors: {
      '*.js': [
        'browserify'
      ]
    },
    browserify: {
      debug: true
    },
    reporters: [
      'progress'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [
      'PhantomJS'
    ],
    singleRun: true,
    concurrency: Infinity,
    browserNoActivityTimeout: 10000 * 10
  });
};
