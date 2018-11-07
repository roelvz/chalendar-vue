import GroupApi from "../../api/GroupApi";
import ChatterApi from "../../api/ChatterApi";
import ChatApi from "../../api/ChatApi";

const groupApi = new GroupApi();
const chatterApi = new ChatterApi();
const chatApi = new ChatApi();

const state = {
  allGroups: [],
  groups: [],
  loadedGroup: {
    chat: {
      messageCount: 0,
      messages: [],
    },
    members: [],
  },
};

const getters = {};

const actions = {
  initAllGroups({commit}) {
    groupApi.getGroups()
      .then(result => {
        commit('setAllGroups', result);
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },

  initGroups({commit, state}, chatter) {
    return chatterApi.getGroups(chatter.id)
      .then(result => {
        commit('setGroups', result);
        return result;
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },

  loadGroup({state, commit}, {id, limit}) {
    let loadedGroup = {};
    let promises = [];

    return groupApi.getGroup(id, limit)
      .then(group => {
        loadedGroup = group;

        promises.push(chatApi.getMessageCount(loadedGroup.chat.id)
          .then(count => {
            loadedGroup.chat.messageCount = count;
          }));
      })
      .then(result => {
        Promise.all(promises).then(() => {
          commit('setLoadedGroup', loadedGroup);
        });
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },

  postMessage({commit, state, rootState}, text) {
    if (state.loadedGroup) {
      return chatApi.postMessage(state.loadedGroup.chat.id, text)
        .then(message => {
          return initMessage(message)
            .then(() => commit('addMessage', message))
        })
        .catch(error => {
          console.error(error.response ? error.response : error);
        });
    } else {
      console.error("Could not post message: no group loaded");
    }
  },

  addChatterToGroup({commit}, [groupId, chatterId]) {
    if (groupId && chatterId) {
      groupApi.addMember(groupId, chatterId)
        .catch(error => {
          console.error(error.response ? error.response : error);
        });
    }
  },
};

function initMessage(message) {
  return chatterApi.getChatter(message.creatorId)
    .then(chatter => {
      message.creator = chatter;
    });
}

const mutations = {
  setAllGroups(state, groups) {
    state.allGroups = groups;
  },

  setGroups(state, groups) {
    state.groups = groups;
  },

  setLoadedGroup(state, group) {
    state.loadedGroup = group;
  },

  addMessage(state, message) {
    // Messages are stored in reverse order (order by creationDate DESC), so add it to the front (using unshift).
    state.loadedGroup.chat.messages.unshift(message);
    state.loadedGroup.chat.messageCount++;
  },

  reset(state) {
    allGroups: [],
    state.groups =  [];
    state.loadedGroup = {
      chat: {
        messageCount: 0,
        messages:[],
      },
      members: [],
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
