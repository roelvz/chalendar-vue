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

  getChatter(id) {
    return axios.get(`${this.baseUri}/${id}`, BaseApi.buildHeaders())
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
    })
  }

  putChatter({sub, email, given_name, family_name, picture}) {
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
