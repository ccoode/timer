const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const MiniExtractPlugin = require('mini-css-extract-plugin')
const HandleCSS = require('webpack-handle-css-loader')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

const defaultInclude = [path.resolve(__dirname, 'src')]

module.exports = (env = {}) => {
  const PROD = !!env.production
  const extract = PROD
  const extra = PROD ? '.[contenthash:8]' : ''
  return {
    devtool: PROD ? 'source-map' : 'cheap-module-source-map',
    entry: './src/index.js',
    output: {
      filename: `[name]${extra}.js`,
    },
    mode: PROD ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: defaultInclude,
          options: {
            babelrc: false,
            presets: [
              [
                'dgeibi-react',
                {
                  useBuiltins: 'usage',
                },
              ],
            ],
            plugins: ['react-hot-loader/babel'],
          },
        },
        {
          test: /\.wav$/,
          loader: 'file-loader',
          options: {
            outputPath: 'audio/',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)(\?[\s\S]+)?$/,
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
          },
        },
        new HandleCSS({
          extract,
          minimize: PROD,
          sourceMap: true,
          postcss: {
            ident: 'postcss',
            plugins: loader => [
              require('postcss-import')({ root: loader.resourcePath }),
              require('postcss-preset-env')({
                stage: 3,
                browsers: '> 5%, IE 10',
                features: {
                  'nesting-rules': true,
                },
              }),
              require('postcss-calc')(),
            ],
          },
        }).css(),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.ejs',
        inject: 'head',
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'async',
        defer: [/^main/],
      }),
      extract &&
        new MiniExtractPlugin({
          filename: `[name]${extra}.css`,
        }),
      env.hot && new webpack.HotModuleReplacementPlugin(),
      PROD && new CleanWebpackPlugin(['dist']),
    ].filter(x => !!x),
    devServer: {
      hot: env.hot,
      open: true,
    },
    ...(PROD && {
      optimization: {
        splitChunks: {
          cacheGroups: {
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|fbjs)[\\/]/,
              chunks: 'all',
            },
          },
        },
      },
    }),
  }
}
