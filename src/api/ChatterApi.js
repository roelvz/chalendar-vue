import BaseApi from "./BaseApi";
const axios = require('axios');

class ChatterApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Chatters";
  }

  createChatter(email, password, firstName, lastName) {
    return axios({
      method: "post",
      url: this.baseUri,
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
