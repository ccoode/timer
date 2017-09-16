const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BaBelMinify = require('babel-minify-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { output: publicPath, productName } = require('./package.json')

const extractMainCSS = new ExtractTextPlugin('css/main.css')

module.exports = {
  output: {
    publicPath: './',
  },
  plugins: [
    new CleanWebpackPlugin([`./${publicPath}`]),
    extractMainCSS,
    new HtmlWebpackPlugin({
      title: productName,
      template: 'src/index.ejs',
      scripts: ['config.js'],
      hash: true,
    }),
    new CopyWebpackPlugin([{ from: 'src/config.js', to: '.' }]),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new BaBelMinify(
      {
        removeConsole: true,
        removeDebugger: true,
      },
      {
        comments: false,
      }
    ),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractMainCSS.extract(['css-loader', 'postcss-loader']),
        include: [path.resolve(__dirname, 'src')],
      },
    ],
  },
}
