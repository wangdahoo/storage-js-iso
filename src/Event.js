let listeners = {}

import { SEPERATOR } from './constants'

export default {
  addEvent (type, fn) {
    if (typeof listeners[type] === 'undefined') {
      listeners[type] = []
    }
    if (typeof fn === 'function') {
      listeners[type].push(fn)
    }
    return this
  },

  fireEvent (type, value) {
    let arrayEvent = listeners[type]
    if (arrayEvent instanceof Array) {
      for (let i = 0; i < arrayEvent.length; i++) {
        if (typeof arrayEvent[i] === 'function') {
          let [eventType, key] = type.split(SEPERATOR)
          let event = {type: eventType, key: key, value: value}
          arrayEvent[i](event)
        }
      }
    }
    return this
  },

  removeEvent (type, fn) {
    let arrayEvent = listeners[type]
    if (typeof type === 'string' && arrayEvent instanceof Array) {
      if (typeof fn === 'function') {
        // 清除当前 type 类型事件下对应 fn 方法
        for (let i = 0; i < arrayEvent.length; i++) {
          if (arrayEvent[i] === fn) {
            listeners[type].splice(i, 1)
            break
          }
        }
      } else {
        // 清除所有type类型事件
        delete listeners[type]
      }
    }
    return this
  }
}
