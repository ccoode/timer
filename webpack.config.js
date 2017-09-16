const merge = require('webpack-merge')

module.exports = (env = {}) => {
  const common = merge([require('./webpack.config.base'), require('./webpack.config.fa')])
  if (env.production === true) {
    process.env.NODE_ENV = 'production'
    return merge(common, require('./webpack.config.prod'))
  }
  process.env.NODE_ENV = 'development'
  return merge(common, require('./webpack.config.dev'))
}
