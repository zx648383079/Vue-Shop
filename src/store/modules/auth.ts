import {
    SET_USER, TOKEN_KEY, SET_TOKEN,
} from '../types';
import { IUser, ILogin } from '@/api/model';
import { getSessionStorage, setSessionStorage, removeSessionStorage } from '@/utils';
import { getProfile, login, logout } from '@/api/user';
import { Action, Module, Mutation, VuexModule } from 'vuex-class-modules';

@Module({ generateMutationSetters: true })
export class AuthModule extends VuexModule {
    token: string | null = null;
    user: IUser | null = null;

    get isGuest() {
        if (this.user) {
            return false;
        }
        const token = getSessionStorage<string>(TOKEN_KEY);
        return !token;
    }

    @Mutation
    [SET_USER](user: IUser|null) {
        this.user = user;
    }

    @Mutation
    [SET_TOKEN](token: string| null) {
        this.token = token;
        if (token) {
            setSessionStorage(TOKEN_KEY, token);
            return;
        }
        removeSessionStorage(TOKEN_KEY);
    }

    @Action
    getToken() {
        if (this.token) {
            return this.token;
        }
        const token = getSessionStorage<string>(TOKEN_KEY);
        if (!token) {
            return token;
        }
        this[SET_TOKEN](token);
        return token;
    }

    @Action
    setToken(token: string) {
        this[SET_TOKEN](token);
        return token;
    }

    @Action
    getUser() {
        return new Promise<IUser|null>((resolve, reject) => {
            if (this.user) {
                resolve(this.user);
                return;
            }
            const token = getSessionStorage<string>(TOKEN_KEY);
            if (!token) {
                resolve(null);
                return;
            }
            getProfile().then((res: IUser) => {
                this[SET_USER](res);
                resolve(res);
            }).catch(reject);
        });
    }

    @Action
    setUser(user: IUser) {
        return new Promise<void>((resolve, reject) => {
            this[SET_USER](user);
            resolve();
        });
    }

    @Action
    loginUser(params: ILogin) {
        return login(params).then((res: IUser) => {
            this[SET_TOKEN](res.token || null);
            this[SET_USER](res);
            return res;
        });
    }

    @Action
    logoutUser() {
        return new Promise<void>((resolve, reject) => {
            const token = getSessionStorage<string>(TOKEN_KEY);
            if (!token) {
                resolve();
                return;
            }
            logout().then(() => {
                this[SET_TOKEN](null);
                this[SET_USER](null);
                resolve();
            }).catch(reject);
        });
    }

}
