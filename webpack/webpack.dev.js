/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');

const port = process.env.PORT || 3000;

module.exports = merge(common,
  {
    mode: 'development',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      inline: true,
      compress: false,
      progress: true,
      port,
    },
    resolve: {
      symlinks: false,
    },
    performance: false,
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    optimization: {
      namedModules: true,
      namedChunks: true,
    },
  });
