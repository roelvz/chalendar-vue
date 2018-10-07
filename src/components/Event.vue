<template>
  <v-container fluid v-if="loadedEvent">
    <h1>{{new Date(loadedEvent.date).toLocaleDateString()}}: {{loadedEvent.name}}</h1>

    <v-list>
      <v-divider ></v-divider>
      <template v-for="message in loadedEvent.messages">
        <v-list-tile :key="message.id" @click="">
          <v-list-tile-avatar>
            <img :src="message.creatorPicture">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{message.text}}</v-list-tile-title>
            <v-list-tile-sub-title><timeago :datetime="message.creationDate"></timeago> by {{message.creatorName}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider ></v-divider>
      </template>
    </v-list>

    <v-form class="pt-3">
      <v-layout column>
        <v-layout>
          <v-textarea rows="1"
                      single-line
                      box
                      label="Enter your message ..."
                      name="inputMessage"
                      v-model="inputMessage"></v-textarea>
          <v-btn @click="sendMessage()">Send</v-btn>
        </v-layout>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import NotificationApi from "../api/NotificationApi";
const notificationApi = new NotificationApi();

export default {
  name: "Event",

  data() {
    return {
      inputMessage: "",
    }
  },

  created() {
    this.setLoadedEvent(undefined);
    this.loadEvent(this.$route.params.id)
      .then(result => this.initCalendars(this.userInfo));
  },

  methods: {
    sendMessage() {
      this.postMessage(this.inputMessage)
        .then(() => {
          notificationApi.sendNotification(`New message in ${this.loadedEvent.name}: ${this.inputMessage}`, this.userInfo);
          this.inputMessage = "";
        });
    },

    ...mapActions('calendarStore', [
      'initCalendars',
      'loadEvent',
      'postMessage',
    ]),

    ...mapMutations('calendarStore', [
      'setLoadedEvent',
    ]),
  },

  computed: mapState({
    userInfo: state => state.userStore.userInfo,
    loadedEvent: state => state.calendarStore.loadedEvent,
  })
}
</script>

<style scoped>

</style>
