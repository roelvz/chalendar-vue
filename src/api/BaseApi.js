const axios = require('axios');
import {getAccessToken} from "@/utils/auth";

class BaseApi {
  constructor() {
    this.baseUri = 'http://localhost:3000/api/';
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
