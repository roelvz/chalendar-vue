import BaseApi from "./BaseApi";
const axios = require('axios');

const ACCESS_TOKEN_KEY = 'access_token';

function accessToken() {
  return `?access_token=${localStorage.getItem(ACCESS_TOKEN_KEY)}`;
}

class GroupApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Groups";
  }

  getGroups() {
    return axios.get(`${this.baseUri}${accessToken()}`)
      .then(result => result.data);
  }

  getGroup(id) {
    return axios.get(`${this.baseUri}/${id}${accessToken()}`)
      .then(result => result.data);
  }

  getMessages(groupId) {
    return axios.get(`${this.baseUri}/${groupId}/messages${accessToken()}`)
      .then(result => result.data);
  }

  postMessage(groupId, text, creatorId) {
    return axios({
      method: 'post',
      url: `${this.baseUri}/${groupId}/messages${accessToken()}`,
      data: {
        text: text,
        creatorId: creatorId,
      }
    }).then(result => result.data);
  }
}

export default GroupApi;
