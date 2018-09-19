import GroupApi from "../../api/GroupApi";

const groupApi = new GroupApi();

const state = {
  groups: [],
  loadedGroup: {},
};

const getters = {};

const actions = {
  initGroups({commit}) {
    groupApi.getGroups()
      .then(result => {
        commit('setGroups', result);
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },

  loadGroup({commit}, id) {
    groupApi.getGroup(id)
      .then(result => {
        commit('setLoadedGroup', result)
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },
};

const mutations = {
  setGroups(state, groups) {
    state.groups = groups;
  },

  setLoadedGroup(state, group) {
    state.loadedGroup = group;
  },

  reset(state) {
    state.groups =  [];
    state.loadedGroup = {};
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
