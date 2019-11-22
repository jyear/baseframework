var baseConfig = require('./build/webpack.base');
var webpackMerge = require('webpack-merge');
var env = process.env.NODE_ENV;

var config;
if (env == 'development') {
    config = webpackMerge(baseConfig, require('./build/webpack.dev'));
}

module.exports = config;
