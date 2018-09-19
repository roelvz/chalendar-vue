import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import groupStore from './modules/groupStore'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    auth,
    groupStore,
  },
  strict: debug,
  actions: {
    clearAll({commit}) {
      commit("groupStore/reset");
      commit("auth/reset");
    }
  }
  // plugins: debug ? [createLogger()] : []
})
