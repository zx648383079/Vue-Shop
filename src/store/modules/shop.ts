import {
    SET_CATEGORIES, SET_SUBTOTAL, SET_CART,
} from '../types';
import {
    Commit,
} from 'vuex';
import { ICategory, ISubtotal, ICart } from '@/api/model';
import { getCategories } from '@/api/category';
import { getSubtotal } from '@/api/product';


export interface State {
    categories: ICategory[],
    subtotal: ISubtotal | null,
    cart: ICart[];
};

interface IActionContext {
    commit: Commit;
    state: State;
}

// initial state
// shape: [{ id, quantity }]
const initState: State = {
    categories: [],
    subtotal: null,
    cart: [],
};

// getters
const getters = {
    cart(state: State) {
        return state.cart;
    },
};

// actions
const actions = {
    setCart(context: IActionContext, cart: ICart[]) {
        context.commit(SET_CART, cart);
    },
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
    getSubtotal(context: IActionContext) {
        return new Promise((resolve, reject) => {
            if (context.state.subtotal) {
                resolve(context.state.subtotal);
                return;
            }
            getSubtotal().then(res => {
                context.commit(SET_SUBTOTAL, res);
                resolve(res);
            }).catch(reject);
        });
    },
};

// mutations
const mutations = {
    [SET_CATEGORIES](state: State, categories: ICategory[]) {
        state.categories = categories;
    },
    [SET_SUBTOTAL](state: State, subtotal: ISubtotal) {
        state.subtotal = subtotal;
    },
    [SET_CART](state: State, cart: ICart[]) {
        state.cart = cart;
    },
};

export default {
    state: initState,
    getters,
    actions,
    mutations,
}