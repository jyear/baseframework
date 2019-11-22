const HtmlWebpackPlugin = require('html-webpack-plugin');
class insertJS {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        if (HtmlWebpackPlugin.getHooks) {
            compiler.hooks.compilation.tap(
                'HtmlWebpackInjectorPlugin',
                compilation => {
                    HtmlWebpackPlugin.getHooks(
                        'compilation'
                    ).alterAssetTagGroups.tapAsync(
                        'HtmlWebpackInjectorPlugin',
                        (data, callback) => {
                            const tags = [...data.bodyTags, ...data.headTags];
                            var chunks = this.diffTags(tags);
                            data.headTags = this.options.headerChunks;
                            data.bodyTags = this.options.bodyChunks;
                            callback(null, data);
                        }
                    );
                }
            );
        } else {
            compiler.plugin('compilation', compilation => {
                compilation.plugin(
                    'html-webpack-plugin-alter-asset-tags',
                    data => {
                        const tags = [...data.body, ...data.head];
                        const chunks = this.diffTags(tags);
                        data.head = chunks.headerChunks;
                        data.body = chunks.bodyChunks;
                    }
                );
            });
        }
    }
    diffTags(tags) {
        var res = {};
        res.headerChunks = [];
        res.bodyChunks = [];
        tags.forEach(chunk => {
            var chunkName = chunk.attributes.src
            console.log(chunkName)
            if (
                this.options.headerChunks.indexOf(
                    chunkName.replace(/\.js$/, '')
                ) != -1
            ) {
                res.headerChunks.push(chunk);
            } else {
                res.bodyChunks.push(chunk);
            }
        });
        return res;
    }
}
module.exports = insertJS;