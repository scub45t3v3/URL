# TOC
   - [URL](#url)
     - [#VERSION](#url-version)
     - [#PROTOCOL](#url-protocol)
     - [#USER](#url-user)
     - [#DOMAIN](#url-domain)
     - [#PATH](#url-path)
     - [#QUERY](#url-query)
     - [#FRAGMENT](#url-fragment)
     - [#parse](#url-parse)
     - [#stringify](#url-stringify)
     - [#protocol](#url-protocol)
     - [#user](#url-user)
     - [#host](#url-host)
     - [#port](#url-port)
     - [#path](#url-path)
     - [#query](#url-query)
     - [#fragment](#url-fragment)
     - [#authority](#url-authority)
     - [#href](#url-href)
     - [#set](#url-set)
     - [#get](#url-get)
     - [#toString](#url-tostring)
     - [#[Symbol.toStringTag]](#url-symboltostringtag)
<a name=""></a>
 
<a name="url"></a>
# URL
should be a function.

```js
unit
  .function(URL);
```

should return an instance of URL.

```js
unit
  .object(new URL())
  .isInstanceOf(URL)
  .isEnumerable('protocol')
  .isEnumerable('user')
  .isEnumerable('host')
  .isEnumerable('port')
  .isEnumerable('path')
  .isEnumerable('query')
  .isEnumerable('fragment')
  .hasProperty('VERSION', version)
  .hasProperty('PROTOCOL')
  .hasProperty('USER')
  .hasProperty('DOMAIN')
  .hasProperty('PATH')
  .hasProperty('QUERY')
  .hasProperty('FRAGMENT');
```

should return an instaceof URL without the new operator.

```js
unit
  .object(URL())
  .isInstanceOf(URL)
  .isEnumerable('protocol')
  .isEnumerable('user')
  .isEnumerable('host')
  .isEnumerable('port')
  .isEnumerable('path')
  .isEnumerable('query')
  .isEnumerable('fragment')
  .hasProperty('VERSION', version)
  .hasProperty('PROTOCOL')
  .hasProperty('USER')
  .hasProperty('DOMAIN')
  .hasProperty('PATH')
  .hasProperty('QUERY')
  .hasProperty('FRAGMENT');
```

<a name="url-version"></a>
## #VERSION
should be a constant property.

```js
const test = new URL();
unit
  .string(test.VERSION)
  .is(version);
```

<a name="url-protocol"></a>
## #PROTOCOL
should be a constant property.

```js
const test = new URL();
unit
  .regexp(test.PROTOCOL);
```

<a name="url-user"></a>
## #USER
should be a constant property.

```js
const test = new URL();
unit
  .regexp(test.USER);
```

<a name="url-domain"></a>
## #DOMAIN
should be a constant property.

```js
const test = new URL();
unit
  .regexp(test.DOMAIN);
```

<a name="url-path"></a>
## #PATH
should be a constant property.

```js
const test = new URL();
unit
  .regexp(test.PATH);
```

<a name="url-query"></a>
## #QUERY
should be a constant property.

```js
const test = new URL();
unit
  .regexp(test.QUERY);
```

<a name="url-fragment"></a>
## #FRAGMENT
should be a constant property.

```js
const test = new URL();
unit
  .regexp(test.FRAGMENT);
```

<a name="url-parse"></a>
## #parse
should be a static function.

```js
unit
  .function(URL.parse);
```

should return an object hash for valid url strings.

```js
unit
  .object(URL.parse('http://google.com'))
  .hasProperty('protocol', 'http')
  .hasProperty('user')
  .hasProperty('host', 'google.com')
  .hasProperty('port')
  .hasProperty('path')
  .hasProperty('query')
  .hasProperty('fragment')
  .object(URL.parse('ftp://fake@file.store.io:86/private'))
  .hasProperty('protocol', 'ftp')
  .hasProperty('user', 'fake')
  .hasProperty('host', 'file.store.io')
  .hasProperty('port', '86')
  .hasProperty('path', 'private')
  .hasProperty('query')
  .hasProperty('fragment');
```

should return false for invalid url strings.

```js
unit
  .bool(URL.parse())
  .isFalse()
  .bool(URL.parse('this is not a url'))
  .isFalse()
  .bool(URL.parse('/this/is/a/path'))
  .isFalse()
  .bool(URL.parse(/asd/iu))
  .isFalse()
  .bool(URL.parse([1, 2, 3]))
  .isFalse()
  .bool(URL.parse(new Date()))
  .isFalse();
```

<a name="url-stringify"></a>
## #stringify
should be a static function.

```js
unit
  .function(URL.stringify);
```

should accept a url string.

```js
unit
  .string(URL.stringify('http://google.com'))
  .is('http://google.com')
  .string(URL.stringify('HTTPs://apple.com'))
  .is('https://apple.com');
```

should accept an object with defined properties.

```js
unit
  .string(URL.stringify({
    protocol: 'ftp',
    host: 'loopback.io',
    port: 86,
  }))
  .is('ftp://loopback.io:86')
  .string(URL.stringify({
    protocol: 'ssh',
    user: 'john',
    host: '192.168.0.16',
    port: 22,
  }))
  .is('ssh://john@192.168.0.16:22');
```

<a name="url-protocol"></a>
## #protocol
should accept undefined.

```js
const test = new URL();
unit
  .given(test.protocol = undefined)
  .undefined(test.protocol);
```

should accpet null as undefined.

```js
const test = new URL();
unit
  .given(test.protocol = null)
  .undefined(test.protocol);
```

should accept a valid protocol string.

```js
const test = new URL();
unit
  .given(test.protocol = 'http')
  .string(test.protocol)
  .is('http')
  .given(test.protocol = 'ftp')
  .string(test.protocol)
  .is('ftp')
  .given(test.protocol = 'MAIL')
  .string(test.protocol)
  .is('mail');
```

should accept stringifiable arrays that are a single valid element.

```js
const test = new URL();
unit
  .given(test.protocol = ['HtTpS'])
  .string(test.protocol)
  .is('https')
  .given(test.protocol = ['FTP'])
  .string(test.protocol)
  .is('ftp')
  .given(test.protocol = ['file'])
  .string(test.protocol)
  .is('file');
```

should throw an error for a invalid string.

```js
const test = new URL();
unit
  .error(() => {
    test.protocol = 'hello world';
  })
  .error(() => {
    test.protocol = '-i*';
  });
```

should throw an error for a number.

```js
const test = new URL();
unit
  .error(() => {
    test.protocol = 5;
  })
  .error(() => {
    test.protocol = -9;
  })
  .error(() => {
    test.protocol = 0.4;
  })
  .error(() => {
    test.protocol = -6.2;
  });
```

should throw an error for an array with multiple elements.

```js
const test = new URL();
unit
  .error(() => {
    test.protocol = ['http', 's'];
  })
  .error(() => {
    test.protocol = ['ftp', 2];
  })
  .error(() => {
    test.protocol = ['ssh', 'ftp'];
  });
```

should throw an error for an object that stringifies to an invalid protocol.

```js
const test = new URL();
unit
  .error(() => {
    test.protocol = /asd/u;
  })
  .error(() => {
    test.protocol = [1, 2, 3];
  })
  .error(() => {
    test.protocol = new Date();
  })
  .error(() => {
    test.protocol = {
      a: 5,
      toString: () => {
        return '....invalid#$?';
      },
    };
  });
```

<a name="url-user"></a>
## #user
should accept undefined.

```js
const test = new URL();
unit
  .given(test.user = undefined)
  .undefined(test.user);
```

should accpet null as undefined.

```js
const test = new URL();
unit
  .given(test.user = null)
  .undefined(test.user);
```

should accept a valid user string.

```js
const test = new URL();
unit
  .given(test.user = 'user')
  .string(test.user)
  .is('user')
  .given(test.user = 'joe')
  .string(test.user)
  .is('joe')
  .given(test.user = 'jane')
  .string(test.user)
  .is('jane');
```

should accept numbers.

```js
const test = new URL();
unit
  .given(test.user = 5)
  .string(test.user)
  .is('5')
  .given(test.user = 1.2)
  .string(test.user)
  .is('1.2')
  .given(test.user = -6)
  .string(test.user)
  .is('-6')
  .given(test.user = -0.6)
  .string(test.user)
  .is('-0.6');
```

should accept stringifiable array.

```js
const test = new URL();
unit
  .given(test.user = ['user'])
  .string(test.user)
  .is('user')
  .given(test.user = ['joe'])
  .string(test.user)
  .is('joe')
  .given(test.user = ['jane', 'doe'])
  .string(test.user)
  .is('jane,doe');
```

should throw an error for a invalid string.

```js
const test = new URL();
unit
  .error(() => {
    test.user = 'hello world';
  })
  .error(() => {
    test.user = '_i^';
  })
  .error(() => {
    test.user = '@fake';
  });
```

should throw an error for an object that stringifies to an invalid user.

```js
const test = new URL();
unit
  .error(() => {
    test.user = /asd/u;
  })
  .error(() => {
    test.user = new Date();
  })
  .error(() => {
    test.user = {
      a: 5,
      toString: () => {
        return '....invalid#$?';
      },
    };
  });
```

<a name="url-host"></a>
## #host
should accept undefined.

```js
const test = new URL();
unit
  .given(test.host = undefined)
  .undefined(test.host);
```

should accpet null as undefined.

```js
const test = new URL();
unit
  .given(test.host = null)
  .undefined(test.host);
```

should accept a valid dot-atom domain string.

```js
const test = new URL();
unit
  .given(test.host = 'google.com')
  .string(test.host)
  .is('google.com')
  .given(test.host = 'apple.com')
  .string(test.host)
  .is('apple.com')
  .given(test.host = 'fake.io')
  .string(test.host)
  .is('fake.io');
```

should accept a valid ipv4 address string.

```js
const test = new URL();
unit
  .given(test.host = '127.0.0.1')
  .string(test.host)
  .is('127.0.0.1')
  .given(test.host = '87.106.83.127')
  .string(test.host)
  .is('87.106.83.127')
  .given(test.host = '240.89.34.60')
  .string(test.host)
  .is('240.89.34.60');
```

should accept a valid ipv6 address string.

```js
const test = new URL();
unit
  .given(test.host = '::1')
  .string(test.host)
  .is('[::1]')
  .given(test.host = '2001:db8::ff00:42:8329')
  .string(test.host)
  .is('[2001:db8::ff00:42:8329]');
```

should throw an error for numbers.

```js
const test = new URL();
unit
  .error(() => {
    test.host = 5;
  })
  .error(() => {
    test.host = 1.2;
  })
  .error(() => {
    test.host = -4;
  })
  .error(() => {
    test.host = -0.4;
  });
```

should throw an error for arrays.

```js
const test = new URL();
unit
  .error(() => {
    test.host = [1, 'a', '.com'];
  })
  .error(() => {
    test.host = ['apple', '.com'];
  })
  .error(() => {
    test.host = [];
  });
```

should throw an error for a invalid string.

```js
const test = new URL();
unit
  .error(() => {
    test.host = 'hello world';
  })
  .error(() => {
    test.host = '_i^';
  })
  .error(() => {
    test.host = '@fake';
  });
```

should throw an error for an object that stringifies to an invalid host.

```js
const test = new URL();
unit
  .error(() => {
    test.host = /asd/u;
  })
  .error(() => {
    test.host = new Date();
  })
  .error(() => {
    test.host = {
      a: 5,
      toString: () => {
        return '....invalid#$?';
      },
    };
  });
```

<a name="url-port"></a>
## #port
should accept undefined.

```js
const test = new URL();
unit
  .given(test.port = undefined)
  .undefined(test.port);
```

should accpet null as undefined.

```js
const test = new URL();
unit
  .given(test.port = null)
  .undefined(test.port);
```

should accept a valid port string.

```js
const test = new URL();
unit
  .given(test.port = '22')
  .number(test.port)
  .is(22)
  .given(test.port = '80')
  .number(test.port)
  .is(80)
  .given(test.port = '446')
  .number(test.port)
  .is(446);
```

should accept valid integers between 1 and 65535.

```js
const test = new URL();
unit
  .given(test.port = 22)
  .number(test.port)
  .is(22)
  .given(test.port = 80)
  .number(test.port)
  .is(80)
  .given(test.port = 446)
  .number(test.port)
  .is(446);
```

should throw an error for invalid port integers.

```js
const test = new URL();
unit
  .error(() => {
    test.port = 0;
  })
  .error(() => {
    test.port = -8;
  })
  .error(() => {
    test.port = 65536;
  });
```

should throw an error for floats.

```js
const test = new URL();
unit
  .error(() => {
    test.port = 4.2;
  })
  .error(() => {
    test.port = 22.1;
  })
  .error(() => {
    test.port = 80.0000000000001;
  });
```

should throw an error for arrays.

```js
const test = new URL();
unit
  .error(() => {
    test.port = [1, 'a', '.com'];
  })
  .error(() => {
    test.port = ['apple', '.com'];
  })
  .error(() => {
    test.port = [];
  });
```

should throw an error for a invalid string.

```js
const test = new URL();
unit
  .error(() => {
    test.port = 'hello world';
  })
  .error(() => {
    test.port = '_i^';
  })
  .error(() => {
    test.port = '@fake';
  });
```

should throw an error for an object that stringifies to an invalid port.

```js
const test = new URL();
unit
  .error(() => {
    test.port = /asd/u;
  })
  .error(() => {
    test.port = new Date();
  })
  .error(() => {
    test.port = {
      a: 5,
      toString: () => {
        return '....invalid#$?';
      },
    };
  });
```

<a name="url-path"></a>
## #path
should accept undefined.

```js
const test = new URL();
unit
  .given(test.path = undefined)
  .undefined(test.path);
```

should accpet null as undefined.

```js
const test = new URL();
unit
  .given(test.path = null)
  .undefined(test.path);
```

should accept a valid path string.

```js
const test = new URL();
unit
  .given(test.path = '/path/to')
  .string(test.path)
  .is('path/to')
  .given(test.path = '/path/')
  .string(test.path)
  .is('path')
  .given(test.path = '/a/b/c/')
  .string(test.path)
  .is('a/b/c');
```

should accept numbers.

```js
const test = new URL();
unit
  .given(test.path = 5)
  .string(test.path)
  .is('5')
  .given(test.path = -5)
  .string(test.path)
  .is('-5')
  .given(test.path = 5.5)
  .string(test.path)
  .is('5.5')
  .given(test.path = -5.5)
  .string(test.path)
  .is('-5.5');
```

should accept arrays.

```js
const test = new URL();
unit
  .given(test.path = [1, 'a', '.com'])
  .string(test.path)
  .is('1,a,.com')
  .given(test.path = ['apple', '.com'])
  .string(test.path)
  .is('apple,.com')
  .given(test.path = [])
  .undefined(test.path);
```

should throw an error for a invalid string.

```js
const test = new URL();
unit
  .error(() => {
    test.path = 'hello world';
  })
  .error(() => {
    test.path = '_i^';
  })
  .error(() => {
    test.path = '@?fake';
  });
```

should throw an error for an object that stringifies to an invalid path.

```js
const test = new URL();
unit
  .error(() => {
    test.path = new Date();
  })
  .error(() => {
    test.path = {
      a: 5,
      toString: () => {
        return '....invalid#$?';
      },
    };
  });
```

<a name="url-query"></a>
## #query
should accept undefined.

```js
const test = new URL();
unit
  .given(test.query = undefined)
  .undefined(test.query);
```

should accpet null as undefined.

```js
const test = new URL();
unit
  .given(test.query = null)
  .undefined(test.query);
```

should accept a valid query string.

```js
const test = new URL();
unit
  .given(test.query = 'q=1')
  .string(test.query)
  .is('q=1')
  .given(test.query = 'next=5&last=10')
  .string(test.query)
  .is('next=5&last=10')
  .given(test.query = 'news&pp=25&filter=sport&filter=money')
  .string(test.query)
  .is('news&pp=25&filter=sport&filter=money');
```

should accept numbers.

```js
const test = new URL();
unit
  .given(test.query = 5)
  .string(test.query)
  .is('5')
  .given(test.query = 0.5)
  .string(test.query)
  .is('0.5')
  .given(test.query = -5)
  .string(test.query)
  .is('-5')
  .given(test.query = -0.5)
  .string(test.query)
  .is('-0.5');
```

should throw an error for a invalid string.

```js
const test = new URL();
unit
  .error(() => {
    test.query = 'hello world';
  })
  .error(() => {
    test.query = '_i#';
  })
  .error(() => {
    test.query = '@fake%';
  });
```

should throw an error for an object that stringifies to an invalid query.

```js
const test = new URL();
unit
  .error(() => {
    test.query = {};
  })
  .error(() => {
    test.query = new Date();
  })
  .error(() => {
    test.query = {
      a: 5,
      toString: () => {
        return '....invalid#$?';
      },
    };
  });
```

<a name="url-fragment"></a>
## #fragment
should accept undefined.

```js
const test = new URL();
unit
  .given(test.fragment = undefined)
  .undefined(test.fragment);
```

should accpet null as undefined.

```js
const test = new URL();
unit
  .given(test.fragment = null)
  .undefined(test.fragment);
```

should accept a valid fragment string.

```js
const test = new URL();
unit
  .given(test.fragment = 'top')
  .string(test.fragment)
  .is('top')
  .given(test.fragment = 'news')
  .string(test.fragment)
  .is('news')
  .given(test.fragment = '!/spa/route')
  .string(test.fragment)
  .is('!/spa/route');
```

should accept numbers.

```js
const test = new URL();
unit
  .given(test.fragment = 5)
  .string(test.fragment)
  .is('5')
  .given(test.fragment = 0.5)
  .string(test.fragment)
  .is('0.5')
  .given(test.fragment = -5)
  .string(test.fragment)
  .is('-5')
  .given(test.fragment = -0.5)
  .string(test.fragment)
  .is('-0.5');
```

should throw an error for a invalid string.

```js
const test = new URL();
unit
  .error(() => {
    test.fragment = 'hello world';
  })
  .error(() => {
    test.fragment = '_i#';
  })
  .error(() => {
    test.fragment = '@fake%';
  });
```

should throw an error for an object that stringifies to an invalid fragment.

```js
const test = new URL();
unit
  .error(() => {
    test.fragment = {};
  })
  .error(() => {
    test.fragment = new Date();
  })
  .error(() => {
    test.fragment = {
      a: 5,
      toString: () => {
        return '....invalid#$?';
      },
    };
  });
```

<a name="url-authority"></a>
## #authority
should accept undefined.

```js
const test = new URL();
unit
  .given(test.authority = undefined)
  .undefined(test.authority);
```

should accept null as undefined.

```js
const test = new URL();
unit
  .given(test.authority = null)
  .undefined(test.authority);
```

should accept a valid authority string.

```js
const test = new URL();
unit
  .given(test.authority = 'user@host.com:22')
  .string(test.authority)
  .is('user@host.com:22')
  .given(test.authority = 'host.com:22')
  .string(test.authority)
  .is('host.com:22')
  .given(test.authority = 'host.com')
  .string(test.authority)
  .is('host.com');
```

should accept an object hash.

```js
const test = new URL();
const opt = {
  user: 'user',
  host: 'host.com',
  port: 22,
};
unit
  .object(test.authority = opt)
  .hasProperty('user', opt.user)
  .hasProperty('host', opt.host)
  .hasProperty('port', opt.port);
```

should throw an error for numbers.

```js
const test = new URL();
unit
  .error(() => {
    test.authority = 5;
  })
  .error(() => {
    test.authority = 5.5;
  })
  .error(() => {
    test.authority = -5;
  })
  .error(() => {
    test.authority = -5.5;
  });
```

should throw an error for a invalid string.

```js
const test = new URL();
unit
  .error(() => {
    test.authority = 'hello world';
  })
  .error(() => {
    test.authority = '_i#';
  })
  .error(() => {
    test.authority = 'fake@domain';
  });
```

<a name="url-href"></a>
## #href
should be a function.

```js
const test = new URL();
unit
  .function(test.setHref);
```

should accept a url string.

```js
const test = new URL();
unit
  .given(test.href = 'http://domain.com')
  .string(test.href)
  .is('http://domain.com')
  .given(test.href = 'ftp://admin@file.io:86/public')
  .string(test.href)
  .is('ftp://admin@file.io:86/public');
```

should throw an error for numbers.

```js
const test = new URL();
unit
  .error(() => {
    test.href = 5;
  })
  .error(() => {
    test.href = -5;
  })
  .error(() => {
    test.href = 0.5;
  })
  .error(() => {
    test.href = -0.5;
  });
```

should throw an error for invalid strings.

```js
const test = new URL();
unit
  .error(() => {
    test.href = 'http://user';
  })
  .error(() => {
    test.href = 'google.com';
  })
  .error(() => {
    test.href = '555://fake.com';
  });
```

<a name="url-set"></a>
## #set
should be a function.

```js
const test = new URL();
unit
  .function(test.get);
```

should accept an object hash.

```js
const test = new URL();
const opt = {
  protocol: 'http',
  host: 'file.io',
  port: 80,
  path: 'public',
  query: 'upload',
};
unit
  .object(test.set(opt))
  .hasProperty('protocol', opt.protocol)
  .hasProperty('user', opt.user)
  .hasProperty('host', opt.host)
  .hasProperty('port', opt.port)
  .hasProperty('path', opt.path)
  .hasProperty('query', opt.query)
  .hasProperty('fragment', opt.fragment);
```

<a name="url-get"></a>
## #get
should be a function.

```js
const test = new URL();
unit
  .function(test.get);
```

should accept a list of argument names to return an object hash.

```js
const test = new URL('http://user@test.io:8080/path/to?q=1#hash');
unit
  .object(test.get('protocol', 'host'))
  .hasProperty('protocol', 'http')
  .hasProperty('host', 'test.io')
  .object(test.get('a', 'b', 'port'))
  .hasProperty('port', 8080)
  .hasNotProperty('a')
  .hasNotProperty('b');
```

<a name="url-tostring"></a>
## #toString
should be a function.

```js
const test = new URL();
unit
  .function(test.toString);
```

should return an empty string when protocol is not set.

```js
const test = new URL({
  user: 'user',
  host: 'host.com',
  port: 80,
  path: 'path/to',
  query: 'q=1&f=news',
  fragment: 'hash',
});
unit
  .string(test.toString())
  .is('');
```

should return an empty string when host is not set.

```js
const test = new URL({
  protocol: 'http',
  user: 'user',
  port: 80,
  path: 'path/to',
  query: 'q=1&f=news',
  fragment: 'hash',
});
unit
  .string(test.toString())
  .is('');
```

should return a stringified url when all required properties are set.

```js
const test = new URL({
  protocol: 'http',
  host: 'host.com',
});
unit
  .string(test.toString())
  .is('http://host.com')
  .given(test.user = 'user')
  .string(test.toString())
  .is('http://user@host.com')
  .given(test.port = 8080)
  .string(test.toString())
  .is('http://user@host.com:8080')
  .given(test.path = '/path/to/')
  .string(test.toString())
  .is('http://user@host.com:8080/path/to')
  .given(test.query = 'q=1')
  .string(test.toString())
  .is('http://user@host.com:8080/path/to?q=1')
  .given(test.fragment = 'hash')
  .string(test.toString())
  .is('http://user@host.com:8080/path/to?q=1#hash');
```

<a name="url-symboltostringtag"></a>
## #[Symbol.toStringTag]
should return "@scuba-squad/url".

```js
const test = new URL();
unit
  .string(test[Symbol.toStringTag])
  .is('@scuba-squad/url');
```

should return "[object @scuba-squad/url]" for Object.prototype.toString.call.

```js
const test = new URL();
unit
  .string(Object.prototype.toString.call(test))
  .is('[object @scuba-squad/url]');
```

