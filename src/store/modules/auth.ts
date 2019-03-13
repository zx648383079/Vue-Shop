import {
    SET_USER, TOKEN_KEY,
} from '../types';
import {
    Commit,
} from 'vuex';
import { IUser } from '@/api/model';
import { getSessionStorage } from '@/utils';
import { getProfile } from '@/api/user';


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
const getters = {};

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