(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.$storage = factory());
}(this, (function () { 'use strict';

var ms = {};

var getItem = function getItem(key) {
  return key in ms ? ms[key] : null;
};

var setItem = function setItem(key, value) {
  ms[key] = value;
  return true;
};

var removeItem = function removeItem(key) {
  return key in ms ? delete ms[key] : false;
};

var clear = function clear() {
  ms = {};
  return true;
};

var Stub = {
  getItem: getItem,
  setItem: setItem,
  removeItem: removeItem,
  clear: clear
};

var STORAGE_EVENT_TYPE = 'storage';
var SEPERATOR = '::';

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var listeners = {};

var Event = {
  addEvent: function addEvent(type, fn) {
    if (typeof listeners[type] === 'undefined') {
      listeners[type] = [];
    }
    if (typeof fn === 'function') {
      listeners[type].push(fn);
    }
    return this;
  },
  fireEvent: function fireEvent(type, value) {
    var arrayEvent = listeners[type];
    if (arrayEvent instanceof Array) {
      for (var i = 0; i < arrayEvent.length; i++) {
        if (typeof arrayEvent[i] === 'function') {
          var _type$split = type.split(SEPERATOR),
              _type$split2 = slicedToArray(_type$split, 2),
              eventType = _type$split2[0],
              key = _type$split2[1];

          var event = { type: eventType, key: key, value: value };
          arrayEvent[i](event);
        }
      }
    }
    return this;
  },
  removeEvent: function removeEvent(type, fn) {
    var arrayEvent = listeners[type];
    if (typeof type === 'string' && arrayEvent instanceof Array) {
      if (typeof fn === 'function') {
        // 清除当前 type 类型事件下对应 fn 方法
        for (var i = 0; i < arrayEvent.length; i++) {
          if (arrayEvent[i] === fn) {
            listeners[type].splice(i, 1);
            break;
          }
        }
      } else {
        // 清除所有type类型事件
        delete listeners[type];
      }
    }
    return this;
  }
};

var global$1 = window;

var isStorageSupported = function isStorageSupported(localStorage) {
  var supported = localStorage;

  // When Safari (OS X or iOS) is in private browsing mode, it appears as though localStorage
  // is available, but trying to call .setItem throws an exception below:
  // "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to add something to storage that exceeded the quota."
  if (supported) {
    var key = '__' + Math.round(Math.random() * 1e7);

    try {
      localStorage.setItem(key, key);
      localStorage.removeItem(key);
    } catch (err) {
      supported = false;
    }
  }

  return supported;
};

var ls = 'localStorage' in global$1 && global$1.localStorage ? global$1.localStorage : Stub;

if (!isStorageSupported(ls)) {
  ls = Stub;
}

var initEventName = function initEventName(key) {
  return '' + STORAGE_EVENT_TYPE + SEPERATOR + key;
};

var index = {
  get: function get(key) {
    try {
      return JSON.parse(ls.getItem(key));
    } catch (e) {
      return ls.getItem(key);
    }
  },
  set: function set(key, value) {
    try {
      ls.setItem(key, JSON.stringify(value));
      var eventName = initEventName(key);
      Event.fireEvent(eventName, this.get(key));
      return true;
    } catch (e) {
      return false;
    }
  },
  remove: function remove(key) {
    return ls.removeItem(key);
  },
  clear: function clear() {
    return ls.clear();
  },
  on: function on(key, fn) {
    var eventName = initEventName(key);
    Event.addEvent(eventName, fn);
  },
  off: function off(key, fn) {
    var eventName = initEventName(key);
    Event.removeEvent(eventName, fn);
  }
};

return index;

})));
