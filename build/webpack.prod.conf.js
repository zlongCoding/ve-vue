const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpackBaseConf = require('./webpack.base.conf.js');
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const rimraf = require('rimraf');
const merge = require('webpack-merge');
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

rimraf('./dist/sites/', function (err) {
    if (err) console.log(err);
});

rimraf('./dist/veUI.js', function (err) {
    if (err) console.log(err);
});

rimraf('./dist/veUI.css', function (err) {
    if (err) console.log(err);
});

rimraf('./dist/veUI.js.map', function (err) {
    if (err) console.log(err);
});

rimraf('./dist/veUI.css.map', function (err) {
    if (err) console.log(err);
});

module.exports = merge(webpackBaseConf, {
  mode: "production",
  devtool: "source-map",
  entry: {
    index: resolve('../src/app.js'),
  },
  externals: {
    vue: {
      root: "Vue",
      commonjs: "vue",
      commonjs2: "vue",
      amd: "vue",
    },
  },
  output: {
    path: path.resolve(__dirname, "../dist/"),
    filename: "veUI.js",
    library: "veUI",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
  ],
  optimization: {
    minimize: false,
  },
});