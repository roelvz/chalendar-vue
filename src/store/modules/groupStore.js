import GroupApi from "../../api/GroupApi";

const groupApi = new GroupApi();

const state = {
  groups: [],
  loadedGroup: {
    messages:[],
  },
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
    let loadedGroup = {};

    groupApi.getGroup(id)
      .then(group => {
        loadedGroup = group;
        return groupApi.getMessages(group.id)
      })
      .then(messages => {
        loadedGroup.messages = messages;
        commit('setLoadedGroup', loadedGroup);
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },

  postMessage({commit, state, rootState}, text) {
    if (state.loadedGroup) {
      groupApi.postMessage(state.loadedGroup.id, text, rootState.auth.userId)
        .then(message => commit('addMessage', message))
        .catch(error => {
          console.error(error.response ? error.response : error);
        });
    } else {
      console.error("Could not post message: no group loaded");
    }
  }
};

const mutations = {
  setGroups(state, groups) {
    state.groups = groups;
  },

  setLoadedGroup(state, group) {
    state.loadedGroup = group;
  },

  addMessage(state, message) {
    state.loadedGroup.messages.push(message);
  },

  reset(state) {
    state.groups =  [];
    state.loadedGroup = {
      messages:[],
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
