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
};

const mutations = {
  setCalendars(state, calendars) {
    state.calendars = calendars;
  },

  setLoadedCalendar(state, calendar) {
    state.loadedCalendar = calendar;
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
