let config = require('./dev')

if (process.env.NODE_ENV === 'production') {
  config = require('./prod')
}

export default config
