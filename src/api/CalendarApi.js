import BaseApi from "./BaseApi";
import {getAccessToken} from "@/utils/auth";
import GroupApi from "@/api/GroupApi";
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
    return axios.get(`${this.baseUri}/${id}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getEvents(calendarId) {
    return axios.get(`${this.baseUri}/${calendarId}/events`, BaseApi.buildHeaders())
      .then(result => result.data);
  }
}

export default CalendarApi;
