var baseConfig = require('./build/webpack.base');
var webpackMerge = require('webpack-merge');
var env = process.env.NODE_ENV;

var config;

if (env == 'development') {
    var devConfig = require('./build/webpack.dev.js')
    config = webpackMerge(baseConfig, devConfig);
}

module.exports = config;