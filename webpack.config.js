const webpack = require('webpack');
const devConfig = require('./webpack.config.dev');

module.exports = {
  entry: devConfig.entry,
  output: devConfig.output,
  module: devConfig.module,
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
