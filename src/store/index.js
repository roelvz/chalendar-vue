import Vue from 'vue'
import Vuex from 'vuex'
import groupStore from './modules/groupStore'
import calendarStore from './modules/calendarStore'
import userStore from './modules/userStore'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    groupStore,
    calendarStore,
    userStore,
  },
  strict: debug,
  actions: {
    clearAll({commit}) {
      commit("groupStore/reset");
      commit("calendarStore/reset");
      commit("userStore/reset");
    }
  }
  // plugins: debug ? [createLogger()] : []
})
