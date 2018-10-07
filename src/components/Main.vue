<template>
  <v-container fluid>
    <h1>Checklist</h1>

    <v-checkbox label="Notifications" readonly></v-checkbox>
    <v-checkbox label="Going/Not going" readonly></v-checkbox>
    <v-checkbox label="Chats: don't abbreviate messages" readonly></v-checkbox>
    <v-checkbox label="Calendar: don't show old events" readonly></v-checkbox>
    <v-checkbox label="Chats: don't show old messages" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Show # of unread items per chat" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Show # of unread items per event" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="User rights: people should be invited to a chat/calendar before they can read/write" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Login" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Post messages in chat" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Post events in Calendar" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Post messages on events" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Desktop and mobile" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Make sure app can be tested locally" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Bug: when switching between events, messages from the previous event are shown briefly" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Introduce Chat model" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Test API without having to login each time" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Chats: add date to messages" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Build website only on server instead of locally" readonly></v-checkbox>
    <v-checkbox label="Bug: chat/calendar items on the left sometimes not shown" readonly></v-checkbox>
    <v-checkbox label="Bug: cannot enter enters in messages" readonly></v-checkbox>
    <v-checkbox label="Make the ENTER key send the message by default" readonly></v-checkbox>
    <v-checkbox label="Choose a catchy name :)" readonly></v-checkbox>
    <v-checkbox label="Create a nice icon" readonly></v-checkbox>
    <v-checkbox label="Make calendar events look nicer" readonly></v-checkbox>
    <v-checkbox label="Realtime chat (someone is typing ...)" readonly></v-checkbox>
    <v-checkbox label="Likes" readonly></v-checkbox>
    <v-checkbox label="Edit messages" readonly></v-checkbox>
    <v-checkbox label="Edit events" readonly></v-checkbox>
    <v-checkbox label="Event locations" readonly></v-checkbox>
    <v-checkbox label="Chats: add @ pointers to people" readonly></v-checkbox>
    <v-checkbox label="Create new chats" readonly></v-checkbox>
    <v-checkbox label="Create new calendars" readonly></v-checkbox>
    <v-checkbox label="Rate passed events" readonly></v-checkbox>
    <v-checkbox label="User profile management" readonly></v-checkbox>
    <v-checkbox label="Native android app" readonly></v-checkbox>
    <v-checkbox label="Native iOS app" readonly></v-checkbox>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Group from "./Group";

export default {
  name: 'Main',
  components: {Group},

  data() {
    return {
      checked: true,
    }
  },

  methods: {
    ...mapActions('auth', [
    'isLoggedIn',
    ])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
