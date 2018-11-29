<template>
  <div>
    <v-layout row justify-space-around>
      <v-btn small v-if="entity.chat.messageCount > entity.chat.messages.length" @click="loadOlderMessages">Older</v-btn>
    </v-layout>

    <!--<div id="chatbox" :style="getChatStyle()">-->
      <template v-for="message in entity.chat.messages.slice().reverse()">
        <v-card>
          <v-layout row class="">
            <v-flex>
              <v-avatar>
                <img :src="message.creator.picture" style="height:40px;width:40px">
              </v-avatar>
            </v-flex>
            <v-flex xs12>
              <v-layout column>
                <v-flex v-if="!isLink(message.text)">{{message.text}}</v-flex>
                <v-flex v-else>
                  <link-prevue :url="getUrl(message.text)">
                    <template slot-scope="props">
                      <div class="card" style="width: 20rem;">
                        <img v-if="props.img" height="100" class="card-img-top" :src="props.img" :alt="props.title">
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
                <v-flex><span class="grey--text"><timeago :datetime="message.creationDate"></timeago> by {{message.creator.firstName}} <a @click="like(message)"><v-icon size="14" :style="getLikeStyle(message)">thumb_up</v-icon></a> {{getLikeNames(message)}}</span></v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card>
      </template>
    <!--</div>-->

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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {messageLimit} from "@/utils/constants";
import {scrollToBottom} from "@/utils/utils";

import NotificationApi from "../api/NotificationApi";
const notificationApi = new NotificationApi();

import LinkPrevue from 'link-prevue'

export default {
  name: "Chat",
  components: {LinkPrevue},
  props: ['entity', 'members', 'initFunc', 'loadFunc', 'postMessageFunc', 'postLikeFunc', 'deleteLikeFunc'],

  data() {
    return {
      inputMessage: "",
    }
  },

  methods: {
    sendMessage() {
      if (this.inputMessage.trim().length > 0) {
        this.postMessageFunc(this.inputMessage)
          .then(() => {
            notificationApi.sendNotification(`${this.chatter.firstName}: ${this.inputMessage}`, this.members, this.chatter, this.$route.path);
            this.inputMessage = "";
            scrollToBottom(this);
          });
      }
    },

    loadOlderMessages() {
      // TODO: constant for # of loaded messages
      this.loadFunc({id: this.$route.params.id, limit: this.entity.chat.messages.length + messageLimit})
        .then(result => this.initFunc(this.chatter));
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

    like(message) {
      // TODO: the logic for choosing between like and unlike should be in the backend
      let like = message.likes.find(l => l.chatterId === this.chatter.id);
      if (like) {
        this.deleteLikeFunc({message, like});
      } else {
        this.postLikeFunc({
          message: message,
          chatter: this.chatter,
        })
          .then(() => {
            notificationApi.sendNotification(`${this.chatter.firstName} liked your message`, [message.creator], this.chatter, this.$route.path);
          });
      }
    },

    getLikeStyle(message) {
      return (message.likes.length > 0) ? "color:green" : "color:darkgrey";
    },

    getLikeNames(message) {
      let result = '';
      if (message.likes.length > 0) {
        result += `(${message.likes.length}): `;

        for (let i = 0; i < message.likes.length; i++) {
          let like = message.likes[i];
          if (i > 0) {
            result += ', ';
          }
          result += like.chatter.firstName;
        }
      }
      return result;
    },
  },

  computed: mapState({
    chatter: state => state.userStore.chatter,
  }),
}
</script>

<style scoped>
a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
</style>
