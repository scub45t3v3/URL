unit = require 'unit.js'
URL = require '../URL'
{version} = require '../package'

describe 'URL', ->
  it 'should be a function', ->
    unit
      .function URL

    return null

  it 'should return an instance of URL', ->
    unit
      .object new URL()
      .isInstanceOf URL
      .isEnumerable 'protocol'
      .isEnumerable 'user'
      .isEnumerable 'host'
      .isEnumerable 'port'
      .isEnumerable 'path'
      .isEnumerable 'query'
      .isEnumerable 'fragment'
      .hasProperty 'VERSION', version
      .hasProperty 'PROTOCOL'
      .hasProperty 'USER'
      .hasProperty 'DOMAIN'
      .hasProperty 'PATH'
      .hasProperty 'QUERY'
      .hasProperty 'FRAGMENT'

    return null

  it 'should return an instaceof URL without the new operator', ->
    unit
      .object URL()
      .isInstanceOf URL
      .isEnumerable 'protocol'
      .isEnumerable 'user'
      .isEnumerable 'host'
      .isEnumerable 'port'
      .isEnumerable 'path'
      .isEnumerable 'query'
      .isEnumerable 'fragment'
      .hasProperty 'VERSION', version
      .hasProperty 'PROTOCOL'
      .hasProperty 'USER'
      .hasProperty 'DOMAIN'
      .hasProperty 'PATH'
      .hasProperty 'QUERY'
      .hasProperty 'FRAGMENT'

    return null

  describe '#VERSION', ->
    it 'should be a constant property', ->
      test = new URL()

      unit
        .string test.VERSION
        .is version

      return null

  describe '#PROTOCOL', ->
    it 'should be a constant property', ->
      test = new URL()

      unit
        .regexp test.PROTOCOL

      return null

  describe '#USER', ->
    it 'should be a constant property', ->
      test = new URL()

      unit
        .regexp test.USER

      return null

  describe '#DOMAIN', ->
    it 'should be a constant property', ->
      test = new URL()

      unit
        .regexp test.DOMAIN

      return null

  describe '#PATH', ->
    it 'should be a constant property', ->
      test = new URL()

      unit
        .regexp test.PATH

      return null

  describe '#QUERY', ->
    it 'should be a constant property', ->
      test = new URL()

      unit
        .regexp test.QUERY

      return null

  describe '#FRAGMENT', ->
    it 'should be a constant property', ->
      test = new URL()

      unit
        .regexp test.FRAGMENT

      return null

  describe '#parse', ->
    it 'should be a static function', ->
      unit
        .function URL.parse

      return null

    it 'should return an object hash for valid url strings', ->
      unit
        .object URL.parse('http://google.com')
        .hasProperty 'protocol', 'http'
        .hasProperty 'user'
        .hasProperty 'host', 'google.com'
        .hasProperty 'port'
        .hasProperty 'path'
        .hasProperty 'query'
        .hasProperty 'fragment'
        .object URL.parse('ftp://fake@file.store.io:86/private')
        .hasProperty 'protocol', 'ftp'
        .hasProperty 'user', 'fake'
        .hasProperty 'host', 'file.store.io'
        .hasProperty 'port', '86'
        .hasProperty 'path', 'private'
        .hasProperty 'query'
        .hasProperty 'fragment'

      return null

    it 'should return false for invalid url strings', ->
      unit
        .bool URL.parse('this is not a url')
        .isFalse()
        .bool URL.parse('/this/is/a/path')
        .isFalse()
        .bool URL.parse(/asd/i)
        .isFalse()
        .bool URL.parse([1, 2, 3])
        .isFalse()
        .bool URL.parse(new Date())
        .isFalse()

      return null

  describe '#stringify', ->
    it 'should be a static function', ->
      unit
        .function URL.stringify

      return null

    it 'should accept a url string', ->
      unit
        .string URL.stringify('http://google.com')
        .is 'http://google.com'
        .string URL.stringify('HTTPs://apple.com')
        .is 'https://apple.com'

      return null

    it 'should accept an object with defined properties', ->
      unit
        .string URL.stringify
          protocol: 'ftp'
          host: 'loopback.io'
          port: 86
        .is 'ftp://loopback.io:86'
        .string URL.stringify
          protocol: 'ssh'
          user: 'john'
          host: '192.168.0.16'
          port: 22
        .is 'ssh://john@192.168.0.16:22'

      return null

  describe '#protocol', ->
    it 'should accept undefined', ->
      test = new URL()

      unit
        .given test.protocol = undefined
        .undefined test.protocol

      return null

    it 'should accept null as undefined', ->
      test = new URL()

      unit
        .given test.protocol = null
        .undefined test.protocol

      return null

    it 'should accept a valid protocol string', ->
      test = new URL()

      unit
        .given test.protocol = 'http'
        .string test.protocol
        .is 'http'
        .given test.protocol = 'ftp'
        .string test.protocol
        .is 'ftp'
        .given test.protocol = 'MAIL'
        .string test.protocol
        .is 'mail'

      return null

    it 'should accept stringifiable arrays that are a single valid element', ->
      test = new URL()

      unit
        .given test.protocol = ['HtTpS']
        .string test.protocol
        .is 'https'
        .given test.protocol = ['FTP']
        .string test.protocol
        .is 'ftp'
        .given test.protocol = ['file']
        .string test.protocol
        .is 'file'

      return null

    it 'should throw an error for a invalid string', ->
      test = new URL()

      unit
        .error ->
          test.protocol = 'hello world'
        .error ->
          test.protocol = '-i*'

      return null

    it 'should throw an error for a number', ->
      test = new URL()

      unit
        .error ->
          test.protocol = 5
        .error ->
          test.protocol = -9
        .error ->
          test.protocol = 0.4
        .error ->
          test.protocol = -6.2

      return null

    it 'should throw an error for an array with multiple elements', ->
      unit
        .error ->
          test.protocol = ['http', 's']
        .error ->
          test.protocol = ['ftp', 2]
        .error ->
          test.protocol = ['ssh', 'ftp']

      return null

    it 'should throw an error for an object that stringifies to an invalid protocol', ->
      test = new URL()

      unit
        .error ->
          test.protocol = /asd/
        .error ->
          test.protocol = [1, 2, 3]
        .error ->
          test.protocol = new Date()
        .error ->
          test.protocol =
            a: 5
            toString: =>
              return "*a: #{@a}*"

      return null

  describe '#user', ->
    it 'should accept undefined', ->
      test = new URL()

      unit
        .given test.user = undefined
        .undefined test.user

      return null

    it 'should accept null as undefined', ->
      test = new URL()

      unit
        .given test.user = null
        .undefined test.user

      return null

    it 'should accept a valid user string', ->
      test = new URL()

      unit
        .given test.user = 'user'
        .string test.user
        .is 'user'
        .given test.user = 'joe'
        .string test.user
        .is 'joe'
        .given test.user = 'jane'
        .string test.user
        .is 'jane'

      return null

    it 'should accept numbers', ->
      test = new URL()

      unit
        .given test.user = 5
        .string test.user
        .is '5'
        .given test.user = 1.2
        .string test.user
        .is '1.2'
        .given test.user = -6
        .string test.user
        .is '-6'
        .given test.user = -0.6
        .string test.user
        .is '-0.6'

      return null

    it 'should accept stringifiable array', ->
      test = new URL()

      unit
        .given test.user = ['user']
        .string test.user
        .is 'user'
        .given test.user = ['joe']
        .string test.user
        .is 'joe'
        .given test.user = ['jane', 'doe']
        .string test.user
        .is 'jane,doe'

      return null

    it 'should throw an error for a invalid string', ->
      test = new URL()

      unit
        .error ->
          test.user = 'hello world'
        .error ->
          test.user = '_i^'
        .error ->
          test.user = '@fake'

      return null

    it 'should throw an error for an object that stringifies to an invalid user', ->
      test = new URL()

      unit
        .error ->
          test.user = /asd/
        .error ->
          test.user = new Date()
        .error ->
          test.user =
            a: 5
            toString: =>
              return "*a: #{@a}*"

      return null

  describe '#host', ->
    it 'should accept undefined', ->
      test = new URL()

      unit
        .given test.host = undefined
        .undefined test.host

      return null

    it 'should accept null as undefined', ->
      test = new URL()

      unit
        .given test.host = null
        .undefined test.host

      return null

    it 'should accept a valid dot-atom domain string', ->
      test = new URL()

      unit
        .given test.host = 'google.com'
        .string test.host
        .is 'google.com'
        .given test.host = 'apple.com'
        .string test.host
        .is 'apple.com'
        .given test.host = 'fake.io'
        .string test.host
        .is 'fake.io'

      return null

    it 'should accept a valid ipv4 address string', ->
      test = new URL()

      unit
        .given test.host = '127.0.0.1'
        .string test.host
        .is '127.0.0.1'
        .given test.host = '87.106.83.127'
        .string test.host
        .is '87.106.83.127'
        .given test.host = '240.89.34.60'
        .string test.host
        .is '240.89.34.60'

      return null

    it 'should accept a valid ipv6 address string', ->
      test = new URL()

      unit
        .given test.host = '::1'
        .string test.host
        .is '[::1]'
        .given test.host = '2001:db8::ff00:42:8329'
        .string test.host
        .is '[2001:db8::ff00:42:8329]'

      return null

    it 'should throw an error for numbers', ->
      test = new URL()

      unit
        .error ->
          test.host = 5
        .error ->
          test.host = 1.2
        .error ->
          test.host = -4
        .error ->
          test.host = -0.4

      return null

    it 'should throw an error for arrays', ->
      test = new URL()

      unit
        .error ->
          test.host = [1, 'a', '.com']
        .error ->
          test.host = ['apple', '.com']
        .error ->
          test.host = []

      return null

    it 'should throw an error for a invalid string', ->
      test = new URL()

      unit
        .error ->
          test.host = 'hello world'
        .error ->
          test.host = '_i^'
        .error ->
          test.host = '@fake'

      return null

    it 'should throw an error for an object that stringifies to an invalid host', ->
      test = new URL()

      unit
        .error ->
          test.host = /asd/
        .error ->
          test.host = new Date()
        .error ->
          test.host =
            a: 5
            toString: =>
              return "*a: #{@a}*"

      return null

  describe '#port', ->
    it 'should accept undefined', ->
      test = new URL()

      unit
        .given test.port = undefined
        .undefined test.port

      return null

    it 'should accept null as undefined', ->
      test = new URL()

      unit
        .given test.port = null
        .undefined test.port

      return null

    it 'should accept a valid port string', ->
      test = new URL()

      unit
        .given test.port = '22'
        .number test.port
        .is 22
        .given test.port = '80'
        .number test.port
        .is 80
        .given test.port = '446'
        .number test.port
        .is 446

      return null

    it 'should accept valid integers between 1 and 65535', ->
      test = new URL()

      unit
        .given test.port = 22
        .number test.port
        .is 22
        .given test.port = 80
        .number test.port
        .is 80
        .given test.port = 446
        .number test.port
        .is 446

      return null

    it 'should throw an error for invalid port integers', ->
      test = new URL()

      unit
        .error ->
          test.port = 0
        .error ->
          test.port = -8
        .error ->
          test.port = 65536

      return null

    it 'should throw an error for floats', ->
      test = new URL()

      unit
        .error ->
          test.port = 4.2
        .error ->
          test.port = 22.1
        .error ->
          test.port = 80.0000000000001

      return null

    it 'should throw an error for arrays', ->
      test = new URL()

      unit
        .error ->
          test.port = [1, 'a', '.com']
        .error ->
          test.port = ['apple', '.com']
        .error ->
          test.port = []

      return null

    it 'should throw an error for a invalid string', ->
      test = new URL()

      unit
        .error ->
          test.port = 'hello world'
        .error ->
          test.port = '_i^'
        .error ->
          test.port = '@fake'

      return null

    it 'should throw an error for an object that stringifies to an invalid port', ->
      test = new URL()

      unit
        .error ->
          test.port = /asd/
        .error ->
          test.port = new Date()
        .error ->
          test.port =
            a: 5
            toString: =>
              return "*a: #{@a}*"

      return null

  describe '#path', ->
    it 'should accept undefined', ->
      test = new URL()

      unit
        .given test.path = undefined
        .undefined test.path

      return null

    it 'should accept null as undefined', ->
      test = new URL()

      unit
        .given test.path = null
        .undefined test.path

      return null

    it 'should accept a valid path string', ->
      test = new URL()

      unit
        .given test.path = '/path/to'
        .string test.path
        .is 'path/to'
        .given test.path = '/path/'
        .string test.path
        .is 'path'
        .given test.path = '/a/b/c/'
        .string test.path
        .is 'a/b/c'

      return null

    it 'should accept numbers', ->
      test = new URL()

      unit
        .given test.path = 5
        .string test.path
        .is '5'
        .given test.path = -5
        .string test.path
        .is '-5'
        .given test.path = 5.5
        .string test.path
        .is '5.5'
        .given test.path = -5.5
        .string test.path
        .is '-5.5'

      return null

    it 'should accept arrays', ->
      test = new URL()

      unit
        .given test.path = [1, 'a', '.com']
        .string test.path
        .is '1,a,.com'
        .given test.path = ['apple', '.com']
        .string test.path
        .is 'apple,.com'
        .given test.path = []
        .undefined test.path

      return null

    it 'should throw an error for a invalid string', ->
      test = new URL()

      unit
        .error ->
          test.path = 'hello world'
        .error ->
          test.path = '_i^'
        .error ->
          test.path = '@?fake'

      return null

    it 'should throw an error for an object that stringifies to an invalid path', ->
      test = new URL()

      unit
        .error ->
          test.path = new Date()
        .error ->
          test.path =
            a: 5
            toString: =>
              return "*a: #{@a}*"

      return null

  describe '#query', ->
    it 'should accept undefined', ->
      test = new URL()

      unit
        .given test.query = undefined
        .undefined test.query

      return null

    it 'should accept null as undefined', ->
      test = new URL()

      unit
        .given test.query = null
        .undefined test.query

      return null

    it 'should accept a valid query string', ->
      test = new URL()

      unit
        .given test.query = 'q=1'
        .string test.query
        .is 'q=1'
        .given test.query = 'next=5&last=10'
        .string test.query
        .is 'next=5&last=10'
        .given test.query = 'news&pp=25&filter=sport&filter=money'
        .string test.query
        .is 'news&pp=25&filter=sport&filter=money'

      return null

    it 'should accept numbers', ->
      test = new URL()

      unit
        .given test.query = 5
        .string test.query
        .is '5'
        .given test.query = 0.5
        .string test.query
        .is '0.5'
        .given test.query = -5
        .string test.query
        .is '-5'
        .given test.query = -0.5
        .string test.query
        .is '-0.5'

      return null

    it 'should throw an error for a invalid string', ->
      test = new URL()

      unit
        .error ->
          test.query = 'hello world'
        .error ->
          test.query = '_i#'
        .error ->
          test.query = '@fake%'

      return null

    it 'should throw an error for an object that stringifies to an invalid query', ->
      test = new URL()

      unit
        .error ->
          test.query = {}
        .error ->
          test.query = new Date()
        .error ->
          test.query =
            a: 5
            toString: =>
              return "*a: #{@a}*"

      return null

  describe '#fragment', ->
    it 'should accept undefined', ->
      test = new URL()

      unit
        .given test.fragment = undefined
        .undefined test.fragment

      return null

    it 'should accept null as undefined', ->
      test = new URL()

      unit
        .given test.fragment = null
        .undefined test.fragment

      return null

    it 'should accept a valid fragment string', ->
      test = new URL()

      unit
        .given test.fragment = 'top'
        .string test.fragment
        .is 'top'
        .given test.fragment = 'news'
        .string test.fragment
        .is 'news'
        .given test.fragment = '!/spa/route'
        .string test.fragment
        .is '!/spa/route'

      return null

    it 'should accept numbers', ->
      test = new URL()

      unit
        .given test.fragment = 5
        .string test.fragment
        .is '5'
        .given test.fragment = 0.5
        .string test.fragment
        .is '0.5'
        .given test.fragment = -5
        .string test.fragment
        .is '-5'
        .given test.fragment = -0.5
        .string test.fragment
        .is '-0.5'

      return null

    it 'should throw an error for a invalid string', ->
      test = new URL()

      unit
        .error ->
          test.fragment = 'hello world'
        .error ->
          test.fragment = '_i#'
        .error ->
          test.fragment = '@fake%'

      return null

    it 'should throw an error for an object that stringifies to an invalid fragment', ->
      test = new URL()

      unit
        .error ->
          test.fragment = {}
        .error ->
          test.fragment = new Date()
        .error ->
          test.fragment =
            a: 5
            toString: =>
              return "*a: #{@a}*"

      return null

  describe '#authority', ->
    it 'should accept undefined', ->
      test = new URL()

      unit
        .given test.authority = undefined
        .undefined test.authority

      return null

    it 'should accept null as undefined', ->
      test = new URL()

      unit
        .given test.authority = null
        .undefined test.authority

      return null

    it 'should accept a valid authority string', ->
      test = new URL()

      unit
        .given test.authority = 'user@host.com:22'
        .string test.authority
        .is 'user@host.com:22'
        .given test.authority = 'host.com:22'
        .string test.authority
        .is 'host.com:22'
        .given test.authority = 'host.com'
        .string test.authority
        .is 'host.com'

      return null

    it 'should accept an object hash', ->
      test = new URL()
      opt =
        user: 'user'
        host: 'host.com'
        port: 22

      unit
        .object test.authority = opt
        .hasProperty 'user', opt.user
        .hasProperty 'host', opt.host
        .hasProperty 'port', opt.port

      return null

    it 'should throw an error for numbers', ->
      test = new URL()

      unit
        .error ->
          test.authority = 5
        .error ->
          test.authority = 5.5
        .error ->
          test.authority = -5
        .error ->
          test.authority = -5.5

      return null

    it 'should throw an error for a invalid string', ->
      test = new URL()

      unit
        .error ->
          test.authority = 'hello world'
        .error ->
          test.authority = '_i#'
        .error ->
          test.authority = 'fake@domain'

      return null

  describe '#set', ->
    it 'should be a function', ->
      test = new URL()

      unit
        .function test.get

      return null

    it 'should accept an object hash', ->
      test = new URL()
      opt =
        protocol: 'http'
        host: 'file.io'
        port: 80
        path: 'public'
        query: 'upload'

      unit
        .object test.set(opt)
        .hasProperty 'protocol', opt.protocol
        .hasProperty 'user', opt.user
        .hasProperty 'host', opt.host
        .hasProperty 'port', opt.port
        .hasProperty 'path', opt.path
        .hasProperty 'query', opt.query
        .hasProperty 'fragment', opt.fragment

      return null

  describe '#get', ->
    it 'should be a function', ->
      test = new URL()

      unit
        .function test.get

      return null

    it 'should accept a list of argument names to return an object hash', ->
      test = new URL 'http://user@test.io:8080/path/to?q=1#hash'

      unit
        .object test.get('protocol', 'host')
        .hasProperty 'protocol', 'http'
        .hasProperty 'host', 'test.io'
        .object test.get('a', 'b', 'port')
        .hasProperty 'port', 8080
        .hasNotProperty 'a'
        .hasNotProperty 'b'

      return null

  describe '#toString', ->
    it 'should be a function', ->
      test = new URL()

      unit
        .function test.toString

      return null

    it 'should return an empty string when protocol is not set', ->
      test = new URL
        user: 'user'
        host: 'host.com'
        port: 80
        path: 'path/to'
        query: 'q=1&f=news'
        fragment: 'hash'

      unit
        .string test.toString()
        .is ''

      return null

    it 'should return an empty string when host is not set', ->
      test = new URL
        protocol: 'http'
        user: 'user'
        port: 80
        path: 'path/to'
        query: 'q=1&f=news'
        fragment: 'hash'

      unit
        .string test.toString()
        .is ''

      return null

    it 'should return a stringified url when all required properties are set', ->
      test = new URL
        protocol: 'http'
        host: 'host.com'

      unit
        .string test.toString()
        .is 'http://host.com'
        .given test.user = 'user'
        .string test.toString()
        .is 'http://user@host.com'
        .given test.port = 8080
        .string test.toString()
        .is 'http://user@host.com:8080'
        .given test.path = '/path/to/'
        .string test.toString()
        .is 'http://user@host.com:8080/path/to'
        .given test.query = 'q=1'
        .string test.toString()
        .is 'http://user@host.com:8080/path/to?q=1'
        .given test.fragment = 'hash'
        .string test.toString()
        .is 'http://user@host.com:8080/path/to?q=1#hash'

      return null