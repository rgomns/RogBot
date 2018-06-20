'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

//
// ___________________________________________________________
//
//  _____  _    _ _______  ______ _______ _____ __   _ ______
// |     |  \  /  |______ |_____/ |  |  |   |   | \  | |     \
// |_____|   \/   |______ |    \_ |  |  | __|__ |  \_| |_____/
//
// _______________________ Screeps AI ________________________
//
//
// Overmind repository: github.com/bencbartlett/overmind
//
global.__VERSION__ = '0.4.1';
global.deref = function (ref) {
    return Game.getObjectById(ref) || Game.flags[ref] || Game.creeps[ref] || Game.spawns[ref] || null;
};
global.derefRoomPosition = function (protoPos) {
    return new RoomPosition(protoPos.x, protoPos.y, protoPos.roomName);
};

// Creep properties ====================================================================================================
// Boosting logic ------------------------------------------------------------------------------------------------------
Object.defineProperties(Creep.prototype, {
    boosts: {
        get() {
            if (!this._boosts) {
                this._boosts = _.compact(_.unique(_.map(this.body, bodyPart => bodyPart.boost)));
            }
            return this._boosts;
            // return _.compact(_.unique(_.map(this.body as BodyPartDefinition[],
            // 								bodyPart => bodyPart.boost))) as _ResourceConstantSansEnergy[];
        },
    },
    boostCounts: {
        get() {
            if (!this._boostCounts) {
                this._boostCounts = _.countBy(this.body, bodyPart => bodyPart.boost);
            }
            return this._boostCounts;
            // return _.countBy(this.body as BodyPartDefinition[], bodyPart => bodyPart.boost);
        }
    },
});

// import {Pathing} from '../pathing/pathing';
// import {log} from '../lib/logger/log';
//
//
// // Set the colony of the flag to be
// Flag.prototype.recalculateColony = function (restrictDistance = 10): void {
// 	log.info(`Recalculating colony association for ${this.name} in ${this.pos.roomName}`);
// 	let nearestColonyName = '';
// 	let minDistance = Infinity;
// 	let colonyRooms = _.filter(Game.rooms, room => room.my);
// 	for (let room of colonyRooms) {
// 		let ret = Pathing.findShortestPath(this.pos, room.controller!.pos,
// 										   {restrictDistance: restrictDistance});
// 		if (!ret.incomplete) {
// 			if (ret.path.length < minDistance) {
// 				nearestColonyName = room.name;
// 				minDistance = ret.path.length;
// 			}
// 			log.info(`Path length to ${room.name}: ${ret.path.length}`);
// 		} else {
// 			log.info(`Incomplete path found to ${room.name}`);
// 		}
// 	}
// 	if (nearestColonyName != '') {
// 		log.info(`Best match: ${nearestColonyName!}`);
// 		this.memory.colony = nearestColonyName;
// 	} else {
// 		log.warning(`Could not find colony match for ${this.name} in ${this.pos.roomName}!`);
// 	}
// };

// RoomObject prototypes
Object.defineProperty(RoomObject.prototype, 'ref', {
    get: function () {
        return this.id || this.name || '';
    },
});
Object.defineProperty(RoomObject.prototype, 'targetedBy', {
    get: function () {
        return Overmind.cache.targets[this.ref];
    },
});
// Link association ====================================================================================================
Object.defineProperty(RoomObject.prototype, 'linked', {
    get: function () {
        return this.pos.findInRange(this.room.links, 2).length > 0;
    },
});
Object.defineProperty(RoomObject.prototype, 'nearbyLinks', {
    get: function () {
        return this.pos.findInRange(this.room.links, 2);
    },
});
RoomObject.prototype.serialize = function () {
    let pos = {
        x: this.pos.x,
        y: this.pos.y,
        roomName: this.pos.roomName
    };
    return {
        pos: pos,
        ref: this.ref
    };
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var lodash_minby = createCommonjsModule(function (module, exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of methods like `_.max` and `_.min` which accepts a
 * `comparator` to determine the extremum value.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The iteratee invoked per iteration.
 * @param {Function} comparator The comparator used to compare values.
 * @returns {*} Returns the extremum value.
 */
function baseExtremum(array, iteratee, comparator) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index],
        current = iteratee(value);

    if (current != null && (computed === undefined
          ? (current === current && !isSymbol(current))
          : comparator(current, computed)
        )) {
      var computed = current,
          result = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.lt` which doesn't coerce arguments.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if `value` is less than `other`,
 *  else `false`.
 */
function baseLt(value, other) {
  return value < other;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

/**
 * This method is like `_.min` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * the value is ranked. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {*} Returns the minimum value.
 * @example
 *
 * var objects = [{ 'n': 1 }, { 'n': 2 }];
 *
 * _.minBy(objects, function(o) { return o.n; });
 * // => { 'n': 1 }
 *
 * // The `_.property` iteratee shorthand.
 * _.minBy(objects, 'n');
 * // => { 'n': 1 }
 */
function minBy(array, iteratee) {
  return (array && array.length)
    ? baseExtremum(array, baseIteratee(iteratee, 2), baseLt)
    : undefined;
}

module.exports = minBy;
});

Object.defineProperty(RoomPosition.prototype, 'print', {
    get() {
        return '<a href="#!/room/' + Game.shard.name + '/' + this.roomName + '">[' + this.roomName + ', ' + this.x + ', ' + this.y + ']</a>';
    }
});
Object.defineProperty(RoomPosition.prototype, 'room', {
    get: function () {
        return Game.rooms[this.roomName];
    },
});
Object.defineProperty(RoomPosition.prototype, 'name', {
    get: function () {
        return this.roomName + ':' + this.x + ':' + this.y;
    },
});
Object.defineProperty(RoomPosition.prototype, 'coordName', {
    get: function () {
        return this.x + ':' + this.y;
    },
});
RoomPosition.prototype.lookForStructure = function (structureType) {
    return _.find(this.lookFor(LOOK_STRUCTURES), s => s.structureType == structureType);
};
Object.defineProperty(RoomPosition.prototype, 'isEdge', {
    get: function () {
        return this.x == 0 || this.x == 49 || this.y == 0 || this.y == 49;
    },
});
Object.defineProperty(RoomPosition.prototype, 'isVisible', {
    get: function () {
        return Game.rooms[this.roomName] != undefined;
    },
});
Object.defineProperty(RoomPosition.prototype, 'rangeToEdge', {
    get: function () {
        return _.min([this.x, 49 - this.x, this.y, 49 - this.y]);
    },
});
Object.defineProperty(RoomPosition.prototype, 'roomCoords', {
    get: function () {
        let parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(this.roomName);
        let x = parseInt(parsed[1], 10);
        let y = parseInt(parsed[2], 10);
        if (this.roomName.includes('W'))
            x = -x;
        if (this.roomName.includes('N'))
            y = -y;
        return { x: x, y: y };
    },
});
Object.defineProperty(RoomPosition.prototype, 'neighbors', {
    get: function () {
        let adjPos = [];
        for (let dx of [-1, 0, 1]) {
            for (let dy of [-1, 0, 1]) {
                if (!(dx == 0 && dy == 0)) {
                    let x = this.x + dx;
                    let y = this.y + dy;
                    if (0 < x && x < 49 && 0 < y && y < 49) {
                        adjPos.push(new RoomPosition(x, y, this.roomName));
                    }
                }
            }
        }
        return adjPos;
    }
});
RoomPosition.prototype.getPositionsInRange = function (range, includeWalls = false, includeEdges = false) {
    let adjPos = [];
    let [xmin, xmax] = includeEdges ? [0, 49] : [1, 48];
    for (let dx = -1 * range; dx <= range; dx++) {
        for (let dy = -1 * range; dy <= range; dy++) {
            let x = this.x + dx;
            let y = this.y + dy;
            if (xmin <= x && x <= xmax && xmin <= y && y <= xmax) {
                if (includeWalls || Game.map.getTerrainAt(x, y, this.roomName) != 'wall') {
                    adjPos.push(new RoomPosition(x, y, this.roomName));
                }
            }
        }
    }
    return adjPos;
};
RoomPosition.prototype.getPositionsAtRange = function (range, includeWalls = false, includeEdges = false) {
    let adjPos = [];
    let [xmin, xmax] = includeEdges ? [0, 49] : [1, 48];
    for (let dx = -1 * range; dx <= range; dx++) {
        for (let dy = -1 * range; dy <= range; dy++) {
            if (Math.max(dx, dy) < range) {
                continue;
            }
            let x = this.x + dx;
            let y = this.y + dy;
            if (xmin <= x && x <= xmax && xmin <= y && y <= xmax) {
                if (includeWalls || Game.map.getTerrainAt(x, y, this.roomName) != 'wall') {
                    adjPos.push(new RoomPosition(x, y, this.roomName));
                }
            }
        }
    }
    return adjPos;
};
// Object.defineProperty(RoomPosition.prototype, 'adjacentSpots', {
// 	get: function () {
// 		return spots;
// 	}
// });
RoomPosition.prototype.isPassible = function (ignoreCreeps = false) {
    // Is terrain passable?
    if (Game.map.getTerrainAt(this) == 'wall')
        return false;
    if (this.isVisible) {
        // Are there creeps?
        if (ignoreCreeps == false && this.lookFor(LOOK_CREEPS).length > 0)
            return false;
        // Are there structures?
        if (_.filter(this.lookFor(LOOK_STRUCTURES), (s) => s.blocksMovement).length > 0)
            return false;
    }
    return true;
};
RoomPosition.prototype.availableNeighbors = function (ignoreCreeps = false) {
    return _.filter(this.neighbors, pos => pos.isPassible(ignoreCreeps));
};
RoomPosition.prototype.getPositionAtDirection = function (direction, range = 1) {
    let x = this.x;
    let y = this.y;
    switch (direction) {
        case 1:
            y -= range;
            break;
        case 2:
            y -= range;
            x += range;
            break;
        case 3:
            x += range;
            break;
        case 4:
            x += range;
            y += range;
            break;
        case 5:
            y += range;
            break;
        case 6:
            y += range;
            x -= range;
            break;
        case 7:
            x -= range;
            break;
        case 8:
            x -= range;
            y -= range;
            break;
    }
    return new RoomPosition(x, y, this.roomName);
};
// Object.defineProperty(RoomPosition.prototype, 'availableAdjacentSpots', {
// 	get: function () {
// 		if (this.isVisible) {
// 			let spots: RoomPosition[] = [];
// 			for (let spot of this.adjacentSpots) {
// 				let structures = this.look;
// 				if (Game.map.getTerrainAt(neighbor) != 'wall') {
// 					// Doesn't include constructed walls
// 					spots.push(neighbor);
// 				}
// 			}
// 			return spots;
// 		} else {
// 			return this.adjacentSpots; // Assume there's nothing there
// 		}
// 	}
// });
// Get an estimate for the distance to another room position in a possibly different room
RoomPosition.prototype.getMultiRoomRangeTo = function (pos) {
    if (this.roomName == pos.roomName) {
        return this.getRangeTo(pos);
    }
    else {
        let from = this.roomCoords;
        let to = pos.roomCoords;
        let dx = Math.abs(50 * (to.x - from.x) + pos.x - this.x);
        let dy = Math.abs(50 * (to.y - from.y) + pos.y - this.y);
        return _.max([dx, dy]);
    }
};
RoomPosition.prototype.findClosestByLimitedRange = function (objects, rangeLimit, opts) {
    let objectsInRange = this.findInRange(objects, rangeLimit, opts);
    return this.findClosestByRange(objectsInRange, opts);
};
RoomPosition.prototype.findClosestByMultiRoomRange = function (objects) {
    return lodash_minby(objects, (obj) => this.getMultiRoomRangeTo(obj.pos));
};
// This should only be used within a single room
RoomPosition.prototype.findClosestByRangeThenPath = function (objects) {
    let distances = _.map(objects, obj => this.getRangeTo(obj));
    let minDistance = _.min(distances);
    if (minDistance > 4) {
        return this.findClosestByRange(objects);
    }
    else {
        let closestObjects = _.filter(objects, obj => this.getRangeTo(obj) == minDistance);
        return this.findClosestByPath(closestObjects); // don't clutter up pathing.distance cached values
    }
};

RoomVisual.prototype.infoBox = function (info, x, y, opts = {}) {
    _.defaults(opts, {
        color: colors.infoBoxGood,
        textstyle: false,
        textsize: speechSize,
        textfont: 'verdana',
        opacity: 0.7,
    });
    let fontstring = '';
    if (opts.textstyle) {
        fontstring = opts.textstyle + ' ';
    }
    fontstring += opts.textsize + ' ' + opts.textfont;
    let pointer = [
        [.9, -0.25],
        [.9, 0.25],
        [0.3, 0.0],
    ];
    pointer = relPoly(x, y, pointer);
    pointer.push(pointer[0]);
    // Draw arrow
    this.poly(pointer, {
        fill: undefined,
        stroke: opts.color,
        opacity: opts.opacity,
        strokeWidth: 0.0
    });
    // // Draw box
    // this.rect(x + 0.9, y - 0.8 * opts.textsize,
    // 	0.55 * opts.textsize * _.max(_.map(info, line => line.length)), info.length * opts.textsize,
    // 	{
    // 		fill   : undefined,
    // 		opacity: opts.opacity
    // 	});
    // Draw vertical bar
    let x0 = x + 0.9;
    let y0 = y - 0.8 * opts.textsize;
    this.line(x0, y0, x0, y0 + info.length * opts.textsize, {
        color: opts.color,
    });
    // Draw text
    let dy = 0;
    for (let line of info) {
        this.text(line, x + 1, y + dy, {
            color: opts.color,
            // backgroundColor  : opts.background,
            backgroundPadding: 0.1,
            opacity: opts.opacity,
            font: fontstring,
            align: 'left',
        });
        dy += opts.textsize;
    }
    return this;
};
RoomVisual.prototype.multitext = function (textLines, x, y, opts = {}) {
    _.defaults(opts, {
        color: colors.infoBoxGood,
        textstyle: false,
        textsize: speechSize,
        textfont: 'verdana',
        opacity: 0.7,
    });
    let fontstring = '';
    if (opts.textstyle) {
        fontstring = opts.textstyle + ' ';
    }
    fontstring += opts.textsize + ' ' + opts.textfont;
    // // Draw vertical bar
    // let x0 = x + 0.9;
    // let y0 = y - 0.8 * opts.textsize;
    // this.line(x0, y0, x0, y0 + textLines.length * opts.textsize, {
    // 	color: opts.color,
    // });
    // Draw text
    let dy = 0;
    for (let line of textLines) {
        this.text(line, x, y + dy, {
            color: opts.color,
            // backgroundColor  : opts.background,
            backgroundPadding: 0.1,
            opacity: opts.opacity,
            font: fontstring,
            align: 'left',
        });
        dy += opts.textsize;
    }
    return this;
};
// Taken from https://github.com/screepers/RoomVisual with slight modification: ========================================
const colors = {
    gray: '#555555',
    light: '#AAAAAA',
    road: '#666',
    energy: '#FFE87B',
    power: '#F53547',
    dark: '#181818',
    outline: '#8FBB93',
    speechText: '#000000',
    speechBackground: '#aebcc4',
    infoBoxGood: '#09ff00',
    infoBoxBad: '#ff2600'
};
const speechSize = 0.5;
const speechFont = 'Times New Roman';
RoomVisual.prototype.structure = function (x, y, type, opts = {}) {
    _.defaults(opts, { opacity: 0.5 });
    switch (type) {
        case STRUCTURE_EXTENSION:
            this.circle(x, y, {
                radius: 0.5,
                fill: colors.dark,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity
            });
            this.circle(x, y, {
                radius: 0.35,
                fill: colors.gray,
                opacity: opts.opacity
            });
            break;
        case STRUCTURE_SPAWN:
            this.circle(x, y, {
                radius: 0.65,
                fill: colors.dark,
                stroke: '#CCCCCC',
                strokeWidth: 0.10,
                opacity: opts.opacity
            });
            this.circle(x, y, {
                radius: 0.40,
                fill: colors.energy,
                opacity: opts.opacity
            });
            break;
        case STRUCTURE_POWER_SPAWN:
            this.circle(x, y, {
                radius: 0.65,
                fill: colors.dark,
                stroke: colors.power,
                strokeWidth: 0.10,
                opacity: opts.opacity
            });
            this.circle(x, y, {
                radius: 0.40,
                fill: colors.energy,
                opacity: opts.opacity
            });
            break;
        case STRUCTURE_LINK: {
            // let osize = 0.3;
            // let isize = 0.2;
            let outer = [
                [0.0, -0.5],
                [0.4, 0.0],
                [0.0, 0.5],
                [-0.4, 0.0]
            ];
            let inner = [
                [0.0, -0.3],
                [0.25, 0.0],
                [0.0, 0.3],
                [-0.25, 0.0]
            ];
            outer = relPoly(x, y, outer);
            inner = relPoly(x, y, inner);
            outer.push(outer[0]);
            inner.push(inner[0]);
            this.poly(outer, {
                fill: colors.dark,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity
            });
            this.poly(inner, {
                fill: colors.gray,
                stroke: false,
                opacity: opts.opacity
            });
            break;
        }
        case STRUCTURE_TERMINAL: {
            let outer = [
                [0.0, -0.8],
                [0.55, -0.55],
                [0.8, 0.0],
                [0.55, 0.55],
                [0.0, 0.8],
                [-0.55, 0.55],
                [-0.8, 0.0],
                [-0.55, -0.55],
            ];
            let inner = [
                [0.0, -0.65],
                [0.45, -0.45],
                [0.65, 0.0],
                [0.45, 0.45],
                [0.0, 0.65],
                [-0.45, 0.45],
                [-0.65, 0.0],
                [-0.45, -0.45],
            ];
            outer = relPoly(x, y, outer);
            inner = relPoly(x, y, inner);
            outer.push(outer[0]);
            inner.push(inner[0]);
            this.poly(outer, {
                fill: colors.dark,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity
            });
            this.poly(inner, {
                fill: colors.light,
                stroke: false,
                opacity: opts.opacity
            });
            this.rect(x - 0.45, y - 0.45, 0.9, 0.9, {
                fill: colors.gray,
                stroke: colors.dark,
                strokeWidth: 0.1,
                opacity: opts.opacity
            });
            break;
        }
        case STRUCTURE_LAB:
            this.circle(x, y - 0.025, {
                radius: 0.55,
                fill: colors.dark,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity
            });
            this.circle(x, y - 0.025, {
                radius: 0.40,
                fill: colors.gray,
                opacity: opts.opacity
            });
            this.rect(x - 0.45, y + 0.3, 0.9, 0.25, {
                fill: colors.dark,
                stroke: false,
                opacity: opts.opacity
            });
            {
                let box = [
                    [-0.45, 0.3],
                    [-0.45, 0.55],
                    [0.45, 0.55],
                    [0.45, 0.3],
                ];
                box = relPoly(x, y, box);
                this.poly(box, {
                    stroke: colors.outline,
                    strokeWidth: 0.05,
                    opacity: opts.opacity
                });
            }
            break;
        case STRUCTURE_TOWER:
            this.circle(x, y, {
                radius: 0.6,
                fill: colors.dark,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity
            });
            this.rect(x - 0.4, y - 0.3, 0.8, 0.6, {
                fill: colors.gray,
                opacity: opts.opacity
            });
            this.rect(x - 0.2, y - 0.9, 0.4, 0.5, {
                fill: colors.light,
                stroke: colors.dark,
                strokeWidth: 0.07,
                opacity: opts.opacity
            });
            break;
        case STRUCTURE_ROAD:
            this.circle(x, y, {
                radius: 0.175,
                fill: colors.road,
                stroke: false,
                opacity: opts.opacity
            });
            if (!this.roads)
                this.roads = [];
            this.roads.push([x, y]);
            break;
        case STRUCTURE_RAMPART:
            this.circle(x, y, {
                radius: 0.65,
                fill: '#434C43',
                stroke: '#5D735F',
                strokeWidth: 0.10,
                opacity: opts.opacity
            });
            break;
        case STRUCTURE_WALL:
            this.circle(x, y, {
                radius: 0.40,
                fill: colors.dark,
                stroke: colors.light,
                strokeWidth: 0.05,
                opacity: opts.opacity
            });
            break;
        case STRUCTURE_STORAGE:
            let storageOutline = relPoly(x, y, [
                [-0.45, -0.55],
                [0, -0.65],
                [0.45, -0.55],
                [0.55, 0],
                [0.45, 0.55],
                [0, 0.65],
                [-0.45, 0.55],
                [-0.55, 0],
                [-0.45, -0.55],
            ]);
            this.poly(storageOutline, {
                stroke: colors.outline,
                strokeWidth: 0.05,
                fill: colors.dark,
                opacity: opts.opacity
            });
            this.rect(x - 0.35, y - 0.45, 0.7, 0.9, {
                fill: colors.energy,
                opacity: opts.opacity,
            });
            break;
        case STRUCTURE_OBSERVER:
            this.circle(x, y, {
                fill: colors.dark,
                radius: 0.45,
                stroke: colors.outline,
                strokeWidth: 0.05,
                opacity: opts.opacity
            });
            this.circle(x + 0.225, y, {
                fill: colors.outline,
                radius: 0.20,
                opacity: opts.opacity
            });
            break;
        case STRUCTURE_NUKER:
            let outline = [
                [0, -1],
                [-0.47, 0.2],
                [-0.5, 0.5],
                [0.5, 0.5],
                [0.47, 0.2],
                [0, -1],
            ];
            outline = relPoly(x, y, outline);
            this.poly(outline, {
                stroke: colors.outline,
                strokeWidth: 0.05,
                fill: colors.dark,
                opacity: opts.opacity
            });
            let inline = [
                [0, -.80],
                [-0.40, 0.2],
                [0.40, 0.2],
                [0, -.80],
            ];
            inline = relPoly(x, y, inline);
            this.poly(inline, {
                stroke: colors.outline,
                strokeWidth: 0.01,
                fill: colors.gray,
                opacity: opts.opacity
            });
            break;
        case STRUCTURE_CONTAINER:
            this.rect(x - 0.225, y - 0.3, 0.45, 0.6, {
                fill: 'yellow',
                opacity: opts.opacity,
                stroke: colors.dark,
                strokeWidth: 0.10,
            });
            break;
        default:
            this.circle(x, y, {
                fill: colors.light,
                radius: 0.35,
                stroke: colors.dark,
                strokeWidth: 0.20,
                opacity: opts.opacity
            });
            break;
    }
    return this;
};
const dirs = [
    [],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1]
];
RoomVisual.prototype.connectRoads = function (opts = {}) {
    _.defaults(opts, { opacity: 0.5 });
    let color = opts.color || colors.road || 'white';
    if (!this.roads)
        return;
    // this.text(this.roads.map(r=>r.join(',')).join(' '),25,23)
    this.roads.forEach((r) => {
        // this.text(`${r[0]},${r[1]}`,r[0],r[1],{ size: 0.2 })
        for (let i = 1; i <= 4; i++) {
            let d = dirs[i];
            let c = [r[0] + d[0], r[1] + d[1]];
            let rd = _.some(this.roads, r => r[0] == c[0] && r[1] == c[1]);
            // this.text(`${c[0]},${c[1]}`,c[0],c[1],{ size: 0.2, color: rd?'green':'red' })
            if (rd) {
                this.line(r[0], r[1], c[0], c[1], {
                    color: color,
                    width: 0.35,
                    opacity: opts.opacity
                });
            }
        }
    });
    return this;
};
RoomVisual.prototype.speech = function (text, x, y, opts = {}) {
    var background = !!opts.background ? opts.background : colors.speechBackground;
    var textcolor = !!opts.textcolor ? opts.textcolor : colors.speechText;
    // noinspection PointlessBooleanExpressionJS
    var textstyle = !!opts.textstyle ? opts.textstyle : false;
    var textsize = !!opts.textsize ? opts.textsize : speechSize;
    var textfont = !!opts.textfont ? opts.textfont : speechFont;
    var opacity = !!opts.opacity ? opts.opacity : 1;
    var fontstring = '';
    if (textstyle) {
        fontstring = textstyle + ' ';
    }
    fontstring += textsize + ' ' + textfont;
    let pointer = [
        [-0.2, -0.8],
        [0.2, -0.8],
        [0, -0.3]
    ];
    pointer = relPoly(x, y, pointer);
    pointer.push(pointer[0]);
    this.poly(pointer, {
        fill: background,
        stroke: background,
        opacity: opacity,
        strokeWidth: 0.0
    });
    this.text(text, x, y - 1, {
        color: textcolor,
        backgroundColor: background,
        backgroundPadding: 0.1,
        opacity: opacity,
        font: fontstring
    });
    return this;
};
RoomVisual.prototype.animatedPosition = function (x, y, opts = {}) {
    let color = !!opts.color ? opts.color : 'blue';
    let opacity = !!opts.opacity ? opts.opacity : 0.5;
    let radius = !!opts.radius ? opts.radius : 0.75;
    let frames = !!opts.frames ? opts.frames : 6;
    let angle = (Game.time % frames * 90 / frames) * (Math.PI / 180);
    let s = Math.sin(angle);
    let c = Math.cos(angle);
    let sizeMod = Math.abs(Game.time % frames - frames / 2) / 10;
    radius += radius * sizeMod;
    let points = [
        rotate(0, -radius, s, c, x, y),
        rotate(radius, 0, s, c, x, y),
        rotate(0, radius, s, c, x, y),
        rotate(-radius, 0, s, c, x, y),
        rotate(0, -radius, s, c, x, y),
    ];
    this.poly(points, { stroke: color, opacity: opacity });
    return this;
};
function rotate(x, y, s, c, px, py) {
    let xDelta = x * c - y * s;
    let yDelta = x * s + y * c;
    return { x: px + xDelta, y: py + yDelta };
}
function relPoly(x, y, poly) {
    return poly.map(p => {
        p[0] += x;
        p[1] += y;
        return p;
    });
}
RoomVisual.prototype.test = function () {
    let demopos = [19, 24];
    this.clear();
    this.structure(demopos[0] + 0, demopos[1] + 0, STRUCTURE_LAB);
    this.structure(demopos[0] + 1, demopos[1] + 1, STRUCTURE_TOWER);
    this.structure(demopos[0] + 2, demopos[1] + 0, STRUCTURE_LINK);
    this.structure(demopos[0] + 3, demopos[1] + 1, STRUCTURE_TERMINAL);
    this.structure(demopos[0] + 4, demopos[1] + 0, STRUCTURE_EXTENSION);
    this.structure(demopos[0] + 5, demopos[1] + 1, STRUCTURE_SPAWN);
    this.animatedPosition(demopos[0] + 7, demopos[1]);
    this.speech('This is a test!', demopos[0] + 10, demopos[1], { opacity: 0.7 });
    this.infoBox(['This is', 'a test', 'mmmmmmmmmmmmm'], demopos[0] + 15, demopos[1]);
    return this;
};

// Random utilities that don't belong anywhere else
function minMax(value, min, max) {
    return Math.max(Math.min(value, max), min);
}
function hasMinerals(store) {
    for (let resourceType in store) {
        if (resourceType != RESOURCE_ENERGY && (store[resourceType] || 0) > 0) {
            return true;
        }
    }
    return false;
}
function getUsername() {
    for (let i in Game.rooms) {
        let room = Game.rooms[i];
        if (room.controller && room.controller.my) {
            return room.controller.owner.username;
        }
    }
    console.log('ERROR: Could not determine username. You can set this manually in src/settings/settings_user');
    return 'ERROR: Could not determine username.';
}
/* Create column-aligned text array from object with string key/values */
function toColumns(obj, opts = {}) {
    _.defaults(opts, {
        padChar: ' ',
        justify: false // Right align values column?
    });
    let ret = [];
    let keyPadding = _.max(_.map(_.keys(obj), str => str.length)) + 1;
    let valPadding = _.max(_.mapValues(obj, str => str.length));
    for (let key in obj) {
        if (opts.justify) {
            ret.push(key.padRight(keyPadding, opts.padChar) + obj[key].padLeft(valPadding, opts.padChar));
        }
        else {
            ret.push(key.padRight(keyPadding, opts.padChar) + obj[key]);
        }
    }
    return ret;
}
/* Merges a list of store-like objects, summing overlapping keys. Useful for calculating assets from multiple sources */
function mergeSum(objects) {
    let ret = {};
    for (let object of objects) {
        for (let key in object) {
            let amount = object[key] || 0;
            if (!ret[key]) {
                ret[key] = 0;
            }
            ret[key] += amount;
        }
    }
    return ret;
}
function derefCoords(coordName, roomName) {
    let [x, y] = coordName.split(':');
    return new RoomPosition(parseInt(x, 10), parseInt(y, 10), roomName);
}
function minBy$1(objects, iteratee) {
    return lodash_minby(objects, iteratee);
}
function maxBy(objects, iteratee) {
    let maxByIteratee = (obj => -1 * iteratee(obj));
    return lodash_minby(objects, maxByIteratee);
}

// Global settings file containing player information
/**
 * Your username - you shouldn't need to change this.
 */
const MY_USERNAME = getUsername();
/**
 * Enable this to build from source including screeps profiler.
 */
const USE_PROFILER = false;
/**
 * Default controller signature; don't change this.
 * You can set your controller signature with the console command "setSignature()"
 */
const DEFAULT_OVERMIND_SIGNATURE = '[Overmind]';

// Room prototypes - commonly used room properties and methods
// Logging =============================================================================================================
Object.defineProperty(Room.prototype, 'print', {
    get() {
        return '<a href="#!/room/' + Game.shard.name + '/' + this.name + '">' + this.name + '</a>';
    }
});
// Room properties =====================================================================================================
Object.defineProperty(Room.prototype, 'my', {
    get() {
        return this.controller && this.controller.my;
    },
});
Object.defineProperty(Room.prototype, 'reservedByMe', {
    get() {
        return this.controller && this.controller.reservation && this.controller.reservation.username == MY_USERNAME;
    },
});
Object.defineProperty(Room.prototype, 'signedByMe', {
    get() {
        return this.controller && this.controller.sign && this.controller.sign.text == Memory.signature;
    },
});
// Room properties: creeps =============================================================================================
// Creeps physically in the room
Object.defineProperty(Room.prototype, 'creeps', {
    get() {
        return this.find(FIND_MY_CREEPS);
    },
});
// Room properties: hostiles ===========================================================================================
// TODO: fix memoize bug
// Hostile creeps currently in the room
Object.defineProperty(Room.prototype, 'hostiles', {
    get() {
        return _.filter(this.find(FIND_HOSTILE_CREEPS), (creep) => creep.owner.username != 'Source Keeper');
    },
});
Object.defineProperty(Room.prototype, 'dangerousHostiles', {
    get() {
        return _.filter(this.hostiles, (creep) => creep.getActiveBodyparts(ATTACK) > 0
            || creep.getActiveBodyparts(WORK) > 0
            || creep.getActiveBodyparts(RANGED_ATTACK) > 0
            || creep.getActiveBodyparts(HEAL) > 0);
    },
});
Object.defineProperty(Room.prototype, 'playerHostiles', {
    get() {
        return _.filter(this.hostiles, (creep) => creep.owner.username != 'Invader');
    },
});
Object.defineProperty(Room.prototype, 'dangerousPlayerHostiles', {
    get() {
        return _.filter(this.playerHostiles, (creep) => creep.getActiveBodyparts(ATTACK) > 0
            || creep.getActiveBodyparts(WORK) > 0
            || creep.getActiveBodyparts(RANGED_ATTACK) > 0
            || creep.getActiveBodyparts(HEAL) > 0);
    },
});
// Hostile structures currently in the room
Object.defineProperty(Room.prototype, 'hostileStructures', {
    get() {
        return this.find(FIND_HOSTILE_STRUCTURES, { filter: (s) => s.hits });
    },
});
// Room properties: flags ==============================================================================================
// Flags physically in this room
Object.defineProperty(Room.prototype, 'flags', {
    get() {
        return this.find(FIND_FLAGS);
    },
});
// Room properties: structures =========================================================================================
Object.defineProperty(Room.prototype, 'tombstones', {
    get() {
        return this.find(FIND_TOMBSTONES);
    },
});
Object.defineProperty(Room.prototype, 'structures', {
    get() {
        return Overmind.cache.structures[this.name];
    },
});
Object.defineProperty(Room.prototype, 'drops', {
    get() {
        return Overmind.cache.drops[this.name];
    },
});
Room.prototype.getStructures = function (structureType) {
    return this.structures[structureType] || [];
};
Object.defineProperties(Room.prototype, {
    // Dropped resources that are eneryg
    droppedEnergy: {
        get() {
            return this.drops[RESOURCE_ENERGY] || [];
        },
    },
    droppedMinerals: {
        get() {
            let minerals = [];
            for (let resourceType in this.drops) {
                if (resourceType != RESOURCE_ENERGY && resourceType != RESOURCE_POWER) {
                    minerals = minerals.concat(this.drops[resourceType]);
                }
            }
            return minerals;
        },
    },
    droppedPower: {
        get() {
            return this.drops[RESOURCE_POWER] || [];
        },
    },
    // Spawns in the room
    spawns: {
        get() {
            return this.structures[STRUCTURE_SPAWN] || [];
        },
    },
    // All extensions in room
    extensions: {
        get() {
            return this.structures[STRUCTURE_EXTENSION] || [];
        },
    },
    // The extractor in the room, if present
    extractor: {
        get() {
            return (this.structures[STRUCTURE_EXTRACTOR] || [])[0] || undefined;
        },
    },
    // All containers in the room
    containers: {
        get() {
            return this.structures[STRUCTURE_CONTAINER] || [];
        },
    },
    // All container-like objects in the room
    storageUnits: {
        get() {
            if (!this.structures['storageUnits']) {
                let storageUnits = [].concat(this.structures[STRUCTURE_CONTAINER], this.structures[STRUCTURE_STORAGE], this.structures[STRUCTURE_TERMINAL]);
                this.structures['storageUnits'] = _.compact(_.flatten(storageUnits));
            }
            return this.structures['storageUnits'] || [];
        },
    },
    // Towers
    towers: {
        get() {
            return this.structures[STRUCTURE_TOWER] || [];
        },
    },
    // Links, some of which are assigned to virtual components
    links: {
        get() {
            return this.structures[STRUCTURE_LINK] || [];
        },
    },
    // Labs
    labs: {
        get() {
            return this.structures[STRUCTURE_LAB] || [];
        },
    },
    // All energy sources
    sources: {
        get() {
            return this.find(FIND_SOURCES) || [];
        },
    },
    mineral: {
        get() {
            return this.find(FIND_MINERALS)[0];
        },
    },
    keeperLairs: {
        get() {
            return this.structures[STRUCTURE_KEEPER_LAIR] || [];
        },
    },
    // All non-barrier, non-road repairable objects
    repairables: {
        get() {
            if (!this.structures['repairables']) {
                let repairables = [];
                for (let structureType in this.structures) {
                    if (structureType != STRUCTURE_WALL &&
                        structureType != STRUCTURE_RAMPART &&
                        structureType != STRUCTURE_ROAD) {
                        repairables = repairables.concat(this.structures[structureType]);
                    }
                }
                this.structures['repairables'] = _.compact(_.flatten(repairables));
            }
            return this.structures['repairables'] || [];
        },
    },
    // All containers in the room
    roads: {
        get() {
            return this.structures[STRUCTURE_ROAD] || [];
        },
    },
    // All construction sites
    constructionSites: {
        get() {
            return Overmind.cache.constructionSites[this.name] || [];
        },
    },
    // // All non-road construction sites
    // structureSites: {
    // 	get() {
    // 		return Overmind.cache.structureSites[this.name] || [];
    // 	},
    // },
    //
    // // All construction sites for roads
    // roadSites: {
    // 	get() {
    // 		return Overmind.cache.roadSites[this.name] || [];
    // 	},
    // },
    // All walls and ramparts
    barriers: {
        get() {
            if (!this.structures['barriers']) {
                let barriers = [].concat(this.structures[STRUCTURE_WALL], this.structures[STRUCTURE_RAMPART]);
                this.structures['barriers'] = _.compact(_.flatten(barriers));
            }
            return this.structures['barriers'] || [];
        },
    },
    ramparts: {
        get() {
            return this.structures[STRUCTURE_RAMPART] || [];
        },
    },
    walls: {
        get() {
            return this.structures[STRUCTURE_WALL] || [];
        },
    },
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */







function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
var encode$1 = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
var decode$1 = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};

var base64 = {
	encode: encode$1,
	decode: decode$1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */



// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
var encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
var decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};

var base64Vlq = {
	encode: encode,
	decode: decode
};

var util = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port;
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;
});

var util_1 = util.getArg;
var util_2 = util.urlParse;
var util_3 = util.urlGenerate;
var util_4 = util.normalize;
var util_5 = util.join;
var util_6 = util.isAbsolute;
var util_7 = util.relative;
var util_8 = util.toSetString;
var util_9 = util.fromSetString;
var util_10 = util.compareByOriginalPositions;
var util_11 = util.compareByGeneratedPositionsDeflated;
var util_12 = util.compareByGeneratedPositionsInflated;
var util_13 = util.parseSourceMapInput;
var util_14 = util.computeSourceURL;

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */


var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet$1() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet$1.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet$1();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet$1.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet$1.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet$1.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet$1.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet$1.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet$1.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

var ArraySet_1 = ArraySet$1;

var arraySet = {
	ArraySet: ArraySet_1
};

var binarySearch = createCommonjsModule(function (module, exports) {
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};
});

var binarySearch_1 = binarySearch.GREATEST_LOWER_BOUND;
var binarySearch_2 = binarySearch.LEAST_UPPER_BOUND;
var binarySearch_3 = binarySearch.search;

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
var quickSort_1 = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};

var quickSort$1 = {
	quickSort: quickSort_1
};

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */



var ArraySet$2 = arraySet.ArraySet;

var quickSort = quickSort$1.quickSort;

function SourceMapConsumer$1(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer$1.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer$1.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer$1.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer$1.prototype, '_generatedMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer$1.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer$1.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer$1.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer$1.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer$1.GENERATED_ORDER = 1;
SourceMapConsumer$1.ORIGINAL_ORDER = 2;

SourceMapConsumer$1.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer$1.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer$1.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer$1.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer$1.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer$1.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
 */
SourceMapConsumer$1.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

var SourceMapConsumer_1 = SourceMapConsumer$1;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet$2.fromArray(names.map(String), true);
  this._sources = ArraySet$2.fromArray(sources, true);

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer$1;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet$2.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet$2.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._absoluteSources.slice();
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64Vlq.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer$1.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer$1.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

var BasicSourceMapConsumer_1 = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet$2();
  this._names = new ArraySet$2();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer$1(util.getArg(s, 'map'), aSourceMapURL)
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer$1.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer$1;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };

var IndexedSourceMapConsumer_1 = IndexedSourceMapConsumer;

var sourceMapConsumer = {
	SourceMapConsumer: SourceMapConsumer_1,
	BasicSourceMapConsumer: BasicSourceMapConsumer_1,
	IndexedSourceMapConsumer: IndexedSourceMapConsumer_1
};

var SourceMapConsumer = sourceMapConsumer.SourceMapConsumer;

var LogLevels;
(function (LogLevels) {
    LogLevels[LogLevels["ERROR"] = 0] = "ERROR";
    LogLevels[LogLevels["WARNING"] = 1] = "WARNING";
    LogLevels[LogLevels["ALERT"] = 2] = "ALERT";
    LogLevels[LogLevels["INFO"] = 3] = "INFO";
    LogLevels[LogLevels["DEBUG"] = 4] = "DEBUG"; // log.level = 4
})(LogLevels || (LogLevels = {}));

let usedOnStart = 0;
let enabled = false;
let depth = 0;

function AlreadyWrappedError() {
  this.name = 'AlreadyWrappedError';
  this.message = 'Error attempted to double wrap a function.';
  this.stack = ((new Error())).stack;
}

function setupProfiler() {
  depth = 0; // reset depth, this needs to be done each tick.
  Game.profiler = {
    stream(duration, filter) {
      setupMemory('stream', duration || 10, filter);
    },
    email(duration, filter) {
      setupMemory('email', duration || 100, filter);
    },
    profile(duration, filter) {
      setupMemory('profile', duration || 100, filter);
    },
    background(filter) {
      setupMemory('background', false, filter);
    },
    restart() {
      if (Profiler.isProfiling()) {
        const filter = Memory.profiler.filter;
        let duration = false;
        if (!!Memory.profiler.disableTick) {
          // Calculate the original duration, profile is enabled on the tick after the first call,
          // so add 1.
          duration = Memory.profiler.disableTick - Memory.profiler.enabledTick + 1;
        }
        const type = Memory.profiler.type;
        setupMemory(type, duration, filter);
      }
    },
    reset: resetMemory,
    output: Profiler.output,
  };

  overloadCPUCalc();
}

function setupMemory(profileType, duration, filter) {
  resetMemory();
  const disableTick = Number.isInteger(duration) ? Game.time + duration : false;
  if (!Memory.profiler) {
    Memory.profiler = {
      map: {},
      totalTime: 0,
      enabledTick: Game.time + 1,
      disableTick,
      type: profileType,
      filter,
    };
  }
}

function resetMemory() {
  Memory.profiler = null;
}

function overloadCPUCalc() {
  if (Game.rooms.sim) {
    usedOnStart = 0; // This needs to be reset, but only in the sim.
    Game.cpu.getUsed = function getUsed() {
      return performance.now() - usedOnStart;
    };
  }
}

function getFilter() {
  return Memory.profiler.filter;
}

const functionBlackList = [
  'getUsed', // Let's avoid wrapping this... may lead to recursion issues and should be inexpensive.
  'constructor', // es6 class constructors need to be called with `new`
];

function wrapFunction(name, originalFunction) {
  if (originalFunction.profilerWrapped) { throw new AlreadyWrappedError(); }
  function wrappedFunction() {
    if (Profiler.isProfiling()) {
      const nameMatchesFilter = name === getFilter();
      const start = Game.cpu.getUsed();
      if (nameMatchesFilter) {
        depth++;
      }
      const result = originalFunction.apply(this, arguments);
      if (depth > 0 || !getFilter()) {
        const end = Game.cpu.getUsed();
        Profiler.record(name, end - start);
      }
      if (nameMatchesFilter) {
        depth--;
      }
      return result;
    }

    return originalFunction.apply(this, arguments);
  }

  wrappedFunction.profilerWrapped = true;
  wrappedFunction.toString = () =>
    `// screeps-profiler wrapped function:\n${originalFunction.toString()}`;

  return wrappedFunction;
}

function hookUpPrototypes() {
  Profiler.prototypes.forEach(proto => {
    profileObjectFunctions(proto.val, proto.name);
  });
}

function profileObjectFunctions(object, label) {
  const objectToWrap = object.prototype ? object.prototype : object;

  Object.getOwnPropertyNames(objectToWrap).forEach(functionName => {
    const extendedLabel = `${label}.${functionName}`;

    const isBlackListed = functionBlackList.indexOf(functionName) !== -1;
    if (isBlackListed) {
      return;
    }

    const descriptor = Object.getOwnPropertyDescriptor(objectToWrap, functionName);
    if (!descriptor) {
      return;
    }

    const hasAccessor = descriptor.get || descriptor.set;
    if (hasAccessor) {
      const configurable = descriptor.configurable;
      if (!configurable) {
        return;
      }

      const profileDescriptor = {};

      if (descriptor.get) {
        const extendedLabelGet = `${extendedLabel}:get`;
        profileDescriptor.get = profileFunction(descriptor.get, extendedLabelGet);
      }

      if (descriptor.set) {
        const extendedLabelSet = `${extendedLabel}:set`;
        profileDescriptor.set = profileFunction(descriptor.set, extendedLabelSet);
      }

      Object.defineProperty(objectToWrap, functionName, profileDescriptor);
      return;
    }

    const isFunction = typeof descriptor.value === 'function';
    if (!isFunction) {
      return;
    }
    const originalFunction = objectToWrap[functionName];
    objectToWrap[functionName] = profileFunction(originalFunction, extendedLabel);
  });

  return objectToWrap;
}

function profileFunction(fn, functionName) {
  const fnName = functionName || fn.name;
  if (!fnName) {
    console.log('Couldn\'t find a function name for - ', fn);
    console.log('Will not profile this function.');
    return fn;
  }

  return wrapFunction(fnName, fn);
}

const Profiler = {
  printProfile() {
    console.log(Profiler.output());
  },

  emailProfile() {
    Game.notify(Profiler.output(1000));
  },

  output(passedOutputLengthLimit) {
    const outputLengthLimit = passedOutputLengthLimit || 1000;
    if (!Memory.profiler || !Memory.profiler.enabledTick) {
      return 'Profiler not active.';
    }

    const endTick = Math.min(Memory.profiler.disableTick || Game.time, Game.time);
    const startTick = Memory.profiler.enabledTick + 1;
    const elapsedTicks = endTick - startTick;
    const header = 'calls\t\ttime\t\tavg\t\tfunction';
    const footer = [
      `Avg: ${(Memory.profiler.totalTime / elapsedTicks).toFixed(2)}`,
      `Total: ${Memory.profiler.totalTime.toFixed(2)}`,
      `Ticks: ${elapsedTicks}`,
    ].join('\t');

    const lines = [header];
    let currentLength = header.length + 1 + footer.length;
    const allLines = Profiler.lines();
    let done = false;
    while (!done && allLines.length) {
      const line = allLines.shift();
      // each line added adds the line length plus a new line character.
      if (currentLength + line.length + 1 < outputLengthLimit) {
        lines.push(line);
        currentLength += line.length + 1;
      } else {
        done = true;
      }
    }
    lines.push(footer);
    return lines.join('\n');
  },

  lines() {
    const stats = Object.keys(Memory.profiler.map).map(functionName => {
      const functionCalls = Memory.profiler.map[functionName];
      return {
        name: functionName,
        calls: functionCalls.calls,
        totalTime: functionCalls.time,
        averageTime: functionCalls.time / functionCalls.calls,
      };
    }).sort((val1, val2) => {
      return val2.totalTime - val1.totalTime;
    });

    const lines = stats.map(data => {
      return [
        data.calls,
        data.totalTime.toFixed(1),
        data.averageTime.toFixed(3),
        data.name,
      ].join('\t\t');
    });

    return lines;
  },

  prototypes: [
    { name: 'Game', val: Game },
    { name: 'Room', val: Room },
    { name: 'Structure', val: Structure },
    { name: 'Spawn', val: Spawn },
    { name: 'Creep', val: Creep },
    { name: 'RoomPosition', val: RoomPosition },
    { name: 'Source', val: Source },
    { name: 'Flag', val: Flag },
  ],

  record(functionName, time) {
    if (!Memory.profiler.map[functionName]) {
      Memory.profiler.map[functionName] = {
        time: 0,
        calls: 0,
      };
    }
    Memory.profiler.map[functionName].calls++;
    Memory.profiler.map[functionName].time += time;
  },

  endTick() {
    if (Game.time >= Memory.profiler.enabledTick) {
      const cpuUsed = Game.cpu.getUsed();
      Memory.profiler.totalTime += cpuUsed;
      Profiler.report();
    }
  },

  report() {
    if (Profiler.shouldPrint()) {
      Profiler.printProfile();
    } else if (Profiler.shouldEmail()) {
      Profiler.emailProfile();
    }
  },

  isProfiling() {
    if (!enabled || !Memory.profiler) {
      return false;
    }
    return !Memory.profiler.disableTick || Game.time <= Memory.profiler.disableTick;
  },

  type() {
    return Memory.profiler.type;
  },

  shouldPrint() {
    const streaming = Profiler.type() === 'stream';
    const profiling = Profiler.type() === 'profile';
    const onEndingTick = Memory.profiler.disableTick === Game.time;
    return streaming || (profiling && onEndingTick);
  },

  shouldEmail() {
    return Profiler.type() === 'email' && Memory.profiler.disableTick === Game.time;
  },
};

var screepsProfiler = {
  wrap(callback) {
    if (enabled) {
      setupProfiler();
    }

    if (Profiler.isProfiling()) {
      usedOnStart = Game.cpu.getUsed();

      // Commented lines are part of an on going experiment to keep the profiler
      // performant, and measure certain types of overhead.

      // var callbackStart = Game.cpu.getUsed();
      const returnVal = callback();
      // var callbackEnd = Game.cpu.getUsed();
      Profiler.endTick();
      // var end = Game.cpu.getUsed();

      // var profilerTime = (end - start) - (callbackEnd - callbackStart);
      // var callbackTime = callbackEnd - callbackStart;
      // var unaccounted = end - profilerTime - callbackTime;
      // console.log('total-', end, 'profiler-', profilerTime, 'callbacktime-',
      // callbackTime, 'start-', start, 'unaccounted', unaccounted);
      return returnVal;
    }

    return callback();
  },

  enable() {
    enabled = true;
    hookUpPrototypes();
  },

  output: Profiler.output,

  registerObject: profileObjectFunctions,
  registerFN: profileFunction,
  registerClass: profileObjectFunctions,
};

function profile(target, key, _descriptor) {
    if (!USE_PROFILER) {
        return;
    }
    if (key) {
        // case of method decorator
        screepsProfiler.registerFN(target, key);
        return;
    }
    // case of class decorator
    const ctor = target;
    if (!ctor.prototype) {
        return;
    }
    const className = ctor.name;
    screepsProfiler.registerClass(target, className);
}

/**
 * Debug level for log output
 */
const LOG_LEVEL = LogLevels.DEBUG;
/**
 * Prepend log output with current tick number.
 */
const LOG_PRINT_TICK = true;
/**
 * Prepend log output with source line.
 */
const LOG_PRINT_LINES = false;
/**
 * Load source maps and resolve source lines back to typeascript.
 */
const LOG_LOAD_SOURCE_MAP = false;
/**
 * Maximum padding for source links (for aligning log output).
 */
const LOG_MAX_PAD = 100;
/**
 * VSC location, used to create links back to source.
 * Repo and revision are filled in at build time for git repositories.
 */
const LOG_VSC = { repo: '@@_repo_@@', revision: '@@_revision_@@', valid: false };
// export const LOG_VSC = { repo: "@@_repo_@@", revision: __REVISION__, valid: false };
/**
 * URL template for VSC links, this one works for github and gitlab.
 */
const LOG_VSC_URL_TEMPLATE = (path, line) => {
    return `${LOG_VSC.repo}/blob/${LOG_VSC.revision}/${path}#${line}`;
};
// <caller> (<source>:<line>:<column>)
const stackLineRe = /([^ ]*) \(([^:]*):([0-9]*):([0-9]*)\)/;
function resolve(fileLine) {
    const split = _.trim(fileLine).match(stackLineRe);
    if (!split || !Log.sourceMap) {
        return { compiled: fileLine, final: fileLine };
    }
    const pos = { column: parseInt(split[4], 10), line: parseInt(split[3], 10) };
    const original = Log.sourceMap.originalPositionFor(pos);
    const line = `${split[1]} (${original.source}:${original.line})`;
    const out = {
        caller: split[1],
        compiled: fileLine,
        final: line,
        line: original.line,
        original: line,
        path: original.source,
    };
    return out;
}
function makeVSCLink(pos) {
    if (!LOG_VSC.valid || !pos.caller || !pos.path || !pos.line || !pos.original) {
        return pos.final;
    }
    return link(vscUrl(pos.path, `L${pos.line.toString()}`), pos.original);
}
function color(str, color) {
    return `<font color='${color}'>${str}</font>`;
}
function tooltip(str, tooltip) {
    return `<abbr title='${tooltip}'>${str}</abbr>`;
}
function vscUrl(path, line) {
    return LOG_VSC_URL_TEMPLATE(path, line);
}
function link(href, title) {
    return `<a href='${href}' target="_blank">${title}</a>`;
}
function time() {
    return color(Game.time.toString(), 'gray');
}
let Log = Log_1 = class Log {
    constructor() {
        this._maxFileString = 0;
        _.defaultsDeep(Memory, {
            log: {
                level: LOG_LEVEL,
                showSource: LOG_PRINT_LINES,
                showTick: LOG_PRINT_TICK,
            }
        });
    }
    static loadSourceMap() {
        try {
            // tslint:disable-next-line
            const map = require('main.js.map');
            if (map) {
                Log_1.sourceMap = new SourceMapConsumer(map);
            }
        }
        catch (err) {
            console.log('failed to load source map', err);
        }
    }
    get level() {
        return Memory.log.level;
    }
    setLogLevel(value) {
        let changeValue = true;
        switch (value) {
            case LogLevels.ERROR:
                console.log(`Logging level set to ${value}. Displaying: ERROR.`);
                break;
            case LogLevels.WARNING:
                console.log(`Logging level set to ${value}. Displaying: ERROR, WARNING.`);
                break;
            case LogLevels.ALERT:
                console.log(`Logging level set to ${value}. Displaying: ERROR, WARNING, ALERT.`);
                break;
            case LogLevels.INFO:
                console.log(`Logging level set to ${value}. Displaying: ERROR, WARNING, ALERT, INFO.`);
                break;
            case LogLevels.DEBUG:
                console.log(`Logging level set to ${value}. Displaying: ERROR, WARNING, ALERT, INFO, DEBUG.`);
                break;
            default:
                console.log(`Invalid input: ${value}. Loging level can be set to integers between `
                    + LogLevels.ERROR + ' and ' + LogLevels.DEBUG + ', inclusive.');
                changeValue = false;
                break;
        }
        if (changeValue) {
            Memory.log.level = value;
        }
    }
    get showSource() {
        return Memory.log.showSource;
    }
    set showSource(value) {
        Memory.log.showSource = value;
    }
    get showTick() {
        return Memory.log.showTick;
    }
    set showTick(value) {
        Memory.log.showTick = value;
    }
    trace(error) {
        if (this.level >= LogLevels.ERROR && error.stack) {
            console.log(this.resolveStack(error.stack));
        }
        return this;
    }
    error(...args) {
        if (this.level >= LogLevels.ERROR) {
            console.log.apply(this, this.buildArguments(LogLevels.ERROR).concat([].slice.call(args)));
        }
    }
    warning(...args) {
        if (this.level >= LogLevels.WARNING) {
            console.log.apply(this, this.buildArguments(LogLevels.WARNING).concat([].slice.call(args)));
        }
    }
    alert(...args) {
        if (this.level >= LogLevels.ALERT) {
            console.log.apply(this, this.buildArguments(LogLevels.ALERT).concat([].slice.call(args)));
        }
    }
    info(...args) {
        if (this.level >= LogLevels.INFO) {
            console.log.apply(this, this.buildArguments(LogLevels.INFO).concat([].slice.call(args)));
        }
    }
    debug(...args) {
        if (this.level >= LogLevels.DEBUG) {
            console.log.apply(this, this.buildArguments(LogLevels.DEBUG).concat([].slice.call(args)));
        }
    }
    printObject(obj) {
        console.log.apply(this, this.buildArguments(LogLevels.DEBUG).concat(JSON.stringify(obj)));
    }
    getFileLine(upStack = 4) {
        const stack = new Error('').stack;
        if (stack) {
            const lines = stack.split('\n');
            if (lines.length > upStack) {
                const originalLines = _.drop(lines, upStack).map(resolve);
                const hoverText = _.map(originalLines, 'final').join('&#10;');
                return this.adjustFileLine(originalLines[0].final, tooltip(makeVSCLink(originalLines[0]), hoverText));
            }
        }
        return '';
    }
    buildArguments(level) {
        const out = [];
        switch (level) {
            case LogLevels.ERROR:
                out.push(color('ERROR  ', 'red'));
                break;
            case LogLevels.WARNING:
                out.push(color('WARNING', 'orange'));
                break;
            case LogLevels.ALERT:
                out.push(color('ALERT  ', 'yellow'));
                break;
            case LogLevels.INFO:
                out.push(color('INFO   ', 'green'));
                break;
            case LogLevels.DEBUG:
                out.push(color('DEBUG  ', 'gray'));
                break;
            default:
                break;
        }
        if (this.showTick) {
            out.push(time());
        }
        if (this.showSource && level <= LogLevels.ERROR) {
            out.push(this.getFileLine());
        }
        return out;
    }
    resolveStack(stack) {
        if (!Log_1.sourceMap) {
            return stack;
        }
        return _.map(stack.split('\n').map(resolve), 'final').join('\n');
    }
    adjustFileLine(visibleText, line) {
        const newPad = Math.max(visibleText.length, this._maxFileString);
        this._maxFileString = Math.min(newPad, LOG_MAX_PAD);
        return `|${_.padRight(line, line.length + this._maxFileString - visibleText.length, ' ')}|`;
    }
};
Log = Log_1 = __decorate([
    profile
], Log);
if (LOG_LOAD_SOURCE_MAP) {
    Log.loadSourceMap();
}
const log = new Log();
var Log_1;

const NO_ACTION = -20;
let Traveler = Traveler_1 = class Traveler {
    /**
     * move creep to destination
     * @param creep
     * @param destination
     * @param options
     * @returns {number}
     */
    static travelTo(creep, destination, options = {}) {
        // uncomment if you would like to register hostile rooms entered
        this.updateRoomStatus(creep.room);
        if (!destination) {
            return ERR_INVALID_ARGS;
        }
        if (creep.fatigue > 0) {
            Traveler_1.circle(creep.pos, 'aqua', .3);
            return ERR_TIRED;
        }
        destination = this.normalizePos(destination);
        // Fixes bug that causes creeps to idle on the other side of a room
        let distanceToEdge = _.min([destination.x, 49 - destination.x,
            destination.y, 49 - destination.y]);
        if (options.range && distanceToEdge <= options.range) {
            options.range = _.min([Math.abs(distanceToEdge - 1), 0]);
        }
        // manage case where creep is nearby destination
        let rangeToDestination = creep.pos.getRangeTo(destination);
        if (options.range && rangeToDestination <= options.range) {
            return NO_ACTION;
        }
        else if (rangeToDestination <= 1) {
            if (rangeToDestination === 1 && !options.range) {
                let direction = creep.pos.getDirectionTo(destination);
                if (options.returnData) {
                    options.returnData.nextPos = destination;
                    options.returnData.path = direction.toString();
                }
                return creep.move(direction);
            }
            return NO_ACTION;
        }
        // initialize data object
        if (!creep.memory._trav) {
            // delete creep.memory._travel;
            creep.memory._trav = {};
        }
        let travelData = creep.memory._trav;
        let state = this.deserializeState(travelData, destination);
        // uncomment to visualize destination
        // this.circle(destination.pos, "orange");
        // check if creep is stuck
        if (this.isStuck(creep, state)) {
            state.stuckCount++;
            Traveler_1.circle(creep.pos, 'magenta', state.stuckCount * .2);
        }
        else {
            state.stuckCount = 0;
        }
        // handle case where creep is stuck
        if (!options.stuckValue) {
            options.stuckValue = DEFAULT_STUCK_VALUE;
        }
        if (state.stuckCount >= options.stuckValue && Math.random() > .5) {
            options.ignoreCreeps = false;
            options.freshMatrix = true;
            delete travelData.path;
        }
        // delete path cache if destination is different
        if (!this.samePos(state.destination, destination)) {
            if (options.movingTarget && state.destination.isNearTo(destination)) {
                travelData.path += state.destination.getDirectionTo(destination);
                state.destination = destination;
            }
            else {
                delete travelData.path;
            }
        }
        if (options.repath && Math.random() < options.repath) {
            // add some chance that you will find a new path randomly
            delete travelData.path;
        }
        // pathfinding
        let newPath = false;
        if (!travelData.path) {
            newPath = true;
            if (creep.spawning) {
                return ERR_BUSY;
            }
            state.destination = destination;
            let cpu = Game.cpu.getUsed();
            let ret = this.findTravelPath(creep.pos, destination, options);
            let cpuUsed = Game.cpu.getUsed() - cpu;
            state.cpu = _.round(cpuUsed + state.cpu);
            if (Game.time % 10 == 0 && state.cpu > REPORT_CPU_THRESHOLD) {
                // see note at end of file for more info on this
                log.alert(`TRAVELER: heavy cpu use: ${creep.name}, cpu: ${state.cpu} origin: ${creep.pos.print}, dest: ${destination.print}`);
            }
            let color = 'orange';
            if (ret.incomplete) {
                // uncommenting this is a great way to diagnose creep behavior issues
                // console.log(`TRAVELER: incomplete path for ${creep.name}`);
                color = 'red';
            }
            if (options.returnData) {
                options.returnData.pathfinderReturn = ret;
            }
            travelData.path = Traveler_1.serializePath(creep.pos, ret.path, color);
            state.stuckCount = 0;
        }
        this.serializeState(creep, destination, state, travelData);
        if (!travelData.path || travelData.path.length === 0) {
            return ERR_NO_PATH;
        }
        // consume path
        if (state.stuckCount === 0 && !newPath) {
            travelData.path = travelData.path.substr(1);
        }
        let nextDirection = parseInt(travelData.path[0], 10);
        if (options.returnData) {
            if (nextDirection) {
                let nextPos = Traveler_1.positionAtDirection(creep.pos, nextDirection);
                if (nextPos) {
                    options.returnData.nextPos = nextPos;
                }
            }
            options.returnData.state = state;
            options.returnData.path = travelData.path;
        }
        return creep.move(nextDirection);
    }
    //noinspection JSValidateJSDoc
    /**
     * make position objects consistent so that either can be used as an argument
     * @param destination
     * @returns {any}
     */
    static normalizePos(destination) {
        if (!(destination instanceof RoomPosition)) {
            return destination.pos;
        }
        return destination;
    }
    /**
     * check if room should be avoided by findRoute algorithm
     * @param roomName
     * @returns {RoomMemory|number}
     */
    static checkAvoid(roomName) {
        return Memory.rooms && Memory.rooms[roomName] && Memory.rooms[roomName].avoid;
    }
    /**
     * check if a position is an exit
     * @param pos
     * @returns {boolean}
     */
    static isExit(pos) {
        return pos.x === 0 || pos.y === 0 || pos.x === 49 || pos.y === 49;
    }
    /**
     * check two coordinates match
     * @param pos1
     * @param pos2
     * @returns {boolean}
     */
    static sameCoord(pos1, pos2) {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    }
    /**
     * check if two positions match
     * @param pos1
     * @param pos2
     * @returns {boolean}
     */
    static samePos(pos1, pos2) {
        return this.sameCoord(pos1, pos2) && pos1.roomName === pos2.roomName;
    }
    /**
     * draw a circle at position
     * @param pos
     * @param color
     * @param opacity
     */
    static circle(pos, color, opacity) {
        new RoomVisual(pos.roomName).circle(pos, {
            radius: .45, fill: 'transparent', stroke: color, strokeWidth: .15, opacity: opacity
        });
    }
    /**
     * update memory on whether a room should be avoided based on controller owner
     * @param room
     */
    static updateRoomStatus(room) {
        if (!room) {
            return;
        }
        if (room.controller) {
            if (room.controller.owner && !room.controller.my && room.towers.length > 0) {
                room.memory.avoid = 1;
            }
            else {
                delete room.memory.avoid;
            }
        }
    }
    /**
     * find a path from origin to destination
     * @param origin
     * @param destination
     * @param options
     * @returns {PathfinderReturn}
     */
    static findTravelPath(origin, destination, options = {}) {
        _.defaults(options, {
            ignoreCreeps: true,
            maxOps: DEFAULT_MAXOPS,
            range: 1,
        });
        if (options.movingTarget) {
            options.range = 0;
        }
        origin = this.normalizePos(origin);
        destination = this.normalizePos(destination);
        let originRoomName = origin.roomName;
        let destRoomName = destination.roomName;
        // check to see whether findRoute should be used
        let roomDistance = Game.map.getRoomLinearDistance(origin.roomName, destination.roomName);
        let allowedRooms = options.route;
        if (!allowedRooms && (options.useFindRoute || (options.useFindRoute === undefined && roomDistance > 2))) {
            let route = this.findRoute(origin.roomName, destination.roomName, options);
            if (route) {
                allowedRooms = route;
            }
        }
        // let roomsSearched = 0;
        let callback = (roomName) => {
            if (allowedRooms) {
                if (!allowedRooms[roomName]) {
                    return false;
                }
            }
            else if (!options.allowHostile && Traveler_1.checkAvoid(roomName)
                && roomName !== destRoomName && roomName !== originRoomName) {
                return false;
            }
            // roomsSearched++;
            let matrix;
            let room = Game.rooms[roomName];
            if (room) {
                if (options.ignoreStructures) {
                    matrix = new PathFinder.CostMatrix();
                    if (!options.ignoreCreeps) {
                        Traveler_1.addCreepsToMatrix(room, matrix);
                    }
                }
                else if (options.ignoreCreeps || roomName !== originRoomName) {
                    matrix = this.getStructureMatrix(room, options.freshMatrix);
                }
                else {
                    matrix = this.getCreepMatrix(room);
                }
                if (options.obstacles) {
                    matrix = matrix.clone();
                    for (let obstacle of options.obstacles) {
                        if (obstacle.roomName !== roomName) {
                            continue;
                        }
                        matrix.set(obstacle.x, obstacle.y, 0xff);
                    }
                }
            }
            if (options.roomCallback) {
                if (!matrix) {
                    matrix = new PathFinder.CostMatrix();
                }
                let outcome = options.roomCallback(roomName, matrix.clone());
                if (outcome !== undefined) {
                    return outcome;
                }
            }
            return matrix;
        };
        let ret = PathFinder.search(origin, { pos: destination, range: options.range }, {
            maxOps: options.maxOps,
            maxRooms: options.maxRooms,
            plainCost: options.offRoad ? 1 : options.ignoreRoads ? 1 : 2,
            swampCost: options.offRoad ? 1 : options.ignoreRoads ? 5 : 10,
            roomCallback: callback,
        });
        if (ret.incomplete && options.ensurePath) {
            if (options.useFindRoute === undefined) {
                // handle case where pathfinder failed at a short distance due to not using findRoute
                // can happen for situations where the creep would have to take an uncommonly indirect path
                // options.allowedRooms and options.routeCallback can also be used to handle this situation
                if (roomDistance <= 2) {
                    log.warning(`TRAVELER: path failed without findroute. Origin: ${origin.print}, ` +
                        `destination: ${destination.print}. Trying again with options.useFindRoute = true...`);
                    options.useFindRoute = true;
                    ret = this.findTravelPath(origin, destination, options);
                    log.warning(`TRAVELER: second attempt was ${ret.incomplete ? 'not ' : ''}successful`);
                    return ret;
                }
            }
            else {
            }
        }
        return ret;
    }
    /**
     * find a viable sequence of rooms that can be used to narrow down pathfinder's search algorithm
     * @param origin
     * @param destination
     * @param options
     * @returns {{}}
     */
    static findRoute(origin, destination, options = {}) {
        let restrictDistance = options.restrictDistance || Game.map.getRoomLinearDistance(origin, destination) + 10;
        let allowedRooms = { [origin]: true, [destination]: true };
        let highwayBias = 1;
        if (options.preferHighway) {
            highwayBias = 2.5;
            if (options.highwayBias) {
                highwayBias = options.highwayBias;
            }
        }
        let ret = Game.map.findRoute(origin, destination, {
            routeCallback: (roomName) => {
                if (options.routeCallback) {
                    let outcome = options.routeCallback(roomName);
                    if (outcome !== undefined) {
                        return outcome;
                    }
                }
                let rangeToRoom = Game.map.getRoomLinearDistance(origin, roomName);
                if (rangeToRoom > restrictDistance) {
                    // room is too far out of the way
                    return Number.POSITIVE_INFINITY;
                }
                if (!options.allowHostile && Traveler_1.checkAvoid(roomName) &&
                    roomName !== destination && roomName !== origin) {
                    // room is marked as "avoid" in room memory
                    return Number.POSITIVE_INFINITY;
                }
                let parsed;
                if (options.preferHighway) {
                    parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
                    let isHighway = (parsed[1] % 10 === 0) || (parsed[2] % 10 === 0);
                    if (isHighway) {
                        return 1;
                    }
                }
                // SK rooms are avoided when there is no vision in the room, harvested-from SK rooms are allowed
                if (!options.allowSK && !Game.rooms[roomName]) {
                    if (!parsed) {
                        parsed = /^[WE]([0-9]+)[NS]([0-9]+)$/.exec(roomName);
                    }
                    let fMod = parsed[1] % 10;
                    let sMod = parsed[2] % 10;
                    let isSK = !(fMod === 5 && sMod === 5) &&
                        ((fMod >= 4) && (fMod <= 6)) &&
                        ((sMod >= 4) && (sMod <= 6));
                    if (isSK) {
                        return 10 * highwayBias;
                    }
                }
                return highwayBias;
            },
        });
        if (!_.isArray(ret)) {
            console.log(`couldn't findRoute to ${destination}`);
            return;
        }
        for (let value of ret) {
            allowedRooms[value.room] = true;
        }
        return allowedRooms;
    }
    /**
     * check how many rooms were included in a route returned by findRoute
     * @param origin
     * @param destination
     * @returns {number}
     */
    static routeDistance(origin, destination) {
        let linearDistance = Game.map.getRoomLinearDistance(origin, destination);
        if (linearDistance >= 32) {
            return linearDistance;
        }
        let allowedRooms = this.findRoute(origin, destination);
        if (allowedRooms) {
            return Object.keys(allowedRooms).length;
        }
    }
    //noinspection JSValidateJSDoc
    /**
     * build a cost matrix based on structures in the room. Will be cached for more than one tick. Requires vision.
     * @param room
     * @param freshMatrix
     * @returns {any}
     */
    static getStructureMatrix(room, freshMatrix) {
        if (!this.structureMatrixCache[room.name] || (freshMatrix && Game.time !== this.structureMatrixTick)) {
            this.structureMatrixTick = Game.time;
            let matrix = new PathFinder.CostMatrix();
            this.structureMatrixCache[room.name] = Traveler_1.addStructuresToMatrix(room, matrix, 1);
        }
        return this.structureMatrixCache[room.name];
    }
    //noinspection JSValidateJSDoc
    /**
     * build a cost matrix based on creeps and structures in the room. Will be cached for one tick. Requires vision.
     * @param room
     * @returns {any}
     */
    static getCreepMatrix(room) {
        if (!this.creepMatrixCache[room.name] || Game.time !== this.creepMatrixTick) {
            this.creepMatrixTick = Game.time;
            this.creepMatrixCache[room.name] = Traveler_1.addCreepsToMatrix(room, this.getStructureMatrix(room, true).clone());
        }
        return this.creepMatrixCache[room.name];
    }
    /**
     * add structures to matrix so that impassible structures can be avoided and roads given a lower cost
     * @param room
     * @param matrix
     * @param roadCost
     * @returns {CostMatrix}
     */
    static addStructuresToMatrix(room, matrix, roadCost) {
        let impassibleStructures = [];
        for (let structure of room.find(FIND_STRUCTURES)) {
            if (structure instanceof StructureRampart) {
                if (!structure.my /*&& !structure.isPublic*/) {
                    impassibleStructures.push(structure);
                }
            }
            else if (structure instanceof StructureRoad) {
                matrix.set(structure.pos.x, structure.pos.y, roadCost);
            }
            else if (structure instanceof StructureContainer) {
                matrix.set(structure.pos.x, structure.pos.y, 5);
            }
            else {
                impassibleStructures.push(structure);
            }
        }
        for (let site of room.find(FIND_MY_CONSTRUCTION_SITES)) {
            if (site.structureType === STRUCTURE_CONTAINER || site.structureType === STRUCTURE_ROAD
                || site.structureType === STRUCTURE_RAMPART) {
                continue;
            }
            matrix.set(site.pos.x, site.pos.y, 0xff);
        }
        for (let structure of impassibleStructures) {
            matrix.set(structure.pos.x, structure.pos.y, 0xff);
        }
        return matrix;
    }
    /**
     * add creeps to matrix so that they will be avoided by other creeps
     * @param room
     * @param matrix
     * @returns {CostMatrix}
     */
    static addCreepsToMatrix(room, matrix) {
        room.find(FIND_CREEPS).forEach((creep) => matrix.set(creep.pos.x, creep.pos.y, 0xff));
        return matrix;
    }
    /**
     * serialize a path, traveler style. Returns a string of directions.
     * @param startPos
     * @param path
     * @param color
     * @returns {string}
     */
    static serializePath(startPos, path, color = 'orange') {
        let serializedPath = '';
        let lastPosition = startPos;
        this.circle(startPos, color);
        for (let position of path) {
            if (position.roomName === lastPosition.roomName) {
                new RoomVisual(position.roomName)
                    .line(position, lastPosition, { color: color, lineStyle: 'dashed' });
                serializedPath += lastPosition.getDirectionTo(position);
            }
            lastPosition = position;
        }
        return serializedPath;
    }
    /**
     * returns a position at a direction relative to origin
     * @param origin
     * @param direction
     * @returns {RoomPosition}
     */
    static positionAtDirection(origin, direction) {
        let offsetX = [0, 0, 1, 1, 1, 0, -1, -1, -1];
        let offsetY = [0, -1, -1, 0, 1, 1, 1, 0, -1];
        let x = origin.x + offsetX[direction];
        let y = origin.y + offsetY[direction];
        if (x > 49 || x < 0 || y > 49 || y < 0) {
            return;
        }
        return new RoomPosition(x, y, origin.roomName);
    }
    /**
     * convert room avoidance memory from the old pattern to the one currently used
     * @param cleanup
     */
    static patchMemory(cleanup = false) {
        if (!Memory.empire) {
            return;
        }
        if (!Memory.empire.hostileRooms) {
            return;
        }
        let count = 0;
        for (let roomName in Memory.empire.hostileRooms) {
            if (Memory.empire.hostileRooms[roomName]) {
                if (!Memory.rooms[roomName]) {
                    Memory.rooms[roomName] = {};
                }
                Memory.rooms[roomName].avoid = 1;
                count++;
            }
            if (cleanup) {
                delete Memory.empire.hostileRooms[roomName];
            }
        }
        if (cleanup) {
            delete Memory.empire.hostileRooms;
        }
        console.log(`TRAVELER: room avoidance data patched for ${count} rooms`);
    }
    static deserializeState(travelData, destination) {
        let state = {};
        if (travelData.state) {
            state.lastCoord = { x: travelData.state[STATE_PREV_X], y: travelData.state[STATE_PREV_Y] };
            state.cpu = travelData.state[STATE_CPU];
            state.stuckCount = travelData.state[STATE_STUCK];
            state.destination = new RoomPosition(travelData.state[STATE_DEST_X], travelData.state[STATE_DEST_Y], travelData.state[STATE_DEST_ROOMNAME]);
        }
        else {
            state.cpu = 0;
            state.destination = destination;
        }
        return state;
    }
    static serializeState(creep, destination, state, travelData) {
        travelData.state = [creep.pos.x, creep.pos.y, state.stuckCount, state.cpu, destination.x, destination.y,
            destination.roomName];
    }
    static isStuck(creep, state) {
        let stuck = false;
        if (state.lastCoord !== undefined) {
            if (this.sameCoord(creep.pos, state.lastCoord)) {
                // didn't move
                stuck = true;
            }
            else if (this.isExit(creep.pos) && this.isExit(state.lastCoord)) {
                // moved against exit
                stuck = true;
            }
        }
        return stuck;
    }
};
Traveler.structureMatrixCache = {};
Traveler.creepMatrixCache = {};
Traveler = Traveler_1 = __decorate([
    profile
], Traveler);
// this might be higher than you wish, setting it lower is a great way to diagnose creep behavior issues. When creeps
// need to repath to often or they aren't finding valid paths, it can sometimes point to problems elsewhere in your code
const REPORT_CPU_THRESHOLD = 1000;
const DEFAULT_MAXOPS = 20000;
const DEFAULT_STUCK_VALUE = 2;
const STATE_PREV_X = 0;
const STATE_PREV_Y = 1;
const STATE_STUCK = 2;
const STATE_CPU = 3;
const STATE_DEST_X = 4;
const STATE_DEST_Y = 5;
const STATE_DEST_ROOMNAME = 6;
// assigns a function to Creep.prototype: creep.travelTo(destination)
Creep.prototype.travelTo = function (destination, options) {
    return Traveler.travelTo(this, destination, options);
};
var Traveler_1;

/* Module for pathing-related operations. Interfaces with Traveler. */
let Pathing = class Pathing {
    // static serializePath(startPos: RoomPosition, path: RoomPosition[]): string {
    // 	let serializedPath = "";
    // 	let lastPosition = startPos;
    // 	for (let position of path) {
    // 		if (position.roomName == lastPosition.roomName) {
    // 			serializedPath += lastPosition.getDirectionTo(position);
    // 		}
    // 		lastPosition = position;
    // 	}
    // 	return serializedPath;
    // }
    static savePath(path) {
        let savedPath = {
            path: path,
            length: path.length,
            tick: Game.time
        };
        let originName = _.first(path).name;
        let destinationName = _.last(path).name;
        if (!Memory.pathing.paths[originName]) {
            Memory.pathing.paths[originName] = {};
        }
        Memory.pathing.paths[originName][destinationName] = savedPath;
    }
    /* Calculate and/or cache the length of the shortest path between two points.
     * Cache is probabilistically cleared in Mem */
    static distance(arg1, arg2) {
        let [name1, name2] = [arg1.name, arg2.name].sort(); // alphabetize since path is the same in either direction
        if (!Memory.pathing.distances[name1]) {
            Memory.pathing.distances[name1] = {};
        }
        if (!Memory.pathing.distances[name1][name2]) {
            let ret = this.findShortestPath(arg1, arg2);
            if (!ret.incomplete) {
                Memory.pathing.distances[name1][name2] = ret.path.length;
            }
        }
        return Memory.pathing.distances[name1][name2];
    }
    static calculatePathWeight(startPos, endPos, options = {}) {
        _.defaults(options, {
            range: 1,
            allowSK: true,
        });
        let ret = Traveler.findTravelPath(startPos, endPos, options);
        let weight = 0;
        for (let pos of ret.path) {
            if (!pos.room) { // If you don't have vision, assume there are roads
                weight += 1;
            }
            else {
                if (pos.lookForStructure(STRUCTURE_ROAD)) {
                    weight += 1;
                }
                else {
                    let terrain = pos.lookFor(LOOK_TERRAIN)[0];
                    if (terrain == 'plain') {
                        weight += 2;
                    }
                    else if (terrain == 'swamp') {
                        weight += 10;
                    }
                }
            }
        }
        return weight;
    }
    /* Calculates and/or caches the weighted distance for the most efficient path. Weight is sum of tile weights:
     * Road = 1, Plain = 2, Swamp = 10. Cached weights are cleared in Mem occasionally. */
    static weightedDistance(arg1, arg2) {
        let pos1, pos2;
        if (arg1.name < arg2.name) { // alphabetize since path lengths are the same either direction
            pos1 = arg1;
            pos2 = arg2;
        }
        else {
            pos1 = arg2;
            pos2 = arg1;
        }
        if (!Memory.pathing.weightedDistances[pos1.name]) {
            Memory.pathing.weightedDistances[pos1.name] = {};
        }
        if (!Memory.pathing.weightedDistances[pos1.name][pos2.name]) {
            Memory.pathing.weightedDistances[pos1.name][pos2.name] = this.calculatePathWeight(pos1, pos2);
        }
        return Memory.pathing.weightedDistances[pos1.name][pos2.name];
    }
    /* Returns the shortest path from start to end position, regardless of (passable) terrain */
    static findShortestPath(startPos, endPos, options = {}) {
        _.defaults(options, {
            ignoreCreeps: true,
            range: 1,
            offRoad: true,
            allowSK: true,
        });
        let ret = Traveler.findTravelPath(startPos, endPos, options);
        if (ret.incomplete)
            log.alert(`Pathing: incomplete path from ${startPos.print} to ${endPos.print}!`);
        return ret;
    }
    /* Whether another object in the same room can be reached from the current position */
    static isReachable(startPos, endPos, options = {}) {
        _.defaults(options, {
            ignoreCreeps: false,
            range: 1,
            offRoad: true,
            allowSK: true,
            allowHostile: true,
            maxRooms: 1,
            maxOps: 2000,
            ensurePath: false
        });
        let ret = Traveler.findTravelPath(startPos, endPos, options);
        return !(ret.incomplete);
    }
    /* Returns the shortest path from start to end position */
    static findTravelPath(startPos, endPos, options = {}) {
        _.defaults(options, {
            ignoreCreeps: true,
            range: 1,
        });
        let ret = Traveler.findTravelPath(startPos, endPos, options);
        if (ret.incomplete)
            log.alert(`Incomplete travel path from ${startPos.print} to ${endPos.print}!`);
        return ret;
    }
    /* Find the shortest path, preferentially stepping on tiles with road routing flags */
    static routeRoadPath(origin, destination, options = {}) {
        _.defaults(options, {
            ignoreCreeps: true,
            range: 1,
            offRoad: true,
            allowSK: true,
        });
        let originRoomName = origin.roomName;
        let destRoomName = destination.roomName;
        let roomDistance = Game.map.getRoomLinearDistance(origin.roomName, destination.roomName);
        let allowedRooms = options.route;
        if (!allowedRooms && (options.useFindRoute || (options.useFindRoute === undefined && roomDistance > 2))) {
            let route = Traveler.findRoute(origin.roomName, destination.roomName, options);
            if (route) {
                allowedRooms = route;
            }
        }
        let callback = (roomName) => {
            if (allowedRooms) {
                if (!allowedRooms[roomName]) {
                    return false;
                }
            }
            else if (!options.allowHostile && Traveler.checkAvoid(roomName)
                && roomName !== destRoomName && roomName !== originRoomName) {
                return false;
            }
            let matrix;
            let room = Game.rooms[roomName];
            if (room) {
                matrix = Traveler.getStructureMatrix(room, options.freshMatrix);
                if (options.obstacles) {
                    matrix = matrix.clone();
                    for (let obstacle of options.obstacles) {
                        if (obstacle.roomName !== roomName) {
                            continue;
                        }
                        matrix.set(obstacle.x, obstacle.y, 0xff);
                    }
                }
                // Prefer pathing through flags
                let pathingFlags = _.filter(room.flags, flag => flag.color == COLOR_WHITE &&
                    flag.secondaryColor == COLOR_WHITE);
                for (let flag of pathingFlags) {
                    matrix.set(flag.pos.x, flag.pos.y, 0x01);
                }
            }
            return matrix;
        };
        return PathFinder.search(origin, { pos: destination, range: options.range }, {
            maxOps: options.maxOps,
            maxRooms: options.maxRooms,
            plainCost: 2,
            swampCost: 2,
            roomCallback: callback,
        });
    }
};
Pathing = __decorate([
    profile
], Pathing);

let Directive = Directive_1 = class Directive {
    constructor(flag, requiredRCL = 1) {
        this.flag = flag;
        this.name = flag.name;
        this.ref = flag.ref;
        this.requiredRCL = requiredRCL;
        this.colony = Directive_1.getFlagColony(flag, requiredRCL);
        this.pos = flag.pos;
        this.room = flag.room;
        this.memory = flag.memory;
        if (!this.memory.created)
            this.memory.created = Game.time;
        this.overlords = {};
        // Register to colony overseer or delete the directive if the colony is dead
        if (!this.colony) {
            this.remove();
        }
        else {
            this.colony.overseer.directives.push(this);
        }
    }
    static getFlagColony(flag, requiredRCL = 1) {
        // If something is written to flag.colony, use that as the colony
        if (flag.memory.colony) {
            return Overmind.colonies[flag.memory.colony];
        }
        else {
            // If flag contains a colony name as a substring, assign to that colony, regardless of RCL
            let colonyNames = _.keys(Overmind.colonies);
            for (let name of colonyNames) {
                if (flag.name.includes(name)) {
                    if (flag.name.split(name)[1] != '')
                        continue; // in case of other substring, e.g. E11S12 and E11S1
                    flag.memory.colony = name;
                    return Overmind.colonies[name];
                }
            }
            // If flag is in a room belonging to a colony and the colony has sufficient RCL, assign to there
            let colony = Overmind.colonies[Overmind.colonyMap[flag.pos.roomName]];
            if (colony && colony.level >= requiredRCL) {
                return colony;
            }
            else {
                // Otherwise assign to closest colony
                this.recalculateColony(flag, requiredRCL);
                return Overmind.colonies[flag.memory.colony];
            }
        }
    }
    static recalculateColony(flag, requiredRCL = 1, restrictDistance = 10, verbose = false) {
        if (verbose)
            log.info(`Recalculating colony association for ${flag.name} in ${flag.pos.roomName}`);
        let nearestColonyName = '';
        let minDistance = Infinity;
        let colonyRooms = _.filter(Game.rooms, room => room.my);
        for (let room of colonyRooms) {
            if (room.controller.level >= requiredRCL) {
                let ret = Pathing.findShortestPath(flag.pos, room.controller.pos, { restrictDistance: restrictDistance });
                if (!ret.incomplete) {
                    if (ret.path.length < minDistance) {
                        nearestColonyName = room.name;
                        minDistance = ret.path.length;
                    }
                    if (verbose)
                        log.info(`Path length to ${room.name}: ${ret.path.length}`);
                }
                else {
                    if (verbose)
                        log.info(`Incomplete path found to ${room.name}`);
                }
            }
            else {
                if (verbose) {
                    log.info(`RCL for ${room.name} insufficient: ` +
                        `needs ${requiredRCL}, is ${room.controller.level}`);
                }
            }
        }
        if (nearestColonyName != '') {
            log.info(`Colony ${nearestColonyName} assigned to ${flag.name}.`);
            flag.memory.colony = nearestColonyName;
        }
        else {
            log.warning(`Could not find colony match for ${flag.name} in ${flag.pos.roomName}!`);
        }
    }
    // Wrapped flag methods ============================================================================================
    remove() {
        if (!this.memory.persistent) {
            delete this.memory;
            return this.flag.remove();
        }
    }
    setColor(color, secondaryColor) {
        if (secondaryColor) {
            return this.flag.setColor(color, secondaryColor);
        }
        else {
            return this.flag.setColor(color);
        }
    }
    setPosition(pos) {
        // Ignore the (x,y) setPosition option since I never use it
        return this.flag.setPosition(pos);
    }
    // Custom directive methods ========================================================================================
    /* Create an appropriate flag to instantiate this directive in the next tick */
    static create(pos, opts = {}) {
        let name = opts.name;
        if (!name) {
            name = this.directiveName + ':' + pos.roomName;
            if (Game.flags[name]) {
                let i = 0;
                while (Game.flags[name + i]) {
                    i += 1;
                }
                name = name + i;
            }
        }
        if (!opts.quiet) {
            log.alert(`Creating ${this.directiveName} directive at ${pos.print}!`);
        }
        return pos.createFlag(name, this.color, this.secondaryColor);
    }
    /* Create a directive if one of the same type is not already present (in room | at position) */
    static createIfNotPresent(pos, scope, opts = {}) {
        let room = Game.rooms[pos.roomName];
        if (!room) {
            log.error(`No vision at ${pos.print}; can't create directive!`);
        }
        let flagsOfThisType;
        switch (scope) {
            case 'room':
                // TODO: room can be undefined
                flagsOfThisType = _.filter(room.flags, flag => this.filter(flag));
                if (flagsOfThisType.length == 0) {
                    return this.create(pos, opts);
                }
                break;
            case 'pos':
                flagsOfThisType = _.filter(pos.lookFor(LOOK_FLAGS), flag => this.filter(flag));
                if (flagsOfThisType.length == 0) {
                    return this.create(pos, opts);
                }
                break;
            default:
                log.error(`Directive.createIfNotPresent: scope must be "room" or "pos"!`);
                break;
        }
    }
    /* Filter for _.filter() that checks if a flag is of the matching type */
    static filter(flag) {
        return flag.color == this.color && flag.secondaryColor == this.secondaryColor;
    }
    /* Map a list of flags to directives, accepting a filter */
    static find(flags) {
        flags = _.filter(flags, flag => this.filter(flag));
        return _.compact(_.map(flags, flag => Game.directives[flag.name]));
    }
    // Overwrite this in child classes to display relevant information
    visuals() {
    }
};
Directive = Directive_1 = __decorate([
    profile
], Directive);
var Directive_1;

let DirectiveLabMineral = class DirectiveLabMineral extends Directive {
    constructor(flag) {
        super(flag);
    }
    get lab() {
        return this.pos.lookForStructure(STRUCTURE_LAB);
    }
    get mineralType() {
        return this.memory.mineralType;
    }
    init() {
    }
    run() {
    }
};
DirectiveLabMineral.directiveName = 'labMineralType';
DirectiveLabMineral.color = COLOR_CYAN;
DirectiveLabMineral.secondaryColor = COLOR_CYAN;
DirectiveLabMineral = __decorate([
    profile
], DirectiveLabMineral);

// All structure prototypes
// General structure prototypes ========================================================================================
Object.defineProperty(Structure.prototype, 'blocksMovement', {
    get() {
        return this.structureType != STRUCTURE_ROAD &&
            this.structureType != STRUCTURE_CONTAINER &&
            !(this.structureType == STRUCTURE_RAMPART && (this.my ||
                this.isPublic));
    },
});
// Container prototypes ================================================================================================
Object.defineProperty(StructureContainer.prototype, 'energy', {
    get() {
        return this.store[RESOURCE_ENERGY];
    },
});
Object.defineProperty(StructureContainer.prototype, 'isFull', {
    get() {
        return _.sum(this.store) >= this.storeCapacity;
    },
});
Object.defineProperty(StructureContainer.prototype, 'isEmpty', {
    get() {
        return _.sum(this.store) == 0;
    },
});
// Controller prototypes ===============================================================================================
Object.defineProperty(StructureController.prototype, 'reservedByMe', {
    get: function () {
        return this.reservation && this.reservation.username == MY_USERNAME;
    },
});
Object.defineProperty(StructureController.prototype, 'signedByMe', {
    get: function () {
        return this.sign && this.sign.text == Memory.signature && Game.time - this.sign.time < 250000;
    },
});
Object.defineProperty(StructureController.prototype, 'signedByScreeps', {
    get: function () {
        return this.sign && this.sign.username == 'Screeps';
    },
});
StructureController.prototype.needsReserving = function (reserveBuffer) {
    return !this.reservation || (this.reservedByMe && this.reservation.ticksToEnd < reserveBuffer);
};
// Extension prototypes ================================================================================================
Object.defineProperty(StructureExtension.prototype, 'isFull', {
    get() {
        return this.energy >= this.energyCapacity;
    },
});
Object.defineProperty(StructureExtension.prototype, 'isEmpty', {
    get() {
        return this.energy == 0;
    },
});
// Lab prototypes ======================================================================================================
StructureLab.prototype.getMineralType = function () {
    if (this.mineralType) {
        return this.mineralType;
    }
    else {
        let flags = this.pos.lookFor(LOOK_FLAGS);
        let dir = _.first(DirectiveLabMineral.find(flags));
        if (dir && dir.mineralType) {
            return dir.mineralType;
        }
    }
};
// Link prototypes =====================================================================================================
Object.defineProperty(StructureLink.prototype, 'isFull', {
    get() {
        return this.energy >= this.energyCapacity;
    },
});
Object.defineProperty(StructureLink.prototype, 'isEmpty', {
    get() {
        return this.energy == 0;
    },
});
// Nuker prototypes ====================================================================================================
// PowerSpawn prototypes ===============================================================================================
// Spawn prototypes ====================================================================================================
Object.defineProperty(StructureSpawn.prototype, 'isFull', {
    get() {
        return this.energy >= this.energyCapacity;
    },
});
Object.defineProperty(StructureSpawn.prototype, 'isEmpty', {
    get() {
        return this.energy == 0;
    },
});
// Storage prototypes ==================================================================================================
Object.defineProperty(StructureStorage.prototype, 'energy', {
    get() {
        return this.store[RESOURCE_ENERGY];
    },
});
Object.defineProperty(StructureStorage.prototype, 'isFull', {
    get() {
        return _.sum(this.store) >= this.storeCapacity;
    },
});
Object.defineProperty(StructureStorage.prototype, 'isEmpty', {
    get() {
        return _.sum(this.store) == 0;
    },
});
// Terminal prototypes =================================================================================================
Object.defineProperty(StructureTerminal.prototype, 'energy', {
    get() {
        return this.store[RESOURCE_ENERGY];
    },
});
Object.defineProperty(StructureTerminal.prototype, 'isFull', {
    get() {
        return _.sum(this.store) >= this.storeCapacity;
    },
});
Object.defineProperty(StructureTerminal.prototype, 'isEmpty', {
    get() {
        return _.sum(this.store) == 0;
    },
});
// StructureTerminal.prototype._send = StructureTerminal.prototype.send;
// StructureTerminal.prototype.send = function(resourceType: ResourceConstant, amount: number, destination: string,
// 											description?: string): ScreepsReturnCode {
// 	// Log stats
// 	let origin = this.room.name;
// 	let response = this._send(resourceType, amount, destination, description);
// 	if (response == OK) {
// 		TerminalNetwork.logTransfer(resourceType,amount,origin, destination)
// 	}
// 	return response;
// };
// Tower prototypes
Object.defineProperty(StructureTower.prototype, 'isFull', {
    get() {
        return this.energy >= this.energyCapacity;
    },
});
Object.defineProperty(StructureTower.prototype, 'isEmpty', {
    get() {
        return this.energy == 0;
    },
});
// Tombstone prototypes ================================================================================================
Object.defineProperty(Tombstone.prototype, 'energy', {
    get() {
        return this.store[RESOURCE_ENERGY];
    },
});

String.prototype.padRight = function (length, char = ' ') {
    return this + char.repeat(Math.max(length - this.length, 0));
};
String.prototype.padLeft = function (length, char = ' ') {
    return char.repeat(Math.max(length - this.length, 0)) + this;
};
Number.prototype.toPercent = function (decimals = 0) {
    return (this * 100).toFixed(decimals) + '%';
};
Number.prototype.truncate = function (decimals) {
    var re = new RegExp('(\\d+\\.\\d{' + decimals + '})(\\d)'), m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

/**
 * Creep tasks setup instructions
 *
 * Javascript:
 * 1. In main.js:    require("tasks/prototypes.js");
 * 2. As needed:    var Tasks = require("<path to Tasks.js>");
 *
 * Typescript:
 * 1. In main.ts:    import "./tasks/prototypes";
 * 2. As needed:    import {Tasks} from "<path to Tasks.ts>"
 *
 * If you use Travler, change all occurrences of creep.moveTo() to creep.travelTo()
 */
/* An abstract class for encapsulating creep actions. This generalizes the concept of "do action X to thing Y until
 * condition Z is met" and saves a lot of convoluted and duplicated code in creep logic. A Task object contains
 * the necessary logic for traveling to a target, performing a task, and realizing when a task is no longer sensible
 * to continue.*/
let Task = class Task {
    constructor(taskName, target, options = {}) {
        // Parameters for the task
        this.name = taskName;
        this._creep = {
            name: '',
        };
        if (target) { // Handles edge cases like when you're done building something and target disappears
            this._target = {
                ref: target.ref,
                _pos: target.pos,
            };
        }
        else {
            this._target = {
                ref: '',
                _pos: {
                    x: -1,
                    y: -1,
                    roomName: '',
                }
            };
        }
        this._parent = null;
        this.settings = {
            targetRange: 1,
            workOffRoad: false,
            oneShot: false,
        };
        _.defaults(options, {
            travelToOptions: {},
        });
        this.tick = Game.time;
        this.options = options;
        this.data = {};
    }
    get proto() {
        return {
            name: this.name,
            _creep: this._creep,
            _target: this._target,
            _parent: this._parent,
            tick: this.tick,
            options: this.options,
            data: this.data,
        };
    }
    set proto(protoTask) {
        // Don't write to this.name; used in task switcher
        this._creep = protoTask._creep;
        this._target = protoTask._target;
        this._parent = protoTask._parent;
        this.tick = protoTask.tick;
        this.options = protoTask.options;
        this.data = protoTask.data;
    }
    // Getter/setter for task.creep
    get creep() {
        // Returns zerg wrapper instead of creep to use monkey-patched functions
        return Game.zerg[this._creep.name];
    }
    set creep(creep) {
        this._creep.name = creep.name;
        if (this._parent) {
            this.parent.creep = creep;
        }
    }
    // Dereferences the target
    get target() {
        return deref(this._target.ref);
    }
    // Dereferences the saved target position; useful for situations where you might lose vision
    get targetPos() {
        // refresh if you have visibility of the target
        if (this.options.travelToOptions.movingTarget && this.target) {
            this._target._pos = this.target.pos;
        }
        return derefRoomPosition(this._target._pos);
    }
    // Getter/setter for task parent
    get parent() {
        return (this._parent ? initializeTask(this._parent) : null);
    }
    set parent(parentTask) {
        this._parent = parentTask ? parentTask.proto : null;
        // If the task is already assigned to a creep, update their memory
        if (this.creep) {
            this.creep.task = this;
        }
    }
    // Return a list of [this, this.parent, this.parent.parent, ...] as tasks
    get manifest() {
        let manifest = [this];
        let parent = this.parent;
        while (parent) {
            manifest.push(parent);
            parent = parent.parent;
        }
        return manifest;
    }
    // Return a list of [this.target, this.parent.target, ...] without fully instantiating the list of tasks
    get targetManifest() {
        let targetRefs = [this._target.ref];
        let parent = this._parent;
        while (parent) {
            targetRefs.push(parent._target.ref);
            parent = parent._parent;
        }
        return _.map(targetRefs, ref => deref(ref));
    }
    // Return a list of [this.target, this.parent.target, ...] without fully instantiating the list of tasks
    get targetPosManifest() {
        let targetPositions = [this._target._pos];
        let parent = this._parent;
        while (parent) {
            targetPositions.push(parent._target._pos);
            parent = parent._parent;
        }
        return _.map(targetPositions, protoPos => derefRoomPosition(protoPos));
    }
    // Fork the task, assigning a new task to the creep with this task as its parent
    fork(newTask) {
        newTask.parent = this;
        if (this.creep) {
            this.creep.task = newTask;
        }
        return newTask;
    }
    isValid() {
        let validTask = false;
        if (this.creep) {
            validTask = this.isValidTask();
        }
        let validTarget = false;
        if (this.target) {
            validTarget = this.isValidTarget();
        }
        else if (this.options.blind && !Game.rooms[this.targetPos.roomName]) {
            // If you can't see the target's room but you have blind enabled, then that's okay
            validTarget = true;
        }
        // Return if the task is valid; if not, finalize/delete the task and return false
        if (validTask && validTarget) {
            return true;
        }
        else {
            // Switch to parent task if there is one
            this.finish();
            let isValid = this.parent ? this.parent.isValid() : false;
            return isValid;
        }
    }
    /* Move to within range of the target */
    move(range = this.settings.targetRange) {
        if (!this.options.travelToOptions.range) {
            this.options.travelToOptions.range = range;
        }
        return this.creep.travelTo(this.targetPos, this.options.travelToOptions);
    }
    /* Moves to the next position on the agenda if specified - call this in some tasks after work() is completed */
    moveToNextPos() {
        if (this.options.nextPos) {
            let nextPos = derefRoomPosition(this.options.nextPos);
            return this.creep.travelTo(nextPos);
        }
    }
    // Return expected number of ticks until creep arrives at its first destination
    get eta() {
        if (this.creep && this.creep.memory._trav && this.creep.memory._trav.path) {
            return this.creep.memory._trav.path.length;
        }
    }
    // Execute this task each tick. Returns nothing unless work is done.
    run() {
        if (this.creep.pos.inRangeTo(this.targetPos, this.settings.targetRange) && !this.creep.pos.isEdge) {
            if (this.settings.workOffRoad) {
                // Move to somewhere nearby that isn't on a road
                this.parkCreep(this.creep, this.targetPos, true);
            }
            let result = this.work();
            if (this.settings.oneShot && result == OK) {
                this.finish();
            }
            return result;
        }
        else {
            this.move();
        }
    }
    /* Bundled form of zerg.park(); adapted from BonzAI codebase*/
    parkCreep(creep, pos = creep.pos, maintainDistance = false) {
        let road = _.find(creep.pos.lookFor(LOOK_STRUCTURES), s => s.structureType == STRUCTURE_ROAD);
        if (!road)
            return OK;
        let positions = _.sortBy(creep.pos.availableNeighbors(), (p) => p.getRangeTo(pos));
        if (maintainDistance) {
            let currentRange = creep.pos.getRangeTo(pos);
            positions = _.filter(positions, p => p.getRangeTo(pos) <= currentRange);
        }
        let swampPosition;
        for (let position of positions) {
            if (_.find(position.lookFor(LOOK_STRUCTURES), s => s.structureType == STRUCTURE_ROAD))
                continue;
            let terrain = position.lookFor(LOOK_TERRAIN)[0];
            if (terrain === 'swamp') {
                swampPosition = position;
            }
            else {
                return creep.move(creep.pos.getDirectionTo(position));
            }
        }
        if (swampPosition) {
            return creep.move(creep.pos.getDirectionTo(swampPosition));
        }
        return creep.travelTo(pos);
    }
    // Finalize the task and switch to parent task (or null if there is none)
    finish() {
        if (this.creep) {
            this.creep.task = this.parent;
        }
        else {
            console.log(`No creep executing ${this.name}!`);
        }
    }
};
Task = __decorate([
    profile
], Task);

const attackTaskName = 'attack';
let TaskAttack = class TaskAttack extends Task {
    constructor(target, options = {}) {
        super(attackTaskName, target, options);
        // Settings
        this.settings.targetRange = 3;
    }
    isValidTask() {
        return (this.creep.getActiveBodyparts(ATTACK) > 0 || this.creep.getActiveBodyparts(RANGED_ATTACK) > 0);
    }
    isValidTarget() {
        return this.target && this.target.hits > 0;
    }
    work() {
        let creep = this.creep;
        let target = this.target;
        let attackReturn = 0;
        let rangedAttackReturn = 0;
        if (creep.getActiveBodyparts(ATTACK) > 0) {
            if (creep.pos.isNearTo(target)) {
                attackReturn = creep.attack(target);
            }
            else {
                attackReturn = this.move(1); // approach target if you also have attack parts
            }
        }
        if (creep.pos.inRangeTo(target, 3) && creep.getActiveBodyparts(RANGED_ATTACK) > 0) {
            rangedAttackReturn = creep.rangedAttack(target);
        }
        if (attackReturn == OK && rangedAttackReturn == OK) {
            return OK;
        }
        else {
            if (attackReturn != OK) {
                return rangedAttackReturn;
            }
            else {
                return attackReturn;
            }
        }
    }
};
TaskAttack = __decorate([
    profile
], TaskAttack);

const buildTaskName = 'build';
let TaskBuild = class TaskBuild extends Task {
    constructor(target, options = {}) {
        super(buildTaskName, target, options);
        // Settings
        this.settings.targetRange = 3;
        this.settings.workOffRoad = true;
    }
    isValidTask() {
        return this.creep.carry.energy > 0;
    }
    isValidTarget() {
        return this.target && this.target.my && this.target.progress < this.target.progressTotal;
    }
    work() {
        return this.creep.build(this.target);
    }
};
TaskBuild = __decorate([
    profile
], TaskBuild);

const claimTaskName = 'claim';
let TaskClaim = class TaskClaim extends Task {
    constructor(target, options = {}) {
        super(claimTaskName, target, options);
        // Settings
    }
    isValidTask() {
        return (this.creep.getActiveBodyparts(CLAIM) > 0);
    }
    isValidTarget() {
        return (this.target != null && (!this.target.room || !this.target.owner));
    }
    work() {
        return this.creep.claimController(this.target);
    }
};
TaskClaim = __decorate([
    profile
], TaskClaim);

const dismantleTaskName = 'dismantle';
let TaskDismantle = class TaskDismantle extends Task {
    constructor(target, options = {}) {
        super(dismantleTaskName, target, options);
    }
    isValidTask() {
        return (this.creep.getActiveBodyparts(WORK) > 0);
    }
    isValidTarget() {
        return this.target && this.target.hits > 0;
    }
    work() {
        return this.creep.dismantle(this.target);
    }
};
TaskDismantle = __decorate([
    profile
], TaskDismantle);

const fortifyTaskName = 'fortify';
let TaskFortify = class TaskFortify extends Task {
    constructor(target, options = {}) {
        super(fortifyTaskName, target, options);
        // Settings
        this.settings.targetRange = 3;
        this.settings.workOffRoad = true;
    }
    isValidTask() {
        return (this.creep.carry.energy > 0);
    }
    isValidTarget() {
        return this.target && this.target.hits < this.target.hitsMax;
    }
    work() {
        return this.creep.repair(this.target);
    }
};
TaskFortify = __decorate([
    profile
], TaskFortify);

var RESOURCE_IMPORTANCE = [
    RESOURCE_CATALYZED_GHODIUM_ALKALIDE,
    RESOURCE_CATALYZED_GHODIUM_ACID,
    RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
    RESOURCE_CATALYZED_ZYNTHIUM_ACID,
    RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
    RESOURCE_CATALYZED_LEMERGIUM_ACID,
    RESOURCE_CATALYZED_KEANIUM_ALKALIDE,
    RESOURCE_CATALYZED_KEANIUM_ACID,
    RESOURCE_CATALYZED_UTRIUM_ALKALIDE,
    RESOURCE_CATALYZED_UTRIUM_ACID,
    RESOURCE_POWER,
    RESOURCE_GHODIUM_ALKALIDE,
    RESOURCE_GHODIUM_ACID,
    RESOURCE_ZYNTHIUM_ALKALIDE,
    RESOURCE_ZYNTHIUM_ACID,
    RESOURCE_LEMERGIUM_ALKALIDE,
    RESOURCE_LEMERGIUM_ACID,
    RESOURCE_KEANIUM_ALKALIDE,
    RESOURCE_KEANIUM_ACID,
    RESOURCE_UTRIUM_ALKALIDE,
    RESOURCE_UTRIUM_ACID,
    RESOURCE_GHODIUM_OXIDE,
    RESOURCE_GHODIUM_HYDRIDE,
    RESOURCE_ZYNTHIUM_OXIDE,
    RESOURCE_ZYNTHIUM_HYDRIDE,
    RESOURCE_LEMERGIUM_OXIDE,
    RESOURCE_LEMERGIUM_HYDRIDE,
    RESOURCE_KEANIUM_OXIDE,
    RESOURCE_KEANIUM_HYDRIDE,
    RESOURCE_UTRIUM_OXIDE,
    RESOURCE_UTRIUM_HYDRIDE,
    RESOURCE_UTRIUM_LEMERGITE,
    RESOURCE_ZYNTHIUM_KEANITE,
    RESOURCE_HYDROXIDE,
    RESOURCE_GHODIUM,
    RESOURCE_CATALYST,
    RESOURCE_ZYNTHIUM,
    RESOURCE_LEMERGIUM,
    RESOURCE_KEANIUM,
    RESOURCE_UTRIUM,
    RESOURCE_OXYGEN,
    RESOURCE_HYDROGEN,
    RESOURCE_ENERGY,
];
var REAGENTS = {
    // Tier 3
    [RESOURCE_CATALYZED_GHODIUM_ALKALIDE]: [RESOURCE_GHODIUM_ALKALIDE, RESOURCE_CATALYST],
    [RESOURCE_CATALYZED_GHODIUM_ACID]: [RESOURCE_GHODIUM_ACID, RESOURCE_CATALYST],
    [RESOURCE_CATALYZED_ZYNTHIUM_ACID]: [RESOURCE_ZYNTHIUM_ACID, RESOURCE_CATALYST],
    [RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE]: [RESOURCE_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYST],
    [RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE]: [RESOURCE_LEMERGIUM_ALKALIDE, RESOURCE_CATALYST],
    [RESOURCE_CATALYZED_LEMERGIUM_ACID]: [RESOURCE_LEMERGIUM_ACID, RESOURCE_CATALYST],
    [RESOURCE_CATALYZED_KEANIUM_ALKALIDE]: [RESOURCE_KEANIUM_ALKALIDE, RESOURCE_CATALYST],
    [RESOURCE_CATALYZED_KEANIUM_ACID]: [RESOURCE_KEANIUM_ACID, RESOURCE_CATALYST],
    [RESOURCE_CATALYZED_UTRIUM_ACID]: [RESOURCE_UTRIUM_ACID, RESOURCE_CATALYST],
    [RESOURCE_CATALYZED_UTRIUM_ALKALIDE]: [RESOURCE_UTRIUM_ALKALIDE, RESOURCE_CATALYST],
    // Tier 2
    [RESOURCE_GHODIUM_ACID]: [RESOURCE_GHODIUM_HYDRIDE, RESOURCE_HYDROXIDE],
    [RESOURCE_GHODIUM_ALKALIDE]: [RESOURCE_GHODIUM_OXIDE, RESOURCE_HYDROXIDE],
    [RESOURCE_ZYNTHIUM_ACID]: [RESOURCE_ZYNTHIUM_HYDRIDE, RESOURCE_HYDROXIDE],
    [RESOURCE_ZYNTHIUM_ALKALIDE]: [RESOURCE_ZYNTHIUM_OXIDE, RESOURCE_HYDROXIDE],
    [RESOURCE_LEMERGIUM_ALKALIDE]: [RESOURCE_LEMERGIUM_OXIDE, RESOURCE_HYDROXIDE],
    [RESOURCE_LEMERGIUM_ACID]: [RESOURCE_LEMERGIUM_HYDRIDE, RESOURCE_HYDROXIDE],
    [RESOURCE_KEANIUM_ALKALIDE]: [RESOURCE_KEANIUM_OXIDE, RESOURCE_HYDROXIDE],
    [RESOURCE_KEANIUM_ACID]: [RESOURCE_KEANIUM_HYDRIDE, RESOURCE_HYDROXIDE],
    [RESOURCE_UTRIUM_ACID]: [RESOURCE_UTRIUM_HYDRIDE, RESOURCE_HYDROXIDE],
    [RESOURCE_UTRIUM_ALKALIDE]: [RESOURCE_UTRIUM_OXIDE, RESOURCE_HYDROXIDE],
    // Tier 1
    [RESOURCE_GHODIUM_HYDRIDE]: [RESOURCE_GHODIUM, RESOURCE_HYDROGEN],
    [RESOURCE_GHODIUM_OXIDE]: [RESOURCE_GHODIUM, RESOURCE_OXYGEN],
    [RESOURCE_ZYNTHIUM_HYDRIDE]: [RESOURCE_ZYNTHIUM, RESOURCE_HYDROGEN],
    [RESOURCE_ZYNTHIUM_OXIDE]: [RESOURCE_ZYNTHIUM, RESOURCE_OXYGEN],
    [RESOURCE_LEMERGIUM_OXIDE]: [RESOURCE_LEMERGIUM, RESOURCE_OXYGEN],
    [RESOURCE_LEMERGIUM_HYDRIDE]: [RESOURCE_LEMERGIUM, RESOURCE_HYDROGEN],
    [RESOURCE_KEANIUM_OXIDE]: [RESOURCE_KEANIUM, RESOURCE_OXYGEN],
    [RESOURCE_KEANIUM_HYDRIDE]: [RESOURCE_KEANIUM, RESOURCE_HYDROGEN],
    [RESOURCE_UTRIUM_HYDRIDE]: [RESOURCE_UTRIUM, RESOURCE_HYDROGEN],
    [RESOURCE_UTRIUM_OXIDE]: [RESOURCE_UTRIUM, RESOURCE_OXYGEN],
    // Tier 0
    [RESOURCE_GHODIUM]: [RESOURCE_ZYNTHIUM_KEANITE, RESOURCE_UTRIUM_LEMERGITE],
    [RESOURCE_HYDROXIDE]: [RESOURCE_OXYGEN, RESOURCE_HYDROGEN],
    [RESOURCE_ZYNTHIUM_KEANITE]: [RESOURCE_ZYNTHIUM, RESOURCE_KEANIUM],
    [RESOURCE_UTRIUM_LEMERGITE]: [RESOURCE_UTRIUM, RESOURCE_LEMERGIUM]
};
var boostParts = {
    'UH': ATTACK,
    'UO': WORK,
    'KH': CARRY,
    'KO': RANGED_ATTACK,
    'LH': WORK,
    'LO': HEAL,
    'ZH': WORK,
    'ZO': MOVE,
    'GH': WORK,
    'GO': TOUGH,
    'UH2O': ATTACK,
    'UHO2': WORK,
    'KH2O': CARRY,
    'KHO2': RANGED_ATTACK,
    'LH2O': WORK,
    'LHO2': HEAL,
    'ZH2O': WORK,
    'ZHO2': MOVE,
    'GH2O': WORK,
    'GHO2': TOUGH,
    'XUH2O': ATTACK,
    'XUHO2': WORK,
    'XKH2O': CARRY,
    'XKHO2': RANGED_ATTACK,
    'XLH2O': WORK,
    'XLHO2': HEAL,
    'XZH2O': WORK,
    'XZHO2': MOVE,
    'XGH2O': WORK,
    'XGHO2': TOUGH,
};
var boostResources = {
    'attack': {
        1: 'UH',
        2: 'UH2O',
        3: 'XUH2O',
    },
    'carry': {
        1: 'KH',
        2: 'KH2O',
        3: 'XKH2O',
    },
    'ranged_attack': {
        1: 'KO',
        2: 'KHO2',
        3: 'XKHO2',
    },
    'heal': {
        1: 'LO',
        2: 'LHO2',
        3: 'XLHO2',
    },
    'move': {
        1: 'ZO',
        2: 'ZHO2',
        3: 'XZHO2',
    },
    'tough': {
        1: 'GO',
        2: 'GHO2',
        3: 'XGHO2',
    },
    'harvest': {
        1: 'UO',
        2: 'UHO2',
        3: 'XUHO2',
    },
    'construct': {
        1: 'LH',
        2: 'LH2O',
        3: 'XLH2O',
    },
    'dismantle': {
        1: 'ZH',
        2: 'ZH2O',
        3: 'XZH2O',
    },
    'upgrade': {
        1: 'GH',
        2: 'GH2O',
        3: 'XGH2O',
    },
};

const getBoostedTaskName = 'getBoosted';
const MIN_LIFETIME_FOR_BOOST = 0.9;
let TaskGetBoosted = class TaskGetBoosted extends Task {
    constructor(target, boostType, partCount = undefined, options = {}) {
        super(getBoostedTaskName, target, options);
        // Settings
        this.data.resourceType = boostType;
        this.data.amount = partCount;
    }
    isValidTask() {
        let lifetime = _.any(this.creep.body, part => part.type == CLAIM) ? CREEP_CLAIM_LIFE_TIME : CREEP_LIFE_TIME;
        if (this.creep.ticksToLive && this.creep.ticksToLive < MIN_LIFETIME_FOR_BOOST * lifetime) {
            return false; // timeout after this amount of lifespan has passed
        }
        let partCount = (this.data.amount || this.creep.getActiveBodyparts(boostParts[this.data.resourceType]));
        return (this.creep.boostCounts[this.data.resourceType] || 0) < partCount;
    }
    isValidTarget() {
        return true; // Warning: this will block creep actions if the lab is left unsupplied of energy or minerals
    }
    work() {
        let partCount = (this.data.amount || this.creep.getActiveBodyparts(boostParts[this.data.resourceType]));
        if (this.target.mineralType == this.data.resourceType &&
            this.target.mineralAmount >= LAB_BOOST_MINERAL * partCount &&
            this.target.energy >= LAB_BOOST_ENERGY * partCount) {
            let result = this.target.boostCreep(deref(this._creep.name), this.data.amount);
            log.info(`Lab@${this.target.pos.print}: boosting creep ${this.creep.name} with ${this.target.mineralType}!`
                + ` Response: ${result}`);
            return result;
        }
        else {
            return ERR_NOT_FOUND;
        }
    }
};
TaskGetBoosted = __decorate([
    profile
], TaskGetBoosted);

const getRenewedTaskName = 'getRenewed';
let TaskGetRenewed = class TaskGetRenewed extends Task {
    constructor(target, options = {}) {
        super(getRenewedTaskName, target, options);
    }
    isValidTask() {
        let hasClaimPart = _.filter(this.creep.body, (part) => part.type == CLAIM).length > 0;
        let lifetime = hasClaimPart ? CREEP_CLAIM_LIFE_TIME : CREEP_LIFE_TIME;
        return this.creep.ticksToLive != undefined && this.creep.ticksToLive < 0.9 * lifetime;
    }
    isValidTarget() {
        return this.target.my && !this.target.spawning;
    }
    work() {
        return this.target.renewCreep(this.creep);
    }
};
TaskGetRenewed = __decorate([
    profile
], TaskGetRenewed);

const goToTaskName = 'goTo';
let TaskGoTo = class TaskGoTo extends Task {
    constructor(target, options = {}) {
        if (target instanceof RoomPosition) {
            super(goToTaskName, { ref: '', pos: target }, options);
        }
        else {
            super(goToTaskName, { ref: '', pos: target.pos }, options);
        }
        // Settings
        this.settings.targetRange = 1;
    }
    isValidTask() {
        let range = this.settings.targetRange;
        if (this.options.travelToOptions.range != undefined) {
            range = this.options.travelToOptions.range;
        }
        return !this.creep.pos.inRangeTo(this.targetPos, range);
    }
    isValidTarget() {
        return true;
    }
    isValid() {
        let validTask = false;
        if (this.creep) {
            validTask = this.isValidTask();
        }
        // Return if the task is valid; if not, finalize/delete the task and return false
        if (validTask) {
            return true;
        }
        else {
            // Switch to parent task if there is one
            let isValid = false;
            if (this.parent) {
                isValid = this.parent.isValid();
            }
            this.finish();
            return isValid;
        }
    }
    work() {
        return OK;
    }
};
TaskGoTo = __decorate([
    profile
], TaskGoTo);

const goToRoomTaskName = 'goToRoom';
let TaskGoToRoom = class TaskGoToRoom extends Task {
    constructor(roomName, options = {}) {
        super(goToRoomTaskName, { ref: '', pos: new RoomPosition(25, 25, roomName) }, options);
        // Settings
        this.settings.targetRange = 24; // Target is almost always controller flag, so range of 2 is acceptable
    }
    isValidTask() {
        return !this.creep.pos.inRangeTo(this.targetPos, this.settings.targetRange);
    }
    isValidTarget() {
        return true;
    }
    isValid() {
        let validTask = false;
        if (this.creep) {
            validTask = this.isValidTask();
        }
        // Return if the task is valid; if not, finalize/delete the task and return false
        if (validTask) {
            return true;
        }
        else {
            // Switch to parent task if there is one
            let isValid = false;
            if (this.parent) {
                isValid = this.parent.isValid();
            }
            this.finish();
            return isValid;
        }
    }
    work() {
        return OK;
    }
};
TaskGoToRoom = __decorate([
    profile
], TaskGoToRoom);

const harvestTaskName = 'harvest';
let TaskHarvest = class TaskHarvest extends Task {
    constructor(target, options = {}) {
        super(harvestTaskName, target, options);
    }
    isValidTask() {
        return _.sum(this.creep.carry) < this.creep.carryCapacity;
    }
    isValidTarget() {
        if (this.target && (this.target instanceof Source ? this.target.energy > 0 : this.target.mineralAmount > 0)) {
            // Valid only if there's enough space for harvester to work - prevents doing tons of useless pathfinding
            return this.target.pos.availableNeighbors().length > 0 || this.creep.pos.isNearTo(this.target.pos);
        }
        return false;
    }
    work() {
        return this.creep.harvest(this.target);
    }
};
TaskHarvest = __decorate([
    profile
], TaskHarvest);

const healTaskName = 'heal';
let TaskHeal = class TaskHeal extends Task {
    constructor(target, options = {}) {
        super(healTaskName, target, options);
        // Settings
        this.settings.targetRange = 3;
    }
    isValidTask() {
        return (this.creep.getActiveBodyparts(HEAL) > 0);
    }
    isValidTarget() {
        return this.target && this.target.hits < this.target.hitsMax && this.target.my;
    }
    work() {
        if (this.creep.pos.isNearTo(this.target)) {
            return this.creep.heal(this.target);
        }
        else {
            this.move(1);
        }
        return this.creep.rangedHeal(this.target);
    }
};
TaskHeal = __decorate([
    profile
], TaskHeal);

const meleeAttackTaskName = 'meleeAttack';
let TaskMeleeAttack = class TaskMeleeAttack extends Task {
    constructor(target, options = {}) {
        super(meleeAttackTaskName, target, options);
        // Settings
        this.settings.targetRange = 1;
    }
    isValidTask() {
        return this.creep.getActiveBodyparts(ATTACK) > 0;
    }
    isValidTarget() {
        var target = this.target;
        return target && target.hits > 0; // && target.my == false);
    }
    work() {
        return this.creep.attack(this.target);
    }
};
TaskMeleeAttack = __decorate([
    profile
], TaskMeleeAttack);

const pickupTaskName = 'pickup';
let TaskPickup = class TaskPickup extends Task {
    constructor(target, options = {}) {
        super('pickup', target, options);
        this.settings.oneShot = true;
    }
    isValidTask() {
        return this.creep.carry.energy < this.creep.carryCapacity;
    }
    isValidTarget() {
        return this.target && this.target.amount > 0;
    }
    work() {
        return this.creep.pickup(this.target);
    }
};
TaskPickup = __decorate([
    profile
], TaskPickup);

const rangedAttackTaskName = 'rangedAttack';
let TaskRangedAttack = class TaskRangedAttack extends Task {
    constructor(target, options = {}) {
        super(rangedAttackTaskName, target, options);
        // Settings
        this.settings.targetRange = 3;
    }
    isValidTask() {
        return this.creep.getActiveBodyparts(RANGED_ATTACK) > 0;
    }
    isValidTarget() {
        return this.target && this.target.hits > 0;
    }
    work() {
        return this.creep.rangedAttack(this.target);
    }
};
TaskRangedAttack = __decorate([
    profile
], TaskRangedAttack);

// Type guard functions
function isEnergyStructure(structure) {
    return structure.energy != undefined && structure.energyCapacity != undefined;
}
function isStoreStructure(structure) {
    return structure.store != undefined;
}
// export function isResourceStructure(structure: Structure): structure is MineralStructure {
//
// }

/* Withdraw a resource from a target */
const withdrawTaskName = 'withdraw';
let TaskWithdraw = class TaskWithdraw extends Task {
    constructor(target, resourceType = RESOURCE_ENERGY, amount = undefined, options = {}) {
        super(withdrawTaskName, target, options);
        // Settings
        this.settings.oneShot = true;
        this.data.resourceType = resourceType;
        this.data.amount = amount;
    }
    isValidTask() {
        let amount = this.data.amount || 1;
        return (_.sum(this.creep.carry) <= this.creep.carryCapacity - amount);
    }
    isValidTarget() {
        let amount = this.data.amount || 1;
        let target = this.target;
        if (target instanceof Tombstone || isStoreStructure(target)) {
            return (target.store[this.data.resourceType] || 0) >= amount;
        }
        else if (isEnergyStructure(target) && this.data.resourceType == RESOURCE_ENERGY) {
            return target.energy >= amount;
        }
        else {
            if (target instanceof StructureLab) {
                return this.data.resourceType == target.mineralType && target.mineralAmount >= amount;
            }
            else if (target instanceof StructureNuker) {
                return this.data.resourceType == RESOURCE_GHODIUM && target.ghodium >= amount;
            }
            else if (target instanceof StructurePowerSpawn) {
                return this.data.resourceType == RESOURCE_POWER && target.power >= amount;
            }
        }
        return false;
    }
    work() {
        this.moveToNextPos();
        return this.creep.withdraw(this.target, this.data.resourceType, this.data.amount);
    }
};
TaskWithdraw = __decorate([
    profile
], TaskWithdraw);

const repairTaskName = 'repair';
let TaskRepair = class TaskRepair extends Task {
    constructor(target, options = {}) {
        super(repairTaskName, target, options);
        // Settings
        this.settings.targetRange = 3;
    }
    isValidTask() {
        return this.creep.carry.energy > 0;
    }
    isValidTarget() {
        return this.target && this.target.hits < this.target.hitsMax;
    }
    work() {
        if (this.target instanceof StructureRoad) {
            // Move toward target if it's a road to prevent move-stop-repair-move-stop-repair
            this.move(this.settings.targetRange - 1);
        }
        return this.creep.repair(this.target);
    }
};
TaskRepair = __decorate([
    profile
], TaskRepair);

const reserveTaskName = 'colony';
let TaskReserve = class TaskReserve extends Task {
    constructor(target, options = {}) {
        super(reserveTaskName, target, options);
    }
    isValidTask() {
        return (this.creep.getActiveBodyparts(CLAIM) > 0);
    }
    isValidTarget() {
        var target = this.target;
        return (target != null && (!target.reservation || target.reservation.ticksToEnd < 4999));
    }
    work() {
        return this.creep.reserveController(this.target);
    }
};
TaskReserve = __decorate([
    profile
], TaskReserve);

const signControllerTaskName = 'signController';
let TaskSignController = class TaskSignController extends Task {
    constructor(target, options = {}) {
        super(signControllerTaskName, target, options);
    }
    isValidTask() {
        return true;
    }
    isValidTarget() {
        let controller = this.target;
        return (!controller.sign || controller.sign.text != Memory.signature) && !controller.signedByScreeps;
    }
    work() {
        return this.creep.signController(this.target, Memory.signature);
    }
};
TaskSignController = __decorate([
    profile
], TaskSignController);

const transferTaskName = 'transfer';
let TaskTransfer = class TaskTransfer extends Task {
    constructor(target, resourceType = RESOURCE_ENERGY, amount = undefined, options = {}) {
        super(transferTaskName, target, options);
        // Settings
        this.settings.oneShot = true;
        this.data.resourceType = resourceType;
        this.data.amount = amount;
    }
    isValidTask() {
        let amount = this.data.amount || 1;
        let resourcesInCarry = this.creep.carry[this.data.resourceType] || 0;
        return resourcesInCarry >= amount;
    }
    isValidTarget() {
        let amount = this.data.amount || 1;
        let target = this.target;
        if (target instanceof Creep) {
            return _.sum(target.carry) <= target.carryCapacity - amount;
        }
        else if (isStoreStructure(target)) {
            return _.sum(target.store) <= target.storeCapacity - amount;
        }
        else if (isEnergyStructure(target) && this.data.resourceType == RESOURCE_ENERGY) {
            return target.energy <= target.energyCapacity - amount;
        }
        else {
            if (target instanceof StructureLab) {
                return (target.mineralType == this.data.resourceType || !target.mineralType) &&
                    target.mineralAmount <= target.mineralCapacity - amount;
            }
            else if (target instanceof StructureNuker) {
                return this.data.resourceType == RESOURCE_GHODIUM &&
                    target.ghodium <= target.ghodiumCapacity - amount;
            }
            else if (target instanceof StructurePowerSpawn) {
                return this.data.resourceType == RESOURCE_POWER &&
                    target.power <= target.powerCapacity - amount;
            }
        }
        return false;
    }
    work() {
        this.moveToNextPos();
        return this.creep.transfer(this.target, this.data.resourceType, this.data.amount);
    }
};
TaskTransfer = __decorate([
    profile
], TaskTransfer);

const upgradeTaskName = 'upgrade';
let TaskUpgrade = class TaskUpgrade extends Task {
    constructor(target, options = {}) {
        super(upgradeTaskName, target, options);
        // Settings
        this.settings.targetRange = 3;
        this.settings.workOffRoad = true;
    }
    isValidTask() {
        return (this.creep.carry.energy > 0);
    }
    isValidTarget() {
        return this.target && this.target.my;
    }
    work() {
        return this.creep.upgradeController(this.target);
    }
};
TaskUpgrade = __decorate([
    profile
], TaskUpgrade);

const dropTaskName = 'drop';
let TaskDrop = TaskDrop_1 = class TaskDrop extends Task {
    constructor(target, resourceType = RESOURCE_ENERGY, amount = undefined, options = {}) {
        if (target instanceof RoomPosition) {
            super(TaskDrop_1.taskName, { ref: '', pos: target }, options);
        }
        else {
            super(TaskDrop_1.taskName, { ref: '', pos: target.pos }, options);
        }
        // Settings
        this.settings.targetRange = 0;
        this.settings.oneShot = true;
        // Data
        this.data.resourceType = resourceType;
        this.data.amount = amount;
    }
    isValidTask() {
        let amount = this.data.amount || 1;
        let resourcesInCarry = this.creep.carry[this.data.resourceType] || 0;
        return resourcesInCarry >= amount;
    }
    isValidTarget() {
        return true;
    }
    isValid() {
        // It's necessary to override task.isValid() for tasks which do not have a RoomObject target
        let validTask = false;
        if (this.creep) {
            validTask = this.isValidTask();
        }
        // Return if the task is valid; if not, finalize/delete the task and return false
        if (validTask) {
            return true;
        }
        else {
            // Switch to parent task if there is one
            let isValid = false;
            if (this.parent) {
                isValid = this.parent.isValid();
            }
            this.finish();
            return isValid;
        }
    }
    work() {
        return this.creep.drop(this.data.resourceType, this.data.amount);
    }
};
TaskDrop.taskName = 'drop';
TaskDrop = TaskDrop_1 = __decorate([
    profile
], TaskDrop);
var TaskDrop_1;

// Invalid task assigned if instantiation fails.
let TaskInvalid = class TaskInvalid extends Task {
    constructor(target, options = {}) {
        super('INVALID', target, options);
    }
    isValidTask() {
        return false;
    }
    isValidTarget() {
        return false;
    }
    work() {
        return OK;
    }
};
TaskInvalid = __decorate([
    profile
], TaskInvalid);

const fleeTaskName = 'goTo';
// Flee task makes creep move to a fallback position and wait until a specified room is safe
let TaskFlee = class TaskFlee extends Task {
    constructor(fallback, options = {}) {
        if (fallback instanceof RoomPosition) {
            super(fleeTaskName, { ref: '', pos: fallback }, options);
        }
        else {
            super(fleeTaskName, { ref: '', pos: fallback.pos }, options);
        }
        // Settings
        this.settings.targetRange = 4;
        // Options
        this.options.travelToOptions = {
            // allowHostile: true,
            allowSK: true,
        };
    }
    isValidTask() {
        // Task is valid while fleeFromRoom is not visibly safe
        let fleeFromRoom = Game.rooms[this.data.fleeFromRoom];
        let roomIsSafe = (fleeFromRoom && fleeFromRoom.hostiles.length == 0);
        return !roomIsSafe;
    }
    isValidTarget() {
        return true;
    }
    isValid() {
        let validTask = false;
        if (this.creep) {
            validTask = this.isValidTask();
        }
        // Return if the task is valid; if not, finalize/delete the task and return false
        if (validTask) {
            return true;
        }
        else {
            // Switch to parent task if there is one
            let isValid = false;
            if (this.parent) {
                isValid = this.parent.isValid();
            }
            this.finish();
            return isValid;
        }
    }
    run() {
        // Log the fleeFrom room if you don't have one already
        if (!this.data.fleeFromRoom && this.creep) {
            let proto = this.proto;
            proto.data.fleeFromRoom = this.creep.room.name;
            this.proto = proto;
        }
        // If creep is in an unsafe room, retreat until you are in range of fallbackPos
        if (this.creep.room.hostiles) {
            // If you're within range of the fallback position, park
            if (this.creep.pos.inRangeTo(this.targetPos, this.settings.targetRange) && !this.creep.pos.isEdge) {
                this.parkCreep(this.creep, this.targetPos);
            }
            else {
                this.move();
            }
        }
        // If creep is in a safe room, retreat until you are sufficiently far from edge
        else {
            // Park if far away from edge
            if (this.creep.pos.rangeToEdge > 3) {
                this.parkCreep(this.creep, this.targetPos);
            }
            else {
                this.move();
            }
        }
    }
    work() {
        return OK;
    }
};
TaskFlee = __decorate([
    profile
], TaskFlee);

const transferAllTaskName = 'transferAll';
let TaskTransferAll = class TaskTransferAll extends Task {
    constructor(target, options = {}) {
        super(transferAllTaskName, target, options);
    }
    isValidTask() {
        for (let resourceType in this.creep.carry) {
            let amountInCarry = this.creep.carry[resourceType] || 0;
            if (amountInCarry > 0) {
                return true;
            }
        }
        return false;
    }
    isValidTarget() {
        return this.target.storeCapacity - _.sum(this.target.store) >= _.sum(this.creep.carry);
    }
    work() {
        for (let resourceType in this.creep.carry) {
            let amountInCarry = this.creep.carry[resourceType] || 0;
            if (amountInCarry > 0) {
                return this.creep.transfer(this.target, resourceType);
            }
        }
        return -1;
    }
};
TaskTransferAll = __decorate([
    profile
], TaskTransferAll);

// Reinstantiation of a task object from protoTask data
function initializeTask(protoTask) {
    // Retrieve name and target data from the protoTask
    let taskName = protoTask.name;
    let target = deref(protoTask._target.ref);
    let task;
    // Create a task object of the correct type
    switch (taskName) {
        case attackTaskName:
            task = new TaskAttack(target);
            break;
        case buildTaskName:
            task = new TaskBuild(target);
            break;
        case claimTaskName:
            task = new TaskClaim(target);
            break;
        case dismantleTaskName:
            task = new TaskDismantle(target);
            break;
        case dropTaskName:
            task = new TaskDrop(derefRoomPosition(protoTask._target._pos));
            break;
        case fleeTaskName:
            task = new TaskFlee(derefRoomPosition(protoTask._target._pos));
            break;
        case fortifyTaskName:
            task = new TaskFortify(target);
            break;
        case getBoostedTaskName:
            task = new TaskGetBoosted(target, protoTask.data.resourceType);
            break;
        case getRenewedTaskName:
            task = new TaskGetRenewed(target);
            break;
        case goToTaskName:
            // task = new TaskGoTo(derefRoomPosition(protoTask._target._pos) as goToTargetType);
            task = new TaskInvalid(target);
            break;
        case goToRoomTaskName:
            task = new TaskGoToRoom(protoTask._target._pos.roomName);
            break;
        case harvestTaskName:
            task = new TaskHarvest(target);
            break;
        case healTaskName:
            task = new TaskHeal(target);
            break;
        case meleeAttackTaskName:
            task = new TaskMeleeAttack(target);
            break;
        case pickupTaskName:
            task = new TaskPickup(target);
            break;
        case rangedAttackTaskName:
            task = new TaskRangedAttack(target);
            break;
        case withdrawTaskName:
            task = new TaskWithdraw(target);
            break;
        case repairTaskName:
            task = new TaskRepair(target);
            break;
        case reserveTaskName:
            task = new TaskReserve(target);
            break;
        case signControllerTaskName:
            task = new TaskSignController(target);
            break;
        case transferTaskName:
            task = new TaskTransfer(target);
            break;
        case transferAllTaskName:
            task = new TaskTransferAll(target);
            break;
        case upgradeTaskName:
            task = new TaskUpgrade(target);
            break;
        default:
            log.error(`Invalid task name: ${taskName}! task.creep: ${protoTask._creep.name}. Deleting from memory!`);
            task = new TaskInvalid(target);
            break;
    }
    // Modify the task object to reflect any changed properties
    task.proto = protoTask;
    // Return it
    return task;
}

// This binds a getter/setter creep.task property
Object.defineProperty(Creep.prototype, 'task', {
    get() {
        if (!this._task) {
            let protoTask = this.memory.task;
            this._task = protoTask ? initializeTask(protoTask) : null;
        }
        return this._task;
    },
    set(task) {
        // Unregister target from old task if applicable
        let oldProtoTask = this.memory.task;
        if (oldProtoTask) {
            let oldRef = oldProtoTask._target.ref;
            if (Overmind.cache.targets[oldRef]) {
                _.remove(Overmind.cache.targets[oldRef], name => name == this.name);
            }
        }
        // Set the new task
        this.memory.task = task ? task.proto : null;
        if (task) {
            if (task.target) {
                // Register task target in cache if it is actively targeting something (excludes goTo and similar)
                if (!Overmind.cache.targets[task.target.ref]) {
                    Overmind.cache.targets[task.target.ref] = [];
                }
                Overmind.cache.targets[task.target.ref].push(this.name);
            }
            // Register references to creep
            task.creep = this;
        }
        // Clear cache
        this._task = undefined;
    },
});
Creep.prototype.run = function () {
    if (this.task) {
        return this.task.run();
    }
};
Object.defineProperties(Creep.prototype, {
    'hasValidTask': {
        get() {
            return this.task && this.task.isValid();
        }
    },
    'isIdle': {
        get() {
            return !this.hasValidTask;
        }
    }
});

// Sandbox code: lets you try out random stuff at the end of main loop
function sandbox() {
    try {
    }
    catch (e) {
        log.error(e);
    }
}

// Gather stats every N ticks
let Stats = class Stats {
    static clean() {
        let protectedKeys = [
            'persistent',
        ];
        for (let key in Memory.stats) {
            if (!protectedKeys.includes(key)) {
                delete Memory.stats[key];
            }
        }
    }
    static format() {
        // Memory.stats = {
        // 	cpu: {
        // 		getUsed: undefined,
        // 		limit: undefined,
        // 		bucket: undefined,
        // 		usage: {},
        // 	},
        // 	gcl: {},
        // 	colonies: {},
        // }
    }
    static cpu() {
        Memory.stats['cpu.getUsed'] = Game.cpu.getUsed();
        Memory.stats['cpu.limit'] = Game.cpu.limit;
        Memory.stats['cpu.bucket'] = Game.cpu.bucket;
    }
    static gcl() {
        Memory.stats['gcl.progress'] = Game.gcl.progress;
        Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
        Memory.stats['gcl.level'] = Game.gcl.level;
    }
    static memory() {
        Memory.stats['memory.used'] = RawMemory.get().length;
    }
    static log(key, value, truncateNumbers = true) {
        if (truncateNumbers && typeof value == 'number') {
            let decimals = 5;
            value = value.truncate(decimals);
        }
        Mem.setDeep(Memory.stats, key, value);
    }
    static accumulate(key, value) {
        if (!Memory.stats[key]) {
            Memory.stats[key] = 0;
        }
        Memory.stats[key] += value;
    }
    static run() {
        // Log GCL
        this.log('gcl.progress', Game.gcl.progress);
        this.log('gcl.progressTotal', Game.gcl.progressTotal);
        this.log('gcl.level', Game.gcl.level);
        // Log memory usage
        this.log('memory.used', RawMemory.get().length);
        // Log CPU
        this.log('cpu.getUsed', Game.cpu.getUsed());
        this.log('cpu.limit', Game.cpu.limit);
        this.log('cpu.bucket', Game.cpu.bucket);
    }
};
Stats = __decorate([
    profile
], Stats);

let Mem = Mem_1 = class Mem {
    static wrap(memory, memName, defaults = {}, deep = false) {
        if (!memory[memName]) {
            memory[memName] = defaults;
        }
        if (deep) {
            _.defaultsDeep(memory[memName], defaults);
        }
        else {
            _.defaults(memory[memName], defaults);
        }
        return memory[memName];
    }
    static _setDeep(object, keys, value) {
        let key = _.first(keys);
        keys = _.drop(keys);
        if (keys.length == 0) { // at the end of the recursion
            object[key] = value;
            return;
        }
        else {
            if (!object[key]) {
                object[key] = {};
            }
            return Mem_1._setDeep(object[key], keys, value);
        }
    }
    /* Recursively set a value of an object given a dot-separated key, adding intermediate properties as necessary
     * Ex: Mem.setDeep(Memory.colonies, 'E1S1.miningSites.siteID.stats.uptime', 0.5) */
    static setDeep(object, keyString, value) {
        let keys = keyString.split('.');
        return Mem_1._setDeep(object, keys, value);
    }
    static formatOvermindMemory() {
        if (!Memory.Overmind) {
            Memory.Overmind = {};
        }
        if (!Memory.colonies) {
            Memory.colonies = {};
        }
    }
    static formatPathingMemory() {
        if (!Memory.pathing) {
            Memory.pathing = {}; // Hacky workaround
        }
        _.defaults(Memory.pathing, {
            paths: {},
            distances: {},
            weightedDistances: {},
        });
    }
    static format() {
        // Format the memory as needed, done once every global reset
        this.formatOvermindMemory();
        this.formatPathingMemory();
        // Rest of memory formatting
        if (!Memory.settings) {
            Memory.settings = {};
        }
        _.defaults(Memory.settings, {
            enableVisuals: true,
        });
        if (!Memory.stats) {
            Memory.stats = {};
        }
        if (!Memory.stats.persistent) {
            Memory.stats.persistent = {};
        }
        if (!Memory.signature) {
            Memory.signature = DEFAULT_OVERMIND_SIGNATURE;
        }
        if (!Memory.constructionSites) {
            Memory.constructionSites = {};
        }
        // Changes to ensure backwards compatibility
        this.backwardsCompatibility();
    }
    static cleanCreeps() {
        // Clear memory for non-existent creeps
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }
    static cleanFlags() {
        // Clear memory for non-existent flags
        for (let name in Memory.flags) {
            if (!Game.flags[name]) {
                delete Memory.flags[name];
            }
        }
    }
    static cleanColonies() {
        // Clear memory of dead colonies
        for (let name in Memory.colonies) {
            let room = Game.rooms[name];
            if (!(room && room.my)) {
                // Delete only if "persistent" is not set - use case: praise rooms
                if (!Memory.colonies[name].persistent) {
                    delete Memory.colonies[name];
                }
            }
        }
    }
    static cleanConstructionSites() {
        // Remove ancient construction sites
        if (Game.time % 10 == 0) {
            const CONSTRUCTION_SITE_TIMEOUT = 50000;
            // Add constructionSites to memory and remove really old ones
            for (let id in Game.constructionSites) {
                if (!Memory.constructionSites[id]) {
                    Memory.constructionSites[id] = Game.time;
                }
                else if (Game.time - Memory.constructionSites[id] > CONSTRUCTION_SITE_TIMEOUT) {
                    Game.constructionSites[id].remove();
                }
            }
            // Remove dead constructionSites from memory
            for (let id in Memory.constructionSites) {
                if (!Game.constructionSites[id]) {
                    delete Memory.constructionSites[id];
                }
            }
        }
    }
    static cleanPathingMemory() {
        let distanceCleanProbability = 1 / 1000;
        let weightedDistanceCleanProbability = 0.01;
        // Randomly clear some cached path lengths
        for (let pos1Name in Memory.pathing.distances) {
            if (_.isEmpty(Memory.pathing.distances[pos1Name])) {
                delete Memory.pathing.distances[pos1Name];
            }
            else {
                for (let pos2Name in Memory.pathing.distances[pos1Name]) {
                    if (Math.random() < distanceCleanProbability) {
                        delete Memory.pathing.distances[pos1Name][pos2Name];
                    }
                }
            }
        }
        // Randomly clear weighted distances
        for (let pos1Name in Memory.pathing.weightedDistances) {
            if (_.isEmpty(Memory.pathing.weightedDistances[pos1Name])) {
                delete Memory.pathing.weightedDistances[pos1Name];
            }
            else {
                for (let pos2Name in Memory.pathing.weightedDistances[pos1Name]) {
                    if (Math.random() < weightedDistanceCleanProbability) {
                        delete Memory.pathing.weightedDistances[pos1Name][pos2Name];
                    }
                }
            }
        }
    }
    static clean() {
        // Clean the memory of non-existent objects every tick
        this.cleanCreeps();
        this.cleanFlags();
        this.cleanColonies();
        this.cleanPathingMemory();
        this.cleanConstructionSites();
        Stats.clean();
    }
    static backwardsCompatibility() {
    }
};
Mem = Mem_1 = __decorate([
    profile
], Mem);
var Mem_1;

var asciiLogo = ['___________________________________________________________',
    '',
    ' _____  _    _ _______  ______ _______ _____ __   _ ______ ',
    '|     |  \\  /  |______ |_____/ |  |  |   |   | \\  | |     \\',
    '|_____|   \\/   |______ |    \\_ |  |  | __|__ |  \\_| |_____/',
    '',
    '_______________________ Screeps AI ________________________'];
var asciiLogoSmall = [' _____  _    _ _______  ______ _______ _____ __   _ ______ ',
    '|     |  \\  /  |______ |_____/ |  |  |   |   | \\  | |     \\',
    '|_____|   \\/   |______ |    \\_ |  |  | __|__ |  \\_| |_____/'];

// Command line
class OvermindConsole {
    static init() {
        global.help = this.help();
        global.setSignature = this.setSignature;
        global.print = this.print;
        global.setLogLevel = log.setLogLevel;
        global.openRoomPlanner = this.openRoomPlanner;
        global.closeRoomPlanner = this.closeRoomPlanner;
        global.cancelRoomPlanner = this.cancelRoomPlanner;
        global.listActiveRoomPlanners = this.listActiveRoomPlanners;
        global.destroyAllHostileStructures = this.destroyAllHostlileStructures;
        global.destroyAllBarriers = this.destroyAllBarriers;
        global.listAllDirectives = this.listAllDirectives;
        global.listPersistentDirectives = this.listPersistentDirectives;
        global.removeAllLogisticsDirectives = this.removeAllLogisticsDirectives;
        global.deepCleanMemory = this.deepCleanMemory;
    }
    static help() {
        let msg = '\n<font color="#ff00ff">';
        for (let line of asciiLogoSmall) {
            msg += line + '\n';
        }
        msg += '</font>';
        let descr = {};
        descr['help'] = 'show this message';
        descr['setSignature(newSignature)'] = 'set your controller signature';
        descr['print(...args[])'] = 'log stringified objects to the console';
        descr['setLogLevel(int)'] = 'set the logging level from 0 - 4';
        descr['openRoomPlanner(roomName)'] = 'open the room planner for a room';
        descr['closeRoomPlanner(roomName)'] = 'close the room planner and save changes';
        descr['cancelRoomPlanner(roomName)'] = 'close the room planner and discard changes';
        descr['listActiveRoomPlanners()'] = 'display a list of colonies with open room planners';
        descr['destroyAllHostileStructures(roomName)'] = 'destroys all hostile structures in an owned room';
        descr['destroyAllBarriers(roomName)'] = 'destroys all ramparts and barriers in a room';
        descr['listAllDirectives()'] = 'print type, name, pos of every directive';
        descr['listPersistentDirectives()'] = 'print type, name, pos of every persistent directive';
        descr['deepCleanMemory()'] = 'deletes all non-critical portions of memory (be careful!)';
        // Console list
        let descrMsg = toColumns(descr, { justify: true, padChar: '.' });
        let maxLineLength = _.max(_.map(descrMsg, line => line.length)) + 2;
        msg += 'Console Commands: '.padRight(maxLineLength, '=') + '\n' + descrMsg.join('\n');
        msg += '\n\nRefer to the repository for more information\n';
        return msg;
    }
    static setSignature(signature) {
        if (signature.toLowerCase().includes('overmind')) {
            Memory.signature = signature;
            return `Controller signature set to ${signature}`;
        }
        else {
            throw new Error(`Invalid signature: ${signature}; must contain the string "Overmind"`);
        }
    }
    static print(...args) {
        for (let arg of args) {
            console.log(JSON.stringify(arg, null, '\t'));
        }
    }
    static openRoomPlanner(roomName) {
        if (Overmind.colonies[roomName]) {
            if (Overmind.colonies[roomName].roomPlanner.active != true) {
                Overmind.colonies[roomName].roomPlanner.active = true;
                return '';
            }
            else {
                return `RoomPlanner for ${roomName} is already active!`;
            }
        }
        else {
            return `Error: ${roomName} is not a valid colony!`;
        }
    }
    static closeRoomPlanner(roomName) {
        if (Overmind.colonies[roomName]) {
            if (Overmind.colonies[roomName].roomPlanner.active == true) {
                Overmind.colonies[roomName].roomPlanner.finalize();
                return '';
            }
            else {
                return `RoomPlanner for ${roomName} is not active!`;
            }
        }
        else {
            return `Error: ${roomName} is not a valid colony!`;
        }
    }
    static cancelRoomPlanner(roomName) {
        if (Overmind.colonies[roomName]) {
            if (Overmind.colonies[roomName].roomPlanner.active == true) {
                Overmind.colonies[roomName].roomPlanner.active = false;
                return `RoomPlanner for ${roomName} has been deactivated without saving changes`;
            }
            else {
                return `RoomPlanner for ${roomName} is not active!`;
            }
        }
        else {
            return `Error: ${roomName} is not a valid colony!`;
        }
    }
    static listActiveRoomPlanners() {
        let coloniesWithActiveRoomPlanners = _.filter(_.map(_.keys(Overmind.colonies), colonyName => Overmind.colonies[colonyName]), (colony) => colony.roomPlanner.active);
        let names = _.map(coloniesWithActiveRoomPlanners, colony => colony.room.print);
        if (names.length > 0) {
            console.log('Colonies with active room planners: ' + names);
            return '';
        }
        else {
            return `No colonies with active room planners`;
        }
    }
    static listAllDirectives() {
        let msg = '';
        for (let i in Game.directives) {
            let dir = Game.directives[i];
            msg += `Type: ${dir.directiveName}`.padRight(20) +
                `Name: ${dir.name}`.padRight(15) +
                `Pos: ${dir.pos.print}\n`;
        }
        return msg;
    }
    static removeAllLogisticsDirectives() {
        let logisticsFlags = _.filter(Game.flags, flag => flag.color == COLOR_YELLOW &&
            flag.secondaryColor == COLOR_YELLOW);
        for (let dir of logisticsFlags) {
            dir.remove();
        }
        return `Removed ${logisticsFlags.length} logistics directives.`;
    }
    static listPersistentDirectives() {
        let msg = '';
        for (let i in Game.directives) {
            let dir = Game.directives[i];
            if (dir.memory.persistent) {
                msg += `Type: ${dir.directiveName}`.padRight(20) +
                    `Name: ${dir.name}`.padRight(15) +
                    `Pos: ${dir.pos.print}\n`;
            }
        }
        return msg;
    }
    static destroyAllHostlileStructures(roomName) {
        let room = Game.rooms[roomName];
        if (!room)
            return `${roomName} is undefined! (No vision?)`;
        if (!room.my)
            return `${roomName} is not owned by you!`;
        let hostileStructures = room.find(FIND_HOSTILE_STRUCTURES);
        for (let structure of hostileStructures) {
            structure.destroy();
        }
        return `Destroyed ${hostileStructures.length} hostile structures.`;
    }
    static destroyAllBarriers(roomName) {
        let room = Game.rooms[roomName];
        if (!room)
            return `${roomName} is undefined! (No vision?)`;
        if (!room.my)
            return `${roomName} is not owned by you!`;
        for (let barrier of room.barriers) {
            barrier.destroy();
        }
        return `Destroyed ${room.barriers.length} barriers.`;
    }
    static deepCleanMemory() {
        // Clean colony memory
        let protectedColonyKeys = ['defcon', 'roomPlanner', 'roadPlanner', 'barrierPlanner'];
        for (let colName in Memory.colonies) {
            for (let key in Memory.colonies[colName]) {
                if (!protectedColonyKeys.includes(key)) {
                    delete Memory.colonies[colName][key];
                }
            }
        }
        // Suicide any creeps which have no memory
        for (let i in Game.creeps) {
            if (Game.creeps[i].memory == {}) {
                Game.creeps[i].suicide();
            }
        }
        // Remove profiler memory
        delete Memory.profiler;
        // Remove overlords memory from flags
        for (let i in Memory.flags) {
            if (Memory.flags[i].overlords) {
                delete Memory.flags[i].overlords;
            }
        }
        // Clean creep memory
        for (let i in Memory.creeps) {
            // Remove all creep tasks to fix memory leak in 0.3.1
            if (Memory.creeps[i].task) {
                Memory.creeps[i].task = null;
            }
        }
        return `Memory has been cleaned.`;
    }
}

/* Generalized class for a base component */
class HiveCluster {
    constructor(colony, instantiationObject, name) {
        // Set up hatchery, register colony and memory
        this.colony = colony;
        this.room = instantiationObject.room;
        this.pos = instantiationObject.pos;
        this.componentName = name;
        this.name = name + '@' + instantiationObject.pos.name;
        this.colony.hiveClusters.push(this);
    }
    // Overwrite this to display relevant information
    visuals() {
    }
    ;
}

let Tasks = class Tasks {
    static attack(target, options = {}) {
        return new TaskAttack(target, options);
    }
    static build(target, options = {}) {
        return new TaskBuild(target, options);
    }
    static claim(target, options = {}) {
        return new TaskClaim(target, options);
    }
    static dismantle(target, options = {}) {
        return new TaskDismantle(target, options);
    }
    static drop(target, resourceType = RESOURCE_ENERGY, amount = undefined, options = {}) {
        return new TaskDrop(target, resourceType, amount, options);
    }
    static flee(target, options = {}) {
        return new TaskFlee(target, options);
    }
    static fortify(target, options = {}) {
        return new TaskFortify(target, options);
    }
    static getBoosted(target, boostType, amount = undefined, options = {}) {
        return new TaskGetBoosted(target, boostType, amount, options);
    }
    static getRenewed(target, options = {}) {
        return new TaskGetRenewed(target, options);
    }
    // static goTo(target: goToTargetType, options = {} as TaskOptions): TaskGoTo {
    // 	return new TaskGoTo(target, options);
    // }
    static goToRoom(target, options = {}) {
        return new TaskGoToRoom(target, options);
    }
    static harvest(target, options = {}) {
        return new TaskHarvest(target, options);
    }
    static heal(target, options = {}) {
        return new TaskHeal(target, options);
    }
    static meleeAttack(target, options = {}) {
        return new TaskMeleeAttack(target, options);
    }
    static pickup(target, options = {}) {
        return new TaskPickup(target, options);
    }
    static rangedAttack(target, options = {}) {
        return new TaskRangedAttack(target, options);
    }
    static repair(target, options = {}) {
        return new TaskRepair(target, options);
    }
    static reserve(target, options = {}) {
        return new TaskReserve(target, options);
    }
    static signController(target, options = {}) {
        return new TaskSignController(target, options);
    }
    static transfer(target, resourceType = RESOURCE_ENERGY, amount = undefined, options = {}) {
        return new TaskTransfer(target, resourceType, amount, options);
    }
    static transferAll(target, options = {}) {
        return new TaskTransferAll(target, options);
    }
    static upgrade(target, options = {}) {
        return new TaskUpgrade(target, options);
    }
    static withdraw(target, resourceType = RESOURCE_ENERGY, amount = undefined, options = {}) {
        return new TaskWithdraw(target, resourceType, amount, options);
    }
};
Tasks = __decorate([
    profile
], Tasks);

// Overseer: coordinates creep actions and spawn requests related to a common objective
let Overlord = class Overlord {
    constructor(initializer, name, priority) {
        // this.initMemory(initializer);
        this.name = name;
        this.room = initializer.room;
        this.priority = priority;
        this.ref = initializer.name + ':' + this.name;
        this.pos = initializer.pos;
        this.colony = initializer.colony;
        this.recalculateCreeps();
        this.creepUsageReport = _.mapValues(this._creeps, creep => undefined);
        // Register the overlord on the colony overseer and on the overmind
        this.colony.overseer.registerOverlord(this);
        this.boosts = _.mapValues(this._creeps, creep => undefined);
        Overmind.overlords[this.ref] = this;
    }
    /* Refreshes portions of the overlord state */
    rebuild() {
        this.recalculateCreeps();
        this.creepUsageReport = _.mapValues(this._creeps, creep => undefined);
    }
    recalculateCreeps() {
        this._creeps = _.mapValues(Overmind.cache.overlords[this.ref], creepsOfRole => _.map(creepsOfRole, creepName => Game.zerg[creepName]));
    }
    debug(creep, targetCreepName, ...args) {
        if (creep.name == targetCreepName) {
            console.log(JSON.stringify(args));
        }
    }
    /* Gets the "ID" of the outpost this overlord is operating in. 0 for owned rooms, >= 1 for outposts, -1 for other */
    get outpostIndex() {
        return _.findIndex(this.colony.roomNames, this.pos.roomName);
    }
    reassignIdleCreeps(role) {
        // Find all idle guards
        let idleCreeps = _.filter(this.colony.getCreepsByRole(role), (zerg) => !zerg.overlord);
        // Reassign them all to this flag
        for (let creep of idleCreeps) {
            creep.overlord = this;
        }
        this.recalculateCreeps();
    }
    creeps(role) {
        if (this._creeps[role]) {
            return this._creeps[role];
        }
        else {
            return [];
        }
    }
    allCreeps() {
        let allCreeps = [];
        for (let role of _.keys(this._creeps)) {
            allCreeps = allCreeps.concat(this._creeps[role]);
        }
        return _.compact(allCreeps);
    }
    creepReport(role, currentAmt, neededAmt) {
        this.creepUsageReport[role] = [currentAmt, neededAmt];
    }
    /* Generate (but not spawn) the largest creep possible, returns the protoCreep as an object */
    generateProtoCreep(setup) {
        // Generate the creep body
        let creepBody;
        if (this.colony.incubator) { // if you're being incubated, build as big a creep as you want
            creepBody = setup.generateBody(this.colony.incubator.room.energyCapacityAvailable);
        }
        else { // otherwise limit yourself to actual energy constraints
            creepBody = setup.generateBody(this.colony.room.energyCapacityAvailable);
        }
        // Generate the creep memory
        let creepMemory = {
            colony: this.colony.name,
            overlord: this.ref,
            role: setup.role,
            task: null,
            data: {
                origin: '',
            },
            _trav: null,
        };
        // Create the protocreep and return it
        let protoCreep = {
            body: creepBody,
            name: setup.role,
            memory: creepMemory,
        };
        return protoCreep;
    }
    // TODO: include creep move speed
    lifetimeFilter(creeps, prespawn = 50) {
        let spawnDistance = 0;
        // TODO: account for creeps that can be spawned at incubatee's hatchery
        if (this.colony.incubator) {
            spawnDistance = Pathing.distance(this.pos, this.colony.incubator.hatchery.pos) || 0;
        }
        else if (this.colony.hatchery) {
            // Use distance or 0 (in case distance returns something undefined due to incomplete pathfinding)
            spawnDistance = Pathing.distance(this.pos, this.colony.hatchery.pos) || 0;
        }
        // The last condition fixes a bug only present on private servers that took me a fucking week to isolate.
        // At the tick of birth, creep.spawning = false and creep.ticksTolive = undefined
        // See: https://screeps.com/forum/topic/443/creep-spawning-is-not-updated-correctly-after-spawn-process
        return _.filter(creeps, creep => creep.ticksToLive > 3 * creep.body.length + spawnDistance + prespawn ||
            creep.spawning || (!creep.spawning && !creep.ticksToLive));
    }
    parkCreepsIfIdle(creeps, outsideHatchery = true) {
        for (let creep of creeps) {
            if (!creep) {
                console.log(`creeps: ${_.map(creeps, creep => creep.name)}`);
                continue;
            }
            if (creep.isIdle && creep.canExecute('move')) {
                if (this.colony.hatchery) {
                    let hatcheryRestrictedRange = 6;
                    if (creep.pos.getRangeTo(this.colony.hatchery.pos) < hatcheryRestrictedRange) {
                        let hatcheryBorder = this.colony.hatchery.pos.getPositionsAtRange(hatcheryRestrictedRange);
                        let moveToPos = creep.pos.findClosestByRange(hatcheryBorder);
                        creep.travelTo(moveToPos);
                    }
                    else {
                        creep.park();
                    }
                }
                else {
                    creep.park();
                }
            }
        }
    }
    /* Create a creep setup and enqueue it to the Hatchery; does not include automatic reporting */
    requestCreep(setup, prespawn = 50, priority = this.priority) {
        if (this.colony.hatchery) {
            this.colony.hatchery.enqueue(this.generateProtoCreep(setup), priority);
        }
    }
    /* Wishlist of creeps to simplify spawning logic; includes automatic reporting */
    wishlist(quantity, setup, prespawn = 50, priority = this.priority) {
        let creepQuantity = this.lifetimeFilter(this.creeps(setup.role)).length;
        if (creepQuantity < quantity && this.colony.hatchery) {
            this.colony.hatchery.enqueue(this.generateProtoCreep(setup), priority);
        }
        this.creepReport(setup.role, creepQuantity, quantity);
    }
    shouldBoost(creep) {
        if (!this.colony.evolutionChamber ||
            (creep.ticksToLive && creep.ticksToLive < MIN_LIFETIME_FOR_BOOST * creep.lifetime)) {
            return false;
        }
        if (this.boosts[creep.roleName]) {
            let boosts = _.filter(this.boosts[creep.roleName], boost => (creep.boostCounts[boost] || 0)
                < creep.getActiveBodyparts(boostParts[boost]));
            if (boosts.length > 0) {
                return _.all(boosts, boost => this.colony.evolutionChamber.canBoost(creep, boost));
            }
        }
        return false;
    }
    /* Request a boost from the evolution chamber; should be called during init() */
    requestBoostsForCreep(creep) {
        if (this.colony.evolutionChamber && this.boosts[creep.roleName]) {
            let boost = _.find(this.boosts[creep.roleName], boost => (creep.boostCounts[boost] || 0) < creep.getActiveBodyparts(boostParts[boost]));
            if (boost) {
                this.colony.evolutionChamber.requestBoost(boost, creep);
            }
        }
    }
    /* Handle boosting of a creep; should be called during run() */
    handleBoosting(creep) {
        if (this.colony.evolutionChamber && this.boosts[creep.roleName]) {
            let boost = _.find(this.boosts[creep.roleName], boost => (creep.boostCounts[boost] || 0) < creep.getActiveBodyparts(boostParts[boost]));
            if (boost) {
                if (this.colony.evolutionChamber.queuePosition(creep) == 0) {
                    log.info(`${this.colony.room.print}: boosting ${creep.name}@${creep.pos.print} with ${boost}!`);
                    creep.task = Tasks.getBoosted(this.colony.evolutionChamber.boostingLab, boost);
                }
                else {
                    // Approach the lab but don't attempt to get boosted
                    if (creep.pos.getRangeTo(this.colony.evolutionChamber.boostingLab) > 2) {
                        creep.travelTo(this.colony.evolutionChamber.boostingLab, { range: 2 });
                    }
                    else {
                        creep.park();
                    }
                }
            }
        }
    }
    /* Request any needed boosts from terminal network; should be called during init() */
    requestBoosts() {
        for (let creep of this.allCreeps()) {
            if (this.shouldBoost(creep)) {
                this.requestBoostsForCreep(creep);
            }
        }
    }
    visuals() {
    }
};
Overlord = __decorate([
    profile
], Overlord);

// Default ordering for processing spawning requests and prioritizing overlords
var OverlordPriority = {
    emergency: {
        bootstrap: 0
    },
    spawning: {
        hatchery: 100,
        commandCenter: 101,
    },
    defense: {
        meleeDefense: 200,
        rangedDefense: 201,
        guard: 202,
    },
    realTime: {
        claim: 300,
        pioneer: 301,
    },
    ownedRoom: {
        firstTransport: 400,
        mine: 401,
        work: 402,
        mineral: 403,
        transport: 404,
    },
    offense: {
        destroy: 500,
        healPoint: 501,
        siege: 502,
    },
    upgrading: {
        upgrade: 600,
    },
    collectionUrgent: {
        haul: 700
    },
    remoteRoom: {
        reserve: 800,
        mine: 801,
        roomIncrement: 5,
    },
    collection: {
        haul: 900
    },
};

/* Return the cost of an entire array of body parts */
function bodyCost(bodyparts) {
    return _.sum(_.map(bodyparts, part => BODYPART_COST[part]));
}
let CreepSetup = class CreepSetup {
    constructor(roleName, bodySetup = {}) {
        this.role = roleName;
        // Defaults for a creep setup
        _.defaults(bodySetup, {
            pattern: [],
            sizeLimit: Infinity,
            prefix: [],
            suffix: [],
            proportionalPrefixSuffix: false,
            ordered: true,
        });
        this.bodySetup = bodySetup;
    }
    /* Generate the largest body of a given pattern that is producable from a room,
     * subject to limitations from maxRepeats */
    generateBody(availableEnergy) {
        let patternCost, patternLength, numRepeats;
        let prefix = this.bodySetup.prefix;
        let suffix = this.bodySetup.suffix;
        let body = [];
        // calculate repetitions
        if (this.bodySetup.proportionalPrefixSuffix) { // if prefix and suffix are to be kept proportional to body size
            patternCost = bodyCost(prefix) + bodyCost(this.bodySetup.pattern) + bodyCost(suffix);
            patternLength = prefix.length + this.bodySetup.pattern.length + suffix.length;
            let energyLimit = Math.floor(availableEnergy / patternCost); // max number of repeats room can produce
            let maxPartLimit = Math.floor(MAX_CREEP_SIZE / patternLength); // max repetitions resulting in <50 parts
            numRepeats = Math.min(energyLimit, maxPartLimit, this.bodySetup.sizeLimit);
        }
        else { // if prefix and suffix don't scale
            let extraCost = bodyCost(prefix) + bodyCost(suffix);
            patternCost = bodyCost(this.bodySetup.pattern);
            patternLength = this.bodySetup.pattern.length;
            let energyLimit = Math.floor((availableEnergy - extraCost) / patternCost);
            let maxPartLimit = Math.floor((MAX_CREEP_SIZE - prefix.length - suffix.length) / patternLength);
            numRepeats = Math.min(energyLimit, maxPartLimit, this.bodySetup.sizeLimit);
        }
        // build the body
        if (this.bodySetup.proportionalPrefixSuffix) { // add the prefix
            for (let i = 0; i < numRepeats; i++) {
                body = body.concat(prefix);
            }
        }
        else {
            body = body.concat(prefix);
        }
        if (this.bodySetup.ordered) { // repeated body pattern
            for (let part of this.bodySetup.pattern) {
                for (let i = 0; i < numRepeats; i++) {
                    body.push(part);
                }
            }
        }
        else {
            for (let i = 0; i < numRepeats; i++) {
                body = body.concat(this.bodySetup.pattern);
            }
        }
        if (this.bodySetup.proportionalPrefixSuffix) { // add the suffix
            for (let i = 0; i < numRepeats; i++) {
                body = body.concat(suffix);
            }
        }
        else {
            body = body.concat(suffix);
        }
        // return it
        return body;
    }
    getBodyPotential(partType, colony) {
        let body = this.generateBody(colony.room.energyCapacityAvailable);
        return _.filter(body, (part) => part == partType).length;
    }
};
CreepSetup = __decorate([
    profile
], CreepSetup);

const MinerSetup = new CreepSetup('drone', {
    pattern: [WORK, WORK, CARRY, MOVE],
    sizeLimit: 3,
});
const MinerLongDistanceSetup = new CreepSetup('drone', {
    pattern: [WORK, WORK, CARRY, MOVE, MOVE, MOVE],
    sizeLimit: 3,
});
let MiningOverlord = class MiningOverlord extends Overlord {
    constructor(miningSite, priority, allowDropMining = false) {
        super(miningSite, 'mine', priority);
        this.priority += this.outpostIndex * OverlordPriority.remoteRoom.roomIncrement;
        this.miners = this.creeps(MinerSetup.role);
        this.miningSite = miningSite;
        this.allowDropMining = allowDropMining;
    }
    init() {
        let creepSetup = MinerSetup;
        if (this.colony.hatchery && Pathing.distance(this.colony.hatchery.pos, this.pos) > 50 * 3) {
            creepSetup = MinerLongDistanceSetup; // long distance miners
            // todo: this.colony.hatchery is normal hatcher for incubating once spawns[0] != undefined
        }
        let filteredMiners = this.lifetimeFilter(this.miners);
        let miningPowerAssigned = _.sum(_.map(filteredMiners, creep => creep.getActiveBodyparts(WORK)));
        if (miningPowerAssigned < this.miningSite.miningPowerNeeded &&
            filteredMiners.length < _.filter(this.miningSite.pos.neighbors, pos => pos.isPassible()).length) {
            // Handles edge case at startup of <3 spots near mining site
            this.requestCreep(creepSetup);
        }
        this.creepReport(creepSetup.role, miningPowerAssigned, this.miningSite.miningPowerNeeded);
    }
    handleMiner(miner) {
        // Ensure you are in the assigned room
        if (miner.room == this.room && !miner.pos.isEdge) {
            // Harvest if out of energy
            if (miner.carry.energy == 0) {
                miner.task = Tasks.harvest(this.miningSite.source);
            }
            // Else see if there is an output to depsit to or to maintain
            else if (this.miningSite.output) {
                if (this.miningSite.output.hits < this.miningSite.output.hitsMax) {
                    miner.task = Tasks.repair(this.miningSite.output);
                }
                else {
                    miner.task = Tasks.transfer(this.miningSite.output);
                }
                // Move onto the output container if you're the only miner
                if (!miner.pos.isEqualTo(this.miningSite.output.pos) && this.miners.length == 1 &&
                    this.miningSite.output instanceof StructureContainer) {
                    miner.travelTo(this.miningSite.output, { range: 0 });
                }
            }
            // Else build the output if there is a constructionSite (placement handled by miningSite)
            else {
                if (this.miningSite.outputConstructionSite) {
                    miner.task = Tasks.build(this.miningSite.outputConstructionSite);
                    if (miner.pos.isEqualTo(this.miningSite.outputConstructionSite.pos)) {
                        // Move off of the contructionSite (link sites won't build)
                        miner.travelTo(this.colony.controller);
                    }
                }
                else if (this.allowDropMining) {
                    // Dropmining at early levels
                    let nearbyDrops = miner.pos.findInRange(this.room.droppedEnergy, 1);
                    let dropPos = nearbyDrops.length > 0 ? _.first(nearbyDrops).pos : miner.pos;
                    miner.task = Tasks.drop(dropPos);
                }
            }
        }
        else {
            // miner.task = Tasks.goTo(this.miningSite);
            miner.travelTo(this.miningSite);
        }
    }
    fleeResponse(miner) {
        if (miner.room == this.colony.room) {
            // If there is a large invasion happening in the colony room, flee
            if (this.colony.defcon > DEFCON.invasionNPC) {
                miner.task = Tasks.flee(this.colony.controller);
            }
        }
        else {
            // If there are baddies in the room, flee
            if (miner.room.dangerousHostiles.length > 0) {
                miner.task = Tasks.flee(this.colony.controller);
            }
        }
    }
    run() {
        for (let miner of this.miners) {
            if (miner.isIdle) {
                this.handleMiner(miner);
            }
            // this.fleeResponse(miner);
            miner.run();
        }
    }
};
MiningOverlord = __decorate([
    profile
], MiningOverlord);

let Visualizer = class Visualizer {
    static get enabled() {
        return Memory.settings.enableVisuals;
    }
    static circle(pos, color = 'red', opts = {}) {
        _.defaults(opts, {
            fill: color,
            radius: 0.35,
            opacity: 0.5,
        });
        return new RoomVisual(pos.roomName).circle(pos.x, pos.y, opts);
    }
    static marker(pos, opts = {}) {
        return new RoomVisual(pos.roomName).animatedPosition(pos.x, pos.y, opts);
    }
    static drawLayout(structureMap) {
        if (!this.enabled)
            return;
        let vis = {};
        for (let structureType in structureMap) {
            for (let pos of structureMap[structureType]) {
                if (!vis[pos.roomName]) {
                    vis[pos.roomName] = new RoomVisual(pos.roomName);
                }
                vis[pos.roomName].structure(pos.x, pos.y, structureType);
            }
        }
        for (let roomName in vis) {
            vis[roomName].connectRoads();
        }
    }
    static drawRoads(positoins) {
        let pointsByRoom = _.groupBy(positoins, pos => pos.roomName);
        for (let roomName in pointsByRoom) {
            let vis = new RoomVisual(roomName);
            for (let pos of pointsByRoom[roomName]) {
                vis.structure(pos.x, pos.y, STRUCTURE_ROAD);
            }
            vis.connectRoads();
        }
    }
    static drawPath(path, style) {
        let pointsByRoom = _.groupBy(path, pos => pos.roomName);
        for (let roomName in pointsByRoom) {
            new RoomVisual(roomName).poly(pointsByRoom[roomName], style);
        }
    }
    static showInfo(info, calledFrom, opts = {}) {
        if (calledFrom.room) {
            return calledFrom.room.visual.infoBox(info, calledFrom.pos.x, calledFrom.pos.y, opts);
        }
        else {
            return new RoomVisual(calledFrom.pos.roomName).infoBox(info, calledFrom.pos.x, calledFrom.pos.y, opts);
        }
    }
    static text(text, pos, style = {}) {
        _.defaults(style, {
            font: '0.7 verdana',
        });
        new RoomVisual(pos.roomName).text(text, pos, style);
    }
    static drawHUD() {
        // Draw Overmind logo
        new RoomVisual().multitext(asciiLogo, 0, 0, { textfont: 'monospace' });
        // // Display CPU Information
        // new RoomVisual().text('CPU:' + ' bucket:' + Game.cpu.bucket +
        // 					  ' tickLimit:' + Game.cpu.tickLimit, column, row, style);
    }
    static colonyReport(colonyName, text) {
        new RoomVisual(colonyName).multitext(text, 0, 4, { textfont: 'monospace', textsize: 0.75 });
    }
    static visuals() {
        this.drawHUD();
    }
};
Visualizer = __decorate([
    profile
], Visualizer);

/* Generate stable matching between string-indexed bipartite groups with possibly unequal numbers using Gale-Shapley */
let Matcher = class Matcher {
    constructor(menPrefs, womenPrefs) {
        this.menPrefs = menPrefs;
        this.womenPrefs = womenPrefs;
        this.men = _.keys(menPrefs);
        this.women = _.keys(womenPrefs);
        this.menFree = _.zipObject(this.men, _.map(this.men, man => true));
        this.womenFree = _.zipObject(this.women, _.map(this.women, woman => true));
        this.couples = {};
    }
    /* Return whether the woman prefer man1 over man2 */
    prefers(woman, man1, man2) {
        return _.indexOf(this.womenPrefs[woman], man1) < _.indexOf(this.womenPrefs[woman], man2);
    }
    /* Engage a couple <3 */
    engage(man, woman) {
        this.menFree[man] = false;
        this.womenFree[woman] = false;
        _.remove(this.menPrefs[man], w => w == woman); // Remove the woman that the man proposed to
        // Don't remove from women prefs since we're matching from men side
        this.couples[man] = woman;
    }
    /* Break up a couple... </3 :'( */
    breakup(man, woman) {
        this.menFree[man] = true;
        this.womenFree[woman] = true;
        // Don't do anything to the preferences of men or women since they've already proposed
        delete this.couples[man];
    }
    /* Return the first free man who still has someone left to propose to */
    nextMan() {
        return _.find(this.men, man => this.menFree[man] && this.menPrefs[man].length > 0);
    }
    match() {
        let MAX_ITERATIONS = 1000;
        let count = 0;
        let man = this.nextMan();
        while (man) { // While there exists a free man who still has someone to propose to
            if (count > MAX_ITERATIONS) {
                console.log('Stable matching timed out!');
                return this.couples;
            }
            let woman = _.first(this.menPrefs[man]); // Get first woman on man's list
            if (this.womenFree[woman]) { // If woman is free, get engaged
                this.engage(man, woman);
            }
            else { // Else if woman prefers this man to her current, swap men
                let currentMan = _.findKey(this.couples, w => w == woman);
                if (this.prefers(woman, man, currentMan)) {
                    this.breakup(currentMan, woman);
                    this.engage(man, woman);
                }
                else {
                    _.remove(this.menPrefs[man], w => w == woman); // Record an unsuccessful proposal
                }
            }
            man = this.nextMan();
            count++;
        }
        return this.couples;
    }
};
Matcher = __decorate([
    profile
], Matcher);

let DirectiveLogisticsRequest = class DirectiveLogisticsRequest extends Directive {
    constructor(flag) {
        super(flag);
        this.ref = flag.name;
    }
    get targetedBy() {
        return Overmind.cache.targets[this.ref];
    }
    get drops() {
        if (!this.pos.isVisible) {
            return {};
        }
        if (!this._drops) {
            let drops = (this.pos.lookFor(LOOK_RESOURCES) || []);
            this._drops = _.groupBy(drops, drop => drop.resourceType);
        }
        return this._drops;
    }
    get provider() {
        if (this.memory.provider === undefined) { // strict comparison; this can be true or false or undefined
            if (!this.pos.isVisible) { // assume this is a provider flag if you don't have vision
                this.memory.provider = true;
            }
            else { // is provider if there is some resource already there
                this.memory.provider = (_.sum(this.store) > 0);
            }
        }
        return this.memory.provider;
    }
    // get store(): StoreDefinition {
    // 	if (!this._store) {
    // 		let store = _.mapValues(this.drops, drops => _.sum(_.map(drops, drop => drop.amount)));
    // 		if (!store.energy) store.energy = 0;
    // 		this._store = store as StoreDefinition;
    // 	}
    // 	return this._store;
    // }
    get hasDrops() {
        return _.keys(this.drops).length > 0;
    }
    get storeStructure() {
        if (this.pos.isVisible) {
            let container = this.pos.lookForStructure(STRUCTURE_CONTAINER);
            let tombstone = this.pos.lookFor(LOOK_TOMBSTONES)[0];
            return container || tombstone;
        }
        return undefined;
    }
    /* Recalculates the state of the store; assumes you have vision of the room */
    calculateStore() {
        // Merge the "storage" of drops with the store of structure
        let store = {};
        if (this.storeStructure) {
            store = this.storeStructure.store;
        }
        else {
            store = { 'energy': 0 };
        }
        // Merge with drops
        for (let resourceType of _.keys(this.drops)) {
            let totalResourceAmount = _.sum(this.drops[resourceType], drop => drop.amount);
            if (store[resourceType]) {
                store[resourceType] += totalResourceAmount;
            }
            else {
                store[resourceType] = totalResourceAmount;
            }
        }
        return store;
    }
    get store() {
        if (!this._store) {
            if (this.pos.isVisible) {
                this._store = this.calculateStore();
            }
            else if (this.memory.store) {
                this._store = this.memory.store;
            }
            else {
                this._store = { 'energy': 500 }; // Assume a default amount of energy to get stable matching to care
            }
        }
        return this._store;
    }
    /* If being used as a drop-requestor, max amount of resources to drop at location */
    get storeCapacity() {
        if (this.memory.storeCapacity) {
            return this.memory.storeCapacity;
        }
        else {
            return 999;
        }
    }
    init() {
        if (this.pos.isVisible) {
            // Refresh the state of the store in flag memory
            this.memory.store = this.store;
        }
        if (this.provider) {
            this.colony.logisticsNetwork.requestOutputAll(this);
        }
        else {
            this.colony.logisticsNetwork.requestInput(this);
        }
    }
    run() {
        // Remove flag if you are a provider and out of resources
        if (this.provider && _.sum(this.store) == 0) {
            this.remove();
        }
    }
};
DirectiveLogisticsRequest.directiveName = 'logisticsRequest';
DirectiveLogisticsRequest.color = COLOR_YELLOW;
DirectiveLogisticsRequest.secondaryColor = COLOR_YELLOW;
DirectiveLogisticsRequest = __decorate([
    profile
], DirectiveLogisticsRequest);

const TransporterSetup = new CreepSetup('transport', {
    pattern: [CARRY, CARRY, MOVE],
    sizeLimit: Infinity,
});
const TransporterEarlySetup = new CreepSetup('transport', {
    pattern: [CARRY, MOVE],
    sizeLimit: Infinity,
});
let TransportOverlord = class TransportOverlord extends Overlord {
    constructor(colony, priority = colony.getCreepsByRole(TransporterSetup.role).length > 0 ?
        OverlordPriority.ownedRoom.transport : OverlordPriority.ownedRoom.firstTransport) {
        super(colony, 'logistics', priority);
        this.transporters = this.creeps(TransporterSetup.role);
        this.logisticsGroup = colony.logisticsNetwork;
    }
    neededTransportPower() {
        let transportPower = 0;
        let scaling = this.colony.stage == ColonyStage.Larva ? 1.5 : 1.75; // aggregate round-trip multiplier
        // Add contributions to transport power from hauling energy from mining sites
        let dropoffLocation;
        if (this.colony.commandCenter) {
            dropoffLocation = this.colony.commandCenter.pos;
        }
        else if (this.colony.hatchery && this.colony.hatchery.battery) {
            dropoffLocation = this.colony.hatchery.battery.pos;
        }
        else {
            return 0;
        }
        for (let siteID in this.colony.miningSites) {
            let site = this.colony.miningSites[siteID];
            if (site.overlord.miners.length > 0) {
                // Only count sites which have a container output and which have at least one miner present
                // (this helps in difficult "rebooting" situations)
                if (site.output && site.output instanceof StructureContainer) {
                    transportPower += site.energyPerTick * (scaling * Pathing.distance(site.pos, dropoffLocation));
                }
                else if (site.shouldDropMine) {
                    transportPower += .75 * site.energyPerTick * (scaling * Pathing.distance(site.pos, dropoffLocation));
                }
            }
        }
        if (this.colony.lowPowerMode) {
            // Reduce needed transporters when colony is in low power mode
            transportPower *= 0.5;
        }
        // Add transport power needed to move to upgradeSite
        transportPower += this.colony.upgradeSite.upgradePowerNeeded * scaling *
            Pathing.distance(dropoffLocation, (this.colony.upgradeSite.battery ||
                this.colony.upgradeSite).pos);
        return transportPower / CARRY_CAPACITY;
    }
    init() {
        let setup = this.colony.stage == ColonyStage.Larva ? TransporterEarlySetup : TransporterSetup;
        let transportPower = _.sum(_.map(this.lifetimeFilter(this.transporters), creep => creep.getActiveBodyparts(CARRY)));
        let neededTransportPower = this.neededTransportPower();
        if (transportPower < neededTransportPower) {
            this.requestCreep(setup);
        }
        this.creepReport(setup.role, transportPower, neededTransportPower);
    }
    handleTransporter(transporter, request) {
        if (request) {
            let choices = this.logisticsGroup.bufferChoices(transporter, request);
            let bestChoice = _.last(_.sortBy(choices, choice => request.multiplier * choice.dQ
                / Math.max(choice.dt, 0.1)));
            let task = null;
            let amount = this.logisticsGroup.predictedRequestAmount(transporter, request);
            if (amount > 0) { // target needs refilling
                if (request.target instanceof DirectiveLogisticsRequest) {
                    task = Tasks.drop(request.target);
                }
                else {
                    task = Tasks.transfer(request.target, request.resourceType);
                }
                if (bestChoice.targetRef != request.target.ref) {
                    // If we need to go to a buffer first to get more stuff
                    let buffer = deref(bestChoice.targetRef);
                    let withdrawAmount = Math.min(buffer.store[request.resourceType] || 0, transporter.carryCapacity - _.sum(transporter.carry), amount);
                    task = task.fork(Tasks.withdraw(buffer, request.resourceType, withdrawAmount));
                    if (transporter.hasMineralsInCarry && request.resourceType == RESOURCE_ENERGY) {
                        task = task.fork(Tasks.transferAll(buffer));
                    }
                }
            }
            else if (amount < 0) { // target needs withdrawal
                if (request.target instanceof DirectiveLogisticsRequest) {
                    let drops = request.target.drops[request.resourceType] || [];
                    let resource = drops[0];
                    if (resource) {
                        task = Tasks.pickup(resource);
                    }
                }
                else {
                    task = Tasks.withdraw(request.target, request.resourceType);
                }
                if (task && bestChoice.targetRef != request.target.ref) {
                    // If we need to go to a buffer first to deposit stuff
                    let buffer = deref(bestChoice.targetRef);
                    //task = task.fork(Tasks.transfer(buffer, request.resourceType));
                    task = task.fork(Tasks.transferAll(buffer));
                }
            }
            else {
                // console.log(`${transporter.name} chooses a store with 0 amount!`);
                transporter.park();
            }
            // Assign the task to the transporter
            transporter.task = task;
        }
        else {
            // If nothing to do, put everything in a store structure
            if (_.sum(transporter.carry) > 0) {
                let dropoffPoints = _.compact([this.colony.storage,
                    ...this.colony.dropoffLinks]);
                // let bestDropoffPoint = minBy(dropoffPoints, function(dropoff: StructureLink | StructureStorage) {
                // 	let range = transporter.pos.getMultiRoomRangeTo(dropoff.pos);
                // 	if (dropoff instanceof StructureLink) {
                // 		return Math.max(range, this.colony.linkNetwork.getDropoffAvailability(dropoff));
                // 	} else {
                // 		return range;
                // 	}
                // });
                let nonzeroResources = _.filter(_.keys(transporter.carry), (key) => (transporter.carry[key] || 0) > 0);
                if (nonzeroResources.length > 1) {
                    if (this.colony.storage) {
                        transporter.task = Tasks.transferAll(this.colony.storage);
                    }
                }
                else {
                    let bestDropoffPoint = transporter.pos.findClosestByMultiRoomRange(dropoffPoints);
                    if (bestDropoffPoint)
                        transporter.task = Tasks.transfer(bestDropoffPoint);
                }
            }
            else {
                let parkingSpot = transporter.pos;
                if (this.colony.storage) {
                    parkingSpot = this.colony.storage.pos;
                }
                else if (this.colony.roomPlanner.storagePos) {
                    parkingSpot = this.colony.roomPlanner.storagePos;
                }
                transporter.park(parkingSpot);
            }
        }
        //console.log(JSON.stringify(transporter.memory.task));
    }
    handleBigTransporter(bigTransporter) {
        let bestRequestViaStableMatching = this.logisticsGroup.matching[bigTransporter.name];
        this.handleTransporter(bigTransporter, bestRequestViaStableMatching);
    }
    /* Handles small transporters, which don't do well with the logisticsNetwork's stable matching system */
    handleSmolTransporter(smolTransporter) {
        // Just perform a single-sided greedy selection of all requests
        let bestRequestViaGreedy = _.first(this.logisticsGroup.transporterPreferences(smolTransporter));
        this.handleTransporter(smolTransporter, bestRequestViaGreedy);
    }
    run() {
        for (let transporter of this.transporters) {
            if (transporter.isIdle) {
                // if (transporter.carryCapacity >= LogisticsNetwork.settings.carryThreshold) {
                // 	this.handleBigTransporter(transporter);
                // } else {
                // 	this.handleSmolTransporter(transporter);
                // }
                this.handleSmolTransporter(transporter);
            }
            transporter.run();
        }
        // this.parkCreepsIfIdle(this.transporters);
    }
};
TransportOverlord = __decorate([
    profile
], TransportOverlord);

// Logistics Group: efficiently partners resource requests with transporters using a stable matching algorithm to
// provide general-purpose resource transport. For a better explanation of how this system works, see my blog post:
// https://bencbartlett.wordpress.com/2018/03/28/screeps-4-hauling-is-np-hard/
let LogisticsNetwork = LogisticsNetwork_1 = class LogisticsNetwork {
    constructor(colony) {
        this.requests = [];
        this.targetToRequest = {};
        this.colony = colony;
        this.transporters = _.filter(colony.getCreepsByRole(TransporterSetup.role), creep => !creep.spawning &&
            creep.carryCapacity >= LogisticsNetwork_1.settings.carryThreshold);
        this.buffers = _.compact([colony.storage, colony.terminal]);
        this.cache = {
            nextAvailability: {},
            predictedTransporterCarry: {},
            resourceChangeRate: {}
        };
        this.logisticPositions = {};
        for (let room of this.colony.rooms) {
            this.logisticPositions[room.name] = _.map([...room.storageUnits, ...room.links], s => s.pos);
        }
    }
    get memory() {
        return Mem.wrap(this.colony.memory, 'logisticsNetwork', {
            transporterCache: {},
        });
    }
    // Request and provide functions ===================================================================================
    /* Request for resources to be deposited into this target */
    requestInput(target, opts = {}) {
        _.defaults(opts, {
            resourceType: RESOURCE_ENERGY,
            multiplier: 1,
            dAmountdt: 0,
        });
        if (target.room != this.colony.room) {
            log.warning(`${target.ref} at ${target.pos.print} is outside colony room; shouldn't request!`);
        }
        if (!opts.amount) {
            opts.amount = this.getInputAmount(target, opts.resourceType);
        }
        // Register the request
        let requestID = this.requests.length;
        let req = {
            id: requestID.toString(),
            target: target,
            amount: opts.amount,
            dAmountdt: opts.dAmountdt,
            resourceType: opts.resourceType,
            multiplier: opts.multiplier,
        };
        this.requests.push(req);
        this.targetToRequest[req.target.ref] = requestID;
    }
    /* Request for resources to be withdrawn from this target */
    requestOutput(target, opts = {}) {
        _.defaults(opts, {
            resourceType: RESOURCE_ENERGY,
            multiplier: 1,
            dAmountdt: 0,
        });
        if (!opts.amount) {
            opts.amount = this.getOutputAmount(target, opts.resourceType);
        }
        opts.amount *= -1;
        (opts.dAmountdt) *= -1;
        // Register the request
        let requestID = this.requests.length;
        let req = {
            id: requestID.toString(),
            target: target,
            amount: opts.amount,
            dAmountdt: opts.dAmountdt,
            resourceType: opts.resourceType,
            multiplier: opts.multiplier,
        };
        this.requests.push(req);
        this.targetToRequest[req.target.ref] = requestID;
    }
    /* Requests output for every resourceType in a requestor object */
    requestOutputAll(target, opts = {}) {
        for (let resourceType in target.store) {
            let amount = target.store[resourceType] || 0;
            if (amount > 0) {
                opts.resourceType = resourceType;
                this.requestOutput(target, opts);
            }
        }
    }
    /* Requests output for every mineral in a requestor object */
    requestOutputMinerals(target, opts = {}) {
        for (let resourceType in target.store) {
            if (resourceType == RESOURCE_ENERGY)
                continue;
            let amount = target.store[resourceType] || 0;
            if (amount > 0) {
                opts.resourceType = resourceType;
                this.requestOutput(target, opts);
            }
        }
    }
    getInputAmount(target, resourceType) {
        if (target instanceof DirectiveLogisticsRequest) {
            return target.storeCapacity - _.sum(target.store);
        }
        else if (isStoreStructure(target)) {
            return target.storeCapacity - _.sum(target.store);
        }
        else if (isEnergyStructure(target) && resourceType == RESOURCE_ENERGY) {
            return target.energyCapacity - target.energy;
        }
        // else if (target instanceof Zerg) {
        // 	return target.carryCapacity - _.sum(target.carry);
        // }
        else {
            if (target instanceof StructureLab) {
                if (resourceType == target.mineralType) {
                    return target.mineralCapacity - target.mineralAmount;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energyCapacity - target.energy;
                }
            }
            else if (target instanceof StructureNuker) {
                if (resourceType == RESOURCE_GHODIUM) {
                    return target.ghodiumCapacity - target.ghodium;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energyCapacity - target.energy;
                }
            }
            else if (target instanceof StructurePowerSpawn) {
                if (resourceType == RESOURCE_POWER) {
                    return target.powerCapacity - target.power;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energyCapacity - target.energy;
                }
            }
        }
        log.warning('Could not determine input amount!');
        return 0;
    }
    getOutputAmount(target, resourceType) {
        if (target instanceof DirectiveLogisticsRequest) {
            return target.store[resourceType];
        }
        else if (isStoreStructure(target)) {
            return target.store[resourceType];
        }
        else if (isEnergyStructure(target) && resourceType == RESOURCE_ENERGY) {
            return target.energy;
        }
        // else if (target instanceof Zerg) {
        // 	return target.carry[resourceType]!;
        // }
        else {
            if (target instanceof StructureLab) {
                if (resourceType == target.mineralType) {
                    return target.mineralAmount;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energy;
                }
            }
            else if (target instanceof StructureNuker) {
                if (resourceType == RESOURCE_GHODIUM) {
                    return target.ghodium;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energy;
                }
            }
            else if (target instanceof StructurePowerSpawn) {
                if (resourceType == RESOURCE_POWER) {
                    return target.power;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energy;
                }
            }
        }
        log.warning('Could not determine output amount!');
        return 0;
    }
    // Transporter availability and predictive functions ===============================================================
    // private cacheTransporterData(transporter: Zerg) {
    // 	if (transporter.task) {
    // 		let nextAvailability = this.computeNextAvailability(transporter);
    // 		let predictedTransporterCarry = this.computePredictedTransporterCarry(transporter, nextAvailability);
    // 		this.memory.transporterCache[transporter.name] = {
    // 			nextAvailability         : nextAvailability,
    // 			predictedTransporterCarry: predictedTransporterCarry,
    // 			tick                     : transporter.task.tick,
    // 		};
    // 	}
    // }
    computeNextAvailability(transporter) {
        if (transporter.task) {
            let approximateDistance = transporter.task.eta;
            let pos = transporter.pos;
            let targetPositions = transporter.task.targetPosManifest;
            // If there is a well-defined task ETA, use that as the first leg, else set dist to zero and use range
            if (approximateDistance) {
                for (let targetPos of targetPositions.slice(1)) {
                    // The path lengths between any two logistics targets should be well-memorized
                    approximateDistance += pos.getMultiRoomRangeTo(targetPos)
                        * LogisticsNetwork_1.settings.rangeToPathHeuristic;
                    // approximateDistance += Pathing.distance(pos, targetPos);
                    pos = targetPos;
                }
            }
            else {
                // This probably shouldn't happen...
                approximateDistance = 0;
                for (let targetPos of targetPositions) {
                    approximateDistance += pos.getMultiRoomRangeTo(targetPos)
                        * LogisticsNetwork_1.settings.rangeToPathHeuristic;
                    // approximateDistance += Pathing.distance(pos, targetPos);
                    pos = targetPos;
                }
            }
            return [approximateDistance, pos];
        }
        else {
            // Report the transporter as being near a logistics target so that Pathing.distance() won't waste CPU
            let nearbyLogisticPositions = transporter.pos.findInRange(this.logisticPositions[transporter.room.name], 2);
            return [0, nearbyLogisticPositions[0] || transporter.pos];
        }
    }
    /* Number of ticks until the transporter is available and where it will be */
    nextAvailability(transporter) {
        // if (transporter.task) {
        // 	// Recalculate the transporter data if it doesn't exist or if it is invalid
        // 	if (!this.memory.transporterCache[transporter.name] ||
        // 		transporter.task.tick != this.memory.transporterCache[transporter.name].tick) {
        // 		this.cacheTransporterData(transporter);
        // 	}
        // 	return this.memory.transporterCache[transporter.name].nextAvailability;
        // } else {
        // 	return [0, transporter.pos];
        // }
        if (!this.cache.nextAvailability[transporter.name]) {
            this.cache.nextAvailability[transporter.name] = this.computeNextAvailability(transporter);
        }
        return this.cache.nextAvailability[transporter.name];
    }
    static targetingTransporters(target, excludedTransporter) {
        let targetingZerg = _.map(target.targetedBy, name => Game.zerg[name]);
        let targetingTransporters = _.filter(targetingZerg, zerg => zerg.roleName == TransporterSetup.role);
        if (excludedTransporter)
            _.remove(targetingTransporters, transporter => transporter.name == excludedTransporter.name);
        return targetingTransporters;
    }
    /* Returns the predicted state of the transporter's carry after completing its current task */
    computePredictedTransporterCarry(transporter, nextAvailability) {
        if (transporter.task && transporter.task.target) {
            let requestID = this.targetToRequest[transporter.task.target.ref];
            if (requestID) {
                let request = this.requests[requestID];
                if (request) {
                    let carry = transporter.carry;
                    let remainingCapacity = transporter.carryCapacity - _.sum(carry);
                    let resourceAmount = -1 * this.predictedRequestAmount(transporter, request, nextAvailability);
                    // ^ need to multiply amount by -1 since transporter is doing complement of what request needs
                    if (carry[request.resourceType]) {
                        carry[request.resourceType] += resourceAmount;
                        carry[request.resourceType] = minMax(carry[request.resourceType], 0, remainingCapacity);
                    }
                    else {
                        carry[request.resourceType] = minMax(resourceAmount, 0, remainingCapacity);
                    }
                    return carry;
                }
            }
        }
        return transporter.carry;
    }
    /* Returns the predicted state of the transporter's carry after completing its task */
    predictedTransporterCarry(transporter) {
        // if (transporter.task) {
        // 	// Recalculate the transporter data if it doesn't exist or if it is invalid
        // 	if (!this.memory.transporterCache[transporter.name] ||
        // 		transporter.task.tick != this.memory.transporterCache[transporter.name].tick) {
        // 		this.cacheTransporterData(transporter);
        // 	}
        // 	return this.memory.transporterCache[transporter.name].predictedTransporterCarry;
        // } else {
        // 	return transporter.carry;
        // }
        if (!this.cache.predictedTransporterCarry[transporter.name]) {
            this.cache.predictedTransporterCarry[transporter.name] = this.computePredictedTransporterCarry(transporter);
        }
        return this.cache.predictedTransporterCarry[transporter.name];
    }
    /* Returns the effective amount that a transporter will see upon arrival, accounting for other targeting creeps */
    predictedRequestAmount(transporter, request, nextAvailability) {
        // Figure out when/where the transporter will be free
        let busyUntil;
        let newPos;
        if (!nextAvailability) {
            [busyUntil, newPos] = this.nextAvailability(transporter);
        }
        else {
            [busyUntil, newPos] = nextAvailability;
        }
        // let eta = busyUntil + Pathing.distance(newPos, request.target.pos);
        let eta = busyUntil + LogisticsNetwork_1.settings.rangeToPathHeuristic *
            newPos.getMultiRoomRangeTo(request.target.pos);
        let predictedDifference = request.dAmountdt * eta; // dAmountdt has same sign as amount
        // Account for other transporters targeting the target
        let otherTargetingTransporters = LogisticsNetwork_1.targetingTransporters(request.target, transporter);
        // let closerTargetingTransporters = _.filter(otherTargetingTransporters,
        // 										   transporter => this.nextAvailability(transporter)[0] < eta);
        if (request.amount > 0) { // requester state, energy in
            let resourceInflux = _.sum(_.map(otherTargetingTransporters, other => (other.carry[request.resourceType] || 0)));
            let predictedAmount = Math.max(request.amount + predictedDifference - resourceInflux, 0);
            if (isStoreStructure(request.target)) { // cap predicted amount at storeCapacity
                predictedAmount = Math.min(predictedAmount, request.target.storeCapacity);
            }
            return predictedAmount;
        }
        else { // output state, energy out
            let resourceOutflux = _.sum(_.map(otherTargetingTransporters, other => other.carryCapacity - _.sum(other.carry)));
            let predictedAmount = Math.min(request.amount + predictedDifference + resourceOutflux, 0);
            if (isStoreStructure(request.target)) { // cap predicted amount at -1 * storeCapacity
                predictedAmount = Math.max(predictedAmount, -1 * request.target.storeCapacity);
            }
            return predictedAmount;
        }
    }
    // Functions for computing resource change rate ====================================================================
    /* Consider all possibilities of buffer structures to visit on the way to fulfilling the request */
    bufferChoices(transporter, request) {
        let [ticksUntilFree, newPos] = this.nextAvailability(transporter);
        let choices = [];
        let amount = this.predictedRequestAmount(transporter, request, [ticksUntilFree, newPos]);
        let carry;
        if (!transporter.task || transporter.task.target != request.target) {
            // If you are not targeting the requestor, use predicted carry after completing current task
            carry = this.predictedTransporterCarry(transporter);
        }
        else {
            // If you are targeting the requestor, use current carry for computations
            carry = transporter.carry;
        }
        if (amount > 0) { // requestInput instance, needs refilling
            // Change in resources if transporter goes straight to the input
            let dQ_direct = Math.min(amount, carry[request.resourceType] || 0);
            // let dt_direct = Pathing.distance(newPos, request.target.pos) + ticksUntilFree;
            let dt_direct = ticksUntilFree + newPos.getMultiRoomRangeTo(request.target.pos) * LogisticsNetwork_1.settings.rangeToPathHeuristic;
            choices.push({
                dQ: dQ_direct,
                dt: dt_direct,
                targetRef: request.target.ref
            });
            if ((carry[request.resourceType] || 0) > amount || _.sum(carry) == transporter.carryCapacity) {
                return choices; // Return early if you already have enough resources to go direct or are already full
            }
            // Change in resources if transporter picks up resources from a buffer first
            for (let buffer of this.buffers) {
                let dQ_buffer = Math.min(amount, transporter.carryCapacity, buffer.store[request.resourceType] || 0);
                let dt_buffer = newPos.getMultiRoomRangeTo(request.target.pos) * LogisticsNetwork_1.settings.rangeToPathHeuristic + // Pathing.distance(newPos, buffer.pos) +
                    Pathing.distance(buffer.pos, request.target.pos) + ticksUntilFree;
                choices.push({
                    dQ: dQ_buffer,
                    dt: dt_buffer,
                    targetRef: buffer.ref
                });
            }
        }
        else if (amount < 0) { // requestOutput instance, needs pickup
            // Change in resources if transporter goes straight to the output
            let remainingCarryCapacity = transporter.carryCapacity - _.sum(carry);
            let dQ_direct = Math.min(Math.abs(amount), remainingCarryCapacity);
            let dt_direct = newPos.getMultiRoomRangeTo(request.target.pos) * LogisticsNetwork_1.settings.rangeToPathHeuristic + //Pathing.distance(newPos, request.target.pos)
                +ticksUntilFree;
            choices.push({
                dQ: dQ_direct,
                dt: dt_direct,
                targetRef: request.target.ref
            });
            if (remainingCarryCapacity >= Math.abs(amount) || remainingCarryCapacity == transporter.carryCapacity) {
                return choices; // Return early you have sufficient free space or are empty
            }
            // Change in resources if transporter drops off resources at a buffer first
            for (let buffer of this.buffers) {
                let dQ_buffer = Math.min(Math.abs(amount), transporter.carryCapacity, buffer.storeCapacity - _.sum(buffer.store));
                let dt_buffer = newPos.getMultiRoomRangeTo(request.target.pos) * LogisticsNetwork_1.settings.rangeToPathHeuristic + //Pathing.distance(newPos, buffer.pos) +
                    Pathing.distance(buffer.pos, request.target.pos) + ticksUntilFree;
                choices.push({
                    dQ: dQ_buffer,
                    dt: dt_buffer,
                    targetRef: buffer.ref
                });
            }
            // if (store.resourceType == RESOURCE_ENERGY) {
            // 	// Only for when you're picking up more energy: check to see if you can put to available links
            // 	for (let link of this.colony.dropoffLinks) {
            // 		let linkDeltaResource = Math.min(Math.abs(amount), transporter.carryCapacity,
            // 			2 * link.energyCapacity);
            // 		let ticksUntilDropoff = Math.max(Pathing.distance(newPos, link.pos),
            // 										 this.colony.linkNetwork.getDropoffAvailability(link));
            // 		let linkDistance = ticksUntilDropoff +
            // 						   Pathing.distance(link.pos, store.target.pos) + ticksUntilFree;
            // 		choices.push({
            // 						 deltaResource: linkDeltaResource,
            // 						 deltaTicks   : linkDistance,
            // 						 targetRef    : link.ref
            // 					 });
            // 	}
            // }
        }
        return choices;
    }
    /* Compute the best possible value of |dResource / dt| */
    resourceChangeRate(transporter, request) {
        let key = transporter.name + ':' + request.id;
        if (!this.cache.resourceChangeRate[key]) {
            let choices = this.bufferChoices(transporter, request);
            let dQ_dt = _.map(choices, choice => request.multiplier * choice.dQ / Math.max(choice.dt, 0.1));
            this.cache.resourceChangeRate[key] = _.max(dQ_dt);
        }
        return this.cache.resourceChangeRate[key];
    }
    /* Generate requestor preferences in terms of transporters */
    requestPreferences(request, transporters) {
        // Requestors priortize transporters by change in resources per tick until pickup/delivery
        return _.sortBy(transporters, transporter => -1 * this.resourceChangeRate(transporter, request)); // -1 -> desc
    }
    /* Generate transporter preferences in terms of store structures */
    transporterPreferences(transporter) {
        // Transporters prioritize requestors by change in resources per tick until pickup/delivery
        return _.sortBy(this.requests, request => -1 * this.resourceChangeRate(transporter, request)); // -1 -> desc
    }
    /* Logs the output of the stable matching result */
    summarizeMatching() {
        let requests = this.requests.slice();
        let transporters = _.filter(this.colony.getCreepsByRole(TransporterSetup.role), creep => !creep.spawning);
        let unmatchedTransporters = _.remove(transporters, transporter => !_.keys(this._matching).includes(transporter.name));
        let unmatchedRequests = _.remove(requests, request => !_.values(this._matching).includes(request));
        console.log(`Stable matching for ${this.colony.name} at ${Game.time}`);
        for (let transporter of transporters) {
            let transporterStr = transporter.name + ' ' + transporter.pos;
            let request = this._matching[transporter.name];
            let requestStr = request.target.ref + ' ' + request.target.pos.print;
            console.log(`${transporterStr.padRight(30)} : ${requestStr}`);
        }
        for (let transporter of unmatchedTransporters) {
            let transporterStr = transporter.name + ' ' + transporter.pos;
            console.log(`${transporterStr.padRight(30)} : ${''}`);
        }
        for (let request of unmatchedRequests) {
            let requestStr = request.target.ref + ' ' + request.target.pos;
            console.log(`${''.padRight(30)} : ${requestStr}`);
        }
        console.log();
    }
    /* Logs the current state of the logistics group to the console; useful for debugging */
    summarize() {
        // console.log(`Summary of logistics group for ${this.colony.name} at time ${Game.time}`);
        console.log('Requests:');
        for (let request of this.requests) {
            let targetType = request.target instanceof DirectiveLogisticsRequest ? 'flag' :
                request.target.structureType;
            let energy = 0;
            if (request.target instanceof DirectiveLogisticsRequest || isStoreStructure(request.target)) {
                energy = request.target.store[RESOURCE_ENERGY];
            }
            else if (isEnergyStructure(request.target)) {
                energy = request.target.energy;
            }
            let targetingTprtrNames = _.map(LogisticsNetwork_1.targetingTransporters(request.target), c => c.name);
            console.log(`    Target: ${targetType} ${request.target.pos.print} ${request.target.ref}    ` +
                `Amount: ${request.amount}    Energy: ${energy}    Targeted by: ${targetingTprtrNames}`);
        }
        console.log('Transporters:');
        for (let transporter of this.colony.getCreepsByRole(TransporterSetup.role)) {
            let task = transporter.task ? transporter.task.name : 'none';
            let target = transporter.task ?
                transporter.task.proto._target.ref + ' ' + transporter.task.targetPos.print : 'none';
            let nextAvailability = this.nextAvailability(transporter);
            console.log(`    Creep: ${transporter.name}    Pos: ${transporter.pos.print}    ` +
                `Task: ${task}    Target: ${target}    ` +
                `Available in ${Math.floor(nextAvailability[0])} ticks at ${nextAvailability[1].print}`);
        }
        console.log();
    }
    get matching() {
        if (!this._matching) {
            this._matching = this.stableMatching(this.transporters);
        }
        return this._matching;
    }
    /* Generate a stable matching of transporters to requests with Gale-Shapley algorithm */
    stableMatching(transporters) {
        let tPrefs = {};
        for (let transporter of transporters) {
            tPrefs[transporter.name] = _.map(this.transporterPreferences(transporter), request => request.id);
        }
        let rPrefs = {};
        for (let request of this.requests) {
            rPrefs[request.id] = _.map(this.requestPreferences(request, transporters), transporter => transporter.name);
        }
        let stableMatching = new Matcher(tPrefs, rPrefs).match();
        let requestMatch = _.mapValues(stableMatching, reqID => _.find(this.requests, request => request.id == reqID));
        return requestMatch;
    }
};
LogisticsNetwork.settings = {
    flagDropAmount: 1000,
    rangeToPathHeuristic: 1.1,
    carryThreshold: 800,
};
LogisticsNetwork = LogisticsNetwork_1 = __decorate([
    profile
], LogisticsNetwork);
var LogisticsNetwork_1;

// Helper methods for Game.map
// Much of this code was taken with slight modification from BonzAI codebase
const ROOMTYPE_SOURCEKEEPER = 'SK';
const ROOMTYPE_CORE = 'CORE';
const ROOMTYPE_CONTROLLER = 'CTRLR';
const ROOMTYPE_ALLEY = 'ALLEY';
let WorldMap = class WorldMap {
    static roomType(roomName) {
        let coords = this.getRoomCoordinates(roomName);
        if (coords.x % 10 === 0 || coords.y % 10 === 0) {
            return ROOMTYPE_ALLEY;
        }
        else if (coords.x % 5 === 0 && coords.y % 5 === 0) {
            return ROOMTYPE_CORE;
        }
        else if (coords.x % 10 <= 6 && coords.x % 10 >= 4 && coords.y % 10 <= 6 && coords.y % 10 >= 4) {
            return ROOMTYPE_SOURCEKEEPER;
        }
        else {
            return ROOMTYPE_CONTROLLER;
        }
    }
    static findRelativeRoomName(roomName, xDelta, yDelta) {
        let coords = this.getRoomCoordinates(roomName);
        let xDir = coords.xDir;
        if (xDir === 'W') {
            xDelta = -xDelta;
        }
        let yDir = coords.yDir;
        if (yDir === 'N') {
            yDelta = -yDelta;
        }
        let x = coords.x + xDelta;
        let y = coords.y + yDelta;
        if (x < 0) {
            x = Math.abs(x) - 1;
            xDir = this.oppositeDir(xDir);
        }
        if (y < 0) {
            // noinspection JSSuspiciousNameCombination
            y = Math.abs(y) - 1;
            yDir = this.oppositeDir(yDir);
        }
        return xDir + x + yDir + y;
    }
    static findRoomCoordDeltas(origin, otherRoom) {
        let originCoords = this.getRoomCoordinates(origin);
        let otherCoords = this.getRoomCoordinates(otherRoom);
        let xDelta = otherCoords.x - originCoords.x;
        if (originCoords.xDir !== otherCoords.xDir) {
            xDelta = otherCoords.x + originCoords.x + 1;
        }
        let yDelta = otherCoords.y - originCoords.y;
        if (originCoords.yDir !== otherCoords.yDir) {
            yDelta = otherCoords.y + originCoords.y + 1;
        }
        // normalize direction
        if (originCoords.xDir === 'W') {
            xDelta = -xDelta;
        }
        if (originCoords.yDir === 'N') {
            yDelta = -yDelta;
        }
        return { x: xDelta, y: yDelta };
    }
    static findRelativeRoomDir(origin, otherRoom) {
        let coordDeltas = this.findRoomCoordDeltas(origin, otherRoom);
        // noinspection JSSuspiciousNameCombination
        if (Math.abs(coordDeltas.x) == Math.abs(coordDeltas.y)) {
            if (coordDeltas.x > 0) {
                if (coordDeltas.y > 0) {
                    return 2;
                }
                else {
                    return 4;
                }
            }
            else if (coordDeltas.x < 0) {
                if (coordDeltas.y > 0) {
                    return 8;
                }
                else {
                    return 6;
                }
            }
            else {
                // must be the same missionRoom, no direction
                return 0;
            }
        }
        else {
            // noinspection JSSuspiciousNameCombination
            if (Math.abs(coordDeltas.x) > Math.abs(coordDeltas.y)) {
                if (coordDeltas.x > 0) {
                    return 3;
                }
                else {
                    return 7;
                }
            }
            else {
                if (coordDeltas.y > 0) {
                    return 1;
                }
                else {
                    return 5;
                }
            }
        }
    }
    static oppositeDir(dir) {
        switch (dir) {
            case 'W':
                return 'E';
            case 'E':
                return 'W';
            case 'N':
                return 'S';
            case 'S':
                return 'N';
            default:
                return 'error';
        }
    }
    static getRoomCoordinates(roomName) {
        let coordinateRegex = /(E|W)(\d+)(N|S)(\d+)/g;
        let match = coordinateRegex.exec(roomName);
        let xDir = match[1];
        let x = match[2];
        let yDir = match[3];
        let y = match[4];
        return {
            x: Number(x),
            y: Number(y),
            xDir: xDir,
            yDir: yDir,
        };
    }
};
WorldMap = __decorate([
    profile
], WorldMap);

// Mining site class for grouping relevant components
let MiningSite = MiningSite_1 = class MiningSite extends HiveCluster {
    constructor(colony, source) {
        super(colony, source, 'miningSite');
        this.source = source;
        this.energyPerTick = source.energyCapacity / ENERGY_REGEN_TIME;
        this.miningPowerNeeded = Math.ceil(this.energyPerTick / HARVEST_POWER) + 1;
        // Register output method
        let siteContainer = this.pos.findClosestByLimitedRange(this.room.containers, 2);
        if (siteContainer) {
            this.output = siteContainer;
        }
        let siteLink = this.pos.findClosestByLimitedRange(this.colony.availableLinks, 2);
        if (siteLink) {
            this.output = siteLink;
            this.colony.linkNetwork.claimLink(this.output);
        }
        if (this.outputPos) {
            this.colony.destinations.push(this.outputPos);
        }
        // Register output construction sites
        let nearbyOutputSites = this.pos.findInRange(this.room.constructionSites, 2, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER ||
                s.structureType == STRUCTURE_LINK,
        });
        this.outputConstructionSite = nearbyOutputSites[0];
        // Create a mining overlord for this
        let priority = this.room.my ? OverlordPriority.ownedRoom.mine : OverlordPriority.remoteRoom.mine;
        this.shouldDropMine = !this.room.my && !this.room.reservedByMe &&
            WorldMap.roomType(this.room.name) != ROOMTYPE_SOURCEKEEPER &&
            WorldMap.roomType(this.room.name) != ROOMTYPE_CORE;
        this.overlord = new MiningOverlord(this, priority, this.shouldDropMine);
        if (!this.shouldDropMine && Game.time % 100 == 0 && !this.output && !this.outputConstructionSite) {
            log.warning(`Mining site at ${this.pos.print} has no output!`);
        }
        // Calculate statistics
        this.stats();
    }
    get memory() {
        return Mem.wrap(this.colony.memory, this.name);
    }
    stats() {
        let defaults = {
            usage: 0,
            downtime: 0,
        };
        if (!this.memory.stats)
            this.memory.stats = defaults;
        _.defaults(this.memory.stats, defaults);
        // Compute uptime
        if (this.source.ticksToRegeneration == 1) {
            this.memory.stats.usage = (this.source.energyCapacity - this.source.energy) / this.source.energyCapacity;
        }
        this.memory.stats.downtime = (this.memory.stats.downtime * (CREEP_LIFE_TIME - 1) +
            (this.output ? +this.output.isFull : 0)) / CREEP_LIFE_TIME;
    }
    /* Return the approximate predicted energy if a transporter needed to come from storage.
     * If no storage, uses hatchery pos; if no hatchery, returns current energy */
    get approximatePredictedEnergy() {
        if (!(this.output && this.output instanceof StructureContainer)) {
            return 0;
        }
        let targetingTransporters = LogisticsNetwork.targetingTransporters(this.output);
        let dropoffPoint = this.colony.storage ? this.colony.storage.pos :
            this.colony.hatchery ? this.colony.hatchery.pos : undefined;
        let distance = dropoffPoint ? Pathing.distance(this.output.pos, dropoffPoint) : 0;
        let predictedSurplus = this.energyPerTick * distance;
        let outflux = _.sum(_.map(targetingTransporters, tporter => tporter.carryCapacity - _.sum(tporter.carry)));
        return Math.min(_.sum(this.output.store) + predictedSurplus - outflux, 0);
    }
    /* Register appropriate resource withdrawal requests when the output gets sufficiently full */
    registerOutputRequests() {
        // Register logisticsNetwork requests if approximate predicted amount exceeds transporter capacity
        if (this.output instanceof StructureContainer) {
            let transportCapacity = 200 * this.colony.level;
            let threshold = this.colony.stage > ColonyStage.Larva ? 0.8 : 0.5;
            if (this.output.energy > threshold * transportCapacity) {
                this.colony.logisticsNetwork.requestOutputAll(this.output, { dAmountdt: this.energyPerTick });
            }
        }
        else if (this.output instanceof StructureLink) {
            // If the link will be full with next deposit from the miner
            let minerCapacity = 150;
            if (this.output.energy + minerCapacity > this.output.energyCapacity) {
                this.colony.linkNetwork.requestTransmit(this.output);
            }
        }
    }
    /* Initialization tasks: register resource transfer reqeusts, register creep requests */
    init() {
        this.registerOutputRequests();
    }
    get outputPos() {
        if (this.output) {
            return this.output.pos;
        }
        else if (this.outputConstructionSite) {
            return this.outputConstructionSite.pos;
        }
        else {
            if (!this._outputPos) {
                this._outputPos = this.calculateContainerPos();
                if (!this._outputPos && Game.time % 25 == 0) {
                    log.alert(`Mining site at ${this.pos.print}: no room plan set; cannot determine outputPos!`);
                }
            }
            return this._outputPos;
        }
    }
    /* Calculate where the container output will be built for this site */
    calculateContainerPos() {
        let originPos = undefined;
        if (this.colony.storage) {
            originPos = this.colony.storage.pos;
        }
        else if (this.colony.roomPlanner.storagePos) {
            originPos = this.colony.roomPlanner.storagePos;
        }
        if (originPos) {
            let path = Pathing.findShortestPath(this.pos, originPos).path;
            return path[0];
        }
    }
    /* Calculate where the link will be built */
    calculateLinkPos() {
        let originPos = undefined;
        if (this.colony.storage) {
            originPos = this.colony.storage.pos;
        }
        else if (this.colony.roomPlanner.storagePos) {
            originPos = this.colony.roomPlanner.storagePos;
        }
        if (originPos) {
            let path = Pathing.findShortestPath(this.pos, originPos).path;
            for (let pos of path) {
                if (this.source.pos.getRangeTo(pos) == 2) {
                    return pos;
                }
            }
        }
    }
    /* Build a container output at the optimal location */
    buildOutputIfNeeded() {
        if (this.shouldDropMine) {
            return; // only build containers in reserved, owned, or SK rooms
        }
        if (!this.output && !this.outputConstructionSite) {
            let buildHere = this.outputPos;
            if (buildHere) {
                // Build a link if one is available
                let structureType = STRUCTURE_CONTAINER;
                if (this.room == this.colony.room) {
                    let numLinks = this.colony.links.length +
                        _.filter(this.colony.constructionSites, site => site.structureType == STRUCTURE_LINK).length;
                    let numLinksAllowed = CONTROLLER_STRUCTURES.link[this.colony.level];
                    if (numLinksAllowed > numLinks &&
                        this.colony.hatchery && this.colony.hatchery.link &&
                        this.colony.commandCenter && this.colony.commandCenter.link &&
                        Pathing.distance(this.pos, this.colony.commandCenter.pos) > MiningSite_1.settings.minLinkDistance) {
                        structureType = STRUCTURE_LINK;
                        buildHere = this.calculateLinkPos(); // link pos definitely defined if buildHere is defined
                    }
                }
                let result = buildHere.createConstructionSite(structureType);
                if (result != OK) {
                    log.error(`Mining site at ${this.pos.print}: cannot build output! Result: ${result}`);
                }
            }
        }
    }
    destroyContainerIfNeeded() {
        let storage = this.colony.storage;
        // Possibly replace if you are in colony room, have a container output and are sufficiently far from storage
        if (this.room == this.colony.room && this.output && this.output instanceof StructureContainer &&
            storage && Pathing.distance(this.pos, storage.pos) > MiningSite_1.settings.minLinkDistance) {
            let numLinks = this.colony.links.length +
                _.filter(this.colony.constructionSites, s => s.structureType == STRUCTURE_LINK).length;
            let numLinksAllowed = CONTROLLER_STRUCTURES.link[this.colony.level];
            let miningSitesInRoom = _.map(this.room.sources, s => this.colony.miningSites[s.id]);
            let fartherSites = _.filter(miningSitesInRoom, site => Pathing.distance(storage.pos, site.pos) > Pathing.distance(storage.pos, this.pos));
            let everyFartherSiteHasLink = _.every(fartherSites, site => site.output instanceof StructureLink);
            // Destroy the output if 1) more links can be built, 2) every farther site has a link and
            // 3) hatchery and commandCenter both have links
            if (numLinksAllowed > numLinks && everyFartherSiteHasLink &&
                this.colony.hatchery && this.colony.hatchery.link &&
                this.colony.commandCenter && this.colony.commandCenter.link) {
                this.output.destroy();
            }
        }
        // Destroy container if you already have a link output and it's not being used by anything else
        if (this.output && this.output instanceof StructureLink) {
            let containerOutput = this.source.pos.findClosestByLimitedRange(this.room.containers, 2);
            if (containerOutput && this.colony.hatchery && containerOutput.pos.getRangeTo(this.colony.hatchery) > 2 &&
                containerOutput.pos.getRangeTo(this.colony.upgradeSite) > 3) {
                containerOutput.destroy();
            }
        }
    }
    ;
    /* Run tasks: make output construciton site if needed; build and maintain the output structure */
    run() {
        let rebuildOnTick = 5;
        let rebuildFrequency = 10;
        if (Game.time % rebuildFrequency == rebuildOnTick - 1) {
            this.destroyContainerIfNeeded();
        }
        if (Game.time % rebuildFrequency == rebuildOnTick) {
            this.buildOutputIfNeeded();
        }
    }
    visuals() {
        Visualizer.showInfo([`Usage:  ${this.memory.stats.usage.toPercent()}`,
            `Downtime: ${this.memory.stats.downtime.toPercent()}`], this);
    }
};
MiningSite.settings = {
    minLinkDistance: 10
};
MiningSite = MiningSite_1 = __decorate([
    profile
], MiningSite);
var MiningSite_1;

// Hatchery overlord: spawn and run a dedicated supplier-like hatchery attendant (called after colony has storage)
const QueenSetup = new CreepSetup('queen', {
    pattern: [CARRY, CARRY, MOVE],
    sizeLimit: 8,
});
let HatcheryOverlord = class HatcheryOverlord extends Overlord {
    // private _prioritizedRefills: { [priority: number]: TransportRequest[] };
    constructor(hatchery, priority = OverlordPriority.spawning.hatchery) {
        super(hatchery, 'hatchery', priority);
        this.hatchery = hatchery;
        this.queens = this.creeps(QueenSetup.role);
        this.settings = {
            refillTowersBelow: 500,
        };
    }
    init() {
        let amount = 1;
        // if (this.colony.defcon > DEFCON.invasionNPC) {
        // 	amount = 2;
        // }
        this.wishlist(amount, QueenSetup);
    }
    supplyActions(queen) {
        // Select the closest supply target out of the highest priority and refill it
        let request = this.hatchery.transportRequests.getPrioritizedClosestRequest(queen.pos, 'supply');
        if (request) {
            queen.task = Tasks.transfer(request.target);
        }
        else {
            this.rechargeActions(queen); // if there are no targets, refill yourself
        }
    }
    rechargeActions(queen) {
        if (this.hatchery.link && !this.hatchery.link.isEmpty) {
            queen.task = Tasks.withdraw(this.hatchery.link);
        }
        else if (this.hatchery.battery && !this.hatchery.battery.isEmpty) {
            queen.task = Tasks.withdraw(this.hatchery.battery);
        }
        else {
            let rechargeTargets = _.compact([this.colony.storage,
                this.colony.terminal,
                this.colony.upgradeSite.link,
                this.colony.upgradeSite.battery,
                ..._.map(this.colony.miningSites, site => site.output),
                ..._.filter(this.colony.tombstones, ts => ts.store.energy > 0)]);
            let target = queen.pos.findClosestByMultiRoomRange(_.filter(rechargeTargets, s => s.energy > queen.carryCapacity));
            if (!target)
                target = queen.pos.findClosestByMultiRoomRange(_.filter(rechargeTargets, s => s.energy > 0));
            if (target) {
                queen.task = Tasks.withdraw(target);
            }
            else {
                log.warning(`No valid withdraw target for queen at ${queen.pos.print}!`);
            }
        }
    }
    idleActions(queen) {
        if (this.hatchery.link) {
            // Can energy be moved from the link to the battery?
            if (this.hatchery.battery && !this.hatchery.battery.isFull && !this.hatchery.link.isEmpty) {
                // Move energy to battery as needed
                if (queen.carry.energy < queen.carryCapacity) {
                    queen.task = Tasks.withdraw(this.hatchery.link);
                }
                else {
                    queen.task = Tasks.transfer(this.hatchery.battery);
                }
            }
            else {
                if (queen.carry.energy < queen.carryCapacity) { // make sure you're recharged
                    if (!this.hatchery.link.isEmpty) {
                        queen.task = Tasks.withdraw(this.hatchery.link);
                    }
                    else if (this.hatchery.battery && !this.hatchery.battery.isEmpty) {
                        queen.task = Tasks.withdraw(this.hatchery.battery);
                    }
                }
            }
        }
        else {
            if (this.hatchery.battery && queen.carry.energy < queen.carryCapacity) {
                queen.task = Tasks.withdraw(this.hatchery.battery);
            }
        }
    }
    handleQueen(queen) {
        if (queen.carry.energy > 0) {
            this.supplyActions(queen);
        }
        else {
            this.rechargeActions(queen);
        }
        // If there aren't any tasks that need to be done, recharge the battery from link
        if (queen.isIdle) {
            this.idleActions(queen);
        }
        // // If all of the above is done and hatchery is not in emergencyMode, move to the idle point and renew as needed
        // if (!this.emergencyMode && queen.isIdle) {
        // 	if (queen.pos.isEqualTo(this.idlePos)) {
        // 		// If queen is at idle position, renew her as needed
        // 		if (queen.ticksToLive < this.settings.renewQueenAt && this.availableSpawns.length > 0) {
        // 			this.availableSpawns[0].renewCreep(queen.creep);
        // 		}
        // 	} else {
        // 		// Otherwise, travel back to idle position
        // 		queen.travelTo(this.idlePos);
        // 	}
        // }
    }
    run() {
        for (let queen of this.queens) {
            // Get a task
            this.handleQueen(queen);
            // Run the task if you have one; else move back to idle pos
            if (queen.hasValidTask) {
                queen.run();
            }
            else {
                if (this.queens.length > 1) {
                    queen.travelTo(this.hatchery.idlePos, { range: 1 });
                }
                else {
                    queen.travelTo(this.hatchery.idlePos);
                }
            }
        }
        // Delete extraneous queens in the case there are multiple
        // if (this.queens.length > 1) {
        // 	let queenToSuicide = _.first(_.sortBy(this.queens, queen => queen.ticksToLive));
        // 	if (queenToSuicide) {
        // 		queenToSuicide.suicide();
        // 	}
        // }
    }
};
HatcheryOverlord = __decorate([
    profile
], HatcheryOverlord);

var Priority;
(function (Priority) {
    Priority[Priority["Critical"] = 0] = "Critical";
    Priority[Priority["High"] = 1] = "High";
    Priority[Priority["NormalHigh"] = 2] = "NormalHigh";
    Priority[Priority["Normal"] = 3] = "Normal";
    Priority[Priority["NormalLow"] = 4] = "NormalLow";
    Priority[Priority["Low"] = 5] = "Low";
})(Priority || (Priority = {}));
function blankPriorityQueue() {
    let queue = {};
    for (let priority in Priority) {
        queue[priority] = [];
    }
    return queue;
}

// A stripped-down version of the logistics network intended for local deliveries
let TransportRequestGroup = class TransportRequestGroup {
    constructor() {
        this.supply = blankPriorityQueue();
        this.withdraw = blankPriorityQueue();
    }
    get needsSupplying() {
        for (let priority in this.supply) {
            if (this.supply[priority].length > 0) {
                return true;
            }
        }
        return false;
    }
    get needsWithdrawing() {
        for (let priority in this.withdraw) {
            if (this.withdraw[priority].length > 0) {
                return true;
            }
        }
        return false;
    }
    getPrioritizedClosestRequest(pos, type, filter = undefined) {
        let requests = type == 'withdraw' ? this.withdraw : this.supply;
        for (let priority in requests) {
            let targets = _.map(requests[priority], request => request.target);
            let target = pos.findClosestByRangeThenPath(targets);
            if (target) {
                let searchRequests;
                if (filter) {
                    searchRequests = _.filter(requests[priority], req => filter(req));
                }
                else {
                    searchRequests = requests[priority];
                }
                return _.find(searchRequests, request => request.target.ref == target.ref);
            }
        }
    }
    /* Request for resources to be deposited into this target */
    requestInput(target, priority = Priority.Normal, opts = {}) {
        _.defaults(opts, {
            resourceType: RESOURCE_ENERGY,
        });
        if (!opts.amount) {
            opts.amount = this.getInputAmount(target, opts.resourceType);
        }
        // Register the request
        let req = {
            target: target,
            resourceType: opts.resourceType,
            amount: opts.amount,
        };
        if (opts.amount > 0) {
            this.supply[priority].push(req);
        }
    }
    /* Request for resources to be withdrawn from this target */
    requestOutput(target, priority = Priority.Normal, opts = {}) {
        _.defaults(opts, {
            resourceType: RESOURCE_ENERGY,
        });
        if (!opts.amount) {
            opts.amount = this.getOutputAmount(target, opts.resourceType);
        }
        // Register the request
        let req = {
            target: target,
            resourceType: opts.resourceType,
            amount: opts.amount,
        };
        if (opts.amount > 0) {
            this.withdraw[priority].push(req);
        }
    }
    /* Makes a provide for every resourceType in a requestor object */
    requestOutputAll(target, priority = Priority.Normal, opts = {}) {
        for (let resourceType in target.store) {
            let amount = target.store[resourceType] || 0;
            if (amount > 0) {
                opts.resourceType = resourceType;
                this.requestOutput(target, priority, opts);
            }
        }
    }
    getInputAmount(target, resourceType) {
        if (isStoreStructure(target)) {
            return target.storeCapacity - _.sum(target.store);
        }
        else if (isEnergyStructure(target) && resourceType == RESOURCE_ENERGY) {
            return target.energyCapacity - target.energy;
        }
        else {
            if (target instanceof StructureLab) {
                if (resourceType == target.mineralType) {
                    return target.mineralCapacity - target.mineralAmount;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energyCapacity - target.energy;
                }
            }
            else if (target instanceof StructureNuker) {
                if (resourceType == RESOURCE_GHODIUM) {
                    return target.ghodiumCapacity - target.ghodium;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energyCapacity - target.energy;
                }
            }
            else if (target instanceof StructurePowerSpawn) {
                if (resourceType == RESOURCE_POWER) {
                    return target.powerCapacity - target.power;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energyCapacity - target.energy;
                }
            }
        }
        log.warning('Could not determine requestor amount!');
        return 0;
    }
    getOutputAmount(target, resourceType) {
        if (isStoreStructure(target)) {
            return target.store[resourceType];
        }
        else if (isEnergyStructure(target) && resourceType == RESOURCE_ENERGY) {
            return target.energy;
        }
        else {
            if (target instanceof StructureLab) {
                if (resourceType == target.mineralType) {
                    return target.mineralAmount;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energy;
                }
            }
            else if (target instanceof StructureNuker) {
                if (resourceType == RESOURCE_GHODIUM) {
                    return target.ghodium;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energy;
                }
            }
            else if (target instanceof StructurePowerSpawn) {
                if (resourceType == RESOURCE_POWER) {
                    return target.power;
                }
                else if (resourceType == RESOURCE_ENERGY) {
                    return target.energy;
                }
            }
        }
        log.warning('Could not determine provider amount!');
        return 0;
    }
    summarize() {
        console.log(`Supply requests:`);
        for (let priority in this.supply) {
            console.log(`Priority: ${priority}`);
            for (let request of this.supply[priority]) {
                console.log(`    targetID: ${request.target.ref}  amount: ${request.amount}  ` +
                    `resourceType: ${request.resourceType}`);
            }
        }
        console.log(`Withdraw requests:`);
        for (let priority in this.withdraw) {
            console.log(`Priority: ${priority}`);
            for (let request of this.withdraw[priority]) {
                console.log(`    targetID: ${request.target.ref}  amount: ${request.amount}  ` +
                    `resourceType: ${request.resourceType}`);
            }
        }
    }
};
TransportRequestGroup = __decorate([
    profile
], TransportRequestGroup);

// Hatchery - groups all spawns and extensions in a colony
const ERR_ROOM_ENERGY_CAPACITY_NOT_ENOUGH = -10;
let Hatchery = class Hatchery extends HiveCluster {
    constructor(colony, headSpawn) {
        super(colony, headSpawn, 'hatchery');
        // Register structure components
        this.spawns = colony.spawns;
        this.availableSpawns = _.filter(this.spawns, (spawn) => !spawn.spawning);
        this.extensions = colony.extensions;
        this.link = this.pos.findClosestByLimitedRange(colony.availableLinks, 2);
        this.colony.linkNetwork.claimLink(this.link);
        this.battery = this.pos.findClosestByLimitedRange(this.room.containers, 2);
        this.colony.obstacles.push(this.idlePos);
        // Associate all towers that aren't part of the command center if there is one
        if (colony.commandCenter) { // TODO: make this not order-dependent
            this.towers = _.difference(colony.towers, colony.commandCenter.towers);
        }
        else {
            this.towers = colony.towers;
        }
        this.productionPriorities = [];
        this.productionQueue = {};
        this.settings = {
            refillTowersBelow: 500,
            linksRequestEnergyBelow: 0,
            supplierSize: _.min([_.ceil(2 * (this.extensions.length + 1) / 5), 8]),
            numSuppliers: 1,
            queenSize: _.min([_.ceil(2 * (this.extensions.length + 1) / 5), 8]),
            numQueens: 1,
            renewQueenAt: 1000,
            suppressSpawning: false,
        };
        // Register the hatchery overlord
        this.overlord = new HatcheryOverlord(this);
        // Assign a separate store group if hatchery has a dedicated attendant
        this.transportRequests = new TransportRequestGroup();
        this.memory.stats = this.getStats();
    }
    get memory() {
        return Mem.wrap(this.colony.memory, 'hatchery');
    }
    // Idle position for queen
    get idlePos() {
        if (this.battery) {
            return this.battery.pos;
        }
        else {
            return this.spawns[0].pos.availableNeighbors()[0];
        }
    }
    getStats() {
        // Compute uptime
        let spawnUsageThisTick = _.filter(this.spawns, spawn => spawn.spawning).length / this.spawns.length;
        let uptime;
        if (this.memory.stats && this.memory.stats.uptime) {
            uptime = (this.memory.stats.uptime * (CREEP_LIFE_TIME - 1) + spawnUsageThisTick) / CREEP_LIFE_TIME;
        }
        else {
            uptime = spawnUsageThisTick;
        }
        Stats.log(`colonies.${this.colony.name}.hatchery.uptime`, uptime);
        return {
            uptime: uptime,
        };
    }
    /* Request more energy when appropriate either via link or hauler */
    registerEnergyRequests() {
        // Register requests for input into the hatchery (goes on colony store group)
        if (this.link && this.link.isEmpty) {
            this.colony.linkNetwork.requestReceive(this.link);
        }
        if (this.battery) {
            let threshold = this.colony.stage == ColonyStage.Larva ? 0.75 : 0.5;
            if (this.battery.energy < threshold * this.battery.storeCapacity) {
                this.colony.logisticsNetwork.requestInput(this.battery, { multiplier: 1.5 });
            }
        }
        // Register energy transport requests (goes on hatchery store group, which can be colony store group)
        let refillSpawns = _.filter(this.spawns, spawn => spawn.energy < spawn.energyCapacity);
        let refillExtensions = _.filter(this.extensions, extension => extension.energy < extension.energyCapacity);
        let refillTowers = _.filter(this.towers, tower => tower.energy < tower.energyCapacity);
        _.forEach(refillSpawns, spawn => this.transportRequests.requestInput(spawn, Priority.NormalHigh));
        _.forEach(refillExtensions, extension => this.transportRequests.requestInput(extension, Priority.NormalHigh));
        _.forEach(refillTowers, tower => this.transportRequests.requestInput(tower, tower.energy < this.settings.refillTowersBelow ?
            Priority.Low : Priority.Low)); // TODO: made change here
    }
    // Creep queueing and spawning =====================================================================================
    generateCreepName(roleName) {
        // Generate a creep name based on the role and add a suffix to make it unique
        let i = 0;
        while (Game.creeps[(roleName + '_' + i)]) {
            i++;
        }
        return (roleName + '_' + i);
    }
    ;
    // /* Generate (but not spawn) the largest creep possible, returns the protoCreep as an object */
    // generateProtoCreep(setup: CreepSetup, overlord: Overlord, bootstrap = false): protoCreep {
    // 	// Generate the creep body
    // 	let creepBody: BodyPartConstant[];
    // 	if (this.colony.incubator) { // if you're being incubated, build as big a creep as you want
    // 		creepBody = setup.generateBody(this.colony.incubator.room.energyCapacityAvailable);
    // 	} else { // otherwise limit yourself to actual energy constraints
    // 		creepBody = setup.generateBody(this.colony.room.energyCapacityAvailable);
    // 	}
    // 	if (bootstrap) {
    // 		creepBody = setup.generateBody(this.colony.room.energyAvailable);
    // 	}
    // 	// Generate the creep memory
    // 	let creepMemory: CreepMemory = {
    // 		colony  : overlord.colony.name, 						// name of the colony the creep is assigned to
    // 		overlord: overlord.ref,								// name of the overseer running this creep
    // 		role    : setup.role,								// role of the creep
    // 		task    : null, 									// task the creep is performing
    // 		data    : { 										// rarely-changed data about the creep
    // 			origin: '',										// where it was spawned, filled in at spawn time
    // 		},
    // 		_trav   : null,
    // 	};
    // 	// Create the protocreep and return it
    // 	let protoCreep: protoCreep = { 							// object to add to spawner queue
    // 		body  : creepBody, 										// body array
    // 		name  : setup.role, 									// name of the creep - gets modified by hatchery
    // 		memory: creepMemory,									// memory to initialize with
    // 	};
    // 	return protoCreep;
    // }
    get energyStructures() {
        if (!this._energyStructures) {
            // Ugly workaround to [].concat() throwing a temper tantrum
            let spawnsAndExtensions = [];
            spawnsAndExtensions = spawnsAndExtensions.concat(this.spawns, this.extensions);
            this._energyStructures = _.sortBy(spawnsAndExtensions, structure => structure.pos.getRangeTo(this.idlePos));
        }
        return this._energyStructures;
    }
    spawnCreep(protoCreep) {
        let spawnToUse = this.availableSpawns.shift(); // get a spawn to use
        if (spawnToUse) { // if there is a spawn, create the creep
            protoCreep.name = this.generateCreepName(protoCreep.name); // modify the creep name to make it unique
            if (bodyCost(protoCreep.body) > this.room.energyCapacityAvailable) {
                return ERR_ROOM_ENERGY_CAPACITY_NOT_ENOUGH;
            }
            protoCreep.memory.data.origin = spawnToUse.pos.roomName;
            let result = spawnToUse.spawnCreep(protoCreep.body, protoCreep.name, {
                memory: protoCreep.memory,
                energyStructures: this.energyStructures
            });
            if (result == OK) {
                return result;
            }
            else {
                this.availableSpawns.unshift(spawnToUse); // return the spawn to the available spawns list
                return result;
            }
        }
        else { // otherwise, return busy
            return ERR_BUSY;
        }
    }
    canSpawn(body) {
        return bodyCost(body) <= this.room.energyCapacityAvailable;
    }
    canSpawnZerg(zerg) {
        return this.canSpawn(_.map(zerg.body, part => part.type));
    }
    enqueue(protoCreep, priority) {
        if (this.canSpawn(protoCreep.body)) {
            // Spawn the creep yourself if you can
            if (!this.productionQueue[priority]) {
                this.productionQueue[priority] = [];
                this.productionPriorities.push(priority);
            }
            this.productionQueue[priority].push(protoCreep);
        }
        else {
            // If you are incubating and can't build the requested creep, enqueue it to the incubation hatchery
            if (this.colony.incubator && this.colony.incubator.hatchery) {
                this.colony.incubator.hatchery.enqueue(protoCreep, priority);
            }
            else {
                log.warning(`${this.room.print} hatchery: cannot spawn creep ${protoCreep.name}!`);
            }
        }
    }
    spawnHighestPriorityCreep() {
        let sortedKeys = _.sortBy(this.productionPriorities);
        for (let priority of sortedKeys) {
            let protoCreep = this.productionQueue[priority].shift();
            if (protoCreep) {
                let result = this.spawnCreep(protoCreep);
                if (result == OK) {
                    return result;
                }
                else if (result != ERR_ROOM_ENERGY_CAPACITY_NOT_ENOUGH) {
                    this.productionQueue[priority].unshift(protoCreep);
                    return result;
                }
            }
        }
    }
    handleSpawns() {
        // Spawn all queued creeps that you can
        while (this.availableSpawns.length > 0) {
            if (this.spawnHighestPriorityCreep() != OK) {
                break;
            }
        }
    }
    // Runtime operation ===============================================================================================
    init() {
        this.registerEnergyRequests();
    }
    run() {
        if (!this.settings.suppressSpawning) {
            this.handleSpawns();
        }
    }
    visuals() {
        let spawnInfo = '';
        _.forEach(this.spawns, function (spawn) {
            if (spawn.spawning) {
                spawnInfo += ' ' + spawn.spawning.name.split('_')[0];
            }
        });
        let info = [
            `Energy: ${this.room.energyAvailable} / ${this.room.energyCapacityAvailable}`,
            `Status: ${spawnInfo != '' ? 'spawning' + ' ' + spawnInfo : 'idle'}`,
            `Uptime: ${Number(this.memory.stats.uptime).toFixed(2)}`
        ];
        Visualizer.showInfo(info, this);
    }
};
Hatchery.restrictedRange = 6; // Don't stand idly within this range of hatchery
Hatchery = __decorate([
    profile
], Hatchery);

// Energetics manager; makes high-level decisions based on energy amounts
class Energetics {
    static lowPowerMode(colony) {
        if (colony.stage == ColonyStage.Adult) {
            if (_.sum(colony.storage.store) > this.settings.storage.total.cap &&
                colony.terminal && _.sum(colony.terminal.store) > this.settings.terminal.total.cap) {
                return true;
            }
        }
        return false;
    }
}
Energetics.settings = {
    storage: {
        total: {
            cap: STORAGE_CAPACITY - 100000
        }
    },
    terminal: {
        total: {
            cap: TERMINAL_CAPACITY - 50000
        },
        energy: {
            sendSize: 25000,
            inThreshold: 50000,
            outThreshold: 150000,
            equilibrium: 100000,
        },
    },
};

// Command center overlord: spawn and run a dediated commandCenter attendant
const ManagerSetup = new CreepSetup('manager', {
    pattern: [CARRY, CARRY, MOVE],
    sizeLimit: 10,
});
let CommandCenterOverlord = class CommandCenterOverlord extends Overlord {
    constructor(commandCenter, priority = OverlordPriority.spawning.commandCenter) {
        super(commandCenter, 'manager', priority);
        this.commandCenter = commandCenter;
        this.transportRequests = this.commandCenter.transportRequests;
        this.evolutionChamber = undefined; // This gets filled in during init()
        this.managers = this.creeps(ManagerSetup.role);
    }
    init() {
        this.evolutionChamber = this.colony.evolutionChamber;
        this.wishlist(1, ManagerSetup);
    }
    supplyActions(manager) {
        let request = this.transportRequests.getPrioritizedClosestRequest(manager.pos, 'supply');
        if (request) {
            let amount = Math.min(request.amount, manager.carryCapacity);
            manager.task = Tasks.transfer(request.target, request.resourceType, amount, { nextPos: this.commandCenter.idlePos });
            if ((manager.carry[request.resourceType] || 0) < amount) {
                // If you are currently carrying other crap, overwrite current task and put junk in terminal/storage
                if (_.sum(manager.carry) > (manager.carry[request.resourceType] || 0)) {
                    manager.task = Tasks.transferAll(this.commandCenter.terminal || this.commandCenter.storage);
                }
                // Otherwise withdraw as much as you can hold
                else {
                    let withdrawFrom = this.commandCenter.storage;
                    if (this.commandCenter.terminal
                        && (request.resourceType != RESOURCE_ENERGY
                            || this.commandCenter.terminal.energy > Energetics.settings.terminal.energy.equilibrium)) {
                        withdrawFrom = this.commandCenter.terminal;
                    }
                    let withdrawAmount = amount - _.sum(manager.carry);
                    manager.task.fork(Tasks.withdraw(withdrawFrom, request.resourceType, withdrawAmount, { nextPos: request.target.pos }));
                }
            }
        }
    }
    withdrawActions(manager) {
        let request = this.transportRequests.getPrioritizedClosestRequest(manager.pos, 'withdraw');
        if (request) {
            let amount = Math.min(request.amount, manager.carryCapacity - _.sum(manager.carry));
            manager.task = Tasks.withdraw(request.target, request.resourceType, amount);
        }
    }
    equalizeStorageAndTerminal(manager) {
        let storage = this.commandCenter.storage;
        let terminal = this.commandCenter.terminal;
        if (!storage || !terminal) {
            return;
        }
        // Move energy from terminal to storage if there is too much in terminal and there is space in storage
        if (terminal.energy > Energetics.settings.terminal.energy.equilibrium) {
            if (_.sum(storage.store) < Energetics.settings.storage.total.cap) {
                manager.task = Tasks.withdraw(terminal);
                manager.task.parent = Tasks.transfer(storage);
                return;
            }
        }
        // Move energy from storage to terminal if there is not enough in terminal
        if (terminal.energy < Energetics.settings.terminal.energy.inThreshold) {
            manager.task = Tasks.withdraw(storage);
            manager.task.parent = Tasks.transfer(terminal);
            return;
        }
        // Move all non-energy resources from storage to terminal
        for (let resourceType in storage.store) {
            if (resourceType != RESOURCE_ENERGY && storage.store[resourceType] > 0) {
                manager.task = Tasks.withdraw(storage, resourceType);
                manager.task.parent = Tasks.transfer(terminal, resourceType);
                return;
            }
        }
    }
    // Suicide once you get old and make sure you don't drop and waste any resources
    handleManagerDeath(manager) {
        if (_.sum(manager.carry) == 0 && this.managers.length > 0) {
            manager.suicide();
        }
        else {
            manager.task = Tasks.transferAll(this.commandCenter.terminal || this.commandCenter.storage);
        }
    }
    handleManager(manager) {
        if (manager.ticksToLive < 50) {
            let nearbyManagers = _.filter(this.managers, manager => manager.pos.inRangeTo(this.commandCenter.pos, 3));
            if (nearbyManagers.length > 1) {
                this.handleManagerDeath(manager);
                return;
            }
        }
        if (this.transportRequests.needsWithdrawing) {
            if (_.sum(manager.carry) < manager.carryCapacity) {
                this.withdrawActions(manager);
            }
            else {
                manager.task = Tasks.transferAll(this.commandCenter.terminal || this.commandCenter.storage);
            }
        }
        else if (this.transportRequests.needsSupplying) {
            this.supplyActions(manager);
        }
        else {
            this.equalizeStorageAndTerminal(manager);
        }
    }
    run() {
        for (let manager of this.managers) {
            // Get a task if needed
            if (manager.isIdle) {
                this.handleManager(manager);
            }
            // If you have a valid task, run it; else go to idle pos
            if (manager.hasValidTask) {
                manager.run();
            }
            else {
                if (!manager.pos.isEqualTo(this.commandCenter.idlePos)) {
                    manager.travelTo(this.commandCenter.idlePos);
                }
            }
        }
    }
};
CommandCenterOverlord = __decorate([
    profile
], CommandCenterOverlord);

// Command center: groups many RCL8 components, storge, lab, terminal, and some towers
let CommandCenter = class CommandCenter extends HiveCluster {
    constructor(colony, storage) {
        super(colony, storage, 'commandCenter');
        this.memory = Mem.wrap(this.colony.memory, 'commandCenter');
        // Register physical components
        this.storage = storage;
        this.link = this.pos.findClosestByLimitedRange(colony.availableLinks, 2);
        this.colony.linkNetwork.claimLink(this.link);
        this.terminal = colony.terminal;
        this.terminalNetwork = Overmind.terminalNetwork;
        this.towers = this.pos.findInRange(colony.towers, 3);
        // this.labs = colony.labs;
        this.powerSpawn = colony.powerSpawn;
        this.nuker = colony.nuker;
        this.observer = colony.observer;
        this.colony.obstacles.push(this.idlePos);
        this.transportRequests = new TransportRequestGroup();
        this.settings = {
            linksTransmitAt: LINK_CAPACITY - 100,
            refillTowersBelow: 500,
            excessEnergyTransferSize: 100000,
            managerSize: 8,
            unloadStorageBuffer: 900000,
        };
        if (this.storage.isActive() && this.link && this.link.isActive()) {
            this.overlord = new CommandCenterOverlord(this);
        }
    }
    // Idle position
    get idlePos() {
        if (!this.memory.idlePos || Game.time % 25 == 0) {
            this.memory.idlePos = this.findIdlePos();
        }
        return derefRoomPosition(this.memory.idlePos);
    }
    /* Find the best idle position */
    findIdlePos() {
        // Try to match as many other structures as possible
        let proximateStructures = _.compact([this.link,
            this.terminal,
            this.powerSpawn,
            this.nuker,
            ...this.towers]);
        let numNearbyStructures = (pos) => _.filter(proximateStructures, s => s.pos.isNearTo(pos) && !s.pos.isEqualTo(pos)).length;
        return _.last(_.sortBy(this.storage.pos.neighbors, pos => numNearbyStructures(pos)));
    }
    /* Register a link transfer store if the link is sufficiently full */
    registerLinkTransferRequests() {
        if (this.link) {
            if (this.link.energy > this.settings.linksTransmitAt) {
                this.colony.linkNetwork.requestTransmit(this.link);
            }
        }
    }
    registerRequests() {
        // Supply requests:
        // If the link is empty and can send energy and something needs energy, fill it up
        if (this.link && this.link.energy < 0.9 * this.link.energyCapacity && this.link.cooldown <= 1) {
            if (this.colony.linkNetwork.receive.length > 0) { // If something wants energy
                this.transportRequests.requestInput(this.link, Priority.Critical);
            }
        }
        // Refill towers as needed with variable priority
        let refillTowers = _.filter(this.towers, tower => tower.energy < this.settings.refillTowersBelow);
        _.forEach(refillTowers, tower => this.transportRequests.requestInput(tower, Priority.High));
        // Refill terminal if it is below threshold
        if (this.terminal && this.terminal.energy < Energetics.settings.terminal.energy.inThreshold) {
            this.transportRequests.requestInput(this.terminal, Priority.NormalHigh);
        }
        // Refill power spawn
        if (this.powerSpawn && this.powerSpawn.energy < this.powerSpawn.energyCapacity) {
            this.transportRequests.requestInput(this.powerSpawn, Priority.Normal);
        }
        // Refill nuker with low priority
        if (this.nuker && this.nuker.energy < this.nuker.energyCapacity && this.storage.energy > 100000) {
            this.transportRequests.requestInput(this.nuker, Priority.Low);
        }
        // Withdraw requests:
        // If the link has energy and nothing needs it, empty it
        if (this.link && this.link.energy > 0) {
            if (this.colony.linkNetwork.receive.length == 0 || this.link.cooldown > 3) {
                this.transportRequests.requestOutput(this.link, Priority.High);
            }
        }
    }
    // Initialization and operation ====================================================================================
    init() {
        this.registerLinkTransferRequests();
        this.registerRequests();
    }
    run() {
    }
    visuals() {
        let info = [
            `Energy: ${Math.floor(this.storage.store[RESOURCE_ENERGY] / 1000)} K`,
        ];
        Visualizer.showInfo(info, this);
    }
};
CommandCenter = __decorate([
    profile
], CommandCenter);

class UpgraderSetup extends CreepSetup {
    constructor(sizeLimit) {
        super(UpgraderSetup.role, {
            pattern: [WORK, WORK, WORK, CARRY, MOVE],
            sizeLimit: sizeLimit,
        });
    }
}
UpgraderSetup.role = 'upgrader';
let UpgradingOverlord = class UpgradingOverlord extends Overlord {
    constructor(upgradeSite, priority = OverlordPriority.upgrading.upgrade) {
        super(upgradeSite, 'upgrade', priority);
        this.upgraders = this.creeps(UpgraderSetup.role);
        this.upgradeSite = upgradeSite;
        // if (this.room.name == 'E13S44') {
        // 	this.boosts[UpgraderSetup.role] = [
        // 		boostResources.upgrade[3]
        // 	];
        // }
    }
    init() {
        let upgradePower = _.sum(_.map(this.lifetimeFilter(this.upgraders), creep => creep.getActiveBodyparts(WORK)));
        if (upgradePower < this.upgradeSite.upgradePowerNeeded) {
            let workPartsPerUpgraderUnit = 3; // TODO: Hard-coded
            let upgraderSize = Math.ceil(this.upgradeSite.upgradePowerNeeded / workPartsPerUpgraderUnit);
            this.requestCreep(new UpgraderSetup(upgraderSize));
        }
        this.creepReport(UpgraderSetup.role, upgradePower, this.upgradeSite.upgradePowerNeeded);
        this.requestBoosts();
    }
    handleUpgrader(upgrader) {
        if (upgrader.carry.energy > 0) {
            // Repair link
            if (this.upgradeSite.link && this.upgradeSite.link.hits < this.upgradeSite.link.hitsMax) {
                upgrader.task = Tasks.repair(this.upgradeSite.link);
                return;
            }
            // Repair container
            if (this.upgradeSite.battery && this.upgradeSite.battery.hits < this.upgradeSite.battery.hitsMax) {
                upgrader.task = Tasks.repair(this.upgradeSite.battery);
                return;
            }
            // Build construction site
            if (this.upgradeSite.inputConstructionSite) {
                upgrader.task = Tasks.build(this.upgradeSite.inputConstructionSite);
                return;
            }
            // Sign controller if needed
            if (!this.upgradeSite.controller.signedByMe &&
                !this.upgradeSite.controller.signedByScreeps) {
                upgrader.task = Tasks.signController(this.upgradeSite.controller);
                return;
            }
            upgrader.task = Tasks.upgrade(this.upgradeSite.controller);
        }
        else {
            // Recharge from link or battery
            if (this.upgradeSite.link && this.upgradeSite.link.energy > 0) {
                upgrader.task = Tasks.withdraw(this.upgradeSite.link);
            }
            else if (this.upgradeSite.battery && this.upgradeSite.battery.energy > 0) {
                upgrader.task = Tasks.withdraw(this.upgradeSite.battery);
            }
            // Find somewhere else to recharge from
            else {
                let rechargeTargets = _.filter(_.compact([this.colony.storage,
                    this.colony.terminal,
                    ..._.map(this.colony.miningSites, site => site.output),
                    ...this.colony.tombstones]), s => s.energy > 0);
                let target = lodash_minby(rechargeTargets, (s) => Pathing.distance(this.upgradeSite.pos, s.pos));
                if (target)
                    upgrader.task = Tasks.withdraw(target);
            }
        }
    }
    run() {
        for (let upgrader of this.upgraders) {
            if (upgrader.isIdle) {
                if (upgrader.needsBoosts) {
                    this.handleBoosting(upgrader);
                }
                else {
                    this.handleUpgrader(upgrader);
                }
            }
            upgrader.run();
        }
    }
};
UpgradingOverlord = __decorate([
    profile
], UpgradingOverlord);

// Prioritized list of what order structures should be built in
const BuildPriorities = [
    STRUCTURE_SPAWN,
    STRUCTURE_CONTAINER,
    STRUCTURE_TOWER,
    STRUCTURE_EXTENSION,
    STRUCTURE_STORAGE,
    STRUCTURE_TERMINAL,
    STRUCTURE_LINK,
    STRUCTURE_EXTRACTOR,
    STRUCTURE_LAB,
    STRUCTURE_NUKER,
    STRUCTURE_OBSERVER,
    STRUCTURE_POWER_SPAWN,
    STRUCTURE_WALL,
    STRUCTURE_RAMPART,
    STRUCTURE_ROAD,
];
// Prioritized list of what order enemy structures should be attacked in
const AttackStructurePriorities = [
    STRUCTURE_SPAWN,
    STRUCTURE_TOWER,
    STRUCTURE_EXTENSION,
    STRUCTURE_LINK,
    STRUCTURE_LAB,
    STRUCTURE_NUKER,
    STRUCTURE_OBSERVER,
    STRUCTURE_EXTRACTOR,
    STRUCTURE_POWER_SPAWN,
    STRUCTURE_CONTAINER,
    STRUCTURE_ROAD,
    STRUCTURE_STORAGE,
    STRUCTURE_TERMINAL,
    STRUCTURE_RAMPART,
    STRUCTURE_WALL,
];

const WorkerSetup = new CreepSetup('worker', {
    pattern: [WORK, CARRY, MOVE],
    sizeLimit: Infinity,
});
const WorkerEarlySetup = new CreepSetup('worker', {
    pattern: [WORK, CARRY, MOVE, MOVE],
    sizeLimit: Infinity,
});
let WorkerOverlord = WorkerOverlord_1 = class WorkerOverlord extends Overlord {
    constructor(colony, priority = OverlordPriority.ownedRoom.work) {
        super(colony, 'worker', priority);
        this.workers = this.creeps(WorkerSetup.role);
        this.rechargeObjects = _.compact([this.colony.storage,
            this.colony.terminal,
            this.colony.upgradeSite.battery,
            ..._.map(this.colony.miningSites, site => site.output),
            ..._.filter(this.colony.tombstones, ts => ts.store.energy > 0)]);
        if (this.colony.hatchery && this.colony.hatchery.battery) {
            this.rechargeObjects.push(this.colony.hatchery.battery);
        }
        // Fortification structures
        this.fortifyStructures = _.sortBy(_.filter(this.room.barriers, s => s.hits < WorkerOverlord_1.settings.barrierHits[this.colony.level]), s => s.hits);
        // Generate a list of structures needing repairing (different from fortifying except in critical case)
        this.repairStructures = _.filter(this.colony.repairables, function (structure) {
            if (structure.structureType == STRUCTURE_CONTAINER) {
                return structure.hits < 0.5 * structure.hitsMax;
            }
            else {
                return structure.hits < structure.hitsMax;
            }
        });
        let criticalHits = 1000; // Fortifying changes to repair status at this point
        let criticalBarriers = _.filter(this.fortifyStructures, s => s.hits <= criticalHits);
        this.repairStructures = this.repairStructures.concat(criticalBarriers);
        this.dismantleStructures = [];
        let homeRoomName = this.colony.room.name;
        let defcon = this.colony.defcon;
        // Filter constructionSites to only build valid ones
        let roomStructureAmounts = _.mapValues(this.colony.room.structures, s => s.length);
        let level = this.colony.controller.level;
        this.constructionSites = _.filter(this.colony.constructionSites, function (site) {
            // If site will be more than max amount of a structure at current level, ignore (happens after downgrade)
            if (roomStructureAmounts[site.structureType] + 1 > CONTROLLER_STRUCTURES[site.structureType][level]) {
                return false;
            }
            if (defcon > DEFCON.safe) {
                // Only build non-road, non-container sites in the home room if defcon is unsafe
                return site.pos.roomName == homeRoomName &&
                    site.structureType != STRUCTURE_CONTAINER &&
                    site.structureType != STRUCTURE_ROAD;
            }
            else {
                // Build all non-container sites in outpost and all sites in room if defcon is safe
                if (site.pos.roomName != homeRoomName) {
                    return site.structureType != STRUCTURE_CONTAINER &&
                        !(site.room && site.room.dangerousHostiles.length > 0);
                }
                else {
                    return true;
                }
            }
        });
        // Nuke defense response
        // this.nukeDefenseSites = _.filter(this.colony.room.constructionSites,
        // 								 site => site.pos.findInRange(FIND_NUKES, 3).length > 0);
        // let nukeRamparts = _.filter(this.colony.room.ramparts,
        // 							rampart => rampart.pos.findInRange(FIND_NUKES, 3).length > 0);
        // Nuke defense ramparts needing fortification
        this.nukeDefenseRamparts = _.filter(this.colony.room.ramparts, function (rampart) {
            if (rampart.pos.lookFor(LOOK_NUKES).length > 0) {
                return rampart.hits < 10000000 + 10000;
            }
            else if (rampart.pos.findInRange(FIND_NUKES, 3).length > 0) {
                return rampart.hits < 5000000 + 10000;
            }
            else {
                return false;
            }
        });
    }
    init() {
        // In case colony just started up, don't spawn workers until colony has something you can withdraw from
        if (_.compact(_.map(this.colony.miningSites, site => site.output)).length == 0) {
            return;
        }
        let setup = this.colony.stage == ColonyStage.Larva ? WorkerEarlySetup : WorkerSetup;
        let workPartsPerWorker = _.filter(this.generateProtoCreep(setup).body, part => part == WORK).length;
        if (this.colony.stage == ColonyStage.Larva) {
            // At lower levels, try to saturate the energy throughput of the colony
            const MAX_WORKERS = 7; // Maximum number of workers to spawn
            let energyPerTick = _.sum(_.map(this.colony.miningSites, site => site.energyPerTick));
            let energyPerTickPerWorker = 1.1 * workPartsPerWorker; // Average energy per tick when workers are working
            let workerUptime = 0.8;
            let numWorkers = Math.ceil(energyPerTick / (energyPerTickPerWorker * workerUptime));
            this.wishlist(Math.min(numWorkers, MAX_WORKERS), setup);
        }
        else {
            // At higher levels, spawn workers based on construction and repair that needs to be done
            const MAX_WORKERS = 4; // Maximum number of workers to spawn
            let constructionTicks = _.sum(_.map(this.colony.constructionSites, site => Math.max(site.progressTotal - site.progress, 0)))
                / BUILD_POWER; // Math.max for if you manually set progress on private server
            let repairTicks = _.sum(_.map(this.repairStructures, structure => structure.hitsMax - structure.hits)) / REPAIR_POWER;
            let fortifyTicks = 0.25 * _.sum(_.map(this.fortifyStructures, barrier => WorkerOverlord_1.settings.barrierHits[this.colony.level]
                - barrier.hits)) / REPAIR_POWER;
            if (this.colony.storage.energy < 500000) {
                fortifyTicks = 0; // Ignore fortification duties below this energy level
            }
            let numWorkers = Math.ceil(2 * (constructionTicks + repairTicks + fortifyTicks) /
                (workPartsPerWorker * CREEP_LIFE_TIME));
            this.wishlist(Math.min(numWorkers, MAX_WORKERS), setup);
        }
    }
    repairActions(worker) {
        let target = worker.pos.findClosestByMultiRoomRange(this.repairStructures);
        if (target)
            worker.task = Tasks.repair(target);
    }
    buildActions(worker) {
        let groupedSites = _.groupBy(this.constructionSites, site => site.structureType);
        for (let structureType of BuildPriorities) {
            if (groupedSites[structureType]) {
                let target = worker.pos.findClosestByMultiRoomRange(groupedSites[structureType]);
                if (target) {
                    // Fixes issue #9 - workers freeze if creep sitting on square
                    if (target.pos.lookFor(LOOK_CREEPS).length > 0) {
                        let zerg = Game.zerg[_.first(target.pos.lookFor(LOOK_CREEPS)).name];
                        if (zerg)
                            zerg.moveOffCurrentPos();
                        worker.say('move pls');
                    }
                    worker.task = Tasks.build(target);
                    return;
                }
            }
        }
    }
    dismantleActions(worker) {
        let targets = _.filter(this.dismantleStructures, s => (s.targetedBy || []).length < 3);
        let target = worker.pos.findClosestByMultiRoomRange(targets);
        if (target) {
            _.remove(this.dismantleStructures, s => s == target);
            worker.task = Tasks.dismantle(target);
        }
    }
    pavingActions(worker) {
        let roomToRepave = this.colony.roadLogistics.workerShouldRepave(worker);
        this.colony.roadLogistics.registerWorkerAssignment(worker, roomToRepave);
        let target = worker.pos.findClosestByMultiRoomRange(this.colony.roadLogistics.repairableRoads(roomToRepave));
        if (target)
            worker.task = Tasks.repair(target);
    }
    fortifyActions(worker, fortifyStructures = this.fortifyStructures) {
        let lowBarriers;
        let highestBarrierHits = _.max(_.map(fortifyStructures, structure => structure.hits));
        if (highestBarrierHits > WorkerOverlord_1.settings.barrierLowHighHits) {
            // At high barrier HP, fortify only structures that are within a threshold of the lowest
            let lowestBarrierHits = _.min(_.map(fortifyStructures, structure => structure.hits));
            lowBarriers = _.filter(fortifyStructures, structure => structure.hits < lowestBarrierHits +
                WorkerOverlord_1.settings.barrierLowHighHits);
        }
        else {
            // Otherwise fortify the lowest N structures
            let numBarriersToConsider = 5; // Choose the closest barrier of the N barriers with lowest hits
            lowBarriers = _.take(fortifyStructures, numBarriersToConsider);
        }
        let target = worker.pos.findClosestByMultiRoomRange(lowBarriers);
        if (target)
            worker.task = Tasks.fortify(target);
    }
    upgradeActions(worker) {
        // Sign controller if needed
        if ((!this.colony.controller.signedByMe && !this.colony.controller.signedByScreeps)) { // <DO-NOT-MODIFY>
            worker.task = Tasks.signController(this.colony.controller); // <DO-NOT-MODIFY>
            return;
        }
        worker.task = Tasks.upgrade(this.room.controller);
    }
    rechargeActions(worker) {
        let workerWithdrawLimit = this.colony.stage == ColonyStage.Larva ? 750 : 100;
        let rechargeTargets = _.filter(this.rechargeObjects, s => s instanceof Tombstone ||
            s.energy > workerWithdrawLimit);
        let target = worker.pos.findClosestByMultiRoomRange(rechargeTargets);
        if (target) {
            worker.task = Tasks.withdraw(target);
        }
        else {
            // Harvest from a source if there is no recharge target available
            let availableSources = _.filter(this.room.sources, s => s.energy > 0 && s.pos.availableNeighbors().length > 0);
            let target = worker.pos.findClosestByMultiRoomRange(availableSources);
            if (target)
                worker.task = Tasks.harvest(target);
        }
    }
    handleWorker(worker) {
        if (worker.carry.energy > 0) {
            // Upgrade controller if close to downgrade
            if (this.colony.controller.ticksToDowngrade <= 1000) {
                this.upgradeActions(worker);
            }
            // Repair damaged non-road non-barrier structures
            else if (this.repairStructures.length > 0) {
                this.repairActions(worker);
            }
            // Build new structures
            else if (this.constructionSites.length > 0) {
                this.buildActions(worker);
            }
            // Build ramparts to block incoming nuke
            else if (this.nukeDefenseRamparts.length > 0) {
                this.fortifyActions(worker, this.nukeDefenseRamparts);
            }
            // Build and maintain roads
            else if (this.colony.roadLogistics.workerShouldRepave(worker) && this.colony.defcon == DEFCON.safe) {
                this.pavingActions(worker);
            }
            // Dismantle marked structures
            else if (this.dismantleStructures.length > 0 && this.colony.defcon == DEFCON.safe) {
                this.dismantleActions(worker);
            }
            // Fortify walls and ramparts
            else if (this.fortifyStructures.length > 0) {
                this.fortifyActions(worker);
            }
            // Upgrade controller if less than RCL8 or no upgraders
            else if (this.colony.level < 8 || this.colony.upgradeSite.overlord.upgraders.length == 0) {
                this.upgradeActions(worker);
            }
        }
        else {
            // Acquire more energy
            this.rechargeActions(worker);
        }
    }
    run() {
        for (let worker of this.workers) {
            if (worker.isIdle) {
                this.handleWorker(worker);
            }
            worker.run();
        }
    }
};
WorkerOverlord.settings = {
    barrierHits: {
        1: 3000,
        2: 3000,
        3: 3000,
        4: 10000,
        5: 100000,
        6: 1000000,
        7: 10000000,
        8: 30000000,
    },
    barrierLowHighHits: 100000,
};
WorkerOverlord = WorkerOverlord_1 = __decorate([
    profile
], WorkerOverlord);
var WorkerOverlord_1;

// Upgrade site for grouping relevant components for an upgrader station
let UpgradeSite = UpgradeSite_1 = class UpgradeSite extends HiveCluster {
    constructor(colony, controller) {
        super(colony, controller, 'upgradeSite');
        this.controller = controller;
        // Register bettery
        let allowableContainers = _.filter(this.room.containers, container => container.pos.findInRange(FIND_SOURCES, 1).length == 0); // only count containers that aren't near sources
        this.battery = this.pos.findClosestByLimitedRange(allowableContainers, 3);
        // Register link
        // let allowableLinks = _.filter(this.colony.links, link => link.pos.findInRange(FIND_SOURCES, 2).length == 0);
        this.link = this.pos.findClosestByLimitedRange(colony.availableLinks, 4);
        this.colony.linkNetwork.claimLink(this.link);
        // Register input construction sites
        let nearbyInputSites = this.pos.findInRange(this.room.constructionSites, 4, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER ||
                s.structureType == STRUCTURE_LINK,
        });
        this.inputConstructionSite = nearbyInputSites[0];
        if (this.batteryPos) {
            this.colony.destinations.push(this.batteryPos);
        }
        // Register overlord
        this.overlord = new UpgradingOverlord(this);
        // Energy per tick is sum of upgrader body parts and nearby worker body parts
        this.energyPerTick = (_.sum(_.map(this.overlord.upgraders, upgrader => upgrader.getActiveBodyparts(WORK))) +
            _.sum(_.map(_.filter(this.colony.getCreepsByRole(WorkerSetup.role), worker => worker.pos.inRangeTo((this.link || this.battery || this).pos, 2)), worker => worker.getActiveBodyparts(WORK))));
        // Compute stats
        this.stats();
    }
    get memory() {
        return Mem.wrap(this.colony.memory, 'upgradeSite');
    }
    get upgradePowerNeeded() {
        if (this.room.storage) { // Workers perform upgrading until storage is set up
            let amountOver = Math.max(this.room.storage.energy - UpgradeSite_1.settings.storageBuffer, 0);
            let upgradePower = 1 + Math.floor(amountOver / UpgradeSite_1.settings.energyPerBodyUnit);
            if (amountOver > 500000) {
                upgradePower *= 2; // double upgrade power if we have lots of surplus energy
            }
            if (this.controller.level == 8) {
                upgradePower = Math.min(upgradePower, 15); // don't go above 15 work parts at RCL 8
            }
            return upgradePower;
        }
        else {
            return 0;
        }
    }
    init() {
        // Register energy requests
        if (this.link && this.link.energy < UpgradeSite_1.settings.linksRequestBelow) {
            this.colony.linkNetwork.requestReceive(this.link);
        }
        let inThreshold = this.colony.stage > ColonyStage.Larva ? 0.5 : 0.75;
        if (this.battery) {
            if (this.battery.energy < inThreshold * this.battery.storeCapacity) {
                this.colony.logisticsNetwork.requestInput(this.battery, { dAmountdt: this.energyPerTick });
            }
            if (hasMinerals(this.battery.store)) { // get rid of any minerals in the container if present
                this.colony.logisticsNetwork.requestOutputMinerals(this.battery);
            }
        }
    }
    /* Calculate where the input will be built for this site */
    calculateBatteryPos() {
        let originPos = undefined;
        if (this.colony.storage) {
            originPos = this.colony.storage.pos;
        }
        else if (this.colony.roomPlanner.storagePos) {
            originPos = this.colony.roomPlanner.storagePos;
        }
        else {
            return;
        }
        // Find all positions at range 2 from controller
        let inputLocations = [];
        for (let dx of [-2, -1, 0, 1, 2]) {
            for (let dy of [-2, -1, 0, 1, 2]) {
                if ((dx == -2 || dx == 2) || (dy == -2 || dy == 2)) {
                    let x = this.pos.x + dx;
                    let y = this.pos.y + dy;
                    if (1 <= x && x <= 49 && 1 <= y && y <= 49) { // Don't use edges or invalid room positions
                        let pos = new RoomPosition(x, y, this.pos.roomName);
                        if (pos.isPassible(true)) {
                            inputLocations.push(pos);
                        }
                    }
                }
            }
        }
        // Try to find locations where there is maximal standing room
        let maxNeighbors = _.max(_.map(inputLocations, pos => pos.availableNeighbors(true).length));
        inputLocations = _.filter(inputLocations, pos => pos.availableNeighbors(true).length >= maxNeighbors);
        // Return location closest to storage by path
        let inputPos = originPos.findClosestByPath(inputLocations);
        if (inputPos) {
            this.memory.input = { pos: inputPos, tick: Game.time };
            return inputPos;
        }
    }
    /* Calculate where the link will be built for this site */
    calculateLinkPos() {
        let originPos = undefined;
        if (this.colony.storage) {
            originPos = this.colony.storage.pos;
        }
        else if (this.colony.roomPlanner.storagePos) {
            originPos = this.colony.roomPlanner.storagePos;
        }
        if (originPos && this.batteryPos) {
            // Build link at last location on path from origin to battery
            let path = Pathing.findShortestPath(this.batteryPos, originPos).path;
            return path[0];
        }
    }
    get batteryPos() {
        if (this.battery) {
            return this.battery.pos;
        }
        else if (this.inputConstructionSite) {
            return this.inputConstructionSite.pos;
        }
        else {
            // Recalculate the input position or pull from memory if recent enough
            if (!this._batteryPos) {
                if (this.memory.input && Game.time - this.memory.input.tick < 100) {
                    this._batteryPos = derefRoomPosition(this.memory.input.pos);
                }
                else {
                    this._batteryPos = this.calculateBatteryPos();
                    if (!this._batteryPos && Game.time % 25 == 0) {
                        log.alert(`Upgrade site at ${this.pos.print}: no room plan set; ` +
                            `cannot determine battery position!`);
                    }
                }
            }
            return this._batteryPos;
        }
    }
    /* Build a container output at the optimal location */
    buildBatteryIfMissing() {
        if (!this.battery && !this.inputConstructionSite) {
            let buildHere = this.batteryPos;
            if (buildHere) {
                let result = buildHere.createConstructionSite(STRUCTURE_CONTAINER);
                if (result == OK) {
                    return;
                }
                else {
                    log.warning(`Upgrade site at ${this.pos.print}: cannot build battery! Result: ${result}`);
                }
            }
        }
    }
    /* Build an input link at the optimal location */
    buildLinkIfMissing() {
        if (!this.colony.storage ||
            Pathing.distance(this.pos, this.colony.storage.pos) < UpgradeSite_1.settings.minLinkDistance) {
            return;
        }
        let numLinks = this.colony.links.length +
            _.filter(this.colony.constructionSites, site => site.structureType == STRUCTURE_LINK).length;
        let numLinksAllowed = CONTROLLER_STRUCTURES.link[this.colony.level];
        // Proceed if you don't have a link or one being built and there are extra links that can be built
        if (!this.link && !this.inputConstructionSite && numLinksAllowed > numLinks) {
            let clustersHaveLinks = (!!this.colony.hatchery && !!this.colony.hatchery.link &&
                !!this.colony.commandCenter && !!this.colony.commandCenter.link);
            let miningSitesInRoom = _.map(this.room.sources, s => this.colony.miningSites[s.id]);
            let farSites = _.filter(miningSitesInRoom, site => Pathing.distance(this.colony.storage.pos, site.pos) > MiningSite.settings.minLinkDistance);
            let sitesHaveLinks = _.every(farSites, site => site.output instanceof StructureLink);
            // Proceed if all mining sites have links if needed and all clusters have links
            if (clustersHaveLinks && sitesHaveLinks) {
                let buildHere = this.calculateLinkPos();
                if (buildHere) {
                    let result = buildHere.createConstructionSite(STRUCTURE_LINK);
                    if (result != OK) {
                        log.warning(`Upgrade site at ${this.pos.print}: cannot build link! Result: ${result}`);
                    }
                }
            }
        }
    }
    stats() {
        let defaults = {
            downtime: 0,
        };
        if (!this.memory.stats)
            this.memory.stats = defaults;
        _.defaults(this.memory.stats, defaults);
        // Compute downtime
        this.memory.stats.downtime = (this.memory.stats.downtime * (CREEP_LIFE_TIME - 1) +
            (this.battery ? +this.battery.isEmpty : 0)) / CREEP_LIFE_TIME;
        Stats.log(`colonies.${this.colony.name}.upgradeSite.downtime`, this.memory.stats.downtime);
    }
    run() {
        if (Game.time % 25 == 7) {
            this.buildBatteryIfMissing();
        }
        else if (Game.time % 25 == 8) {
            this.buildLinkIfMissing();
        }
    }
    visuals() {
        let info = [];
        if (this.controller.level != 8) {
            let progress = `${Math.floor(this.controller.progress / 1000)}K`;
            let progressTotal = `${Math.floor(this.controller.progressTotal / 1000)}K`;
            let percent = `${Math.floor(100 * this.controller.progress / this.controller.progressTotal)}`;
            info.push(`Progress: ${progress}/${progressTotal} (${percent}%)`);
        }
        info.push(`Downtime: ${this.memory.stats.downtime.toPercent()}`);
        Visualizer.showInfo(info, this);
    }
};
UpgradeSite.settings = {
    storageBuffer: 100000,
    energyPerBodyUnit: 25000,
    minLinkDistance: 10,
    linksRequestBelow: 200,
};
UpgradeSite = UpgradeSite_1 = __decorate([
    profile
], UpgradeSite);
var UpgradeSite_1;

let DirectiveTargetSiege = class DirectiveTargetSiege extends Directive {
    constructor(flag) {
        super(flag);
    }
    getTarget() {
        let targetedStructures = this.pos.lookFor(LOOK_STRUCTURES);
        for (let structure of targetedStructures) {
            for (let structureType of AttackStructurePriorities) {
                if (structure.structureType == structureType) {
                    return structure;
                }
            }
        }
    }
    init() {
    }
    run() {
        // Remove the directive once structures have been destroyed
        if (this.pos.isVisible && !this.getTarget()) {
            this.remove();
        }
    }
    visuals() {
        Visualizer.marker(this.pos, { color: 'orange' });
    }
};
DirectiveTargetSiege.directiveName = 'target:siege';
DirectiveTargetSiege.color = COLOR_GREY;
DirectiveTargetSiege.secondaryColor = COLOR_ORANGE;
DirectiveTargetSiege = __decorate([
    profile
], DirectiveTargetSiege);

let CombatOverlord = class CombatOverlord extends Overlord {
    constructor(directive, name, priority) {
        super(directive, name, priority);
        this.directive = directive;
        this.moveOpts = {
            allowSK: true,
        };
    }
    pairwiseMove(leader, follower, target, opts = this.moveOpts, allowedRange = 1) {
        let outcome;
        if (leader.room != follower.room) {
            if (leader.pos.rangeToEdge == 0) {
                // Leader should move off of exit tiles while waiting for follower
                outcome = leader.travelTo(target, opts);
            }
            follower.travelTo(leader);
            return outcome;
        }
        let range = leader.pos.getRangeTo(follower);
        if (range > allowedRange) {
            // If leader is farther than max allowed range, allow follower to catch up
            if (follower.pos.rangeToEdge == 0 && follower.room == leader.room) {
                follower.moveOffExitToward(leader.pos);
            }
            else {
                follower.travelTo(leader, { stuckValue: 1 });
            }
        }
        else if (follower.fatigue == 0) {
            // Leader should move if follower can also move this tick
            outcome = leader.travelTo(target, opts);
            if (range == 1) {
                follower.move(follower.pos.getDirectionTo(leader));
            }
            else {
                follower.travelTo(leader, { stuckValue: 1 });
            }
        }
        return outcome;
    }
    findPartner(zerg, partners, tickDifference = 600) {
        if (zerg.memory.partner) {
            let partner = _.find(partners, partner => partner.name == zerg.memory.partner);
            if (partner) {
                return partner;
            }
            else {
                delete zerg.memory.partner;
                this.findPartner(zerg, partners, tickDifference);
            }
        }
        else {
            let partner = _.find(partners, partner => partner.memory.partner == zerg.name);
            if (!partner) {
                partner = _(partners)
                    .filter(partner => !partner.memory.partner && !partner.spawning &&
                    Math.abs(zerg.ticksToLive - partner.ticksToLive) <= tickDifference)
                    .min(partner => Math.abs(zerg.ticksToLive - partner.ticksToLive));
            }
            if (_.isObject(partner)) {
                zerg.memory.partner = partner.name;
                partner.memory.partner = zerg.name;
                return partner;
            }
        }
    }
    findClosestHostile(zerg, checkReachable = false, ignoreCreepsAtEdge = true) {
        if (zerg.room.hostiles.length > 0) {
            let targets;
            if (ignoreCreepsAtEdge) {
                targets = _.filter(zerg.room.hostiles, hostile => hostile.pos.rangeToEdge > 0);
            }
            else {
                targets = zerg.room.hostiles;
            }
            if (checkReachable) {
                let targetsByRange = _.sortBy(targets, target => zerg.pos.getRangeTo(target));
                return _.find(targetsByRange, target => Pathing.isReachable(zerg.pos, target.pos));
            }
            else {
                return zerg.pos.findClosestByRange(targets);
            }
        }
    }
    /* This method is expensive */
    findClosestReachable(pos, targets) {
        let targetsByRange = _.sortBy(targets, target => pos.getRangeTo(target));
        return _.find(targetsByRange, target => Pathing.isReachable(pos, target.pos));
    }
    findClosestPrioritizedStructure(zerg, checkReachable = false) {
        for (let structureType of AttackStructurePriorities) {
            let structures = _.filter(zerg.room.hostileStructures, s => s.structureType == structureType);
            if (structures.length == 0)
                continue;
            if (checkReachable) {
                let closestReachable = this.findClosestReachable(zerg.pos, structures);
                if (closestReachable)
                    return closestReachable;
            }
            else {
                return zerg.pos.findClosestByRange(structures);
            }
        }
    }
    findClosestHurtFriendly(healer) {
        return healer.pos.findClosestByRange(_.filter(healer.room.creeps, creep => creep.hits < creep.hitsMax));
    }
    /* Move to and heal/rangedHeal the specified target */
    medicActions(healer) {
        let target = this.findClosestHurtFriendly(healer);
        if (target) {
            // Approach the target
            let range = healer.pos.getRangeTo(target);
            if (range > 1) {
                healer.travelTo(target, { movingTarget: true });
            }
            // Heal or ranged-heal the target
            if (range <= 1) {
                healer.heal(target);
            }
            else if (range <= 3) {
                healer.rangedHeal(target);
            }
        }
        else {
            healer.park();
        }
    }
    healSelfIfPossible(zerg) {
        // Heal yourself if it won't interfere with attacking
        if (zerg.hits < zerg.hitsMax && zerg.canExecute('heal')) {
            return zerg.heal(zerg);
        }
    }
    /* Attack and chase the specified target */
    attackAndChase(zerg, target) {
        let ret;
        // Attack the target if you can, else move to get in range
        if (zerg.pos.isNearTo(target)) {
            ret = zerg.attack(target);
            // Move in the direction of the creep to prevent it from running away
            zerg.move(zerg.pos.getDirectionTo(target));
            return ret;
        }
        else {
            if (target instanceof Creep) {
                zerg.travelTo(target, _.merge(this.moveOpts, { movingTarget: true }));
            }
            else {
                zerg.travelTo(target, this.moveOpts);
            }
            return ERR_NOT_IN_RANGE;
        }
    }
    /* Fallback is a location on the other side of the nearest exit the directive is placed at */
    get fallback() {
        let { x, y, roomName } = this.directive.pos;
        let rangesToExit = [[x, 'left'], [49 - x, 'right'], [y, 'top'], [49 - y, 'bottom']];
        let [range, direction] = _.first(_.sortBy(rangesToExit, pair => pair[0]));
        switch (direction) {
            case 'left':
                x = 48;
                roomName = WorldMap.findRelativeRoomName(roomName, -1, 0);
                break;
            case 'right':
                x = 1;
                roomName = WorldMap.findRelativeRoomName(roomName, 1, 0);
                break;
            case 'top':
                y = 48;
                roomName = WorldMap.findRelativeRoomName(roomName, 0, -1);
                break;
            case 'bottom':
                y = 1;
                roomName = WorldMap.findRelativeRoomName(roomName, 0, 1);
                break;
            default:
                log.error('Error getting fallback position!');
                break;
        }
        return new RoomPosition(x, y, roomName);
    }
};
CombatOverlord = __decorate([
    profile
], CombatOverlord);

const HaulerSetup = new CreepSetup('hauler', {
    pattern: [CARRY, MOVE],
    sizeLimit: Infinity,
});
class HaulingOverlord extends Overlord {
    constructor(directive, priority = directive.hasDrops ? OverlordPriority.collectionUrgent.haul :
        OverlordPriority.collection.haul) {
        super(directive, 'haul', priority);
        this.directive = directive;
        this.haulers = this.creeps(HaulerSetup.role);
    }
    init() {
        if (!this.colony.storage || _.sum(this.colony.storage.store) > Energetics.settings.storage.total.cap) {
            return;
        }
        // Spawn a number of haulers sufficient to move all resources within a lifetime, up to a max
        let MAX_HAULERS = 5;
        // Calculate total needed amount of hauling power as (resource amount * trip distance)
        let tripDistance = 2 * Pathing.distance((this.colony.storage || this.colony).pos, this.directive.pos);
        let haulingPowerNeeded = Math.min(this.directive.totalResources, this.colony.storage.storeCapacity - _.sum(this.colony.storage.store)) * tripDistance;
        // Calculate amount of hauling each hauler provides in a lifetime
        let haulerCarryParts = _.filter(this.generateProtoCreep(HaulerSetup).body, part => part == CARRY).length;
        let haulingPowerPerLifetime = CREEP_LIFE_TIME * haulerCarryParts * CARRY_CAPACITY;
        // Calculate number of haulers
        let numHaulers = Math.min(Math.ceil(haulingPowerNeeded / haulingPowerPerLifetime), MAX_HAULERS);
        // Request the haulers
        this.wishlist(numHaulers, HaulerSetup);
    }
    handleHauler(hauler) {
        if (_.sum(hauler.carry) == 0) {
            // Travel to directive and collect resources
            if (hauler.inSameRoomAs(this.directive)) {
                // Pick up drops first
                if (this.directive.hasDrops) {
                    let allDrops = _.flatten(_.values(this.directive.drops));
                    let drop = allDrops[0];
                    if (drop) {
                        hauler.task = Tasks.pickup(drop);
                        return;
                    }
                }
                // Withdraw from store structure
                if (this.directive.storeStructure) {
                    let store = {};
                    if (isStoreStructure(this.directive.storeStructure)) {
                        store = this.directive.storeStructure.store;
                    }
                    else {
                        store = { 'energy': this.directive.storeStructure.energy };
                    }
                    for (let resourceType in store) {
                        if (store[resourceType] > 0) {
                            hauler.task = Tasks.withdraw(this.directive.storeStructure, resourceType);
                            return;
                        }
                    }
                }
                // Shouldn't reach here
                log.warning(`${hauler.name} in ${hauler.room.print}: nothing to collect!`);
            }
            else {
                // hauler.task = Tasks.goTo(this.directive);
                hauler.travelTo(this.directive);
            }
        }
        else {
            // Travel to colony room and deposit resources
            if (hauler.inSameRoomAs(this.colony)) {
                // Put energy in storage and minerals in terminal if there is one
                for (let resourceType in hauler.carry) {
                    if (hauler.carry[resourceType] == 0)
                        continue;
                    if (resourceType == RESOURCE_ENERGY) { // prefer to put energy in storage
                        if (this.colony.storage && _.sum(this.colony.storage.store) < STORAGE_CAPACITY) {
                            hauler.task = Tasks.transfer(this.colony.storage, resourceType);
                            return;
                        }
                        else if (this.colony.terminal && _.sum(this.colony.terminal.store) < TERMINAL_CAPACITY) {
                            hauler.task = Tasks.transfer(this.colony.terminal, resourceType);
                            return;
                        }
                    }
                    else { // prefer to put minerals in terminal
                        if (this.colony.terminal && _.sum(this.colony.terminal.store) < TERMINAL_CAPACITY) {
                            hauler.task = Tasks.transfer(this.colony.terminal, resourceType);
                            return;
                        }
                        else if (this.colony.storage && _.sum(this.colony.storage.store) < STORAGE_CAPACITY) {
                            hauler.task = Tasks.transfer(this.colony.storage, resourceType);
                            return;
                        }
                    }
                }
                // Shouldn't reach here
                log.warning(`${hauler.name} in ${hauler.room.print}: nowhere to put resources!`);
            }
            else {
                hauler.task = Tasks.goToRoom(this.colony.room.name);
            }
        }
    }
    run() {
        for (let hauler of this.haulers) {
            if (hauler.isIdle) {
                this.handleHauler(hauler);
            }
            hauler.run();
        }
    }
}

// Hauling directive: spawns hauler creeps to move large amounts of resourecs from a location (e.g. draining a storage)
let DirectiveHaul = class DirectiveHaul extends Directive {
    constructor(flag) {
        super(flag);
        this.overlords.haul = new HaulingOverlord(this);
    }
    get targetedBy() {
        return Overmind.cache.targets[this.ref];
    }
    get drops() {
        if (!this.pos.isVisible) {
            return {};
        }
        if (!this._drops) {
            let drops = (this.pos.lookFor(LOOK_RESOURCES) || []);
            this._drops = _.groupBy(drops, drop => drop.resourceType);
        }
        return this._drops;
    }
    get hasDrops() {
        return _.keys(this.drops).length > 0;
    }
    get storeStructure() {
        if (this.pos.isVisible) {
            return this.pos.lookForStructure(STRUCTURE_STORAGE) ||
                this.pos.lookForStructure(STRUCTURE_TERMINAL) ||
                this.pos.lookForStructure(STRUCTURE_NUKER);
        }
        return undefined;
    }
    get store() {
        if (!this._store) {
            // Merge the "storage" of drops with the store of structure
            let store = {};
            if (this.storeStructure) {
                if (isStoreStructure(this.storeStructure)) {
                    store = this.storeStructure.store;
                }
                else {
                    store = { 'energy': this.storeStructure.energy };
                }
            }
            else {
                store = { 'energy': 0 };
            }
            // Merge with drops
            for (let resourceType of _.keys(this.drops)) {
                let totalResourceAmount = _.sum(this.drops[resourceType], drop => drop.amount);
                if (store[resourceType]) {
                    store[resourceType] += totalResourceAmount;
                }
                else {
                    store[resourceType] = totalResourceAmount;
                }
            }
            this._store = store;
        }
        return this._store;
    }
    /* Total amount of resources remaining to be transported; cached into memory in case room loses visibility */
    get totalResources() {
        if (this.pos.isVisible) {
            this.memory.totalResources = _.sum(this.store); // update total amount remaining
        }
        else {
            if (this.memory.totalResources == undefined) {
                return 1000; // pick some non-zero number so that haulers will spawn
            }
        }
        return this.memory.totalResources;
    }
    init() {
    }
    run() {
        if (_.sum(this.store) == 0 && this.pos.isVisible) {
            this.remove();
        }
    }
};
DirectiveHaul.directiveName = 'haul';
DirectiveHaul.color = COLOR_YELLOW;
DirectiveHaul.secondaryColor = COLOR_BLUE;
DirectiveHaul = __decorate([
    profile
], DirectiveHaul);

// Guard overlord: spawns guards as needed to deal with an invasion
const GuardSetup = new CreepSetup('guard', {
    pattern: [TOUGH, MOVE, MOVE, MOVE, MOVE, MOVE, ATTACK, ATTACK, ATTACK, HEAL],
    sizeLimit: 3,
});
let GuardOverlord = class GuardOverlord extends CombatOverlord {
    constructor(directive, priority = OverlordPriority.defense.guard) {
        super(directive, 'guard', priority);
        this.guards = this.creeps(GuardSetup.role);
    }
    // private reassignIdleGuards(): void {
    // 	// Find all idle guards
    // 	let idleGuards = _.filter(this.colony.getCreepsByRole('guard'), (guard: Zerg) => !guard.overlord);
    // 	// Reassign them all to this flag
    // 	for (let guard of idleGuards) {
    // 		guard.overlord = this;
    // 	}
    // 	// Refresh the list of guards
    // 	this.guards = this.creeps('guard');
    // }
    findAttackTarget(guard) {
        let targetingDirectives = DirectiveTargetSiege.find(guard.room.flags);
        let targetedStructures = _.compact(_.map(targetingDirectives, directive => directive.getTarget()));
        if (targetedStructures.length > 0) {
            return guard.pos.findClosestByRange(targetedStructures);
        }
        if (guard.room.hostiles.length > 0) {
            let targets = _.filter(guard.room.hostiles, hostile => hostile.pos.rangeToEdge > 0);
            return guard.pos.findClosestByRange(targets);
        }
        if (guard.room.hostileStructures.length > 0) {
            let haulFlags = _.filter(guard.room.flags, flag => DirectiveHaul.filter(flag));
            if (haulFlags.length == 0) {
                return guard.pos.findClosestByRange(guard.room.hostileStructures);
            }
        }
    }
    /* Attack and chase the specified target */
    combatActions(guard, target) {
        // Attack the target if you can, else move to get in range
        this.attackAndChase(guard, target);
        // Heal yourself if it won't interfere with attacking
        this.healSelfIfPossible(guard);
    }
    handleGuard(guard) {
        if (!guard.inSameRoomAs(this) || guard.pos.isEdge) {
            // Move into the assigned room if there is a guard flag present
            guard.travelTo(this.pos);
        }
        else { // If you're in the assigned room or if there is no assignment, try to attack or heal
            let attackTarget = this.findAttackTarget(guard);
            if (attackTarget) {
                this.combatActions(guard, attackTarget);
            }
            else {
                this.medicActions(guard);
            }
        }
    }
    init() {
        this.reassignIdleCreeps(GuardSetup.role);
        // TODO: figure out how many guards are needed
        this.wishlist(1, GuardSetup);
    }
    run() {
        for (let guard of this.guards) {
            // Run the creep if it has a task given to it by something else; otherwise, proceed with non-task actions
            if (guard.hasValidTask) {
                guard.run();
            }
            else {
                this.handleGuard(guard);
            }
        }
    }
};
GuardOverlord.requiredRCL = 3;
GuardOverlord = __decorate([
    profile
], GuardOverlord);

// Guard swarm overlord: spawns lots of smaller guards to deal with swarm-like attacks or harassments
class EarlyGuardSetup extends CreepSetup {
    constructor() {
        super(EarlyGuardSetup.role, {
            pattern: [MOVE, ATTACK],
            sizeLimit: 2,
        });
    }
}
EarlyGuardSetup.role = 'smolGuard';
let GuardSwarmOverlord = class GuardSwarmOverlord extends CombatOverlord {
    constructor(directive, priority = OverlordPriority.defense.guard) {
        super(directive, 'swarmGuard', priority);
        this.directive = directive;
        this.guards = this.creeps(EarlyGuardSetup.role);
    }
    findAttackTarget(guard) {
        if (guard.room.hostiles.length > 0) {
            let targets = _.filter(guard.room.hostiles, hostile => hostile.pos.rangeToEdge > 0);
            return guard.pos.findClosestByRange(targets);
        }
        if (guard.room.hostileStructures.length > 0) {
            return guard.pos.findClosestByRange(guard.room.hostileStructures);
        }
    }
    handleGuard(guard) {
        if (guard.pos.roomName != this.pos.roomName) { // TODO: make edge-safe
            // Move into the assigned room if there is a guard flag present
            guard.travelTo(this.pos);
        }
        else { // If you're in the assigned room or if there is no assignment, try to attack or heal
            let attackTarget = this.findAttackTarget(guard);
            if (attackTarget) {
                this.attackAndChase(guard, attackTarget);
            }
            else {
                guard.park(this.pos); // Move off-road
            }
        }
    }
    init() {
        if (this.directive.memory.amount) {
            this.wishlist(this.directive.memory.amount, new EarlyGuardSetup());
        }
        else {
            this.wishlist(1, new EarlyGuardSetup());
            if (this.room) {
                let smallHostiles = _.filter(this.room.hostiles, creep => creep.body.length < 10);
                if (smallHostiles.length > 2) {
                    this.wishlist(Math.round(smallHostiles.length), new EarlyGuardSetup());
                }
            }
        }
    }
    run() {
        for (let guard of this.guards) {
            // Run the creep if it has a task given to it by something else; otherwise, proceed with non-task actions
            if (guard.hasValidTask) {
                guard.run();
            }
            else {
                this.handleGuard(guard);
            }
        }
    }
};
GuardSwarmOverlord = __decorate([
    profile
], GuardSwarmOverlord);

let DirectiveGuard = class DirectiveGuard extends Directive {
    constructor(flag) {
        super(flag);
        if (this.colony.level >= GuardOverlord.requiredRCL) {
            this.overlords.guard = new GuardOverlord(this);
            // this.overlords.guardPair = new GuardPairOverlord(this);
        }
        else {
            this.overlords.swarmGuard = new GuardSwarmOverlord(this);
        }
        this.relocateFrequency = 10; // Relocate the flag to follow enemy movement every n ticks
    }
    init() {
    }
    run() {
        // Reloacate the flag
        if (Game.time % this.relocateFrequency == 0) {
            if (this.room && this.room.hostiles[0] && this.room.hostiles[0].pos.rangeToEdge >= 3) {
                this.setPosition(this.room.hostiles[0].pos);
            }
        }
        // If there are no hostiles left in the room...
        if (this.room && this.room.hostiles.length == 0 && this.room.hostileStructures.length == 0) {
            // If everyone's healed up, mark as safe
            if (_.filter(this.room.creeps, creep => creep.hits < creep.hitsMax).length == 0 && !this.memory.safeTick) {
                this.memory.safeTick = Game.time;
            }
            // If has been safe for more than 100 ticks, remove directive
            if (this.memory.safeTick && Game.time - this.memory.safeTick > 100) {
                this.remove();
            }
        }
        else {
            if (this.memory.safeTick) {
                delete this.memory.safeTick;
            }
        }
    }
};
DirectiveGuard.directiveName = 'guard';
DirectiveGuard.color = COLOR_RED;
DirectiveGuard.secondaryColor = COLOR_BLUE;
DirectiveGuard = __decorate([
    profile
], DirectiveGuard);

const EmergencyMinerSetup = new CreepSetup('drone', {
    pattern: [WORK, WORK, CARRY, MOVE],
    sizeLimit: 1,
});
const FillerSetup = new CreepSetup('filler', {
    pattern: [CARRY, CARRY, MOVE],
    sizeLimit: 1,
});
// Bootstrapping overlord: spawns small miners and suppliers to recover from a catastrohpic colony crash
let BootstrappingOverlord = BootstrappingOverlord_1 = class BootstrappingOverlord extends Overlord {
    constructor(directive, priority = OverlordPriority.emergency.bootstrap) {
        super(directive, 'bootstrap', priority);
        this.fillers = this.creeps(FillerSetup.role);
        // Calculate structures fillers can supply / withdraw from
        this.supplyStructures = _.filter([...this.colony.spawns, ...this.colony.extensions], structure => structure.energy < structure.energyCapacity);
        this.withdrawStructures = _.filter(_.compact([this.colony.storage,
            this.colony.terminal,
            this.colony.powerSpawn,
            this.colony.nuker,
            ...this.room.containers,
            ...this.room.links,
            ...this.room.towers,
            ...this.room.labs]), structure => structure.energy > 0);
    }
    spawnBootstrapMiners() {
        // Isolate mining site overlords in the room
        let miningSites = _.map(this.room.sources, source => this.colony.miningSites[source.id]);
        if (this.colony.spawns[0]) {
            miningSites = _.sortBy(miningSites, site => site.pos.getRangeTo(this.colony.spawns[0]));
        }
        let miningOverlords = _.map(miningSites, site => site.overlord);
        // Create a bootstrapMiners and donate them to the miningSite overlords as needed
        for (let overlord of miningOverlords) {
            let filteredMiners = this.lifetimeFilter(overlord.miners);
            let miningPowerAssigned = _.sum(_.map(this.lifetimeFilter(overlord.miners), creep => creep.getActiveBodyparts(WORK)));
            if (miningPowerAssigned < overlord.miningSite.miningPowerNeeded &&
                filteredMiners.length < overlord.miningSite.pos.availableNeighbors().length) {
                let protoCreep = this.generateProtoCreep(EmergencyMinerSetup);
                protoCreep.memory.overlord = overlord.ref; // Donate the miner to the miningSite
                if (this.colony.hatchery) {
                    this.colony.hatchery.enqueue(protoCreep, this.priority);
                }
            }
        }
    }
    init() {
        // At early levels, spawn one miner, then a filler, then the rest of the miners
        if (this.colony.stage == ColonyStage.Larva) {
            if (this.colony.getCreepsByRole(MinerSetup.role).length == 0) {
                this.spawnBootstrapMiners();
                return;
            }
        }
        // Spawn fillers
        this.wishlist(1, FillerSetup);
        // Then spawn the rest of the needed miners
        let energyInStructures = _.sum(_.map(this.withdrawStructures, structure => structure.energy));
        if (energyInStructures < BootstrappingOverlord_1.settings.spawnBootstrapMinerThreshold) {
            this.spawnBootstrapMiners();
        }
    }
    supplyActions(filler) {
        let target = filler.pos.findClosestByRange(this.supplyStructures);
        if (target) {
            filler.task = Tasks.transfer(target);
        }
        else {
            this.rechargeActions(filler);
        }
    }
    rechargeActions(filler) {
        let target = filler.pos.findClosestByRange(this.withdrawStructures);
        if (target)
            filler.task = Tasks.withdraw(target);
    }
    handleFiller(filler) {
        if (filler.carry.energy > 0) {
            this.supplyActions(filler);
        }
        else {
            this.rechargeActions(filler);
        }
    }
    run() {
        for (let filler of this.fillers) {
            if (filler.isIdle) {
                this.handleFiller(filler);
            }
            filler.run();
        }
    }
};
BootstrappingOverlord.settings = {
    spawnBootstrapMinerThreshold: 1000
};
BootstrappingOverlord = BootstrappingOverlord_1 = __decorate([
    profile
], BootstrappingOverlord);
var BootstrappingOverlord_1;

// Emergency directive: recover from a catastrophic room crash
const EMERGENCY_ENERGY_THRESHOLD = 1300;
let DirectiveBootstrap = class DirectiveBootstrap extends Directive {
    constructor(flag) {
        super(flag);
        this.colony.bootstrapping = true;
        this.needsEnergy = this.room.energyAvailable < _.min([EMERGENCY_ENERGY_THRESHOLD,
            this.room.energyCapacityAvailable]);
        this.needsMiner = (this.colony.getCreepsByRole(MinerSetup.role).length == 0);
        this.needsManager = (this.colony.commandCenter != undefined &&
            this.colony.commandCenter.overlord != undefined &&
            this.colony.getCreepsByRole(ManagerSetup.role).length == 0);
        this.needsQueen = (this.colony.getCreepsByRole(QueenSetup.role).length == 0);
        this.overlords.bootstrap = new BootstrappingOverlord(this);
    }
    init() {
        if (Game.time % 100 == 0) {
            log.alert(`Colony ${this.room.print} is in emergency recovery mode.`);
        }
    }
    run() {
        if (!this.needsMiner && !this.needsManager && !this.needsQueen) {
            log.alert(`Colony ${this.room.name} has recovered from crash; removing bootstrap directive.`);
            // Suicide any fillers so they don't get in the way
            let overlord = this.overlords.bootstrap;
            for (let filler of overlord.fillers) {
                filler.suicide();
            }
            // Remove the directive
            this.remove();
        }
    }
};
DirectiveBootstrap.directiveName = 'bootstrap';
DirectiveBootstrap.color = COLOR_ORANGE;
DirectiveBootstrap.secondaryColor = COLOR_ORANGE;
DirectiveBootstrap = __decorate([
    profile
], DirectiveBootstrap);

let DirectiveGuardSwarm = class DirectiveGuardSwarm extends Directive {
    constructor(flag) {
        super(flag);
        this.overlords.guard = new GuardSwarmOverlord(this);
    }
    init() {
    }
    run() {
        // If there are no hostiles left in the room and everyone's healed, then remove the flag
        if (Game.time - this.memory.created > 100 &&
            this.room && this.room.hostiles.length == 0 && this.room.hostileStructures.length == 0) {
            if (_.filter(this.room.creeps, creep => creep.hits < creep.hitsMax).length == 0) {
                this.remove();
            }
        }
    }
};
DirectiveGuardSwarm.directiveName = 'guardSwarm';
DirectiveGuardSwarm.color = COLOR_RED;
DirectiveGuardSwarm.secondaryColor = COLOR_PURPLE;
DirectiveGuardSwarm = __decorate([
    profile
], DirectiveGuardSwarm);

// Combat Intel - provides information related to making combat-related decisions
class CombatIntel {
    constructor(directive) {
        this.directive = directive;
        this.room = directive.room;
        this.colony = directive.colony;
    }
    get memory() {
        return Mem.wrap(this.directive.memory, 'combatIntel', {});
    }
    // Tower damage ====================================================================================================
    /* Get the tower damage at a given range */
    static singleTowerDamage(range) {
        if (range <= TOWER_OPTIMAL_RANGE) {
            return TOWER_POWER_ATTACK;
        }
        range = Math.min(range, TOWER_FALLOFF_RANGE);
        let falloff = (range - TOWER_OPTIMAL_RANGE) / (TOWER_FALLOFF_RANGE - TOWER_OPTIMAL_RANGE);
        return TOWER_POWER_ATTACK * (1 - TOWER_FALLOFF * falloff);
    }
    /* Total tower tamage from all towers in room at a given position */
    static towerDamageAtPos(pos, ignoreEnergy = false) {
        if (pos.room) {
            let expectedDamage = 0;
            for (let tower of pos.room.towers) {
                if (tower.energy > 0 || ignoreEnergy) {
                    expectedDamage += this.singleTowerDamage(pos.getRangeTo(tower));
                }
            }
            return expectedDamage;
        }
    }
    // Cost matrix calculations
    computeCostMatrix() {
        if (this.room) {
            let matrix = new PathFinder.CostMatrix();
            let barriers = this.room.barriers;
            if (barriers.length > 0) {
                let highestHits = _.last(_.sortBy(barriers, barrier => barrier.hits)).hits;
                for (let barrier of barriers) {
                    matrix.set(barrier.pos.x, barrier.pos.y, Math.ceil(barrier.hits * 10 / highestHits) * 10);
                }
            }
            return matrix;
        }
    }
    findBestExit(matrix, towers, spawns) {
        if (!this.room) {
            return;
        }
        let bestExit;
        let destination = this.room.spawns[0] || this.room.storage; // enemy structure you are trying to get to
        if (!destination) {
            return;
        }
        let ret = PathFinder.search(this.colony.pos, { pos: destination.pos, range: 1 }, {
            roomCallback: (roomName) => {
                if (roomName != this.room.name && Traveler.checkAvoid(roomName)) {
                    return false;
                }
                else {
                    return Traveler.getStructureMatrix(Game.rooms[roomName]);
                }
            },
        });
        if (!ret.incomplete) {
            bestExit = _.find(ret.path, p => p.roomName == this.room.name);
        }
        // Figure out possible exits to go from enemy room back to colony in a reasonable amount of time
        let maxRoomDistance = 8;
        let allowedExits = {};
        if (!bestExit) {
            let exitData = Game.map.describeExits(this.room.name);
            for (let direction in exitData) {
                let roomName = exitData[direction];
                let allowedRooms = Traveler.findRoute(this.colony.name, roomName);
                if (allowedRooms && Object.keys(allowedRooms).length <= maxRoomDistance) {
                    allowedExits[direction] = true;
                }
            }
            if (_.keys(allowedExits).length == 0) {
                return;
            }
        }
        // TODO
        let exitPositions = [];
        for (let x = 0; x < 50; x++) {
            for (let y = 0; y < 50; y++) {
                if (x !== 0 && y !== 0 && x !== 49 && y !== 49) {
                    continue;
                }
                if (Game.map.getTerrainAt(x, y, this.room.name) === 'wall') {
                    continue;
                }
                matrix.set(x, y, 0xff);
                if (bestExit) {
                    continue;
                }
                if (allowedExits['1'] && y === 0) {
                    exitPositions.push(new RoomPosition(x, y, this.room.name));
                }
                else if (allowedExits['3'] && x === 49) {
                    exitPositions.push(new RoomPosition(x, y, this.room.name));
                }
                else if (allowedExits['5'] && y === 49) {
                    exitPositions.push(new RoomPosition(x, y, this.room.name));
                }
                else if (allowedExits['7'] && x === 0) {
                    exitPositions.push(new RoomPosition(x, y, this.room.name));
                }
            }
        }
        if (!bestExit) {
            bestExit = _(exitPositions)
                .sortBy((p) => -_.sum(towers, (t) => p.getRangeTo(t)))
                .head();
        }
        matrix.set(bestExit.x, bestExit.y, 1);
        return bestExit;
    }
    // Creep potentials ================================================================================================
    // Heal potential of a single creep in units of effective number of parts
    static getHealPotential(creep) {
        return _.sum(_.map(creep.body, function (part) {
            if (part.type == HEAL) {
                if (!part.boost) {
                    return 1;
                }
                else if (part.boost == boostResources.heal[1]) {
                    return BOOSTS.heal.LO.heal;
                }
                else if (part.boost == boostResources.heal[2]) {
                    return BOOSTS.heal.LHO2.heal;
                }
                else if (part.boost == boostResources.heal[3]) {
                    return BOOSTS.heal.XLHO2.heal;
                }
            }
            return 0;
        }));
    }
    // Attack potential of a single creep in units of effective number of parts
    static getAttackPotential(creep) {
        return _.sum(_.map(creep.body, function (part) {
            if (part.type == ATTACK) {
                if (!part.boost) {
                    return 1;
                }
                else if (part.boost == boostResources.attack[1]) {
                    return BOOSTS.attack.UH.attack;
                }
                else if (part.boost == boostResources.attack[2]) {
                    return BOOSTS.attack.UH2O.attack;
                }
                else if (part.boost == boostResources.attack[3]) {
                    return BOOSTS.attack.XUH2O.attack;
                }
            }
            return 0;
        }));
    }
    // Ranged attack potential of a single creep in units of effective number of parts
    static getRangedAttackPotential(creep) {
        return _.sum(_.map(creep.body, function (part) {
            if (part.type == RANGED_ATTACK) {
                if (!part.boost) {
                    return 1;
                }
                else if (part.boost == boostResources.ranged_attack[1]) {
                    return BOOSTS.ranged_attack.KO.rangedAttack;
                }
                else if (part.boost == boostResources.ranged_attack[2]) {
                    return BOOSTS.ranged_attack.KHO2.rangedAttack;
                }
                else if (part.boost == boostResources.ranged_attack[3]) {
                    return BOOSTS.ranged_attack.XKHO2.rangedAttack;
                }
            }
            return 0;
        }));
    }
    // Minimum damage multiplier a creep has
    static damageTakenMultiplier(creep) {
        return _.min(_.map(creep.body, function (part) {
            if (part.type == TOUGH) {
                if (part.boost == boostResources.tough[1]) {
                    return BOOSTS.tough.GO.damage;
                }
                else if (part.boost == boostResources.tough[2]) {
                    return BOOSTS.tough.GHO2.damage;
                }
                else if (part.boost == boostResources.tough[3]) {
                    return BOOSTS.tough.XGHO2.damage;
                }
            }
            return 1;
        }));
    }
    // Maximum damage that a group of creeps can dish out (doesn't count for simultaneity restrictions)
    static maxDamageByCreeps(creeps) {
        return _.sum(_.map(creeps, creep => ATTACK_POWER * this.getAttackPotential(creep) +
            RANGED_ATTACK_POWER * this.getRangedAttackPotential(creep)));
    }
    // Maximum healing that a group of creeps can dish out (doesn't count for simultaneity restrictions)
    static maxHealingByCreeps(creeps) {
        return _.sum(_.map(creeps, creep => HEAL_POWER * this.getHealPotential(creep)));
    }
    // Maximum damage that is dealable at a given position by enemy forces
    static maxDamageAtPos(pos) {
        if (!pos.room) {
            return 0;
        }
        let hostilesInMeleeRange = _.filter(pos.room.dangerousHostiles, creep => pos.getRangeTo(creep) <= 3);
        let meleeDamage = _.sum(_.map(hostilesInMeleeRange, hostile => ATTACK_POWER * this.getAttackPotential(hostile)));
        let hostilesInRange = _.filter(pos.room.dangerousHostiles, creep => pos.getRangeTo(creep) <= 3);
        let rangedDamage = _.sum(_.map(hostilesInRange, hostile => RANGED_ATTACK_POWER * this.getRangedAttackPotential(hostile)));
        let totalDamage = meleeDamage + rangedDamage;
        if (!pos.room.my) {
            totalDamage += this.towerDamageAtPos(pos) || 0;
        }
        return totalDamage;
    }
    // Heal potential of self and possible healer neighbors
    static maxHostileHealingTo(creep) {
        let selfHealing = HEAL_POWER * this.getHealPotential(creep);
        let neighbors = _.filter(creep.room.hostiles, hostile => hostile.pos.isNearTo(creep));
        let neighborHealing = HEAL_POWER * _.sum(_.map(neighbors, neighbor => this.getHealPotential(neighbor)));
        let rangedHealers = _.filter(creep.room.hostiles, hostile => hostile.pos.getRangeTo(creep) <= 3 &&
            !neighbors.includes(hostile));
        let rangedHealing = RANGED_HEAL_POWER * _.sum(_.map(rangedHealers, healer => this.getHealPotential(healer)));
        return selfHealing + neighborHealing + rangedHealing;
    }
    // Creep position calculations =====================================================================================
    // // Distance from a given creep to the nearest rampart or wall; Infinity if no barriers in room
    // static distanceToBarrier(creep: Creep): number {
    //
    // }
    static getPositionsNearEnemies(hostiles, range = 0) {
        return _.unique(_.flatten(_.map(hostiles, hostile => hostile.pos.getPositionsInRange(range, false, true))));
    }
}

// archer overlord - spawns defender/healer pairs for sustained combat
const HydraliskSetup = new CreepSetup('hydralisk', {
    pattern: [RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, HEAL, MOVE, MOVE, MOVE, MOVE],
    sizeLimit: Infinity,
});
const BoostedHydraliskSetup = new CreepSetup('hydralisk', {
    pattern: [TOUGH, TOUGH, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, HEAL, MOVE],
    sizeLimit: Infinity,
});
let RangedDefenseOverlord = class RangedDefenseOverlord extends CombatOverlord {
    constructor(directive, boosted = false, priority = OverlordPriority.defense.rangedDefense) {
        super(directive, 'rangedDefense', priority);
        this.defenders = this.creeps(HydraliskSetup.role);
        if (boosted) {
            this.boosts[HydraliskSetup.role] = [
                boostResources.ranged_attack[3],
                boostResources.heal[3],
            ];
        }
        this.retreatPos = (this.colony.commandCenter || this.colony.hatchery || this.colony.controller).pos;
        this.settings = {
            retreatHitsPercent: 0.85,
            reengageHitsPercent: 0.95,
        };
        this.avoid = CombatIntel.getPositionsNearEnemies(this.room.dangerousHostiles, 2);
        this.moveOpts.obstacles = this.avoid;
        this.moveOpts.ignoreCreeps = false;
    }
    findTarget(archer) {
        if (this.room) {
            // Target nearby hostile creeps
            let creepTarget = this.findClosestHostile(archer, false, false);
            if (creepTarget)
                return creepTarget;
            // Target nearby hostile structures
            let structureTarget = this.findClosestPrioritizedStructure(archer);
            if (structureTarget)
                return structureTarget;
        }
    }
    retreatActions(archer) {
        archer.travelTo(this.retreatPos, this.moveOpts);
        if (archer.hits > this.settings.reengageHitsPercent * archer.hits) {
            archer.memory.retreating = false;
        }
    }
    attackActions(attacker) {
        let target = this.findTarget(attacker);
        if (target) {
            // console.log(attacker.name, target.pos.print);
            let range = attacker.pos.getRangeTo(target);
            if (range <= 3) {
                attacker.rangedAttack(target);
            }
            if (range < 3) { // retreat to controller if too close
                attacker.travelTo(this.retreatPos, this.moveOpts);
            }
            else if (range > 3) { // approach the target if too far
                // if (target.pos.rangeToEdge >= 2) {
                attacker.travelTo(target, _.merge(this.moveOpts, { range: 3 }));
                // }
            }
        }
    }
    healActions(defender) {
        if (this.room && this.room.hostiles.length == 0) { // No hostiles in the room
            this.medicActions(defender);
            return;
        }
        if (defender.hits < defender.hitsMax) {
            defender.heal(defender);
        }
        else {
            // Try to heal whatever else is in range
            let target = defender.pos.findClosestByRange(_.filter(this.defenders, creep => creep.hits < creep.hitsMax));
            if (target && target.pos.isNearTo(defender)) {
                defender.heal(target, false);
            }
            if (target && !defender.actionLog.move) {
                defender.travelTo(target, this.moveOpts);
            }
        }
    }
    handleDefender(defender) {
        // Handle retreating actions
        if (defender.hits < this.settings.retreatHitsPercent * defender.hitsMax) {
            defender.memory.retreating = true;
        }
        if (defender.memory.retreating) {
            this.retreatActions(defender);
        }
        // Move to room and then perform attacking actions
        if (!defender.inSameRoomAs(this) || defender.pos.isEdge) {
            defender.travelTo(this.pos);
        }
        else {
            this.attackActions(defender);
            this.healActions(defender);
        }
    }
    init() {
        this.reassignIdleCreeps(HydraliskSetup.role);
        let healPotential = CombatIntel.maxHealingByCreeps(this.room.hostiles);
        let hydraliskDamage = RANGED_ATTACK_POWER * HydraliskSetup.getBodyPotential(RANGED_ATTACK, this.colony);
        let towerDamage = this.room.hostiles[0] ? CombatIntel.towerDamageAtPos(this.room.hostiles[0].pos) || 0 : 0;
        let worstDamageMultiplier = _.min(_.map(this.room.hostiles, creep => CombatIntel.damageTakenMultiplier(creep)));
        let boosts = this.boosts[HydraliskSetup.role];
        if (boosts && boosts.includes(boostResources.ranged_attack[3])) { // TODO: add boost damage computation function to Overlord
            hydraliskDamage *= 4;
        }
        // Match the hostile damage times some multiplier
        let amount = Math.ceil(1.5 * healPotential / (worstDamageMultiplier * (hydraliskDamage + towerDamage)));
        this.wishlist(amount, HydraliskSetup);
        this.requestBoosts();
    }
    run() {
        for (let defender of this.defenders) {
            // Run the creep if it has a task given to it by something else; otherwise, proceed with non-task actions
            if (defender.hasValidTask) {
                defender.run();
            }
            else {
                if (defender.needsBoosts) {
                    this.handleBoosting(defender);
                }
                else {
                    this.handleDefender(defender);
                }
            }
        }
        if (this.room.hostiles.length == 0) {
            this.parkCreepsIfIdle(this.defenders);
        }
    }
};
RangedDefenseOverlord = __decorate([
    profile
], RangedDefenseOverlord);

// Destroyer overlord - spawns attacker/healer pairs for sustained combat
class AttackerSetup extends CreepSetup {
    constructor() {
        super(AttackerSetup.role, {
            pattern: [ATTACK, MOVE],
            sizeLimit: Infinity,
            ordered: false
        });
    }
}
AttackerSetup.role = 'attacker';
class HealerSetup extends CreepSetup {
    constructor() {
        super(HealerSetup.role, {
            pattern: [HEAL, MOVE],
            sizeLimit: Infinity,
            ordered: false
        });
    }
}
HealerSetup.role = 'healer';
let GuardPairOverlord = GuardPairOverlord_1 = class GuardPairOverlord extends CombatOverlord {
    constructor(directive, priority = OverlordPriority.defense.guard) {
        super(directive, 'guardPair', priority);
        this.attackers = this.creeps(AttackerSetup.role);
        this.healers = this.creeps(HealerSetup.role);
        // Comment out boost lines if you don't want to spawn boosted attackers/healers
        // this.boosts.attacker = [
        // 	boostResources.attack[3],
        // 	boostResources.tough[3],
        // ];
        // this.boosts.healer = [
        // 	boostResources.heal[3],
        // 	boostResources.tough[3],
        // ];
    }
    findTarget(attacker) {
        if (this.room) {
            // Prioritize specifically targeted structures first
            let targetingDirectives = DirectiveTargetSiege.find(this.room.flags);
            let targetedStructures = _.compact(_.map(targetingDirectives, directive => directive.getTarget()));
            if (targetedStructures.length > 0) {
                return this.findClosestReachable(attacker.pos, targetedStructures);
            }
            else {
                // Target nearby hostile creeps
                let creepTarget = this.findClosestHostile(attacker, true);
                if (creepTarget)
                    return creepTarget;
                // Target nearby hostile structures
                let structureTarget = this.findClosestPrioritizedStructure(attacker);
                if (structureTarget)
                    return structureTarget;
            }
        }
    }
    retreatActions(attacker, healer) {
        if (attacker.hits > GuardPairOverlord_1.settings.reengageHitsPercent * attacker.hits &&
            healer.hits > GuardPairOverlord_1.settings.reengageHitsPercent * healer.hits) {
            attacker.memory.retreating = false;
        }
        // Healer leads retreat to fallback position
        this.pairwiseMove(healer, attacker, this.colony.controller);
    }
    attackActions(attacker, healer) {
        let target = this.findTarget(attacker);
        if (target) {
            if (attacker.pos.isNearTo(target)) {
                attacker.attack(target);
            }
            else {
                this.pairwiseMove(attacker, healer, target);
            }
        }
    }
    handleSquad(attacker) {
        let healer = this.findPartner(attacker, this.healers);
        // Case 1: you don't have an active healer
        if (!healer || healer.spawning || healer.needsBoosts) {
            // Wait near the colony controller if you don't have a healer
            if (attacker.pos.getMultiRoomRangeTo(this.colony.controller.pos) > 5) {
                attacker.travelTo(this.colony.controller);
            }
            else {
                attacker.park();
            }
        }
        // Case 2: you have an active healer
        else {
            // Activate retreat condition if necessary
            if (attacker.hits < GuardPairOverlord_1.settings.retreatHitsPercent * attacker.hitsMax ||
                healer.hits < GuardPairOverlord_1.settings.retreatHitsPercent * healer.hitsMax) {
                attacker.memory.retreating = true;
            }
            if (attacker.memory.retreating) {
                // Retreat to fallback position
                this.retreatActions(attacker, healer);
            }
            else {
                // Move to room and then perform attacking actions
                if (!attacker.inSameRoomAs(this)) {
                    this.pairwiseMove(attacker, healer, this.pos);
                }
                else {
                    this.attackActions(attacker, healer);
                }
            }
        }
    }
    handleHealer(healer) {
        // If there are no hostiles in the designated room, run medic actions
        if (this.room && this.room.hostiles.length == 0) {
            this.medicActions(healer);
            return;
        }
        let attacker = this.findPartner(healer, this.attackers);
        // Case 1: you don't have an attacker partner
        if (!attacker || attacker.spawning || attacker.needsBoosts) {
            if (healer.hits < healer.hitsMax) {
                healer.heal(healer);
            }
            // Wait near the colony controller if you don't have an attacker
            if (healer.pos.getMultiRoomRangeTo(this.colony.controller.pos) > 10) {
                healer.travelTo(this.colony.controller);
            }
            else {
                healer.park();
            }
        }
        // Case 2: you have an attacker partner
        else {
            if (attacker.hitsMax - attacker.hits > healer.hitsMax - healer.hits &&
                attacker.hitsMax - attacker.hits > 0) {
                // Attacker needs healing more
                healer.heal(attacker, true);
            }
            else {
                if (healer.hitsMax - healer.hits > 0) {
                    healer.heal(healer);
                }
                else {
                    // Try to heal whatever else is in range
                    let target = this.findClosestHurtFriendly(healer);
                    if (target)
                        healer.heal(target, true);
                }
            }
        }
    }
    init() {
        this.reassignIdleCreeps(AttackerSetup.role);
        this.reassignIdleCreeps(HealerSetup.role);
        let amount;
        if (this.directive.memory.amount) {
            amount = this.directive.memory.amount;
        }
        else {
            amount = 1;
        }
        // if (this.room) {
        // 	let hostileAttackPower = _.sum(this.room.hostiles, hostile => hostile.getActiveBodyparts(ATTACK)
        // 																  + hostile.getActiveBodyparts(RANGED_ATTACK));
        // 	let hostileHealPower = _.sum(this.room.hostiles, hostile=>hostile.getActiveBodyparts(HEAL));
        //
        // }
        this.wishlist(amount, new AttackerSetup());
        this.wishlist(amount, new HealerSetup());
    }
    run() {
        for (let attacker of this.attackers) {
            // Run the creep if it has a task given to it by something else; otherwise, proceed with non-task actions
            if (attacker.hasValidTask) {
                attacker.run();
            }
            else {
                if (attacker.needsBoosts) {
                    this.handleBoosting(attacker);
                }
                else {
                    this.handleSquad(attacker);
                }
            }
        }
        for (let healer of this.healers) {
            if (healer.hasValidTask) {
                healer.run();
            }
            else {
                if (healer.needsBoosts) {
                    this.handleBoosting(healer);
                }
                else {
                    this.handleHealer(healer);
                }
            }
        }
    }
};
GuardPairOverlord.settings = {
    retreatHitsPercent: 0.50,
    reengageHitsPercent: 0.95,
};
GuardPairOverlord = GuardPairOverlord_1 = __decorate([
    profile
], GuardPairOverlord);
var GuardPairOverlord_1;

// archer overlord - spawns defender/healer pairs for sustained combat
const ZerglingSetup = new CreepSetup('zergling', {
    pattern: [ATTACK, MOVE],
    sizeLimit: Infinity,
});
const ArmoredZerglingSetup = new CreepSetup('zergling', {
    pattern: [TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE],
    sizeLimit: Infinity,
});
let MeleeDefenseOverlord = MeleeDefenseOverlord_1 = class MeleeDefenseOverlord extends CombatOverlord {
    constructor(directive, boosted = false, priority = OverlordPriority.defense.meleeDefense) {
        super(directive, 'meleeDefense', priority);
        this.defenders = this.creeps(ZerglingSetup.role);
        if (boosted) {
            this.boosts[ZerglingSetup.role] = [
                boostResources.tough[3],
                boostResources.attack[3],
            ];
        }
        let rampartPositions = _.map(_.filter(this.colony.room.barriers, s => s.structureType == STRUCTURE_RAMPART), barrier => barrier.pos);
        this.defendPositions = _.filter(rampartPositions, pos => pos.findInRange(this.colony.room.hostiles, 1).length > 1);
    }
    retreatActions(defender) {
        if (defender.hits > MeleeDefenseOverlord_1.settings.reengageHitsPercent * defender.hits) {
            defender.memory.retreating = false;
        }
        // Find a safe position and retreat
        let retreatRampart = defender.pos.findClosestByRange(_.filter(this.room.ramparts, rampart => rampart.pos.isPassible()));
        defender.travelTo(retreatRampart);
    }
    handleDefender(defender) {
        // // Move to a defensible position
        // let isStandingInDefensePos = _.any(this.defendPositions, pos => pos.isEqualTo(defender.pos));
        // if (!isStandingInDefensePos) {
        // 	let availablePositions = _.filter(this.defendPositions, pos => pos.lookFor(LOOK_CREEPS).length == 0);
        // 	let target = defender.pos.findClosestByRange(availablePositions);
        // 	if (target) {
        // 		let enemyPositions = _.map(this.room.hostiles, hostile => hostile.pos);
        // 		defender.travelTo(target, {obstacles: enemyPositions, movingTarget: true});
        // 	}
        // }
        // // Attack something
        // let target = this.findClosestHostile(defender, false, false);
        // if (target && defender.pos.isNearTo(target)) {
        // 	defender.attack(target);
        // }
        // Get a target
        let adjacentHostiles = _.filter(this.room.hostiles, creep => defender.pos.getRangeTo(creep.pos) == 1);
        let target;
        if (adjacentHostiles.length > 1) {
            target = minBy$1(adjacentHostiles, (hostile) => CombatIntel.maxHostileHealingTo(hostile));
        }
        else {
            target = this.findClosestHostile(defender, false, false);
        }
        // Attack something
        if (target && defender.pos.isNearTo(target)) {
            defender.attack(target);
        }
        // Move to a defensible position if there is one; else, engage target directly
        let isStandingInDefensePos = _.any(this.defendPositions, pos => pos.isEqualTo(defender.pos));
        if (!isStandingInDefensePos) {
            let availablePositions = _.filter(this.defendPositions, pos => pos.lookFor(LOOK_CREEPS).length == 0);
            let moveToDefensePos = defender.pos.findClosestByRange(availablePositions);
            if (moveToDefensePos) {
                let enemyPositions = _.map(this.room.hostiles, hostile => hostile.pos);
                defender.travelTo(moveToDefensePos, { obstacles: enemyPositions, movingTarget: true });
            }
            else {
                // Activate retreat condition if necessary
                if (defender.hits < GuardPairOverlord.settings.retreatHitsPercent * defender.hitsMax) {
                    defender.memory.retreating = true;
                }
                // Either retreat to healing position or engage target
                if (defender.memory.retreating) {
                    this.retreatActions(defender); // Retreat to fallback position
                }
                else {
                    if (target) {
                        defender.travelTo(target);
                    }
                }
            }
        }
    }
    init() {
        this.reassignIdleCreeps(ZerglingSetup.role);
        let healPotential = CombatIntel.maxHealingByCreeps(this.room.hostiles);
        let zerglingDamage = ATTACK_POWER * ZerglingSetup.getBodyPotential(ATTACK, this.colony);
        let towerDamage = this.room.hostiles[0] ? CombatIntel.towerDamageAtPos(this.room.hostiles[0].pos) || 0 : 0;
        let worstDamageMultiplier = _.min(_.map(this.room.hostiles, creep => CombatIntel.damageTakenMultiplier(creep)));
        let boosts = this.boosts[ZerglingSetup.role];
        if (boosts && boosts.includes(boostResources.attack[3])) { // TODO: add boost damage computation function to Overlord
            zerglingDamage *= 4;
        }
        // Match the hostile damage times some multiplier
        let amount = Math.ceil(1.5 * healPotential / (worstDamageMultiplier * (zerglingDamage + towerDamage)));
        if (this.colony.level >= 3) {
            this.wishlist(amount, ArmoredZerglingSetup);
        }
        else {
            this.wishlist(amount, ZerglingSetup);
        }
        this.requestBoosts();
    }
    run() {
        for (let defender of this.defenders) {
            // Run the creep if it has a task given to it by something else; otherwise, proceed with non-task actions
            if (defender.hasValidTask) {
                defender.run();
            }
            else {
                if (defender.needsBoosts) {
                    this.handleBoosting(defender);
                }
                else {
                    this.handleDefender(defender);
                }
            }
        }
        if (this.room.hostiles.length == 0) {
            this.parkCreepsIfIdle(this.defenders);
        }
    }
};
MeleeDefenseOverlord.settings = {
    retreatHitsPercent: 0.50,
    reengageHitsPercent: 0.95,
};
MeleeDefenseOverlord = MeleeDefenseOverlord_1 = __decorate([
    profile
], MeleeDefenseOverlord);
var MeleeDefenseOverlord_1;

let DirectiveInvasionDefense = DirectiveInvasionDefense_1 = class DirectiveInvasionDefense extends Directive {
    constructor(flag) {
        super(flag, DirectiveInvasionDefense_1.requiredRCL);
        if (!this.room) {
            return;
        }
        let expectedDamage = CombatIntel.maxDamageByCreeps(this.room.dangerousHostiles);
        let useBoosts = (expectedDamage > ATTACK_POWER * 75);
        let percentWalls = _.filter(this.room.barriers, s => s.structureType == STRUCTURE_WALL).length /
            this.room.barriers.length;
        let meleeHostiles = _.filter(this.room.hostiles, hostile => hostile.getActiveBodyparts(ATTACK) > 0 ||
            hostile.getActiveBodyparts(WORK) > 0);
        let rangedHostiles = _.filter(this.room.hostiles, hostile => hostile.getActiveBodyparts(RANGED_ATTACK) > 0);
        if (this.colony.stage > ColonyStage.Larva && percentWalls > 0.5) {
            this.overlords.rangedDefense = new RangedDefenseOverlord(this, useBoosts);
        }
        else if (meleeHostiles.length > 0) {
            this.overlords.meleeDefense = new MeleeDefenseOverlord(this, useBoosts);
        }
        else if (Game.time % 10 == 0) {
            log.warning(`No invasion defense overlord!`);
        }
    }
    init() {
    }
    run() {
        if (!this.room || this.room.hostiles.length > 0) {
            this.memory.safeSince = Game.time;
        }
        // If there are no hostiles left in the room and everyone's healed, then remove the flag
        if (this.room && this.room.hostiles.length == 0 &&
            Game.time - this.memory.safeSince > 100 && this.room.hostileStructures.length == 0) {
            if (_.filter(this.room.creeps, creep => creep.hits < creep.hitsMax).length == 0) {
                this.remove();
            }
        }
    }
};
DirectiveInvasionDefense.directiveName = 'invasionDefense';
DirectiveInvasionDefense.color = COLOR_ORANGE;
DirectiveInvasionDefense.secondaryColor = COLOR_RED;
DirectiveInvasionDefense.requiredRCL = 3;
DirectiveInvasionDefense = DirectiveInvasionDefense_1 = __decorate([
    profile
], DirectiveInvasionDefense);
var DirectiveInvasionDefense_1;

let DirectiveNukeResponse = DirectiveNukeResponse_1 = class DirectiveNukeResponse extends Directive {
    constructor(flag) {
        super(flag, DirectiveNukeResponse_1.requiredRCL);
        this.nuke = this.pos.lookFor(LOOK_NUKES)[0]; // TODO: needs to handle multiple nukes on same pos
    }
    init() {
    }
    run() {
        // Build ramparts at all positions affected by nukes with structures on them
        if (Game.time % 50 == 0) {
            if (this.nuke) {
                let rampartPositions = _.filter(this.nuke.pos.getPositionsInRange(2), function (pos) {
                    // Rampart should be built to protect all non-road, non-barrier structures in nuke range
                    return _.filter(pos.lookFor(LOOK_STRUCTURES), s => s.structureType != STRUCTURE_ROAD &&
                        s.structureType != STRUCTURE_RAMPART &&
                        s.structureType != STRUCTURE_WALL).length > 0;
                });
                for (let pos of rampartPositions) {
                    // Build a rampart if there isn't one already
                    if (!pos.lookForStructure(STRUCTURE_RAMPART)) {
                        pos.createConstructionSite(STRUCTURE_RAMPART);
                    }
                }
                log.alert(`Incoming nuke at ${this.nuke.pos.print}! Time until impact: ${this.nuke.timeToLand}`);
            }
            else {
                // Remove once nuke is gone
                this.remove();
            }
        }
    }
};
DirectiveNukeResponse.directiveName = 'nukeResponse';
DirectiveNukeResponse.color = COLOR_ORANGE;
DirectiveNukeResponse.secondaryColor = COLOR_BLUE;
DirectiveNukeResponse.requiredRCL = 4;
DirectiveNukeResponse = DirectiveNukeResponse_1 = __decorate([
    profile
], DirectiveNukeResponse);
var DirectiveNukeResponse_1;

let DirectiveAbandon = class DirectiveAbandon extends Directive {
    // colony: Colony | undefined; // this is technically unallowable, but at end of life, colony can be undefined
    constructor(flag) {
        super(flag);
        if (!this.colony) {
            log.warning(`${this.name}@${this.pos.print}: no colony!`);
            return;
        }
        else if (this.room != this.colony.room) {
            log.warning(`${this.name}@${this.pos.print}: must be placed in colony room!`);
            return;
        }
        // Register abandon status
        this.colony.abandoning = true;
    }
    init() {
    }
    run() {
        // Incubation directive gets removed once the colony has a command center (storage)
        if (!this.colony) {
            this.remove();
        }
    }
};
DirectiveAbandon.directiveName = 'abandon';
DirectiveAbandon.color = COLOR_PURPLE;
DirectiveAbandon.secondaryColor = COLOR_RED;
DirectiveAbandon = __decorate([
    profile
], DirectiveAbandon);

/* The Overlord object handles most of the task assignment and directs the spawning operations for each Colony. */
let Overseer = class Overseer {
    constructor(colony) {
        this.colony = colony;
        this.directives = [];
        this.overlords = {};
    }
    get memory() {
        return Mem.wrap(this.colony.memory, 'overseer', {});
    }
    registerOverlord(overlord) {
        if (!this.overlords[overlord.priority]) {
            this.overlords[overlord.priority] = [];
        }
        this.overlords[overlord.priority].push(overlord);
    }
    /* Place new event-driven flags where needed to be instantiated on the next tick */
    placeDirectives() {
        // Bootstrap directive: in the event of catastrophic room crash, enter emergency spawn mode.
        // Doesn't apply to incubating colonies.
        if (!this.colony.isIncubating) {
            let hasEnergy = this.colony.room.energyAvailable >= EMERGENCY_ENERGY_THRESHOLD; // Enough spawn energy?
            let hasMiners = this.colony.getCreepsByRole(MinerSetup.role).length > 0; // Has energy supply?
            let hasQueen = this.colony.getCreepsByRole(QueenSetup.role).length > 0; // Has a queen?
            if (!hasEnergy && !hasMiners && !hasQueen && this.colony.hatchery) {
                DirectiveBootstrap.createIfNotPresent(this.colony.hatchery.pos, 'pos');
                // this.colony.hatchery.settings.suppressSpawning = true;
            }
        }
        // TODO: figure out what's causing these bugs
        // // Register logistics requests for all dropped resources and tombstones
        // for (let room of this.colony.rooms) {
        // 	// Pick up all nontrivial dropped resources
        // 	for (let resourceType in room.drops) {
        // 		for (let drop of room.drops[resourceType]) {
        // 			if (drop.amount > 200 || drop.resourceType != RESOURCE_ENERGY) {
        // 				DirectiveLogisticsRequest.createIfNotPresent(drop.pos, 'pos', {quiet: true});
        // 			}
        // 		}
        // 	}
        // }
        // // Place a logistics request directive for every tombstone with non-empty store that isn't on a container
        // for (let tombstone of this.colony.tombstones) {
        // 	if (_.sum(tombstone.store) > 0 && !tombstone.pos.lookForStructure(STRUCTURE_CONTAINER)) {
        // 		DirectiveLogisticsRequest.createIfNotPresent(tombstone.pos, 'pos', {quiet: true});
        // 	}
        // }
        // Guard directive: defend your outposts and all rooms of colonies that you are incubating
        let roomsToCheck = _.flattenDeep([this.colony.outposts,
            _.map(this.colony.incubatingColonies, col => col.rooms)]);
        for (let room of roomsToCheck) {
            let defenseFlags = _.filter(room.flags, flag => DirectiveGuard.filter(flag) ||
                DirectiveInvasionDefense.filter(flag) ||
                DirectiveGuardSwarm.filter(flag));
            // let bigHostiles = _.filter(room.hostiles, creep => creep.body.length >= 10);
            if (room.dangerousHostiles.length > 0 && defenseFlags.length == 0) {
                DirectiveGuard.create(room.dangerousHostiles[0].pos);
            }
        }
        // Defend against invasions in owned rooms
        if (this.colony.room && this.colony.level >= DirectiveInvasionDefense.requiredRCL) {
            let effectiveInvaderCount = _.sum(_.map(this.colony.room.hostiles, invader => invader.boosts.length > 0 ? 2 : 1));
            if (effectiveInvaderCount >= 3) {
                DirectiveInvasionDefense.createIfNotPresent(this.colony.controller.pos, 'room');
            }
        }
        // Place nuke response directive if there is a nuke present in colony room
        if (this.colony.room && this.colony.level >= DirectiveNukeResponse.requiredRCL) {
            for (let nuke of this.colony.room.find(FIND_NUKES)) {
                DirectiveNukeResponse.createIfNotPresent(nuke.pos, 'pos');
            }
        }
        // Place an abandon directive in case room has been breached to prevent terminal robbing
        if (this.colony.breached && this.colony.terminal) {
            DirectiveAbandon.createIfNotPresent(this.colony.terminal.pos, 'room');
        }
    }
    // Safe mode condition =============================================================================================
    handleSafeMode() {
        // Safe mode activates when there are dangerous player hostiles that can reach the spawn
        let criticalStructures = _.compact([...this.colony.spawns,
            this.colony.storage,
            this.colony.terminal]);
        for (let structure of criticalStructures) {
            if (structure.hits < structure.hitsMax &&
                structure.pos.findInRange(this.colony.room.dangerousHostiles, 1).length > 0) {
                this.colony.controller.activateSafeMode();
                return;
            }
        }
        if (this.colony.stage > ColonyStage.Larva) {
            let barriers = _.map(this.colony.room.barriers, barrier => barrier.pos);
            let firstHostile = _.first(this.colony.room.dangerousHostiles);
            if (firstHostile && this.colony.spawns[0] &&
                Pathing.isReachable(firstHostile.pos, this.colony.spawns[0].pos, { obstacles: barriers })) {
                this.colony.controller.activateSafeMode();
                return;
            }
        }
    }
    build() {
    }
    // Initialization ==================================================================================================
    init() {
        // Handle directives - should be done first
        _.forEach(this.directives, directive => directive.init());
        // Handle overlords in decreasing priority {
        for (let priority in this.overlords) {
            if (!this.overlords[priority])
                continue;
            for (let overlord of this.overlords[priority]) {
                overlord.init();
            }
        }
    }
    // Operation =======================================================================================================
    run() {
        // Handle directives
        _.forEach(this.directives, directive => directive.run());
        // Handle overlords in decreasing priority
        for (let priority in this.overlords) {
            if (!this.overlords[priority])
                continue;
            for (let overlord of this.overlords[priority]) {
                overlord.run();
            }
        }
        this.handleSafeMode();
        this.placeDirectives();
        // Draw visuals
        _.forEach(this.directives, directive => directive.visuals());
    }
    visuals() {
        let roleOccupancy = {};
        // Handle overlords in decreasing priority
        for (let priority in this.overlords) {
            if (!this.overlords[priority])
                continue;
            for (let overlord of this.overlords[priority]) {
                for (let role in overlord.creepUsageReport) {
                    let report = overlord.creepUsageReport[role];
                    if (!report) {
                        if (Game.time % 100 == 0) {
                            log.info(`Role ${role} is not reported by ${overlord.name}!`);
                        }
                    }
                    else {
                        if (!roleOccupancy[role])
                            roleOccupancy[role] = [0, 0];
                        roleOccupancy[role][0] += report[0];
                        roleOccupancy[role][1] += report[1];
                    }
                }
            }
        }
        let safeOutposts = _.filter(this.colony.outposts, room => !!room && room.dangerousHostiles.length == 0);
        let stringReport = [
            `DEFCON: ${this.colony.defcon}  Safe outposts: ${safeOutposts.length}/${this.colony.outposts.length}`,
            `Creep usage for ${this.colony.name}:`
        ];
        let padLength = _.max(_.map(_.keys(roleOccupancy), str => str.length)) + 2;
        for (let role in roleOccupancy) {
            let [current, needed] = roleOccupancy[role];
            if (needed > 0) {
                stringReport.push('| ' + `${role}:`.padRight(padLength) +
                    `${Math.floor(100 * current / needed)}%`.padLeft(4));
            }
        }
        Visualizer.colonyReport(this.colony.name, stringReport);
    }
};
Overseer = __decorate([
    profile
], Overseer);

// @formatter:off
var hatcheryLayout = { data: { anchor: { 'x': 25, 'y': 24 }, }, 1: { 'name': 'hatchery', 'shard': 'shard0', 'rcl': '1', 'buildings': { 'spawn': { 'pos': [{ 'x': 25, 'y': 24 }] } } }, 2: { 'name': 'hatchery', 'shard': 'shard0', 'rcl': '2', 'buildings': { 'extension': { 'pos': [{ 'x': 24, 'y': 23 }, { 'x': 26, 'y': 23 }, { 'x': 23, 'y': 24 }, { 'x': 27, 'y': 24 }, { 'x': 27, 'y': 26 }] }, 'spawn': { 'pos': [{ 'x': 25, 'y': 24 }] }, 'container': { 'pos': [{ 'x': 25, 'y': 25 }] } } }, 3: { 'name': 'hatchery', 'shard': 'shard0', 'rcl': '3', 'buildings': { 'extension': { 'pos': [{ 'x': 24, 'y': 22 }, { 'x': 26, 'y': 22 }, { 'x': 24, 'y': 23 }, { 'x': 26, 'y': 23 }, { 'x': 23, 'y': 24 }, { 'x': 27, 'y': 24 }, { 'x': 23, 'y': 26 }, { 'x': 27, 'y': 26 }, { 'x': 24, 'y': 27 }, { 'x': 26, 'y': 27 }] }, 'spawn': { 'pos': [{ 'x': 25, 'y': 24 }] }, 'container': { 'pos': [{ 'x': 25, 'y': 25 }] } } }, 4: { 'name': 'hatchery', 'shard': 'shard0', 'rcl': '4', 'buildings': { 'road': { 'pos': [{ 'x': 25, 'y': 25 }, { 'x': 25, 'y': 20 }, { 'x': 21, 'y': 21 }, { 'x': 24, 'y': 21 }, { 'x': 26, 'y': 21 }, { 'x': 29, 'y': 21 }, { 'x': 22, 'y': 22 }, { 'x': 25, 'y': 22 }, { 'x': 28, 'y': 22 }, { 'x': 23, 'y': 23 }, { 'x': 25, 'y': 23 }, { 'x': 27, 'y': 23 }, { 'x': 21, 'y': 24 }, { 'x': 24, 'y': 24 }, { 'x': 26, 'y': 24 }, { 'x': 29, 'y': 24 }, { 'x': 20, 'y': 25 }, { 'x': 22, 'y': 25 }, { 'x': 23, 'y': 25 }, { 'x': 27, 'y': 25 }, { 'x': 28, 'y': 25 }, { 'x': 30, 'y': 25 }, { 'x': 21, 'y': 26 }, { 'x': 24, 'y': 26 }, { 'x': 26, 'y': 26 }, { 'x': 29, 'y': 26 }, { 'x': 23, 'y': 27 }, { 'x': 25, 'y': 27 }, { 'x': 27, 'y': 27 }, { 'x': 22, 'y': 28 }, { 'x': 25, 'y': 28 }, { 'x': 28, 'y': 28 }, { 'x': 21, 'y': 29 }, { 'x': 24, 'y': 29 }, { 'x': 26, 'y': 29 }, { 'x': 29, 'y': 29 }, { 'x': 25, 'y': 30 }] }, 'extension': { 'pos': [{ 'x': 23, 'y': 22 }, { 'x': 24, 'y': 22 }, { 'x': 26, 'y': 22 }, { 'x': 27, 'y': 22 }, { 'x': 24, 'y': 23 }, { 'x': 26, 'y': 23 }, { 'x': 22, 'y': 24 }, { 'x': 23, 'y': 24 }, { 'x': 27, 'y': 24 }, { 'x': 28, 'y': 24 }, { 'x': 22, 'y': 26 }, { 'x': 23, 'y': 26 }, { 'x': 27, 'y': 26 }, { 'x': 28, 'y': 26 }, { 'x': 24, 'y': 27 }, { 'x': 26, 'y': 27 }, { 'x': 23, 'y': 28 }, { 'x': 24, 'y': 28 }, { 'x': 26, 'y': 28 }, { 'x': 27, 'y': 28 }] }, 'spawn': { 'pos': [{ 'x': 25, 'y': 24 }] }, 'container': { 'pos': [{ 'x': 25, 'y': 25 }] } } }, 5: { 'name': 'hatchery', 'shard': 'shard0', 'rcl': '5', 'buildings': { 'road': { 'pos': [{ 'x': 25, 'y': 25 }, { 'x': 25, 'y': 20 }, { 'x': 21, 'y': 21 }, { 'x': 24, 'y': 21 }, { 'x': 26, 'y': 21 }, { 'x': 29, 'y': 21 }, { 'x': 22, 'y': 22 }, { 'x': 25, 'y': 22 }, { 'x': 28, 'y': 22 }, { 'x': 23, 'y': 23 }, { 'x': 25, 'y': 23 }, { 'x': 27, 'y': 23 }, { 'x': 21, 'y': 24 }, { 'x': 24, 'y': 24 }, { 'x': 26, 'y': 24 }, { 'x': 29, 'y': 24 }, { 'x': 20, 'y': 25 }, { 'x': 22, 'y': 25 }, { 'x': 23, 'y': 25 }, { 'x': 27, 'y': 25 }, { 'x': 28, 'y': 25 }, { 'x': 30, 'y': 25 }, { 'x': 21, 'y': 26 }, { 'x': 24, 'y': 26 }, { 'x': 26, 'y': 26 }, { 'x': 29, 'y': 26 }, { 'x': 23, 'y': 27 }, { 'x': 25, 'y': 27 }, { 'x': 27, 'y': 27 }, { 'x': 22, 'y': 28 }, { 'x': 25, 'y': 28 }, { 'x': 28, 'y': 28 }, { 'x': 21, 'y': 29 }, { 'x': 24, 'y': 29 }, { 'x': 26, 'y': 29 }, { 'x': 29, 'y': 29 }, { 'x': 25, 'y': 30 }] }, 'extension': { 'pos': [{ 'x': 23, 'y': 21 }, { 'x': 27, 'y': 21 }, { 'x': 23, 'y': 22 }, { 'x': 24, 'y': 22 }, { 'x': 26, 'y': 22 }, { 'x': 27, 'y': 22 }, { 'x': 21, 'y': 23 }, { 'x': 22, 'y': 23 }, { 'x': 24, 'y': 23 }, { 'x': 26, 'y': 23 }, { 'x': 28, 'y': 23 }, { 'x': 29, 'y': 23 }, { 'x': 22, 'y': 24 }, { 'x': 23, 'y': 24 }, { 'x': 27, 'y': 24 }, { 'x': 28, 'y': 24 }, { 'x': 22, 'y': 26 }, { 'x': 23, 'y': 26 }, { 'x': 27, 'y': 26 }, { 'x': 28, 'y': 26 }, { 'x': 22, 'y': 27 }, { 'x': 24, 'y': 27 }, { 'x': 26, 'y': 27 }, { 'x': 28, 'y': 27 }, { 'x': 29, 'y': 27 }, { 'x': 23, 'y': 28 }, { 'x': 24, 'y': 28 }, { 'x': 26, 'y': 28 }, { 'x': 27, 'y': 28 }, { 'x': 27, 'y': 29 }] }, 'spawn': { 'pos': [{ 'x': 25, 'y': 24 }] }, 'container': { 'pos': [{ 'x': 25, 'y': 25 }] }, 'tower': { 'pos': [{ 'x': 29, 'y': 25 }] }, 'link': { 'pos': [{ 'x': 25, 'y': 26 }] } } }, 6: { 'name': 'hatchery', 'shard': 'shard0', 'rcl': '6', 'buildings': { 'road': { 'pos': [{ 'x': 25, 'y': 25 }, { 'x': 25, 'y': 20 }, { 'x': 21, 'y': 21 }, { 'x': 24, 'y': 21 }, { 'x': 26, 'y': 21 }, { 'x': 29, 'y': 21 }, { 'x': 22, 'y': 22 }, { 'x': 25, 'y': 22 }, { 'x': 28, 'y': 22 }, { 'x': 23, 'y': 23 }, { 'x': 25, 'y': 23 }, { 'x': 27, 'y': 23 }, { 'x': 21, 'y': 24 }, { 'x': 24, 'y': 24 }, { 'x': 26, 'y': 24 }, { 'x': 29, 'y': 24 }, { 'x': 20, 'y': 25 }, { 'x': 22, 'y': 25 }, { 'x': 23, 'y': 25 }, { 'x': 27, 'y': 25 }, { 'x': 28, 'y': 25 }, { 'x': 30, 'y': 25 }, { 'x': 21, 'y': 26 }, { 'x': 24, 'y': 26 }, { 'x': 26, 'y': 26 }, { 'x': 29, 'y': 26 }, { 'x': 23, 'y': 27 }, { 'x': 25, 'y': 27 }, { 'x': 27, 'y': 27 }, { 'x': 22, 'y': 28 }, { 'x': 25, 'y': 28 }, { 'x': 28, 'y': 28 }, { 'x': 21, 'y': 29 }, { 'x': 24, 'y': 29 }, { 'x': 26, 'y': 29 }, { 'x': 29, 'y': 29 }, { 'x': 25, 'y': 30 }] }, 'extension': { 'pos': [{ 'x': 22, 'y': 21 }, { 'x': 23, 'y': 21 }, { 'x': 27, 'y': 21 }, { 'x': 28, 'y': 21 }, { 'x': 21, 'y': 22 }, { 'x': 23, 'y': 22 }, { 'x': 24, 'y': 22 }, { 'x': 26, 'y': 22 }, { 'x': 27, 'y': 22 }, { 'x': 29, 'y': 22 }, { 'x': 21, 'y': 23 }, { 'x': 22, 'y': 23 }, { 'x': 24, 'y': 23 }, { 'x': 26, 'y': 23 }, { 'x': 28, 'y': 23 }, { 'x': 29, 'y': 23 }, { 'x': 22, 'y': 24 }, { 'x': 23, 'y': 24 }, { 'x': 27, 'y': 24 }, { 'x': 28, 'y': 24 }, { 'x': 22, 'y': 26 }, { 'x': 23, 'y': 26 }, { 'x': 27, 'y': 26 }, { 'x': 28, 'y': 26 }, { 'x': 21, 'y': 27 }, { 'x': 22, 'y': 27 }, { 'x': 24, 'y': 27 }, { 'x': 26, 'y': 27 }, { 'x': 28, 'y': 27 }, { 'x': 29, 'y': 27 }, { 'x': 21, 'y': 28 }, { 'x': 23, 'y': 28 }, { 'x': 24, 'y': 28 }, { 'x': 26, 'y': 28 }, { 'x': 27, 'y': 28 }, { 'x': 29, 'y': 28 }, { 'x': 22, 'y': 29 }, { 'x': 23, 'y': 29 }, { 'x': 27, 'y': 29 }, { 'x': 28, 'y': 29 }] }, 'spawn': { 'pos': [{ 'x': 25, 'y': 24 }] }, 'container': { 'pos': [{ 'x': 25, 'y': 25 }] }, 'tower': { 'pos': [{ 'x': 29, 'y': 25 }] }, 'link': { 'pos': [{ 'x': 25, 'y': 26 }] } } }, 7: { 'name': 'hatchery', 'shard': 'shard0', 'rcl': '7', 'buildings': { 'extension': { 'pos': [{ 'x': 21, 'y': 20 }, { 'x': 22, 'y': 20 }, { 'x': 28, 'y': 20 }, { 'x': 29, 'y': 20 }, { 'x': 20, 'y': 21 }, { 'x': 22, 'y': 21 }, { 'x': 23, 'y': 21 }, { 'x': 27, 'y': 21 }, { 'x': 28, 'y': 21 }, { 'x': 30, 'y': 21 }, { 'x': 20, 'y': 22 }, { 'x': 21, 'y': 22 }, { 'x': 23, 'y': 22 }, { 'x': 24, 'y': 22 }, { 'x': 26, 'y': 22 }, { 'x': 27, 'y': 22 }, { 'x': 29, 'y': 22 }, { 'x': 30, 'y': 22 }, { 'x': 21, 'y': 23 }, { 'x': 22, 'y': 23 }, { 'x': 24, 'y': 23 }, { 'x': 26, 'y': 23 }, { 'x': 28, 'y': 23 }, { 'x': 29, 'y': 23 }, { 'x': 22, 'y': 24 }, { 'x': 23, 'y': 24 }, { 'x': 27, 'y': 24 }, { 'x': 28, 'y': 24 }, { 'x': 22, 'y': 26 }, { 'x': 23, 'y': 26 }, { 'x': 27, 'y': 26 }, { 'x': 28, 'y': 26 }, { 'x': 21, 'y': 27 }, { 'x': 22, 'y': 27 }, { 'x': 24, 'y': 27 }, { 'x': 26, 'y': 27 }, { 'x': 28, 'y': 27 }, { 'x': 29, 'y': 27 }, { 'x': 21, 'y': 28 }, { 'x': 23, 'y': 28 }, { 'x': 24, 'y': 28 }, { 'x': 26, 'y': 28 }, { 'x': 27, 'y': 28 }, { 'x': 29, 'y': 28 }, { 'x': 20, 'y': 29 }, { 'x': 22, 'y': 29 }, { 'x': 23, 'y': 29 }, { 'x': 27, 'y': 29 }, { 'x': 28, 'y': 29 }, { 'x': 30, 'y': 29 }] }, 'road': { 'pos': [{ 'x': 25, 'y': 25 }, { 'x': 25, 'y': 20 }, { 'x': 21, 'y': 21 }, { 'x': 24, 'y': 21 }, { 'x': 26, 'y': 21 }, { 'x': 29, 'y': 21 }, { 'x': 22, 'y': 22 }, { 'x': 25, 'y': 22 }, { 'x': 28, 'y': 22 }, { 'x': 23, 'y': 23 }, { 'x': 25, 'y': 23 }, { 'x': 27, 'y': 23 }, { 'x': 21, 'y': 24 }, { 'x': 24, 'y': 24 }, { 'x': 26, 'y': 24 }, { 'x': 29, 'y': 24 }, { 'x': 20, 'y': 25 }, { 'x': 22, 'y': 25 }, { 'x': 23, 'y': 25 }, { 'x': 27, 'y': 25 }, { 'x': 28, 'y': 25 }, { 'x': 30, 'y': 25 }, { 'x': 21, 'y': 26 }, { 'x': 24, 'y': 26 }, { 'x': 26, 'y': 26 }, { 'x': 29, 'y': 26 }, { 'x': 23, 'y': 27 }, { 'x': 25, 'y': 27 }, { 'x': 27, 'y': 27 }, { 'x': 22, 'y': 28 }, { 'x': 25, 'y': 28 }, { 'x': 28, 'y': 28 }, { 'x': 21, 'y': 29 }, { 'x': 24, 'y': 29 }, { 'x': 26, 'y': 29 }, { 'x': 29, 'y': 29 }, { 'x': 25, 'y': 30 }] }, 'spawn': { 'pos': [{ 'x': 25, 'y': 24 }, { 'x': 24, 'y': 25 }] }, 'tower': { 'pos': [{ 'x': 29, 'y': 25 }] }, 'container': { 'pos': [{ 'x': 25, 'y': 25 }] }, 'link': { 'pos': [{ 'x': 25, 'y': 26 }] } } }, 8: { 'name': 'hatchery', 'shard': 'shard0', 'rcl': '8', 'buildings': { 'extension': { 'pos': [{ 'x': 20, 'y': 20 }, { 'x': 21, 'y': 20 }, { 'x': 22, 'y': 20 }, { 'x': 28, 'y': 20 }, { 'x': 29, 'y': 20 }, { 'x': 30, 'y': 20 }, { 'x': 20, 'y': 21 }, { 'x': 22, 'y': 21 }, { 'x': 23, 'y': 21 }, { 'x': 27, 'y': 21 }, { 'x': 28, 'y': 21 }, { 'x': 30, 'y': 21 }, { 'x': 20, 'y': 22 }, { 'x': 21, 'y': 22 }, { 'x': 23, 'y': 22 }, { 'x': 24, 'y': 22 }, { 'x': 26, 'y': 22 }, { 'x': 27, 'y': 22 }, { 'x': 29, 'y': 22 }, { 'x': 30, 'y': 22 }, { 'x': 21, 'y': 23 }, { 'x': 22, 'y': 23 }, { 'x': 24, 'y': 23 }, { 'x': 26, 'y': 23 }, { 'x': 28, 'y': 23 }, { 'x': 29, 'y': 23 }, { 'x': 22, 'y': 24 }, { 'x': 23, 'y': 24 }, { 'x': 27, 'y': 24 }, { 'x': 28, 'y': 24 }, { 'x': 22, 'y': 26 }, { 'x': 23, 'y': 26 }, { 'x': 27, 'y': 26 }, { 'x': 28, 'y': 26 }, { 'x': 21, 'y': 27 }, { 'x': 22, 'y': 27 }, { 'x': 24, 'y': 27 }, { 'x': 26, 'y': 27 }, { 'x': 28, 'y': 27 }, { 'x': 29, 'y': 27 }, { 'x': 20, 'y': 28 }, { 'x': 21, 'y': 28 }, { 'x': 23, 'y': 28 }, { 'x': 24, 'y': 28 }, { 'x': 26, 'y': 28 }, { 'x': 27, 'y': 28 }, { 'x': 29, 'y': 28 }, { 'x': 30, 'y': 28 }, { 'x': 20, 'y': 29 }, { 'x': 22, 'y': 29 }, { 'x': 23, 'y': 29 }, { 'x': 27, 'y': 29 }, { 'x': 28, 'y': 29 }, { 'x': 30, 'y': 29 }, { 'x': 20, 'y': 30 }, { 'x': 21, 'y': 30 }, { 'x': 22, 'y': 30 }, { 'x': 28, 'y': 30 }, { 'x': 29, 'y': 30 }, { 'x': 30, 'y': 30 }] }, 'road': { 'pos': [{ 'x': 25, 'y': 25 }, { 'x': 25, 'y': 20 }, { 'x': 21, 'y': 21 }, { 'x': 24, 'y': 21 }, { 'x': 26, 'y': 21 }, { 'x': 29, 'y': 21 }, { 'x': 22, 'y': 22 }, { 'x': 25, 'y': 22 }, { 'x': 28, 'y': 22 }, { 'x': 23, 'y': 23 }, { 'x': 25, 'y': 23 }, { 'x': 27, 'y': 23 }, { 'x': 21, 'y': 24 }, { 'x': 24, 'y': 24 }, { 'x': 26, 'y': 24 }, { 'x': 29, 'y': 24 }, { 'x': 20, 'y': 25 }, { 'x': 22, 'y': 25 }, { 'x': 23, 'y': 25 }, { 'x': 27, 'y': 25 }, { 'x': 28, 'y': 25 }, { 'x': 30, 'y': 25 }, { 'x': 21, 'y': 26 }, { 'x': 24, 'y': 26 }, { 'x': 26, 'y': 26 }, { 'x': 29, 'y': 26 }, { 'x': 23, 'y': 27 }, { 'x': 25, 'y': 27 }, { 'x': 27, 'y': 27 }, { 'x': 22, 'y': 28 }, { 'x': 25, 'y': 28 }, { 'x': 28, 'y': 28 }, { 'x': 21, 'y': 29 }, { 'x': 24, 'y': 29 }, { 'x': 26, 'y': 29 }, { 'x': 29, 'y': 29 }, { 'x': 25, 'y': 30 }] }, 'tower': { 'pos': [{ 'x': 25, 'y': 21 }, { 'x': 21, 'y': 25 }, { 'x': 29, 'y': 25 }, { 'x': 25, 'y': 29 }] }, 'spawn': { 'pos': [{ 'x': 25, 'y': 24 }, { 'x': 24, 'y': 25 }, { 'x': 26, 'y': 25 }] }, 'container': { 'pos': [{ 'x': 25, 'y': 25 }] }, 'link': { 'pos': [{ 'x': 25, 'y': 26 }] } } }, };

// @formatter:off
var commandCenterLayout = { data: { anchor: { 'x': 25, 'y': 25 } }, 3: { 'name': 'commandCenter', 'shard': 'shard0', 'rcl': '3', 'buildings': { 'tower': { 'pos': [{ 'x': 24, 'y': 27 }] } } }, 4: { 'name': 'commandCenter', 'shard': 'shard0', 'rcl': '4', 'buildings': { 'road': { 'pos': [{ 'x': 21, 'y': 24 }, { 'x': 22, 'y': 24 }, { 'x': 23, 'y': 24 }, { 'x': 24, 'y': 24 }, { 'x': 25, 'y': 24 }, { 'x': 26, 'y': 24 }, { 'x': 21, 'y': 25 }, { 'x': 26, 'y': 25 }, { 'x': 21, 'y': 26 }, { 'x': 23, 'y': 26 }, { 'x': 24, 'y': 26 }, { 'x': 26, 'y': 26 }, { 'x': 21, 'y': 27 }, { 'x': 22, 'y': 27 }, { 'x': 25, 'y': 27 }, { 'x': 26, 'y': 27 }, { 'x': 21, 'y': 28 }, { 'x': 22, 'y': 28 }, { 'x': 25, 'y': 28 }, { 'x': 26, 'y': 28 }, { 'x': 21, 'y': 29 }, { 'x': 26, 'y': 29 }, { 'x': 21, 'y': 30 }, { 'x': 26, 'y': 30 }, { 'x': 21, 'y': 31 }, { 'x': 22, 'y': 31 }, { 'x': 23, 'y': 31 }, { 'x': 24, 'y': 31 }, { 'x': 25, 'y': 31 }, { 'x': 26, 'y': 31 }] }, 'storage': { 'pos': [{ 'x': 25, 'y': 25 }] }, 'tower': { 'pos': [{ 'x': 24, 'y': 27 }] } } }, 5: { 'name': 'commandCenter', 'shard': 'shard0', 'rcl': '5', 'buildings': { 'road': { 'pos': [{ 'x': 21, 'y': 24 }, { 'x': 22, 'y': 24 }, { 'x': 23, 'y': 24 }, { 'x': 24, 'y': 24 }, { 'x': 25, 'y': 24 }, { 'x': 26, 'y': 24 }, { 'x': 21, 'y': 25 }, { 'x': 26, 'y': 25 }, { 'x': 21, 'y': 26 }, { 'x': 23, 'y': 26 }, { 'x': 24, 'y': 26 }, { 'x': 26, 'y': 26 }, { 'x': 21, 'y': 27 }, { 'x': 22, 'y': 27 }, { 'x': 25, 'y': 27 }, { 'x': 26, 'y': 27 }, { 'x': 21, 'y': 28 }, { 'x': 22, 'y': 28 }, { 'x': 25, 'y': 28 }, { 'x': 26, 'y': 28 }, { 'x': 21, 'y': 29 }, { 'x': 26, 'y': 29 }, { 'x': 21, 'y': 30 }, { 'x': 26, 'y': 30 }, { 'x': 21, 'y': 31 }, { 'x': 22, 'y': 31 }, { 'x': 23, 'y': 31 }, { 'x': 24, 'y': 31 }, { 'x': 25, 'y': 31 }, { 'x': 26, 'y': 31 }] }, 'link': { 'pos': [{ 'x': 24, 'y': 25 }] }, 'storage': { 'pos': [{ 'x': 25, 'y': 25 }] }, 'tower': { 'pos': [{ 'x': 24, 'y': 27 }] } } }, 6: { 'name': 'commandCenter', 'shard': 'shard0', 'rcl': '6', 'buildings': { 'road': { 'pos': [{ 'x': 21, 'y': 24 }, { 'x': 22, 'y': 24 }, { 'x': 23, 'y': 24 }, { 'x': 24, 'y': 24 }, { 'x': 25, 'y': 24 }, { 'x': 26, 'y': 24 }, { 'x': 21, 'y': 25 }, { 'x': 26, 'y': 25 }, { 'x': 21, 'y': 26 }, { 'x': 23, 'y': 26 }, { 'x': 24, 'y': 26 }, { 'x': 26, 'y': 26 }, { 'x': 21, 'y': 27 }, { 'x': 22, 'y': 27 }, { 'x': 25, 'y': 27 }, { 'x': 26, 'y': 27 }, { 'x': 21, 'y': 28 }, { 'x': 22, 'y': 28 }, { 'x': 25, 'y': 28 }, { 'x': 26, 'y': 28 }, { 'x': 21, 'y': 29 }, { 'x': 26, 'y': 29 }, { 'x': 21, 'y': 30 }, { 'x': 26, 'y': 30 }, { 'x': 21, 'y': 31 }, { 'x': 22, 'y': 31 }, { 'x': 23, 'y': 31 }, { 'x': 24, 'y': 31 }, { 'x': 25, 'y': 31 }, { 'x': 26, 'y': 31 }] }, 'link': { 'pos': [{ 'x': 24, 'y': 25 }] }, 'storage': { 'pos': [{ 'x': 25, 'y': 25 }] }, 'terminal': { 'pos': [{ 'x': 25, 'y': 26 }] }, 'tower': { 'pos': [{ 'x': 24, 'y': 27 }] }, 'lab': { 'pos': [{ 'x': 23, 'y': 28 }, { 'x': 24, 'y': 28 }, { 'x': 24, 'y': 29 }] } } }, 7: { 'name': 'commandCenter', 'shard': 'shard0', 'rcl': '7', 'buildings': { 'road': { 'pos': [{ 'x': 21, 'y': 24 }, { 'x': 22, 'y': 24 }, { 'x': 23, 'y': 24 }, { 'x': 24, 'y': 24 }, { 'x': 25, 'y': 24 }, { 'x': 26, 'y': 24 }, { 'x': 21, 'y': 25 }, { 'x': 26, 'y': 25 }, { 'x': 21, 'y': 26 }, { 'x': 23, 'y': 26 }, { 'x': 24, 'y': 26 }, { 'x': 26, 'y': 26 }, { 'x': 21, 'y': 27 }, { 'x': 22, 'y': 27 }, { 'x': 25, 'y': 27 }, { 'x': 26, 'y': 27 }, { 'x': 21, 'y': 28 }, { 'x': 22, 'y': 28 }, { 'x': 25, 'y': 28 }, { 'x': 26, 'y': 28 }, { 'x': 21, 'y': 29 }, { 'x': 26, 'y': 29 }, { 'x': 21, 'y': 30 }, { 'x': 26, 'y': 30 }, { 'x': 21, 'y': 31 }, { 'x': 22, 'y': 31 }, { 'x': 23, 'y': 31 }, { 'x': 24, 'y': 31 }, { 'x': 25, 'y': 31 }, { 'x': 26, 'y': 31 }] }, 'link': { 'pos': [{ 'x': 24, 'y': 25 }] }, 'storage': { 'pos': [{ 'x': 25, 'y': 25 }] }, 'terminal': { 'pos': [{ 'x': 25, 'y': 26 }] }, 'tower': { 'pos': [{ 'x': 23, 'y': 27 }, { 'x': 24, 'y': 27 }] }, 'lab': { 'pos': [{ 'x': 23, 'y': 28 }, { 'x': 24, 'y': 28 }, { 'x': 22, 'y': 29 }, { 'x': 23, 'y': 29 }, { 'x': 24, 'y': 29 }, { 'x': 25, 'y': 29 }] } } }, 8: { 'name': 'commandCenter', 'shard': 'shard0', 'rcl': '8', 'buildings': { 'road': { 'pos': [{ 'x': 21, 'y': 24 }, { 'x': 22, 'y': 24 }, { 'x': 23, 'y': 24 }, { 'x': 24, 'y': 24 }, { 'x': 25, 'y': 24 }, { 'x': 26, 'y': 24 }, { 'x': 21, 'y': 25 }, { 'x': 26, 'y': 25 }, { 'x': 21, 'y': 26 }, { 'x': 23, 'y': 26 }, { 'x': 24, 'y': 26 }, { 'x': 26, 'y': 26 }, { 'x': 21, 'y': 27 }, { 'x': 22, 'y': 27 }, { 'x': 25, 'y': 27 }, { 'x': 26, 'y': 27 }, { 'x': 21, 'y': 28 }, { 'x': 22, 'y': 28 }, { 'x': 25, 'y': 28 }, { 'x': 26, 'y': 28 }, { 'x': 21, 'y': 29 }, { 'x': 26, 'y': 29 }, { 'x': 21, 'y': 30 }, { 'x': 26, 'y': 30 }, { 'x': 21, 'y': 31 }, { 'x': 22, 'y': 31 }, { 'x': 23, 'y': 31 }, { 'x': 24, 'y': 31 }, { 'x': 25, 'y': 31 }, { 'x': 26, 'y': 31 }] }, 'nuker': { 'pos': [{ 'x': 22, 'y': 25 }] }, 'powerSpawn': { 'pos': [{ 'x': 23, 'y': 25 }] }, 'link': { 'pos': [{ 'x': 24, 'y': 25 }] }, 'storage': { 'pos': [{ 'x': 25, 'y': 25 }] }, 'observer': { 'pos': [{ 'x': 22, 'y': 26 }] }, 'terminal': { 'pos': [{ 'x': 25, 'y': 26 }] }, 'tower': { 'pos': [{ 'x': 23, 'y': 27 }, { 'x': 24, 'y': 27 }] }, 'lab': { 'pos': [{ 'x': 23, 'y': 28 }, { 'x': 24, 'y': 28 }, { 'x': 22, 'y': 29 }, { 'x': 23, 'y': 29 }, { 'x': 24, 'y': 29 }, { 'x': 25, 'y': 29 }, { 'x': 22, 'y': 30 }, { 'x': 23, 'y': 30 }, { 'x': 24, 'y': 30 }, { 'x': 25, 'y': 30 }] } } }, };

/* Road planner: sensibly builds road networks around colonies */
let memoryDefaults$1 = {
    active: true,
    roadLookup: {},
};
class RoadPlanner {
    constructor(roomPlanner) {
        this.roomPlanner = roomPlanner;
        this.colony = roomPlanner.colony;
        this.costMatrices = {};
        this.roadPositions = [];
    }
    get memory() {
        return Mem.wrap(this.colony.memory, 'roadPlanner', memoryDefaults$1);
    }
    recalculateRoadNetwork(commandCenterPos, hatcheryPos, obstacles) {
        this.buildRoadNetwork(commandCenterPos, hatcheryPos, obstacles);
        this.finalize();
    }
    // Connect commandCenter to hatchery, upgradeSites, and all miningSites, and place containers
    buildRoadNetwork(commandCenterPos, hatcheryPos, obstacles) {
        this.costMatrices = {};
        this.roadPositions = [];
        let destinations = _.sortBy(this.colony.destinations, pos => pos.getMultiRoomRangeTo(commandCenterPos));
        // Connect commandCenter to hatchery
        this.planRoad(commandCenterPos, hatcheryPos, obstacles);
        // Connect commandCenter to each destination in colony
        for (let pos of destinations) {
            this.planRoad(commandCenterPos, pos, obstacles);
        }
        this.formatRoadPositions();
    }
    // Plan a road between two locations avoiding a list of planned obstacles; pos1 should be storage for best results
    planRoad(pos1, pos2, obstacles) {
        let opts = { obstacles: obstacles, ensurePath: true, range: 1 };
        // Find the shortest path, preferentially stepping on tiles with road routing flags on them
        let roadPath = this.generateRoadPath(pos1, pos2, opts);
        if (roadPath) {
            this.roadPositions = this.roadPositions.concat(roadPath);
        }
    }
    initCostMatrix(roomName, options) {
        let matrix = undefined;
        let room = Game.rooms[roomName];
        if (room) {
            matrix = Traveler.getStructureMatrix(room, options.freshMatrix);
            if (options.obstacles) {
                matrix = matrix.clone();
                for (let obstacle of options.obstacles) {
                    if (obstacle.roomName !== roomName) {
                        continue;
                    }
                    matrix.set(obstacle.x, obstacle.y, 0xff);
                }
            }
        }
        if (matrix) {
            this.costMatrices[roomName] = matrix;
        }
    }
    /* Generates a road path and modifies cost matrices to encourage merging with future roads */
    generateRoadPath(origin, destination, options = {}) {
        _.defaults(options, {
            ignoreCreeps: true,
            ensurePath: true,
            range: 1,
            offRoad: true,
            allowSK: true,
        });
        let originRoomName = origin.roomName;
        let destRoomName = destination.roomName;
        let roomDistance = Game.map.getRoomLinearDistance(origin.roomName, destination.roomName);
        let allowedRooms = options.route;
        if (!allowedRooms && (options.useFindRoute || (options.useFindRoute === undefined && roomDistance > 2))) {
            let route = Traveler.findRoute(origin.roomName, destination.roomName, options);
            if (route) {
                allowedRooms = route;
            }
        }
        let callback = (roomName) => {
            if (allowedRooms) {
                if (!allowedRooms[roomName]) {
                    return false;
                }
            }
            else if (!options.allowHostile && Traveler.checkAvoid(roomName)
                && roomName !== destRoomName && roomName !== originRoomName) {
                return false;
            }
            // Initialize cost matrix
            if (!this.costMatrices[roomName]) {
                this.initCostMatrix(roomName, options);
            }
            // See if initialization was successful
            if (this.costMatrices[roomName]) {
                return this.costMatrices[roomName];
            }
            else {
                return false;
            }
        };
        let ret = PathFinder.search(origin, { pos: destination, range: options.range }, {
            maxOps: options.maxOps,
            maxRooms: options.maxRooms,
            plainCost: 2,
            swampCost: 2,
            roomCallback: callback,
        });
        if (ret.incomplete) {
            return;
        }
        // Set every n-th tile of a planned path to be cost 1 to encourage road overlap for future pathing
        if (RoadPlanner.settings.encourageRoadMerging) {
            let interval = RoadPlanner.settings.tileCostReductionInterval;
            for (let i of _.range(ret.path.length)) {
                if (i % interval == interval - 1) {
                    let pos = ret.path[i];
                    if (this.costMatrices[pos.roomName] && !pos.isEdge) {
                        this.costMatrices[pos.roomName].set(pos.x, pos.y, 0x01);
                    }
                }
            }
        }
        // Return the pathfinder results
        return ret.path;
    }
    /* Ensure that the roads doesn't overlap with roads from this.map and that the positions are unique */
    formatRoadPositions() {
        // Make road position list unique
        this.roadPositions = _.unique(this.roadPositions);
        // Remove roads located on exit tiles
        _.remove(this.roadPositions, pos => pos.isEdge);
        // Remove any roads duplicated in this.map
        let roomPlannerRoads = this.roomPlanner.plannedStructurePositions(STRUCTURE_ROAD);
        if (roomPlannerRoads != undefined) {
            _.remove(this.roadPositions, pos => roomPlannerRoads.includes(pos));
        }
    }
    /* Write everything to memory after roomPlanner is closed */
    finalize() {
        // Collect all roads from this and from room planner
        let roomPlannerRoads;
        if (this.roomPlanner.map != {}) { // use active map
            roomPlannerRoads = this.roomPlanner.map[STRUCTURE_ROAD];
        }
        else { // retrieve from memory
            if (this.roomPlanner.memory.bunkerData && this.roomPlanner.memory.bunkerData.anchor) {
                let layout = this.roomPlanner.getStructureMapForBunkerAt(this.roomPlanner.memory.bunkerData.anchor);
                roomPlannerRoads = layout[STRUCTURE_ROAD] || [];
            }
            else if (this.roomPlanner.memory.mapsByLevel) {
                roomPlannerRoads = _.map(this.roomPlanner.memory.mapsByLevel[8][STRUCTURE_ROAD], protoPos => derefRoomPosition(protoPos));
            }
            else {
                log.error(`RoadPlanner@${this.colony.room.print}: could not get road positions from room planner!`);
                roomPlannerRoads = [];
            }
        }
        let allRoadPos = _.compact(this.roadPositions.concat(roomPlannerRoads));
        // Encode the coordinates of the road as keys in a truthy hash table for fast lookup
        this.memory.roadLookup = {};
        for (let pos of allRoadPos) {
            if (!this.memory.roadLookup[pos.roomName])
                this.memory.roadLookup[pos.roomName] = {};
            this.memory.roadLookup[pos.roomName][pos.coordName] = true;
        }
    }
    init() {
    }
    static shouldBuild(structureType, pos) {
        if (!pos.room)
            return false;
        let buildings = _.filter(pos.lookFor(LOOK_STRUCTURES), s => s && s.structureType == structureType);
        let sites = pos.lookFor(LOOK_CONSTRUCTION_SITES);
        if (!buildings || buildings.length == 0) {
            if (!sites || sites.length == 0) {
                return true;
            }
        }
        return false;
    }
    /* Create construction sites for any buildings that need to be built */
    buildMissing() {
        // Max buildings that can be placed each tick
        let count = RoomPlanner.settings.maxSitesPerColony - this.colony.constructionSites.length;
        // Build missing roads
        let roadPositions = [];
        for (let roomName in this.memory.roadLookup) {
            for (let coords of _.keys(this.memory.roadLookup[roomName])) {
                let [x, y] = coords.split(':');
                roadPositions.push(new RoomPosition(parseInt(x, 10), parseInt(y, 10), roomName));
            }
        }
        let origin = (this.colony.storage || this.colony.hatchery || this.colony).pos;
        roadPositions = _.sortBy(roadPositions, pos => pos.getMultiRoomRangeTo(origin));
        for (let pos of roadPositions) {
            if (count > 0 && RoomPlanner.shouldBuild(STRUCTURE_ROAD, pos)) {
                let ret = pos.createConstructionSite(STRUCTURE_ROAD);
                if (ret != OK) {
                    log.error(`${this.colony.name}: couldn't create road site at ${pos.print}. Result: ${ret}`);
                }
                else {
                    count--;
                }
            }
        }
    }
    /* Quick lookup for if a road should be in this position. Roads returning false won't be maintained. */
    roadShouldBeHere(pos) {
        // Initial migration code, can delete later
        if (this.memory.roadLookup[pos.roomName]) {
            return this.memory.roadLookup[pos.roomName][pos.coordName];
        }
        return false;
    }
    run() {
        if (this.roomPlanner.active) {
            if (this.roomPlanner.storagePos && this.roomPlanner.hatcheryPos) {
                this.buildRoadNetwork(this.roomPlanner.storagePos, this.roomPlanner.hatcheryPos, this.roomPlanner.getObstacles());
            }
            this.visuals();
        }
        else {
            // Once in a blue moon, recalculate the entire network and write to memory to keep it up to date
            if (Game.time % RoadPlanner.settings.recalculateRoadNetworkInterval == this.colony.id) {
                if (this.roomPlanner.storagePos && this.roomPlanner.hatcheryPos) {
                    this.recalculateRoadNetwork(this.roomPlanner.storagePos, this.roomPlanner.hatcheryPos, this.roomPlanner.getObstacles());
                }
            }
            if (this.colony.level >= RoadPlanner.settings.buildRoadsAtRCL &&
                Game.time % RoomPlanner.settings.siteCheckFrequency == this.colony.id + 2) {
                this.buildMissing();
            }
        }
    }
    visuals() {
        // Draw the map
        Visualizer.drawRoads(this.roadPositions);
    }
}
RoadPlanner.settings = {
    encourageRoadMerging: true,
    tileCostReductionInterval: 10,
    recalculateRoadNetworkInterval: 1000,
    buildRoadsAtRCL: 4,
};

/**
 * Code for calculating the minCut in a room, written by Saruss,
 * adapted for Typescript and flexible room subsets by Chobobobo,
 * modified and debugged by Muon.
 */
const UNWALKABLE = -10;
const RANGE_MODIFIER = 1; // this parameter sets the scaling of weights to prefer walls closer protection bounds
const RANGE_PADDING = 3; // max range to reduce weighting; RANGE_MODIFIER * RANGE_PADDING must be < PROTECTED
const NORMAL = 0;
const PROTECTED = 10;
const CANNOT_BUILD = 20;
const EXIT = 30;
class Graph {
    constructor(totalVertices) {
        this.totalVertices = totalVertices;
        this.level = Array(totalVertices);
        // An array of edges for each vertex
        this.edges = Array(totalVertices).fill(0).map((x) => []);
    }
    /**
     * Create a new edge in the graph as well as a corresponding reverse edge on the residual graph
     * @param from - vertex edge starts at
     * @param to - vertex edge leads to
     * @param capacity - max flow capacity for this edge
     */
    newEdge(from, to, capacity) {
        // Normal forward Edge
        this.edges[from].push({ to, resEdge: this.edges[to].length, capacity, flow: 0 });
        // reverse Edge for Residual Graph
        this.edges[to].push({ to: from, resEdge: this.edges[from].length - 1, capacity: 0, flow: 0 });
    }
    /**
     * Uses Breadth First Search to see if a path exists to the vertex 'to' and generate the level graph
     * @param from - vertex to start from
     * @param to - vertex to try and reach
     */
    createLevelGraph(from, to) {
        if (to >= this.totalVertices) {
            return false;
        }
        this.level.fill(-1); // reset old levels
        this.level[from] = 0;
        const q = []; // queue with s as starting point
        q.push(from);
        let u = 0;
        let edge = null;
        while (q.length) {
            u = q.shift();
            for (edge of this.edges[u]) {
                if (this.level[edge.to] < 0 && edge.flow < edge.capacity) {
                    this.level[edge.to] = this.level[u] + 1;
                    q.push(edge.to);
                }
            }
        }
        return this.level[to] >= 0; // return if theres a path, no level, no path!
    }
    /**
     * Depth First Search-like: send flow at along path from from->to recursively while increasing the level of the
     * visited vertices by one
     * @param start - the vertex to start at
     * @param end - the vertex to try and reach
     * @param targetFlow - the amount of flow to try and achieve
     * @param count - keep track of which vertices have been visited so we don't include them twice
     */
    calcFlow(start, end, targetFlow, count) {
        if (start === end) { // Sink reached , abort recursion
            return targetFlow;
        }
        let edge;
        let flowTillHere = 0;
        let flowToT = 0;
        while (count[start] < this.edges[start].length) { // Visit all edges of the vertex one after the other
            edge = this.edges[start][count[start]];
            if (this.level[edge.to] === this.level[start] + 1 && edge.flow < edge.capacity) {
                // Edge leads to Vertex with a level one higher, and has flow left
                flowTillHere = Math.min(targetFlow, edge.capacity - edge.flow);
                flowToT = this.calcFlow(edge.to, end, flowTillHere, count);
                if (flowToT > 0) {
                    edge.flow += flowToT; // Add Flow to current edge
                    // subtract from reverse Edge -> Residual Graph neg. Flow to use backward direction of BFS/DFS
                    this.edges[edge.to][edge.resEdge].flow -= flowToT;
                    return flowToT;
                }
            }
            count[start]++;
        }
        return 0;
    }
    /**
     * Uses Breadth First Search to find the vertices in the minCut for the graph
     * - Must call calcMinCut first to prepare the graph
     * @param from - the vertex to start from
     */
    getMinCut(from) {
        const eInCut = [];
        this.level.fill(-1);
        this.level[from] = 1;
        const q = [];
        q.push(from);
        let u = 0;
        let edge;
        while (q.length) {
            u = q.shift();
            for (edge of this.edges[u]) {
                if (edge.flow < edge.capacity) {
                    if (this.level[edge.to] < 1) {
                        this.level[edge.to] = 1;
                        q.push(edge.to);
                    }
                }
                if (edge.flow === edge.capacity && edge.capacity > 0) { // blocking edge -> could be in min cut
                    eInCut.push({ to: edge.to, unreachable: u });
                }
            }
        }
        const minCut = [];
        let cutEdge;
        for (cutEdge of eInCut) {
            if (this.level[cutEdge.to] === -1) {
                // Only edges which are blocking and lead to the sink from unreachable vertices are in the min cut
                minCut.push(cutEdge.unreachable);
            }
        }
        return minCut;
    }
    /**
     * Calculates min-cut graph using Dinic's Algorithm.
     * use getMinCut to get the actual verticies in the minCut
     * @param source - Source vertex
     * @param sink - Sink vertex
     */
    calcMinCut(source, sink) {
        if (source === sink) {
            return -1;
        }
        let ret = 0;
        let count = [];
        let flow = 0;
        while (this.createLevelGraph(source, sink)) {
            count = Array(this.totalVertices + 1).fill(0);
            do {
                flow = this.calcFlow(source, sink, Number.MAX_VALUE, count);
                if (flow > 0) {
                    ret += flow;
                }
            } while (flow);
        }
        return ret;
    }
}
/**
 * An Array with Terrain information: -1 not usable, 2 Sink (Leads to Exit)
 * @param room - the room to generate the terrain map from
 */
function get2DArray(roomName, bounds = { x1: 0, y1: 0, x2: 49, y2: 49 }) {
    const room2D = Array(50).fill(NORMAL).map((d) => Array(50).fill(NORMAL)); // Array for room tiles
    let x;
    let y;
    for (x = bounds.x1; x <= bounds.x2; x++) {
        for (y = bounds.y1; y <= bounds.y2; y++) {
            if (Game.map.getTerrainAt(x, y, roomName) === 'wall') {
                room2D[x][y] = UNWALKABLE; // Mark unwalkable
            }
            else if (x === bounds.x1 || y === bounds.y1 || x === bounds.x2 || y === bounds.y2) {
                room2D[x][y] = EXIT; // Mark exit tiles
            }
        }
    }
    // Marks tiles as unbuildable if they are proximate to exits
    for (y = bounds.y1 + 1; y <= bounds.y2 - 1; y++) {
        if (room2D[bounds.x1][y] === EXIT) {
            for (let dy of [-1, 0, 1]) {
                if (room2D[bounds.x1 + 1][y + dy] !== UNWALKABLE) {
                    room2D[bounds.x1 + 1][y + dy] = CANNOT_BUILD;
                }
            }
        }
        if (room2D[bounds.x2][y] === EXIT) {
            for (let dy of [-1, 0, 1]) {
                if (room2D[bounds.x2 - 1][y + dy] !== UNWALKABLE) {
                    room2D[bounds.x2 - 1][y + dy] = CANNOT_BUILD;
                }
            }
        }
    }
    for (x = bounds.x1 + 1; x <= bounds.x2 - 1; x++) {
        if (room2D[x][bounds.y1] === EXIT) {
            for (let dx of [-1, 0, 1]) {
                if (room2D[x + dx][bounds.y1 + 1] !== UNWALKABLE) {
                    room2D[x + dx][bounds.y1 + 1] = CANNOT_BUILD;
                }
            }
        }
        if (room2D[x][bounds.y2] === EXIT) {
            for (let dx of [-1, 0, 1]) {
                if (room2D[x + dx][bounds.y2 - 1] !== UNWALKABLE) {
                    room2D[x + dx][bounds.y2 - 1] = CANNOT_BUILD;
                }
            }
        }
    }
    return room2D;
}
/**
 * Function to create Source, Sink, Tiles arrays: takes a rectangle-Array as input for Tiles that are to Protect
 * @param room - the room to consider
 * @param toProtect - the coordinates to protect inside the walls
 * @param bounds - the area to consider for the minCut
 */
function createGraph(roomName, toProtect, preferCloserBarriers = true, preferCloserBarrierLimit = Infinity, // ignore the toProtect[n] for n > this value
visualize = true, bounds = { x1: 0, y1: 0, x2: 49, y2: 49 }) {
    const visual = new RoomVisual(roomName);
    const roomArray = get2DArray(roomName, bounds);
    // For all Rectangles, set edges as source (to protect area) and area as unused
    let r;
    let x;
    let y;
    for (r of toProtect) {
        if (bounds.x1 >= bounds.x2 || bounds.y1 >= bounds.y2 ||
            bounds.x1 < 0 || bounds.y1 < 0 || bounds.x2 > 49 || bounds.y2 > 49) {
            return console.log('ERROR: Invalid bounds', JSON.stringify(bounds));
        }
        else if (r.x1 >= r.x2 || r.y1 >= r.y2) {
            return console.log('ERROR: Rectangle', JSON.stringify(r), 'invalid.');
        }
        else if (r.x1 < bounds.x1 || r.x2 > bounds.x2 || r.y1 < bounds.y1 || r.y2 > bounds.y2) {
            return console.log('ERROR: Rectangle', JSON.stringify(r), 'out of bounds:', JSON.stringify(bounds));
        }
        for (x = r.x1; x <= r.x2; x++) {
            for (y = r.y1; y <= r.y2; y++) {
                if (x === r.x1 || x === r.x2 || y === r.y1 || y === r.y2) {
                    if (roomArray[x][y] === NORMAL) {
                        roomArray[x][y] = PROTECTED;
                    }
                }
                else {
                    roomArray[x][y] = UNWALKABLE;
                }
            }
        }
    }
    // Preferentially weight closer tiles
    if (preferCloserBarriers) {
        for (r of _.take(toProtect, preferCloserBarrierLimit)) {
            let [xmin, xmax] = [Math.max(r.x1 - RANGE_PADDING, 0), Math.min(r.x2 + RANGE_PADDING, 49)];
            let [ymin, ymax] = [Math.max(r.y1 - RANGE_PADDING, 0), Math.min(r.y2 + RANGE_PADDING, 49)];
            for (x = xmin; x <= xmax; x++) {
                for (y = ymin; y <= ymax; y++) {
                    if (roomArray[x][y] >= NORMAL && roomArray[x][y] < PROTECTED) {
                        let x1range = Math.max(r.x1 - x, 0);
                        let x2range = Math.max(x - r.x2, 0);
                        let y1range = Math.max(r.y1 - y, 0);
                        let y2range = Math.max(y - r.y2, 0);
                        let rangeToBorder = Math.max(x1range, x2range, y1range, y2range);
                        let modifiedWeight = NORMAL + RANGE_MODIFIER * (RANGE_PADDING - rangeToBorder);
                        roomArray[x][y] = Math.max(roomArray[x][y], modifiedWeight);
                        if (visualize) {
                            visual.text(`${roomArray[x][y]}`, x, y);
                        }
                    }
                }
            }
        }
    }
    if (visualize) {
        for (x = bounds.x1; x <= bounds.x2; x++) {
            for (y = bounds.y1; y <= bounds.y2; y++) {
                if (roomArray[x][y] === UNWALKABLE) {
                    visual.circle(x, y, { radius: 0.5, fill: '#1b1b9f', opacity: 0.3 });
                }
                else if (roomArray[x][y] > UNWALKABLE && roomArray[x][y] < NORMAL) {
                    visual.circle(x, y, { radius: 0.5, fill: '#42cce8', opacity: 0.3 });
                }
                else if (roomArray[x][y] === NORMAL) {
                    visual.circle(x, y, { radius: 0.5, fill: '#bdb8b8', opacity: 0.3 });
                }
                else if (roomArray[x][y] > NORMAL && roomArray[x][y] < PROTECTED) {
                    visual.circle(x, y, { radius: 0.5, fill: '#9929e8', opacity: 0.3 });
                }
                else if (roomArray[x][y] === PROTECTED) {
                    visual.circle(x, y, { radius: 0.5, fill: '#e800c6', opacity: 0.3 });
                }
                else if (roomArray[x][y] === CANNOT_BUILD) {
                    visual.circle(x, y, { radius: 0.5, fill: '#e8000f', opacity: 0.3 });
                }
                else if (roomArray[x][y] === EXIT) {
                    visual.circle(x, y, { radius: 0.5, fill: '#000000', opacity: 0.3 });
                }
            }
        }
    }
    // initialise graph
    // possible 2*50*50 +2 (st) Vertices (Walls etc set to unused later)
    const g = new Graph(2 * 50 * 50 + 2);
    const infini = Number.MAX_VALUE;
    const surr = [[0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]];
    // per Tile (0 in Array) top + bot with edge of c=1 from top to bott  (use every tile once!)
    // infini edge from bot to top vertices of adjacent tiles if they not protected (array =1)
    // (no reverse edges in normal graph)
    // per prot. Tile (1 in array) Edge from source to this tile with infini cap.
    // per exit Tile (2in array) Edge to sink with infini cap.
    // source is at  pos 2*50*50, sink at 2*50*50+1 as first tile is 0,0 => pos 0
    // top vertices <-> x,y : v=y*50+x   and x= v % 50  y=v/50 (math.floor?)
    // bot vertices <-> top + 2500
    const source = 2 * 50 * 50;
    const sink = 2 * 50 * 50 + 1;
    let top = 0;
    let bot = 0;
    let dx = 0;
    let dy = 0;
    // max = 49;
    const baseCapacity = 10;
    const modifyWeight = preferCloserBarriers ? 1 : 0;
    for (x = bounds.x1 + 1; x < bounds.x2; x++) {
        for (y = bounds.y1 + 1; y < bounds.y2; y++) {
            top = y * 50 + x;
            bot = top + 2500;
            if (roomArray[x][y] >= NORMAL && roomArray[x][y] <= PROTECTED) {
                if (roomArray[x][y] >= NORMAL && roomArray[x][y] < PROTECTED) {
                    g.newEdge(top, bot, baseCapacity - modifyWeight * roomArray[x][y]); // add surplus weighting
                }
                else if (roomArray[x][y] === PROTECTED) { // connect this to the source
                    g.newEdge(source, top, infini);
                    g.newEdge(top, bot, baseCapacity - modifyWeight * RANGE_PADDING * RANGE_MODIFIER);
                }
                for (let i = 0; i < 8; i++) { // attach adjacent edges
                    dx = x + surr[i][0];
                    dy = y + surr[i][1];
                    if ((roomArray[dx][dy] >= NORMAL && roomArray[dx][dy] < PROTECTED)
                        || roomArray[dx][dy] === CANNOT_BUILD) {
                        g.newEdge(bot, dy * 50 + dx, infini);
                    }
                }
            }
            else if (roomArray[x][y] === CANNOT_BUILD) { // near Exit
                g.newEdge(top, sink, infini);
            }
        }
    } // graph finished
    return g;
}
/**
 * Main function to be called by user: calculate min cut tiles from room using rectangles as protected areas
 * @param room - the room to use
 * @param rectangles - the areas to protect, defined as rectangles
 * @param bounds - the area to be considered for the minCut
 */
function getCutTiles(roomName, toProtect, preferCloserBarriers = true, preferCloserBarrierLimit = Infinity, visualize = true, bounds = { x1: 0, y1: 0, x2: 49, y2: 49 }) {
    const graph = createGraph(roomName, toProtect, preferCloserBarriers, preferCloserBarrierLimit, visualize, bounds);
    if (!graph) {
        return [];
    }
    let x;
    let y;
    const source = 2 * 50 * 50; // Position Source / Sink in Room-Graph
    const sink = 2 * 50 * 50 + 1;
    const count = graph.calcMinCut(source, sink);
    // console.log('Number of Tiles in Cut:', count);
    const positions = [];
    if (count > 0) {
        const cutVertices = graph.getMinCut(source);
        let v;
        for (v of cutVertices) {
            // x= vertex % 50  y=v/50 (math.floor?)
            x = v % 50;
            y = Math.floor(v / 50);
            positions.push({ x, y });
        }
    }
    // Visualise Result
    if (positions.length > 0) {
        const visual = new RoomVisual(roomName);
        for (let i = positions.length - 1; i >= 0; i--) {
            visual.circle(positions[i].x, positions[i].y, { radius: 0.5, fill: '#ff7722', opacity: 0.9 });
        }
    }
    else {
        return [];
    }
    const wholeRoom = bounds.x1 === 0 && bounds.y1 === 0 && bounds.x2 === 49 && bounds.y2 === 49;
    return wholeRoom ? positions : pruneDeadEnds(roomName, positions);
}
/**
 * Removes unnecessary tiles if they are blocking the path to a dead end
 * Useful if minCut has been run on a subset of the room
 * @param roomName - Room to work in
 * @param cutTiles - Array of tiles which are in the minCut
 */
function pruneDeadEnds(roomName, cutTiles) {
    // Get Terrain and set all cut-tiles as unwalkable
    const roomArray = get2DArray(roomName);
    let tile;
    for (tile of cutTiles) {
        roomArray[tile.x][tile.y] = UNWALKABLE;
    }
    // Floodfill from exits: save exit tiles in array and do a BFS-like search
    const unvisited = [];
    let y;
    let x;
    for (y = 0; y < 49; y++) {
        if (roomArray[0][y] === EXIT) {
            console.log('prune: toExit', 0, y);
            unvisited.push(50 * y);
        }
        if (roomArray[49][y] === EXIT) {
            console.log('prune: toExit', 49, y);
            unvisited.push(50 * y + 49);
        }
    }
    for (x = 0; x < 49; x++) {
        if (roomArray[x][0] === EXIT) {
            console.log('prune: toExit', x, 0);
            unvisited.push(x);
        }
        if (roomArray[x][49] === EXIT) {
            console.log('prune: toExit', x, 49);
            unvisited.push(2450 + x); // 50*49=2450
        }
    }
    // Iterate over all unvisited EXIT tiles and mark neigbours as EXIT tiles if walkable, add to unvisited
    const surr = [[0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1]];
    let currPos;
    let dx;
    let dy;
    while (unvisited.length > 0) {
        currPos = unvisited.pop();
        x = currPos % 50;
        y = Math.floor(currPos / 50);
        for (let i = 0; i < 8; i++) {
            dx = x + surr[i][0];
            dy = y + surr[i][1];
            if (dx < 0 || dx > 49 || dy < 0 || dy > 49) {
                continue;
            }
            if ((roomArray[dx][dy] >= NORMAL && roomArray[dx][dy] < PROTECTED)
                || roomArray[dx][dy] === CANNOT_BUILD) {
                unvisited.push(50 * dy + dx);
                roomArray[dx][dy] = EXIT;
            }
        }
    }
    // Remove min-Cut-Tile if there is no EXIT reachable by it
    let leadsToExit;
    const validCut = [];
    for (tile of cutTiles) {
        leadsToExit = false;
        for (let j = 0; j < 8; j++) {
            dx = tile.x + surr[j][0];
            dy = tile.y + surr[j][1];
            if (roomArray[dx][dy] === EXIT) {
                leadsToExit = true;
            }
        }
        if (leadsToExit) {
            validCut.push(tile);
        }
    }
    return validCut;
}
/**
 * Example function: demonstrates how to get a min cut with 2 rectangles, which define a "to protect" area
 * @param roomName - the name of the room to use for the test, must be visible
 */

/**
 * Example function: demonstrates how to get a min cut with 2 rectangles, which define a "to protect" area
 * while considering a subset of the larger room.
 * @param roomName - the name of the room to use for the test, must be visible
 */

let memoryDefaults$2 = {
    barrierLookup: {},
};
class BarrierPlanner {
    constructor(roomPlanner) {
        this.roomPlanner = roomPlanner;
        this.colony = roomPlanner.colony;
        this.barrierPositions = [];
    }
    get memory() {
        return Mem.wrap(this.colony.memory, 'barrierPlanner', memoryDefaults$2);
    }
    computeBarrierPositions(hatcheryPos, commandCenterPos, upgradeSitePos) {
        let rectArray = [];
        let padding = BarrierPlanner.settings.padding;
        if (hatcheryPos) {
            let { x, y } = hatcheryPos;
            let [x1, y1] = [Math.max(x - 5 - padding, 0), Math.max(y - 4 - padding, 0)];
            let [x2, y2] = [Math.min(x + 5 + padding, 49), Math.min(y + 6 + padding, 49)];
            rectArray.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
        }
        if (commandCenterPos) {
            let { x, y } = commandCenterPos;
            let [x1, y1] = [Math.max(x - 3 - padding, 0), Math.max(y - 0 - padding, 0)];
            let [x2, y2] = [Math.min(x + 0 + padding, 49), Math.min(y + 5 + padding, 49)];
            rectArray.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
        }
        if (upgradeSitePos) {
            let { x, y } = upgradeSitePos;
            let [x1, y1] = [Math.max(x - 1, 0), Math.max(y - 1, 0)];
            let [x2, y2] = [Math.min(x + 1, 49), Math.min(y + 1, 49)];
            rectArray.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
        }
        // Get Min cut
        let barrierCoords = getCutTiles(this.colony.name, rectArray, true, 2, false);
        return _.map(barrierCoords, coord => new RoomPosition(coord.x, coord.y, this.colony.name));
    }
    init() {
    }
    /* Write everything to memory after roomPlanner is closed */
    finalize() {
        this.memory.barrierLookup = {};
        if (this.barrierPositions.length == 0) {
            if (this.roomPlanner.storagePos && this.roomPlanner.hatcheryPos) {
                this.barrierPositions = this.computeBarrierPositions(this.roomPlanner.hatcheryPos, this.roomPlanner.storagePos, this.colony.controller.pos);
            }
            else {
                log.error(`Couldn't generate barrier plan for ${this.colony.name}!`);
            }
        }
        for (let pos of this.barrierPositions) {
            this.memory.barrierLookup[pos.coordName] = true;
        }
    }
    /* Quick lookup for if a barrier should be in this position. Barriers returning false won't be maintained. */
    barrierShouldBeHere(pos) {
        return this.memory.barrierLookup[pos.coordName] || false;
    }
    /* Create construction sites for any buildings that need to be built */
    buildMissing() {
        // Max buildings that can be placed each tick
        let count = RoomPlanner.settings.maxSitesPerColony - this.colony.constructionSites.length;
        // Build missing roads
        let barrierPositions = [];
        for (let coords of _.keys(this.memory.barrierLookup)) {
            barrierPositions.push(derefCoords(coords, this.colony.name));
        }
        for (let pos of barrierPositions) {
            if (count > 0 && RoomPlanner.shouldBuild(STRUCTURE_RAMPART, pos)) {
                let ret = pos.createConstructionSite(STRUCTURE_RAMPART);
                if (ret != OK) {
                    log.error(`${this.colony.name}: couldn't create rampart site at ${pos.print}. Result: ${ret}`);
                }
                else {
                    count--;
                }
            }
        }
    }
    run() {
        if (this.roomPlanner.active) {
            if (this.roomPlanner.storagePos && this.roomPlanner.hatcheryPos) {
                this.barrierPositions = this.computeBarrierPositions(this.roomPlanner.hatcheryPos, this.roomPlanner.storagePos, this.colony.controller.pos);
            }
            this.visuals();
        }
        else {
            if (this.colony.level >= BarrierPlanner.settings.buildBarriersAtRCL &&
                Game.time % RoomPlanner.settings.siteCheckFrequency == this.colony.id + 1) {
                this.buildMissing();
            }
        }
    }
    visuals() {
        for (let pos of this.barrierPositions) {
            this.colony.room.visual.structure(pos.x, pos.y, STRUCTURE_RAMPART);
        }
    }
}
BarrierPlanner.settings = {
    buildBarriersAtRCL: 3,
    padding: 3,
};

var bunkerLayout = {
    data: { anchor: { 'x': 25, 'y': 25 } },
    1: {
        'name': 'bunkerCore',
        'shard': 'shard2',
        'rcl': '1',
        'buildings': {
            'spawn': { 'pos': [{ 'x': 21, 'y': 25 }] }
        }
    },
    2: {
        'name': 'bunkerCore',
        'shard': 'shard2',
        'rcl': '2',
        'buildings': {
            'extension': {
                'pos': [{ 'x': 22, 'y': 23 }, { 'x': 21, 'y': 23 }, { 'x': 21, 'y': 22 }, {
                        'x': 21,
                        'y': 24
                    }, { 'x': 20, 'y': 23 }]
            },
            'spawn': { 'pos': [{ 'x': 21, 'y': 25 }] },
            'container': { 'pos': [{ 'x': 21, 'y': 21 }] }
        }
    },
    3: {
        'name': 'bunkerCore',
        'shard': 'shard2',
        'rcl': '3',
        'buildings': {
            'tower': { 'pos': [{ 'x': 25, 'y': 24 }] },
            'extension': {
                'pos': [{ 'x': 23, 'y': 23 }, { 'x': 22, 'y': 24 }, { 'x': 22, 'y': 23 }, {
                        'x': 22,
                        'y': 22
                    }, { 'x': 21, 'y': 23 }, { 'x': 20, 'y': 24 }, { 'x': 21, 'y': 22 }, { 'x': 21, 'y': 24 }, {
                        'x': 20,
                        'y': 23
                    }, { 'x': 20, 'y': 25 }]
            },
            'spawn': { 'pos': [{ 'x': 21, 'y': 25 }] },
            'container': { 'pos': [{ 'x': 21, 'y': 21 }] }
        }
    },
    4: {
        'name': 'bunkerCore',
        'shard': 'shard2',
        'rcl': '4',
        'buildings': {
            'storage': { 'pos': [{ 'x': 24, 'y': 24 }] },
            'terminal': { 'pos': [] },
            'nuker': { 'pos': [] },
            'tower': { 'pos': [{ 'x': 25, 'y': 24 }] },
            'powerSpawn': { 'pos': [] },
            'link': { 'pos': [] },
            'road': {
                'pos': [{ 'x': 24, 'y': 23 }, { 'x': 25, 'y': 22 }, { 'x': 26, 'y': 23 }, { 'x': 27, 'y': 24 }, {
                        'x': 28,
                        'y': 25
                    }, { 'x': 27, 'y': 26 }, { 'x': 26, 'y': 27 }, { 'x': 25, 'y': 28 }, { 'x': 24, 'y': 27 }, {
                        'x': 23,
                        'y': 26
                    }, { 'x': 22, 'y': 25 }, { 'x': 23, 'y': 24 }, { 'x': 25, 'y': 25 }, { 'x': 28, 'y': 20 }, {
                        'x': 30,
                        'y': 22
                    }, { 'x': 30, 'y': 23 }, { 'x': 29, 'y': 24 }, { 'x': 24, 'y': 21 }, { 'x': 30, 'y': 28 }, {
                        'x': 28,
                        'y': 30
                    }, { 'x': 27, 'y': 30 }, { 'x': 26, 'y': 29 }, { 'x': 20, 'y': 22 }, { 'x': 22, 'y': 20 }, {
                        'x': 21,
                        'y': 26
                    }, { 'x': 20, 'y': 27 }, { 'x': 20, 'y': 28 }, { 'x': 22, 'y': 30 }, { 'x': 24, 'y': 19 }, {
                        'x': 26,
                        'y': 19
                    }, { 'x': 27, 'y': 19 }, { 'x': 31, 'y': 23 }, { 'x': 31, 'y': 24 }, { 'x': 31, 'y': 25 }, {
                        'x': 31,
                        'y': 26
                    }, { 'x': 31, 'y': 27 }, { 'x': 27, 'y': 31 }, { 'x': 27, 'y': 31 }, { 'x': 26, 'y': 31 }, {
                        'x': 24,
                        'y': 31
                    }, { 'x': 23, 'y': 31 }, { 'x': 19, 'y': 27 }, { 'x': 19, 'y': 26 }, { 'x': 19, 'y': 25 }, {
                        'x': 19,
                        'y': 24
                    }, { 'x': 24, 'y': 26 }, { 'x': 25, 'y': 19 }, { 'x': 19, 'y': 23 }, { 'x': 25, 'y': 31 }, {
                        'x': 23,
                        'y': 20
                    }, { 'x': 23, 'y': 19 }, { 'x': 26, 'y': 26 }, { 'x': 26, 'y': 24 }, { 'x': 25, 'y': 23 }, {
                        'x': 24,
                        'y': 25
                    }, { 'x': 23, 'y': 25 }, { 'x': 21, 'y': 21 }, { 'x': 29, 'y': 21 }, { 'x': 29, 'y': 29 }, { 'x': 21, 'y': 29 }]
            },
            'observer': { 'pos': [] },
            'lab': { 'pos': [] },
            'extension': {
                'pos': [{ 'x': 24, 'y': 22 }, { 'x': 23, 'y': 23 }, { 'x': 22, 'y': 24 }, {
                        'x': 22,
                        'y': 23
                    }, { 'x': 23, 'y': 22 }, { 'x': 23, 'y': 21 }, { 'x': 22, 'y': 22 }, { 'x': 21, 'y': 23 }, {
                        'x': 20,
                        'y': 24
                    }, { 'x': 20, 'y': 25 }, { 'x': 20, 'y': 26 }, { 'x': 22, 'y': 21 }, { 'x': 21, 'y': 22 }, {
                        'x': 21,
                        'y': 27
                    }, { 'x': 22, 'y': 28 }, { 'x': 21, 'y': 28 }, { 'x': 21, 'y': 24 }, { 'x': 20, 'y': 23 }, {
                        'x': 22,
                        'y': 29
                    }, { 'x': 23, 'y': 29 }]
            },
            'spawn': { 'pos': [{ 'x': 21, 'y': 25 }] },
            'container': { 'pos': [{ 'x': 21, 'y': 21 }, { 'x': 21, 'y': 29 }] }
        }
    },
    5: {
        'name': 'bunkerCore',
        'shard': 'shard2',
        'rcl': '5',
        'buildings': {
            'storage': { 'pos': [{ 'x': 24, 'y': 24 }] },
            'terminal': { 'pos': [] },
            'nuker': { 'pos': [] },
            'tower': { 'pos': [{ 'x': 24, 'y': 25 }, { 'x': 25, 'y': 24 }] },
            'powerSpawn': { 'pos': [] },
            'link': { 'pos': [{ 'x': 26, 'y': 26 }] },
            'road': {
                'pos': [{ 'x': 24, 'y': 23 }, { 'x': 25, 'y': 22 }, { 'x': 26, 'y': 23 }, { 'x': 26, 'y': 24 }, {
                        'x': 27,
                        'y': 24
                    }, {
                        'x': 28,
                        'y': 25
                    }, { 'x': 27, 'y': 26 }, { 'x': 26, 'y': 27 }, { 'x': 25, 'y': 28 }, { 'x': 24, 'y': 27 }, {
                        'x': 23,
                        'y': 26
                    }, { 'x': 22, 'y': 25 }, { 'x': 23, 'y': 24 }, { 'x': 25, 'y': 25 }, { 'x': 28, 'y': 20 }, {
                        'x': 30,
                        'y': 22
                    }, { 'x': 30, 'y': 23 }, { 'x': 29, 'y': 24 }, { 'x': 24, 'y': 21 }, { 'x': 30, 'y': 28 }, {
                        'x': 28,
                        'y': 30
                    }, { 'x': 27, 'y': 30 }, { 'x': 26, 'y': 29 }, { 'x': 20, 'y': 22 }, { 'x': 22, 'y': 20 }, {
                        'x': 21,
                        'y': 26
                    }, { 'x': 20, 'y': 27 }, { 'x': 20, 'y': 28 }, { 'x': 22, 'y': 30 }, { 'x': 24, 'y': 19 }, {
                        'x': 26,
                        'y': 19
                    }, { 'x': 27, 'y': 19 }, { 'x': 31, 'y': 23 }, { 'x': 31, 'y': 24 }, { 'x': 31, 'y': 25 }, {
                        'x': 31,
                        'y': 26
                    }, { 'x': 31, 'y': 27 }, { 'x': 27, 'y': 31 }, { 'x': 27, 'y': 31 }, { 'x': 26, 'y': 31 }, {
                        'x': 24,
                        'y': 31
                    }, { 'x': 23, 'y': 31 }, { 'x': 19, 'y': 27 }, { 'x': 19, 'y': 26 }, { 'x': 19, 'y': 25 }, {
                        'x': 19,
                        'y': 24
                    }, { 'x': 24, 'y': 26 }, { 'x': 25, 'y': 19 }, { 'x': 19, 'y': 23 }, { 'x': 25, 'y': 31 }, {
                        'x': 23,
                        'y': 20
                    }, { 'x': 23, 'y': 19 }, { 'x': 25, 'y': 23 }, { 'x': 23, 'y': 25 }, { 'x': 21, 'y': 21 }, {
                        'x': 29,
                        'y': 21
                    }, { 'x': 29, 'y': 29 }, { 'x': 21, 'y': 29 }]
            },
            'observer': { 'pos': [] },
            'lab': { 'pos': [] },
            'extension': {
                'pos': [{ 'x': 24, 'y': 22 }, { 'x': 23, 'y': 23 }, { 'x': 22, 'y': 24 }, {
                        'x': 22,
                        'y': 23
                    }, { 'x': 23, 'y': 22 }, { 'x': 23, 'y': 21 }, { 'x': 22, 'y': 22 }, { 'x': 21, 'y': 23 }, {
                        'x': 20,
                        'y': 24
                    }, { 'x': 20, 'y': 25 }, { 'x': 20, 'y': 26 }, { 'x': 22, 'y': 21 }, { 'x': 21, 'y': 22 }, {
                        'x': 22,
                        'y': 26
                    }, { 'x': 23, 'y': 27 }, { 'x': 24, 'y': 28 }, { 'x': 23, 'y': 28 }, { 'x': 22, 'y': 27 }, {
                        'x': 21,
                        'y': 27
                    }, { 'x': 22, 'y': 28 }, { 'x': 23, 'y': 29 }, { 'x': 22, 'y': 29 }, { 'x': 21, 'y': 28 }, {
                        'x': 24,
                        'y': 30
                    }, { 'x': 25, 'y': 30 }, { 'x': 26, 'y': 30 }, { 'x': 21, 'y': 24 }, { 'x': 24, 'y': 29 }, {
                        'x': 23,
                        'y': 30
                    }, { 'x': 20, 'y': 23 }]
            },
            'spawn': { 'pos': [{ 'x': 21, 'y': 25 }] },
            'container': { 'pos': [{ 'x': 21, 'y': 21 }, { 'x': 21, 'y': 29 }] }
        }
    },
    6: {
        'name': 'bunkerCore',
        'shard': 'shard2',
        'rcl': '6',
        'buildings': {
            'storage': { 'pos': [{ 'x': 24, 'y': 24 }] },
            'terminal': { 'pos': [{ 'x': 26, 'y': 24 }] },
            'nuker': { 'pos': [] },
            'tower': { 'pos': [{ 'x': 24, 'y': 25 }, { 'x': 25, 'y': 24 }] },
            'powerSpawn': { 'pos': [] },
            'link': { 'pos': [{ 'x': 26, 'y': 26 }] },
            'road': {
                'pos': [{ 'x': 24, 'y': 23 }, { 'x': 25, 'y': 22 }, { 'x': 26, 'y': 23 }, { 'x': 27, 'y': 24 }, {
                        'x': 28,
                        'y': 25
                    }, { 'x': 27, 'y': 26 }, { 'x': 26, 'y': 27 }, { 'x': 25, 'y': 28 }, { 'x': 24, 'y': 27 }, {
                        'x': 23,
                        'y': 26
                    }, { 'x': 22, 'y': 25 }, { 'x': 23, 'y': 24 }, { 'x': 25, 'y': 25 }, { 'x': 28, 'y': 20 }, {
                        'x': 30,
                        'y': 22
                    }, { 'x': 30, 'y': 23 }, { 'x': 29, 'y': 24 }, { 'x': 24, 'y': 21 }, { 'x': 30, 'y': 28 }, {
                        'x': 28,
                        'y': 30
                    }, { 'x': 27, 'y': 30 }, { 'x': 26, 'y': 29 }, { 'x': 20, 'y': 22 }, { 'x': 22, 'y': 20 }, {
                        'x': 21,
                        'y': 26
                    }, { 'x': 20, 'y': 27 }, { 'x': 20, 'y': 28 }, { 'x': 22, 'y': 30 }, { 'x': 24, 'y': 19 }, {
                        'x': 26,
                        'y': 19
                    }, { 'x': 27, 'y': 19 }, { 'x': 31, 'y': 23 }, { 'x': 31, 'y': 24 }, { 'x': 31, 'y': 25 }, {
                        'x': 31,
                        'y': 26
                    }, { 'x': 31, 'y': 27 }, { 'x': 27, 'y': 31 }, { 'x': 27, 'y': 31 }, { 'x': 26, 'y': 31 }, {
                        'x': 24,
                        'y': 31
                    }, { 'x': 23, 'y': 31 }, { 'x': 19, 'y': 27 }, { 'x': 19, 'y': 26 }, { 'x': 19, 'y': 25 }, {
                        'x': 19,
                        'y': 24
                    }, { 'x': 24, 'y': 26 }, { 'x': 25, 'y': 19 }, { 'x': 19, 'y': 23 }, { 'x': 25, 'y': 31 }, {
                        'x': 23,
                        'y': 20
                    }, { 'x': 23, 'y': 19 }, { 'x': 25, 'y': 23 }, { 'x': 23, 'y': 25 }, { 'x': 27, 'y': 25 }, {
                        'x': 28,
                        'y': 26
                    }, { 'x': 29, 'y': 26 }, { 'x': 30, 'y': 26 }, { 'x': 21, 'y': 21 }, { 'x': 29, 'y': 21 }, {
                        'x': 29,
                        'y': 29
                    }, { 'x': 21, 'y': 29 }]
            },
            'observer': { 'pos': [] },
            'lab': { 'pos': [{ 'x': 26, 'y': 22 }, { 'x': 27, 'y': 23 }, { 'x': 27, 'y': 22 }] },
            'extension': {
                'pos': [{ 'x': 24, 'y': 22 }, { 'x': 23, 'y': 23 }, { 'x': 22, 'y': 24 }, {
                        'x': 22,
                        'y': 23
                    }, { 'x': 23, 'y': 22 }, { 'x': 23, 'y': 21 }, { 'x': 22, 'y': 22 }, { 'x': 21, 'y': 23 }, {
                        'x': 20,
                        'y': 24
                    }, { 'x': 20, 'y': 25 }, { 'x': 20, 'y': 26 }, { 'x': 22, 'y': 21 }, { 'x': 21, 'y': 22 }, {
                        'x': 29,
                        'y': 27
                    }, { 'x': 28, 'y': 27 }, { 'x': 27, 'y': 27 }, { 'x': 27, 'y': 28 }, { 'x': 28, 'y': 28 }, {
                        'x': 29,
                        'y': 28
                    }, { 'x': 28, 'y': 29 }, { 'x': 27, 'y': 29 }, { 'x': 26, 'y': 28 }, { 'x': 22, 'y': 26 }, {
                        'x': 23,
                        'y': 27
                    }, { 'x': 24, 'y': 28 }, { 'x': 23, 'y': 28 }, { 'x': 22, 'y': 27 }, { 'x': 21, 'y': 27 }, {
                        'x': 22,
                        'y': 28
                    }, { 'x': 23, 'y': 29 }, { 'x': 22, 'y': 29 }, { 'x': 21, 'y': 28 }, { 'x': 24, 'y': 30 }, {
                        'x': 25,
                        'y': 30
                    }, { 'x': 26, 'y': 30 }, { 'x': 21, 'y': 24 }, { 'x': 24, 'y': 29 }, { 'x': 23, 'y': 30 }, {
                        'x': 20,
                        'y': 23
                    }, { 'x': 30, 'y': 27 }]
            },
            'spawn': { 'pos': [{ 'x': 21, 'y': 25 }] },
            'container': { 'pos': [{ 'x': 21, 'y': 21 }, { 'x': 29, 'y': 29 }, { 'x': 21, 'y': 29 }] }
        }
    },
    7: {
        'name': 'bunkerCore',
        'shard': 'shard2',
        'rcl': '7',
        'buildings': {
            'storage': { 'pos': [{ 'x': 24, 'y': 24 }] },
            'terminal': { 'pos': [{ 'x': 26, 'y': 24 }] },
            'nuker': { 'pos': [] },
            'tower': { 'pos': [{ 'x': 26, 'y': 25 }, { 'x': 24, 'y': 25 }, { 'x': 25, 'y': 24 }] },
            'powerSpawn': { 'pos': [] },
            'link': { 'pos': [{ 'x': 26, 'y': 26 }] },
            'road': {
                'pos': [{ 'x': 24, 'y': 23 }, { 'x': 25, 'y': 22 }, { 'x': 26, 'y': 23 }, { 'x': 27, 'y': 24 }, {
                        'x': 28,
                        'y': 25
                    }, { 'x': 27, 'y': 26 }, { 'x': 26, 'y': 27 }, { 'x': 25, 'y': 28 }, { 'x': 24, 'y': 27 }, {
                        'x': 23,
                        'y': 26
                    }, { 'x': 22, 'y': 25 }, { 'x': 23, 'y': 24 }, { 'x': 25, 'y': 25 }, { 'x': 28, 'y': 20 }, {
                        'x': 30,
                        'y': 22
                    }, { 'x': 30, 'y': 23 }, { 'x': 29, 'y': 24 }, { 'x': 24, 'y': 21 }, { 'x': 30, 'y': 28 }, {
                        'x': 28,
                        'y': 30
                    }, { 'x': 27, 'y': 30 }, { 'x': 26, 'y': 29 }, { 'x': 20, 'y': 22 }, { 'x': 22, 'y': 20 }, {
                        'x': 21,
                        'y': 26
                    }, { 'x': 20, 'y': 27 }, { 'x': 20, 'y': 28 }, { 'x': 22, 'y': 30 }, { 'x': 24, 'y': 19 }, {
                        'x': 26,
                        'y': 19
                    }, { 'x': 27, 'y': 19 }, { 'x': 31, 'y': 23 }, { 'x': 31, 'y': 24 }, { 'x': 31, 'y': 25 }, {
                        'x': 31,
                        'y': 26
                    }, { 'x': 31, 'y': 27 }, { 'x': 27, 'y': 31 }, { 'x': 27, 'y': 31 }, { 'x': 26, 'y': 31 }, {
                        'x': 24,
                        'y': 31
                    }, { 'x': 23, 'y': 31 }, { 'x': 19, 'y': 27 }, { 'x': 19, 'y': 26 }, { 'x': 19, 'y': 25 }, {
                        'x': 19,
                        'y': 24
                    }, { 'x': 24, 'y': 26 }, { 'x': 25, 'y': 19 }, { 'x': 19, 'y': 23 }, { 'x': 25, 'y': 31 }, {
                        'x': 23,
                        'y': 20
                    }, { 'x': 23, 'y': 19 }, { 'x': 29, 'y': 22 }, { 'x': 25, 'y': 23 }, { 'x': 23, 'y': 25 }, {
                        'x': 27,
                        'y': 25
                    }, { 'x': 28, 'y': 23 }, { 'x': 21, 'y': 21 }, { 'x': 29, 'y': 21 }, { 'x': 29, 'y': 29 }, { 'x': 21, 'y': 29 }]
            },
            'observer': { 'pos': [] },
            'lab': {
                'pos': [{ 'x': 26, 'y': 22 }, { 'x': 27, 'y': 23 }, { 'x': 27, 'y': 22 }, { 'x': 27, 'y': 21 }, {
                        'x': 28,
                        'y': 21
                    }, { 'x': 28, 'y': 22 }]
            },
            'extension': {
                'pos': [{ 'x': 24, 'y': 22 }, { 'x': 23, 'y': 23 }, { 'x': 22, 'y': 24 }, {
                        'x': 22,
                        'y': 23
                    }, { 'x': 23, 'y': 22 }, { 'x': 23, 'y': 21 }, { 'x': 22, 'y': 22 }, { 'x': 21, 'y': 23 }, {
                        'x': 24,
                        'y': 20
                    }, { 'x': 25, 'y': 20 }, { 'x': 26, 'y': 20 }, { 'x': 30, 'y': 24 }, { 'x': 30, 'y': 25 }, {
                        'x': 30,
                        'y': 26
                    }, { 'x': 20, 'y': 24 }, { 'x': 20, 'y': 25 }, { 'x': 20, 'y': 26 }, { 'x': 22, 'y': 21 }, {
                        'x': 21,
                        'y': 22
                    }, { 'x': 28, 'y': 26 }, { 'x': 29, 'y': 27 }, { 'x': 28, 'y': 27 }, { 'x': 27, 'y': 27 }, {
                        'x': 27,
                        'y': 28
                    }, { 'x': 28, 'y': 28 }, { 'x': 29, 'y': 28 }, { 'x': 28, 'y': 29 }, { 'x': 27, 'y': 29 }, {
                        'x': 26,
                        'y': 28
                    }, { 'x': 22, 'y': 26 }, { 'x': 23, 'y': 27 }, { 'x': 24, 'y': 28 }, { 'x': 23, 'y': 28 }, {
                        'x': 22,
                        'y': 27
                    }, { 'x': 21, 'y': 27 }, { 'x': 22, 'y': 28 }, { 'x': 23, 'y': 29 }, { 'x': 22, 'y': 29 }, {
                        'x': 21,
                        'y': 28
                    }, { 'x': 24, 'y': 30 }, { 'x': 25, 'y': 30 }, { 'x': 26, 'y': 30 }, { 'x': 29, 'y': 26 }, {
                        'x': 21,
                        'y': 24
                    }, { 'x': 26, 'y': 21 }, { 'x': 24, 'y': 29 }, { 'x': 23, 'y': 30 }, { 'x': 20, 'y': 23 }, {
                        'x': 27,
                        'y': 20
                    }, { 'x': 30, 'y': 27 }]
            },
            'spawn': { 'pos': [{ 'x': 29, 'y': 25 }, { 'x': 21, 'y': 25 }] },
            'container': { 'pos': [{ 'x': 21, 'y': 21 }, { 'x': 29, 'y': 21 }, { 'x': 29, 'y': 29 }, { 'x': 21, 'y': 29 }] }
        }
    },
    8: {
        'name': 'bunkerCore',
        'shard': 'shard2',
        'rcl': '8',
        'buildings': {
            'storage': { 'pos': [{ 'x': 24, 'y': 24 }] },
            'terminal': { 'pos': [{ 'x': 26, 'y': 24 }] },
            'nuker': { 'pos': [{ 'x': 25, 'y': 23 }] },
            'tower': {
                'pos': [{ 'x': 26, 'y': 25 }, { 'x': 24, 'y': 25 }, { 'x': 27, 'y': 25 }, { 'x': 23, 'y': 25 }, {
                        'x': 25,
                        'y': 26
                    }, { 'x': 25, 'y': 24 }]
            },
            'powerSpawn': { 'pos': [{ 'x': 25, 'y': 21 }] },
            'link': { 'pos': [{ 'x': 26, 'y': 26 }] },
            'road': {
                'pos': [{ 'x': 24, 'y': 23 }, { 'x': 25, 'y': 22 }, { 'x': 26, 'y': 23 }, { 'x': 27, 'y': 24 }, {
                        'x': 28,
                        'y': 25
                    }, { 'x': 27, 'y': 26 }, { 'x': 26, 'y': 27 }, { 'x': 25, 'y': 28 }, { 'x': 24, 'y': 27 }, {
                        'x': 23,
                        'y': 26
                    }, { 'x': 22, 'y': 25 }, { 'x': 23, 'y': 24 }, { 'x': 25, 'y': 25 }, { 'x': 28, 'y': 20 }, {
                        'x': 30,
                        'y': 22
                    }, { 'x': 30, 'y': 23 }, { 'x': 29, 'y': 24 }, { 'x': 24, 'y': 21 }, { 'x': 30, 'y': 28 }, {
                        'x': 28,
                        'y': 30
                    }, { 'x': 27, 'y': 30 }, { 'x': 26, 'y': 29 }, { 'x': 20, 'y': 22 }, { 'x': 22, 'y': 20 }, {
                        'x': 21,
                        'y': 26
                    }, { 'x': 20, 'y': 27 }, { 'x': 20, 'y': 28 }, { 'x': 22, 'y': 30 }, { 'x': 24, 'y': 19 }, {
                        'x': 26,
                        'y': 19
                    }, { 'x': 27, 'y': 19 }, { 'x': 31, 'y': 23 }, { 'x': 31, 'y': 24 }, { 'x': 31, 'y': 25 }, {
                        'x': 31,
                        'y': 26
                    }, { 'x': 31, 'y': 27 }, { 'x': 27, 'y': 31 }, { 'x': 27, 'y': 31 }, { 'x': 26, 'y': 31 }, {
                        'x': 24,
                        'y': 31
                    }, { 'x': 23, 'y': 31 }, { 'x': 19, 'y': 27 }, { 'x': 19, 'y': 26 }, { 'x': 19, 'y': 25 }, {
                        'x': 19,
                        'y': 24
                    }, { 'x': 24, 'y': 26 }, { 'x': 25, 'y': 19 }, { 'x': 19, 'y': 23 }, { 'x': 25, 'y': 31 }, {
                        'x': 23,
                        'y': 20
                    }, { 'x': 23, 'y': 19 }, { 'x': 21, 'y': 21 }, { 'x': 29, 'y': 21 }, { 'x': 29, 'y': 29 }, { 'x': 21, 'y': 29 }]
            },
            'observer': { 'pos': [{ 'x': 25, 'y': 27 }] },
            'lab': {
                'pos': [{ 'x': 26, 'y': 22 }, { 'x': 27, 'y': 23 }, { 'x': 28, 'y': 24 }, { 'x': 27, 'y': 22 }, {
                        'x': 27,
                        'y': 21
                    }, { 'x': 28, 'y': 22 }, { 'x': 28, 'y': 23 }, { 'x': 29, 'y': 23 }, { 'x': 28, 'y': 21 }, { 'x': 29, 'y': 22 }]
            },
            'extension': {
                'pos': [{ 'x': 24, 'y': 22 }, { 'x': 23, 'y': 23 }, { 'x': 22, 'y': 24 }, {
                        'x': 22,
                        'y': 23
                    }, { 'x': 23, 'y': 22 }, { 'x': 23, 'y': 21 }, { 'x': 22, 'y': 22 }, { 'x': 21, 'y': 23 }, {
                        'x': 24,
                        'y': 20
                    }, { 'x': 25, 'y': 20 }, { 'x': 26, 'y': 20 }, { 'x': 30, 'y': 24 }, { 'x': 30, 'y': 25 }, {
                        'x': 30,
                        'y': 26
                    }, { 'x': 20, 'y': 24 }, { 'x': 20, 'y': 25 }, { 'x': 20, 'y': 26 }, { 'x': 22, 'y': 21 }, {
                        'x': 21,
                        'y': 22
                    }, { 'x': 28, 'y': 26 }, { 'x': 29, 'y': 27 }, { 'x': 28, 'y': 27 }, { 'x': 27, 'y': 27 }, {
                        'x': 27,
                        'y': 28
                    }, { 'x': 28, 'y': 28 }, { 'x': 29, 'y': 28 }, { 'x': 28, 'y': 29 }, { 'x': 27, 'y': 29 }, {
                        'x': 26,
                        'y': 28
                    }, { 'x': 22, 'y': 26 }, { 'x': 23, 'y': 27 }, { 'x': 24, 'y': 28 }, { 'x': 23, 'y': 28 }, {
                        'x': 22,
                        'y': 27
                    }, { 'x': 21, 'y': 27 }, { 'x': 22, 'y': 28 }, { 'x': 23, 'y': 29 }, { 'x': 22, 'y': 29 }, {
                        'x': 21,
                        'y': 28
                    }, { 'x': 24, 'y': 30 }, { 'x': 25, 'y': 30 }, { 'x': 26, 'y': 30 }, { 'x': 29, 'y': 26 }, {
                        'x': 21,
                        'y': 24
                    }, { 'x': 26, 'y': 21 }, { 'x': 24, 'y': 29 }, { 'x': 23, 'y': 30 }, { 'x': 20, 'y': 23 }, {
                        'x': 27,
                        'y': 20
                    }, { 'x': 30, 'y': 27 }]
            },
            'spawn': { 'pos': [{ 'x': 29, 'y': 25 }, { 'x': 21, 'y': 25 }, { 'x': 25, 'y': 29 }] },
            'container': { 'pos': [{ 'x': 21, 'y': 21 }, { 'x': 29, 'y': 21 }, { 'x': 29, 'y': 29 }, { 'x': 21, 'y': 29 }] },
        }
    }
};

// The room planner allows you to plan the location of all structures in the room semi-automatically by placing
// components with flags. This code is a little messy, sorry.
let memoryDefaults = {
    active: true,
    mapsByLevel: {},
    savedFlags: [],
};
let RoomPlanner = RoomPlanner_1 = class RoomPlanner {
    constructor(colony) {
        this.colony = colony;
        this.placements = {
            hatchery: undefined,
            commandCenter: undefined,
            bunker: undefined,
        };
        this.plan = {};
        this.map = {};
        this.barrierPlanner = new BarrierPlanner(this);
        this.roadPlanner = new RoadPlanner(this);
        if (this.active && Game.time % 25 == 0) {
            log.alert(`RoomPlanner for ${this.colony.room.print} is still active! Close to save CPU.`);
        }
    }
    get memory() {
        return Mem.wrap(this.colony.memory, 'roomPlanner', memoryDefaults);
    }
    get active() {
        return this.memory.active;
    }
    set active(active) {
        this.memory.active = active;
        if (active) {
            this.reactivate();
        }
    }
    /* Return a list of room positions for planned structure locations at RCL8 (or undefined if plan isn't made yet) */
    plannedStructurePositions(structureType) {
        if (this.map[structureType]) {
            return this.map[structureType];
        }
        if (this.memory.bunkerData && this.memory.bunkerData.anchor) {
            return this.getBunkerStructurePlacement(structureType, this.memory.bunkerData.anchor);
        }
        let roomMap = this.memory.mapsByLevel ? this.memory.mapsByLevel[8] : undefined;
        if (roomMap && roomMap[structureType]) {
            return _.map(roomMap[structureType], protoPos => derefRoomPosition(protoPos));
        }
    }
    /* Return the planned location of the storage structure */
    get storagePos() {
        if (this.placements.commandCenter) {
            return this.placements.commandCenter;
        }
        let positions = this.plannedStructurePositions(STRUCTURE_STORAGE);
        if (positions) {
            return positions[0];
        }
    }
    /* Return the planned location of the storage structure */
    get hatcheryPos() {
        if (this.placements.hatchery) {
            return this.placements.hatchery;
        }
        let positions = this.plannedStructurePositions(STRUCTURE_SPAWN);
        if (positions) {
            return positions[0];
        }
    }
    get bunkerPos() {
        if (this.placements.bunker) {
            return this.placements.bunker;
        }
        if (this.memory.bunkerData && this.memory.bunkerData.anchor) {
            return new RoomPosition(this.memory.bunkerData.anchor.x, this.memory.bunkerData.anchor.y, this.colony.name);
        }
    }
    reactivate() {
        // Reinstantiate flags
        for (let protoFlag of this.memory.savedFlags) {
            let pos = derefRoomPosition(protoFlag.pos);
            let result = pos.createFlag(undefined, COLOR_WHITE, protoFlag.secondaryColor);
            // if (typeof result == 'string') {
            // 	_.remove(this.memory.savedFlags, protoFlag);
            // }
            // TODO: add memory back on flag
        }
        this.memory.savedFlags = [];
        // Display the activation message
        let msg = [
            `Room planner activated for ${this.colony.name}. Reinstantiating flags from previous session on next tick.`,
            'Place colony components with room planner flags:',
            '    Place hatchery:        white/green',
            '    Place command center:  white/blue',
            // 'Set component rotation by writing an angle (0,90,180,270 or 0,1,2,3) to flag.memory.rotation.',
            'Finalize layout '
        ];
        _.forEach(msg, command => console.log(command));
    }
    /* Run the room planner to generate a plan and map*/
    make(level = 8) {
        // Reset everything
        this.plan = {};
        this.map = {};
        // Generate a plan, placing components by flags
        this.plan = this.generatePlan(level);
        // Flatten it into a map
        this.map = this.mapFromPlan(this.plan);
    }
    /* Adds the specified structure directly to the map. Only callable after this.map is generated.
     * Doesn't check for conflicts, so don't use freely. */
    placeStructure(type, pos) {
        if (!this.map[type])
            this.map[type] = [];
        this.map[type].push(pos);
    }
    addComponent(componentName, pos, rotation = 0) {
        this.placements[componentName] = pos;
    }
    /* Switcher that takes a component name and returns a layout */
    getLayout(name) {
        switch (name) {
            case 'hatchery':
                return hatcheryLayout;
            case 'commandCenter':
                return commandCenterLayout;
            case 'bunker':
                return bunkerLayout;
        }
    }
    /* Generate a plan of component placements for a given RCL */
    generatePlan(level = 8) {
        let plan = {};
        for (let name in this.placements) {
            let layout = this.getLayout(name);
            if (layout) {
                let anchor = layout.data.anchor;
                let pos = this.placements[name];
                if (!pos)
                    continue;
                let rotation = pos.lookFor(LOOK_FLAGS)[0].memory.rotation || 0;
                let componentMap = this.parseLayout(layout, level);
                this.translateComponent(componentMap, anchor, pos);
                if (rotation != 0)
                    this.rotateComponent(componentMap, pos, rotation);
                plan[name] = {
                    map: componentMap,
                    pos: new RoomPosition(anchor.x, anchor.y, this.colony.name),
                    rotation: rotation,
                };
            }
        }
        return plan;
    }
    /* Generate a map of (structure type: RoomPositions[]) for a given layout */
    parseLayout(structureLayout, level = 8) {
        let map = {};
        let layout = structureLayout[level];
        if (layout) {
            for (let buildingName in layout.buildings) {
                map[buildingName] = _.map(layout.buildings[buildingName].pos, pos => new RoomPosition(pos.x, pos.y, this.colony.name));
            }
        }
        return map;
    }
    /* Generate a flatened map from a plan */
    mapFromPlan(plan) {
        let map = {};
        let componentMaps = _.map(plan, componentPlan => componentPlan.map);
        let structureNames = _.unique(_.flatten(_.map(componentMaps, map => _.keys(map))));
        for (let name of structureNames) {
            map[name] = _.compact(_.flatten(_.map(componentMaps, map => map[name])));
        }
        return map;
    }
    /* Aligns the component position to the desired position; operations done in-place */
    translateComponent(map, fromPos, toPos) {
        let dx = toPos.x - fromPos.x;
        let dy = toPos.y - fromPos.y;
        for (let structureType in map) {
            for (let pos of map[structureType]) {
                pos.x += dx;
                pos.y += dy;
            }
        }
    }
    // TODO: component rotation isn't currently fully supported
    /* Rotates component positions about a pivot point counterclockwise by the given angle; done in-place */
    rotateComponent(map, pivot, angle) {
        let R = ([x, y]) => ([x, y]);
        if (angle == 0) {
            return;
        }
        else if (angle == 90 || angle == 1) {
            R = ([x, y]) => ([-y, x]);
        }
        else if (angle == 180 || angle == 2) {
            R = ([x, y]) => ([-x, -y]);
        }
        else if (angle == 270 || angle == 3) {
            R = ([x, y]) => ([y, -x]);
        }
        // Apply the rotation to the map
        let offset, dx, dy;
        for (let structureType in map) {
            for (let pos of map[structureType]) {
                offset = [pos.x - pivot.x, pos.y - pivot.y];
                [dx, dy] = R(offset);
                pos.x = pivot.x + dx;
                pos.y = pivot.y + dy;
            }
        }
    }
    /* Get bunker building placements as a StructureMap */
    getStructureMapForBunkerAt(anchor, level = 8) {
        let dx = anchor.x - bunkerLayout.data.anchor.x;
        let dy = anchor.y - bunkerLayout.data.anchor.y;
        let structureLayout = _.mapValues(bunkerLayout[level].buildings, obj => obj.pos);
        return _.mapValues(structureLayout, coordArr => _.map(coordArr, coord => new RoomPosition(coord.x + dx, coord.y + dy, this.colony.name)));
    }
    /* Get the placement for a single type of structure for bunker layout */
    getBunkerStructurePlacement(structureType, anchor, level = 8) {
        let dx = anchor.x - bunkerLayout.data.anchor.x;
        let dy = anchor.y - bunkerLayout.data.anchor.y;
        let structureLayout = _.mapValues(bunkerLayout[level].buildings, obj => obj.pos);
        return _.map(bunkerLayout[level].buildings[structureType].pos, coord => new RoomPosition(coord.x + dx, coord.y + dy, this.colony.name));
    }
    /* Generates a list of impassible obstacles from this.map or from this.memory.map */
    getObstacles() {
        let obstacles = [];
        let passableStructureTypes = [STRUCTURE_ROAD, STRUCTURE_CONTAINER, STRUCTURE_RAMPART];
        if (this.map != {}) { // if room planner has made the map, use that
            for (let structureType in this.map) {
                if (!passableStructureTypes.includes(structureType)) {
                    obstacles = obstacles.concat(this.map[structureType]);
                }
            }
        }
        else { // else, serialize from memory
            if (this.memory.bunkerData && this.memory.bunkerData.anchor) {
                let structureMap = this.getStructureMapForBunkerAt(this.memory.bunkerData.anchor);
                for (let structureType in structureMap) {
                    if (!passableStructureTypes.includes(structureType)) {
                        obstacles = obstacles.concat(structureMap[structureType]);
                    }
                }
            }
            else if (this.memory.mapsByLevel) {
                for (let structureType in this.memory.mapsByLevel[8]) {
                    if (!passableStructureTypes.includes(structureType)) {
                        obstacles = obstacles.concat(_.map(this.memory.mapsByLevel[8][structureType], protoPos => derefRoomPosition(protoPos)));
                    }
                }
            }
        }
        return _.unique(obstacles);
    }
    /* Check to see if there are any structures that can't be built */
    findCollision(ignoreRoads = false) {
        for (let structureType in this.map) {
            if (ignoreRoads && structureType == STRUCTURE_ROAD) {
                continue;
            }
            for (let pos of this.map[structureType]) {
                if (Game.map.getTerrainAt(pos) == 'wall') {
                    return pos;
                }
            }
        }
    }
    /* Write everything to memory at the end of activation. If ignoreRoads is set, it will allow collisions with
     * roads, but will continue to alert you every time it fails to build a road in the terrain pos (WIP) */
    finalize(ignoreRoads = false) {
        let collision = this.findCollision(ignoreRoads);
        if (collision) {
            console.log(`Invalid layout: collision detected at ${collision.print}!`);
            return;
        }
        let layoutIsValid = !!this.placements.commandCenter && !!this.placements.hatchery;
        if (layoutIsValid) { // Write everything to memory
            // Generate maps for each rcl
            delete this.memory.bunkerData;
            if (this.placements.bunker) {
            }
            else {
                this.memory.mapsByLevel = {};
                for (let rcl = 1; rcl <= 8; rcl++) {
                    this.make(rcl);
                    this.memory.mapsByLevel[rcl] = this.map;
                }
            }
            // Finalize the barrier planner
            this.barrierPlanner.finalize();
            // Finalize the road planner
            this.roadPlanner.finalize();
            // Save flags and remove them
            let flagsToWrite = _.filter(this.colony.flags, flag => flag.color == COLOR_WHITE);
            for (let flag of flagsToWrite) {
                this.memory.savedFlags.push({
                    secondaryColor: flag.secondaryColor,
                    pos: flag.pos,
                    memory: {}
                });
                flag.remove();
            }
            this.memory.lastGenerated = Game.time;
            console.log('Room layout and flag positions have been saved.');
            this.active = false;
            this.buildMissing();
            // Finalize the road planner layout
        }
        else {
            console.log('Not a valid room layout! Must have hatchery and commandCenter placements.');
        }
    }
    init() {
        this.barrierPlanner.init();
        this.roadPlanner.init();
    }
    /* Whether a constructionSite should be placed at a position */
    static shouldBuild(structureType, pos) {
        if (!pos.room)
            return false;
        let buildings = _.filter(pos.lookFor(LOOK_STRUCTURES), s => s && s.structureType == structureType);
        let sites = pos.lookFor(LOOK_CONSTRUCTION_SITES);
        if (!buildings || buildings.length == 0) {
            if (!sites || sites.length == 0) {
                return true;
            }
        }
        return false;
    }
    /* Create construction sites for any buildings that need to be built */
    buildMissing() {
        // Max buildings that can be placed each tick
        let count = RoomPlanner_1.settings.maxSitesPerColony - this.colony.constructionSites.length;
        // Recall the appropriate map
        if (this.memory.bunkerData && this.memory.bunkerData.anchor) {
            this.map = this.getStructureMapForBunkerAt(this.memory.bunkerData.anchor);
        }
        else if (this.memory.mapsByLevel) {
            this.map = _.mapValues(this.memory.mapsByLevel[this.colony.controller.level], posArr => _.map(posArr, protoPos => derefRoomPosition(protoPos)));
        }
        if (!this.map) { // in case a map hasn't been generated yet
            log.info(this.colony.name + ' does not have a room plan yet! Unable to build missing structures.');
        }
        // Build missing structures from room plan
        for (let structureType of BuildPriorities) {
            if (this.map[structureType]) {
                for (let pos of this.map[structureType]) {
                    if (count > 0 && RoomPlanner_1.shouldBuild(structureType, pos)) {
                        let ret = pos.createConstructionSite(structureType);
                        if (ret != OK) {
                            log.error(`${this.colony.name}: couldn't create construction site of type ` +
                                `"${structureType}" at ${pos.print}. Result: ${ret}`);
                        }
                        else {
                            count--;
                        }
                    }
                }
            }
        }
        // Build extractor on mineral deposit if not already present
        let mineral = this.colony.room.find(FIND_MINERALS)[0];
        if (mineral) {
            let extractor = mineral.pos.lookForStructure(STRUCTURE_EXTRACTOR);
            if (!extractor) {
                mineral.pos.createConstructionSite(STRUCTURE_EXTRACTOR);
            }
        }
    }
    /* Quick lookup for if a road should be in this position. Roads returning false won't be maintained. */
    roadShouldBeHere(pos) {
        return this.roadPlanner.roadShouldBeHere(pos);
    }
    run() {
        if (this.active) {
            this.make();
            this.visuals();
        }
        else {
            if (Game.time % RoomPlanner_1.settings.siteCheckFrequency == this.colony.id) {
                this.buildMissing();
            }
        }
        // Run the barrier planner
        this.barrierPlanner.run();
        // Run the road planner
        this.roadPlanner.run();
    }
    visuals() {
        // Draw the map
        Visualizer.drawLayout(this.map);
    }
};
RoomPlanner.settings = {
    siteCheckFrequency: 200,
    maxSitesPerColony: 10,
};
RoomPlanner = RoomPlanner_1 = __decorate([
    profile
], RoomPlanner);
var RoomPlanner_1;

// A grouping for objectives that allows colony components to have their own objectives instead of all being on Overlord
let LinkNetwork = class LinkNetwork {
    constructor(colony) {
        this.colony = colony;
        this.receive = [];
        this.transmit = [];
        this.settings = {
            linksTrasmitAt: LINK_CAPACITY - 100,
        };
    }
    claimLink(link) {
        _.remove(this.colony.availableLinks, l => l == link);
    }
    requestReceive(link) {
        this.receive.push(link);
    }
    requestTransmit(link) {
        this.transmit.push(link);
    }
    /* Number of ticks until a dropoff link is available again to deposit energy to */
    getDropoffAvailability(link) {
        let dest = this.colony.commandCenter ? this.colony.commandCenter.pos : this.colony.pos;
        let usualCooldown = link.pos.getRangeTo(dest);
        if (link.energy > this.settings.linksTrasmitAt) { // Energy will be sent next time cooldown == 0
            return link.cooldown + usualCooldown;
        }
        else {
            return link.cooldown;
        }
    }
    init() {
        for (let link of this.colony.dropoffLinks) {
            if (link.energy > this.settings.linksTrasmitAt) {
                this.requestTransmit(link);
            }
        }
    }
    /* Examine the link resource requests and try to efficiently (but greedily) match links that need energy in and
     * out, then send the remaining resourceOut link requests to the command center link */
    run() {
        // For each receiving link, greedily get energy from the closest transmitting link - at most 9 operations
        for (let receiveLink of this.receive) {
            let closestTransmitLink = receiveLink.pos.findClosestByRange(this.transmit);
            // If a send-receive match is found, transfer that first, then remove the pair from the link lists
            if (closestTransmitLink) {
                // Send min of (all the energy in sender link, amount of available space in receiver link)
                let amountToSend = _.min([closestTransmitLink.energy, receiveLink.energyCapacity - receiveLink.energy]);
                closestTransmitLink.transferEnergy(receiveLink, amountToSend);
                _.remove(this.transmit, link => link == closestTransmitLink);
                // _.remove(this.receive, link => link == receiveLink);
            }
        }
        // Now send all remaining transmit link requests to the command center
        if (this.colony.commandCenter && this.colony.commandCenter.link) {
            for (let transmitLink of this.transmit) {
                transmitLink.transferEnergy(this.colony.commandCenter.link);
            }
        }
    }
};
LinkNetwork = __decorate([
    profile
], LinkNetwork);

// Hive cluster for wrapping towers
let SporeCrawler = SporeCrawler_1 = class SporeCrawler extends HiveCluster {
    constructor(colony, tower) {
        super(colony, tower, 'sporeCrawler');
        // Register structure components
        this.tower = tower;
    }
    get memory() {
        return undefined;
    }
    registerEnergyRequests() {
        // Request energy from transporters if below request threshold
        if (this.tower.energy < SporeCrawler_1.settings.requestThreshold) {
            let multiplier = this.tower.energy < SporeCrawler_1.settings.criticalEnergyThreshold ? 2 : 1;
            let dAmountdt = this.room.hostiles.length > 0 ? 10 : 0;
            this.colony.logisticsNetwork.requestInput(this.tower, { multiplier: multiplier, dAmountdt: dAmountdt });
        }
    }
    init() {
        this.registerEnergyRequests();
    }
    attackNearestEnemy(prioritizeHealers = false) {
        if (prioritizeHealers) {
            let healers = _.filter(this.room.hostiles, creep => creep.getActiveBodyparts(HEAL) > 0);
            if (healers.length > 0) {
                return this.tower.attack(this.pos.findClosestByRange(healers));
            }
        }
        let closestHostile = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            return this.tower.attack(closestHostile);
        }
    }
    healNearestAlly() {
        var closestDamagedAlly = this.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (c) => c.hits < c.hitsMax,
        });
        if (closestDamagedAlly) {
            return this.tower.heal(closestDamagedAlly);
        }
    }
    preventRampartDecay() {
        let hp = 500; // TODO: hardwired
        var closestDyingRampart = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < hp && s.structureType == STRUCTURE_RAMPART,
        });
        if (closestDyingRampart) {
            return this.tower.repair(closestDyingRampart);
        }
    }
    repairNearestStructure() {
        var closestDamagedStructure = this.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax &&
                s.structureType != STRUCTURE_WALL &&
                s.structureType != STRUCTURE_RAMPART,
        });
        if (closestDamagedStructure) {
            return this.tower.repair(closestDamagedStructure);
        }
    }
    run() {
        if (this.room.hostiles.length > 0) {
            let myDefenders = _.filter(this.room.creeps, creep => creep.getActiveBodyparts(ATTACK) > 1);
            let myRangedDefenders = _.filter(this.room.creeps, creep => creep.getActiveBodyparts(RANGED_ATTACK) > 1);
            let myDamage = ATTACK_POWER * _.sum(_.map(myDefenders, creep => CombatIntel.getAttackPotential(creep))) +
                RANGED_ATTACK_POWER * _.sum(_.map(myRangedDefenders, creep => CombatIntel.getRangedAttackPotential(creep)));
            let possibleTargets = _.filter(this.room.hostiles, hostile => CombatIntel.maxHostileHealingTo(hostile) <
                CombatIntel.towerDamageAtPos(hostile.pos, true) + myDamage);
            let target = this.pos.findClosestByRange(possibleTargets);
            if (target) {
                return this.tower.attack(target);
            }
        }
        let closestDamagedAlly = this.pos.findClosestByRange(_.filter(this.room.creeps, creep => creep.hits < creep.hitsMax));
        if (closestDamagedAlly) {
            return this.tower.heal(closestDamagedAlly);
        }
        // Towers build nuke response ramparts
        let nearbyNukeRamparts = _.filter(this.colony.overlords.work.nukeDefenseRamparts, rampart => this.pos.getRangeTo(rampart) <= TOWER_OPTIMAL_RANGE);
        if (nearbyNukeRamparts.length > 0) {
            return this.tower.repair(nearbyNukeRamparts[0]);
        }
        this.preventRampartDecay();
    }
    visuals() {
    }
};
SporeCrawler.settings = {
    requestThreshold: 500,
    criticalEnergyThreshold: 250,
};
SporeCrawler = SporeCrawler_1 = __decorate([
    profile
], SporeCrawler);
var SporeCrawler_1;

// Road network: groups roads in a single object for more intelligent repair requests
let RoadLogistics = class RoadLogistics {
    constructor(colony) {
        this.colony = colony;
        this.rooms = colony.rooms;
        this._assignedWorkers = {};
        this.settings = {
            allowedPaversPerRoom: 1,
            criticalThreshold: 0.25,
            repairThreshold: 0.9
        };
        this.cache = {
            repairableRoads: {},
            criticalRoads: {},
            energyToRepave: {}
        };
    }
    /* Whether a road in the network needs repair */
    workerShouldRepaveRoom(worker, room) {
        // Room should be repaved if there is a road with critical HP or if energy to repave >= worker carry capacity
        let otherAssignedWorkers = _.filter(this.assignedWorkers(room), zerg => zerg.name != worker.name);
        if (otherAssignedWorkers.length < this.settings.allowedPaversPerRoom) {
            if (this.assignedWorkers(room).includes(worker)) {
                // If worker is already working in the room, have it repair until all roads are at acceptable level
                return this.repairableRoads(room).length > 0;
            }
            else {
                // If worker is not already assigned, repair if critical roads or repaving energy >= carry capacity
                return this.criticalRoads(room).length > 0 || this.energyToRepave(room) >= worker.carryCapacity;
            }
        }
        else {
            return false;
        }
    }
    /* Get the room the worker should repave if any */
    workerShouldRepave(worker) {
        // If the worker is already working in a room and should keep doing so, return that first
        for (let roomName in this._assignedWorkers) {
            let room = Game.rooms[roomName];
            if (this.assignedWorkers(room).includes(worker) && this.workerShouldRepaveRoom(worker, room)) {
                return room;
            }
        }
        // Otherwise scan through rooms and see if needs repaving
        for (let room of this.rooms) {
            if (this.workerShouldRepaveRoom(worker, room)) {
                return room;
            }
        }
    }
    criticalRoads(room) {
        if (!this.cache.criticalRoads[room.name]) {
            this.cache.criticalRoads[room.name] = _.filter(room.roads, road => road.hits < road.hitsMax * this.settings.criticalThreshold &&
                this.colony.roomPlanner.roadShouldBeHere(road.pos));
        }
        return this.cache.criticalRoads[room.name];
    }
    repairableRoads(room) {
        if (!this.cache.repairableRoads[room.name]) {
            this.cache.repairableRoads[room.name] = _.filter(room.roads, road => road.hits < road.hitsMax * this.settings.repairThreshold &&
                this.colony.roomPlanner.roadShouldBeHere(road.pos));
        }
        return this.cache.repairableRoads[room.name];
    }
    /* Total amount of energy needed to repair all roads in the room */
    energyToRepave(room) {
        if (!this.cache.energyToRepave[room.name]) {
            this.cache.energyToRepave[room.name] = _.sum(_.map(this.repairableRoads(room), road => (road.hitsMax - road.hits) / REPAIR_POWER));
        }
        return this.cache.energyToRepave[room.name];
    }
    /* Check that the worker is in the assignedWorker cache; avoids bugs where duplicate workers get assigned
     * on the same tick*/
    registerWorkerAssignment(worker, room) {
        if (this._assignedWorkers[room.name]) {
            if (!this._assignedWorkers[room.name].includes(worker)) {
                this._assignedWorkers[room.name].push(worker);
            }
        }
        else {
            this._assignedWorkers[room.name] = [worker];
        }
    }
    assignedWorkers(room) {
        if (this._assignedWorkers[room.name]) {
            return this._assignedWorkers[room.name];
        }
        else {
            return [];
        }
    }
    init() {
        let workers = this.colony.getCreepsByRole('worker');
        for (let worker of workers) {
            if (worker.task && worker.task.name == repairTaskName && worker.task.target) {
                let roomName = worker.task.target.pos.roomName;
                if (!this._assignedWorkers[roomName]) {
                    this._assignedWorkers[roomName] = [];
                }
                this._assignedWorkers[roomName].push(worker);
            }
        }
    }
    run() {
    }
};
RoadLogistics = __decorate([
    profile
], RoadLogistics);

const TraderMemoryDefaults = {
    cache: {
        sell: {},
        buy: {},
        tick: 0,
    },
    equalizeIndex: 0,
};
// Maximum prices I'm willing to pay to buy various resources - based on shard2 market data in June 2018
// (might not always be up to date)
const maxMarketPrices = {
    default: 5.0,
    [RESOURCE_HYDROGEN]: 0.3,
    [RESOURCE_OXYGEN]: 0.25,
    [RESOURCE_UTRIUM]: 0.3,
    [RESOURCE_LEMERGIUM]: 0.25,
    [RESOURCE_KEANIUM]: 0.25,
    [RESOURCE_ZYNTHIUM]: 0.25,
    [RESOURCE_CATALYST]: 0.4,
};
let TraderJoe = TraderJoe_1 = class TraderJoe {
    constructor() {
        this.memory = Mem.wrap(Memory.Overmind, 'trader', TraderMemoryDefaults, true);
        this.stats = Mem.wrap(Memory.stats.persistent, 'trader');
    }
    /* Builds a cache for market - this is very expensive; use infrequently */
    buildMarketCache(verbose = false) {
        this.invalidateMarketCache();
        let myActiveOrderIDs = _.map(_.filter(Game.market.orders, order => order.active), order => order.id);
        let allOrders = Game.market.getAllOrders(order => !myActiveOrderIDs.includes(order.id) &&
            order.amount >= 1000); // don't include tiny orders in costs
        let groupedBuyOrders = _.groupBy(_.filter(allOrders, o => o.type == ORDER_BUY), o => o.resourceType);
        let groupedSellOrders = _.groupBy(_.filter(allOrders, o => o.type == ORDER_SELL), o => o.resourceType);
        for (let resourceType in groupedBuyOrders) {
            // Store buy order with maximum price in cache
            let prices = _.map(groupedBuyOrders[resourceType], o => o.price);
            let high = _.max(prices);
            let low = _.min(prices);
            if (verbose)
                console.log(`${resourceType} BUY: high: ${high}  low: ${low}`);
            // this.memory.cache.buy[resourceType] = minBy(groupedBuyOrders[resourceType], (o:Order) => -1 * o.price);
            this.memory.cache.buy[resourceType] = { high: high, low: low };
        }
        for (let resourceType in groupedSellOrders) {
            // Store sell order with minimum price in cache
            let prices = _.map(groupedSellOrders[resourceType], o => o.price);
            let high = _.max(prices);
            let low = _.min(prices);
            if (verbose)
                console.log(`${resourceType} SELL: high: ${high}  low: ${low}`);
            // this.memory.cache.sell[resourceType] = minBy(groupedSellOrders[resourceType], (o:Order) => o.price);
            this.memory.cache.sell[resourceType] = { high: high, low: low };
        }
        this.memory.cache.tick = Game.time;
    }
    invalidateMarketCache() {
        this.memory.cache = {
            sell: {},
            buy: {},
            tick: 0,
        };
    }
    /* Cost per unit including transfer price with energy converted to credits */
    effectivePrice(order, terminal) {
        if (order.roomName) {
            let transferCost = Game.market.calcTransactionCost(1000, order.roomName, terminal.room.name) / 1000;
            let energyToCreditMultiplier = 0.01; //this.cache.sell[RESOURCE_ENERGY] * 1.5;
            return order.price + transferCost * energyToCreditMultiplier;
        }
        else {
            return Infinity;
        }
    }
    /* Cost per unit for a buy order including transfer price with energy converted to credits */
    effectiveBuyPrice(order, terminal) {
        if (order.roomName) {
            let transferCost = Game.market.calcTransactionCost(1000, order.roomName, terminal.room.name) / 1000;
            let energyToCreditMultiplier = 0.01; //this.cache.sell[RESOURCE_ENERGY] * 1.5;
            return order.price - transferCost * energyToCreditMultiplier;
        }
        else {
            return Infinity;
        }
    }
    // private getBestOrder(mineralType: ResourceConstant, type: 'buy' | 'sell'): Order | undefined {
    // 	let cachedOrder = this.memory.cache[type][mineralType];
    // 	if (cachedOrder) {
    // 		let order = Game.market.getOrderById(cachedOrder.id);
    // 		if (order) {
    // 			// Update the order in memory
    // 			this.memory.cache[type][mineralType] = order;
    // 		}
    // 	}
    // }
    cleanUpInactiveOrders() {
        // Clean up sell orders that have expired or orders belonging to rooms no longer owned
        let ordersToClean = _.filter(Game.market.orders, o => (o.type == ORDER_SELL && o.active == false && o.remainingAmount == 0) // if order is expired, or
            || (Game.time - o.created > TraderJoe_1.settings.market.orders.timeout // order is old and almost done
                && o.remainingAmount < TraderJoe_1.settings.market.orders.cleanupAmount)
            || (o.roomName && !Overmind.colonies[o.roomName])); // order placed from dead colony
        for (let order of ordersToClean) {
            Game.market.cancelOrder(order.id);
        }
    }
    /* Opportunistically sells resources when the buy price is higher than current market sell low price*/
    lookForGoodDeals(terminal, mineral, margin = 1.25) {
        if (Game.market.credits < TraderJoe_1.settings.market.reserveCredits) {
            return;
        }
        let amount = 5000;
        if (mineral === RESOURCE_POWER) {
            amount = 100;
        }
        let ordersForMineral = Game.market.getAllOrders(function (o) {
            return o.type === ORDER_BUY && o.resourceType === mineral && o.amount >= amount;
        });
        if (ordersForMineral === undefined) {
            return;
        }
        let marketLow = this.memory.cache.sell[mineral] ? this.memory.cache.sell[mineral].low : undefined;
        if (marketLow == undefined) {
            return;
        }
        let order = maxBy(ordersForMineral, order => this.effectiveBuyPrice(order, terminal));
        if (order && order.price > marketLow * margin) {
            let amount = Math.min(order.amount, 10000);
            let cost = Game.market.calcTransactionCost(amount, terminal.room.name, order.roomName);
            if (terminal.store[RESOURCE_ENERGY] > cost) {
                let response = Game.market.deal(order.id, amount, terminal.room.name);
                this.logTransaction(order, terminal.room.name, amount, response);
            }
        }
    }
    /* Sell resources directly to a buyer rather than making a sell order */
    sellDirectly(terminal, resource, amount = 1000) {
        let ordersForMineral = Game.market.getAllOrders(o => o.type == ORDER_BUY && o.resourceType == resource && o.amount >= amount);
        if (!ordersForMineral) {
            return;
        }
        let order = maxBy(ordersForMineral, order => this.effectiveBuyPrice(order, terminal));
        if (order) {
            let sellAmount = Math.min(order.amount, amount);
            let cost = Game.market.calcTransactionCost(sellAmount, terminal.room.name, order.roomName);
            if (terminal.store[RESOURCE_ENERGY] > cost) {
                let response = Game.market.deal(order.id, sellAmount, terminal.room.name);
                this.logTransaction(order, terminal.room.name, amount, response);
            }
        }
    }
    /* Create or maintain a sell order */
    maintainSellOrder(terminal, resource, amount = 10000) {
        let marketLow = this.memory.cache.sell[resource] ? this.memory.cache.sell[resource].low : undefined;
        if (!marketLow) {
            return;
        }
        let mySellOrders = _.filter(Game.market.orders, o => o.type == ORDER_SELL &&
            o.resourceType == resource &&
            o.roomName == terminal.room.name);
        if (mySellOrders.length > 0) {
            for (let order of mySellOrders) {
                if (order.price > marketLow || (order.price < marketLow && order.remainingAmount == 0)) {
                    let ret = Game.market.changeOrderPrice(order.id, marketLow);
                    log.info(`${terminal.room.print}: updating sell order price for ${resource} from ${order.price} ` +
                        `to ${marketLow}. Response: ${ret}`);
                }
                if (order.remainingAmount < 2000) {
                    let addAmount = (amount - order.remainingAmount);
                    let ret = Game.market.extendOrder(order.id, addAmount);
                    log.info(`${terminal.room.print}: extending sell order for ${resource} by ${addAmount}.` +
                        ` Response: ${ret}`);
                }
            }
        }
        else {
            let ret = Game.market.createOrder(ORDER_SELL, resource, marketLow, amount, terminal.room.name);
            log.info(`${terminal.room.print}: creating sell order for ${resource} at price ${marketLow}. ` +
                `Response: ${ret}`);
        }
    }
    sell(terminal, resource, amount = 10000) {
        if (Game.market.credits < TraderJoe_1.settings.market.reserveCredits) {
            this.sellDirectly(terminal, resource, amount);
        }
        else {
            this.maintainSellOrder(terminal, resource, amount);
        }
    }
    priceOf(mineralType) {
        if (this.memory.cache.sell[mineralType]) {
            return this.memory.cache.sell[mineralType].low;
        }
        else {
            return Infinity;
        }
    }
    buyMineral(terminal, mineralType, amount) {
        if (Game.market.credits < TraderJoe_1.settings.market.reserveCredits || terminal.cooldown > 0) {
            return;
        }
        amount += 10;
        if (terminal.store[RESOURCE_ENERGY] < 10000 || terminal.storeCapacity - _.sum(terminal.store) < amount) {
            return;
        }
        let ordersForMineral = Game.market.getAllOrders(order => order.type == ORDER_SELL && order.resourceType == mineralType && order.amount >= amount);
        let bestOrder = minBy$1(ordersForMineral, (order) => order.price);
        let maxPrice = maxMarketPrices[mineralType] || maxMarketPrices.default;
        if (bestOrder && bestOrder.price <= maxPrice) {
            let response = Game.market.deal(bestOrder.id, amount, terminal.room.name);
            this.logTransaction(bestOrder, terminal.room.name, amount, response);
        }
    }
    logTransaction(order, destinationRoomName, amount, response) {
        let action = order.type == ORDER_SELL ? 'bought' : 'sold';
        let cost = (order.price * amount).toFixed(2);
        let fee = order.roomName ? Game.market.calcTransactionCost(amount, order.roomName, destinationRoomName) : 0;
        let roomName = Game.rooms[destinationRoomName] ? Game.rooms[destinationRoomName].print : destinationRoomName;
        log.info(`${roomName}: ${action} ${amount} of ${order.resourceType} at ${order.roomName}.  ` +
            `Price: ${cost} credits  Fee: ${fee} energy  Response: ${response}`);
    }
    init() {
        if (Game.time - (this.memory.cache.tick || 0) > TraderJoe_1.settings.cache.timeout) {
            this.buildMarketCache();
        }
    }
    run() {
        if (Game.time % 10 == 0) {
            this.cleanUpInactiveOrders();
        }
    }
};
TraderJoe.settings = {
    cache: {
        timeout: 25,
    },
    market: {
        reserveCredits: 10000,
        boostCredits: 15000,
        orders: {
            timeout: 100000,
            cleanupAmount: 10,
        }
    },
};
TraderJoe = TraderJoe_1 = __decorate([
    profile
], TraderJoe);
var TraderJoe_1;

// Abathur is responsible for the evolution of the swarm and directs global production of minerals
const _priorityStock = {
    XGHO2: 1000,
    XLHO2: 1000,
    XZHO2: 1000,
    XZH2O: 1000,
    XKHO2: 1000,
    XUH2O: 1000,
    GHO2: 1000,
    LHO2: 1000,
    ZHO2: 1000,
    ZH2O: 1000,
    UH2O: 1000,
    KHO2: 1000,
    GO: 1000,
    LO: 1000,
    ZO: 1000,
    ZH: 1000,
    UH: 1000,
    KO: 1000,
};
const _wantedStock = {
    UH: 2000,
    KO: 3000,
    XGHO2: 10000,
    XLHO2: 10000,
    XZHO2: 6000,
    XZH2O: 6000,
    XKHO2: 8000,
    XUH2O: 8000,
    G: 4000,
    XLH2O: 2000,
    LH: 2000,
    XUHO2: 2000,
    XKH2O: 2000,
    XGH2O: 12000 // For upgraders
};
// Compute priority and wanted stock
let numColonies = 1; //_.keys(Overmind.colonies).length;
let priorityStock = [];
for (let resourceType in _priorityStock) {
    let stock = {
        mineralType: resourceType,
        amount: numColonies * _priorityStock[resourceType]
    };
    priorityStock.push(stock);
}
let wantedStock = [];
for (let resourceType in _wantedStock) {
    let stock = {
        mineralType: resourceType,
        amount: numColonies * _wantedStock[resourceType]
    };
    wantedStock.push(stock);
}
const AbathurMemoryDefaults = {
    sleepUntil: 0
};
let Abathur = Abathur_1 = class Abathur {
    constructor(colony) {
        this.colony = colony;
        this.memory = Mem.wrap(this.colony.memory, 'abathur', AbathurMemoryDefaults);
        this.priorityStock = priorityStock;
        this.wantedStock = wantedStock;
        this.assets = colony.assets;
    }
    /* Summarizes the total of all resources currently in a colony store structure */
    computeGlobalAssets() {
        let colonyAssets = [];
        for (let colony of getAllColonies()) {
            colonyAssets.push(colony.assets);
        }
        return mergeSum(colonyAssets);
    }
    get globalAssets() {
        if (!this._globalAssets) {
            this._globalAssets = this.computeGlobalAssets();
        }
        return this._globalAssets;
    }
    canReceiveBasicMineralsForReaction(mineralQuantities, amount) {
        for (let mineral in mineralQuantities) {
            if (!this.someColonyHasExcess(mineral, mineralQuantities[mineral])) {
                return false;
            }
        }
        return true;
    }
    canBuyBasicMineralsForReaction(mineralQuantities, priceSensitive = true) {
        if (Game.market.credits < TraderJoe.settings.market.reserveCredits) {
            return false;
        }
        for (let mineral in mineralQuantities) {
            let maxPrice = maxMarketPrices.default;
            if (priceSensitive && maxMarketPrices[mineral]) {
                maxPrice = maxMarketPrices[mineral];
            }
            if (Overmind.tradeNetwork.priceOf(mineral) > maxPrice) {
                return false;
            }
        }
        return true;
    }
    hasExcess(mineralType, excessAmount = 0) {
        return this.assets[mineralType] - excessAmount > Math.max((_wantedStock[mineralType] || 0), (_priorityStock[mineralType] || 0));
    }
    someColonyHasExcess(mineralType, excessAmount = 0) {
        return _.any(getAllColonies(), colony => colony.abathur.hasExcess(mineralType, excessAmount));
    }
    /* Generate a queue of reactions to produce the most needed compound */
    getReactionQueue(verbose = false) {
        // Return nothing if you are sleeping; prevents wasteful reaction queue calculations
        if (Game.time < this.memory.sleepUntil) {
            return [];
        }
        // Compute the reaction queue for the highest priority item that you should be and can be making
        let stocksToCheck = [_priorityStock, _wantedStock];
        for (let stocks of stocksToCheck) {
            for (let resourceType in stocks) {
                let amountOwned = this.assets[resourceType] || 0;
                let amountNeeded = stocks[resourceType];
                if (amountOwned < amountNeeded) { // if there is a shortage of this resource
                    let reactionQueue = this.buildReactionQueue(resourceType, amountNeeded - amountOwned, verbose);
                    let missingBaseMinerals = this.getMissingBasicMinerals(reactionQueue);
                    if (!_.any(missingBaseMinerals)
                        || this.canReceiveBasicMineralsForReaction(missingBaseMinerals, amountNeeded + 1000)
                        || this.canBuyBasicMineralsForReaction(missingBaseMinerals)) {
                        return reactionQueue;
                    }
                }
            }
        }
        // If there's nothing you can make, sleep for 100 ticks
        this.memory.sleepUntil = Game.time + Abathur_1.settings.sleepTime;
        return [];
    }
    /* Build a reaction queue for a target compound */
    buildReactionQueue(mineral, amount, verbose = false) {
        amount = minMax(amount, Abathur_1.settings.minBatchSize, Abathur_1.settings.maxBatchSize);
        if (verbose)
            console.log(`Abathur@${this.colony.room.print}: building reaction queue for ${amount} ${mineral}`);
        let reactionQueue = [];
        for (let ingredient of this.ingredientsList(mineral)) {
            let productionAmount = amount;
            if (ingredient != mineral) {
                if (verbose)
                    console.log(`productionAmount: ${productionAmount}, assets: ${this.assets[ingredient]}`);
                productionAmount = Math.max(productionAmount - (this.assets[ingredient] || 0), 0);
            }
            productionAmount = Math.min(productionAmount, Abathur_1.settings.maxBatchSize);
            reactionQueue.push({ mineralType: ingredient, amount: productionAmount });
        }
        if (verbose)
            console.log(`Pre-trim queue: ${JSON.stringify(reactionQueue)}`);
        reactionQueue = this.trimReactionQueue(reactionQueue);
        if (verbose)
            console.log(`Post-trim queue: ${JSON.stringify(reactionQueue)}`);
        reactionQueue = _.filter(reactionQueue, rxn => rxn.amount > 0);
        if (verbose)
            console.log(`Final queue: ${JSON.stringify(reactionQueue)}`);
        return reactionQueue;
    }
    /* Trim a reaction queue, reducing the amounts of precursor compounds which need to be produced */
    trimReactionQueue(reactionQueue) {
        // Scan backwards through the queue and reduce the production amount of subsequently baser resources as needed
        reactionQueue.reverse();
        for (let reaction of reactionQueue) {
            let [ing1, ing2] = REAGENTS[reaction.mineralType];
            let precursor1 = _.findIndex(reactionQueue, rxn => rxn.mineralType == ing1);
            let precursor2 = _.findIndex(reactionQueue, rxn => rxn.mineralType == ing2);
            for (let index of [precursor1, precursor2]) {
                if (index != -1) {
                    if (reactionQueue[index].amount == 0) {
                        reactionQueue[index].amount = 0;
                    }
                    else {
                        reactionQueue[index].amount = minMax(reaction.amount, Abathur_1.settings.minBatchSize, reactionQueue[index].amount);
                    }
                }
            }
        }
        reactionQueue.reverse();
        return reactionQueue;
    }
    /* Figure out which basic minerals are missing and how much */
    getMissingBasicMinerals(reactionQueue) {
        let requiredBasicMinerals = this.getRequiredBasicMinerals(reactionQueue);
        let missingBasicMinerals = {};
        for (let mineralType in requiredBasicMinerals) {
            let amountMissing = requiredBasicMinerals[mineralType] - (this.assets[mineralType] || 0);
            if (amountMissing > 0) {
                missingBasicMinerals[mineralType] = amountMissing;
            }
        }
        return missingBasicMinerals;
    }
    /* Get the required amount of basic minerals for a reaction queue */
    getRequiredBasicMinerals(reactionQueue) {
        let requiredBasicMinerals = {
            [RESOURCE_HYDROGEN]: 0,
            [RESOURCE_OXYGEN]: 0,
            [RESOURCE_UTRIUM]: 0,
            [RESOURCE_KEANIUM]: 0,
            [RESOURCE_LEMERGIUM]: 0,
            [RESOURCE_ZYNTHIUM]: 0,
            [RESOURCE_CATALYST]: 0,
        };
        for (let reaction of reactionQueue) {
            let ingredients = REAGENTS[reaction.mineralType];
            for (let ingredient of ingredients) {
                if (!REAGENTS[ingredient]) { // resource is base mineral
                    requiredBasicMinerals[ingredient] += reaction.amount;
                }
            }
        }
        return requiredBasicMinerals;
    }
    /* Recursively generate a list of ingredients required to produce a compound */
    ingredientsList(mineral) {
        if (!REAGENTS[mineral] || _.isEmpty(mineral)) {
            return [];
        }
        else {
            return this.ingredientsList(REAGENTS[mineral][0])
                .concat(this.ingredientsList(REAGENTS[mineral][1]), mineral);
        }
    }
};
Abathur.settings = {
    minBatchSize: 100,
    maxBatchSize: 1000,
    sleepTime: 100,
};
Abathur = Abathur_1 = __decorate([
    profile
], Abathur);
var Abathur_1;

// A bunch of unicode string constants
const rightArrow = '\u27f6';

// Evolution chamber: manages lab boosting behavior
const LabStatus = {
    Idle: 0,
    AcquiringMinerals: 1,
    LoadingLabs: 2,
    Synthesizing: 3,
    UnloadingLabs: 4,
};
const LabStageTimeouts = {
    Idle: Infinity,
    AcquiringMinerals: 100,
    LoadingLabs: 50,
    Synthesizing: 10000,
    UnloadingLabs: 1000
};
const EvolutionChamberMemoryDefaults = {
    status: LabStatus.Idle,
    statusTick: 0,
    activeReaction: undefined,
    reactionQueue: [],
    labMineralTypes: {},
};
function neighboringLabs(pos) {
    return _.compact(_.map(pos.neighbors, neighbor => neighbor.lookForStructure(STRUCTURE_LAB)));
}

let EvolutionChamber = class EvolutionChamber extends HiveCluster {
    constructor(colony, terminal) {
        super(colony, terminal, 'evolutionChamber');
        this.memory = Mem.wrap(this.colony.memory, 'evolutionChamber', EvolutionChamberMemoryDefaults);
        // Register physical components
        this.terminal = terminal;
        this.terminalNetwork = Overmind.terminalNetwork;
        this.labs = colony.labs;
        // Boosting lab is the closest by path to terminal (fastest to empty and refill)
        this.boostingLab = _.first(_.sortBy(this.labs, lab => Pathing.distance(this.terminal.pos, lab.pos)));
        // Reagent labs are range=2 from all other labs (there are two in my layout at RCL8)
        let range2Labs = _.filter(this.labs, lab => _.all(this.labs, otherLab => lab.pos.inRangeTo(otherLab, 2)) &&
            lab != this.boostingLab);
        this.reagentLabs = _.take(_.sortBy(range2Labs, lab => -1 * neighboringLabs(lab.pos).length), 2); // most neighbr
        // Product labs are everything that isn't a reagent lab. (boostingLab can also be a productLab)
        this.productLabs = _.difference(this.labs, this.reagentLabs);
        // This keeps track of reservations for boosting
        this.labReservations = {};
        this.boostQueue = {};
        this.neededBoosts = {};
        // Evolution chamber shares a common request group with command center
        if (this.colony.commandCenter) {
            this.transportRequests = this.colony.commandCenter.transportRequests;
        }
        else {
            this.transportRequests = new TransportRequestGroup();
        }
    }
    statusTimeoutCheck() {
        let ticksInStatus = Game.time - this.memory.statusTick;
        let timeout = false;
        switch (this.memory.status) {
            case LabStatus.Idle:
                timeout = ticksInStatus > LabStageTimeouts.Idle;
                break;
            case LabStatus.AcquiringMinerals:
                timeout = ticksInStatus > LabStageTimeouts.AcquiringMinerals;
                break;
            case LabStatus.LoadingLabs:
                timeout = ticksInStatus > LabStageTimeouts.LoadingLabs;
                break;
            case LabStatus.Synthesizing:
                timeout = ticksInStatus > LabStageTimeouts.Synthesizing;
                break;
            case LabStatus.UnloadingLabs:
                timeout = ticksInStatus > LabStageTimeouts.UnloadingLabs;
                break;
            default:
                log.warning(`Bad lab state at ${this.room.print}!`);
                this.memory.status = LabStatus.Idle;
                this.memory.statusTick = Game.time;
                break;
        }
        if (timeout) {
            log.warning(`${this.room.print}: stuck in state ${this.memory.status} for ${ticksInStatus} ticks, ` +
                `rebuilding reaction queue and reverting to idle state!`);
            this.memory.status = LabStatus.Idle;
            this.memory.statusTick = Game.time;
            this.memory.activeReaction = undefined;
            this.memory.reactionQueue = [];
        }
    }
    initLabStatus() {
        if (!this.memory.activeReaction && this.memory.status != LabStatus.Idle) {
            log.warning(`No active reaction at ${this.room.print}!`);
            this.memory.status = LabStatus.Idle;
        }
        switch (this.memory.status) {
            case LabStatus.Idle:
                if (this.memory.activeReaction) {
                    let [ing1, ing2] = REAGENTS[this.memory.activeReaction.mineralType];
                    log.info(`${this.room.print}: starting synthesis of ${ing1} + ${ing2} ${rightArrow} ` +
                        this.memory.activeReaction.mineralType);
                    this.memory.status = LabStatus.AcquiringMinerals;
                    this.memory.statusTick = Game.time;
                }
                break;
            case LabStatus.AcquiringMinerals: // "We acquire more mineralzzz"
                let missingIngredients = this.colony.abathur.getMissingBasicMinerals([this.memory.activeReaction]);
                if (_.all(missingIngredients, amount => amount == 0)) {
                    // Loading labs if all minerals are present but labs not at desired capacity yet
                    this.memory.status = LabStatus.LoadingLabs;
                    this.memory.statusTick = Game.time;
                }
                break;
            case LabStatus.LoadingLabs:
                if (_.all(this.reagentLabs, lab => lab.mineralAmount >= this.memory.activeReaction.amount &&
                    REAGENTS[this.memory.activeReaction.mineralType]
                        .includes(lab.mineralType))) {
                    this.memory.status = LabStatus.Synthesizing;
                    this.memory.statusTick = Game.time;
                }
                break;
            case LabStatus.Synthesizing:
                if (_.any(this.reagentLabs, lab => lab.mineralAmount < LAB_REACTION_AMOUNT)) {
                    this.memory.status = LabStatus.UnloadingLabs;
                    this.memory.statusTick = Game.time;
                }
                break;
            case LabStatus.UnloadingLabs:
                if (_.all([...this.reagentLabs, ...this.productLabs], lab => lab.mineralAmount == 0)) {
                    this.memory.status = LabStatus.Idle;
                    this.memory.statusTick = Game.time;
                }
                break;
            default:
                log.warning(`Bad lab state at ${this.room.print}!`);
                this.memory.status = LabStatus.Idle;
                this.memory.statusTick = Game.time;
                break;
        }
        this.statusTimeoutCheck();
    }
    reagentLabRequests() {
        if (this.memory.activeReaction) {
            let { mineralType, amount } = this.memory.activeReaction;
            let [ing1, ing2] = REAGENTS[mineralType];
            let [lab1, lab2] = this.reagentLabs;
            // Empty out any incorrect minerals and request the correct reagents
            if (this.memory.status == LabStatus.UnloadingLabs || (lab1.mineralType != ing1 && lab1.mineralAmount > 0)) {
                this.transportRequests.requestOutput(lab1, Priority.Normal, { resourceType: lab1.mineralType });
            }
            else if (this.memory.status == LabStatus.LoadingLabs && lab1.mineralAmount < amount) {
                this.transportRequests.requestInput(lab1, Priority.Normal, {
                    resourceType: ing1,
                    amount: amount - lab1.mineralAmount,
                });
            }
            if (this.memory.status == LabStatus.UnloadingLabs || (lab2.mineralType != ing2 && lab2.mineralAmount > 0)) {
                this.transportRequests.requestOutput(lab2, Priority.Normal, { resourceType: lab2.mineralType });
            }
            else if (this.memory.status == LabStatus.LoadingLabs && lab2.mineralAmount < amount) {
                this.transportRequests.requestInput(lab2, Priority.Normal, {
                    resourceType: ing2,
                    amount: amount - lab2.mineralAmount,
                });
            }
        }
        else {
            // Labs should be empty when no reaction process is currently happening
            for (let lab of this.reagentLabs) {
                this.transportRequests.requestOutput(lab, Priority.Normal, { resourceType: lab.mineralType });
            }
        }
    }
    productLabRequests() {
        if (this.memory.activeReaction) {
            let { mineralType, amount } = this.memory.activeReaction;
            for (let lab of this.productLabs) {
                let labHasWrongMineral = lab.mineralType != mineralType && lab.mineralAmount > 0;
                let labIsFull = lab.mineralAmount == lab.mineralCapacity;
                // Empty out incorrect minerals or if it's time to unload or if lab is full
                if ((this.memory.status == LabStatus.UnloadingLabs && lab.mineralAmount > 0) ||
                    labHasWrongMineral || labIsFull) {
                    this.transportRequests.requestOutput(lab, Priority.NormalLow, { resourceType: lab.mineralType });
                }
            }
        }
        else {
            // Labs should be empty when no reaction process is currently happening
            for (let lab of this.productLabs) {
                this.transportRequests.requestOutput(lab, Priority.NormalLow, { resourceType: lab.mineralType });
            }
        }
    }
    boosterLabRequests(lab) {
        let { mineralType, amount } = this.labReservations[lab.id];
        // Empty out incorrect minerals
        if (lab.mineralType != mineralType && lab.mineralAmount > 0) {
            this.transportRequests.requestOutput(lab, Priority.High, { resourceType: lab.mineralType });
        }
        else {
            this.transportRequests.requestInput(lab, Priority.High, {
                resourceType: mineralType,
                amount: amount - lab.mineralAmount
            });
        }
    }
    registerRequests() {
        // Refill labs needing energy with lower priority for all non-boosting labs
        let refillLabs = _.filter(this.labs, lab => lab.energy < lab.energyCapacity && lab.id != this.boostingLab.id);
        _.forEach(refillLabs, lab => this.transportRequests.requestInput(lab, Priority.NormalLow));
        // Request high priority energy to booster lab
        if (this.boostingLab.energy < this.boostingLab.energyCapacity) {
            this.transportRequests.requestInput(this.boostingLab, Priority.NormalHigh);
        }
        // Request resources delivered to / withdrawn from each type of lab
        this.reagentLabRequests();
        this.productLabRequests();
        _.forEach(_.keys(this.labReservations), id => this.boosterLabRequests(deref(id)));
    }
    // Lab mineral reservations ========================================================================================
    /* Reserves a product lab for boosting with a compound unrelated to production */
    reserveLab(mineralType, amount, lab = this.boostingLab) {
        _.remove(this.productLabs, productLab => productLab.ref == lab.ref);
        this.labReservations[lab.id] = { mineralType: mineralType, amount: amount };
    }
    canBoost(creep, boostType) {
        let boostAmount = LAB_BOOST_MINERAL * (creep.getActiveBodyparts(boostParts[boostType])
            - (creep.boostCounts[boostType] || 0));
        if (this.colony.assets[boostType] >= boostAmount) {
            // Does this colony have the needed resources already?
            return true;
        }
        else if (this.terminalNetwork.assets[boostType] >= 2 * boostAmount) {
            // Is there enough of the resource in terminalNetwork?
            return true;
        }
        else {
            // Can you buy the resources on the market?
            return (Game.market.credits > TraderJoe.settings.market.boostCredits +
                boostAmount * Overmind.tradeNetwork.priceOf(boostType));
        }
    }
    requestBoost(mineralType, creep, lab = this.boostingLab) {
        if (!this.boostQueue[lab.id]) {
            this.boostQueue[lab.id] = [];
        }
        // log.info(`Requesting boost ${mineralType} for ${creep.name}@${creep.pos.print}`);
        // Boost requests are prioritized by which creep has least time to live
        this.boostQueue[lab.id] = _.sortBy([...this.boostQueue[lab.id],
            { mineralType: mineralType, creepName: creep.name }], request => (Game.zerg[request.creepName].ticksToLive || Infinity));
    }
    /* Zero-indexed position in the boosting queue of a given creep. Equals -1 if creep isn't queued. */
    queuePosition(creep, lab = this.boostingLab) {
        return _.findIndex(this.boostQueue[lab.id], request => request.creepName == creep.name);
    }
    // Initialization and operation ====================================================================================
    init() {
        // Get a reaction queue if needed
        if (this.memory.reactionQueue.length == 0) {
            this.memory.reactionQueue = this.colony.abathur.getReactionQueue();
        }
        // Switch to next reaction on the queue if you are idle
        if (this.memory.status == LabStatus.Idle) {
            this.memory.activeReaction = this.memory.reactionQueue.shift();
        }
        // Set boosting lab reservations and compute needed resources
        for (let labID in this.boostQueue) {
            let boostLab = deref(labID);
            let boostRequest = _.first(this.boostQueue[labID]);
            let boostType = boostRequest.mineralType;
            let creep = Game.zerg[boostRequest.creepName];
            let boostAmount = LAB_BOOST_MINERAL * (creep.getActiveBodyparts(boostParts[boostType])
                - (creep.boostCounts[boostType] || 0));
            // add to the needed amount of boosts
            if (!this.neededBoosts[boostType]) {
                this.neededBoosts[boostType] = 0;
            }
            this.neededBoosts[boostType] += boostAmount;
            // reserve lab once creep is born
            if (creep.ticksToLive != undefined) {
                this.reserveLab(boostType, boostAmount, boostLab);
            }
        }
        this.initLabStatus();
        this.registerRequests();
    }
    run() {
        // Obtain resources for boosting
        for (let resourceType in this.neededBoosts) {
            let needAmount = Math.max(this.neededBoosts[resourceType] - (this.colony.assets[resourceType] || 0), 0);
            if (needAmount > 0) {
                this.terminalNetwork.requestResource(this.terminal, resourceType, needAmount, true, 0);
            }
        }
        // Obtain resources for reaction queue
        let queue = this.memory.reactionQueue;
        if (this.memory.activeReaction && this.memory.status == LabStatus.AcquiringMinerals) {
            queue = [this.memory.activeReaction].concat(queue);
        }
        let missingBasicMinerals = this.colony.abathur.getMissingBasicMinerals(queue);
        for (let resourceType in missingBasicMinerals) {
            if (missingBasicMinerals[resourceType] > 0) {
                this.terminalNetwork.requestResource(this.terminal, resourceType, missingBasicMinerals[resourceType]);
            }
        }
        // Run the reactions
        if (this.memory.status == LabStatus.Synthesizing) {
            let [lab1, lab2] = this.reagentLabs;
            for (let lab of this.productLabs) {
                if (lab.cooldown == 0) {
                    lab.runReaction(lab1, lab2);
                }
            }
        }
    }
    visuals() {
        // for (let lab of this.reagentLabs) {
        // 	Visualizer.circle(lab.pos, 'red');
        // }
        // for (let lab of this.productLabs) {
        // 	Visualizer.circle(lab.pos, 'blue');
        // }
        // Visualizer.circle(this.boostingLab.pos, 'green');
    }
};
EvolutionChamber.settings = {};
EvolutionChamber = __decorate([
    profile
], EvolutionChamber);

const DroneSetup = new CreepSetup('drone', {
    pattern: [WORK, WORK, CARRY, MOVE],
    sizeLimit: Infinity,
});
let ExtractorOverlord = class ExtractorOverlord extends Overlord {
    constructor(extractionSite, priority) {
        super(extractionSite, 'mineral', priority);
        this.drones = this.creeps(DroneSetup.role);
        this.extractionSite = extractionSite;
    }
    init() {
        let amount = this.extractionSite.mineral.mineralAmount > 0 ? 1 : 0;
        this.wishlist(amount, DroneSetup);
    }
    handleDrone(drone) {
        // Ensure you are in the assigned room
        if (drone.room == this.room && !drone.pos.isEdge) {
            if (_.sum(drone.carry) == 0) {
                drone.task = Tasks.harvest(this.extractionSite.mineral);
            }
            // Else see if there is an output to depsit to or to maintain
            else if (this.extractionSite.output) {
                drone.task = Tasks.transferAll(this.extractionSite.output);
                // Move onto the output container if you're the only drone
                if (!drone.pos.isEqualTo(this.extractionSite.output.pos) && this.drones.length == 1) {
                    drone.travelTo(this.extractionSite.output, { range: 0 });
                }
            }
        }
        else {
            drone.travelTo(this.extractionSite);
        }
    }
    fleeResponse(drone) {
        if (drone.room == this.colony.room) {
            // If there is a large invasion happening in the colony room, flee
            if (this.colony.defcon > DEFCON.invasionNPC) {
                drone.task = Tasks.flee(this.colony.controller);
            }
        }
        else {
            // If there are baddies in the room, flee
            if (drone.room.dangerousHostiles.length > 0) {
                drone.task = Tasks.flee(this.colony.controller);
            }
        }
    }
    run() {
        for (let drone of this.drones) {
            if (drone.isIdle) {
                this.handleDrone(drone);
            }
            // this.fleeResponse(drone);
            drone.run();
        }
    }
};
ExtractorOverlord = __decorate([
    profile
], ExtractorOverlord);

// Mining site class for grouping relevant components
// interface MineralSiteMemory {
// 	stats: {
// 		usage: number;
// 		downtime: number;
// 	};
// }
let ExtractionSite = class ExtractionSite extends HiveCluster {
    constructor(colony, extractor) {
        super(colony, extractor, 'extractionSite');
        this.extractor = extractor;
        this.mineral = extractor.pos.lookFor(LOOK_MINERALS)[0];
        // Register output method
        let siteContainer = this.pos.findClosestByLimitedRange(this.room.containers, 2);
        if (siteContainer) {
            this.output = siteContainer;
        }
        if (this.outputPos) {
            this.colony.destinations.push(this.outputPos);
        }
        // Register output construction sites
        let nearbyOutputSites = this.pos.findInRange(this.room.constructionSites, 2, {
            filter: (s) => s.structureType == STRUCTURE_CONTAINER
        });
        this.outputConstructionSite = nearbyOutputSites[0];
        // Create a mining overlord for this
        this.overlord = new ExtractorOverlord(this, OverlordPriority.ownedRoom.mineral);
        if (Game.time % 100 == 0 && !this.output && !this.outputConstructionSite) {
            log.warning(`Mineral site at ${this.pos.print} has no output!`);
        }
    }
    // get memory(): MineralSiteMemory {
    // 	return Mem.wrap(this.colony.memory, this.name);
    // }
    /* Register appropriate resource withdrawal requests when the output gets sufficiently full */
    registerOutputRequests() {
        // Register logisticsNetwork requests if approximate predicted amount exceeds transporter capacity
        if (this.output) {
            if (_.sum(this.output.store) > 0.5 * this.output.storeCapacity) {
                this.colony.logisticsNetwork.requestOutputAll(this.output);
            }
            else if (_.sum(this.output.store) > 0 && this.overlord.drones.length == 0) {
                this.colony.logisticsNetwork.requestOutputAll(this.output);
            }
        }
    }
    /* Initialization tasks: register resource transfer reqeusts, register creep requests */
    init() {
        this.registerOutputRequests();
    }
    get outputPos() {
        if (this.output) {
            return this.output.pos;
        }
        else if (this.outputConstructionSite) {
            return this.outputConstructionSite.pos;
        }
        else {
            if (!this._outputPos) {
                this._outputPos = this.calculateContainerPos();
                if (!this._outputPos && Game.time % 25 == 0) {
                    log.alert(`Mining site at ${this.pos.print}: no room plan set; cannot determine outputPos!`);
                }
            }
            return this._outputPos;
        }
    }
    /* Calculate where the container output will be built for this site */
    calculateContainerPos() {
        let originPos = undefined;
        if (this.colony.storage) {
            originPos = this.colony.storage.pos;
        }
        else if (this.colony.roomPlanner.storagePos) {
            originPos = this.colony.roomPlanner.storagePos;
        }
        if (originPos) {
            let path = Pathing.findShortestPath(this.pos, originPos).path;
            return path[0];
        }
    }
    /* Build a container output at the optimal location */
    buildOutputIfNeeded() {
        if (!this.output && !this.outputConstructionSite) {
            let buildHere = this.outputPos;
            if (buildHere) {
                // Build a link if one is available
                let structureType = STRUCTURE_CONTAINER;
                let result = buildHere.createConstructionSite(structureType);
                if (result != OK) {
                    log.error(`Extraction site at ${this.pos.print}: cannot build output! Result: ${result}`);
                }
            }
        }
    }
    /* Run tasks: make output construciton site if needed; build and maintain the output structure */
    run() {
        let rebuildOnTick = 5;
        let rebuildFrequency = 10;
        if (Game.time % rebuildFrequency == rebuildOnTick) {
            this.buildOutputIfNeeded();
        }
    }
    visuals() {
        // Visualizer.showInfo([`Usage:  ${this.memory.stats.usage.toPercent()}`,
        // 					 `Downtime: ${this.memory.stats.downtime.toPercent()}`], this);
    }
};
ExtractionSite = __decorate([
    profile
], ExtractionSite);

// Colony class - organizes all assets of an owned room into a colony
var ColonyStage;
(function (ColonyStage) {
    ColonyStage[ColonyStage["Larva"] = 0] = "Larva";
    ColonyStage[ColonyStage["Pupa"] = 1] = "Pupa";
    ColonyStage[ColonyStage["Adult"] = 2] = "Adult";
})(ColonyStage || (ColonyStage = {}));
var DEFCON;
(function (DEFCON) {
    DEFCON[DEFCON["safe"] = 0] = "safe";
    DEFCON[DEFCON["invasionNPC"] = 1] = "invasionNPC";
    DEFCON[DEFCON["boostedInvasionNPC"] = 2] = "boostedInvasionNPC";
    DEFCON[DEFCON["playerInvasion"] = 2] = "playerInvasion";
    DEFCON[DEFCON["bigPlayerInvasion"] = 3] = "bigPlayerInvasion";
})(DEFCON || (DEFCON = {}));
function getAllColonies() {
    return _.values(Overmind.colonies);
}
let Colony = class Colony {
    constructor(id, roomName, outposts, creeps) {
        // Primitive colony setup
        this.id = id;
        this.name = roomName;
        this.colony = this;
        if (!Memory.colonies[this.name]) {
            Memory.colonies[this.name] = { defcon: { level: DEFCON.safe, tick: Game.time } };
        }
        this.memory = Memory.colonies[this.name];
        // Register creeps
        this.creeps = creeps || [];
        this.creepsByRole = _.groupBy(this.creeps, creep => creep.memory.role);
        // Instantiate the colony overseer
        this.overseer = new Overseer(this);
        // Register colony capitol and outposts
        this.roomNames = [roomName].concat(outposts);
        this.room = Game.rooms[roomName];
        this.outposts = _.compact(_.map(outposts, outpost => Game.rooms[outpost]));
        this.rooms = [Game.rooms[roomName]].concat(this.outposts);
        // Register real colony components
        this.registerRoomObjects();
        // Set the colony operational state
        this.registerOperationalState();
        // Create placeholder arrays for remaining properties to be filled in by the Overmind
        this.flags = []; // filled in by directives
        this.destinations = []; // filled in by various hive clusters and directives
        this.registerUtilities();
        // Build the hive clusters
        this.registerHiveClusters();
        // Register colony overlords
        this.spawnMoarOverlords();
        // Add an Abathur
        this.assets = this.getAllAssets();
        this.abathur = new Abathur(this);
        // Register colony globally to allow 'W1N1' and 'w1n1' to refer to Overmind.colonies.W1N1
        global[this.name] = this;
        global[this.name.toLowerCase()] = this;
    }
    registerRoomObjects() {
        this.controller = this.room.controller; // must be controller since colonies are based in owned rooms
        this.pos = this.controller.pos; // This is used for overlord initialization but isn't actually useful
        this.spawns = _.sortBy(_.filter(this.room.spawns, spawn => spawn.my && spawn.isActive()), spawn => spawn.ref);
        this.extensions = this.room.extensions;
        this.storage = this.room.storage;
        this.links = this.room.links;
        this.availableLinks = _.clone(this.room.links);
        this.terminal = this.room.terminal;
        this.towers = this.room.towers;
        this.labs = _.sortBy(_.filter(this.room.labs, lab => lab.my && lab.isActive()), lab => 50 * lab.pos.y + lab.pos.x); // Labs are sorted in reading order of positions
        this.powerSpawn = this.room.getStructures(STRUCTURE_POWER_SPAWN)[0];
        this.nuker = this.room.getStructures(STRUCTURE_NUKER)[0];
        this.observer = this.room.getStructures(STRUCTURE_OBSERVER)[0];
        // Register physical objects across all rooms in the colony
        this.sources = _.sortBy(_.flatten(_.map(this.rooms, room => room.sources)), source => source.pos.getMultiRoomRangeTo(this.pos));
        this.extractors = _.sortBy(_.compact(_.map(this.rooms, room => room.extractor)), extractor => extractor.pos.getMultiRoomRangeTo(this.pos));
        this.constructionSites = _.flatten(_.map(this.rooms, room => room.constructionSites));
        this.tombstones = _.flatten(_.map(this.rooms, room => room.tombstones));
        this.repairables = _.flatten(_.map(this.rooms, room => room.repairables));
        this.obstacles = [];
    }
    registerOperationalState() {
        this.level = this.controller.level;
        this.bootstrapping = false;
        this.isIncubating = false;
        if (this.storage && this.storage.isActive() &&
            this.spawns[0] && this.spawns[0].pos.findClosestByLimitedRange(this.room.containers, 2)) {
            // If the colony has storage and a hatchery and a hatchery battery
            if (this.controller.level == 8) {
                this.stage = ColonyStage.Adult;
            }
            else {
                this.stage = ColonyStage.Pupa;
            }
        }
        else {
            this.stage = ColonyStage.Larva;
        }
        this.incubatingColonies = [];
        this.lowPowerMode = Energetics.lowPowerMode(this);
        // Set DEFCON level
        // TODO: finish this
        let defcon = DEFCON.safe;
        let defconDecayTime = 200;
        if (this.room.dangerousHostiles.length > 0) {
            let effectiveHostileCount = _.sum(_.map(this.room.dangerousHostiles, hostile => hostile.boosts.length > 0 ? 2 : 1));
            if (effectiveHostileCount >= 3) {
                defcon = DEFCON.boostedInvasionNPC;
            }
            else {
                defcon = DEFCON.invasionNPC;
            }
        }
        if (this.memory.defcon) {
            if (defcon < this.memory.defcon.level) { // decay defcon level over time if defcon less than memory value
                if (this.memory.defcon.tick + defconDecayTime < Game.time) {
                    this.memory.defcon.level = defcon;
                    this.memory.defcon.tick = Game.time;
                }
            }
            else if (defcon > this.memory.defcon.level) { // refresh defcon time if it increases by a level
                this.memory.defcon.level = defcon;
                this.memory.defcon.tick = Game.time;
            }
        }
        else {
            this.memory.defcon = {
                level: defcon,
                tick: Game.time
            };
        }
        this.defcon = this.memory.defcon.level;
        this.breached = (this.room.dangerousHostiles.length > 0 &&
            this.creeps.length == 0 &&
            !this.controller.safeMode);
        // Ininitialize abandon property to false; directives can change this
        this.abandoning = false;
    }
    registerUtilities() {
        // Resource requests
        this.linkNetwork = new LinkNetwork(this);
        this.logisticsNetwork = new LogisticsNetwork(this);
        // Register a room planner
        this.roomPlanner = new RoomPlanner(this);
        // Register road network
        this.roadLogistics = new RoadLogistics(this);
    }
    /* Instantiate and associate virtual colony components to group similar structures together */
    registerHiveClusters() {
        this.hiveClusters = [];
        // Instantiate the command center if there is storage in the room - this must be done first!
        if (this.stage > ColonyStage.Larva) {
            this.commandCenter = new CommandCenter(this, this.storage);
        }
        // Instantiate the hatchery - the incubation directive assignes hatchery to incubator's hatchery if none exists
        if (this.spawns[0]) {
            this.hatchery = new Hatchery(this, this.spawns[0]);
        }
        // Instantiate evolution chamber
        if (this.terminal && this.terminal.isActive() && this.labs.length >= 3) {
            this.evolutionChamber = new EvolutionChamber(this, this.terminal);
        }
        // Instantiate the upgradeSite
        this.upgradeSite = new UpgradeSite(this, this.controller);
        // Instantiate spore crawlers to wrap towers
        this.sporeCrawlers = _.map(this.towers, tower => new SporeCrawler(this, tower));
        // Dropoff links are freestanding links or ones at mining sites
        this.dropoffLinks = _.clone(this.availableLinks);
        // Mining sites is an object of ID's and MiningSites
        let sourceIDs = _.map(this.sources, source => source.ref);
        let miningSites = _.map(this.sources, source => new MiningSite(this, source));
        this.miningSites = _.zipObject(sourceIDs, miningSites);
        // ExtractionSites is an object of ID's and ExtractionSites
        let extractorIDs = _.map(this.extractors, extractor => extractor.ref);
        let extractionSites = _.map(this.extractors, extractor => new ExtractionSite(this, extractor));
        this.extractionSites = _.zipObject(extractorIDs, extractionSites);
        // Reverse the hive clusters for correct order for init() and run()
        this.hiveClusters.reverse();
    }
    spawnMoarOverlords() {
        this.overlords = {
            work: new WorkerOverlord(this),
            logistics: new TransportOverlord(this),
        };
    }
    // /* Refreshes portions of the colony state between ticks without rebuilding the entire object */
    // rebuild(): void {
    // 	this.flags = []; 			// Reset flags list since Overmind will re-instantiate directives
    // 	this.overseer.rebuild();	// Rebuild the overseer, which rebuilds overlords
    // }
    getCreepsByRole(roleName) {
        return this.creepsByRole[roleName] || [];
    }
    /* Summarizes the total of all resources in colony store structures, labs, and some creeps */
    getAllAssets() {
        // Include storage structures and manager carry
        let stores = _.map(_.compact([this.storage, this.terminal]), s => s.store);
        let creepCarriesToInclude = _.map(_.filter(this.creeps, creep => creep.roleName == ManagerSetup.role), creep => creep.carry);
        let allAssets = mergeSum([...stores, ...creepCarriesToInclude]);
        // Include lab amounts
        for (let lab of this.labs) {
            if (lab.mineralType) {
                if (!allAssets[lab.mineralType]) {
                    allAssets[lab.mineralType] = 0;
                }
                allAssets[lab.mineralType] += lab.mineralAmount;
            }
        }
        return allAssets;
    }
    init() {
        this.overseer.init(); // Initialize overseer AFTER hive clusters
        _.forEach(this.hiveClusters, hiveCluster => hiveCluster.init()); // Initialize each hive cluster
        // this.overseer.init();												// Initialize overseer AFTER hive clusters
        this.roadLogistics.init(); // Initialize the road network
        this.linkNetwork.init(); // Initialize link network
        this.roomPlanner.init(); // Initialize the room planner
    }
    run() {
        this.overseer.run(); // Run overseer BEFORE hive clusters
        _.forEach(this.hiveClusters, hiveCluster => hiveCluster.run()); // Run each hive cluster
        this.linkNetwork.run(); // Run the link network
        this.roadLogistics.run(); // Run the road network
        this.roomPlanner.run(); // Run the room planner
        this.stats(); // Log stats per tick
    }
    stats() {
        // Log energy and rcl
        Stats.log(`colonies.${this.name}.storage.energy`, this.storage ? this.storage.energy : undefined);
        Stats.log(`colonies.${this.name}.rcl.level`, this.controller.level);
        Stats.log(`colonies.${this.name}.rcl.progress`, this.controller.progress);
        Stats.log(`colonies.${this.name}.rcl.progressTotal`, this.controller.progressTotal);
        // Log average miningSite usage and uptime and estimated colony energy income
        let numSites = _.keys(this.miningSites).length;
        let avgDowntime = _.sum(_.map(this.miningSites, (site) => site.memory.stats.downtime)) / numSites;
        let avgUsage = _.sum(_.map(this.miningSites, (site) => site.memory.stats.usage)) / numSites;
        let energyInPerTick = _.sum(_.map(this.miningSites, (site) => site.source.energyCapacity * site.memory.stats.usage)) / ENERGY_REGEN_TIME;
        Stats.log(`colonies.${this.name}.miningSites.avgDowntime`, avgDowntime);
        Stats.log(`colonies.${this.name}.miningSites.avgUsage`, avgUsage);
        Stats.log(`colonies.${this.name}.miningSites.energyInPerTick`, energyInPerTick);
    }
    visuals() {
        this.overseer.visuals(); // Display overlord creep information
        _.forEach(this.hiveClusters, hiveCluster => hiveCluster.visuals()); // Display hiveCluster visuals
    }
};
Colony = __decorate([
    profile
], Colony);

const ClaimerSetup = new CreepSetup('claimer', {
    pattern: [CLAIM, MOVE],
    sizeLimit: 1
});
let ClaimingOverlord = class ClaimingOverlord extends Overlord {
    constructor(directive, priority = OverlordPriority.realTime.claim) {
        super(directive, 'claim', priority);
        this.claimers = this.creeps(ClaimerSetup.role);
    }
    init() {
        let amount = (this.room && this.room.controller && this.room.controller.my) ? 0 : 1;
        this.wishlist(amount, ClaimerSetup);
    }
    handleClaimer(claimer) {
        if (claimer.room == this.room && !claimer.pos.isEdge) {
            if (!this.room.controller.signedByMe) {
                // Takes care of an edge case where planned newbie zone signs prevents signing until room is reserved
                if (!this.room.my && this.room.controller.signedByScreeps) {
                    claimer.task = Tasks.claim(this.room.controller);
                }
                else {
                    claimer.task = Tasks.signController(this.room.controller);
                }
            }
            else {
                claimer.task = Tasks.claim(this.room.controller);
            }
        }
        else {
            // claimer.task = Tasks.goTo(this.pos, {travelToOptions: {ensurePath: true}});
            claimer.travelTo(this.pos, { ensurePath: true, preferHighway: true });
        }
    }
    run() {
        for (let claimer of this.claimers) {
            if (claimer.isIdle) {
                this.handleClaimer(claimer);
            }
            claimer.run();
        }
    }
};
ClaimingOverlord = __decorate([
    profile
], ClaimingOverlord);

// Claims a new room and incubates it from the nearest (or specified) colony
let DirectiveIncubate = DirectiveIncubate_1 = class DirectiveIncubate extends Directive {
    constructor(flag) {
        super(flag, DirectiveIncubate_1.requiredRCL);
        // Register incubation status
        this.incubatee = this.room ? Overmind.colonies[Overmind.colonyMap[this.room.name]] : undefined;
        if (this.incubatee && this.colony != this.incubatee) {
            // this.colony is from Flag memory and is the incubator; this.room.colony is the new colony
            this.incubatee.incubator = this.colony;
            this.incubatee.isIncubating = true;
            this.colony.incubatingColonies.push(this.incubatee);
            if (!this.incubatee.hatchery && this.colony.hatchery) {
                this.incubatee.hatchery = this.colony.hatchery;
            }
        }
        this.overlords.claim = new ClaimingOverlord(this);
    }
    init() {
    }
    run() {
        // Incubation directive gets removed once the colony has a command center (storage)
        if (this.incubatee) {
            if (this.colony.stage == ColonyStage.Adult) { // if incubator is an adult, incubate colony to adulthood
                if (this.incubatee.stage == ColonyStage.Adult) {
                    this.remove();
                }
            }
            else { // otherwise remove once storage is built
                if (this.incubatee.stage > ColonyStage.Larva) {
                    this.remove();
                }
            }
        }
    }
};
DirectiveIncubate.directiveName = 'incubate';
DirectiveIncubate.color = COLOR_PURPLE;
DirectiveIncubate.secondaryColor = COLOR_WHITE;
DirectiveIncubate.requiredRCL = 7;
DirectiveIncubate = DirectiveIncubate_1 = __decorate([
    profile
], DirectiveIncubate);
var DirectiveIncubate_1;

const ReserverSetup = new CreepSetup('reserver', {
    pattern: [CLAIM, MOVE],
    sizeLimit: 4,
});
let ReservingOverlord = class ReservingOverlord extends Overlord {
    constructor(directive, priority = OverlordPriority.remoteRoom.reserve) {
        super(directive, 'reserve', priority);
        // Change priority to operate per-outpost
        this.priority += this.outpostIndex * OverlordPriority.remoteRoom.roomIncrement;
        this.reservers = this.creeps(ReserverSetup.role);
        this.reserveBuffer = 3000;
    }
    init() {
        if (!this.room || this.room.controller.needsReserving(this.reserveBuffer)) {
            this.wishlist(1, ReserverSetup);
        }
        else {
            this.wishlist(0, ReserverSetup);
        }
    }
    handleReserver(reserver) {
        if (reserver.room == this.room && !reserver.pos.isEdge) {
            // If reserver is in the room and not on exit tile
            if (!this.room.controller.signedByMe) {
                // Takes care of an edge case where planned newbie zone signs prevents signing until room is reserved
                if (!this.room.my && this.room.controller.signedByScreeps) {
                    reserver.task = Tasks.reserve(this.room.controller);
                }
                else {
                    reserver.task = Tasks.signController(this.room.controller);
                }
            }
            else {
                reserver.task = Tasks.reserve(this.room.controller);
            }
        }
        else {
            // reserver.task = Tasks.goTo(this.pos);
            reserver.travelTo(this.pos);
        }
    }
    run() {
        for (let reserver of this.reservers) {
            if (reserver.isIdle) {
                this.handleReserver(reserver);
            }
            reserver.run();
        }
    }
};
ReservingOverlord = __decorate([
    profile
], ReservingOverlord);

const ScoutSetup = new CreepSetup('scout', {
    pattern: [MOVE],
    sizeLimit: 1,
});
let ScoutOverlord = class ScoutOverlord extends Overlord {
    constructor(directive, priority = OverlordPriority.remoteRoom.reserve) {
        super(directive, 'scout', priority);
        // Change priority to operate per-outpost
        this.priority += this.outpostIndex * OverlordPriority.remoteRoom.roomIncrement;
        this.scouts = this.creeps(ScoutSetup.role);
    }
    init() {
        this.wishlist(1, ScoutSetup);
    }
    handleScout(scout) {
        if (!scout.pos.inRangeTo(this.pos, 3)) {
            // scout.task = Tasks.goTo(this.pos, {travelToOptions: {range: 3}});
            scout.travelTo(this.pos, { range: 3 });
        }
    }
    run() {
        for (let scout of this.scouts) {
            if (scout.isIdle) {
                this.handleScout(scout);
            }
            scout.run();
        }
    }
};
ScoutOverlord = __decorate([
    profile
], ScoutOverlord);

let DirectiveOutpost = DirectiveOutpost_1 = class DirectiveOutpost extends Directive {
    constructor(flag) {
        super(flag);
        if (!this.colony)
            return;
        if (this.colony.level >= DirectiveOutpost_1.settings.canSpawnReserversAtRCL) {
            this.overlords.reserve = new ReservingOverlord(this);
        }
        else {
            this.overlords.scout = new ScoutOverlord(this);
        }
        if (!this.room) {
            // Push source / output positions to colony.destinations if room is invisible for correct road routings
            let savedSources = Memory.rooms[this.pos.roomName] ? Memory.rooms[this.pos.roomName].src || [] : [];
            for (let i in savedSources) {
                let src = Memory.rooms[this.pos.roomName].src[i];
                let pos;
                if (src.contnr) {
                    pos = derefCoords(src.contnr, this.pos.roomName);
                }
                else {
                    pos = derefCoords(src.c, this.pos.roomName);
                }
                this.colony.destinations.push(pos);
            }
        }
    }
    init() {
    }
    run() {
    }
};
DirectiveOutpost.directiveName = 'outpost';
DirectiveOutpost.color = COLOR_PURPLE;
DirectiveOutpost.secondaryColor = COLOR_PURPLE;
DirectiveOutpost.settings = {
    canSpawnReserversAtRCL: 3,
};
DirectiveOutpost = DirectiveOutpost_1 = __decorate([
    profile
], DirectiveOutpost);
var DirectiveOutpost_1;

let DirectiveRPHatchery = class DirectiveRPHatchery extends Directive {
    constructor(flag) {
        super(flag);
    }
    init() {
        this.colony.roomPlanner.addComponent('hatchery', this.pos, this.memory.rotation);
    }
    run() {
    }
};
DirectiveRPHatchery.directiveName = 'roomPlanner:Hatchery';
DirectiveRPHatchery.color = COLOR_WHITE;
DirectiveRPHatchery.secondaryColor = COLOR_GREEN;
DirectiveRPHatchery = __decorate([
    profile
], DirectiveRPHatchery);

let DirectiveRPCommandCenter = class DirectiveRPCommandCenter extends Directive {
    constructor(flag) {
        super(flag);
    }
    init() {
        this.colony.roomPlanner.addComponent('commandCenter', this.pos, this.memory.rotation);
    }
    run() {
    }
};
DirectiveRPCommandCenter.directiveName = 'roomPlanner:CommandCenter';
DirectiveRPCommandCenter.color = COLOR_WHITE;
DirectiveRPCommandCenter.secondaryColor = COLOR_BLUE;
DirectiveRPCommandCenter = __decorate([
    profile
], DirectiveRPCommandCenter);

const PioneerSetup = new CreepSetup('pioneer', {
    pattern: [WORK, CARRY, MOVE, MOVE],
    sizeLimit: Infinity,
});
let PioneerOverlord = class PioneerOverlord extends Overlord {
    constructor(directive, priority = OverlordPriority.realTime.pioneer) {
        super(directive, 'pioneer', priority);
        this.pioneers = this.creeps(PioneerSetup.role);
        this.spawnSite = this.room ? _.filter(this.room.constructionSites, s => s.structureType == STRUCTURE_SPAWN)[0] : undefined;
    }
    init() {
        this.wishlist(4, PioneerSetup);
    }
    handlePioneer(pioneer) {
        // Ensure you are in the assigned room
        if (pioneer.room == this.room && !pioneer.pos.isEdge) {
            // Harvest if out of energy
            if (pioneer.carry.energy == 0) {
                let availableSources = _.filter(this.room.sources, s => s.energy > 0 && s.pos.availableNeighbors().length > 0);
                let target = pioneer.pos.findClosestByRange(availableSources);
                if (target)
                    pioneer.task = Tasks.harvest(target);
            }
            else if (this.spawnSite) {
                pioneer.task = Tasks.build(this.spawnSite);
            }
        }
        else {
            // pioneer.task = Tasks.goTo(this.pos);
            pioneer.travelTo(this.pos, { ensurePath: true, preferHighway: true });
        }
    }
    run() {
        for (let pioneer of this.pioneers) {
            if (pioneer.isIdle) {
                this.handlePioneer(pioneer);
            }
            pioneer.run();
        }
    }
};
PioneerOverlord = __decorate([
    profile
], PioneerOverlord);

// Claims a new room and builds a spawn but does not incubate. Removes when spawn is constructed.
let DirectiveColonize = class DirectiveColonize extends Directive {
    constructor(flag) {
        super(flag);
        // Register incubation status
        this.toColonize = this.room ? Overmind.colonies[Overmind.colonyMap[this.room.name]] : undefined;
        this.overlords.claim = new ClaimingOverlord(this);
        this.overlords.pioneer = new PioneerOverlord(this);
    }
    init() {
    }
    run() {
        if (this.toColonize && this.toColonize.spawns.length > 0) {
            // Reassign all pioneers to be miners and workers
            let miningOverlords = _.map(this.toColonize.miningSites, site => site.overlord);
            for (let pioneer of this.overlords.pioneer.pioneers) {
                let miningOverlord = miningOverlords.shift();
                if (miningOverlord) {
                    pioneer.memory.role = MinerSetup.role;
                    pioneer.overlord = miningOverlord;
                }
                else {
                    pioneer.memory.role = WorkerSetup.role;
                    pioneer.overlord = this.toColonize.overlords.work;
                }
            }
            // Remove the directive
            this.remove();
        }
    }
};
DirectiveColonize.directiveName = 'colonize';
DirectiveColonize.color = COLOR_PURPLE;
DirectiveColonize.secondaryColor = COLOR_GREY;
DirectiveColonize.requiredRCL = 3;
DirectiveColonize = __decorate([
    profile
], DirectiveColonize);

// Siege overlord - spawns sieger creeps to break down walls and structures
const SiegerSetup = new CreepSetup('sieger', {
    pattern: [WORK, MOVE],
    sizeLimit: Infinity,
});
const SiegerSetupWithHeals = new CreepSetup('sieger', {
    pattern: [WORK, HEAL, MOVE, MOVE],
    sizeLimit: Infinity,
});
let SiegeOverlord = class SiegeOverlord extends CombatOverlord {
    constructor(directive, priority = OverlordPriority.offense.siege) {
        super(directive, 'siege', priority);
        this.siegers = this.creeps(SiegerSetup.role);
        this.recoveryWaypoint = directive.recoveryWaypoint;
        this.settings = {
            retreatHitsPercent: 0.75,
        };
    }
    findSiegeTarget(sieger) {
        if (this.room) {
            let targetingDirectives = DirectiveTargetSiege.find(this.room.flags);
            let targetedStructures = _.compact(_.map(targetingDirectives, directive => directive.getTarget()));
            if (targetedStructures.length > 0) {
                return sieger.pos.findClosestByRange(targetedStructures);
            }
            else {
                return sieger.pos.findClosestByRange(this.room.hostileStructures);
            }
        }
    }
    siegeActions(sieger, target) {
        // console.log(`sieging to ${target.pos}`);
        let hasDismantled = false;
        // Dismantle the target if you can, else move to get in range
        if (sieger.pos.isNearTo(target)) {
            // Dismantle if you can, otherwise heal yourself
            if (sieger.dismantle(target) == OK) {
                hasDismantled = true;
            }
        }
        else {
            sieger.travelTo(target, { allowHostile: true });
        }
        // Heal yourself if it won't interfere with dismantling
        if (!hasDismantled && sieger.getActiveBodyparts(HEAL) > 0 && sieger.hits < sieger.hitsMax) {
            sieger.heal(sieger);
        }
    }
    /* Retreat to a waypoint and heal to full health before going back into the room */
    retreatActions(sieger, waypoint) {
        // console.log(`retreating to ${waypoint}`);
        if (sieger.getActiveBodyparts(HEAL) > 0)
            sieger.heal(sieger);
        sieger.travelTo(waypoint, this.moveOpts);
    }
    handleSieger(sieger) {
        if (this.recoveryWaypoint &&
            sieger.pos.roomName != this.pos.roomName &&
            sieger.pos.roomName != this.recoveryWaypoint.roomName) {
            // Go to the recovery point first
            sieger.travelTo(this.recoveryWaypoint, this.moveOpts);
        }
        if (sieger.pos.roomName == this.pos.roomName) {
            if (sieger.hits > this.settings.retreatHitsPercent * sieger.hitsMax) {
                // If you're in the hostile room and have sufficient health, go siege
                let siegeTarget = this.findSiegeTarget(sieger);
                if (siegeTarget)
                    this.siegeActions(sieger, siegeTarget);
            }
            else {
                // If you're in hostile room and health is getting low, retreat
                this.retreatActions(sieger, this.recoveryWaypoint);
            }
        }
        else {
            if (sieger.hits == sieger.hitsMax) {
                // If you're at full health and outside the room, go back in
                sieger.travelTo(this.pos, _.merge({ range: 50 }, this.moveOpts));
            }
            else {
                // If you're below full health and outside the room, heal up first
                this.retreatActions(sieger, this.recoveryWaypoint);
            }
        }
    }
    init() {
        this.wishlist(3, SiegerSetup);
    }
    run() {
        for (let sieger of this.siegers) {
            // Run the creep if it has a task given to it by something else; otherwise, proceed with non-task actions
            if (sieger.hasValidTask) {
                sieger.run();
            }
            else {
                this.handleSieger(sieger);
            }
        }
    }
};
SiegeOverlord = __decorate([
    profile
], SiegeOverlord);

// Siege overlord - spawns sieger creeps to break down walls and structures
const PointHealerSetup = new CreepSetup('pointHealer', {
    pattern: [HEAL, MOVE],
    sizeLimit: Infinity,
    ordered: false
});
let HealPointOverlord = class HealPointOverlord extends CombatOverlord {
    constructor(directive, priority = OverlordPriority.offense.healPoint) {
        super(directive, 'healPoint', priority);
        this.healers = this.creeps(PointHealerSetup.role);
        this.moveOpts = {
            allowSK: true,
            ensurePath: true,
        };
    }
    handleHealer(healer) {
        healer.travelTo(this.pos, this.moveOpts);
        let healTarget = this.findClosestHurtFriendly(healer);
        if (healTarget) {
            healer.heal(healTarget, true);
        }
    }
    init() {
        this.wishlist(1, PointHealerSetup);
    }
    run() {
        for (let healer of this.healers) {
            this.handleHealer(healer);
        }
    }
};
HealPointOverlord = __decorate([
    profile
], HealPointOverlord);

let DirectiveHealPoint = class DirectiveHealPoint extends Directive {
    constructor(flag) {
        super(flag);
        this.overlords.healer = new HealPointOverlord(this);
    }
    init() {
    }
    run() {
        // Directive is removed by parent directive; no action needed
    }
    visuals() {
        Visualizer.marker(this.pos, { color: 'green' });
    }
};
DirectiveHealPoint.directiveName = 'healPoint';
DirectiveHealPoint.color = COLOR_RED;
DirectiveHealPoint.secondaryColor = COLOR_GREEN;
DirectiveHealPoint = __decorate([
    profile
], DirectiveHealPoint);

let DirectiveSiege = class DirectiveSiege extends Directive {
    constructor(flag) {
        super(flag);
        this.recoveryFlag = Game.flags[this.name + ':healPoint'];
        this.overlords.siege = new SiegeOverlord(this);
    }
    get recoveryWaypoint() {
        if (this.recoveryFlag) {
            return this.recoveryFlag.pos;
        }
        else {
            if (this.memory.recoveryWaypoint) {
                return derefRoomPosition(this.memory.recoveryWaypoint);
            }
            else {
                return this.pos.neighbors[0];
            }
        }
    }
    calculateWaypoint() {
        // Calculate the recovery waypoint
        let startPos = this.colony.hatchery ? this.colony.hatchery.pos : this.colony.pos;
        let ret = Pathing.findTravelPath(startPos, this.pos, { range: 50 });
        if (!ret.incomplete) {
            let path = ret.path;
            // Place the waypoint flag three squares before the last position in the previous room
            let lastIndexInSafeRoom = _.findLastIndex(_.filter(path, pos => pos.roomName != this.pos.roomName));
            let waypoint = path[Math.max(lastIndexInSafeRoom - 3, 0)];
            return waypoint;
        }
        else {
            log.info(`Incomplete path; couldn't place recovery flag!`);
        }
    }
    placeRecoveryFlag(waypoint) {
        if (waypoint.isVisible) {
            DirectiveHealPoint.create(waypoint, { name: this.name + ':healPoint' });
            log.info(`Placed recovery flag for ${this.pos.print} at ${waypoint.print}`);
        }
    }
    init() {
        // Place a recovery flag as needed
        if (!this.memory.recoveryWaypoint) {
            this.memory.recoveryWaypoint = this.calculateWaypoint();
        }
        if (!this.recoveryFlag) {
            this.placeRecoveryFlag(this.recoveryWaypoint);
        }
    }
    run() {
        // If there are no hostiles left in the room then remove the flag and associated healpoint
        if (this.room && this.room.hostiles.length == 0 && this.room.hostileStructures.length == 0) {
            Game.notify(`Siege at ${this.pos.roomName} completed successfully.`);
            if (this.recoveryFlag) {
                this.recoveryFlag.remove();
            }
            this.remove();
        }
    }
    visuals() {
        Visualizer.marker(this.pos, { color: 'red' });
        if (!this.recoveryFlag) {
            Visualizer.marker(this.recoveryWaypoint, { color: 'green' });
        }
    }
};
DirectiveSiege.directiveName = 'siege';
DirectiveSiege.color = COLOR_RED;
DirectiveSiege.secondaryColor = COLOR_ORANGE;
DirectiveSiege = __decorate([
    profile
], DirectiveSiege);

// Destroyer overlord - spawns attacker/healer pairs for sustained combat
const AttackerSetup$1 = new CreepSetup('attacker', {
    pattern: [TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE],
    sizeLimit: Infinity,
    ordered: false
});
const HealerSetup$1 = new CreepSetup('healer', {
    pattern: [TOUGH, HEAL, HEAL, MOVE, MOVE, MOVE],
    sizeLimit: Infinity,
    ordered: false
});
let DestroyerOverlord = DestroyerOverlord_1 = class DestroyerOverlord extends CombatOverlord {
    constructor(directive, priority = OverlordPriority.offense.destroy) {
        super(directive, 'destroy', priority);
        this.attackers = this.creeps(AttackerSetup$1.role);
        this.healers = this.creeps(HealerSetup$1.role);
        // Comment out boost lines if you don't want to spawn boosted attackers/healers
        // this.boosts.attacker = [
        // 	boostResources.attack[3],
        // 	boostResources.tough[3],
        // ];
        // this.boosts.healer = [
        // 	boostResources.heal[3],
        // 	boostResources.tough[3],
        // ];
    }
    findTarget(attacker) {
        if (this.room) {
            // Prioritize specifically targeted structures first
            let targetingDirectives = DirectiveTargetSiege.find(this.room.flags);
            let targetedStructures = _.compact(_.map(targetingDirectives, directive => directive.getTarget()));
            if (targetedStructures.length > 0) {
                return this.findClosestReachable(attacker.pos, targetedStructures);
            }
            else {
                // Target nearby hostile creeps
                let creepTarget = this.findClosestHostile(attacker, true);
                if (creepTarget)
                    return creepTarget;
                // Target nearby hostile structures
                let structureTarget = this.findClosestPrioritizedStructure(attacker);
                if (structureTarget)
                    return structureTarget;
            }
        }
    }
    retreatActions(attacker, healer) {
        if (attacker.hits > DestroyerOverlord_1.settings.reengageHitsPercent * attacker.hits &&
            healer.hits > DestroyerOverlord_1.settings.reengageHitsPercent * healer.hits) {
            attacker.memory.retreating = false;
        }
        // Healer leads retreat to fallback position
        this.pairwiseMove(healer, attacker, this.fallback);
    }
    attackActions(attacker, healer) {
        let target = this.findTarget(attacker);
        if (target) {
            if (attacker.pos.isNearTo(target)) {
                attacker.attack(target);
            }
            else {
                this.pairwiseMove(attacker, healer, target);
            }
        }
    }
    handleSquad(attacker) {
        let healer = this.findPartner(attacker, this.healers);
        // Case 1: you don't have an active healer
        if (!healer || healer.spawning || healer.needsBoosts) {
            // Wait near the colony controller if you don't have a healer
            if (attacker.pos.getMultiRoomRangeTo(this.colony.controller.pos) > 5) {
                attacker.travelTo(this.colony.controller);
            }
            else {
                attacker.park();
            }
        }
        // Case 2: you have an active healer
        else {
            // Activate retreat condition if necessary
            if (attacker.hits < DestroyerOverlord_1.settings.retreatHitsPercent * attacker.hitsMax ||
                healer.hits < DestroyerOverlord_1.settings.retreatHitsPercent * healer.hitsMax) {
                attacker.memory.retreating = true;
            }
            if (attacker.memory.retreating) {
                // Retreat to fallback position
                this.retreatActions(attacker, healer);
            }
            else {
                // Move to room and then perform attacking actions
                if (!attacker.inSameRoomAs(this)) {
                    this.pairwiseMove(attacker, healer, this.pos);
                }
                else {
                    this.attackActions(attacker, healer);
                }
            }
        }
    }
    handleHealer(healer) {
        // If there are no hostiles in the designated room, run medic actions
        if (this.room && this.room.hostiles.length == 0) {
            this.medicActions(healer);
            return;
        }
        let attacker = this.findPartner(healer, this.attackers);
        // Case 1: you don't have an attacker partner
        if (!attacker || attacker.spawning || attacker.needsBoosts) {
            if (healer.hits < healer.hitsMax) {
                healer.heal(healer);
            }
            // Wait near the colony controller if you don't have an attacker
            if (healer.pos.getMultiRoomRangeTo(this.colony.controller.pos) > 10) {
                healer.travelTo(this.colony.controller);
            }
            else {
                healer.park();
            }
        }
        // Case 2: you have an attacker partner
        else {
            if (attacker.hitsMax - attacker.hits > healer.hitsMax - healer.hits &&
                attacker.hitsMax - attacker.hits > 0) {
                // Attacker needs healing more
                healer.heal(attacker, true);
            }
            else {
                if (healer.hitsMax - healer.hits > 0) {
                    healer.heal(healer);
                }
                else {
                    // Try to heal whatever else is in range
                    let target = this.findClosestHurtFriendly(healer);
                    if (target)
                        healer.heal(target, true);
                }
            }
        }
    }
    init() {
        let amount;
        if (this.directive.memory.amount) {
            amount = this.directive.memory.amount;
        }
        else {
            amount = 1;
        }
        this.wishlist(amount, AttackerSetup$1);
        this.wishlist(amount, HealerSetup$1);
        this.requestBoosts();
    }
    run() {
        for (let attacker of this.attackers) {
            // Run the creep if it has a task given to it by something else; otherwise, proceed with non-task actions
            if (attacker.hasValidTask) {
                attacker.run();
            }
            else {
                if (attacker.needsBoosts) {
                    this.handleBoosting(attacker);
                }
                else {
                    this.handleSquad(attacker);
                }
            }
        }
        for (let healer of this.healers) {
            if (healer.hasValidTask) {
                healer.run();
            }
            else {
                if (healer.needsBoosts) {
                    this.handleBoosting(healer);
                }
                else {
                    this.handleHealer(healer);
                }
            }
        }
    }
};
DestroyerOverlord.settings = {
    retreatHitsPercent: 0.75,
    reengageHitsPercent: 0.95,
};
DestroyerOverlord = DestroyerOverlord_1 = __decorate([
    profile
], DestroyerOverlord);
var DestroyerOverlord_1;

let DirectiveDestroy = class DirectiveDestroy extends Directive {
    constructor(flag) {
        super(flag);
        this.overlords.destroy = new DestroyerOverlord(this);
    }
    init() {
    }
    run() {
        // If there are no hostiles left in the room then remove the flag and associated healpoint
        if (this.room && this.room.hostiles.length == 0 && this.room.hostileStructures.length == 0) {
            Game.notify(`Destroyer mission at ${this.pos.roomName} completed successfully.`);
            this.remove();
        }
    }
    visuals() {
        Visualizer.marker(this.pos, { color: 'red' });
        Visualizer.marker(this.overlords.destroy.fallback, { color: 'green' });
    }
};
DirectiveDestroy.directiveName = 'destroy';
DirectiveDestroy.color = COLOR_RED;
DirectiveDestroy.secondaryColor = COLOR_CYAN;
DirectiveDestroy = __decorate([
    profile
], DirectiveDestroy);

let DirectiveDismantle = class DirectiveDismantle extends Directive {
    constructor(flag) {
        super(flag);
    }
    getTarget() {
        if (!this.pos.isVisible) {
            return;
        }
        let targetedStructures = this.pos.lookFor(LOOK_STRUCTURES);
        for (let structure of targetedStructures) {
            for (let structureType of AttackStructurePriorities) {
                if (structure.structureType == structureType) {
                    return structure;
                }
            }
        }
    }
    init() {
        // Add this structure to worker overlord's dismantle list
        let target = this.getTarget();
        if (target) {
            this.colony.overlords.work.dismantleStructures.push(target);
        }
    }
    run() {
        // Remove the directive once structures have been destroyed
        if (this.pos.isVisible && !this.getTarget()) {
            this.remove();
        }
    }
    visuals() {
        Visualizer.marker(this.pos, { color: 'yellow' });
    }
};
DirectiveDismantle.directiveName = 'dismantle';
DirectiveDismantle.color = COLOR_GREY;
DirectiveDismantle.secondaryColor = COLOR_YELLOW;
DirectiveDismantle = __decorate([
    profile
], DirectiveDismantle);

// Jump table to instantiate flags based on type

// Preprocessing code to be run before animation of anything
let GameCache = class GameCache {
    constructor() {
        this.overlords = {};
        this.targets = {};
        this.structures = {};
        this.constructionSites = {};
        this.drops = {};
    }
    /* Generates a hash table for creeps assigned to each object: key: OLref, val: (key: role, val: names[]) */
    cacheOverlords() {
        this.overlords = {};
        // keys: overlordRef, value: creepNames[]
        let creepNamesByOverlord = _.groupBy(_.keys(Game.creeps), name => Game.creeps[name].memory.overlord);
        for (let ref in creepNamesByOverlord) {
            // keys: roleName, value: creepNames[]
            this.overlords[ref] = _.groupBy(creepNamesByOverlord[ref], name => Game.creeps[name].memory.role);
        }
    }
    /* Generates a hash table for targets: key: TargetRef, val: targeting creep names*/
    cacheTargets() {
        this.targets = {};
        for (let i in Game.creeps) {
            let creep = Game.creeps[i];
            let task = creep.memory.task;
            while (task) {
                if (!this.targets[task._target.ref])
                    this.targets[task._target.ref] = [];
                this.targets[task._target.ref].push(creep.name);
                task = task._parent;
            }
        }
    }
    /* Generates a nested hash table for structure lookup: {[roomName], {[structureType]: Structures[]} */
    cacheStructures() {
        this.structures = {};
        for (let name in Game.rooms) {
            this.structures[name] = _.groupBy(Game.rooms[name].find(FIND_STRUCTURES), s => s.structureType);
        }
    }
    /* Generates a nested hash table for structure lookup: {[roomName], {[structureType]: Structures[]} */
    cacheConstructionSites() {
        this.constructionSites = {};
        for (let name in Game.rooms) {
            this.constructionSites[name] = Game.rooms[name].find(FIND_MY_CONSTRUCTION_SITES);
        }
    }
    /* Generates a nested hash table for drop lookup: {[roomName], {[resourceType]: drops[]} */
    cacheDrops() {
        this.drops = {};
        for (let name in Game.rooms) {
            this.drops[name] = _.groupBy(Game.rooms[name].find(FIND_DROPPED_RESOURCES), r => r.resourceType);
        }
    }
    build() {
        this.cacheOverlords();
        this.cacheTargets();
        this.cacheStructures();
        this.cacheConstructionSites();
        this.cacheDrops();
    }
    rebuild() {
        // Recache the cheap or critical stuff: Overlords, constructionSites, drops
        this.cacheOverlords();
    }
};
GameCache = __decorate([
    profile
], GameCache);

let Zerg = Zerg_1 = class Zerg {
    constructor(creep) {
        this.creep = creep;
        this.body = creep.body;
        this.carry = creep.carry;
        this.carryCapacity = creep.carryCapacity;
        this.fatigue = creep.fatigue;
        this.hits = creep.hits;
        this.hitsMax = creep.hitsMax;
        this.id = creep.id;
        this.memory = creep.memory;
        // this.my = creep.my;
        this.name = creep.name;
        // this.owner = creep.owner;
        this.pos = creep.pos;
        this.ref = creep.ref;
        this.roleName = creep.memory.role;
        this.room = creep.room;
        this.saying = creep.saying;
        this.spawning = creep.spawning;
        this.ticksToLive = creep.ticksToLive;
        this.lifetime = this.getBodyparts(CLAIM) > 0 ? CREEP_CLAIM_LIFE_TIME : CREEP_LIFE_TIME;
        this.actionLog = {};
        // this.settings = {};
    }
    // Wrapped creep methods ===========================================================================================
    attack(target) {
        let result = this.creep.attack(target);
        if (!this.actionLog.attack)
            this.actionLog.attack = (result == OK);
        return result;
    }
    attackController(controller) {
        let result = this.creep.attackController(controller);
        if (!this.actionLog.attackController)
            this.actionLog.attackController = (result == OK);
        return result;
    }
    build(target) {
        let result = this.creep.build(target);
        if (!this.actionLog.build)
            this.actionLog.build = (result == OK);
        return result;
    }
    cancelOrder(methodName) {
        console.log('NOT IMPLEMENTED');
        return ERR_NOT_FOUND;
    }
    claimController(controller) {
        let result = this.creep.claimController(controller);
        if (!this.actionLog.claimController)
            this.actionLog.claimController = (result == OK);
        return result;
    }
    dismantle(target) {
        let result = this.creep.dismantle(target);
        if (!this.actionLog.dismantle)
            this.actionLog.dismantle = (result == OK);
        return result;
    }
    drop(resourceType, amount) {
        let result = this.creep.drop(resourceType, amount);
        if (!this.actionLog.drop)
            this.actionLog.drop = (result == OK);
        return result;
    }
    generateSafeMode(target) {
        return this.creep.generateSafeMode(target);
    }
    harvest(source) {
        let result = this.creep.harvest(source);
        if (!this.actionLog.harvest)
            this.actionLog.harvest = (result == OK);
        return result;
    }
    move(direction) {
        let result = this.creep.move(direction);
        if (!this.actionLog.move)
            this.actionLog.move = (result == OK);
        return result;
    }
    moveByPath(path) {
        let result = this.creep.moveByPath(path);
        if (!this.actionLog.move)
            this.actionLog.move = (result == OK);
        return result;
    }
    moveTo(target, opts) {
        let result = this.creep.moveTo(target, opts);
        if (!this.actionLog.move)
            this.actionLog.move = (result == OK);
        return result;
    }
    notifyWhenAttacked(enabled) {
        return this.creep.notifyWhenAttacked(enabled);
    }
    pickup(resource) {
        let result = this.creep.pickup(resource);
        if (!this.actionLog.pickup)
            this.actionLog.pickup = (result == OK);
        return result;
    }
    rangedAttack(target) {
        let result = this.creep.rangedAttack(target);
        if (!this.actionLog.rangedAttack)
            this.actionLog.rangedAttack = (result == OK);
        return result;
    }
    rangedMassAttack() {
        let result = this.creep.rangedMassAttack();
        if (!this.actionLog.rangedMassAttack)
            this.actionLog.rangedMassAttack = (result == OK);
        return result;
    }
    repair(target) {
        let result = this.creep.repair(target);
        if (!this.actionLog.repair)
            this.actionLog.repair = (result == OK);
        return result;
    }
    reserveController(controller) {
        let result = this.creep.reserveController(controller);
        if (!this.actionLog.reserveController)
            this.actionLog.reserveController = (result == OK);
        return result;
    }
    /* Say a message; maximum message length is 10 characters */
    say(message, pub) {
        return this.creep.say(message, pub);
    }
    signController(target, text) {
        let result = this.creep.signController(target, text);
        if (!this.actionLog.signController)
            this.actionLog.signController = (result == OK);
        return result;
    }
    suicide() {
        return this.creep.suicide();
    }
    upgradeController(controller) {
        let result = this.creep.upgradeController(controller);
        if (!this.actionLog.upgradeController)
            this.actionLog.upgradeController = (result == OK);
        // Determine amount of upgrade power
        // let weightedUpgraderParts = _.map(this.boostCounts, )
        // let upgradeAmount = this.getActiveBodyparts(WORK) * UPGRADE_CONTROLLER_POWER;
        // let upgrade
        // Stats.accumulate(`colonies.${this.colony.name}.rcl.progressTotal`, upgradeAmount);
        return result;
    }
    heal(target, rangedHealInstead = true) {
        let result;
        if (rangedHealInstead && !this.pos.isNearTo(target)) {
            return this.rangedHeal(target);
        }
        if (target instanceof Zerg_1) {
            result = this.creep.heal(target.creep);
        }
        else {
            result = this.creep.heal(target);
        }
        if (!this.actionLog.heal)
            this.actionLog.heal = (result == OK);
        return result;
    }
    rangedHeal(target) {
        let result;
        if (target instanceof Zerg_1) {
            result = this.creep.rangedHeal(target.creep);
        }
        else {
            result = this.creep.rangedHeal(target);
        }
        if (!this.actionLog.rangedHeal)
            this.actionLog.rangedHeal = (result == OK);
        return result;
    }
    transfer(target, resourceType, amount) {
        let result;
        if (target instanceof Zerg_1) {
            result = this.creep.transfer(target.creep, resourceType, amount);
        }
        else {
            result = this.creep.transfer(target, resourceType, amount);
        }
        if (!this.actionLog.transfer)
            this.actionLog.transfer = (result == OK);
        return result;
    }
    withdraw(target, resourceType, amount) {
        let result = this.creep.withdraw(target, resourceType, amount);
        if (!this.actionLog.withdraw)
            this.actionLog.withdraw = (result == OK);
        return result;
    }
    // Simultaneous creep actions ==------------------------------------------------------------------------------------
    /* Determine whether the given action will conflict with an action the creep has already taken.
     * See http://docs.screeps.com/simultaneous-actions.html for more details. */
    canExecute(actionName) {
        // Only one action can be executed from within a single pipeline
        // Last pipeline is more complex because it depends on the energy a creep has; sidelining this for now
        let pipelines = [
            ['harvest', 'attack', 'build', 'repair', 'dismantle', 'attackController', 'rangedHeal', 'heal'],
            ['rangedAttack', 'rangedMassAttack', 'build', 'repair', 'rangedHeal'],
        ];
        let conflictingActions = [actionName];
        for (let pipeline of pipelines) {
            if (pipeline.includes(actionName))
                conflictingActions = conflictingActions.concat(pipeline);
        }
        for (let action of conflictingActions) {
            if (this.actionLog[action]) {
                return false;
            }
        }
        return true;
    }
    // Body configuration and related data -----------------------------------------------------------------------------
    getActiveBodyparts(type) {
        return this.creep.getActiveBodyparts(type);
    }
    /* The same as creep.getActiveBodyparts, but just counts bodyparts regardless of condition. */
    getBodyparts(partType) {
        return _.filter(this.body, (part) => part.type == partType).length;
    }
    // Custom creep methods ============================================================================================
    // Carry methods
    get hasMineralsInCarry() {
        for (let resourceType in this.carry) {
            if (resourceType != RESOURCE_ENERGY && (this.carry[resourceType] || 0) > 0) {
                return true;
            }
        }
        return false;
    }
    // Boosting logic --------------------------------------------------------------------------------------------------
    get boosts() {
        return this.creep.boosts;
    }
    get boostCounts() {
        return this.creep.boostCounts;
    }
    get needsBoosts() {
        if (this.overlord) {
            return this.overlord.shouldBoost(this);
        }
        return false;
    }
    // Overlord logic --------------------------------------------------------------------------------------------------
    get overlord() {
        if (this.memory.overlord && Overmind.overlords[this.memory.overlord]) {
            return Overmind.overlords[this.memory.overlord];
        }
        else {
            return null;
        }
    }
    set overlord(newOverlord) {
        // Remove cache references to old assignments
        let ref = this.memory.overlord;
        let oldOverlord = ref ? Overmind.overlords[ref] : null;
        if (ref && Overmind.cache.overlords[ref] && Overmind.cache.overlords[ref][this.roleName]) {
            _.remove(Overmind.cache.overlords[ref][this.roleName], name => name == this.name);
        }
        if (newOverlord) {
            // Change to the new overlord's colony
            this.colony = newOverlord.colony;
            // Change assignments in memory
            this.memory.overlord = newOverlord.ref;
            // Update the cache references
            if (!Overmind.cache.overlords[newOverlord.ref]) {
                Overmind.cache.overlords[newOverlord.ref] = {};
            }
            if (!Overmind.cache.overlords[newOverlord.ref][this.roleName]) {
                Overmind.cache.overlords[newOverlord.ref][this.roleName] = [];
            }
            Overmind.cache.overlords[newOverlord.ref][this.roleName].push(this.name);
        }
        else {
            this.memory.overlord = null;
        }
        if (oldOverlord)
            oldOverlord.recalculateCreeps();
        if (newOverlord)
            newOverlord.recalculateCreeps();
    }
    // Task logic ------------------------------------------------------------------------------------------------------
    /* Wrapper for _task */
    get task() {
        // if (!this._task) {
        // 	let protoTask = this.memory.task;
        // 	this._task = protoTask ? initializeTask(protoTask) : null;
        // }
        // return this._task;
        return this.creep.task;
    }
    /* Assign the creep a task with the setter, replacing creep.assign(Task) */
    set task(task) {
        // // Unregister target from old task if applicable
        // let oldProtoTask = this.memory.task as protoTask;
        // if (oldProtoTask) {
        // 	let oldRef = oldProtoTask._target.ref;
        // 	if (Overmind.cache.targets[oldRef]) {
        // 		Overmind.cache.targets[oldRef] = _.remove(Overmind.cache.targets[oldRef], name => name == this.name);
        // 	}
        // }
        // // Set the new task
        // this.memory.task = task ? task.proto : null;
        // if (task) {
        // 	if (task.target) {
        // 		// Register task target in cache if it is actively targeting something (excludes goTo and similar)
        // 		if (!Overmind.cache.targets[task.target.ref]) {
        // 			Overmind.cache.targets[task.target.ref] = [];
        // 		}
        // 		Overmind.cache.targets[task.target.ref].push(this.name);
        // 	}
        // 	// Register references to creep
        // 	task.creep = this;
        // 	this._task = task;
        // }
        this.creep.task = task;
    }
    /* Does the creep have a valid task at the moment? */
    get hasValidTask() {
        return this.creep.hasValidTask;
    }
    /* Creeps are idle if they don't have a task. */
    get isIdle() {
        return this.creep.isIdle;
    }
    /* Execute the task you currently have. */
    run() {
        return this.creep.run();
    }
    // Colony association ----------------------------------------------------------------------------------------------
    /* Colony that the creep belongs to. */
    get colony() {
        return Overmind.colonies[this.memory.colony];
    }
    set colony(newColony) {
        this.memory.colony = newColony.name;
    }
    // /* The average movespeed of the creep on blank terrain */
    // get moveSpeed(): number {
    // 	if (!this.memory.data.moveSpeed) {
    // 		let massiveParts = [WORK, ATTACK, RANGED_ATTACK, HEAL, TOUGH];
    // 		let mass = 0;
    // 		for (let part of massiveParts) {
    // 			mass += this.getActiveBodyparts(part);
    // 		}
    // 		let moveParts = this.getActiveBodyparts(MOVE);
    // 		let fatiguePerTick = 2 * mass;
    // 		if (fatiguePerTick == 0) {
    // 			this.memory.data.moveSpeed = 1;
    // 		} else {
    // 			this.memory.data.moveSpeed = Math.min(2 * moveParts / fatiguePerTick, 1);
    // 		}
    // 	}
    // 	return this.memory.data.moveSpeed;
    // }
    // Movement and location -------------------------------------------------------------------------------------------
    travelTo(destination, options = {}) {
        // Add default obstacle avoidance
        let result = this.creep.travelTo(destination, _.merge(options, { obstacles: this.getObstacles() }));
        if (!this.actionLog.move)
            this.actionLog.move = (result == OK);
        return result;
    }
    ;
    inSameRoomAs(target) {
        return (this.pos.roomName == target.pos.roomName);
    }
    getObstacles() {
        if (this.roleName == ManagerSetup.role || this.roleName == QueenSetup.role) {
            return [];
        }
        else {
            return this.colony.obstacles;
        }
    }
    park(pos = this.pos, maintainDistance = false) {
        let road = this.pos.lookForStructure(STRUCTURE_ROAD);
        if (!road)
            return OK;
        let positions = _.sortBy(this.pos.availableNeighbors(), (p) => p.getRangeTo(pos));
        if (maintainDistance) {
            let currentRange = this.pos.getRangeTo(pos);
            positions = _.filter(positions, (p) => p.getRangeTo(pos) <= currentRange);
        }
        let swampPosition;
        for (let position of positions) {
            if (position.lookForStructure(STRUCTURE_ROAD))
                continue;
            let terrain = position.lookFor(LOOK_TERRAIN)[0];
            if (terrain === 'swamp') {
                swampPosition = position;
            }
            else {
                return this.move(this.pos.getDirectionTo(position));
            }
        }
        if (swampPosition) {
            return this.move(this.pos.getDirectionTo(swampPosition));
        }
        return this.travelTo(pos);
    }
    /* Moves a creep off of the current tile to the first available neighbor */
    moveOffCurrentPos() {
        let destinationPos = _.first(_.filter(this.pos.availableNeighbors(), pos => !pos.isEdge));
        if (destinationPos) {
            return this.move(this.pos.getDirectionTo(destinationPos));
        }
    }
    /* Moves onto an exit tile */
    moveOnExit() {
        if (this.pos.rangeToEdge > 0 && this.fatigue == 0) {
            let directions = [1, 3, 5, 7, 2, 4, 6, 8];
            for (let direction of directions) {
                let position = this.pos.getPositionAtDirection(direction);
                let terrain = position.lookFor(LOOK_TERRAIN)[0];
                if (terrain != 'wall' && position.rangeToEdge == 0) {
                    let outcome = this.move(direction);
                    return outcome;
                }
            }
            console.log(`moveOnExit() assumes nearby exit tile, position: ${this.pos}`);
            return ERR_NO_PATH;
        }
    }
    /* Moves off of an exit tile */
    moveOffExit(avoidSwamp = true) {
        let swampDirection;
        let directions = [1, 3, 5, 7, 2, 4, 6, 8];
        for (let direction of directions) {
            let position = this.pos.getPositionAtDirection(direction);
            if (position.rangeToEdge > 0 && position.isPassible()) {
                let terrain = position.lookFor(LOOK_TERRAIN)[0];
                if (avoidSwamp && terrain == 'swamp') {
                    swampDirection = direction;
                    continue;
                }
                return this.move(direction);
            }
        }
        if (swampDirection) {
            return this.move(swampDirection);
        }
        return ERR_NO_PATH;
    }
    moveOffExitToward(pos, detour = true) {
        for (let position of this.pos.availableNeighbors()) {
            if (position.getRangeTo(pos) == 1) {
                return this.travelTo(position);
            }
        }
        if (detour) {
            this.travelTo(pos, { ignoreCreeps: false });
        }
    }
    // Miscellaneous fun stuff -----------------------------------------------------------------------------------------
    sayLoop(messageList, pub) {
        return this.say(messageList[Game.time % messageList.length], pub);
    }
    sayRandom(phrases, pub) {
        return this.say(phrases[Math.floor(Math.random() * phrases.length)], pub);
    }
};
Zerg = Zerg_1 = __decorate([
    profile
], Zerg);
var Zerg_1;

const TerminalNetworkMemoryDefaults = {
    equalizeIndex: 0
};
function colonyOf(terminal) {
    return Overmind.colonies[terminal.room.name];
}
let TerminalNetwork = TerminalNetwork_1 = class TerminalNetwork {
    constructor(terminals) {
        this.terminals = terminals;
        this.memory = Mem.wrap(Memory.Overmind, 'terminalNetwork', TerminalNetworkMemoryDefaults);
        this.alreadyReceived = [];
        this.alreadySent = [];
        this.abandonedTerminals = []; // populated in init()
        this.assets = {}; // populated in init()
        this.settings = {
            equalize: {
                frequency: 100,
                maxSendSize: 25000,
                tolerance: {
                    energy: 50000,
                    power: 5000,
                    default: 1000
                }
            }
        };
        this.averageFullness = _.sum(_.map(this.terminals, t => _.sum(t.store) / t.storeCapacity)) / this.terminals.length;
    }
    /* Summarizes the total of all resources currently in a colony store structure */
    getAllAssets() {
        return mergeSum(_.map(this.terminals, terminal => colonyOf(terminal).assets));
    }
    static get stats() {
        return Mem.wrap(Memory.stats.persistent, 'terminalNetwork');
    }
    static logTransfer(resourceType, amount, origin, destination) {
        if (!this.stats.transfers)
            this.stats.transfers = {};
        if (!this.stats.transfers[resourceType])
            this.stats.transfers[resourceType] = {};
        if (!this.stats.transfers[resourceType][origin])
            this.stats.transfers[resourceType][origin] = {};
        if (!this.stats.transfers[resourceType][origin][destination]) {
            this.stats.transfers[resourceType][origin][destination] = 0;
        }
        this.stats.transfers[resourceType][origin][destination] += amount;
        this.logTransferCosts(amount, origin, destination);
    }
    static logTransferCosts(amount, origin, destination) {
        if (!this.stats.transfers.costs)
            this.stats.transfers.costs = {};
        if (!this.stats.transfers.costs[origin])
            this.stats.transfers.costs[origin] = {};
        if (!this.stats.transfers.costs[origin][destination])
            this.stats.transfers.costs[origin][destination] = 0;
        let transactionCost = Game.market.calcTransactionCost(amount, origin, destination);
        this.stats.transfers.costs[origin][destination] += transactionCost;
    }
    /* Whether the terminal is actively requesting energy */
    terminalNeedsEnergy(terminal) {
        return terminal.energy < Energetics.settings.terminal.energy.inThreshold;
    }
    /* Amount of space available in storage and terminal */
    remainingRoomCapacity(room) {
        let remainingCapacity = 0;
        if (room.storage) {
            remainingCapacity += room.storage.storeCapacity - _.sum(room.storage.store);
        }
        if (room.terminal) {
            remainingCapacity += room.terminal.storeCapacity - _.sum(room.terminal.store);
        }
        return remainingCapacity;
    }
    /* Amount of energy in storage and terminal */
    energyInRoom(room) {
        let energyInRoom = 0;
        if (room.storage) {
            energyInRoom += room.storage.energy;
        }
        if (room.terminal) {
            energyInRoom += room.terminal.energy;
        }
        return energyInRoom;
    }
    transfer(sender, receiver, resourceType, amount) {
        let cost = Game.market.calcTransactionCost(amount, sender.room.name, receiver.room.name);
        let response = sender.send(resourceType, amount, receiver.room.name);
        if (response == OK) {
            log.info(`Sent ${amount} ${resourceType} from ${sender.room.print} to ` +
                `${receiver.room.print}. Fee: ${cost}.`);
            TerminalNetwork_1.logTransfer(resourceType, amount, sender.room.name, receiver.room.name);
            this.alreadySent.push(sender);
            this.alreadyReceived.push(receiver);
        }
        else {
            log.error(`Could not send ${amount} ${resourceType} from ${sender.room.print} to ` +
                `${receiver.room.print}! Response: ${response}`);
        }
        return response;
    }
    requestResource(receiver, resourceType, amount, allowBuy = true, minDifference = 4000) {
        if (this.abandonedTerminals.includes(receiver)) {
            return; // don't send to abandoning terminals
        }
        amount = Math.max(amount, TERMINAL_MIN_SEND);
        let possibleSenders = _.filter(this.terminals, terminal => (terminal.store[resourceType] || 0) > amount + minDifference &&
            terminal.cooldown == 0 && !this.alreadySent.includes(terminal));
        let sender = maxBy(possibleSenders, t => (t.store[resourceType] || 0));
        if (sender) {
            this.transfer(sender, receiver, resourceType, amount);
        }
        else if (allowBuy) {
            Overmind.tradeNetwork.buyMineral(receiver, resourceType, amount);
        }
    }
    /* Sell excess minerals on the market */
    sellExcess(terminal, threshold = 25000) {
        let terminalNearCapacity = _.sum(terminal.store) > 0.9 * terminal.storeCapacity;
        let energyOrders = _.filter(Game.market.orders, order => order.type == ORDER_SELL &&
            order.resourceType == RESOURCE_ENERGY);
        let energyThreshold = Energetics.settings.terminal.energy.outThreshold
            + Energetics.settings.terminal.energy.sendSize;
        for (let resource in terminal.store) {
            if (resource == RESOURCE_POWER) {
                continue;
            }
            if (resource == RESOURCE_ENERGY) {
                if (terminal.store[RESOURCE_ENERGY] > energyThreshold) {
                    if (terminalNearCapacity) { // just get rid of stuff at high capacities
                        Overmind.tradeNetwork.sellDirectly(terminal, RESOURCE_ENERGY, 10000);
                    }
                    else if (energyOrders.length < 3) {
                        Overmind.tradeNetwork.sell(terminal, RESOURCE_ENERGY, 50000);
                    }
                }
            }
            else {
                if (terminal.store[resource] > threshold) {
                    if (terminalNearCapacity || terminal.store[resource] > 2 * threshold) {
                        Overmind.tradeNetwork.sellDirectly(terminal, resource, 1000);
                    }
                    else {
                        Overmind.tradeNetwork.sell(terminal, resource, 10000);
                    }
                }
            }
        }
    }
    // private sendExcessEnergy(terminal: StructureTerminal): void {
    // 	let {sendSize, inThreshold, outThreshold, equilibrium} = Energetics.settings.terminal.energy;
    // 	// See if there are any rooms actively needing energy first
    // 	let needyTerminals = _.filter(this.terminals, t =>
    // 		t != terminal && this.terminalNeedsEnergy(t) && !this.alreadyReceived.includes(t));
    // 	if (needyTerminals.length > 0) {
    // 		// Send to the most cost-efficient needy terminal
    // 		let bestTerminal = minBy(needyTerminals, (receiver: StructureTerminal) =>
    // 			Game.market.calcTransactionCost(sendSize, terminal.room.name, receiver.room.name));
    // 		if (bestTerminal) this.transferEnergy(terminal, bestTerminal);
    // 	} else {
    // 		// Send to the terminal with least energy that is not already trying to get rid of stuff
    // 		let okTerminals = _.filter(this.terminals, t =>
    // 			t != terminal && t.store.energy < outThreshold - sendSize && !this.alreadyReceived.includes(t));
    // 		let bestTerminal = minBy(okTerminals, (receiver: StructureTerminal) => this.energyInRoom(receiver.room));
    // 		if (bestTerminal) this.transferEnergy(terminal, bestTerminal);
    // 	}
    // }
    equalize(resourceType, terminals = this.terminals) {
        let averageAmount = _.sum(_.map(terminals, terminal => (colonyOf(terminal).assets[resourceType] || 0))) / terminals.length;
        let terminalsByResource = _.sortBy(terminals, terminal => (colonyOf(terminal).assets[resourceType] || 0));
        // Min-max match terminals
        let receivers = _.take(terminalsByResource, Math.floor(terminalsByResource.length / 2));
        terminalsByResource.reverse();
        let senders = _.take(terminalsByResource, Math.floor(terminalsByResource.length / 2));
        for (let [sender, receiver] of _.zip(senders, receivers)) {
            let senderAmount = colonyOf(sender).assets[resourceType] || 0;
            let receiverAmount = colonyOf(receiver).assets[resourceType] || 0;
            let tolerance = this.settings.equalize.tolerance[resourceType] || this.settings.equalize.tolerance.default;
            if (senderAmount - receiverAmount < tolerance) {
                continue; // skip if colonies are close to equilibrium
            }
            let senderSurplus = senderAmount - averageAmount;
            let receiverDeficit = averageAmount - receiverAmount;
            let sendAmount = Math.min(senderSurplus, receiverDeficit, this.settings.equalize.maxSendSize);
            sendAmount = Math.floor(Math.max(sendAmount, 0));
            let sendCost = Game.market.calcTransactionCost(sendAmount, sender.room.name, receiver.room.name);
            sendAmount = Math.min(sendAmount, (sender.store[resourceType] || 0) - sendCost - 10, (receiver.storeCapacity - _.sum(receiver.store)));
            if (sendAmount < TERMINAL_MIN_SEND) {
                continue;
            }
            this.transfer(sender, receiver, resourceType, sendAmount);
        }
    }
    equalizeCycle() {
        // Equalize current resource type
        this.equalize(RESOURCES_ALL[this.memory.equalizeIndex]);
        // Determine next resource type to equalize; most recent resourceType gets cycled to end
        let resourceEqualizeOrder = RESOURCES_ALL.slice(this.memory.equalizeIndex + 1)
            .concat(RESOURCES_ALL.slice(0, this.memory.equalizeIndex + 1));
        let nextResourceType = _.find(resourceEqualizeOrder, resourceType => this.assets[resourceType] > this.settings.equalize.tolerance.default);
        // Set next equalize resource index
        this.memory.equalizeIndex = _.findIndex(RESOURCES_ALL, resource => resource == nextResourceType);
    }
    evacuateResources(sender) {
        let receiver = _.first(_.sortBy(this.terminals, t => _.sum(t.store)));
        for (let resource of RESOURCE_IMPORTANCE) {
            let amount = (sender.store[resource] || 0);
            if (resource == RESOURCE_ENERGY) {
                if (this.averageFullness > 0.9) {
                    return; // ignore sending energy if other terminals are already pretty full
                }
                amount -= Game.market.calcTransactionCost(amount, sender.room.name, receiver.room.name) + 100;
            }
            if (amount > TERMINAL_MIN_SEND) {
                // Send to the emptiest terminal in the network
                if (receiver && receiver.storeCapacity - _.sum(receiver.store) > amount) {
                    this.transfer(sender, receiver, resource, amount);
                    return;
                }
            }
        }
    }
    handleAbandonedTerminals() {
        // Register (non-abandoned) terminal fullness
        let terminalsByEmptiness = _.sortBy(this.terminals, t => _.sum(t.store));
        // Send all resources to non-abandoned terminals
        for (let terminal of _.filter(this.abandonedTerminals, t => t.cooldown == 0)) {
            this.evacuateResources(terminal);
        }
    }
    init() {
        // Remove any terminals from terminal network which are in abandoning colonies
        this.abandonedTerminals = _.remove(this.terminals, terminal => colonyOf(terminal).abandoning == true);
        this.assets = this.getAllAssets();
    }
    run() {
        if (Game.time % this.settings.equalize.frequency == 0) {
            this.equalize(RESOURCE_ENERGY);
        }
        else if (Game.time % this.settings.equalize.frequency == 20) {
            let powerTerminals = _.filter(this.terminals, t => colonyOf(t).powerSpawn != undefined);
            this.equalize(RESOURCE_POWER, powerTerminals);
        }
        this.handleAbandonedTerminals();
        // Sell excess resources as needed
        let terminalToSellExcess = this.terminals[Game.time % this.terminals.length];
        if (terminalToSellExcess && terminalToSellExcess.cooldown == 0) {
            this.sellExcess(terminalToSellExcess);
        }
    }
};
TerminalNetwork = TerminalNetwork_1 = __decorate([
    profile
], TerminalNetwork);
var TerminalNetwork_1;

// Contracts - contains code for making agreements with other players
// TODO: make a (better) extensible contracts module
class Contract {
    constructor() {
    }
}

// Contract 1: Recurring energy payment to Tigga for occupation rights in E0XS3X sector
// Muon agreement: send 30k energy every 1k ticks from a room to W2S36
// Tigga agreement: cessation of all hostilities to any of Muon's occupied rooms; allow occupation in rooms between
// E1S37 to E9S39
// Duration: until tick 6461275, renewable for 1M ticks at a time
class Contract_TiggaTerritoryAgreement extends Contract {
    constructor() {
        super();
        this.payment = 30000;
        this.period = 1000;
        this.description = 'Payment from Muon: truce / occupation rights';
    }
    isValid() {
        return Game.shard.name == 'shard2' && Game.time < 6461275;
    }
    run() {
        let destination = 'W2S36';
        let terminalNetwork = Overmind.terminalNetwork;
        if (this.isValid() && Game.time % this.period == 3) {
            let sender;
            let E2S43 = Overmind.colonies.E2S43;
            if (E2S43 && E2S43.terminal && E2S43.terminal.cooldown == 0) {
                sender = E2S43.terminal;
            }
            else {
                // Send from the cheapest other terminal
                let senderTerminals = _.filter(terminalNetwork.terminals, t => t.store.energy > 100000 &&
                    t.cooldown == 0);
                sender = lodash_minby(senderTerminals, (sender) => Game.market.calcTransactionCost(this.payment, sender.room.name, destination));
            }
            if (sender) {
                let cost = Game.market.calcTransactionCost(this.payment, sender.room.name, destination);
                sender.send(RESOURCE_ENERGY, this.payment, destination, this.description);
                TerminalNetwork.logTransfer(RESOURCE_ENERGY, this.payment, sender.room.name, destination);
                log.info(`Sent ${this.payment} energy from ${sender.room.name} to ` +
                    `${destination}. Fee: ${cost}`);
                Game.notify(`Sent ${this.payment} energy from ${sender.room.name} to ` +
                    `${destination}. Fee: ${cost}`);
            }
            else {
                log.warning('No terminal to send payment for Contract_TiggaTerritoryAgreement!');
                Game.notify('No terminal to send payment for Contract_TiggaTerritoryAgreement!');
            }
        }
    }
}

// List of all contracts to run each tick. Note that contracts do not run unless MY_USERNAME == "Muon".
// Change this in Overmind.ts to run contracts if you are not me.
var AllContracts = [
    new Contract_TiggaTerritoryAgreement(),
];

// Room intel - provides information related to room structure and occupation
// interface SavedRoomObject {
// 	c: string; 	// coordinate name
// 	// id: string;	// id of object
// }
// interface RoomIntelMemory {
// 	[roomName: string]: {
// 		sources?: SavedRoomObject[];
// 		controller?: SavedRoomObject | undefined;
// 		mineral: SavedRoomObject | undefined;
// 		sourceKeepers?: SavedRoomObject;
// 	}
// }

// Colony class - organizes all assets of an owned room into a colony
var ColonyStage$1;
(function (ColonyStage) {
    ColonyStage[ColonyStage["Larva"] = 0] = "Larva";
    ColonyStage[ColonyStage["Pupa"] = 1] = "Pupa";
    ColonyStage[ColonyStage["Adult"] = 2] = "Adult";
})(ColonyStage$1 || (ColonyStage$1 = {}));
var DEFCON$1;
(function (DEFCON) {
    DEFCON[DEFCON["safe"] = 0] = "safe";
    DEFCON[DEFCON["invasionNPC"] = 1] = "invasionNPC";
    DEFCON[DEFCON["boostedInvasionNPC"] = 2] = "boostedInvasionNPC";
    DEFCON[DEFCON["playerInvasion"] = 2] = "playerInvasion";
    DEFCON[DEFCON["bigPlayerInvasion"] = 3] = "bigPlayerInvasion";
})(DEFCON$1 || (DEFCON$1 = {}));
function getAllColonies$1() {
    return _.values(Overmind.colonies);
}
let Colony$1 = class Colony {
    constructor(id, roomName, outposts, creeps) {
        // Primitive colony setup
        this.id = id;
        this.name = roomName;
        this.colony = this;
        if (!Memory.colonies[this.name]) {
            Memory.colonies[this.name] = { defcon: { level: DEFCON$1.safe, tick: Game.time } };
        }
        this.memory = Memory.colonies[this.name];
        // Register creeps
        this.creeps = creeps || [];
        this.creepsByRole = _.groupBy(this.creeps, creep => creep.memory.role);
        // Instantiate the colony overseer
        this.overseer = new Overseer(this);
        // Register colony capitol and outposts
        this.roomNames = [roomName].concat(outposts);
        this.room = Game.rooms[roomName];
        this.outposts = _.compact(_.map(outposts, outpost => Game.rooms[outpost]));
        this.rooms = [Game.rooms[roomName]].concat(this.outposts);
        // Register real colony components
        this.registerRoomObjects();
        // Set the colony operational state
        this.registerOperationalState();
        // Create placeholder arrays for remaining properties to be filled in by the Overmind
        this.flags = []; // filled in by directives
        this.destinations = []; // filled in by various hive clusters and directives
        this.registerUtilities();
        // Build the hive clusters
        this.registerHiveClusters();
        // Register colony overlords
        this.spawnMoarOverlords();
        // Add an Abathur
        this.assets = this.getAllAssets();
        this.abathur = new Abathur(this);
        // Register colony globally to allow 'W1N1' and 'w1n1' to refer to Overmind.colonies.W1N1
        global[this.name] = this;
        global[this.name.toLowerCase()] = this;
    }
    registerRoomObjects() {
        this.controller = this.room.controller; // must be controller since colonies are based in owned rooms
        this.pos = this.controller.pos; // This is used for overlord initialization but isn't actually useful
        this.spawns = _.sortBy(_.filter(this.room.spawns, spawn => spawn.my && spawn.isActive()), spawn => spawn.ref);
        this.extensions = this.room.extensions;
        this.storage = this.room.storage;
        this.links = this.room.links;
        this.availableLinks = _.clone(this.room.links);
        this.terminal = this.room.terminal;
        this.towers = this.room.towers;
        this.labs = _.sortBy(_.filter(this.room.labs, lab => lab.my && lab.isActive()), lab => 50 * lab.pos.y + lab.pos.x); // Labs are sorted in reading order of positions
        this.powerSpawn = this.room.getStructures(STRUCTURE_POWER_SPAWN)[0];
        this.nuker = this.room.getStructures(STRUCTURE_NUKER)[0];
        this.observer = this.room.getStructures(STRUCTURE_OBSERVER)[0];
        // Register physical objects across all rooms in the colony
        this.sources = _.sortBy(_.flatten(_.map(this.rooms, room => room.sources)), source => source.pos.getMultiRoomRangeTo(this.pos));
        this.extractors = _.sortBy(_.compact(_.map(this.rooms, room => room.extractor)), extractor => extractor.pos.getMultiRoomRangeTo(this.pos));
        this.constructionSites = _.flatten(_.map(this.rooms, room => room.constructionSites));
        this.tombstones = _.flatten(_.map(this.rooms, room => room.tombstones));
        this.repairables = _.flatten(_.map(this.rooms, room => room.repairables));
        this.obstacles = [];
    }
    registerOperationalState() {
        this.level = this.controller.level;
        this.bootstrapping = false;
        this.isIncubating = false;
        if (this.storage && this.storage.isActive() &&
            this.spawns[0] && this.spawns[0].pos.findClosestByLimitedRange(this.room.containers, 2)) {
            // If the colony has storage and a hatchery and a hatchery battery
            if (this.controller.level == 8) {
                this.stage = ColonyStage$1.Adult;
            }
            else {
                this.stage = ColonyStage$1.Pupa;
            }
        }
        else {
            this.stage = ColonyStage$1.Larva;
        }
        this.incubatingColonies = [];
        this.lowPowerMode = Energetics.lowPowerMode(this);
        // Set DEFCON level
        // TODO: finish this
        let defcon = DEFCON$1.safe;
        let defconDecayTime = 200;
        if (this.room.dangerousHostiles.length > 0) {
            let effectiveHostileCount = _.sum(_.map(this.room.dangerousHostiles, hostile => hostile.boosts.length > 0 ? 2 : 1));
            if (effectiveHostileCount >= 3) {
                defcon = DEFCON$1.boostedInvasionNPC;
            }
            else {
                defcon = DEFCON$1.invasionNPC;
            }
        }
        if (this.memory.defcon) {
            if (defcon < this.memory.defcon.level) { // decay defcon level over time if defcon less than memory value
                if (this.memory.defcon.tick + defconDecayTime < Game.time) {
                    this.memory.defcon.level = defcon;
                    this.memory.defcon.tick = Game.time;
                }
            }
            else if (defcon > this.memory.defcon.level) { // refresh defcon time if it increases by a level
                this.memory.defcon.level = defcon;
                this.memory.defcon.tick = Game.time;
            }
        }
        else {
            this.memory.defcon = {
                level: defcon,
                tick: Game.time
            };
        }
        this.defcon = this.memory.defcon.level;
        this.breached = (this.room.dangerousHostiles.length > 0 &&
            this.creeps.length == 0 &&
            !this.controller.safeMode);
        // Ininitialize abandon property to false; directives can change this
        this.abandoning = false;
    }
    registerUtilities() {
        // Resource requests
        this.linkNetwork = new LinkNetwork(this);
        this.logisticsNetwork = new LogisticsNetwork(this);
        // Register a room planner
        this.roomPlanner = new RoomPlanner(this);
        // Register road network
        this.roadLogistics = new RoadLogistics(this);
    }
    /* Instantiate and associate virtual colony components to group similar structures together */
    registerHiveClusters() {
        this.hiveClusters = [];
        // Instantiate the command center if there is storage in the room - this must be done first!
        if (this.stage > ColonyStage$1.Larva) {
            this.commandCenter = new CommandCenter(this, this.storage);
        }
        // Instantiate the hatchery - the incubation directive assignes hatchery to incubator's hatchery if none exists
        if (this.spawns[0]) {
            this.hatchery = new Hatchery(this, this.spawns[0]);
        }
        // Instantiate evolution chamber
        if (this.terminal && this.terminal.isActive() && this.labs.length >= 3) {
            this.evolutionChamber = new EvolutionChamber(this, this.terminal);
        }
        // Instantiate the upgradeSite
        this.upgradeSite = new UpgradeSite(this, this.controller);
        // Instantiate spore crawlers to wrap towers
        this.sporeCrawlers = _.map(this.towers, tower => new SporeCrawler(this, tower));
        // Dropoff links are freestanding links or ones at mining sites
        this.dropoffLinks = _.clone(this.availableLinks);
        // Mining sites is an object of ID's and MiningSites
        let sourceIDs = _.map(this.sources, source => source.ref);
        let miningSites = _.map(this.sources, source => new MiningSite(this, source));
        this.miningSites = _.zipObject(sourceIDs, miningSites);
        // ExtractionSites is an object of ID's and ExtractionSites
        let extractorIDs = _.map(this.extractors, extractor => extractor.ref);
        let extractionSites = _.map(this.extractors, extractor => new ExtractionSite(this, extractor));
        this.extractionSites = _.zipObject(extractorIDs, extractionSites);
        // Reverse the hive clusters for correct order for init() and run()
        this.hiveClusters.reverse();
    }
    spawnMoarOverlords() {
        this.overlords = {
            work: new WorkerOverlord(this),
            logistics: new TransportOverlord(this),
        };
    }
    // /* Refreshes portions of the colony state between ticks without rebuilding the entire object */
    // rebuild(): void {
    // 	this.flags = []; 			// Reset flags list since Overmind will re-instantiate directives
    // 	this.overseer.rebuild();	// Rebuild the overseer, which rebuilds overlords
    // }
    getCreepsByRole(roleName) {
        return this.creepsByRole[roleName] || [];
    }
    /* Summarizes the total of all resources in colony store structures, labs, and some creeps */
    getAllAssets() {
        // Include storage structures and manager carry
        let stores = _.map(_.compact([this.storage, this.terminal]), s => s.store);
        let creepCarriesToInclude = _.map(_.filter(this.creeps, creep => creep.roleName == ManagerSetup.role), creep => creep.carry);
        let allAssets = mergeSum([...stores, ...creepCarriesToInclude]);
        // Include lab amounts
        for (let lab of this.labs) {
            if (lab.mineralType) {
                if (!allAssets[lab.mineralType]) {
                    allAssets[lab.mineralType] = 0;
                }
                allAssets[lab.mineralType] += lab.mineralAmount;
            }
        }
        return allAssets;
    }
    init() {
        this.overseer.init(); // Initialize overseer AFTER hive clusters
        _.forEach(this.hiveClusters, hiveCluster => hiveCluster.init()); // Initialize each hive cluster
        // this.overseer.init();												// Initialize overseer AFTER hive clusters
        this.roadLogistics.init(); // Initialize the road network
        this.linkNetwork.init(); // Initialize link network
        this.roomPlanner.init(); // Initialize the room planner
    }
    run() {
        this.overseer.run(); // Run overseer BEFORE hive clusters
        _.forEach(this.hiveClusters, hiveCluster => hiveCluster.run()); // Run each hive cluster
        this.linkNetwork.run(); // Run the link network
        this.roadLogistics.run(); // Run the road network
        this.roomPlanner.run(); // Run the room planner
        this.stats(); // Log stats per tick
    }
    stats() {
        // Log energy and rcl
        Stats.log(`colonies.${this.name}.storage.energy`, this.storage ? this.storage.energy : undefined);
        Stats.log(`colonies.${this.name}.rcl.level`, this.controller.level);
        Stats.log(`colonies.${this.name}.rcl.progress`, this.controller.progress);
        Stats.log(`colonies.${this.name}.rcl.progressTotal`, this.controller.progressTotal);
        // Log average miningSite usage and uptime and estimated colony energy income
        let numSites = _.keys(this.miningSites).length;
        let avgDowntime = _.sum(_.map(this.miningSites, (site) => site.memory.stats.downtime)) / numSites;
        let avgUsage = _.sum(_.map(this.miningSites, (site) => site.memory.stats.usage)) / numSites;
        let energyInPerTick = _.sum(_.map(this.miningSites, (site) => site.source.energyCapacity * site.memory.stats.usage)) / ENERGY_REGEN_TIME;
        Stats.log(`colonies.${this.name}.miningSites.avgDowntime`, avgDowntime);
        Stats.log(`colonies.${this.name}.miningSites.avgUsage`, avgUsage);
        Stats.log(`colonies.${this.name}.miningSites.energyInPerTick`, energyInPerTick);
    }
    visuals() {
        this.overseer.visuals(); // Display overlord creep information
        _.forEach(this.hiveClusters, hiveCluster => hiveCluster.visuals()); // Display hiveCluster visuals
    }
};
Colony$1 = __decorate([
    profile
], Colony$1);



var Colony$2 = Object.freeze({
	get ColonyStage () { return ColonyStage$1; },
	get DEFCON () { return DEFCON$1; },
	getAllColonies: getAllColonies$1,
	get Colony () { return Colony$1; }
});

var Colony_1 = ( Colony$2 && undefined ) || Colony$2;

// Jump table to instantiate flags based on type
function DirectiveWrapper$1(flag) {
    switch (flag.color) {
        // Colony directives ===========================================================================================
        case COLOR_PURPLE:
            switch (flag.secondaryColor) {
                case COLOR_PURPLE:
                    return new DirectiveOutpost(flag);
                case COLOR_WHITE:
                    return new DirectiveIncubate(flag);
                case COLOR_GREY:
                    return new DirectiveColonize(flag);
                case COLOR_RED:
                    return new DirectiveAbandon(flag);
            }
            break;
        // Combat directives ===========================================================================================
        case COLOR_RED:
            switch (flag.secondaryColor) {
                case COLOR_BLUE:
                    return new DirectiveGuard(flag);
                case COLOR_PURPLE:
                    return new DirectiveGuardSwarm(flag);
                case COLOR_ORANGE:
                    return new DirectiveSiege(flag);
                case COLOR_GREEN:
                    return new DirectiveHealPoint(flag);
                case COLOR_CYAN:
                    return new DirectiveDestroy(flag);
            }
            break;
        // Combat directives ===========================================================================================
        // Situational directives ======================================================================================
        case COLOR_ORANGE:
            switch (flag.secondaryColor) {
                case COLOR_ORANGE:
                    return new DirectiveBootstrap(flag);
                case COLOR_RED:
                    return new DirectiveInvasionDefense(flag);
                case COLOR_BLUE:
                    return new DirectiveNukeResponse(flag);
            }
            break;
        // Logistics directives ========================================================================================
        case COLOR_YELLOW:
            switch (flag.secondaryColor) {
                case COLOR_YELLOW:
                    return new DirectiveLogisticsRequest(flag);
                case COLOR_BLUE:
                    return new DirectiveHaul(flag);
            }
            break;
        // Lab directives ==============================================================================================
        case COLOR_CYAN:
            switch (flag.secondaryColor) {
                case COLOR_CYAN:
                    return new DirectiveLabMineral(flag);
            }
            break;
        // Targeting colors ============================================================================================
        case COLOR_GREY:
            switch (flag.secondaryColor) {
                case COLOR_ORANGE:
                    return new DirectiveTargetSiege(flag);
                case COLOR_YELLOW:
                    return new DirectiveDismantle(flag);
            }
            break;
        // Room planning directives ====================================================================================
        case COLOR_WHITE:
            switch (flag.secondaryColor) {
                case COLOR_GREEN:
                    return new DirectiveRPHatchery(flag);
                case COLOR_BLUE:
                    return new DirectiveRPCommandCenter(flag);
            }
            break;
    }
}


var initializer = Object.freeze({
	DirectiveWrapper: DirectiveWrapper$1
});

var initializer_1 = ( initializer && undefined ) || initializer;

function profile$1(target, key, _descriptor) {
    if (!USE_PROFILER) {
        return;
    }
    if (key) {
        // case of method decorator
        screepsProfiler.registerFN(target, key);
        return;
    }
    // case of class decorator
    const ctor = target;
    if (!ctor.prototype) {
        return;
    }
    const className = ctor.name;
    screepsProfiler.registerClass(target, className);
}


var decorator = Object.freeze({
	profile: profile$1
});

var decorator_1 = ( decorator && undefined ) || decorator;

// Preprocessing code to be run before animation of anything
let GameCache$1 = class GameCache {
    constructor() {
        this.overlords = {};
        this.targets = {};
        this.structures = {};
        this.constructionSites = {};
        this.drops = {};
    }
    /* Generates a hash table for creeps assigned to each object: key: OLref, val: (key: role, val: names[]) */
    cacheOverlords() {
        this.overlords = {};
        // keys: overlordRef, value: creepNames[]
        let creepNamesByOverlord = _.groupBy(_.keys(Game.creeps), name => Game.creeps[name].memory.overlord);
        for (let ref in creepNamesByOverlord) {
            // keys: roleName, value: creepNames[]
            this.overlords[ref] = _.groupBy(creepNamesByOverlord[ref], name => Game.creeps[name].memory.role);
        }
    }
    /* Generates a hash table for targets: key: TargetRef, val: targeting creep names*/
    cacheTargets() {
        this.targets = {};
        for (let i in Game.creeps) {
            let creep = Game.creeps[i];
            let task = creep.memory.task;
            while (task) {
                if (!this.targets[task._target.ref])
                    this.targets[task._target.ref] = [];
                this.targets[task._target.ref].push(creep.name);
                task = task._parent;
            }
        }
    }
    /* Generates a nested hash table for structure lookup: {[roomName], {[structureType]: Structures[]} */
    cacheStructures() {
        this.structures = {};
        for (let name in Game.rooms) {
            this.structures[name] = _.groupBy(Game.rooms[name].find(FIND_STRUCTURES), s => s.structureType);
        }
    }
    /* Generates a nested hash table for structure lookup: {[roomName], {[structureType]: Structures[]} */
    cacheConstructionSites() {
        this.constructionSites = {};
        for (let name in Game.rooms) {
            this.constructionSites[name] = Game.rooms[name].find(FIND_MY_CONSTRUCTION_SITES);
        }
    }
    /* Generates a nested hash table for drop lookup: {[roomName], {[resourceType]: drops[]} */
    cacheDrops() {
        this.drops = {};
        for (let name in Game.rooms) {
            this.drops[name] = _.groupBy(Game.rooms[name].find(FIND_DROPPED_RESOURCES), r => r.resourceType);
        }
    }
    build() {
        this.cacheOverlords();
        this.cacheTargets();
        this.cacheStructures();
        this.cacheConstructionSites();
        this.cacheDrops();
    }
    rebuild() {
        // Recache the cheap or critical stuff: Overlords, constructionSites, drops
        this.cacheOverlords();
    }
};
GameCache$1 = __decorate([
    profile
], GameCache$1);



var caching = Object.freeze({
	get GameCache () { return GameCache$1; }
});

var caching_1 = ( caching && undefined ) || caching;

let Zerg$1 = Zerg_1$2 = class Zerg {
    constructor(creep) {
        this.creep = creep;
        this.body = creep.body;
        this.carry = creep.carry;
        this.carryCapacity = creep.carryCapacity;
        this.fatigue = creep.fatigue;
        this.hits = creep.hits;
        this.hitsMax = creep.hitsMax;
        this.id = creep.id;
        this.memory = creep.memory;
        // this.my = creep.my;
        this.name = creep.name;
        // this.owner = creep.owner;
        this.pos = creep.pos;
        this.ref = creep.ref;
        this.roleName = creep.memory.role;
        this.room = creep.room;
        this.saying = creep.saying;
        this.spawning = creep.spawning;
        this.ticksToLive = creep.ticksToLive;
        this.lifetime = this.getBodyparts(CLAIM) > 0 ? CREEP_CLAIM_LIFE_TIME : CREEP_LIFE_TIME;
        this.actionLog = {};
        // this.settings = {};
    }
    // Wrapped creep methods ===========================================================================================
    attack(target) {
        let result = this.creep.attack(target);
        if (!this.actionLog.attack)
            this.actionLog.attack = (result == OK);
        return result;
    }
    attackController(controller) {
        let result = this.creep.attackController(controller);
        if (!this.actionLog.attackController)
            this.actionLog.attackController = (result == OK);
        return result;
    }
    build(target) {
        let result = this.creep.build(target);
        if (!this.actionLog.build)
            this.actionLog.build = (result == OK);
        return result;
    }
    cancelOrder(methodName) {
        console.log('NOT IMPLEMENTED');
        return ERR_NOT_FOUND;
    }
    claimController(controller) {
        let result = this.creep.claimController(controller);
        if (!this.actionLog.claimController)
            this.actionLog.claimController = (result == OK);
        return result;
    }
    dismantle(target) {
        let result = this.creep.dismantle(target);
        if (!this.actionLog.dismantle)
            this.actionLog.dismantle = (result == OK);
        return result;
    }
    drop(resourceType, amount) {
        let result = this.creep.drop(resourceType, amount);
        if (!this.actionLog.drop)
            this.actionLog.drop = (result == OK);
        return result;
    }
    generateSafeMode(target) {
        return this.creep.generateSafeMode(target);
    }
    harvest(source) {
        let result = this.creep.harvest(source);
        if (!this.actionLog.harvest)
            this.actionLog.harvest = (result == OK);
        return result;
    }
    move(direction) {
        let result = this.creep.move(direction);
        if (!this.actionLog.move)
            this.actionLog.move = (result == OK);
        return result;
    }
    moveByPath(path) {
        let result = this.creep.moveByPath(path);
        if (!this.actionLog.move)
            this.actionLog.move = (result == OK);
        return result;
    }
    moveTo(target, opts) {
        let result = this.creep.moveTo(target, opts);
        if (!this.actionLog.move)
            this.actionLog.move = (result == OK);
        return result;
    }
    notifyWhenAttacked(enabled) {
        return this.creep.notifyWhenAttacked(enabled);
    }
    pickup(resource) {
        let result = this.creep.pickup(resource);
        if (!this.actionLog.pickup)
            this.actionLog.pickup = (result == OK);
        return result;
    }
    rangedAttack(target) {
        let result = this.creep.rangedAttack(target);
        if (!this.actionLog.rangedAttack)
            this.actionLog.rangedAttack = (result == OK);
        return result;
    }
    rangedMassAttack() {
        let result = this.creep.rangedMassAttack();
        if (!this.actionLog.rangedMassAttack)
            this.actionLog.rangedMassAttack = (result == OK);
        return result;
    }
    repair(target) {
        let result = this.creep.repair(target);
        if (!this.actionLog.repair)
            this.actionLog.repair = (result == OK);
        return result;
    }
    reserveController(controller) {
        let result = this.creep.reserveController(controller);
        if (!this.actionLog.reserveController)
            this.actionLog.reserveController = (result == OK);
        return result;
    }
    /* Say a message; maximum message length is 10 characters */
    say(message, pub) {
        return this.creep.say(message, pub);
    }
    signController(target, text) {
        let result = this.creep.signController(target, text);
        if (!this.actionLog.signController)
            this.actionLog.signController = (result == OK);
        return result;
    }
    suicide() {
        return this.creep.suicide();
    }
    upgradeController(controller) {
        let result = this.creep.upgradeController(controller);
        if (!this.actionLog.upgradeController)
            this.actionLog.upgradeController = (result == OK);
        // Determine amount of upgrade power
        // let weightedUpgraderParts = _.map(this.boostCounts, )
        // let upgradeAmount = this.getActiveBodyparts(WORK) * UPGRADE_CONTROLLER_POWER;
        // let upgrade
        // Stats.accumulate(`colonies.${this.colony.name}.rcl.progressTotal`, upgradeAmount);
        return result;
    }
    heal(target, rangedHealInstead = true) {
        let result;
        if (rangedHealInstead && !this.pos.isNearTo(target)) {
            return this.rangedHeal(target);
        }
        if (target instanceof Zerg_1$2) {
            result = this.creep.heal(target.creep);
        }
        else {
            result = this.creep.heal(target);
        }
        if (!this.actionLog.heal)
            this.actionLog.heal = (result == OK);
        return result;
    }
    rangedHeal(target) {
        let result;
        if (target instanceof Zerg_1$2) {
            result = this.creep.rangedHeal(target.creep);
        }
        else {
            result = this.creep.rangedHeal(target);
        }
        if (!this.actionLog.rangedHeal)
            this.actionLog.rangedHeal = (result == OK);
        return result;
    }
    transfer(target, resourceType, amount) {
        let result;
        if (target instanceof Zerg_1$2) {
            result = this.creep.transfer(target.creep, resourceType, amount);
        }
        else {
            result = this.creep.transfer(target, resourceType, amount);
        }
        if (!this.actionLog.transfer)
            this.actionLog.transfer = (result == OK);
        return result;
    }
    withdraw(target, resourceType, amount) {
        let result = this.creep.withdraw(target, resourceType, amount);
        if (!this.actionLog.withdraw)
            this.actionLog.withdraw = (result == OK);
        return result;
    }
    // Simultaneous creep actions ==------------------------------------------------------------------------------------
    /* Determine whether the given action will conflict with an action the creep has already taken.
     * See http://docs.screeps.com/simultaneous-actions.html for more details. */
    canExecute(actionName) {
        // Only one action can be executed from within a single pipeline
        // Last pipeline is more complex because it depends on the energy a creep has; sidelining this for now
        let pipelines = [
            ['harvest', 'attack', 'build', 'repair', 'dismantle', 'attackController', 'rangedHeal', 'heal'],
            ['rangedAttack', 'rangedMassAttack', 'build', 'repair', 'rangedHeal'],
        ];
        let conflictingActions = [actionName];
        for (let pipeline of pipelines) {
            if (pipeline.includes(actionName))
                conflictingActions = conflictingActions.concat(pipeline);
        }
        for (let action of conflictingActions) {
            if (this.actionLog[action]) {
                return false;
            }
        }
        return true;
    }
    // Body configuration and related data -----------------------------------------------------------------------------
    getActiveBodyparts(type) {
        return this.creep.getActiveBodyparts(type);
    }
    /* The same as creep.getActiveBodyparts, but just counts bodyparts regardless of condition. */
    getBodyparts(partType) {
        return _.filter(this.body, (part) => part.type == partType).length;
    }
    // Custom creep methods ============================================================================================
    // Carry methods
    get hasMineralsInCarry() {
        for (let resourceType in this.carry) {
            if (resourceType != RESOURCE_ENERGY && (this.carry[resourceType] || 0) > 0) {
                return true;
            }
        }
        return false;
    }
    // Boosting logic --------------------------------------------------------------------------------------------------
    get boosts() {
        return this.creep.boosts;
    }
    get boostCounts() {
        return this.creep.boostCounts;
    }
    get needsBoosts() {
        if (this.overlord) {
            return this.overlord.shouldBoost(this);
        }
        return false;
    }
    // Overlord logic --------------------------------------------------------------------------------------------------
    get overlord() {
        if (this.memory.overlord && Overmind.overlords[this.memory.overlord]) {
            return Overmind.overlords[this.memory.overlord];
        }
        else {
            return null;
        }
    }
    set overlord(newOverlord) {
        // Remove cache references to old assignments
        let ref = this.memory.overlord;
        let oldOverlord = ref ? Overmind.overlords[ref] : null;
        if (ref && Overmind.cache.overlords[ref] && Overmind.cache.overlords[ref][this.roleName]) {
            _.remove(Overmind.cache.overlords[ref][this.roleName], name => name == this.name);
        }
        if (newOverlord) {
            // Change to the new overlord's colony
            this.colony = newOverlord.colony;
            // Change assignments in memory
            this.memory.overlord = newOverlord.ref;
            // Update the cache references
            if (!Overmind.cache.overlords[newOverlord.ref]) {
                Overmind.cache.overlords[newOverlord.ref] = {};
            }
            if (!Overmind.cache.overlords[newOverlord.ref][this.roleName]) {
                Overmind.cache.overlords[newOverlord.ref][this.roleName] = [];
            }
            Overmind.cache.overlords[newOverlord.ref][this.roleName].push(this.name);
        }
        else {
            this.memory.overlord = null;
        }
        if (oldOverlord)
            oldOverlord.recalculateCreeps();
        if (newOverlord)
            newOverlord.recalculateCreeps();
    }
    // Task logic ------------------------------------------------------------------------------------------------------
    /* Wrapper for _task */
    get task() {
        // if (!this._task) {
        // 	let protoTask = this.memory.task;
        // 	this._task = protoTask ? initializeTask(protoTask) : null;
        // }
        // return this._task;
        return this.creep.task;
    }
    /* Assign the creep a task with the setter, replacing creep.assign(Task) */
    set task(task) {
        // // Unregister target from old task if applicable
        // let oldProtoTask = this.memory.task as protoTask;
        // if (oldProtoTask) {
        // 	let oldRef = oldProtoTask._target.ref;
        // 	if (Overmind.cache.targets[oldRef]) {
        // 		Overmind.cache.targets[oldRef] = _.remove(Overmind.cache.targets[oldRef], name => name == this.name);
        // 	}
        // }
        // // Set the new task
        // this.memory.task = task ? task.proto : null;
        // if (task) {
        // 	if (task.target) {
        // 		// Register task target in cache if it is actively targeting something (excludes goTo and similar)
        // 		if (!Overmind.cache.targets[task.target.ref]) {
        // 			Overmind.cache.targets[task.target.ref] = [];
        // 		}
        // 		Overmind.cache.targets[task.target.ref].push(this.name);
        // 	}
        // 	// Register references to creep
        // 	task.creep = this;
        // 	this._task = task;
        // }
        this.creep.task = task;
    }
    /* Does the creep have a valid task at the moment? */
    get hasValidTask() {
        return this.creep.hasValidTask;
    }
    /* Creeps are idle if they don't have a task. */
    get isIdle() {
        return this.creep.isIdle;
    }
    /* Execute the task you currently have. */
    run() {
        return this.creep.run();
    }
    // Colony association ----------------------------------------------------------------------------------------------
    /* Colony that the creep belongs to. */
    get colony() {
        return Overmind.colonies[this.memory.colony];
    }
    set colony(newColony) {
        this.memory.colony = newColony.name;
    }
    // /* The average movespeed of the creep on blank terrain */
    // get moveSpeed(): number {
    // 	if (!this.memory.data.moveSpeed) {
    // 		let massiveParts = [WORK, ATTACK, RANGED_ATTACK, HEAL, TOUGH];
    // 		let mass = 0;
    // 		for (let part of massiveParts) {
    // 			mass += this.getActiveBodyparts(part);
    // 		}
    // 		let moveParts = this.getActiveBodyparts(MOVE);
    // 		let fatiguePerTick = 2 * mass;
    // 		if (fatiguePerTick == 0) {
    // 			this.memory.data.moveSpeed = 1;
    // 		} else {
    // 			this.memory.data.moveSpeed = Math.min(2 * moveParts / fatiguePerTick, 1);
    // 		}
    // 	}
    // 	return this.memory.data.moveSpeed;
    // }
    // Movement and location -------------------------------------------------------------------------------------------
    travelTo(destination, options = {}) {
        // Add default obstacle avoidance
        let result = this.creep.travelTo(destination, _.merge(options, { obstacles: this.getObstacles() }));
        if (!this.actionLog.move)
            this.actionLog.move = (result == OK);
        return result;
    }
    ;
    inSameRoomAs(target) {
        return (this.pos.roomName == target.pos.roomName);
    }
    getObstacles() {
        if (this.roleName == ManagerSetup.role || this.roleName == QueenSetup.role) {
            return [];
        }
        else {
            return this.colony.obstacles;
        }
    }
    park(pos = this.pos, maintainDistance = false) {
        let road = this.pos.lookForStructure(STRUCTURE_ROAD);
        if (!road)
            return OK;
        let positions = _.sortBy(this.pos.availableNeighbors(), (p) => p.getRangeTo(pos));
        if (maintainDistance) {
            let currentRange = this.pos.getRangeTo(pos);
            positions = _.filter(positions, (p) => p.getRangeTo(pos) <= currentRange);
        }
        let swampPosition;
        for (let position of positions) {
            if (position.lookForStructure(STRUCTURE_ROAD))
                continue;
            let terrain = position.lookFor(LOOK_TERRAIN)[0];
            if (terrain === 'swamp') {
                swampPosition = position;
            }
            else {
                return this.move(this.pos.getDirectionTo(position));
            }
        }
        if (swampPosition) {
            return this.move(this.pos.getDirectionTo(swampPosition));
        }
        return this.travelTo(pos);
    }
    /* Moves a creep off of the current tile to the first available neighbor */
    moveOffCurrentPos() {
        let destinationPos = _.first(_.filter(this.pos.availableNeighbors(), pos => !pos.isEdge));
        if (destinationPos) {
            return this.move(this.pos.getDirectionTo(destinationPos));
        }
    }
    /* Moves onto an exit tile */
    moveOnExit() {
        if (this.pos.rangeToEdge > 0 && this.fatigue == 0) {
            let directions = [1, 3, 5, 7, 2, 4, 6, 8];
            for (let direction of directions) {
                let position = this.pos.getPositionAtDirection(direction);
                let terrain = position.lookFor(LOOK_TERRAIN)[0];
                if (terrain != 'wall' && position.rangeToEdge == 0) {
                    let outcome = this.move(direction);
                    return outcome;
                }
            }
            console.log(`moveOnExit() assumes nearby exit tile, position: ${this.pos}`);
            return ERR_NO_PATH;
        }
    }
    /* Moves off of an exit tile */
    moveOffExit(avoidSwamp = true) {
        let swampDirection;
        let directions = [1, 3, 5, 7, 2, 4, 6, 8];
        for (let direction of directions) {
            let position = this.pos.getPositionAtDirection(direction);
            if (position.rangeToEdge > 0 && position.isPassible()) {
                let terrain = position.lookFor(LOOK_TERRAIN)[0];
                if (avoidSwamp && terrain == 'swamp') {
                    swampDirection = direction;
                    continue;
                }
                return this.move(direction);
            }
        }
        if (swampDirection) {
            return this.move(swampDirection);
        }
        return ERR_NO_PATH;
    }
    moveOffExitToward(pos, detour = true) {
        for (let position of this.pos.availableNeighbors()) {
            if (position.getRangeTo(pos) == 1) {
                return this.travelTo(position);
            }
        }
        if (detour) {
            this.travelTo(pos, { ignoreCreeps: false });
        }
    }
    // Miscellaneous fun stuff -----------------------------------------------------------------------------------------
    sayLoop(messageList, pub) {
        return this.say(messageList[Game.time % messageList.length], pub);
    }
    sayRandom(phrases, pub) {
        return this.say(phrases[Math.floor(Math.random() * phrases.length)], pub);
    }
};
Zerg$1 = Zerg_1$2 = __decorate([
    profile
], Zerg$1);
var Zerg_1$2;


var Zerg$2 = Object.freeze({
	get Zerg () { return Zerg$1; }
});

var Zerg_1$1 = ( Zerg$2 && undefined ) || Zerg$2;

let DirectiveOutpost$1 = DirectiveOutpost_1$1 = class DirectiveOutpost extends Directive {
    constructor(flag) {
        super(flag);
        if (!this.colony)
            return;
        if (this.colony.level >= DirectiveOutpost_1$1.settings.canSpawnReserversAtRCL) {
            this.overlords.reserve = new ReservingOverlord(this);
        }
        else {
            this.overlords.scout = new ScoutOverlord(this);
        }
        if (!this.room) {
            // Push source / output positions to colony.destinations if room is invisible for correct road routings
            let savedSources = Memory.rooms[this.pos.roomName] ? Memory.rooms[this.pos.roomName].src || [] : [];
            for (let i in savedSources) {
                let src = Memory.rooms[this.pos.roomName].src[i];
                let pos;
                if (src.contnr) {
                    pos = derefCoords(src.contnr, this.pos.roomName);
                }
                else {
                    pos = derefCoords(src.c, this.pos.roomName);
                }
                this.colony.destinations.push(pos);
            }
        }
    }
    init() {
    }
    run() {
    }
};
DirectiveOutpost$1.directiveName = 'outpost';
DirectiveOutpost$1.color = COLOR_PURPLE;
DirectiveOutpost$1.secondaryColor = COLOR_PURPLE;
DirectiveOutpost$1.settings = {
    canSpawnReserversAtRCL: 3,
};
DirectiveOutpost$1 = DirectiveOutpost_1$1 = __decorate([
    profile
], DirectiveOutpost$1);
var DirectiveOutpost_1$1;


var outpost = Object.freeze({
	get DirectiveOutpost () { return DirectiveOutpost$1; }
});

var outpost_1 = ( outpost && undefined ) || outpost;

let Directive$1 = Directive_1$2 = class Directive {
    constructor(flag, requiredRCL = 1) {
        this.flag = flag;
        this.name = flag.name;
        this.ref = flag.ref;
        this.requiredRCL = requiredRCL;
        this.colony = Directive_1$2.getFlagColony(flag, requiredRCL);
        this.pos = flag.pos;
        this.room = flag.room;
        this.memory = flag.memory;
        if (!this.memory.created)
            this.memory.created = Game.time;
        this.overlords = {};
        // Register to colony overseer or delete the directive if the colony is dead
        if (!this.colony) {
            this.remove();
        }
        else {
            this.colony.overseer.directives.push(this);
        }
    }
    static getFlagColony(flag, requiredRCL = 1) {
        // If something is written to flag.colony, use that as the colony
        if (flag.memory.colony) {
            return Overmind.colonies[flag.memory.colony];
        }
        else {
            // If flag contains a colony name as a substring, assign to that colony, regardless of RCL
            let colonyNames = _.keys(Overmind.colonies);
            for (let name of colonyNames) {
                if (flag.name.includes(name)) {
                    if (flag.name.split(name)[1] != '')
                        continue; // in case of other substring, e.g. E11S12 and E11S1
                    flag.memory.colony = name;
                    return Overmind.colonies[name];
                }
            }
            // If flag is in a room belonging to a colony and the colony has sufficient RCL, assign to there
            let colony = Overmind.colonies[Overmind.colonyMap[flag.pos.roomName]];
            if (colony && colony.level >= requiredRCL) {
                return colony;
            }
            else {
                // Otherwise assign to closest colony
                this.recalculateColony(flag, requiredRCL);
                return Overmind.colonies[flag.memory.colony];
            }
        }
    }
    static recalculateColony(flag, requiredRCL = 1, restrictDistance = 10, verbose = false) {
        if (verbose)
            log.info(`Recalculating colony association for ${flag.name} in ${flag.pos.roomName}`);
        let nearestColonyName = '';
        let minDistance = Infinity;
        let colonyRooms = _.filter(Game.rooms, room => room.my);
        for (let room of colonyRooms) {
            if (room.controller.level >= requiredRCL) {
                let ret = Pathing.findShortestPath(flag.pos, room.controller.pos, { restrictDistance: restrictDistance });
                if (!ret.incomplete) {
                    if (ret.path.length < minDistance) {
                        nearestColonyName = room.name;
                        minDistance = ret.path.length;
                    }
                    if (verbose)
                        log.info(`Path length to ${room.name}: ${ret.path.length}`);
                }
                else {
                    if (verbose)
                        log.info(`Incomplete path found to ${room.name}`);
                }
            }
            else {
                if (verbose) {
                    log.info(`RCL for ${room.name} insufficient: ` +
                        `needs ${requiredRCL}, is ${room.controller.level}`);
                }
            }
        }
        if (nearestColonyName != '') {
            log.info(`Colony ${nearestColonyName} assigned to ${flag.name}.`);
            flag.memory.colony = nearestColonyName;
        }
        else {
            log.warning(`Could not find colony match for ${flag.name} in ${flag.pos.roomName}!`);
        }
    }
    // Wrapped flag methods ============================================================================================
    remove() {
        if (!this.memory.persistent) {
            delete this.memory;
            return this.flag.remove();
        }
    }
    setColor(color, secondaryColor) {
        if (secondaryColor) {
            return this.flag.setColor(color, secondaryColor);
        }
        else {
            return this.flag.setColor(color);
        }
    }
    setPosition(pos) {
        // Ignore the (x,y) setPosition option since I never use it
        return this.flag.setPosition(pos);
    }
    // Custom directive methods ========================================================================================
    /* Create an appropriate flag to instantiate this directive in the next tick */
    static create(pos, opts = {}) {
        let name = opts.name;
        if (!name) {
            name = this.directiveName + ':' + pos.roomName;
            if (Game.flags[name]) {
                let i = 0;
                while (Game.flags[name + i]) {
                    i += 1;
                }
                name = name + i;
            }
        }
        if (!opts.quiet) {
            log.alert(`Creating ${this.directiveName} directive at ${pos.print}!`);
        }
        return pos.createFlag(name, this.color, this.secondaryColor);
    }
    /* Create a directive if one of the same type is not already present (in room | at position) */
    static createIfNotPresent(pos, scope, opts = {}) {
        let room = Game.rooms[pos.roomName];
        if (!room) {
            log.error(`No vision at ${pos.print}; can't create directive!`);
        }
        let flagsOfThisType;
        switch (scope) {
            case 'room':
                // TODO: room can be undefined
                flagsOfThisType = _.filter(room.flags, flag => this.filter(flag));
                if (flagsOfThisType.length == 0) {
                    return this.create(pos, opts);
                }
                break;
            case 'pos':
                flagsOfThisType = _.filter(pos.lookFor(LOOK_FLAGS), flag => this.filter(flag));
                if (flagsOfThisType.length == 0) {
                    return this.create(pos, opts);
                }
                break;
            default:
                log.error(`Directive.createIfNotPresent: scope must be "room" or "pos"!`);
                break;
        }
    }
    /* Filter for _.filter() that checks if a flag is of the matching type */
    static filter(flag) {
        return flag.color == this.color && flag.secondaryColor == this.secondaryColor;
    }
    /* Map a list of flags to directives, accepting a filter */
    static find(flags) {
        flags = _.filter(flags, flag => this.filter(flag));
        return _.compact(_.map(flags, flag => Game.directives[flag.name]));
    }
    // Overwrite this in child classes to display relevant information
    visuals() {
    }
};
Directive$1 = Directive_1$2 = __decorate([
    profile
], Directive$1);
var Directive_1$2;


var Directive$2 = Object.freeze({
	get Directive () { return Directive$1; }
});

var Directive_1$1 = ( Directive$2 && undefined ) || Directive$2;

let Visualizer$1 = class Visualizer {
    static get enabled() {
        return Memory.settings.enableVisuals;
    }
    static circle(pos, color = 'red', opts = {}) {
        _.defaults(opts, {
            fill: color,
            radius: 0.35,
            opacity: 0.5,
        });
        return new RoomVisual(pos.roomName).circle(pos.x, pos.y, opts);
    }
    static marker(pos, opts = {}) {
        return new RoomVisual(pos.roomName).animatedPosition(pos.x, pos.y, opts);
    }
    static drawLayout(structureMap) {
        if (!this.enabled)
            return;
        let vis = {};
        for (let structureType in structureMap) {
            for (let pos of structureMap[structureType]) {
                if (!vis[pos.roomName]) {
                    vis[pos.roomName] = new RoomVisual(pos.roomName);
                }
                vis[pos.roomName].structure(pos.x, pos.y, structureType);
            }
        }
        for (let roomName in vis) {
            vis[roomName].connectRoads();
        }
    }
    static drawRoads(positoins) {
        let pointsByRoom = _.groupBy(positoins, pos => pos.roomName);
        for (let roomName in pointsByRoom) {
            let vis = new RoomVisual(roomName);
            for (let pos of pointsByRoom[roomName]) {
                vis.structure(pos.x, pos.y, STRUCTURE_ROAD);
            }
            vis.connectRoads();
        }
    }
    static drawPath(path, style) {
        let pointsByRoom = _.groupBy(path, pos => pos.roomName);
        for (let roomName in pointsByRoom) {
            new RoomVisual(roomName).poly(pointsByRoom[roomName], style);
        }
    }
    static showInfo(info, calledFrom, opts = {}) {
        if (calledFrom.room) {
            return calledFrom.room.visual.infoBox(info, calledFrom.pos.x, calledFrom.pos.y, opts);
        }
        else {
            return new RoomVisual(calledFrom.pos.roomName).infoBox(info, calledFrom.pos.x, calledFrom.pos.y, opts);
        }
    }
    static text(text, pos, style = {}) {
        _.defaults(style, {
            font: '0.7 verdana',
        });
        new RoomVisual(pos.roomName).text(text, pos, style);
    }
    static drawHUD() {
        // Draw Overmind logo
        new RoomVisual().multitext(asciiLogo, 0, 0, { textfont: 'monospace' });
        // // Display CPU Information
        // new RoomVisual().text('CPU:' + ' bucket:' + Game.cpu.bucket +
        // 					  ' tickLimit:' + Game.cpu.tickLimit, column, row, style);
    }
    static colonyReport(colonyName, text) {
        new RoomVisual(colonyName).multitext(text, 0, 4, { textfont: 'monospace', textsize: 0.75 });
    }
    static visuals() {
        this.drawHUD();
    }
};
Visualizer$1 = __decorate([
    profile
], Visualizer$1);



var Visualizer$2 = Object.freeze({
	get Visualizer () { return Visualizer$1; }
});

var Visualizer_1 = ( Visualizer$2 && undefined ) || Visualizer$2;

var COLLECT_STATS_FREQUENCY$1 = 10; // Gather stats every N ticks
let Stats$1 = class Stats {
    static clean() {
        let protectedKeys = [
            'persistent',
        ];
        for (let key in Memory.stats) {
            if (!protectedKeys.includes(key)) {
                delete Memory.stats[key];
            }
        }
    }
    static format() {
        // Memory.stats = {
        // 	cpu: {
        // 		getUsed: undefined,
        // 		limit: undefined,
        // 		bucket: undefined,
        // 		usage: {},
        // 	},
        // 	gcl: {},
        // 	colonies: {},
        // }
    }
    static cpu() {
        Memory.stats['cpu.getUsed'] = Game.cpu.getUsed();
        Memory.stats['cpu.limit'] = Game.cpu.limit;
        Memory.stats['cpu.bucket'] = Game.cpu.bucket;
    }
    static gcl() {
        Memory.stats['gcl.progress'] = Game.gcl.progress;
        Memory.stats['gcl.progressTotal'] = Game.gcl.progressTotal;
        Memory.stats['gcl.level'] = Game.gcl.level;
    }
    static memory() {
        Memory.stats['memory.used'] = RawMemory.get().length;
    }
    static log(key, value, truncateNumbers = true) {
        if (truncateNumbers && typeof value == 'number') {
            let decimals = 5;
            value = value.truncate(decimals);
        }
        Mem.setDeep(Memory.stats, key, value);
    }
    static accumulate(key, value) {
        if (!Memory.stats[key]) {
            Memory.stats[key] = 0;
        }
        Memory.stats[key] += value;
    }
    static run() {
        // Log GCL
        this.log('gcl.progress', Game.gcl.progress);
        this.log('gcl.progressTotal', Game.gcl.progressTotal);
        this.log('gcl.level', Game.gcl.level);
        // Log memory usage
        this.log('memory.used', RawMemory.get().length);
        // Log CPU
        this.log('cpu.getUsed', Game.cpu.getUsed());
        this.log('cpu.limit', Game.cpu.limit);
        this.log('cpu.bucket', Game.cpu.bucket);
    }
};
Stats$1 = __decorate([
    profile
], Stats$1);



var stats = Object.freeze({
	COLLECT_STATS_FREQUENCY: COLLECT_STATS_FREQUENCY$1,
	get Stats () { return Stats$1; }
});

var stats_1 = ( stats && undefined ) || stats;

const TerminalNetworkMemoryDefaults$1 = {
    equalizeIndex: 0
};
function colonyOf$1(terminal) {
    return Overmind.colonies[terminal.room.name];
}
let TerminalNetwork$1 = TerminalNetwork_1$2 = class TerminalNetwork {
    constructor(terminals) {
        this.terminals = terminals;
        this.memory = Mem.wrap(Memory.Overmind, 'terminalNetwork', TerminalNetworkMemoryDefaults$1);
        this.alreadyReceived = [];
        this.alreadySent = [];
        this.abandonedTerminals = []; // populated in init()
        this.assets = {}; // populated in init()
        this.settings = {
            equalize: {
                frequency: 100,
                maxSendSize: 25000,
                tolerance: {
                    energy: 50000,
                    power: 5000,
                    default: 1000
                }
            }
        };
        this.averageFullness = _.sum(_.map(this.terminals, t => _.sum(t.store) / t.storeCapacity)) / this.terminals.length;
    }
    /* Summarizes the total of all resources currently in a colony store structure */
    getAllAssets() {
        return mergeSum(_.map(this.terminals, terminal => colonyOf$1(terminal).assets));
    }
    static get stats() {
        return Mem.wrap(Memory.stats.persistent, 'terminalNetwork');
    }
    static logTransfer(resourceType, amount, origin, destination) {
        if (!this.stats.transfers)
            this.stats.transfers = {};
        if (!this.stats.transfers[resourceType])
            this.stats.transfers[resourceType] = {};
        if (!this.stats.transfers[resourceType][origin])
            this.stats.transfers[resourceType][origin] = {};
        if (!this.stats.transfers[resourceType][origin][destination]) {
            this.stats.transfers[resourceType][origin][destination] = 0;
        }
        this.stats.transfers[resourceType][origin][destination] += amount;
        this.logTransferCosts(amount, origin, destination);
    }
    static logTransferCosts(amount, origin, destination) {
        if (!this.stats.transfers.costs)
            this.stats.transfers.costs = {};
        if (!this.stats.transfers.costs[origin])
            this.stats.transfers.costs[origin] = {};
        if (!this.stats.transfers.costs[origin][destination])
            this.stats.transfers.costs[origin][destination] = 0;
        let transactionCost = Game.market.calcTransactionCost(amount, origin, destination);
        this.stats.transfers.costs[origin][destination] += transactionCost;
    }
    /* Whether the terminal is actively requesting energy */
    terminalNeedsEnergy(terminal) {
        return terminal.energy < Energetics.settings.terminal.energy.inThreshold;
    }
    /* Amount of space available in storage and terminal */
    remainingRoomCapacity(room) {
        let remainingCapacity = 0;
        if (room.storage) {
            remainingCapacity += room.storage.storeCapacity - _.sum(room.storage.store);
        }
        if (room.terminal) {
            remainingCapacity += room.terminal.storeCapacity - _.sum(room.terminal.store);
        }
        return remainingCapacity;
    }
    /* Amount of energy in storage and terminal */
    energyInRoom(room) {
        let energyInRoom = 0;
        if (room.storage) {
            energyInRoom += room.storage.energy;
        }
        if (room.terminal) {
            energyInRoom += room.terminal.energy;
        }
        return energyInRoom;
    }
    transfer(sender, receiver, resourceType, amount) {
        let cost = Game.market.calcTransactionCost(amount, sender.room.name, receiver.room.name);
        let response = sender.send(resourceType, amount, receiver.room.name);
        if (response == OK) {
            log.info(`Sent ${amount} ${resourceType} from ${sender.room.print} to ` +
                `${receiver.room.print}. Fee: ${cost}.`);
            TerminalNetwork_1$2.logTransfer(resourceType, amount, sender.room.name, receiver.room.name);
            this.alreadySent.push(sender);
            this.alreadyReceived.push(receiver);
        }
        else {
            log.error(`Could not send ${amount} ${resourceType} from ${sender.room.print} to ` +
                `${receiver.room.print}! Response: ${response}`);
        }
        return response;
    }
    requestResource(receiver, resourceType, amount, allowBuy = true, minDifference = 4000) {
        if (this.abandonedTerminals.includes(receiver)) {
            return; // don't send to abandoning terminals
        }
        amount = Math.max(amount, TERMINAL_MIN_SEND);
        let possibleSenders = _.filter(this.terminals, terminal => (terminal.store[resourceType] || 0) > amount + minDifference &&
            terminal.cooldown == 0 && !this.alreadySent.includes(terminal));
        let sender = maxBy(possibleSenders, t => (t.store[resourceType] || 0));
        if (sender) {
            this.transfer(sender, receiver, resourceType, amount);
        }
        else if (allowBuy) {
            Overmind.tradeNetwork.buyMineral(receiver, resourceType, amount);
        }
    }
    /* Sell excess minerals on the market */
    sellExcess(terminal, threshold = 25000) {
        let terminalNearCapacity = _.sum(terminal.store) > 0.9 * terminal.storeCapacity;
        let energyOrders = _.filter(Game.market.orders, order => order.type == ORDER_SELL &&
            order.resourceType == RESOURCE_ENERGY);
        let energyThreshold = Energetics.settings.terminal.energy.outThreshold
            + Energetics.settings.terminal.energy.sendSize;
        for (let resource in terminal.store) {
            if (resource == RESOURCE_POWER) {
                continue;
            }
            if (resource == RESOURCE_ENERGY) {
                if (terminal.store[RESOURCE_ENERGY] > energyThreshold) {
                    if (terminalNearCapacity) { // just get rid of stuff at high capacities
                        Overmind.tradeNetwork.sellDirectly(terminal, RESOURCE_ENERGY, 10000);
                    }
                    else if (energyOrders.length < 3) {
                        Overmind.tradeNetwork.sell(terminal, RESOURCE_ENERGY, 50000);
                    }
                }
            }
            else {
                if (terminal.store[resource] > threshold) {
                    if (terminalNearCapacity || terminal.store[resource] > 2 * threshold) {
                        Overmind.tradeNetwork.sellDirectly(terminal, resource, 1000);
                    }
                    else {
                        Overmind.tradeNetwork.sell(terminal, resource, 10000);
                    }
                }
            }
        }
    }
    // private sendExcessEnergy(terminal: StructureTerminal): void {
    // 	let {sendSize, inThreshold, outThreshold, equilibrium} = Energetics.settings.terminal.energy;
    // 	// See if there are any rooms actively needing energy first
    // 	let needyTerminals = _.filter(this.terminals, t =>
    // 		t != terminal && this.terminalNeedsEnergy(t) && !this.alreadyReceived.includes(t));
    // 	if (needyTerminals.length > 0) {
    // 		// Send to the most cost-efficient needy terminal
    // 		let bestTerminal = minBy(needyTerminals, (receiver: StructureTerminal) =>
    // 			Game.market.calcTransactionCost(sendSize, terminal.room.name, receiver.room.name));
    // 		if (bestTerminal) this.transferEnergy(terminal, bestTerminal);
    // 	} else {
    // 		// Send to the terminal with least energy that is not already trying to get rid of stuff
    // 		let okTerminals = _.filter(this.terminals, t =>
    // 			t != terminal && t.store.energy < outThreshold - sendSize && !this.alreadyReceived.includes(t));
    // 		let bestTerminal = minBy(okTerminals, (receiver: StructureTerminal) => this.energyInRoom(receiver.room));
    // 		if (bestTerminal) this.transferEnergy(terminal, bestTerminal);
    // 	}
    // }
    equalize(resourceType, terminals = this.terminals) {
        let averageAmount = _.sum(_.map(terminals, terminal => (colonyOf$1(terminal).assets[resourceType] || 0))) / terminals.length;
        let terminalsByResource = _.sortBy(terminals, terminal => (colonyOf$1(terminal).assets[resourceType] || 0));
        // Min-max match terminals
        let receivers = _.take(terminalsByResource, Math.floor(terminalsByResource.length / 2));
        terminalsByResource.reverse();
        let senders = _.take(terminalsByResource, Math.floor(terminalsByResource.length / 2));
        for (let [sender, receiver] of _.zip(senders, receivers)) {
            let senderAmount = colonyOf$1(sender).assets[resourceType] || 0;
            let receiverAmount = colonyOf$1(receiver).assets[resourceType] || 0;
            let tolerance = this.settings.equalize.tolerance[resourceType] || this.settings.equalize.tolerance.default;
            if (senderAmount - receiverAmount < tolerance) {
                continue; // skip if colonies are close to equilibrium
            }
            let senderSurplus = senderAmount - averageAmount;
            let receiverDeficit = averageAmount - receiverAmount;
            let sendAmount = Math.min(senderSurplus, receiverDeficit, this.settings.equalize.maxSendSize);
            sendAmount = Math.floor(Math.max(sendAmount, 0));
            let sendCost = Game.market.calcTransactionCost(sendAmount, sender.room.name, receiver.room.name);
            sendAmount = Math.min(sendAmount, (sender.store[resourceType] || 0) - sendCost - 10, (receiver.storeCapacity - _.sum(receiver.store)));
            if (sendAmount < TERMINAL_MIN_SEND) {
                continue;
            }
            this.transfer(sender, receiver, resourceType, sendAmount);
        }
    }
    equalizeCycle() {
        // Equalize current resource type
        this.equalize(RESOURCES_ALL[this.memory.equalizeIndex]);
        // Determine next resource type to equalize; most recent resourceType gets cycled to end
        let resourceEqualizeOrder = RESOURCES_ALL.slice(this.memory.equalizeIndex + 1)
            .concat(RESOURCES_ALL.slice(0, this.memory.equalizeIndex + 1));
        let nextResourceType = _.find(resourceEqualizeOrder, resourceType => this.assets[resourceType] > this.settings.equalize.tolerance.default);
        // Set next equalize resource index
        this.memory.equalizeIndex = _.findIndex(RESOURCES_ALL, resource => resource == nextResourceType);
    }
    evacuateResources(sender) {
        let receiver = _.first(_.sortBy(this.terminals, t => _.sum(t.store)));
        for (let resource of RESOURCE_IMPORTANCE) {
            let amount = (sender.store[resource] || 0);
            if (resource == RESOURCE_ENERGY) {
                if (this.averageFullness > 0.9) {
                    return; // ignore sending energy if other terminals are already pretty full
                }
                amount -= Game.market.calcTransactionCost(amount, sender.room.name, receiver.room.name) + 100;
            }
            if (amount > TERMINAL_MIN_SEND) {
                // Send to the emptiest terminal in the network
                if (receiver && receiver.storeCapacity - _.sum(receiver.store) > amount) {
                    this.transfer(sender, receiver, resource, amount);
                    return;
                }
            }
        }
    }
    handleAbandonedTerminals() {
        // Register (non-abandoned) terminal fullness
        let terminalsByEmptiness = _.sortBy(this.terminals, t => _.sum(t.store));
        // Send all resources to non-abandoned terminals
        for (let terminal of _.filter(this.abandonedTerminals, t => t.cooldown == 0)) {
            this.evacuateResources(terminal);
        }
    }
    init() {
        // Remove any terminals from terminal network which are in abandoning colonies
        this.abandonedTerminals = _.remove(this.terminals, terminal => colonyOf$1(terminal).abandoning == true);
        this.assets = this.getAllAssets();
    }
    run() {
        if (Game.time % this.settings.equalize.frequency == 0) {
            this.equalize(RESOURCE_ENERGY);
        }
        else if (Game.time % this.settings.equalize.frequency == 20) {
            let powerTerminals = _.filter(this.terminals, t => colonyOf$1(t).powerSpawn != undefined);
            this.equalize(RESOURCE_POWER, powerTerminals);
        }
        this.handleAbandonedTerminals();
        // Sell excess resources as needed
        let terminalToSellExcess = this.terminals[Game.time % this.terminals.length];
        if (terminalToSellExcess && terminalToSellExcess.cooldown == 0) {
            this.sellExcess(terminalToSellExcess);
        }
    }
};
TerminalNetwork$1 = TerminalNetwork_1$2 = __decorate([
    profile
], TerminalNetwork$1);
var TerminalNetwork_1$2;


var TerminalNetwork$2 = Object.freeze({
	get TerminalNetwork () { return TerminalNetwork$1; }
});

var TerminalNetwork_1$1 = ( TerminalNetwork$2 && undefined ) || TerminalNetwork$2;

// List of all contracts to run each tick. Note that contracts do not run unless MY_USERNAME == "Muon".
// Change this in Overmind.ts to run contracts if you are not me.
var AllContracts$1 = [
    new Contract_TiggaTerritoryAgreement(),
];


var contractsList = Object.freeze({
	AllContracts: AllContracts$1
});

var contractsList_1 = ( contractsList && undefined ) || contractsList;

let Mem$1 = Mem_1$1 = class Mem {
    static wrap(memory, memName, defaults = {}, deep = false) {
        if (!memory[memName]) {
            memory[memName] = defaults;
        }
        if (deep) {
            _.defaultsDeep(memory[memName], defaults);
        }
        else {
            _.defaults(memory[memName], defaults);
        }
        return memory[memName];
    }
    static _setDeep(object, keys, value) {
        let key = _.first(keys);
        keys = _.drop(keys);
        if (keys.length == 0) { // at the end of the recursion
            object[key] = value;
            return;
        }
        else {
            if (!object[key]) {
                object[key] = {};
            }
            return Mem_1$1._setDeep(object[key], keys, value);
        }
    }
    /* Recursively set a value of an object given a dot-separated key, adding intermediate properties as necessary
     * Ex: Mem.setDeep(Memory.colonies, 'E1S1.miningSites.siteID.stats.uptime', 0.5) */
    static setDeep(object, keyString, value) {
        let keys = keyString.split('.');
        return Mem_1$1._setDeep(object, keys, value);
    }
    static formatOvermindMemory() {
        if (!Memory.Overmind) {
            Memory.Overmind = {};
        }
        if (!Memory.colonies) {
            Memory.colonies = {};
        }
    }
    static formatPathingMemory() {
        if (!Memory.pathing) {
            Memory.pathing = {}; // Hacky workaround
        }
        _.defaults(Memory.pathing, {
            paths: {},
            distances: {},
            weightedDistances: {},
        });
    }
    static format() {
        // Format the memory as needed, done once every global reset
        this.formatOvermindMemory();
        this.formatPathingMemory();
        // Rest of memory formatting
        if (!Memory.settings) {
            Memory.settings = {};
        }
        _.defaults(Memory.settings, {
            enableVisuals: true,
        });
        if (!Memory.stats) {
            Memory.stats = {};
        }
        if (!Memory.stats.persistent) {
            Memory.stats.persistent = {};
        }
        if (!Memory.signature) {
            Memory.signature = DEFAULT_OVERMIND_SIGNATURE;
        }
        if (!Memory.constructionSites) {
            Memory.constructionSites = {};
        }
        // Changes to ensure backwards compatibility
        this.backwardsCompatibility();
    }
    static cleanCreeps() {
        // Clear memory for non-existent creeps
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }
    static cleanFlags() {
        // Clear memory for non-existent flags
        for (let name in Memory.flags) {
            if (!Game.flags[name]) {
                delete Memory.flags[name];
            }
        }
    }
    static cleanColonies() {
        // Clear memory of dead colonies
        for (let name in Memory.colonies) {
            let room = Game.rooms[name];
            if (!(room && room.my)) {
                // Delete only if "persistent" is not set - use case: praise rooms
                if (!Memory.colonies[name].persistent) {
                    delete Memory.colonies[name];
                }
            }
        }
    }
    static cleanConstructionSites() {
        // Remove ancient construction sites
        if (Game.time % 10 == 0) {
            const CONSTRUCTION_SITE_TIMEOUT = 50000;
            // Add constructionSites to memory and remove really old ones
            for (let id in Game.constructionSites) {
                if (!Memory.constructionSites[id]) {
                    Memory.constructionSites[id] = Game.time;
                }
                else if (Game.time - Memory.constructionSites[id] > CONSTRUCTION_SITE_TIMEOUT) {
                    Game.constructionSites[id].remove();
                }
            }
            // Remove dead constructionSites from memory
            for (let id in Memory.constructionSites) {
                if (!Game.constructionSites[id]) {
                    delete Memory.constructionSites[id];
                }
            }
        }
    }
    static cleanPathingMemory() {
        let distanceCleanProbability = 1 / 1000;
        let weightedDistanceCleanProbability = 0.01;
        // Randomly clear some cached path lengths
        for (let pos1Name in Memory.pathing.distances) {
            if (_.isEmpty(Memory.pathing.distances[pos1Name])) {
                delete Memory.pathing.distances[pos1Name];
            }
            else {
                for (let pos2Name in Memory.pathing.distances[pos1Name]) {
                    if (Math.random() < distanceCleanProbability) {
                        delete Memory.pathing.distances[pos1Name][pos2Name];
                    }
                }
            }
        }
        // Randomly clear weighted distances
        for (let pos1Name in Memory.pathing.weightedDistances) {
            if (_.isEmpty(Memory.pathing.weightedDistances[pos1Name])) {
                delete Memory.pathing.weightedDistances[pos1Name];
            }
            else {
                for (let pos2Name in Memory.pathing.weightedDistances[pos1Name]) {
                    if (Math.random() < weightedDistanceCleanProbability) {
                        delete Memory.pathing.weightedDistances[pos1Name][pos2Name];
                    }
                }
            }
        }
    }
    static clean() {
        // Clean the memory of non-existent objects every tick
        this.cleanCreeps();
        this.cleanFlags();
        this.cleanColonies();
        this.cleanPathingMemory();
        this.cleanConstructionSites();
        Stats.clean();
    }
    static backwardsCompatibility() {
    }
};
Mem$1 = Mem_1$1 = __decorate([
    profile
], Mem$1);
var Mem_1$1;


var Memory$1 = Object.freeze({
	get Mem () { return Mem$1; }
});

var Memory_1 = ( Memory$1 && undefined ) || Memory$1;

var asciiLogo$1 = ['___________________________________________________________',
    '',
    ' _____  _    _ _______  ______ _______ _____ __   _ ______ ',
    '|     |  \\  /  |______ |_____/ |  |  |   |   | \\  | |     \\',
    '|_____|   \\/   |______ |    \\_ |  |  | __|__ |  \\_| |_____/',
    '',
    '_______________________ Screeps AI ________________________'];
var asciiLogoSmall$1 = [' _____  _    _ _______  ______ _______ _____ __   _ ______ ',
    '|     |  \\  /  |______ |_____/ |  |  |   |   | \\  | |     \\',
    '|_____|   \\/   |______ |    \\_ |  |  | __|__ |  \\_| |_____/'];


var logos = Object.freeze({
	asciiLogo: asciiLogo$1,
	asciiLogoSmall: asciiLogoSmall$1
});

var logos_1 = ( logos && undefined ) || logos;

/**
 * Debug level for log output
 */
const LOG_LEVEL$1 = LogLevels.DEBUG;
/**
 * Prepend log output with current tick number.
 */
const LOG_PRINT_TICK$1 = true;
/**
 * Prepend log output with source line.
 */
const LOG_PRINT_LINES$1 = false;
/**
 * Load source maps and resolve source lines back to typeascript.
 */
const LOG_LOAD_SOURCE_MAP$1 = false;
/**
 * Maximum padding for source links (for aligning log output).
 */
const LOG_MAX_PAD$1 = 100;
/**
 * VSC location, used to create links back to source.
 * Repo and revision are filled in at build time for git repositories.
 */
const LOG_VSC$1 = { repo: '@@_repo_@@', revision: '@@_revision_@@', valid: false };
// export const LOG_VSC = { repo: "@@_repo_@@", revision: __REVISION__, valid: false };
/**
 * URL template for VSC links, this one works for github and gitlab.
 */
const LOG_VSC_URL_TEMPLATE$1 = (path, line) => {
    return `${LOG_VSC$1.repo}/blob/${LOG_VSC$1.revision}/${path}#${line}`;
};
// <caller> (<source>:<line>:<column>)
const stackLineRe$1 = /([^ ]*) \(([^:]*):([0-9]*):([0-9]*)\)/;
function resolve$1(fileLine) {
    const split = _.trim(fileLine).match(stackLineRe$1);
    if (!split || !Log$1.sourceMap) {
        return { compiled: fileLine, final: fileLine };
    }
    const pos = { column: parseInt(split[4], 10), line: parseInt(split[3], 10) };
    const original = Log$1.sourceMap.originalPositionFor(pos);
    const line = `${split[1]} (${original.source}:${original.line})`;
    const out = {
        caller: split[1],
        compiled: fileLine,
        final: line,
        line: original.line,
        original: line,
        path: original.source,
    };
    return out;
}
function makeVSCLink$1(pos) {
    if (!LOG_VSC$1.valid || !pos.caller || !pos.path || !pos.line || !pos.original) {
        return pos.final;
    }
    return link$1(vscUrl$1(pos.path, `L${pos.line.toString()}`), pos.original);
}
function color$1(str, color) {
    return `<font color='${color}'>${str}</font>`;
}
function tooltip$1(str, tooltip) {
    return `<abbr title='${tooltip}'>${str}</abbr>`;
}
function vscUrl$1(path, line) {
    return LOG_VSC_URL_TEMPLATE$1(path, line);
}
function link$1(href, title) {
    return `<a href='${href}' target="_blank">${title}</a>`;
}
function time$1() {
    return color$1(Game.time.toString(), 'gray');
}
let Log$1 = Log_1$1 = class Log {
    constructor() {
        this._maxFileString = 0;
        _.defaultsDeep(Memory, {
            log: {
                level: LOG_LEVEL$1,
                showSource: LOG_PRINT_LINES$1,
                showTick: LOG_PRINT_TICK$1,
            }
        });
    }
    static loadSourceMap() {
        try {
            // tslint:disable-next-line
            const map = require('main.js.map');
            if (map) {
                Log_1$1.sourceMap = new SourceMapConsumer(map);
            }
        }
        catch (err) {
            console.log('failed to load source map', err);
        }
    }
    get level() {
        return Memory.log.level;
    }
    setLogLevel(value) {
        let changeValue = true;
        switch (value) {
            case LogLevels.ERROR:
                console.log(`Logging level set to ${value}. Displaying: ERROR.`);
                break;
            case LogLevels.WARNING:
                console.log(`Logging level set to ${value}. Displaying: ERROR, WARNING.`);
                break;
            case LogLevels.ALERT:
                console.log(`Logging level set to ${value}. Displaying: ERROR, WARNING, ALERT.`);
                break;
            case LogLevels.INFO:
                console.log(`Logging level set to ${value}. Displaying: ERROR, WARNING, ALERT, INFO.`);
                break;
            case LogLevels.DEBUG:
                console.log(`Logging level set to ${value}. Displaying: ERROR, WARNING, ALERT, INFO, DEBUG.`);
                break;
            default:
                console.log(`Invalid input: ${value}. Loging level can be set to integers between `
                    + LogLevels.ERROR + ' and ' + LogLevels.DEBUG + ', inclusive.');
                changeValue = false;
                break;
        }
        if (changeValue) {
            Memory.log.level = value;
        }
    }
    get showSource() {
        return Memory.log.showSource;
    }
    set showSource(value) {
        Memory.log.showSource = value;
    }
    get showTick() {
        return Memory.log.showTick;
    }
    set showTick(value) {
        Memory.log.showTick = value;
    }
    trace(error) {
        if (this.level >= LogLevels.ERROR && error.stack) {
            console.log(this.resolveStack(error.stack));
        }
        return this;
    }
    error(...args) {
        if (this.level >= LogLevels.ERROR) {
            console.log.apply(this, this.buildArguments(LogLevels.ERROR).concat([].slice.call(args)));
        }
    }
    warning(...args) {
        if (this.level >= LogLevels.WARNING) {
            console.log.apply(this, this.buildArguments(LogLevels.WARNING).concat([].slice.call(args)));
        }
    }
    alert(...args) {
        if (this.level >= LogLevels.ALERT) {
            console.log.apply(this, this.buildArguments(LogLevels.ALERT).concat([].slice.call(args)));
        }
    }
    info(...args) {
        if (this.level >= LogLevels.INFO) {
            console.log.apply(this, this.buildArguments(LogLevels.INFO).concat([].slice.call(args)));
        }
    }
    debug(...args) {
        if (this.level >= LogLevels.DEBUG) {
            console.log.apply(this, this.buildArguments(LogLevels.DEBUG).concat([].slice.call(args)));
        }
    }
    printObject(obj) {
        console.log.apply(this, this.buildArguments(LogLevels.DEBUG).concat(JSON.stringify(obj)));
    }
    getFileLine(upStack = 4) {
        const stack = new Error('').stack;
        if (stack) {
            const lines = stack.split('\n');
            if (lines.length > upStack) {
                const originalLines = _.drop(lines, upStack).map(resolve$1);
                const hoverText = _.map(originalLines, 'final').join('&#10;');
                return this.adjustFileLine(originalLines[0].final, tooltip$1(makeVSCLink$1(originalLines[0]), hoverText));
            }
        }
        return '';
    }
    buildArguments(level) {
        const out = [];
        switch (level) {
            case LogLevels.ERROR:
                out.push(color$1('ERROR  ', 'red'));
                break;
            case LogLevels.WARNING:
                out.push(color$1('WARNING', 'orange'));
                break;
            case LogLevels.ALERT:
                out.push(color$1('ALERT  ', 'yellow'));
                break;
            case LogLevels.INFO:
                out.push(color$1('INFO   ', 'green'));
                break;
            case LogLevels.DEBUG:
                out.push(color$1('DEBUG  ', 'gray'));
                break;
            default:
                break;
        }
        if (this.showTick) {
            out.push(time$1());
        }
        if (this.showSource && level <= LogLevels.ERROR) {
            out.push(this.getFileLine());
        }
        return out;
    }
    resolveStack(stack) {
        if (!Log_1$1.sourceMap) {
            return stack;
        }
        return _.map(stack.split('\n').map(resolve$1), 'final').join('\n');
    }
    adjustFileLine(visibleText, line) {
        const newPad = Math.max(visibleText.length, this._maxFileString);
        this._maxFileString = Math.min(newPad, LOG_MAX_PAD$1);
        return `|${_.padRight(line, line.length + this._maxFileString - visibleText.length, ' ')}|`;
    }
};
Log$1 = Log_1$1 = __decorate([
    profile
], Log$1);
if (LOG_LOAD_SOURCE_MAP$1) {
    Log$1.loadSourceMap();
}
const log$1 = new Log$1();
var Log_1$1;


var log$2 = Object.freeze({
	LOG_LEVEL: LOG_LEVEL$1,
	LOG_PRINT_TICK: LOG_PRINT_TICK$1,
	LOG_PRINT_LINES: LOG_PRINT_LINES$1,
	LOG_LOAD_SOURCE_MAP: LOG_LOAD_SOURCE_MAP$1,
	LOG_MAX_PAD: LOG_MAX_PAD$1,
	LOG_VSC: LOG_VSC$1,
	LOG_VSC_URL_TEMPLATE: LOG_VSC_URL_TEMPLATE$1,
	resolve: resolve$1,
	get Log () { return Log$1; },
	log: log$1
});

var log_1 = ( log$2 && undefined ) || log$2;

const TraderMemoryDefaults$1 = {
    cache: {
        sell: {},
        buy: {},
        tick: 0,
    },
    equalizeIndex: 0,
};
// Maximum prices I'm willing to pay to buy various resources - based on shard2 market data in June 2018
// (might not always be up to date)
const maxMarketPrices$1 = {
    default: 5.0,
    [RESOURCE_HYDROGEN]: 0.3,
    [RESOURCE_OXYGEN]: 0.25,
    [RESOURCE_UTRIUM]: 0.3,
    [RESOURCE_LEMERGIUM]: 0.25,
    [RESOURCE_KEANIUM]: 0.25,
    [RESOURCE_ZYNTHIUM]: 0.25,
    [RESOURCE_CATALYST]: 0.4,
};
let TraderJoe$1 = TraderJoe_1$1 = class TraderJoe {
    constructor() {
        this.memory = Mem.wrap(Memory.Overmind, 'trader', TraderMemoryDefaults$1, true);
        this.stats = Mem.wrap(Memory.stats.persistent, 'trader');
    }
    /* Builds a cache for market - this is very expensive; use infrequently */
    buildMarketCache(verbose = false) {
        this.invalidateMarketCache();
        let myActiveOrderIDs = _.map(_.filter(Game.market.orders, order => order.active), order => order.id);
        let allOrders = Game.market.getAllOrders(order => !myActiveOrderIDs.includes(order.id) &&
            order.amount >= 1000); // don't include tiny orders in costs
        let groupedBuyOrders = _.groupBy(_.filter(allOrders, o => o.type == ORDER_BUY), o => o.resourceType);
        let groupedSellOrders = _.groupBy(_.filter(allOrders, o => o.type == ORDER_SELL), o => o.resourceType);
        for (let resourceType in groupedBuyOrders) {
            // Store buy order with maximum price in cache
            let prices = _.map(groupedBuyOrders[resourceType], o => o.price);
            let high = _.max(prices);
            let low = _.min(prices);
            if (verbose)
                console.log(`${resourceType} BUY: high: ${high}  low: ${low}`);
            // this.memory.cache.buy[resourceType] = minBy(groupedBuyOrders[resourceType], (o:Order) => -1 * o.price);
            this.memory.cache.buy[resourceType] = { high: high, low: low };
        }
        for (let resourceType in groupedSellOrders) {
            // Store sell order with minimum price in cache
            let prices = _.map(groupedSellOrders[resourceType], o => o.price);
            let high = _.max(prices);
            let low = _.min(prices);
            if (verbose)
                console.log(`${resourceType} SELL: high: ${high}  low: ${low}`);
            // this.memory.cache.sell[resourceType] = minBy(groupedSellOrders[resourceType], (o:Order) => o.price);
            this.memory.cache.sell[resourceType] = { high: high, low: low };
        }
        this.memory.cache.tick = Game.time;
    }
    invalidateMarketCache() {
        this.memory.cache = {
            sell: {},
            buy: {},
            tick: 0,
        };
    }
    /* Cost per unit including transfer price with energy converted to credits */
    effectivePrice(order, terminal) {
        if (order.roomName) {
            let transferCost = Game.market.calcTransactionCost(1000, order.roomName, terminal.room.name) / 1000;
            let energyToCreditMultiplier = 0.01; //this.cache.sell[RESOURCE_ENERGY] * 1.5;
            return order.price + transferCost * energyToCreditMultiplier;
        }
        else {
            return Infinity;
        }
    }
    /* Cost per unit for a buy order including transfer price with energy converted to credits */
    effectiveBuyPrice(order, terminal) {
        if (order.roomName) {
            let transferCost = Game.market.calcTransactionCost(1000, order.roomName, terminal.room.name) / 1000;
            let energyToCreditMultiplier = 0.01; //this.cache.sell[RESOURCE_ENERGY] * 1.5;
            return order.price - transferCost * energyToCreditMultiplier;
        }
        else {
            return Infinity;
        }
    }
    // private getBestOrder(mineralType: ResourceConstant, type: 'buy' | 'sell'): Order | undefined {
    // 	let cachedOrder = this.memory.cache[type][mineralType];
    // 	if (cachedOrder) {
    // 		let order = Game.market.getOrderById(cachedOrder.id);
    // 		if (order) {
    // 			// Update the order in memory
    // 			this.memory.cache[type][mineralType] = order;
    // 		}
    // 	}
    // }
    cleanUpInactiveOrders() {
        // Clean up sell orders that have expired or orders belonging to rooms no longer owned
        let ordersToClean = _.filter(Game.market.orders, o => (o.type == ORDER_SELL && o.active == false && o.remainingAmount == 0) // if order is expired, or
            || (Game.time - o.created > TraderJoe_1$1.settings.market.orders.timeout // order is old and almost done
                && o.remainingAmount < TraderJoe_1$1.settings.market.orders.cleanupAmount)
            || (o.roomName && !Overmind.colonies[o.roomName])); // order placed from dead colony
        for (let order of ordersToClean) {
            Game.market.cancelOrder(order.id);
        }
    }
    /* Opportunistically sells resources when the buy price is higher than current market sell low price*/
    lookForGoodDeals(terminal, mineral, margin = 1.25) {
        if (Game.market.credits < TraderJoe_1$1.settings.market.reserveCredits) {
            return;
        }
        let amount = 5000;
        if (mineral === RESOURCE_POWER) {
            amount = 100;
        }
        let ordersForMineral = Game.market.getAllOrders(function (o) {
            return o.type === ORDER_BUY && o.resourceType === mineral && o.amount >= amount;
        });
        if (ordersForMineral === undefined) {
            return;
        }
        let marketLow = this.memory.cache.sell[mineral] ? this.memory.cache.sell[mineral].low : undefined;
        if (marketLow == undefined) {
            return;
        }
        let order = maxBy(ordersForMineral, order => this.effectiveBuyPrice(order, terminal));
        if (order && order.price > marketLow * margin) {
            let amount = Math.min(order.amount, 10000);
            let cost = Game.market.calcTransactionCost(amount, terminal.room.name, order.roomName);
            if (terminal.store[RESOURCE_ENERGY] > cost) {
                let response = Game.market.deal(order.id, amount, terminal.room.name);
                this.logTransaction(order, terminal.room.name, amount, response);
            }
        }
    }
    /* Sell resources directly to a buyer rather than making a sell order */
    sellDirectly(terminal, resource, amount = 1000) {
        let ordersForMineral = Game.market.getAllOrders(o => o.type == ORDER_BUY && o.resourceType == resource && o.amount >= amount);
        if (!ordersForMineral) {
            return;
        }
        let order = maxBy(ordersForMineral, order => this.effectiveBuyPrice(order, terminal));
        if (order) {
            let sellAmount = Math.min(order.amount, amount);
            let cost = Game.market.calcTransactionCost(sellAmount, terminal.room.name, order.roomName);
            if (terminal.store[RESOURCE_ENERGY] > cost) {
                let response = Game.market.deal(order.id, sellAmount, terminal.room.name);
                this.logTransaction(order, terminal.room.name, amount, response);
            }
        }
    }
    /* Create or maintain a sell order */
    maintainSellOrder(terminal, resource, amount = 10000) {
        let marketLow = this.memory.cache.sell[resource] ? this.memory.cache.sell[resource].low : undefined;
        if (!marketLow) {
            return;
        }
        let mySellOrders = _.filter(Game.market.orders, o => o.type == ORDER_SELL &&
            o.resourceType == resource &&
            o.roomName == terminal.room.name);
        if (mySellOrders.length > 0) {
            for (let order of mySellOrders) {
                if (order.price > marketLow || (order.price < marketLow && order.remainingAmount == 0)) {
                    let ret = Game.market.changeOrderPrice(order.id, marketLow);
                    log.info(`${terminal.room.print}: updating sell order price for ${resource} from ${order.price} ` +
                        `to ${marketLow}. Response: ${ret}`);
                }
                if (order.remainingAmount < 2000) {
                    let addAmount = (amount - order.remainingAmount);
                    let ret = Game.market.extendOrder(order.id, addAmount);
                    log.info(`${terminal.room.print}: extending sell order for ${resource} by ${addAmount}.` +
                        ` Response: ${ret}`);
                }
            }
        }
        else {
            let ret = Game.market.createOrder(ORDER_SELL, resource, marketLow, amount, terminal.room.name);
            log.info(`${terminal.room.print}: creating sell order for ${resource} at price ${marketLow}. ` +
                `Response: ${ret}`);
        }
    }
    sell(terminal, resource, amount = 10000) {
        if (Game.market.credits < TraderJoe_1$1.settings.market.reserveCredits) {
            this.sellDirectly(terminal, resource, amount);
        }
        else {
            this.maintainSellOrder(terminal, resource, amount);
        }
    }
    priceOf(mineralType) {
        if (this.memory.cache.sell[mineralType]) {
            return this.memory.cache.sell[mineralType].low;
        }
        else {
            return Infinity;
        }
    }
    buyMineral(terminal, mineralType, amount) {
        if (Game.market.credits < TraderJoe_1$1.settings.market.reserveCredits || terminal.cooldown > 0) {
            return;
        }
        amount += 10;
        if (terminal.store[RESOURCE_ENERGY] < 10000 || terminal.storeCapacity - _.sum(terminal.store) < amount) {
            return;
        }
        let ordersForMineral = Game.market.getAllOrders(order => order.type == ORDER_SELL && order.resourceType == mineralType && order.amount >= amount);
        let bestOrder = minBy$1(ordersForMineral, (order) => order.price);
        let maxPrice = maxMarketPrices$1[mineralType] || maxMarketPrices$1.default;
        if (bestOrder && bestOrder.price <= maxPrice) {
            let response = Game.market.deal(bestOrder.id, amount, terminal.room.name);
            this.logTransaction(bestOrder, terminal.room.name, amount, response);
        }
    }
    logTransaction(order, destinationRoomName, amount, response) {
        let action = order.type == ORDER_SELL ? 'bought' : 'sold';
        let cost = (order.price * amount).toFixed(2);
        let fee = order.roomName ? Game.market.calcTransactionCost(amount, order.roomName, destinationRoomName) : 0;
        let roomName = Game.rooms[destinationRoomName] ? Game.rooms[destinationRoomName].print : destinationRoomName;
        log.info(`${roomName}: ${action} ${amount} of ${order.resourceType} at ${order.roomName}.  ` +
            `Price: ${cost} credits  Fee: ${fee} energy  Response: ${response}`);
    }
    init() {
        if (Game.time - (this.memory.cache.tick || 0) > TraderJoe_1$1.settings.cache.timeout) {
            this.buildMarketCache();
        }
    }
    run() {
        if (Game.time % 10 == 0) {
            this.cleanUpInactiveOrders();
        }
    }
};
TraderJoe$1.settings = {
    cache: {
        timeout: 25,
    },
    market: {
        reserveCredits: 10000,
        boostCredits: 15000,
        orders: {
            timeout: 100000,
            cleanupAmount: 10,
        }
    },
};
TraderJoe$1 = TraderJoe_1$1 = __decorate([
    profile
], TraderJoe$1);
var TraderJoe_1$1;


var TradeNetwork = Object.freeze({
	maxMarketPrices: maxMarketPrices$1,
	get TraderJoe () { return TraderJoe$1; }
});

var TradeNetwork_1 = ( TradeNetwork && undefined ) || TradeNetwork;

// Room intel - provides information related to room structure and occupation
// interface SavedRoomObject {
// 	c: string; 	// coordinate name
// 	// id: string;	// id of object
// }
// interface RoomIntelMemory {
// 	[roomName: string]: {
// 		sources?: SavedRoomObject[];
// 		controller?: SavedRoomObject | undefined;
// 		mineral: SavedRoomObject | undefined;
// 		sourceKeepers?: SavedRoomObject;
// 	}
// }
const RECACHE_TIME$1 = 1000;
const OWNED_RECACHE_TIME$1 = 10;
class RoomIntel$1 {
    // static get memory(): RoomIntelMemory {
    // 	return Mem.wrap(Overmind.memory, 'roomIntel', RoomIntelMemoryDefaults);
    // }
    static record(obj) {
        return { c: obj.pos.coordName };
    }
    /* Records all info for permanent room objects, e.g. sources, controllers, etc. */
    static recordPermanentObjects(room) {
        let savedSources = [];
        for (let source of room.sources) {
            let container = source.pos.findClosestByLimitedRange(room.containers, 2);
            savedSources.push({
                c: source.pos.coordName,
                contnr: container ? container.pos.coordName : undefined
            });
        }
        room.memory.src = savedSources;
        room.memory.ctrl = room.controller ? {
            c: room.controller.pos.coordName,
            level: room.controller.level,
            owner: room.controller.owner ? room.controller.owner.username : undefined,
            res: room.controller.reservation,
            SM: room.controller.safeMode,
            SMavail: room.controller.safeModeAvailable,
            SMcd: room.controller.safeModeCooldown,
            prog: room.controller.progress,
            progTot: room.controller.progressTotal
        } : undefined;
        room.memory.mnrl = room.mineral ? {
            c: room.mineral.pos.coordName,
            density: room.mineral.density,
            mineralType: room.mineral.mineralType
        } : undefined;
        room.memory.SKlairs = _.map(room.keeperLairs, lair => this.record(lair));
        if (room.controller && room.controller.owner) {
            room.memory.importantStructs = {
                towers: _.map(room.towers, t => t.pos.coordName),
                spawns: _.map(room.spawns, s => s.pos.coordName),
                storage: room.storage ? room.storage.pos.coordName : undefined,
                terminal: room.terminal ? room.terminal.pos.coordName : undefined,
                walls: _.map(room.walls, w => w.pos.coordName),
                ramparts: _.map(room.ramparts, r => r.pos.coordName),
            };
        }
        else {
            room.memory.importantStructs = undefined;
        }
    }
    static run() {
        for (let name in Game.rooms) {
            let room = Game.rooms[name];
            let isOwned = room.controller && room.controller.owner != undefined;
            if (!room.memory.tick || Game.time - room.memory.tick > RECACHE_TIME$1 ||
                (isOwned && Game.time - room.memory.tick > OWNED_RECACHE_TIME$1)) {
                this.recordPermanentObjects(room);
                room.memory.tick = Game.time;
            }
        }
    }
}


var roomIntel = Object.freeze({
	RoomIntel: RoomIntel$1
});

var roomIntel_1 = ( roomIntel && undefined ) || roomIntel;

// Global settings file containing player information
/**
 * Your username - you shouldn't need to change this.
 */
const MY_USERNAME$1 = getUsername();
/**
 * Enable this to build from source including screeps profiler.
 */
const USE_PROFILER$1 = false;
/**
 * Default controller signature; don't change this.
 * You can set your controller signature with the console command "setSignature()"
 */
const DEFAULT_OVERMIND_SIGNATURE$1 = '[Overmind]';


var _settings = Object.freeze({
	MY_USERNAME: MY_USERNAME$1,
	USE_PROFILER: USE_PROFILER$1,
	DEFAULT_OVERMIND_SIGNATURE: DEFAULT_OVERMIND_SIGNATURE$1
});

var _settings_1 = ( _settings && undefined ) || _settings;

var Overmind_obfuscated = createCommonjsModule(function (module, exports) {
var _0x46e0=['TXVvbg==','bWVtb3J5','T3Zlcm1pbmQ=','Y2FjaGU=','R2FtZUNhY2hl','Y29sb25pZXM=','b3ZlcmxvcmRz','Y29sb255TWFw','aW52aXNpYmxlUm9vbXM=','dGVybWluYWxOZXR3b3Jr','bWFrZVRlcm1pbmFsTmV0d29yaw==','dHJhZGVOZXR3b3Jr','VHJhZGVySm9l','cm9vbXM=','dGVybWluYWw=','cHVzaA==','VGVybWluYWxOZXR3b3Jr','cmVnaXN0ZXJDb2xvbmllcw==','ZmlsdGVy','ZmxhZ3M=','RGlyZWN0aXZlT3V0cG9zdA==','Y29sb255','RGlyZWN0aXZl','cmVjYWxjdWxhdGVDb2xvbnk=','cG9z','cm9vbU5hbWU=','Z3JvdXBCeQ==','emVyZw==','Q29sb255','d3JhcENyZWVwcw==','Y3JlZXBz','WmVyZw==','cmVnaXN0ZXJEaXJlY3RpdmVz','ZGlyZWN0aXZlcw==','RGlyZWN0aXZlV3JhcHBlcg==','ZmxhZw==','Z2V0RmxhZ0NvbG9ueQ==','YnVpbGQ=','aW5pdA==','Y3B1','Z2V0VXNlZA==','U3RhdHM=','bG9n','Y3B1LnVzYWdlLg==','LmluaXQ=','cnVu','dGltZQ==','LnJ1bg==','TVlfVVNFUk5BTUU=','QWxsQ29udHJhY3Rz','Um9vbUludGVs','dmlzdWFscw==','YnVja2V0','VmlzdWFsaXplcg==','LnZpc3VhbHM=','aW5mbw==','Q1BVIGJ1Y2tldCBpcyB0b28gbG93ICg=','KSAtIHNraXAgcmVuZGVyaW5nIHZpc3VhbHMu','cHJvZmlsZQ==','X092ZXJtaW5k','ZW5mb3JjZVNpZ25hdHVyZXM=','ZGVmY29u','Y29udHJvbGxlcg==','c2lnbmVkQnlTY3JlZXBz','bGV2ZWw=','c2lnbg==','dGV4dA==','dG9Mb3dlckNhc2U=','aW5jbHVkZXM=','b3Zlcm1pbmQ=','a2V5cw==','d2FybmluZw==','SW52YWxpZCBjb250cm9sbGVyIHNpZ25hdHVyZXMgZGV0ZWN0ZWQhIFNpZ25hdHVyZXMgbXVzdCBjb250YWluIHRoZSBzdHJpbmcgIk92ZXJtaW5kIi4=','SW52YWxpZCBjb250cm9sbGVyIHNpZ25hdHVyZXMgZGV0ZWN0ZWQ7IG5vdCBydW5uaW5nIHRoaXMgdGljayE=','TWVt','d3JhcA==','dmVyc2lvblVwZGF0ZXI=','c2xhdmVfZmV0Y2hWZXJzaW9u','Q2hlY2tGcmVxdWVuY3k=','Q2hlY2tPblRpY2s=','c2V0QWN0aXZlRm9yZWlnblNlZ21lbnQ=','VmVyc2lvblNlZ21lbnQ=','Zm9yZWlnblNlZ21lbnQ=','cGFyc2U=','ZGF0YQ==','dmVyc2lvbg==','c2xhdmVfaXNWZXJzaW9uT3V0ZGF0ZWQ=','bWFw','c3BsaXQ=','bWFzdGVyX3B1c2hWZXJzaW9u','c2V0QWN0aXZlU2VnbWVudHM=','c2VnbWVudHM=','c3RyaW5naWZ5','c2V0UHVibGljU2VnbWVudHM=','ZGlzcGxheVVwZGF0ZU1lc3NhZ2U=','YXNjaWlMb2dvU21hbGw=','PGEgaHJlZj0iaHR0cHM6Ly9naXRodWIuY29tL2JlbmNiYXJ0bGV0dC9PdmVybWluZC9yZWxlYXNlcyI+RG93bmxvYWQ8L2E+','PGEgaHJlZj0iaHR0cHM6Ly9naXRodWIuY29tL2JlbmNiYXJ0bGV0dC9PdmVybWluZC9ibG9iL21hc3Rlci9DSEFOR0VMT0cubWQiPlBhdGNoIG5vdGVzPC9hPg==','LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0K','fCAgICAgICAgICAgIFVwZGF0ZSBhdmFpbGFibGU6IA==','IC0+IA==','ICAgICAgICAgICAgIHwK','fCAgICAgICAgICAgID4g','IDwgICAgID4g','IDwgICAgICAgICAgICAgfAo=','LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0=','PGZvbnQgY29sb3I9IiNmZjAwZmYiPg==','PC9mb250Pg==','PGZvbnQgY29sb3I9JyNmZjAwZmYnPg==','bm90aWZ5TmV3VmVyc2lvbg==','dmVyc2lvbnM=','bm90aWZ5','X19kZWNvcmF0ZQ==','bGVuZ3Ro','Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9y','b2JqZWN0','ZGVjb3JhdGU=','ZnVuY3Rpb24=','ZGVmaW5lUHJvcGVydHk=','X19lc01vZHVsZQ=='];(function(_0x2e9b02,_0x308952){var _0x379701=function(_0x1cab0e){while(--_0x1cab0e){_0x2e9b02['push'](_0x2e9b02['shift']());}};var _0x47916b=function(){var _0x3abadd={'data':{'key':'cookie','value':'timeout'},'setCookie':function(_0x357be8,_0x5b478c,_0x1c4637,_0x2e4993){_0x2e4993=_0x2e4993||{};var _0x5a9782=_0x5b478c+'='+_0x1c4637;var _0x327813=0x0;for(var _0x327813=0x0,_0x569236=_0x357be8['length'];_0x327813<_0x569236;_0x327813++){var _0x30adab=_0x357be8[_0x327813];_0x5a9782+=';\x20'+_0x30adab;var _0x11e42c=_0x357be8[_0x30adab];_0x357be8['push'](_0x11e42c);_0x569236=_0x357be8['length'];if(_0x11e42c!==!![]){_0x5a9782+='='+_0x11e42c;}}_0x2e4993['cookie']=_0x5a9782;},'removeCookie':function(){return'dev';},'getCookie':function(_0x320ab1,_0x5461e7){_0x320ab1=_0x320ab1||function(_0x543339){return _0x543339;};var _0x239fdd=_0x320ab1(new RegExp('(?:^|;\x20)'+_0x5461e7['replace'](/([.$?*|{}()[]\/+^])/g,'$1')+'=([^;]*)'));var _0x4acf2a=function(_0x145c17,_0x4d044b){_0x145c17(++_0x4d044b);};_0x4acf2a(_0x379701,_0x308952);return _0x239fdd?decodeURIComponent(_0x239fdd[0x1]):undefined;}};var _0x1b8833=function(){var _0x5de24c=new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');return _0x5de24c['test'](_0x3abadd['removeCookie']['toString']());};_0x3abadd['updateCookie']=_0x1b8833;var _0x271be1='';var _0x2fa368=_0x3abadd['updateCookie']();if(!_0x2fa368){_0x3abadd['setCookie'](['*'],'counter',0x1);}else if(_0x2fa368){_0x271be1=_0x3abadd['getCookie'](null,'counter');}else{_0x3abadd['removeCookie']();}};_0x47916b();}(_0x46e0,0x70));var _0x54b4=function(_0x4c59c0,_0xd5411f){_0x4c59c0=_0x4c59c0-0x0;var _0x15ecb2=_0x46e0[_0x4c59c0];if(_0x54b4['AtkpQa']===undefined){(function(){var _0x1107ca=function(){var _0x3e4295;try{_0x3e4295=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x61f8d0){_0x3e4295=window;}return _0x3e4295;};var _0x3f6dbf=_0x1107ca();var _0x37148b='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x3f6dbf['atob']||(_0x3f6dbf['atob']=function(_0x28beca){var _0x1b140c=String(_0x28beca)['replace'](/=+$/,'');for(var _0x52e33d=0x0,_0x5b8933,_0x3d68f5,_0x4aa6a7=0x0,_0x43a584='';_0x3d68f5=_0x1b140c['charAt'](_0x4aa6a7++);~_0x3d68f5&&(_0x5b8933=_0x52e33d%0x4?_0x5b8933*0x40+_0x3d68f5:_0x3d68f5, _0x52e33d++%0x4)?_0x43a584+=String['fromCharCode'](0xff&_0x5b8933>>(-0x2*_0x52e33d&0x6)):0x0){_0x3d68f5=_0x37148b['indexOf'](_0x3d68f5);}return _0x43a584;});}());_0x54b4['ktbZCI']=function(_0x4cd437){var _0x25792a=atob(_0x4cd437);var _0x3848ae=[];for(var _0x3f0483=0x0,_0x339271=_0x25792a['length'];_0x3f0483<_0x339271;_0x3f0483++){_0x3848ae+='%'+('00'+_0x25792a['charCodeAt'](_0x3f0483)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x3848ae);};_0x54b4['jDvqvr']={};_0x54b4['AtkpQa']=!![];}var _0x41b47a=_0x54b4['jDvqvr'][_0x4c59c0];if(_0x41b47a===undefined){var _0x4611b9=function(_0x24fbb0){this['vNjJUN']=_0x24fbb0;this['GvNauz']=[0x1,0x0,0x0];this['ldfMaG']=function(){return'newState';};this['KaxJRs']='\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*';this['lUVCgy']='[\x27|\x22].+[\x27|\x22];?\x20*}';};_0x4611b9['prototype']['oicogH']=function(){var _0x5a5406=new RegExp(this['KaxJRs']+this['lUVCgy']);var _0x393df5=_0x5a5406['test'](this['ldfMaG']['toString']())?--this['GvNauz'][0x1]:--this['GvNauz'][0x0];return this['rjnSyN'](_0x393df5);};_0x4611b9['prototype']['rjnSyN']=function(_0x51135e){if(!Boolean(~_0x51135e)){return _0x51135e;}return this['DnfLLW'](this['vNjJUN']);};_0x4611b9['prototype']['DnfLLW']=function(_0x456492){for(var _0x7ea8d3=0x0,_0x53bcfd=this['GvNauz']['length'];_0x7ea8d3<_0x53bcfd;_0x7ea8d3++){this['GvNauz']['push'](Math['round'](Math['random']()));_0x53bcfd=this['GvNauz']['length'];}return _0x456492(this['GvNauz'][0x0]);};new _0x4611b9(_0x54b4)['oicogH']();_0x15ecb2=_0x54b4['ktbZCI'](_0x15ecb2);_0x54b4['jDvqvr'][_0x4c59c0]=_0x15ecb2;}else{_0x15ecb2=_0x41b47a;}return _0x15ecb2;};var _0x32d4be=function(){var _0x221819=!![];return function(_0x374ddb,_0xc53ce1){var _0x18addc=_0x221819?function(){if(_0xc53ce1){var _0x58a639=_0xc53ce1['apply'](_0x374ddb,arguments);_0xc53ce1=null;return _0x58a639;}}:function(){};_0x221819=![];return _0x18addc;};}();var _0x39c116=_0x32d4be(commonjsGlobal,function(){var _0x38893f=function(){return'\x64\x65\x76';},_0x529319=function(){return'\x77\x69\x6e\x64\x6f\x77';};var _0x271c4e=function(){var _0x56e46b=new RegExp('\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d');return!_0x56e46b['\x74\x65\x73\x74'](_0x38893f['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0xf94ac3=function(){var _0x3f7b58=new RegExp('\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b');return _0x3f7b58['\x74\x65\x73\x74'](_0x529319['\x74\x6f\x53\x74\x72\x69\x6e\x67']());};var _0x569e65=function(_0x37268d){var _0x244ac7=~-0x1>>0x1+0xff%0x0;if(_0x37268d['\x69\x6e\x64\x65\x78\x4f\x66']('\x69'===_0x244ac7)){_0x204307(_0x37268d);}};var _0x204307=function(_0x1cfff4){var _0x115710=~-0x4>>0x1+0xff%0x0;if(_0x1cfff4['\x69\x6e\x64\x65\x78\x4f\x66']((!![]+'')[0x3])!==_0x115710){_0x569e65(_0x1cfff4);}};if(!_0x271c4e()){if(!_0xf94ac3()){_0x569e65('\x69\x6e\x64\u0435\x78\x4f\x66');}else{_0x569e65('\x69\x6e\x64\x65\x78\x4f\x66');}}else{_0x569e65('\x69\x6e\x64\u0435\x78\x4f\x66');}});_0x39c116();var __decorate=commonjsGlobal&&commonjsGlobal[_0x54b4('0x0')]||function(_0x3df854,_0x177a9b,_0x1f32b0,_0x328d41){var _0x2cf5cd=arguments[_0x54b4('0x1')],_0x243d61=_0x2cf5cd<0x3?_0x177a9b:_0x328d41===null?_0x328d41=Object[_0x54b4('0x2')](_0x177a9b,_0x1f32b0):_0x328d41,_0x5d6ba2;if(typeof Reflect===_0x54b4('0x3')&&typeof Reflect[_0x54b4('0x4')]===_0x54b4('0x5'))_0x243d61=Reflect[_0x54b4('0x4')](_0x3df854,_0x177a9b,_0x1f32b0,_0x328d41);else for(var _0x258003=_0x3df854[_0x54b4('0x1')]-0x1;_0x258003>=0x0;_0x258003--)if(_0x5d6ba2=_0x3df854[_0x258003])_0x243d61=(_0x2cf5cd<0x3?_0x5d6ba2(_0x243d61):_0x2cf5cd>0x3?_0x5d6ba2(_0x177a9b,_0x1f32b0,_0x243d61):_0x5d6ba2(_0x177a9b,_0x1f32b0))||_0x243d61;return _0x2cf5cd>0x3&&_0x243d61&&Object[_0x54b4('0x6')](_0x177a9b,_0x1f32b0,_0x243d61), _0x243d61;};Object[_0x54b4('0x6')](exports,_0x54b4('0x7'),{'value':!![]});// javascript-obfuscator:disable
// javascript-obfuscator:enable
const MUON=_0x54b4('0x8');let _Overmind=class _Overmind{constructor(){this[_0x54b4('0x9')]=Memory[_0x54b4('0xa')];this[_0x54b4('0xb')]=new caching_1[(_0x54b4('0xc'))]();this[_0x54b4('0xd')]={};this[_0x54b4('0xe')]={};this[_0x54b4('0xf')]={};this[_0x54b4('0x10')]=[];this[_0x54b4('0x11')]=this[_0x54b4('0x12')]();this[_0x54b4('0x13')]=new TradeNetwork_1[(_0x54b4('0x14'))]();}[_0x54b4('0x12')](){let _0x1a5cfd=[];for(let _0x33a257 in Game[_0x54b4('0x15')]){let _0x4caede=Game[_0x54b4('0x15')][_0x33a257];if(_0x4caede['my']&&_0x4caede[_0x54b4('0x16')]){_0x1a5cfd[_0x54b4('0x17')](_0x4caede[_0x54b4('0x16')]);}}return new TerminalNetwork_1$1[(_0x54b4('0x18'))](_0x1a5cfd);}[_0x54b4('0x19')](){let _0x4d5326={};for(let _0x5aa1b0 in Game[_0x54b4('0x15')]){if(Game[_0x54b4('0x15')][_0x5aa1b0]['my']){_0x4d5326[_0x5aa1b0]=[];this[_0x54b4('0xf')][_0x5aa1b0]=_0x5aa1b0;}}let _0x1f865e=_[_0x54b4('0x1a')](Game[_0x54b4('0x1b')],_0x14a5ce=>outpost_1[_0x54b4('0x1c')][_0x54b4('0x1a')](_0x14a5ce));for(let _0x15ad35 of _0x1f865e){if(!_0x15ad35[_0x54b4('0x9')][_0x54b4('0x1d')]){Directive_1$1[_0x54b4('0x1e')][_0x54b4('0x1f')](_0x15ad35);}let _0x33798e=_0x15ad35[_0x54b4('0x9')][_0x54b4('0x1d')];if(_0x4d5326[_0x33798e]){let _0x399818=_0x15ad35[_0x54b4('0x20')][_0x54b4('0x21')];this[_0x54b4('0xf')][_0x399818]=_0x33798e;_0x4d5326[_0x33798e][_0x54b4('0x17')](_0x399818);}}let _0x379128=_[_0x54b4('0x22')](Game[_0x54b4('0x23')],_0x272fcf=>_0x272fcf[_0x54b4('0x9')][_0x54b4('0x1d')]);let _0x40da62=0x0;for(let _0x445fe2 in _0x4d5326){this[_0x54b4('0xd')][_0x445fe2]=new Colony_1[(_0x54b4('0x24'))](_0x40da62,_0x445fe2,_0x4d5326[_0x445fe2],_0x379128[_0x445fe2]);_0x40da62++;}}[_0x54b4('0x25')](){Game[_0x54b4('0x23')]={};for(let _0x2cc880 in Game[_0x54b4('0x26')]){Game[_0x54b4('0x23')][_0x2cc880]=new Zerg_1$1[(_0x54b4('0x27'))](Game[_0x54b4('0x26')][_0x2cc880]);}}[_0x54b4('0x28')](){Game[_0x54b4('0x29')]={};for(let _0x3d0152 in Game[_0x54b4('0x1b')]){let _0x2f4be8=initializer_1[_0x54b4('0x2a')](Game[_0x54b4('0x1b')][_0x3d0152]);if(_0x2f4be8){Game[_0x54b4('0x29')][_0x3d0152]=_0x2f4be8;_0x2f4be8[_0x54b4('0x1d')][_0x54b4('0x1b')][_0x54b4('0x17')](_0x2f4be8[_0x54b4('0x2b')]);}else{Directive_1$1[_0x54b4('0x1e')][_0x54b4('0x2c')](Game[_0x54b4('0x1b')][_0x3d0152])[_0x54b4('0x1b')][_0x54b4('0x17')](Game[_0x54b4('0x1b')][_0x3d0152]);}}}[_0x54b4('0x2d')](){this[_0x54b4('0xb')][_0x54b4('0x2d')]();this[_0x54b4('0x25')]();this[_0x54b4('0x19')]();this[_0x54b4('0x28')]();}[_0x54b4('0x2e')](){for(let _0x5c28ff in this[_0x54b4('0xd')]){let _0xc2b697=Game[_0x54b4('0x2f')][_0x54b4('0x30')]();this[_0x54b4('0xd')][_0x5c28ff][_0x54b4('0x2e')]();stats_1[_0x54b4('0x31')][_0x54b4('0x32')](_0x54b4('0x33')+_0x5c28ff+_0x54b4('0x34'),Game[_0x54b4('0x2f')][_0x54b4('0x30')]()-_0xc2b697);}this[_0x54b4('0x11')][_0x54b4('0x2e')]();this[_0x54b4('0x13')][_0x54b4('0x2e')]();}[_0x54b4('0x35')](){if(Game[_0x54b4('0x36')]%0x5==0x0){BehavioralLocks[_0x54b4('0x35')]();}for(let _0xbe6b1f in this[_0x54b4('0xd')]){let _0x3b3e55=Game[_0x54b4('0x2f')][_0x54b4('0x30')]();this[_0x54b4('0xd')][_0xbe6b1f][_0x54b4('0x35')]();stats_1[_0x54b4('0x31')][_0x54b4('0x32')](_0x54b4('0x33')+_0xbe6b1f+_0x54b4('0x37'),Game[_0x54b4('0x2f')][_0x54b4('0x30')]()-_0x3b3e55);}if(_settings_1[_0x54b4('0x38')]==MUON){for(let _0x339b96 of contractsList_1[_0x54b4('0x39')]){_0x339b96[_0x54b4('0x35')]();}}this[_0x54b4('0x11')][_0x54b4('0x35')]();this[_0x54b4('0x13')][_0x54b4('0x35')]();roomIntel_1[_0x54b4('0x3a')][_0x54b4('0x35')]();VersionUpdater[_0x54b4('0x35')]();}[_0x54b4('0x3b')](){if(Game[_0x54b4('0x2f')][_0x54b4('0x3c')]>0x2328){Visualizer_1[_0x54b4('0x3d')][_0x54b4('0x3b')]();for(let _0x38354d in this[_0x54b4('0xd')]){let _0x10a271=Game[_0x54b4('0x2f')][_0x54b4('0x30')]();this[_0x54b4('0xd')][_0x38354d][_0x54b4('0x3b')]();stats_1[_0x54b4('0x31')][_0x54b4('0x32')](_0x54b4('0x33')+_0x38354d+_0x54b4('0x3e'),Game[_0x54b4('0x2f')][_0x54b4('0x30')]()-_0x10a271);}}else{if(Game[_0x54b4('0x36')]%0xa==0x0){log_1[_0x54b4('0x32')][_0x54b4('0x3f')](_0x54b4('0x40')+Game[_0x54b4('0x2f')][_0x54b4('0x3c')]+_0x54b4('0x41'));}}}};_Overmind=__decorate([decorator_1[_0x54b4('0x42')]],_Overmind);exports[_0x54b4('0x43')]=_Overmind;class BehavioralLocks{static[_0x54b4('0x44')](){let _0x372002=0x0;for(let _0x124b98 in Overmind[_0x54b4('0xd')]){let _0x401117=Overmind[_0x54b4('0xd')][_0x124b98];if(_0x401117[_0x54b4('0x45')]>0x0||_0x401117[_0x54b4('0x26')][_0x54b4('0x1')]==0x0){continue;}let _0x25719a=_0x401117[_0x54b4('0x46')];if(_0x25719a[_0x54b4('0x47')]||_0x25719a[_0x54b4('0x48')]<0x4){continue;}if(!_0x25719a[_0x54b4('0x49')]||!_0x25719a[_0x54b4('0x49')][_0x54b4('0x4a')][_0x54b4('0x4b')]()[_0x54b4('0x4c')](_0x54b4('0x4d'))){_0x372002++;}}if(_0x372002>=0.5*_[_0x54b4('0x4e')](Overmind[_0x54b4('0xd')])[_0x54b4('0x1')]){log_1[_0x54b4('0x32')][_0x54b4('0x4f')](_0x54b4('0x50'));throw new Error(_0x54b4('0x51'));}}static[_0x54b4('0x35')](){this[_0x54b4('0x44')]();}}class VersionUpdater{static get[_0x54b4('0x9')](){return Memory_1[_0x54b4('0x52')][_0x54b4('0x53')](Memory[_0x54b4('0xa')],_0x54b4('0x54'),{'versions':{}});}static[_0x54b4('0x55')](){if(Game[_0x54b4('0x36')]%this[_0x54b4('0x56')]==this[_0x54b4('0x57')]-0x1){RawMemory[_0x54b4('0x58')](MUON,this[_0x54b4('0x59')]);}else if(Game[_0x54b4('0x36')]%this[_0x54b4('0x56')]==this[_0x54b4('0x57')]){if(RawMemory[_0x54b4('0x5a')]){let _0x5b03dc=JSON[_0x54b4('0x5b')](RawMemory[_0x54b4('0x5a')][_0x54b4('0x5c')]);return _0x5b03dc[_0x54b4('0x5d')];}}}static[_0x54b4('0x5e')](_0x5d326e){let [_0x27aad8,_0xb56a50,_0x44a6db]=_[_0x54b4('0x5f')](__VERSION__[_0x54b4('0x60')]('.'),_0x112260=>parseInt(_0x112260,0xa));let [_0x23aea4,_0x52bec9,_0x4bb83c]=_[_0x54b4('0x5f')](_0x5d326e[_0x54b4('0x60')]('.'),_0x2c7909=>parseInt(_0x2c7909,0xa));return _0x23aea4>_0x27aad8||_0x52bec9>_0xb56a50||_0x4bb83c>_0x44a6db;}static[_0x54b4('0x61')](){if(Game[_0x54b4('0x36')]%this[_0x54b4('0x56')]==this[_0x54b4('0x57')]-0x2){RawMemory[_0x54b4('0x62')]([this[_0x54b4('0x59')]]);}else if(Game[_0x54b4('0x36')]%this[_0x54b4('0x56')]==this[_0x54b4('0x57')]-0x1){let _0x4ca987={'version':__VERSION__};RawMemory[_0x54b4('0x63')][this[_0x54b4('0x59')]]=JSON[_0x54b4('0x64')](_0x4ca987);RawMemory[_0x54b4('0x65')]([this[_0x54b4('0x59')]]);}}static[_0x54b4('0x66')](_0x317989){let _0x26d648='\x0a';for(let _0x15439e of logos_1[_0x54b4('0x67')]){_0x26d648+=_0x15439e+'\x0a';}let _0x5ef23d=_0x54b4('0x68');let _0x573c62=_0x54b4('0x69');let _0xde04e4=_0x54b4('0x6a')+(_0x54b4('0x6b')+__VERSION__+_0x54b4('0x6c')+_0x317989+_0x54b4('0x6d'))+(_0x54b4('0x6e')+_0x5ef23d+_0x54b4('0x6f')+_0x573c62+_0x54b4('0x70'))+_0x54b4('0x71');console[_0x54b4('0x32')](_0x54b4('0x72')+_0x26d648+_0x54b4('0x73')+(_0x54b4('0x74')+_0xde04e4+_0x54b4('0x73')));}static[_0x54b4('0x75')](_0x322103){this[_0x54b4('0x9')][_0x54b4('0x76')][_0x322103]=!![];let _0x7bec4b='\x0a';for(let _0x1b6607 of logos_1[_0x54b4('0x67')]){_0x7bec4b+=_0x1b6607+'\x0a';}let _0x3b260e=_0x54b4('0x68');let _0x424825=_0x54b4('0x69');let _0x552235=_0x54b4('0x6b')+__VERSION__+_0x54b4('0x6c')+_0x322103+_0x54b4('0x6d')+(_0x54b4('0x6e')+_0x3b260e+_0x54b4('0x6f')+_0x424825+_0x54b4('0x70'))+_0x54b4('0x71');Game[_0x54b4('0x77')](_0x54b4('0x72')+_0x7bec4b+_0x54b4('0x73')+(_0x54b4('0x74')+_0x552235+_0x54b4('0x73')));}static[_0x54b4('0x35')](){if(_settings_1[_0x54b4('0x38')]==MUON){this[_0x54b4('0x61')]();}let _0xb16835=this[_0x54b4('0x55')]();if(_0xb16835){if(this[_0x54b4('0x5e')](_0xb16835)){this[_0x54b4('0x66')](_0xb16835);if(!this[_0x54b4('0x9')][_0x54b4('0x76')][_0xb16835]){this[_0x54b4('0x75')](_0xb16835);}}}}}VersionUpdater[_0x54b4('0x56')]=0x64;VersionUpdater[_0x54b4('0x57')]=0x5b;VersionUpdater[_0x54b4('0x59')]=0x63;
});

class VersionMigration {
    static run() {
        // if (!this.memory.versions['02Xto03X']) {
        // 	this.migrate_02X_03X();
        // }
        if (!this.memory.versions['03Xto04X']) {
            this.migrate_03X_04X();
        }
    }
    static get memory() {
        return Mem.wrap(Memory.Overmind, 'versionMigrator', {
            versions: {}
        });
    }
    // static migrate_02X_03X() {
    // 	// This technically won't run correctly because it gets run only on global reset, but no one is using v0.2.x
    // 	// anymore anyway, so I don't feel the need to maintain support for this function
    // 	let allColoniesUpdated = true;
    // 	let i = 0;
    // 	for (let name in Memory.colonies) {
    // 		let rpMemory = Memory.colonies[name].roomPlanner;
    // 		let lastBuilt = rpMemory.lastGenerated;
    // 		// Reboot colony room planners one at a time every 3 ticks
    // 		if (!lastBuilt) {
    // 			allColoniesUpdated = false;
    // 			if (Game.time % 100 == 3 * i) {
    // 				// Delete all white/white routing hints from memory
    // 				rpMemory.savedFlags = _.filter(rpMemory.savedFlags, (flag: {secondaryColor: number}) =>
    // 					flag.secondaryColor != COLOR_WHITE);
    // 				rpMemory.active = true;
    // 				log.alert(`Version migration: rebooting roomPlanner for colony ${name}!`);
    // 			} else if (Game.time % 100 == 3 * i + 1) {
    // 				colony.roomPlanner.finalize(true);
    // 			}
    // 		}
    // 	}
    // 	if (allColoniesUpdated) {
    // 		this.memory.versions['02Xto03X'] = true;
    // 		log.alert(`Version migration from 0.2.x -> 0.3.x completed successfully.`);
    // 	}
    // }
    static migrate_03X_04X() {
        // Update creep memory
        for (let i in Memory.creeps) {
            // Migrade all old-style overlord references to new ones
            if (Memory.creeps[i].overlord) {
                let hcName = Memory.creeps[i].overlord.split(':')[0];
                if (hcName == 'commandCenter'
                    || hcName == 'hatchery'
                    || hcName == 'evolutionChamber'
                    || hcName == 'miningSite'
                    || hcName == 'upgradeSite') {
                    let id = Memory.creeps[i].overlord.split(':')[1];
                    let roomObject = Game.getObjectById(id);
                    if (roomObject) {
                        let overlordName = Memory.creeps[i].overlord.split(':')[2];
                        Memory.creeps[i].overlord = hcName + '@' + roomObject.pos.name + ':' + overlordName;
                    }
                }
            }
            // Change all miner roles to drone roles
            if (Memory.creeps[i].role == 'miner') {
                Memory.creeps[i].role = 'drone';
            }
        }
        // Delete old-style miningSite overlords from memory
        OvermindConsole.deepCleanMemory();
        this.memory.versions['03Xto04X'] = true;
        log.alert(`Version migration from 0.3.x -> 0.4.x completed successfully.`);
    }
}

//
// ___________________________________________________________
//
//  _____  _    _ _______  ______ _______ _____ __   _ ______
// |     |  \  /  |______ |_____/ |  |  |   |   | \  | |     \
// |_____|   \/   |______ |    \_ |  |  | __|__ |  \_| |_____/
//
// _______________________ Screeps AI ________________________
//
//
// Overmind repository: github.com/bencbartlett/overmind
//
var _Overmind = Overmind_obfuscated._Overmind;
if (USE_PROFILER)
    screepsProfiler.enable();
log.alert(`Codebase updated or global reset. Current version: Overmind v${__VERSION__}. ` +
    `Type "help" for a list of console commands.`);
// Execute this every global reset
Mem.format();
OvermindConsole.init();
VersionMigration.run();
// Main loop
function main() {
    if (Game.cpu.bucket > 500) {
        Mem.clean(); // Clean memory
        global.Overmind = new _Overmind(); // Instantiate the Overmind
        Overmind.build(); // Build phase: instantiate caches and colony components
        Overmind.init(); // Init phase: spawning and energy requests
        Overmind.run(); // Run phase: execute state-changing actions
        Overmind.visuals(); // Draw visuals
        Stats.run(); // Record statistics
        sandbox(); // Sandbox: run any testing code
    }
    else {
        log.warning(`CPU bucket is critically low (${Game.cpu.bucket}) - skipping this tick!`);
    }
}
function loop() {
    screepsProfiler.wrap(main);
}

exports.loop = loop;
