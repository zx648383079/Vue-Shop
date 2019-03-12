import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import auth from './modules/auth';
import shop from './modules/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    auth,
    shop,
  },
});
