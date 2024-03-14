'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/screen-fit.cjs.prod.js')
} else {
  module.exports = require('./dist/screen-fit.cjs.js')
}
