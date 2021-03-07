if (process.env.NODE_MODULE === 'production') {
  module.exports = require('./prod')
} else {
  module.exports = require('./dev')
}