import _ from 'lodash'

export const apiEndpoint = 'http://zodream.localhost/open/'
export const assetUri = 'http://zodream.localhost'
export const appId = '11543906547'
export const secret = '012e936d3d3653b40c6fc5a32e4ea685'

export const setLocalStorage = (key, value) => {
    if (!key) return;
    let val = value;
    if (typeof value !== 'string') {
        val = JSON.stringify(value);
    }
    window.localStorage.setItem(key, val);
}

export const getLocalStorage = (key, decode = false) => {
    if (!key) return;
    let val = window.localStorage.getItem(key);
    return !val || !decode ? val : JSON.parse(val);
}

export const removeLocalStorage = (key) => {
    if (!key) return;
    window.localStorage.removeItem(key);
}

export const setSessionStorage = (key, value) => {
    if (!key) return;
    let val = value;
    if (typeof value !== 'string') {
        val = JSON.stringify(value);
    }
    window.sessionStorage.setItem(key, val);
}

export const getSessionStorage = (key, decode = false) => {
    if (!key) return;
    let val = window.sessionStorage.getItem(key);
    return !val || !decode ? val : JSON.parse(val);
}

export const removeSessionStorage = (key) => {
    if (!key) return;
    window.sessionStorage.removeItem(key);
}

export const search = (key) => {
    if (!key) return;
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var url = window.location.hash == '' ? window.location.search : window.location.hash.substring(window.location.hash.indexOf('?'));
    var r = url.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram
    let oldScrollTop

    document.addEventListener('scroll', () => {
        showBackFun()
    }, false)
    document.addEventListener('touchstart', () => {
        showBackFun()
    }, {
        passive: true
    })

    document.addEventListener('touchmove', () => {
        showBackFun()
    }, {
        passive: true
    })

    document.addEventListener('touchend', () => {
        oldScrollTop = document.body.scrollTop | document.documentElement.scrollTop;
        moveEnd()
    }, {
        passive: true
    })

    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop | document.documentElement.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop | document.documentElement.scrollTop
                moveEnd()
            } else {
                cancelAnimationFrame(requestFram)
            }
            showBackFun()
        })
    }

    // 判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop | document.documentElement.scrollTop > 500) {
            callback(true)
        } else {
            callback(false)
        }
    }
}

export const getCurrentTime = () => {
    const now = new Date()
    const format = i => i < 10 ? '0' + i : i
    return now.getFullYear() +
        '-' + format(now.getMonth() + 1) +
        '-' + format(now.getDate()) +
        ' ' + format(now.getHours()) +
        ':' + format(now.getMinutes()) +
        ':' + format(now.getSeconds())
}