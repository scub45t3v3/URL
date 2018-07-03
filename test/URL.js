(function() {
  var URL, unit, version;

  unit = require('unit.js');

  URL = require('../URL');

  ({version} = require('../package'));

  describe('URL', function() {
    it('should be a function', function() {
      unit.function(URL);
      return null;
    });
    it('should return an instance of URL', function() {
      unit.object(new URL()).isInstanceOf(URL).isEnumerable('protocol').isEnumerable('user').isEnumerable('host').isEnumerable('port').isEnumerable('path').isEnumerable('query').isEnumerable('fragment').hasProperty('VERSION', version).hasProperty('PROTOCOL').hasProperty('USER').hasProperty('DOMAIN').hasProperty('PATH').hasProperty('QUERY').hasProperty('FRAGMENT');
      return null;
    });
    it('should return an instaceof URL without the new operator', function() {
      unit.object(URL()).isInstanceOf(URL).isEnumerable('protocol').isEnumerable('user').isEnumerable('host').isEnumerable('port').isEnumerable('path').isEnumerable('query').isEnumerable('fragment').hasProperty('VERSION', version).hasProperty('PROTOCOL').hasProperty('USER').hasProperty('DOMAIN').hasProperty('PATH').hasProperty('QUERY').hasProperty('FRAGMENT');
      return null;
    });
    describe('#VERSION', function() {
      return it('should be a constant property', function() {
        var test;
        test = new URL();
        unit.string(test.VERSION).is(version);
        return null;
      });
    });
    describe('#PROTOCOL', function() {
      return it('should be a constant property', function() {
        var test;
        test = new URL();
        unit.regexp(test.PROTOCOL);
        return null;
      });
    });
    describe('#USER', function() {
      return it('should be a constant property', function() {
        var test;
        test = new URL();
        unit.regexp(test.USER);
        return null;
      });
    });
    describe('#DOMAIN', function() {
      return it('should be a constant property', function() {
        var test;
        test = new URL();
        unit.regexp(test.DOMAIN);
        return null;
      });
    });
    describe('#PATH', function() {
      return it('should be a constant property', function() {
        var test;
        test = new URL();
        unit.regexp(test.PATH);
        return null;
      });
    });
    describe('#QUERY', function() {
      return it('should be a constant property', function() {
        var test;
        test = new URL();
        unit.regexp(test.QUERY);
        return null;
      });
    });
    describe('#FRAGMENT', function() {
      return it('should be a constant property', function() {
        var test;
        test = new URL();
        unit.regexp(test.FRAGMENT);
        return null;
      });
    });
    describe('#parse', function() {
      it('should be a static function', function() {
        unit.function(URL.parse);
        return null;
      });
      it('should return an object hash for valid url strings', function() {
        unit.object(URL.parse('http://google.com')).hasProperty('protocol', 'http').hasProperty('user').hasProperty('host', 'google.com').hasProperty('port').hasProperty('path').hasProperty('query').hasProperty('fragment').object(URL.parse('ftp://fake@file.store.io:86/private')).hasProperty('protocol', 'ftp').hasProperty('user', 'fake').hasProperty('host', 'file.store.io').hasProperty('port', '86').hasProperty('path', 'private').hasProperty('query').hasProperty('fragment');
        return null;
      });
      return it('should return false for invalid url strings', function() {
        unit.bool(URL.parse('this is not a url')).isFalse().bool(URL.parse('/this/is/a/path')).isFalse().bool(URL.parse(/asd/i)).isFalse().bool(URL.parse([1, 2, 3])).isFalse().bool(URL.parse(new Date())).isFalse();
        return null;
      });
    });
    describe('#stringify', function() {
      it('should be a static function', function() {
        unit.function(URL.stringify);
        return null;
      });
      it('should accept a url string', function() {
        unit.string(URL.stringify('http://google.com')).is('http://google.com').string(URL.stringify('HTTPs://apple.com')).is('https://apple.com');
        return null;
      });
      return it('should accept an object with defined properties', function() {
        unit.string(URL.stringify({
          protocol: 'ftp',
          host: 'loopback.io',
          port: 86
        })).is('ftp://loopback.io:86').string(URL.stringify({
          protocol: 'ssh',
          user: 'john',
          host: '192.168.0.16',
          port: 22
        })).is('ssh://john@192.168.0.16:22');
        return null;
      });
    });
    describe('#protocol', function() {
      it('should accept undefined', function() {
        var test;
        test = new URL();
        unit.given(test.protocol = void 0).undefined(test.protocol);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new URL();
        unit.given(test.protocol = null).undefined(test.protocol);
        return null;
      });
      it('should accept a valid protocol string', function() {
        var test;
        test = new URL();
        unit.given(test.protocol = 'http').string(test.protocol).is('http').given(test.protocol = 'ftp').string(test.protocol).is('ftp').given(test.protocol = 'MAIL').string(test.protocol).is('mail');
        return null;
      });
      it('should accept stringifiable arrays that are a single valid element', function() {
        var test;
        test = new URL();
        unit.given(test.protocol = ['HtTpS']).string(test.protocol).is('https').given(test.protocol = ['FTP']).string(test.protocol).is('ftp').given(test.protocol = ['file']).string(test.protocol).is('file');
        return null;
      });
      it('should throw an error for a invalid string', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.protocol = 'hello world';
        }).error(function() {
          return test.protocol = '-i*';
        });
        return null;
      });
      it('should throw an error for a number', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.protocol = 5;
        }).error(function() {
          return test.protocol = -9;
        }).error(function() {
          return test.protocol = 0.4;
        }).error(function() {
          return test.protocol = -6.2;
        });
        return null;
      });
      it('should throw an error for an array with multiple elements', function() {
        unit.error(function() {
          return test.protocol = ['http', 's'];
        }).error(function() {
          return test.protocol = ['ftp', 2];
        }).error(function() {
          return test.protocol = ['ssh', 'ftp'];
        });
        return null;
      });
      return it('should throw an error for an object that stringifies to an invalid protocol', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.protocol = /asd/;
        }).error(function() {
          return test.protocol = [1, 2, 3];
        }).error(function() {
          return test.protocol = new Date();
        }).error(function() {
          return test.protocol = {
            a: 5,
            toString: () => {
              return `*a: ${this.a}*`;
            }
          };
        });
        return null;
      });
    });
    describe('#user', function() {
      it('should accept undefined', function() {
        var test;
        test = new URL();
        unit.given(test.user = void 0).undefined(test.user);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new URL();
        unit.given(test.user = null).undefined(test.user);
        return null;
      });
      it('should accept a valid user string', function() {
        var test;
        test = new URL();
        unit.given(test.user = 'user').string(test.user).is('user').given(test.user = 'joe').string(test.user).is('joe').given(test.user = 'jane').string(test.user).is('jane');
        return null;
      });
      it('should accept numbers', function() {
        var test;
        test = new URL();
        unit.given(test.user = 5).string(test.user).is('5').given(test.user = 1.2).string(test.user).is('1.2').given(test.user = -6).string(test.user).is('-6').given(test.user = -0.6).string(test.user).is('-0.6');
        return null;
      });
      it('should accept stringifiable array', function() {
        var test;
        test = new URL();
        unit.given(test.user = ['user']).string(test.user).is('user').given(test.user = ['joe']).string(test.user).is('joe').given(test.user = ['jane', 'doe']).string(test.user).is('jane,doe');
        return null;
      });
      it('should throw an error for a invalid string', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.user = 'hello world';
        }).error(function() {
          return test.user = '_i^';
        }).error(function() {
          return test.user = '@fake';
        });
        return null;
      });
      return it('should throw an error for an object that stringifies to an invalid user', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.user = /asd/;
        }).error(function() {
          return test.user = new Date();
        }).error(function() {
          return test.user = {
            a: 5,
            toString: () => {
              return `*a: ${this.a}*`;
            }
          };
        });
        return null;
      });
    });
    describe('#host', function() {
      it('should accept undefined', function() {
        var test;
        test = new URL();
        unit.given(test.host = void 0).undefined(test.host);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new URL();
        unit.given(test.host = null).undefined(test.host);
        return null;
      });
      it('should accept a valid dot-atom domain string', function() {
        var test;
        test = new URL();
        unit.given(test.host = 'google.com').string(test.host).is('google.com').given(test.host = 'apple.com').string(test.host).is('apple.com').given(test.host = 'fake.io').string(test.host).is('fake.io');
        return null;
      });
      it('should accept a valid ipv4 address string', function() {
        var test;
        test = new URL();
        unit.given(test.host = '127.0.0.1').string(test.host).is('127.0.0.1').given(test.host = '87.106.83.127').string(test.host).is('87.106.83.127').given(test.host = '240.89.34.60').string(test.host).is('240.89.34.60');
        return null;
      });
      it('should accept a valid ipv6 address string', function() {
        var test;
        test = new URL();
        unit.given(test.host = '::1').string(test.host).is('[::1]').given(test.host = '2001:db8::ff00:42:8329').string(test.host).is('[2001:db8::ff00:42:8329]');
        return null;
      });
      it('should throw an error for numbers', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.host = 5;
        }).error(function() {
          return test.host = 1.2;
        }).error(function() {
          return test.host = -4;
        }).error(function() {
          return test.host = -0.4;
        });
        return null;
      });
      it('should throw an error for arrays', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.host = [1, 'a', '.com'];
        }).error(function() {
          return test.host = ['apple', '.com'];
        }).error(function() {
          return test.host = [];
        });
        return null;
      });
      it('should throw an error for a invalid string', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.host = 'hello world';
        }).error(function() {
          return test.host = '_i^';
        }).error(function() {
          return test.host = '@fake';
        });
        return null;
      });
      return it('should throw an error for an object that stringifies to an invalid host', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.host = /asd/;
        }).error(function() {
          return test.host = new Date();
        }).error(function() {
          return test.host = {
            a: 5,
            toString: () => {
              return `*a: ${this.a}*`;
            }
          };
        });
        return null;
      });
    });
    describe('#port', function() {
      it('should accept undefined', function() {
        var test;
        test = new URL();
        unit.given(test.port = void 0).undefined(test.port);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new URL();
        unit.given(test.port = null).undefined(test.port);
        return null;
      });
      it('should accept a valid port string', function() {
        var test;
        test = new URL();
        unit.given(test.port = '22').number(test.port).is(22).given(test.port = '80').number(test.port).is(80).given(test.port = '446').number(test.port).is(446);
        return null;
      });
      it('should accept valid integers between 1 and 65535', function() {
        var test;
        test = new URL();
        unit.given(test.port = 22).number(test.port).is(22).given(test.port = 80).number(test.port).is(80).given(test.port = 446).number(test.port).is(446);
        return null;
      });
      it('should throw an error for invalid port integers', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.port = 0;
        }).error(function() {
          return test.port = -8;
        }).error(function() {
          return test.port = 65536;
        });
        return null;
      });
      it('should throw an error for floats', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.port = 4.2;
        }).error(function() {
          return test.port = 22.1;
        }).error(function() {
          return test.port = 80.0000000000001;
        });
        return null;
      });
      it('should throw an error for arrays', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.port = [1, 'a', '.com'];
        }).error(function() {
          return test.port = ['apple', '.com'];
        }).error(function() {
          return test.port = [];
        });
        return null;
      });
      it('should throw an error for a invalid string', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.port = 'hello world';
        }).error(function() {
          return test.port = '_i^';
        }).error(function() {
          return test.port = '@fake';
        });
        return null;
      });
      return it('should throw an error for an object that stringifies to an invalid port', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.port = /asd/;
        }).error(function() {
          return test.port = new Date();
        }).error(function() {
          return test.port = {
            a: 5,
            toString: () => {
              return `*a: ${this.a}*`;
            }
          };
        });
        return null;
      });
    });
    describe('#path', function() {
      it('should accept undefined', function() {
        var test;
        test = new URL();
        unit.given(test.path = void 0).undefined(test.path);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new URL();
        unit.given(test.path = null).undefined(test.path);
        return null;
      });
      it('should accept a valid path string', function() {
        var test;
        test = new URL();
        unit.given(test.path = '/path/to').string(test.path).is('path/to').given(test.path = '/path/').string(test.path).is('path').given(test.path = '/a/b/c/').string(test.path).is('a/b/c');
        return null;
      });
      it('should accept numbers', function() {
        var test;
        test = new URL();
        unit.given(test.path = 5).string(test.path).is('5').given(test.path = -5).string(test.path).is('-5').given(test.path = 5.5).string(test.path).is('5.5').given(test.path = -5.5).string(test.path).is('-5.5');
        return null;
      });
      it('should accept arrays', function() {
        var test;
        test = new URL();
        unit.given(test.path = [1, 'a', '.com']).string(test.path).is('1,a,.com').given(test.path = ['apple', '.com']).string(test.path).is('apple,.com').given(test.path = []).undefined(test.path);
        return null;
      });
      it('should throw an error for a invalid string', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.path = 'hello world';
        }).error(function() {
          return test.path = '_i^';
        }).error(function() {
          return test.path = '@?fake';
        });
        return null;
      });
      return it('should throw an error for an object that stringifies to an invalid path', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.path = new Date();
        }).error(function() {
          return test.path = {
            a: 5,
            toString: () => {
              return `*a: ${this.a}*`;
            }
          };
        });
        return null;
      });
    });
    describe('#query', function() {
      it('should accept undefined', function() {
        var test;
        test = new URL();
        unit.given(test.query = void 0).undefined(test.query);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new URL();
        unit.given(test.query = null).undefined(test.query);
        return null;
      });
      it('should accept a valid query string', function() {
        var test;
        test = new URL();
        unit.given(test.query = 'q=1').string(test.query).is('q=1').given(test.query = 'next=5&last=10').string(test.query).is('next=5&last=10').given(test.query = 'news&pp=25&filter=sport&filter=money').string(test.query).is('news&pp=25&filter=sport&filter=money');
        return null;
      });
      it('should accept numbers', function() {
        var test;
        test = new URL();
        unit.given(test.query = 5).string(test.query).is('5').given(test.query = 0.5).string(test.query).is('0.5').given(test.query = -5).string(test.query).is('-5').given(test.query = -0.5).string(test.query).is('-0.5');
        return null;
      });
      it('should throw an error for a invalid string', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.query = 'hello world';
        }).error(function() {
          return test.query = '_i#';
        }).error(function() {
          return test.query = '@fake%';
        });
        return null;
      });
      return it('should throw an error for an object that stringifies to an invalid query', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.query = {};
        }).error(function() {
          return test.query = new Date();
        }).error(function() {
          return test.query = {
            a: 5,
            toString: () => {
              return `*a: ${this.a}*`;
            }
          };
        });
        return null;
      });
    });
    describe('#fragment', function() {
      it('should accept undefined', function() {
        var test;
        test = new URL();
        unit.given(test.fragment = void 0).undefined(test.fragment);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new URL();
        unit.given(test.fragment = null).undefined(test.fragment);
        return null;
      });
      it('should accept a valid fragment string', function() {
        var test;
        test = new URL();
        unit.given(test.fragment = 'top').string(test.fragment).is('top').given(test.fragment = 'news').string(test.fragment).is('news').given(test.fragment = '!/spa/route').string(test.fragment).is('!/spa/route');
        return null;
      });
      it('should accept numbers', function() {
        var test;
        test = new URL();
        unit.given(test.fragment = 5).string(test.fragment).is('5').given(test.fragment = 0.5).string(test.fragment).is('0.5').given(test.fragment = -5).string(test.fragment).is('-5').given(test.fragment = -0.5).string(test.fragment).is('-0.5');
        return null;
      });
      it('should throw an error for a invalid string', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.fragment = 'hello world';
        }).error(function() {
          return test.fragment = '_i#';
        }).error(function() {
          return test.fragment = '@fake%';
        });
        return null;
      });
      return it('should throw an error for an object that stringifies to an invalid fragment', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.fragment = {};
        }).error(function() {
          return test.fragment = new Date();
        }).error(function() {
          return test.fragment = {
            a: 5,
            toString: () => {
              return `*a: ${this.a}*`;
            }
          };
        });
        return null;
      });
    });
    describe('#authority', function() {
      it('should accept undefined', function() {
        var test;
        test = new URL();
        unit.given(test.authority = void 0).undefined(test.authority);
        return null;
      });
      it('should accept null as undefined', function() {
        var test;
        test = new URL();
        unit.given(test.authority = null).undefined(test.authority);
        return null;
      });
      it('should accept a valid authority string', function() {
        var test;
        test = new URL();
        unit.given(test.authority = 'user@host.com:22').string(test.authority).is('user@host.com:22').given(test.authority = 'host.com:22').string(test.authority).is('host.com:22').given(test.authority = 'host.com').string(test.authority).is('host.com');
        return null;
      });
      it('should accept an object hash', function() {
        var opt, test;
        test = new URL();
        opt = {
          user: 'user',
          host: 'host.com',
          port: 22
        };
        unit.object(test.authority = opt).hasProperty('user', opt.user).hasProperty('host', opt.host).hasProperty('port', opt.port);
        return null;
      });
      it('should throw an error for numbers', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.authority = 5;
        }).error(function() {
          return test.authority = 5.5;
        }).error(function() {
          return test.authority = -5;
        }).error(function() {
          return test.authority = -5.5;
        });
        return null;
      });
      return it('should throw an error for a invalid string', function() {
        var test;
        test = new URL();
        unit.error(function() {
          return test.authority = 'hello world';
        }).error(function() {
          return test.authority = '_i#';
        }).error(function() {
          return test.authority = 'fake@domain';
        });
        return null;
      });
    });
    describe('#set', function() {
      it('should be a function', function() {
        var test;
        test = new URL();
        unit.function(test.get);
        return null;
      });
      return it('should accept an object hash', function() {
        var opt, test;
        test = new URL();
        opt = {
          protocol: 'http',
          host: 'file.io',
          port: 80,
          path: 'public',
          query: 'upload'
        };
        unit.object(test.set(opt)).hasProperty('protocol', opt.protocol).hasProperty('user', opt.user).hasProperty('host', opt.host).hasProperty('port', opt.port).hasProperty('path', opt.path).hasProperty('query', opt.query).hasProperty('fragment', opt.fragment);
        return null;
      });
    });
    describe('#get', function() {
      it('should be a function', function() {
        var test;
        test = new URL();
        unit.function(test.get);
        return null;
      });
      return it('should accept a list of argument names to return an object hash', function() {
        var test;
        test = new URL('http://user@test.io:8080/path/to?q=1#hash');
        unit.object(test.get('protocol', 'host')).hasProperty('protocol', 'http').hasProperty('host', 'test.io').object(test.get('a', 'b', 'port')).hasProperty('port', 8080).hasNotProperty('a').hasNotProperty('b');
        return null;
      });
    });
    return describe('#toString', function() {
      it('should be a function', function() {
        var test;
        test = new URL();
        unit.function(test.toString);
        return null;
      });
      it('should return an empty string when protocol is not set', function() {
        var test;
        test = new URL({
          user: 'user',
          host: 'host.com',
          port: 80,
          path: 'path/to',
          query: 'q=1&f=news',
          fragment: 'hash'
        });
        unit.string(test.toString()).is('');
        return null;
      });
      it('should return an empty string when host is not set', function() {
        var test;
        test = new URL({
          protocol: 'http',
          user: 'user',
          port: 80,
          path: 'path/to',
          query: 'q=1&f=news',
          fragment: 'hash'
        });
        unit.string(test.toString()).is('');
        return null;
      });
      return it('should return a stringified url when all required properties are set', function() {
        var test;
        test = new URL({
          protocol: 'http',
          host: 'host.com'
        });
        unit.string(test.toString()).is('http://host.com').given(test.user = 'user').string(test.toString()).is('http://user@host.com').given(test.port = 8080).string(test.toString()).is('http://user@host.com:8080').given(test.path = '/path/to/').string(test.toString()).is('http://user@host.com:8080/path/to').given(test.query = 'q=1').string(test.toString()).is('http://user@host.com:8080/path/to?q=1').given(test.fragment = 'hash').string(test.toString()).is('http://user@host.com:8080/path/to?q=1#hash');
        return null;
      });
    });
  });

}).call(this);
