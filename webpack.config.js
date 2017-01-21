var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: require.resolve('./config'),
        loader: 'imports-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack
      .optimize
      .UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          warnings: false,
          drop_console: true
        },
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        }
      })
  ]
};
