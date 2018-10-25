<template>
  <v-container fluid grid-list-md>
    <h1>{{loadedGroup.name}}</h1>

    <v-layout row justify-space-around>
      <v-btn small v-if="loadedGroup.messageCount > loadedGroup.messages.length" @click="loadOlderMessages">Older</v-btn>
    </v-layout>


    <!--TODO: refactor with event-->
    <template v-for="message in loadedGroup.messages.slice().reverse()">
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

    <v-form class="pt-3" @submit="">
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
import LinkPrevue from 'link-prevue'

import NotificationApi from "../api/NotificationApi";
const notificationApi = new NotificationApi();

export default {
  name: "Group",
  components: {LinkPrevue},

  data() {
    return {
      inputMessage: "",
    }
  },

  created() {
    if (this.chatter) {
      this.loadGroup({id: this.$route.params.id})
        .then(result => this.initGroups(this.chatter));
    }
  },

  methods: {
    sendMessage() {
      this.postMessage(this.inputMessage)
        .then(() => {
          notificationApi.sendNotification(`${this.chatter.firstName}: ${this.inputMessage}`, this.loadedGroup.members, this.chatter, this.$route.path);
          this.inputMessage = "";
        });
    },

    loadOlderMessages() {
      // TODO: constant for # of loaded messages
      this.loadGroup({id: this.$route.params.id, limit: this.loadedGroup.messages.length + 20})
        .then(result => this.initGroups(this.chatter));
    },

    textAreaKeyUp(e) {
      // Send message on enter but not on shift-enter.
      if (e.key === 'Enter' && !e.shiftKey) {
        this.sendMessage();
      }
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

    ...mapActions('groupStore', [
      'initGroups',
      'loadGroup',
      'postMessage',
    ]),
  },

  computed: mapState({
    chatter: state => state.userStore.chatter,
    loadedGroup: state => state.groupStore.loadedGroup,
  }),

  watch:{
    $route (to, from){
      if (from.path !== to.path) {
        this.loadGroup({id: this.$route.params.id})
          .then(result => this.initGroups(this.chatter));
      }
    },

    chatter(val) {
      if (val) {
        this.loadGroup({id: this.$route.params.id})
          .then(result => this.initGroups(this.chatter));
      }
    },
  }
}
</script>

<style scoped>

</style>
