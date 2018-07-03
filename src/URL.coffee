_ = require 'underscore'
net = require 'net'
debug = require('debug') 'URL'
punycode = require 'punycode'
{version} = require './package'

REGEX = ///^
([a-z][a-z\d+.-]+):\/\/                             # protocol
(?:((?:[\w!$&'()*+,;:=~.-]|\%[\da-f]{2})+)@)?       # user
([^\s:\[\]\/%?#@]+|\[[:.%\w]+\])                    # host|ip
(?::(\d+))?                                         # port
((?:\/(?:[\w!$&'()*+,;:@=~.-]|\%[\da-f]{2})+)*)?\/? # path
(?:\?((?:[\w!$&'()*+,;:@=~?\/.-]|\%[\da-f]{2})*))?  # query
(?:\#((?:[\w!$&'()*+,;:@=~?\/.-]|\%[\da-f]{2})*))?  # fragment
$///i

AUTHORITY = ///^
(?:((?:[\w!$&'()*+,;:=~.-]|\%[\da-f]{2})+)@)?       # user
([^\s:\[\]\/%?#@]+|\[[:.%\w]+\])                    # host|ip
(?::(\d+))?                                         # port
$///i

PROTOCOL = /^[a-z][a-z\d+.-]+$/i
USER = /^(?:[\w!$&'()*+,;:=~.-]|\%[\da-f]{2})+$/i
DOMAIN = /^(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z][a-z\d-]*[a-z\d]$/i
PATH = /^\/?(?:(?:[\w!$&'()*+,;:@=~.-]|\%[\da-f]{2})+\/?)*$/i
QUERY = /^\??(?:[\w!$&'()*+,;:@=~?\/.-]|\%[\da-f]{2})+$/i
FRAGMENT = /^\#?(?:[\w!$&'()*+,;:@=~?\/.-]|\%[\da-f]{2})+$/i

URL = (opt = {}) ->
  debug 'call:URL(%o)', opt
  if typeof opt == 'string' || opt instanceof String
    opt = URL.parse opt

  if !(this instanceof URL)
    debug 're-call:URL with new operator'
    return new URL opt

  protocol = undefined
  user = undefined
  host = undefined
  port = undefined
  path = undefined
  query = undefined
  fragment = undefined

  setProtocol = (value) =>
    debug 'call:setProtocol(%o)', value

    if value? && !@PROTOCOL.test(value)
      debug 'error:protocol = %o', value

      throw new TypeError 'invalid protocol'

    debug 'before:set:protocol = %o', protocol
    protocol = value?.toString?()?.toLowerCase()
    debug 'after:set:protocol = %o', protocol

    return this

  getProtocol = ->
    debug 'call:getProtocol()'

    return protocol

  setUser = (value) =>
    debug 'call:setUser(%o)', value

    if value? && !@USER.test(value)
      debug 'error:user = %o', value

      throw new TypeError 'invalid user'

    debug 'before:set:user = %o', user
    user = value?.toString?()
    debug 'after:set:user = %o', user

    return this

  getUser = ->
    debug 'call:getUser()'

    return user

  setHost = (value) =>
    debug 'call:setHost(%o)', value

    try
      value = value && punycode.toASCII value
    catch error
      debug 'error:%o punycode.toASCII(%o)', error, value

      throw new TypeError 'invalid host'

    value = value?.toString?()?.replace?(/^\[|\]$/g, '')

    if value? && !@DOMAIN.test(value) && !net.isIP(value)
      debug 'error:host = %o', value

      throw new TypeError 'invalid host'

    debug 'before:set:host = %o', host
    host = value?.toString?()

    if net.isIPv6(host)
      host = "[#{host}]"

    debug 'after:set:host = %o', host

    return this

  getHost = ->
    debug 'call:getHost()'

    return host && punycode.toUnicode host

  setPort = (value) =>
    debug 'call:setPort(%o)', value

    value = value && Number value

    if value? && (value < 1 || value > 65535 || !Number.isInteger(value))
      debug 'error:port = %o', value

      throw new TypeError 'invalid port'

    debug 'before:set:port = %o', port
    port = value || undefined
    debug 'after:set:port = %o', port

    return this

  getPort = ->
    debug 'call:getPort()'

    return port

  setPath = (value) =>
    debug 'call:setPath(%o)', value

    if value? && !@PATH.test(value)
      debug 'error:path = %o', value

      throw new TypeError 'invalid path'

    debug 'before:set:path = %o', path
    path = value?.toString?()?.replace(/^\/*|\/*$/g, '') || undefined
    debug 'after:set:path = %o', path

    return this

  getPath = ->
    debug 'call:getPath()'

    return path

  setQuery = (value) =>
    debug 'call:setQuery(%o)', value

    if value? && !@QUERY.test(value)
      debug 'error:query = %o', value

      throw new TypeError 'invalid query'

    debug 'bafore:set:query = %o', query
    query = value?.toString?()?.replace(/^\?/, '') || undefined
    debug 'after:set:query = %o', query

    return this

  getQuery = ->
    debug 'call:getQuery()'

    return query

  setFragment = (value) =>
    debug 'call:setFragment(%o)', value

    if value? && !@FRAGMENT.test(value)
      debug 'error:fragment = %o', value

      throw new TypeError 'invalid fragment'

    debug 'before:set:fragment = %o', fragment
    fragment = value?.toString?()?.replace(/^\#/, '') || undefined
    debug 'after:set:fragment = %o', fragment

    return this

  getFragment = ->
    debug 'call:getFragment()'

    return fragment

  setAuthority = (opt) =>
    debug 'call:setAuthority(%o)', opt
    keys = [
      'user'
      'userinfo'
      'host'
      'hostname'
      'domain'
      'port'
    ]

    if !opt?
      opt =
        user: undefined
        host: undefined
        port: undefined

    if typeof opt == 'string' || opt instanceof String
      value = opt.match AUTHORITY
      opt = {}

      if value?.shift?()
        opt.user = value.shift()
        opt.host = value.shift()?.replace /^\[|\]$/g, ''
        opt.port = value.shift()

    if !_.intersection(_.allKeys(opt), keys).length
      throw new TypeError 'invalid authority'

    return @set _.pick(opt, keys...)

  getAuthority = =>
    debug 'call:getAuthority()'

    str = "#{@getUser() || ''}@#{@getHost()}:#{@getPort() || ''}"

    return @getHost() && str.replace /^@|:$/g, ''

  set = (opt = {}) =>
    debug 'call:set(%o)', opt

    for key, value of opt
      @[key] = value

    return this

  get = (args...) =>
    debug 'call:get(%o)', args

    args = _.flatten args

    return _.pick this, args...

  toString = =>
    debug 'call:toString()'

    if !@getProtocol() || !@getAuthority()
      return ''

    str = "#{@getProtocol()}://#{@getAuthority()}"

    if @getPath()
      str += "/#{@getPath()}"

    if @getQuery()
      str += "?#{@getQuery()}"

    if @getFragment()
      str += "##{@getFragment()}"

    return str

  Object.defineProperties this,
    VERSION:
      enumerable: false
      writable: false
      value: version
    PROTOCOL:
      enumerable: false
      writable: false
      value: PROTOCOL
    USER:
      enumerable: false
      writable: false
      value: USER
    DOMAIN:
      enumerable: false
      writable: false
      value: DOMAIN
    PATH:
      enumerable: false
      writable: false
      value: PATH
    QUERY:
      enumerable: false
      writable: false
      value: QUERY
    FRAGMENT:
      enumerable: false
      writable: false
      value: FRAGMENT
    protocol:
      enumerable: true
      set: setProtocol
      get: getProtocol
    schema:
      enumerable: false
      set: setProtocol
      get: getProtocol
    user:
      enumerable: true
      set: setUser
      get: getUser
    userinfo:
      enumerable: false
      set: setUser
      get: getUser
    host:
      enumerable: true
      set: setHost
      get: getHost
    domain:
      enumerable: false
      set: setHost
      get: getHost
    hostname:
      enumerable: false
      set: setHost
      get: getHost
    port:
      enumerable: true
      set: setPort
      get: getPort
    authority:
      enumerable: false
      set: setAuthority
      get: getAuthority
    path:
      enumerable: true
      set: setPath
      get: getPath
    pathname:
      enumerable: false
      set: setPath
      get: getPath
    query:
      enumerable: true
      set: setQuery
      get: getQuery
    querystring:
      enumerable: false
      set: setQuery
      get: getQuery
    fragment:
      enumerable: true
      set: setFragment
      get: getFragment
    hash:
      enumerable: false
      set: setFragment
      get: getFragment
    href:
      enumerable: false
      get: toString
    setProtocol:
      writable: false
      value: setProtocol
    getProtocol:
      writable: false
      value: getProtocol
    setUser:
      writable: false
      value: setUser
    getUser:
      writable: false
      value: getUser
    setHost:
      writable: false
      value: setHost
    getHost:
      writable: false
      value: getHost
    setPort:
      writable: false
      value: setPort
    getPort:
      writable: false
      value: getPort
    setPath:
      writable: false
      value: setPath
    getPath:
      writable: false
      value: getPath
    setQuery:
      writable: false
      value: setQuery
    getQuery:
      writable: false
      value: getQuery
    setFragment:
      writable: false
      value: setFragment
    getFragment:
      writable: false
      value: getFragment
    setAuthority:
      writable: false
      value: setAuthority
    getAuthority:
      writable: false
      value: getAuthority
    set:
      writable: false
      value: set
    get:
      writable: false
      value: get
    toString:
      writable: false
      value: toString

  Object.freeze this

  return @set opt

URL.parse = (value = '') ->
  debug 'call:parse(%o)', value

  value = value?.match?(REGEX)

  if !value
    return false

  parsed =
    href: value.shift()
    protocol: value.shift()
    user: value.shift()
    host: value.shift()
    port: value.shift()
    path: value.shift()?.replace /^\//, ''
    query: value.shift()
    fragment: value.shift()

  return parsed

URL.stringify = (opt = {}) ->
  debug 'call:stringify(%o)', opt

  return new URL(opt).toString()

module.exports = URL