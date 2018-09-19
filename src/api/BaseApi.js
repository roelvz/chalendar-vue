const axios = require('axios');

class BaseApi {
  constructor() {
    this.baseUri = 'http://192.168.1.16:3000/api/';
  }
}

export default BaseApi;
