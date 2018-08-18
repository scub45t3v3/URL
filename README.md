# URL

<a protocol="status"></a>
## Status
[![Build Status](https://travis-ci.org/scub45t3v3/URL.svg?branch=master)](https://travis-ci.org/scub45t3v3/URL)

<a protocol="toc"></a>
## Table of Content
  * [Status](#status)
  * [Purpose](#purpose)
  * [Installation](#installation)
  * [API](#api)
  * [Test](#test)
  * [License](#license)

<a protocol="purpose"></a>
## Purpose
URL class definition

<a protocol="installation"></a>
## Installation
Via [npm](https://www.npmjs.com/)

```bash
npm install @scuba-squad/url
```

<a protocol="api"></a>
## API
### `URL.parse(value: string): URL | false`
**Added in:** v1.0.0

Static method to parse a url string into an object

**arguments:**
1. `value: string`

**returns:** object | false

```javascript
const URL = require('@scuba-squad/url');

let url = URL.parse('http://google.com'); // URL
let nonExistant = URL.parse('not a url'); // false
```

### `URL.stringify(properties: {protocol: string, user: ?string, host: string, port: ?integer, path: ?string, query: ?string, fragment: ?string}): URL | false`
**Added in:** v1.0.0

Static method to stringify a url object

**arguments:**
1. `properties: object`
    - `protocol: string`
    - `user: string | null | undefined`
    - `host: string`
    - `port: integer | null | undefined`
    - `path: string | null | undefined`
    - `query: string | null | undefined`
    - `fragment: string | null | undefined`

**returns:** string

```javascript
const URL = require('@scuba-squad/url');

let url = URL.stringify({protocol: 'http', host: 'host.com'}); // http://host.com
let nonExistant = URL.stringify({host: 'host.com', port: 22}); // ''
```

### `URL(properties: {protocol: ?string, user: ?string, host: ?string, port: ?string path: ?regexp, query: ?string | string[]} = {}): URL`
**Added in:** v1.0.0

URL class constructor

**arguments:**
1. `properties: object = {}`
    - `protocol: string | null | undefined`
    - `user: string | null | undefined`
    - `host: string | null | undefined`
    - `port: string | null | undefined`
    - `path: string | null | undefined`
    - `query: string | null | undefined`

**returns:** URL

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
```

alternatively
* you can create an instance without the new keyword

```javascript
const URL = require('@scuba-squad/url');

let url = URL();
```

#### `URL.VERSION: string`
**Added in:** v1.0.0

Semantic version number of class definition

**returns:** string

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
URL.VERSION; // 1.0.0
```

#### `URL.protocol: string | undefined`
**Added in:** v1.0.0

Property containing the protocol component of the URL

**returns:** string | undefined

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set protocol via setProtocol()
url.protocol = 'http';
// get protocol via getProtocol()
url.protocol; // 'http'
```

#### `URL.getProtocol(): string | undefined`
**Added in:** v1.0.0

Getter method for protocol property

**returns:** string | undefined

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set protocol via setProtocol()
url.protocol = 'http';
// get protocol via getProtocol()
url.getProtocol(); // 'http'
```

#### `URL.setProtocol(value: ?string): URL`
**Added in:** v1.0.0

Setter method for protocol property

**arguments:**
1. `protocol: string | null | undefined`

**returns:** URL

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set protocol via setProtocol()
url.setProtocol('http');
// get protocol via getProtocol()
url.protocol; // 'http'
```

#### `URL.user: string | undefined`
**Added in:** v1.0.0

Property containing the user component of the URL

**returns:** string | undefined

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set user via setUser()
url.user = 'admin';
// get user via getUser()
url.user; // 'admin'
```

#### `URL.getUser(): string | undefined`
**Added in:** v1.0.0

Getter method for user property

**returns:** string | undefined

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set user via setUser()
url.user = 'admin';
// get user via getUser()
url.getUser(); // 'admin'
```

#### `URL.setUser(value: ?string): URL`
**Added in:** v1.0.

Setter method for user property

**arguments:**
1. `value: string | null | undefined`

**returns:** URL

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set user via setUser()
url.setUser('admin');
// get user via getUser()
url.user; // 'admin'
```

#### `URL.host: string | undefined`
**Added in:** v1.0.0

Property containing the host component of the URL

**returns:** string | undefined

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set host via setHost()
url.host = 'host.com';
// get host via getHost()
url.host; // 'host.com'
```

#### `URL.getHost(): string | undefined`
**Added in:** v1.0.0

Getter method for host property

**returns:** string | undefined

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set host via setHost()
url.host = 'host.com';
// get host via getHost()
url.getHost(); // 'host.com'
```

#### `URL.setHost(value: ?string): URL`
**Added in:** v1.0.0

Setter method for host property

**arguments:**
1. `value: string | null | undefined`

**returns:** URL

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set host via setHost()
url.setHost('host.com');
// get host via getHost()
url.host; // 'host.com'
```

#### `URL.port: integer | undefined`
**Added in:** v1.0.0

Property containing the port property of the URL

**returns:** integer | undefined

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set port via setPort()
url.port = 8080;
// get port via getPort()
url.port; // 8080
```

#### `URL.getPort(): integer | undefined`
**Added in:** v1.0.0

Getter method for port property

**returns:** string | undefined

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set port via setPort()
url.port = 8080;
// get port via getPort()
url.getPort(); // 8080
```

#### `URL.setPort(value: ?integer): URL`
**Added in:** v1.0.0

Setter method for port property

**arguments:**
1. `value: integer | null | undefined`

**returns:** URL

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set port via setPort()
url.setPort(8080);
// get port via getPort()
url.port; // 8080
```

#### `URL.authority: string | undefined`
**Added in:** v1.0.0

Property containing the computed authority component of the URL

**returns:** string | undefined

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// get authority via getAuthority()
url.authority; // undefined
// set authority via setAuthority()
url.authority = 'user@host.com:8080';
// get authority via getAuthority()
url.authority; // 'user@host.com:8080'
// get user via getUser()
url.user; // 'user'
// get host via getHost()
url.host; // 'host.com'
// get port via getPort()
url.port; // 8080
```

#### `URL.getAuthority(): string | undefined`
**Added in:** v1.0.0

Getter method for authority property

**returns:** string | undefined

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set authority via setAuthority()
url.authority = 'user@host.com:8080';
url.getAuthority(); // 'user@host.com:8080'
url.getUser(); // 'user'
url.getHost(); // 'host.com'
url.getPort(); // 8080
url.authority = null;
url.getAuthority(); // undefined
url.getUser(); // undefined
url.getHost(); // undefined
url.getPort(); // undefined
```

#### `URL.setAuthority(value: ?string): URL`
**Added in:** v1.0.0

Setter method for authority property

**arguments:**
1. `value: string | null | undefined`

**returns:** URL

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
url.setAuthority('admin@file.io:22');
// get authority via getAuthority()
url.authority; // 'admin@file.io:22'
// get user via getUser()
url.user; // 'admin'
// get host via getHost()
url.host; // 'file.io'
// get port via getPort()
url.port; // 22
```

#### `URL.path: string | undefined`
**Added in:** v1.0.0

Property containing the path component of the URL

**returns:** string | undefined

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set path via setPath()
url.path = '/path/to';
// get path via getPath()
url.path; // '/path/to';
```

#### `URL.getPath(): string | undefined`
**Added in:** v1.0.0

Getter method for path property

**returns:** string | undefined

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set path via setPath()
url.path = '/path/to';
// get path via getPath()
url.getPath(); // '/path/to';
```

#### `URL.setPath(value: ?string): URL`
**Added in:** v1.0.0

Setter method for path property

**arguments:**
1. `value: string | null | undefined`

**returns:** URL

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// set path via setPath()
url.setPath('/path/to');
// get path via getPath()
url.path; // '/path/to';
```

#### `URL.query: string | undefined`
**Added in:** v1.0.0

Property containing the query component of the URL

**returns:** string | undefined

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// get query via getQuery()
url.query; // undefined
// set query via setQuery()
url.query = 'q=1';
// get query via getQuery()
url.query; // 'q=1'
```

#### `URL.getQuery(): string | undefined`
**Added in:** v1.0.0

Getter method for query property

**returns:** string | undefined

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
url.getQuery(); // undefined
// set query via setQuery()
url.query = 'q=1';
url.getQuery(); // 'q=1'
```

#### `URL.setQuery(value: ?string): URL`
**Added in:** v1.0.0

Setter method for query property

**arguments:**
1. `value: string | null | undefined`

**returns:** URL

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
url.setQuery('ln=en-US&f=new&limit=25');
// get query via getQuery()
url.query; // 'ln=en-US&f=new&limit=25'
```

#### `URL.fragment: string | undefined`
**Added in:** v1.0.0

Property containing the fragment component of the URL

**returns:** string | undefined

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
// get fragment via getFragment()
url.fragment; // undefined
// set fragment via setFragment()
url.fragment = 'news';
// get fragment via getFragment()
url.fragment; // 'q=1'
```

#### `URL.getFragment(): string | undefined`
**Added in:** v1.0.0

Getter method for fragment property

**returns:** string | undefined

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
url.getFragment(); // undefined
// set fragment via setFragment()
url.fragment = 'news';
url.getFragment(); // 'q=1'
```

#### `URL.setFragment(value: ?string): URL`
**Added in:** v1.0.0

Setter method for fragment property

**arguments:**
1. `value: string | null | undefined`

**returns:** URL

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
url.setFragment('!/spa/route/id');
// get fragment via getFragment()
url.fragment; // '!/spa/route/id'
```

#### `URL.get(properties: ?...string | string[]): object`
**Added in:** v1.0.0

Method to create an object literal containing the set properties

**arguments:**
1. `value: ...string | string[] | null | undefined`

**returns:** object

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL('http://host.com/path/to?q=1');
url.get('host', 'query'); // {host: 'host.com', query: 'q=1'}
url.get(['host', 'query']); // {host: 'host.com', query: 'a=1'}
url.get('user', ['host', 'query'], 'port'); // {user: undefined, host: 'host.com', query: 'q=1', port: undefined}
```

#### `URL.set(properties: {protocol: ?string, user: ?string, host: ?string, port: ?integer path: ?string, query: ?string, fragment: ?string} = {}): URL`
**Added in:** v1.0.0

Method to bulk set properties on the URL

**arguments:**
1. `properties: object = {}`
    - `protocol: string | null | undefined`
    - `user: string | null | undefined`
    - `host: string | null | undefined`
    - `port: integer | null | undefined`
    - `path: string | null | undefined`
    - `query: string | null | undefined`
    - `fragment: string | null | undefined`

**returns:** URL

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
url.set({protocol: 'http', user: 'admin', host: 'host.com'});
// get protocol via getProtocol()
url.protocol; // 'http'
// get user via getUser()
url.user; // 'admin'
// get host via getHost()
url.host; // 'host.com'
url.set({user: null, path: 'path/to'});
// get user via getUser()
url.user; // undefined
//get path via getPath()
url.path; // 'path/to'
```

#### `URL.toString()`
**Added in:** v1.0.0

Method to return url as a string

**returns:** string

**throws:** TypeError

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
url.toString(); // ''
url
  .setPath('path/to')
  .setQuery('q=1');
url.toString(); // ''
// set protocol and host which are required to produce a valid url string
url.set({protocol: 'http', user: 'admin', host: 'host.com'});
// get string via toString()
'' + url; // 'http://admin@host.com/path/to?q=1'
```

#### `URL[Symbol.toStringTag]: string`
**Added in:** v1.0.0

**returns:** string

```javascript
const URL = require('@scuba-squad/url');

let url = new URL();
url[Symbol.toStringTag]; // '@scuba-squad/url'
Object.prototype.toString.call(url); // '[object @scuba-squad/url]'
```

<a protocol="test"></a>
## Test
[tests](TEST)
```bash
npm install
npm test
```

<a protocol="license"></a>
## License
[MIT](LICENSE)