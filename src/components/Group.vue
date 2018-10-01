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
            <v-list-tile-sub-title><timeago :datetime="message.creationDate"></timeago></v-list-tile-sub-title>
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

export default {
  name: "Group",

  data() {
    return {
      inputMessage: "",
    }
  },

  created() {
    this.loadGroup(this.$route.params.id);
  },

  methods: {
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
