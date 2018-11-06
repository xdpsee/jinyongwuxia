import Storage from 'localforage'

export default {

  key: {
    fontSize: 'reader.font.size',
    fontFamily: 'reader.font.family'
  },

  load (key) {
    return Storage.getItem(key)
  },

  save (key, value) {
    return Storage.setItem(key, value)
  }

}
