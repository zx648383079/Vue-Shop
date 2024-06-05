import { Md5 } from "ts-md5";
import * as environment from '../config/config';
import { getCurrentTime, uriEncode } from "../utils";
import { useCache, useCookie, useEncryptor } from "./register";
import { useDialog } from "../components/Dialog";
import { useAuthStore } from "../stores/auth";
import { TOKEN_KEY } from "../stores/types";
import type { ILogin, IRegister, IUser } from "../api/model";
import { login, logout, register } from "../api/user";

interface IAppParam {
    appid: string,
    timestamp: string,
    sign: string,
}

export class AuthService {


    public encrypt<T>(data: T, keys: string[]): T {
        const encryptor = useEncryptor();
        for (const key of keys) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                (data as any)[key] = encryptor.encrypt((data as any)[key]);
            }
        }
        return data;
    }
    
    public login(params: ILogin) {
        return login(this.encrypt(params, ['password'])).then((res: IUser) => {
            const store = useAuthStore();
            store.setToken(res.token || null);
            store.setUser(res);
            return res;
        });
    }

    public register(params: IRegister) {
        return register(this.encrypt(params, ['password'])).then((res: IUser) => {
            const store = useAuthStore();
            store.setToken(res.token || null);
            store.setUser(res);
            return res;
        });
    }
    
    public logout() {
        return new Promise<void>((resolve, reject) => {
            const token = this.getUserToken();
            if (!token) {
                resolve();
                return;
            }
            this.setUserToken();
            logout().then(() => {
                useAuthStore().$reset();
                resolve();
            }).catch(reject);
        });
    }

    private now() {
        // return getCurrentTime();
        return useEncryptor().getCurrentTime();
    }

    /**
     * 保存user 到本地
     * @param user 
     * @param withToken 是否更新token
     */
    public setUser(user: IUser, withToken = true) {
        if (withToken) {
            this.setUserToken(user.token);
        }
    }

    public setUserToken(token?: string|null) {
        if (token) {
            useCache().set(TOKEN_KEY, token);
            return;
        }
        useCache().remove(TOKEN_KEY);
    }

    public getUserToken(): string|null {
        return useCache().get(TOKEN_KEY);
    }


    public checkTokenFromCookie() {
        const key = environment.appId + 'token';
        const cookie = useCookie();
        const str = cookie.get(key);
        if (!str) {
            return;
        }
        const data = JSON.parse(str);
        cookie.delete(key);
        if (data.code !== 200) {
            useDialog().error(data.error);
            return;
        }
        const authStore = useAuthStore();
        authStore.setToken(data.token);
    }

    public getAppParams(): IAppParam {
        const timestamp = this.now();
        const sign = Md5.hashStr(environment.appId + timestamp + environment.secret) + '';
        return {
            appid: environment.appId,
            timestamp,
            sign,
        };
    }

    public authUri(type: string, redirect_uri: string): string {
        return this.apiUri('auth/oauth', {
            type,
            redirect_uri});
    }

    public assetUri(value: string): string|null {
        if (!value) {
            return null;
        }
        if (value.indexOf('//') >= 0) {
            return value;
        }
        if (value.startsWith('/')) {
            return environment.assetUri + value;
        }
        return environment.assetUri + '/' + value;
    }
    
    public apiUri(path: string, queries: Object = {}): string {
        const timestamp = getCurrentTime();
        const sign = Md5.hashStr(environment.appId + timestamp + environment.secret);
        return uriEncode(environment.apiEndpoint + (path.startsWith('/') ? path.substring(1) : path), {
            ...queries,
            appid: environment.appId,
            timestamp,
            sign,
        }, true);
    }
}