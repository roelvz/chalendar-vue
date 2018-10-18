import ChatterApi from "@/api/ChatterApi";

const chatterApi = new ChatterApi();

const state = {
  allChatters: [],
  chatter: undefined,
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

  setChatter(state, chatter) {
    state.chatter = chatter;
  },

  reset(state) {
    state.allChatters = [];
    state.chatter = undefined;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
