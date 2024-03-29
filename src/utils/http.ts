import axios from 'axios';
import router from '@/router'
import { apiEndpoint } from '../config/config';
import * as util from './'
import { TOKEN_KEY } from '@/stores/types'
import { useDialog } from '../components/Dialog/plugin';

axios.defaults.timeout = 60000
axios.defaults.baseURL = apiEndpoint

// http request 拦截器
axios.interceptors.request.use(
    (config) => {
        if (config.data && !(config.data instanceof FormData)) {
            config.data = JSON.stringify(config.data)
            config.headers.setContentType('application/vnd.api+json').setAccept('application/json');
        }
        const params = util.getAppParams();
        if (!config.params) {
            config.params = {}
        }
        config.params.appid = params.appid;
        config.params.timestamp = params.timestamp;
        config.params.sign = params.sign;
        const token = util.getSessionStorage(TOKEN_KEY)
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

// http response 拦截器
axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        useDialog().error(error && error.response ? error.response.data.message : error);
        if (error && error.response && error.response.status === 401) {
            util.removeSessionStorage(TOKEN_KEY);
            router.push({
                path: '/login',
                query: {
                    redirect: router.currentRoute.value.fullPath,
                }, // 从哪个页面跳转
            })
            return Promise.reject(error);
        }
        return Promise.reject(error);
    },
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch<T>(url: string, params = {}): Promise<T> {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params,
        }).then((response) => {
            resolve(response.data)
        }).catch((err) => {
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
export function post<T>(url: string, data = {}): Promise<T> {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then((response) => {
                resolve(response.data)
            }, (err) => {
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
export function patch<T>(url: string, data = {}): Promise<T> {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then((response) => {
                resolve(response.data)
            }, (err) => {
                reject(err)
            })
    })
}

export function deleteRequest<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        axios.delete(url)
            .then((response) => {
                resolve(response.data)
            }, (err) => {
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
export function put<T>(url: string, data = {}): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        axios.put(url, data)
            .then((response) => {
                resolve(response.data)
            }, (err) => {
                reject(err)
            })
    });
}

export function uploadFile<T>(url: string, file: File, name = 'file'): Promise<T> {
    const data = new FormData();
    data.append(name, file);
    return new Promise<T>((resolve, reject) => {
        axios.post(url, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
            },
          })
            .then((response) => {
                resolve(response.data)
            }, (err) => {
                reject(err)
            })
    });
}

export default {
    install(app: any) {
        app.config.globalProperties.$post = post
        app.config.globalProperties.$fetch = fetch
        app.config.globalProperties.$patch = patch
        app.config.globalProperties.$put = put
    },
}
