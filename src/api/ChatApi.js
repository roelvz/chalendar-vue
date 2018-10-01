import BaseApi from "./BaseApi";
import {getAccessToken} from "@/utils/auth";
import GroupApi from "@/api/GroupApi";
const axios = require('axios');

class ChatApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Chats";
  }

  getMessages(chatId) {
    return axios.get(`${this.baseUri}/${chatId}/messages`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  postMessage(chatId, text) {
    return axios({
      method: 'post',
      url: `${this.baseUri}/${chatId}/messages`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      data: {
        text: text,
      }
    }).then(result => result.data);
  }
}

export default ChatApi;
