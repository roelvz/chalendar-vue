const axios = require('axios');
import {getAccessToken} from "@/utils/auth";
import BaseApi from "./BaseApi";

class MessageApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Messages";
  }

  postLike(messageId, chatterId) {
    // There is an issue with composite PK's in loopback. Construct one manually.
    let id = `${messageId}|${chatterId}`;

    return axios({
      method: 'post',
      url: `${this.baseUri}/${messageId}/likes`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      data:{id, chatterId}
    }).then(result => result.data);
  }

  deleteLike(messageId, likeId) {
    return axios.delete(`${this.baseUri}/${messageId}/likes/${likeId}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }
}

export default MessageApi;
