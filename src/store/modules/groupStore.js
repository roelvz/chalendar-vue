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
    chatId: undefined,
    messages:[],
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

  initGroups({commit, state}, userInfo) {
    chatterApi.getGroups(userInfo.sub)
      .then(result => {
        console.log("result groups:");
        console.log(result);

        commit('setGroups', result);
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },

  loadGroup({state, commit}, {id, limit}) {
    let loadedGroup = {};
    let promises = [];

    return groupApi.getGroup(id)
      .then(group => {
        // Retrieve messages for group
        loadedGroup = group;
        return groupApi.getChat(group.id);
      })
      .then(chat => {
        loadedGroup.chatId = chat.id;

        promises.push(chatApi.getMessageCount(chat.id)
          .then(count => {
            loadedGroup.messageCount = count;
          }));

        return chatApi.getMessages(chat.id, limit);
      })
      .then(messages => {
        // Fill in creator name and picture for each message
        for(let i = 0; i < messages.length; i++) {
          let message = messages[i];
          promises.push(initMessage(message));
        }
        loadedGroup.messages = messages;
      })
      .then(result => {
        // Save loaded group, including its messages.
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
      chatApi.postMessage(state.loadedGroup.chatId, text)
        .then(message => {
          initMessage(message)
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
      message.creatorName = chatter.firstName;
      message.creatorPicture = chatter.picture;
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
    state.loadedGroup.messages.unshift(message);
  },

  reset(state) {
    allGroups: [],
    state.groups =  [];
    state.loadedGroup = {
      chatId: undefined,
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
