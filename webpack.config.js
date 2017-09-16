const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const fa = require('./webpack.fa.config')
const BaBelMinify = require('babel-minify-webpack-plugin')

const publicPath = 'public'
const srcInclude = [
  path.resolve(__dirname, 'src')
]
const base = {
  output: {
    path: path.resolve(__dirname, publicPath),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/preact-compat/src')
        ]
      },
      {
        test: /\.wav$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'audio/'
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?[\s\S]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: '../'
          }
        }],
        include: srcInclude
      }
    ]
  }
}

const common = merge(base, fa)

module.exports = (env = {}) => {
  const isProduction = env.production === true
  const entry = {
    app: './src/index.js'
  }
  if (isProduction) {
    process.env.NODE_ENV = 'production'
    const extractMainCSS = new ExtractTextPlugin('css/main.css')
    return merge(common, {
      entry,
      output: {
        publicPath: './'
      },
      plugins: [
        extractMainCSS,
        new HtmlWebpackPlugin({
          title: 'Timer',
          template: 'src/index.ejs',
          scripts: ['config.js']
        }),
        new CopyWebpackPlugin([
          { from: 'src/config.js', to: '.' }
        ]),
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new BaBelMinify({
          removeConsole: true,
          removeDebugger: true
        }, {
          comments: false
        })
      ],
      module: {
        rules: [
          {
            test: /\.css$/,
            use: extractMainCSS.extract(['css-loader', 'postcss-loader']),
            include: srcInclude
          }
        ]
      }
    })
  }
  entry.config = './src/config.js'
  return merge(common, {
    devtool: 'cheap-module-source-map',
    entry,
    output: {
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Timer',
        template: 'src/index.ejs',
        scripts: ['/config.js'],
        excludeChunks: ['config']
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
          include: srcInclude
        }
      ]
    },
    devServer: {
      contentBase: path.resolve(__dirname, publicPath)
    }
  })
}
