import BaseApi from "./BaseApi";
import {getAccessToken} from "@/utils/auth";
const axios = require('axios');

class GroupApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Groups";
  }

  getGroups() {
    return axios.get(this.baseUri, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getGroup(id) {
    return axios.get(`${this.baseUri}/${id}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getMessages(groupId) {
    return axios.get(`${this.baseUri}/${groupId}/messages`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  postMessage(groupId, text, creatorId) {
    return axios({
      method: 'post',
      url: `${this.baseUri}/${groupId}/messages`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      data: {
        text: text,
        creatorId: creatorId,
      }
    }).then(result => result.data);
  }
}

export default GroupApi;
