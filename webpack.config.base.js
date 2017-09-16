const path = require('path')
const publicPath = require('./package.json').output

const defaultInclude = [path.resolve(__dirname, 'src')]
module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, publicPath),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
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
              failOnError: false,
            },
          },
        ],
        include: defaultInclude,
      },
      {
        test: /\.wav$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'audio/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?[\s\S]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
              publicPath: '../',
            },
          },
        ],
        include: defaultInclude,
      },
    ],
  },
}
