import Vue from 'vue';
import ConfirmBox from './ConfirmBox.vue';

const CONFIRM_TEXT = '确定';
const CANCEL_TEXT = '取消';

export interface IConfirmOption {
    title?: string,
    message?: string,
    confirmButtonText?: string,
    cancelButtonText?: string,
}

const defaults = {
    title: '提示',
    message: '',
    type: '',
    showInput: false,
    showClose: true,
    modalFade: false,
    lockScroll: false,
    closeOnClickModal: true,
    inputValue: null,
    inputPlaceholder: '',
    inputPattern: null,
    inputValidator: null,
    inputErrorMessage: '',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonPosition: 'right',
    confirmButtonHighlight: false,
    cancelButtonHighlight: false,
    confirmButtonText: CONFIRM_TEXT,
    cancelButtonText: CANCEL_TEXT,
};

let currentMsg: any;
let instance: any;
let msgQueue: any[] = [];

const defaultCallback = (action: string) => {
    if (currentMsg) {
        const callback = currentMsg.callback;
        if (typeof callback === 'function') {
            callback(action);
        }
        if (currentMsg.resolve) {
            if (action === 'confirm') {
                currentMsg.resolve(action);
            } else if (action === 'cancel' && currentMsg.reject) {
                currentMsg.reject(action);
            }
        }
    }
};

const initInstance = () => {
    instance = new ConfirmBox({
        el: document.createElement('div'),
    });

    instance.callback = defaultCallback;
};

const showNextMsg = () => {
    if (!instance) {
        initInstance();
    }
    if (!instance.isVisible) {
        if (msgQueue.length > 0) {
            currentMsg = msgQueue.shift();

            const options = currentMsg.options;
            for (const prop in options) {
                if (options.hasOwnProperty(prop)) {
                    instance[prop] = options[prop];
                }
            }
            if (options.callback === undefined) {
                instance.callback = defaultCallback;
            }
            ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape'].forEach(prop => {
                if (instance[prop] === undefined) {
                    instance[prop] = true;
                }
            });
            document.body.appendChild(instance.$el);

            Vue.nextTick(() => {
                instance.isVisible = true;
            });
        }
    }
};

(ConfirmBox as any).close = () => {
    if (!instance) {
        return;
    }
    instance.isVisible = false;
    msgQueue = [];
    currentMsg = null;
}
/**
 * 接受路由变化通知，镜像关闭未关闭的弹窗
 */
export const ConfirmRouterNotice = () => {
    if (!instance) {
        return;
    }
    if (instance.isVisible) {
        instance.isVisible = false;
    }
};

export default (message: string, title: string = '提示', options ?: IConfirmOption): Promise < string > => {
    if (!options) {
        options = {};
    }
    options.title = title;
    options.message = message;
    return new Promise((resolve, reject) => {
        msgQueue.push({
            options: Object.assign(defaults, options),
            resolve,
            reject,
        });
        showNextMsg();
    });
}
