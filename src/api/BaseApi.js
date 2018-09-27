const axios = require('axios');
import {getAccessToken} from "@/utils/auth";

class BaseApi {
  constructor() {
    this.baseUri = process.env.BACKEND_API_URI;
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
