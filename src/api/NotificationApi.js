import BaseApi from "@/api/BaseApi";

const axios = require('axios');

class NotificationApi {
  constructor() {
    this.baseUri = 'https://onesignal.com/api/v1/notifications';
  }

  sendNotification(message, members, userInfo) {
    let filters = [];

    // Send messages only to members
    // TODO: Use OneSignal segments
    let includeOperator = false;
    for (let i = 0; i < members.length; i++) {
      let member = members[i];

      // Exclude the user sending the message
      if (member.id !== userInfo.sub) {
        if (includeOperator) {
          filters.push({"operator": "OR"});
        }
        filters.push(
          {"field": "tag", "key": "chalendar_user", "relation": "=", "value": member.id}
        );
        includeOperator = true;
      }
    }

    axios({
      method: 'post',
      url: this.baseUri,
      headers: {
        authorization: 'Basic OTczOTk5MTktM2NmMC00NDdlLThmOGQtMGMyNjI3OWYyMmNl',
      },
      data: {
        app_id: process.env.ONESIGNAL_APP_ID,
        contents: { "en": message, },
        "filters": filters,
      },
    }).then(result => result.data);
  }
}

export default NotificationApi;
