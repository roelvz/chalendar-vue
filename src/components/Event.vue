<template>
  <v-container fluid v-if="loadedEvent" grid-list-md>
    <h1>{{new Date(loadedEvent.date).toLocaleDateString()}}: {{loadedEvent.name}}</h1>

    <h2>Attendance</h2>
    <v-radio-group v-model="attendance">
      <!--TODO: constants-->
      <v-radio :label="goingString()" value="going"></v-radio>
      <v-radio :label="maybeString()" value="maybe"></v-radio>
      <v-radio :label="cannotGoString()" value="cannot_go"></v-radio>
      <v-radio :label="notGoingString()" value="not_going"></v-radio>
    </v-radio-group>

    <h2>Messages</h2>
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
              <v-flex v-if="!isLink(message.text)">{{message.text}}</v-flex>
              <v-flex v-else>
                <link-prevue :url="getUrl(message.text)">
                  <template slot-scope="props">
                    <div class="card" style="width: 20rem;">
                      <img v-if=""props.img height="100"  class="card-img-top" :src="props.img" :alt="props.title">
                      <div class="card-block">
                        <h4 class="card-title">{{props.title}}</h4>
                        <p class="card-text">{{props.description}}</p>
                        <a v-bind:href="props.url" class="btn btn-primary">More</a>
                      </div>
                    </div>
                    <div v-if="message.text !== getUrl(message.text)" v-linkified>{{message.text}}</div>
                  </template>
                </link-prevue>
              </v-flex>
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
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import LinkPrevue from 'link-prevue'

import NotificationApi from "../api/NotificationApi";
const notificationApi = new NotificationApi();

export default {
  name: "Event",
  components: {LinkPrevue},

  data() {
    return {
      inputMessage: "",
      attendanceLocal: "",
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
          notificationApi.sendNotification(`${this.chatter.firstName}: ${this.inputMessage}`, this.loadedCalendar.members, this.chatter, this.$route.path);
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

    goingString() {
      let result = 'Going: ';
      for (let i = 0; i < this.going().length; i++) {
        let name = this.going()[i].chatter.firstName;
        if (i > 0) { result += ", "; }
        result += name;
      }
      return result;
    },

    maybeString() {
      let result = 'Maybe: ';
      for (let i = 0; i < this.maybe().length; i++) {
        let name = this.maybe()[i].chatter.firstName;
        if (i > 0) { result += ", "; }
        result += name;
      }
      return result;
    },

    cannotGoString() {
      let result = "Can't make it: ";
      for (let i = 0; i < this.cannotGo().length; i++) {
        let name = this.cannotGo()[i].chatter.firstName;
        if (i > 0) { result += ", "; }
        result += name;
      }
      return result;
    },

    notGoingString() {
      let result = "Not going: ";
      for (let i = 0; i < this.notGoing().length; i++) {
        let name = this.notGoing()[i].chatter.firstName;
        if (i > 0) { result += ", "; }
        result += name;
      }
      return result;
    },

    isLink(text) {
      return text.indexOf('http') > -1;
    },

    getUrl(text) {
      let httpIndex = text.indexOf('http');
      if (httpIndex > -1) {
        let spaceIndex = text.indexOf(" ", httpIndex);
        if (spaceIndex > -1) {
          return text.substr(httpIndex, spaceIndex-httpIndex);
        } else {
          return text.substr(httpIndex);
        }
      } else {
        return "";
      }
    },

    ...mapGetters('calendarStore', [
      'going',
      'maybe',
      'cannotGo',
      'notGoing',
    ]),

    ...mapActions('calendarStore', [
      'initCalendars',
      'loadEvent',
      'postMessage',
      'setAttendance',
    ]),

    ...mapMutations('calendarStore', [
      'setLoadedEvent',
    ]),
  },

  computed: {
    attendance: {
      get() { return this.attendanceLocal },
      set(value) {
        this.setAttendance([this.chatter.id, value])
          .then(() => this.attendanceLocal = value);
      }
    },

    ...mapState({
      chatter: state => state.userStore.chatter,
      loadedEvent: state => state.calendarStore.loadedEvent,
      loadedCalendar: state => state.calendarStore.loadedCalendar,
    }),
  },

  watch:{
    $route (to, from){
      if (from.path !== to.path) {
        this.loadEvent({id: this.$route.params.id})
          .then(result => this.initCalendars(this.chatter));
      }
    },

    loadedEvent (event) {
      if (event) {
        let attendee = event.attendees.find(a => a.chatterId === this.chatter.id);
        if (attendee) {
          this.attendanceLocal = attendee.attendance;
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
