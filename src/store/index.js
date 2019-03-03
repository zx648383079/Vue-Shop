import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import auth from './modules/auth'
import shop from './modules/shop'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    shop
  },
  getters
})
