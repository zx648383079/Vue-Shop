// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import Http from './utils/http'
import MintUI from 'mint-ui'
import VueTouch from 'vue-touch'
import {
    TOKEN_KEY
} from './store/types'
import {
    getSessionStorage,
    assetUri
} from './utils'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(MintUI)
Vue.use(Http)
Vue.use(VueTouch, {
    name: 'v-touch'
})

Vue.filter('assets', function (value) {
    if (!value) {
        return null;
    }
    if (value.indexOf('//') >= 0) {
        return value;
    }
    if (value.startsWith('/')) {
        return assetUri + value;
    }
    return assetUri + '/' + value;
})

router.beforeEach((to, from, next) => {
    store.state.token = getSessionStorage(TOKEN_KEY) // 获取本地存储的token
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if (store.state.token !== '') { // 通过vuex state获取当前的token是否存
            next()
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next()
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})