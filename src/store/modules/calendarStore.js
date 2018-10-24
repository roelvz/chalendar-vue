import CalendarApi from "@/api/CalendarApi";
import EventApi from "@/api/EventApi";
import ChatterApi from "@/api/ChatterApi";
import ChatApi from "@/api/ChatApi";
import AttendeeApi from "@/api/AttendeeApi";

const calendarApi = new CalendarApi();
const eventApi = new EventApi();
const chatterApi = new ChatterApi();
const chatApi = new ChatApi();
const attendeeApi = new AttendeeApi();

const state = {
  allCalendars: [],
  calendars: [],
  loadedCalendar: {
    members: [],
    events: [],
  },
  loadedEvent: {
    chatId: undefined,
    messageCount: 0,
    messages: [],
    attendees: [],
  },
};

const getters = {
  // TODO: constants for attendance state
  going(state) {
    return state.loadedEvent ? state.loadedEvent.attendees.filter(a => a.attendance === 'going') : [];
  },
  maybe(state) {
    return state.loadedEvent ? state.loadedEvent.attendees.filter(a => a.attendance === 'maybe') : [];
  },
  cannotGo(state) {
    return state.loadedEvent ? state.loadedEvent.attendees.filter(a => a.attendance === 'cannot_go') : [];
  },
  notGoing(state) {
    return state.loadedEvent ? state.loadedEvent.attendees.filter(a => a.attendance === 'not_going') : [];
  },
};

const actions = {
  initAllCalendars({commit}) {
    calendarApi.getCalendars()
      .then(result => {
        commit('setAllCalendars', result);
      })
      .catch(error => {
        console.error(error.response ? error.response : error);
      });
  },

  initCalendars({commit}, chatter) {
    return chatterApi.getCalendars(chatter.id)
      .then(result => {
        commit('setCalendars', result);
        return result;
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

  loadEvent({commit}, {id, limit}) {
    let loadedEvent = {};
    let promises = [];

    return eventApi.getEvent(id)
      .then(event => {
        loadedEvent = event;
        return eventApi.getChat(event.id);
      })
      .then(chat => {
        loadedEvent.chatId = chat.id;

        promises.push(chatApi.getMessageCount(chat.id)
          .then(count => {
            loadedEvent.messageCount = count;
          }));

        return chatApi.getMessages(chat.id, limit);
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
          // TODO: bakcend should create chat automatically
          eventApi.postChat(event.id);

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

  setAttendance({commit}, [chatterId, attendance]) {
    if (state.loadedEvent) {
      let newAttendee;
      let promises = [];

      // There's an issue with composite PK's in loopback. This is a workaround: check if attendee exists.
      // PUT if it does, POST if error.
      eventApi.getAttendee(state.loadedEvent.id, chatterId)
        .then(() => {
          // TODO: refactor code
          eventApi.putAttendee(state.loadedEvent.id, chatterId, attendance)
            .then((attendee) => {
              return chatterApi.getChatter(attendee.chatterId)
                .then(chatter => {
                  attendee.chatter = chatter;
                  commit('updateEventAttendance', attendee);
                })
            })
            .catch(error => {
              console.error(error.response ? error.response : error);
            });
        })
        .catch(() => {
          eventApi.postAttendee(state.loadedEvent.id, chatterId, attendance)
            .then((attendee) => {
              return chatterApi.getChatter(attendee.chatterId)
                .then(chatter => {
                  attendee.chatter = chatter;
                  commit('updateEventAttendance', attendee);
                })
            })
            .catch(error => {
              console.error(error.response ? error.response : error);
            });
        });
    }
  },

  postMessage({commit, state, rootState}, text) {
    if (state.loadedEvent) {
      chatApi.postMessage(state.loadedEvent.chatId, text)
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
  },

  addChatterToCalendar({commit}, [calendarId, chatterId]) {
    if (calendarId && chatterId) {
      calendarApi.addMember(calendarId, chatterId)
        .catch(error => {
          console.error(error.response ? error.response : error);
        });
    }
  },
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
  setAllCalendars(state, calendars) {
    state.allCalendars = calendars;
  },

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
    // Messages are stored in reverse order (order by creationDate DESC), so add it to the front (using unshift).
    state.loadedEvent.messages.unshift(message);
    state.loadedEvent.messageCount++;
  },

  updateEventAttendance(state, attendee) {
    let current = state.loadedEvent.attendees.find(a => a.chatterId === attendee.chatterId);
    if (current) {
      current.attendance = attendee.attendance;
    } else {
      state.loadedEvent.attendees.push(attendee);
    }
  },

  reset(state) {
    state.calendars = [];
    state.loadedCalendar = {
      members: [],
      events: [],
    };
    state.loadedEvent = {
      chatId: undefined,
      messageCount: 0,
      messages: [],
      attendees: [],
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
