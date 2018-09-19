import BaseApi from "./BaseApi";
const axios = require('axios');

const ACCESS_TOKEN_KEY = 'access_token';

class GroupApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Groups";
  }

  getGroups() {
    return axios.get(`${this.baseUri}?access_token=${localStorage.getItem(ACCESS_TOKEN_KEY)}`)
      .then(result => result.data);
  }
}

export default GroupApi;
