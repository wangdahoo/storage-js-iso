import Stub from './Stub'
import Tracking from './Tracking'

let global = window

const isStorageSupported = (localStorage) => {
  let supported = localStorage;

  // When Safari (OS X or iOS) is in private browsing mode, it appears as though localStorage
  // is available, but trying to call .setItem throws an exception below:
  // "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to add something to storage that exceeded the quota."
  if (supported) {
    var key = '__' + Math.round(Math.random() * 1e7)

    try {
      localStorage.setItem(key, key)
      localStorage.removeItem(key)
    }
    catch (err) {
      supported = false
    }
  }

  return supported
}

let stub = new Stub()
let tracking = new Tracking()
let ls = 'localStorage' in global && global.localStorage ? global.localStorage : stub

class Storage {
  constructor () {
    if (!isStorageSupported(ls)) {
      ls = stub;
    }
  }

  get (key) {
    try {
      return JSON.parse(ls.getItem(key))
    } catch(e) {
      return ls.getItem(key)
    }
  }

  set (key, value) {
    try {
      ls.setItem(key, JSON.stringify(value))
      return true
    } catch (e) {
      return false
    }
  }

  remove (key) {
    return ls.removeItem(key)
  }

  clear () {
    return ls.clear()
  }

  on (key, fn) {
    tracking.on(key, fn)
  }

  off (key, fn) {
    tracking.on(key, fn)
  }
}

export default new Storage()
