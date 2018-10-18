<template>
  <v-container fluid v-if="loadedEvent" grid-list-md>
    <h1>{{new Date(loadedEvent.date).toLocaleDateString()}}: {{loadedEvent.name}}</h1>

    <v-layout row justify-space-around>
      <v-btn small v-if="loadedEvent.messageCount > loadedEvent.messages.length" @click="loadOlderMessages">Older</v-btn>
    </v-layout>

    <template v-for="message in loadedEvent.messages.slice().reverse()">
      <v-card>
        <v-layout row class="">
          <v-flex>
            <v-avatar>
              <img :src="message.creatorPicture">
            </v-avatar>
          </v-flex>
          <v-flex xs12>
            <v-layout column>
              <v-flex>{{message.text}}</v-flex>
              <v-flex><span class="grey--text"><timeago :datetime="message.creationDate"></timeago> by {{message.creatorName}}</span></v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </template>

    <v-form class="pt-3">
      <v-layout column>
        <v-layout>
          <v-textarea rows="1"
                      single-line
                      box
                      label="Enter your message ..."
                      name="inputMessage"
                      v-on:keyup="textAreaKeyUp"
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
    this.loadEvent({id: this.$route.params.id})
      .then(result => this.initCalendars(this.chatter));
  },

  methods: {
    sendMessage() {
      this.postMessage(this.inputMessage)
        .then(() => {
          notificationApi.sendNotification(`New message in ${this.loadedEvent.name}: ${this.inputMessage}`, this.loadedCalendar.members, this.chatter);
          this.inputMessage = "";
        });
    },

    loadOlderMessages() {
      // TODO: constant for # of loaded messages
      this.loadEvent({id: this.$route.params.id, limit: this.loadedEvent.messages.length + 20})
        .then(result => this.initCalendars(this.chatter));
    },

    textAreaKeyUp(e) {
      // Send message on enter but not on shift-enter.
      if (e.key === 'Enter' && !e.shiftKey) {
        this.sendMessage();
      }
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
    chatter: state => state.userStore.chatter,
    loadedEvent: state => state.calendarStore.loadedEvent,
    loadedCalendar: state => state.calendarStore.loadedCalendar,
  }),

  watch:{
    $route (to, from){
      if (from.path !== to.path) {
        this.loadEvent({id: this.$route.params.id})
          .then(result => this.initCalendars(this.chatter));
      }
    }
  }
}
</script>

<style scoped>

</style>
