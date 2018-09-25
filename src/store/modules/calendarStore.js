import CalendarApi from "@/api/CalendarApi";

const calendarApi = new CalendarApi();

const state = {
  calendars: [],
  loadedCalendar: {
    events: [],
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
};

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

  addEvent(state, event) {
    state.loadedCalendar.events.push(event);
  },

  reset(state) {
    state.calendars = [];
    state.loadedCalendar = {
      events: []
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
