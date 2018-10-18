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
    // TODO: also include messages
    return axios.get(`${this.baseUri}/${id}?filter={"include":"members"}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getChat(groupId) {
    return axios.get(`${this.baseUri}/${groupId}/chat`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  addMember(groupId, chatterId) {
    return axios({
      method: "put",
      url: `${this.baseUri}/${groupId}/members/rel/${chatterId}`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
    }).then(result => result.data);
  }
}

export default GroupApi;
