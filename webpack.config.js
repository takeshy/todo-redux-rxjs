//const webpack = require('webpack');
//module.exports = {
//  entry: "./src/app.js",
//  output: {
//    path: __dirname + "/dist",
//    filename: "bundle.js"
//  },
//  devServer: {
//    contentBase: 'dist',
//    inline: true,
//    port: 8080
//  },
//  module: {
//    loaders: [
//      {
//        test: /\.ejs$/,
//        exclude: /node_modules/,
//        loader: 'ejs-compiled-loader'
//      },
//      {
//        test: /\.js$/,
//        exclude: /node_modules/,
//        loader: "babel-loader",
//        query: {
//          presets: ["es2015"]
//        }
//      }
//    ]
//  }
//};
var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: __dirname + "/ts/app.ts",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".ts", ".js"]
  },
  devServer: {
    contentBase: 'dist',
    inline: true,
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        loader: 'ejs-compiled-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel"]
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: ["babel", "ts"]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: "underscore",
      $: "jquery",
      Backbone: "backbone"
    }),
    new LiveReloadPlugin(),
    new WebpackNotifierPlugin({})
  ]
};
