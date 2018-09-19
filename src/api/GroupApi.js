import BaseApi from "./BaseApi";
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
      headers: BaseApi.buildHeaders(),
      data: {
        text: text,
        creatorId: creatorId,
      }
    }).then(result => result.data);
  }
}

export default GroupApi;
