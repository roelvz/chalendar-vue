import GroupApi from "../../api/GroupApi";

const groupApi = new GroupApi();

const state = {
  groups: [],
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
};

const mutations = {
  setGroups(state, groups) {
    state.groups = groups;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
