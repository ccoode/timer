const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const publicPath = 'public'
const resolve = {
  extensions: ['.js', '.json', '.jsx']
}
const plugins = [
  new ExtractTextPlugin('css/[name].css'),
  new CopyWebpackPlugin([
    { from: 'node_modules/font-awesome/css/font-awesome.min.css', to: 'css' },
    { from: 'node_modules/font-awesome/fonts', to: 'fonts' }
  ])
]
const productionPlugins = [
  new BabiliPlugin(
    {
      removeConsole: true,
      removeDebugger: true
    },
    {
      comments: false
    }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
]
const devPlugins = []

const rules = [
  {
    test: /\.js[x]?$/,
    use: [
      { loader: 'babel-loader' },
      {
        loader: 'eslint-loader',
        options: {
          failOnWarning: false,
          failOnError: false
        }
      }
    ],
    include: [
      path.resolve('src'),
      path.resolve('node_modules/preact-compat/src')
    ]
  },
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        { loader: 'css-loader' },
        { loader: 'postcss-loader' }
      ]
    })
  },
  {
    test: /\.(woff|woff2|eot|ttf|svg)(\?[\s\S]+)?$/,
    loader: 'file-loader?name=fonts/[name].[ext]'
  }
]

module.exports = (env = {}) => {
  const isProduction = env.production === true
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, `${publicPath}/assets`),
      filename: 'bundle.js',
      publicPath: 'assets/'
    },
    resolve,
    module: { rules },
    plugins: isProduction ? plugins.concat(productionPlugins) : plugins.concat(devPlugins),
    devServer: {
      contentBase: path.resolve(__dirname, publicPath)
    }
  }
}
