import { Md5 } from 'ts-md5';
import Cookies from 'js-cookie';
import { Toast } from 'mint-ui';
import { dispatchSetToken } from '@/store/dispatches';

export const apiEndpoint = 'http://zodream.localhost/open/';
export const assetUri = 'http://zodream.localhost';
export const appId = '11543906547';
export const secret = '012e936d3d3653b40c6fc5a32e4ea685';

interface IAppParam {
    appid: string,
    timestamp: string,
    sign: string,
}

export function getAuthUri(type: string, redirectUri: string): string {
    const params = getAppParams();
    return apiEndpoint + 'auth/oauth?appid=' + params.appid +
     '&timestamp=' + params.timestamp + '&sign=' + params.sign + '&type=' +
     type + '&redirect_uri=' +
     encodeURIComponent(window.location.protocol + '//' +
        window.location.hostname +
        (window.location.port !== '80' ? ':' + window.location.port : '') +
        window.location.pathname + '#') + redirectUri;
}

export function getAppParams(): IAppParam {
    const timestamp = getCurrentTime();
    const sign = Md5.hashStr(appId + timestamp + secret) + '';
    return {
        appid: appId,
        timestamp,
        sign,
    };
}

export function checkTokenFromCookie() {
    const key = appId + 'token';
    const data = Cookies.getJSON(key);
    if (!data) {
        return;
    }
    Cookies.remove(key);
    if (data.code !== 200) {
        Toast(data.error);
        return;
    }
    dispatchSetToken(data.token);
}

export function setLocalStorage(key: string, value: any) {
    let val = value;
    if (typeof value !== 'string') {
        val = JSON.stringify(value);
    }
    window.localStorage.setItem(key, val);
}

export function getLocalStorage<T>(key: string, decode = false): T {
    const val = window.localStorage.getItem(key);
    return !val || !decode ? val : JSON.parse(val);
}

export function removeLocalStorage(key: string) {
    window.localStorage.removeItem(key);
}

export function setSessionStorage(key: string, value: any) {
    let val = value;
    if (typeof value !== 'string') {
        val = JSON.stringify(value);
    }
    window.sessionStorage.setItem(key, val);
}

export function getSessionStorage<T>(key: string, decode = false): T {
    const val = window.sessionStorage.getItem(key);
    return !val || !decode ? val : JSON.parse(val);
}

export function removeSessionStorage(key: string) {
    window.sessionStorage.removeItem(key);
}

export function search(key: string) {
    const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
    const url = window.location.hash === '' ?
        window.location.search :
        window.location.hash.substring(window.location.hash.indexOf('?'));
    const r = url.substr(1).match(reg);
    return r === null ? null : unescape(r[2]);
}

export function getCurrentTime() {
    return formatTime(new Date());
}

export function twoPad(i: number): string {
    return i < 10 ? '0' + i : i + '';
}

export function parseDate(date: any): Date {
    if (!date) {
        return new Date();
    }
    if (typeof date === 'object') {
        return date;
    }
    if (typeof date === 'string' && date.indexOf('-') > 0) {
        date.replace('-', '/');
    }
    if (typeof date === 'number' && ('' + date).length  === 10) {
        date *= 1000;
    }
    date = new Date(date);
    if (isNaN(date.getTime())) {
        return new Date();
    }
    return date;
}

export function formatTime(time: Date) {
    return time.getFullYear() +
        '-' + twoPad(time.getMonth() + 1) +
        '-' + twoPad(time.getDate()) +
        ' ' + twoPad(time.getHours()) +
        ':' + twoPad(time.getMinutes()) +
        ':' + twoPad(time.getSeconds())
}

export function each(data: any, cb: (val: any, key: string | number) => boolean| void) {
    if (typeof data !== 'object') {
        return cb(data, 0);
    }
    if (data instanceof Array) {
        for (let i = 0; i < data.length; i++) {
            if (cb(data[i], i) === false) {
                return;
            }
        }
        return;
    }
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            if (cb(data[key], key) === false) {
                return;
            }
        }
    }
}
