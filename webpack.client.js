require("babel-polyfill");
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const debug = process.env.NODE_ENV !== "production";

if (debug) {
  console.log('Looks like we are in development mode!');
}

const config = {
  // Root File of server app
  devtool: debug ? "inline-sourcemap" : 'source-map',
  entry: ['babel-polyfill', './src/app/js/index.js', './src/app/styles/main.scss'],

  // Directory to output bundle file
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'public'),
  }
};

module.exports = merge(baseConfig, config);