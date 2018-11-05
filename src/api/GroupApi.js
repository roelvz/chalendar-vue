import BaseApi from "./BaseApi";
import {getAccessToken} from "@/utils/auth";
import {messageLimit} from "@/utils/constants";
const axios = require('axios');

class GroupApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Groups";
  }

  getGroups() {
    return axios.get(this.baseUri, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getGroup(id, limit=messageLimit) {
    let filter = {
      include: [
        {
          relation: "chat",
          scope: {
            include: {
              relation: "messages",
              scope: {
                limit: limit,
                order:"creationDate DESC",
                include: {
                  relation: "creator"
                }
              }
            }
          }
        },
        {
          relation: "members",
        }
      ]
    };

    return axios.get(`${this.baseUri}/${id}?filter=${JSON.stringify(filter)}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getChat(groupId) {
    return axios.get(`${this.baseUri}/${groupId}/chat`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  addMember(groupId, chatterId) {
    return axios({
      method: "put",
      url: `${this.baseUri}/${groupId}/members/rel/${chatterId}`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
    }).then(result => result.data);
  }
}

export default GroupApi;
