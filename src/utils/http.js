import axios from 'axios'
import router from '@/router'
import {
    Toast
} from 'mint-ui'
import md5 from 'js-md5'
import * as util from './'
import {
    TOKEN_KEY
} from '@/store/types'

axios.defaults.timeout = 60000
axios.defaults.baseURL = util.apiEndpoint

// http request 拦截器
axios.interceptors.request.use(
    config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data)
        config.headers = {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/json'
        }
        const timestamp = util.getCurrentTime()
        const sign = md5(util.appId + timestamp + util.secret)
        if (!config.params) {
            config.params = {}
        } 
        config.params['appid'] = util.appId
        config.params['timestamp'] = timestamp
        config.params['sign'] = sign
        const token = util.getSessionStorage(TOKEN_KEY)
        if (token) {
            config.params['token'] = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.errCode === 2) {
            router.push({
                path: '/login',
                querry: {
                    redirect: router.currentRoute.fullPath
                } // 从哪个页面跳转
            })
            Toast({
                message: response.data.Message,
                position: 'bottom'
            })
        }
        return response
    },
    error => {
        Toast({
            message: error,
            position: 'bottom'
        })
        return Promise.reject(error)
    }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(response => {
            resolve(response.data)
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data)
            }, err => {
                reject(err)
            })
    })
}

export default {
    install(Vue) {
        Vue.prototype.$post = post
        Vue.prototype.$fetch = fetch
        Vue.prototype.$patch = patch
        Vue.prototype.$put = put
    }
}