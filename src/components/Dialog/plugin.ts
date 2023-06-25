import { createApp, type App, type Plugin, type InjectionKey, nextTick, inject, getCurrentInstance} from "vue";
import DialogContainer from './DialogContainer.vue';
import type { IErrorResponse } from "../../api/model";
import type { AxiosError } from "axios";

export const dialogInjectionKey: InjectionKey<string> = Symbol('dailog');
interface DialogOption {
    [key: string]: any;
    visible?: boolean;
    content?: string;   //内容
    closeAnimate?: boolean;
    target?: any;           // 载体 显示在那个内容上，默认全局, position 需要自己设置 relative、absolute、fixed
    onClosing?: () => any; // 关闭请求， 是否关闭， 返回false 为不关闭
}

export interface DialogTipOption extends DialogOption {
    time?: number;         //显示时间
    id?: any;
    type: string;
}


export interface DialogConfirmOption extends DialogOption {
    title?: string;
    icon?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

class DialogSerive {

    private guid = 0;
    private container: any;

    public ready(container: any) {
        this.container = container;
    }    

    private formatError(error: string|IErrorResponse|AxiosError): string {
        if (typeof error != 'object') {
            return error;
        }
        if (error.response) {
            return (error as AxiosError<IErrorResponse>).response?.data?.message || error.message;
        }
        return (error as IErrorResponse).message;
    }

    public error(message: string|IErrorResponse|AxiosError) {
        this.createMessage({
            content: this.formatError(message),
            type: 'error'
        });
    }

    public warning(message: string|IErrorResponse|AxiosError) {
        this.createMessage({
            content: this.formatError(message),
            type: 'waining'
        });
    }

    public success(message: string) {
        this.createMessage({
            content: this.formatError(message),
            type: 'success'
        });
    }

    public tip(content: string): void;
    public tip(content: string, time: number): void;
    public tip(option: DialogTipOption): void;
    public tip(option: string|DialogTipOption, time = 2000) {
        const opt = typeof option === 'object' ? option : {
            content: option,
            time,
        };
        this.createMessage({
            content: opt.content,
            time: opt.time,
            type: 'info'
        });
    }

    public confirm(content: string): Promise<any>;
    public confirm(content: string, onConfirm: () => void): void;
    public confirm(option: DialogConfirmOption): Promise<any>;
    public confirm(option: DialogConfirmOption|string, onConfirm?: () => void): Promise<any>|void {
        const opt = typeof option === 'object' ? option : {
            content: option,
            onConfirm,
        };
        if (!onConfirm) {
            return new Promise((resolve, reject) =>{
                opt.onConfirm = () => {
                    resolve(1);
                };
                opt.onCancel = () => {
                    reject();
                }
                this.createDailog(opt);
            });
        }
        this.createDailog(opt);
    }

    private createMessage(option: DialogTipOption) {
        if (!this.container) {
            return;
        }
        option.id = ++ this.guid;
        this.container.addToast(option);
    }

    private createDailog(option: DialogConfirmOption) {
        if (!this.container) {
            return;
        }
        this.container.addConfirm(option);
    }

}

export function useDialog(): DialogSerive {
    return getCurrentInstance()
        ? inject<DialogSerive>(dialogInjectionKey, new DialogSerive())
        : new DialogSerive();
}

export function createDialog(): Plugin {
    return (app: App) => {
        const service = new DialogSerive();
        nextTick(() => {
            const container = createApp(DialogContainer);
            const component = container.mount(document.createElement('div'));
            service.ready(component);
        });
        app.provide<DialogSerive>(dialogInjectionKey, service);
    };
}