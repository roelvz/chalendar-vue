import BaseApi from "@/api/BaseApi";

const axios = require('axios');

class NotificationApi {
  constructor() {
    this.baseUri = 'https://onesignal.com/api/v1/notifications';
  }

  sendNotification(message, userInfo) {
    axios({
      method: 'post',
      url: this.baseUri,
      headers: {
        authorization: 'Basic OTczOTk5MTktM2NmMC00NDdlLThmOGQtMGMyNjI3OWYyMmNl',
      },
      data: {
        app_id: process.env.ONESIGNAL_APP_ID,
        contents: { "en": message, },
        "filters": [
          {"field": "tag", "key": "chalendar_id", "relation": "!=", "value": userInfo.sub},
        ],
      },
    }).then(result => result.data);
  }
}

export default NotificationApi;
