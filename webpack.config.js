const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Config = require('wtf-webpack-config')
const define = require('wtf-webpack-config/plugins/define')
const babili = require('wtf-webpack-config/plugins/babili')
const PostCSSFile = require('wtf-webpack-config/rules/css/postcss-file')
const PostCSSStyle = require('wtf-webpack-config/rules/css/postcss-style')

const fontAwesome = (config) => {
  const extractFWCSS = new ExtractTextPlugin('css/font-awesome.min.css')
  config
    .plugin(extractFWCSS)
    .rule({
      test: /font-awesome\.min\.css$/,
      use: extractFWCSS.extract('css-loader'),
      include: [
        path.resolve('node_modules/font-awesome/')
      ]
    })
    .rule({
      test: /\.(woff|woff2|eot|ttf|svg)(\?[\s\S]+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
          publicPath: '../fonts/'
        }
      }],
      include: [
        path.resolve('node_modules/font-awesome/')
      ]
    })
}

const mainCSS = isProduction => (config) => {
  const cssOpt = {
    include: [
      path.resolve('src')
    ]
  }

  config.rule({
    test: /\.(woff|woff2|eot|ttf|svg)(\?[\s\S]+)?$/,
    use: [{
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/',
        publicPath: '../fonts/'
      }
    }],
    include: cssOpt.include
  })

  if (isProduction) {
    config
      .use(PostCSSFile('css/main.css', cssOpt))
      .use(define())
      .use(babili())
      .plugin(CopyWebpackPlugin, [
        { from: 'src/config.js', to: '..' }
      ])
  } else {
    config.use(PostCSSStyle(cssOpt))
  }
}

const publicPath = 'public'

const config = new Config({
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, `${publicPath}/assets`),
    filename: 'bundle.js',
    publicPath: 'assets/'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    rules: [
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
  },
  devServer: {
    contentBase: path.resolve(__dirname, publicPath)
  }
})

module.exports = (env = {}) => {
  const isProduction = env.production === true
  config
    .use(fontAwesome)
    .use(mainCSS(isProduction))
    .plugin(HtmlWebpackPlugin, {
      title: 'Timer',
      template: 'src/index.ejs',
      filename: '../index.html',
      scripts: ['config.js'],
      minify: {
        collapseWhitespace: true
      }
    })
  return config.toConfig()
}
