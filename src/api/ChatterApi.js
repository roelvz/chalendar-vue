import BaseApi from "./BaseApi";
const axios = require('axios');

const ACCESS_TOKEN_KEY = 'access_token';

function accessToken() {
  return `?access_token=${localStorage.getItem(ACCESS_TOKEN_KEY)}`;
}

class ChatterApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Chatters";
  }

  getChatter(id) {
    return axios.get(`${this.baseUri}/${id}${accessToken()}`)
      .then(result => result.data);
  }

  createChatter(email, password, firstName, lastName) {
    return axios({
      method: "post",
      url: `${this.baseUri}${accessToken()}`,
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
      data: credentials,
    }).then(result => result.data);
  }

  logout() {
    return axios.post(`${this.baseUri}/logout`);
  }
}

export default ChatterApi;
