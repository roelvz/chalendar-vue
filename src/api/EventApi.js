import BaseApi from "./BaseApi";
import {getAccessToken} from "@/utils/auth";
import {messageLimit} from "@/utils/constants";
const axios = require('axios');

class EventApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Events";
  }

  getEvent(id, limit=messageLimit) {
    // TODO: refactor with groupApi getGroup
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
                include: [
                  {
                    relation: "creator",
                  },
                  {
                    relation: "likes",
                    scope: {
                      include: {
                        relation: "chatter"
                      }
                    }
                  }
                ]
              }
            }
          }
        },
        {
          relation: "attendees",
          scope: {
            include: {
              relation: "chatter",
            }
          }
        }
      ]
    };

    return axios.get(`${this.baseUri}/${id}?filter=${JSON.stringify(filter)}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  getChat(eventId) {
    return axios.get(`${this.baseUri}/${eventId}/chat`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  postChat(eventId) {
    return axios({
      method: 'post',
      url: `${this.baseUri}/${eventId}/chat`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      }
    }).then(result => result.data);
  }

  getAttendee(eventId, chatterId) {
    // There is an issue with composite PK's in loopback. Construct one manually.
    let id = `${eventId}|${chatterId}`;

    return axios.get(`${this.baseUri}/${eventId}/attendees/${id}`, BaseApi.buildHeaders())
      .then(result => result.data);
  }

  postAttendee(eventId, chatterId, attendance) {
    let id = `${eventId}|${chatterId}`;

    return axios({
      method: 'post',
      url: `${this.baseUri}/${eventId}/attendees`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      data: {id, chatterId, attendance},
    }).then(result => result.data);
  }

  putAttendee(eventId, chatterId, attendance) {
    let id = `${eventId}|${chatterId}`;

    return axios({
      method: 'put',
      url: `${this.baseUri}/${eventId}/attendees/${id}`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      data: {attendance},
    }).then(result => result.data);
  }

  deleteEvent(eventId) {   
    return axios.delete(`${this.baseUri}/${eventId}`, BaseApi.buildHeaders())
    .then(result => result.data);
  }
}

export default EventApi;
