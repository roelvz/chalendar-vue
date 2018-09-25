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

  getMessages(eventId) {
    return axios.get(`${this.baseUri}/${eventId}/messages`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  postMessage(eventId, text) {
    return axios({
      method: 'post',
      url: `${this.baseUri}/${eventId}/messages`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      data: {
        text: text,
      }
    }).then(result => result.data);
  }
}

export default EventApi;
