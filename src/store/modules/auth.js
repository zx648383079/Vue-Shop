import {
    SET_USER,
    TOKEN_KEY
} from '../types'
import {
    setSessionStorage,
    removeSessionStorage
} from '../../utils'
import {
    login
} from '../../api/user'

const state = {
    user: null,
    addressList: null
}

const mutations = {
    [SET_USER](state, user) {
        state.user = user
    }
}

const actions = {
    login({
        commit
    }, email, password) {
        return login(email, password).then(res => {
            setSessionStorage(TOKEN_KEY, res.token)
            commit(SET_USER, res)
        })
    },
    logout({
        commit
    }) {
        removeSessionStorage(TOKEN_KEY)
        commit(SET_USER, null)
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