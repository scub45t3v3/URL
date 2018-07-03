(function() {
  var AUTHORITY, DOMAIN, FRAGMENT, PATH, PROTOCOL, QUERY, REGEX, URL, USER, _, debug, net, punycode, version;

  _ = require('underscore');

  net = require('net');

  debug = require('debug')('URL');

  punycode = require('punycode');

  ({version} = require('./package'));

  REGEX = /^([a-z][a-z\d+.-]+):\/\/(?:((?:[\w!$&'()*+,;:=~.-]|\%[\da-f]{2})+)@)?([^\s:\[\]\/%?#@]+|\[[:.%\w]+\])(?::(\d+))?((?:\/(?:[\w!$&'()*+,;:@=~.-]|\%[\da-f]{2})+)*)?\/?(?:\?((?:[\w!$&'()*+,;:@=~?\/.-]|\%[\da-f]{2})*))?(?:\#((?:[\w!$&'()*+,;:@=~?\/.-]|\%[\da-f]{2})*))?$/i; // protocol
  // user
  // host|ip
  // port
  // path
  // query
  // fragment

  AUTHORITY = /^(?:((?:[\w!$&'()*+,;:=~.-]|\%[\da-f]{2})+)@)?([^\s:\[\]\/%?#@]+|\[[:.%\w]+\])(?::(\d+))?$/i; // user
  // host|ip
  // port

  PROTOCOL = /^[a-z][a-z\d+.-]+$/i;

  USER = /^(?:[\w!$&'()*+,;:=~.-]|\%[\da-f]{2})+$/i;

  DOMAIN = /^(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z][a-z\d-]*[a-z\d]$/i;

  PATH = /^\/?(?:(?:[\w!$&'()*+,;:@=~.-]|\%[\da-f]{2})+\/?)*$/i;

  QUERY = /^\??(?:[\w!$&'()*+,;:@=~?\/.-]|\%[\da-f]{2})+$/i;

  FRAGMENT = /^\#?(?:[\w!$&'()*+,;:@=~?\/.-]|\%[\da-f]{2})+$/i;

  URL = function(opt = {}) {
    var fragment, get, getAuthority, getFragment, getHost, getPath, getPort, getProtocol, getQuery, getUser, host, path, port, protocol, query, set, setAuthority, setFragment, setHost, setPath, setPort, setProtocol, setQuery, setUser, toString, user;
    debug('call:URL(%o)', opt);
    if (typeof opt === 'string' || opt instanceof String) {
      opt = URL.parse(opt);
    }
    if (!(this instanceof URL)) {
      debug('re-call:URL with new operator');
      return new URL(opt);
    }
    protocol = void 0;
    user = void 0;
    host = void 0;
    port = void 0;
    path = void 0;
    query = void 0;
    fragment = void 0;
    setProtocol = (value) => {
      var ref;
      debug('call:setProtocol(%o)', value);
      if ((value != null) && !this.PROTOCOL.test(value)) {
        debug('error:protocol = %o', value);
        throw new TypeError('invalid protocol');
      }
      debug('before:set:protocol = %o', protocol);
      protocol = value != null ? typeof value.toString === "function" ? (ref = value.toString()) != null ? ref.toLowerCase() : void 0 : void 0 : void 0;
      debug('after:set:protocol = %o', protocol);
      return this;
    };
    getProtocol = function() {
      debug('call:getProtocol()');
      return protocol;
    };
    setUser = (value) => {
      debug('call:setUser(%o)', value);
      if ((value != null) && !this.USER.test(value)) {
        debug('error:user = %o', value);
        throw new TypeError('invalid user');
      }
      debug('before:set:user = %o', user);
      user = value != null ? typeof value.toString === "function" ? value.toString() : void 0 : void 0;
      debug('after:set:user = %o', user);
      return this;
    };
    getUser = function() {
      debug('call:getUser()');
      return user;
    };
    setHost = (value) => {
      var error, ref;
      debug('call:setHost(%o)', value);
      try {
        value = value && punycode.toASCII(value);
      } catch (error1) {
        error = error1;
        debug('error:%o punycode.toASCII(%o)', error, value);
        throw new TypeError('invalid host');
      }
      value = value != null ? typeof value.toString === "function" ? (ref = value.toString()) != null ? typeof ref.replace === "function" ? ref.replace(/^\[|\]$/g, '') : void 0 : void 0 : void 0 : void 0;
      if ((value != null) && !this.DOMAIN.test(value) && !net.isIP(value)) {
        debug('error:host = %o', value);
        throw new TypeError('invalid host');
      }
      debug('before:set:host = %o', host);
      host = value != null ? typeof value.toString === "function" ? value.toString() : void 0 : void 0;
      if (net.isIPv6(host)) {
        host = `[${host}]`;
      }
      debug('after:set:host = %o', host);
      return this;
    };
    getHost = function() {
      debug('call:getHost()');
      return host && punycode.toUnicode(host);
    };
    setPort = (value) => {
      debug('call:setPort(%o)', value);
      value = value && Number(value);
      if ((value != null) && (value < 1 || value > 65535 || !Number.isInteger(value))) {
        debug('error:port = %o', value);
        throw new TypeError('invalid port');
      }
      debug('before:set:port = %o', port);
      port = value || void 0;
      debug('after:set:port = %o', port);
      return this;
    };
    getPort = function() {
      debug('call:getPort()');
      return port;
    };
    setPath = (value) => {
      var ref;
      debug('call:setPath(%o)', value);
      if ((value != null) && !this.PATH.test(value)) {
        debug('error:path = %o', value);
        throw new TypeError('invalid path');
      }
      debug('before:set:path = %o', path);
      path = (value != null ? typeof value.toString === "function" ? (ref = value.toString()) != null ? ref.replace(/^\/*|\/*$/g, '') : void 0 : void 0 : void 0) || void 0;
      debug('after:set:path = %o', path);
      return this;
    };
    getPath = function() {
      debug('call:getPath()');
      return path;
    };
    setQuery = (value) => {
      var ref;
      debug('call:setQuery(%o)', value);
      if ((value != null) && !this.QUERY.test(value)) {
        debug('error:query = %o', value);
        throw new TypeError('invalid query');
      }
      debug('bafore:set:query = %o', query);
      query = (value != null ? typeof value.toString === "function" ? (ref = value.toString()) != null ? ref.replace(/^\?/, '') : void 0 : void 0 : void 0) || void 0;
      debug('after:set:query = %o', query);
      return this;
    };
    getQuery = function() {
      debug('call:getQuery()');
      return query;
    };
    setFragment = (value) => {
      var ref;
      debug('call:setFragment(%o)', value);
      if ((value != null) && !this.FRAGMENT.test(value)) {
        debug('error:fragment = %o', value);
        throw new TypeError('invalid fragment');
      }
      debug('before:set:fragment = %o', fragment);
      fragment = (value != null ? typeof value.toString === "function" ? (ref = value.toString()) != null ? ref.replace(/^\#/, '') : void 0 : void 0 : void 0) || void 0;
      debug('after:set:fragment = %o', fragment);
      return this;
    };
    getFragment = function() {
      debug('call:getFragment()');
      return fragment;
    };
    setAuthority = (opt) => {
      var keys, ref, value;
      debug('call:setAuthority(%o)', opt);
      keys = ['user', 'userinfo', 'host', 'hostname', 'domain', 'port'];
      if (opt == null) {
        opt = {
          user: void 0,
          host: void 0,
          port: void 0
        };
      }
      if (typeof opt === 'string' || opt instanceof String) {
        value = opt.match(AUTHORITY);
        opt = {};
        if (value != null ? typeof value.shift === "function" ? value.shift() : void 0 : void 0) {
          opt.user = value.shift();
          opt.host = (ref = value.shift()) != null ? ref.replace(/^\[|\]$/g, '') : void 0;
          opt.port = value.shift();
        }
      }
      if (!_.intersection(_.allKeys(opt), keys).length) {
        throw new TypeError('invalid authority');
      }
      return this.set(_.pick(opt, ...keys));
    };
    getAuthority = () => {
      var str;
      debug('call:getAuthority()');
      str = `${this.getUser() || ''}@${this.getHost()}:${this.getPort() || ''}`;
      return this.getHost() && str.replace(/^@|:$/g, '');
    };
    set = (opt = {}) => {
      var key, value;
      debug('call:set(%o)', opt);
      for (key in opt) {
        value = opt[key];
        this[key] = value;
      }
      return this;
    };
    get = (...args) => {
      debug('call:get(%o)', args);
      args = _.flatten(args);
      return _.pick(this, ...args);
    };
    toString = () => {
      var str;
      debug('call:toString()');
      if (!this.getProtocol() || !this.getAuthority()) {
        return '';
      }
      str = `${this.getProtocol()}://${this.getAuthority()}`;
      if (this.getPath()) {
        str += `/${this.getPath()}`;
      }
      if (this.getQuery()) {
        str += `?${this.getQuery()}`;
      }
      if (this.getFragment()) {
        str += `#${this.getFragment()}`;
      }
      return str;
    };
    Object.defineProperties(this, {
      VERSION: {
        enumerable: false,
        writable: false,
        value: version
      },
      PROTOCOL: {
        enumerable: false,
        writable: false,
        value: PROTOCOL
      },
      USER: {
        enumerable: false,
        writable: false,
        value: USER
      },
      DOMAIN: {
        enumerable: false,
        writable: false,
        value: DOMAIN
      },
      PATH: {
        enumerable: false,
        writable: false,
        value: PATH
      },
      QUERY: {
        enumerable: false,
        writable: false,
        value: QUERY
      },
      FRAGMENT: {
        enumerable: false,
        writable: false,
        value: FRAGMENT
      },
      protocol: {
        enumerable: true,
        set: setProtocol,
        get: getProtocol
      },
      schema: {
        enumerable: false,
        set: setProtocol,
        get: getProtocol
      },
      user: {
        enumerable: true,
        set: setUser,
        get: getUser
      },
      userinfo: {
        enumerable: false,
        set: setUser,
        get: getUser
      },
      host: {
        enumerable: true,
        set: setHost,
        get: getHost
      },
      domain: {
        enumerable: false,
        set: setHost,
        get: getHost
      },
      hostname: {
        enumerable: false,
        set: setHost,
        get: getHost
      },
      port: {
        enumerable: true,
        set: setPort,
        get: getPort
      },
      authority: {
        enumerable: false,
        set: setAuthority,
        get: getAuthority
      },
      path: {
        enumerable: true,
        set: setPath,
        get: getPath
      },
      pathname: {
        enumerable: false,
        set: setPath,
        get: getPath
      },
      query: {
        enumerable: true,
        set: setQuery,
        get: getQuery
      },
      querystring: {
        enumerable: false,
        set: setQuery,
        get: getQuery
      },
      fragment: {
        enumerable: true,
        set: setFragment,
        get: getFragment
      },
      hash: {
        enumerable: false,
        set: setFragment,
        get: getFragment
      },
      href: {
        enumerable: false,
        get: toString
      },
      setProtocol: {
        writable: false,
        value: setProtocol
      },
      getProtocol: {
        writable: false,
        value: getProtocol
      },
      setUser: {
        writable: false,
        value: setUser
      },
      getUser: {
        writable: false,
        value: getUser
      },
      setHost: {
        writable: false,
        value: setHost
      },
      getHost: {
        writable: false,
        value: getHost
      },
      setPort: {
        writable: false,
        value: setPort
      },
      getPort: {
        writable: false,
        value: getPort
      },
      setPath: {
        writable: false,
        value: setPath
      },
      getPath: {
        writable: false,
        value: getPath
      },
      setQuery: {
        writable: false,
        value: setQuery
      },
      getQuery: {
        writable: false,
        value: getQuery
      },
      setFragment: {
        writable: false,
        value: setFragment
      },
      getFragment: {
        writable: false,
        value: getFragment
      },
      setAuthority: {
        writable: false,
        value: setAuthority
      },
      getAuthority: {
        writable: false,
        value: getAuthority
      },
      set: {
        writable: false,
        value: set
      },
      get: {
        writable: false,
        value: get
      },
      toString: {
        writable: false,
        value: toString
      }
    });
    Object.freeze(this);
    return this.set(opt);
  };

  URL.parse = function(value = '') {
    var parsed, ref;
    debug('call:parse(%o)', value);
    value = value != null ? typeof value.match === "function" ? value.match(REGEX) : void 0 : void 0;
    if (!value) {
      return false;
    }
    parsed = {
      href: value.shift(),
      protocol: value.shift(),
      user: value.shift(),
      host: value.shift(),
      port: value.shift(),
      path: (ref = value.shift()) != null ? ref.replace(/^\//, '') : void 0,
      query: value.shift(),
      fragment: value.shift()
    };
    return parsed;
  };

  URL.stringify = function(opt = {}) {
    debug('call:stringify(%o)', opt);
    return new URL(opt).toString();
  };

  module.exports = URL;

}).call(this);
