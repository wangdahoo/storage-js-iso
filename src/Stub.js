let ms = {}

const getItem = (key) => {
  return key in ms
    ? ms[key]
    : null
}

const setItem = (key, value) => {
  ms[key] = value
  return true
}

const removeItem = (key) => {
  return key in ms
    ? delete ms[key]
    : false
}

const clear = () => {
  ms = {}
  return true
}

export default {
  getItem,
  setItem,
  removeItem,
  clear
}
