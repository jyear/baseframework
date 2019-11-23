import Vue from 'vue';

import App from './App.vue';

// var routes = new Router({
//     mode: 'history',
//     //base: process.env.BASE_URL,
//     routes: [
//         // {
//         //   path: '/app2',
//         //   name: 'home',
//         //   component: Home
//         // },
//         // {
//         //   path: '/app2/about',
//         //   name: 'about',
//         //   // route level code-splitting
//         //   // this generates a separate chunk (about.[hash].js) for this route
//         //   // which is lazy-loaded when the route is visited.
//         //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
//         // }
//     ]
// });

new Vue({
    render: h => h(App)
}).$mount('#baseFramework');
