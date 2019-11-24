const fs = require('fs');
const path = require('path');

function getConfig() {
    var cfg;
    try {
        cfg = JSON.parse(
            fs.readFileSync(path.join(__dirname, '../config/singlepage.json'))
        );
    } catch (e) {
        console.log(e);
    }
    var SingleSpaConfig = {
        imports: {}
    };

    var str = `
    ;(function() {
      Promise.all([
        System.import('single-spa'),
        System.import('vue'),
        System.import('vue-router')
      ]).then(function(modules) {
        var singleSpa = modules[0];
        var Vue = modules[1];
        var VueRouter = modules[2];
        Vue.use(VueRouter);
       `;

    for (var key in cfg) {
        SingleSpaConfig.imports[key] = cfg[key].src;
        str =
            str +
            `
        singleSpa.registerApplication(
            '${key}',
            () => System.import('${key}'),
            location => ${
                cfg[key].isStart
                    ? 'true'
                    : `location.pathname.startsWith("/${key}")`
            }
          );
        `;
    }
    SingleSpaConfig.imports['single-spa'] =
        'https://cdnjs.cloudflare.com/ajax/libs/single-spa/4.3.7/system/single-spa.min.js';
    SingleSpaConfig.imports['vue'] =
        'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js';
    SingleSpaConfig.imports['vue-router'] =
        'https://cdn.jsdelivr.net/npm/vue-router@3.0.7/dist/vue-router.min.js';
    str =
        str +
        `
                singleSpa.start();
            })
        })();
    `;
    // fs.writeFileSync(path.join(__dirname, '../src/assets/start.js'), str, 'utf8')
    return {
        importConfig: `
        <script type="systemjs-importmap"> ${JSON.stringify(
            SingleSpaConfig
        )}</script>
        `,
        startJS: `<script>${str}</script>`
    };
}
module.exports = getConfig;