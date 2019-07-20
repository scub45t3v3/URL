'use strict';

(() => {
  // include dependecies
  const _ = require('underscore');
  const net = require('net');
  const debug = require('debug')('URL');
  const punycode = require('punycode');
  const {version} = require('./package');

  // setup validation regexs
  const REGEX = /^([a-z][a-z\d+.-]+):\/\/(?:((?:[\w!$&'()*+,;:=~.-]|%[\da-f]{2})+)@)?([^\s:[\]/%?#@]+|\[[:.%\w]+\])(?::(\d+))?((?:\/(?:[\w!$&'()*+,;:@=~.-]|%[\da-f]{2})+)*)?\/?(?:\?((?:[\w!$&'()*+,;:@=~?/.-]|%[\da-f]{2})*))?(?:#((?:[\w!$&'()*+,;:@=~?/.-]|%[\da-f]{2})*))?$/i;
  const AUTHORITY = /^(?:((?:[\w!$&'()*+,;:=~.-]|%[\da-f]{2})+)@)?([^\s:[\]/%?#@]+|\[[:.%\w]+\])(?::(\d+))?$/i;
  const PROTOCOL = /^[a-z][a-z\d+.-]+$/i;
  const USER = /^(?:[\w!$&'()*+,;:=~.-]|%[\da-f]{2})+$/i;
  const DOMAIN = /^(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z][a-z\d-]*[a-z\d]$/i;
  const PATH = /^\/?(?:(?:[\w!$&'()*+,;:@=~.-]|%[\da-f]{2})+\/?)*$/i;
  const QUERY = /^\??(?:[\w!$&'()*+,;:@=~?/.-]|%[\da-f]{2})+$/i;
  const FRAGMENT = /^#?(?:[\w!$&'()*+,;:@=~?/.-]|%[\da-f]{2})+$/i;

  // URL class definition
  const URL = function(opt = {}) {
    debug('call:URL(%o)', opt);

    // define auto instantiation
    if (!new.target) {
      debug('re-call:URL with new operator');

      return new URL(opt);
    }

    // define private properties
    let protocol;
    let user;
    let host;
    let port;
    let path;
    let query;
    let fragment;

    const setProtocol = (value) => {
      debug('call:setProtocol(%o)', value);
      if (value != null && !this.PROTOCOL.test(value)) {
        debug('error:protocol = %o', value);

        throw new TypeError('invalid protocol');
      }

      debug('before:set:protocol = %o', protocol);
      protocol = (value && `${value}`.toLowerCase()) || undefined;
      debug('after:set:protocol = %o', protocol);

      return this;
    }; // end setProtocol

    const getProtocol = () => {
      debug('call:getProtocol()');

      return protocol;
    }; // end getProtocol

    const setUser = (value) => {
      debug('call:setUser(%o)', value);
      if (value != null && !this.USER.test(value)) {
        debug('error:user = %o', value);

        throw new TypeError('invalid user');
      }

      debug('before:set:user = %o', user);
      user = (value && `${value}`) || undefined;
      debug('after:set:user = %o', user);

      return this;
    }; // end setUser

    const getUser = () => {
      debug('call:getUser()');

      return user;
    }; // end getUser

    const setHost = (value) => {
      debug('call:setHost(%o)', value);
      try {
        value = value && punycode.toASCII(value);
      } catch (error) {
        debug('error:%o punycode.toASCII(%o)', error, value);

        throw new TypeError('invalid host');
      }

      value = value && `${value}`.replace(/^\[|\]$/g, '');

      if (value != null && !this.DOMAIN.test(value) && !net.isIP(value)) {
        debug('error:host = %o', value);

        throw new TypeError('invalid host');
      }

      debug('before:set:host = %o', host);
      host = (value && ((net.isIPv6(value) && `[${value}]`) || `${value}`)) || undefined;
      debug('after:set:host = %o', host);

      return this;
    }; // end setHost

    const getHost = () => {
      debug('call:getHost()');

      return host && punycode.toUnicode(host);
    }; // end getHost

    const setPort = (value) => {
      debug('call:setPort(%o)', value);
      value = value && Number(value);

      if (value != null
        && (value < 1 || value > 65535 || !Number.isInteger(value))) {
        debug('error:port = %o', value);

        throw new TypeError('invalid port');
      }

      debug('before:set:port = %o', port);
      port = value || undefined;
      debug('after:set:port = %o', port);

      return this;
    }; // end setPort

    const getPort = () => {
      debug('call:getPort()');

      return port;
    }; // end getPort

    const setPath = (value) => {
      debug('call:setPath(%o)', value);
      if (value != null && !this.PATH.test(value)) {
        debug('error:path = %o', value);

        throw new TypeError('invalid path');
      }

      debug('before:set:path = %o', path);
      path = (value && `${value}`.replace(/^\/+|\/+$/g, '')) || undefined;
      debug('after:set:path = %o', path);

      return this;
    }; // end setPath

    const getPath = () => {
      debug('call:getPath()');

      return path;
    }; // end getPath

    const setQuery = (value) => {
      debug('call:setQuery(%o)', value);
      if (value != null && !this.QUERY.test(value)) {
        debug('error:query = %o', value);

        throw new TypeError('invalid query');
      }

      debug('bafore:set:query = %o', query);
      query = (value && `${value}`.replace(/^\?/, '')) || undefined;
      debug('after:set:query = %o', query);

      return this;
    }; // end setQuery

    const getQuery = () => {
      debug('call:getQuery()');

      return query;
    }; // end getQuery

    const setFragment = (value) => {
      debug('call:setFragment(%o)', value);
      if (value != null && !this.FRAGMENT.test(value)) {
        debug('error:fragment = %o', value);

        throw new TypeError('invalid fragment');
      }

      debug('before:set:fragment = %o', fragment);
      fragment = (value && `${value}`.replace(/^#/, '')) || undefined;
      debug('after:set:fragment = %o', fragment);

      return this;
    }; // end setFragment

    const getFragment = () => {
      debug('call:getFragment()');

      return fragment;
    }; // end getFragment

    const setAuthority = (opt) => {
      debug('call:setAuthority(%o)', opt);
      const keys = [
        'user',
        'userinfo',
        'host',
        'hostname',
        'domain',
        'port',
      ];

      if (opt == null) {
        opt = {
          user: undefined,
          host: undefined,
          port: undefined,
        };
      }

      if (opt && opt.match) {
        const value = opt.match(AUTHORITY);

        if (value && value.shift()) {
          opt = {
            user: value.shift(),
            host: value.shift().replace(/^\[|\]$/g, ''),
            port: value.shift(),
          };
        }
      }

      if (!_.intersection(_.allKeys(opt), keys).length) {
        debug('error:authority = %o', opt);

        throw new TypeError('invalid authority');
      }

      return this.set(_.pick(opt, ...keys));
    }; // end setAuthority

    const getAuthority = () => {
      debug('call:getAuthority()');
      const str = `${this.getUser() || ''}@${this.getHost()}:${this.getPort() || ''}`;

      return this.getHost() && str.replace(/^@|:$/g, '');
    }; // end getAuthority

    const setHref = (value) => {
      debug('call:setHref(%o)', value);
      value = URL.parse(value);

      if (!value) {
        debug('error:href = %o', value);

        throw new TypeError('invalid href');
      }

      /* remove href property to avoid passing it into set()
       * which would cause infinite recursion
       */
      delete value.href;

      return this.set(value);
    }; // end setHref

    const getHref = () => {
      return this.toString();
    }; // end getHref

    const set = (opt = {}) => {
      debug('call:set(%o)', opt);

      for (const key in opt) {
        this[key] = opt[key];
      }

      return this;
    }; // end set

    const get = (...args) => {
      debug('call:get(%o)', args);
      args = _.flatten(args);

      return _.pick(this, ...args);
    }; // end get

    const toString = () => {
      debug('call:toString()');
      if (!this.getProtocol() || !this.getAuthority()) {
        return '';
      }

      let str = `${this.getProtocol()}://${this.getAuthority()}`;

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
    }; // end toString

    Object.defineProperties(this, {
      VERSION: {
        enumerable: false,
        writable: false,
        value: version,
      },
      PROTOCOL: {
        enumerable: false,
        writable: false,
        value: PROTOCOL,
      },
      USER: {
        enumerable: false,
        writable: false,
        value: USER,
      },
      DOMAIN: {
        enumerable: false,
        writable: false,
        value: DOMAIN,
      },
      PATH: {
        enumerable: false,
        writable: false,
        value: PATH,
      },
      QUERY: {
        enumerable: false,
        writable: false,
        value: QUERY,
      },
      FRAGMENT: {
        enumerable: false,
        writable: false,
        value: FRAGMENT,
      },
      protocol: {
        enumerable: true,
        set: setProtocol,
        get: getProtocol,
      },
      schema: {
        enumerable: false,
        set: setProtocol,
        get: getProtocol,
      },
      user: {
        enumerable: true,
        set: setUser,
        get: getUser,
      },
      userinfo: {
        enumerable: false,
        set: setUser,
        get: getUser,
      },
      host: {
        enumerable: true,
        set: setHost,
        get: getHost,
      },
      domain: {
        enumerable: false,
        set: setHost,
        get: getHost,
      },
      hostname: {
        enumerable: false,
        set: setHost,
        get: getHost,
      },
      port: {
        enumerable: true,
        set: setPort,
        get: getPort,
      },
      authority: {
        enumerable: false,
        set: setAuthority,
        get: getAuthority,
      },
      path: {
        enumerable: true,
        set: setPath,
        get: getPath,
      },
      pathname: {
        enumerable: false,
        set: setPath,
        get: getPath,
      },
      query: {
        enumerable: true,
        set: setQuery,
        get: getQuery,
      },
      querystring: {
        enumerable: false,
        set: setQuery,
        get: getQuery,
      },
      fragment: {
        enumerable: true,
        set: setFragment,
        get: getFragment,
      },
      hash: {
        enumerable: false,
        set: setFragment,
        get: getFragment,
      },
      href: {
        enumerable: false,
        set: setHref,
        get: getHref,
      },
      setProtocol: {
        writable: false,
        value: setProtocol,
      },
      getProtocol: {
        writable: false,
        value: getProtocol,
      },
      setUser: {
        writable: false,
        value: setUser,
      },
      getUser: {
        writable: false,
        value: getUser,
      },
      setHost: {
        writable: false,
        value: setHost,
      },
      getHost: {
        writable: false,
        value: getHost,
      },
      setPort: {
        writable: false,
        value: setPort,
      },
      getPort: {
        writable: false,
        value: getPort,
      },
      setPath: {
        writable: false,
        value: setPath,
      },
      getPath: {
        writable: false,
        value: getPath,
      },
      setQuery: {
        writable: false,
        value: setQuery,
      },
      getQuery: {
        writable: false,
        value: getQuery,
      },
      setFragment: {
        writable: false,
        value: setFragment,
      },
      getFragment: {
        writable: false,
        value: getFragment,
      },
      setAuthority: {
        writable: false,
        value: setAuthority,
      },
      getAuthority: {
        writable: false,
        value: getAuthority,
      },
      setHref: {
        writable: false,
        value: setHref,
      },
      getHref: {
        writable: false,
        value: getHref,
      },
      set: {
        writable: false,
        value: set,
      },
      get: {
        writable: false,
        value: get,
      },
      toString: {
        writable: false,
        value: toString,
      },
      [Symbol.toStringTag]: {
        writable: false,
        value: '@scuba-squad/url',
      },
    });

    Object.freeze(this);

    if (typeof opt === 'string' || opt instanceof String) {
      return this.setHref(opt);
    }

    return this.set(opt);
  }; // end URL

  // static parse method
  URL.parse = (value = '') => {
    debug('call:parse(%o)', value);
    value = (value && value.href) || value;
    value = value && typeof value.match === 'function' && value.match(REGEX);

    if (!value) {
      return false;
    }

    const opt = {
      href: value.shift(),
      protocol: value.shift(),
      user: value.shift(),
      host: value.shift(),
      port: value.shift(),
      path: value.shift(),
      query: value.shift(),
      fragment: value.shift(),
    };

    opt.path = opt.path && opt.path.replace(/^\/+|\/+$/g, '');

    return opt;
  }; // end URL.parse

  // static stringify method
  URL.stringify = (opt = {}) => {
    debug('call:stringify(%o)', opt);

    return new URL(opt).toString();
  }; // end URL.stringify

  // export URL as a  commonjs module
  module.exports = URL;
})(); // end IIFE