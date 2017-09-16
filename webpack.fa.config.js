const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractFA = new ExtractTextPlugin('css/font-awesome.min.css')
const faInclude = [
  path.resolve(__dirname, 'node_modules/font-awesome/')
]
const faCSS = {
  test: /font-awesome\.min\.css$/,
  use: extractFA.extract('css-loader'),
  include: faInclude
}
const faFont = {
  test: /\.(woff|woff2|eot|ttf|svg)(\?[\s\S]+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts/',
      publicPath: '../'
    }
  }],
  include: faInclude
}

module.exports = {
  module: {
    rules: [
      faCSS,
      faFont
    ]
  },
  plugins: [extractFA]
}
