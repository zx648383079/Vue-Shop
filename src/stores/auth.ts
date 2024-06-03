import { defineStore } from "pinia";
import type { ILogin, IUser } from "../api/model";
import { getProfile, login, logout } from "../api/user";
import { useAuth } from "../services";


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
            const token = useAuth().getUserToken();
            return !token;
        }
    },
    actions: {
        getToken() {
            if (this.token) {
                return this.token;
            }
            const token = useAuth().getUserToken();
            if (!token) {
                return token;
            }
            this.setToken(token);
            return token;
        },
        setToken(token: string|null) {
            this.token = token;
            useAuth().setUserToken(token);
            return token;
        },
        getUser() {
            return new Promise<IUser|null>((resolve, reject) => {
                if (this.user) {
                    resolve(this.user);
                    return;
                }
                const token = useAuth().getUserToken();
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
                const token = useAuth().getUserToken();
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