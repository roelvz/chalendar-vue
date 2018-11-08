import ChatterApi from "@/api/ChatterApi";

const chatterApi = new ChatterApi();

const state = {
  allChatters: [],
  chatter: undefined,
  title: 'Chalendar',
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

  setTitle(state, title) {
    state.title = title;
  },

  reset(state) {
    state.allChatters = [];
    state.chatter = undefined;
    state.title = 'Chalendar';
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
