etcher-latest-version
=====================

> Utility to determine which is the latest published Etcher version

[![npm version](https://badge.fury.io/js/etcher-latest-version.svg)](http://badge.fury.io/js/etcher-latest-version)
[![dependencies](https://david-dm.org/resin-io-modules/etcher-latest-version.svg)](https://david-dm.org/resin-io-modules/etcher-latest-version.svg)
[![Build Status](https://travis-ci.org/resin-io-modules/etcher-latest-version.svg?branch=master)](https://travis-ci.org/resin-io-modules/etcher-latest-version)

Installation
------------

Install `etcher-latest-version` by running:

```sh
$ npm install --save etcher-latest-version
```

Documentation
-------------

<a name="exp_module_etcher-latest-version--module.exports"></a>

### module.exports(request, callback) ⏏
In order to make this function easily usable in both NodeJS and the browser,
we decouple the latest version finder logic from the function that performs
the HTTP GET request to the bucket URL.

You should pass a `request` function that takes two parameters: the `url` and
a `callback`, and should call the latter with result of making an HTTP GET
request to the passed URL.

For example, if you're using Angular, the request function will look something
like this:

```
const request = (url, callback) => {
  $http.get(url).then((response) => {
    return callback(null, response.data);
  }).catch((error) => {
    return callback(error);
  });
};
```

**Kind**: Exported function  
**Summary**: Get Etcher latest version  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| request | <code>function</code> | HTTP GET request function |
| callback | <code>function</code> | callback (error, latestVersion) |

**Example**  
```js
const request = require('request');
const etcherLatestVersion = require('etcher-latest-version');

etcherLatestVersion((url, callback) => {
  request(url, function(error, response, body) {
    return callback(error, body);
  });
}, (error, latestVersion) => {
  if (error) {
    throw error;
  }

  console.log(`The latest version is: ${latestVersion}`);
});
```

Support
-------

If you're having any problem, please [raise an issue](https://github.com/resin-io-modules/etcher-latest-version/issues/new) on GitHub and the Resin.io team will be happy to help.

Tests
-----

Run the test suite by doing:

```sh
$ npm test
```

Contribute
----------

- Issue Tracker: [github.com/resin-io-modules/etcher-latest-version/issues](https://github.com/resin-io-modules/etcher-latest-version/issues)
- Source Code: [github.com/resin-io-modules/etcher-latest-version](https://github.com/resin-io-modules/etcher-latest-version)

Before submitting a PR, please make sure that you include tests, and that [jshint](http://jshint.com) runs without any warning:

```sh
$ npm run lint
```

License
-------

The project is licensed under the Apache 2.0 license.
