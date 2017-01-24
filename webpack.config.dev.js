const path = require('path');

module.exports = {
  entry: './app/main.jsx',
  output: {
    path: path.resolve(__dirname, "assets"),
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
        test: require.resolve('./config'),
        loader: 'imports-loader'
      }
    ]
  }
};
