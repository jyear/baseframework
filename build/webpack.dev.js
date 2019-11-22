const webpack = require('webpack');
const path = require('path');

const RootPath = process.cwd();

var config = {
    mode: 'development',
    output: {
        path: path.join(process.cwd(), './dist'),
        filename: '[name].js'
    },
    devtool: false,
    module: {
        rules: [
            {
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
            }
        ]
    },
    devServer: {
        historyApiFallback: false,
        open: true,
        inline: true,
        hot: true,
        contentBase: path.join(RootPath, './dist'),
        port: 8081,
        host: 'localhost',
        disableHostCheck: true,
        setup: app => {
            app.use('*', (req, res, next) => {
                res.header('Access-Control-Allow-Credentials', 'true');
                res.header('Access-Control-Allow-Origin', '*');
                res.header(
                    'Access-Control-Allow-Headers',
                    'Origin,X-Requested-With,Content-Type,Accept'
                );
                res.header('Access-Control-Allow-Methods', 'GET,POST');
                next();
            });
        } //处理别人请求webpack-dev-server文件跨域
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
