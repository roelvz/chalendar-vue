<template>
  <v-container fluid>
    <h1>{{loadedGroup.name}}</h1>

    <v-list>
      <v-divider ></v-divider>
      <template v-for="message in loadedGroup.messages">
        <v-list-tile :key="message.id" @click="">
          <v-list-tile-avatar>
            <img :src="message.creatorPicture">
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{message.text}}</v-list-tile-title>
            <v-list-tile-sub-title>{{getSubtitle(message)}}</v-list-tile-sub-title>
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
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: "Group",

  data() {
    return {
      inputMessage: "",
    }
  },

  created() {
    TimeAgo.locale(en);
    this.loadGroup(this.$route.params.id);
  },

  methods: {
    getSubtitle(message) {
      let timeAgo = new TimeAgo('en-US');
      return `${timeAgo.format(new Date(message.creationDate))} by ${message.creatorName}`;
    },

    sendMessage() {
      this.postMessage(this.inputMessage)
        .then(this.inputMessage = "");
    },

    ...mapActions('groupStore', [
      'loadGroup',
      'postMessage',
    ]),
  },

  computed: mapState({
    loadedGroup: state => state.groupStore.loadedGroup,
  }),
}
</script>

<style scoped>

</style>
