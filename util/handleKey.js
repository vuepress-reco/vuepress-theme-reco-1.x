const key = {
  set (val) {
    sessionStorage.setItem('key', val)
  },
  get (key) {
    return sessionStorage.getItem(key)
  },
  remove (key) {
    sessionStorage.removeItem(key)
  },
  isHasKey (keys) {
    return keys.indexOf(this.get('key')) > -1
  }
}

export default key