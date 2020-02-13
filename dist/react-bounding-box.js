(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["prop-types", "react"], factory);
	else if(typeof exports === 'object')
		exports["Boundingbox"] = factory(require("prop-types"), require("react"));
	else
		root["Boundingbox"] = factory(root["PropTypes"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(6);

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(8);

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(11);

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(10);

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(9);

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(7);

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(12);

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


(function (global, module, define) {

  function Alea(seed) {
    var me = this,
        mash = Mash();

    me.next = function () {
      var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
      me.s0 = me.s1;
      me.s1 = me.s2;
      return me.s2 = t - (me.c = t | 0);
    };

    // Apply the seeding algorithm from Baagoe.
    me.c = 1;
    me.s0 = mash(' ');
    me.s1 = mash(' ');
    me.s2 = mash(' ');
    me.s0 -= mash(seed);
    if (me.s0 < 0) {
      me.s0 += 1;
    }
    me.s1 -= mash(seed);
    if (me.s1 < 0) {
      me.s1 += 1;
    }
    me.s2 -= mash(seed);
    if (me.s2 < 0) {
      me.s2 += 1;
    }
    mash = null;
  }

  function copy(f, t) {
    t.c = f.c;
    t.s0 = f.s0;
    t.s1 = f.s1;
    t.s2 = f.s2;
    return t;
  }

  function impl(seed, opts) {
    var xg = new Alea(seed),
        state = opts && opts.state,
        prng = xg.next;
    prng.int32 = function () {
      return xg.next() * 0x100000000 | 0;
    };
    prng.double = function () {
      return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };
    prng.quick = prng;
    if (state) {
      if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) == 'object') copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  function Mash() {
    var n = 0xefc8249d;

    var mash = function mash(data) {
      data = data.toString();
      for (var i = 0; i < data.length; i++) {
        n += data.charCodeAt(i);
        var h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 0x100000000; // 2^32
      }
      return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
    };

    return mash;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(2)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return impl;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.alea = impl;
  }
})(undefined, ( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function (global, module, define) {

  function XorGen(seed) {
    var me = this,
        strseed = '';

    // Set up generator function.
    me.next = function () {
      var b = me.b,
          c = me.c,
          d = me.d,
          a = me.a;
      b = b << 25 ^ b >>> 7 ^ c;
      c = c - d | 0;
      d = d << 24 ^ d >>> 8 ^ a;
      a = a - b | 0;
      me.b = b = b << 20 ^ b >>> 12 ^ c;
      me.c = c = c - d | 0;
      me.d = d << 16 ^ c >>> 16 ^ a;
      return me.a = a - b | 0;
    };

    /* The following is non-inverted tyche, which has better internal
     * bit diffusion, but which is about 25% slower than tyche-i in JS.
    me.next = function() {
      var a = me.a, b = me.b, c = me.c, d = me.d;
      a = (me.a + me.b | 0) >>> 0;
      d = me.d ^ a; d = d << 16 ^ d >>> 16;
      c = me.c + d | 0;
      b = me.b ^ c; b = b << 12 ^ d >>> 20;
      me.a = a = a + b | 0;
      d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
      me.c = c = c + d | 0;
      b = b ^ c;
      return me.b = (b << 7 ^ b >>> 25);
    }
    */

    me.a = 0;
    me.b = 0;
    me.c = 2654435769 | 0;
    me.d = 1367130551;

    if (seed === Math.floor(seed)) {
      // Integer seed.
      me.a = seed / 0x100000000 | 0;
      me.b = seed | 0;
    } else {
      // String seed.
      strseed += seed;
    }

    // Mix in string seed, then discard an initial batch of 64 values.
    for (var k = 0; k < strseed.length + 20; k++) {
      me.b ^= strseed.charCodeAt(k) | 0;
      me.next();
    }
  }

  function copy(f, t) {
    t.a = f.a;
    t.b = f.b;
    t.c = f.c;
    t.d = f.d;
    return t;
  };

  function impl(seed, opts) {
    var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function prng() {
      return (xg.next() >>> 0) / 0x100000000;
    };
    prng.double = function () {
      do {
        var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21);
      } while (result === 0);
      return result;
    };
    prng.int32 = xg.next;
    prng.quick = prng;
    if (state) {
      if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) == 'object') copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(2)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return impl;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.tychei = impl;
  }
})(undefined, ( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function (global, module, define) {

  function XorGen(seed) {
    var me = this,
        strseed = '';

    me.x = 0;
    me.y = 0;
    me.z = 0;
    me.w = 0;

    // Set up generator function.
    me.next = function () {
      var t = me.x ^ me.x << 11;
      me.x = me.y;
      me.y = me.z;
      me.z = me.w;
      return me.w ^= me.w >>> 19 ^ t ^ t >>> 8;
    };

    if (seed === (seed | 0)) {
      // Integer seed.
      me.x = seed;
    } else {
      // String seed.
      strseed += seed;
    }

    // Mix in string seed, then discard an initial batch of 64 values.
    for (var k = 0; k < strseed.length + 64; k++) {
      me.x ^= strseed.charCodeAt(k) | 0;
      me.next();
    }
  }

  function copy(f, t) {
    t.x = f.x;
    t.y = f.y;
    t.z = f.z;
    t.w = f.w;
    return t;
  }

  function impl(seed, opts) {
    var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function prng() {
      return (xg.next() >>> 0) / 0x100000000;
    };
    prng.double = function () {
      do {
        var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21);
      } while (result === 0);
      return result;
    };
    prng.int32 = xg.next;
    prng.quick = prng;
    if (state) {
      if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) == 'object') copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(2)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return impl;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.xor128 = impl;
  }
})(undefined, ( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function (global, module, define) {

  function XorGen(seed) {
    var me = this;

    // Set up generator function.
    me.next = function () {
      var w = me.w,
          X = me.X,
          i = me.i,
          t,
          v;
      // Update Weyl generator.
      me.w = w = w + 0x61c88647 | 0;
      // Update xor generator.
      v = X[i + 34 & 127];
      t = X[i = i + 1 & 127];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      // Update Xor generator array state.
      v = X[i] = v ^ t;
      me.i = i;
      // Result is the combination.
      return v + (w ^ w >>> 16) | 0;
    };

    function init(me, seed) {
      var t,
          v,
          i,
          j,
          w,
          X = [],
          limit = 128;
      if (seed === (seed | 0)) {
        // Numeric seeds initialize v, which is used to generates X.
        v = seed;
        seed = null;
      } else {
        // String seeds are mixed into v and X one character at a time.
        seed = seed + '\0';
        v = 0;
        limit = Math.max(limit, seed.length);
      }
      // Initialize circular array and weyl value.
      for (i = 0, j = -32; j < limit; ++j) {
        // Put the unicode characters into the array, and shuffle them.
        if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
        // After 32 shuffles, take v as the starting w value.
        if (j === 0) w = v;
        v ^= v << 10;
        v ^= v >>> 15;
        v ^= v << 4;
        v ^= v >>> 13;
        if (j >= 0) {
          w = w + 0x61c88647 | 0; // Weyl.
          t = X[j & 127] ^= v + w; // Combine xor and weyl to init array.
          i = 0 == t ? i + 1 : 0; // Count zeroes.
        }
      }
      // We have detected all zeroes; make the key nonzero.
      if (i >= 128) {
        X[(seed && seed.length || 0) & 127] = -1;
      }
      // Run the generator 512 times to further mix the state before using it.
      // Factoring this as a function slows the main generator, so it is just
      // unrolled here.  The weyl generator is not advanced while warming up.
      i = 127;
      for (j = 4 * 128; j > 0; --j) {
        v = X[i + 34 & 127];
        t = X[i = i + 1 & 127];
        v ^= v << 13;
        t ^= t << 17;
        v ^= v >>> 15;
        t ^= t >>> 12;
        X[i] = v ^ t;
      }
      // Storing state as object members is faster than using closure variables.
      me.w = w;
      me.X = X;
      me.i = i;
    }

    init(me, seed);
  }

  function copy(f, t) {
    t.i = f.i;
    t.w = f.w;
    t.X = f.X.slice();
    return t;
  };

  function impl(seed, opts) {
    if (seed == null) seed = +new Date();
    var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function prng() {
      return (xg.next() >>> 0) / 0x100000000;
    };
    prng.double = function () {
      do {
        var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21);
      } while (result === 0);
      return result;
    };
    prng.int32 = xg.next;
    prng.quick = prng;
    if (state) {
      if (state.X) copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(2)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return impl;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.xor4096 = impl;
  }
})(undefined, // window object or global
( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function (global, module, define) {

  function XorGen(seed) {
    var me = this;

    // Set up generator function.
    me.next = function () {
      // Update xor generator.
      var X = me.x,
          i = me.i,
          t,
          v,
          w;
      t = X[i];t ^= t >>> 7;v = t ^ t << 24;
      t = X[i + 1 & 7];v ^= t ^ t >>> 10;
      t = X[i + 3 & 7];v ^= t ^ t >>> 3;
      t = X[i + 4 & 7];v ^= t ^ t << 7;
      t = X[i + 7 & 7];t = t ^ t << 13;v ^= t ^ t << 9;
      X[i] = v;
      me.i = i + 1 & 7;
      return v;
    };

    function init(me, seed) {
      var j,
          w,
          X = [];

      if (seed === (seed | 0)) {
        // Seed state array using a 32-bit integer.
        w = X[0] = seed;
      } else {
        // Seed state using a string.
        seed = '' + seed;
        for (j = 0; j < seed.length; ++j) {
          X[j & 7] = X[j & 7] << 15 ^ seed.charCodeAt(j) + X[j + 1 & 7] << 13;
        }
      }
      // Enforce an array length of 8, not all zeroes.
      while (X.length < 8) {
        X.push(0);
      }for (j = 0; j < 8 && X[j] === 0; ++j) {}
      if (j == 8) w = X[7] = -1;else w = X[j];

      me.x = X;
      me.i = 0;

      // Discard an initial 256 values.
      for (j = 256; j > 0; --j) {
        me.next();
      }
    }

    init(me, seed);
  }

  function copy(f, t) {
    t.x = f.x.slice();
    t.i = f.i;
    return t;
  }

  function impl(seed, opts) {
    if (seed == null) seed = +new Date();
    var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function prng() {
      return (xg.next() >>> 0) / 0x100000000;
    };
    prng.double = function () {
      do {
        var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21);
      } while (result === 0);
      return result;
    };
    prng.int32 = xg.next;
    prng.quick = prng;
    if (state) {
      if (state.x) copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(2)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return impl;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.xorshift7 = impl;
  }
})(undefined, ( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function (global, module, define) {

  function XorGen(seed) {
    var me = this,
        strseed = '';

    // Set up generator function.
    me.next = function () {
      var t = me.x ^ me.x >>> 2;
      me.x = me.y;me.y = me.z;me.z = me.w;me.w = me.v;
      return (me.d = me.d + 362437 | 0) + (me.v = me.v ^ me.v << 4 ^ (t ^ t << 1)) | 0;
    };

    me.x = 0;
    me.y = 0;
    me.z = 0;
    me.w = 0;
    me.v = 0;

    if (seed === (seed | 0)) {
      // Integer seed.
      me.x = seed;
    } else {
      // String seed.
      strseed += seed;
    }

    // Mix in string seed, then discard an initial batch of 64 values.
    for (var k = 0; k < strseed.length + 64; k++) {
      me.x ^= strseed.charCodeAt(k) | 0;
      if (k == strseed.length) {
        me.d = me.x << 10 ^ me.x >>> 4;
      }
      me.next();
    }
  }

  function copy(f, t) {
    t.x = f.x;
    t.y = f.y;
    t.z = f.z;
    t.w = f.w;
    t.v = f.v;
    t.d = f.d;
    return t;
  }

  function impl(seed, opts) {
    var xg = new XorGen(seed),
        state = opts && opts.state,
        prng = function prng() {
      return (xg.next() >>> 0) / 0x100000000;
    };
    prng.double = function () {
      do {
        var top = xg.next() >>> 11,
            bot = (xg.next() >>> 0) / 0x100000000,
            result = (top + bot) / (1 << 21);
      } while (result === 0);
      return result;
    };
    prng.int32 = xg.next;
    prng.quick = prng;
    if (state) {
      if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) == 'object') copy(state, xg);
      prng.state = function () {
        return copy(xg, {});
      };
    }
    return prng;
  }

  if (module && module.exports) {
    module.exports = impl;
  } else if (__webpack_require__(0) && __webpack_require__(2)) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return impl;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    this.xorwow = impl;
  }
})(undefined, ( false ? 'undefined' : _typeof(module)) == 'object' && module, // present in node.js
__webpack_require__(0) // present with an AMD loader
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (pool, math) {
  //
  // The following constants are related to IEEE 754 limits.
  //
  var global = this,
      width = 256,
      // each RC4 output is 0 <= x < 256
  chunks = 6,
      // at least six RC4 outputs for each double
  digits = 52,
      // there are 52 significant digits in a double
  rngname = 'random',
      // rngname: name for Math.random and Math.seedrandom
  startdenom = math.pow(width, chunks),
      significance = math.pow(2, digits),
      overflow = significance * 2,
      mask = width - 1,
      nodecrypto; // node.js crypto module, initialized at the bottom.

  //
  // seedrandom()
  // This is the seedrandom function described above.
  //
  function seedrandom(seed, options, callback) {
    var key = [];
    options = options == true ? { entropy: true } : options || {};

    // Flatten the seed string or build one from local entropy if needed.
    var shortseed = mixkey(flatten(options.entropy ? [seed, tostring(pool)] : seed == null ? autoseed() : seed, 3), key);

    // Use the seed to initialize an ARC4 generator.
    var arc4 = new ARC4(key);

    // This function returns a random double in [0, 1) that contains
    // randomness in every bit of the mantissa of the IEEE 754 value.
    var prng = function prng() {
      var n = arc4.g(chunks),
          // Start with a numerator n < 2 ^ 48
      d = startdenom,
          //   and denominator d = 2 ^ 48.
      x = 0; //   and no 'extra last byte'.
      while (n < significance) {
        // Fill up all significant digits by
        n = (n + x) * width; //   shifting numerator and
        d *= width; //   denominator and generating a
        x = arc4.g(1); //   new least-significant-byte.
      }
      while (n >= overflow) {
        // To avoid rounding up, before adding
        n /= 2; //   last byte, shift everything
        d /= 2; //   right using integer math until
        x >>>= 1; //   we have exactly the desired bits.
      }
      return (n + x) / d; // Form the number within [0, 1).
    };

    prng.int32 = function () {
      return arc4.g(4) | 0;
    };
    prng.quick = function () {
      return arc4.g(4) / 0x100000000;
    };
    prng.double = prng;

    // Mix the randomness into accumulated entropy.
    mixkey(tostring(arc4.S), pool);

    // Calling convention: what to return as a function of prng, seed, is_math.
    return (options.pass || callback || function (prng, seed, is_math_call, state) {
      if (state) {
        // Load the arc4 state from the given state if it has an S array.
        if (state.S) {
          copy(state, arc4);
        }
        // Only provide the .state method if requested via options.state.
        prng.state = function () {
          return copy(arc4, {});
        };
      }

      // If called as a method of Math (Math.seedrandom()), mutate
      // Math.random because that is how seedrandom.js has worked since v1.0.
      if (is_math_call) {
        math[rngname] = prng;return seed;
      }

      // Otherwise, it is a newer calling convention, so return the
      // prng directly.
      else return prng;
    })(prng, shortseed, 'global' in options ? options.global : this == math, options.state);
  }
  math['seed' + rngname] = seedrandom;

  //
  // ARC4
  //
  // An ARC4 implementation.  The constructor takes a key in the form of
  // an array of at most (width) integers that should be 0 <= x < (width).
  //
  // The g(count) method returns a pseudorandom integer that concatenates
  // the next (count) outputs from ARC4.  Its return value is a number x
  // that is in the range 0 <= x < (width ^ count).
  //
  function ARC4(key) {
    var t,
        keylen = key.length,
        me = this,
        i = 0,
        j = me.i = me.j = 0,
        s = me.S = [];

    // The empty key [] is treated as [0].
    if (!keylen) {
      key = [keylen++];
    }

    // Set up S using the standard key scheduling algorithm.
    while (i < width) {
      s[i] = i++;
    }
    for (i = 0; i < width; i++) {
      s[i] = s[j = mask & j + key[i % keylen] + (t = s[i])];
      s[j] = t;
    }

    // The "g" method returns the next (count) outputs as one number.
    (me.g = function (count) {
      // Using instance members instead of closure state nearly doubles speed.
      var t,
          r = 0,
          i = me.i,
          j = me.j,
          s = me.S;
      while (count--) {
        t = s[i = mask & i + 1];
        r = r * width + s[mask & (s[i] = s[j = mask & j + t]) + (s[j] = t)];
      }
      me.i = i;me.j = j;
      return r;
      // For robust unpredictability, the function call below automatically
      // discards an initial batch of values.  This is called RC4-drop[256].
      // See http://google.com/search?q=rsa+fluhrer+response&btnI
    })(width);
  }

  //
  // copy()
  // Copies internal state of ARC4 to or from a plain object.
  //
  function copy(f, t) {
    t.i = f.i;
    t.j = f.j;
    t.S = f.S.slice();
    return t;
  };

  //
  // flatten()
  // Converts an object tree to nested arrays of strings.
  //
  function flatten(obj, depth) {
    var result = [],
        typ = typeof obj === 'undefined' ? 'undefined' : _typeof(obj),
        prop;
    if (depth && typ == 'object') {
      for (prop in obj) {
        try {
          result.push(flatten(obj[prop], depth - 1));
        } catch (e) {}
      }
    }
    return result.length ? result : typ == 'string' ? obj : obj + '\0';
  }

  //
  // mixkey()
  // Mixes a string seed into a key that is an array of integers, and
  // returns a shortened string seed that is equivalent to the result key.
  //
  function mixkey(seed, key) {
    var stringseed = seed + '',
        smear,
        j = 0;
    while (j < stringseed.length) {
      key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
    }
    return tostring(key);
  }

  //
  // autoseed()
  // Returns an object for autoseeding, using window.crypto and Node crypto
  // module if available.
  //
  function autoseed() {
    try {
      var out;
      if (nodecrypto && (out = nodecrypto.randomBytes)) {
        // The use of 'out' to remember randomBytes makes tight minified code.
        out = out(width);
      } else {
        out = new Uint8Array(width);
        (global.crypto || global.msCrypto).getRandomValues(out);
      }
      return tostring(out);
    } catch (e) {
      var browser = global.navigator,
          plugins = browser && browser.plugins;
      return [+new Date(), global, plugins, global.screen, tostring(pool)];
    }
  }

  //
  // tostring()
  // Converts an array of charcodes to a string
  //
  function tostring(a) {
    return String.fromCharCode.apply(0, a);
  }

  //
  // When seedrandom.js is loaded, we immediately mix a few bits
  // from the built-in RNG into the entropy pool.  Because we do
  // not want to interfere with deterministic PRNG state later,
  // seedrandom will not call math.random on its own again after
  // initialization.
  //
  mixkey(math.random(), pool);

  //
  // Nodejs and AMD support: export the implementation as a module using
  // either convention.
  //
  if (( false ? 'undefined' : _typeof(module)) == 'object' && module.exports) {
    module.exports = seedrandom;
    // When in node.js, try using crypto package for autoseeding.
    try {
      nodecrypto = __webpack_require__(14);
    } catch (ex) {}
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return seedrandom;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  // End anonymous scope, and pass initial values.
})([], // pool: entropy pool starts empty
Math // math: package containing random, pow, and seedrandom
);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _seedrandom = __webpack_require__(3);

var _seedrandom2 = _interopRequireDefault(_seedrandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global Image */

var Boundingbox = function (_Component) {
  _inherits(Boundingbox, _Component);

  function Boundingbox(props) {
    _classCallCheck(this, Boundingbox);

    var _this = _possibleConstructorReturn(this, (Boundingbox.__proto__ || Object.getPrototypeOf(Boundingbox)).call(this, props));

    _this.state = {
      canvasCreated: false,
      hoverIndex: -1,
      segmentColors: []
    };

    if (props.segmentationJsonUrl) {
      fetch(props.segmentationJsonUrl).then(function (response) {
        return response.json();
      }).then(function (response) {

        if (response.body && response.body.predictions && response.body.predictions[0] && response.body.predictions[0].vals && response.body.predictions[0].vals.length > 0) {

          _this.setState({ isSegmented: false });
          _this.renderSegmentation(response.body.predictions[0].vals);
        }
      });
    }
    return _this;
  }

  _createClass(Boundingbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var ctx = this.canvas.getContext('2d');

      var background = new Image();
      background.src = this.props.options.base64Image ? 'data:image/png;base64,' + this.props.image : this.props.image;

      // Make sure the image is loaded first otherwise nothing will draw.
      background.onload = function () {
        _this2.canvas.width = background.width;
        _this2.canvas.height = background.height;

        ctx.drawImage(background, 0, 0);
        _this2.renderBoxes();

        var hasSegmentedState = _this2.state.pixelSegmentation && _this2.state.pixelSegmentation.length > 0 && !_this2.state.isSegmented;

        var hasSegmentedProps = _this2.props.pixelSegmentation && _this2.props.pixelSegmentation.length > 0 && !_this2.state.isSegmented;

        var hasSegmentionMasks = _this2.props.segmentationMasks && _this2.props.segmentationMasks.length > 0 && !_this2.state.isSegmented;

        if (hasSegmentedState) _this2.renderSegmentation(_this2.state.pixelSegmentation);

        if (hasSegmentedProps) _this2.renderSegmentation(_this2.props.pixelSegmentation);

        if (hasSegmentionMasks) _this2.renderSegmentationMasks();

        _this2.canvas.onmousemove = function (e) {
          // Get the current mouse position
          var r = _this2.canvas.getBoundingClientRect();
          var scaleX = _this2.canvas.width / r.width;
          var scaleY = _this2.canvas.height / r.height;
          var x = (e.clientX - r.left) * scaleX;
          var y = (e.clientY - r.top) * scaleY;

          // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

          var selectedBox = { index: -1, dimensions: null };

          if (_this2.props.boxes && _this2.props.boxes.length > 0) {

            _this2.props.boxes.forEach(function (box, index) {

              if (!box || typeof box === 'undefined') return null;

              var coord = box.coord ? box.coord : box;

              var bx = 0,
                  by = 0,
                  bw = 0,
                  bh = 0;


              if (coord.xmin && coord.xmax && coord.ymin && coord.ymax) {
                var _ref = [coord.xmin, coord.ymax, Math.abs(coord.xmax - coord.xmin), Math.abs(coord.ymax - coord.ymin)];

                // coord is an object containing xmin, xmax, ymin, ymax attributes
                // width is absolute value of (xmax - xmin)
                // height is absolute value of (ymax - ymin)
                // absolute value takes care of various possible referentials:
                //   - sometimes 0,0 is top-left corner
                //   - sometimes 0,0 is bottom-left corner

                bx = _ref[0];
                by = _ref[1];
                bw = _ref[2];
                bh = _ref[3];
              } else {
                var _coord = _slicedToArray(coord, 4);

                // coord is an array containing [x, y, width, height] values


                bx = _coord[0];
                by = _coord[1];
                bw = _coord[2];
                bh = _coord[3];
              }

              if (x >= bx && x <= bx + bw && y >= by && y <= by + bh) {
                // The mouse honestly hits the rect
                var insideBox = !selectedBox.dimensions || bx >= selectedBox.dimensions[0] && bx <= selectedBox.dimensions[0] + selectedBox.dimensions[2] && by >= selectedBox.dimensions[1] && by <= selectedBox.dimensions[1] + selectedBox.dimensions[3];
                if (insideBox) {
                  selectedBox.index = index;
                  selectedBox.dimensions = box;
                }
              }
            });
          } else if (_this2.state.pixelSegmentation && _this2.state.pixelSegmentation.length > 0) {
            selectedBox.index = _this2.state.pixelSegmentation[x + _this2.canvas.width * y];
          }

          _this2.props.onSelected(selectedBox.index);
          _this2.setState({ hoverIndex: selectedBox.index });
        };

        _this2.canvas.onmouseout = function () {
          _this2.props.onSelected(-1);
          _this2.setState({ hoverIndex: -1 });
          // this.renderBoxes();
        };
      };
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      var background = new Image();
      background.src = this.props.options.base64Image ? 'data:image/png;base64,' + this.props.image : this.props.image;

      // Check canvas dimension with loaded image dimension
      // in order to change canvas dimension if needed
      background.onload = function () {

        if (_this3.canvas.width !== background.width && _this3.canvas.height !== background.height) {
          _this3.canvas.width = background.width;
          _this3.canvas.height = background.height;
          ctx.drawImage(background, 0, 0);
        }
      };

      ctx.drawImage(background, 0, 0);

      this.setState({ hoverIndex: nextProps.selectedIndex });

      var hasSegmentedProps = nextProps.pixelSegmentation && nextProps.pixelSegmentation.length > 0;

      if (hasSegmentedProps) {
        this.setState({ isSegmented: false });
        this.renderSegmentation(nextProps.pixelSegmentation);
      }

      return true;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderBoxes();
    }
  }, {
    key: 'segmentColor',
    value: function segmentColor(classIndex) {

      var segmentColors = this.state.segmentColors;

      if (segmentColors[classIndex] && segmentColors[classIndex].length === 3) {
        return segmentColors[classIndex];
      }

      var r = void 0;
      var g = void 0;
      var b = void 0;

      if (this.props.segmentationColors && this.props.segmentationColors[classIndex]) {
        var hex = this.props.segmentationColors[classIndex];
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        r = parseInt(result[1], 16);
        g = parseInt(result[2], 16);
        b = parseInt(result[3], 16);
      } else {
        var random = (0, _seedrandom2.default)(classIndex);
        r = Math.floor(random() * 255);
        g = Math.floor(random() * 255);
        b = Math.floor(random() * 255);
      }

      segmentColors[classIndex] = [r, g, b];
      this.setState({ segmentColors: segmentColors });

      return [r, g, b];
    }
  }, {
    key: 'renderBox',
    value: function renderBox(box, index) {

      if (!box || typeof box === 'undefined') return null;

      var color = this.props.options.colors.normal;
      if (this.state.hoverIndex >= 0) {
        color = this.props.options.colors.unselected;
      }
      if (index === this.state.hoverIndex) {
        color = this.props.options.colors.selected;
      }

      var lineWidth = 2;
      if (this.canvas.width > 600) {
        lineWidth = 3;
      }
      if (this.canvas.width > 1000) {
        lineWidth = 5;
      }

      this.props.drawBox(this.canvas, box, color, lineWidth);
      if (box.label) {
        this.props.drawLabel(this.canvas, box);
      };
    }
  }, {
    key: 'renderBoxes',
    value: function renderBoxes() {
      var _this4 = this;

      if (this.props.boxes && this.props.boxes.length > 0) {

        this.props.boxes.map(function (box, index) {
          var selected = index === _this4.state.hoverIndex;
          return { box: box, index: index, selected: selected };
        }).sort(function (a) {
          return a.selected ? 1 : -1;
        }).forEach(function (box) {
          return _this4.renderBox(box.box, box.index);
        });
      }
    }
  }, {
    key: 'renderSegmentation',
    value: function renderSegmentation(segmentation) {

      var ctx = null;
      var imgd = null;

      if (this.props.separateSegmentation && this.segCanvas) {

        this.segCanvas.width = this.canvas.width;
        this.segCanvas.height = this.canvas.height;
        ctx = this.segCanvas.getContext('2d');
        imgd = ctx.getImageData(0, 0, this.segCanvas.width, this.segCanvas.height);
        var pix = imgd.data;

        for (var i = 0, j = 0, n = pix.length; i < n; i += 4, j += 1) {
          var segmentClass = segmentation[j];
          var segmentColor = this.segmentColor(segmentClass);
          pix[i] = segmentColor[0];
          pix[i + 1] = segmentColor[1];
          pix[i + 2] = segmentColor[2];
          pix[i + 3] = 255;
        }
      } else {

        ctx = this.canvas.getContext('2d');
        imgd = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        var _pix = imgd.data;

        for (var i = 0, j = 0, n = _pix.length; i < n; i += 4, j += 1) {
          var _segmentClass = segmentation[j];
          var _segmentColor = this.segmentColor(_segmentClass);
          _pix[i] = Math.round((_pix[i] + _segmentColor[0]) / 2);
          _pix[i + 1] = Math.round((_pix[i + 1] + _segmentColor[1]) / 2);
          _pix[i + 2] = Math.round((_pix[i + 2] + _segmentColor[2]) / 2);
          _pix[i + 3] = 200;
        }
      }

      ctx.putImageData(imgd, 0, 0);
      this.setState({ isSegmented: true });
    }
  }, {
    key: 'renderSegmentationMasks',
    value: function renderSegmentationMasks() {
      var _this5 = this;

      var _props = this.props,
          boxes = _props.boxes,
          segmentationMasks = _props.segmentationMasks,
          segmentationTransparency = _props.segmentationTransparency;


      this.segCanvas.width = this.canvas.width;
      this.segCanvas.height = this.canvas.height;
      var ctx = this.segCanvas.getContext('2d');

      segmentationMasks.forEach(function (mask, index) {

        // Fetch segment color,
        // using box label or current mask index
        var segmentColor = _this5.segmentColor(boxes[index].label ? boxes[index].label : index);

        // Fetch image data
        // using the box coordinates
        // and the mask dimensions
        var maskData = ctx.getImageData(parseInt(boxes[index].xmin, 10), parseInt(boxes[index].ymin, 10), mask.width, mask.height);

        // Fill image data with new mask color
        for (var i = 0, j = 0; i < maskData.data.length; j++, i += 4) {
          if (mask.data[j] > 0) {
            maskData.data[i] = segmentColor[0];
            maskData.data[i + 1] = segmentColor[1];
            maskData.data[i + 2] = segmentColor[2];
            maskData.data[i + 3] = segmentationTransparency;
          }
        }

        // Put new mask data on displayed canvas
        ctx.putImageData(maskData, parseInt(boxes[index].xmin, 10), parseInt(boxes[index].ymin, 10), 0, 0, mask.width, mask.height);
      });

      this.setState({ isSegmented: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement('canvas', {
          className: 'boundingBoxCanvas',
          style: this.props.options.style,
          ref: function ref(canvas) {
            _this6.canvas = canvas;
          }
        }),
        this.props.separateSegmentation ? _react2.default.createElement('canvas', {
          className: 'boundingSegmentationCanvas',
          style: this.props.options.style,
          ref: function ref(canvas) {
            _this6.segCanvas = canvas;
          }
        }) : null
      );
    }
  }]);

  return Boundingbox;
}(_react.Component);

