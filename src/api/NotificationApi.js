const axios = require('axios');

class NotificationApi {
  constructor() {
    this.baseUri = 'https://onesignal.com/api/v1/notifications';
  }

  sendNotification(message, members, chatter, pageUrl = './') {
    let filters = [];
    let chatterId = chatter.id;

    // Send messages only to members
    // TODO: Use OneSignal segments
    let includeOperator = false;
    for (let i = 0; i < members.length; i++) {
      let member = members[i];

      // Exclude the user sending the message
      if (member.id !== chatterId) {
        if (includeOperator) {
          filters.push({"operator": "OR"});
        }
        filters.push(
          {"field": "tag", "key": "chalendar_user", "relation": "=", "value": member.id}
        );
        includeOperator = true;
      }
    }

    if (filters.length > 0) { // Don't try send notification if there are no receivers.
      axios({
        method: 'post',
        url: this.baseUri,
        headers: {
          authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
        },
        data: {
          app_id: process.env.ONESIGNAL_APP_ID,
          contents: {"en": message,},
          url: 'https://chalendar-ui.herokuapp.com' + pageUrl,
          "filters": filters,
        },
      }).then(result => result.data);
    }
  }
}

export default NotificationApi;
