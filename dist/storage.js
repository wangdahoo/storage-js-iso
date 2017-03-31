(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.$storage = factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Stub = function () {
  function Stub() {
    classCallCheck(this, Stub);

    this.ms = {};
  }

  createClass(Stub, [{
    key: "getItem",
    value: function getItem(key) {
      return key in this.ms ? this.ms[key] : null;
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      this.ms[key] = value;
      return true;
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      return key in ms ? delete ms[key] : false;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ms = {};
      return true;
    }
  }]);
  return Stub;
}();

var listeners = {};
var listening = false;
var global$2 = window;

function listen() {
  if (global$2.addEventListener) {
    global$2.addEventListener('storage', change, false);
  } else if (global$2.attachEvent) {
    global$2.attachEvent('onstorage', change);
  } else {
    global$2.onstorage = change;
  }
}

function change(e) {
  if (!e) {
    e = global$2.event;
  }
  this.all = listeners[e.key];
  if (all) {
    all.forEach(fire);
  }

  function fire(listener) {
    listener(JSON.parse(e.newValue), JSON.parse(e.oldValue), e.url || e.uri);
  }
}

var Tracking = function () {
  function Tracking() {
    classCallCheck(this, Tracking);
  }

  createClass(Tracking, [{
    key: 'on',
    value: function on(key, fn) {
      if (listeners[key]) {
        listeners[key].push(fn);
      } else {
        listeners[key] = [fn];
      }
      if (listening === false) {
        listen();
      }
    }
  }, {
    key: 'off',
    value: function off(key, fn) {
      this.ns = listeners[key];
      if (ns.length > 1) {
        ns.splice(ns.indexOf(fn), 1);
      } else {
        listeners[key] = [];
      }
    }
  }]);
  return Tracking;
}();

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

var stub = new Stub();
var tracking = new Tracking();
var ls = 'localStorage' in global$1 && global$1.localStorage ? global$1.localStorage : stub;

var Storage = function () {
  function Storage() {
    classCallCheck(this, Storage);

    if (!isStorageSupported(ls)) {
      ls = stub;
    }
  }

  createClass(Storage, [{
    key: 'get',
    value: function get$$1(key) {
      try {
        return JSON.parse(ls.getItem(key));
      } catch (e) {
        return ls.getItem(key);
      }
    }
  }, {
    key: 'set',
    value: function set$$1(key, value) {
      try {
        ls.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        return false;
      }
    }
  }, {
    key: 'remove',
    value: function remove(key) {
      return ls.removeItem(key);
    }
  }, {
    key: 'clear',
    value: function clear() {
      return ls.clear();
    }
  }, {
    key: 'on',
    value: function on(key, fn) {
      tracking.on(key, fn);
    }
  }, {
    key: 'off',
    value: function off(key, fn) {
      tracking.on(key, fn);
    }
  }]);
  return Storage;
}();

var index = new Storage();

return index;

})));
