const axios = require('axios');
import {getAccessToken} from "@/utils/auth";
import {messageLimit} from "@/utils/constants";
import BaseApi from "./BaseApi";

class ChatApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Chats";
  }

  getMessageCount(chatId) {
    return axios.get(`${this.baseUri}/${chatId}/messages/count`, BaseApi.buildHeaders())
      .then(result => {
        try {
          return parseInt(result.data.count);
        } catch (e) {
          return 0;
        }
      });
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
