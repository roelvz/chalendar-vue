import BaseApi from "./BaseApi";
import {getAccessToken} from "@/utils/auth";
const axios = require('axios');

class AttendeeApi extends BaseApi {
  constructor() {
    super();
    this.baseUri += "Attendees";
  }

  putAttendee(eventId, chatterId, attendance) {
    return axios({
      method: 'put',
      url: `${this.baseUri}`,
      headers: {
        authorization: `Bearer ${getAccessToken()}`,
      },
      data: {eventId, chatterId, attendance},
    }).then(result => result.data);
  }
}

export default AttendeeApi;
