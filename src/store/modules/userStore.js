const state = {
  userInfo: undefined,
};

const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },

  reset(state) {
    state.userInfo = undefined;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
