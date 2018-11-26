import BaseApi from "./BaseApi";
import {getAccessToken} from "@/utils/auth";
import { roundDate } from '@/utils/utils';
const axios = require('axios');

class CalendarApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Calendars";
  }

  getCalendars() {
    return axios.get(this.baseUri, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getCalendar(id) {
    return axios.get(`${this.baseUri}/${id}?filter={"include":"members"}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getEvents(calendarId, loadOldEvents) {
    if (loadOldEvents) {
      return axios.get(`${this.baseUri}/${calendarId}/events?filter={"order": "date"}`, BaseApi.buildHeaders())
        .then(result => result.data);
    } else {
      let yesterday = roundDate(Date.now() - 2 * 86400000);
      // Events from yesterday are also included
      return axios.get(`${this.baseUri}/${calendarId}/events?filter={"order": "date", "where":{"date":{"gt":"${yesterday}"}}}`, BaseApi.buildHeaders())
        .then(result => result.data);
    }
  }

  postEvent(calendarId, [name, description, date]) {
    return axios({
      method: 'post',
      url: `${this.baseUri}/${calendarId}/events`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      data: {
        name: name,
        description: description,
        date: date,
      }
    })
      .then(result => result.data);
  }

  putEvent(calendarId, [eventId, name, description, date]) {
    return axios({
      method: 'put',
      url: `${this.baseUri}/${calendarId}/events/${eventId}`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      data: {
        name: name,
        description: description,
        date: date,
      }
    })
      .then(result => result.data);
  }

  addMember(calendarId, chatterId) {
    return axios({
      method: "put",
      url: `${this.baseUri}/${calendarId}/members/rel/${chatterId}`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
    }).then(result => result.data);
  }
}

export default CalendarApi;
