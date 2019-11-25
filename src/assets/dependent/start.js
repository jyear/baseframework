;
(function () {
    Promise.all([
        import('single-spa'),
        import('vue'),
        import('vue-router')
    ]).then(function (modules) {
        var singleSpa = modules[0];
        var Vue = modules[1];
        var VueRouter = modules[2];
        Vue.use(VueRouter);

        singleSpa.registerApplication(
            'app1',
            () => System.import('app1'),
            location => true
        );

        singleSpa.start();
    })
})();