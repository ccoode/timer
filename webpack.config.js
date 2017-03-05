const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require("babili-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const publicPath = 'public'

module.exports = (env = {}) => {
  const isProduction = env.production === true
  const plugins =
    [
      new ExtractTextPlugin("css/[name].css"),
      new CopyWebpackPlugin([
        { from: 'src/' + publicPath, to: '..' },
        { from: 'node_modules/font-awesome/css/font-awesome.min.css', to: 'css' },
        { from: 'node_modules/font-awesome/fonts', to: 'fonts' },
      ])
    ]

  if (isProduction) {
    plugins.push(
      new BabiliPlugin({
        removeConsole: true,
        removeDebugger: true,
      }, {
          comments: false
        }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        }
      })
    )
  }
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, publicPath + "/assets"),
      filename: 'bundle.js',
      publicPath: "assets/",
    },
    resolve: {
      alias: {
        "react": "preact-compat",
        "react-dom": "preact-compat",
        "Utils": path.resolve(__dirname, 'src/utils'),
        "Fonts": path.resolve(__dirname, 'src/fonts'),
        "Styles": path.resolve(__dirname, 'src/styles'),
        "Components": path.resolve(__dirname, 'src/components'),
      }
    },
    module: {
      rules: [
        {
          test: /\.js[x]?$/,
          loader: 'babel-loader',
          include: [
            path.resolve('src')
          ]
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              { loader: 'css-loader' },
              { loader: 'postcss-loader' }
            ]
          }),
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)(\?[\s\S]+)?$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, publicPath)
    },
    plugins
  }
}
