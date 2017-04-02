import Stub from './Stub'
import Event from './Event'
import { STORAGE_EVENT_TYPE, SEPERATOR } from './constants'

let global = window

const isStorageSupported = (localStorage) => {
  let supported = localStorage

  // When Safari (OS X or iOS) is in private browsing mode, it appears as though localStorage
  // is available, but trying to call .setItem throws an exception below:
  // "QUOTA_EXCEEDED_ERR: DOM Exception 22: An attempt was made to add something to storage that exceeded the quota."
  if (supported) {
    let key = '__' + Math.round(Math.random() * 1e7)

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

let ls = 'localStorage' in global && global.localStorage ? global.localStorage : Stub

if (!isStorageSupported(ls)) {
  ls = Stub
}

const initEventName = (key) => {
  return `${STORAGE_EVENT_TYPE}${SEPERATOR}${key}`
}

export default {
  get (key) {
    try {
      return JSON.parse(ls.getItem(key))
    } catch(e) {
      return ls.getItem(key)
    }
  },

  set (key, value) {
    try {
      ls.setItem(key, JSON.stringify(value))
      let eventName = initEventName(key)
      Event.fireEvent(eventName, this.get(key))
      return true
    } catch (e) {
      return false
    }
  },

  remove (key) {
    return ls.removeItem(key)
  },

  clear () {
    return ls.clear()
  },

  on (key, fn) {
    let eventName = initEventName(key)
    Event.addEvent(eventName, fn)
  },

  off (key, fn) {
    let eventName = initEventName(key)
    Event.removeEvent(eventName, fn)
  }
}
