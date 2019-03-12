import {
    SET_CATEGORIES,
} from '../types';
import {
    Commit,
} from 'vuex';
import { ICategory } from '@/api/model';
import { getCategories } from '@/api/category';


export interface State {
    categories: ICategory[],
};

interface IActionContext {
    commit: Commit;
    state: State;
}

// initial state
// shape: [{ id, quantity }]
const initState: State = {
    categories: [],
};

// getters
const getters = {};

// actions
const actions = {
    getCategories(context: IActionContext) {
        return new Promise((resolve, reject) => {
            if (context.state.categories && context.state.categories.length > 0) {
                resolve(context.state.categories);
                return;
            }
            getCategories().then(res => {
                context.commit(SET_CATEGORIES, res.data);
                resolve(res.data);
            }).catch(reject);
        });
    },
};

// mutations
const mutations = {
    [SET_CATEGORIES](state: State, categories: ICategory[]) {
        state.categories = categories;
    },
};

export default {
    state: initState,
    getters,
    actions,
    mutations,
}