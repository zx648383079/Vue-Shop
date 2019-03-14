import {
    SET_USER, TOKEN_KEY,
} from '../types';
import {
    Commit,
} from 'vuex';
import { IUser, ILogin } from '@/api/model';
import { getSessionStorage, setSessionStorage, removeSessionStorage } from '@/utils';
import { getProfile, login, logout } from '@/api/user';


export interface State {
    user: IUser | null,
};

interface IActionContext {
    commit: Commit;
    state: State;
}

// initial state
// shape: [{ id, quantity }]
const initState: State = {
    user: null,
};

// getters
const getters = {
    /**
     * 此方法不验证token的有效性
     * @param state
     */
    isGuest(state: State) {
        if (state.user) {
            return false;
        }
        const token = getSessionStorage<string>(TOKEN_KEY);
        return !token;
    },
};

// actions
const actions = {
    getUser(context: IActionContext) {
        return new Promise((resolve, reject) => {
            if (context.state.user) {
                resolve(context.state.user);
                return;
            }
            const token = getSessionStorage<string>(TOKEN_KEY);
            if (!token) {
                resolve();
                return;
            }
            getProfile().then((res: IUser) => {
                context.commit(SET_USER, res);
                resolve(res);
            }).catch(reject);
        });
    },
    loginUser(context: IActionContext, params: ILogin) {
        return login(params).then((res: IUser) => {
            setSessionStorage(TOKEN_KEY, res.token);
            context.commit(SET_USER, res);
        });
    },
    logoutUser(context: IActionContext) {
        return new Promise((resolve, reject) => {
            const token = getSessionStorage<string>(TOKEN_KEY);
            if (!token) {
                resolve();
                return;
            }
            logout().then(() => {
                context.commit(SET_USER, null);
                removeSessionStorage(TOKEN_KEY);
                resolve();
            }).catch(reject);
        });
    }
};

// mutations
const mutations = {
    [SET_USER](state: State, user: IUser) {
        state.user = user;
    },
};

export default {
    state: initState,
    getters,
    actions,
    mutations,
}