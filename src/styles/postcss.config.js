const postcssImport = require('postcss-import')
const postcssCssnext = require('postcss-cssnext')
const postcssCsso = require('postcss-csso')

module.exports = {
  plugins: [
    postcssImport(),
    postcssCssnext({
      browsers: ['last 2 versions', 'ie >= 9'],
      compress: true
    }),
    postcssCsso
  ]
}
