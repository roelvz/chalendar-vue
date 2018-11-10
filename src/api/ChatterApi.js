import BaseApi from "./BaseApi";
import {getAccessToken} from "@/utils/auth";
const axios = require('axios');

class ChatterApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Chatters";
  }

  chatterExists(id) {
    return axios.get(`${this.baseUri}/${id}/exists`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getChatters() {
    return axios.get(`${this.baseUri}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getChatter(id) {
    return axios.get(`${this.baseUri}/${id}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getGroups(chatterId) {
    return axios.get(`${this.baseUri}/${chatterId}/groups?filter={"include":"chat"}`, BaseApi.buildHeaders())
      .then(result => {
        return result.data
      });
  }

  getCalendars(chatterId) {
    // TODO: could potentially get very large if there are a lot of events. On the other side, there can be new messages
    // on older events (and the reason we ask for the chat id of all events is that the server can calculate the # of
    // new messages. Ideally, it should be possible to retrieve the # of new messages for a calendar without having to
    // retrieve all events.
    return axios.get(`${this.baseUri}/${chatterId}/calendars?filter={"include":{"events":"chat"}}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  postChatter({sub, email, given_name, family_name, picture}) {
    return axios({
      method: "post",
      url: `${this.baseUri}`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      data: {
        "id": sub,
        "email": email,
        "firstName": given_name,
        "lastName": family_name,
        "picture": picture,
      }
    }).then(result => result.data);
  }

  putChatter({sub, email, given_name, family_name, picture}) {
    if (!given_name) {
      if (family_name) {
        given_name = family_name;
      } else if (email) {
        given_name = email;
      } else {
        given_name = 'Unknown';
      }
    }

    return axios({
      method: "put",
      url: `${this.baseUri}`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      data: {
        "id": sub,
        "email": email,
        "firstName": given_name,
        "lastName": family_name,
        "picture": picture,
      }
    }).then(result => result.data);
  }
}

export default ChatterApi;
