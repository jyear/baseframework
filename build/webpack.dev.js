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
        historyApiFallback: {
            index: '/index.html'
        },
        open: true,
        inline: true,
        hot: true,
        contentBase: path.join(RootPath, './dist'),
        port: 8081,
        host: 'localhost',
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin,X-Requested-With,Content-Type,Accept',
            'Access-Control-Allow-Methods': 'GET,POST'
        },
        before: function(app, server, compiler) {
            //throw new Error('dsdsdsd');
            app.log.warn('dsdsd');
            app.get('*', (req, res, next) => {
                // console.log(req);
                // if (
                //     (req.method === 'GET' || req.method === 'HEAD') &&
                //     req.accepts('text/html')
                // ) {
                //     (res.sendFile || res.sendfile).call(
                //         res,
                //         path.join(__dirname, '../dist/index.html'),
                //         err => err && next()
                //     );
                // } else next();、
                // res.send('dsdsdsd');
                // res.type('.html').send(
                //     path.join(__dirname, '../dist/index.html')
                // );
                next();

                res.status(404)
                    .sendStatus(200)
                    .send(path.join(__dirname, '../dist/index.html'));
            });
        } //处理别人请求webpack-dev-server文件跨域
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};
