/*! For license information please see LICENSES */
(window.webpackJsonp = window.webpackJsonp || []).push([[13], Array(708).concat([function (e, n, t) {
  "use strict";
  const r = t(945);
  e.exports = e => n => e(new r(n), n)
}, function (e, n, t) {
  "use strict";
  const r = t(781), o = t(782);
  e.exports = ({arg: e, searchParams: n, hashAlg: t, mtime: c, mode: l, ...k} = {}) => {
    n && (k = {...k, ...n}), t && (k.hash = t), null != c && (c = o(c), k.mtime = c.secs, k.mtimeNsecs = c.nsecs), null != l && (k.mode = r(l)), k.timeout && !isNaN(k.timeout) && (k.timeout = k.timeout + "ms"), null == e ? e = [] : Array.isArray(e) || (e = [e]);
    const h = new URLSearchParams(k);
    return e.forEach(e => h.append("arg", e)), h
  }
}, function (e, n, t) {
  "use strict";
  const r = t(753), o = t(773), c = t(776), l = t(754), k = t(915), h = t(348), f = t(718), d = t(712), m = t(733),
    w = Object.keys(l).reduce((p, e) => (p[l[e]] = e, p), {});

  class y {
    constructor(e, n, t, l) {
      if (E.isCID(e)) {
        const n = e;
        return this.version = n.version, this.codec = n.codec, this.multihash = n.multihash, void (this.multibaseName = n.multibaseName || (0 === n.version ? "base58btc" : "base32"))
      }
      if ("string" == typeof e) {
        const n = o.isEncoded(e);
        if (n) {
          const t = o.decode(e);
          this.version = parseInt(t.slice(0, 1).toString("hex"), 16), this.codec = c.getCodec(t.slice(1)), this.multihash = c.rmPrefix(t.slice(1)), this.multibaseName = n
        } else this.version = 0, this.codec = "dag-pb", this.multihash = r.fromB58String(e), this.multibaseName = "base58btc";
        return y.validateCID(this), void Object.defineProperty(this, "string", {value: e})
      }
      if (e instanceof Uint8Array) {
        const n = e.slice(0, 1), t = parseInt(n.toString("hex"), 16);
        if (1 === t) {
          const n = e;
          this.version = t, this.codec = c.getCodec(n.slice(1)), this.multihash = c.rmPrefix(n.slice(1)), this.multibaseName = "base32"
        } else this.version = 0, this.codec = "dag-pb", this.multihash = e, this.multibaseName = "base58btc";
        y.validateCID(this)
      } else this.version = e, "number" == typeof n && (n = w[n]), this.codec = n, this.multihash = t, this.multibaseName = l || (0 === e ? "base58btc" : "base32"), y.validateCID(this)
    }

    get bytes() {
      let e = this._bytes;
      if (!e) {
        if (0 === this.version) e = this.multihash; else {
          if (1 !== this.version) throw new Error("unsupported version");
          {
            const n = c.getCodeVarint(this.codec);
            e = f([[1], n, this.multihash], 1 + n.byteLength + this.multihash.byteLength)
          }
        }
        Object.defineProperty(this, "_bytes", {value: e})
      }
      return e
    }

    get prefix() {
      const e = c.getCodeVarint(this.codec), n = r.prefix(this.multihash);
      return f([[this.version], e, n], 1 + e.byteLength + n.byteLength)
    }

    get code() {
      return l[this.codec]
    }

    toV0() {
      if ("dag-pb" !== this.codec) throw new Error("Cannot convert a non dag-pb CID to CIDv0");
      const {name: e, length: n} = r.decode(this.multihash);
      if ("sha2-256" !== e) throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
      if (32 !== n) throw new Error("Cannot convert non 32 byte multihash CID to CIDv0");
      return new E(0, this.codec, this.multihash)
    }

    toV1() {
      return new E(1, this.codec, this.multihash)
    }

    toBaseEncodedString(base = this.multibaseName) {
      if (this.string && base === this.multibaseName) return this.string;
      let e = null;
      if (0 === this.version) {
        if ("base58btc" !== base) throw new Error("not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()");
        e = r.toB58String(this.multihash)
      } else {
        if (1 !== this.version) throw new Error("unsupported version");
        e = d(o.encode(base, this.bytes))
      }
      return base === this.multibaseName && Object.defineProperty(this, "string", {value: e}), e
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")"
    }

    toString(base) {
      return this.toBaseEncodedString(base)
    }

    toJSON() {
      return {codec: this.codec, version: this.version, hash: this.multihash}
    }

    equals(e) {
      return this.codec === e.codec && this.version === e.version && m(this.multihash, e.multihash)
    }

    static validateCID(e) {
      const n = k.checkCIDComponents(e);
      if (n) throw new Error(n)
    }
  }

  const E = h(y, {className: "CID", symbolName: "@ipld/js-cid/CID"});
  E.codecs = l, e.exports = E
}, function (e, n, t) {
  "use strict";
  n.TextEncoder = TextEncoder, n.TextDecoder = TextDecoder
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(811), {TextDecoder: o} = t(711), c = new o("utf8");
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.decode(e);
    if ("ascii" === n) return function (e) {
      let n = "";
      for (let i = 0; i < e.length; i++) n += String.fromCharCode(e[i]);
      return n
    }(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.encode(e)
  }
}, , function (e, n, t) {
  "use strict";
  e.exports = e => {
    if (null == e) return e;
    const n = /^[A-Z]+$/;
    return Object.keys(e).reduce((t, r) => (n.test(r) ? t[r.toLowerCase()] = e[r] : n.test(r[0]) ? t[r[0].toLowerCase() + r.slice(1)] = e[r] : t[r] = e[r], t), {})
  }
}, , , function (e, n, t) {
  "use strict";
  const {names: r} = t(811), {TextEncoder: o} = t(711), c = new o;
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.encode(e);
    if ("ascii" === n) return function (e) {
      const n = new Uint8Array(e.length);
      for (let i = 0; i < e.length; i++) n[i] = e.charCodeAt(i);
      return n
    }(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.decode(e)
  }
}, function (e, n, t) {
  "use strict";
  e.exports = function (e, n) {
    n || (n = e.reduce((e, n) => e + n.length, 0));
    const output = new Uint8Array(n);
    let t = 0;
    for (const n of e) output.set(n, t), t += n.length;
    return output
  }
}, , , , , function (e, n, t) {
  "use strict";
  const r = t(916), o = t(777), c = t(78), l = t(814), k = t(348), h = t(756),
    f = Symbol.for("nodejs.util.inspect.custom"), d = t(712), m = t(733), w = new Map, y = k.proto((function (e) {
      if (!(this instanceof y)) return new y(e);
      if (null == e && (e = ""), e instanceof Uint8Array) this.bytes = r.fromBytes(e); else if ("string" == typeof e || e instanceof String) {
        if (e.length > 0 && "/" !== e.charAt(0)) throw new Error(`multiaddr "${e}" must start with a "/"`);
        this.bytes = r.fromString(e)
      } else {
        if (!(e.bytes && e.protos && e.protoCodes)) throw new Error("addr must be a string, Buffer, or another Multiaddr");
        this.bytes = r.fromBytes(e.bytes)
      }
    }), {className: "Multiaddr", symbolName: "@multiformats/js-multiaddr/multiaddr"});
  y.prototype.toString = function () {
    return r.bytesToString(this.bytes)
  }, y.prototype.toJSON = y.prototype.toString, y.prototype.toOptions = function () {
    const e = {}, n = this.toString().split("/");
    return e.family = "ip4" === n[1] ? "ipv4" : "ipv6", e.host = n[2], e.transport = n[3], e.port = parseInt(n[4]), e
  }, y.prototype[f] = function () {
    return "<Multiaddr " + d(this.bytes, "base16") + " - " + r.bytesToString(this.bytes) + ">"
  }, y.prototype.inspect = function () {
    return "<Multiaddr " + d(this.bytes, "base16") + " - " + r.bytesToString(this.bytes) + ">"
  }, y.prototype.protos = function () {
    return this.protoCodes().map(code => Object.assign({}, o(code)))
  }, y.prototype.protoCodes = function () {
    const e = [], n = this.bytes;
    let i = 0;
    for (; i < n.length;) {
      const code = c.decode(n, i), t = c.decode.bytes, p = o(code);
      i += r.sizeForAddr(p, n.slice(i + t)) + t, e.push(code)
    }
    return e
  }, y.prototype.protoNames = function () {
    return this.protos().map(e => e.name)
  }, y.prototype.tuples = function () {
    return r.bytesToTuples(this.bytes)
  }, y.prototype.stringTuples = function () {
    const e = r.bytesToTuples(this.bytes);
    return r.tuplesToStringTuples(e)
  }, y.prototype.encapsulate = function (e) {
    return e = y(e), y(this.toString() + e.toString())
  }, y.prototype.decapsulate = function (e) {
    e = e.toString();
    const s = this.toString(), i = s.lastIndexOf(e);
    if (i < 0) throw new Error("Address " + this + " does not contain subaddress: " + e);
    return y(s.slice(0, i))
  }, y.prototype.decapsulateCode = function (code) {
    const e = this.tuples();
    for (let i = e.length - 1; i >= 0; i--) if (e[i][0] === code) return y(r.tuplesToBytes(e.slice(0, i)));
    return this
  }, y.prototype.getPeerId = function () {
    let e = null;
    try {
      e = this.stringTuples().filter(e => {
        if (e[0] === o.names.ipfs.code) return !0
      }).pop()[1], e = d(new l(e).multihash, "base58btc")
    } catch (n) {
      e = null
    }
    return e
  }, y.prototype.getPath = function () {
    let path = null;
    try {
      path = this.stringTuples().filter(e => {
        if (o(e[0]).path) return !0
      })[0][1]
    } catch (e) {
      path = null
    }
    return path
  }, y.prototype.equals = function (e) {
    return m(this.bytes, e.bytes)
  }, y.prototype.resolve = async function () {
    const e = this.protos().find(p => p.resolvable);
    if (!e) return [this];
    const n = w.get(e.name);
    if (!n) throw h(new Error("no available resolver for " + e.name), "ERR_NO_AVAILABLE_RESOLVER");
    return (await n(this)).map(a => y(a))
  }, y.prototype.nodeAddress = function () {
    const e = this.protoCodes(), n = this.protoNames(), t = this.toString().split("/").slice(1);
    if (t.length < 4) throw new Error('multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6}/{address}/{tcp, udp}/{port}".');
    if (4 !== e[0] && 41 !== e[0] && 54 !== e[0] && 55 !== e[0]) throw new Error(`no protocol with name: "'${n[0]}'". Must have a valid family name: "{ip4, ip6, dns4, dns6}".`);
    if ("tcp" !== t[2] && "udp" !== t[2]) throw new Error(`no protocol with name: "'${n[1]}'". Must have a valid transport protocol: "{tcp, udp}".`);
    return {family: 41 === e[0] || 55 === e[0] ? 6 : 4, address: t[1], port: parseInt(t[3])}
  }, y.fromNodeAddress = function (e, n) {
    if (!e) throw new Error("requires node address object");
    if (!n) throw new Error("requires transport protocol");
    let t;
    switch (e.family) {
      case"IPv4":
        t = "ip4";
        break;
      case"IPv6":
        t = "ip6";
        break;
      default:
        throw Error(`Invalid addr family. Got '${e.family}' instead of 'IPv4' or 'IPv6'`)
    }
    return y("/" + [t, e.address, n, e.port].join("/"))
  }, y.prototype.isThinWaistAddress = function (e) {
    const n = (e || this).protos();
    return 2 === n.length && ((4 === n[0].code || 41 === n[0].code) && (6 === n[1].code || 273 === n[1].code))
  }, y.protocols = o, y.isName = function (e) {
    return !!y.isMultiaddr(e) && e.protos().some(e => e.resolvable)
  }, y.resolve = function (e) {
    return y.isMultiaddr(e) && y.isName(e) ? Promise.reject(new Error("not implemented yet")) : Promise.reject(Error("not a valid name"))
  }, y.resolvers = w, e.exports = y
}, , , function (e, n, t) {
  "use strict";
  e.exports = function (e, n, t, r) {
    return n.bytes = t.bytes = 0, {type: e, encode: n, decode: t, encodingLength: r}
  }
}, , , , function (e, n, t) {
  "use strict";
  const {
    AbortController: r,
    AbortSignal: o
  } = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0;
  e.exports = r, e.exports.AbortSignal = o, e.exports.default = r
}, , , function (e, n, t) {
  "use strict";
  e.exports = function (a, b) {
    if (a === b) return !0;
    if (a.byteLength !== b.byteLength) return !1;
    for (let i = 0; i < a.byteLength; i++) if (a[i] !== b[i]) return !1;
    return !0
  }
}, function (e, n, t) {
  const r = t(943);

  function o(e) {
    const n = new r;

    function t() {
      n.abort();
      for (const n of e) n && n.removeEventListener && n.removeEventListener("abort", t)
    }

    for (const n of e) if (n && n.addEventListener) {
      if (n.aborted) {
        t();
        break
      }
      n.addEventListener("abort", t)
    }
    return n.signal
  }

  e.exports = o, e.exports.anySignal = o
}, function (e, n, t) {
  "use strict";
  const r = t(952), o = t(781), c = t(782), {File: l, FormData: k} = t(768);
  e.exports = async function (source = "", e, n = {}) {
    const t = new k;
    let h = 0;
    for await(const {content: content, path: path, mode: e, mtime: n} of r(source)) {
      let r = "";
      h > 0 && (r = "-" + h);
      let k = (content ? "file" : "dir") + r;
      const f = [];
      if (null != e && f.push("mode=" + o(e)), null != n) {
        const {secs: e, nsecs: t} = c(n);
        f.push("mtime=" + e), null != t && f.push("mtime-nsecs=" + t)
      }
      f.length && (k = `${k}?${f.join("&")}`), content ? t.set(k, content, encodeURIComponent(path)) : t.set(k, new l([""], encodeURIComponent(path), {type: "application/x-directory"})), h++
    }
    return {headers: n, body: t}
  }
}, , , function (e, n, t) {
  "use strict";
  e.exports = function (e) {
    if (e.length >= 255) throw new TypeError("Alphabet too long");
    for (var n = new Uint8Array(256), t = 0; t < n.length; t++) n[t] = 255;
    for (var i = 0; i < e.length; i++) {
      var r = e.charAt(i), o = r.charCodeAt(0);
      if (255 !== n[o]) throw new TypeError(r + " is ambiguous");
      n[o] = i
    }
    var c = e.length, l = e.charAt(0), k = Math.log(c) / Math.log(256), h = Math.log(256) / Math.log(c);

    function f(source) {
      if ("string" != typeof source) throw new TypeError("Expected String");
      if (0 === source.length) return new Uint8Array;
      var e = 0;
      if (" " !== source[e]) {
        for (var t = 0, r = 0; source[e] === l;) t++, e++;
        for (var o = (source.length - e) * k + 1 >>> 0, h = new Uint8Array(o); source[e];) {
          var f = n[source.charCodeAt(e)];
          if (255 === f) return;
          for (var i = 0, d = o - 1; (0 !== f || i < r) && -1 !== d; d--, i++) f += c * h[d] >>> 0, h[d] = f % 256 >>> 0, f = f / 256 >>> 0;
          if (0 !== f) throw new Error("Non-zero carry");
          r = i, e++
        }
        if (" " !== source[e]) {
          for (var m = o - r; m !== o && 0 === h[m];) m++;
          for (var w = new Uint8Array(t + (o - m)), y = t; m !== o;) w[y++] = h[m++];
          return w
        }
      }
    }

    return {
      encode: function (source) {
        if (source instanceof Uint8Array || (ArrayBuffer.isView(source) ? source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength) : Array.isArray(source) && (source = Uint8Array.from(source))), !(source instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
        if (0 === source.length) return "";
        for (var n = 0, t = 0, r = 0, o = source.length; r !== o && 0 === source[r];) r++, n++;
        for (var k = (o - r) * h + 1 >>> 0, f = new Uint8Array(k); r !== o;) {
          for (var d = source[r], i = 0, m = k - 1; (0 !== d || i < t) && -1 !== m; m--, i++) d += 256 * f[m] >>> 0, f[m] = d % c >>> 0, d = d / c >>> 0;
          if (0 !== d) throw new Error("Non-zero carry");
          t = i, r++
        }
        for (var w = k - t; w !== k && 0 === f[w];) w++;
        for (var y = l.repeat(n); w < k; ++w) y += e.charAt(f[w]);
        return y
      }, decodeUnsafe: f, decode: function (e) {
        var n = f(e);
        if (n) return n;
        throw new Error("Non-base" + c + " character")
      }
    }
  }
}, , , , , , , , function (e, n, t) {
  var r;
  !function (o) {
    "use strict";
    var c, l = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, k = Math.ceil, h = Math.floor, f = "[BigNumber Error] ",
      d = f + "Number primitive has more than 15 significant digits: ", m = 1e14,
      w = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], y = 1e9;

    function E(e) {
      var i = 0 | e;
      return e > 0 || e === i ? i : i - 1
    }

    function v(a) {
      for (var s, e, i = 1, n = a.length, t = a[0] + ""; i < n;) {
        for (e = 14 - (s = a[i++] + "").length; e--; s = "0" + s) ;
        t += s
      }
      for (n = t.length; 48 === t.charCodeAt(--n);) ;
      return t.slice(0, n + 1 || 1)
    }

    function x(e, n) {
      var a, b, t = e.c, r = n.c, i = e.s, o = n.s, c = e.e, l = n.e;
      if (!i || !o) return null;
      if (a = t && !t[0], b = r && !r[0], a || b) return a ? b ? 0 : -o : i;
      if (i != o) return i;
      if (a = i < 0, b = c == l, !t || !r) return b ? 0 : !t ^ a ? 1 : -1;
      if (!b) return c > l ^ a ? 1 : -1;
      for (o = (c = t.length) < (l = r.length) ? c : l, i = 0; i < o; i++) if (t[i] != r[i]) return t[i] > r[i] ^ a ? 1 : -1;
      return c == l ? 0 : c > l ^ a ? 1 : -1
    }

    function S(e, n, t, r) {
      if (e < n || e > t || e !== h(e)) throw Error(f + (r || "Argument") + ("number" == typeof e ? e < n || e > t ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(e))
    }

    function A(e) {
      var n = e.c.length - 1;
      return E(e.e / 14) == n && e.c[n] % 2 != 0
    }

    function _(e, n) {
      return (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) + (n < 0 ? "e" : "e+") + n
    }

    function N(e, n, t) {
      var r, o;
      if (n < 0) {
        for (o = t + "."; ++n; o += t) ;
        e = o + e
      } else if (++n > (r = e.length)) {
        for (o = t, n -= r; --n; o += t) ;
        e += o
      } else n < r && (e = e.slice(0, n) + "." + e.slice(n));
      return e
    }

    (c = function e(n) {
      var div, t, r, o, c, I, C, O, U, T = K.prototype = {constructor: K, toString: null, valueOf: null}, P = new K(1),
        D = 20, L = 4, j = -7, R = 21, B = -1e7, F = 1e7, M = !1, z = 1, G = 0, H = {
          prefix: "",
          groupSize: 3,
          secondaryGroupSize: 0,
          groupSeparator: ",",
          decimalSeparator: ".",
          fractionGroupSize: 0,
          fractionGroupSeparator: " ",
          suffix: ""
        }, V = "0123456789abcdefghijklmnopqrstuvwxyz";

      function K(e, b) {
        var n, o, c, k, i, f, m, w, y = this;
        if (!(y instanceof K)) return new K(e, b);
        if (null == b) {
          if (e && !0 === e._isBigNumber) return y.s = e.s, void (!e.c || e.e > F ? y.c = y.e = null : e.e < B ? y.c = [y.e = 0] : (y.e = e.e, y.c = e.c.slice()));
          if ((f = "number" == typeof e) && 0 * e == 0) {
            if (y.s = 1 / e < 0 ? (e = -e, -1) : 1, e === ~~e) {
              for (k = 0, i = e; i >= 10; i /= 10, k++) ;
              return void (k > F ? y.c = y.e = null : (y.e = k, y.c = [e]))
            }
            w = String(e)
          } else {
            if (!l.test(w = String(e))) return r(y, w, f);
            y.s = 45 == w.charCodeAt(0) ? (w = w.slice(1), -1) : 1
          }
          (k = w.indexOf(".")) > -1 && (w = w.replace(".", "")), (i = w.search(/e/i)) > 0 ? (k < 0 && (k = i), k += +w.slice(i + 1), w = w.substring(0, i)) : k < 0 && (k = w.length)
        } else {
          if (S(b, 2, V.length, "Base"), 10 == b) return W(y = new K(e), D + y.e + 1, L);
          if (w = String(e), f = "number" == typeof e) {
            if (0 * e != 0) return r(y, w, f, b);
            if (y.s = 1 / e < 0 ? (w = w.slice(1), -1) : 1, K.DEBUG && w.replace(/^0\.0*|\./, "").length > 15) throw Error(d + e)
          } else y.s = 45 === w.charCodeAt(0) ? (w = w.slice(1), -1) : 1;
          for (n = V.slice(0, b), k = i = 0, m = w.length; i < m; i++) if (n.indexOf(o = w.charAt(i)) < 0) {
            if ("." == o) {
              if (i > k) {
                k = m;
                continue
              }
            } else if (!c && (w == w.toUpperCase() && (w = w.toLowerCase()) || w == w.toLowerCase() && (w = w.toUpperCase()))) {
              c = !0, i = -1, k = 0;
              continue
            }
            return r(y, String(e), f, b)
          }
          f = !1, (k = (w = t(w, b, 10, y.s)).indexOf(".")) > -1 ? w = w.replace(".", "") : k = w.length
        }
        for (i = 0; 48 === w.charCodeAt(i); i++) ;
        for (m = w.length; 48 === w.charCodeAt(--m);) ;
        if (w = w.slice(i, ++m)) {
          if (m -= i, f && K.DEBUG && m > 15 && (e > 9007199254740991 || e !== h(e))) throw Error(d + y.s * e);
          if ((k = k - i - 1) > F) y.c = y.e = null; else if (k < B) y.c = [y.e = 0]; else {
            if (y.e = k, y.c = [], i = (k + 1) % 14, k < 0 && (i += 14), i < m) {
              for (i && y.c.push(+w.slice(0, i)), m -= 14; i < m;) y.c.push(+w.slice(i, i += 14));
              i = 14 - (w = w.slice(i)).length
            } else i -= m;
            for (; i--; w += "0") ;
            y.c.push(+w)
          }
        } else y.c = [y.e = 0]
      }

      function $(e, i, n, t) {
        var r, o, c, l, k;
        if (null == n ? n = L : S(n, 0, 8), !e.c) return e.toString();
        if (r = e.c[0], c = e.e, null == i) k = v(e.c), k = 1 == t || 2 == t && (c <= j || c >= R) ? _(k, c) : N(k, c, "0"); else if (o = (e = W(new K(e), i, n)).e, l = (k = v(e.c)).length, 1 == t || 2 == t && (i <= o || o <= j)) {
          for (; l < i; k += "0", l++) ;
          k = _(k, o)
        } else if (i -= c, k = N(k, o, "0"), o + 1 > l) {
          if (--i > 0) for (k += "."; i--; k += "0") ;
        } else if ((i += o - l) > 0) for (o + 1 == l && (k += "."); i--; k += "0") ;
        return e.s < 0 && r ? "-" + k : k
      }

      function Y(e, n) {
        for (var t, i = 1, r = new K(e[0]); i < e.length; i++) {
          if (!(t = new K(e[i])).s) {
            r = t;
            break
          }
          n.call(r, t) && (r = t)
        }
        return r
      }

      function J(e, n, t) {
        for (var i = 1, r = n.length; !n[--r]; n.pop()) ;
        for (r = n[0]; r >= 10; r /= 10, i++) ;
        return (t = i + 14 * t - 1) > F ? e.c = e.e = null : t < B ? e.c = [e.e = 0] : (e.e = t, e.c = n), e
      }

      function W(e, n, t, r) {
        var o, i, c, l, f, d, y, E = e.c, v = w;
        if (E) {
          e:{
            for (o = 1, l = E[0]; l >= 10; l /= 10, o++) ;
            if ((i = n - o) < 0) i += 14, c = n, y = (f = E[d = 0]) / v[o - c - 1] % 10 | 0; else if ((d = k((i + 1) / 14)) >= E.length) {
              if (!r) break e;
              for (; E.length <= d; E.push(0)) ;
              f = y = 0, o = 1, c = (i %= 14) - 14 + 1
            } else {
              for (f = l = E[d], o = 1; l >= 10; l /= 10, o++) ;
              y = (c = (i %= 14) - 14 + o) < 0 ? 0 : f / v[o - c - 1] % 10 | 0
            }
            if (r = r || n < 0 || null != E[d + 1] || (c < 0 ? f : f % v[o - c - 1]), r = t < 4 ? (y || r) && (0 == t || t == (e.s < 0 ? 3 : 2)) : y > 5 || 5 == y && (4 == t || r || 6 == t && (i > 0 ? c > 0 ? f / v[o - c] : 0 : E[d - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), n < 1 || !E[0]) return E.length = 0, r ? (n -= e.e + 1, E[0] = v[(14 - n % 14) % 14], e.e = -n || 0) : E[0] = e.e = 0, e;
            if (0 == i ? (E.length = d, l = 1, d--) : (E.length = d + 1, l = v[14 - i], E[d] = c > 0 ? h(f / v[o - c] % v[c]) * l : 0), r) for (; ;) {
              if (0 == d) {
                for (i = 1, c = E[0]; c >= 10; c /= 10, i++) ;
                for (c = E[0] += l, l = 1; c >= 10; c /= 10, l++) ;
                i != l && (e.e++, E[0] == m && (E[0] = 1));
                break
              }
              if (E[d] += l, E[d] != m) break;
              E[d--] = 0, l = 1
            }
            for (i = E.length; 0 === E[--i]; E.pop()) ;
          }
          e.e > F ? e.c = e.e = null : e.e < B && (e.c = [e.e = 0])
        }
        return e
      }

      function X(e) {
        var n, t = e.e;
        return null === t ? e.toString() : (n = v(e.c), n = t <= j || t >= R ? _(n, t) : N(n, t, "0"), e.s < 0 ? "-" + n : n)
      }

      return K.clone = e, K.ROUND_UP = 0, K.ROUND_DOWN = 1, K.ROUND_CEIL = 2, K.ROUND_FLOOR = 3, K.ROUND_HALF_UP = 4, K.ROUND_HALF_DOWN = 5, K.ROUND_HALF_EVEN = 6, K.ROUND_HALF_CEIL = 7, K.ROUND_HALF_FLOOR = 8, K.EUCLID = 9, K.config = K.set = function (e) {
        var p, n;
        if (null != e) {
          if ("object" != typeof e) throw Error(f + "Object expected: " + e);
          if (e.hasOwnProperty(p = "DECIMAL_PLACES") && (S(n = e[p], 0, y, p), D = n), e.hasOwnProperty(p = "ROUNDING_MODE") && (S(n = e[p], 0, 8, p), L = n), e.hasOwnProperty(p = "EXPONENTIAL_AT") && ((n = e[p]) && n.pop ? (S(n[0], -y, 0, p), S(n[1], 0, y, p), j = n[0], R = n[1]) : (S(n, -y, y, p), j = -(R = n < 0 ? -n : n))), e.hasOwnProperty(p = "RANGE")) if ((n = e[p]) && n.pop) S(n[0], -y, -1, p), S(n[1], 1, y, p), B = n[0], F = n[1]; else {
            if (S(n, -y, y, p), !n) throw Error(f + p + " cannot be zero: " + n);
            B = -(F = n < 0 ? -n : n)
          }
          if (e.hasOwnProperty(p = "CRYPTO")) {
            if ((n = e[p]) !== !!n) throw Error(f + p + " not true or false: " + n);
            if (n) {
              if ("undefined" == typeof crypto || !crypto || !crypto.getRandomValues && !crypto.randomBytes) throw M = !n, Error(f + "crypto unavailable");
              M = n
            } else M = n
          }
          if (e.hasOwnProperty(p = "MODULO_MODE") && (S(n = e[p], 0, 9, p), z = n), e.hasOwnProperty(p = "POW_PRECISION") && (S(n = e[p], 0, y, p), G = n), e.hasOwnProperty(p = "FORMAT")) {
            if ("object" != typeof (n = e[p])) throw Error(f + p + " not an object: " + n);
            H = n
          }
          if (e.hasOwnProperty(p = "ALPHABET")) {
            if ("string" != typeof (n = e[p]) || /^.?$|[+\-.\s]|(.).*\1/.test(n)) throw Error(f + p + " invalid: " + n);
            V = n
          }
        }
        return {
          DECIMAL_PLACES: D,
          ROUNDING_MODE: L,
          EXPONENTIAL_AT: [j, R],
          RANGE: [B, F],
          CRYPTO: M,
          MODULO_MODE: z,
          POW_PRECISION: G,
          FORMAT: H,
          ALPHABET: V
        }
      }, K.isBigNumber = function (e) {
        if (!e || !0 !== e._isBigNumber) return !1;
        if (!K.DEBUG) return !0;
        var i, n, t = e.c, r = e.e, s = e.s;
        e:if ("[object Array]" == {}.toString.call(t)) {
          if ((1 === s || -1 === s) && r >= -y && r <= y && r === h(r)) {
            if (0 === t[0]) {
              if (0 === r && 1 === t.length) return !0;
              break e
            }
            if ((i = (r + 1) % 14) < 1 && (i += 14), String(t[0]).length == i) {
              for (i = 0; i < t.length; i++) if ((n = t[i]) < 0 || n >= m || n !== h(n)) break e;
              if (0 !== n) return !0
            }
          }
        } else if (null === t && null === r && (null === s || 1 === s || -1 === s)) return !0;
        throw Error(f + "Invalid BigNumber: " + e)
      }, K.maximum = K.max = function () {
        return Y(arguments, T.lt)
      }, K.minimum = K.min = function () {
        return Y(arguments, T.gt)
      }, K.random = (o = 9007199254740992 * Math.random() & 2097151 ? function () {
        return h(9007199254740992 * Math.random())
      } : function () {
        return 8388608 * (1073741824 * Math.random() | 0) + (8388608 * Math.random() | 0)
      }, function (e) {
        var a, b, n, t, r, i = 0, c = [], l = new K(P);
        if (null == e ? e = D : S(e, 0, y), t = k(e / 14), M) if (crypto.getRandomValues) {
          for (a = crypto.getRandomValues(new Uint32Array(t *= 2)); i < t;) (r = 131072 * a[i] + (a[i + 1] >>> 11)) >= 9e15 ? (b = crypto.getRandomValues(new Uint32Array(2)), a[i] = b[0], a[i + 1] = b[1]) : (c.push(r % 1e14), i += 2);
          i = t / 2
        } else {
          if (!crypto.randomBytes) throw M = !1, Error(f + "crypto unavailable");
          for (a = crypto.randomBytes(t *= 7); i < t;) (r = 281474976710656 * (31 & a[i]) + 1099511627776 * a[i + 1] + 4294967296 * a[i + 2] + 16777216 * a[i + 3] + (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6]) >= 9e15 ? crypto.randomBytes(7).copy(a, i) : (c.push(r % 1e14), i += 7);
          i = t / 7
        }
        if (!M) for (; i < t;) (r = o()) < 9e15 && (c[i++] = r % 1e14);
        for (e %= 14, (t = c[--i]) && e && (r = w[14 - e], c[i] = h(t / r) * r); 0 === c[i]; c.pop(), i--) ;
        if (i < 0) c = [n = 0]; else {
          for (n = -1; 0 === c[0]; c.splice(0, 1), n -= 14) ;
          for (i = 1, r = c[0]; r >= 10; r /= 10, i++) ;
          i < 14 && (n -= 14 - i)
        }
        return l.e = n, l.c = c, l
      }), K.sum = function () {
        for (var i = 1, e = arguments, n = new K(e[0]); i < e.length;) n = n.plus(e[i++]);
        return n
      }, t = function () {
        function e(e, n, t, r) {
          for (var o, c, l = [0], i = 0, k = e.length; i < k;) {
            for (c = l.length; c--; l[c] *= n) ;
            for (l[0] += r.indexOf(e.charAt(i++)), o = 0; o < l.length; o++) l[o] > t - 1 && (null == l[o + 1] && (l[o + 1] = 0), l[o + 1] += l[o] / t | 0, l[o] %= t)
          }
          return l.reverse()
        }

        return function (n, t, r, o, c) {
          var l, k, h, f, d, m, w, y, i = n.indexOf("."), E = D, x = L;
          for (i >= 0 && (f = G, G = 0, n = n.replace(".", ""), m = (y = new K(t)).pow(n.length - i), G = f, y.c = e(N(v(m.c), m.e, "0"), 10, r, "0123456789"), y.e = y.c.length), h = f = (w = e(n, t, r, c ? (l = V, "0123456789") : (l = "0123456789", V))).length; 0 == w[--f]; w.pop()) ;
          if (!w[0]) return l.charAt(0);
          if (i < 0 ? --h : (m.c = w, m.e = h, m.s = o, w = (m = div(m, y, E, x, r)).c, d = m.r, h = m.e), i = w[k = h + E + 1], f = r / 2, d = d || k < 0 || null != w[k + 1], d = x < 4 ? (null != i || d) && (0 == x || x == (m.s < 0 ? 3 : 2)) : i > f || i == f && (4 == x || d || 6 == x && 1 & w[k - 1] || x == (m.s < 0 ? 8 : 7)), k < 1 || !w[0]) n = d ? N(l.charAt(1), -E, l.charAt(0)) : l.charAt(0); else {
            if (w.length = k, d) for (--r; ++w[--k] > r;) w[k] = 0, k || (++h, w = [1].concat(w));
            for (f = w.length; !w[--f];) ;
            for (i = 0, n = ""; i <= f; n += l.charAt(w[i++])) ;
            n = N(n, h, l.charAt(0))
          }
          return n
        }
      }(), div = function () {
        function e(e, n, base) {
          var t, r, o, c, l = 0, i = e.length, k = n % 1e7, h = n / 1e7 | 0;
          for (e = e.slice(); i--;) l = ((r = k * (o = e[i] % 1e7) + (t = h * o + (c = e[i] / 1e7 | 0) * k) % 1e7 * 1e7 + l) / base | 0) + (t / 1e7 | 0) + h * c, e[i] = r % base;
          return l && (e = [l].concat(e)), e
        }

        function n(a, b, e, n) {
          var i, t;
          if (e != n) t = e > n ? 1 : -1; else for (i = t = 0; i < e; i++) if (a[i] != b[i]) {
            t = a[i] > b[i] ? 1 : -1;
            break
          }
          return t
        }

        function t(a, b, e, base) {
          for (var i = 0; e--;) a[e] -= i, i = a[e] < b[e] ? 1 : 0, a[e] = i * base + a[e] - b[e];
          for (; !a[0] && a.length > 1; a.splice(0, 1)) ;
        }

        return function (r, o, c, l, base) {
          var k, f, i, d, w, y, v, q, x, S, A, _, N, I, C, O, U, s = r.s == o.s ? 1 : -1, T = r.c, P = o.c;
          if (!(T && T[0] && P && P[0])) return new K(r.s && o.s && (T ? !P || T[0] != P[0] : P) ? T && 0 == T[0] || !P ? 0 * s : s / 0 : NaN);
          for (x = (q = new K(s)).c = [], s = c + (f = r.e - o.e) + 1, base || (base = m, f = E(r.e / 14) - E(o.e / 14), s = s / 14 | 0), i = 0; P[i] == (T[i] || 0); i++) ;
          if (P[i] > (T[i] || 0) && f--, s < 0) x.push(1), d = !0; else {
            for (I = T.length, O = P.length, i = 0, s += 2, (w = h(base / (P[0] + 1))) > 1 && (P = e(P, w, base), T = e(T, w, base), O = P.length, I = T.length), N = O, A = (S = T.slice(0, O)).length; A < O; S[A++] = 0) ;
            U = P.slice(), U = [0].concat(U), C = P[0], P[1] >= base / 2 && C++;
            do {
              if (w = 0, (k = n(P, S, O, A)) < 0) {
                if (_ = S[0], O != A && (_ = _ * base + (S[1] || 0)), (w = h(_ / C)) > 1) for (w >= base && (w = base - 1), v = (y = e(P, w, base)).length, A = S.length; 1 == n(y, S, v, A);) w--, t(y, O < v ? U : P, v, base), v = y.length, k = 1; else 0 == w && (k = w = 1), v = (y = P.slice()).length;
                if (v < A && (y = [0].concat(y)), t(S, y, A, base), A = S.length, -1 == k) for (; n(P, S, O, A) < 1;) w++, t(S, O < A ? U : P, A, base), A = S.length
              } else 0 === k && (w++, S = [0]);
              x[i++] = w, S[0] ? S[A++] = T[N] || 0 : (S = [T[N]], A = 1)
            } while ((N++ < I || null != S[0]) && s--);
            d = null != S[0], x[0] || x.splice(0, 1)
          }
          if (base == m) {
            for (i = 1, s = x[0]; s >= 10; s /= 10, i++) ;
            W(q, c + (q.e = i + 14 * f - 1) + 1, l, d)
          } else q.e = f, q.r = +d;
          return q
        }
      }(), c = /^(-?)0([xbo])(?=\w[\w.]*$)/i, I = /^([^.]+)\.$/, C = /^\.([^.]+)$/, O = /^-?(Infinity|NaN)$/, U = /^\s*\+(?=[\w.])|^\s+|\s+$/g, r = function (e, n, t, b) {
        var base, s = t ? n : n.replace(U, "");
        if (O.test(s)) e.s = isNaN(s) ? null : s < 0 ? -1 : 1; else {
          if (!t && (s = s.replace(c, (function (e, n, t) {
            return base = "x" == (t = t.toLowerCase()) ? 16 : "b" == t ? 2 : 8, b && b != base ? e : n
          })), b && (base = b, s = s.replace(I, "$1").replace(C, "0.$1")), n != s)) return new K(s, base);
          if (K.DEBUG) throw Error(f + "Not a" + (b ? " base " + b : "") + " number: " + n);
          e.s = null
        }
        e.c = e.e = null
      }, T.absoluteValue = T.abs = function () {
        var e = new K(this);
        return e.s < 0 && (e.s = 1), e
      }, T.comparedTo = function (e, b) {
        return x(this, new K(e, b))
      }, T.decimalPlaces = T.dp = function (e, n) {
        var t, r, o, c = this;
        if (null != e) return S(e, 0, y), null == n ? n = L : S(n, 0, 8), W(new K(c), e + c.e + 1, n);
        if (!(t = c.c)) return null;
        if (r = 14 * ((o = t.length - 1) - E(this.e / 14)), o = t[o]) for (; o % 10 == 0; o /= 10, r--) ;
        return r < 0 && (r = 0), r
      }, T.dividedBy = T.div = function (e, b) {
        return div(this, new K(e, b), D, L)
      }, T.dividedToIntegerBy = T.idiv = function (e, b) {
        return div(this, new K(e, b), 0, 1)
      }, T.exponentiatedBy = T.pow = function (e, n) {
        var t, r, i, o, c, l, d, m, w = this;
        if ((e = new K(e)).c && !e.isInteger()) throw Error(f + "Exponent not an integer: " + X(e));
        if (null != n && (n = new K(n)), c = e.e > 14, !w.c || !w.c[0] || 1 == w.c[0] && !w.e && 1 == w.c.length || !e.c || !e.c[0]) return m = new K(Math.pow(+X(w), c ? 2 - A(e) : +X(e))), n ? m.mod(n) : m;
        if (l = e.s < 0, n) {
          if (n.c ? !n.c[0] : !n.s) return new K(NaN);
          (r = !l && w.isInteger() && n.isInteger()) && (w = w.mod(n))
        } else {
          if (e.e > 9 && (w.e > 0 || w.e < -1 || (0 == w.e ? w.c[0] > 1 || c && w.c[1] >= 24e7 : w.c[0] < 8e13 || c && w.c[0] <= 9999975e7))) return o = w.s < 0 && A(e) ? -0 : 0, w.e > -1 && (o = 1 / o), new K(l ? 1 / o : o);
          G && (o = k(G / 14 + 2))
        }
        for (c ? (t = new K(.5), l && (e.s = 1), d = A(e)) : d = (i = Math.abs(+X(e))) % 2, m = new K(P); ;) {
          if (d) {
            if (!(m = m.times(w)).c) break;
            o ? m.c.length > o && (m.c.length = o) : r && (m = m.mod(n))
          }
          if (i) {
            if (0 === (i = h(i / 2))) break;
            d = i % 2
          } else if (W(e = e.times(t), e.e + 1, 1), e.e > 14) d = A(e); else {
            if (0 === (i = +X(e))) break;
            d = i % 2
          }
          w = w.times(w), o ? w.c && w.c.length > o && (w.c.length = o) : r && (w = w.mod(n))
        }
        return r ? m : (l && (m = P.div(m)), n ? m.mod(n) : o ? W(m, G, L, void 0) : m)
      }, T.integerValue = function (e) {
        var n = new K(this);
        return null == e ? e = L : S(e, 0, 8), W(n, n.e + 1, e)
      }, T.isEqualTo = T.eq = function (e, b) {
        return 0 === x(this, new K(e, b))
      }, T.isFinite = function () {
        return !!this.c
      }, T.isGreaterThan = T.gt = function (e, b) {
        return x(this, new K(e, b)) > 0
      }, T.isGreaterThanOrEqualTo = T.gte = function (e, b) {
        return 1 === (b = x(this, new K(e, b))) || 0 === b
      }, T.isInteger = function () {
        return !!this.c && E(this.e / 14) > this.c.length - 2
      }, T.isLessThan = T.lt = function (e, b) {
        return x(this, new K(e, b)) < 0
      }, T.isLessThanOrEqualTo = T.lte = function (e, b) {
        return -1 === (b = x(this, new K(e, b))) || 0 === b
      }, T.isNaN = function () {
        return !this.s
      }, T.isNegative = function () {
        return this.s < 0
      }, T.isPositive = function () {
        return this.s > 0
      }, T.isZero = function () {
        return !!this.c && 0 == this.c[0]
      }, T.minus = function (e, b) {
        var i, n, t, r, o = this, a = o.s;
        if (b = (e = new K(e, b)).s, !a || !b) return new K(NaN);
        if (a != b) return e.s = -b, o.plus(e);
        var c = o.e / 14, l = e.e / 14, k = o.c, h = e.c;
        if (!c || !l) {
          if (!k || !h) return k ? (e.s = -b, e) : new K(h ? o : NaN);
          if (!k[0] || !h[0]) return h[0] ? (e.s = -b, e) : new K(k[0] ? o : 3 == L ? -0 : 0)
        }
        if (c = E(c), l = E(l), k = k.slice(), a = c - l) {
          for ((r = a < 0) ? (a = -a, t = k) : (l = c, t = h), t.reverse(), b = a; b--; t.push(0)) ;
          t.reverse()
        } else for (n = (r = (a = k.length) < (b = h.length)) ? a : b, a = b = 0; b < n; b++) if (k[b] != h[b]) {
          r = k[b] < h[b];
          break
        }
        if (r && (t = k, k = h, h = t, e.s = -e.s), (b = (n = h.length) - (i = k.length)) > 0) for (; b--; k[i++] = 0) ;
        for (b = m - 1; n > a;) {
          if (k[--n] < h[n]) {
            for (i = n; i && !k[--i]; k[i] = b) ;
            --k[i], k[n] += m
          }
          k[n] -= h[n]
        }
        for (; 0 == k[0]; k.splice(0, 1), --l) ;
        return k[0] ? J(e, k, l) : (e.s = 3 == L ? -1 : 1, e.c = [e.e = 0], e)
      }, T.modulo = T.mod = function (e, b) {
        var q, s, n = this;
        return e = new K(e, b), !n.c || !e.s || e.c && !e.c[0] ? new K(NaN) : !e.c || n.c && !n.c[0] ? new K(n) : (9 == z ? (s = e.s, e.s = 1, q = div(n, e, 0, 3), e.s = s, q.s *= s) : q = div(n, e, 0, z), (e = n.minus(q.times(e))).c[0] || 1 != z || (e.s = n.s), e)
      }, T.multipliedBy = T.times = function (e, b) {
        var n, t, i, r, o, c, l, k, h, f, d, w, y, base, v = this, x = v.c, S = (e = new K(e, b)).c;
        if (!(x && S && x[0] && S[0])) return !v.s || !e.s || x && !x[0] && !S || S && !S[0] && !x ? e.c = e.e = e.s = null : (e.s *= v.s, x && S ? (e.c = [0], e.e = 0) : e.c = e.e = null), e;
        for (t = E(v.e / 14) + E(e.e / 14), e.s *= v.s, (l = x.length) < (f = S.length) && (y = x, x = S, S = y, i = l, l = f, f = i), i = l + f, y = []; i--; y.push(0)) ;
        for (base = m, 1e7, i = f; --i >= 0;) {
          for (n = 0, d = S[i] % 1e7, w = S[i] / 1e7 | 0, r = i + (o = l); r > i;) n = ((k = d * (k = x[--o] % 1e7) + (c = w * k + (h = x[o] / 1e7 | 0) * d) % 1e7 * 1e7 + y[r] + n) / base | 0) + (c / 1e7 | 0) + w * h, y[r--] = k % base;
          y[r] = n
        }
        return n ? ++t : y.splice(0, 1), J(e, y, t)
      }, T.negated = function () {
        var e = new K(this);
        return e.s = -e.s || null, e
      }, T.plus = function (e, b) {
        var n, t = this, a = t.s;
        if (b = (e = new K(e, b)).s, !a || !b) return new K(NaN);
        if (a != b) return e.s = -b, t.minus(e);
        var r = t.e / 14, o = e.e / 14, c = t.c, l = e.c;
        if (!r || !o) {
          if (!c || !l) return new K(a / 0);
          if (!c[0] || !l[0]) return l[0] ? e : new K(c[0] ? t : 0 * a)
        }
        if (r = E(r), o = E(o), c = c.slice(), a = r - o) {
          for (a > 0 ? (o = r, n = l) : (a = -a, n = c), n.reverse(); a--; n.push(0)) ;
          n.reverse()
        }
        for ((a = c.length) - (b = l.length) < 0 && (n = l, l = c, c = n, b = a), a = 0; b;) a = (c[--b] = c[b] + l[b] + a) / m | 0, c[b] = m === c[b] ? 0 : c[b] % m;
        return a && (c = [a].concat(c), ++o), J(e, c, o)
      }, T.precision = T.sd = function (e, n) {
        var t, r, o, c = this;
        if (null != e && e !== !!e) return S(e, 1, y), null == n ? n = L : S(n, 0, 8), W(new K(c), e, n);
        if (!(t = c.c)) return null;
        if (r = 14 * (o = t.length - 1) + 1, o = t[o]) {
          for (; o % 10 == 0; o /= 10, r--) ;
          for (o = t[0]; o >= 10; o /= 10, r++) ;
        }
        return e && c.e + 1 > r && (r = c.e + 1), r
      }, T.shiftedBy = function (e) {
        return S(e, -9007199254740991, 9007199254740991), this.times("1e" + e)
      }, T.squareRoot = T.sqrt = function () {
        var e, n, t, r, o, c = this, l = c.c, s = c.s, k = c.e, h = D + 4, f = new K("0.5");
        if (1 !== s || !l || !l[0]) return new K(!s || s < 0 && (!l || l[0]) ? NaN : l ? c : 1 / 0);
        if (0 == (s = Math.sqrt(+X(c))) || s == 1 / 0 ? (((n = v(l)).length + k) % 2 == 0 && (n += "0"), s = Math.sqrt(+n), k = E((k + 1) / 2) - (k < 0 || k % 2), t = new K(n = s == 1 / 0 ? "5e" + k : (n = s.toExponential()).slice(0, n.indexOf("e") + 1) + k)) : t = new K(s + ""), t.c[0]) for ((s = (k = t.e) + h) < 3 && (s = 0); ;) if (o = t, t = f.times(o.plus(div(c, o, h, 1))), v(o.c).slice(0, s) === (n = v(t.c)).slice(0, s)) {
          if (t.e < k && --s, "9999" != (n = n.slice(s - 3, s + 1)) && (r || "4999" != n)) {
            +n && (+n.slice(1) || "5" != n.charAt(0)) || (W(t, t.e + D + 2, 1), e = !t.times(t).eq(c));
            break
          }
          if (!r && (W(o, o.e + D + 2, 0), o.times(o).eq(c))) {
            t = o;
            break
          }
          h += 4, s += 4, r = 1
        }
        return W(t, t.e + D + 1, L, e)
      }, T.toExponential = function (e, n) {
        return null != e && (S(e, 0, y), e++), $(this, e, n, 1)
      }, T.toFixed = function (e, n) {
        return null != e && (S(e, 0, y), e = e + this.e + 1), $(this, e, n)
      }, T.toFormat = function (e, n, t) {
        var r, o = this;
        if (null == t) null != e && n && "object" == typeof n ? (t = n, n = null) : e && "object" == typeof e ? (t = e, e = n = null) : t = H; else if ("object" != typeof t) throw Error(f + "Argument not an object: " + t);
        if (r = o.toFixed(e, n), o.c) {
          var i, c = r.split("."), l = +t.groupSize, k = +t.secondaryGroupSize, h = t.groupSeparator || "", d = c[0],
            m = c[1], w = o.s < 0, y = w ? d.slice(1) : d, E = y.length;
          if (k && (i = l, l = k, k = i, E -= i), l > 0 && E > 0) {
            for (i = E % l || l, d = y.substr(0, i); i < E; i += l) d += h + y.substr(i, l);
            k > 0 && (d += h + y.slice(i)), w && (d = "-" + d)
          }
          r = m ? d + (t.decimalSeparator || "") + ((k = +t.fractionGroupSize) ? m.replace(new RegExp("\\d{" + k + "}\\B", "g"), "$&" + (t.fractionGroupSeparator || "")) : m) : d
        }
        return (t.prefix || "") + r + (t.suffix || "")
      }, T.toFraction = function (e) {
        var n, t, r, o, c, l, k, h, d, q, m, s, y = this, E = y.c;
        if (null != e && (!(k = new K(e)).isInteger() && (k.c || 1 !== k.s) || k.lt(P))) throw Error(f + "Argument " + (k.isInteger() ? "out of range: " : "not an integer: ") + X(k));
        if (!E) return new K(y);
        for (n = new K(P), d = t = new K(P), r = h = new K(P), s = v(E), c = n.e = s.length - y.e - 1, n.c[0] = w[(l = c % 14) < 0 ? 14 + l : l], e = !e || k.comparedTo(n) > 0 ? c > 0 ? n : d : k, l = F, F = 1 / 0, k = new K(s), h.c[0] = 0; q = div(k, n, 0, 1), 1 != (o = t.plus(q.times(r))).comparedTo(e);) t = r, r = o, d = h.plus(q.times(o = d)), h = o, n = k.minus(q.times(o = n)), k = o;
        return o = div(e.minus(t), r, 0, 1), h = h.plus(o.times(d)), t = t.plus(o.times(r)), h.s = d.s = y.s, m = div(d, r, c *= 2, L).minus(y).abs().comparedTo(div(h, t, c, L).minus(y).abs()) < 1 ? [d, r] : [h, t], F = l, m
      }, T.toNumber = function () {
        return +X(this)
      }, T.toPrecision = function (e, n) {
        return null != e && S(e, 1, y), $(this, e, n, 2)
      }, T.toString = function (b) {
        var e, n = this, s = n.s, r = n.e;
        return null === r ? s ? (e = "Infinity", s < 0 && (e = "-" + e)) : e = "NaN" : (null == b ? e = r <= j || r >= R ? _(v(n.c), r) : N(v(n.c), r, "0") : 10 === b ? e = N(v((n = W(new K(n), D + r + 1, L)).c), n.e, "0") : (S(b, 2, V.length, "Base"), e = t(N(v(n.c), r, "0"), 10, b, s, !0)), s < 0 && n.c[0] && (e = "-" + e)), e
      }, T.valueOf = T.toJSON = function () {
        return X(this)
      }, T._isBigNumber = !0, null != n && K.set(n), K
    }()).default = c.BigNumber = c, void 0 === (r = function () {
      return c
    }.call(n, t, n, e)) || (e.exports = r)
  }()
}, function (e, n, t) {
  "use strict";
  const r = t(769), o = t(348), c = t(717);
  e.exports = o(class {
    constructor(e, n, t) {
      if (!t) throw new Error("A link requires a cid to point to");
      Object.defineProperties(this, {
        Name: {value: e || "", writable: !1, enumerable: !0},
        Tsize: {value: n, writable: !1, enumerable: !0},
        Hash: {value: new r(t), writable: !1, enumerable: !0},
        _nameBuf: {value: null, writable: !0, enumerable: !1}
      })
    }

    toString() {
      return `DAGLink <${this.Hash.toBaseEncodedString()} - name: "${this.Name}", size: ${this.Tsize}>`
    }

    toJSON() {
      return this._json || (this._json = Object.freeze({
        name: this.Name,
        size: this.Tsize,
        cid: this.Hash.toBaseEncodedString()
      })), Object.assign({}, this._json)
    }

    get nameAsBuffer() {
      return null !== this._nameBuf || (this._nameBuf = c(this.Name)), this._nameBuf
    }
  }, {className: "DAGLink", symbolName: "@ipld/js-ipld-dag-pb/daglink"})
}, , , , , , function (e, n, t) {
  "use strict";
  const r = t(773), o = t(901), {names: c} = t(905), l = t(712), k = t(717), h = t(718), f = {};
  for (const e in c) f[c[e]] = e;

  function d(e) {
    if (!(e instanceof Uint8Array)) throw new Error("multihash must be a Uint8Array");
    if (e.length < 2) throw new Error("multihash too short. must be > 2 bytes.");
    const code = o.decode(e);
    if (!y(code)) throw new Error("multihash unknown function code: 0x" + code.toString(16));
    e = e.slice(o.decode.bytes);
    const n = o.decode(e);
    if (n < 0) throw new Error("multihash invalid length: " + n);
    if ((e = e.slice(o.decode.bytes)).length !== n) throw new Error("multihash length inconsistent: 0x" + l(e, "base16"));
    return {code: code, name: f[code], length: n, digest: e}
  }

  function m(e) {
    let code = e;
    if ("string" == typeof e) {
      if (void 0 === c[e]) throw new Error("Unrecognized hash function named: " + e);
      code = c[e]
    }
    if ("number" != typeof code) throw new Error("Hash function code should be a number. Got: " + code);
    if (void 0 === f[code] && !w(code)) throw new Error("Unrecognized function code: " + code);
    return code
  }

  function w(code) {
    return code > 0 && code < 16
  }

  function y(code) {
    return !!w(code) || !!f[code]
  }

  function E(e) {
    d(e)
  }

  e.exports = {
    names: c, codes: Object.freeze(f), toHexString: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(e, "base16")
    }, fromHexString: function (e) {
      return k(e, "base16")
    }, toB58String: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(r.encode("base58btc", e)).slice(1)
    }, fromB58String: function (e) {
      const n = e instanceof Uint8Array ? l(e) : e;
      return r.decode("z" + n)
    }, decode: d, encode: function (e, code, n) {
      if (!e || void 0 === code) throw new Error("multihash encode requires at least two args: digest, code");
      const t = m(code);
      if (!(e instanceof Uint8Array)) throw new Error("digest should be a Uint8Array");
      if (null == n && (n = e.length), n && e.length !== n) throw new Error("digest length should be equal to specified length.");
      const r = o.encode(t), c = o.encode(n);
      return h([r, c, e], r.length + c.length + e.length)
    }, coerceCode: m, isAppCode: w, validate: E, prefix: function (e) {
      return E(e), e.subarray(0, 2)
    }, isValidCode: y
  }
}, function (e) {
  e.exports = JSON.parse('{"identity":0,"ip4":4,"tcp":6,"sha1":17,"sha2-256":18,"sha2-512":19,"sha3-512":20,"sha3-384":21,"sha3-256":22,"sha3-224":23,"shake-128":24,"shake-256":25,"keccak-224":26,"keccak-256":27,"keccak-384":28,"keccak-512":29,"blake3":30,"dccp":33,"murmur3-128":34,"murmur3-32":35,"ip6":41,"ip6zone":42,"path":47,"multicodec":48,"multihash":49,"multiaddr":50,"multibase":51,"dns":53,"dns4":54,"dns6":55,"dnsaddr":56,"protobuf":80,"cbor":81,"raw":85,"dbl-sha2-256":86,"rlp":96,"bencode":99,"dag-pb":112,"dag-cbor":113,"libp2p-key":114,"git-raw":120,"torrent-info":123,"torrent-file":124,"leofcoin-block":129,"leofcoin-tx":130,"leofcoin-pr":131,"sctp":132,"dag-jose":133,"dag-cose":134,"eth-block":144,"eth-block-list":145,"eth-tx-trie":146,"eth-tx":147,"eth-tx-receipt-trie":148,"eth-tx-receipt":149,"eth-state-trie":150,"eth-account-snapshot":151,"eth-storage-trie":152,"bitcoin-block":176,"bitcoin-tx":177,"bitcoin-witness-commitment":178,"zcash-block":192,"zcash-tx":193,"stellar-block":208,"stellar-tx":209,"md4":212,"md5":213,"bmt":214,"decred-block":224,"decred-tx":225,"ipld-ns":226,"ipfs-ns":227,"swarm-ns":228,"ipns-ns":229,"zeronet":230,"secp256k1-pub":231,"bls12_381-g1-pub":234,"bls12_381-g2-pub":235,"x25519-pub":236,"ed25519-pub":237,"dash-block":240,"dash-tx":241,"swarm-manifest":250,"swarm-feed":251,"udp":273,"p2p-webrtc-star":275,"p2p-webrtc-direct":276,"p2p-stardust":277,"p2p-circuit":290,"dag-json":297,"udt":301,"utp":302,"unix":400,"p2p":421,"ipfs":421,"https":443,"onion":444,"onion3":445,"garlic64":446,"garlic32":447,"tls":448,"quic":460,"ws":477,"wss":478,"p2p-websocket-star":479,"http":480,"json":512,"messagepack":513,"libp2p-peer-record":769,"sha2-256-trunc254-padded":4114,"ripemd-128":4178,"ripemd-160":4179,"ripemd-256":4180,"ripemd-320":4181,"x11":4352,"sm3-256":21325,"blake2b-8":45569,"blake2b-16":45570,"blake2b-24":45571,"blake2b-32":45572,"blake2b-40":45573,"blake2b-48":45574,"blake2b-56":45575,"blake2b-64":45576,"blake2b-72":45577,"blake2b-80":45578,"blake2b-88":45579,"blake2b-96":45580,"blake2b-104":45581,"blake2b-112":45582,"blake2b-120":45583,"blake2b-128":45584,"blake2b-136":45585,"blake2b-144":45586,"blake2b-152":45587,"blake2b-160":45588,"blake2b-168":45589,"blake2b-176":45590,"blake2b-184":45591,"blake2b-192":45592,"blake2b-200":45593,"blake2b-208":45594,"blake2b-216":45595,"blake2b-224":45596,"blake2b-232":45597,"blake2b-240":45598,"blake2b-248":45599,"blake2b-256":45600,"blake2b-264":45601,"blake2b-272":45602,"blake2b-280":45603,"blake2b-288":45604,"blake2b-296":45605,"blake2b-304":45606,"blake2b-312":45607,"blake2b-320":45608,"blake2b-328":45609,"blake2b-336":45610,"blake2b-344":45611,"blake2b-352":45612,"blake2b-360":45613,"blake2b-368":45614,"blake2b-376":45615,"blake2b-384":45616,"blake2b-392":45617,"blake2b-400":45618,"blake2b-408":45619,"blake2b-416":45620,"blake2b-424":45621,"blake2b-432":45622,"blake2b-440":45623,"blake2b-448":45624,"blake2b-456":45625,"blake2b-464":45626,"blake2b-472":45627,"blake2b-480":45628,"blake2b-488":45629,"blake2b-496":45630,"blake2b-504":45631,"blake2b-512":45632,"blake2s-8":45633,"blake2s-16":45634,"blake2s-24":45635,"blake2s-32":45636,"blake2s-40":45637,"blake2s-48":45638,"blake2s-56":45639,"blake2s-64":45640,"blake2s-72":45641,"blake2s-80":45642,"blake2s-88":45643,"blake2s-96":45644,"blake2s-104":45645,"blake2s-112":45646,"blake2s-120":45647,"blake2s-128":45648,"blake2s-136":45649,"blake2s-144":45650,"blake2s-152":45651,"blake2s-160":45652,"blake2s-168":45653,"blake2s-176":45654,"blake2s-184":45655,"blake2s-192":45656,"blake2s-200":45657,"blake2s-208":45658,"blake2s-216":45659,"blake2s-224":45660,"blake2s-232":45661,"blake2s-240":45662,"blake2s-248":45663,"blake2s-256":45664,"skein256-8":45825,"skein256-16":45826,"skein256-24":45827,"skein256-32":45828,"skein256-40":45829,"skein256-48":45830,"skein256-56":45831,"skein256-64":45832,"skein256-72":45833,"skein256-80":45834,"skein256-88":45835,"skein256-96":45836,"skein256-104":45837,"skein256-112":45838,"skein256-120":45839,"skein256-128":45840,"skein256-136":45841,"skein256-144":45842,"skein256-152":45843,"skein256-160":45844,"skein256-168":45845,"skein256-176":45846,"skein256-184":45847,"skein256-192":45848,"skein256-200":45849,"skein256-208":45850,"skein256-216":45851,"skein256-224":45852,"skein256-232":45853,"skein256-240":45854,"skein256-248":45855,"skein256-256":45856,"skein512-8":45857,"skein512-16":45858,"skein512-24":45859,"skein512-32":45860,"skein512-40":45861,"skein512-48":45862,"skein512-56":45863,"skein512-64":45864,"skein512-72":45865,"skein512-80":45866,"skein512-88":45867,"skein512-96":45868,"skein512-104":45869,"skein512-112":45870,"skein512-120":45871,"skein512-128":45872,"skein512-136":45873,"skein512-144":45874,"skein512-152":45875,"skein512-160":45876,"skein512-168":45877,"skein512-176":45878,"skein512-184":45879,"skein512-192":45880,"skein512-200":45881,"skein512-208":45882,"skein512-216":45883,"skein512-224":45884,"skein512-232":45885,"skein512-240":45886,"skein512-248":45887,"skein512-256":45888,"skein512-264":45889,"skein512-272":45890,"skein512-280":45891,"skein512-288":45892,"skein512-296":45893,"skein512-304":45894,"skein512-312":45895,"skein512-320":45896,"skein512-328":45897,"skein512-336":45898,"skein512-344":45899,"skein512-352":45900,"skein512-360":45901,"skein512-368":45902,"skein512-376":45903,"skein512-384":45904,"skein512-392":45905,"skein512-400":45906,"skein512-408":45907,"skein512-416":45908,"skein512-424":45909,"skein512-432":45910,"skein512-440":45911,"skein512-448":45912,"skein512-456":45913,"skein512-464":45914,"skein512-472":45915,"skein512-480":45916,"skein512-488":45917,"skein512-496":45918,"skein512-504":45919,"skein512-512":45920,"skein1024-8":45921,"skein1024-16":45922,"skein1024-24":45923,"skein1024-32":45924,"skein1024-40":45925,"skein1024-48":45926,"skein1024-56":45927,"skein1024-64":45928,"skein1024-72":45929,"skein1024-80":45930,"skein1024-88":45931,"skein1024-96":45932,"skein1024-104":45933,"skein1024-112":45934,"skein1024-120":45935,"skein1024-128":45936,"skein1024-136":45937,"skein1024-144":45938,"skein1024-152":45939,"skein1024-160":45940,"skein1024-168":45941,"skein1024-176":45942,"skein1024-184":45943,"skein1024-192":45944,"skein1024-200":45945,"skein1024-208":45946,"skein1024-216":45947,"skein1024-224":45948,"skein1024-232":45949,"skein1024-240":45950,"skein1024-248":45951,"skein1024-256":45952,"skein1024-264":45953,"skein1024-272":45954,"skein1024-280":45955,"skein1024-288":45956,"skein1024-296":45957,"skein1024-304":45958,"skein1024-312":45959,"skein1024-320":45960,"skein1024-328":45961,"skein1024-336":45962,"skein1024-344":45963,"skein1024-352":45964,"skein1024-360":45965,"skein1024-368":45966,"skein1024-376":45967,"skein1024-384":45968,"skein1024-392":45969,"skein1024-400":45970,"skein1024-408":45971,"skein1024-416":45972,"skein1024-424":45973,"skein1024-432":45974,"skein1024-440":45975,"skein1024-448":45976,"skein1024-456":45977,"skein1024-464":45978,"skein1024-472":45979,"skein1024-480":45980,"skein1024-488":45981,"skein1024-496":45982,"skein1024-504":45983,"skein1024-512":45984,"skein1024-520":45985,"skein1024-528":45986,"skein1024-536":45987,"skein1024-544":45988,"skein1024-552":45989,"skein1024-560":45990,"skein1024-568":45991,"skein1024-576":45992,"skein1024-584":45993,"skein1024-592":45994,"skein1024-600":45995,"skein1024-608":45996,"skein1024-616":45997,"skein1024-624":45998,"skein1024-632":45999,"skein1024-640":46000,"skein1024-648":46001,"skein1024-656":46002,"skein1024-664":46003,"skein1024-672":46004,"skein1024-680":46005,"skein1024-688":46006,"skein1024-696":46007,"skein1024-704":46008,"skein1024-712":46009,"skein1024-720":46010,"skein1024-728":46011,"skein1024-736":46012,"skein1024-744":46013,"skein1024-752":46014,"skein1024-760":46015,"skein1024-768":46016,"skein1024-776":46017,"skein1024-784":46018,"skein1024-792":46019,"skein1024-800":46020,"skein1024-808":46021,"skein1024-816":46022,"skein1024-824":46023,"skein1024-832":46024,"skein1024-840":46025,"skein1024-848":46026,"skein1024-856":46027,"skein1024-864":46028,"skein1024-872":46029,"skein1024-880":46030,"skein1024-888":46031,"skein1024-896":46032,"skein1024-904":46033,"skein1024-912":46034,"skein1024-920":46035,"skein1024-928":46036,"skein1024-936":46037,"skein1024-944":46038,"skein1024-952":46039,"skein1024-960":46040,"skein1024-968":46041,"skein1024-976":46042,"skein1024-984":46043,"skein1024-992":46044,"skein1024-1000":46045,"skein1024-1008":46046,"skein1024-1016":46047,"skein1024-1024":46048,"poseidon-bls12_381-a2-fc1":46081,"poseidon-bls12_381-a2-fc1-sc":46082,"zeroxcert-imprint-256":52753,"fil-commitment-unsealed":61697,"fil-commitment-sealed":61698,"holochain-adr-v0":8417572,"holochain-adr-v1":8483108,"holochain-key-v0":9728292,"holochain-key-v1":9793828,"holochain-sig-v0":10645796,"holochain-sig-v1":10711332}')
}, function (e) {
  e.exports = JSON.parse('{"identity":0,"ip4":4,"tcp":6,"sha1":17,"sha2-256":18,"sha2-512":19,"sha3-512":20,"sha3-384":21,"sha3-256":22,"sha3-224":23,"shake-128":24,"shake-256":25,"keccak-224":26,"keccak-256":27,"keccak-384":28,"keccak-512":29,"blake3":30,"dccp":33,"murmur3-128":34,"murmur3-32":35,"ip6":41,"ip6zone":42,"path":47,"multicodec":48,"multihash":49,"multiaddr":50,"multibase":51,"dns":53,"dns4":54,"dns6":55,"dnsaddr":56,"protobuf":80,"cbor":81,"raw":85,"dbl-sha2-256":86,"rlp":96,"bencode":99,"dag-pb":112,"dag-cbor":113,"libp2p-key":114,"git-raw":120,"torrent-info":123,"torrent-file":124,"leofcoin-block":129,"leofcoin-tx":130,"leofcoin-pr":131,"sctp":132,"dag-jose":133,"dag-cose":134,"eth-block":144,"eth-block-list":145,"eth-tx-trie":146,"eth-tx":147,"eth-tx-receipt-trie":148,"eth-tx-receipt":149,"eth-state-trie":150,"eth-account-snapshot":151,"eth-storage-trie":152,"bitcoin-block":176,"bitcoin-tx":177,"bitcoin-witness-commitment":178,"zcash-block":192,"zcash-tx":193,"stellar-block":208,"stellar-tx":209,"md4":212,"md5":213,"bmt":214,"decred-block":224,"decred-tx":225,"ipld-ns":226,"ipfs-ns":227,"swarm-ns":228,"ipns-ns":229,"zeronet":230,"secp256k1-pub":231,"bls12_381-g1-pub":234,"bls12_381-g2-pub":235,"x25519-pub":236,"ed25519-pub":237,"dash-block":240,"dash-tx":241,"swarm-manifest":250,"swarm-feed":251,"udp":273,"p2p-webrtc-star":275,"p2p-webrtc-direct":276,"p2p-stardust":277,"p2p-circuit":290,"dag-json":297,"udt":301,"utp":302,"unix":400,"p2p":421,"ipfs":421,"https":443,"onion":444,"onion3":445,"garlic64":446,"garlic32":447,"tls":448,"quic":460,"ws":477,"wss":478,"p2p-websocket-star":479,"http":480,"json":512,"messagepack":513,"libp2p-peer-record":769,"sha2-256-trunc254-padded":4114,"ripemd-128":4178,"ripemd-160":4179,"ripemd-256":4180,"ripemd-320":4181,"x11":4352,"sm3-256":21325,"blake2b-8":45569,"blake2b-16":45570,"blake2b-24":45571,"blake2b-32":45572,"blake2b-40":45573,"blake2b-48":45574,"blake2b-56":45575,"blake2b-64":45576,"blake2b-72":45577,"blake2b-80":45578,"blake2b-88":45579,"blake2b-96":45580,"blake2b-104":45581,"blake2b-112":45582,"blake2b-120":45583,"blake2b-128":45584,"blake2b-136":45585,"blake2b-144":45586,"blake2b-152":45587,"blake2b-160":45588,"blake2b-168":45589,"blake2b-176":45590,"blake2b-184":45591,"blake2b-192":45592,"blake2b-200":45593,"blake2b-208":45594,"blake2b-216":45595,"blake2b-224":45596,"blake2b-232":45597,"blake2b-240":45598,"blake2b-248":45599,"blake2b-256":45600,"blake2b-264":45601,"blake2b-272":45602,"blake2b-280":45603,"blake2b-288":45604,"blake2b-296":45605,"blake2b-304":45606,"blake2b-312":45607,"blake2b-320":45608,"blake2b-328":45609,"blake2b-336":45610,"blake2b-344":45611,"blake2b-352":45612,"blake2b-360":45613,"blake2b-368":45614,"blake2b-376":45615,"blake2b-384":45616,"blake2b-392":45617,"blake2b-400":45618,"blake2b-408":45619,"blake2b-416":45620,"blake2b-424":45621,"blake2b-432":45622,"blake2b-440":45623,"blake2b-448":45624,"blake2b-456":45625,"blake2b-464":45626,"blake2b-472":45627,"blake2b-480":45628,"blake2b-488":45629,"blake2b-496":45630,"blake2b-504":45631,"blake2b-512":45632,"blake2s-8":45633,"blake2s-16":45634,"blake2s-24":45635,"blake2s-32":45636,"blake2s-40":45637,"blake2s-48":45638,"blake2s-56":45639,"blake2s-64":45640,"blake2s-72":45641,"blake2s-80":45642,"blake2s-88":45643,"blake2s-96":45644,"blake2s-104":45645,"blake2s-112":45646,"blake2s-120":45647,"blake2s-128":45648,"blake2s-136":45649,"blake2s-144":45650,"blake2s-152":45651,"blake2s-160":45652,"blake2s-168":45653,"blake2s-176":45654,"blake2s-184":45655,"blake2s-192":45656,"blake2s-200":45657,"blake2s-208":45658,"blake2s-216":45659,"blake2s-224":45660,"blake2s-232":45661,"blake2s-240":45662,"blake2s-248":45663,"blake2s-256":45664,"skein256-8":45825,"skein256-16":45826,"skein256-24":45827,"skein256-32":45828,"skein256-40":45829,"skein256-48":45830,"skein256-56":45831,"skein256-64":45832,"skein256-72":45833,"skein256-80":45834,"skein256-88":45835,"skein256-96":45836,"skein256-104":45837,"skein256-112":45838,"skein256-120":45839,"skein256-128":45840,"skein256-136":45841,"skein256-144":45842,"skein256-152":45843,"skein256-160":45844,"skein256-168":45845,"skein256-176":45846,"skein256-184":45847,"skein256-192":45848,"skein256-200":45849,"skein256-208":45850,"skein256-216":45851,"skein256-224":45852,"skein256-232":45853,"skein256-240":45854,"skein256-248":45855,"skein256-256":45856,"skein512-8":45857,"skein512-16":45858,"skein512-24":45859,"skein512-32":45860,"skein512-40":45861,"skein512-48":45862,"skein512-56":45863,"skein512-64":45864,"skein512-72":45865,"skein512-80":45866,"skein512-88":45867,"skein512-96":45868,"skein512-104":45869,"skein512-112":45870,"skein512-120":45871,"skein512-128":45872,"skein512-136":45873,"skein512-144":45874,"skein512-152":45875,"skein512-160":45876,"skein512-168":45877,"skein512-176":45878,"skein512-184":45879,"skein512-192":45880,"skein512-200":45881,"skein512-208":45882,"skein512-216":45883,"skein512-224":45884,"skein512-232":45885,"skein512-240":45886,"skein512-248":45887,"skein512-256":45888,"skein512-264":45889,"skein512-272":45890,"skein512-280":45891,"skein512-288":45892,"skein512-296":45893,"skein512-304":45894,"skein512-312":45895,"skein512-320":45896,"skein512-328":45897,"skein512-336":45898,"skein512-344":45899,"skein512-352":45900,"skein512-360":45901,"skein512-368":45902,"skein512-376":45903,"skein512-384":45904,"skein512-392":45905,"skein512-400":45906,"skein512-408":45907,"skein512-416":45908,"skein512-424":45909,"skein512-432":45910,"skein512-440":45911,"skein512-448":45912,"skein512-456":45913,"skein512-464":45914,"skein512-472":45915,"skein512-480":45916,"skein512-488":45917,"skein512-496":45918,"skein512-504":45919,"skein512-512":45920,"skein1024-8":45921,"skein1024-16":45922,"skein1024-24":45923,"skein1024-32":45924,"skein1024-40":45925,"skein1024-48":45926,"skein1024-56":45927,"skein1024-64":45928,"skein1024-72":45929,"skein1024-80":45930,"skein1024-88":45931,"skein1024-96":45932,"skein1024-104":45933,"skein1024-112":45934,"skein1024-120":45935,"skein1024-128":45936,"skein1024-136":45937,"skein1024-144":45938,"skein1024-152":45939,"skein1024-160":45940,"skein1024-168":45941,"skein1024-176":45942,"skein1024-184":45943,"skein1024-192":45944,"skein1024-200":45945,"skein1024-208":45946,"skein1024-216":45947,"skein1024-224":45948,"skein1024-232":45949,"skein1024-240":45950,"skein1024-248":45951,"skein1024-256":45952,"skein1024-264":45953,"skein1024-272":45954,"skein1024-280":45955,"skein1024-288":45956,"skein1024-296":45957,"skein1024-304":45958,"skein1024-312":45959,"skein1024-320":45960,"skein1024-328":45961,"skein1024-336":45962,"skein1024-344":45963,"skein1024-352":45964,"skein1024-360":45965,"skein1024-368":45966,"skein1024-376":45967,"skein1024-384":45968,"skein1024-392":45969,"skein1024-400":45970,"skein1024-408":45971,"skein1024-416":45972,"skein1024-424":45973,"skein1024-432":45974,"skein1024-440":45975,"skein1024-448":45976,"skein1024-456":45977,"skein1024-464":45978,"skein1024-472":45979,"skein1024-480":45980,"skein1024-488":45981,"skein1024-496":45982,"skein1024-504":45983,"skein1024-512":45984,"skein1024-520":45985,"skein1024-528":45986,"skein1024-536":45987,"skein1024-544":45988,"skein1024-552":45989,"skein1024-560":45990,"skein1024-568":45991,"skein1024-576":45992,"skein1024-584":45993,"skein1024-592":45994,"skein1024-600":45995,"skein1024-608":45996,"skein1024-616":45997,"skein1024-624":45998,"skein1024-632":45999,"skein1024-640":46000,"skein1024-648":46001,"skein1024-656":46002,"skein1024-664":46003,"skein1024-672":46004,"skein1024-680":46005,"skein1024-688":46006,"skein1024-696":46007,"skein1024-704":46008,"skein1024-712":46009,"skein1024-720":46010,"skein1024-728":46011,"skein1024-736":46012,"skein1024-744":46013,"skein1024-752":46014,"skein1024-760":46015,"skein1024-768":46016,"skein1024-776":46017,"skein1024-784":46018,"skein1024-792":46019,"skein1024-800":46020,"skein1024-808":46021,"skein1024-816":46022,"skein1024-824":46023,"skein1024-832":46024,"skein1024-840":46025,"skein1024-848":46026,"skein1024-856":46027,"skein1024-864":46028,"skein1024-872":46029,"skein1024-880":46030,"skein1024-888":46031,"skein1024-896":46032,"skein1024-904":46033,"skein1024-912":46034,"skein1024-920":46035,"skein1024-928":46036,"skein1024-936":46037,"skein1024-944":46038,"skein1024-952":46039,"skein1024-960":46040,"skein1024-968":46041,"skein1024-976":46042,"skein1024-984":46043,"skein1024-992":46044,"skein1024-1000":46045,"skein1024-1008":46046,"skein1024-1016":46047,"skein1024-1024":46048,"poseidon-bls12_381-a2-fc1":46081,"poseidon-bls12_381-a2-fc1-sc":46082,"zeroxcert-imprint-256":52753,"fil-commitment-unsealed":61697,"fil-commitment-sealed":61698,"holochain-adr-v0":8417572,"holochain-adr-v1":8483108,"holochain-key-v0":9728292,"holochain-key-v1":9793828,"holochain-sig-v0":10645796,"holochain-sig-v1":10711332}')
}, function (e, n, t) {
  "use strict";

  function r(e, n) {
    for (const t in n) Object.defineProperty(e, t, {value: n[t], enumerable: !0, configurable: !0});
    return e
  }

  e.exports = function (e, code, n) {
    if (!e || "string" == typeof e) throw new TypeError("Please pass an Error to err-code");
    n || (n = {}), "object" == typeof code && (n = code, code = void 0), null != code && (n.code = code);
    try {
      return r(e, n)
    } catch (t) {
      n.message = e.message, n.stack = e.stack;
      const o = function () {
      };
      return o.prototype = Object.create(Object.getPrototypeOf(e)), r(new o, n)
    }
  }
}, function (e) {
  e.exports = JSON.parse('{"identity":0,"ip4":4,"tcp":6,"sha1":17,"sha2-256":18,"sha2-512":19,"sha3-512":20,"sha3-384":21,"sha3-256":22,"sha3-224":23,"shake-128":24,"shake-256":25,"keccak-224":26,"keccak-256":27,"keccak-384":28,"keccak-512":29,"blake3":30,"dccp":33,"murmur3-128":34,"murmur3-32":35,"ip6":41,"ip6zone":42,"path":47,"multicodec":48,"multihash":49,"multiaddr":50,"multibase":51,"dns":53,"dns4":54,"dns6":55,"dnsaddr":56,"protobuf":80,"cbor":81,"raw":85,"dbl-sha2-256":86,"rlp":96,"bencode":99,"dag-pb":112,"dag-cbor":113,"libp2p-key":114,"git-raw":120,"torrent-info":123,"torrent-file":124,"leofcoin-block":129,"leofcoin-tx":130,"leofcoin-pr":131,"sctp":132,"dag-jose":133,"dag-cose":134,"eth-block":144,"eth-block-list":145,"eth-tx-trie":146,"eth-tx":147,"eth-tx-receipt-trie":148,"eth-tx-receipt":149,"eth-state-trie":150,"eth-account-snapshot":151,"eth-storage-trie":152,"bitcoin-block":176,"bitcoin-tx":177,"bitcoin-witness-commitment":178,"zcash-block":192,"zcash-tx":193,"stellar-block":208,"stellar-tx":209,"md4":212,"md5":213,"bmt":214,"decred-block":224,"decred-tx":225,"ipld-ns":226,"ipfs-ns":227,"swarm-ns":228,"ipns-ns":229,"zeronet":230,"secp256k1-pub":231,"bls12_381-g1-pub":234,"bls12_381-g2-pub":235,"x25519-pub":236,"ed25519-pub":237,"dash-block":240,"dash-tx":241,"swarm-manifest":250,"swarm-feed":251,"udp":273,"p2p-webrtc-star":275,"p2p-webrtc-direct":276,"p2p-stardust":277,"p2p-circuit":290,"dag-json":297,"udt":301,"utp":302,"unix":400,"p2p":421,"ipfs":421,"https":443,"onion":444,"onion3":445,"garlic64":446,"garlic32":447,"tls":448,"quic":460,"ws":477,"wss":478,"p2p-websocket-star":479,"http":480,"json":512,"messagepack":513,"libp2p-peer-record":769,"sha2-256-trunc254-padded":4114,"ripemd-128":4178,"ripemd-160":4179,"ripemd-256":4180,"ripemd-320":4181,"x11":4352,"sm3-256":21325,"blake2b-8":45569,"blake2b-16":45570,"blake2b-24":45571,"blake2b-32":45572,"blake2b-40":45573,"blake2b-48":45574,"blake2b-56":45575,"blake2b-64":45576,"blake2b-72":45577,"blake2b-80":45578,"blake2b-88":45579,"blake2b-96":45580,"blake2b-104":45581,"blake2b-112":45582,"blake2b-120":45583,"blake2b-128":45584,"blake2b-136":45585,"blake2b-144":45586,"blake2b-152":45587,"blake2b-160":45588,"blake2b-168":45589,"blake2b-176":45590,"blake2b-184":45591,"blake2b-192":45592,"blake2b-200":45593,"blake2b-208":45594,"blake2b-216":45595,"blake2b-224":45596,"blake2b-232":45597,"blake2b-240":45598,"blake2b-248":45599,"blake2b-256":45600,"blake2b-264":45601,"blake2b-272":45602,"blake2b-280":45603,"blake2b-288":45604,"blake2b-296":45605,"blake2b-304":45606,"blake2b-312":45607,"blake2b-320":45608,"blake2b-328":45609,"blake2b-336":45610,"blake2b-344":45611,"blake2b-352":45612,"blake2b-360":45613,"blake2b-368":45614,"blake2b-376":45615,"blake2b-384":45616,"blake2b-392":45617,"blake2b-400":45618,"blake2b-408":45619,"blake2b-416":45620,"blake2b-424":45621,"blake2b-432":45622,"blake2b-440":45623,"blake2b-448":45624,"blake2b-456":45625,"blake2b-464":45626,"blake2b-472":45627,"blake2b-480":45628,"blake2b-488":45629,"blake2b-496":45630,"blake2b-504":45631,"blake2b-512":45632,"blake2s-8":45633,"blake2s-16":45634,"blake2s-24":45635,"blake2s-32":45636,"blake2s-40":45637,"blake2s-48":45638,"blake2s-56":45639,"blake2s-64":45640,"blake2s-72":45641,"blake2s-80":45642,"blake2s-88":45643,"blake2s-96":45644,"blake2s-104":45645,"blake2s-112":45646,"blake2s-120":45647,"blake2s-128":45648,"blake2s-136":45649,"blake2s-144":45650,"blake2s-152":45651,"blake2s-160":45652,"blake2s-168":45653,"blake2s-176":45654,"blake2s-184":45655,"blake2s-192":45656,"blake2s-200":45657,"blake2s-208":45658,"blake2s-216":45659,"blake2s-224":45660,"blake2s-232":45661,"blake2s-240":45662,"blake2s-248":45663,"blake2s-256":45664,"skein256-8":45825,"skein256-16":45826,"skein256-24":45827,"skein256-32":45828,"skein256-40":45829,"skein256-48":45830,"skein256-56":45831,"skein256-64":45832,"skein256-72":45833,"skein256-80":45834,"skein256-88":45835,"skein256-96":45836,"skein256-104":45837,"skein256-112":45838,"skein256-120":45839,"skein256-128":45840,"skein256-136":45841,"skein256-144":45842,"skein256-152":45843,"skein256-160":45844,"skein256-168":45845,"skein256-176":45846,"skein256-184":45847,"skein256-192":45848,"skein256-200":45849,"skein256-208":45850,"skein256-216":45851,"skein256-224":45852,"skein256-232":45853,"skein256-240":45854,"skein256-248":45855,"skein256-256":45856,"skein512-8":45857,"skein512-16":45858,"skein512-24":45859,"skein512-32":45860,"skein512-40":45861,"skein512-48":45862,"skein512-56":45863,"skein512-64":45864,"skein512-72":45865,"skein512-80":45866,"skein512-88":45867,"skein512-96":45868,"skein512-104":45869,"skein512-112":45870,"skein512-120":45871,"skein512-128":45872,"skein512-136":45873,"skein512-144":45874,"skein512-152":45875,"skein512-160":45876,"skein512-168":45877,"skein512-176":45878,"skein512-184":45879,"skein512-192":45880,"skein512-200":45881,"skein512-208":45882,"skein512-216":45883,"skein512-224":45884,"skein512-232":45885,"skein512-240":45886,"skein512-248":45887,"skein512-256":45888,"skein512-264":45889,"skein512-272":45890,"skein512-280":45891,"skein512-288":45892,"skein512-296":45893,"skein512-304":45894,"skein512-312":45895,"skein512-320":45896,"skein512-328":45897,"skein512-336":45898,"skein512-344":45899,"skein512-352":45900,"skein512-360":45901,"skein512-368":45902,"skein512-376":45903,"skein512-384":45904,"skein512-392":45905,"skein512-400":45906,"skein512-408":45907,"skein512-416":45908,"skein512-424":45909,"skein512-432":45910,"skein512-440":45911,"skein512-448":45912,"skein512-456":45913,"skein512-464":45914,"skein512-472":45915,"skein512-480":45916,"skein512-488":45917,"skein512-496":45918,"skein512-504":45919,"skein512-512":45920,"skein1024-8":45921,"skein1024-16":45922,"skein1024-24":45923,"skein1024-32":45924,"skein1024-40":45925,"skein1024-48":45926,"skein1024-56":45927,"skein1024-64":45928,"skein1024-72":45929,"skein1024-80":45930,"skein1024-88":45931,"skein1024-96":45932,"skein1024-104":45933,"skein1024-112":45934,"skein1024-120":45935,"skein1024-128":45936,"skein1024-136":45937,"skein1024-144":45938,"skein1024-152":45939,"skein1024-160":45940,"skein1024-168":45941,"skein1024-176":45942,"skein1024-184":45943,"skein1024-192":45944,"skein1024-200":45945,"skein1024-208":45946,"skein1024-216":45947,"skein1024-224":45948,"skein1024-232":45949,"skein1024-240":45950,"skein1024-248":45951,"skein1024-256":45952,"skein1024-264":45953,"skein1024-272":45954,"skein1024-280":45955,"skein1024-288":45956,"skein1024-296":45957,"skein1024-304":45958,"skein1024-312":45959,"skein1024-320":45960,"skein1024-328":45961,"skein1024-336":45962,"skein1024-344":45963,"skein1024-352":45964,"skein1024-360":45965,"skein1024-368":45966,"skein1024-376":45967,"skein1024-384":45968,"skein1024-392":45969,"skein1024-400":45970,"skein1024-408":45971,"skein1024-416":45972,"skein1024-424":45973,"skein1024-432":45974,"skein1024-440":45975,"skein1024-448":45976,"skein1024-456":45977,"skein1024-464":45978,"skein1024-472":45979,"skein1024-480":45980,"skein1024-488":45981,"skein1024-496":45982,"skein1024-504":45983,"skein1024-512":45984,"skein1024-520":45985,"skein1024-528":45986,"skein1024-536":45987,"skein1024-544":45988,"skein1024-552":45989,"skein1024-560":45990,"skein1024-568":45991,"skein1024-576":45992,"skein1024-584":45993,"skein1024-592":45994,"skein1024-600":45995,"skein1024-608":45996,"skein1024-616":45997,"skein1024-624":45998,"skein1024-632":45999,"skein1024-640":46000,"skein1024-648":46001,"skein1024-656":46002,"skein1024-664":46003,"skein1024-672":46004,"skein1024-680":46005,"skein1024-688":46006,"skein1024-696":46007,"skein1024-704":46008,"skein1024-712":46009,"skein1024-720":46010,"skein1024-728":46011,"skein1024-736":46012,"skein1024-744":46013,"skein1024-752":46014,"skein1024-760":46015,"skein1024-768":46016,"skein1024-776":46017,"skein1024-784":46018,"skein1024-792":46019,"skein1024-800":46020,"skein1024-808":46021,"skein1024-816":46022,"skein1024-824":46023,"skein1024-832":46024,"skein1024-840":46025,"skein1024-848":46026,"skein1024-856":46027,"skein1024-864":46028,"skein1024-872":46029,"skein1024-880":46030,"skein1024-888":46031,"skein1024-896":46032,"skein1024-904":46033,"skein1024-912":46034,"skein1024-920":46035,"skein1024-928":46036,"skein1024-936":46037,"skein1024-944":46038,"skein1024-952":46039,"skein1024-960":46040,"skein1024-968":46041,"skein1024-976":46042,"skein1024-984":46043,"skein1024-992":46044,"skein1024-1000":46045,"skein1024-1008":46046,"skein1024-1016":46047,"skein1024-1024":46048,"poseidon-bls12_381-a2-fc1":46081,"poseidon-bls12_381-a2-fc1-sc":46082,"zeroxcert-imprint-256":52753,"fil-commitment-unsealed":61697,"fil-commitment-sealed":61698,"holochain-adr-v0":8417572,"holochain-adr-v1":8483108,"holochain-key-v0":9728292,"holochain-key-v1":9793828,"holochain-sig-v0":10645796,"holochain-sig-v1":10711332}')
}, function (e, n, t) {
  "use strict";
  n.DAGNode = t(999), n.DAGLink = t(844), n.resolver = t(1061), n.util = t(845), n.codec = n.util.codec, n.defaultHashAlg = n.util.defaultHashAlg
}, function (e) {
  e.exports = JSON.parse('{"identity":0,"ip4":4,"tcp":6,"sha1":17,"sha2-256":18,"sha2-512":19,"sha3-512":20,"sha3-384":21,"sha3-256":22,"sha3-224":23,"shake-128":24,"shake-256":25,"keccak-224":26,"keccak-256":27,"keccak-384":28,"keccak-512":29,"blake3":30,"dccp":33,"murmur3-128":34,"murmur3-32":35,"ip6":41,"ip6zone":42,"path":47,"multicodec":48,"multihash":49,"multiaddr":50,"multibase":51,"dns":53,"dns4":54,"dns6":55,"dnsaddr":56,"protobuf":80,"cbor":81,"raw":85,"dbl-sha2-256":86,"rlp":96,"bencode":99,"dag-pb":112,"dag-cbor":113,"libp2p-key":114,"git-raw":120,"torrent-info":123,"torrent-file":124,"leofcoin-block":129,"leofcoin-tx":130,"leofcoin-pr":131,"sctp":132,"dag-jose":133,"dag-cose":134,"eth-block":144,"eth-block-list":145,"eth-tx-trie":146,"eth-tx":147,"eth-tx-receipt-trie":148,"eth-tx-receipt":149,"eth-state-trie":150,"eth-account-snapshot":151,"eth-storage-trie":152,"bitcoin-block":176,"bitcoin-tx":177,"bitcoin-witness-commitment":178,"zcash-block":192,"zcash-tx":193,"stellar-block":208,"stellar-tx":209,"md4":212,"md5":213,"bmt":214,"decred-block":224,"decred-tx":225,"ipld-ns":226,"ipfs-ns":227,"swarm-ns":228,"ipns-ns":229,"zeronet":230,"secp256k1-pub":231,"bls12_381-g1-pub":234,"bls12_381-g2-pub":235,"x25519-pub":236,"ed25519-pub":237,"dash-block":240,"dash-tx":241,"swarm-manifest":250,"swarm-feed":251,"udp":273,"p2p-webrtc-star":275,"p2p-webrtc-direct":276,"p2p-stardust":277,"p2p-circuit":290,"dag-json":297,"udt":301,"utp":302,"unix":400,"p2p":421,"ipfs":421,"https":443,"onion":444,"onion3":445,"garlic64":446,"garlic32":447,"tls":448,"quic":460,"ws":477,"wss":478,"p2p-websocket-star":479,"http":480,"json":512,"messagepack":513,"libp2p-peer-record":769,"sha2-256-trunc254-padded":4114,"ripemd-128":4178,"ripemd-160":4179,"ripemd-256":4180,"ripemd-320":4181,"x11":4352,"sm3-256":21325,"blake2b-8":45569,"blake2b-16":45570,"blake2b-24":45571,"blake2b-32":45572,"blake2b-40":45573,"blake2b-48":45574,"blake2b-56":45575,"blake2b-64":45576,"blake2b-72":45577,"blake2b-80":45578,"blake2b-88":45579,"blake2b-96":45580,"blake2b-104":45581,"blake2b-112":45582,"blake2b-120":45583,"blake2b-128":45584,"blake2b-136":45585,"blake2b-144":45586,"blake2b-152":45587,"blake2b-160":45588,"blake2b-168":45589,"blake2b-176":45590,"blake2b-184":45591,"blake2b-192":45592,"blake2b-200":45593,"blake2b-208":45594,"blake2b-216":45595,"blake2b-224":45596,"blake2b-232":45597,"blake2b-240":45598,"blake2b-248":45599,"blake2b-256":45600,"blake2b-264":45601,"blake2b-272":45602,"blake2b-280":45603,"blake2b-288":45604,"blake2b-296":45605,"blake2b-304":45606,"blake2b-312":45607,"blake2b-320":45608,"blake2b-328":45609,"blake2b-336":45610,"blake2b-344":45611,"blake2b-352":45612,"blake2b-360":45613,"blake2b-368":45614,"blake2b-376":45615,"blake2b-384":45616,"blake2b-392":45617,"blake2b-400":45618,"blake2b-408":45619,"blake2b-416":45620,"blake2b-424":45621,"blake2b-432":45622,"blake2b-440":45623,"blake2b-448":45624,"blake2b-456":45625,"blake2b-464":45626,"blake2b-472":45627,"blake2b-480":45628,"blake2b-488":45629,"blake2b-496":45630,"blake2b-504":45631,"blake2b-512":45632,"blake2s-8":45633,"blake2s-16":45634,"blake2s-24":45635,"blake2s-32":45636,"blake2s-40":45637,"blake2s-48":45638,"blake2s-56":45639,"blake2s-64":45640,"blake2s-72":45641,"blake2s-80":45642,"blake2s-88":45643,"blake2s-96":45644,"blake2s-104":45645,"blake2s-112":45646,"blake2s-120":45647,"blake2s-128":45648,"blake2s-136":45649,"blake2s-144":45650,"blake2s-152":45651,"blake2s-160":45652,"blake2s-168":45653,"blake2s-176":45654,"blake2s-184":45655,"blake2s-192":45656,"blake2s-200":45657,"blake2s-208":45658,"blake2s-216":45659,"blake2s-224":45660,"blake2s-232":45661,"blake2s-240":45662,"blake2s-248":45663,"blake2s-256":45664,"skein256-8":45825,"skein256-16":45826,"skein256-24":45827,"skein256-32":45828,"skein256-40":45829,"skein256-48":45830,"skein256-56":45831,"skein256-64":45832,"skein256-72":45833,"skein256-80":45834,"skein256-88":45835,"skein256-96":45836,"skein256-104":45837,"skein256-112":45838,"skein256-120":45839,"skein256-128":45840,"skein256-136":45841,"skein256-144":45842,"skein256-152":45843,"skein256-160":45844,"skein256-168":45845,"skein256-176":45846,"skein256-184":45847,"skein256-192":45848,"skein256-200":45849,"skein256-208":45850,"skein256-216":45851,"skein256-224":45852,"skein256-232":45853,"skein256-240":45854,"skein256-248":45855,"skein256-256":45856,"skein512-8":45857,"skein512-16":45858,"skein512-24":45859,"skein512-32":45860,"skein512-40":45861,"skein512-48":45862,"skein512-56":45863,"skein512-64":45864,"skein512-72":45865,"skein512-80":45866,"skein512-88":45867,"skein512-96":45868,"skein512-104":45869,"skein512-112":45870,"skein512-120":45871,"skein512-128":45872,"skein512-136":45873,"skein512-144":45874,"skein512-152":45875,"skein512-160":45876,"skein512-168":45877,"skein512-176":45878,"skein512-184":45879,"skein512-192":45880,"skein512-200":45881,"skein512-208":45882,"skein512-216":45883,"skein512-224":45884,"skein512-232":45885,"skein512-240":45886,"skein512-248":45887,"skein512-256":45888,"skein512-264":45889,"skein512-272":45890,"skein512-280":45891,"skein512-288":45892,"skein512-296":45893,"skein512-304":45894,"skein512-312":45895,"skein512-320":45896,"skein512-328":45897,"skein512-336":45898,"skein512-344":45899,"skein512-352":45900,"skein512-360":45901,"skein512-368":45902,"skein512-376":45903,"skein512-384":45904,"skein512-392":45905,"skein512-400":45906,"skein512-408":45907,"skein512-416":45908,"skein512-424":45909,"skein512-432":45910,"skein512-440":45911,"skein512-448":45912,"skein512-456":45913,"skein512-464":45914,"skein512-472":45915,"skein512-480":45916,"skein512-488":45917,"skein512-496":45918,"skein512-504":45919,"skein512-512":45920,"skein1024-8":45921,"skein1024-16":45922,"skein1024-24":45923,"skein1024-32":45924,"skein1024-40":45925,"skein1024-48":45926,"skein1024-56":45927,"skein1024-64":45928,"skein1024-72":45929,"skein1024-80":45930,"skein1024-88":45931,"skein1024-96":45932,"skein1024-104":45933,"skein1024-112":45934,"skein1024-120":45935,"skein1024-128":45936,"skein1024-136":45937,"skein1024-144":45938,"skein1024-152":45939,"skein1024-160":45940,"skein1024-168":45941,"skein1024-176":45942,"skein1024-184":45943,"skein1024-192":45944,"skein1024-200":45945,"skein1024-208":45946,"skein1024-216":45947,"skein1024-224":45948,"skein1024-232":45949,"skein1024-240":45950,"skein1024-248":45951,"skein1024-256":45952,"skein1024-264":45953,"skein1024-272":45954,"skein1024-280":45955,"skein1024-288":45956,"skein1024-296":45957,"skein1024-304":45958,"skein1024-312":45959,"skein1024-320":45960,"skein1024-328":45961,"skein1024-336":45962,"skein1024-344":45963,"skein1024-352":45964,"skein1024-360":45965,"skein1024-368":45966,"skein1024-376":45967,"skein1024-384":45968,"skein1024-392":45969,"skein1024-400":45970,"skein1024-408":45971,"skein1024-416":45972,"skein1024-424":45973,"skein1024-432":45974,"skein1024-440":45975,"skein1024-448":45976,"skein1024-456":45977,"skein1024-464":45978,"skein1024-472":45979,"skein1024-480":45980,"skein1024-488":45981,"skein1024-496":45982,"skein1024-504":45983,"skein1024-512":45984,"skein1024-520":45985,"skein1024-528":45986,"skein1024-536":45987,"skein1024-544":45988,"skein1024-552":45989,"skein1024-560":45990,"skein1024-568":45991,"skein1024-576":45992,"skein1024-584":45993,"skein1024-592":45994,"skein1024-600":45995,"skein1024-608":45996,"skein1024-616":45997,"skein1024-624":45998,"skein1024-632":45999,"skein1024-640":46000,"skein1024-648":46001,"skein1024-656":46002,"skein1024-664":46003,"skein1024-672":46004,"skein1024-680":46005,"skein1024-688":46006,"skein1024-696":46007,"skein1024-704":46008,"skein1024-712":46009,"skein1024-720":46010,"skein1024-728":46011,"skein1024-736":46012,"skein1024-744":46013,"skein1024-752":46014,"skein1024-760":46015,"skein1024-768":46016,"skein1024-776":46017,"skein1024-784":46018,"skein1024-792":46019,"skein1024-800":46020,"skein1024-808":46021,"skein1024-816":46022,"skein1024-824":46023,"skein1024-832":46024,"skein1024-840":46025,"skein1024-848":46026,"skein1024-856":46027,"skein1024-864":46028,"skein1024-872":46029,"skein1024-880":46030,"skein1024-888":46031,"skein1024-896":46032,"skein1024-904":46033,"skein1024-912":46034,"skein1024-920":46035,"skein1024-928":46036,"skein1024-936":46037,"skein1024-944":46038,"skein1024-952":46039,"skein1024-960":46040,"skein1024-968":46041,"skein1024-976":46042,"skein1024-984":46043,"skein1024-992":46044,"skein1024-1000":46045,"skein1024-1008":46046,"skein1024-1016":46047,"skein1024-1024":46048,"poseidon-bls12_381-a2-fc1":46081,"poseidon-bls12_381-a2-fc1-sc":46082,"zeroxcert-imprint-256":52753,"fil-commitment-unsealed":61697,"fil-commitment-sealed":61698,"holochain-adr-v0":8417572,"holochain-adr-v1":8483108,"holochain-key-v0":9728292,"holochain-key-v1":9793828,"holochain-sig-v0":10645796,"holochain-sig-v1":10711332}')
}, function (e) {
  e.exports = JSON.parse('{"identity":0,"ip4":4,"tcp":6,"sha1":17,"sha2-256":18,"sha2-512":19,"sha3-512":20,"sha3-384":21,"sha3-256":22,"sha3-224":23,"shake-128":24,"shake-256":25,"keccak-224":26,"keccak-256":27,"keccak-384":28,"keccak-512":29,"blake3":30,"dccp":33,"murmur3-128":34,"murmur3-32":35,"ip6":41,"ip6zone":42,"path":47,"multicodec":48,"multihash":49,"multiaddr":50,"multibase":51,"dns":53,"dns4":54,"dns6":55,"dnsaddr":56,"protobuf":80,"cbor":81,"raw":85,"dbl-sha2-256":86,"rlp":96,"bencode":99,"dag-pb":112,"dag-cbor":113,"libp2p-key":114,"git-raw":120,"torrent-info":123,"torrent-file":124,"leofcoin-block":129,"leofcoin-tx":130,"leofcoin-pr":131,"sctp":132,"dag-jose":133,"dag-cose":134,"eth-block":144,"eth-block-list":145,"eth-tx-trie":146,"eth-tx":147,"eth-tx-receipt-trie":148,"eth-tx-receipt":149,"eth-state-trie":150,"eth-account-snapshot":151,"eth-storage-trie":152,"bitcoin-block":176,"bitcoin-tx":177,"bitcoin-witness-commitment":178,"zcash-block":192,"zcash-tx":193,"stellar-block":208,"stellar-tx":209,"md4":212,"md5":213,"bmt":214,"decred-block":224,"decred-tx":225,"ipld-ns":226,"ipfs-ns":227,"swarm-ns":228,"ipns-ns":229,"zeronet":230,"secp256k1-pub":231,"bls12_381-g1-pub":234,"bls12_381-g2-pub":235,"x25519-pub":236,"ed25519-pub":237,"dash-block":240,"dash-tx":241,"swarm-manifest":250,"swarm-feed":251,"udp":273,"p2p-webrtc-star":275,"p2p-webrtc-direct":276,"p2p-stardust":277,"p2p-circuit":290,"dag-json":297,"udt":301,"utp":302,"unix":400,"p2p":421,"ipfs":421,"https":443,"onion":444,"onion3":445,"garlic64":446,"garlic32":447,"tls":448,"quic":460,"ws":477,"wss":478,"p2p-websocket-star":479,"http":480,"json":512,"messagepack":513,"libp2p-peer-record":769,"sha2-256-trunc254-padded":4114,"ripemd-128":4178,"ripemd-160":4179,"ripemd-256":4180,"ripemd-320":4181,"x11":4352,"sm3-256":21325,"blake2b-8":45569,"blake2b-16":45570,"blake2b-24":45571,"blake2b-32":45572,"blake2b-40":45573,"blake2b-48":45574,"blake2b-56":45575,"blake2b-64":45576,"blake2b-72":45577,"blake2b-80":45578,"blake2b-88":45579,"blake2b-96":45580,"blake2b-104":45581,"blake2b-112":45582,"blake2b-120":45583,"blake2b-128":45584,"blake2b-136":45585,"blake2b-144":45586,"blake2b-152":45587,"blake2b-160":45588,"blake2b-168":45589,"blake2b-176":45590,"blake2b-184":45591,"blake2b-192":45592,"blake2b-200":45593,"blake2b-208":45594,"blake2b-216":45595,"blake2b-224":45596,"blake2b-232":45597,"blake2b-240":45598,"blake2b-248":45599,"blake2b-256":45600,"blake2b-264":45601,"blake2b-272":45602,"blake2b-280":45603,"blake2b-288":45604,"blake2b-296":45605,"blake2b-304":45606,"blake2b-312":45607,"blake2b-320":45608,"blake2b-328":45609,"blake2b-336":45610,"blake2b-344":45611,"blake2b-352":45612,"blake2b-360":45613,"blake2b-368":45614,"blake2b-376":45615,"blake2b-384":45616,"blake2b-392":45617,"blake2b-400":45618,"blake2b-408":45619,"blake2b-416":45620,"blake2b-424":45621,"blake2b-432":45622,"blake2b-440":45623,"blake2b-448":45624,"blake2b-456":45625,"blake2b-464":45626,"blake2b-472":45627,"blake2b-480":45628,"blake2b-488":45629,"blake2b-496":45630,"blake2b-504":45631,"blake2b-512":45632,"blake2s-8":45633,"blake2s-16":45634,"blake2s-24":45635,"blake2s-32":45636,"blake2s-40":45637,"blake2s-48":45638,"blake2s-56":45639,"blake2s-64":45640,"blake2s-72":45641,"blake2s-80":45642,"blake2s-88":45643,"blake2s-96":45644,"blake2s-104":45645,"blake2s-112":45646,"blake2s-120":45647,"blake2s-128":45648,"blake2s-136":45649,"blake2s-144":45650,"blake2s-152":45651,"blake2s-160":45652,"blake2s-168":45653,"blake2s-176":45654,"blake2s-184":45655,"blake2s-192":45656,"blake2s-200":45657,"blake2s-208":45658,"blake2s-216":45659,"blake2s-224":45660,"blake2s-232":45661,"blake2s-240":45662,"blake2s-248":45663,"blake2s-256":45664,"skein256-8":45825,"skein256-16":45826,"skein256-24":45827,"skein256-32":45828,"skein256-40":45829,"skein256-48":45830,"skein256-56":45831,"skein256-64":45832,"skein256-72":45833,"skein256-80":45834,"skein256-88":45835,"skein256-96":45836,"skein256-104":45837,"skein256-112":45838,"skein256-120":45839,"skein256-128":45840,"skein256-136":45841,"skein256-144":45842,"skein256-152":45843,"skein256-160":45844,"skein256-168":45845,"skein256-176":45846,"skein256-184":45847,"skein256-192":45848,"skein256-200":45849,"skein256-208":45850,"skein256-216":45851,"skein256-224":45852,"skein256-232":45853,"skein256-240":45854,"skein256-248":45855,"skein256-256":45856,"skein512-8":45857,"skein512-16":45858,"skein512-24":45859,"skein512-32":45860,"skein512-40":45861,"skein512-48":45862,"skein512-56":45863,"skein512-64":45864,"skein512-72":45865,"skein512-80":45866,"skein512-88":45867,"skein512-96":45868,"skein512-104":45869,"skein512-112":45870,"skein512-120":45871,"skein512-128":45872,"skein512-136":45873,"skein512-144":45874,"skein512-152":45875,"skein512-160":45876,"skein512-168":45877,"skein512-176":45878,"skein512-184":45879,"skein512-192":45880,"skein512-200":45881,"skein512-208":45882,"skein512-216":45883,"skein512-224":45884,"skein512-232":45885,"skein512-240":45886,"skein512-248":45887,"skein512-256":45888,"skein512-264":45889,"skein512-272":45890,"skein512-280":45891,"skein512-288":45892,"skein512-296":45893,"skein512-304":45894,"skein512-312":45895,"skein512-320":45896,"skein512-328":45897,"skein512-336":45898,"skein512-344":45899,"skein512-352":45900,"skein512-360":45901,"skein512-368":45902,"skein512-376":45903,"skein512-384":45904,"skein512-392":45905,"skein512-400":45906,"skein512-408":45907,"skein512-416":45908,"skein512-424":45909,"skein512-432":45910,"skein512-440":45911,"skein512-448":45912,"skein512-456":45913,"skein512-464":45914,"skein512-472":45915,"skein512-480":45916,"skein512-488":45917,"skein512-496":45918,"skein512-504":45919,"skein512-512":45920,"skein1024-8":45921,"skein1024-16":45922,"skein1024-24":45923,"skein1024-32":45924,"skein1024-40":45925,"skein1024-48":45926,"skein1024-56":45927,"skein1024-64":45928,"skein1024-72":45929,"skein1024-80":45930,"skein1024-88":45931,"skein1024-96":45932,"skein1024-104":45933,"skein1024-112":45934,"skein1024-120":45935,"skein1024-128":45936,"skein1024-136":45937,"skein1024-144":45938,"skein1024-152":45939,"skein1024-160":45940,"skein1024-168":45941,"skein1024-176":45942,"skein1024-184":45943,"skein1024-192":45944,"skein1024-200":45945,"skein1024-208":45946,"skein1024-216":45947,"skein1024-224":45948,"skein1024-232":45949,"skein1024-240":45950,"skein1024-248":45951,"skein1024-256":45952,"skein1024-264":45953,"skein1024-272":45954,"skein1024-280":45955,"skein1024-288":45956,"skein1024-296":45957,"skein1024-304":45958,"skein1024-312":45959,"skein1024-320":45960,"skein1024-328":45961,"skein1024-336":45962,"skein1024-344":45963,"skein1024-352":45964,"skein1024-360":45965,"skein1024-368":45966,"skein1024-376":45967,"skein1024-384":45968,"skein1024-392":45969,"skein1024-400":45970,"skein1024-408":45971,"skein1024-416":45972,"skein1024-424":45973,"skein1024-432":45974,"skein1024-440":45975,"skein1024-448":45976,"skein1024-456":45977,"skein1024-464":45978,"skein1024-472":45979,"skein1024-480":45980,"skein1024-488":45981,"skein1024-496":45982,"skein1024-504":45983,"skein1024-512":45984,"skein1024-520":45985,"skein1024-528":45986,"skein1024-536":45987,"skein1024-544":45988,"skein1024-552":45989,"skein1024-560":45990,"skein1024-568":45991,"skein1024-576":45992,"skein1024-584":45993,"skein1024-592":45994,"skein1024-600":45995,"skein1024-608":45996,"skein1024-616":45997,"skein1024-624":45998,"skein1024-632":45999,"skein1024-640":46000,"skein1024-648":46001,"skein1024-656":46002,"skein1024-664":46003,"skein1024-672":46004,"skein1024-680":46005,"skein1024-688":46006,"skein1024-696":46007,"skein1024-704":46008,"skein1024-712":46009,"skein1024-720":46010,"skein1024-728":46011,"skein1024-736":46012,"skein1024-744":46013,"skein1024-752":46014,"skein1024-760":46015,"skein1024-768":46016,"skein1024-776":46017,"skein1024-784":46018,"skein1024-792":46019,"skein1024-800":46020,"skein1024-808":46021,"skein1024-816":46022,"skein1024-824":46023,"skein1024-832":46024,"skein1024-840":46025,"skein1024-848":46026,"skein1024-856":46027,"skein1024-864":46028,"skein1024-872":46029,"skein1024-880":46030,"skein1024-888":46031,"skein1024-896":46032,"skein1024-904":46033,"skein1024-912":46034,"skein1024-920":46035,"skein1024-928":46036,"skein1024-936":46037,"skein1024-944":46038,"skein1024-952":46039,"skein1024-960":46040,"skein1024-968":46041,"skein1024-976":46042,"skein1024-984":46043,"skein1024-992":46044,"skein1024-1000":46045,"skein1024-1008":46046,"skein1024-1016":46047,"skein1024-1024":46048,"poseidon-bls12_381-a2-fc1":46081,"poseidon-bls12_381-a2-fc1-sc":46082,"zeroxcert-imprint-256":52753,"fil-commitment-unsealed":61697,"fil-commitment-sealed":61698,"holochain-adr-v0":8417572,"holochain-adr-v1":8483108,"holochain-key-v0":9728292,"holochain-key-v1":9793828,"holochain-sig-v0":10645796,"holochain-sig-v1":10711332}')
}, function (e) {
  e.exports = JSON.parse('{"identity":0,"ip4":4,"tcp":6,"sha1":17,"sha2-256":18,"sha2-512":19,"sha3-512":20,"sha3-384":21,"sha3-256":22,"sha3-224":23,"shake-128":24,"shake-256":25,"keccak-224":26,"keccak-256":27,"keccak-384":28,"keccak-512":29,"blake3":30,"dccp":33,"murmur3-128":34,"murmur3-32":35,"ip6":41,"ip6zone":42,"path":47,"multicodec":48,"multihash":49,"multiaddr":50,"multibase":51,"dns":53,"dns4":54,"dns6":55,"dnsaddr":56,"protobuf":80,"cbor":81,"raw":85,"dbl-sha2-256":86,"rlp":96,"bencode":99,"dag-pb":112,"dag-cbor":113,"libp2p-key":114,"git-raw":120,"torrent-info":123,"torrent-file":124,"leofcoin-block":129,"leofcoin-tx":130,"leofcoin-pr":131,"sctp":132,"dag-jose":133,"dag-cose":134,"eth-block":144,"eth-block-list":145,"eth-tx-trie":146,"eth-tx":147,"eth-tx-receipt-trie":148,"eth-tx-receipt":149,"eth-state-trie":150,"eth-account-snapshot":151,"eth-storage-trie":152,"bitcoin-block":176,"bitcoin-tx":177,"bitcoin-witness-commitment":178,"zcash-block":192,"zcash-tx":193,"stellar-block":208,"stellar-tx":209,"md4":212,"md5":213,"bmt":214,"decred-block":224,"decred-tx":225,"ipld-ns":226,"ipfs-ns":227,"swarm-ns":228,"ipns-ns":229,"zeronet":230,"secp256k1-pub":231,"bls12_381-g1-pub":234,"bls12_381-g2-pub":235,"x25519-pub":236,"ed25519-pub":237,"dash-block":240,"dash-tx":241,"swarm-manifest":250,"swarm-feed":251,"udp":273,"p2p-webrtc-star":275,"p2p-webrtc-direct":276,"p2p-stardust":277,"p2p-circuit":290,"dag-json":297,"udt":301,"utp":302,"unix":400,"p2p":421,"ipfs":421,"https":443,"onion":444,"onion3":445,"garlic64":446,"garlic32":447,"tls":448,"quic":460,"ws":477,"wss":478,"p2p-websocket-star":479,"http":480,"json":512,"messagepack":513,"libp2p-peer-record":769,"sha2-256-trunc254-padded":4114,"ripemd-128":4178,"ripemd-160":4179,"ripemd-256":4180,"ripemd-320":4181,"x11":4352,"sm3-256":21325,"blake2b-8":45569,"blake2b-16":45570,"blake2b-24":45571,"blake2b-32":45572,"blake2b-40":45573,"blake2b-48":45574,"blake2b-56":45575,"blake2b-64":45576,"blake2b-72":45577,"blake2b-80":45578,"blake2b-88":45579,"blake2b-96":45580,"blake2b-104":45581,"blake2b-112":45582,"blake2b-120":45583,"blake2b-128":45584,"blake2b-136":45585,"blake2b-144":45586,"blake2b-152":45587,"blake2b-160":45588,"blake2b-168":45589,"blake2b-176":45590,"blake2b-184":45591,"blake2b-192":45592,"blake2b-200":45593,"blake2b-208":45594,"blake2b-216":45595,"blake2b-224":45596,"blake2b-232":45597,"blake2b-240":45598,"blake2b-248":45599,"blake2b-256":45600,"blake2b-264":45601,"blake2b-272":45602,"blake2b-280":45603,"blake2b-288":45604,"blake2b-296":45605,"blake2b-304":45606,"blake2b-312":45607,"blake2b-320":45608,"blake2b-328":45609,"blake2b-336":45610,"blake2b-344":45611,"blake2b-352":45612,"blake2b-360":45613,"blake2b-368":45614,"blake2b-376":45615,"blake2b-384":45616,"blake2b-392":45617,"blake2b-400":45618,"blake2b-408":45619,"blake2b-416":45620,"blake2b-424":45621,"blake2b-432":45622,"blake2b-440":45623,"blake2b-448":45624,"blake2b-456":45625,"blake2b-464":45626,"blake2b-472":45627,"blake2b-480":45628,"blake2b-488":45629,"blake2b-496":45630,"blake2b-504":45631,"blake2b-512":45632,"blake2s-8":45633,"blake2s-16":45634,"blake2s-24":45635,"blake2s-32":45636,"blake2s-40":45637,"blake2s-48":45638,"blake2s-56":45639,"blake2s-64":45640,"blake2s-72":45641,"blake2s-80":45642,"blake2s-88":45643,"blake2s-96":45644,"blake2s-104":45645,"blake2s-112":45646,"blake2s-120":45647,"blake2s-128":45648,"blake2s-136":45649,"blake2s-144":45650,"blake2s-152":45651,"blake2s-160":45652,"blake2s-168":45653,"blake2s-176":45654,"blake2s-184":45655,"blake2s-192":45656,"blake2s-200":45657,"blake2s-208":45658,"blake2s-216":45659,"blake2s-224":45660,"blake2s-232":45661,"blake2s-240":45662,"blake2s-248":45663,"blake2s-256":45664,"skein256-8":45825,"skein256-16":45826,"skein256-24":45827,"skein256-32":45828,"skein256-40":45829,"skein256-48":45830,"skein256-56":45831,"skein256-64":45832,"skein256-72":45833,"skein256-80":45834,"skein256-88":45835,"skein256-96":45836,"skein256-104":45837,"skein256-112":45838,"skein256-120":45839,"skein256-128":45840,"skein256-136":45841,"skein256-144":45842,"skein256-152":45843,"skein256-160":45844,"skein256-168":45845,"skein256-176":45846,"skein256-184":45847,"skein256-192":45848,"skein256-200":45849,"skein256-208":45850,"skein256-216":45851,"skein256-224":45852,"skein256-232":45853,"skein256-240":45854,"skein256-248":45855,"skein256-256":45856,"skein512-8":45857,"skein512-16":45858,"skein512-24":45859,"skein512-32":45860,"skein512-40":45861,"skein512-48":45862,"skein512-56":45863,"skein512-64":45864,"skein512-72":45865,"skein512-80":45866,"skein512-88":45867,"skein512-96":45868,"skein512-104":45869,"skein512-112":45870,"skein512-120":45871,"skein512-128":45872,"skein512-136":45873,"skein512-144":45874,"skein512-152":45875,"skein512-160":45876,"skein512-168":45877,"skein512-176":45878,"skein512-184":45879,"skein512-192":45880,"skein512-200":45881,"skein512-208":45882,"skein512-216":45883,"skein512-224":45884,"skein512-232":45885,"skein512-240":45886,"skein512-248":45887,"skein512-256":45888,"skein512-264":45889,"skein512-272":45890,"skein512-280":45891,"skein512-288":45892,"skein512-296":45893,"skein512-304":45894,"skein512-312":45895,"skein512-320":45896,"skein512-328":45897,"skein512-336":45898,"skein512-344":45899,"skein512-352":45900,"skein512-360":45901,"skein512-368":45902,"skein512-376":45903,"skein512-384":45904,"skein512-392":45905,"skein512-400":45906,"skein512-408":45907,"skein512-416":45908,"skein512-424":45909,"skein512-432":45910,"skein512-440":45911,"skein512-448":45912,"skein512-456":45913,"skein512-464":45914,"skein512-472":45915,"skein512-480":45916,"skein512-488":45917,"skein512-496":45918,"skein512-504":45919,"skein512-512":45920,"skein1024-8":45921,"skein1024-16":45922,"skein1024-24":45923,"skein1024-32":45924,"skein1024-40":45925,"skein1024-48":45926,"skein1024-56":45927,"skein1024-64":45928,"skein1024-72":45929,"skein1024-80":45930,"skein1024-88":45931,"skein1024-96":45932,"skein1024-104":45933,"skein1024-112":45934,"skein1024-120":45935,"skein1024-128":45936,"skein1024-136":45937,"skein1024-144":45938,"skein1024-152":45939,"skein1024-160":45940,"skein1024-168":45941,"skein1024-176":45942,"skein1024-184":45943,"skein1024-192":45944,"skein1024-200":45945,"skein1024-208":45946,"skein1024-216":45947,"skein1024-224":45948,"skein1024-232":45949,"skein1024-240":45950,"skein1024-248":45951,"skein1024-256":45952,"skein1024-264":45953,"skein1024-272":45954,"skein1024-280":45955,"skein1024-288":45956,"skein1024-296":45957,"skein1024-304":45958,"skein1024-312":45959,"skein1024-320":45960,"skein1024-328":45961,"skein1024-336":45962,"skein1024-344":45963,"skein1024-352":45964,"skein1024-360":45965,"skein1024-368":45966,"skein1024-376":45967,"skein1024-384":45968,"skein1024-392":45969,"skein1024-400":45970,"skein1024-408":45971,"skein1024-416":45972,"skein1024-424":45973,"skein1024-432":45974,"skein1024-440":45975,"skein1024-448":45976,"skein1024-456":45977,"skein1024-464":45978,"skein1024-472":45979,"skein1024-480":45980,"skein1024-488":45981,"skein1024-496":45982,"skein1024-504":45983,"skein1024-512":45984,"skein1024-520":45985,"skein1024-528":45986,"skein1024-536":45987,"skein1024-544":45988,"skein1024-552":45989,"skein1024-560":45990,"skein1024-568":45991,"skein1024-576":45992,"skein1024-584":45993,"skein1024-592":45994,"skein1024-600":45995,"skein1024-608":45996,"skein1024-616":45997,"skein1024-624":45998,"skein1024-632":45999,"skein1024-640":46000,"skein1024-648":46001,"skein1024-656":46002,"skein1024-664":46003,"skein1024-672":46004,"skein1024-680":46005,"skein1024-688":46006,"skein1024-696":46007,"skein1024-704":46008,"skein1024-712":46009,"skein1024-720":46010,"skein1024-728":46011,"skein1024-736":46012,"skein1024-744":46013,"skein1024-752":46014,"skein1024-760":46015,"skein1024-768":46016,"skein1024-776":46017,"skein1024-784":46018,"skein1024-792":46019,"skein1024-800":46020,"skein1024-808":46021,"skein1024-816":46022,"skein1024-824":46023,"skein1024-832":46024,"skein1024-840":46025,"skein1024-848":46026,"skein1024-856":46027,"skein1024-864":46028,"skein1024-872":46029,"skein1024-880":46030,"skein1024-888":46031,"skein1024-896":46032,"skein1024-904":46033,"skein1024-912":46034,"skein1024-920":46035,"skein1024-928":46036,"skein1024-936":46037,"skein1024-944":46038,"skein1024-952":46039,"skein1024-960":46040,"skein1024-968":46041,"skein1024-976":46042,"skein1024-984":46043,"skein1024-992":46044,"skein1024-1000":46045,"skein1024-1008":46046,"skein1024-1016":46047,"skein1024-1024":46048,"poseidon-bls12_381-a2-fc1":46081,"poseidon-bls12_381-a2-fc1-sc":46082,"zeroxcert-imprint-256":52753,"fil-commitment-unsealed":61697,"fil-commitment-sealed":61698,"holochain-adr-v0":8417572,"holochain-adr-v1":8483108,"holochain-key-v0":9728292,"holochain-key-v1":9793828,"holochain-sig-v0":10645796,"holochain-sig-v1":10711332}')
}, function (e, n, t) {
  "use strict";
  const {Buffer: r} = t(2), symbol = Symbol.for("BufferList");

  function o(e) {
    if (!(this instanceof o)) return new o(e);
    o._init.call(this, e)
  }

  o._init = function (e) {
    Object.defineProperty(this, symbol, {value: !0}), this._bufs = [], this.length = 0, e && this.append(e)
  }, o.prototype._new = function (e) {
    return new o(e)
  }, o.prototype._offset = function (e) {
    if (0 === e) return [0, 0];
    let n = 0;
    for (let i = 0; i < this._bufs.length; i++) {
      const t = n + this._bufs[i].length;
      if (e < t || i === this._bufs.length - 1) return [i, e - n];
      n = t
    }
  }, o.prototype._reverseOffset = function (e) {
    const n = e[0];
    let t = e[1];
    for (let i = 0; i < n; i++) t += this._bufs[i].length;
    return t
  }, o.prototype.get = function (e) {
    if (e > this.length || e < 0) return;
    const n = this._offset(e);
    return this._bufs[n[0]][n[1]]
  }, o.prototype.slice = function (e, n) {
    return "number" == typeof e && e < 0 && (e += this.length), "number" == typeof n && n < 0 && (n += this.length), this.copy(null, 0, e, n)
  }, o.prototype.copy = function (e, n, t, o) {
    if (("number" != typeof t || t < 0) && (t = 0), ("number" != typeof o || o > this.length) && (o = this.length), t >= this.length) return e || r.alloc(0);
    if (o <= 0) return e || r.alloc(0);
    const c = !!e, l = this._offset(t), k = o - t;
    let h = k, f = c && n || 0, d = l[1];
    if (0 === t && o === this.length) {
      if (!c) return 1 === this._bufs.length ? this._bufs[0] : r.concat(this._bufs, this.length);
      for (let i = 0; i < this._bufs.length; i++) this._bufs[i].copy(e, f), f += this._bufs[i].length;
      return e
    }
    if (h <= this._bufs[l[0]].length - d) return c ? this._bufs[l[0]].copy(e, n, d, d + h) : this._bufs[l[0]].slice(d, d + h);
    c || (e = r.allocUnsafe(k));
    for (let i = l[0]; i < this._bufs.length; i++) {
      const n = this._bufs[i].length - d;
      if (!(h > n)) {
        this._bufs[i].copy(e, f, d, d + h), f += n;
        break
      }
      this._bufs[i].copy(e, f, d), f += n, h -= n, d && (d = 0)
    }
    return e.length > f ? e.slice(0, f) : e
  }, o.prototype.shallowSlice = function (e, n) {
    if (e = e || 0, n = "number" != typeof n ? this.length : n, e < 0 && (e += this.length), n < 0 && (n += this.length), e === n) return this._new();
    const t = this._offset(e), r = this._offset(n), o = this._bufs.slice(t[0], r[0] + 1);
    return 0 === r[1] ? o.pop() : o[o.length - 1] = o[o.length - 1].slice(0, r[1]), 0 !== t[1] && (o[0] = o[0].slice(t[1])), this._new(o)
  }, o.prototype.toString = function (e, n, t) {
    return this.slice(n, t).toString(e)
  }, o.prototype.consume = function (e) {
    if (e = Math.trunc(e), Number.isNaN(e) || e <= 0) return this;
    for (; this._bufs.length;) {
      if (!(e >= this._bufs[0].length)) {
        this._bufs[0] = this._bufs[0].slice(e), this.length -= e;
        break
      }
      e -= this._bufs[0].length, this.length -= this._bufs[0].length, this._bufs.shift()
    }
    return this
  }, o.prototype.duplicate = function () {
    const e = this._new();
    for (let i = 0; i < this._bufs.length; i++) e.append(this._bufs[i]);
    return e
  }, o.prototype.append = function (e) {
    if (null == e) return this;
    if (e.buffer) this._appendBuffer(r.from(e.buffer, e.byteOffset, e.byteLength)); else if (Array.isArray(e)) for (let i = 0; i < e.length; i++) this.append(e[i]); else if (this._isBufferList(e)) for (let i = 0; i < e._bufs.length; i++) this.append(e._bufs[i]); else "number" == typeof e && (e = e.toString()), this._appendBuffer(r.from(e));
    return this
  }, o.prototype._appendBuffer = function (e) {
    this._bufs.push(e), this.length += e.length
  }, o.prototype.indexOf = function (e, n, t) {
    if (void 0 === t && "string" == typeof n && (t = n, n = void 0), "function" == typeof e || Array.isArray(e)) throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
    if ("number" == typeof e ? e = r.from([e]) : "string" == typeof e ? e = r.from(e, t) : this._isBufferList(e) ? e = e.slice() : Array.isArray(e.buffer) ? e = r.from(e.buffer, e.byteOffset, e.byteLength) : r.isBuffer(e) || (e = r.from(e)), n = Number(n || 0), isNaN(n) && (n = 0), n < 0 && (n = this.length + n), n < 0 && (n = 0), 0 === e.length) return n > this.length ? this.length : n;
    const o = this._offset(n);
    let c = o[0], l = o[1];
    for (; c < this._bufs.length; c++) {
      const n = this._bufs[c];
      for (; l < n.length;) {
        if (n.length - l >= e.length) {
          const t = n.indexOf(e, l);
          if (-1 !== t) return this._reverseOffset([c, t]);
          l = n.length - e.length + 1
        } else {
          const n = this._reverseOffset([c, l]);
          if (this._match(n, e)) return n;
          l++
        }
      }
      l = 0
    }
    return -1
  }, o.prototype._match = function (e, n) {
    if (this.length - e < n.length) return !1;
    for (let t = 0; t < n.length; t++) if (this.get(e + t) !== n[t]) return !1;
    return !0
  }, function () {
    const e = {
      readDoubleBE: 8,
      readDoubleLE: 8,
      readFloatBE: 4,
      readFloatLE: 4,
      readInt32BE: 4,
      readInt32LE: 4,
      readUInt32BE: 4,
      readUInt32LE: 4,
      readInt16BE: 2,
      readInt16LE: 2,
      readUInt16BE: 2,
      readUInt16LE: 2,
      readInt8: 1,
      readUInt8: 1,
      readIntBE: null,
      readIntLE: null,
      readUIntBE: null,
      readUIntLE: null
    };
    for (const n in e) !function (n) {
      o.prototype[n] = null === e[n] ? function (e, t) {
        return this.slice(e, e + t)[n](0, t)
      } : function (t) {
        return this.slice(t, t + e[n])[n](0)
      }
    }(n)
  }(), o.prototype._isBufferList = function (b) {
    return b instanceof o || o.isBufferList(b)
  }, o.isBufferList = function (b) {
    return null != b && b[symbol]
  }, e.exports = o
}, function (e) {
  e.exports = JSON.parse('{"identity":0,"ip4":4,"tcp":6,"sha1":17,"sha2-256":18,"sha2-512":19,"sha3-512":20,"sha3-384":21,"sha3-256":22,"sha3-224":23,"shake-128":24,"shake-256":25,"keccak-224":26,"keccak-256":27,"keccak-384":28,"keccak-512":29,"blake3":30,"dccp":33,"murmur3-128":34,"murmur3-32":35,"ip6":41,"ip6zone":42,"path":47,"multicodec":48,"multihash":49,"multiaddr":50,"multibase":51,"dns":53,"dns4":54,"dns6":55,"dnsaddr":56,"protobuf":80,"cbor":81,"raw":85,"dbl-sha2-256":86,"rlp":96,"bencode":99,"dag-pb":112,"dag-cbor":113,"libp2p-key":114,"git-raw":120,"torrent-info":123,"torrent-file":124,"leofcoin-block":129,"leofcoin-tx":130,"leofcoin-pr":131,"sctp":132,"dag-jose":133,"dag-cose":134,"eth-block":144,"eth-block-list":145,"eth-tx-trie":146,"eth-tx":147,"eth-tx-receipt-trie":148,"eth-tx-receipt":149,"eth-state-trie":150,"eth-account-snapshot":151,"eth-storage-trie":152,"bitcoin-block":176,"bitcoin-tx":177,"bitcoin-witness-commitment":178,"zcash-block":192,"zcash-tx":193,"stellar-block":208,"stellar-tx":209,"md4":212,"md5":213,"bmt":214,"decred-block":224,"decred-tx":225,"ipld-ns":226,"ipfs-ns":227,"swarm-ns":228,"ipns-ns":229,"zeronet":230,"secp256k1-pub":231,"bls12_381-g1-pub":234,"bls12_381-g2-pub":235,"x25519-pub":236,"ed25519-pub":237,"dash-block":240,"dash-tx":241,"swarm-manifest":250,"swarm-feed":251,"udp":273,"p2p-webrtc-star":275,"p2p-webrtc-direct":276,"p2p-stardust":277,"p2p-circuit":290,"dag-json":297,"udt":301,"utp":302,"unix":400,"p2p":421,"ipfs":421,"https":443,"onion":444,"onion3":445,"garlic64":446,"garlic32":447,"tls":448,"quic":460,"ws":477,"wss":478,"p2p-websocket-star":479,"http":480,"json":512,"messagepack":513,"libp2p-peer-record":769,"sha2-256-trunc254-padded":4114,"ripemd-128":4178,"ripemd-160":4179,"ripemd-256":4180,"ripemd-320":4181,"x11":4352,"sm3-256":21325,"blake2b-8":45569,"blake2b-16":45570,"blake2b-24":45571,"blake2b-32":45572,"blake2b-40":45573,"blake2b-48":45574,"blake2b-56":45575,"blake2b-64":45576,"blake2b-72":45577,"blake2b-80":45578,"blake2b-88":45579,"blake2b-96":45580,"blake2b-104":45581,"blake2b-112":45582,"blake2b-120":45583,"blake2b-128":45584,"blake2b-136":45585,"blake2b-144":45586,"blake2b-152":45587,"blake2b-160":45588,"blake2b-168":45589,"blake2b-176":45590,"blake2b-184":45591,"blake2b-192":45592,"blake2b-200":45593,"blake2b-208":45594,"blake2b-216":45595,"blake2b-224":45596,"blake2b-232":45597,"blake2b-240":45598,"blake2b-248":45599,"blake2b-256":45600,"blake2b-264":45601,"blake2b-272":45602,"blake2b-280":45603,"blake2b-288":45604,"blake2b-296":45605,"blake2b-304":45606,"blake2b-312":45607,"blake2b-320":45608,"blake2b-328":45609,"blake2b-336":45610,"blake2b-344":45611,"blake2b-352":45612,"blake2b-360":45613,"blake2b-368":45614,"blake2b-376":45615,"blake2b-384":45616,"blake2b-392":45617,"blake2b-400":45618,"blake2b-408":45619,"blake2b-416":45620,"blake2b-424":45621,"blake2b-432":45622,"blake2b-440":45623,"blake2b-448":45624,"blake2b-456":45625,"blake2b-464":45626,"blake2b-472":45627,"blake2b-480":45628,"blake2b-488":45629,"blake2b-496":45630,"blake2b-504":45631,"blake2b-512":45632,"blake2s-8":45633,"blake2s-16":45634,"blake2s-24":45635,"blake2s-32":45636,"blake2s-40":45637,"blake2s-48":45638,"blake2s-56":45639,"blake2s-64":45640,"blake2s-72":45641,"blake2s-80":45642,"blake2s-88":45643,"blake2s-96":45644,"blake2s-104":45645,"blake2s-112":45646,"blake2s-120":45647,"blake2s-128":45648,"blake2s-136":45649,"blake2s-144":45650,"blake2s-152":45651,"blake2s-160":45652,"blake2s-168":45653,"blake2s-176":45654,"blake2s-184":45655,"blake2s-192":45656,"blake2s-200":45657,"blake2s-208":45658,"blake2s-216":45659,"blake2s-224":45660,"blake2s-232":45661,"blake2s-240":45662,"blake2s-248":45663,"blake2s-256":45664,"skein256-8":45825,"skein256-16":45826,"skein256-24":45827,"skein256-32":45828,"skein256-40":45829,"skein256-48":45830,"skein256-56":45831,"skein256-64":45832,"skein256-72":45833,"skein256-80":45834,"skein256-88":45835,"skein256-96":45836,"skein256-104":45837,"skein256-112":45838,"skein256-120":45839,"skein256-128":45840,"skein256-136":45841,"skein256-144":45842,"skein256-152":45843,"skein256-160":45844,"skein256-168":45845,"skein256-176":45846,"skein256-184":45847,"skein256-192":45848,"skein256-200":45849,"skein256-208":45850,"skein256-216":45851,"skein256-224":45852,"skein256-232":45853,"skein256-240":45854,"skein256-248":45855,"skein256-256":45856,"skein512-8":45857,"skein512-16":45858,"skein512-24":45859,"skein512-32":45860,"skein512-40":45861,"skein512-48":45862,"skein512-56":45863,"skein512-64":45864,"skein512-72":45865,"skein512-80":45866,"skein512-88":45867,"skein512-96":45868,"skein512-104":45869,"skein512-112":45870,"skein512-120":45871,"skein512-128":45872,"skein512-136":45873,"skein512-144":45874,"skein512-152":45875,"skein512-160":45876,"skein512-168":45877,"skein512-176":45878,"skein512-184":45879,"skein512-192":45880,"skein512-200":45881,"skein512-208":45882,"skein512-216":45883,"skein512-224":45884,"skein512-232":45885,"skein512-240":45886,"skein512-248":45887,"skein512-256":45888,"skein512-264":45889,"skein512-272":45890,"skein512-280":45891,"skein512-288":45892,"skein512-296":45893,"skein512-304":45894,"skein512-312":45895,"skein512-320":45896,"skein512-328":45897,"skein512-336":45898,"skein512-344":45899,"skein512-352":45900,"skein512-360":45901,"skein512-368":45902,"skein512-376":45903,"skein512-384":45904,"skein512-392":45905,"skein512-400":45906,"skein512-408":45907,"skein512-416":45908,"skein512-424":45909,"skein512-432":45910,"skein512-440":45911,"skein512-448":45912,"skein512-456":45913,"skein512-464":45914,"skein512-472":45915,"skein512-480":45916,"skein512-488":45917,"skein512-496":45918,"skein512-504":45919,"skein512-512":45920,"skein1024-8":45921,"skein1024-16":45922,"skein1024-24":45923,"skein1024-32":45924,"skein1024-40":45925,"skein1024-48":45926,"skein1024-56":45927,"skein1024-64":45928,"skein1024-72":45929,"skein1024-80":45930,"skein1024-88":45931,"skein1024-96":45932,"skein1024-104":45933,"skein1024-112":45934,"skein1024-120":45935,"skein1024-128":45936,"skein1024-136":45937,"skein1024-144":45938,"skein1024-152":45939,"skein1024-160":45940,"skein1024-168":45941,"skein1024-176":45942,"skein1024-184":45943,"skein1024-192":45944,"skein1024-200":45945,"skein1024-208":45946,"skein1024-216":45947,"skein1024-224":45948,"skein1024-232":45949,"skein1024-240":45950,"skein1024-248":45951,"skein1024-256":45952,"skein1024-264":45953,"skein1024-272":45954,"skein1024-280":45955,"skein1024-288":45956,"skein1024-296":45957,"skein1024-304":45958,"skein1024-312":45959,"skein1024-320":45960,"skein1024-328":45961,"skein1024-336":45962,"skein1024-344":45963,"skein1024-352":45964,"skein1024-360":45965,"skein1024-368":45966,"skein1024-376":45967,"skein1024-384":45968,"skein1024-392":45969,"skein1024-400":45970,"skein1024-408":45971,"skein1024-416":45972,"skein1024-424":45973,"skein1024-432":45974,"skein1024-440":45975,"skein1024-448":45976,"skein1024-456":45977,"skein1024-464":45978,"skein1024-472":45979,"skein1024-480":45980,"skein1024-488":45981,"skein1024-496":45982,"skein1024-504":45983,"skein1024-512":45984,"skein1024-520":45985,"skein1024-528":45986,"skein1024-536":45987,"skein1024-544":45988,"skein1024-552":45989,"skein1024-560":45990,"skein1024-568":45991,"skein1024-576":45992,"skein1024-584":45993,"skein1024-592":45994,"skein1024-600":45995,"skein1024-608":45996,"skein1024-616":45997,"skein1024-624":45998,"skein1024-632":45999,"skein1024-640":46000,"skein1024-648":46001,"skein1024-656":46002,"skein1024-664":46003,"skein1024-672":46004,"skein1024-680":46005,"skein1024-688":46006,"skein1024-696":46007,"skein1024-704":46008,"skein1024-712":46009,"skein1024-720":46010,"skein1024-728":46011,"skein1024-736":46012,"skein1024-744":46013,"skein1024-752":46014,"skein1024-760":46015,"skein1024-768":46016,"skein1024-776":46017,"skein1024-784":46018,"skein1024-792":46019,"skein1024-800":46020,"skein1024-808":46021,"skein1024-816":46022,"skein1024-824":46023,"skein1024-832":46024,"skein1024-840":46025,"skein1024-848":46026,"skein1024-856":46027,"skein1024-864":46028,"skein1024-872":46029,"skein1024-880":46030,"skein1024-888":46031,"skein1024-896":46032,"skein1024-904":46033,"skein1024-912":46034,"skein1024-920":46035,"skein1024-928":46036,"skein1024-936":46037,"skein1024-944":46038,"skein1024-952":46039,"skein1024-960":46040,"skein1024-968":46041,"skein1024-976":46042,"skein1024-984":46043,"skein1024-992":46044,"skein1024-1000":46045,"skein1024-1008":46046,"skein1024-1016":46047,"skein1024-1024":46048,"poseidon-bls12_381-a2-fc1":46081,"poseidon-bls12_381-a2-fc1-sc":46082,"zeroxcert-imprint-256":52753,"fil-commitment-unsealed":61697,"fil-commitment-sealed":61698,"holochain-adr-v0":8417572,"holochain-adr-v1":8483108,"holochain-key-v0":9728292,"holochain-key-v1":9793828,"holochain-sig-v0":10645796,"holochain-sig-v1":10711332}')
}, , , , function (e, n, t) {
  "use strict";
  const {URLWithLegacySupport: r, format: o, URLSearchParams: c, defaultBase: l} = t(819), k = t(941);
  e.exports = {URL: r, URLSearchParams: c, format: o, relative: k, defaultBase: l}
}, function (e, n) {
  "object" != typeof globalThis && (Object.defineProperty(Object.prototype, "__magic__", {
    get: function () {
      return this
    }, configurable: !0
  }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__), e.exports = globalThis
}, function (e, n, t) {
  "use strict";
  const r = t(834), o = t(835), c = t(836), l = t(759), k = t(1016), h = t(348), f = t(718), d = t(712), m = t(733),
    w = Object.keys(l).reduce((p, e) => (p[l[e]] = e, p), {});

  class y {
    constructor(e, n, t, l) {
      if (E.isCID(e)) {
        const n = e;
        return this.version = n.version, this.codec = n.codec, this.multihash = n.multihash, void (this.multibaseName = n.multibaseName || (0 === n.version ? "base58btc" : "base32"))
      }
      if ("string" == typeof e) {
        const n = o.isEncoded(e);
        if (n) {
          const t = o.decode(e);
          this.version = parseInt(t.slice(0, 1).toString("hex"), 16), this.codec = c.getCodec(t.slice(1)), this.multihash = c.rmPrefix(t.slice(1)), this.multibaseName = n
        } else this.version = 0, this.codec = "dag-pb", this.multihash = r.fromB58String(e), this.multibaseName = "base58btc";
        return y.validateCID(this), void Object.defineProperty(this, "string", {value: e})
      }
      if (e instanceof Uint8Array) {
        const n = e.slice(0, 1), t = parseInt(n.toString("hex"), 16);
        if (1 === t) {
          const n = e;
          this.version = t, this.codec = c.getCodec(n.slice(1)), this.multihash = c.rmPrefix(n.slice(1)), this.multibaseName = "base32"
        } else this.version = 0, this.codec = "dag-pb", this.multihash = e, this.multibaseName = "base58btc";
        y.validateCID(this)
      } else this.version = e, "number" == typeof n && (n = w[n]), this.codec = n, this.multihash = t, this.multibaseName = l || (0 === e ? "base58btc" : "base32"), y.validateCID(this)
    }

    get bytes() {
      let e = this._bytes;
      if (!e) {
        if (0 === this.version) e = this.multihash; else {
          if (1 !== this.version) throw new Error("unsupported version");
          {
            const n = c.getCodeVarint(this.codec);
            e = f([[1], n, this.multihash], 1 + n.byteLength + this.multihash.byteLength)
          }
        }
        Object.defineProperty(this, "_bytes", {value: e})
      }
      return e
    }

    get prefix() {
      const e = c.getCodeVarint(this.codec), n = r.prefix(this.multihash);
      return f([[this.version], e, n], 1 + e.byteLength + n.byteLength)
    }

    get code() {
      return l[this.codec]
    }

    toV0() {
      if ("dag-pb" !== this.codec) throw new Error("Cannot convert a non dag-pb CID to CIDv0");
      const {name: e, length: n} = r.decode(this.multihash);
      if ("sha2-256" !== e) throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
      if (32 !== n) throw new Error("Cannot convert non 32 byte multihash CID to CIDv0");
      return new E(0, this.codec, this.multihash)
    }

    toV1() {
      return new E(1, this.codec, this.multihash)
    }

    toBaseEncodedString(base = this.multibaseName) {
      if (this.string && base === this.multibaseName) return this.string;
      let e = null;
      if (0 === this.version) {
        if ("base58btc" !== base) throw new Error("not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()");
        e = r.toB58String(this.multihash)
      } else {
        if (1 !== this.version) throw new Error("unsupported version");
        e = d(o.encode(base, this.bytes))
      }
      return base === this.multibaseName && Object.defineProperty(this, "string", {value: e}), e
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")"
    }

    toString(base) {
      return this.toBaseEncodedString(base)
    }

    toJSON() {
      return {codec: this.codec, version: this.version, hash: this.multihash}
    }

    equals(e) {
      return this.codec === e.codec && this.version === e.version && m(this.multihash, e.multihash)
    }

    static validateCID(e) {
      const n = k.checkCIDComponents(e);
      if (n) throw new Error(n)
    }
  }

  const E = h(y, {className: "CID", symbolName: "@ipld/js-cid/CID"});
  E.codecs = l, e.exports = E
}, function (e, n, t) {
  "use strict";
  const r = t(746).BigNumber;
  n.MT = {
    POS_INT: 0,
    NEG_INT: 1,
    BYTE_STRING: 2,
    UTF8_STRING: 3,
    ARRAY: 4,
    MAP: 5,
    TAG: 6,
    SIMPLE_FLOAT: 7
  }, n.TAG = {
    DATE_STRING: 0,
    DATE_EPOCH: 1,
    POS_BIGINT: 2,
    NEG_BIGINT: 3,
    DECIMAL_FRAC: 4,
    BIGFLOAT: 5,
    BASE64URL_EXPECTED: 21,
    BASE64_EXPECTED: 22,
    BASE16_EXPECTED: 23,
    CBOR: 24,
    URI: 32,
    BASE64URL: 33,
    BASE64: 34,
    REGEXP: 35,
    MIME: 36
  }, n.NUMBYTES = {ZERO: 0, ONE: 24, TWO: 25, FOUR: 26, EIGHT: 27, INDEFINITE: 31}, n.SIMPLE = {
    FALSE: 20,
    TRUE: 21,
    NULL: 22,
    UNDEFINED: 23
  }, n.SYMS = {
    NULL: Symbol("null"),
    UNDEFINED: Symbol("undef"),
    PARENT: Symbol("parent"),
    BREAK: Symbol("break"),
    STREAM: Symbol("stream")
  }, n.SHIFT32 = Math.pow(2, 32), n.SHIFT16 = Math.pow(2, 16), n.MAX_SAFE_HIGH = 2097151, n.NEG_ONE = new r(-1), n.TEN = new r(10), n.TWO = new r(2), n.PARENT = {
    ARRAY: 0,
    OBJECT: 1,
    MAP: 2,
    TAG: 3,
    BYTE_STRING: 4,
    UTF8_STRING: 5
  }
}, , , function (e, n, t) {
  "use strict";
  const r = t(774), {encodeText: o, decodeText: c, concat: l} = t(775);

  function k(e) {
    if (r.names[e]) return r.names[e];
    if (r.codes[e]) return r.codes[e];
    throw new Error("Unsupported encoding: " + e)
  }

  (n = e.exports = function (e, n) {
    if (!n) throw new Error("requires an encoded Uint8Array");
    const {name: t, codeBuf: r} = k(e);
    return function (e, n) {
      k(e).decode(c(n))
    }(t, n), l([r, n], r.length + n.length)
  }).encode = function (e, n) {
    const t = k(e), data = o(t.encode(n));
    return l([t.codeBuf, data], t.codeBuf.length + data.length)
  }, n.decode = function (data) {
    data instanceof Uint8Array && (data = c(data));
    const e = data[0];
    return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(e) && (data = data.toLowerCase()), k(data[0]).decode(data.substring(1))
  }, n.isEncoded = function (data) {
    if (data instanceof Uint8Array && (data = c(data)), "[object String]" !== Object.prototype.toString.call(data)) return !1;
    try {
      return k(data[0]).name
    } catch (e) {
      return !1
    }
  }, n.encoding = k, n.encodingFromData = function (data) {
    return data instanceof Uint8Array && (data = c(data)), k(data[0])
  }, n.names = Object.freeze(r.names), n.codes = Object.freeze(r.codes)
}, function (e, n, t) {
  "use strict";
  const r = t(738), o = t(899), {rfc4648: c} = t(900), {decodeText: l, encodeText: k} = t(775),
    h = [["identity", "\0", () => ({
      encode: l,
      decode: k
    }), ""], ["base2", "0", c(1), "01"], ["base8", "7", c(3), "01234567"], ["base10", "9", r, "0123456789"], ["base16", "f", c(4), "0123456789abcdef"], ["base16upper", "F", c(4), "0123456789ABCDEF"], ["base32hex", "v", c(5), "0123456789abcdefghijklmnopqrstuv"], ["base32hexupper", "V", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"], ["base32hexpad", "t", c(5), "0123456789abcdefghijklmnopqrstuv="], ["base32hexpadupper", "T", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="], ["base32", "b", c(5), "abcdefghijklmnopqrstuvwxyz234567"], ["base32upper", "B", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"], ["base32pad", "c", c(5), "abcdefghijklmnopqrstuvwxyz234567="], ["base32padupper", "C", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="], ["base32z", "h", c(5), "ybndrfg8ejkmcpqxot1uwisza345h769"], ["base36", "k", r, "0123456789abcdefghijklmnopqrstuvwxyz"], ["base36upper", "K", r, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["base58btc", "z", r, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"], ["base58flickr", "Z", r, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"], ["base64", "m", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"], ["base64pad", "M", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], ["base64url", "u", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"], ["base64urlpad", "U", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]],
    f = h.reduce((e, n) => (e[n[0]] = new o(n[0], n[1], n[2], n[3]), e), {}),
    d = h.reduce((e, n) => (e[n[1]] = f[n[0]], e), {});
  e.exports = {names: f, codes: d}
}, function (e, n, t) {
  "use strict";
  const {TextEncoder: r, TextDecoder: o} = t(711), c = new o, l = new r;
  e.exports = {
    decodeText: e => c.decode(e), encodeText: text => l.encode(text), concat: function (e, n) {
      const output = new Uint8Array(n);
      let t = 0;
      for (const n of e) output.set(n, t), t += n.length;
      return output
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(908), c = t(909), l = t(813), k = t(912);
  (n = e.exports).addPrefix = (e, data) => {
    let n;
    if (e instanceof Uint8Array) n = l.varintUint8ArrayEncode(e); else {
      if (!c[e]) throw new Error("multicodec not recognized");
      n = c[e]
    }
    return k([n, data], n.length + data.length)
  }, n.rmPrefix = data => (r.decode(data), data.slice(r.decode.bytes)), n.getCodec = e => {
    const code = r.decode(e), n = o.get(code);
    if (void 0 === n) throw new Error(`Code ${code} not found`);
    return n
  }, n.getName = e => o.get(e), n.getNumber = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return r.decode(code)
  }, n.getCode = e => r.decode(e), n.getCodeVarint = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return code
  }, n.getVarint = code => r.encode(code);
  const h = t(913);
  Object.assign(n, h), n.print = t(914)
}, function (e, n, t) {
  "use strict";

  function r(e) {
    if ("number" == typeof e) {
      if (r.codes[e]) return r.codes[e];
      throw new Error("no protocol with code: " + e)
    }
    if ("string" == typeof e || e instanceof String) {
      if (r.names[e]) return r.names[e];
      throw new Error("no protocol with name: " + e)
    }
    throw new Error("invalid protocol id type: " + e)
  }

  const o = -1;

  function p(code, e, n, t, path) {
    return {code: code, size: e, name: n, resolvable: Boolean(t), path: Boolean(path)}
  }

  r.lengthPrefixedVarSize = o, r.V = o, r.table = [[4, 32, "ip4"], [6, 16, "tcp"], [33, 16, "dccp"], [41, 128, "ip6"], [42, o, "ip6zone"], [53, o, "dns", "resolvable"], [54, o, "dns4", "resolvable"], [55, o, "dns6", "resolvable"], [56, o, "dnsaddr", "resolvable"], [132, 16, "sctp"], [273, 16, "udp"], [275, 0, "p2p-webrtc-star"], [276, 0, "p2p-webrtc-direct"], [277, 0, "p2p-stardust"], [290, 0, "p2p-circuit"], [301, 0, "udt"], [302, 0, "utp"], [400, o, "unix", !1, "path"], [421, o, "ipfs"], [421, o, "p2p"], [443, 0, "https"], [444, 96, "onion"], [445, 296, "onion3"], [446, o, "garlic64"], [460, 0, "quic"], [477, 0, "ws"], [478, 0, "wss"], [479, 0, "p2p-websocket-star"], [480, 0, "http"], [777, o, "memory"]], r.names = {}, r.codes = {}, r.table.map(e => {
    const n = p.apply(null, e);
    r.codes[n.code] = n, r.names[n.name] = n
  }), r.object = p, e.exports = r
}, function (e, n, t) {
  "use strict";
  const r = t(779), {encodeText: o, decodeText: c, concat: l} = t(780);

  function k(e) {
    if (r.names[e]) return r.names[e];
    if (r.codes[e]) return r.codes[e];
    throw new Error("Unsupported encoding: " + e)
  }

  (n = e.exports = function (e, n) {
    if (!n) throw new Error("requires an encoded Uint8Array");
    const {name: t, codeBuf: r} = k(e);
    return function (e, n) {
      k(e).decode(c(n))
    }(t, n), l([r, n], r.length + n.length)
  }).encode = function (e, n) {
    const t = k(e), data = o(t.encode(n));
    return l([t.codeBuf, data], t.codeBuf.length + data.length)
  }, n.decode = function (data) {
    data instanceof Uint8Array && (data = c(data));
    const e = data[0];
    return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(e) && (data = data.toLowerCase()), k(data[0]).decode(data.substring(1))
  }, n.isEncoded = function (data) {
    if (data instanceof Uint8Array && (data = c(data)), "[object String]" !== Object.prototype.toString.call(data)) return !1;
    try {
      return k(data[0]).name
    } catch (e) {
      return !1
    }
  }, n.encoding = k, n.encodingFromData = function (data) {
    return data instanceof Uint8Array && (data = c(data)), k(data[0])
  }, n.names = Object.freeze(r.names), n.codes = Object.freeze(r.codes)
}, function (e, n, t) {
  "use strict";
  const r = t(738), o = t(921), {rfc4648: c} = t(922), {decodeText: l, encodeText: k} = t(780),
    h = [["identity", "\0", () => ({
      encode: l,
      decode: k
    }), ""], ["base2", "0", c(1), "01"], ["base8", "7", c(3), "01234567"], ["base10", "9", r, "0123456789"], ["base16", "f", c(4), "0123456789abcdef"], ["base16upper", "F", c(4), "0123456789ABCDEF"], ["base32hex", "v", c(5), "0123456789abcdefghijklmnopqrstuv"], ["base32hexupper", "V", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"], ["base32hexpad", "t", c(5), "0123456789abcdefghijklmnopqrstuv="], ["base32hexpadupper", "T", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="], ["base32", "b", c(5), "abcdefghijklmnopqrstuvwxyz234567"], ["base32upper", "B", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"], ["base32pad", "c", c(5), "abcdefghijklmnopqrstuvwxyz234567="], ["base32padupper", "C", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="], ["base32z", "h", c(5), "ybndrfg8ejkmcpqxot1uwisza345h769"], ["base36", "k", r, "0123456789abcdefghijklmnopqrstuvwxyz"], ["base36upper", "K", r, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["base58btc", "z", r, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"], ["base58flickr", "Z", r, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"], ["base64", "m", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"], ["base64pad", "M", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], ["base64url", "u", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"], ["base64urlpad", "U", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]],
    f = h.reduce((e, n) => (e[n[0]] = new o(n[0], n[1], n[2], n[3]), e), {}),
    d = h.reduce((e, n) => (e[n[1]] = f[n[0]], e), {});
  e.exports = {names: f, codes: d}
}, function (e, n, t) {
  "use strict";
  const {TextEncoder: r, TextDecoder: o} = t(711), c = new o, l = new r;
  e.exports = {
    decodeText: e => c.decode(e), encodeText: text => l.encode(text), concat: function (e, n) {
      const output = new Uint8Array(n);
      let t = 0;
      for (const n of e) output.set(n, t), t += n.length;
      return output
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = e => {
    if (null != e) return "string" == typeof e || e instanceof String ? e : e.toString(8).padStart(4, "0")
  }
}, function (e, n, t) {
  "use strict";
  e.exports = function (e) {
    if (null != e) {
      if (e instanceof Date) {
        const n = e.getTime(), t = Math.floor(n / 1e3);
        return {secs: t, nsecs: 1e3 * (n - 1e3 * t)}
      }
      return Object.prototype.hasOwnProperty.call(e, "secs") ? {
        secs: e.secs,
        nsecs: e.nsecs
      } : Object.prototype.hasOwnProperty.call(e, "Seconds") ? {
        secs: e.Seconds,
        nsecs: e.FractionalNanoseconds
      } : Array.isArray(e) ? {secs: e[0], nsecs: e[1]} : void 0
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = async source => {
    let e;
    for await(const n of source) e = n;
    return e
  }
}, function (e, n, t) {
  "use strict";
  const r = t(738), o = t(962), {rfc4648: c} = t(963), {decodeText: l, encodeText: k} = t(785),
    h = [["identity", "\0", () => ({
      encode: l,
      decode: k
    }), ""], ["base2", "0", c(1), "01"], ["base8", "7", c(3), "01234567"], ["base10", "9", r, "0123456789"], ["base16", "f", c(4), "0123456789abcdef"], ["base16upper", "F", c(4), "0123456789ABCDEF"], ["base32hex", "v", c(5), "0123456789abcdefghijklmnopqrstuv"], ["base32hexupper", "V", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"], ["base32hexpad", "t", c(5), "0123456789abcdefghijklmnopqrstuv="], ["base32hexpadupper", "T", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="], ["base32", "b", c(5), "abcdefghijklmnopqrstuvwxyz234567"], ["base32upper", "B", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"], ["base32pad", "c", c(5), "abcdefghijklmnopqrstuvwxyz234567="], ["base32padupper", "C", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="], ["base32z", "h", c(5), "ybndrfg8ejkmcpqxot1uwisza345h769"], ["base36", "k", r, "0123456789abcdefghijklmnopqrstuvwxyz"], ["base36upper", "K", r, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["base58btc", "z", r, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"], ["base58flickr", "Z", r, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"], ["base64", "m", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"], ["base64pad", "M", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], ["base64url", "u", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"], ["base64urlpad", "U", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]],
    f = h.reduce((e, n) => (e[n[0]] = new o(n[0], n[1], n[2], n[3]), e), {}),
    d = h.reduce((e, n) => (e[n[1]] = f[n[0]], e), {});
  e.exports = {names: f, codes: d}
}, function (e, n, t) {
  "use strict";
  const {TextEncoder: r, TextDecoder: o} = t(711), c = new o, l = new r;
  e.exports = {
    decodeText: e => c.decode(e), encodeText: text => l.encode(text), concat: function (e, n) {
      const output = new Uint8Array(n);
      let t = 0;
      for (const n of e) output.set(n, t), t += n.length;
      return output
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(738), o = t(1002), {rfc4648: c} = t(1003), {decodeText: l, encodeText: k} = t(787),
    h = [["identity", "\0", () => ({
      encode: l,
      decode: k
    }), ""], ["base2", "0", c(1), "01"], ["base8", "7", c(3), "01234567"], ["base10", "9", r, "0123456789"], ["base16", "f", c(4), "0123456789abcdef"], ["base16upper", "F", c(4), "0123456789ABCDEF"], ["base32hex", "v", c(5), "0123456789abcdefghijklmnopqrstuv"], ["base32hexupper", "V", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"], ["base32hexpad", "t", c(5), "0123456789abcdefghijklmnopqrstuv="], ["base32hexpadupper", "T", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="], ["base32", "b", c(5), "abcdefghijklmnopqrstuvwxyz234567"], ["base32upper", "B", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"], ["base32pad", "c", c(5), "abcdefghijklmnopqrstuvwxyz234567="], ["base32padupper", "C", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="], ["base32z", "h", c(5), "ybndrfg8ejkmcpqxot1uwisza345h769"], ["base36", "k", r, "0123456789abcdefghijklmnopqrstuvwxyz"], ["base36upper", "K", r, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["base58btc", "z", r, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"], ["base58flickr", "Z", r, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"], ["base64", "m", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"], ["base64pad", "M", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], ["base64url", "u", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"], ["base64urlpad", "U", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]],
    f = h.reduce((e, n) => (e[n[0]] = new o(n[0], n[1], n[2], n[3]), e), {}),
    d = h.reduce((e, n) => (e[n[1]] = f[n[0]], e), {});
  e.exports = {names: f, codes: d}
}, function (e, n, t) {
  "use strict";
  const {TextEncoder: r, TextDecoder: o} = t(711), c = new o, l = new r;
  e.exports = {
    decodeText: e => c.decode(e), encodeText: text => l.encode(text), concat: function (e, n) {
      const output = new Uint8Array(n);
      let t = 0;
      for (const n of e) output.set(n, t), t += n.length;
      return output
    }
  }
}, function (e, n, t) {
  "use strict";
  n.defined = function (e) {
    return null != e && ("number" != typeof e || !isNaN(e))
  }
}, function (e, n, t) {
  "use strict";
  const r = t(756), o = t(842), c = t(1049), l = t(733);

  async function k(e, n, t) {
    const r = await k.digest(e, n, t);
    return o.encode(r, n, t)
  }

  k.multihash = o, k.digest = async (e, n, t) => {
    const r = k.createHash(n), o = await r(e);
    return t ? o.slice(0, t) : o
  }, k.createHash = function (e) {
    if (!e) throw r(new Error("hash algorithm must be specified"), "ERR_HASH_ALGORITHM_NOT_SPECIFIED");
    if (e = o.coerceCode(e), !k.functions[e]) throw r(new Error(`multihash function '${e}' not yet supported`), "ERR_HASH_ALGORITHM_NOT_SUPPORTED");
    return k.functions[e]
  }, k.functions = {
    0: c.identity,
    17: c.sha1,
    18: c.sha2256,
    19: c.sha2512,
    20: c.sha3512,
    21: c.sha3384,
    22: c.sha3256,
    23: c.sha3224,
    24: c.shake128,
    25: c.shake256,
    26: c.keccak224,
    27: c.keccak256,
    28: c.keccak384,
    29: c.keccak512,
    34: c.murmur3128,
    35: c.murmur332,
    86: c.dblSha2256
  }, c.addBlake(k.functions), k.validate = async (e, n) => {
    const t = await k(e, o.decode(n).name);
    return l(n, t)
  }, e.exports = k
}, function (e, n, t) {
  "use strict";
  const {TextEncoder: r, TextDecoder: o} = t(711), c = new o, l = new r;
  e.exports = {
    decodeText: e => c.decode(e), encodeText: text => l.encode(text), concat: function (e, n) {
      const output = new Uint8Array(n);
      let t = 0;
      for (const n of e) output.set(n, t), t += n.length;
      return output
    }
  }
}, function (e, n, t) {
  "use strict";
  const {Buffer: r} = t(2), o = t(746).BigNumber, c = t(770), l = c.SHIFT32, k = c.SHIFT16;
  n.parseHalf = function (e) {
    var n, t, r;
    return r = 128 & e[0] ? -1 : 1, n = (124 & e[0]) >> 2, t = (3 & e[0]) << 8 | e[1], n ? 31 === n ? r * (t ? NaN : Infinity) : r * Math.pow(2, n - 25) * (1024 + t) : 5.960464477539063e-8 * r * t
  }, n.arrayBufferToBignumber = function (e) {
    const n = e.byteLength;
    let t = "";
    for (let i = 0; i < n; i++) t += (r = e[i]) < 16 ? "0" + r.toString(16) : r.toString(16);
    var r;
    return new o(t, 16)
  }, n.buildMap = e => {
    const n = new Map, t = Object.keys(e), r = t.length;
    for (let i = 0; i < r; i++) n.set(t[i], e[t[i]]);
    return n
  }, n.buildInt32 = (e, g) => e * k + g, n.buildInt64 = (e, t, r, c) => {
    const k = n.buildInt32(e, t), g = n.buildInt32(r, c);
    return k > 2097151 ? new o(k).times(l).plus(g) : k * l + g
  }, n.writeHalf = function (e, n) {
    const t = r.allocUnsafe(4);
    t.writeFloatBE(n, 0);
    const u = t.readUInt32BE(0);
    if (0 != (8191 & u)) return !1;
    var o = u >> 16 & 32768;
    const c = u >> 23 & 255, l = 8388607 & u;
    if (c >= 113 && c <= 142) o += (c - 112 << 10) + (l >> 13); else {
      if (!(c >= 103 && c < 113)) return !1;
      if (l & (1 << 126 - c) - 1) return !1;
      o += l + 8388608 >> 126 - c
    }
    return e.writeUInt16BE(o, 0), !0
  }, n.keySorter = function (a, b) {
    var e = a[0].byteLength, n = b[0].byteLength;
    return e > n ? 1 : n > e ? -1 : a[0].compare(b[0])
  }, n.isNegativeZero = e => 0 === e && 1 / e < 0, n.nextPowerOf2 = e => {
    let n = 0;
    if (e && !(e & e - 1)) return e;
    for (; 0 !== e;) e >>= 1, n += 1;
    return 1 << n
  }
}, function (e, n, t) {
  "use strict";
  const r = t(738), o = t(1069), {rfc4648: c} = t(1070), {decodeText: l, encodeText: k} = t(793),
    h = [["identity", "\0", () => ({
      encode: l,
      decode: k
    }), ""], ["base2", "0", c(1), "01"], ["base8", "7", c(3), "01234567"], ["base10", "9", r, "0123456789"], ["base16", "f", c(4), "0123456789abcdef"], ["base16upper", "F", c(4), "0123456789ABCDEF"], ["base32hex", "v", c(5), "0123456789abcdefghijklmnopqrstuv"], ["base32hexupper", "V", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"], ["base32hexpad", "t", c(5), "0123456789abcdefghijklmnopqrstuv="], ["base32hexpadupper", "T", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="], ["base32", "b", c(5), "abcdefghijklmnopqrstuvwxyz234567"], ["base32upper", "B", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"], ["base32pad", "c", c(5), "abcdefghijklmnopqrstuvwxyz234567="], ["base32padupper", "C", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="], ["base32z", "h", c(5), "ybndrfg8ejkmcpqxot1uwisza345h769"], ["base36", "k", r, "0123456789abcdefghijklmnopqrstuvwxyz"], ["base36upper", "K", r, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["base58btc", "z", r, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"], ["base58flickr", "Z", r, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"], ["base64", "m", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"], ["base64pad", "M", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], ["base64url", "u", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"], ["base64urlpad", "U", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]],
    f = h.reduce((e, n) => (e[n[0]] = new o(n[0], n[1], n[2], n[3]), e), {}),
    d = h.reduce((e, n) => (e[n[1]] = f[n[0]], e), {});
  e.exports = {names: f, codes: d}
}, function (e, n, t) {
  "use strict";
  const {TextEncoder: r, TextDecoder: o} = t(711), c = new o, l = new r;
  e.exports = {
    decodeText: e => c.decode(e), encodeText: text => l.encode(text), concat: function (e, n) {
      const output = new Uint8Array(n);
      let t = 0;
      for (const n of e) output.set(n, t), t += n.length;
      return output
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(738), o = t(1085), {rfc4648: c} = t(1086), {decodeText: l, encodeText: k} = t(795),
    h = [["identity", "\0", () => ({
      encode: l,
      decode: k
    }), ""], ["base2", "0", c(1), "01"], ["base8", "7", c(3), "01234567"], ["base10", "9", r, "0123456789"], ["base16", "f", c(4), "0123456789abcdef"], ["base16upper", "F", c(4), "0123456789ABCDEF"], ["base32hex", "v", c(5), "0123456789abcdefghijklmnopqrstuv"], ["base32hexupper", "V", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"], ["base32hexpad", "t", c(5), "0123456789abcdefghijklmnopqrstuv="], ["base32hexpadupper", "T", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="], ["base32", "b", c(5), "abcdefghijklmnopqrstuvwxyz234567"], ["base32upper", "B", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"], ["base32pad", "c", c(5), "abcdefghijklmnopqrstuvwxyz234567="], ["base32padupper", "C", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="], ["base32z", "h", c(5), "ybndrfg8ejkmcpqxot1uwisza345h769"], ["base36", "k", r, "0123456789abcdefghijklmnopqrstuvwxyz"], ["base36upper", "K", r, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["base58btc", "z", r, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"], ["base58flickr", "Z", r, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"], ["base64", "m", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"], ["base64pad", "M", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], ["base64url", "u", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"], ["base64urlpad", "U", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]],
    f = h.reduce((e, n) => (e[n[0]] = new o(n[0], n[1], n[2], n[3]), e), {}),
    d = h.reduce((e, n) => (e[n[1]] = f[n[0]], e), {});
  e.exports = {names: f, codes: d}
}, function (e, n, t) {
  "use strict";
  const {TextEncoder: r, TextDecoder: o} = t(711), c = new o, l = new r;
  e.exports = {
    decodeText: e => c.decode(e), encodeText: text => l.encode(text), concat: function (e, n) {
      const output = new Uint8Array(n);
      let t = 0;
      for (const n of e) output.set(n, t), t += n.length;
      return output
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    SendingQuery: 0,
    PeerResponse: 1,
    FinalPeer: 2,
    QueryError: 3,
    Provider: 4,
    Value: 5,
    AddingPeer: 6,
    DialingPeer: 7
  }
}, function (e, n, t) {
  "use strict";
  n.findSources = e => {
    let n = {}, t = [];
    return Array.isArray(e[e.length - 1]) || "object" != typeof e[e.length - 1] || (n = e.pop()), t = 1 === e.length && Array.isArray(e[0]) ? e[0] : e, {
      sources: t,
      options: n
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(738), o = t(1173), {rfc4648: c} = t(1174), {decodeText: l, encodeText: k} = t(799),
    h = [["identity", "\0", () => ({
      encode: l,
      decode: k
    }), ""], ["base2", "0", c(1), "01"], ["base8", "7", c(3), "01234567"], ["base10", "9", r, "0123456789"], ["base16", "f", c(4), "0123456789abcdef"], ["base16upper", "F", c(4), "0123456789ABCDEF"], ["base32hex", "v", c(5), "0123456789abcdefghijklmnopqrstuv"], ["base32hexupper", "V", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"], ["base32hexpad", "t", c(5), "0123456789abcdefghijklmnopqrstuv="], ["base32hexpadupper", "T", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="], ["base32", "b", c(5), "abcdefghijklmnopqrstuvwxyz234567"], ["base32upper", "B", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"], ["base32pad", "c", c(5), "abcdefghijklmnopqrstuvwxyz234567="], ["base32padupper", "C", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="], ["base32z", "h", c(5), "ybndrfg8ejkmcpqxot1uwisza345h769"], ["base36", "k", r, "0123456789abcdefghijklmnopqrstuvwxyz"], ["base36upper", "K", r, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["base58btc", "z", r, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"], ["base58flickr", "Z", r, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"], ["base64", "m", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"], ["base64pad", "M", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], ["base64url", "u", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"], ["base64urlpad", "U", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]],
    f = h.reduce((e, n) => (e[n[0]] = new o(n[0], n[1], n[2], n[3]), e), {}),
    d = h.reduce((e, n) => (e[n[1]] = f[n[0]], e), {});
  e.exports = {names: f, codes: d}
}, function (e, n, t) {
  "use strict";
  const {TextEncoder: r, TextDecoder: o} = t(711), c = new o, l = new r;
  e.exports = {
    decodeText: e => c.decode(e), encodeText: text => l.encode(text), concat: function (e, n) {
      const output = new Uint8Array(n);
      let t = 0;
      for (const n of e) output.set(n, t), t += n.length;
      return output
    }
  }
}, , , , , , , , , , , , function (e, n, t) {
  "use strict";
  const r = t(738), o = t(906), {rfc4648: c} = t(907), {decodeText: l, encodeText: k} = t(812),
    h = [["identity", "\0", () => ({
      encode: l,
      decode: k
    }), ""], ["base2", "0", c(1), "01"], ["base8", "7", c(3), "01234567"], ["base10", "9", r, "0123456789"], ["base16", "f", c(4), "0123456789abcdef"], ["base16upper", "F", c(4), "0123456789ABCDEF"], ["base32hex", "v", c(5), "0123456789abcdefghijklmnopqrstuv"], ["base32hexupper", "V", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"], ["base32hexpad", "t", c(5), "0123456789abcdefghijklmnopqrstuv="], ["base32hexpadupper", "T", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="], ["base32", "b", c(5), "abcdefghijklmnopqrstuvwxyz234567"], ["base32upper", "B", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"], ["base32pad", "c", c(5), "abcdefghijklmnopqrstuvwxyz234567="], ["base32padupper", "C", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="], ["base32z", "h", c(5), "ybndrfg8ejkmcpqxot1uwisza345h769"], ["base36", "k", r, "0123456789abcdefghijklmnopqrstuvwxyz"], ["base36upper", "K", r, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["base58btc", "z", r, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"], ["base58flickr", "Z", r, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"], ["base64", "m", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"], ["base64pad", "M", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], ["base64url", "u", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"], ["base64urlpad", "U", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]],
    f = h.reduce((e, n) => (e[n[0]] = new o(n[0], n[1], n[2], n[3]), e), {}),
    d = h.reduce((e, n) => (e[n[1]] = f[n[0]], e), {});
  e.exports = {names: f, codes: d}
}, function (e, n, t) {
  "use strict";
  const {TextEncoder: r, TextDecoder: o} = t(711), c = new o, l = new r;
  e.exports = {
    decodeText: e => c.decode(e), encodeText: text => l.encode(text), concat: function (e, n) {
      const output = new Uint8Array(n);
      let t = 0;
      for (const n of e) output.set(n, t), t += n.length;
      return output
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(910), c = t(911);

  function l(e) {
    return parseInt(o(e, "base16"), 16)
  }

  e.exports = {
    numberToUint8Array: function (e) {
      let n = e.toString(16);
      n.length % 2 == 1 && (n = "0" + n);
      return c(n, "base16")
    }, uint8ArrayToNumber: l, varintUint8ArrayEncode: function (input) {
      return Uint8Array.from(r.encode(l(input)))
    }, varintEncode: function (e) {
      return Uint8Array.from(r.encode(e))
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(815), o = t(778), c = t(928), l = t(755), k = t(936), h = t(348), f = t(718), d = t(712), m = t(733),
    w = Object.keys(l).reduce((p, e) => (p[l[e]] = e, p), {});

  class y {
    constructor(e, n, t, l) {
      if (E.isCID(e)) {
        const n = e;
        return this.version = n.version, this.codec = n.codec, this.multihash = n.multihash, void (this.multibaseName = n.multibaseName || (0 === n.version ? "base58btc" : "base32"))
      }
      if ("string" == typeof e) {
        const n = o.isEncoded(e);
        if (n) {
          const t = o.decode(e);
          this.version = parseInt(t.slice(0, 1).toString("hex"), 16), this.codec = c.getCodec(t.slice(1)), this.multihash = c.rmPrefix(t.slice(1)), this.multibaseName = n
        } else this.version = 0, this.codec = "dag-pb", this.multihash = r.fromB58String(e), this.multibaseName = "base58btc";
        return y.validateCID(this), void Object.defineProperty(this, "string", {value: e})
      }
      if (e instanceof Uint8Array) {
        const n = e.slice(0, 1), t = parseInt(n.toString("hex"), 16);
        if (1 === t) {
          const n = e;
          this.version = t, this.codec = c.getCodec(n.slice(1)), this.multihash = c.rmPrefix(n.slice(1)), this.multibaseName = "base32"
        } else this.version = 0, this.codec = "dag-pb", this.multihash = e, this.multibaseName = "base58btc";
        y.validateCID(this)
      } else this.version = e, "number" == typeof n && (n = w[n]), this.codec = n, this.multihash = t, this.multibaseName = l || (0 === e ? "base58btc" : "base32"), y.validateCID(this)
    }

    get bytes() {
      let e = this._bytes;
      if (!e) {
        if (0 === this.version) e = this.multihash; else {
          if (1 !== this.version) throw new Error("unsupported version");
          {
            const n = c.getCodeVarint(this.codec);
            e = f([[1], n, this.multihash], 1 + n.byteLength + this.multihash.byteLength)
          }
        }
        Object.defineProperty(this, "_bytes", {value: e})
      }
      return e
    }

    get prefix() {
      const e = c.getCodeVarint(this.codec), n = r.prefix(this.multihash);
      return f([[this.version], e, n], 1 + e.byteLength + n.byteLength)
    }

    get code() {
      return l[this.codec]
    }

    toV0() {
      if ("dag-pb" !== this.codec) throw new Error("Cannot convert a non dag-pb CID to CIDv0");
      const {name: e, length: n} = r.decode(this.multihash);
      if ("sha2-256" !== e) throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
      if (32 !== n) throw new Error("Cannot convert non 32 byte multihash CID to CIDv0");
      return new E(0, this.codec, this.multihash)
    }

    toV1() {
      return new E(1, this.codec, this.multihash)
    }

    toBaseEncodedString(base = this.multibaseName) {
      if (this.string && base === this.multibaseName) return this.string;
      let e = null;
      if (0 === this.version) {
        if ("base58btc" !== base) throw new Error("not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()");
        e = r.toB58String(this.multihash)
      } else {
        if (1 !== this.version) throw new Error("unsupported version");
        e = d(o.encode(base, this.bytes))
      }
      return base === this.multibaseName && Object.defineProperty(this, "string", {value: e}), e
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")"
    }

    toString(base) {
      return this.toBaseEncodedString(base)
    }

    toJSON() {
      return {codec: this.codec, version: this.version, hash: this.multihash}
    }

    equals(e) {
      return this.codec === e.codec && this.version === e.version && m(this.multihash, e.multihash)
    }

    static validateCID(e) {
      const n = k.checkCIDComponents(e);
      if (n) throw new Error(n)
    }
  }

  const E = h(y, {className: "CID", symbolName: "@ipld/js-cid/CID"});
  E.codecs = l, e.exports = E
}, function (e, n, t) {
  "use strict";
  const r = t(778), o = t(923), {names: c} = t(927), l = t(712), k = t(717), h = t(718), f = {};
  for (const e in c) f[c[e]] = e;

  function d(e) {
    if (!(e instanceof Uint8Array)) throw new Error("multihash must be a Uint8Array");
    if (e.length < 2) throw new Error("multihash too short. must be > 2 bytes.");
    const code = o.decode(e);
    if (!y(code)) throw new Error("multihash unknown function code: 0x" + code.toString(16));
    e = e.slice(o.decode.bytes);
    const n = o.decode(e);
    if (n < 0) throw new Error("multihash invalid length: " + n);
    if ((e = e.slice(o.decode.bytes)).length !== n) throw new Error("multihash length inconsistent: 0x" + l(e, "base16"));
    return {code: code, name: f[code], length: n, digest: e}
  }

  function m(e) {
    let code = e;
    if ("string" == typeof e) {
      if (void 0 === c[e]) throw new Error("Unrecognized hash function named: " + e);
      code = c[e]
    }
    if ("number" != typeof code) throw new Error("Hash function code should be a number. Got: " + code);
    if (void 0 === f[code] && !w(code)) throw new Error("Unrecognized function code: " + code);
    return code
  }

  function w(code) {
    return code > 0 && code < 16
  }

  function y(code) {
    return !!w(code) || !!f[code]
  }

  function E(e) {
    d(e)
  }

  e.exports = {
    names: c, codes: Object.freeze(f), toHexString: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(e, "base16")
    }, fromHexString: function (e) {
      return k(e, "base16")
    }, toB58String: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(r.encode("base58btc", e)).slice(1)
    }, fromB58String: function (e) {
      const n = e instanceof Uint8Array ? l(e) : e;
      return r.decode("z" + n)
    }, decode: d, encode: function (e, code, n) {
      if (!e || void 0 === code) throw new Error("multihash encode requires at least two args: digest, code");
      const t = m(code);
      if (!(e instanceof Uint8Array)) throw new Error("digest should be a Uint8Array");
      if (null == n && (n = e.length), n && e.length !== n) throw new Error("digest length should be equal to specified length.");
      const r = o.encode(t), c = o.encode(n);
      return h([r, c, e], r.length + c.length + e.length)
    }, coerceCode: m, isAppCode: w, validate: E, prefix: function (e) {
      return E(e), e.subarray(0, 2)
    }, isValidCode: y
  }
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(931), c = t(932);

  function l(e) {
    return parseInt(o(e, "base16"), 16)
  }

  e.exports = {
    numberToUint8Array: function (e) {
      let n = e.toString(16);
      n.length % 2 == 1 && (n = "0" + n);
      return c(n, "base16")
    }, uint8ArrayToNumber: l, varintUint8ArrayEncode: function (input) {
      return Uint8Array.from(r.encode(l(input)))
    }, varintEncode: function (e) {
      return Uint8Array.from(r.encode(e))
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(939), o = t(818).bind({ignoreUndefined: !0}), {URL: c, URLSearchParams: l} = t(767), k = t(942),
    h = t(730), f = t(734), d = r.Request, m = r.Headers;

  class w extends Error {
    constructor() {
      super("Request timed out"), this.name = "TimeoutError"
    }
  }

  class y extends Error {
    constructor(e) {
      super(e.statusText), this.name = "HTTPError", this.response = e
    }
  }

  const E = {headers: {}, throwHttpErrors: !0, credentials: "same-origin", transformSearchParams: p => p};

  class v {
    constructor(e = {}) {
      this.opts = o(E, e)
    }

    async fetch(e, n = {}) {
      const t = o(this.opts, n);
      if (t.headers = new m(t.headers), "string" != typeof e && !(e instanceof c || e instanceof d)) throw new TypeError("`resource` must be a string, URL, or Request");
      if (t.base && "string" == typeof t.base && "string" == typeof e) {
        if (e.startsWith("/")) throw new Error("`resource` must not begin with a slash when using `base`");
        t.base.endsWith("/") || (t.base += "/"), e = t.base + e
      }
      const k = new c(e, t.base);
      t.searchParams && (k.search = t.transformSearchParams(new l(t.searchParams))), void 0 !== t.json && (t.body = JSON.stringify(t.json), t.headers.set("content-type", "application/json"));
      const E = new h, v = f([E.signal, t.signal]), _ = await ((e, n, t) => {
        if (void 0 === n) return e;
        const r = Date.now(), o = () => Date.now() - r >= n;
        return new Promise((r, c) => {
          const l = setTimeout(() => {
            o() && (c(new w), t.abort())
          }, n), k = e => n => {
            clearTimeout(l), o() ? c(new w) : e(n)
          };
          e.then(k(r), k(c))
        })
      })(r(k, {...t, signal: v, timeout: void 0}), t.timeout, E);
      if (!_.ok && t.throwHttpErrors) throw t.handleError && await t.handleError(_), new y(_);
      return _.iterator = function () {
        const e = S(_.body);
        if (!A(e)) throw new Error("Can't convert fetch body into a Async Iterator:");
        return e
      }, _.ndjson = async function* () {
        for await(const e of x(_.iterator())) n.transform ? yield n.transform(e) : yield e
      }, _
    }

    post(e, n = {}) {
      return this.fetch(e, {...n, method: "POST"})
    }

    get(e, n = {}) {
      return this.fetch(e, {...n, method: "GET"})
    }

    put(e, n = {}) {
      return this.fetch(e, {...n, method: "PUT"})
    }

    delete(e, n = {}) {
      return this.fetch(e, {...n, method: "DELETE"})
    }

    options(e, n = {}) {
      return this.fetch(e, {...n, method: "OPTIONS"})
    }
  }

  const x = async function* (source) {
    const e = new k;
    let n = "";
    for await(const t of source) {
      n += e.decode(t, {stream: !0});
      const r = n.split(/\r?\n/);
      for (let i = 0; i < r.length - 1; i++) {
        const e = r[i].trim();
        e.length > 0 && (yield JSON.parse(e))
      }
      n = r[r.length - 1]
    }
    n += e.decode(), n = n.trim(), 0 !== n.length && (yield JSON.parse(n))
  }, S = function (source) {
    if (A(source)) {
      if (Object.prototype.hasOwnProperty.call(source, "readable") && Object.prototype.hasOwnProperty.call(source, "writable")) {
        const e = source[Symbol.asyncIterator](),
          n = {next: e.next.bind(e), return: () => (source.destroy(), e.return()), [Symbol.asyncIterator]: () => n};
        return n
      }
      return source
    }
    const e = source.getReader();
    return {
      next: () => e.read(), return: () => (e.releaseLock(), {}), [Symbol.asyncIterator]() {
        return this
      }
    }
  }, A = e => "object" == typeof e && null !== e && "function" == typeof e[Symbol.asyncIterator];
  v.HTTPError = y, v.TimeoutError = w, v.streamToAsyncIterator = S, v.post = (e, n) => new v(n).post(e, n), v.get = (e, n) => new v(n).get(e, n), v.put = (e, n) => new v(n).put(e, n), v.delete = (e, n) => new v(n).delete(e, n), v.options = (e, n) => new v(n).options(e, n), e.exports = v
}, function (e, n, t) {
  "use strict";
  const r = t(940), {hasOwnProperty: o} = Object.prototype, {propertyIsEnumerable: c} = Object,
    l = (e, n, t) => Object.defineProperty(e, n, {value: t, writable: !0, enumerable: !0, configurable: !0}), k = this,
    h = {concatArrays: !1, ignoreUndefined: !1}, f = e => {
      const n = [];
      for (const t in e) o.call(e, t) && n.push(t);
      if (Object.getOwnPropertySymbols) {
        const t = Object.getOwnPropertySymbols(e);
        for (const symbol of t) c.call(e, symbol) && n.push(symbol)
      }
      return n
    };

  function d(e) {
    return Array.isArray(e) ? function (e) {
      const n = e.slice(0, 0);
      return f(e).forEach(t => {
        l(n, t, d(e[t]))
      }), n
    }(e) : r(e) ? function (e) {
      const n = null === Object.getPrototypeOf(e) ? Object.create(null) : {};
      return f(e).forEach(t => {
        l(n, t, d(e[t]))
      }), n
    }(e) : e
  }

  const m = (e, source, n, t) => (n.forEach(n => {
    void 0 === source[n] && t.ignoreUndefined || (n in e && e[n] !== Object.getPrototypeOf(e) ? l(e, n, w(e[n], source[n], t)) : l(e, n, d(source[n])))
  }), e);

  function w(e, source, n) {
    return n.concatArrays && Array.isArray(e) && Array.isArray(source) ? ((e, source, n) => {
      let t = e.slice(0, 0), r = 0;
      return [e, source].forEach(c => {
        const k = [];
        for (let n = 0; n < c.length; n++) o.call(c, n) && (k.push(String(n)), l(t, r++, c === e ? c[n] : d(c[n])));
        t = m(t, c, f(c).filter(e => !k.includes(e)), n)
      }), t
    })(e, source, n) : r(source) && r(e) ? m(e, source, f(source), n) : d(source)
  }

  e.exports = function (...e) {
    const n = w(d(h), this !== k && this || {}, h);
    let t = {_: {}};
    for (const option of e) if (void 0 !== option) {
      if (!r(option)) throw new TypeError("`" + option + "` is not an Option Object");
      t = w(t, {_: option}, n)
    }
    return t._
  }
}, function (e, n, t) {
  "use strict";
  const r = self.location ? self.location.protocol + "//" + self.location.host : "", o = self.URL;
  e.exports = {
    URLWithLegacySupport: class {
      constructor(e = "", base = r) {
        this.super = new o(e, base), this.path = this.pathname + this.search, this.auth = this.username && this.password ? this.username + ":" + this.password : null, this.query = this.search && this.search.startsWith("?") ? this.search.slice(1) : null
      }

      get hash() {
        return this.super.hash
      }

      get host() {
        return this.super.host
      }

      get hostname() {
        return this.super.hostname
      }

      get href() {
        return this.super.href
      }

      get origin() {
        return this.super.origin
      }

      get password() {
        return this.super.password
      }

      get pathname() {
        return this.super.pathname
      }

      get port() {
        return this.super.port
      }

      get protocol() {
        return this.super.protocol
      }

      get search() {
        return this.super.search
      }

      get searchParams() {
        return this.super.searchParams
      }

      get username() {
        return this.super.username
      }

      set hash(e) {
        this.super.hash = e
      }

      set host(e) {
        this.super.host = e
      }

      set hostname(e) {
        this.super.hostname = e
      }

      set href(e) {
        this.super.href = e
      }

      set origin(e) {
        this.super.origin = e
      }

      set password(e) {
        this.super.password = e
      }

      set pathname(e) {
        this.super.pathname = e
      }

      set port(e) {
        this.super.port = e
      }

      set protocol(e) {
        this.super.protocol = e
      }

      set search(e) {
        this.super.search = e
      }

      set searchParams(e) {
        this.super.searchParams = e
      }

      set username(e) {
        this.super.username = e
      }

      createObjectURL(e) {
        return this.super.createObjectURL(e)
      }

      revokeObjectURL(e) {
        this.super.revokeObjectURL(e)
      }

      toJSON() {
        return this.super.toJSON()
      }

      toString() {
        return this.super.toString()
      }

      format() {
        return this.toString()
      }
    }, URLSearchParams: self.URLSearchParams, defaultBase: r, format: function (e) {
      if ("string" == typeof e) {
        return new o(e).toString()
      }
      if (!(e instanceof o)) {
        const n = e.username && e.password ? `${e.username}:${e.password}@` : "", t = e.auth ? e.auth + "@" : "",
          r = e.port ? ":" + e.port : "", o = e.protocol ? e.protocol + "//" : "", c = e.host || "",
          l = e.hostname || "", k = e.search || (e.query ? "?" + e.query : ""), h = e.hash || "", f = e.pathname || "";
        return `${o}${n || t}${c || l + r}${e.path || f + k}${h}`
      }
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(714), c = t(708), l = t(735), k = t(709), h = t(734), f = t(730).default;

  function d({name: e, hash: n, size: t, mode: o, mtime: c, mtimeNsecs: l}) {
    const output = {path: e, cid: new r(n), size: parseInt(t)};
    return null != o && (output.mode = parseInt(o, 8)), null != c && (output.mtime = {secs: c, nsecs: l || 0}), output
  }

  e.exports = c(e => async function* (input, n = {}) {
    const t = n.progress, r = new f, c = h([r.signal, n.signal]), m = await e.post("add", {
      searchParams: k({"stream-channels": !0, ...n, progress: Boolean(t)}),
      timeout: n.timeout,
      signal: c, ...await l(input, r, n.headers)
    });
    for await(let e of m.ndjson()) e = o(e), void 0 !== e.hash ? yield d(e) : t && t(e.bytes || 0)
  })
}, function (e, n, t) {
  (function (r) {
    n.formatArgs = function (n) {
      if (n[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + n[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors) return;
      const t = "color: " + this.color;
      n.splice(1, 0, t, "color: inherit");
      let r = 0, o = 0;
      n[0].replace(/%[a-zA-Z%]/g, e => {
        "%%" !== e && (r++, "%c" === e && (o = r))
      }), n.splice(o, 0, t)
    }, n.save = function (e) {
      try {
        e ? n.storage.setItem("debug", e) : n.storage.removeItem("debug")
      } catch (e) {
      }
    }, n.load = function () {
      let e;
      try {
        e = n.storage.getItem("debug")
      } catch (e) {
      }
      !e && void 0 !== r && "env" in r && (e = r.env.DEBUG);
      return e
    }, n.useColors = function () {
      if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
      if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
      return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
    }, n.storage = function () {
      try {
        return localStorage
      } catch (e) {
      }
    }(), n.destroy = (() => {
      let e = !1;
      return () => {
        e || (e = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))
      }
    })(), n.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], n.log = console.debug || console.log || (() => {
    }), e.exports = t(950)(n);
    const {formatters: o} = e.exports;
    o.j = function (e) {
      try {
        return JSON.stringify(e)
      } catch (e) {
        return "[UnexpectedJSONParseError]: " + e.message
      }
    }
  }).call(this, t(10))
}, function (e, n, t) {
  "use strict";
  e.exports = function (e) {
    const n = e[Symbol.asyncIterator] ? e[Symbol.asyncIterator]() : e[Symbol.iterator](), t = [], r = {
      peek: () => n.next(), push: e => {
        t.push(e)
      }, next: () => t.length ? {done: !1, value: t.shift()} : n.next()
    };
    return e[Symbol.asyncIterator] ? r[Symbol.asyncIterator] = () => r : r[Symbol.iterator] = () => r, r
  }
}, function (e, n, t) {
  "use strict";
  e.exports = async function* (e, n = {}) {
    const t = e.getReader();
    try {
      for (; ;) {
        const e = await t.read();
        if (e.done) return;
        yield e.value
      }
    } finally {
      !0 !== n.preventCancel && t.cancel(), t.releaseLock()
    }
  }
}, function (e, n, t) {
  "use strict";
  const {Blob: r} = t(768);
  e.exports = {
    isBytes: function (e) {
      return ArrayBuffer.isView(e) || e instanceof ArrayBuffer
    }, isBlob: function (e) {
      return void 0 !== r && e instanceof r
    }, isFileObject: function (e) {
      return "object" == typeof e && (e.path || e.content)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = async function* (source, e) {
    for await(const n of source) yield e(n)
  }
}, function (e, n, t) {
  "use strict";
  const {BigNumber: r} = t(746), o = t(710), c = t(708), l = t(709);
  e.exports = c(e => async function (n = {}) {
    const t = await e.post("bitswap/stat", {
      searchParams: l(n),
      timeout: n.timeout,
      signal: n.signal,
      headers: n.headers
    });
    return function (e) {
      return {
        provideBufLen: e.ProvideBufLen,
        wantlist: (e.Wantlist || []).map(e => new o(e["/"])),
        peers: e.Peers || [],
        blocksReceived: new r(e.BlocksReceived),
        dataReceived: new r(e.DataReceived),
        blocksSent: new r(e.BlocksSent),
        dataSent: new r(e.DataSent),
        dupBlksReceived: new r(e.DupBlksReceived),
        dupDataReceived: new r(e.DupDataReceived)
      }
    }(await t.json())
  })
}, function (e, n, t) {
  "use strict";
  const r = t(828), o = t(710), c = t(708), l = t(709);
  e.exports = c(e => async function (n, t = {}) {
    n = new o(n);
    const c = await e.post("block/get", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: l({arg: n.toString(), ...t}),
      headers: t.headers
    });
    return new r(new Uint8Array(await c.arrayBuffer()), n)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(961), o = t(348);
  e.exports = class {
    constructor(data, e) {
      if (!(data && data instanceof Uint8Array)) throw new Error("first argument  must be a Uint8Array");
      if (!e || !r.isCID(e)) throw new Error("second argument must be a CID");
      this._data = data, this._cid = e
    }

    get data() {
      return this._data
    }

    set data(e) {
      throw new Error("Tried to change an immutable block")
    }

    get cid() {
      return this._cid
    }

    set cid(e) {
      throw new Error("Tried to change an immutable block")
    }

    static isBlock(e) {
    }
  }, e.exports = o(e.exports, {className: "Block", symbolName: "@ipld/js-ipld-block/block"})
}, function (e, n, t) {
  "use strict";
  const r = t(830), o = t(964), {names: c} = t(968), l = t(712), k = t(717), h = t(718), f = {};
  for (const e in c) f[c[e]] = e;

  function d(e) {
    if (!(e instanceof Uint8Array)) throw new Error("multihash must be a Uint8Array");
    if (e.length < 2) throw new Error("multihash too short. must be > 2 bytes.");
    const code = o.decode(e);
    if (!y(code)) throw new Error("multihash unknown function code: 0x" + code.toString(16));
    e = e.slice(o.decode.bytes);
    const n = o.decode(e);
    if (n < 0) throw new Error("multihash invalid length: " + n);
    if ((e = e.slice(o.decode.bytes)).length !== n) throw new Error("multihash length inconsistent: 0x" + l(e, "base16"));
    return {code: code, name: f[code], length: n, digest: e}
  }

  function m(e) {
    let code = e;
    if ("string" == typeof e) {
      if (void 0 === c[e]) throw new Error("Unrecognized hash function named: " + e);
      code = c[e]
    }
    if ("number" != typeof code) throw new Error("Hash function code should be a number. Got: " + code);
    if (void 0 === f[code] && !w(code)) throw new Error("Unrecognized function code: " + code);
    return code
  }

  function w(code) {
    return code > 0 && code < 16
  }

  function y(code) {
    return !!w(code) || !!f[code]
  }

  function E(e) {
    d(e)
  }

  e.exports = {
    names: c, codes: Object.freeze(f), toHexString: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(e, "base16")
    }, fromHexString: function (e) {
      return k(e, "base16")
    }, toB58String: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(r.encode("base58btc", e)).slice(1)
    }, fromB58String: function (e) {
      const n = e instanceof Uint8Array ? l(e) : e;
      return r.decode("z" + n)
    }, decode: d, encode: function (e, code, n) {
      if (!e || void 0 === code) throw new Error("multihash encode requires at least two args: digest, code");
      const t = m(code);
      if (!(e instanceof Uint8Array)) throw new Error("digest should be a Uint8Array");
      if (null == n && (n = e.length), n && e.length !== n) throw new Error("digest length should be equal to specified length.");
      const r = o.encode(t), c = o.encode(n);
      return h([r, c, e], r.length + c.length + e.length)
    }, coerceCode: m, isAppCode: w, validate: E, prefix: function (e) {
      return E(e), e.subarray(0, 2)
    }, isValidCode: y
  }
}, function (e, n, t) {
  "use strict";
  const r = t(784), {encodeText: o, decodeText: c, concat: l} = t(785);

  function k(e) {
    if (r.names[e]) return r.names[e];
    if (r.codes[e]) return r.codes[e];
    throw new Error("Unsupported encoding: " + e)
  }

  (n = e.exports = function (e, n) {
    if (!n) throw new Error("requires an encoded Uint8Array");
    const {name: t, codeBuf: r} = k(e);
    return function (e, n) {
      k(e).decode(c(n))
    }(t, n), l([r, n], r.length + n.length)
  }).encode = function (e, n) {
    const t = k(e), data = o(t.encode(n));
    return l([t.codeBuf, data], t.codeBuf.length + data.length)
  }, n.decode = function (data) {
    data instanceof Uint8Array && (data = c(data));
    const e = data[0];
    return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(e) && (data = data.toLowerCase()), k(data[0]).decode(data.substring(1))
  }, n.isEncoded = function (data) {
    if (data instanceof Uint8Array && (data = c(data)), "[object String]" !== Object.prototype.toString.call(data)) return !1;
    try {
      return k(data[0]).name
    } catch (e) {
      return !1
    }
  }, n.encoding = k, n.encodingFromData = function (data) {
    return data instanceof Uint8Array && (data = c(data)), k(data[0])
  }, n.names = Object.freeze(r.names), n.codes = Object.freeze(r.codes)
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(972), c = t(973);

  function l(e) {
    return parseInt(o(e, "base16"), 16)
  }

  e.exports = {
    numberToUint8Array: function (e) {
      let n = e.toString(16);
      n.length % 2 == 1 && (n = "0" + n);
      return c(n, "base16")
    }, uint8ArrayToNumber: l, varintUint8ArrayEncode: function (input) {
      return Uint8Array.from(r.encode(l(input)))
    }, varintEncode: function (e) {
      return Uint8Array.from(r.encode(e))
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(348), o = t(833), c = t(747), {serializeDAGNode: l} = t(838), k = t(1039), h = t(1058), f = t(1060),
    d = t(717), m = t(712);
  e.exports = r(class {
    constructor(data, e = [], n = null) {
      if (data || (data = new Uint8Array(0)), "string" == typeof data && (data = d(data)), !(data instanceof Uint8Array)) throw new Error("Passed 'data' is not a Uint8Array or a String!");
      if (null !== n && "number" != typeof n) throw new Error("Passed 'serializedSize' must be a number!");
      e = e.map(link => c.isDAGLink(link) ? link : c.util.createDagLinkFromB58EncodedHash(link)), o(e), Object.defineProperties(this, {
        Data: {
          value: data,
          writable: !1,
          enumerable: !0
        },
        Links: {value: e, writable: !1, enumerable: !0},
        _serializedSize: {value: n, writable: !0, enumerable: !1},
        _size: {value: null, writable: !0, enumerable: !1}
      })
    }

    toJSON() {
      return this._json || (this._json = Object.freeze({
        data: this.Data,
        links: this.Links.map(e => e.toJSON()),
        size: this.size
      })), Object.assign({}, this._json)
    }

    toString() {
      return `DAGNode <data: "${m(this.Data, "base64urlpad")}", links: ${this.Links.length}, size: ${this.size}>`
    }

    _invalidateCached() {
      this._serializedSize = null, this._size = null
    }

    addLink(link) {
      return this._invalidateCached(), h(this, link)
    }

    rmLink(link) {
      return this._invalidateCached(), f(this, link)
    }

    toDAGLink(e) {
      return k(this, e)
    }

    serialize() {
      return l(this)
    }

    get size() {
      return null === this._size && (null === this._serializedSize && (this._serializedSize = this.serialize().length), this._size = this.Links.reduce((e, n) => e + n.Tsize, this._serializedSize)), this._size
    }

    set size(e) {
      throw new Error("Can't set property: 'size' is immutable")
    }
  }, {className: "DAGNode", symbolName: "@ipld/js-ipld-dag-pb/dagnode"})
}, function (e, n, t) {
  "use strict";
  const r = t(1e3), o = t(1001), c = (a, b) => {
    const e = a.nameAsBuffer, n = b.nameAsBuffer;
    return o(e, n)
  };
  e.exports = e => {
    r.inplace(e, c)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(835), o = t(1004), {names: c} = t(1008), l = t(712), k = t(717), h = t(718), f = {};
  for (const e in c) f[c[e]] = e;

  function d(e) {
    if (!(e instanceof Uint8Array)) throw new Error("multihash must be a Uint8Array");
    if (e.length < 2) throw new Error("multihash too short. must be > 2 bytes.");
    const code = o.decode(e);
    if (!y(code)) throw new Error("multihash unknown function code: 0x" + code.toString(16));
    e = e.slice(o.decode.bytes);
    const n = o.decode(e);
    if (n < 0) throw new Error("multihash invalid length: " + n);
    if ((e = e.slice(o.decode.bytes)).length !== n) throw new Error("multihash length inconsistent: 0x" + l(e, "base16"));
    return {code: code, name: f[code], length: n, digest: e}
  }

  function m(e) {
    let code = e;
    if ("string" == typeof e) {
      if (void 0 === c[e]) throw new Error("Unrecognized hash function named: " + e);
      code = c[e]
    }
    if ("number" != typeof code) throw new Error("Hash function code should be a number. Got: " + code);
    if (void 0 === f[code] && !w(code)) throw new Error("Unrecognized function code: " + code);
    return code
  }

  function w(code) {
    return code > 0 && code < 16
  }

  function y(code) {
    return !!w(code) || !!f[code]
  }

  function E(e) {
    d(e)
  }

  e.exports = {
    names: c, codes: Object.freeze(f), toHexString: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(e, "base16")
    }, fromHexString: function (e) {
      return k(e, "base16")
    }, toB58String: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(r.encode("base58btc", e)).slice(1)
    }, fromB58String: function (e) {
      const n = e instanceof Uint8Array ? l(e) : e;
      return r.decode("z" + n)
    }, decode: d, encode: function (e, code, n) {
      if (!e || void 0 === code) throw new Error("multihash encode requires at least two args: digest, code");
      const t = m(code);
      if (!(e instanceof Uint8Array)) throw new Error("digest should be a Uint8Array");
      if (null == n && (n = e.length), n && e.length !== n) throw new Error("digest length should be equal to specified length.");
      const r = o.encode(t), c = o.encode(n);
      return h([r, c, e], r.length + c.length + e.length)
    }, coerceCode: m, isAppCode: w, validate: E, prefix: function (e) {
      return E(e), e.subarray(0, 2)
    }, isValidCode: y
  }
}, function (e, n, t) {
  "use strict";
  const r = t(786), {encodeText: o, decodeText: c, concat: l} = t(787);

  function k(e) {
    if (r.names[e]) return r.names[e];
    if (r.codes[e]) return r.codes[e];
    throw new Error("Unsupported encoding: " + e)
  }

  (n = e.exports = function (e, n) {
    if (!n) throw new Error("requires an encoded Uint8Array");
    const {name: t, codeBuf: r} = k(e);
    return function (e, n) {
      k(e).decode(c(n))
    }(t, n), l([r, n], r.length + n.length)
  }).encode = function (e, n) {
    const t = k(e), data = o(t.encode(n));
    return l([t.codeBuf, data], t.codeBuf.length + data.length)
  }, n.decode = function (data) {
    data instanceof Uint8Array && (data = c(data));
    const e = data[0];
    return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(e) && (data = data.toLowerCase()), k(data[0]).decode(data.substring(1))
  }, n.isEncoded = function (data) {
    if (data instanceof Uint8Array && (data = c(data)), "[object String]" !== Object.prototype.toString.call(data)) return !1;
    try {
      return k(data[0]).name
    } catch (e) {
      return !1
    }
  }, n.encoding = k, n.encodingFromData = function (data) {
    return data instanceof Uint8Array && (data = c(data)), k(data[0])
  }, n.names = Object.freeze(r.names), n.codes = Object.freeze(r.codes)
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(1009), c = t(1010), l = t(837), k = t(1013);
  (n = e.exports).addPrefix = (e, data) => {
    let n;
    if (e instanceof Uint8Array) n = l.varintUint8ArrayEncode(e); else {
      if (!c[e]) throw new Error("multicodec not recognized");
      n = c[e]
    }
    return k([n, data], n.length + data.length)
  }, n.rmPrefix = data => (r.decode(data), data.slice(r.decode.bytes)), n.getCodec = e => {
    const code = r.decode(e), n = o.get(code);
    if (void 0 === n) throw new Error(`Code ${code} not found`);
    return n
  }, n.getName = e => o.get(e), n.getNumber = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return r.decode(code)
  }, n.getCode = e => r.decode(e), n.getCodeVarint = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return code
  }, n.getVarint = code => r.encode(code);
  const h = t(1014);
  Object.assign(n, h), n.print = t(1015)
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(1011), c = t(1012);

  function l(e) {
    return parseInt(o(e, "base16"), 16)
  }

  e.exports = {
    numberToUint8Array: function (e) {
      let n = e.toString(16);
      n.length % 2 == 1 && (n = "0" + n);
      return c(n, "base16")
    }, uint8ArrayToNumber: l, varintUint8ArrayEncode: function (input) {
      return Uint8Array.from(r.encode(l(input)))
    }, varintEncode: function (e) {
      return Uint8Array.from(r.encode(e))
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(839)(t(840)), o = t(747);
  n = e.exports;
  const c = e => {
    const data = e.Data, n = e.Links || [];
    return r.PBNode.encode((e => {
      const n = {};
      return e.Data && e.Data.byteLength > 0 ? n.Data = e.Data : n.Data = null, e.Links && e.Links.length > 0 ? n.Links = e.Links.map(link => ({
        Hash: link.Hash.bytes,
        Name: link.Name,
        Tsize: link.Tsize
      })) : n.Links = null, n
    })({Data: data, Links: n}))
  };
  n.serializeDAGNode = c, n.serializeDAGNodeLike = (data, e = []) => {
    const n = {Data: data};
    return n.Links = e.map(link => o.isDAGLink(link) ? link : o.util.createDagLinkFromB58EncodedHash(link)), c(n)
  }
}, function (e, n, t) {
  "use strict";
  var r = t(1017), o = t(1021);
  e.exports = function (e, n) {
    if (n || (n = {}), !e) throw new Error("Pass in a .proto string or a protobuf-schema parsed object");
    var t = "object" != typeof e || e instanceof Uint8Array ? r.parse(e) : e, c = function () {
      var e = this;
      o(t, n.encodings || {}).forEach((function (n) {
        e[n.name] = function (e) {
          if (!e) return null;
          var n = {};
          return Object.keys(e).forEach((function (t) {
            n[t] = e[t].value
          })), n
        }(n.values) || n
      }))
    };
    return c.prototype.toString = function () {
      return r.stringify(t)
    }, c.prototype.toJSON = function () {
      return t
    }, new c
  }
}, function (e, n, t) {
  "use strict";
  e.exports = "// An IPFS MerkleDAG Link\nmessage PBLink {\n\n  // multihash of the target object\n  optional bytes Hash = 1;\n\n  // utf string name. should be unique per object\n  optional string Name = 2;\n\n  // cumulative size of target object\n  optional uint64 Tsize = 3;\n}\n\n// An IPFS MerkleDAG Node\nmessage PBNode {\n\n  // refs to other objects\n  repeated PBLink Links = 2;\n\n  // opaque user data\n  optional bytes Data = 1;\n}"
}, function (e, n, t) {
  "use strict";
  const r = t(769), o = t(836), c = t(789);
  (n = e.exports).codec = o.DAG_PB, n.defaultHashAlg = o.SHA2_256;
  n.cid = async (e, t) => {
    const l = {cidVersion: 1, hashAlg: n.defaultHashAlg}, k = Object.assign(l, t), h = await c(e, k.hashAlg),
      f = o.print[n.codec];
    return new r(k.cidVersion, f, h)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(1040), o = t(1044), {names: c} = t(1048), l = t(712), k = t(717), h = t(718), f = {};
  for (const e in c) f[c[e]] = e;

  function d(e) {
    if (!(e instanceof Uint8Array)) throw new Error("multihash must be a Uint8Array");
    if (e.length < 2) throw new Error("multihash too short. must be > 2 bytes.");
    const code = o.decode(e);
    if (!y(code)) throw new Error("multihash unknown function code: 0x" + code.toString(16));
    e = e.slice(o.decode.bytes);
    const n = o.decode(e);
    if (n < 0) throw new Error("multihash invalid length: " + n);
    if ((e = e.slice(o.decode.bytes)).length !== n) throw new Error("multihash length inconsistent: 0x" + l(e, "base16"));
    return {code: code, name: f[code], length: n, digest: e}
  }

  function m(e) {
    let code = e;
    if ("string" == typeof e) {
      if (void 0 === c[e]) throw new Error("Unrecognized hash function named: " + e);
      code = c[e]
    }
    if ("number" != typeof code) throw new Error("Hash function code should be a number. Got: " + code);
    if (void 0 === f[code] && !w(code)) throw new Error("Unrecognized function code: " + code);
    return code
  }

  function w(code) {
    return code > 0 && code < 16
  }

  function y(code) {
    return !!w(code) || !!f[code]
  }

  function E(e) {
    d(e)
  }

  e.exports = {
    names: c, codes: Object.freeze(f), toHexString: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(e, "base16")
    }, fromHexString: function (e) {
      return k(e, "base16")
    }, toB58String: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(r.encode("base58btc", e)).slice(1)
    }, fromB58String: function (e) {
      const n = e instanceof Uint8Array ? l(e) : e;
      return r.decode("z" + n)
    }, decode: d, encode: function (e, code, n) {
      if (!e || void 0 === code) throw new Error("multihash encode requires at least two args: digest, code");
      const t = m(code);
      if (!(e instanceof Uint8Array)) throw new Error("digest should be a Uint8Array");
      if (null == n && (n = e.length), n && e.length !== n) throw new Error("digest length should be equal to specified length.");
      const r = o.encode(t), c = o.encode(n);
      return h([r, c, e], r.length + c.length + e.length)
    }, coerceCode: m, isAppCode: w, validate: E, prefix: function (e) {
      return E(e), e.subarray(0, 2)
    }, isValidCode: y
  }
}, function (e, n, t) {
  (function (n) {
    function t(e) {
      return (4294967296 + e).toString(16).substring(1)
    }

    e.exports = {
      normalizeInput: function (input) {
        var e;
        if (input instanceof Uint8Array) e = input; else if (input instanceof n) e = new Uint8Array(input); else {
          if ("string" != typeof input) throw new Error("Input must be an string, Buffer or Uint8Array");
          e = new Uint8Array(n.from(input, "utf8"))
        }
        return e
      }, toHex: function (e) {
        return Array.prototype.map.call(e, (function (e) {
          return (e < 16 ? "0" : "") + e.toString(16)
        })).join("")
      }, debugPrint: function (label, e, n) {
        for (var r = "\n" + label + " = ", i = 0; i < e.length; i += 2) {
          if (32 === n) r += t(e[i]).toUpperCase(), r += " ", r += t(e[i + 1]).toUpperCase(); else {
            if (64 !== n) throw new Error("Invalid size " + n);
            r += t(e[i + 1]).toUpperCase(), r += t(e[i]).toUpperCase()
          }
          i % 6 == 4 ? r += "\n" + new Array(label.length + 4).join(" ") : i < e.length - 2 && (r += " ")
        }
        console.log(r)
      }, testSpeed: function (e, n, t) {
        for (var r = (new Date).getTime(), input = new Uint8Array(n), i = 0; i < n; i++) input[i] = i % 256;
        var o = (new Date).getTime();
        for (console.log("Generated random input in " + (o - r) + "ms"), r = o, i = 0; i < t; i++) {
          var c = e(input), l = (new Date).getTime(), k = l - r;
          r = l, console.log("Hashed in " + k + "ms: " + c.substring(0, 20) + "..."), console.log(Math.round(n / (1 << 20) / (k / 1e3) * 100) / 100 + " MB PER SECOND")
        }
      }
    }
  }).call(this, t(2).Buffer)
}, function (e, n, t) {
  "use strict";
  (e.exports = t(747)).util = t(1059)
}, function (e, n, t) {
  "use strict";
  const r = t(839)(t(840)), o = t(747), c = t(832), {serializeDAGNodeLike: l} = t(838), k = t(841);
  (n = e.exports).codec = k.codec, n.defaultHashAlg = k.defaultHashAlg;
  n.serialize = e => c.isDAGNode(e) ? e.serialize() : l(e.Data, e.Links), n.deserialize = e => {
    const n = r.PBNode.decode(e), t = n.Links.map(link => new o(link.Name, link.Tsize, link.Hash)),
      data = null == n.Data ? new Uint8Array(0) : n.Data;
    return new c(data, t, e.byteLength)
  }, n.cid = (e, n) => k.cid(e, n)
}, function (e, n, t) {
  "use strict";
  n.util = t(847), n.resolver = t(1083), n.codec = n.util.codec, n.defaultHashAlg = n.util.defaultHashAlg
}, function (e, n, t) {
  "use strict";
  const r = t(1062), o = t(851), c = t(789), l = t(853), k = t(1081), h = t(718), f = t(717);

  function d(e) {
    let n;
    try {
      n = k(e)
    } catch (e) {
      n = !1
    }
    if (n) throw new Error("The object passed has circular references");
    return function e(n) {
      if (!n || n instanceof Uint8Array || "string" == typeof n) return n;
      if (Array.isArray(n)) return n.map(e);
      if (l.isCID(n)) return "string" == typeof (t = n) ? t = new l(t).bytes : l.isCID(t) && (t = t.bytes), new r.Tagged(42, h([f("00", "base16"), t], 1 + t.length));
      var t;
      const o = Object.keys(n);
      if (o.length > 0) {
        const t = {};
        return o.forEach(r => {
          "object" == typeof n[r] ? t[r] = e(n[r]) : t[r] = n[r]
        }), t
      }
      return n
    }(e)
  }

  (n = e.exports).codec = o.DAG_CBOR, n.defaultHashAlg = o.SHA2_256;
  const m = {42: e => (e = e.slice(1), new l(e))};
  let w = 65536;
  let y = 67108864, E = null;
  n.configureDecoder = e => {
    let n = m;
    e ? ("number" == typeof e.size && (w = e.size), "number" == typeof e.maxSize && (y = e.maxSize), e.tags && (n = Object.assign({}, m, e && e.tags))) : (w = 65536, y = 67108864);
    const t = {tags: n, size: w};
    E = new r.Decoder(t), w = t.size
  }, n.configureDecoder(), n.serialize = e => {
    const n = d(e);
    return r.encode(n)
  }, n.deserialize = data => {
    if (data.length > w && data.length <= y && n.configureDecoder({size: data.length}), data.length > w) throw new Error("Data is too large to deserialize with current decoder");
    const e = E.decodeAll(data);
    if (1 !== e.length) throw new Error("Extraneous CBOR data found beyond initial top-level object");
    return e[0]
  }, n.cid = async (e, t) => {
    const r = {cidVersion: 1, hashAlg: n.defaultHashAlg}, k = Object.assign(r, t), h = await c(e, k.hashAlg),
      f = o.print[n.codec];
    return new l(k.cidVersion, f, h)
  }
}, function (e, n, t) {
  "use strict";
  (function (n) {
    const {Buffer: r} = t(2), o = t(350), c = t(746).BigNumber, l = t(1064), k = t(791), h = t(770), f = t(849),
      d = t(850), {URL: m} = t(767);

    class w {
      constructor(e) {
        !(e = e || {}).size || e.size < 65536 ? e.size = 65536 : e.size = k.nextPowerOf2(e.size), this._heap = new ArrayBuffer(e.size), this._heap8 = new Uint8Array(this._heap), this._buffer = r.from(this._heap), this._reset(), this._knownTags = Object.assign({
          0: e => new Date(e),
          1: e => new Date(1e3 * e),
          2: e => k.arrayBufferToBignumber(e),
          3: e => h.NEG_ONE.minus(k.arrayBufferToBignumber(e)),
          4: e => h.TEN.pow(e[0]).times(e[1]),
          5: e => h.TWO.pow(e[0]).times(e[1]),
          32: e => new m(e),
          35: e => new RegExp(e)
        }, e.tags), this.parser = l(n, {
          log: console.log.bind(console),
          pushInt: this.pushInt.bind(this),
          pushInt32: this.pushInt32.bind(this),
          pushInt32Neg: this.pushInt32Neg.bind(this),
          pushInt64: this.pushInt64.bind(this),
          pushInt64Neg: this.pushInt64Neg.bind(this),
          pushFloat: this.pushFloat.bind(this),
          pushFloatSingle: this.pushFloatSingle.bind(this),
          pushFloatDouble: this.pushFloatDouble.bind(this),
          pushTrue: this.pushTrue.bind(this),
          pushFalse: this.pushFalse.bind(this),
          pushUndefined: this.pushUndefined.bind(this),
          pushNull: this.pushNull.bind(this),
          pushInfinity: this.pushInfinity.bind(this),
          pushInfinityNeg: this.pushInfinityNeg.bind(this),
          pushNaN: this.pushNaN.bind(this),
          pushNaNNeg: this.pushNaNNeg.bind(this),
          pushArrayStart: this.pushArrayStart.bind(this),
          pushArrayStartFixed: this.pushArrayStartFixed.bind(this),
          pushArrayStartFixed32: this.pushArrayStartFixed32.bind(this),
          pushArrayStartFixed64: this.pushArrayStartFixed64.bind(this),
          pushObjectStart: this.pushObjectStart.bind(this),
          pushObjectStartFixed: this.pushObjectStartFixed.bind(this),
          pushObjectStartFixed32: this.pushObjectStartFixed32.bind(this),
          pushObjectStartFixed64: this.pushObjectStartFixed64.bind(this),
          pushByteString: this.pushByteString.bind(this),
          pushByteStringStart: this.pushByteStringStart.bind(this),
          pushUtf8String: this.pushUtf8String.bind(this),
          pushUtf8StringStart: this.pushUtf8StringStart.bind(this),
          pushSimpleUnassigned: this.pushSimpleUnassigned.bind(this),
          pushTagUnassigned: this.pushTagUnassigned.bind(this),
          pushTagStart: this.pushTagStart.bind(this),
          pushTagStart4: this.pushTagStart4.bind(this),
          pushTagStart8: this.pushTagStart8.bind(this),
          pushBreak: this.pushBreak.bind(this)
        }, this._heap)
      }

      get _depth() {
        return this._parents.length
      }

      get _currentParent() {
        return this._parents[this._depth - 1]
      }

      get _ref() {
        return this._currentParent.ref
      }

      _closeParent() {
        var p = this._parents.pop();
        if (p.length > 0) throw new Error(`Missing ${p.length} elements`);
        switch (p.type) {
          case h.PARENT.TAG:
            this._push(this.createTag(p.ref[0], p.ref[1]));
            break;
          case h.PARENT.BYTE_STRING:
            this._push(this.createByteString(p.ref, p.length));
            break;
          case h.PARENT.UTF8_STRING:
            this._push(this.createUtf8String(p.ref, p.length));
            break;
          case h.PARENT.MAP:
            if (p.values % 2 > 0) throw new Error("Odd number of elements in the map");
            this._push(this.createMap(p.ref, p.length));
            break;
          case h.PARENT.OBJECT:
            if (p.values % 2 > 0) throw new Error("Odd number of elements in the map");
            this._push(this.createObject(p.ref, p.length));
            break;
          case h.PARENT.ARRAY:
            this._push(this.createArray(p.ref, p.length))
        }
        this._currentParent && this._currentParent.type === h.PARENT.TAG && this._dec()
      }

      _dec() {
        const p = this._currentParent;
        p.length < 0 || (p.length--, 0 === p.length && this._closeParent())
      }

      _push(e, n) {
        const p = this._currentParent;
        switch (p.values++, p.type) {
          case h.PARENT.ARRAY:
          case h.PARENT.BYTE_STRING:
          case h.PARENT.UTF8_STRING:
            p.length > -1 ? this._ref[this._ref.length - p.length] = e : this._ref.push(e), this._dec();
            break;
          case h.PARENT.OBJECT:
            null != p.tmpKey ? (this._ref[p.tmpKey] = e, p.tmpKey = null, this._dec()) : (p.tmpKey = e, "string" != typeof p.tmpKey && (p.type = h.PARENT.MAP, p.ref = k.buildMap(p.ref)));
            break;
          case h.PARENT.MAP:
            null != p.tmpKey ? (this._ref.set(p.tmpKey, e), p.tmpKey = null, this._dec()) : p.tmpKey = e;
            break;
          case h.PARENT.TAG:
            this._ref.push(e), n || this._dec();
            break;
          default:
            throw new Error("Unknown parent type")
        }
      }

      _createParent(e, n, t) {
        this._parents[this._depth] = {type: n, length: t, ref: e, values: 0, tmpKey: null}
      }

      _reset() {
        this._res = [], this._parents = [{type: h.PARENT.ARRAY, length: -1, ref: this._res, values: 0, tmpKey: null}]
      }

      createTag(e, n) {
        const t = this._knownTags[e];
        return t ? t(n) : new d(e, n)
      }

      createMap(e, n) {
        return e
      }

      createObject(e, n) {
        return e
      }

      createArray(e, n) {
        return e
      }

      createByteString(e, n) {
        return r.concat(e)
      }

      createByteStringFromHeap(e, n) {
        return e === n ? r.alloc(0) : r.from(this._heap.slice(e, n))
      }

      createInt(e) {
        return e
      }

      createInt32(e, g) {
        return k.buildInt32(e, g)
      }

      createInt64(e, n, t, r) {
        return k.buildInt64(e, n, t, r)
      }

      createFloat(e) {
        return e
      }

      createFloatSingle(a, b, e, n) {
        return o.read([a, b, e, n], 0, !1, 23, 4)
      }

      createFloatDouble(a, b, e, n, t, r, g, c) {
        return o.read([a, b, e, n, t, r, g, c], 0, !1, 52, 8)
      }

      createInt32Neg(e, g) {
        return -1 - k.buildInt32(e, g)
      }

      createInt64Neg(e, n, t, r) {
        const o = k.buildInt32(e, n), g = k.buildInt32(t, r);
        return o > h.MAX_SAFE_HIGH ? h.NEG_ONE.minus(new c(o).times(h.SHIFT32).plus(g)) : -1 - (o * h.SHIFT32 + g)
      }

      createTrue() {
        return !0
      }

      createFalse() {
        return !1
      }

      createNull() {
        return null
      }

      createUndefined() {
      }

      createInfinity() {
        return 1 / 0
      }

      createInfinityNeg() {
        return -1 / 0
      }

      createNaN() {
        return NaN
      }

      createNaNNeg() {
        return NaN
      }

      createUtf8String(e, n) {
        return e.join("")
      }

      createUtf8StringFromHeap(e, n) {
        return e === n ? "" : this._buffer.toString("utf8", e, n)
      }

      createSimpleUnassigned(e) {
        return new f(e)
      }

      pushInt(e) {
        this._push(this.createInt(e))
      }

      pushInt32(e, g) {
        this._push(this.createInt32(e, g))
      }

      pushInt64(e, n, t, r) {
        this._push(this.createInt64(e, n, t, r))
      }

      pushFloat(e) {
        this._push(this.createFloat(e))
      }

      pushFloatSingle(a, b, e, n) {
        this._push(this.createFloatSingle(a, b, e, n))
      }

      pushFloatDouble(a, b, e, n, t, r, g, o) {
        this._push(this.createFloatDouble(a, b, e, n, t, r, g, o))
      }

      pushInt32Neg(e, g) {
        this._push(this.createInt32Neg(e, g))
      }

      pushInt64Neg(e, n, t, r) {
        this._push(this.createInt64Neg(e, n, t, r))
      }

      pushTrue() {
        this._push(this.createTrue())
      }

      pushFalse() {
        this._push(this.createFalse())
      }

      pushNull() {
        this._push(this.createNull())
      }

      pushUndefined() {
        this._push(this.createUndefined())
      }

      pushInfinity() {
        this._push(this.createInfinity())
      }

      pushInfinityNeg() {
        this._push(this.createInfinityNeg())
      }

      pushNaN() {
        this._push(this.createNaN())
      }

      pushNaNNeg() {
        this._push(this.createNaNNeg())
      }

      pushArrayStart() {
        this._createParent([], h.PARENT.ARRAY, -1)
      }

      pushArrayStartFixed(e) {
        this._createArrayStartFixed(e)
      }

      pushArrayStartFixed32(e, n) {
        const t = k.buildInt32(e, n);
        this._createArrayStartFixed(t)
      }

      pushArrayStartFixed64(e, n, t, r) {
        const o = k.buildInt64(e, n, t, r);
        this._createArrayStartFixed(o)
      }

      pushObjectStart() {
        this._createObjectStartFixed(-1)
      }

      pushObjectStartFixed(e) {
        this._createObjectStartFixed(e)
      }

      pushObjectStartFixed32(e, n) {
        const t = k.buildInt32(e, n);
        this._createObjectStartFixed(t)
      }

      pushObjectStartFixed64(e, n, t, r) {
        const o = k.buildInt64(e, n, t, r);
        this._createObjectStartFixed(o)
      }

      pushByteStringStart() {
        this._parents[this._depth] = {type: h.PARENT.BYTE_STRING, length: -1, ref: [], values: 0, tmpKey: null}
      }

      pushByteString(e, n) {
        this._push(this.createByteStringFromHeap(e, n))
      }

      pushUtf8StringStart() {
        this._parents[this._depth] = {type: h.PARENT.UTF8_STRING, length: -1, ref: [], values: 0, tmpKey: null}
      }

      pushUtf8String(e, n) {
        this._push(this.createUtf8StringFromHeap(e, n))
      }

      pushSimpleUnassigned(e) {
        this._push(this.createSimpleUnassigned(e))
      }

      pushTagStart(e) {
        this._parents[this._depth] = {type: h.PARENT.TAG, length: 1, ref: [e]}
      }

      pushTagStart4(e, g) {
        this.pushTagStart(k.buildInt32(e, g))
      }

      pushTagStart8(e, n, t, r) {
        this.pushTagStart(k.buildInt64(e, n, t, r))
      }

      pushTagUnassigned(e) {
        this._push(this.createTag(e))
      }

      pushBreak() {
        if (this._currentParent.length > -1) throw new Error("Unexpected break");
        this._closeParent()
      }

      _createObjectStartFixed(e) {
        0 !== e ? this._createParent({}, h.PARENT.OBJECT, e) : this._push(this.createObject({}))
      }

      _createArrayStartFixed(e) {
        0 !== e ? this._createParent(new Array(e), h.PARENT.ARRAY, e) : this._push(this.createArray([]))
      }

      _decode(input) {
        if (0 === input.byteLength) throw new Error("Input too short");
        this._reset(), this._heap8.set(input);
        const code = this.parser.parse(input.byteLength);
        if (this._depth > 1) {
          for (; 0 === this._currentParent.length;) this._closeParent();
          if (this._depth > 1) throw new Error("Undeterminated nesting")
        }
        if (code > 0) throw new Error("Failed to parse");
        if (0 === this._res.length) throw new Error("No valid result")
      }

      decodeFirst(input) {
        return this._decode(input), this._res[0]
      }

      decodeAll(input) {
        return this._decode(input), this._res
      }

      static decode(input, e) {
        "string" == typeof input && (input = r.from(input, e || "hex"));
        return new w({size: input.length}).decodeFirst(input)
      }

      static decodeAll(input, e) {
        "string" == typeof input && (input = r.from(input, e || "hex"));
        return new w({size: input.length}).decodeAll(input)
      }
    }

    w.decodeFirst = w.decode, e.exports = w
  }).call(this, t(9))
}, function (e, n, t) {
  "use strict";
  const r = t(770), o = r.MT, c = r.SIMPLE, l = r.SYMS;

  class k {
    constructor(e) {
      if ("number" != typeof e) throw new Error("Invalid Simple type: " + typeof e);
      if (e < 0 || e > 255 || (0 | e) !== e) throw new Error("value must be a small positive integer: " + e);
      this.value = e
    }

    toString() {
      return "simple(" + this.value + ")"
    }

    inspect() {
      return "simple(" + this.value + ")"
    }

    encodeCBOR(e) {
      return e._pushInt(this.value, o.SIMPLE_FLOAT)
    }

    static isSimple(e) {
      return e instanceof k
    }

    static decode(e, n) {
      switch (null == n && (n = !0), e) {
        case c.FALSE:
          return !1;
        case c.TRUE:
          return !0;
        case c.NULL:
          return n ? null : l.NULL;
        case c.UNDEFINED:
          return n ? void 0 : l.UNDEFINED;
        case-1:
          if (!n) throw new Error("Invalid BREAK");
          return l.BREAK;
        default:
          return new k(e)
      }
    }
  }

  e.exports = k
}, function (e, n, t) {
  "use strict";

  class r {
    constructor(e, n, t) {
      if (this.tag = e, this.value = n, this.err = t, "number" != typeof this.tag) throw new Error("Invalid tag type (" + typeof this.tag + ")");
      if (this.tag < 0 || (0 | this.tag) !== this.tag) throw new Error("Tag must be a positive integer: " + this.tag)
    }

    toString() {
      return `${this.tag}(${JSON.stringify(this.value)})`
    }

    encodeCBOR(e) {
      return e._pushTag(this.tag), e.pushAny(this.value)
    }

    convert(e) {
      var n, t;
      if ("function" != typeof (t = null != e ? e[this.tag] : void 0) && "function" != typeof (t = r["_tag" + this.tag])) return this;
      try {
        return t.call(r, this.value)
      } catch (e) {
        return n = e, this.err = n, this
      }
    }
  }

  e.exports = r
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(1066), c = t(1067), l = t(852), k = t(1072);
  (n = e.exports).addPrefix = (e, data) => {
    let n;
    if (e instanceof Uint8Array) n = l.varintUint8ArrayEncode(e); else {
      if (!c[e]) throw new Error("multicodec not recognized");
      n = c[e]
    }
    return k([n, data], n.length + data.length)
  }, n.rmPrefix = data => (r.decode(data), data.slice(r.decode.bytes)), n.getCodec = e => {
    const code = r.decode(e), n = o.get(code);
    if (void 0 === n) throw new Error(`Code ${code} not found`);
    return n
  }, n.getName = e => o.get(e), n.getNumber = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return r.decode(code)
  }, n.getCode = e => r.decode(e), n.getCodeVarint = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return code
  }, n.getVarint = code => r.encode(code);
  const h = t(1073);
  Object.assign(n, h), n.print = t(1074)
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(1068), c = t(1071);

  function l(e) {
    return parseInt(o(e, "base16"), 16)
  }

  e.exports = {
    numberToUint8Array: function (e) {
      let n = e.toString(16);
      n.length % 2 == 1 && (n = "0" + n);
      return c(n, "base16")
    }, uint8ArrayToNumber: l, varintUint8ArrayEncode: function (input) {
      return Uint8Array.from(r.encode(l(input)))
    }, varintEncode: function (e) {
      return Uint8Array.from(r.encode(e))
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(854), o = t(855), c = t(851), l = t(760), k = t(1080), h = t(348), f = t(718), d = t(712), m = t(733),
    w = Object.keys(l).reduce((p, e) => (p[l[e]] = e, p), {});

  class y {
    constructor(e, n, t, l) {
      if (E.isCID(e)) {
        const n = e;
        return this.version = n.version, this.codec = n.codec, this.multihash = n.multihash, void (this.multibaseName = n.multibaseName || (0 === n.version ? "base58btc" : "base32"))
      }
      if ("string" == typeof e) {
        const n = o.isEncoded(e);
        if (n) {
          const t = o.decode(e);
          this.version = parseInt(t.slice(0, 1).toString("hex"), 16), this.codec = c.getCodec(t.slice(1)), this.multihash = c.rmPrefix(t.slice(1)), this.multibaseName = n
        } else this.version = 0, this.codec = "dag-pb", this.multihash = r.fromB58String(e), this.multibaseName = "base58btc";
        return y.validateCID(this), void Object.defineProperty(this, "string", {value: e})
      }
      if (e instanceof Uint8Array) {
        const n = e.slice(0, 1), t = parseInt(n.toString("hex"), 16);
        if (1 === t) {
          const n = e;
          this.version = t, this.codec = c.getCodec(n.slice(1)), this.multihash = c.rmPrefix(n.slice(1)), this.multibaseName = "base32"
        } else this.version = 0, this.codec = "dag-pb", this.multihash = e, this.multibaseName = "base58btc";
        y.validateCID(this)
      } else this.version = e, "number" == typeof n && (n = w[n]), this.codec = n, this.multihash = t, this.multibaseName = l || (0 === e ? "base58btc" : "base32"), y.validateCID(this)
    }

    get bytes() {
      let e = this._bytes;
      if (!e) {
        if (0 === this.version) e = this.multihash; else {
          if (1 !== this.version) throw new Error("unsupported version");
          {
            const n = c.getCodeVarint(this.codec);
            e = f([[1], n, this.multihash], 1 + n.byteLength + this.multihash.byteLength)
          }
        }
        Object.defineProperty(this, "_bytes", {value: e})
      }
      return e
    }

    get prefix() {
      const e = c.getCodeVarint(this.codec), n = r.prefix(this.multihash);
      return f([[this.version], e, n], 1 + e.byteLength + n.byteLength)
    }

    get code() {
      return l[this.codec]
    }

    toV0() {
      if ("dag-pb" !== this.codec) throw new Error("Cannot convert a non dag-pb CID to CIDv0");
      const {name: e, length: n} = r.decode(this.multihash);
      if ("sha2-256" !== e) throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
      if (32 !== n) throw new Error("Cannot convert non 32 byte multihash CID to CIDv0");
      return new E(0, this.codec, this.multihash)
    }

    toV1() {
      return new E(1, this.codec, this.multihash)
    }

    toBaseEncodedString(base = this.multibaseName) {
      if (this.string && base === this.multibaseName) return this.string;
      let e = null;
      if (0 === this.version) {
        if ("base58btc" !== base) throw new Error("not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()");
        e = r.toB58String(this.multihash)
      } else {
        if (1 !== this.version) throw new Error("unsupported version");
        e = d(o.encode(base, this.bytes))
      }
      return base === this.multibaseName && Object.defineProperty(this, "string", {value: e}), e
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")"
    }

    toString(base) {
      return this.toBaseEncodedString(base)
    }

    toJSON() {
      return {codec: this.codec, version: this.version, hash: this.multihash}
    }

    equals(e) {
      return this.codec === e.codec && this.version === e.version && m(this.multihash, e.multihash)
    }

    static validateCID(e) {
      const n = k.checkCIDComponents(e);
      if (n) throw new Error(n)
    }
  }

  const E = h(y, {className: "CID", symbolName: "@ipld/js-cid/CID"});
  E.codecs = l, e.exports = E
}, function (e, n, t) {
  "use strict";
  const r = t(855), o = t(1075), {names: c} = t(1079), l = t(712), k = t(717), h = t(718), f = {};
  for (const e in c) f[c[e]] = e;

  function d(e) {
    if (!(e instanceof Uint8Array)) throw new Error("multihash must be a Uint8Array");
    if (e.length < 2) throw new Error("multihash too short. must be > 2 bytes.");
    const code = o.decode(e);
    if (!y(code)) throw new Error("multihash unknown function code: 0x" + code.toString(16));
    e = e.slice(o.decode.bytes);
    const n = o.decode(e);
    if (n < 0) throw new Error("multihash invalid length: " + n);
    if ((e = e.slice(o.decode.bytes)).length !== n) throw new Error("multihash length inconsistent: 0x" + l(e, "base16"));
    return {code: code, name: f[code], length: n, digest: e}
  }

  function m(e) {
    let code = e;
    if ("string" == typeof e) {
      if (void 0 === c[e]) throw new Error("Unrecognized hash function named: " + e);
      code = c[e]
    }
    if ("number" != typeof code) throw new Error("Hash function code should be a number. Got: " + code);
    if (void 0 === f[code] && !w(code)) throw new Error("Unrecognized function code: " + code);
    return code
  }

  function w(code) {
    return code > 0 && code < 16
  }

  function y(code) {
    return !!w(code) || !!f[code]
  }

  function E(e) {
    d(e)
  }

  e.exports = {
    names: c, codes: Object.freeze(f), toHexString: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(e, "base16")
    }, fromHexString: function (e) {
      return k(e, "base16")
    }, toB58String: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(r.encode("base58btc", e)).slice(1)
    }, fromB58String: function (e) {
      const n = e instanceof Uint8Array ? l(e) : e;
      return r.decode("z" + n)
    }, decode: d, encode: function (e, code, n) {
      if (!e || void 0 === code) throw new Error("multihash encode requires at least two args: digest, code");
      const t = m(code);
      if (!(e instanceof Uint8Array)) throw new Error("digest should be a Uint8Array");
      if (null == n && (n = e.length), n && e.length !== n) throw new Error("digest length should be equal to specified length.");
      const r = o.encode(t), c = o.encode(n);
      return h([r, c, e], r.length + c.length + e.length)
    }, coerceCode: m, isAppCode: w, validate: E, prefix: function (e) {
      return E(e), e.subarray(0, 2)
    }, isValidCode: y
  }
}, function (e, n, t) {
  "use strict";
  const r = t(792), {encodeText: o, decodeText: c, concat: l} = t(793);

  function k(e) {
    if (r.names[e]) return r.names[e];
    if (r.codes[e]) return r.codes[e];
    throw new Error("Unsupported encoding: " + e)
  }

  (n = e.exports = function (e, n) {
    if (!n) throw new Error("requires an encoded Uint8Array");
    const {name: t, codeBuf: r} = k(e);
    return function (e, n) {
      k(e).decode(c(n))
    }(t, n), l([r, n], r.length + n.length)
  }).encode = function (e, n) {
    const t = k(e), data = o(t.encode(n));
    return l([t.codeBuf, data], t.codeBuf.length + data.length)
  }, n.decode = function (data) {
    data instanceof Uint8Array && (data = c(data));
    const e = data[0];
    return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(e) && (data = data.toLowerCase()), k(data[0]).decode(data.substring(1))
  }, n.isEncoded = function (data) {
    if (data instanceof Uint8Array && (data = c(data)), "[object String]" !== Object.prototype.toString.call(data)) return !1;
    try {
      return k(data[0]).name
    } catch (e) {
      return !1
    }
  }, n.encoding = k, n.encodingFromData = function (data) {
    return data instanceof Uint8Array && (data = c(data)), k(data[0])
  }, n.names = Object.freeze(r.names), n.codes = Object.freeze(r.codes)
}, function (e, n, t) {
  "use strict";
  const r = t(1084), o = t(789), c = t(859);
  e.exports = {
    codec: c.RAW, defaultHashAlg: c.SHA2_256, resolver: {
      resolve: (e, path) => {
        if ("/" !== path) throw new Error("Only the root path / may be resolved");
        return {value: e, remainderPath: ""}
      }, tree: e => ({done: !0})
    }, util: {
      deserialize: data => data, serialize: data => data, cid: async (n, t) => {
        const l = {cidVersion: 1, hashAlg: e.exports.defaultHashAlg}, k = Object.assign(l, t),
          h = await o(n, k.hashAlg), f = c.print[e.exports.codec];
        return new r(k.cidVersion, f, h)
      }
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(858), o = t(1087), {names: c} = t(1091), l = t(712), k = t(717), h = t(718), f = {};
  for (const e in c) f[c[e]] = e;

  function d(e) {
    if (!(e instanceof Uint8Array)) throw new Error("multihash must be a Uint8Array");
    if (e.length < 2) throw new Error("multihash too short. must be > 2 bytes.");
    const code = o.decode(e);
    if (!y(code)) throw new Error("multihash unknown function code: 0x" + code.toString(16));
    e = e.slice(o.decode.bytes);
    const n = o.decode(e);
    if (n < 0) throw new Error("multihash invalid length: " + n);
    if ((e = e.slice(o.decode.bytes)).length !== n) throw new Error("multihash length inconsistent: 0x" + l(e, "base16"));
    return {code: code, name: f[code], length: n, digest: e}
  }

  function m(e) {
    let code = e;
    if ("string" == typeof e) {
      if (void 0 === c[e]) throw new Error("Unrecognized hash function named: " + e);
      code = c[e]
    }
    if ("number" != typeof code) throw new Error("Hash function code should be a number. Got: " + code);
    if (void 0 === f[code] && !w(code)) throw new Error("Unrecognized function code: " + code);
    return code
  }

  function w(code) {
    return code > 0 && code < 16
  }

  function y(code) {
    return !!w(code) || !!f[code]
  }

  function E(e) {
    d(e)
  }

  e.exports = {
    names: c, codes: Object.freeze(f), toHexString: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(e, "base16")
    }, fromHexString: function (e) {
      return k(e, "base16")
    }, toB58String: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(r.encode("base58btc", e)).slice(1)
    }, fromB58String: function (e) {
      const n = e instanceof Uint8Array ? l(e) : e;
      return r.decode("z" + n)
    }, decode: d, encode: function (e, code, n) {
      if (!e || void 0 === code) throw new Error("multihash encode requires at least two args: digest, code");
      const t = m(code);
      if (!(e instanceof Uint8Array)) throw new Error("digest should be a Uint8Array");
      if (null == n && (n = e.length), n && e.length !== n) throw new Error("digest length should be equal to specified length.");
      const r = o.encode(t), c = o.encode(n);
      return h([r, c, e], r.length + c.length + e.length)
    }, coerceCode: m, isAppCode: w, validate: E, prefix: function (e) {
      return E(e), e.subarray(0, 2)
    }, isValidCode: y
  }
}, function (e, n, t) {
  "use strict";
  const r = t(794), {encodeText: o, decodeText: c, concat: l} = t(795);

  function k(e) {
    if (r.names[e]) return r.names[e];
    if (r.codes[e]) return r.codes[e];
    throw new Error("Unsupported encoding: " + e)
  }

  (n = e.exports = function (e, n) {
    if (!n) throw new Error("requires an encoded Uint8Array");
    const {name: t, codeBuf: r} = k(e);
    return function (e, n) {
      k(e).decode(c(n))
    }(t, n), l([r, n], r.length + n.length)
  }).encode = function (e, n) {
    const t = k(e), data = o(t.encode(n));
    return l([t.codeBuf, data], t.codeBuf.length + data.length)
  }, n.decode = function (data) {
    data instanceof Uint8Array && (data = c(data));
    const e = data[0];
    return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(e) && (data = data.toLowerCase()), k(data[0]).decode(data.substring(1))
  }, n.isEncoded = function (data) {
    if (data instanceof Uint8Array && (data = c(data)), "[object String]" !== Object.prototype.toString.call(data)) return !1;
    try {
      return k(data[0]).name
    } catch (e) {
      return !1
    }
  }, n.encoding = k, n.encodingFromData = function (data) {
    return data instanceof Uint8Array && (data = c(data)), k(data[0])
  }, n.names = Object.freeze(r.names), n.codes = Object.freeze(r.codes)
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(1092), c = t(1093), l = t(860), k = t(1096);
  (n = e.exports).addPrefix = (e, data) => {
    let n;
    if (e instanceof Uint8Array) n = l.varintUint8ArrayEncode(e); else {
      if (!c[e]) throw new Error("multicodec not recognized");
      n = c[e]
    }
    return k([n, data], n.length + data.length)
  }, n.rmPrefix = data => (r.decode(data), data.slice(r.decode.bytes)), n.getCodec = e => {
    const code = r.decode(e), n = o.get(code);
    if (void 0 === n) throw new Error(`Code ${code} not found`);
    return n
  }, n.getName = e => o.get(e), n.getNumber = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return r.decode(code)
  }, n.getCode = e => r.decode(e), n.getCodeVarint = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return code
  }, n.getVarint = code => r.encode(code);
  const h = t(1097);
  Object.assign(n, h), n.print = t(1098)
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(1094), c = t(1095);

  function l(e) {
    return parseInt(o(e, "base16"), 16)
  }

  e.exports = {
    numberToUint8Array: function (e) {
      let n = e.toString(16);
      n.length % 2 == 1 && (n = "0" + n);
      return c(n, "base16")
    }, uint8ArrayToNumber: l, varintUint8ArrayEncode: function (input) {
      return Uint8Array.from(r.encode(l(input)))
    }, varintEncode: function (e) {
      return Uint8Array.from(r.encode(e))
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async (n, t = {}) => {
    const o = await e.post("dag/resolve", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({arg: `${n}${t.path ? ("/" + t.path).replace(/\/[/]+/g, "/") : ""}`, ...t}),
      headers: t.headers
    }), data = await o.json();
    return {cid: new r(data.Cid["/"]), remainderPath: data.RemPath}
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714);
  e.exports = function (e) {
    const n = r(e);
    return Object.prototype.hasOwnProperty.call(n, "mode") && (n.mode = parseInt(n.mode, 8)), Object.prototype.hasOwnProperty.call(n, "mtime") && (n.mtime = {
      secs: n.mtime,
      nsecs: n.mtimeNsecs || 0
    }, delete n.mtimeNsecs), n
  }
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(864), l = t(709);
  e.exports = o(e => async function* (source, n = {}) {
    for await(const {path: path, recursive: t, metadata: o} of c(source)) {
      const c = await e.post("pin/add", {
        timeout: n.timeout,
        signal: n.signal,
        searchParams: l({...n, arg: path, recursive: t, metadata: o ? JSON.stringify(o) : void 0, stream: !0}),
        headers: n.headers
      });
      for await(const e of c.ndjson()) if (e.Pins) for (const n of e.Pins) yield new r(n); else yield new r(e)
    }
  })
}, function (e, n, t) {
  "use strict";
  const r = t(756), o = t(1172);

  function c(input) {
    const e = {path: input.cid || input.path, recursive: !1 !== input.recursive};
    return null != input.metadata && (e.metadata = input.metadata), e
  }

  e.exports = function (input) {
    if (null == input) throw r(new Error("Unexpected input: " + input, "ERR_UNEXPECTED_INPUT"));
    if (o.isCID(input) || input instanceof String || "string" == typeof input) return async function* () {
      yield c({cid: input})
    }();
    if (null != input.cid || null != input.path) return async function* () {
      yield c(input)
    }();
    if (input[Symbol.iterator]) return async function* () {
      const e = input[Symbol.iterator](), n = e.next();
      if (n.done) return e;
      if (o.isCID(n.value) || n.value instanceof String || "string" == typeof n.value) {
        yield c({cid: n.value});
        for (const n of e) yield c({cid: n})
      } else {
        if (null == n.value.cid && null == n.value.path) throw r(new Error("Unexpected input: " + typeof input), "ERR_UNEXPECTED_INPUT");
        yield c(n.value);
        for (const n of e) yield c(n)
      }
    }();
    if (input[Symbol.asyncIterator]) return async function* () {
      const e = input[Symbol.asyncIterator](), n = await e.next();
      if (n.done) return e;
      if (o.isCID(n.value) || n.value instanceof String || "string" == typeof n.value) {
        yield c({cid: n.value});
        for await(const n of e) yield c({cid: n})
      } else {
        if (null == n.value.cid && null == n.value.path) throw r(new Error("Unexpected input: " + typeof input), "ERR_UNEXPECTED_INPUT");
        yield c(n.value);
        for await(const n of e) yield c(n)
      }
    }();
    throw r(new Error("Unexpected input: " + typeof input), "ERR_UNEXPECTED_INPUT")
  }
}, function (e, n, t) {
  "use strict";
  const r = t(866), o = t(1175), {names: c} = t(1179), l = t(712), k = t(717), h = t(718), f = {};
  for (const e in c) f[c[e]] = e;

  function d(e) {
    if (!(e instanceof Uint8Array)) throw new Error("multihash must be a Uint8Array");
    if (e.length < 2) throw new Error("multihash too short. must be > 2 bytes.");
    const code = o.decode(e);
    if (!y(code)) throw new Error("multihash unknown function code: 0x" + code.toString(16));
    e = e.slice(o.decode.bytes);
    const n = o.decode(e);
    if (n < 0) throw new Error("multihash invalid length: " + n);
    if ((e = e.slice(o.decode.bytes)).length !== n) throw new Error("multihash length inconsistent: 0x" + l(e, "base16"));
    return {code: code, name: f[code], length: n, digest: e}
  }

  function m(e) {
    let code = e;
    if ("string" == typeof e) {
      if (void 0 === c[e]) throw new Error("Unrecognized hash function named: " + e);
      code = c[e]
    }
    if ("number" != typeof code) throw new Error("Hash function code should be a number. Got: " + code);
    if (void 0 === f[code] && !w(code)) throw new Error("Unrecognized function code: " + code);
    return code
  }

  function w(code) {
    return code > 0 && code < 16
  }

  function y(code) {
    return !!w(code) || !!f[code]
  }

  function E(e) {
    d(e)
  }

  e.exports = {
    names: c, codes: Object.freeze(f), toHexString: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(e, "base16")
    }, fromHexString: function (e) {
      return k(e, "base16")
    }, toB58String: function (e) {
      if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
      return l(r.encode("base58btc", e)).slice(1)
    }, fromB58String: function (e) {
      const n = e instanceof Uint8Array ? l(e) : e;
      return r.decode("z" + n)
    }, decode: d, encode: function (e, code, n) {
      if (!e || void 0 === code) throw new Error("multihash encode requires at least two args: digest, code");
      const t = m(code);
      if (!(e instanceof Uint8Array)) throw new Error("digest should be a Uint8Array");
      if (null == n && (n = e.length), n && e.length !== n) throw new Error("digest length should be equal to specified length.");
      const r = o.encode(t), c = o.encode(n);
      return h([r, c, e], r.length + c.length + e.length)
    }, coerceCode: m, isAppCode: w, validate: E, prefix: function (e) {
      return E(e), e.subarray(0, 2)
    }, isValidCode: y
  }
}, function (e, n, t) {
  "use strict";
  const r = t(798), {encodeText: o, decodeText: c, concat: l} = t(799);

  function k(e) {
    if (r.names[e]) return r.names[e];
    if (r.codes[e]) return r.codes[e];
    throw new Error("Unsupported encoding: " + e)
  }

  (n = e.exports = function (e, n) {
    if (!n) throw new Error("requires an encoded Uint8Array");
    const {name: t, codeBuf: r} = k(e);
    return function (e, n) {
      k(e).decode(c(n))
    }(t, n), l([r, n], r.length + n.length)
  }).encode = function (e, n) {
    const t = k(e), data = o(t.encode(n));
    return l([t.codeBuf, data], t.codeBuf.length + data.length)
  }, n.decode = function (data) {
    data instanceof Uint8Array && (data = c(data));
    const e = data[0];
    return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(e) && (data = data.toLowerCase()), k(data[0]).decode(data.substring(1))
  }, n.isEncoded = function (data) {
    if (data instanceof Uint8Array && (data = c(data)), "[object String]" !== Object.prototype.toString.call(data)) return !1;
    try {
      return k(data[0]).name
    } catch (e) {
      return !1
    }
  }, n.encoding = k, n.encodingFromData = function (data) {
    return data instanceof Uint8Array && (data = c(data)), k(data[0])
  }, n.names = Object.freeze(r.names), n.codes = Object.freeze(r.codes)
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(1183), c = t(1184);

  function l(e) {
    return parseInt(o(e, "base16"), 16)
  }

  e.exports = {
    numberToUint8Array: function (e) {
      let n = e.toString(16);
      n.length % 2 == 1 && (n = "0" + n);
      return c(n, "base16")
    }, uint8ArrayToNumber: l, varintUint8ArrayEncode: function (input) {
      return Uint8Array.from(r.encode(l(input)))
    }, varintEncode: function (e) {
      return Uint8Array.from(r.encode(e))
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(864), l = t(709);
  e.exports = o(e => async function* (source, n = {}) {
    n = n || {};
    for await(const {path: path, recursive: t} of c(source)) {
      const o = new URLSearchParams(n.searchParams);
      o.append("arg", "" + path), null != t && o.set("recursive", t);
      const c = await e.post("pin/rm", {
        timeout: n.timeout,
        signal: n.signal,
        headers: n.headers,
        searchParams: l({...n, arg: "" + path, recursive: t})
      });
      for await(const e of c.ndjson()) e.Pins ? yield* e.Pins.map(e => new r(e)) : yield new r(e)
    }
  })
}, function (e, n, t) {
  "use strict";
  const r = t(730).default;

  class o {
    constructor() {
      this._subs = new Map
    }

    static singleton() {
      return o.instance || (o.instance = new o), o.instance
    }

    subscribe(e, n, t) {
      const o = this._subs.get(e) || [];
      if (o.find(s => s.handler === n)) throw new Error(`Already subscribed to ${e} with this handler`);
      const c = new r;
      return this._subs.set(e, [{
        handler: n,
        controller: c
      }].concat(o)), t && t.addEventListener("abort", () => this.unsubscribe(e, n)), c.signal
    }

    unsubscribe(e, n) {
      const t = this._subs.get(e) || [];
      let r;
      n ? (this._subs.set(e, t.filter(s => s.handler !== n)), r = t.filter(s => s.handler === n)) : (this._subs.set(e, []), r = t), r.forEach(s => s.controller.abort())
    }
  }

  o.instance = null, e.exports = o
}, function (e, n, t) {
  "use strict";
  const {BigNumber: r} = t(746), o = t(708), c = t(709);
  e.exports = o(e => async (n = {}) => {
    const t = await e.post("repo/stat", {timeout: n.timeout, signal: n.signal, searchParams: c(n), headers: n.headers}),
      data = await t.json();
    return {
      numObjects: new r(data.NumObjects),
      repoSize: new r(data.RepoSize),
      repoPath: data.RepoPath,
      version: data.Version,
      storageMax: new r(data.StorageMax)
    }
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => {
    const t = await e.post("shutdown", {timeout: n.timeout, signal: n.signal, searchParams: o(n), headers: n.headers});
    await t.text()
  })
}, , , , , , , , , , , , , , , , , , , , , , , , , , , function (e, n, t) {
  "use strict";
  const r = t(710), o = t(723), c = t(773), l = t(776), k = t(753), h = t(937), f = t(938);

  function d(e = {}) {
    return {
      add: t(944)(e),
      addAll: t(820)(e),
      bitswap: t(956)(e),
      block: t(960)(e),
      bootstrap: t(981)(e),
      cat: t(987)(e),
      commands: t(988)(e),
      config: t(989)(e),
      dag: t(997)(e),
      dht: t(1101)(e),
      diag: t(1108)(e),
      dns: t(1112)(e),
      files: t(1113)(e),
      get: t(1126)(e),
      getEndpointConfig: t(1137)(e),
      id: t(1138)(e),
      key: t(1139)(e),
      log: t(1145)(e),
      ls: t(1149)(e),
      mount: t(1150)(e),
      name: t(1151)(e),
      object: t(1158)(e),
      pin: t(1170)(e),
      ping: t(1191)(e),
      pubsub: t(1192)(e),
      refs: t(1198)(e),
      repo: t(1200)(e),
      resolve: t(1203)(e),
      stats: t(1204)(e),
      stop: t(871)(e),
      shutdown: t(871)(e),
      swarm: t(1206)(e),
      version: t(1212)(e)
    }
  }

  Object.assign(d, {
    CID: r,
    multiaddr: o,
    multibase: c,
    multicodec: l,
    multihash: k,
    globSource: h,
    urlSource: f
  }), e.exports = d
}, function (e, n, t) {
  "use strict";
  const {encodeText: r} = t(775);
  e.exports = class {
    constructor(e, code, n, t) {
      this.name = e, this.code = code, this.codeBuf = r(this.code), this.alphabet = t, this.codec = n(t)
    }

    encode(e) {
      return this.codec.encode(e)
    }

    decode(e) {
      for (const n of e) if (this.alphabet && this.alphabet.indexOf(n) < 0) throw new Error(`invalid character '${n}' in '${e}'`);
      return this.codec.decode(e)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    rfc4648: e => n => ({
      encode: input => ((data, e, n) => {
        const t = "=" === e[e.length - 1], mask = (1 << n) - 1;
        let r = "", o = 0, c = 0;
        for (let i = 0; i < data.length; ++i) for (c = c << 8 | data[i], o += 8; o > n;) o -= n, r += e[mask & c >> o];
        if (o && (r += e[mask & c << n - o]), t) for (; r.length * n & 7;) r += "=";
        return r
      })(input, n, e), decode: input => ((e, n, t) => {
        const r = {};
        for (let i = 0; i < n.length; ++i) r[n[i]] = i;
        let o = e.length;
        for (; "=" === e[o - 1];) --o;
        const c = new Uint8Array(o * t / 8 | 0);
        let l = 0, k = 0, h = 0;
        for (let i = 0; i < o; ++i) {
          const n = r[e[i]];
          if (void 0 === n) throw new SyntaxError("Invalid character " + e[i]);
          k = k << t | n, l += t, l >= 8 && (l -= 8, c[h++] = 255 & k >> l)
        }
        if (l >= t || 255 & k << 8 - l) throw new SyntaxError("Unexpected end of data");
        return c
      })(input, n, e)
    })
  }
}, function (e, n, t) {
  e.exports = {encode: t(902), decode: t(903), encodingLength: t(904)}
}, function (e, n) {
  e.exports = function e(n, r, o) {
    if (Number.MAX_SAFE_INTEGER && n > Number.MAX_SAFE_INTEGER) throw e.bytes = 0, new RangeError("Could not encode varint");
    r = r || [];
    var c = o = o || 0;
    for (; n >= t;) r[o++] = 255 & n | 128, n /= 128;
    for (; -128 & n;) r[o++] = 255 & n | 128, n >>>= 7;
    return r[o] = 0 | n, e.bytes = o - c + 1, r
  };
  var t = Math.pow(2, 31)
}, function (e, n) {
  e.exports = function e(n, t) {
    var b, r = 0, o = 0, c = t = t || 0, l = n.length;
    do {
      if (c >= l || o > 49) throw e.bytes = 0, new RangeError("Could not decode varint");
      b = n[c++], r += o < 28 ? (127 & b) << o : (127 & b) * Math.pow(2, o), o += 7
    } while (b >= 128);
    return e.bytes = c - t, r
  }
}, function (e, n) {
  var t = Math.pow(2, 7), r = Math.pow(2, 14), o = Math.pow(2, 21), c = Math.pow(2, 28), l = Math.pow(2, 35),
    k = Math.pow(2, 42), h = Math.pow(2, 49), f = Math.pow(2, 56), d = Math.pow(2, 63);
  e.exports = function (e) {
    return e < t ? 1 : e < r ? 2 : e < o ? 3 : e < c ? 4 : e < l ? 5 : e < k ? 6 : e < h ? 7 : e < f ? 8 : e < d ? 9 : 10
  }
}, function (e, n, t) {
  "use strict";
  const r = Object.freeze({
    identity: 0,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    "murmur3-128": 34,
    "murmur3-32": 35,
    "dbl-sha2-256": 86,
    md4: 212,
    md5: 213,
    bmt: 214,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082
  });
  e.exports = {names: r}
}, function (e, n, t) {
  "use strict";
  const {encodeText: r} = t(812);
  e.exports = class {
    constructor(e, code, n, t) {
      this.name = e, this.code = code, this.codeBuf = r(this.code), this.alphabet = t, this.codec = n(t)
    }

    encode(e) {
      return this.codec.encode(e)
    }

    decode(e) {
      for (const n of e) if (this.alphabet && this.alphabet.indexOf(n) < 0) throw new Error(`invalid character '${n}' in '${e}'`);
      return this.codec.decode(e)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    rfc4648: e => n => ({
      encode: input => ((data, e, n) => {
        const t = "=" === e[e.length - 1], mask = (1 << n) - 1;
        let r = "", o = 0, c = 0;
        for (let i = 0; i < data.length; ++i) for (c = c << 8 | data[i], o += 8; o > n;) o -= n, r += e[mask & c >> o];
        if (o && (r += e[mask & c << n - o]), t) for (; r.length * n & 7;) r += "=";
        return r
      })(input, n, e), decode: input => ((e, n, t) => {
        const r = {};
        for (let i = 0; i < n.length; ++i) r[n[i]] = i;
        let o = e.length;
        for (; "=" === e[o - 1];) --o;
        const c = new Uint8Array(o * t / 8 | 0);
        let l = 0, k = 0, h = 0;
        for (let i = 0; i < o; ++i) {
          const n = r[e[i]];
          if (void 0 === n) throw new SyntaxError("Invalid character " + e[i]);
          k = k << t | n, l += t, l >= 8 && (l -= 8, c[h++] = 255 & k >> l)
        }
        if (l >= t || 255 & k << 8 - l) throw new SyntaxError("Unexpected end of data");
        return c
      })(input, n, e)
    })
  }
}, function (e, n, t) {
  "use strict";
  const r = t(754), o = new Map;
  for (const e in r) {
    const code = r[e];
    o.set(code, e)
  }
  e.exports = Object.freeze(o)
}, function (e, n, t) {
  "use strict";
  const r = t(754), o = t(813).varintEncode, c = {};
  for (const e in r) {
    const code = r[e];
    c[e] = o(code)
  }
  e.exports = Object.freeze(c)
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(774), {TextDecoder: o} = t(711), c = new o("utf8");
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.decode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.encode(e)
  }
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(774), {TextEncoder: o} = t(711), c = new o;
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.encode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.decode(e)
  }
}, function (e, n, t) {
  "use strict";
  e.exports = function (e, n) {
    n || (n = e.reduce((e, n) => e + n.length, 0));
    const output = new Uint8Array(n);
    let t = 0;
    for (const n of e) output.set(n, t), t += n.length;
    return output
  }
}, function (e, n, t) {
  "use strict";
  const table = t(754), r = {};
  for (const [e, code] of Object.entries(table)) r[e.toUpperCase().replace(/-/g, "_")] = code;
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const table = t(754), r = {};
  for (const [e, code] of Object.entries(table)) void 0 === r[code] && (r[code] = e);
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const r = t(753), o = {
    checkCIDComponents: function (e) {
      if (null == e) return "null values are not valid CIDs";
      if (0 !== e.version && 1 !== e.version) return "Invalid version, must be a number equal to 1 or 0";
      if ("string" != typeof e.codec) return "codec must be string";
      if (0 === e.version) {
        if ("dag-pb" !== e.codec) return "codec must be 'dag-pb' for CIDv0";
        if ("base58btc" !== e.multibaseName) return "multibaseName must be 'base58btc' for CIDv0"
      }
      if (!(e.multihash instanceof Uint8Array)) return "multihash must be a Uint8Array";
      try {
        r.validate(e.multihash)
      } catch (e) {
        let n = e.message;
        return n || (n = "Multihash validation failed"), n
      }
    }
  };
  e.exports = o
}, function (e, n, t) {
  "use strict";
  const r = t(917), o = t(777), c = t(78), l = t(718), k = t(712);

  function h(e) {
    const n = [], t = e.split("/").slice(1);
    if (1 === t.length && "" === t[0]) return [];
    for (let p = 0; p < t.length; p++) {
      const r = t[p], c = o(r);
      if (0 !== c.size) {
        if (p++, p >= t.length) throw _("invalid address: " + e);
        if (c.path) {
          n.push([r, A(t.slice(p).join("/"))]);
          break
        }
        n.push([r, t[p]])
      } else n.push([r])
    }
    return n
  }

  function f(e) {
    const n = [];
    return e.map(e => {
      const t = N(e);
      n.push(t.name), e.length > 1 && n.push(e[1])
    }), A(n.join("/"))
  }

  function d(e) {
    return e.map(e => {
      Array.isArray(e) || (e = [e]);
      const n = N(e);
      return e.length > 1 ? [n.code, r.toBytes(n.code, e[1])] : [n.code]
    })
  }

  function m(e) {
    return e.map(e => {
      const n = N(e);
      return e.length > 1 ? [n.code, r.toString(n.code, e[1])] : [n.code]
    })
  }

  function w(e) {
    return x(l(e.map(e => {
      const n = N(e);
      let t = Uint8Array.from(c.encode(n.code));
      return e.length > 1 && (t = l([t, e[1]])), t
    })))
  }

  function y(p, e) {
    if (p.size > 0) return p.size / 8;
    if (0 === p.size) return 0;
    return c.decode(e) + c.decode.bytes
  }

  function E(e) {
    const n = [];
    let i = 0;
    for (; i < e.length;) {
      const code = c.decode(e, i), t = c.decode.bytes, r = y(o(code), e.slice(i + t));
      if (0 === r) {
        n.push([code]), i += t;
        continue
      }
      const l = e.slice(i + t, i + t + r);
      if (i += r + t, i > e.length) throw _("Invalid address Uint8Array: " + k(e, "base16"));
      n.push([code, l])
    }
    return n
  }

  function v(e) {
    return w(d(h(e = A(e))))
  }

  function x(e) {
    const n = S(e);
    if (n) throw n;
    return Uint8Array.from(e)
  }

  function S(e) {
    try {
      E(e)
    } catch (e) {
      return e
    }
  }

  function A(e) {
    return "/" + e.trim().split("/").filter(a => a).join("/")
  }

  function _(e) {
    return new Error("Error parsing address: " + e)
  }

  function N(e) {
    return o(e[0])
  }

  e.exports = {
    stringToStringTuples: h,
    stringTuplesToString: f,
    tuplesToStringTuples: m,
    stringTuplesToTuples: d,
    bytesToTuples: E,
    tuplesToBytes: w,
    bytesToString: function (e) {
      const a = E(e);
      return f(m(a))
    },
    stringToBytes: v,
    fromString: function (e) {
      return v(e)
    },
    fromBytes: x,
    validateBytes: S,
    isValidBytes: function (e) {
      return void 0 === S(e)
    },
    cleanPath: A,
    ParseError: _,
    protoFromTuple: N,
    sizeForAddr: y
  }
}, function (e, n, t) {
  "use strict";
  const r = t(918), o = t(777), c = t(814), l = t(778), k = t(78), h = t(712), f = t(717), d = t(718);

  function m(e, a) {
    return a instanceof Uint8Array ? m.toString(e, a) : m.toBytes(e, a)
  }

  function w(e) {
    if (!r.isIP(e)) throw new Error("invalid ip address");
    return r.toBytes(e)
  }

  function y(e) {
    const n = new ArrayBuffer(2);
    return new DataView(n).setUint16(0, e), new Uint8Array(n)
  }

  function E(e) {
    return new DataView(e.buffer).getUint16(0)
  }

  function v(e) {
    const n = e.slice(0, e.length - 2), t = e.slice(e.length - 2);
    return h(n, "base32") + ":" + E(t)
  }

  e.exports = m, m.toString = function (e, n) {
    switch ((e = o(e)).code) {
      case 4:
      case 41:
        return function (e) {
          const n = r.toString(e);
          if (!n || !r.isIP(n)) throw new Error("invalid ip address");
          return n
        }(n);
      case 6:
      case 273:
      case 33:
      case 132:
        return E(n);
      case 53:
      case 54:
      case 55:
      case 56:
      case 400:
      case 777:
        return function (e) {
          const n = k.decode(e);
          if ((e = e.slice(k.decode.bytes)).length !== n) throw new Error("inconsistent lengths");
          return h(e)
        }(n);
      case 421:
        return function (e) {
          const n = k.decode(e), address = e.slice(k.decode.bytes);
          if (address.length !== n) throw new Error("inconsistent lengths");
          return h(address, "base58btc")
        }(n);
      case 444:
      case 445:
        return v(n);
      default:
        return h(n, "base16")
    }
  }, m.toBytes = function (e, n) {
    switch ((e = o(e)).code) {
      case 4:
      case 41:
        return w(n);
      case 6:
      case 273:
      case 33:
      case 132:
        return y(parseInt(n, 10));
      case 53:
      case 54:
      case 55:
      case 56:
      case 400:
      case 777:
        return function (e) {
          const n = f(e), t = Uint8Array.from(k.encode(n.length));
          return d([t, n], t.length + n.length)
        }(n);
      case 421:
        return function (e) {
          const n = new c(e).multihash, t = Uint8Array.from(k.encode(n.length));
          return d([t, n], t.length + n.length)
        }(n);
      case 444:
        return function (e) {
          const n = e.split(":");
          if (2 !== n.length) throw new Error("failed to parse onion addr: " + n + " does not contain a port number");
          if (16 !== n[0].length) throw new Error("failed to parse onion addr: " + n[0] + " not a Tor onion address.");
          const t = l.decode("b" + n[0]), r = parseInt(n[1], 10);
          if (r < 1 || r > 65536) throw new Error("Port number is not in range(1, 65536)");
          const o = y(r);
          return d([t, o], t.length + o.length)
        }(n);
      case 445:
        return function (e) {
          const n = e.split(":");
          if (2 !== n.length) throw new Error("failed to parse onion addr: " + n + " does not contain a port number");
          if (56 !== n[0].length) throw new Error("failed to parse onion addr: " + n[0] + " not a Tor onion3 address.");
          const t = l.decode("b" + n[0]), r = parseInt(n[1], 10);
          if (r < 1 || r > 65536) throw new Error("Port number is not in range(1, 65536)");
          const o = y(r);
          return d([t, o], t.length + o.length)
        }(n);
      default:
        return f(n, "base16")
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(919), o = t(712), c = r, l = r.v4, k = r.v6, h = function (e, n, t) {
    var r;
    if (t = ~~t, l(e)) r = n || new Uint8Array(t + 4), e.split(/\./g).map((function (e) {
      r[t++] = 255 & parseInt(e, 10)
    })); else if (k(e)) {
      var i, c = e.split(":", 8);
      for (i = 0; i < c.length; i++) {
        var f;
        l(c[i]) && (f = h(c[i]), c[i] = o(f.slice(0, 2), "base16")), f && ++i < 8 && c.splice(i, 0, o(f.slice(2, 4), "base16"))
      }
      if ("" === c[0]) for (; c.length < 8;) c.unshift("0"); else if ("" === c[c.length - 1]) for (; c.length < 8;) c.push("0"); else if (c.length < 8) {
        for (i = 0; i < c.length && "" !== c[i]; i++) ;
        var d = [i, "1"];
        for (i = 9 - c.length; i > 0; i--) d.push("0");
        c.splice.apply(c, d)
      }
      for (r = n || new Uint8Array(t + 16), i = 0; i < c.length; i++) {
        var m = parseInt(c[i], 16);
        r[t++] = m >> 8 & 255, r[t++] = 255 & m
      }
    }
    if (!r) throw Error("Invalid ip address: " + e);
    return r
  };
  e.exports = {
    isIP: c, isV4: l, isV6: k, toBytes: h, toString: function (e, n, t) {
      n = ~~n, t = t || e.length - n;
      var r, o = [];
      const view = new DataView(e.buffer);
      if (4 === t) {
        for (let i = 0; i < t; i++) o.push(e[n + i]);
        r = o.join(".")
      } else if (16 === t) {
        for (let i = 0; i < t; i += 2) o.push(view.getUint16(n + i).toString(16));
        r = (r = (r = o.join(":")).replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3")).replace(/:{3,4}/, "::")
      }
      return r
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(920), o = e => r({exact: !0}).test(e);
  o.v4 = e => r.v4({exact: !0}).test(e), o.v6 = e => r.v6({exact: !0}).test(e), o.version = e => o(e) ? o.v4(e) ? 4 : 6 : void 0, e.exports = o
}, function (e, n, t) {
  "use strict";
  const b = e => e && e.includeBoundaries ? "(?:(?<=\\s|^)(?=[a-fA-F\\d:])|(?<=[a-fA-F\\d:])(?=\\s|$))" : "",
    r = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",
    o = "[a-fA-F\\d]{1,4}",
    c = `\n(\n(?:${o}:){7}(?:${o}|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:${o}:){6}(?:${r}|:${o}|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:${o}:){5}(?::${r}|(:${o}){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:${o}:){4}(?:(:${o}){0,1}:${r}|(:${o}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:${o}:){3}(?:(:${o}){0,2}:${r}|(:${o}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:${o}:){2}(?:(:${o}){0,3}:${r}|(:${o}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:${o}:){1}(?:(:${o}){0,4}:${r}|(:${o}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::((?::${o}){0,5}:${r}|(?::${o}){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1\n`.replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(),
    l = new RegExp(`(?:^${r}$)|(?:^${c}$)`), k = new RegExp(`^${r}$`), h = new RegExp(`^${c}$`),
    f = e => e && e.exact ? l : new RegExp(`(?:${b(e)}${r}${b(e)})|(?:${b(e)}${c}${b(e)})`, "g");
  f.v4 = e => e && e.exact ? k : new RegExp(`${b(e)}${r}${b(e)}`, "g"), f.v6 = e => e && e.exact ? h : new RegExp(`${b(e)}${c}${b(e)}`, "g"), e.exports = f
}, function (e, n, t) {
  "use strict";
  const {encodeText: r} = t(780);
  e.exports = class {
    constructor(e, code, n, t) {
      this.name = e, this.code = code, this.codeBuf = r(this.code), this.alphabet = t, this.codec = n(t)
    }

    encode(e) {
      return this.codec.encode(e)
    }

    decode(e) {
      for (const n of e) if (this.alphabet && this.alphabet.indexOf(n) < 0) throw new Error(`invalid character '${n}' in '${e}'`);
      return this.codec.decode(e)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    rfc4648: e => n => ({
      encode: input => ((data, e, n) => {
        const t = "=" === e[e.length - 1], mask = (1 << n) - 1;
        let r = "", o = 0, c = 0;
        for (let i = 0; i < data.length; ++i) for (c = c << 8 | data[i], o += 8; o > n;) o -= n, r += e[mask & c >> o];
        if (o && (r += e[mask & c << n - o]), t) for (; r.length * n & 7;) r += "=";
        return r
      })(input, n, e), decode: input => ((e, n, t) => {
        const r = {};
        for (let i = 0; i < n.length; ++i) r[n[i]] = i;
        let o = e.length;
        for (; "=" === e[o - 1];) --o;
        const c = new Uint8Array(o * t / 8 | 0);
        let l = 0, k = 0, h = 0;
        for (let i = 0; i < o; ++i) {
          const n = r[e[i]];
          if (void 0 === n) throw new SyntaxError("Invalid character " + e[i]);
          k = k << t | n, l += t, l >= 8 && (l -= 8, c[h++] = 255 & k >> l)
        }
        if (l >= t || 255 & k << 8 - l) throw new SyntaxError("Unexpected end of data");
        return c
      })(input, n, e)
    })
  }
}, function (e, n, t) {
  e.exports = {encode: t(924), decode: t(925), encodingLength: t(926)}
}, function (e, n) {
  e.exports = function e(n, r, o) {
    if (Number.MAX_SAFE_INTEGER && n > Number.MAX_SAFE_INTEGER) throw e.bytes = 0, new RangeError("Could not encode varint");
    r = r || [];
    var c = o = o || 0;
    for (; n >= t;) r[o++] = 255 & n | 128, n /= 128;
    for (; -128 & n;) r[o++] = 255 & n | 128, n >>>= 7;
    return r[o] = 0 | n, e.bytes = o - c + 1, r
  };
  var t = Math.pow(2, 31)
}, function (e, n) {
  e.exports = function e(n, t) {
    var b, r = 0, o = 0, c = t = t || 0, l = n.length;
    do {
      if (c >= l || o > 49) throw e.bytes = 0, new RangeError("Could not decode varint");
      b = n[c++], r += o < 28 ? (127 & b) << o : (127 & b) * Math.pow(2, o), o += 7
    } while (b >= 128);
    return e.bytes = c - t, r
  }
}, function (e, n) {
  var t = Math.pow(2, 7), r = Math.pow(2, 14), o = Math.pow(2, 21), c = Math.pow(2, 28), l = Math.pow(2, 35),
    k = Math.pow(2, 42), h = Math.pow(2, 49), f = Math.pow(2, 56), d = Math.pow(2, 63);
  e.exports = function (e) {
    return e < t ? 1 : e < r ? 2 : e < o ? 3 : e < c ? 4 : e < l ? 5 : e < k ? 6 : e < h ? 7 : e < f ? 8 : e < d ? 9 : 10
  }
}, function (e, n, t) {
  "use strict";
  const r = Object.freeze({
    identity: 0,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    "murmur3-128": 34,
    "murmur3-32": 35,
    "dbl-sha2-256": 86,
    md4: 212,
    md5: 213,
    bmt: 214,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082
  });
  e.exports = {names: r}
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(929), c = t(930), l = t(816), k = t(933);
  (n = e.exports).addPrefix = (e, data) => {
    let n;
    if (e instanceof Uint8Array) n = l.varintUint8ArrayEncode(e); else {
      if (!c[e]) throw new Error("multicodec not recognized");
      n = c[e]
    }
    return k([n, data], n.length + data.length)
  }, n.rmPrefix = data => (r.decode(data), data.slice(r.decode.bytes)), n.getCodec = e => {
    const code = r.decode(e), n = o.get(code);
    if (void 0 === n) throw new Error(`Code ${code} not found`);
    return n
  }, n.getName = e => o.get(e), n.getNumber = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return r.decode(code)
  }, n.getCode = e => r.decode(e), n.getCodeVarint = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return code
  }, n.getVarint = code => r.encode(code);
  const h = t(934);
  Object.assign(n, h), n.print = t(935)
}, function (e, n, t) {
  "use strict";
  const r = t(755), o = new Map;
  for (const e in r) {
    const code = r[e];
    o.set(code, e)
  }
  e.exports = Object.freeze(o)
}, function (e, n, t) {
  "use strict";
  const r = t(755), o = t(816).varintEncode, c = {};
  for (const e in r) {
    const code = r[e];
    c[e] = o(code)
  }
  e.exports = Object.freeze(c)
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(779), {TextDecoder: o} = t(711), c = new o("utf8");
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.decode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.encode(e)
  }
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(779), {TextEncoder: o} = t(711), c = new o;
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.encode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.decode(e)
  }
}, function (e, n, t) {
  "use strict";
  e.exports = function (e, n) {
    n || (n = e.reduce((e, n) => e + n.length, 0));
    const output = new Uint8Array(n);
    let t = 0;
    for (const n of e) output.set(n, t), t += n.length;
    return output
  }
}, function (e, n, t) {
  "use strict";
  const table = t(755), r = {};
  for (const [e, code] of Object.entries(table)) r[e.toUpperCase().replace(/-/g, "_")] = code;
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const table = t(755), r = {};
  for (const [e, code] of Object.entries(table)) void 0 === r[code] && (r[code] = e);
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const r = t(815), o = {
    checkCIDComponents: function (e) {
      if (null == e) return "null values are not valid CIDs";
      if (0 !== e.version && 1 !== e.version) return "Invalid version, must be a number equal to 1 or 0";
      if ("string" != typeof e.codec) return "codec must be string";
      if (0 === e.version) {
        if ("dag-pb" !== e.codec) return "codec must be 'dag-pb' for CIDv0";
        if ("base58btc" !== e.multibaseName) return "multibaseName must be 'base58btc' for CIDv0"
      }
      if (!(e.multihash instanceof Uint8Array)) return "multihash must be a Uint8Array";
      try {
        r.validate(e.multihash)
      } catch (e) {
        let n = e.message;
        return n || (n = "Multihash validation failed"), n
      }
    }
  };
  e.exports = o
}, , function (e, n, t) {
  "use strict";
  const r = t(817);
  e.exports = async function* (e, n) {
    const t = new r, o = await t.get(e, n);
    yield{path: decodeURIComponent(new URL(e).pathname.split("/").pop() || ""), content: o.iterator()}
  }
}, function (e, n, t) {
  "use strict";
  var r = function () {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if (void 0 !== r) return r;
    throw new Error("unable to locate global object")
  }();
  e.exports = n = r.fetch, r.fetch && (n.default = r.fetch.bind(r)), n.Headers = r.Headers, n.Request = r.Request, n.Response = r.Response
}, function (e, n, t) {
  "use strict";
  e.exports = e => {
    if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
    const n = Object.getPrototypeOf(e);
    return null === n || n === Object.prototype
  }
}, function (e, n, t) {
  "use strict";
  const {URLWithLegacySupport: r, format: o} = t(819);
  e.exports = (e, n = {}, t = {}, c) => {
    let l, k = n.protocol ? n.protocol.replace(":", "") : "http";
    k = (t[k] || c || k) + ":";
    try {
      l = new r(e)
    } catch (e) {
      l = {}
    }
    const base = Object.assign({}, n, {protocol: k || l.protocol, host: n.host || l.host});
    return new r(e, o(base)).toString()
  }
}, function (e, n, t) {
  "use strict";
  e.exports = t(768).TextDecoder
}, function (e, n, t) {
  "use strict";
  e.exports = AbortController
}, function (e, n, t) {
  "use strict";
  const r = t(820), o = t(783), c = t(708);
  e.exports = e => {
    const n = r(e);
    return c(() => async function (input, e = {}) {
      return o(n(input, e))
    })(e)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(723), o = t(946), {isBrowser: c, isWebWorker: l} = t(947), {URL: k} = t(767), h = t(949).default,
    f = t(821)("ipfs-http-client:lib:error-handler"), d = t(817), m = t(818), w = (e = {}) => {
      (input => {
        try {
          return r(input), !0
        } catch (e) {
          return !1
        }
      })(e) ? e = {url: o(e)} : "string" == typeof e && (e = {url: e});
      const n = new k(e.url);
      return e.apiPath ? n.pathname = e.apiPath : "/" !== n.pathname && void 0 !== n.pathname || (n.pathname = "api/v0"), e.url || (c || l ? (n.protocol = e.protocol || location.protocol, n.hostname = e.host || location.hostname, n.port = e.port || location.port) : (n.hostname = e.host || "localhost", n.port = e.port || "5001", n.protocol = e.protocol || "http")), e.url = n, e
    }, y = async e => {
      let n;
      try {
        if ((e.headers.get("Content-Type") || "").startsWith("application/json")) {
          const data = await e.json();
          f(data), n = data.Message || data.message
        } else n = await e.text()
      } catch (e) {
        f("Failed to parse error response", e), n = e.message
      }
      let t = new d.HTTPError(e);
      throw n && n.includes("context deadline exceeded") && (t = new d.TimeoutError(e)), n && (t.message = n), t
    }, E = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, v = e => e.replace(E, (function (e) {
      return "-" + e.toLowerCase()
    }));

  class x extends d {
    constructor(e = {}) {
      const n = w(e);
      var t;
      super({
        timeout: (t = n.timeout, ("string" == typeof t ? h(t) : t) || 12e5),
        headers: n.headers,
        base: w(n.url).toString(),
        handleError: y,
        transformSearchParams: e => {
          const n = new URLSearchParams;
          for (const [t, r] of e) "undefined" !== r && "null" !== r && "signal" !== t && n.append(v(t), r), "timeout" !== t || isNaN(r) || n.append(v(t), r);
          return n
        }
      }), delete this.get, delete this.put, delete this.delete, delete this.options;
      const r = this.fetch;
      this.fetch = (e, n = {}) => r.call(this, e, m(n, {method: "POST"}))
    }
  }

  x.errorHandler = y, e.exports = x
}, function (e, n, t) {
  const r = t(723), o = (e, n) => n, c = {
    ip4: o,
    ip6: (e, content, i, n) => 1 === n.length && "ip6" === n[0].protocol ? content : `[${content}]`,
    tcp: (e, content, i, n, t) => n.some(p => ["http", "https", "ws", "wss"].includes(p.protocol)) ? `${e}:${content}` : ((e, n, t, r) => {
      if (r && !1 === r.assumeHttp) return `tcp://${e}:${n}`;
      let o = "tcp", c = ":" + n;
      return "tcp" === t[t.length - 1].protocol && (o = "443" === n ? "https" : "http", c = "443" === n || "80" === n ? "" : c), `${o}://${e}${c}`
    })(e, content, n, t),
    udp: (e, content) => `udp://${e}:${content}`,
    dnsaddr: o,
    dns4: o,
    dns6: o,
    ipfs: (e, content) => `${e}/ipfs/${content}`,
    p2p: (e, content) => `${e}/p2p/${content}`,
    http: e => "http://" + e,
    https: e => "https://" + e,
    ws: e => "ws://" + e,
    wss: e => "wss://" + e,
    "p2p-websocket-star": e => e + "/p2p-websocket-star",
    "p2p-webrtc-star": e => e + "/p2p-webrtc-star",
    "p2p-webrtc-direct": e => e + "/p2p-webrtc-direct"
  };
  e.exports = (e, n) => {
    const t = r(e), o = e.toString().split("/").slice(1);
    return t.tuples().map(e => ({protocol: o.shift(), content: e[1] ? o.shift() : null})).reduce((e, t, i, r) => {
      const o = c[t.protocol];
      if (!o) throw new Error("Unsupported protocol " + t.protocol);
      return o(e, t.content, i, r, n)
    }, "")
  }
}, function (e, n, t) {
  "use strict";
  (function (n) {
    const r = t(948), o = "object" == typeof window && "object" == typeof document && 9 === document.nodeType, c = r(),
      l = o && !c, k = c && !o, h = c && o, f = void 0 !== n && void 0 !== n.release && "node" === n.release.name && !c,
      d = "function" == typeof importScripts && "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope,
      m = void 0 !== n && void 0 !== n.env && !1;
    e.exports = {
      isTest: m,
      isElectron: c,
      isElectronMain: k,
      isElectronRenderer: h,
      isNode: f,
      isBrowser: l,
      isWebWorker: d,
      isEnvWithDom: o
    }
  }).call(this, t(10))
}, function (e, n, t) {
  (function (n) {
    e.exports = function () {
      return "undefined" != typeof window && "object" == typeof window.process && "renderer" === window.process.type || (!(void 0 === n || "object" != typeof n.versions || !n.versions.electron) || "object" == typeof navigator && "string" == typeof navigator.userAgent && navigator.userAgent.indexOf("Electron") >= 0)
    }
  }).call(this, t(10))
}, function (e, n, t) {
  "use strict";
  t.r(n), t.d(n, "default", (function () {
    return o
  }));
  let r = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([a-zµμ]*)/gi;

  function o(e = "", n = "ms") {
    var t = null;
    return (e = e.replace(/(\d),(\d)/g, "$1$2")).replace(r, (function (e, n, r) {
      (r = o[r] || o[r.toLowerCase().replace(/s$/, "")]) && (t = (t || 0) + parseFloat(n, 10) * r)
    })), t && t / o[n]
  }

  o.nanosecond = o.ns = 1e-6, o["µs"] = o["μs"] = o.us = o.microsecond = .001, o.millisecond = o.ms = 1, o.second = o.sec = o.s = 1e3 * o.ms, o.minute = o.min = o.m = 60 * o.s, o.hour = o.hr = o.h = 60 * o.m, o.day = o.d = 24 * o.h, o.week = o.wk = o.w = 7 * o.d, o.month = o.b = 30.4375 * o.d, o.year = o.yr = o.y = 365.25 * o.d
}, function (e, n, t) {
  e.exports = function (e) {
    function n(e) {
      let t, o = null;

      function c(...e) {
        if (!c.enabled) return;
        const r = c, o = Number(new Date), l = o - (t || o);
        r.diff = l, r.prev = t, r.curr = o, t = o, e[0] = n.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
        let k = 0;
        e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, o) => {
          if ("%%" === t) return "%";
          k++;
          const c = n.formatters[o];
          if ("function" == typeof c) {
            const n = e[k];
            t = c.call(r, n), e.splice(k, 1), k--
          }
          return t
        }), n.formatArgs.call(r, e);
        (r.log || n.log).apply(r, e)
      }

      return c.namespace = e, c.useColors = n.useColors(), c.color = n.selectColor(e), c.extend = r, c.destroy = n.destroy, Object.defineProperty(c, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => null === o ? n.enabled(e) : o,
        set: e => {
          o = e
        }
      }), "function" == typeof n.init && n.init(c), c
    }

    function r(e, t) {
      const r = n(this.namespace + (void 0 === t ? ":" : t) + e);
      return r.log = this.log, r
    }

    function o(e) {
      return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
    }

    return n.debug = n, n.default = n, n.coerce = function (e) {
      if (e instanceof Error) return e.stack || e.message;
      return e
    }, n.disable = function () {
      const e = [...n.names.map(o), ...n.skips.map(o).map(e => "-" + e)].join(",");
      return n.enable(""), e
    }, n.enable = function (e) {
      let i;
      n.save(e), n.names = [], n.skips = [];
      const t = ("string" == typeof e ? e : "").split(/[\s,]+/), r = t.length;
      for (i = 0; i < r; i++) t[i] && ("-" === (e = t[i].replace(/\*/g, ".*?"))[0] ? n.skips.push(new RegExp("^" + e.substr(1) + "$")) : n.names.push(new RegExp("^" + e + "$")))
    }, n.enabled = function (e) {
      if ("*" === e[e.length - 1]) return !0;
      let i, t;
      for (i = 0, t = n.skips.length; i < t; i++) if (n.skips[i].test(e)) return !1;
      for (i = 0, t = n.names.length; i < t; i++) if (n.names[i].test(e)) return !0;
      return !1
    }, n.humanize = t(951), n.destroy = function () {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")
    }, Object.keys(e).forEach(t => {
      n[t] = e[t]
    }), n.names = [], n.skips = [], n.formatters = {}, n.selectColor = function (e) {
      let t = 0;
      for (let i = 0; i < e.length; i++) t = (t << 5) - t + e.charCodeAt(i), t |= 0;
      return n.colors[Math.abs(t) % n.colors.length]
    }, n.enable(n.load()), n
  }
}, function (e, n) {
  var s = 1e3, t = 6e4, r = 60 * t, o = 24 * r;

  function c(e, n, t, r) {
    var o = n >= 1.5 * t;
    return Math.round(e / t) + " " + r + (o ? "s" : "")
  }

  e.exports = function (e, n) {
    n = n || {};
    var l = typeof e;
    if ("string" === l && e.length > 0) return function (e) {
      if ((e = String(e)).length > 100) return;
      var n = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
      if (!n) return;
      var c = parseFloat(n[1]);
      switch ((n[2] || "ms").toLowerCase()) {
        case"years":
        case"year":
        case"yrs":
        case"yr":
        case"y":
          return 315576e5 * c;
        case"weeks":
        case"week":
        case"w":
          return 6048e5 * c;
        case"days":
        case"day":
        case"d":
          return c * o;
        case"hours":
        case"hour":
        case"hrs":
        case"hr":
        case"h":
          return c * r;
        case"minutes":
        case"minute":
        case"mins":
        case"min":
        case"m":
          return c * t;
        case"seconds":
        case"second":
        case"secs":
        case"sec":
        case"s":
          return c * s;
        case"milliseconds":
        case"millisecond":
        case"msecs":
        case"msec":
        case"ms":
          return c;
        default:
          return
      }
    }(e);
    if ("number" === l && isFinite(e)) return n.long ? function (e) {
      var n = Math.abs(e);
      if (n >= o) return c(e, n, o, "day");
      if (n >= r) return c(e, n, r, "hour");
      if (n >= t) return c(e, n, t, "minute");
      if (n >= s) return c(e, n, s, "second");
      return e + " ms"
    }(e) : function (e) {
      var n = Math.abs(e);
      if (n >= o) return Math.round(e / o) + "d";
      if (n >= r) return Math.round(e / r) + "h";
      if (n >= t) return Math.round(e / t) + "m";
      if (n >= s) return Math.round(e / s) + "s";
      return e + "ms"
    }(e);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
  }
}, function (e, n, t) {
  "use strict";
  const r = t(953), o = t(955);
  e.exports = input => o(input, r)
}, function (e, n, t) {
  "use strict";
  const r = t(756), {Blob: o} = t(768), c = t(822), l = t(823), k = t(954), {isBytes: h, isBlob: f} = t(824);

  async function d(e) {
    const n = [];
    for await(const t of e) n.push(t);
    return new o(n)
  }

  e.exports = async function (input) {
    if (h(input) || "string" == typeof input || input instanceof String) return new o([input]);
    if (f(input)) return input;
    if ("function" == typeof input.getReader && (input = l(input)), input[Symbol.iterator] || input[Symbol.asyncIterator]) {
      const e = c(input), {value: n, done: t} = await e.peek();
      if (t) return d(e);
      if (e.push(n), Number.isInteger(n)) return new o([Uint8Array.from(await k(e))]);
      if (h(n) || "string" == typeof n || n instanceof String) return d(e)
    }
    throw r(new Error("Unexpected input: " + input), "ERR_UNEXPECTED_INPUT")
  }
}, function (e, n, t) {
  "use strict";
  e.exports = async source => {
    const e = [];
    for await(const n of source) e.push(n);
    return e
  }
}, function (e, n, t) {
  "use strict";
  const r = t(756), o = t(823), c = t(822), map = t(825), {isBytes: l, isBlob: k, isFileObject: h} = t(824);

  async function f(input, e) {
    const n = {path: input.path || "", mode: input.mode, mtime: input.mtime};
    return input.content ? n.content = await e(input.content) : input.path || (n.content = await e(input)), n
  }

  e.exports = async function* (input, e) {
    if (null == input) throw r(new Error("Unexpected input: " + input), "ERR_UNEXPECTED_INPUT");
    if ("string" == typeof input || input instanceof String) yield f(input, e); else if (l(input) || k(input)) yield f(input, e); else {
      if ("function" == typeof input.getReader && (input = o(input)), input[Symbol.iterator] || input[Symbol.asyncIterator]) {
        const n = c(input), {value: t, done: r} = await n.peek();
        if (r) return void (yield* n);
        if (n.push(t), Number.isInteger(t) || l(t)) return void (yield f(n, e));
        if (h(t) || k(t) || "string" == typeof t || t instanceof String) return void (yield* map(n, n => f(n, e)));
        if (t[Symbol.iterator] || t[Symbol.asyncIterator] || "function" == typeof t.getReader) return void (yield* map(n, n => f(n, e)))
      }
      if (!h(input)) throw r(new Error("Unexpected input: " + typeof input), "ERR_UNEXPECTED_INPUT");
      yield f(input, e)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({wantlist: t(957)(e), wantlistForPeer: t(958)(e), stat: t(826)(e), unwant: t(959)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async function (n = {}) {
    return ((await (await e.post("bitswap/wantlist", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c(n),
      headers: n.headers
    })).json()).Keys || []).map(e => new r(e["/"]))
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async function (n, t = {}) {
    return n = "string" == typeof n ? n : new r(n).toString(), ((await (await e.post("bitswap/wantlist", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({...t, peer: n}),
      headers: t.headers
    })).json()).Keys || []).map(e => new r(e["/"]))
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async function (n, t = {}) {
    return (await e.post("bitswap/unwant", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({arg: "string" == typeof n ? n : new r(n).toString(), ...t}),
      headers: t.headers
    })).json()
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({get: t(827)(e), stat: t(978)(e), put: t(979)(e), rm: t(980)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(829), o = t(830), c = t(969), l = t(757), k = t(977), h = t(348), f = t(718), d = t(712), m = t(733),
    w = Object.keys(l).reduce((p, e) => (p[l[e]] = e, p), {});

  class y {
    constructor(e, n, t, l) {
      if (E.isCID(e)) {
        const n = e;
        return this.version = n.version, this.codec = n.codec, this.multihash = n.multihash, void (this.multibaseName = n.multibaseName || (0 === n.version ? "base58btc" : "base32"))
      }
      if ("string" == typeof e) {
        const n = o.isEncoded(e);
        if (n) {
          const t = o.decode(e);
          this.version = parseInt(t.slice(0, 1).toString("hex"), 16), this.codec = c.getCodec(t.slice(1)), this.multihash = c.rmPrefix(t.slice(1)), this.multibaseName = n
        } else this.version = 0, this.codec = "dag-pb", this.multihash = r.fromB58String(e), this.multibaseName = "base58btc";
        return y.validateCID(this), void Object.defineProperty(this, "string", {value: e})
      }
      if (e instanceof Uint8Array) {
        const n = e.slice(0, 1), t = parseInt(n.toString("hex"), 16);
        if (1 === t) {
          const n = e;
          this.version = t, this.codec = c.getCodec(n.slice(1)), this.multihash = c.rmPrefix(n.slice(1)), this.multibaseName = "base32"
        } else this.version = 0, this.codec = "dag-pb", this.multihash = e, this.multibaseName = "base58btc";
        y.validateCID(this)
      } else this.version = e, "number" == typeof n && (n = w[n]), this.codec = n, this.multihash = t, this.multibaseName = l || (0 === e ? "base58btc" : "base32"), y.validateCID(this)
    }

    get bytes() {
      let e = this._bytes;
      if (!e) {
        if (0 === this.version) e = this.multihash; else {
          if (1 !== this.version) throw new Error("unsupported version");
          {
            const n = c.getCodeVarint(this.codec);
            e = f([[1], n, this.multihash], 1 + n.byteLength + this.multihash.byteLength)
          }
        }
        Object.defineProperty(this, "_bytes", {value: e})
      }
      return e
    }

    get prefix() {
      const e = c.getCodeVarint(this.codec), n = r.prefix(this.multihash);
      return f([[this.version], e, n], 1 + e.byteLength + n.byteLength)
    }

    get code() {
      return l[this.codec]
    }

    toV0() {
      if ("dag-pb" !== this.codec) throw new Error("Cannot convert a non dag-pb CID to CIDv0");
      const {name: e, length: n} = r.decode(this.multihash);
      if ("sha2-256" !== e) throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
      if (32 !== n) throw new Error("Cannot convert non 32 byte multihash CID to CIDv0");
      return new E(0, this.codec, this.multihash)
    }

    toV1() {
      return new E(1, this.codec, this.multihash)
    }

    toBaseEncodedString(base = this.multibaseName) {
      if (this.string && base === this.multibaseName) return this.string;
      let e = null;
      if (0 === this.version) {
        if ("base58btc" !== base) throw new Error("not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()");
        e = r.toB58String(this.multihash)
      } else {
        if (1 !== this.version) throw new Error("unsupported version");
        e = d(o.encode(base, this.bytes))
      }
      return base === this.multibaseName && Object.defineProperty(this, "string", {value: e}), e
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")"
    }

    toString(base) {
      return this.toBaseEncodedString(base)
    }

    toJSON() {
      return {codec: this.codec, version: this.version, hash: this.multihash}
    }

    equals(e) {
      return this.codec === e.codec && this.version === e.version && m(this.multihash, e.multihash)
    }

    static validateCID(e) {
      const n = k.checkCIDComponents(e);
      if (n) throw new Error(n)
    }
  }

  const E = h(y, {className: "CID", symbolName: "@ipld/js-cid/CID"});
  E.codecs = l, e.exports = E
}, function (e, n, t) {
  "use strict";
  const {encodeText: r} = t(785);
  e.exports = class {
    constructor(e, code, n, t) {
      this.name = e, this.code = code, this.codeBuf = r(this.code), this.alphabet = t, this.codec = n(t)
    }

    encode(e) {
      return this.codec.encode(e)
    }

    decode(e) {
      for (const n of e) if (this.alphabet && this.alphabet.indexOf(n) < 0) throw new Error(`invalid character '${n}' in '${e}'`);
      return this.codec.decode(e)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    rfc4648: e => n => ({
      encode: input => ((data, e, n) => {
        const t = "=" === e[e.length - 1], mask = (1 << n) - 1;
        let r = "", o = 0, c = 0;
        for (let i = 0; i < data.length; ++i) for (c = c << 8 | data[i], o += 8; o > n;) o -= n, r += e[mask & c >> o];
        if (o && (r += e[mask & c << n - o]), t) for (; r.length * n & 7;) r += "=";
        return r
      })(input, n, e), decode: input => ((e, n, t) => {
        const r = {};
        for (let i = 0; i < n.length; ++i) r[n[i]] = i;
        let o = e.length;
        for (; "=" === e[o - 1];) --o;
        const c = new Uint8Array(o * t / 8 | 0);
        let l = 0, k = 0, h = 0;
        for (let i = 0; i < o; ++i) {
          const n = r[e[i]];
          if (void 0 === n) throw new SyntaxError("Invalid character " + e[i]);
          k = k << t | n, l += t, l >= 8 && (l -= 8, c[h++] = 255 & k >> l)
        }
        if (l >= t || 255 & k << 8 - l) throw new SyntaxError("Unexpected end of data");
        return c
      })(input, n, e)
    })
  }
}, function (e, n, t) {
  e.exports = {encode: t(965), decode: t(966), encodingLength: t(967)}
}, function (e, n) {
  e.exports = function e(n, r, o) {
    if (Number.MAX_SAFE_INTEGER && n > Number.MAX_SAFE_INTEGER) throw e.bytes = 0, new RangeError("Could not encode varint");
    r = r || [];
    var c = o = o || 0;
    for (; n >= t;) r[o++] = 255 & n | 128, n /= 128;
    for (; -128 & n;) r[o++] = 255 & n | 128, n >>>= 7;
    return r[o] = 0 | n, e.bytes = o - c + 1, r
  };
  var t = Math.pow(2, 31)
}, function (e, n) {
  e.exports = function e(n, t) {
    var b, r = 0, o = 0, c = t = t || 0, l = n.length;
    do {
      if (c >= l || o > 49) throw e.bytes = 0, new RangeError("Could not decode varint");
      b = n[c++], r += o < 28 ? (127 & b) << o : (127 & b) * Math.pow(2, o), o += 7
    } while (b >= 128);
    return e.bytes = c - t, r
  }
}, function (e, n) {
  var t = Math.pow(2, 7), r = Math.pow(2, 14), o = Math.pow(2, 21), c = Math.pow(2, 28), l = Math.pow(2, 35),
    k = Math.pow(2, 42), h = Math.pow(2, 49), f = Math.pow(2, 56), d = Math.pow(2, 63);
  e.exports = function (e) {
    return e < t ? 1 : e < r ? 2 : e < o ? 3 : e < c ? 4 : e < l ? 5 : e < k ? 6 : e < h ? 7 : e < f ? 8 : e < d ? 9 : 10
  }
}, function (e, n, t) {
  "use strict";
  const r = Object.freeze({
    identity: 0,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    "murmur3-128": 34,
    "murmur3-32": 35,
    "dbl-sha2-256": 86,
    md4: 212,
    md5: 213,
    bmt: 214,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082
  });
  e.exports = {names: r}
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(970), c = t(971), l = t(831), k = t(974);
  (n = e.exports).addPrefix = (e, data) => {
    let n;
    if (e instanceof Uint8Array) n = l.varintUint8ArrayEncode(e); else {
      if (!c[e]) throw new Error("multicodec not recognized");
      n = c[e]
    }
    return k([n, data], n.length + data.length)
  }, n.rmPrefix = data => (r.decode(data), data.slice(r.decode.bytes)), n.getCodec = e => {
    const code = r.decode(e), n = o.get(code);
    if (void 0 === n) throw new Error(`Code ${code} not found`);
    return n
  }, n.getName = e => o.get(e), n.getNumber = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return r.decode(code)
  }, n.getCode = e => r.decode(e), n.getCodeVarint = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return code
  }, n.getVarint = code => r.encode(code);
  const h = t(975);
  Object.assign(n, h), n.print = t(976)
}, function (e, n, t) {
  "use strict";
  const r = t(757), o = new Map;
  for (const e in r) {
    const code = r[e];
    o.set(code, e)
  }
  e.exports = Object.freeze(o)
}, function (e, n, t) {
  "use strict";
  const r = t(757), o = t(831).varintEncode, c = {};
  for (const e in r) {
    const code = r[e];
    c[e] = o(code)
  }
  e.exports = Object.freeze(c)
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(784), {TextDecoder: o} = t(711), c = new o("utf8");
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.decode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.encode(e)
  }
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(784), {TextEncoder: o} = t(711), c = new o;
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.encode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.decode(e)
  }
}, function (e, n, t) {
  "use strict";
  e.exports = function (e, n) {
    n || (n = e.reduce((e, n) => e + n.length, 0));
    const output = new Uint8Array(n);
    let t = 0;
    for (const n of e) output.set(n, t), t += n.length;
    return output
  }
}, function (e, n, t) {
  "use strict";
  const table = t(757), r = {};
  for (const [e, code] of Object.entries(table)) r[e.toUpperCase().replace(/-/g, "_")] = code;
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const table = t(757), r = {};
  for (const [e, code] of Object.entries(table)) void 0 === r[code] && (r[code] = e);
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const r = t(829), o = {
    checkCIDComponents: function (e) {
      if (null == e) return "null values are not valid CIDs";
      if (0 !== e.version && 1 !== e.version) return "Invalid version, must be a number equal to 1 or 0";
      if ("string" != typeof e.codec) return "codec must be string";
      if (0 === e.version) {
        if ("dag-pb" !== e.codec) return "codec must be 'dag-pb' for CIDv0";
        if ("base58btc" !== e.multibaseName) return "multibaseName must be 'base58btc' for CIDv0"
      }
      if (!(e.multihash instanceof Uint8Array)) return "multihash must be a Uint8Array";
      try {
        r.validate(e.multihash)
      } catch (e) {
        let n = e.message;
        return n || (n = "Multihash validation failed"), n
      }
    }
  };
  e.exports = o
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async (n, t = {}) => {
    const o = await e.post("block/stat", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({arg: new r(n).toString(), ...t}),
      headers: t.headers
    }), data = await o.json();
    return {cid: new r(data.Key), size: data.Size}
  })
}, function (e, n, t) {
  "use strict";
  const r = t(828), o = t(710), c = t(753), l = t(735), k = t(708), h = t(709), f = t(734), d = t(730).default;
  e.exports = k(e => async function n(data, t = {}) {
    if (r.isBlock(data)) {
      const {name: e, length: n} = c.decode(data.cid.multihash);
      t = {...t, format: data.cid.codec, mhtype: e, mhlen: n, version: data.cid.version}, data = data.data
    } else if (t.cid) {
      const e = new o(t.cid), {name: n, length: r} = c.decode(e.multihash);
      delete (t = {...t, format: e.codec, mhtype: n, mhlen: r, version: e.version}).cid
    }
    const k = new d, m = f([k.signal, t.signal]);
    let w;
    try {
      const n = await e.post("block/put", {
        timeout: t.timeout,
        signal: m,
        searchParams: h(t), ...await l(data, k, t.headers)
      });
      w = await n.json()
    } catch (e) {
      if ("dag-pb" === t.format) return n(data, {...t, format: "protobuf"});
      if ("dag-cbor" === t.format) return n(data, {...t, format: "cbor"});
      throw e
    }
    return new r(data, new o(w.Key))
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);

  function l(e) {
    const n = {cid: new r(e.Hash)};
    return e.Error && (n.error = new Error(e.Error)), n
  }

  e.exports = o(e => async function* (n, t = {}) {
    Array.isArray(n) || (n = [n]);
    const o = await e.post("block/rm", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({arg: n.map(e => new r(e).toString()), "stream-channels": !0, ...t}),
      headers: t.headers
    });
    for await(const e of o.ndjson()) yield l(e)
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({add: t(982)(e), clear: t(983)(e), rm: t(984)(e), reset: t(985)(e), list: t(986)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(723), o = t(708), c = t(709);
  e.exports = o(e => async (n, t = {}) => {
    n && "object" == typeof n && !r.isMultiaddr(n) && (t = n, n = null);
    return (await e.post("bootstrap/add", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({arg: n, ...t}),
      headers: t.headers
    })).json()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => (await e.post("bootstrap/rm", {
    timeout: n.timeout,
    signal: n.signal,
    searchParams: o({...n, all: !0}),
    headers: n.headers
  })).json())
}, function (e, n, t) {
  "use strict";
  const r = t(723), o = t(708), c = t(709);
  e.exports = o(e => async (n, t = {}) => {
    n && "object" == typeof n && !r.isMultiaddr(n) && (t = n, n = null);
    return (await e.post("bootstrap/rm", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({arg: n, ...t}),
      headers: t.headers
    })).json()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => (await e.post("bootstrap/add", {
    timeout: n.timeout,
    signal: n.signal,
    searchParams: o({...n, default: !0}),
    headers: n.headers
  })).json())
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => (await e.post("bootstrap/list", {
    timeout: n.timeout,
    signal: n.signal,
    searchParams: o(n),
    headers: n.headers
  })).json())
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async function* (path, n = {}) {
    const t = await e.post("cat", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c({arg: "string" == typeof path ? path : new r(path).toString(), ...n}),
      headers: n.headers
    });
    yield* t.iterator()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => (await e.post("commands", {
    timeout: n.timeout,
    signal: n.signal,
    searchParams: o(n),
    headers: n.headers
  })).json())
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({getAll: t(990)(e), get: t(991)(e), set: t(992)(e), replace: t(993)(e), profiles: t(994)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => {
    const t = await e.post("config/show", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: o({...n}),
      headers: n.headers
    });
    return await t.json()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n, t = {}) => {
    if (!n) throw new Error("key argument is required");
    const r = await e.post("config", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: o({arg: n, ...t}),
      headers: t.headers
    });
    return (await r.json()).Value
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (n, t, o = {}) => {
    if ("string" != typeof n) throw new Error("Invalid key type");
    const l = {arg: [n, t], ...o};
    "boolean" == typeof t ? (l.arg[1] = t.toString(), l.bool = !0) : "string" != typeof t && (l.arg[1] = JSON.stringify(t), l.json = !0);
    const k = await e.post("config", {timeout: o.timeout, signal: o.signal, searchParams: c(l), headers: o.headers});
    return r(await k.json())
  })
}, function (e, n, t) {
  "use strict";
  const r = t(717), o = t(735), c = t(708), l = t(709), k = t(734), h = t(730).default;
  e.exports = c(e => async (n, t = {}) => {
    const c = new h, f = k([c.signal, t.signal]);
    return (await e.post("config/replace", {
      timeout: t.timeout,
      signal: f,
      searchParams: l(t), ...await o(r(JSON.stringify(n)), c, t.headers)
    })).text()
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({apply: t(995)(e), list: t(996)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n, t = {}) => {
    const r = await e.post("config/profile/apply", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: o({arg: n, ...t}),
      headers: t.headers
    }), data = await r.json();
    return {original: data.OldCfg, updated: data.NewCfg}
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (n = {}) => {
    const t = await e.post("config/profile/list", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c(n),
      headers: n.headers
    });
    return (await t.json()).map(e => r(e))
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({get: t(998)(e), put: t(1100)(e), resolve: t(861)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(758), o = t(846), c = t(856), l = t(708),
    k = {"dag-cbor": o.resolver, "dag-pb": r.resolver, raw: c.resolver};
  e.exports = l((e, n) => {
    const r = t(827)(n), o = t(861)(n);
    return async (e, n = {}) => {
      const t = await o(e, n), c = await r(t.cid, n), l = k[t.cid.codec];
      if (!l) throw Object.assign(new Error(`Missing IPLD format "${t.cid.codec}"`), {missingMulticodec: t.cid.codec});
      return "raw" !== t.cid.codec || t.remPath || (t.remainderPath = "/"), l.resolve(c.data, t.remainderPath)
    }
  })
}, function (e, n, t) {
  "use strict";
  e.exports = t(832)
}, function (e, n, t) {
  e.exports = function () {
    "use strict";
    var e = function (e, t) {
      return n(e.slice(), t)
    };

    function n(e, n) {
      "function" != typeof n && (n = function (a, b) {
        return String(a).localeCompare(b)
      });
      var r = e.length;
      if (r <= 1) return e;
      for (var o = new Array(r), c = 1; c < r; c *= 2) {
        t(e, n, c, o);
        var l = e;
        e = o, o = l
      }
      return e
    }

    e.inplace = function (e, r) {
      var o = n(e, r);
      return o !== e && t(o, null, e.length, e), e
    };
    var t = function (e, n, t, r) {
      var o, c, l, li, k, h = e.length, i = 0, f = 2 * t;
      for (o = 0; o < h; o += f) for (l = (c = o + t) + t, c > h && (c = h), l > h && (l = h), li = o, k = c; ;) if (li < c && k < l) n(e[li], e[k]) <= 0 ? r[i++] = e[li++] : r[i++] = e[k++]; else if (li < c) r[i++] = e[li++]; else {
        if (!(k < l)) break;
        r[i++] = e[k++]
      }
    };
    return e
  }()
}, function (e, n, t) {
  "use strict";
  e.exports = function (a, b) {
    for (let i = 0; i < a.byteLength; i++) {
      if (a[i] < b[i]) return -1;
      if (a[i] > b[i]) return 1
    }
    return a.byteLength > b.byteLength ? 1 : a.byteLength < b.byteLength ? -1 : 0
  }
}, function (e, n, t) {
  "use strict";
  const {encodeText: r} = t(787);
  e.exports = class {
    constructor(e, code, n, t) {
      this.name = e, this.code = code, this.codeBuf = r(this.code), this.alphabet = t, this.codec = n(t)
    }

    encode(e) {
      return this.codec.encode(e)
    }

    decode(e) {
      for (const n of e) if (this.alphabet && this.alphabet.indexOf(n) < 0) throw new Error(`invalid character '${n}' in '${e}'`);
      return this.codec.decode(e)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    rfc4648: e => n => ({
      encode: input => ((data, e, n) => {
        const t = "=" === e[e.length - 1], mask = (1 << n) - 1;
        let r = "", o = 0, c = 0;
        for (let i = 0; i < data.length; ++i) for (c = c << 8 | data[i], o += 8; o > n;) o -= n, r += e[mask & c >> o];
        if (o && (r += e[mask & c << n - o]), t) for (; r.length * n & 7;) r += "=";
        return r
      })(input, n, e), decode: input => ((e, n, t) => {
        const r = {};
        for (let i = 0; i < n.length; ++i) r[n[i]] = i;
        let o = e.length;
        for (; "=" === e[o - 1];) --o;
        const c = new Uint8Array(o * t / 8 | 0);
        let l = 0, k = 0, h = 0;
        for (let i = 0; i < o; ++i) {
          const n = r[e[i]];
          if (void 0 === n) throw new SyntaxError("Invalid character " + e[i]);
          k = k << t | n, l += t, l >= 8 && (l -= 8, c[h++] = 255 & k >> l)
        }
        if (l >= t || 255 & k << 8 - l) throw new SyntaxError("Unexpected end of data");
        return c
      })(input, n, e)
    })
  }
}, function (e, n, t) {
  e.exports = {encode: t(1005), decode: t(1006), encodingLength: t(1007)}
}, function (e, n) {
  e.exports = function e(n, r, o) {
    if (Number.MAX_SAFE_INTEGER && n > Number.MAX_SAFE_INTEGER) throw e.bytes = 0, new RangeError("Could not encode varint");
    r = r || [];
    var c = o = o || 0;
    for (; n >= t;) r[o++] = 255 & n | 128, n /= 128;
    for (; -128 & n;) r[o++] = 255 & n | 128, n >>>= 7;
    return r[o] = 0 | n, e.bytes = o - c + 1, r
  };
  var t = Math.pow(2, 31)
}, function (e, n) {
  e.exports = function e(n, t) {
    var b, r = 0, o = 0, c = t = t || 0, l = n.length;
    do {
      if (c >= l || o > 49) throw e.bytes = 0, new RangeError("Could not decode varint");
      b = n[c++], r += o < 28 ? (127 & b) << o : (127 & b) * Math.pow(2, o), o += 7
    } while (b >= 128);
    return e.bytes = c - t, r
  }
}, function (e, n) {
  var t = Math.pow(2, 7), r = Math.pow(2, 14), o = Math.pow(2, 21), c = Math.pow(2, 28), l = Math.pow(2, 35),
    k = Math.pow(2, 42), h = Math.pow(2, 49), f = Math.pow(2, 56), d = Math.pow(2, 63);
  e.exports = function (e) {
    return e < t ? 1 : e < r ? 2 : e < o ? 3 : e < c ? 4 : e < l ? 5 : e < k ? 6 : e < h ? 7 : e < f ? 8 : e < d ? 9 : 10
  }
}, function (e, n, t) {
  "use strict";
  const r = Object.freeze({
    identity: 0,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    "murmur3-128": 34,
    "murmur3-32": 35,
    "dbl-sha2-256": 86,
    md4: 212,
    md5: 213,
    bmt: 214,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082
  });
  e.exports = {names: r}
}, function (e, n, t) {
  "use strict";
  const r = t(759), o = new Map;
  for (const e in r) {
    const code = r[e];
    o.set(code, e)
  }
  e.exports = Object.freeze(o)
}, function (e, n, t) {
  "use strict";
  const r = t(759), o = t(837).varintEncode, c = {};
  for (const e in r) {
    const code = r[e];
    c[e] = o(code)
  }
  e.exports = Object.freeze(c)
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(786), {TextDecoder: o} = t(711), c = new o("utf8");
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.decode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.encode(e)
  }
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(786), {TextEncoder: o} = t(711), c = new o;
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.encode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.decode(e)
  }
}, function (e, n, t) {
  "use strict";
  e.exports = function (e, n) {
    n || (n = e.reduce((e, n) => e + n.length, 0));
    const output = new Uint8Array(n);
    let t = 0;
    for (const n of e) output.set(n, t), t += n.length;
    return output
  }
}, function (e, n, t) {
  "use strict";
  const table = t(759), r = {};
  for (const [e, code] of Object.entries(table)) r[e.toUpperCase().replace(/-/g, "_")] = code;
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const table = t(759), r = {};
  for (const [e, code] of Object.entries(table)) void 0 === r[code] && (r[code] = e);
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const r = t(834), o = {
    checkCIDComponents: function (e) {
      if (null == e) return "null values are not valid CIDs";
      if (0 !== e.version && 1 !== e.version) return "Invalid version, must be a number equal to 1 or 0";
      if ("string" != typeof e.codec) return "codec must be string";
      if (0 === e.version) {
        if ("dag-pb" !== e.codec) return "codec must be 'dag-pb' for CIDv0";
        if ("base58btc" !== e.multibaseName) return "multibaseName must be 'base58btc' for CIDv0"
      }
      if (!(e.multihash instanceof Uint8Array)) return "multihash must be a Uint8Array";
      try {
        r.validate(e.multihash)
      } catch (e) {
        let n = e.message;
        return n || (n = "Multihash validation failed"), n
      }
    }
  };
  e.exports = o
}, function (e, n, t) {
  var r = t(1018), o = t(1020);
  e.exports = r, e.exports.parse = r, e.exports.stringify = o
}, function (e, n, t) {
  var r = t(1019),
    o = ["int32", "int64", "uint32", "uint64", "sint32", "sint64", "bool", "fixed64", "sfixed64", "double", "fixed32", "sfixed32", "float"],
    c = function (e) {
      for (var n = {}; e.length;) switch (e[0]) {
        case"[":
        case",":
          e.shift();
          var t = e.shift();
          if ("(" === t && (t = e.shift(), e.shift()), "=" !== e[0]) throw new Error("Unexpected token in field options: " + e[0]);
          if (e.shift(), "]" === e[0]) throw new Error("Unexpected ] in field option");
          n[t] = e.shift();
          break;
        case"]":
          return e.shift(), n;
        default:
          throw new Error("Unexpected token in field options: " + e[0])
      }
      throw new Error("No closing tag for field options")
    }, l = function (e) {
      for (var n = {
        name: null,
        type: null,
        tag: -1,
        map: null,
        oneof: null,
        required: !1,
        repeated: !1,
        options: {}
      }; e.length;) switch (e[0]) {
        case"=":
          e.shift(), n.tag = Number(e.shift());
          break;
        case"map":
          if (n.type = "map", n.map = {
            from: null,
            to: null
          }, e.shift(), "<" !== e[0]) throw new Error("Unexpected token in map type: " + e[0]);
          if (e.shift(), n.map.from = e.shift(), "," !== e[0]) throw new Error("Unexpected token in map type: " + e[0]);
          if (e.shift(), n.map.to = e.shift(), ">" !== e[0]) throw new Error("Unexpected token in map type: " + e[0]);
          e.shift(), n.name = e.shift();
          break;
        case"repeated":
        case"required":
        case"optional":
          var t = e.shift();
          n.required = "required" === t, n.repeated = "repeated" === t, n.type = e.shift(), n.name = e.shift();
          break;
        case"[":
          n.options = c(e);
          break;
        case";":
          if (null === n.name) throw new Error("Missing field name");
          if (null === n.type) throw new Error("Missing type in message field: " + n.name);
          if (-1 === n.tag) throw new Error("Missing tag number in message field: " + n.name);
          return e.shift(), n;
        default:
          throw new Error("Unexpected token in message field: " + e[0])
      }
      throw new Error("No ; found for message field")
    }, k = function (e) {
      for (var body = {
        enums: [],
        options: {},
        messages: [],
        fields: [],
        extends: [],
        extensions: null
      }; e.length;) switch (e[0]) {
        case"map":
        case"repeated":
        case"optional":
        case"required":
          body.fields.push(l(e));
          break;
        case"enum":
          body.enums.push(E(e));
          break;
        case"message":
          body.messages.push(d(e));
          break;
        case"extensions":
          body.extensions = f(e);
          break;
        case"oneof":
          e.shift();
          var n = e.shift();
          if ("{" !== e[0]) throw new Error("Unexpected token in oneof: " + e[0]);
          for (e.shift(); "}" !== e[0];) {
            e.unshift("optional");
            var t = l(e);
            t.oneof = n, body.fields.push(t)
          }
          e.shift();
          break;
        case"extend":
          body.extends.push(h(e));
          break;
        case";":
          e.shift();
          break;
        case"reserved":
          for (e.shift(); ";" !== e[0];) e.shift();
          break;
        case"option":
          var r = v(e);
          if (void 0 !== body.options[r.name]) throw new Error("Duplicate option " + r.name);
          body.options[r.name] = r.value;
          break;
        default:
          e.unshift("optional"), body.fields.push(l(e))
      }
      return body
    }, h = function (e) {
      return {name: e[1], message: d(e)}
    }, f = function (e) {
      e.shift();
      var n = Number(e.shift());
      if (isNaN(n)) throw new Error("Invalid from in extensions definition");
      if ("to" !== e.shift()) throw new Error("Expected keyword 'to' in extensions definition");
      var t = e.shift();
      if ("max" === t && (t = 536870911), t = Number(t), isNaN(t)) throw new Error("Invalid to in extensions definition");
      if (";" !== e.shift()) throw new Error("Missing ; in extensions definition");
      return {from: n, to: t}
    }, d = function (e) {
      e.shift();
      var n = 1, body = [], t = {name: e.shift(), options: {}, enums: [], extends: [], messages: [], fields: []};
      if ("{" !== e[0]) throw new Error("Expected { but found " + e[0]);
      for (e.shift(); e.length;) {
        if ("{" === e[0] ? n++ : "}" === e[0] && n--, !n) return e.shift(), body = k(body), t.enums = body.enums, t.messages = body.messages, t.fields = body.fields, t.extends = body.extends, t.extensions = body.extensions, t.options = body.options, t;
        body.push(e.shift())
      }
      if (n) throw new Error("No closing tag for message")
    }, m = function (e) {
      e.shift();
      var n = e.shift();
      if (";" !== e[0]) throw new Error("Expected ; but found " + e[0]);
      return e.shift(), n
    }, w = function (e) {
      if (e.shift(), "=" !== e[0]) throw new Error("Expected = but found " + e[0]);
      e.shift();
      var n = e.shift();
      switch (n) {
        case'"proto2"':
          n = 2;
          break;
        case'"proto3"':
          n = 3;
          break;
        default:
          throw new Error("Expected protobuf syntax version but found " + n)
      }
      if (";" !== e[0]) throw new Error("Expected ; but found " + e[0]);
      return e.shift(), n
    }, y = function (e) {
      if (e.length < 4) throw new Error("Invalid enum value: " + e.slice(0, 3).join(" "));
      if ("=" !== e[1]) throw new Error("Expected = but found " + e[1]);
      if (";" !== e[3] && "[" !== e[3]) throw new Error("Expected ; or [ but found " + e[1]);
      var n = e.shift();
      e.shift();
      var t = {value: null, options: {}};
      return t.value = Number(e.shift()), "[" === e[0] && (t.options = c(e)), e.shift(), {name: n, val: t}
    }, E = function (e) {
      e.shift();
      var n = {}, t = {name: e.shift(), values: {}, options: {}};
      if ("{" !== e[0]) throw new Error("Expected { but found " + e[0]);
      for (e.shift(); e.length;) {
        if ("}" === e[0]) return e.shift(), ";" === e[0] && e.shift(), t;
        if ("option" !== e[0]) {
          var r = y(e);
          t.values[r.name] = r.val
        } else n = v(e), t.options[n.name] = n.value
      }
      throw new Error("No closing tag for enum")
    }, v = function (e) {
      for (var n = null, t = null, r = function (e) {
        return "true" === e || "false" !== e && e.replace(/^"+|"+$/gm, "")
      }; e.length;) {
        if (";" === e[0]) return e.shift(), {name: n, value: t};
        switch (e[0]) {
          case"option":
            e.shift();
            var o = "(" === e[0];
            if (o && e.shift(), n = e.shift(), o) {
              if (")" !== e[0]) throw new Error("Expected ) but found " + e[0]);
              e.shift()
            }
            "." === e[0][0] && (n += e.shift());
            break;
          case"=":
            if (e.shift(), null === n) throw new Error("Expected key for option with value: " + e[0]);
            if (t = r(e.shift()), "optimize_for" === n && !/^(SPEED|CODE_SIZE|LITE_RUNTIME)$/.test(t)) throw new Error("Unexpected value for option optimize_for: " + t);
            "{" === t && (t = x(e));
            break;
          default:
            throw new Error("Unexpected token in option: " + e[0])
        }
      }
    }, x = function (e) {
      for (var n = function (e) {
        return "true" === e || "false" !== e && e.replace(/^"+|"+$/gm, "")
      }, map = {}; e.length;) {
        if ("}" === e[0]) return e.shift(), map;
        var t = "(" === e[0];
        t && e.shift();
        var r = e.shift();
        if (t) {
          if (")" !== e[0]) throw new Error("Expected ) but found " + e[0]);
          e.shift()
        }
        var o = null;
        switch (e[0]) {
          case":":
            if (void 0 !== map[r]) throw new Error("Duplicate option map key " + r);
            e.shift(), "{" === (o = n(e.shift())) && (o = x(e)), map[r] = o, ";" === e[0] && e.shift();
            break;
          case"{":
            if (e.shift(), o = x(e), void 0 === map[r] && (map[r] = []), !Array.isArray(map[r])) throw new Error("Duplicate option map key " + r);
            map[r].push(o);
            break;
          default:
            throw new Error("Unexpected token in option map: " + e[0])
        }
      }
      throw new Error("No closing tag for option map")
    }, S = function (e) {
      e.shift();
      var n = e.shift().replace(/^"+|"+$/gm, "");
      if (";" !== e[0]) throw new Error("Unexpected token: " + e[0] + '. Expected ";"');
      return e.shift(), n
    }, A = function (e) {
      e.shift();
      var n = {name: e.shift(), methods: [], options: {}};
      if ("{" !== e[0]) throw new Error("Expected { but found " + e[0]);
      for (e.shift(); e.length;) {
        if ("}" === e[0]) return e.shift(), ";" === e[0] && e.shift(), n;
        switch (e[0]) {
          case"option":
            var t = v(e);
            if (void 0 !== n.options[t.name]) throw new Error("Duplicate option " + t.name);
            n.options[t.name] = t.value;
            break;
          case"rpc":
            n.methods.push(_(e));
            break;
          default:
            throw new Error("Unexpected token in service: " + e[0])
        }
      }
      throw new Error("No closing tag for service")
    }, _ = function (e) {
      e.shift();
      var n = {
        name: e.shift(),
        input_type: null,
        output_type: null,
        client_streaming: !1,
        server_streaming: !1,
        options: {}
      };
      if ("(" !== e[0]) throw new Error("Expected ( but found " + e[0]);
      if (e.shift(), "stream" === e[0] && (e.shift(), n.client_streaming = !0), n.input_type = e.shift(), ")" !== e[0]) throw new Error("Expected ) but found " + e[0]);
      if (e.shift(), "returns" !== e[0]) throw new Error("Expected returns but found " + e[0]);
      if (e.shift(), "(" !== e[0]) throw new Error("Expected ( but found " + e[0]);
      if (e.shift(), "stream" === e[0] && (e.shift(), n.server_streaming = !0), n.output_type = e.shift(), ")" !== e[0]) throw new Error("Expected ) but found " + e[0]);
      if (e.shift(), ";" === e[0]) return e.shift(), n;
      if ("{" !== e[0]) throw new Error("Expected { but found " + e[0]);
      for (e.shift(); e.length;) {
        if ("}" === e[0]) return e.shift(), ";" === e[0] && e.shift(), n;
        if ("option" !== e[0]) throw new Error("Unexpected token in rpc options: " + e[0]);
        var t = v(e);
        if (void 0 !== n.options[t.name]) throw new Error("Duplicate option " + t.name);
        n.options[t.name] = t.value
      }
      throw new Error("No closing tag for rpc")
    };
  e.exports = function (e) {
    for (var n = r(e.toString()), i = 0; i < n.length; i++) {
      var t;
      if (/^("|')([^'"]*)$/.test(n[i])) for (t = 1 === n[i].length ? i + 1 : i; t < n.length; t++) if (/^[^'"\\]*(?:\\.[^'"\\]*)*("|')$/.test(n[t])) {
        n = n.slice(0, i).concat(n.slice(i, t + 1).join("")).concat(n.slice(t + 1));
        break
      }
    }
    for (var c = {
      syntax: 3,
      package: null,
      imports: [],
      enums: [],
      messages: [],
      options: {},
      extends: []
    }, l = !0; n.length;) {
      switch (n[0]) {
        case"package":
          c.package = m(n);
          break;
        case"syntax":
          if (!l) throw new Error("Protobuf syntax version should be first thing in file");
          c.syntax = w(n);
          break;
        case"message":
          c.messages.push(d(n));
          break;
        case"enum":
          c.enums.push(E(n));
          break;
        case"option":
          var k = v(n);
          if (c.options[k.name]) throw new Error("Duplicate option " + k.name);
          c.options[k.name] = k.value;
          break;
        case"import":
          c.imports.push(S(n));
          break;
        case"extend":
          c.extends.push(h(n));
          break;
        case"service":
          c.services || (c.services = []), c.services.push(A(n));
          break;
        default:
          throw new Error("Unexpected token: " + n[0])
      }
      l = !1
    }
    return c.extends.forEach((function (e) {
      c.messages.forEach((function (n) {
        n.name === e.name && e.message.fields.forEach((function (e) {
          if (!n.extensions || e.tag < n.extensions.from || e.tag > n.extensions.to) throw new Error(n.name + " does not declare " + e.tag + " as an extension number");
          n.fields.push(e)
        }))
      }))
    })), c.messages.forEach((function (e) {
      e.fields.forEach((function (n) {
        var t, r, l, k;
        if (n.options && "true" === n.options.packed && -1 === o.indexOf(n.type)) {
          if (-1 === n.type.indexOf(".")) {
            if (e.enums && e.enums.some((function (e) {
              return e.name === n.type
            }))) return
          } else {
            if ((t = n.type.split(".")).length > 2) throw new Error("what is this?");
            if (r = t[0], l = t[1], c.messages.some((function (e) {
              if (e.name === r) return k = e, e
            })), k && k.enums && k.enums.some((function (e) {
              return e.name === l
            }))) return
          }
          throw new Error("Fields of type " + n.type + ' cannot be declared [packed=true]. Only repeated fields of primitive numeric types (types which use the varint, 32-bit, or 64-bit wire types) can be declared "packed". See https://developers.google.com/protocol-buffers/docs/encoding#optional')
        }
      }))
    })), c
  }
}, function (e, n) {
  e.exports = function (e) {
    var n, t = function (line) {
      return line.trim()
    };
    return e.replace(/([;,{}()=:[\]<>]|\/\*|\*\/)/g, " $1 ").split(/\n/).map(t).filter(Boolean).map((function (line) {
      var i = line.indexOf("//");
      return i > -1 ? line.slice(0, i) : line
    })).map(t).filter(Boolean).join("\n").split(/\s+|\n+/gm).filter((n = !1, function (e) {
      return "/*" === e ? (n = !0, !1) : "*/" === e ? (n = !1, !1) : !n
    }))
  }
}, function (e, n) {
  var t = function (e, n) {
    var t = e.repeated ? "repeated" : e.required ? "required" : "optional";
    "map" === e.type && (t = "map<" + e.map.from + "," + e.map.to + ">"), e.oneof && (t = "");
    var r = Object.keys(e.options || {}).map((function (n) {
      return n + " = " + e.options[n]
    })).join(",");
    return r && (r = " [" + r + "]"), n.push((t ? t + " " : "") + ("map" === e.map ? "" : e.type + " ") + e.name + " = " + e.tag + r + ";"), n
  }, r = function (e, n) {
    n.push("message " + e.name + " {"), e.options || (e.options = {}), l(e.options, n), e.enums || (e.enums = []), e.enums.forEach((function (e) {
      n.push(o(e, []))
    })), e.messages || (e.messages = []), e.messages.forEach((function (e) {
      n.push(r(e, []))
    }));
    var c = {};
    return e.fields || (e.fields = []), e.fields.forEach((function (e) {
      e.oneof ? (c[e.oneof] || (c[e.oneof] = []), c[e.oneof].push(t(e, []))) : n.push(t(e, []))
    })), Object.keys(c).forEach((function (e) {
      c[e].unshift("oneof " + e + " {"), c[e].push("}"), n.push(c[e])
    })), n.push("}", ""), n
  }, o = function (e, n) {
    n.push("enum " + e.name + " {"), e.options || (e.options = {});
    var t = l(e.options, []);
    return t.length > 1 && n.push(t.slice(0, -1)), Object.keys(e.values).map((function (t) {
      var r = c(e.values[t]);
      n.push([t + " = " + r + ";"])
    })), n.push("}", ""), n
  }, c = function (e, n) {
    var t = Object.keys(e.options || {}).map((function (n) {
      return n + " = " + e.options[n]
    })).join(",");
    return t && (t = " [" + t + "]"), e.value + t
  }, l = function (e, n) {
    var t = Object.keys(e);
    return t.forEach((function (option) {
      var t = e[option];
      ~option.indexOf(".") && (option = "(" + option + ")");
      var r = typeof t;
      "object" === r ? (t = k(t, [])).length && n.push("option " + option + " = {", t, "};") : ("string" === r && "optimize_for" !== option && (t = '"' + t + '"'), n.push("option " + option + " = " + t + ";"))
    })), t.length > 0 && n.push(""), n
  }, k = function (e, n) {
    return Object.keys(e).forEach((function (t) {
      var r = e[t], o = typeof r;
      "object" === o ? Array.isArray(r) ? r.forEach((function (e) {
        (e = k(e, [])).length && n.push(t + " {", e, "}")
      })) : (r = k(r, [])).length && n.push(t + " {", r, "}") : ("string" === o && (r = '"' + r + '"'), n.push(t + ": " + r))
    })), n
  }, h = function (e, n) {
    var t = "rpc " + e.name + "(";
    e.client_streaming && (t += "stream "), t += e.input_type + ") returns (", e.server_streaming && (t += "stream "), t += e.output_type + ")", e.options || (e.options = {});
    var r = l(e.options, []);
    return r.length > 1 ? n.push(t + " {", r.slice(0, -1), "}") : n.push(t + ";"), n
  }, f = function (e) {
    return function (line) {
      return Array.isArray(line) ? line.map(f(e + "  ")).join("\n") : e + line
    }
  };
  e.exports = function (e) {
    var n = [];
    return n.push('syntax = "proto' + e.syntax + '";', ""), e.package && n.push("package " + e.package + ";", ""), e.options || (e.options = {}), l(e.options, n), e.enums || (e.enums = []), e.enums.forEach((function (e) {
      o(e, n)
    })), e.messages || (e.messages = []), e.messages.forEach((function (e) {
      r(e, n)
    })), e.services && e.services.forEach((function (s) {
      !function (s, e) {
        e.push("service " + s.name + " {"), s.options || (s.options = {}), l(s.options, e), s.methods || (s.methods = []), s.methods.forEach((function (n) {
          e.push(h(n, []))
        })), e.push("}", "")
      }(s, n)
    })), n.map(f("")).join("\n")
  }
}, function (e, n, t) {
  "use strict";
  const r = t(1022), o = t(1036), c = t(1037), l = t(1038), k = t(78);
  e.exports = function (e, n) {
    const t = {}, h = {}, f = {}, d = function (e, n) {
      e.enums && e.enums.forEach((function (e) {
        e.id = n + (n ? "." : "") + e.name, h[e.id] = e, d(e, e.id)
      })), e.messages && e.messages.forEach((function (r) {
        r.id = n + (n ? "." : "") + r.name, t[r.id] = r, r.fields.forEach((function (r) {
          if (!r.map) return;
          const o = "Map_" + r.map.from + "_" + r.map.to, map = {
            name: o,
            enums: [],
            messages: [],
            fields: [{name: "key", type: r.map.from, tag: 1, repeated: !1, required: !0}, {
              name: "value",
              type: r.map.to,
              tag: 2,
              repeated: !1,
              required: !1
            }],
            extensions: null,
            id: n + (n ? "." : "") + o
          };
          t[map.id] || (t[map.id] = map, e.messages.push(map)), r.type = o, r.repeated = !0
        })), d(r, r.id)
      }))
    };
    d(e, "");
    const m = function (e, n) {
      e.messages.forEach((function (t) {
        n[t.name] = w(t.name, e.id)
      })), e.enums.forEach((function (e) {
        n[e.name] = function (e) {
          if (!e) return null;
          const n = {};
          return Object.keys(e).forEach((function (t) {
            n[t] = e[t].value
          })), n
        }(e.values)
      })), n.type = 2, n.message = !0, n.name = e.name;
      const t = {};
      e.fields.forEach((function (e) {
        e.oneof && (t[e.oneof] || (t[e.oneof] = []), t[e.oneof].push(e.name))
      }));
      const r = e.fields.map((function (n) {
        return w(n.type, e.id)
      })), k = l(e, r, t), h = c(e, w, r, t, k), f = o(e, w, r);
      return h.bytes = f.bytes = 0, n.buffer = !0, n.encode = h, n.decode = f, n.encodingLength = k, n
    }, w = function (e, o, c) {
      if (n && n[e]) return n[e];
      if (r[e]) return r[e];
      const l = (o ? o + "." + e : e).split(".").map((function (n, i, t) {
        return t.slice(0, i).concat(e).join(".")
      })).reverse().reduce((function (e, n) {
        return e || t[n] || h[n]
      }), null);
      if (!1 === c) return l;
      if (!l) throw new Error("Could not resolve " + e);
      if (l.values) return function (e) {
        const n = Object.keys(e.values || []).map((function (n) {
          return parseInt(e.values[n].value, 10)
        }));
        return r.make(0, (function e(t, r, view, o) {
          if (!n.length || -1 === n.indexOf(t)) throw new Error("Invalid enum value: " + t);
          return k.encode(t, r, o), e.bytes = k.encode.bytes, r
        }), (function e(t, view, r) {
          var o = k.decode(t, r);
          if (!n.length || -1 === n.indexOf(o)) throw new Error("Invalid enum value: " + o);
          return e.bytes = k.decode.bytes, o
        }), k.encodingLength)
      }(l);
      return f[l.id] || m(l, f[l.id] = {})
    };
    return (e.enums || []).concat((e.messages || []).map((function (e) {
      return w(e.id)
    })))
  }
}, function (e, n, t) {
  "use strict";
  n.make = t(726), n.bytes = t(1023), n.string = t(1024), n.bool = t(1025), n.int32 = t(1026), n.int64 = t(1027), n.sint32 = n.sint64 = t(1028), n.uint32 = n.uint64 = n.enum = n.varint = t(1030), n.fixed64 = n.sfixed64 = t(1031), n.double = t(1032), n.fixed32 = t(1033), n.sfixed32 = t(1034), n.float = t(1035)
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(726);

  function c(e) {
    return e.byteLength
  }

  e.exports = o(2, (function e(n, t, o, l) {
    const k = l, h = c(n);
    r.encode(h, t, l), l += r.encode.bytes, t.set(n, l), e.bytes = (l += h) - k
  }), (function e(n, t, o) {
    const c = o, l = r.decode(n, o);
    o += r.decode.bytes;
    const k = n.slice(o, o + l);
    return o += k.length, e.bytes = o - c, k
  }), (function (e) {
    const n = c(e);
    return r.encodingLength(n) + n
  }))
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(717), c = t(712), l = t(726);
  e.exports = l(2, (function e(n, t, c, l) {
    const k = l, h = o(n).byteLength;
    r.encode(h, t, l, "utf-8"), l += r.encode.bytes;
    const f = o(n);
    t.set(f, l), l += f.length, e.bytes = l - k
  }), (function e(n, t, o) {
    const l = o, k = r.decode(n, o);
    o += r.decode.bytes;
    const h = c(n.subarray(o, o + k));
    return e.bytes = (o += k) - l, h
  }), (function (e) {
    const n = o(e).byteLength;
    return r.encodingLength(n) + n
  }))
}, function (e, n, t) {
  "use strict";
  const r = t(726);
  e.exports = r(0, (function e(n, t, r, o) {
    t[o] = n ? 1 : 0, e.bytes = 1
  }), (function e(n, t, r) {
    const o = n[r] > 0;
    return e.bytes = 1, o
  }), (function () {
    return 1
  }))
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(726);
  e.exports = o(0, (function e(n, t, o, c) {
    r.encode(n < 0 ? n + 4294967296 : n, t, c), e.bytes = r.encode.bytes
  }), (function e(n, t, o) {
    const c = r.decode(n, o);
    return e.bytes = r.decode.bytes, c > 2147483647 ? c - 4294967296 : c
  }), (function (e) {
    return r.encodingLength(e < 0 ? e + 4294967296 : e)
  }))
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(726);
  e.exports = o(0, (function e(n, t, o, c) {
    if (n < 0) {
      const o = c + 9;
      for (r.encode(-1 * n, t, c), t[c += r.encode.bytes - 1] = 128 | t[c]; c < o - 1;) t[++c] = 255;
      t[o] = 1, e.bytes = 10
    } else r.encode(n, t, c), e.bytes = r.encode.bytes
  }), (function e(n, t, o) {
    let c = r.decode(n, o);
    if (c >= Math.pow(2, 63)) {
      let t = 9;
      for (; 255 === n[o + t - 1];) t--;
      t = t || 9;
      const l = n.subarray(o, o + t);
      l[t - 1] = 127 & l[t - 1], c = -1 * r.decode(l, 0), e.bytes = 10
    } else e.bytes = r.decode.bytes;
    return c
  }), (function (e) {
    return e < 0 ? 10 : r.encodingLength(e)
  }))
}, function (e, n, t) {
  "use strict";
  const r = t(1029), o = t(726);
  e.exports = o(0, (function e(n, t, o, c) {
    r.encode(n, t, c), e.bytes = r.encode.bytes
  }), (function e(n, t, o) {
    const c = r.decode(n, o);
    return e.bytes = r.decode.bytes, c
  }), r.encodingLength)
}, function (e, n, t) {
  var r = t(78);
  n.encode = function e(n, b, t) {
    n = n >= 0 ? 2 * n : -2 * n - 1;
    var o = r.encode(n, b, t);
    return e.bytes = r.encode.bytes, o
  }, n.decode = function e(b, n) {
    var t = r.decode(b, n);
    return e.bytes = r.decode.bytes, 1 & t ? (t + 1) / -2 : t / 2
  }, n.encodingLength = function (e) {
    return r.encodingLength(e >= 0 ? 2 * e : -2 * e - 1)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(726);
  e.exports = o(0, (function e(n, t, o, c) {
    r.encode(n, t, c), e.bytes = r.encode.bytes
  }), (function e(n, t, o) {
    const c = r.decode(n, o);
    return e.bytes = r.decode.bytes, c
  }), r.encodingLength)
}, function (e, n, t) {
  "use strict";
  const r = t(726);
  e.exports = r(1, (function e(n, t, r, o) {
    for (const e of n) t[o] = e, o++;
    e.bytes = 8
  }), (function e(n, t, r) {
    const o = n.slice(r, r + 8);
    return e.bytes = 8, o
  }), (function () {
    return 8
  }))
}, function (e, n, t) {
  "use strict";
  const r = t(726);
  e.exports = r(1, (function e(n, t, r, o) {
    r.setFloat64(o, n, !0), e.bytes = 8
  }), (function e(n, t, r) {
    const o = t.getFloat64(r, !0);
    return e.bytes = 8, o
  }), (function () {
    return 8
  }))
}, function (e, n, t) {
  "use strict";
  const r = t(726);
  e.exports = r(5, (function e(n, t, r, o) {
    r.setUint32(o, n, !0), e.bytes = 4
  }), (function e(n, t, r) {
    const o = t.getUint32(r, !0);
    return e.bytes = 4, o
  }), (function (e) {
    return 4
  }))
}, function (e, n, t) {
  "use strict";
  const r = t(726);
  e.exports = r(5, (function e(n, t, r, o) {
    r.setInt32(o, n, !0), e.bytes = 4
  }), (function e(n, t, r) {
    const o = t.getInt32(r, !0);
    return e.bytes = 4, o
  }), (function (e) {
    return 4
  }))
}, function (e, n, t) {
  "use strict";
  const r = t(726);
  e.exports = r(5, (function e(n, t, r, o) {
    r.setFloat32(o, n, !0), e.bytes = 4
  }), (function e(n, t, r) {
    const o = t.getFloat32(r, !0);
    return e.bytes = 4, o
  }), (function () {
    return 4
  }))
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(788).defined;

  function c(e) {
    return `${e.substring(0, 1).toUpperCase()}${e.substring(1)}`
  }

  function l(e, n, t, r) {
    if (Object.prototype.hasOwnProperty.call(e, n)) return;
    const o = c(n);
    Object.defineProperties(e, {
      [n]: {
        enumerable: !0, configurable: !0, set: e => {
          t = e
        }, get: () => void 0 === t ? r : t
      }, ["has" + o]: {configurable: !0, value: () => void 0 !== t}, ["set" + o]: {
        configurable: !0, value: e => {
          t = e
        }
      }, ["get" + o]: {configurable: !0, value: () => t}, ["clear" + o]: {
        configurable: !0, value: () => {
          t = void 0, e[n] = void 0
        }
      }
    })
  }

  var k = function (e, n, view, t) {
    switch (e) {
      case 0:
        return r.decode(n, t), t + r.decode.bytes;
      case 1:
        return t + 8;
      case 2:
        var o = r.decode(n, t);
        return t + r.decode.bytes + o;
      case 3:
      case 4:
        throw new Error("Groups are not supported");
      case 5:
        return t + 4;
      default:
        throw new Error("Unknown wire type: " + e)
    }
  }, h = function (e) {
    if (e.map) return {};
    if (e.repeated) return [];
    switch (e.type) {
      case"string":
        return "";
      case"bool":
        return !1;
      case"float":
      case"double":
      case"sfixed32":
      case"fixed32":
      case"varint":
      case"enum":
      case"uint64":
      case"uint32":
      case"int64":
      case"int32":
      case"sint64":
      case"sint32":
        return 0;
      default:
        return null
    }
  }, f = function (e, n) {
    if (void 0 === n) return n;
    switch (e.type) {
      case"bool":
        return "true" === n;
      case"float":
      case"double":
      case"sfixed32":
      case"fixed32":
      case"varint":
      case"enum":
      case"uint64":
      case"uint32":
      case"int64":
      case"int32":
      case"sint64":
      case"sint32":
        return parseInt(n, 10);
      default:
        return n
    }
  };
  e.exports = function (e, n, t) {
    const d = [], m = {}, w = [], y = [];
    for (var i = 0; i < t.length; i++) {
      const t = e.fields[i];
      m[t.tag] = i;
      const r = t.options && t.options.default, o = n(t.type, e.id, !1);
      y[i] = [r, o && o.values], e.fields[i].packed = t.repeated && t.options && t.options.packed && "false" !== t.options.packed, t.required && d.push(t.name), t.oneof && w.push(t.name)
    }

    function E(e, n, t, o, k, h, i) {
      const f = n.name;
      if (n.oneof) {
        const e = Object.keys(t);
        for (var d = 0; d < e.length; d++) if (w.indexOf(e[d]) > -1) {
          const n = c(e[d]);
          delete t["has" + n], delete t["get" + n], delete t["set" + n], delete t["clear" + n], delete t[e[d]]
        }
      }
      let m;
      if (e.message) {
        const c = r.decode(o, h);
        h += r.decode.bytes;
        const l = e.decode(o, k, h, h + c);
        n.map ? (m = t[f] || {}, m[l.key] = l.value) : n.repeated ? (m = t[f] || [], m.push(l)) : m = l
      } else n.repeated ? (m = t[f] || [], m.push(e.decode(o, k, h))) : m = e.decode(o, k, h);
      return l(t, f, m), h += e.decode.bytes
    }

    return function n(c, view, v, x) {
      if (null == v && (v = 0), null == x && (x = c.length), !(x <= c.length && v <= c.length)) throw new Error("Decoded message is not valid");
      view || (view = new DataView(c.buffer, c.byteOffset, c.byteLength));
      for (var S, A = v, _ = {}; ;) {
        if (x <= v) {
          var N, I, C = "", O = 0;
          for (O = 0; O < d.length; O++) if (C = d[O], !o(_[C])) throw new Error("Decoded message is not valid, missing required field: " + C);
          for (O = 0; O < t.length; O++) {
            let n;
            if (S = e.fields[O], I = y[O][0], N = y[O][1], C = S.name, !Object.prototype.hasOwnProperty.call(_, C)) {
              var U = !1;
              if (S.oneof) for (var T = Object.keys(_), P = 0; P < T.length; P++) if (w.indexOf(T[P]) > -1) {
                U = !0;
                break
              }
              U || (N ? S.repeated ? I = [] : (I = I && N[I] ? N[I].value : N[Object.keys(N)[0]].value, I = parseInt(I || 0, 10)) : (n = h(S), I = f(S, I)), l(_, C, I, n))
            }
          }
          return n.bytes = v - A, _
        }
        var D = r.decode(c, v);
        v += r.decode.bytes;
        var i = m[D >> 3];
        if (null != i) {
          var L = t[i];
          if ((S = e.fields[i]).packed) {
            var j = r.decode(c, v);
            for (j += v += r.decode.bytes; v < j;) v = E(L, S, _, c, view, v)
          } else v = E(L, S, _, c, view, v)
        } else v = k(7 & D, c, view, v)
      }
    }
  }
}, function (e, n, t) {
  "use strict";
  var r = t(788).defined, o = t(78);
  e.exports = function (e, n, t, c, l) {
    const k = Object.keys(c), h = t.length, f = {};
    for (let i = 0; i < h; i++) {
      f[i] = {p: o.encode(e.fields[i].tag << 3 | 2), h: o.encode(e.fields[i].tag << 3 | t[i].type)};
      const n = e.fields[i];
      e.fields[i].packed = n.repeated && n.options && n.options.packed && "false" !== n.options.packed
    }

    function d(e, view, n, t, r, c, l) {
      let k = 0;
      if (!c) for (k = 0; k < t.length; k++) e[n++] = t[k];
      return r.message && (o.encode(r.encodingLength(l), e, n), n += o.encode.bytes), r.encode(l, e, view, n), n + r.encode.bytes
    }

    return function n(m, w, view, y = 0) {
      null == w && (w = new Uint8Array(l(m))), null == view && (view = new DataView(w.buffer, w.byteOffset, w.byteLength));
      const E = y, v = Object.keys(m);
      let i = 0, x = !1;
      for (i = 0; i < k.length; i++) {
        const e = k[i], n = c[i];
        if (v.indexOf(n) > -1) {
          if (x) throw new Error("only one of the properties defined in oneof " + e + " can be set");
          x = !0
        }
      }
      for (i = 0; i < h; i++) {
        const n = t[i], c = e.fields[i];
        let l = m[c.name], k = 0;
        if (!r(l)) {
          if (c.required) throw new Error(c.name + " is required");
          continue
        }
        const p = f[i].p, h = f[i].h, E = c.packed;
        if (c.map) {
          const e = Object.keys(l);
          for (k = 0; k < e.length; k++) e[k] = {key: e[k], value: l[e[k]]};
          l = e
        }
        if (E) {
          let e = 0;
          for (k = 0; k < l.length; k++) Object.prototype.hasOwnProperty.call(l, k) && (e += n.encodingLength(l[k]));
          if (e) {
            for (k = 0; k < h.length; k++) w[y++] = p[k];
            o.encode(e, w, y), y += o.encode.bytes
          }
        }
        if (c.repeated) {
          let e;
          for (k = 0; k < l.length; k++) e = l[k], r(e) && (y = d(w, view, y, h, n, E, e))
        } else y = d(w, view, y, h, n, E, l)
      }
      return n.bytes = y - E, w
    }
  }
}, function (e, n, t) {
  "use strict";
  var r = t(788).defined, o = t(78);
  e.exports = function (e, n, t) {
    const c = Object.keys(t), l = n.length, k = new Array(l);
    for (let i = 0; i < e.fields.length; i++) {
      k[i] = o.encodingLength(e.fields[i].tag << 3 | n[i].type);
      const t = e.fields[i];
      e.fields[i].packed = t.repeated && t.options && t.options.packed && "false" !== t.options.packed
    }
    return function (h) {
      let f = 0, i = 0, d = 0;
      for (i = 0; i < c.length; i++) {
        const e = c[i], n = t[e];
        let o = !1;
        for (d = 0; d < n.length; d++) if (r(h[n[d]])) {
          if (o) throw new Error("only one of the properties defined in oneof " + e + " can be set");
          o = !0
        }
      }
      for (i = 0; i < l; i++) {
        const t = n[i], c = e.fields[i];
        let l = h[c.name];
        const m = k[i];
        let w;
        if (r(l)) {
          if (c.map) {
            const e = Object.keys(l);
            for (d = 0; d < e.length; d++) e[d] = {key: e[d], value: l[e[d]]};
            l = e
          }
          if (c.packed) {
            let e = 0;
            for (d = 0; d < l.length; d++) r(l[d]) && (w = t.encodingLength(l[d]), e += w, t.message && (e += o.encodingLength(w)));
            e && (f += m + e + o.encodingLength(e))
          } else if (c.repeated) for (d = 0; d < l.length; d++) r(l[d]) && (w = t.encodingLength(l[d]), f += m + w + (t.message ? o.encodingLength(w) : 0)); else w = t.encodingLength(l), f += m + w + (t.message ? o.encodingLength(w) : 0)
        } else if (c.required) throw new Error(c.name + " is required")
      }
      return f
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(747), o = t(841);
  e.exports = async (e, n = {}) => {
    const t = await o.cid(e.serialize(), n);
    return new r(n.name || "", e.size, t)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(1041), {encodeText: o, decodeText: c, concat: l} = t(790);

  function k(e) {
    if (r.names[e]) return r.names[e];
    if (r.codes[e]) return r.codes[e];
    throw new Error("Unsupported encoding: " + e)
  }

  (n = e.exports = function (e, n) {
    if (!n) throw new Error("requires an encoded Uint8Array");
    const {name: t, codeBuf: r} = k(e);
    return function (e, n) {
      k(e).decode(c(n))
    }(t, n), l([r, n], r.length + n.length)
  }).encode = function (e, n) {
    const t = k(e), data = o(t.encode(n));
    return l([t.codeBuf, data], t.codeBuf.length + data.length)
  }, n.decode = function (data) {
    data instanceof Uint8Array && (data = c(data));
    const e = data[0];
    return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(e) && (data = data.toLowerCase()), k(data[0]).decode(data.substring(1))
  }, n.isEncoded = function (data) {
    if (data instanceof Uint8Array && (data = c(data)), "[object String]" !== Object.prototype.toString.call(data)) return !1;
    try {
      return k(data[0]).name
    } catch (e) {
      return !1
    }
  }, n.encoding = k, n.encodingFromData = function (data) {
    return data instanceof Uint8Array && (data = c(data)), k(data[0])
  }, n.names = Object.freeze(r.names), n.codes = Object.freeze(r.codes)
}, function (e, n, t) {
  "use strict";
  const r = t(738), o = t(1042), {rfc4648: c} = t(1043), {decodeText: l, encodeText: k} = t(790),
    h = [["identity", "\0", () => ({
      encode: l,
      decode: k
    }), ""], ["base2", "0", c(1), "01"], ["base8", "7", c(3), "01234567"], ["base10", "9", r, "0123456789"], ["base16", "f", c(4), "0123456789abcdef"], ["base16upper", "F", c(4), "0123456789ABCDEF"], ["base32hex", "v", c(5), "0123456789abcdefghijklmnopqrstuv"], ["base32hexupper", "V", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"], ["base32hexpad", "t", c(5), "0123456789abcdefghijklmnopqrstuv="], ["base32hexpadupper", "T", c(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="], ["base32", "b", c(5), "abcdefghijklmnopqrstuvwxyz234567"], ["base32upper", "B", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"], ["base32pad", "c", c(5), "abcdefghijklmnopqrstuvwxyz234567="], ["base32padupper", "C", c(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="], ["base32z", "h", c(5), "ybndrfg8ejkmcpqxot1uwisza345h769"], ["base36", "k", r, "0123456789abcdefghijklmnopqrstuvwxyz"], ["base36upper", "K", r, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"], ["base58btc", "z", r, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"], ["base58flickr", "Z", r, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"], ["base64", "m", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"], ["base64pad", "M", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], ["base64url", "u", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"], ["base64urlpad", "U", c(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]],
    f = h.reduce((e, n) => (e[n[0]] = new o(n[0], n[1], n[2], n[3]), e), {}),
    d = h.reduce((e, n) => (e[n[1]] = f[n[0]], e), {});
  e.exports = {names: f, codes: d}
}, function (e, n, t) {
  "use strict";
  const {encodeText: r} = t(790);
  e.exports = class {
    constructor(e, code, n, t) {
      this.name = e, this.code = code, this.codeBuf = r(this.code), this.alphabet = t, this.codec = n(t)
    }

    encode(e) {
      return this.codec.encode(e)
    }

    decode(e) {
      for (const n of e) if (this.alphabet && this.alphabet.indexOf(n) < 0) throw new Error(`invalid character '${n}' in '${e}'`);
      return this.codec.decode(e)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    rfc4648: e => n => ({
      encode: input => ((data, e, n) => {
        const t = "=" === e[e.length - 1], mask = (1 << n) - 1;
        let r = "", o = 0, c = 0;
        for (let i = 0; i < data.length; ++i) for (c = c << 8 | data[i], o += 8; o > n;) o -= n, r += e[mask & c >> o];
        if (o && (r += e[mask & c << n - o]), t) for (; r.length * n & 7;) r += "=";
        return r
      })(input, n, e), decode: input => ((e, n, t) => {
        const r = {};
        for (let i = 0; i < n.length; ++i) r[n[i]] = i;
        let o = e.length;
        for (; "=" === e[o - 1];) --o;
        const c = new Uint8Array(o * t / 8 | 0);
        let l = 0, k = 0, h = 0;
        for (let i = 0; i < o; ++i) {
          const n = r[e[i]];
          if (void 0 === n) throw new SyntaxError("Invalid character " + e[i]);
          k = k << t | n, l += t, l >= 8 && (l -= 8, c[h++] = 255 & k >> l)
        }
        if (l >= t || 255 & k << 8 - l) throw new SyntaxError("Unexpected end of data");
        return c
      })(input, n, e)
    })
  }
}, function (e, n, t) {
  e.exports = {encode: t(1045), decode: t(1046), encodingLength: t(1047)}
}, function (e, n) {
  e.exports = function e(n, r, o) {
    if (Number.MAX_SAFE_INTEGER && n > Number.MAX_SAFE_INTEGER) throw e.bytes = 0, new RangeError("Could not encode varint");
    r = r || [];
    var c = o = o || 0;
    for (; n >= t;) r[o++] = 255 & n | 128, n /= 128;
    for (; -128 & n;) r[o++] = 255 & n | 128, n >>>= 7;
    return r[o] = 0 | n, e.bytes = o - c + 1, r
  };
  var t = Math.pow(2, 31)
}, function (e, n) {
  e.exports = function e(n, t) {
    var b, r = 0, o = 0, c = t = t || 0, l = n.length;
    do {
      if (c >= l || o > 49) throw e.bytes = 0, new RangeError("Could not decode varint");
      b = n[c++], r += o < 28 ? (127 & b) << o : (127 & b) * Math.pow(2, o), o += 7
    } while (b >= 128);
    return e.bytes = c - t, r
  }
}, function (e, n) {
  var t = Math.pow(2, 7), r = Math.pow(2, 14), o = Math.pow(2, 21), c = Math.pow(2, 28), l = Math.pow(2, 35),
    k = Math.pow(2, 42), h = Math.pow(2, 49), f = Math.pow(2, 56), d = Math.pow(2, 63);
  e.exports = function (e) {
    return e < t ? 1 : e < r ? 2 : e < o ? 3 : e < c ? 4 : e < l ? 5 : e < k ? 6 : e < h ? 7 : e < f ? 8 : e < d ? 9 : 10
  }
}, function (e, n, t) {
  "use strict";
  const r = Object.freeze({
    identity: 0,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    "murmur3-128": 34,
    "murmur3-32": 35,
    "dbl-sha2-256": 86,
    md4: 212,
    md5: 213,
    bmt: 214,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082
  });
  e.exports = {names: r}
}, function (e, n, t) {
  "use strict";
  const r = t(351), o = t(1050), {factory: c} = t(1052), {fromNumberTo32BitBuf: l} = t(1053), k = t(717),
    h = e => async data => {
      switch (e) {
        case"sha3-224":
          return new Uint8Array(r.sha3_224.arrayBuffer(data));
        case"sha3-256":
          return new Uint8Array(r.sha3_256.arrayBuffer(data));
        case"sha3-384":
          return new Uint8Array(r.sha3_384.arrayBuffer(data));
        case"sha3-512":
          return new Uint8Array(r.sha3_512.arrayBuffer(data));
        case"shake-128":
          return new Uint8Array(r.shake128.create(128).update(data).arrayBuffer());
        case"shake-256":
          return new Uint8Array(r.shake256.create(256).update(data).arrayBuffer());
        case"keccak-224":
          return new Uint8Array(r.keccak224.arrayBuffer(data));
        case"keccak-256":
          return new Uint8Array(r.keccak256.arrayBuffer(data));
        case"keccak-384":
          return new Uint8Array(r.keccak384.arrayBuffer(data));
        case"keccak-512":
          return new Uint8Array(r.keccak512.arrayBuffer(data));
        case"murmur3-128":
          return k(o.x64.hash128(data), "base16");
        case"murmur3-32":
          return l(o.x86.hash32(data));
        default:
          throw new TypeError(e + " is not a supported algorithm")
      }
    };
  e.exports = {
    identity: data => data,
    sha1: c("sha1"),
    sha2256: c("sha2-256"),
    sha2512: c("sha2-512"),
    dblSha2256: c("dbl-sha2-256"),
    sha3224: h("sha3-224"),
    sha3256: h("sha3-256"),
    sha3384: h("sha3-384"),
    sha3512: h("sha3-512"),
    shake128: h("shake-128"),
    shake256: h("shake-256"),
    keccak224: h("keccak-224"),
    keccak256: h("keccak-256"),
    keccak384: h("keccak-384"),
    keccak512: h("keccak-512"),
    murmur3128: h("murmur3-128"),
    murmur332: h("murmur3-32"),
    addBlake: t(1054)
  }
}, function (e, n, t) {
  e.exports = t(1051)
}, function (e, n, t) {
  !function (t, r) {
    "use strict";
    var o = {version: "3.0.0", x86: {}, x64: {}, inputValidation: !0};

    function c(e) {
      if (!Array.isArray(e) && !ArrayBuffer.isView(e)) return !1;
      for (var i = 0; i < e.length; i++) if (!Number.isInteger(e[i]) || e[i] < 0 || e[i] > 255) return !1;
      return !0
    }

    function l(e, n) {
      return (65535 & e) * n + (((e >>> 16) * n & 65535) << 16)
    }

    function k(e, n) {
      return e << n | e >>> 32 - n
    }

    function h(e) {
      return e = l(e ^= e >>> 16, 2246822507), e = l(e ^= e >>> 13, 3266489909), e ^= e >>> 16
    }

    function f(e, n) {
      e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], n = [n[0] >>> 16, 65535 & n[0], n[1] >>> 16, 65535 & n[1]];
      var t = [0, 0, 0, 0];
      return t[3] += e[3] + n[3], t[2] += t[3] >>> 16, t[3] &= 65535, t[2] += e[2] + n[2], t[1] += t[2] >>> 16, t[2] &= 65535, t[1] += e[1] + n[1], t[0] += t[1] >>> 16, t[1] &= 65535, t[0] += e[0] + n[0], t[0] &= 65535, [t[0] << 16 | t[1], t[2] << 16 | t[3]]
    }

    function d(e, n) {
      e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], n = [n[0] >>> 16, 65535 & n[0], n[1] >>> 16, 65535 & n[1]];
      var t = [0, 0, 0, 0];
      return t[3] += e[3] * n[3], t[2] += t[3] >>> 16, t[3] &= 65535, t[2] += e[2] * n[3], t[1] += t[2] >>> 16, t[2] &= 65535, t[2] += e[3] * n[2], t[1] += t[2] >>> 16, t[2] &= 65535, t[1] += e[1] * n[3], t[0] += t[1] >>> 16, t[1] &= 65535, t[1] += e[2] * n[2], t[0] += t[1] >>> 16, t[1] &= 65535, t[1] += e[3] * n[1], t[0] += t[1] >>> 16, t[1] &= 65535, t[0] += e[0] * n[3] + e[1] * n[2] + e[2] * n[1] + e[3] * n[0], t[0] &= 65535, [t[0] << 16 | t[1], t[2] << 16 | t[3]]
    }

    function m(e, n) {
      return 32 === (n %= 64) ? [e[1], e[0]] : n < 32 ? [e[0] << n | e[1] >>> 32 - n, e[1] << n | e[0] >>> 32 - n] : (n -= 32, [e[1] << n | e[0] >>> 32 - n, e[0] << n | e[1] >>> 32 - n])
    }

    function w(e, n) {
      return 0 === (n %= 64) ? e : n < 32 ? [e[0] << n | e[1] >>> 32 - n, e[1] << n] : [e[1] << n - 32, 0]
    }

    function y(e, n) {
      return [e[0] ^ n[0], e[1] ^ n[1]]
    }

    function E(e) {
      return e = y(e, [0, e[0] >>> 1]), e = y(e = d(e, [4283543511, 3981806797]), [0, e[0] >>> 1]), e = y(e = d(e, [3301882366, 444984403]), [0, e[0] >>> 1])
    }

    o.x86.hash32 = function (e, n) {
      if (!o.inputValidation || c(e)) {
        n = n || 0;
        for (var t = e.length % 4, r = e.length - t, h1 = n, f = 0, d = 3432918353, m = 461845907, i = 0; i < r; i += 4) f = l(f = e[i] | e[i + 1] << 8 | e[i + 2] << 16 | e[i + 3] << 24, d), f = l(f = k(f, 15), m), h1 = l(h1 = k(h1 ^= f, 13), 5) + 3864292196;
        switch (f = 0, t) {
          case 3:
            f ^= e[i + 2] << 16;
          case 2:
            f ^= e[i + 1] << 8;
          case 1:
            f = l(f ^= e[i], d), h1 ^= f = l(f = k(f, 15), m)
        }
        return (h1 = h(h1 ^= e.length)) >>> 0
      }
    }, o.x86.hash128 = function (e, n) {
      if (!o.inputValidation || c(e)) {
        n = n || 0;
        for (var t = e.length % 16, r = e.length - t, h1 = n, h2 = n, h3 = n, h4 = n, f = 0, d = 0, m = 0, w = 0, y = 597399067, E = 2869860233, v = 951274213, x = 2716044179, i = 0; i < r; i += 16) f = e[i] | e[i + 1] << 8 | e[i + 2] << 16 | e[i + 3] << 24, d = e[i + 4] | e[i + 5] << 8 | e[i + 6] << 16 | e[i + 7] << 24, m = e[i + 8] | e[i + 9] << 8 | e[i + 10] << 16 | e[i + 11] << 24, w = e[i + 12] | e[i + 13] << 8 | e[i + 14] << 16 | e[i + 15] << 24, f = k(f = l(f, y), 15), h1 = k(h1 ^= f = l(f, E), 19), h1 = l(h1 += h2, 5) + 1444728091, d = k(d = l(d, E), 16), h2 = k(h2 ^= d = l(d, v), 17), h2 = l(h2 += h3, 5) + 197830471, m = k(m = l(m, v), 17), h3 = k(h3 ^= m = l(m, x), 15), h3 = l(h3 += h4, 5) + 2530024501, w = k(w = l(w, x), 18), h4 = k(h4 ^= w = l(w, y), 13), h4 = l(h4 += h1, 5) + 850148119;
        switch (f = 0, d = 0, m = 0, w = 0, t) {
          case 15:
            w ^= e[i + 14] << 16;
          case 14:
            w ^= e[i + 13] << 8;
          case 13:
            w = l(w ^= e[i + 12], x), h4 ^= w = l(w = k(w, 18), y);
          case 12:
            m ^= e[i + 11] << 24;
          case 11:
            m ^= e[i + 10] << 16;
          case 10:
            m ^= e[i + 9] << 8;
          case 9:
            m = l(m ^= e[i + 8], v), h3 ^= m = l(m = k(m, 17), x);
          case 8:
            d ^= e[i + 7] << 24;
          case 7:
            d ^= e[i + 6] << 16;
          case 6:
            d ^= e[i + 5] << 8;
          case 5:
            d = l(d ^= e[i + 4], E), h2 ^= d = l(d = k(d, 16), v);
          case 4:
            f ^= e[i + 3] << 24;
          case 3:
            f ^= e[i + 2] << 16;
          case 2:
            f ^= e[i + 1] << 8;
          case 1:
            f = l(f ^= e[i], y), h1 ^= f = l(f = k(f, 15), E)
        }
        return h1 ^= e.length, h1 += h2 ^= e.length, h1 += h3 ^= e.length, h2 += h1 += h4 ^= e.length, h3 += h1, h4 += h1, h1 = h(h1), h1 += h2 = h(h2), h1 += h3 = h(h3), h2 += h1 += h4 = h(h4), h3 += h1, h4 += h1, ("00000000" + (h1 >>> 0).toString(16)).slice(-8) + ("00000000" + (h2 >>> 0).toString(16)).slice(-8) + ("00000000" + (h3 >>> 0).toString(16)).slice(-8) + ("00000000" + (h4 >>> 0).toString(16)).slice(-8)
      }
    }, o.x64.hash128 = function (e, n) {
      if (!o.inputValidation || c(e)) {
        n = n || 0;
        for (var t = e.length % 16, r = e.length - t, h1 = [0, n], h2 = [0, n], l = [0, 0], k = [0, 0], h = [2277735313, 289559509], v = [1291169091, 658871167], i = 0; i < r; i += 16) l = [e[i + 4] | e[i + 5] << 8 | e[i + 6] << 16 | e[i + 7] << 24, e[i] | e[i + 1] << 8 | e[i + 2] << 16 | e[i + 3] << 24], k = [e[i + 12] | e[i + 13] << 8 | e[i + 14] << 16 | e[i + 15] << 24, e[i + 8] | e[i + 9] << 8 | e[i + 10] << 16 | e[i + 11] << 24], l = m(l = d(l, h), 31), h1 = f(h1 = m(h1 = y(h1, l = d(l, v)), 27), h2), h1 = f(d(h1, [0, 5]), [0, 1390208809]), k = m(k = d(k, v), 33), h2 = f(h2 = m(h2 = y(h2, k = d(k, h)), 31), h1), h2 = f(d(h2, [0, 5]), [0, 944331445]);
        switch (l = [0, 0], k = [0, 0], t) {
          case 15:
            k = y(k, w([0, e[i + 14]], 48));
          case 14:
            k = y(k, w([0, e[i + 13]], 40));
          case 13:
            k = y(k, w([0, e[i + 12]], 32));
          case 12:
            k = y(k, w([0, e[i + 11]], 24));
          case 11:
            k = y(k, w([0, e[i + 10]], 16));
          case 10:
            k = y(k, w([0, e[i + 9]], 8));
          case 9:
            k = d(k = y(k, [0, e[i + 8]]), v), h2 = y(h2, k = d(k = m(k, 33), h));
          case 8:
            l = y(l, w([0, e[i + 7]], 56));
          case 7:
            l = y(l, w([0, e[i + 6]], 48));
          case 6:
            l = y(l, w([0, e[i + 5]], 40));
          case 5:
            l = y(l, w([0, e[i + 4]], 32));
          case 4:
            l = y(l, w([0, e[i + 3]], 24));
          case 3:
            l = y(l, w([0, e[i + 2]], 16));
          case 2:
            l = y(l, w([0, e[i + 1]], 8));
          case 1:
            l = d(l = y(l, [0, e[i]]), h), h1 = y(h1, l = d(l = m(l, 31), v))
        }
        return h1 = f(h1 = y(h1, [0, e.length]), h2 = y(h2, [0, e.length])), h2 = f(h2, h1), h1 = f(h1 = E(h1), h2 = E(h2)), h2 = f(h2, h1), ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8)
      }
    }, e.exports && (n = e.exports = o), n.murmurHash3 = o
  }()
}, function (e, n, t) {
  "use strict";
  const r = t(842), o = self.crypto || self.msCrypto, c = async (data, e) => {
    if ("undefined" == typeof self || !self.crypto && !self.msCrypto) throw new Error("Please use a browser with webcrypto support and ensure the code has been delivered securely via HTTPS/TLS and run within a Secure Context");
    switch (e) {
      case"sha1":
        return new Uint8Array(await o.subtle.digest({name: "SHA-1"}, data));
      case"sha2-256":
        return new Uint8Array(await o.subtle.digest({name: "SHA-256"}, data));
      case"sha2-512":
        return new Uint8Array(await o.subtle.digest({name: "SHA-512"}, data));
      case"dbl-sha2-256": {
        const e = await o.subtle.digest({name: "SHA-256"}, data);
        return new Uint8Array(await o.subtle.digest({name: "SHA-256"}, e))
      }
      default:
        throw new Error(e + " is not a supported algorithm")
    }
  };
  e.exports = {
    factory: e => async data => c(data, e), digest: c, multihashing: async (e, n, t) => {
      const o = await c(e, n);
      return r.encode(o, n, t)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    fromNumberTo32BitBuf: e => {
      const n = new Uint8Array(4);
      for (let i = 0; i < 4; i++) n[i] = 255 & e, e >>= 8;
      return n
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(1055), o = {init: r.blake2bInit, update: r.blake2bUpdate, digest: r.blake2bFinal},
    c = {init: r.blake2sInit, update: r.blake2sUpdate, digest: r.blake2sFinal}, l = (e, n) => async data => {
      const t = n.init(e, null);
      return n.update(t, data), n.digest(t)
    };
  e.exports = table => {
    for (let i = 0; i < 64; i++) table[45569 + i] = l(i + 1, o);
    for (let i = 0; i < 32; i++) table[45633 + i] = l(i + 1, c)
  }
}, function (e, n, t) {
  var r = t(1056), o = t(1057);
  e.exports = {
    blake2b: r.blake2b,
    blake2bHex: r.blake2bHex,
    blake2bInit: r.blake2bInit,
    blake2bUpdate: r.blake2bUpdate,
    blake2bFinal: r.blake2bFinal,
    blake2s: o.blake2s,
    blake2sHex: o.blake2sHex,
    blake2sInit: o.blake2sInit,
    blake2sUpdate: o.blake2sUpdate,
    blake2sFinal: o.blake2sFinal
  }
}, function (e, n, t) {
  var r = t(843);

  function o(e, a, b) {
    var n = e[a] + e[b], t = e[a + 1] + e[b + 1];
    n >= 4294967296 && t++, e[a] = n, e[a + 1] = t
  }

  function c(e, a, n, t) {
    var r = e[a] + n;
    n < 0 && (r += 4294967296);
    var o = e[a + 1] + t;
    r >= 4294967296 && o++, e[a] = r, e[a + 1] = o
  }

  function l(e, i) {
    return e[i] ^ e[i + 1] << 8 ^ e[i + 2] << 16 ^ e[i + 3] << 24
  }

  function k(a, b, e, n, t, r) {
    var l = m[t], k = m[t + 1], h = m[r], f = m[r + 1];
    o(d, a, b), c(d, a, l, k);
    var w = d[n] ^ d[a], y = d[n + 1] ^ d[a + 1];
    d[n] = y, d[n + 1] = w, o(d, e, n), w = d[b] ^ d[e], y = d[b + 1] ^ d[e + 1], d[b] = w >>> 24 ^ y << 8, d[b + 1] = y >>> 24 ^ w << 8, o(d, a, b), c(d, a, h, f), w = d[n] ^ d[a], y = d[n + 1] ^ d[a + 1], d[n] = w >>> 16 ^ y << 16, d[n + 1] = y >>> 16 ^ w << 16, o(d, e, n), w = d[b] ^ d[e], y = d[b + 1] ^ d[e + 1], d[b] = y >>> 31 ^ w << 1, d[b + 1] = w >>> 31 ^ y << 1
  }

  var h = new Uint32Array([4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225]),
    f = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3].map((function (e) {
      return 2 * e
    }))), d = new Uint32Array(32), m = new Uint32Array(32);

  function w(e, n) {
    var i = 0;
    for (i = 0; i < 16; i++) d[i] = e.h[i], d[i + 16] = h[i];
    for (d[24] = d[24] ^ e.t, d[25] = d[25] ^ e.t / 4294967296, n && (d[28] = ~d[28], d[29] = ~d[29]), i = 0; i < 32; i++) m[i] = l(e.b, 4 * i);
    for (i = 0; i < 12; i++) k(0, 8, 16, 24, f[16 * i + 0], f[16 * i + 1]), k(2, 10, 18, 26, f[16 * i + 2], f[16 * i + 3]), k(4, 12, 20, 28, f[16 * i + 4], f[16 * i + 5]), k(6, 14, 22, 30, f[16 * i + 6], f[16 * i + 7]), k(0, 10, 20, 30, f[16 * i + 8], f[16 * i + 9]), k(2, 12, 22, 24, f[16 * i + 10], f[16 * i + 11]), k(4, 14, 16, 26, f[16 * i + 12], f[16 * i + 13]), k(6, 8, 18, 28, f[16 * i + 14], f[16 * i + 15]);
    for (i = 0; i < 16; i++) e.h[i] = e.h[i] ^ d[i] ^ d[i + 16]
  }

  function y(e, n) {
    if (0 === e || e > 64) throw new Error("Illegal output length, expected 0 < length <= 64");
    if (n && n.length > 64) throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
    for (var t = {
      b: new Uint8Array(128),
      h: new Uint32Array(16),
      t: 0,
      c: 0,
      outlen: e
    }, i = 0; i < 16; i++) t.h[i] = h[i];
    var r = n ? n.length : 0;
    return t.h[0] ^= 16842752 ^ r << 8 ^ e, n && (E(t, n), t.c = 128), t
  }

  function E(e, input) {
    for (var i = 0; i < input.length; i++) 128 === e.c && (e.t += e.c, w(e, !1), e.c = 0), e.b[e.c++] = input[i]
  }

  function v(e) {
    for (e.t += e.c; e.c < 128;) e.b[e.c++] = 0;
    w(e, !0);
    for (var n = new Uint8Array(e.outlen), i = 0; i < e.outlen; i++) n[i] = e.h[i >> 2] >> 8 * (3 & i);
    return n
  }

  function x(input, e, n) {
    n = n || 64, input = r.normalizeInput(input);
    var t = y(n, e);
    return E(t, input), v(t)
  }

  e.exports = {
    blake2b: x, blake2bHex: function (input, e, n) {
      var output = x(input, e, n);
      return r.toHex(output)
    }, blake2bInit: y, blake2bUpdate: E, blake2bFinal: v
  }
}, function (e, n, t) {
  var r = t(843);

  function o(e, i) {
    return e[i] ^ e[i + 1] << 8 ^ e[i + 2] << 16 ^ e[i + 3] << 24
  }

  function c(a, b, e, n, t, r) {
    f[a] = f[a] + f[b] + t, f[n] = l(f[n] ^ f[a], 16), f[e] = f[e] + f[n], f[b] = l(f[b] ^ f[e], 12), f[a] = f[a] + f[b] + r, f[n] = l(f[n] ^ f[a], 8), f[e] = f[e] + f[n], f[b] = l(f[b] ^ f[e], 7)
  }

  function l(e, n) {
    return e >>> n ^ e << 32 - n
  }

  var k = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]),
    h = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]),
    f = new Uint32Array(16), d = new Uint32Array(16);

  function m(e, n) {
    var i = 0;
    for (i = 0; i < 8; i++) f[i] = e.h[i], f[i + 8] = k[i];
    for (f[12] ^= e.t, f[13] ^= e.t / 4294967296, n && (f[14] = ~f[14]), i = 0; i < 16; i++) d[i] = o(e.b, 4 * i);
    for (i = 0; i < 10; i++) c(0, 4, 8, 12, d[h[16 * i + 0]], d[h[16 * i + 1]]), c(1, 5, 9, 13, d[h[16 * i + 2]], d[h[16 * i + 3]]), c(2, 6, 10, 14, d[h[16 * i + 4]], d[h[16 * i + 5]]), c(3, 7, 11, 15, d[h[16 * i + 6]], d[h[16 * i + 7]]), c(0, 5, 10, 15, d[h[16 * i + 8]], d[h[16 * i + 9]]), c(1, 6, 11, 12, d[h[16 * i + 10]], d[h[16 * i + 11]]), c(2, 7, 8, 13, d[h[16 * i + 12]], d[h[16 * i + 13]]), c(3, 4, 9, 14, d[h[16 * i + 14]], d[h[16 * i + 15]]);
    for (i = 0; i < 8; i++) e.h[i] ^= f[i] ^ f[i + 8]
  }

  function w(e, n) {
    if (!(e > 0 && e <= 32)) throw new Error("Incorrect output length, should be in [1, 32]");
    var t = n ? n.length : 0;
    if (n && !(t > 0 && t <= 32)) throw new Error("Incorrect key length, should be in [1, 32]");
    var r = {h: new Uint32Array(k), b: new Uint32Array(64), c: 0, t: 0, outlen: e};
    return r.h[0] ^= 16842752 ^ t << 8 ^ e, t > 0 && (y(r, n), r.c = 64), r
  }

  function y(e, input) {
    for (var i = 0; i < input.length; i++) 64 === e.c && (e.t += e.c, m(e, !1), e.c = 0), e.b[e.c++] = input[i]
  }

  function E(e) {
    for (e.t += e.c; e.c < 64;) e.b[e.c++] = 0;
    m(e, !0);
    for (var n = new Uint8Array(e.outlen), i = 0; i < e.outlen; i++) n[i] = e.h[i >> 2] >> 8 * (3 & i) & 255;
    return n
  }

  function v(input, e, n) {
    n = n || 32, input = r.normalizeInput(input);
    var t = w(n, e);
    return y(t, input), E(t)
  }

  e.exports = {
    blake2s: v, blake2sHex: function (input, e, n) {
      var output = v(input, e, n);
      return r.toHex(output)
    }, blake2sInit: w, blake2sUpdate: y, blake2sFinal: E
  }
}, function (e, n, t) {
  "use strict";
  const r = t(833), o = t(844);
  e.exports = (e, link) => {
    const n = (link => {
      if (o.isDAGLink(link)) return link;
      if (!("cid" in link || "hash" in link || "Hash" in link || "multihash" in link)) throw new Error("Link must be a DAGLink or DAGLink-like. Convert the DAGNode into a DAGLink via `node.toDAGLink()`.");
      return new o(link.Name || link.name, link.Tsize || link.size, link.Hash || link.multihash || link.hash || link.cid)
    })(link);
    e.Links.push(n), r(e.Links)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(747);
  e.exports.createDagLinkFromB58EncodedHash = function (link) {
    return new r(link.Name || link.name || "", link.Tsize || link.Size || link.size || 0, link.Hash || link.hash || link.multihash || link.cid)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(769), o = t(733);
  e.exports = (e, n) => {
    let t = null;
    if ("string" == typeof n ? t = link => link.Name === n : (n instanceof Uint8Array || r.isCID(n)) && (t = link => o(link.Hash, n)), !t) throw new Error("second arg needs to be a name or CID");
    {
      const n = e.Links;
      let r = 0;
      for (; r < n.length;) {
        t(n[r]) ? n.splice(r, 1) : r++
      }
    }
  }
}, function (e, n, t) {
  "use strict";
  const r = t(769), o = t(845);
  n.resolve = (e, path) => {
    let n = o.deserialize(e);
    const t = path.split("/").filter(Boolean);
    for (; t.length;) {
      const e = t.shift();
      if (void 0 === n[e]) {
        for (const link of n.Links) if (link.Name === e) return {value: link.Hash, remainderPath: t.join("/")};
        throw new Error(`Object has no property '${e}'`)
      }
      if (n = n[e], r.isCID(n)) return {value: n, remainderPath: t.join("/")}
    }
    return {value: n, remainderPath: ""}
  }, n.tree = function* (e) {
    const n = o.deserialize(e);
    yield"Data", yield"Links";
    for (let e = 0; e < n.Links.length; e++) yield"Links/" + e, yield`Links/${e}/Name`, yield`Links/${e}/Tsize`, yield`Links/${e}/Hash`
  }
}, function (e, n, t) {
  "use strict";
  n.Diagnose = t(1063), n.Decoder = t(848), n.Encoder = t(1065), n.Simple = t(849), n.Tagged = t(850), n.decodeAll = n.Decoder.decodeAll, n.decodeFirst = n.Decoder.decodeFirst, n.diagnose = n.Diagnose.diagnose, n.encode = n.Encoder.encode, n.decode = n.Decoder.decode, n.leveldb = {
    decode: n.Decoder.decodeAll,
    encode: n.Encoder.encode,
    buffer: !0,
    name: "cbor"
  }
}, function (e, n, t) {
  "use strict";
  const {Buffer: r} = t(2), o = t(848), c = t(791);

  class l extends o {
    createTag(e, n) {
      return `${e}(${n})`
    }

    createInt(e) {
      return super.createInt(e).toString()
    }

    createInt32(e, g) {
      return super.createInt32(e, g).toString()
    }

    createInt64(e, n, t, r) {
      return super.createInt64(e, n, t, r).toString()
    }

    createInt32Neg(e, g) {
      return super.createInt32Neg(e, g).toString()
    }

    createInt64Neg(e, n, t, r) {
      return super.createInt64Neg(e, n, t, r).toString()
    }

    createTrue() {
      return "true"
    }

    createFalse() {
      return "false"
    }

    createFloat(e) {
      const n = super.createFloat(e);
      return c.isNegativeZero(e) ? "-0_1" : n + "_1"
    }

    createFloatSingle(a, b, e, n) {
      return super.createFloatSingle(a, b, e, n) + "_2"
    }

    createFloatDouble(a, b, e, n, t, r, g, o) {
      return super.createFloatDouble(a, b, e, n, t, r, g, o) + "_3"
    }

    createByteString(e, n) {
      const t = e.join(", ");
      return -1 === n ? `(_ ${t})` : "h'" + t
    }

    createByteStringFromHeap(e, n) {
      return `h'${r.from(super.createByteStringFromHeap(e, n)).toString("hex")}'`
    }

    createInfinity() {
      return "Infinity_1"
    }

    createInfinityNeg() {
      return "-Infinity_1"
    }

    createNaN() {
      return "NaN_1"
    }

    createNaNNeg() {
      return "-NaN_1"
    }

    createNull() {
      return "null"
    }

    createUndefined() {
      return "undefined"
    }

    createSimpleUnassigned(e) {
      return `simple(${e})`
    }

    createArray(e, n) {
      const t = super.createArray(e, n);
      return -1 === n ? `[_ ${t.join(", ")}]` : `[${t.join(", ")}]`
    }

    createMap(map, e) {
      const n = super.createMap(map), t = Array.from(n.keys()).reduce(k(n), "");
      return -1 === e ? `{_ ${t}}` : `{${t}}`
    }

    createObject(e, n) {
      const t = super.createObject(e), map = Object.keys(t).reduce(k(t), "");
      return -1 === n ? `{_ ${map}}` : `{${map}}`
    }

    createUtf8String(e, n) {
      const t = e.join(", ");
      return -1 === n ? `(_ ${t})` : `"${t}"`
    }

    createUtf8StringFromHeap(e, n) {
      return `"${r.from(super.createUtf8StringFromHeap(e, n)).toString("utf8")}"`
    }

    static diagnose(input, e) {
      "string" == typeof input && (input = r.from(input, e || "hex"));
      return (new l).decodeFirst(input)
    }
  }

  function k(e) {
    return (n, t) => n ? `${n}, ${t}: ${e[t]}` : `${t}: ${e[t]}`
  }

  e.exports = l
}, function (e, n) {
  e.exports = function (e, n, t) {
    "use asm";
    var r = new e.Uint8Array(t);
    var o = n.pushInt;
    var c = n.pushInt32;
    var l = n.pushInt32Neg;
    var k = n.pushInt64;
    var h = n.pushInt64Neg;
    var f = n.pushFloat;
    var d = n.pushFloatSingle;
    var m = n.pushFloatDouble;
    var w = n.pushTrue;
    var y = n.pushFalse;
    var E = n.pushUndefined;
    var v = n.pushNull;
    var x = n.pushInfinity;
    var S = n.pushInfinityNeg;
    var A = n.pushNaN;
    var _ = n.pushNaNNeg;
    var N = n.pushArrayStart;
    var I = n.pushArrayStartFixed;
    var C = n.pushArrayStartFixed32;
    var O = n.pushArrayStartFixed64;
    var U = n.pushObjectStart;
    var T = n.pushObjectStartFixed;
    var P = n.pushObjectStartFixed32;
    var D = n.pushObjectStartFixed64;
    var L = n.pushByteString;
    var j = n.pushByteStringStart;
    var R = n.pushUtf8String;
    var B = n.pushUtf8StringStart;
    var F = n.pushSimpleUnassigned;
    var M = n.pushTagStart;
    var z = n.pushTagStart4;
    var G = n.pushTagStart8;
    var H = n.pushTagUnassigned;
    var V = n.pushBreak;
    var K = e.Math.pow;
    var $ = 0;
    var Y = 0;
    var code = 0;

    function J(input) {
      input = input | 0;
      $ = 0;
      Y = input;
      while (($ | 0) < (Y | 0)) {
        code = sn[r[$] & 255](r[$] | 0) | 0;
        if ((code | 0) > 0) {
          break
        }
      }
      return code | 0
    }

    function W(e) {
      e = e | 0;
      if ((($ | 0) + (e | 0) | 0) < (Y | 0)) {
        return 0
      }
      return 1
    }

    function X(e) {
      e = e | 0;
      return r[e | 0] << 8 | r[e + 1 | 0] | 0
    }

    function Q(e) {
      e = e | 0;
      return r[e | 0] << 24 | r[e + 1 | 0] << 16 | r[e + 2 | 0] << 8 | r[e + 3 | 0] | 0
    }

    function Z(e) {
      e = e | 0;
      o(e | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function ee(e) {
      e = e | 0;
      if (W(1) | 0) {
        return 1
      }
      o(r[$ + 1 | 0] | 0);
      $ = $ + 2 | 0;
      return 0
    }

    function ne(e) {
      e = e | 0;
      if (W(2) | 0) {
        return 1
      }
      o(X($ + 1 | 0) | 0);
      $ = $ + 3 | 0;
      return 0
    }

    function te(e) {
      e = e | 0;
      if (W(4) | 0) {
        return 1
      }
      c(X($ + 1 | 0) | 0, X($ + 3 | 0) | 0);
      $ = $ + 5 | 0;
      return 0
    }

    function se(e) {
      e = e | 0;
      if (W(8) | 0) {
        return 1
      }
      k(X($ + 1 | 0) | 0, X($ + 3 | 0) | 0, X($ + 5 | 0) | 0, X($ + 7 | 0) | 0);
      $ = $ + 9 | 0;
      return 0
    }

    function ie(e) {
      e = e | 0;
      o(-1 - (e - 32 | 0) | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function re(e) {
      e = e | 0;
      if (W(1) | 0) {
        return 1
      }
      o(-1 - (r[$ + 1 | 0] | 0) | 0);
      $ = $ + 2 | 0;
      return 0
    }

    function oe(e) {
      e = e | 0;
      var n = 0;
      if (W(2) | 0) {
        return 1
      }
      n = X($ + 1 | 0) | 0;
      o(-1 - (n | 0) | 0);
      $ = $ + 3 | 0;
      return 0
    }

    function ae(e) {
      e = e | 0;
      if (W(4) | 0) {
        return 1
      }
      l(X($ + 1 | 0) | 0, X($ + 3 | 0) | 0);
      $ = $ + 5 | 0;
      return 0
    }

    function ce(e) {
      e = e | 0;
      if (W(8) | 0) {
        return 1
      }
      h(X($ + 1 | 0) | 0, X($ + 3 | 0) | 0, X($ + 5 | 0) | 0, X($ + 7 | 0) | 0);
      $ = $ + 9 | 0;
      return 0
    }

    function ue(e) {
      e = e | 0;
      var n = 0;
      var t = 0;
      var r = 0;
      r = e - 64 | 0;
      if (W(r | 0) | 0) {
        return 1
      }
      n = $ + 1 | 0;
      t = ($ + 1 | 0) + (r | 0) | 0;
      L(n | 0, t | 0);
      $ = t | 0;
      return 0
    }

    function le(e) {
      e = e | 0;
      var n = 0;
      var t = 0;
      var o = 0;
      if (W(1) | 0) {
        return 1
      }
      o = r[$ + 1 | 0] | 0;
      n = $ + 2 | 0;
      t = ($ + 2 | 0) + (o | 0) | 0;
      if (W(o + 1 | 0) | 0) {
        return 1
      }
      L(n | 0, t | 0);
      $ = t | 0;
      return 0
    }

    function ke(e) {
      e = e | 0;
      var n = 0;
      var t = 0;
      var r = 0;
      if (W(2) | 0) {
        return 1
      }
      r = X($ + 1 | 0) | 0;
      n = $ + 3 | 0;
      t = ($ + 3 | 0) + (r | 0) | 0;
      if (W(r + 2 | 0) | 0) {
        return 1
      }
      L(n | 0, t | 0);
      $ = t | 0;
      return 0
    }

    function he(e) {
      e = e | 0;
      var n = 0;
      var t = 0;
      var r = 0;
      if (W(4) | 0) {
        return 1
      }
      r = Q($ + 1 | 0) | 0;
      n = $ + 5 | 0;
      t = ($ + 5 | 0) + (r | 0) | 0;
      if (W(r + 4 | 0) | 0) {
        return 1
      }
      L(n | 0, t | 0);
      $ = t | 0;
      return 0
    }

    function be(e) {
      e = e | 0;
      return 1
    }

    function fe(e) {
      e = e | 0;
      j();
      $ = $ + 1 | 0;
      return 0
    }

    function de(e) {
      e = e | 0;
      var n = 0;
      var t = 0;
      var r = 0;
      r = e - 96 | 0;
      if (W(r | 0) | 0) {
        return 1
      }
      n = $ + 1 | 0;
      t = ($ + 1 | 0) + (r | 0) | 0;
      R(n | 0, t | 0);
      $ = t | 0;
      return 0
    }

    function pe(e) {
      e = e | 0;
      var n = 0;
      var t = 0;
      var o = 0;
      if (W(1) | 0) {
        return 1
      }
      o = r[$ + 1 | 0] | 0;
      n = $ + 2 | 0;
      t = ($ + 2 | 0) + (o | 0) | 0;
      if (W(o + 1 | 0) | 0) {
        return 1
      }
      R(n | 0, t | 0);
      $ = t | 0;
      return 0
    }

    function me(e) {
      e = e | 0;
      var n = 0;
      var t = 0;
      var r = 0;
      if (W(2) | 0) {
        return 1
      }
      r = X($ + 1 | 0) | 0;
      n = $ + 3 | 0;
      t = ($ + 3 | 0) + (r | 0) | 0;
      if (W(r + 2 | 0) | 0) {
        return 1
      }
      R(n | 0, t | 0);
      $ = t | 0;
      return 0
    }

    function ge(e) {
      e = e | 0;
      var n = 0;
      var t = 0;
      var r = 0;
      if (W(4) | 0) {
        return 1
      }
      r = Q($ + 1 | 0) | 0;
      n = $ + 5 | 0;
      t = ($ + 5 | 0) + (r | 0) | 0;
      if (W(r + 4 | 0) | 0) {
        return 1
      }
      R(n | 0, t | 0);
      $ = t | 0;
      return 0
    }

    function we(e) {
      e = e | 0;
      return 1
    }

    function ye(e) {
      e = e | 0;
      B();
      $ = $ + 1 | 0;
      return 0
    }

    function Ee(e) {
      e = e | 0;
      I(e - 128 | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function ve(e) {
      e = e | 0;
      if (W(1) | 0) {
        return 1
      }
      I(r[$ + 1 | 0] | 0);
      $ = $ + 2 | 0;
      return 0
    }

    function xe(e) {
      e = e | 0;
      if (W(2) | 0) {
        return 1
      }
      I(X($ + 1 | 0) | 0);
      $ = $ + 3 | 0;
      return 0
    }

    function Se(e) {
      e = e | 0;
      if (W(4) | 0) {
        return 1
      }
      C(X($ + 1 | 0) | 0, X($ + 3 | 0) | 0);
      $ = $ + 5 | 0;
      return 0
    }

    function Ae(e) {
      e = e | 0;
      if (W(8) | 0) {
        return 1
      }
      O(X($ + 1 | 0) | 0, X($ + 3 | 0) | 0, X($ + 5 | 0) | 0, X($ + 7 | 0) | 0);
      $ = $ + 9 | 0;
      return 0
    }

    function _e(e) {
      e = e | 0;
      N();
      $ = $ + 1 | 0;
      return 0
    }

    function Ne(e) {
      e = e | 0;
      var n = 0;
      n = e - 160 | 0;
      if (W(n | 0) | 0) {
        return 1
      }
      T(n | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function Ie(e) {
      e = e | 0;
      if (W(1) | 0) {
        return 1
      }
      T(r[$ + 1 | 0] | 0);
      $ = $ + 2 | 0;
      return 0
    }

    function Ce(e) {
      e = e | 0;
      if (W(2) | 0) {
        return 1
      }
      T(X($ + 1 | 0) | 0);
      $ = $ + 3 | 0;
      return 0
    }

    function Oe(e) {
      e = e | 0;
      if (W(4) | 0) {
        return 1
      }
      P(X($ + 1 | 0) | 0, X($ + 3 | 0) | 0);
      $ = $ + 5 | 0;
      return 0
    }

    function Ue(e) {
      e = e | 0;
      if (W(8) | 0) {
        return 1
      }
      D(X($ + 1 | 0) | 0, X($ + 3 | 0) | 0, X($ + 5 | 0) | 0, X($ + 7 | 0) | 0);
      $ = $ + 9 | 0;
      return 0
    }

    function Te(e) {
      e = e | 0;
      U();
      $ = $ + 1 | 0;
      return 0
    }

    function Pe(e) {
      e = e | 0;
      M(e - 192 | 0 | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function De(e) {
      e | 0;
      M(e | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function Le(e) {
      e | 0;
      M(e | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function je(e) {
      e | 0;
      M(e | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function Re(e) {
      e | 0;
      M(e | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function Be(e) {
      e = e | 0;
      M(e - 192 | 0 | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function Fe(e) {
      e | 0;
      M(e | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function Me(e) {
      e | 0;
      M(e | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function ze(e) {
      e | 0;
      M(e | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function Ge(e) {
      e = e | 0;
      if (W(1) | 0) {
        return 1
      }
      M(r[$ + 1 | 0] | 0);
      $ = $ + 2 | 0;
      return 0
    }

    function He(e) {
      e = e | 0;
      if (W(2) | 0) {
        return 1
      }
      M(X($ + 1 | 0) | 0);
      $ = $ + 3 | 0;
      return 0
    }

    function Ve(e) {
      e = e | 0;
      if (W(4) | 0) {
        return 1
      }
      z(X($ + 1 | 0) | 0, X($ + 3 | 0) | 0);
      $ = $ + 5 | 0;
      return 0
    }

    function qe(e) {
      e = e | 0;
      if (W(8) | 0) {
        return 1
      }
      G(X($ + 1 | 0) | 0, X($ + 3 | 0) | 0, X($ + 5 | 0) | 0, X($ + 7 | 0) | 0);
      $ = $ + 9 | 0;
      return 0
    }

    function Ke(e) {
      e = e | 0;
      F((e | 0) - 224 | 0);
      $ = $ + 1 | 0;
      return 0
    }

    function $e(e) {
      e = e | 0;
      y();
      $ = $ + 1 | 0;
      return 0
    }

    function Ye(e) {
      e = e | 0;
      w();
      $ = $ + 1 | 0;
      return 0
    }

    function Je(e) {
      e = e | 0;
      v();
      $ = $ + 1 | 0;
      return 0
    }

    function We(e) {
      e = e | 0;
      E();
      $ = $ + 1 | 0;
      return 0
    }

    function Xe(e) {
      e = e | 0;
      if (W(1) | 0) {
        return 1
      }
      F(r[$ + 1 | 0] | 0);
      $ = $ + 2 | 0;
      return 0
    }

    function Qe(e) {
      e = e | 0;
      var n = 0;
      var g = 0;
      var t = 1.0;
      var o = 0.0;
      var c = 0.0;
      var l = 0.0;
      if (W(2) | 0) {
        return 1
      }
      n = r[$ + 1 | 0] | 0;
      g = r[$ + 2 | 0] | 0;
      if ((n | 0) & 0x80) {
        t = -1.0
      }
      o = +(((n | 0) & 0x7C) >> 2);
      c = +(((n | 0) & 0x03) << 8 | g);
      if (+o == 0.0) {
        f(+(+t * +5.9604644775390625e-8 * +c))
      } else if (+o == 31.0) {
        if (+t == 1.0) {
          if (+c > 0.0) {
            A()
          } else {
            x()
          }
        } else {
          if (+c > 0.0) {
            _()
          } else {
            S()
          }
        }
      } else {
        f(+(+t * K(+2, +(+o - 25.0)) * +(1024.0 + c)))
      }
      $ = $ + 3 | 0;
      return 0
    }

    function Ze(e) {
      e = e | 0;
      if (W(4) | 0) {
        return 1
      }
      d(r[$ + 1 | 0] | 0, r[$ + 2 | 0] | 0, r[$ + 3 | 0] | 0, r[$ + 4 | 0] | 0);
      $ = $ + 5 | 0;
      return 0
    }

    function en(e) {
      e = e | 0;
      if (W(8) | 0) {
        return 1
      }
      m(r[$ + 1 | 0] | 0, r[$ + 2 | 0] | 0, r[$ + 3 | 0] | 0, r[$ + 4 | 0] | 0, r[$ + 5 | 0] | 0, r[$ + 6 | 0] | 0, r[$ + 7 | 0] | 0, r[$ + 8 | 0] | 0);
      $ = $ + 9 | 0;
      return 0
    }

    function nn(e) {
      e = e | 0;
      return 1
    }

    function tn(e) {
      e = e | 0;
      V();
      $ = $ + 1 | 0;
      return 0
    }

    var sn = [Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, Z, ee, ne, te, se, nn, nn, nn, nn, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, ie, re, oe, ae, ce, nn, nn, nn, nn, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, le, ke, he, be, nn, nn, nn, fe, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, pe, me, ge, we, nn, nn, nn, ye, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, Ee, ve, xe, Se, Ae, nn, nn, nn, _e, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ne, Ie, Ce, Oe, Ue, nn, nn, nn, Te, Pe, Pe, Pe, Pe, Pe, Pe, Be, Be, Be, Be, Be, Be, Be, Be, Be, Be, Be, Be, Be, Be, Be, Be, Be, Be, Ge, He, Ve, qe, nn, nn, nn, nn, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, Ke, $e, Ye, Je, We, Xe, Qe, Ze, en, nn, nn, nn, tn];
    return {parse: J}
  }
}, function (e, n, t) {
  "use strict";
  const {Buffer: r} = t(2), {URL: o} = t(767), c = t(746).BigNumber, l = t(791), k = t(770), h = k.MT, f = k.NUMBYTES,
    d = k.SHIFT32, m = k.SYMS, w = k.TAG, y = k.MT.SIMPLE_FLOAT << 5 | k.NUMBYTES.TWO,
    E = k.MT.SIMPLE_FLOAT << 5 | k.NUMBYTES.FOUR, v = k.MT.SIMPLE_FLOAT << 5 | k.NUMBYTES.EIGHT,
    x = k.MT.SIMPLE_FLOAT << 5 | k.SIMPLE.TRUE, S = k.MT.SIMPLE_FLOAT << 5 | k.SIMPLE.FALSE,
    A = k.MT.SIMPLE_FLOAT << 5 | k.SIMPLE.UNDEFINED, _ = k.MT.SIMPLE_FLOAT << 5 | k.SIMPLE.NULL,
    N = new c("0x20000000000000"), I = r.from("f97e00", "hex"), C = r.from("f9fc00", "hex"),
    O = r.from("f97c00", "hex");

  class U {
    constructor(e) {
      e = e || {}, this.streaming = "function" == typeof e.stream, this.onData = e.stream, this.semanticTypes = [[o, this._pushUrl], [c, this._pushBigNumber]];
      const n = e.genTypes || [], t = n.length;
      for (let i = 0; i < t; i++) this.addSemanticType(n[i][0], n[i][1]);
      this._reset()
    }

    addSemanticType(e, n) {
      const t = this.semanticTypes.length;
      for (let i = 0; i < t; i++) {
        if (this.semanticTypes[i][0] === e) {
          const e = this.semanticTypes[i][1];
          return this.semanticTypes[i][1] = n, e
        }
      }
      return this.semanticTypes.push([e, n]), null
    }

    push(e) {
      return !e || (this.result[this.offset] = e, this.resultMethod[this.offset] = 0, this.resultLength[this.offset] = e.length, this.offset++, this.streaming && this.onData(this.finalize()), !0)
    }

    pushWrite(e, n, t) {
      return this.result[this.offset] = e, this.resultMethod[this.offset] = n, this.resultLength[this.offset] = t, this.offset++, this.streaming && this.onData(this.finalize()), !0
    }

    _pushUInt8(e) {
      return this.pushWrite(e, 1, 1)
    }

    _pushUInt16BE(e) {
      return this.pushWrite(e, 2, 2)
    }

    _pushUInt32BE(e) {
      return this.pushWrite(e, 3, 4)
    }

    _pushDoubleBE(e) {
      return this.pushWrite(e, 4, 8)
    }

    _pushNaN() {
      return this.push(I)
    }

    _pushInfinity(e) {
      const n = e < 0 ? C : O;
      return this.push(n)
    }

    _pushFloat(e) {
      const n = r.allocUnsafe(2);
      if (l.writeHalf(n, e) && l.parseHalf(n) === e) return this._pushUInt8(y) && this.push(n);
      const t = r.allocUnsafe(4);
      return t.writeFloatBE(e, 0), t.readFloatBE(0) === e ? this._pushUInt8(E) && this.push(t) : this._pushUInt8(v) && this._pushDoubleBE(e)
    }

    _pushInt(e, n, t) {
      const r = n << 5;
      return e < 24 ? this._pushUInt8(r | e) : e <= 255 ? this._pushUInt8(r | f.ONE) && this._pushUInt8(e) : e <= 65535 ? this._pushUInt8(r | f.TWO) && this._pushUInt16BE(e) : e <= 4294967295 ? this._pushUInt8(r | f.FOUR) && this._pushUInt32BE(e) : e <= Number.MAX_SAFE_INTEGER ? this._pushUInt8(r | f.EIGHT) && this._pushUInt32BE(Math.floor(e / d)) && this._pushUInt32BE(e % d) : n === h.NEG_INT ? this._pushFloat(t) : this._pushFloat(e)
    }

    _pushIntNum(e) {
      return e < 0 ? this._pushInt(-e - 1, h.NEG_INT, e) : this._pushInt(e, h.POS_INT)
    }

    _pushNumber(e) {
      switch (!1) {
        case e == e:
          return this._pushNaN(e);
        case isFinite(e):
          return this._pushInfinity(e);
        case e % 1 != 0:
          return this._pushIntNum(e);
        default:
          return this._pushFloat(e)
      }
    }

    _pushString(e) {
      const n = r.byteLength(e, "utf8");
      return this._pushInt(n, h.UTF8_STRING) && this.pushWrite(e, 5, n)
    }

    _pushBoolean(e) {
      return this._pushUInt8(e ? x : S)
    }

    _pushUndefined(e) {
      return this._pushUInt8(A)
    }

    _pushArray(e, n) {
      const t = n.length;
      if (!e._pushInt(t, h.ARRAY)) return !1;
      for (let r = 0; r < t; r++) if (!e.pushAny(n[r])) return !1;
      return !0
    }

    _pushTag(e) {
      return this._pushInt(e, h.TAG)
    }

    _pushDate(e, n) {
      return e._pushTag(w.DATE_EPOCH) && e.pushAny(Math.round(n / 1e3))
    }

    _pushBuffer(e, n) {
      return e._pushInt(n.length, h.BYTE_STRING) && e.push(n)
    }

    _pushNoFilter(e, n) {
      return e._pushBuffer(e, n.slice())
    }

    _pushRegexp(e, n) {
      return e._pushTag(w.REGEXP) && e.pushAny(n.source)
    }

    _pushSet(e, n) {
      if (!e._pushInt(n.size, h.ARRAY)) return !1;
      for (const t of n) if (!e.pushAny(t)) return !1;
      return !0
    }

    _pushUrl(e, n) {
      return e._pushTag(w.URI) && e.pushAny(n.format())
    }

    _pushBigint(e) {
      let n = w.POS_BIGINT;
      e.isNegative() && (e = e.negated().minus(1), n = w.NEG_BIGINT);
      let t = e.toString(16);
      t.length % 2 && (t = "0" + t);
      const o = r.from(t, "hex");
      return this._pushTag(n) && this._pushBuffer(this, o)
    }

    _pushBigNumber(e, n) {
      if (n.isNaN()) return e._pushNaN();
      if (!n.isFinite()) return e._pushInfinity(n.isNegative() ? -1 / 0 : 1 / 0);
      if (n.isInteger()) return e._pushBigint(n);
      if (!e._pushTag(w.DECIMAL_FRAC) || !e._pushInt(2, h.ARRAY)) return !1;
      const t = n.decimalPlaces(), r = n.multipliedBy(new c(10).pow(t));
      return !!e._pushIntNum(-t) && (r.abs().isLessThan(N) ? e._pushIntNum(r.toNumber()) : e._pushBigint(r))
    }

    _pushMap(e, n) {
      return !!e._pushInt(n.size, h.MAP) && this._pushRawMap(n.size, Array.from(n))
    }

    _pushObject(e) {
      if (!e) return this._pushUInt8(_);
      for (var n = this.semanticTypes.length, i = 0; i < n; i++) if (e instanceof this.semanticTypes[i][0]) return this.semanticTypes[i][1].call(e, this, e);
      var t = e.encodeCBOR;
      if ("function" == typeof t) return t.call(e, this);
      var r = Object.keys(e), o = r.length;
      return !!this._pushInt(o, h.MAP) && this._pushRawMap(o, r.map(n => [n, e[n]]))
    }

    _pushRawMap(e, map) {
      map = map.map((function (a) {
        return a[0] = U.encode(a[0]), a
      })).sort(l.keySorter);
      for (var n = 0; n < e; n++) {
        if (!this.push(map[n][0])) return !1;
        if (!this.pushAny(map[n][1])) return !1
      }
      return !0
    }

    write(e) {
      return this.pushAny(e)
    }

    pushAny(e) {
      switch (function (e) {
        return {}.toString.call(e).slice(8, -1)
      }(e)) {
        case"Number":
          return this._pushNumber(e);
        case"String":
          return this._pushString(e);
        case"Boolean":
          return this._pushBoolean(e);
        case"Object":
          return this._pushObject(e);
        case"Array":
          return this._pushArray(this, e);
        case"Uint8Array":
          return this._pushBuffer(this, r.isBuffer(e) ? e : r.from(e));
        case"Null":
          return this._pushUInt8(_);
        case"Undefined":
          return this._pushUndefined(e);
        case"Map":
          return this._pushMap(this, e);
        case"Set":
          return this._pushSet(this, e);
        case"URL":
          return this._pushUrl(this, e);
        case"BigNumber":
          return this._pushBigNumber(this, e);
        case"Date":
          return this._pushDate(this, e);
        case"RegExp":
          return this._pushRegexp(this, e);
        case"Symbol":
          switch (e) {
            case m.NULL:
              return this._pushObject(null);
            case m.UNDEFINED:
              return this._pushUndefined(void 0);
            default:
              throw new Error("Unknown symbol: " + e.toString())
          }
        default:
          throw new Error("Unknown type: " + typeof e + ", " + (e ? e.toString() : ""))
      }
    }

    finalize() {
      if (0 === this.offset) return null;
      for (var e = this.result, n = this.resultLength, t = this.resultMethod, o = this.offset, c = 0, i = 0; i < o; i++) c += n[i];
      var l = r.allocUnsafe(c), k = 0, h = 0;
      for (i = 0; i < o; i++) {
        switch (h = n[i], t[i]) {
          case 0:
            e[i].copy(l, k);
            break;
          case 1:
            l.writeUInt8(e[i], k, !0);
            break;
          case 2:
            l.writeUInt16BE(e[i], k, !0);
            break;
          case 3:
            l.writeUInt32BE(e[i], k, !0);
            break;
          case 4:
            l.writeDoubleBE(e[i], k, !0);
            break;
          case 5:
            l.write(e[i], k, h, "utf8");
            break;
          default:
            throw new Error("unkown method")
        }
        k += h
      }
      var f = l;
      return this._reset(), f
    }

    _reset() {
      this.result = [], this.resultMethod = [], this.resultLength = [], this.offset = 0
    }

    static encode(e) {
      const n = new U;
      if (!n.pushAny(e)) throw new Error("Failed to encode input");
      return n.finalize()
    }
  }

  e.exports = U
}, function (e, n, t) {
  "use strict";
  const r = t(760), o = new Map;
  for (const e in r) {
    const code = r[e];
    o.set(code, e)
  }
  e.exports = Object.freeze(o)
}, function (e, n, t) {
  "use strict";
  const r = t(760), o = t(852).varintEncode, c = {};
  for (const e in r) {
    const code = r[e];
    c[e] = o(code)
  }
  e.exports = Object.freeze(c)
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(792), {TextDecoder: o} = t(711), c = new o("utf8");
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.decode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.encode(e)
  }
}, function (e, n, t) {
  "use strict";
  const {encodeText: r} = t(793);
  e.exports = class {
    constructor(e, code, n, t) {
      this.name = e, this.code = code, this.codeBuf = r(this.code), this.alphabet = t, this.codec = n(t)
    }

    encode(e) {
      return this.codec.encode(e)
    }

    decode(e) {
      for (const n of e) if (this.alphabet && this.alphabet.indexOf(n) < 0) throw new Error(`invalid character '${n}' in '${e}'`);
      return this.codec.decode(e)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    rfc4648: e => n => ({
      encode: input => ((data, e, n) => {
        const t = "=" === e[e.length - 1], mask = (1 << n) - 1;
        let r = "", o = 0, c = 0;
        for (let i = 0; i < data.length; ++i) for (c = c << 8 | data[i], o += 8; o > n;) o -= n, r += e[mask & c >> o];
        if (o && (r += e[mask & c << n - o]), t) for (; r.length * n & 7;) r += "=";
        return r
      })(input, n, e), decode: input => ((e, n, t) => {
        const r = {};
        for (let i = 0; i < n.length; ++i) r[n[i]] = i;
        let o = e.length;
        for (; "=" === e[o - 1];) --o;
        const c = new Uint8Array(o * t / 8 | 0);
        let l = 0, k = 0, h = 0;
        for (let i = 0; i < o; ++i) {
          const n = r[e[i]];
          if (void 0 === n) throw new SyntaxError("Invalid character " + e[i]);
          k = k << t | n, l += t, l >= 8 && (l -= 8, c[h++] = 255 & k >> l)
        }
        if (l >= t || 255 & k << 8 - l) throw new SyntaxError("Unexpected end of data");
        return c
      })(input, n, e)
    })
  }
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(792), {TextEncoder: o} = t(711), c = new o;
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.encode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.decode(e)
  }
}, function (e, n, t) {
  "use strict";
  e.exports = function (e, n) {
    n || (n = e.reduce((e, n) => e + n.length, 0));
    const output = new Uint8Array(n);
    let t = 0;
    for (const n of e) output.set(n, t), t += n.length;
    return output
  }
}, function (e, n, t) {
  "use strict";
  const table = t(760), r = {};
  for (const [e, code] of Object.entries(table)) r[e.toUpperCase().replace(/-/g, "_")] = code;
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const table = t(760), r = {};
  for (const [e, code] of Object.entries(table)) void 0 === r[code] && (r[code] = e);
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  e.exports = {encode: t(1076), decode: t(1077), encodingLength: t(1078)}
}, function (e, n) {
  e.exports = function e(n, r, o) {
    if (Number.MAX_SAFE_INTEGER && n > Number.MAX_SAFE_INTEGER) throw e.bytes = 0, new RangeError("Could not encode varint");
    r = r || [];
    var c = o = o || 0;
    for (; n >= t;) r[o++] = 255 & n | 128, n /= 128;
    for (; -128 & n;) r[o++] = 255 & n | 128, n >>>= 7;
    return r[o] = 0 | n, e.bytes = o - c + 1, r
  };
  var t = Math.pow(2, 31)
}, function (e, n) {
  e.exports = function e(n, t) {
    var b, r = 0, o = 0, c = t = t || 0, l = n.length;
    do {
      if (c >= l || o > 49) throw e.bytes = 0, new RangeError("Could not decode varint");
      b = n[c++], r += o < 28 ? (127 & b) << o : (127 & b) * Math.pow(2, o), o += 7
    } while (b >= 128);
    return e.bytes = c - t, r
  }
}, function (e, n) {
  var t = Math.pow(2, 7), r = Math.pow(2, 14), o = Math.pow(2, 21), c = Math.pow(2, 28), l = Math.pow(2, 35),
    k = Math.pow(2, 42), h = Math.pow(2, 49), f = Math.pow(2, 56), d = Math.pow(2, 63);
  e.exports = function (e) {
    return e < t ? 1 : e < r ? 2 : e < o ? 3 : e < c ? 4 : e < l ? 5 : e < k ? 6 : e < h ? 7 : e < f ? 8 : e < d ? 9 : 10
  }
}, function (e, n, t) {
  "use strict";
  const r = Object.freeze({
    identity: 0,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    "murmur3-128": 34,
    "murmur3-32": 35,
    "dbl-sha2-256": 86,
    md4: 212,
    md5: 213,
    bmt: 214,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082
  });
  e.exports = {names: r}
}, function (e, n, t) {
  "use strict";
  const r = t(854), o = {
    checkCIDComponents: function (e) {
      if (null == e) return "null values are not valid CIDs";
      if (0 !== e.version && 1 !== e.version) return "Invalid version, must be a number equal to 1 or 0";
      if ("string" != typeof e.codec) return "codec must be string";
      if (0 === e.version) {
        if ("dag-pb" !== e.codec) return "codec must be 'dag-pb' for CIDv0";
        if ("base58btc" !== e.multibaseName) return "multibaseName must be 'base58btc' for CIDv0"
      }
      if (!(e.multihash instanceof Uint8Array)) return "multihash must be a Uint8Array";
      try {
        r.validate(e.multihash)
      } catch (e) {
        let n = e.message;
        return n || (n = "Multihash validation failed"), n
      }
    }
  };
  e.exports = o
}, function (e, n, t) {
  var r = t(1082);
  e.exports = function (e) {
    if (!(e instanceof Object)) throw new TypeError('"obj" must be an object (or inherit from it)');
    return function e(n, t) {
      for (var o in t = new r(n, t), n) {
        var c = n[o];
        if (c instanceof Object && (t.contains(c) || e(c, t))) return !0
      }
      return !1
    }(e)
  }
}, function (e, n) {
  function t(e, n) {
    this.value = e, this.next = n
  }

  e.exports = t, t.prototype.contains = function (e) {
    for (var cursor = this; cursor;) {
      if (cursor.value === e) return !0;
      cursor = cursor.next
    }
    return !1
  }
}, function (e, n, t) {
  "use strict";
  const r = t(853), o = t(847);
  n.resolve = (e, path) => {
    let n = o.deserialize(e);
    const t = path.split("/").filter(Boolean);
    for (; t.length;) {
      const e = t.shift();
      if (void 0 === n[e]) throw new Error(`Object has no property '${e}'`);
      if (n = n[e], r.isCID(n)) return {value: n, remainderPath: t.join("/")}
    }
    return {value: n, remainderPath: ""}
  };
  const c = function* (e, path) {
    if (!(e instanceof Uint8Array || r.isCID(e) || "string" == typeof e || null === e)) for (const n of Object.keys(e)) {
      const t = void 0 === path ? n : path + "/" + n;
      yield t, yield* c(e[n], t)
    }
  };
  n.tree = function* (e) {
    const n = o.deserialize(e);
    yield* c(n)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(857), o = t(858), c = t(859), l = t(761), k = t(1099), h = t(348), f = t(718), d = t(712), m = t(733),
    w = Object.keys(l).reduce((p, e) => (p[l[e]] = e, p), {});

  class y {
    constructor(e, n, t, l) {
      if (E.isCID(e)) {
        const n = e;
        return this.version = n.version, this.codec = n.codec, this.multihash = n.multihash, void (this.multibaseName = n.multibaseName || (0 === n.version ? "base58btc" : "base32"))
      }
      if ("string" == typeof e) {
        const n = o.isEncoded(e);
        if (n) {
          const t = o.decode(e);
          this.version = parseInt(t.slice(0, 1).toString("hex"), 16), this.codec = c.getCodec(t.slice(1)), this.multihash = c.rmPrefix(t.slice(1)), this.multibaseName = n
        } else this.version = 0, this.codec = "dag-pb", this.multihash = r.fromB58String(e), this.multibaseName = "base58btc";
        return y.validateCID(this), void Object.defineProperty(this, "string", {value: e})
      }
      if (e instanceof Uint8Array) {
        const n = e.slice(0, 1), t = parseInt(n.toString("hex"), 16);
        if (1 === t) {
          const n = e;
          this.version = t, this.codec = c.getCodec(n.slice(1)), this.multihash = c.rmPrefix(n.slice(1)), this.multibaseName = "base32"
        } else this.version = 0, this.codec = "dag-pb", this.multihash = e, this.multibaseName = "base58btc";
        y.validateCID(this)
      } else this.version = e, "number" == typeof n && (n = w[n]), this.codec = n, this.multihash = t, this.multibaseName = l || (0 === e ? "base58btc" : "base32"), y.validateCID(this)
    }

    get bytes() {
      let e = this._bytes;
      if (!e) {
        if (0 === this.version) e = this.multihash; else {
          if (1 !== this.version) throw new Error("unsupported version");
          {
            const n = c.getCodeVarint(this.codec);
            e = f([[1], n, this.multihash], 1 + n.byteLength + this.multihash.byteLength)
          }
        }
        Object.defineProperty(this, "_bytes", {value: e})
      }
      return e
    }

    get prefix() {
      const e = c.getCodeVarint(this.codec), n = r.prefix(this.multihash);
      return f([[this.version], e, n], 1 + e.byteLength + n.byteLength)
    }

    get code() {
      return l[this.codec]
    }

    toV0() {
      if ("dag-pb" !== this.codec) throw new Error("Cannot convert a non dag-pb CID to CIDv0");
      const {name: e, length: n} = r.decode(this.multihash);
      if ("sha2-256" !== e) throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
      if (32 !== n) throw new Error("Cannot convert non 32 byte multihash CID to CIDv0");
      return new E(0, this.codec, this.multihash)
    }

    toV1() {
      return new E(1, this.codec, this.multihash)
    }

    toBaseEncodedString(base = this.multibaseName) {
      if (this.string && base === this.multibaseName) return this.string;
      let e = null;
      if (0 === this.version) {
        if ("base58btc" !== base) throw new Error("not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()");
        e = r.toB58String(this.multihash)
      } else {
        if (1 !== this.version) throw new Error("unsupported version");
        e = d(o.encode(base, this.bytes))
      }
      return base === this.multibaseName && Object.defineProperty(this, "string", {value: e}), e
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")"
    }

    toString(base) {
      return this.toBaseEncodedString(base)
    }

    toJSON() {
      return {codec: this.codec, version: this.version, hash: this.multihash}
    }

    equals(e) {
      return this.codec === e.codec && this.version === e.version && m(this.multihash, e.multihash)
    }

    static validateCID(e) {
      const n = k.checkCIDComponents(e);
      if (n) throw new Error(n)
    }
  }

  const E = h(y, {className: "CID", symbolName: "@ipld/js-cid/CID"});
  E.codecs = l, e.exports = E
}, function (e, n, t) {
  "use strict";
  const {encodeText: r} = t(795);
  e.exports = class {
    constructor(e, code, n, t) {
      this.name = e, this.code = code, this.codeBuf = r(this.code), this.alphabet = t, this.codec = n(t)
    }

    encode(e) {
      return this.codec.encode(e)
    }

    decode(e) {
      for (const n of e) if (this.alphabet && this.alphabet.indexOf(n) < 0) throw new Error(`invalid character '${n}' in '${e}'`);
      return this.codec.decode(e)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    rfc4648: e => n => ({
      encode: input => ((data, e, n) => {
        const t = "=" === e[e.length - 1], mask = (1 << n) - 1;
        let r = "", o = 0, c = 0;
        for (let i = 0; i < data.length; ++i) for (c = c << 8 | data[i], o += 8; o > n;) o -= n, r += e[mask & c >> o];
        if (o && (r += e[mask & c << n - o]), t) for (; r.length * n & 7;) r += "=";
        return r
      })(input, n, e), decode: input => ((e, n, t) => {
        const r = {};
        for (let i = 0; i < n.length; ++i) r[n[i]] = i;
        let o = e.length;
        for (; "=" === e[o - 1];) --o;
        const c = new Uint8Array(o * t / 8 | 0);
        let l = 0, k = 0, h = 0;
        for (let i = 0; i < o; ++i) {
          const n = r[e[i]];
          if (void 0 === n) throw new SyntaxError("Invalid character " + e[i]);
          k = k << t | n, l += t, l >= 8 && (l -= 8, c[h++] = 255 & k >> l)
        }
        if (l >= t || 255 & k << 8 - l) throw new SyntaxError("Unexpected end of data");
        return c
      })(input, n, e)
    })
  }
}, function (e, n, t) {
  e.exports = {encode: t(1088), decode: t(1089), encodingLength: t(1090)}
}, function (e, n) {
  e.exports = function e(n, r, o) {
    if (Number.MAX_SAFE_INTEGER && n > Number.MAX_SAFE_INTEGER) throw e.bytes = 0, new RangeError("Could not encode varint");
    r = r || [];
    var c = o = o || 0;
    for (; n >= t;) r[o++] = 255 & n | 128, n /= 128;
    for (; -128 & n;) r[o++] = 255 & n | 128, n >>>= 7;
    return r[o] = 0 | n, e.bytes = o - c + 1, r
  };
  var t = Math.pow(2, 31)
}, function (e, n) {
  e.exports = function e(n, t) {
    var b, r = 0, o = 0, c = t = t || 0, l = n.length;
    do {
      if (c >= l || o > 49) throw e.bytes = 0, new RangeError("Could not decode varint");
      b = n[c++], r += o < 28 ? (127 & b) << o : (127 & b) * Math.pow(2, o), o += 7
    } while (b >= 128);
    return e.bytes = c - t, r
  }
}, function (e, n) {
  var t = Math.pow(2, 7), r = Math.pow(2, 14), o = Math.pow(2, 21), c = Math.pow(2, 28), l = Math.pow(2, 35),
    k = Math.pow(2, 42), h = Math.pow(2, 49), f = Math.pow(2, 56), d = Math.pow(2, 63);
  e.exports = function (e) {
    return e < t ? 1 : e < r ? 2 : e < o ? 3 : e < c ? 4 : e < l ? 5 : e < k ? 6 : e < h ? 7 : e < f ? 8 : e < d ? 9 : 10
  }
}, function (e, n, t) {
  "use strict";
  const r = Object.freeze({
    identity: 0,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    "murmur3-128": 34,
    "murmur3-32": 35,
    "dbl-sha2-256": 86,
    md4: 212,
    md5: 213,
    bmt: 214,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082
  });
  e.exports = {names: r}
}, function (e, n, t) {
  "use strict";
  const r = t(761), o = new Map;
  for (const e in r) {
    const code = r[e];
    o.set(code, e)
  }
  e.exports = Object.freeze(o)
}, function (e, n, t) {
  "use strict";
  const r = t(761), o = t(860).varintEncode, c = {};
  for (const e in r) {
    const code = r[e];
    c[e] = o(code)
  }
  e.exports = Object.freeze(c)
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(794), {TextDecoder: o} = t(711), c = new o("utf8");
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.decode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.encode(e)
  }
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(794), {TextEncoder: o} = t(711), c = new o;
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.encode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.decode(e)
  }
}, function (e, n, t) {
  "use strict";
  e.exports = function (e, n) {
    n || (n = e.reduce((e, n) => e + n.length, 0));
    const output = new Uint8Array(n);
    let t = 0;
    for (const n of e) output.set(n, t), t += n.length;
    return output
  }
}, function (e, n, t) {
  "use strict";
  const table = t(761), r = {};
  for (const [e, code] of Object.entries(table)) r[e.toUpperCase().replace(/-/g, "_")] = code;
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const table = t(761), r = {};
  for (const [e, code] of Object.entries(table)) void 0 === r[code] && (r[code] = e);
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const r = t(857), o = {
    checkCIDComponents: function (e) {
      if (null == e) return "null values are not valid CIDs";
      if (0 !== e.version && 1 !== e.version) return "Invalid version, must be a number equal to 1 or 0";
      if ("string" != typeof e.codec) return "codec must be string";
      if (0 === e.version) {
        if ("dag-pb" !== e.codec) return "codec must be 'dag-pb' for CIDv0";
        if ("base58btc" !== e.multibaseName) return "multibaseName must be 'base58btc' for CIDv0"
      }
      if (!(e.multihash instanceof Uint8Array)) return "multihash must be a Uint8Array";
      try {
        r.validate(e.multihash)
      } catch (e) {
        let n = e.message;
        return n || (n = "Multihash validation failed"), n
      }
    }
  };
  e.exports = o
}, function (e, n, t) {
  "use strict";
  const r = t(846), o = t(758), c = t(856), l = t(710), k = t(753), h = t(708), f = t(735), d = t(709), m = t(734),
    w = t(730).default, y = t(776);
  e.exports = h((e, n) => {
    const t = {[y.DAG_PB]: o, [y.DAG_CBOR]: r, [y.RAW]: c}, h = n && n.ipld || {};
    return (h && h.formats || []).forEach(e => {
      t[e.codec] = e
    }), async (r, o = {}) => {
      if (o.cid && (o.format || o.hashAlg)) throw new Error("Failed to put DAG node. Provide either `cid` OR `format` and `hashAlg` options");
      if (o.format && !o.hashAlg || !o.format && o.hashAlg) throw new Error("Failed to put DAG node. Provide `format` AND `hashAlg` options");
      if (o.cid) {
        const e = new l(o.cid);
        delete (o = {...o, format: e.codec, hashAlg: k.decode(e.multihash).name}).cid
      }
      o = {format: "dag-cbor", hashAlg: "sha2-256", inputEnc: "raw", ...o};
      const c = y.getNumber(o.format);
      let h = t[c];
      if (!h && (n && n.ipld && n.ipld.loadFormat && (h = await n.ipld.loadFormat(o.format)), !h)) throw new Error("Format unsupported - please add support using the options.ipld.formats or options.ipld.loadFormat options");
      if (!h.util || !h.util.serialize) throw new Error("Format does not support utils.serialize function");
      const E = h.util.serialize(r), v = new w, x = m([v.signal, o.signal]),
        S = await e.post("dag/put", {timeout: o.timeout, signal: x, searchParams: d(o), ...await f(E, v, o.headers)}),
        data = await S.json();
      return new l(data.Cid["/"])
    }
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({
    get: t(1102)(e),
    put: t(1103)(e),
    findProvs: t(1104)(e),
    findPeer: t(1105)(e),
    provide: t(1106)(e),
    query: t(1107)(e)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709), {Value: c} = t(796), l = t(712), k = t(717);
  e.exports = r(e => async function (n, t = {}) {
    const r = await e.post("dht/get", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: o({arg: n instanceof Uint8Array ? l(n) : n, ...t}),
      headers: t.headers
    });
    for await(const e of r.ndjson()) if (e.Type === c) return k(e.Extra, "base64pad");
    throw new Error("not found")
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(723), c = t(714), l = t(708), k = t(709), h = t(735);
  e.exports = l(e => async function* (n, t, l = {}) {
    const f = await e.post("dht/put", {
      timeout: l.timeout,
      signal: l.signal,
      searchParams: k({arg: n, ...l}), ...await h(t, l.headers)
    });
    for await(let e of f.ndjson()) e = c(e), e.id = new r(e.id), e.responses && (e.responses = e.responses.map(({
                                                                                                                  ID: e,
                                                                                                                  Addrs: n
                                                                                                                }) => ({
      id: e,
      addrs: (n || []).map(a => o(a))
    }))), yield e
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(723), c = t(708), l = t(709), {Provider: k} = t(796);
  e.exports = c(e => async function* (n, t = {}) {
    const c = await e.post("dht/findprovs", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: l({arg: "" + new r(n), ...t}),
      headers: t.headers
    });
    for await(const e of c.ndjson()) if (e.Type === k && e.Responses) for (const {
      ID: n,
      Addrs: t
    } of e.Responses) yield{id: n, addrs: (t || []).map(a => o(a))}
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(723), c = t(708), l = t(709), {FinalPeer: k} = t(796);
  e.exports = c(e => async function (n, t = {}) {
    const c = await e.post("dht/findpeer", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: l({arg: "" + (n instanceof Uint8Array ? new r(n) : n), ...t}),
      headers: t.headers
    });
    for await(const data of c.ndjson()) if (data.Type === k && data.Responses) {
      const {ID: e, Addrs: n} = data.Responses[0];
      return {id: e, addrs: (n || []).map(a => o(a))}
    }
    throw new Error("not found")
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(723), c = t(714), l = t(708), k = t(709);
  e.exports = l(e => async function* (n, t = {}) {
    n = Array.isArray(n) ? n : [n];
    const l = await e.post("dht/provide", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: k({arg: n.map(e => new r(e).toString()), ...t}),
      headers: t.headers
    });
    for await(let e of l.ndjson()) e = c(e), e.id = new r(e.id), e.responses ? e.responses = e.responses.map(({
                                                                                                                ID: e,
                                                                                                                Addrs: n
                                                                                                              }) => ({
      id: e,
      addrs: (n || []).map(a => o(a))
    })) : e.responses = [], yield e
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(723), c = t(714), l = t(708), k = t(709);
  e.exports = l(e => async function* (n, t = {}) {
    const l = await e.post("dht/query", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: k({arg: new r(n), ...t}),
      headers: t.headers
    });
    for await(let e of l.ndjson()) e = c(e), e.id = new r(e.id), e.responses = (e.responses || []).map(({
                                                                                                          ID: e,
                                                                                                          Addrs: n
                                                                                                        }) => ({
      id: e,
      addrs: (n || []).map(a => o(a))
    })), yield e
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({net: t(1109)(e), sys: t(1110)(e), cmds: t(1111)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => (await e.post("diag/net", {
    timeout: n.timeout,
    signal: n.signal,
    searchParams: o(n),
    headers: n.headers
  })).json())
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => (await e.post("diag/sys", {
    timeout: n.timeout,
    signal: n.signal,
    searchParams: o(n),
    headers: n.headers
  })).json())
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => (await e.post("diag/cmds", {
    timeout: n.timeout,
    signal: n.signal,
    searchParams: o(n),
    headers: n.headers
  })).json())
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n, t = {}) => {
    const r = await e.post("dns", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: o({arg: n, ...t}),
      headers: t.headers
    });
    return (await r.json()).Path
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({
    chmod: t(1114)(e),
    cp: t(1115)(e),
    flush: t(1116)(e),
    ls: t(1117)(e),
    mkdir: t(1118)(e),
    mv: t(1119)(e),
    read: t(1120)(e),
    rm: t(1122)(e),
    stat: t(1123)(e),
    touch: t(1124)(e),
    write: t(1125)(e)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async function (path, n, t = {}) {
    const r = await e.post("files/chmod", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: o({arg: path, mode: n, ...t}),
      headers: t.headers
    });
    await r.text()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), {findSources: o} = t(797), c = t(708), l = t(709);
  e.exports = c(e => async (...n) => {
    const {sources: t, options: c} = o(n), k = await e.post("files/cp", {
      timeout: c.timeout,
      signal: c.signal,
      searchParams: l({arg: t.map(e => r.isCID(e) ? "/ipfs/" + e : e), ...c}),
      headers: c.headers
    });
    await k.text()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async (path, n = {}) => {
    if (!path || "string" != typeof path) throw new Error("ipfs.files.flush requires a path");
    const t = await e.post("files/flush", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c({arg: path, ...n}),
      headers: n.headers
    }), data = await t.json();
    return new r(data.Cid)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(862), c = t(708), l = t(709);

  function k(e) {
    return e.hash && (e.cid = new r(e.hash)), delete e.hash, e
  }

  e.exports = c(e => async function* (path, n = {}) {
    if (!path || "string" != typeof path) throw new Error("ipfs.files.ls requires a path");
    const t = await e.post("files/ls", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: l({arg: r.isCID(path) ? "/ipfs/" + path : path, long: !0, ...n, stream: !0}),
      headers: n.headers
    });
    for await(const e of t.ndjson()) if ("Entries" in e) for (const n of e.Entries || []) yield k(o(n)); else yield k(o(e))
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (path, n = {}) => {
    const t = await e.post("files/mkdir", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: o({arg: path, ...n}),
      headers: n.headers
    });
    await t.text()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), {findSources: o} = t(797), c = t(708), l = t(709);
  e.exports = c(e => async (...n) => {
    const {sources: t, options: c} = o(n), k = await e.post("files/mv", {
      timeout: c.timeout,
      signal: c.signal,
      searchParams: l({arg: t.map(e => r.isCID(e) ? "/ipfs/" + e : e), ...c}),
      headers: c.headers
    });
    await k.text()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(1121), o = t(708), c = t(709);
  e.exports = o(e => async function* (path, n = {}) {
    const t = await e.post("files/read", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c({arg: path, count: n.count || n.length, ...n}),
      headers: n.headers
    });
    yield* r(t.body)
  })
}, function (e, n) {
  e.exports = e => {
    if (e[Symbol.asyncIterator]) return e;
    if (e.getReader) return async function* () {
      const n = e.getReader();
      try {
        for (; ;) {
          const {done: e, value: t} = await n.read();
          if (e) return;
          yield t
        }
      } finally {
        n.releaseLock()
      }
    }();
    throw new Error("unknown stream")
  }
}, function (e, n, t) {
  "use strict";
  const r = t(708), {findSources: o} = t(797), c = t(709);
  e.exports = r(e => async (...n) => {
    const {sources: t, options: r} = o(n), l = await e.post("files/rm", {
      timeout: r.timeout,
      signal: r.signal,
      searchParams: c({arg: t, ...r}),
      headers: r.headers
    });
    await l.text()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(862), c = t(708), l = t(709);
  e.exports = c(e => async (path, n = {}) => {
    "string" != typeof path && (n = path || {}, path = "/");
    const t = await e.post("files/stat", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: l({arg: path, ...n}),
      headers: n.headers
    }), data = await t.json();
    return data.WithLocality = data.WithLocality || !1, (c = o(data)).cid = new r(c.hash), delete c.hash, c;
    var c
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async function (path, n = {}) {
    const t = await e.post("files/touch", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: o({arg: path, ...n}),
      headers: n.headers
    });
    await t.text()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(781), o = t(782), c = t(708), l = t(735), k = t(709), h = t(734), f = t(730).default;
  e.exports = c(e => async (path, input, n = {}) => {
    const t = new f, c = h([t.signal, n.signal]), d = await e.post("files/write", {
      timeout: n.timeout,
      signal: c,
      searchParams: k({arg: path, streamChannels: !0, count: n.count || n.length, ...n}), ...await l({
        content: input,
        path: "arg",
        mode: r(n.mode),
        mtime: o(n.mtime)
      }, t, n.headers)
    });
    await d.text()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(1127), o = t(710), c = t(708), l = t(709), map = t(825);
  e.exports = c(e => async function* (path, n = {}) {
    const t = await e.post("get", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: l({arg: "" + (path instanceof Uint8Array ? new o(path) : path), ...n}),
      headers: n.headers
    }), c = r.extract();
    for await(const {
      header: header,
      body: body
    } of c(t.iterator())) "directory" === header.type ? yield{path: header.name} : yield{
      path: header.name,
      content: map(body, e => e.slice())
    }
  })
}, function (e, n, t) {
  n.extract = t(1128), n.pack = t(1133)
}, function (e, n, t) {
  const r = t(1129), o = t(1130), c = t(1131);

  async function l(e, n) {
    const t = function (e) {
      return (e &= 511) && 512 - e
    }(n);
    t && await e.next(t)
  }

  e.exports = e => ((e = e || {}).highWaterMark = e.highWaterMark || 16384, source => async function* () {
    const n = c(source);
    let t, k, h, f;
    try {
      for (; ;) {
        let c;
        try {
          const {done: e, value: t} = await n.next(512);
          if (e) return;
          c = t
        } catch (e) {
          if ("ERR_UNDER_READ" === e.code) return;
          throw e
        }
        const header = o.decode(c, e.filenameEncoding);
        if (!header) continue;
        if ("gnu-long-path" === header.type) {
          const {done: r, value: c} = await n.next(header.size);
          if (r) return;
          t = o.decodeLongPath(c, e.filenameEncoding), await l(n, header.size);
          continue
        }
        if ("gnu-long-link-path" === header.type) {
          const {done: t, value: r} = await n.next(header.size);
          if (t) return;
          k = o.decodeLongPath(r, e.filenameEncoding), await l(n, header.size);
          continue
        }
        if ("pax-global-header" === header.type) {
          const {done: t, value: r} = await n.next(header.size);
          if (t) return;
          h = o.decodePax(r, e.filenameEncoding), await l(n, header.size);
          continue
        }
        if ("pax-header" === header.type) {
          const {done: t, value: r} = await n.next(header.size);
          if (t) return;
          f = o.decodePax(r, e.filenameEncoding), h && (f = {...h, ...f}), await l(n, header.size);
          continue
        }
        if (t && (header.name = t, t = null), k && (header.linkname = k, k = null), f && (f.path && (header.name = f.path), f.linkpath && (header.linkname = f.linkpath), f.size && (header.size = parseInt(f.size, 10)), header.pax = f, f = null), !header.size || "directory" === header.type) {
          yield{
            header: header, body: async function* () {
            }()
          };
          continue
        }
        let d = header.size;
        const m = r(), w = await n.nextLte(Math.min(d, e.highWaterMark));
        d -= w.value.length, d || m.resolve();
        const body = async function* () {
          try {
            for (yield w.value; d;) {
              const {done: e, value: t} = await n.nextLte(d);
              if (e) return void (d = 0);
              d -= t.length, yield t
            }
          } finally {
            m.resolve()
          }
        }();
        if (yield{header: header, body: body}, await m.promise, d) for await(const e of body) ;
        await l(n, header.size)
      }
    } finally {
      await n.return()
    }
  }())
}, function (e, n, t) {
  "use strict";
  e.exports = () => {
    const e = {};
    return e.promise = new Promise((n, t) => {
      e.resolve = n, e.reject = t
    }), e
  }
}, function (e, n, t) {
  const {Buffer: r} = t(2), o = t(762);
  var c = "0".charCodeAt(0), l = r.from("ustar\0", "binary"), k = r.from("ustar ", "binary"),
    h = r.from(" \0", "binary"), f = function (e, n, t, r) {
      for (; t < r; t++) if (e.get(t) === n) return t;
      return r
    };
  var d = function (e, n, t) {
    if (e = e.shallowSlice(n, n + t), n = 0, 128 & e.get(n)) return function (e) {
      var n;
      if (128 === e.get(0)) n = !0; else {
        if (255 !== e.get(0)) return null;
        n = !1
      }
      for (var t = !1, r = [], i = e.length - 1; i > 0; i--) {
        var o = e.get(i);
        n ? r.push(o) : t && 0 === o ? r.push(0) : t ? (t = !1, r.push(256 - o)) : r.push(255 - o)
      }
      var c = 0, l = r.length;
      for (i = 0; i < l; i++) c += r[i] * Math.pow(256, i);
      return n ? c : -1 * c
    }(e);
    for (; n < e.length && 32 === e.get(n);) n++;
    for (var r = (o = f(e, 32, n, e.length), c = e.length, l = e.length, "number" != typeof o ? l : (o = ~~o) >= c ? c : o >= 0 || (o += c) >= 0 ? o : 0); n < r && 0 === e.get(n);) n++;
    return r === n ? 0 : parseInt(e.shallowSlice(n, r).toString(), 8);
    var o, c, l
  }, m = function (e, n, t, r) {
    return e.shallowSlice(n, f(e, 0, n, n + t)).toString(r)
  };
  n.decodeLongPath = function (e, n) {
    return e = o.isBufferList(e) ? e : new o(e), m(e, 0, e.length, n)
  }, n.decodePax = function (e) {
    e = o.isBufferList(e) ? e : new o(e);
    for (var n = {}; e.length;) {
      for (var i = 0; i < e.length && 32 !== e.get(i);) i++;
      var t = parseInt(e.shallowSlice(0, i).toString(), 10);
      if (!t) return n;
      var b = e.shallowSlice(i + 1, t - 1).toString(), r = b.indexOf("=");
      if (-1 === r) return n;
      n[b.slice(0, r)] = b.slice(r + 1), e = e.shallowSlice(t)
    }
    return n
  }, n.decode = function (e, n) {
    var t = 0 === (e = o.isBufferList(e) ? e : new o(e)).get(156) ? 0 : e.get(156) - c, r = m(e, 0, 100, n),
      f = d(e, 100, 8), w = d(e, 108, 8), y = d(e, 116, 8), E = d(e, 124, 12), v = d(e, 136, 12), x = function (e) {
        switch (e) {
          case 0:
            return "file";
          case 1:
            return "link";
          case 2:
            return "symlink";
          case 3:
            return "character-device";
          case 4:
            return "block-device";
          case 5:
            return "directory";
          case 6:
            return "fifo";
          case 7:
            return "contiguous-file";
          case 72:
            return "pax-header";
          case 55:
            return "pax-global-header";
          case 27:
            return "gnu-long-link-path";
          case 28:
          case 30:
            return "gnu-long-path"
        }
        return null
      }(t), S = 0 === e.get(157) ? null : m(e, 157, 100, n), A = m(e, 265, 32), _ = m(e, 297, 32), N = d(e, 329, 8),
      I = d(e, 337, 8), C = function (e) {
        for (var n = 256, i = 0; i < 148; i++) n += e.get(i);
        for (var t = 156; t < 512; t++) n += e.get(t);
        return n
      }(e);
    if (256 === C) return null;
    if (C !== d(e, 148, 8)) throw new Error("Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
    if (0 === l.compare(e.slice(257, 263))) e.get(345) && (r = m(e, 345, 155, n) + "/" + r); else if (0 !== k.compare(e.slice(257, 263)) || 0 !== h.compare(e.slice(263, 265))) throw new Error("Invalid tar header: unknown format.");
    return 0 === t && r && "/" === r[r.length - 1] && (t = 5), {
      name: r,
      mode: f,
      uid: w,
      gid: y,
      size: E,
      mtime: new Date(1e3 * v),
      type: x,
      linkname: S,
      uname: A,
      gname: _,
      devmajor: N,
      devminor: I
    }
  }
}, function (e, n, t) {
  const r = t(762), o = t(1132);
  e.exports = function (source) {
    const e = o(source);
    let n;
    const t = {
      [Symbol.asyncIterator]: () => t, async next(t) {
        if (n) {
          let o;
          if (null == t || n.length === t) o = n, n = null; else if (n.length > t) o = n.shallowSlice(0, t), n = n.shallowSlice(t); else if (n.length < t) {
            const {value: c, done: l} = await e.next(t - n.length);
            if (l) throw Object.assign(new Error(`stream ended before ${t - n.length} bytes became available`), {code: "ERR_UNDER_READ"});
            o = new r([n, c]), n = null
          }
          return {value: o}
        }
        return e.next(t)
      }, async nextLte(e) {
        let {done: o, value: c} = await t.next();
        return o ? {done: o} : c.length <= e ? {value: c} : (c = r.isBufferList(c) ? c : new r(c), n ? n.append(c.shallowSlice(e)) : n = c.shallowSlice(e), {value: c.shallowSlice(0, e)})
      }, return: () => e.return()
    };
    return t
  }
}, function (e, n, t) {
  const r = t(762);
  e.exports = source => {
    const e = async function* () {
      let e = yield, n = new r;
      for await(const t of source) if (e) for (n.append(t); n.length >= e;) {
        const data = n.shallowSlice(0, e);
        if (n.consume(e), e = yield data, !e) {
          n.length && (e = yield n, n = new r);
          break
        }
      } else e = yield n.append(t), n = new r;
      if (e) throw Object.assign(new Error(`stream ended before ${e} bytes became available`), {
        code: "ERR_UNDER_READ",
        buffer: n
      })
    }();
    return e.next(), e
  }
}, function (e, n, t) {
  const {Buffer: r} = t(2), o = t(762), {
    S_IFMT: c,
    S_IFBLK: l,
    S_IFCHR: k,
    S_IFDIR: h,
    S_IFIFO: f,
    S_IFLNK: d
  } = t(1134), m = t(1135), w = t(1136), y = parseInt("755", 8), E = parseInt("644", 8), v = r.alloc(1024);

  function x(e) {
    switch (e & c) {
      case l:
        return "block-device";
      case k:
        return "character-device";
      case h:
        return "directory";
      case f:
        return "fifo";
      case d:
        return "symlink"
    }
    return "file"
  }

  function S(e) {
    if (e &= 511) return new o(v.slice(0, 512 - e))
  }

  function A(header) {
    if (!header.pax) {
      const e = w.encode(header);
      if (e) return e
    }
    return function (header) {
      const e = w.encodePax({name: header.name, linkname: header.linkname, pax: header.pax}), n = {
        name: "PaxHeader",
        mode: header.mode,
        uid: header.uid,
        gid: header.gid,
        size: e.length,
        mtime: header.mtime,
        type: "pax-header",
        linkname: header.linkname && "PaxHeader",
        uname: header.uname,
        gname: header.gname,
        devmajor: header.devmajor,
        devminor: header.devminor
      };
      return new o([w.encode(n), e, S(e.length), w.encode({...n, size: header.size, type: header.type})])
    }(header)
  }

  e.exports = () => async function* (source) {
    for await(let {header: header, body: body} of source) {
      if (header.size && "symlink" !== header.type || (header.size = 0), header.type || (header.type = x(header.mode)), header.mode || (header.mode = "directory" === header.type ? y : E), header.uid || (header.uid = 0), header.gid || (header.gid = 0), header.mtime || (header.mtime = new Date), "string" == typeof body && (body = r.from(body)), r.isBuffer(body) || o.isBufferList(body)) {
        header.size = body.length, yield new o([A(header), body, S(header.size)]);
        continue
      }
      if ("symlink" === header.type && !header.linkname) {
        header.linkname = (await m(body)).toString(), yield A(header);
        continue
      }
      if (yield A(header), "file" !== header.type && "contiguous-file" !== header.type) continue;
      let e = 0;
      for await(const n of body) e += n.length, yield o.isBufferList(n) ? n : new o(n);
      if (e !== header.size) throw new Error("size mismatch");
      const n = S(header.size);
      n && (yield n)
    }
    yield new o(v)
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    RTLD_LAZY: 1,
    RTLD_NOW: 2,
    RTLD_GLOBAL: 8,
    RTLD_LOCAL: 4,
    E2BIG: 7,
    EACCES: 13,
    EADDRINUSE: 48,
    EADDRNOTAVAIL: 49,
    EAFNOSUPPORT: 47,
    EAGAIN: 35,
    EALREADY: 37,
    EBADF: 9,
    EBADMSG: 94,
    EBUSY: 16,
    ECANCELED: 89,
    ECHILD: 10,
    ECONNABORTED: 53,
    ECONNREFUSED: 61,
    ECONNRESET: 54,
    EDEADLK: 11,
    EDESTADDRREQ: 39,
    EDOM: 33,
    EDQUOT: 69,
    EEXIST: 17,
    EFAULT: 14,
    EFBIG: 27,
    EHOSTUNREACH: 65,
    EIDRM: 90,
    EILSEQ: 92,
    EINPROGRESS: 36,
    EINTR: 4,
    EINVAL: 22,
    EIO: 5,
    EISCONN: 56,
    EISDIR: 21,
    ELOOP: 62,
    EMFILE: 24,
    EMLINK: 31,
    EMSGSIZE: 40,
    EMULTIHOP: 95,
    ENAMETOOLONG: 63,
    ENETDOWN: 50,
    ENETRESET: 52,
    ENETUNREACH: 51,
    ENFILE: 23,
    ENOBUFS: 55,
    ENODATA: 96,
    ENODEV: 19,
    ENOENT: 2,
    ENOEXEC: 8,
    ENOLCK: 77,
    ENOLINK: 97,
    ENOMEM: 12,
    ENOMSG: 91,
    ENOPROTOOPT: 42,
    ENOSPC: 28,
    ENOSR: 98,
    ENOSTR: 99,
    ENOSYS: 78,
    ENOTCONN: 57,
    ENOTDIR: 20,
    ENOTEMPTY: 66,
    ENOTSOCK: 38,
    ENOTSUP: 45,
    ENOTTY: 25,
    ENXIO: 6,
    EOPNOTSUPP: 102,
    EOVERFLOW: 84,
    EPERM: 1,
    EPIPE: 32,
    EPROTO: 100,
    EPROTONOSUPPORT: 43,
    EPROTOTYPE: 41,
    ERANGE: 34,
    EROFS: 30,
    ESPIPE: 29,
    ESRCH: 3,
    ESTALE: 70,
    ETIME: 101,
    ETIMEDOUT: 60,
    ETXTBSY: 26,
    EWOULDBLOCK: 35,
    EXDEV: 18,
    PRIORITY_LOW: 19,
    PRIORITY_BELOW_NORMAL: 10,
    PRIORITY_NORMAL: 0,
    PRIORITY_ABOVE_NORMAL: -7,
    PRIORITY_HIGH: -14,
    PRIORITY_HIGHEST: -20,
    SIGHUP: 1,
    SIGINT: 2,
    SIGQUIT: 3,
    SIGILL: 4,
    SIGTRAP: 5,
    SIGABRT: 6,
    SIGIOT: 6,
    SIGBUS: 10,
    SIGFPE: 8,
    SIGKILL: 9,
    SIGUSR1: 30,
    SIGSEGV: 11,
    SIGUSR2: 31,
    SIGPIPE: 13,
    SIGALRM: 14,
    SIGTERM: 15,
    SIGCHLD: 20,
    SIGCONT: 19,
    SIGSTOP: 17,
    SIGTSTP: 18,
    SIGTTIN: 21,
    SIGTTOU: 22,
    SIGURG: 16,
    SIGXCPU: 24,
    SIGXFSZ: 25,
    SIGVTALRM: 26,
    SIGPROF: 27,
    SIGWINCH: 28,
    SIGIO: 23,
    SIGINFO: 29,
    SIGSYS: 12,
    UV_FS_SYMLINK_DIR: 1,
    UV_FS_SYMLINK_JUNCTION: 2,
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    UV_DIRENT_UNKNOWN: 0,
    UV_DIRENT_FILE: 1,
    UV_DIRENT_DIR: 2,
    UV_DIRENT_LINK: 3,
    UV_DIRENT_FIFO: 4,
    UV_DIRENT_SOCKET: 5,
    UV_DIRENT_CHAR: 6,
    UV_DIRENT_BLOCK: 7,
    S_IFMT: 61440,
    S_IFREG: 32768,
    S_IFDIR: 16384,
    S_IFCHR: 8192,
    S_IFBLK: 24576,
    S_IFIFO: 4096,
    S_IFLNK: 40960,
    S_IFSOCK: 49152,
    O_CREAT: 512,
    O_EXCL: 2048,
    UV_FS_O_FILEMAP: 0,
    O_NOCTTY: 131072,
    O_TRUNC: 1024,
    O_APPEND: 8,
    O_DIRECTORY: 1048576,
    O_NOFOLLOW: 256,
    O_SYNC: 128,
    O_DSYNC: 4194304,
    O_SYMLINK: 2097152,
    O_NONBLOCK: 4,
    S_IRWXU: 448,
    S_IRUSR: 256,
    S_IWUSR: 128,
    S_IXUSR: 64,
    S_IRWXG: 56,
    S_IRGRP: 32,
    S_IWGRP: 16,
    S_IXGRP: 8,
    S_IRWXO: 7,
    S_IROTH: 4,
    S_IWOTH: 2,
    S_IXOTH: 1,
    F_OK: 0,
    R_OK: 4,
    W_OK: 2,
    X_OK: 1,
    UV_FS_COPYFILE_EXCL: 1,
    COPYFILE_EXCL: 1,
    UV_FS_COPYFILE_FICLONE: 2,
    COPYFILE_FICLONE: 2,
    UV_FS_COPYFILE_FICLONE_FORCE: 4,
    COPYFILE_FICLONE_FORCE: 4,
    OPENSSL_VERSION_NUMBER: 269488255,
    SSL_OP_ALL: 2147485780,
    SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: 262144,
    SSL_OP_CIPHER_SERVER_PREFERENCE: 4194304,
    SSL_OP_CISCO_ANYCONNECT: 32768,
    SSL_OP_COOKIE_EXCHANGE: 8192,
    SSL_OP_CRYPTOPRO_TLSEXT_BUG: 2147483648,
    SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS: 2048,
    SSL_OP_EPHEMERAL_RSA: 0,
    SSL_OP_LEGACY_SERVER_CONNECT: 4,
    SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER: 0,
    SSL_OP_MICROSOFT_SESS_ID_BUG: 0,
    SSL_OP_MSIE_SSLV2_RSA_PADDING: 0,
    SSL_OP_NETSCAPE_CA_DN_BUG: 0,
    SSL_OP_NETSCAPE_CHALLENGE_BUG: 0,
    SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG: 0,
    SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG: 0,
    SSL_OP_NO_COMPRESSION: 131072,
    SSL_OP_NO_QUERY_MTU: 4096,
    SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION: 65536,
    SSL_OP_NO_SSLv2: 0,
    SSL_OP_NO_SSLv3: 33554432,
    SSL_OP_NO_TICKET: 16384,
    SSL_OP_NO_TLSv1: 67108864,
    SSL_OP_NO_TLSv1_1: 268435456,
    SSL_OP_NO_TLSv1_2: 134217728,
    SSL_OP_PKCS1_CHECK_1: 0,
    SSL_OP_PKCS1_CHECK_2: 0,
    SSL_OP_SINGLE_DH_USE: 0,
    SSL_OP_SINGLE_ECDH_USE: 0,
    SSL_OP_SSLEAY_080_CLIENT_DH_BUG: 0,
    SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG: 0,
    SSL_OP_TLS_BLOCK_PADDING_BUG: 0,
    SSL_OP_TLS_D5_BUG: 0,
    SSL_OP_TLS_ROLLBACK_BUG: 8388608,
    ENGINE_METHOD_RSA: 1,
    ENGINE_METHOD_DSA: 2,
    ENGINE_METHOD_DH: 4,
    ENGINE_METHOD_RAND: 8,
    ENGINE_METHOD_EC: 2048,
    ENGINE_METHOD_CIPHERS: 64,
    ENGINE_METHOD_DIGESTS: 128,
    ENGINE_METHOD_PKEY_METHS: 512,
    ENGINE_METHOD_PKEY_ASN1_METHS: 1024,
    ENGINE_METHOD_ALL: 65535,
    ENGINE_METHOD_NONE: 0,
    DH_CHECK_P_NOT_SAFE_PRIME: 2,
    DH_CHECK_P_NOT_PRIME: 1,
    DH_UNABLE_TO_CHECK_GENERATOR: 4,
    DH_NOT_SUITABLE_GENERATOR: 8,
    ALPN_ENABLED: 1,
    RSA_PKCS1_PADDING: 1,
    RSA_SSLV23_PADDING: 2,
    RSA_NO_PADDING: 3,
    RSA_PKCS1_OAEP_PADDING: 4,
    RSA_X931_PADDING: 5,
    RSA_PKCS1_PSS_PADDING: 6,
    RSA_PSS_SALTLEN_DIGEST: -1,
    RSA_PSS_SALTLEN_MAX_SIGN: -2,
    RSA_PSS_SALTLEN_AUTO: -2,
    defaultCoreCipherList: "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA",
    TLS1_VERSION: 769,
    TLS1_1_VERSION: 770,
    TLS1_2_VERSION: 771,
    TLS1_3_VERSION: 772,
    POINT_CONVERSION_COMPRESSED: 2,
    POINT_CONVERSION_UNCOMPRESSED: 4,
    POINT_CONVERSION_HYBRID: 6
  }
}, function (e, n, t) {
  const r = t(762), o = {string: () => "", buffer: () => r()};
  e.exports = async (source, e) => {
    if ((e = e || {}).type && !o[e.type]) throw new Error(`invalid type "${e.type}"`);
    let n, t;
    for await(const r of source) n || (t = e.type || "string" == typeof r ? "string" : "buffer", n = o[t]()), "string" === t ? n += r : n.append(r);
    return n || o[e.type || "buffer"]()
  }
}, function (e, n, t) {
  const {Buffer: r} = t(2);
  var o = r.alloc, c = "0".charCodeAt(0), l = r.from("ustar\0", "binary"), k = r.from("00", "binary"),
    h = parseInt("7777", 8), f = function (e, n) {
      return (e = e.toString(8)).length > n ? "7777777777777777777".slice(0, n) + " " : "0000000000000000000".slice(0, n - e.length) + e + " "
    }, d = function (e) {
      var n = r.byteLength(e), t = Math.floor(Math.log(n) / Math.log(10)) + 1;
      return n + t >= Math.pow(10, t) && t++, n + t + e
    };
  n.encodePax = function (e) {
    var n = "";
    e.name && (n += d(" path=" + e.name + "\n")), e.linkname && (n += d(" linkpath=" + e.linkname + "\n"));
    var t = e.pax;
    if (t) for (var o in t) n += d(" " + o + "=" + t[o] + "\n");
    return r.from(n)
  }, n.encode = function (e) {
    var n = o(512), t = e.name, d = "";
    if (5 === e.typeflag && "/" !== t[t.length - 1] && (t += "/"), r.byteLength(t) !== t.length) return null;
    for (; r.byteLength(t) > 100;) {
      var i = t.indexOf("/");
      if (-1 === i) return null;
      d += d ? "/" + t.slice(0, i) : t.slice(0, i), t = t.slice(i + 1)
    }
    return r.byteLength(t) > 100 || r.byteLength(d) > 155 || e.linkname && r.byteLength(e.linkname) > 100 ? null : (n.write(t), n.write(f(e.mode & h, 6), 100), n.write(f(e.uid, 6), 108), n.write(f(e.gid, 6), 116), n.write(f(e.size, 11), 124), n.write(f(e.mtime.getTime() / 1e3 | 0, 11), 136), n[156] = c + function (e) {
      switch (e) {
        case"file":
          return 0;
        case"link":
          return 1;
        case"symlink":
          return 2;
        case"character-device":
          return 3;
        case"block-device":
          return 4;
        case"directory":
          return 5;
        case"fifo":
          return 6;
        case"contiguous-file":
          return 7;
        case"pax-header":
          return 72
      }
      return 0
    }(e.type), e.linkname && n.write(e.linkname, 157), l.copy(n, 257), k.copy(n, 263), e.uname && n.write(e.uname, 265), e.gname && n.write(e.gname, 297), n.write(f(e.devmajor || 0, 6), 329), n.write(f(e.devminor || 0, 6), 337), d && n.write(d, 345), n.write(f(function (e) {
      for (var n = 256, i = 0; i < 148; i++) n += e[i];
      for (var t = 156; t < 512; t++) n += e[t];
      return n
    }(n), 6), 148), n)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(708);
  e.exports = r(e => () => {
    const n = new URL(e.opts.base);
    return {host: n.hostname, port: n.port, protocol: n.protocol, pathname: n.pathname, "api-path": n.pathname}
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(723), c = t(708), l = t(709);
  e.exports = c(e => async function (n = {}) {
    const t = await e.post("id", {timeout: n.timeout, signal: n.signal, searchParams: l(n), headers: n.headers}),
      data = await t.json(), output = r(data);
    return output.addresses && (output.addresses = output.addresses.map(e => o(e))), output
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({gen: t(1140)(e), list: t(1141)(e), rename: t(1142)(e), rm: t(1143)(e), import: t(1144)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (n, t = {}) => {
    const o = await e.post("key/gen", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({arg: n, ...t}),
      headers: t.headers
    }), data = await o.json();
    return r(data)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (n = {}) => {
    const t = await e.post("key/list", {timeout: n.timeout, signal: n.signal, searchParams: c(n), headers: n.headers});
    return ((await t.json()).Keys || []).map(e => r(e))
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (n, t, o = {}) => {
    const l = await e.post("key/rename", {
      timeout: o.timeout,
      signal: o.signal,
      searchParams: c({arg: [n, t], ...o}),
      headers: o.headers
    });
    return r(await l.json())
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (n, t = {}) => {
    const o = await e.post("key/rm", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({arg: n, ...t}),
      headers: t.headers
    }), data = await o.json();
    return r(data.Keys[0])
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (n, t, o, l = {}) => {
    "string" != typeof o && (l = o || {}, o = null);
    const k = await e.post("key/import", {
      timeout: l.timeout,
      signal: l.signal,
      searchParams: c({arg: n, pem: t, password: o, ...l}),
      headers: l.headers
    }), data = await k.json();
    return r(data)
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({tail: t(1146)(e), ls: t(1147)(e), level: t(1148)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async function* (n = {}) {
    const t = await e.post("log/tail", {timeout: n.timeout, signal: n.signal, searchParams: o(n), headers: n.headers});
    yield* t.ndjson()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => {
    const t = await e.post("log/ls", {timeout: n.timeout, signal: n.signal, searchParams: o(n), headers: n.headers});
    return (await t.json()).Strings
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (n, t, o = {}) => {
    const l = await e.post("log/level", {
      timeout: o.timeout,
      signal: o.signal,
      searchParams: c({arg: [n, t], ...o}),
      headers: o.headers
    });
    return r(await l.json())
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);

  function l(link) {
    switch (link.Type) {
      case 1:
      case 5:
        return "dir";
      case 2:
        return "file";
      default:
        return "unknown"
    }
  }

  e.exports = o(e => async function* (path, n = {}) {
    const t = await e.post("ls", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c({arg: "" + (path instanceof Uint8Array ? new r(path) : path), ...n}),
      headers: n.headers
    });
    for await(let e of t.ndjson()) {
      if (e = e.Objects, !e) throw new Error("expected .Objects in results");
      if (e = e[0], !e) throw new Error("expected one array in results.Objects");
      if (e = e.Links, !Array.isArray(e)) throw new Error("expected one array in results.Objects[0].Links");
      for (const link of e) {
        const e = {
          name: link.Name,
          path: path + "/" + link.Name,
          size: link.Size,
          cid: new r(link.Hash),
          type: l(link),
          depth: link.Depth || 1
        };
        link.Mode && (e.mode = parseInt(link.Mode, 8)), void 0 !== link.Mtime && null !== link.Mtime && (e.mtime = {secs: link.Mtime}, void 0 !== link.MtimeNsecs && null !== link.MtimeNsecs && (e.mtime.nsecs = link.MtimeNsecs)), yield e
      }
    }
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (n = {}) => {
    const t = await e.post("dns", {timeout: n.timeout, signal: n.signal, searchParams: c(n), headers: n.headers});
    return r(await t.json())
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({publish: t(1152)(e), resolve: t(1153)(e), pubsub: t(1154)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (path, n = {}) => {
    const t = await e.post("name/publish", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c({arg: path, ...n}),
      headers: n.headers
    });
    return r(await t.json())
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async function* (path, n = {}) {
    const t = await e.post("name/resolve", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: o({arg: path, stream: !0, ...n}),
      headers: n.headers
    });
    for await(const e of t.ndjson()) yield e.Path
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({cancel: t(1155)(e), state: t(1156)(e), subs: t(1157)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (n, t = {}) => {
    const o = await e.post("name/pubsub/cancel", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({arg: n, ...t}),
      headers: t.headers
    });
    return r(await o.json())
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async (n = {}) => {
    const t = await e.post("name/pubsub/state", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c(n),
      headers: n.headers
    });
    return r(await t.json())
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => {
    const t = await e.post("name/pubsub/subs", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: o(n),
      headers: n.headers
    });
    return (await t.json()).Strings || []
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({
    data: t(1159)(e),
    get: t(1160)(e),
    links: t(1161)(e),
    new: t(1162)(e),
    patch: t(1163)(e),
    put: t(1168)(e),
    stat: t(1169)(e)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async function (n, t = {}) {
    const o = await e.post("object/data", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({arg: "" + (n instanceof Uint8Array ? new r(n) : n), ...t}),
      headers: t.headers
    }), data = await o.arrayBuffer();
    return new Uint8Array(data, data.byteOffset, data.byteLength)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), {DAGNode: o, DAGLink: c} = t(758), l = t(708), k = t(709), h = t(717);
  e.exports = l(e => async (n, t = {}) => {
    const l = await e.post("object/get", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: k({arg: "" + (n instanceof Uint8Array ? new r(n) : n), dataEncoding: "base64", ...t}),
      headers: t.headers
    }), data = await l.json();
    return new o(h(data.Data, "base64pad"), (data.Links || []).map(e => new c(e.Name, e.Size, e.Hash)))
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), {DAGLink: o} = t(758), c = t(708), l = t(709);
  e.exports = c(e => async (n, t = {}) => {
    const c = await e.post("object/links", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: l({arg: "" + (n instanceof Uint8Array ? new r(n) : n), ...t}),
      headers: t.headers
    });
    return ((await c.json()).Links || []).map(e => new o(e.Name, e.Size, e.Hash))
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async (n = {}) => {
    const t = await e.post("object/new", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c({arg: n.template, ...n}),
      headers: n.headers
    }), {Hash: o} = await t.json();
    return new r(o)
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({addLink: t(1164)(e), appendData: t(1165)(e), rmLink: t(1166)(e), setData: t(1167)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async (n, t, o = {}) => {
    const l = await e.post("object/patch/add-link", {
      timeout: o.timeout,
      signal: o.signal,
      searchParams: c({arg: ["" + (n instanceof Uint8Array ? new r(n) : n), t.Name || t.name || "", (t.Hash || t.cid || "").toString() || null], ...o}),
      headers: o.headers
    }), {Hash: k} = await l.json();
    return new r(k)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(735), c = t(708), l = t(709), k = t(734), h = t(730).default;
  e.exports = c(e => async (n, data, t = {}) => {
    const c = new h, f = k([c.signal, t.signal]), d = await e.post("object/patch/append-data", {
      timeout: t.timeout,
      signal: f,
      searchParams: l({arg: "" + (n instanceof Uint8Array ? new r(n) : n), ...t}), ...await o(data, c, t.headers)
    }), {Hash: m} = await d.json();
    return new r(m)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async (n, t, o = {}) => {
    const l = await e.post("object/patch/rm-link", {
      timeout: o.timeout,
      signal: o.signal,
      searchParams: c({arg: ["" + (n instanceof Uint8Array ? new r(n) : n), t.Name || t.name || null], ...o}),
      headers: o.headers
    }), {Hash: k} = await l.json();
    return new r(k)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(735), c = t(708), l = t(709), k = t(734), h = t(730).default;
  e.exports = c(e => async (n, data, t = {}) => {
    const c = new h, f = k([c.signal, t.signal]), {Hash: d} = await (await e.post("object/patch/set-data", {
      timeout: t.timeout,
      signal: f,
      searchParams: l({arg: ["" + (n instanceof Uint8Array ? new r(n) : n)], ...t}), ...await o(data, c, t.headers)
    })).json();
    return new r(d)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), {DAGNode: o} = t(758), c = t(735), l = t(708), k = t(709), h = t(734), f = t(730).default,
    d = t(712), m = t(717);
  e.exports = l(e => async (n, t = {}) => {
    let l, w = {Data: null, Links: []};
    if (n instanceof Uint8Array) t.enc || (w = {Data: d(n), Links: []}); else if (o.isDAGNode(n)) w = {
      Data: d(n.Data),
      Links: n.Links.map(e => ({Name: e.Name, Hash: e.Hash.toString(), Size: e.Tsize}))
    }; else {
      if ("object" != typeof n) throw new Error("obj not recognized");
      w.Data = d(n.Data), w.Links = n.Links
    }
    n instanceof Uint8Array && t.enc ? l = n : (t.enc = "json", l = m(JSON.stringify(w)));
    const y = new f, E = h([y.signal, t.signal]), v = await e.post("object/put", {
      timeout: t.timeout,
      signal: E,
      searchParams: k(t), ...await c(l, y, t.headers)
    }), {Hash: x} = await v.json();
    return new r(x)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async (n, t = {}) => (await e.post("object/stat", {
    timeout: t.timeout,
    signal: t.signal,
    searchParams: c({arg: "" + (n instanceof Uint8Array ? new r(n) : n), ...t}),
    headers: t.headers
  })).json())
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({add: t(1171)(e), addAll: t(863)(e), ls: t(1189)(e), rm: t(1190)(e), rmAll: t(868)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(863), o = t(783), c = t(708);
  e.exports = e => {
    const n = r(e);
    return c(() => async function (path, e = {}) {
      return o(n({path: path, ...e}, e))
    })(e)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(865), o = t(866), c = t(1180), l = t(763), k = t(1188), h = t(348), f = t(718), d = t(712), m = t(733),
    w = Object.keys(l).reduce((p, e) => (p[l[e]] = e, p), {});

  class y {
    constructor(e, n, t, l) {
      if (E.isCID(e)) {
        const n = e;
        return this.version = n.version, this.codec = n.codec, this.multihash = n.multihash, void (this.multibaseName = n.multibaseName || (0 === n.version ? "base58btc" : "base32"))
      }
      if ("string" == typeof e) {
        const n = o.isEncoded(e);
        if (n) {
          const t = o.decode(e);
          this.version = parseInt(t.slice(0, 1).toString("hex"), 16), this.codec = c.getCodec(t.slice(1)), this.multihash = c.rmPrefix(t.slice(1)), this.multibaseName = n
        } else this.version = 0, this.codec = "dag-pb", this.multihash = r.fromB58String(e), this.multibaseName = "base58btc";
        return y.validateCID(this), void Object.defineProperty(this, "string", {value: e})
      }
      if (e instanceof Uint8Array) {
        const n = e.slice(0, 1), t = parseInt(n.toString("hex"), 16);
        if (1 === t) {
          const n = e;
          this.version = t, this.codec = c.getCodec(n.slice(1)), this.multihash = c.rmPrefix(n.slice(1)), this.multibaseName = "base32"
        } else this.version = 0, this.codec = "dag-pb", this.multihash = e, this.multibaseName = "base58btc";
        y.validateCID(this)
      } else this.version = e, "number" == typeof n && (n = w[n]), this.codec = n, this.multihash = t, this.multibaseName = l || (0 === e ? "base58btc" : "base32"), y.validateCID(this)
    }

    get bytes() {
      let e = this._bytes;
      if (!e) {
        if (0 === this.version) e = this.multihash; else {
          if (1 !== this.version) throw new Error("unsupported version");
          {
            const n = c.getCodeVarint(this.codec);
            e = f([[1], n, this.multihash], 1 + n.byteLength + this.multihash.byteLength)
          }
        }
        Object.defineProperty(this, "_bytes", {value: e})
      }
      return e
    }

    get prefix() {
      const e = c.getCodeVarint(this.codec), n = r.prefix(this.multihash);
      return f([[this.version], e, n], 1 + e.byteLength + n.byteLength)
    }

    get code() {
      return l[this.codec]
    }

    toV0() {
      if ("dag-pb" !== this.codec) throw new Error("Cannot convert a non dag-pb CID to CIDv0");
      const {name: e, length: n} = r.decode(this.multihash);
      if ("sha2-256" !== e) throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
      if (32 !== n) throw new Error("Cannot convert non 32 byte multihash CID to CIDv0");
      return new E(0, this.codec, this.multihash)
    }

    toV1() {
      return new E(1, this.codec, this.multihash)
    }

    toBaseEncodedString(base = this.multibaseName) {
      if (this.string && base === this.multibaseName) return this.string;
      let e = null;
      if (0 === this.version) {
        if ("base58btc" !== base) throw new Error("not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()");
        e = r.toB58String(this.multihash)
      } else {
        if (1 !== this.version) throw new Error("unsupported version");
        e = d(o.encode(base, this.bytes))
      }
      return base === this.multibaseName && Object.defineProperty(this, "string", {value: e}), e
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
      return "CID(" + this.toString() + ")"
    }

    toString(base) {
      return this.toBaseEncodedString(base)
    }

    toJSON() {
      return {codec: this.codec, version: this.version, hash: this.multihash}
    }

    equals(e) {
      return this.codec === e.codec && this.version === e.version && m(this.multihash, e.multihash)
    }

    static validateCID(e) {
      const n = k.checkCIDComponents(e);
      if (n) throw new Error(n)
    }
  }

  const E = h(y, {className: "CID", symbolName: "@ipld/js-cid/CID"});
  E.codecs = l, e.exports = E
}, function (e, n, t) {
  "use strict";
  const {encodeText: r} = t(799);
  e.exports = class {
    constructor(e, code, n, t) {
      this.name = e, this.code = code, this.codeBuf = r(this.code), this.alphabet = t, this.codec = n(t)
    }

    encode(e) {
      return this.codec.encode(e)
    }

    decode(e) {
      for (const n of e) if (this.alphabet && this.alphabet.indexOf(n) < 0) throw new Error(`invalid character '${n}' in '${e}'`);
      return this.codec.decode(e)
    }
  }
}, function (e, n, t) {
  "use strict";
  e.exports = {
    rfc4648: e => n => ({
      encode: input => ((data, e, n) => {
        const t = "=" === e[e.length - 1], mask = (1 << n) - 1;
        let r = "", o = 0, c = 0;
        for (let i = 0; i < data.length; ++i) for (c = c << 8 | data[i], o += 8; o > n;) o -= n, r += e[mask & c >> o];
        if (o && (r += e[mask & c << n - o]), t) for (; r.length * n & 7;) r += "=";
        return r
      })(input, n, e), decode: input => ((e, n, t) => {
        const r = {};
        for (let i = 0; i < n.length; ++i) r[n[i]] = i;
        let o = e.length;
        for (; "=" === e[o - 1];) --o;
        const c = new Uint8Array(o * t / 8 | 0);
        let l = 0, k = 0, h = 0;
        for (let i = 0; i < o; ++i) {
          const n = r[e[i]];
          if (void 0 === n) throw new SyntaxError("Invalid character " + e[i]);
          k = k << t | n, l += t, l >= 8 && (l -= 8, c[h++] = 255 & k >> l)
        }
        if (l >= t || 255 & k << 8 - l) throw new SyntaxError("Unexpected end of data");
        return c
      })(input, n, e)
    })
  }
}, function (e, n, t) {
  e.exports = {encode: t(1176), decode: t(1177), encodingLength: t(1178)}
}, function (e, n) {
  e.exports = function e(n, r, o) {
    if (Number.MAX_SAFE_INTEGER && n > Number.MAX_SAFE_INTEGER) throw e.bytes = 0, new RangeError("Could not encode varint");
    r = r || [];
    var c = o = o || 0;
    for (; n >= t;) r[o++] = 255 & n | 128, n /= 128;
    for (; -128 & n;) r[o++] = 255 & n | 128, n >>>= 7;
    return r[o] = 0 | n, e.bytes = o - c + 1, r
  };
  var t = Math.pow(2, 31)
}, function (e, n) {
  e.exports = function e(n, t) {
    var b, r = 0, o = 0, c = t = t || 0, l = n.length;
    do {
      if (c >= l || o > 49) throw e.bytes = 0, new RangeError("Could not decode varint");
      b = n[c++], r += o < 28 ? (127 & b) << o : (127 & b) * Math.pow(2, o), o += 7
    } while (b >= 128);
    return e.bytes = c - t, r
  }
}, function (e, n) {
  var t = Math.pow(2, 7), r = Math.pow(2, 14), o = Math.pow(2, 21), c = Math.pow(2, 28), l = Math.pow(2, 35),
    k = Math.pow(2, 42), h = Math.pow(2, 49), f = Math.pow(2, 56), d = Math.pow(2, 63);
  e.exports = function (e) {
    return e < t ? 1 : e < r ? 2 : e < o ? 3 : e < c ? 4 : e < l ? 5 : e < k ? 6 : e < h ? 7 : e < f ? 8 : e < d ? 9 : 10
  }
}, function (e, n, t) {
  "use strict";
  const r = Object.freeze({
    identity: 0,
    sha1: 17,
    "sha2-256": 18,
    "sha2-512": 19,
    "sha3-512": 20,
    "sha3-384": 21,
    "sha3-256": 22,
    "sha3-224": 23,
    "shake-128": 24,
    "shake-256": 25,
    "keccak-224": 26,
    "keccak-256": 27,
    "keccak-384": 28,
    "keccak-512": 29,
    blake3: 30,
    "murmur3-128": 34,
    "murmur3-32": 35,
    "dbl-sha2-256": 86,
    md4: 212,
    md5: 213,
    bmt: 214,
    "sha2-256-trunc254-padded": 4114,
    "ripemd-128": 4178,
    "ripemd-160": 4179,
    "ripemd-256": 4180,
    "ripemd-320": 4181,
    x11: 4352,
    kangarootwelve: 7425,
    "sm3-256": 21325,
    "blake2b-8": 45569,
    "blake2b-16": 45570,
    "blake2b-24": 45571,
    "blake2b-32": 45572,
    "blake2b-40": 45573,
    "blake2b-48": 45574,
    "blake2b-56": 45575,
    "blake2b-64": 45576,
    "blake2b-72": 45577,
    "blake2b-80": 45578,
    "blake2b-88": 45579,
    "blake2b-96": 45580,
    "blake2b-104": 45581,
    "blake2b-112": 45582,
    "blake2b-120": 45583,
    "blake2b-128": 45584,
    "blake2b-136": 45585,
    "blake2b-144": 45586,
    "blake2b-152": 45587,
    "blake2b-160": 45588,
    "blake2b-168": 45589,
    "blake2b-176": 45590,
    "blake2b-184": 45591,
    "blake2b-192": 45592,
    "blake2b-200": 45593,
    "blake2b-208": 45594,
    "blake2b-216": 45595,
    "blake2b-224": 45596,
    "blake2b-232": 45597,
    "blake2b-240": 45598,
    "blake2b-248": 45599,
    "blake2b-256": 45600,
    "blake2b-264": 45601,
    "blake2b-272": 45602,
    "blake2b-280": 45603,
    "blake2b-288": 45604,
    "blake2b-296": 45605,
    "blake2b-304": 45606,
    "blake2b-312": 45607,
    "blake2b-320": 45608,
    "blake2b-328": 45609,
    "blake2b-336": 45610,
    "blake2b-344": 45611,
    "blake2b-352": 45612,
    "blake2b-360": 45613,
    "blake2b-368": 45614,
    "blake2b-376": 45615,
    "blake2b-384": 45616,
    "blake2b-392": 45617,
    "blake2b-400": 45618,
    "blake2b-408": 45619,
    "blake2b-416": 45620,
    "blake2b-424": 45621,
    "blake2b-432": 45622,
    "blake2b-440": 45623,
    "blake2b-448": 45624,
    "blake2b-456": 45625,
    "blake2b-464": 45626,
    "blake2b-472": 45627,
    "blake2b-480": 45628,
    "blake2b-488": 45629,
    "blake2b-496": 45630,
    "blake2b-504": 45631,
    "blake2b-512": 45632,
    "blake2s-8": 45633,
    "blake2s-16": 45634,
    "blake2s-24": 45635,
    "blake2s-32": 45636,
    "blake2s-40": 45637,
    "blake2s-48": 45638,
    "blake2s-56": 45639,
    "blake2s-64": 45640,
    "blake2s-72": 45641,
    "blake2s-80": 45642,
    "blake2s-88": 45643,
    "blake2s-96": 45644,
    "blake2s-104": 45645,
    "blake2s-112": 45646,
    "blake2s-120": 45647,
    "blake2s-128": 45648,
    "blake2s-136": 45649,
    "blake2s-144": 45650,
    "blake2s-152": 45651,
    "blake2s-160": 45652,
    "blake2s-168": 45653,
    "blake2s-176": 45654,
    "blake2s-184": 45655,
    "blake2s-192": 45656,
    "blake2s-200": 45657,
    "blake2s-208": 45658,
    "blake2s-216": 45659,
    "blake2s-224": 45660,
    "blake2s-232": 45661,
    "blake2s-240": 45662,
    "blake2s-248": 45663,
    "blake2s-256": 45664,
    "skein256-8": 45825,
    "skein256-16": 45826,
    "skein256-24": 45827,
    "skein256-32": 45828,
    "skein256-40": 45829,
    "skein256-48": 45830,
    "skein256-56": 45831,
    "skein256-64": 45832,
    "skein256-72": 45833,
    "skein256-80": 45834,
    "skein256-88": 45835,
    "skein256-96": 45836,
    "skein256-104": 45837,
    "skein256-112": 45838,
    "skein256-120": 45839,
    "skein256-128": 45840,
    "skein256-136": 45841,
    "skein256-144": 45842,
    "skein256-152": 45843,
    "skein256-160": 45844,
    "skein256-168": 45845,
    "skein256-176": 45846,
    "skein256-184": 45847,
    "skein256-192": 45848,
    "skein256-200": 45849,
    "skein256-208": 45850,
    "skein256-216": 45851,
    "skein256-224": 45852,
    "skein256-232": 45853,
    "skein256-240": 45854,
    "skein256-248": 45855,
    "skein256-256": 45856,
    "skein512-8": 45857,
    "skein512-16": 45858,
    "skein512-24": 45859,
    "skein512-32": 45860,
    "skein512-40": 45861,
    "skein512-48": 45862,
    "skein512-56": 45863,
    "skein512-64": 45864,
    "skein512-72": 45865,
    "skein512-80": 45866,
    "skein512-88": 45867,
    "skein512-96": 45868,
    "skein512-104": 45869,
    "skein512-112": 45870,
    "skein512-120": 45871,
    "skein512-128": 45872,
    "skein512-136": 45873,
    "skein512-144": 45874,
    "skein512-152": 45875,
    "skein512-160": 45876,
    "skein512-168": 45877,
    "skein512-176": 45878,
    "skein512-184": 45879,
    "skein512-192": 45880,
    "skein512-200": 45881,
    "skein512-208": 45882,
    "skein512-216": 45883,
    "skein512-224": 45884,
    "skein512-232": 45885,
    "skein512-240": 45886,
    "skein512-248": 45887,
    "skein512-256": 45888,
    "skein512-264": 45889,
    "skein512-272": 45890,
    "skein512-280": 45891,
    "skein512-288": 45892,
    "skein512-296": 45893,
    "skein512-304": 45894,
    "skein512-312": 45895,
    "skein512-320": 45896,
    "skein512-328": 45897,
    "skein512-336": 45898,
    "skein512-344": 45899,
    "skein512-352": 45900,
    "skein512-360": 45901,
    "skein512-368": 45902,
    "skein512-376": 45903,
    "skein512-384": 45904,
    "skein512-392": 45905,
    "skein512-400": 45906,
    "skein512-408": 45907,
    "skein512-416": 45908,
    "skein512-424": 45909,
    "skein512-432": 45910,
    "skein512-440": 45911,
    "skein512-448": 45912,
    "skein512-456": 45913,
    "skein512-464": 45914,
    "skein512-472": 45915,
    "skein512-480": 45916,
    "skein512-488": 45917,
    "skein512-496": 45918,
    "skein512-504": 45919,
    "skein512-512": 45920,
    "skein1024-8": 45921,
    "skein1024-16": 45922,
    "skein1024-24": 45923,
    "skein1024-32": 45924,
    "skein1024-40": 45925,
    "skein1024-48": 45926,
    "skein1024-56": 45927,
    "skein1024-64": 45928,
    "skein1024-72": 45929,
    "skein1024-80": 45930,
    "skein1024-88": 45931,
    "skein1024-96": 45932,
    "skein1024-104": 45933,
    "skein1024-112": 45934,
    "skein1024-120": 45935,
    "skein1024-128": 45936,
    "skein1024-136": 45937,
    "skein1024-144": 45938,
    "skein1024-152": 45939,
    "skein1024-160": 45940,
    "skein1024-168": 45941,
    "skein1024-176": 45942,
    "skein1024-184": 45943,
    "skein1024-192": 45944,
    "skein1024-200": 45945,
    "skein1024-208": 45946,
    "skein1024-216": 45947,
    "skein1024-224": 45948,
    "skein1024-232": 45949,
    "skein1024-240": 45950,
    "skein1024-248": 45951,
    "skein1024-256": 45952,
    "skein1024-264": 45953,
    "skein1024-272": 45954,
    "skein1024-280": 45955,
    "skein1024-288": 45956,
    "skein1024-296": 45957,
    "skein1024-304": 45958,
    "skein1024-312": 45959,
    "skein1024-320": 45960,
    "skein1024-328": 45961,
    "skein1024-336": 45962,
    "skein1024-344": 45963,
    "skein1024-352": 45964,
    "skein1024-360": 45965,
    "skein1024-368": 45966,
    "skein1024-376": 45967,
    "skein1024-384": 45968,
    "skein1024-392": 45969,
    "skein1024-400": 45970,
    "skein1024-408": 45971,
    "skein1024-416": 45972,
    "skein1024-424": 45973,
    "skein1024-432": 45974,
    "skein1024-440": 45975,
    "skein1024-448": 45976,
    "skein1024-456": 45977,
    "skein1024-464": 45978,
    "skein1024-472": 45979,
    "skein1024-480": 45980,
    "skein1024-488": 45981,
    "skein1024-496": 45982,
    "skein1024-504": 45983,
    "skein1024-512": 45984,
    "skein1024-520": 45985,
    "skein1024-528": 45986,
    "skein1024-536": 45987,
    "skein1024-544": 45988,
    "skein1024-552": 45989,
    "skein1024-560": 45990,
    "skein1024-568": 45991,
    "skein1024-576": 45992,
    "skein1024-584": 45993,
    "skein1024-592": 45994,
    "skein1024-600": 45995,
    "skein1024-608": 45996,
    "skein1024-616": 45997,
    "skein1024-624": 45998,
    "skein1024-632": 45999,
    "skein1024-640": 46e3,
    "skein1024-648": 46001,
    "skein1024-656": 46002,
    "skein1024-664": 46003,
    "skein1024-672": 46004,
    "skein1024-680": 46005,
    "skein1024-688": 46006,
    "skein1024-696": 46007,
    "skein1024-704": 46008,
    "skein1024-712": 46009,
    "skein1024-720": 46010,
    "skein1024-728": 46011,
    "skein1024-736": 46012,
    "skein1024-744": 46013,
    "skein1024-752": 46014,
    "skein1024-760": 46015,
    "skein1024-768": 46016,
    "skein1024-776": 46017,
    "skein1024-784": 46018,
    "skein1024-792": 46019,
    "skein1024-800": 46020,
    "skein1024-808": 46021,
    "skein1024-816": 46022,
    "skein1024-824": 46023,
    "skein1024-832": 46024,
    "skein1024-840": 46025,
    "skein1024-848": 46026,
    "skein1024-856": 46027,
    "skein1024-864": 46028,
    "skein1024-872": 46029,
    "skein1024-880": 46030,
    "skein1024-888": 46031,
    "skein1024-896": 46032,
    "skein1024-904": 46033,
    "skein1024-912": 46034,
    "skein1024-920": 46035,
    "skein1024-928": 46036,
    "skein1024-936": 46037,
    "skein1024-944": 46038,
    "skein1024-952": 46039,
    "skein1024-960": 46040,
    "skein1024-968": 46041,
    "skein1024-976": 46042,
    "skein1024-984": 46043,
    "skein1024-992": 46044,
    "skein1024-1000": 46045,
    "skein1024-1008": 46046,
    "skein1024-1016": 46047,
    "skein1024-1024": 46048,
    "poseidon-bls12_381-a2-fc1": 46081,
    "poseidon-bls12_381-a2-fc1-sc": 46082
  });
  e.exports = {names: r}
}, function (e, n, t) {
  "use strict";
  const r = t(78), o = t(1181), c = t(1182), l = t(867), k = t(1185);
  (n = e.exports).addPrefix = (e, data) => {
    let n;
    if (e instanceof Uint8Array) n = l.varintUint8ArrayEncode(e); else {
      if (!c[e]) throw new Error("multicodec not recognized");
      n = c[e]
    }
    return k([n, data], n.length + data.length)
  }, n.rmPrefix = data => (r.decode(data), data.slice(r.decode.bytes)), n.getCodec = e => {
    const code = r.decode(e), n = o.get(code);
    if (void 0 === n) throw new Error(`Code ${code} not found`);
    return n
  }, n.getName = e => o.get(e), n.getNumber = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return r.decode(code)
  }, n.getCode = e => r.decode(e), n.getCodeVarint = e => {
    const code = c[e];
    if (void 0 === code) throw new Error("Codec `" + e + "` not found");
    return code
  }, n.getVarint = code => r.encode(code);
  const h = t(1186);
  Object.assign(n, h), n.print = t(1187)
}, function (e, n, t) {
  "use strict";
  const r = t(763), o = new Map;
  for (const e in r) {
    const code = r[e];
    o.set(code, e)
  }
  e.exports = Object.freeze(o)
}, function (e, n, t) {
  "use strict";
  const r = t(763), o = t(867).varintEncode, c = {};
  for (const e in r) {
    const code = r[e];
    c[e] = o(code)
  }
  e.exports = Object.freeze(c)
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(798), {TextDecoder: o} = t(711), c = new o("utf8");
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.decode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.encode(e)
  }
}, function (e, n, t) {
  "use strict";
  const {names: r} = t(798), {TextEncoder: o} = t(711), c = new o;
  e.exports = function (e, n = "utf8") {
    if ("utf8" === n || "utf-8" === n) return c.encode(e);
    const t = r[n];
    if (!t) throw new Error("Unknown base");
    return t.decode(e)
  }
}, function (e, n, t) {
  "use strict";
  e.exports = function (e, n) {
    n || (n = e.reduce((e, n) => e + n.length, 0));
    const output = new Uint8Array(n);
    let t = 0;
    for (const n of e) output.set(n, t), t += n.length;
    return output
  }
}, function (e, n, t) {
  "use strict";
  const table = t(763), r = {};
  for (const [e, code] of Object.entries(table)) r[e.toUpperCase().replace(/-/g, "_")] = code;
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const table = t(763), r = {};
  for (const [e, code] of Object.entries(table)) void 0 === r[code] && (r[code] = e);
  e.exports = Object.freeze(r)
}, function (e, n, t) {
  "use strict";
  const r = t(865), o = {
    checkCIDComponents: function (e) {
      if (null == e) return "null values are not valid CIDs";
      if (0 !== e.version && 1 !== e.version) return "Invalid version, must be a number equal to 1 or 0";
      if ("string" != typeof e.codec) return "codec must be string";
      if (0 === e.version) {
        if ("dag-pb" !== e.codec) return "codec must be 'dag-pb' for CIDv0";
        if ("base58btc" !== e.multibaseName) return "multibaseName must be 'base58btc' for CIDv0"
      }
      if (!(e.multihash instanceof Uint8Array)) return "multihash must be a Uint8Array";
      try {
        r.validate(e.multihash)
      } catch (e) {
        let n = e.message;
        return n || (n = "Multihash validation failed"), n
      }
    }
  };
  e.exports = o
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);

  function l(e, n, t) {
    const o = {type: e, cid: new r(n)};
    return t && (o.metadata = t), o
  }

  e.exports = o(e => async function* (n = {}) {
    n.paths && (n.paths = Array.isArray(n.paths) ? n.paths : [n.paths]);
    const t = await e.post("pin/ls", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c({...n, arg: (n.paths || []).map(path => "" + path), stream: !0}),
      headers: n.headers
    });
    for await(const e of t.ndjson()) {
      if (e.Keys) {
        for (const n of Object.keys(e.Keys)) yield l(e.Keys[n].Type, n, e.Keys[n].Metadata);
        return
      }
      yield l(e.Type, e.Cid, e.Metadata)
    }
  })
}, function (e, n, t) {
  "use strict";
  const r = t(868), o = t(783), c = t(708);
  e.exports = e => {
    const n = r(e);
    return c(() => async function (path, e = {}) {
      return o(n({path: path, ...e}, e))
    })(e)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async function* (n, t = {}) {
    const o = await e.post("ping", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: c({arg: "" + n, ...t}),
      headers: t.headers,
      transform: r
    });
    yield* o.ndjson()
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({
    ls: t(1193)(e),
    peers: t(1194)(e),
    publish: t(1195)(e),
    subscribe: t(1196)(e),
    unsubscribe: t(1197)(e)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => {
    const {Strings: t} = await (await e.post("pubsub/ls", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: o(n),
      headers: n.headers
    })).json();
    return t || []
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n, t = {}) => {
    t || "object" != typeof n || (t = n || {}, n = null);
    const r = await e.post("pubsub/peers", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: o({arg: n, ...t}),
      headers: t.headers
    }), {Strings: c} = await r.json();
    return c || []
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709), c = t(735), l = t(734), k = t(730).default;
  e.exports = r(e => async (n, data, t = {}) => {
    const r = o({arg: n, ...t}), h = new k, f = l([h.signal, t.signal]),
      d = await e.post("pubsub/pub", {timeout: t.timeout, signal: f, searchParams: r, ...await c(data, h, t.headers)});
    await d.text()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(717), o = t(712), c = t(821)("ipfs-http-client:pubsub:subscribe"), l = t(869), k = t(708), h = t(709);
  e.exports = k((e, n) => {
    const t = l.singleton();
    return async (n, l, k = {}) => {
      let f, d;
      k.signal = t.subscribe(n, l, k.signal);
      const m = new Promise((e, n) => {
        f = e, d = n
      }), w = setTimeout(() => f(), 1e3);
      return setTimeout(() => {
        e.post("pubsub/sub", {
          timeout: k.timeout,
          signal: k.signal,
          searchParams: h({arg: n, ...k}),
          headers: k.headers
        }).catch(e => {
          t.unsubscribe(n, l), d(e)
        }).then(e => {
          clearTimeout(w), e && (!async function (e, {onMessage: n, onEnd: t, onError: l}) {
            l = l || c;
            try {
              for await(const t of e) try {
                if (!t.from) continue;
                n({
                  from: o(r(t.from, "base64pad"), "base58btc"),
                  data: r(t.data, "base64pad"),
                  seqno: r(t.seqno, "base64pad"),
                  topicIDs: t.topicIDs
                })
              } catch (e) {
                e.message = "Failed to parse pubsub message: " + e.message, l(e, !1, t)
              }
            } catch (e) {
              "aborted" !== e.type && "AbortError" !== e.name && l(e, !0)
            } finally {
              t()
            }
          }(e.ndjson(), {onMessage: l, onEnd: () => t.unsubscribe(n, l), onError: k.onError}), f())
        })
      }, 0), m
    }
  })
}, function (e, n, t) {
  "use strict";
  const r = t(869);
  e.exports = e => {
    const n = r.singleton();
    return async (e, t) => n.unsubscribe(e, t)
  }
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(714), c = t(708), l = t(709);
  e.exports = c((e, n) => {
    const c = async function* (n, t = {}) {
      Array.isArray(n) || (n = [n]);
      const c = await e.post("refs", {
        timeout: t.timeout,
        signal: t.signal,
        searchParams: l({arg: n.map(e => "" + (e instanceof Uint8Array ? new r(e) : e)), ...t}),
        headers: t.headers,
        transform: o
      });
      yield* c.ndjson()
    };
    return c.local = t(1199)(n), c
  })
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async function* (n = {}) {
    const t = await e.post("refs/local", {
      timeout: n.timeout,
      signal: n.signal,
      transform: r,
      searchParams: c(n),
      headers: n.headers
    });
    yield* t.ndjson()
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({gc: t(1201)(e), stat: t(870)(e), version: t(1202)(e)})
}, function (e, n, t) {
  "use strict";
  const r = t(710), o = t(708), c = t(709);
  e.exports = o(e => async function* (n = {}) {
    const t = await e.post("repo/gc", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c(n),
      headers: n.headers,
      transform: e => ({err: e.Error ? new Error(e.Error) : null, cid: (e.Key || {})["/"] ? new r(e.Key["/"]) : null})
    });
    yield* t.ndjson()
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n = {}) => (await (await e.post("repo/version", {
    timeout: n.timeout,
    signal: n.signal,
    searchParams: o(n),
    headers: n.headers
  })).json()).Version)
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async function (path, n = {}) {
    const t = await e.post("resolve", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: o({arg: path, ...n}),
      headers: n.headers
    }), {Path: r} = await t.json();
    return r
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({bitswap: t(826)(e), bw: t(1205)(e), repo: t(870)(e)})
}, function (e, n, t) {
  "use strict";
  const {BigNumber: r} = t(746), o = t(708), c = t(709);
  e.exports = o(e => async function* (n = {}) {
    const t = await e.post("stats/bw", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c(n),
      headers: n.headers,
      transform: e => ({
        totalIn: new r(e.TotalIn),
        totalOut: new r(e.TotalOut),
        rateIn: new r(e.RateIn),
        rateOut: new r(e.RateOut)
      })
    });
    yield* t.ndjson()
  })
}, function (e, n, t) {
  "use strict";
  e.exports = e => ({
    addrs: t(1207)(e),
    connect: t(1208)(e),
    disconnect: t(1209)(e),
    localAddrs: t(1210)(e),
    peers: t(1211)(e)
  })
}, function (e, n, t) {
  "use strict";
  const r = t(723), o = t(708), c = t(709);
  e.exports = o(e => async (n = {}) => {
    const t = await e.post("swarm/addrs", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c(n),
      headers: n.headers
    }), {Addrs: o} = await t.json();
    return Object.keys(o).map(e => ({id: e, addrs: (o[e] || []).map(a => r(a))}))
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n, t = {}) => {
    n = Array.isArray(n) ? n : [n];
    const r = await e.post("swarm/connect", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: o({arg: n.map(e => "" + e), ...t}),
      headers: t.headers
    }), {Strings: c} = await r.json();
    return c || []
  })
}, function (e, n, t) {
  "use strict";
  const r = t(708), o = t(709);
  e.exports = r(e => async (n, t = {}) => {
    n = Array.isArray(n) ? n : [n];
    const r = await e.post("swarm/disconnect", {
      timeout: t.timeout,
      signal: t.signal,
      searchParams: o({arg: n.map(e => "" + e), ...t}),
      headers: t.headers
    }), {Strings: c} = await r.json();
    return c || []
  })
}, function (e, n, t) {
  "use strict";
  const r = t(723), o = t(708), c = t(709);
  e.exports = o(e => async (n = {}) => {
    const t = await e.post("swarm/addrs/local", {
      timeout: n.timeout,
      signal: n.signal,
      searchParams: c(n),
      headers: n.headers
    }), {Strings: o} = await t.json();
    return (o || []).map(a => r(a))
  })
}, function (e, n, t) {
  "use strict";
  const r = t(723), o = t(708), c = t(709);
  e.exports = o(e => async (n = {}) => ((await (await e.post("swarm/peers", {
    timeout: n.timeout,
    signal: n.signal,
    searchParams: c(n),
    headers: n.headers
  })).json()).Peers || []).map(e => {
    const n = {};
    try {
      n.addr = r(e.Addr), n.peer = e.Peer
    } catch (t) {
      n.error = t, n.rawPeerInfo = e
    }
    return e.Muxer && (n.muxer = e.Muxer), e.Latency && (n.latency = e.Latency), e.Streams && (n.streams = e.Streams), null != e.Direction && (n.direction = e.Direction), n
  }))
}, function (e, n, t) {
  "use strict";
  const r = t(714), o = t(708), c = t(709);
  e.exports = o(e => async function (n = {}) {
    const t = await e.post("version", {timeout: n.timeout, signal: n.signal, searchParams: c(n), headers: n.headers}),
      data = await t.json();
    return r(data)
  })
}])]);
