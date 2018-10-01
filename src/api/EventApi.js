import BaseApi from "./BaseApi";
import {getAccessToken} from "@/utils/auth";
import CalendarApi from "@/api/CalendarApi";
const axios = require('axios');

class EventApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Events";
  }

  getEvent(id) {
    return axios.get(`${this.baseUri}/${id}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getChat(eventId) {
    return axios.get(`${this.baseUri}/${eventId}/chat`, BaseApi.buildHeaders())
      .then(result => result.data);
  }
}

export default EventApi;
