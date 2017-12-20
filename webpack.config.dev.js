const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { output: publicPath, productName } = require('./package.json')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    config: './src/config',
  },
  output: {
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: productName,
      hash: true,
      template: 'src/index.ejs',
      chunksSortMode: 'manual',
      chunks: ['config', 'app'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true },
          },
        ],
        include: [path.resolve(__dirname, 'src')],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, publicPath),
    hot: true,
    open: true,
  },
}
