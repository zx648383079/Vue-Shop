import {
    SET_CATEGORIES, SET_SUBTOTAL, SET_CART, SET_ADDRESS_LIST, SET_ADDRESS, SET_ORDER,
} from '../types';
import {
    Commit,
} from 'vuex';
import { ICategory, ISubtotal, ICart, IAddress, IOrder } from '@/api/model';
import { getCategories } from '@/api/category';
import { getSubtotal } from '@/api/product';
import { getAddressList } from '@/api/address';
import { dispatchAddressList } from '../dispatches';
import { getOrderInfo } from '@/api/order';


export interface State {
    categories: ICategory[],
    subtotal: ISubtotal | null,
    cart: ICart[];
    addressList: IAddress[];
    address: IAddress | null;
    order: IOrder | null;
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
    addressList: [],
    address: null,
    order: null,
};

// getters
const getters = {
    cart(state: State) {
        return state.cart;
    },
    addressList(state: State) {
        return state.addressList;
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
    getAddressList(context: IActionContext) {
        return new Promise((resolve, reject) => {
            if (context.state.addressList && context.state.addressList.length > 0) {
                resolve(context.state.addressList);
                return;
            }
            getAddressList().then(res => {
                context.commit(SET_ADDRESS_LIST, res.data);
                resolve(res.data);
            }).catch(reject);
        });
    },
    setAddressList(context: IActionContext, data: IAddress[]) {
        context.commit(SET_ADDRESS_LIST, data);
    },
    getAddress(context: IActionContext) {
        return new Promise((resolve, reject) => {
            if (context.state.address) {
                resolve(context.state.address);
                return;
            }
            dispatchAddressList().then(res => {
                for (const item of res) {
                    if (item.is_default) {
                        context.commit(SET_ADDRESS, item);
                        resolve(item);
                        return;
                    }
                }
                resolve();
            }).catch(reject);
        });
    },
    setAddress(context: IActionContext, address: IAddress) {
        context.commit(SET_ADDRESS, address);
    },
    setAddressIfEmpty(context: IActionContext, address: IAddress) {
        if (context.state.address) {
            return;
        }
        context.commit(SET_ADDRESS, address);
    },
    setOrder(context: IActionContext, order: IOrder) {
        context.commit(SET_ORDER, order);
    },
    getOrder(context: IActionContext, id: number) {
        return new Promise((resolve, reject) => {
            if (context.state.order && context.state.order.id === id) {
                resolve(context.state.order);
                return;
            }
            getOrderInfo(id).then(res => {
                context.commit(SET_ORDER, res);
                resolve(res);
                return;
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
    [SET_ADDRESS_LIST](state: State, items: IAddress[]) {
        state.addressList = items;
    },
    [SET_ADDRESS](state: State, item: IAddress) {
        state.address = item;
    },
    [SET_ORDER](state: State, order: IOrder) {
        state.order = order;
    },
};

export default {
    state: initState,
    getters,
    actions,
    mutations,
};
