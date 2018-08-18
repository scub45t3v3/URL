'use strict';

(() => {
  // include dependecies
  const unit = require('unit.js');
  const URL = require('../URL');
  const {version} = require('../package');

  // describe URL
  describe('URL', () => {
    it('should be a function', () => {
      unit
        .function(URL);
    }); // end it

    it('should return an instance of URL', () => {
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
    }); // end it

    it('should return an instaceof URL without the new operator', () => {
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
    }); // end it

    // describe #VERSION
    describe('#VERSION', () => {
      it('should be a constant property', () => {
        const test = new URL();

        unit
          .string(test.VERSION)
          .is(version);
      }); // end it
    });// end describe #VERSION

    // describe #PROTOCOL
    describe('#PROTOCOL', () => {
      it('should be a constant property', () => {
        const test = new URL();

        unit
          .regexp(test.PROTOCOL);
      }); // end it
    }); // end describe #PROTOCOL

    // describe #USER
    describe('#USER', () => {
      it('should be a constant property', () => {
        const test = new URL();

        unit
          .regexp(test.USER);
      }); // end it
    }); // end describe #USER

    // describe #DOMAIN
    describe('#DOMAIN', () => {
      it('should be a constant property', () => {
        const test = new URL();

        unit
          .regexp(test.DOMAIN);
      }); // end it
    }); // end describe #DOMAIN

    // describe #PATH
    describe('#PATH', () => {
      it('should be a constant property', () => {
        const test = new URL();

        unit
          .regexp(test.PATH);
      }); // end it
    }); // end describe #PATH

    // describe #QUERY
    describe('#QUERY', () => {
      it('should be a constant property', () => {
        const test = new URL();

        unit
          .regexp(test.QUERY);
      }); // end it
    }); // end describe #QUERY

    // describe #FRAGMENT
    describe('#FRAGMENT', () => {
      it('should be a constant property', () => {
        const test = new URL();

        unit
          .regexp(test.FRAGMENT);
      }); // end it
    }); // end describe #FRAGMENT

    // describe #parse
    describe('#parse', () => {
      it('should be a static function', () => {
        unit
          .function(URL.parse);
      }); // end it

      it('should return an object hash for valid url strings', () => {
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
      }); // end it

      it('should return false for invalid url strings', () => {
        unit
          .bool(URL.parse('this is not a url'))
          .isFalse()
          .bool(URL.parse('/this/is/a/path'))
          .isFalse()
          .bool(URL.parse(/asd/i))
          .isFalse()
          .bool(URL.parse([1, 2, 3]))
          .isFalse()
          .bool(URL.parse(new Date()))
          .isFalse();
      }); // end it
    }); // end describe #parse

    // describe #stringify
    describe('#stringify', () => {
      it('should be a static function', () => {
        unit
          .function(URL.stringify);
      }); // end it

      it('should accept a url string', () => {
        unit
          .string(URL.stringify('http://google.com'))
          .is('http://google.com')
          .string(URL.stringify('HTTPs://apple.com'))
          .is('https://apple.com');
      }); // end it

      it('should accept an object with defined properties', () => {
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
      }); // end it
    }); // end describe #stringify

    // describe #protocol
    describe('#protocol', () => {
      it('should accept undefined', () => {
        const test = new URL();

        unit
          .given(test.protocol = undefined)
          .undefined(test.protocol);
      }); // end it

      it('should accpet null as undefined', () => {
        const test = new URL();

        unit
          .given(test.protocol = null)
          .undefined(test.protocol);
      }); // end it

      it('should accept a valid protocol string', () => {
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
      }); // end it

      it('should accept stringifiable arrays that are a single valid element', () => {
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
      }); // end it

      it('should throw an error for a invalid string', () => {
        const test = new URL();

        unit
          .error(() => {
            test.protocol = 'hello world';
          })
          .error(() => {
            test.protocol = '-i*';
          });
      }); // end it

      it('should throw an error for a number', () => {
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
      }); // end it

      it('should throw an error for an array with multiple elements', () => {
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
      }); // end it

      it('should throw an error for an object that stringifies to an invalid protocol', () => {
        const test = new URL();

        unit
          .error(() => {
            test.protocol = /asd/;
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
      }); // end it
    }); // end describe #protocol

    // describe #user
    describe('#user', () => {
      it('should accept undefined', () => {
        const test = new URL();

        unit
          .given(test.user = undefined)
          .undefined(test.user);
      }); // end it

      it('should accpet null as undefined', () => {
        const test = new URL();

        unit
          .given(test.user = null)
          .undefined(test.user);
      }); // end it

      it('should accept a valid user string', () => {
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
      }); // end it

      it('should accept numbers', () => {
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
      }); // end it

      it('should accept stringifiable array', () => {
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
      }); // end it

      it('should throw an error for a invalid string', () => {
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
      }); // end it

      it('should throw an error for an object that stringifies to an invalid user', () => {
        const test = new URL();

        unit
          .error(() => {
            test.user = /asd/;
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
      }); // end it
    }); // end describe #user

    // describe #host
    describe('#host', () => {
      it('should accept undefined', () => {
        const test = new URL();

        unit
          .given(test.host = undefined)
          .undefined(test.host);
      }); // end it

      it('should accpet null as undefined', () => {
        const test = new URL();

        unit
          .given(test.host = null)
          .undefined(test.host);
      }); // end it

      it('should accept a valid dot-atom domain string', () => {
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
      }); // end it

      it('should accept a valid ipv4 address string', () => {
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
      }); // end it

      it('should accept a valid ipv6 address string', () => {
        const test = new URL();

        unit
          .given(test.host = '::1')
          .string(test.host)
          .is('[::1]')
          .given(test.host = '2001:db8::ff00:42:8329')
          .string(test.host)
          .is('[2001:db8::ff00:42:8329]');
      }); // end it

      it('should throw an error for numbers', () => {
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
      }); // end it

      it('should throw an error for arrays', () => {
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
      }); // end it

      it('should throw an error for a invalid string', () => {
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
      }); // end it

      it('should throw an error for an object that stringifies to an invalid host', () => {
        const test = new URL();

        unit
          .error(() => {
            test.host = /asd/;
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
      }); // end it
    }); // end describe #host

    // describe #port
    describe('#port', () => {
      it('should accept undefined', () => {
        const test = new URL();

        unit
          .given(test.port = undefined)
          .undefined(test.port);
      }); // end it

      it('should accpet null as undefined', () => {
        const test = new URL();

        unit
          .given(test.port = null)
          .undefined(test.port);
      }); // end it

      it('should accept a valid port string', () => {
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
      }); // end it

      it('should accept valid integers between 1 and 65535', () => {
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
      }); // end it

      it('should throw an error for invalid port integers', () => {
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
      }); // end it

      it('should throw an error for floats', () => {
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
      }); // end it

      it('should throw an error for arrays', () => {
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
      }); // end it

      it('should throw an error for a invalid string', () => {
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
      }); // end it

      it('should throw an error for an object that stringifies to an invalid port', () => {
        const test = new URL();

        unit
          .error(() => {
            test.port = /asd/;
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
      }); // end it
    }); // end describe #port

    // describe #path
    describe('#path', () => {
      it('should accept undefined', () => {
        const test = new URL();

        unit
          .given(test.path = undefined)
          .undefined(test.path);
      }); // end it

      it('should accpet null as undefined', () => {
        const test = new URL();

        unit
          .given(test.path = null)
          .undefined(test.path);
      }); // end it

      it('should accept a valid path string', () => {
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
      }); // end it

      it('should accept numbers', () => {
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
      }); // end it

      it('should accept arrays', () => {
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
      }); // end it

      it('should throw an error for a invalid string', () => {
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
      }); // end it

      it('should throw an error for an object that stringifies to an invalid path', () => {
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
      }); // end it
    }); // end describe #path

    // describe #query
    describe('#query', () => {
      it('should accept undefined', () => {
        const test = new URL();

        unit
          .given(test.query = undefined)
          .undefined(test.query);
      }); // end it

      it('should accpet null as undefined', () => {
        const test = new URL();

        unit
          .given(test.query = null)
          .undefined(test.query);
      }); // end it

      it('should accept a valid query string', () => {
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
      }); // end it

      it('should accept numbers', () => {
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
      }); // end it

      it('should throw an error for a invalid string', () => {
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
      }); // end it

      it('should throw an error for an object that stringifies to an invalid query', () => {
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
      }); // end it
    }); // end describe #query

    // describe #fragment
    describe('#fragment', () => {
      it('should accept undefined', () => {
        const test = new URL();

        unit
          .given(test.fragment = undefined)
          .undefined(test.fragment);
      }); // end it

      it('should accpet null as undefined', () => {
        const test = new URL();

        unit
          .given(test.fragment = null)
          .undefined(test.fragment);
      }); // end it

      it('should accept a valid fragment string', () => {
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
      }); // end it

      it('should accept numbers', () => {
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
      }); // end it

      it('should throw an error for a invalid string', () => {
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
      }); // end it

      it('should throw an error for an object that stringifies to an invalid fragment', () => {
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
      }); // end it
    }); // end describe #fragment

    // describe #authority
    describe('#authority', () => {
      it('should accept undefined', () => {
        const test = new URL();

        unit
          .given(test.authority = undefined)
          .undefined(test.authority);
      }); // end it

      it('should accept null as undefined', () => {
        const test = new URL();

        unit
          .given(test.authority = null)
          .undefined(test.authority);
      }); // end it

      it('should accept a valid authority string', () => {
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
      }); // end it

      it('should accept an object hash', () => {
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
      }); // end it

      it('should throw an error for numbers', () => {
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
      }); // end it

      it('should throw an error for a invalid string', () => {
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
      }); // end it
    }); // end describe #authority

    // describe #href
    describe('#href', () => {
      it('should be a function', () => {
        const test = new URL();

        unit
          .function(test.setHref);
      }); // end it

      it('should accept a url string', () => {
        const test = new URL();

        unit
          .given(test.href = 'http://domain.com')
          .string(test.href)
          .is('http://domain.com')
          .given(test.href = 'ftp://admin@file.io:86/public')
          .string(test.href)
          .is('ftp://admin@file.io:86/public');
      }); // end it

      it('should throw an error for numbers', () => {
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
      }); // end it

      it('should throw an error for invalid strings', () => {
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
      }); // end it
    }); // end #href

    // describe #set
    describe('#set', () => {
      it('should be a function', () => {
        const test = new URL();

        unit
          .function(test.get);
      }); // end it

      it('should accept an object hash', () => {
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
      }); // end it
    }); // end describe #set

    // describe #get
    describe('#get', () => {
      it('should be a function', () => {
        const test = new URL();

        unit
          .function(test.get);
      }); // end #get

      it('should accept a list of argument names to return an object hash', () => {
        const test = new URL('http://user@test.io:8080/path/to?q=1#hash');

        unit
          .object(test.get('protocol', 'host'))
          .hasProperty('protocol', 'http')
          .hasProperty('host', 'test.io')
          .object(test.get('a', 'b', 'port'))
          .hasProperty('port', 8080)
          .hasNotProperty('a')
          .hasNotProperty('b');
      }); // end it
    }); // end describe #get

    // describe #toString
    describe('#toString', () => {
      it('should be a function', () => {
        const test = new URL();

        unit
          .function(test.toString);
      }); // end it

      it('should return an empty string when protocol is not set', () => {
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
      }); // end it

      it('should return an empty string when host is not set', () => {
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
      }); // end it

      it('should return a stringified url when all required properties are set', () => {
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
      }); // end it
    }); // end describe #toString

    // describe #[Symbol.toStringTag]
    describe('#[Symbol.toStringTag]', () => {
      it('should return "@scuba-squad/url"', () => {
        const test = new URL();

        unit
          .string(test[Symbol.toStringTag])
          .is('@scuba-squad/url');
      }); // end it

      it('should return "[object @scuba-squad/url]" for Object.prototype.toString.call', () => {
        const test = new URL();

        unit
          .string(Object.prototype.toString.call(test))
          .is('[object @scuba-squad/url]');
      });// end it
    }); // end describe #[Symbol.toStringTag]
  }); // end describe URL
})(); // end IIFE