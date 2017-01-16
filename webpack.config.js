'use strict';
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let publish = '/dist/'; 
let path = __dirname + '/dist/';

let plugins = [];

// 生产环境
if (process.argv.indexOf('-p') > -1) { 
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }));
  publish = __dirname + '/build/';
  path = __dirname + '/build/';
}

plugins.push(new ExtractTextPlugin('[name].css'));
plugins.push(new HtmlWebpackPlugin({
  filename: './index.html',
  template: './src/index.html',
  hash: true
}));
plugins.push(new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'))

module.exports = {
  entry: {
    app: './src/app',
    vendor: ['react', 'classnames', 'whatwg-fetch', 'react-router', 'react-dom']
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  output: {
    publish,
    path,
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        exclude: /^node_modules$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        exclude: /^node_modules$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ]
  },
  postcss: [autoprefixer],
  plugins
};