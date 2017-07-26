const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const publicPath = 'public'
const resolve = {
  extensions: ['.js', '.json', '.jsx']
}

const extractMainCSS = new ExtractTextPlugin('css/main.css')
const extractFWCSS = new ExtractTextPlugin('css/font-awesome.min.css')
const plugins = [
  extractMainCSS,
  extractFWCSS,
  new HtmlWebpackPlugin({
    title: 'Timer',
    template: 'src/index.ejs',
    filename: '../index.html',
    scripts: ['config.js'],
    minify: {
      collapseWhitespace: true
    }
  })
]

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
    use: extractMainCSS.extract(['css-loader', 'postcss-loader']),
    exclude: [
      path.resolve('node_modules/font-awesome')
    ]
  },
  {
    test: /font-awesome\.min\.css$/,
    use: extractFWCSS.extract('css-loader')
  },
  {
    test: /\.(woff|woff2|eot|ttf|svg)(\?[\s\S]+)?$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/',
        publicPath: '../fonts/'
      }
    }]
  },
  {
    test: /\.wav$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'audio/',
        publicPath: 'assets/audio/'
      }
    }]
  }
]

module.exports = (env = {}) => {
  const isProduction = env.production === true

  if (isProduction) {
    [
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
      }),
      new CopyWebpackPlugin([
        { from: 'src/config.js', to: '..' }
      ])
    ].forEach(x => plugins.push(x))
  }

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, `${publicPath}/assets`),
      filename: 'bundle.js',
      publicPath: 'assets/'
    },
    resolve,
    plugins,
    module: { rules },
    devServer: {
      contentBase: path.resolve(__dirname, publicPath)
    }
  }
}
