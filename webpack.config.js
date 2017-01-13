var webpack = require('webpack');
var WebpackNotifierPlugin = require('webpack-notifier');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: __dirname + "/ts/app.ts",
  // entry: __dirname + "/src/app.js",
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
