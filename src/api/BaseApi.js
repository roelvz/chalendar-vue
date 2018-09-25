const axios = require('axios');
import {getAccessToken} from "@/utils/auth";

class BaseApi {
  constructor() {
    this.baseUri = 'https://challendar.herokuapp.com/api/';
  }

  static buildHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      }
    }
  }
}

export default BaseApi;
