import ToastBox from './Toast.vue';
import Vue from 'vue';
export interface IToastOption {
    message?: string,
    position?: string,
    duration?: number,
    className?: string,
    iconClass?: string
}

const toastPool: ToastBox[]  = [];

const getAnInstance = () => {
    if (toastPool.length > 0) {
        const instance = toastPool[0];
        toastPool.splice(0, 1);
        return instance;
    }
    return new ToastBox({
        el: document.createElement('div'),
    });
};

const returnAnInstance = (instance: ToastBox) => {
    if (instance) {
        toastPool.push(instance);
    }
};

const removeDom = (event: any) => {
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
};

ToastBox.prototype.close = function() {
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    this.closed = true;
    returnAnInstance(this);
};

const Toast = (options: IToastOption | string = {}) => {
    if (typeof options !== 'object') {
        options = {message: options};
    }
    const duration = options.duration || 3000;

    const instance = getAnInstance() as any;
    instance.closed = false;
    clearTimeout(instance.timer);
    instance.message = options.message;
    instance.position = options.position || 'middle';
    instance.className = options.className || '';
    instance.iconClass = options.iconClass || '';
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
        instance.visible = true;
        instance.$el.removeEventListener('transitionend', removeDom);
        if (duration > 0) {
            instance.timer = setTimeout(() => {
                if (instance.closed) {
                    return;
                }
                instance.close();
            }, duration);
        }
    });
    return instance;
};

export default Toast;
