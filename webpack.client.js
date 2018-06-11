require('babel-polyfill');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const debug = process.env.NODE_ENV !== 'production';

const config = {
  // Root File of server app
  devtool: debug ? 'inline-sourcemap' : 'source-map',
  entry: ['babel-polyfill', './src/app/js/index.js', './src/app/styles/main.scss'],

  // Directory to output bundle file
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'build'),
      },
    ]),
  ],
};

module.exports = merge(baseConfig, config);
