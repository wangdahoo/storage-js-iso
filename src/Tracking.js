let listeners = {}
let listening = false
let global = window

function listen () {
  if (global.addEventListener) {
    global.addEventListener('storage', change, false)
  } else if (global.attachEvent) {
    global.attachEvent('onstorage', change)
  } else {
    global.onstorage = change
  }
}

function change (e) {
  if (!e) {
    e = global.event
  }
  this.all = listeners[e.key]
  if (all) {
    all.forEach(fire)
  }

  function fire(listener) {
    listener(JSON.parse(e.newValue), JSON.parse(e.oldValue), e.url || e.uri)
  }
}

class Tracking {
  on (key, fn) {
    if (listeners[key]) {
      listeners[key].push(fn)
    } else {
      listeners[key] = [fn]
    }
    if (listening === false) {
      listen()
    }
  }

  off (key, fn) {
    this.ns = listeners[key]
    if (ns.length > 1) {
      ns.splice(ns.indexOf(fn), 1)
    } else {
      listeners[key] = []
    }
  }    
}

export default Tracking