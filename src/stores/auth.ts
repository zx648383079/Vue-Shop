import { defineStore } from "pinia";
import type { ILogin, IUser } from "../api/model";
import { getSessionStorage, removeSessionStorage, setSessionStorage } from "../utils";
import { TOKEN_KEY } from "./types";
import { getProfile, login, logout } from "../api/user";


interface AuthState {
    token: string|null;
    user: IUser|null;
}

export const useAuthStore = defineStore('auth', {
    state(): AuthState {
        return {
            token: null,
            user: null
        };
    },
    getters: {
        isGuest(state) {
            if (state.user) {
                return false;
            }
            const token = getSessionStorage<string>(TOKEN_KEY);
            return !token;
        }
    },
    actions: {
        getToken() {
            if (this.token) {
                return this.token;
            }
            const token = getSessionStorage<string>(TOKEN_KEY);
            if (!token) {
                return token;
            }
            this.setToken(token);
            return token;
        },
        setToken(token: string|null) {
            this.token = token;
            if (token) {
                setSessionStorage(TOKEN_KEY, token);
                return;
            }
            removeSessionStorage(TOKEN_KEY);
            return token;
        },
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
                    this.user = res;
                    resolve(res);
                }).catch(reject);
            });
        },
        setUser(user: IUser) {
            return new Promise<void>((resolve, reject) => {
                this.user = user;
                resolve();
            });
        },
        loginUser(params: ILogin) {
            return login(params).then((res: IUser) => {
                this.setToken(res.token || null);
                this.user = res;
                return res;
            });
        },
        logoutUser() {
            return new Promise<void>((resolve, reject) => {
                const token = getSessionStorage<string>(TOKEN_KEY);
                if (!token) {
                    resolve();
                    return;
                }
                logout().then(() => {
                    this.$reset();
                    resolve();
                }).catch(reject);
            });
        }
    }
    
});