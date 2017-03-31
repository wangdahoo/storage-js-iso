class Stub {
  constructor () {
    this.ms = {}
  }

  getItem (key) {
    return key in this.ms
      ? this.ms[key]
      : null
  }

  setItem (key, value) {
    this.ms[key] = value
    return true
  }

  removeItem (key) {
    return key in ms
      ? delete ms[key]
      : false
  }

  clear () {
    this.ms = {}
    return true
  }
}

export default Stub
