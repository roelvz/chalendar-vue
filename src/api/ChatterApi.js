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
    console.log("getGroups: " + chatterId);

    return axios.get(`${this.baseUri}/${chatterId}/groups`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getCalendars(chatterId) {
    return axios.get(`${this.baseUri}/${chatterId}/calendars`, BaseApi.buildHeaders())
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
    })
  }
}

export default ChatterApi;
