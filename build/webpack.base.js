const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const insertHtml = require('./insertHtml');
const insertJS = require('./insertJS');
const getConfig = require('./setSingleSpaConfig');
const RootPath = process.cwd();

var entries = {};
var cfgs = getConfig();

entries['single-spa'] = path.join(
    __dirname,
    '../node_modules/single-spa/lib/umd/single-spa.min.js'
);
entries['vue'] = path.join(RootPath, './node_modules/vue/dist/vue.js');
entries['systemjs'] = path.join(
    __dirname,
    '../node_modules/systemjs/dist/system.js'
);
entries['import-map-overrides'] = path.join(
    __dirname,
    '../node_modules/import-map-overrides/dist/import-map-overrides.js'
);
entries['amd'] = path.join(
    __dirname,
    '../node_modules/systemjs/dist/extras/amd.min.js'
);
entries['named-exports'] = path.join(
    __dirname,
    '../node_modules/systemjs/dist/extras/named-exports.min.js'
);
entries['named-register'] = path.join(
    __dirname,
    '../node_modules/systemjs/dist/extras/named-register.min.js'
);
entries['use-default'] = path.join(
    __dirname,
    '../node_modules/systemjs/dist/extras/use-default.min.js'
);

entries.app = path.join(RootPath, './src/main.ts');

var config = {
    entry: entries,
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            //'@common': path.join(__dirname, './common/')
        }
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'underscore-template-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(tsx?|js)$/,
                include: RootPath,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader',
                        options: { appendTsxSuffixTo: [/\.vue$/] }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/img/[name].[hash:9].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'assets/font/[name].[hash:9].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(RootPath, './public/index.html'),
            minify: {
                collapseWhitespace: true //折叠空白区域 也就是压缩代码
            },
            // favicon: path.join(__dirname, "../public/favicon.ico"),
            hash: false
        }),
        // new insertJS({
        //     headerChunks: [
        //         'single-spa',
        //         'vue',
        //         'systemjs',
        //         'import-map-overrides',
        //         'amd',
        //         'named-exports',
        //         'named-register',
        //         'use-default'
        //     ]
        // }),
        new insertHtml({
            reg: /\<script type\=\"systemjs\-importmap\"\>\<\/script\>/,
            content: cfgs.importConfig
        }),
        new insertHtml({
            reg: /\<script type\=\"systemjs\-start\"\>\<\/script\>/,
            content: cfgs.startJS
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name]_[chunkhash:9].css',
            chunkFilename: 'assets/css/[id].css'
        })
    ]
};
module.exports = config;
