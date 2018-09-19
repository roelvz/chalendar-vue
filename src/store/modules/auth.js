import ChatterApi from "../../api/ChatterApi";

const ACCESS_TOKEN_KEY = 'access_token';

const state = {
  loggedIn: false,
  user: {},
};

const getters = {
  getAccessToken(state) {
    return getAccessToken();
  },
};

const actions = {
  login({commit, dispatch}, credentials) {
    return (new ChatterApi).login(credentials)
      .then(user => {
        setAccessToken(user.id);
        commit('setUser', user);
        return dispatch('groupStore/initGroups', {}, {root:true});
      })
      .then(result => {
        commit('setLoggedIn');
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },

  logout(commit) {
    (new ChatterApi).logout()
      .then(clearAccessToken());
  },

  isLoggedIn(state) {
    return state.loggedIn;
  },
};

const mutations = {
  setLoggedIn(state) {
    state.loggedIn = true;
  },

  setUser(state, user) {
    state.user = user;
  },

  reset(state) {
    state.loggedIn = false;
    state.user = {};
  },
};

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
