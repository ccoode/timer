const path = require('path');

module.exports = {
  entry: './lib/app.jsx',
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    filename: 'bundle.js',
    publicPath: "/assets/",
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: require.resolve('./dist/config'),
        loader: 'imports-loader'
      }
    ]
  },
  devServer: {
    contentBase: "./dist"
  }
};