Boundingbox.propTypes = {
  image: _propTypes2.default.string,
  boxes: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.array), _propTypes2.default.arrayOf(_propTypes2.default.object)]),
  separateSegmentation: _propTypes2.default.bool,
  segmentationJsonUrl: _propTypes2.default.string,
  segmentationColors: _propTypes2.default.array,
  segmentationMasks: _propTypes2.default.array,
  segmentationTransparency: _propTypes2.default.number,
  selectedIndex: _propTypes2.default.number,
  drawBox: _propTypes2.default.func,
  drawLabel: _propTypes2.default.func,
  onSelected: _propTypes2.default.func,
  options: _propTypes2.default.shape({
    colors: _propTypes2.default.shape({
      normal: _propTypes2.default.string,
      selected: _propTypes2.default.string,
      unselected: _propTypes2.default.string
    }),
    style: _propTypes2.default.object,
    base64Image: _propTypes2.default.bool
  })
};

Boundingbox.defaultProps = {

  separateSegmentation: false,
  segmentationTransparency: 190,
  onSelected: function onSelected() {},
  drawBox: function drawBox(canvas, box, color, lineWidth) {

    if (!box || typeof box === 'undefined') return null;

    var ctx = canvas.getContext('2d');

    var coord = box.coord ? box.coord : box;

    var x = 0,
        y = 0,
        width = 0,
        height = 0;


    if (coord.xmin && coord.xmax && coord.ymin && coord.ymax) {
      var _ref2 = [coord.xmin, coord.ymax, Math.abs(coord.xmax - coord.xmin), Math.abs(coord.ymax - coord.ymin)];

      // coord is an object containing xmin, xmax, ymin, ymax attributes
      // width is absolute value of (xmax - xmin)
      // height is absolute value of (ymax - ymin)
      // absolute value takes care of various possible referentials:
      //   - sometimes 0,0 is top-left corner
      //   - sometimes 0,0 is bottom-left corner

      x = _ref2[0];
      y = _ref2[1];
      width = _ref2[2];
      height = _ref2[3];
    } else {
      var _coord2 = _slicedToArray(coord, 4);

      // coord is an array containing [x, y, width, height] values


      x = _coord2[0];
      y = _coord2[1];
      width = _coord2[2];
      height = _coord2[3];
    }

    if (x < lineWidth / 2) {
      x = lineWidth / 2;
    }
    if (y < lineWidth / 2) {
      y = lineWidth / 2;
    }

    if (x + width > canvas.width) {
      width = canvas.width - lineWidth - x;
    }
    if (y + height > canvas.height) {
      height = canvas.height - lineWidth - y;
    }

    // Left segment
    var tenPercent = width / 10;
    var ninetyPercent = 9 * tenPercent;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x + tenPercent, y);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + tenPercent, y + height);
    ctx.stroke();

    // Right segment
    ctx.beginPath();
    ctx.moveTo(x + ninetyPercent, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + ninetyPercent, y + height);
    ctx.stroke();
  },
  drawLabel: function drawLabel(canvas, box) {

    if (!box || typeof box === 'undefined') return null;

    var ctx = canvas.getContext('2d');

    var coord = box.coord ? box.coord : box;

    var x = 0,
        y = 0,
        width = 0,
        height = 0;


    if (coord.xmin && coord.xmax && coord.ymin && coord.ymax) {
      var _ref3 = [coord.xmin, coord.ymax, Math.abs(coord.xmax - coord.xmin), Math.abs(coord.ymax - coord.ymin)];

      // coord is an object containing xmin, xmax, ymin, ymax attributes
      // width is absolute value of (xmax - xmin)
      // height is absolute value of (ymax - ymin)
      // absolute value takes care of various possible referentials:
      //   - sometimes 0,0 is top-left corner
      //   - sometimes 0,0 is bottom-left corner

      x = _ref3[0];
      y = _ref3[1];
      width = _ref3[2];
      height = _ref3[3];
    } else {
      var _coord3 = _slicedToArray(coord, 4);

      // coord is an array containing [x, y, width, height] values


      x = _coord3[0];
      y = _coord3[1];
      width = _coord3[2];
      height = _coord3[3];
    }

    ctx.font = '60px Arial';
    ctx.fillStyle = 'rgba(225,0,0,1)';
    ctx.fillText(box.label, x, y + height);
  },

  options: {
    colors: {
      normal: 'rgba(255,225,255,1)',
      selected: 'rgba(0,225,204,1)',
      unselected: 'rgba(100,100,100,1)'
    },
    style: {
      maxWidth: '100%',
      maxHeight: '90vh'
    },
    base64Image: false
  }
};

exports.default = Boundingbox;
module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});