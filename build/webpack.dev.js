const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const RootPath = process.cwd();

var config = {
    mode: 'development',
    output: {
        path: path.join(process.cwd(), './dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    devtool: false,
    module: {
        rules: [{
            test: /\.(le|c)ss$/,
            use: [
                // {
                //   loader: MiniCssExtractPlugin.loader
                // },
                'style-loader',
                'css-loader',
                'postcss-loader',
                'less-loader'
            ]
        }]
    },
    devServer: {
        historyApiFallback: true,
        open: true,
        inline: true,
        hot: true,
        contentBase: path.join(process.cwd(), './dist/'),
        port: 8090,
        host: 'localhost',
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin,X-Requested-With,Content-Type,Accept',
            'Access-Control-Allow-Methods': 'GET,POST'
        },
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
module.exports = config