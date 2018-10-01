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

  getChat(groupId) {
    return axios.get(`${this.baseUri}/${groupId}/chat`, BaseApi.buildHeaders())
      .then(result => result.data);
  }
}

export default GroupApi;
