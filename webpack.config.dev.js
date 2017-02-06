const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/app.jsx',
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
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' }
          ]
        })
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000' }
    ]
  },
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new ExtractTextPlugin("main.css"),
  ]
};
