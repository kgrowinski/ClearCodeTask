const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Webpack for node.js
  target: 'node',

  // Root File of server app
  entry: './src/server/index.js',

  // Directory to output bundle file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'server'),
  },

  externals: [
    webpackNodeExternals(),
  ],
};

module.exports = merge(baseConfig, config);
