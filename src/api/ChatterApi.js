import BaseApi from "./BaseApi";
const axios = require('axios');

class ChatterApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Chatters";
  }

  getChatter(id) {
    return axios.get(`${this.baseUri}/${id}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  createChatter(email, password, firstName, lastName) {
    return axios({
      method: "post",
      url: `${this.baseUri}`,
      headers: BaseApi.buildHeaders(),
      data: {
        "email": email,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
      }
    })
  }

  login(credentials) {
    return axios({
      method: "post",
      url: `${this.baseUri}/login`,
      headers: BaseApi.buildHeaders(),
      data: credentials,
    }).then(result => result.data);
  }

  logout() {
    return axios.post(`${this.baseUri}/logout`, BaseApi.buildHeaders());
  }
}

export default ChatterApi;
