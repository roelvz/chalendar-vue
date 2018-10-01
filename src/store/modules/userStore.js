import ChatterApi from "@/api/ChatterApi";

const chatterApi = new ChatterApi();

const state = {
  allChatters: [],
  userInfo: undefined,
};

const actions = {
  initAllChatters({commit}) {
    chatterApi.getChatters()
      .then(result => {
        commit('setAllChatters', result);
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },
};

const mutations = {
  setAllChatters(state, chatters) {
    state.allChatters = chatters;
  },

  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },

  reset(state) {
    state.allChatters = [];
    state.userInfo = undefined;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
