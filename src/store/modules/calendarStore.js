import CalendarApi from "@/api/CalendarApi";
import EventApi from "@/api/EventApi";
import ChatterApi from "@/api/ChatterApi";

const calendarApi = new CalendarApi();
const eventApi = new EventApi();
const chatterApi = new ChatterApi();

const state = {
  calendars: [],
  loadedCalendar: {
    events: [],
  },
  loadedEvent: {
    messages: []
  },
};

const getters = {};

const actions = {
  initCalendars({commit}) {
    calendarApi.getCalendars()
      .then(result => {
        commit('setCalendars', result);
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },

  loadCalendar({commit}, id) {
    let loadedCalendar = {};
    let promises = [];

    calendarApi.getCalendar(id)
      .then(calendar => {
        // Retrieve events for calendar
        loadedCalendar = calendar;
        return calendarApi.getEvents(calendar.id)
      })
      .then(events => {
        loadedCalendar.events = events;
      })
      .then(result => {
        // Save loaded calendar, including its events.
        Promise.all(promises).then(() => {
          commit('setLoadedCalendar', loadedCalendar);
        });
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },

  loadEvent({commit}, id) {
    let loadedEvent = {};
    let promises = [];

    eventApi.getEvent(id)
      .then(event => {
        loadedEvent = event;
        return eventApi.getMessages(event.id);
      })
      .then(messages => {
        // Fill in creator name and picture for each message
        for(let i = 0; i < messages.length; i++) {
          let message = messages[i];
          promises.push(initMessage(message));
        }

        loadedEvent.messages = messages;
      })
      .then(result => {
        // Save loaded event, including its messages.
        Promise.all(promises).then(() => {
          commit('setLoadedEvent', loadedEvent);
        });
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },

  postEvent({commit, state, rootState}, [name, description, date]) {
    if (state.loadedCalendar) {
      calendarApi.postEvent(state.loadedCalendar.id, [name, description, date])
        .then(event => {
          commit('addEvent', event);
          // initEvent(event)
          //   .then(() => commit('addEvent'), event);
        })
        .catch(error => {
          console.error(error.response ? error.response : error);
        });
    } else {
      console.error("Could not post event: no calendar loaded");
    }
  },

  postMessage({commit, state, rootState}, text) {
    if (state.loadedEvent) {
      eventApi.postMessage(state.loadedEvent.id, text)
        .then(message => {
          initMessage(message)
            .then(() => commit('addMessage', message))
        })
        .catch(error => {
          console.error(error.response ? error.response : error);
        });
    } else {
      console.error("Could not post message: no event loaded");
    }
  }
};

// TODO: refactor with groupStore
function initMessage(message) {
  return chatterApi.getChatter(message.creatorId)
    .then(chatter => {
      message.creatorName = chatter.firstName;
      message.creatorPicture = chatter.picture;
    });
}

// function initEvent(event) {
//   return chatterApi.getChatter(event.creatorId)
//     .then(chatter => {
//       message.creatorName = chatter.firstName;
//       message.creatorPicture = chatter.picture;
//     });
// }

const mutations = {
  setCalendars(state, calendars) {
    state.calendars = calendars;
  },

  setLoadedCalendar(state, calendar) {
    state.loadedCalendar = calendar;
  },

  setLoadedEvent(state, event) {
    state.loadedEvent = event;
  },

  addEvent(state, event) {
    state.loadedCalendar.events.push(event);
  },

  addMessage(state, message) {
    state.loadedEvent.messages.push(message);
  },

  reset(state) {
    state.calendars = [];
    state.loadedCalendar = {
      events: [],
    };
    state.loadedEvent = {
      messages: [],
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
