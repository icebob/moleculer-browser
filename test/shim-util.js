// Minimal util shim for browser
module.exports = {
  format: function () {
    return Array.prototype.slice.call(arguments).map(function (a) {
      return typeof a === 'object' ? JSON.stringify(a) : String(a)
    }).join(' ')
  },
  inspect: function (obj) { return JSON.stringify(obj) },
  types: {
    isDate: function (v) { return v instanceof Date },
    isRegExp: function (v) { return v instanceof RegExp },
    isMap: function (v) { return v instanceof Map },
    isSet: function (v) { return v instanceof Set }
  }
}
