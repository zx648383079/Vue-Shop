import {
    SET_CART,
    SET_CATEGORY
} from '../types'
import {
    getCart
} from '../../api/cart'
import {
    getCategories
} from '../../api/category'

const state = {
    cart: null,
    categories: null
}

const mutations = {
    [SET_CART](state, cart) {
        state.cart = cart
    },
    [SET_CATEGORY](state, categories) {
        state.categories = categories
    }
}

const actions = {
    getCart({
        commit
    }) {
        return getCart().then(res => {
            commit(SET_CART, res.data)
        })
    },
    getCategories({
        commit
    }) {
        return getCategories().then(res => {
            commit(SET_CATEGORY, res.data)
        })
    }
}

const getters = {}

export default {
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
}