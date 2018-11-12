<template>
  <v-container fluid>
    <h1>Checklist</h1>

    <v-checkbox label="On mobile, keyboard sometimes appears in front of message box when typing" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Bug: going to an event from a notification doesn't load the correct page" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Likes" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="When a message is liked, send a notification to the creator of the message" readonly></v-checkbox>
    <v-checkbox label="Bug: cannot enter enters in messages" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Bug: it should not be possible to enter an empty message" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="User profile management" readonly></v-checkbox>
    <v-checkbox label="Show who created an event" readonly></v-checkbox>
    <v-checkbox label="Bug: does not scroll completely to bottom if link is included" readonly></v-checkbox>
    <v-checkbox label="Scroll to last unread event instead of always to bottom" readonly></v-checkbox>
    <v-checkbox label="Images and multimedia in messages (incl drag & drop)" readonly></v-checkbox>
    <v-checkbox label="Auto refresh chat when someone else sends a message" readonly></v-checkbox>
    <v-checkbox label="Chat: show if someone is typing" readonly></v-checkbox>
    <v-checkbox label="Edit messages" readonly></v-checkbox>
    <v-checkbox label="Edit events" readonly></v-checkbox>
    <v-checkbox label="Going to an event through a notification always opens a new tab" readonly></v-checkbox>
    <v-checkbox label="Add creation info to events in the list of events in the calendar" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Notifications" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Keep users logged in for a longer period" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Going/Not going" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Calendar: don't show old events" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Calendar: allow to show older events" readonly></v-checkbox>
    <v-checkbox label="Don't send notifications to active users" readonly></v-checkbox>
    <v-checkbox label="Notifications for iPhone don't work (for both Safari and Chrome)" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Chats: don't abbreviate messages" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Linkify url's in messages" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Show URL preview in messages" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Bug: page is reloaded (sometimes) after sending a message" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Only send notifications to people in that group/calendar" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Chats: don't show old messages" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Make the ENTER key send the message by default" readonly></v-checkbox>
    <v-checkbox label="Make the ENTER key send the message by default, but not on mobile devices" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Scroll to bottom message after loading the page" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Scroll to bottom after posting a message" readonly></v-checkbox>
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
    <v-checkbox v-model="checked" label="Bugfix: users receive notifications for their own messages" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Bug: chat/calendar items on the left sometimes not shown" readonly></v-checkbox>
    <v-checkbox label="Show red 'bubble' when a new event has been created" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Notifications: better info in notification" readonly></v-checkbox>
    <v-checkbox v-model="checked" label="Notifications: Go directly to correct page" readonly></v-checkbox>
    <v-checkbox label="Choose a catchy name :)" readonly></v-checkbox>
    <v-checkbox label="Create a nice Favicon" readonly></v-checkbox>
    <v-checkbox label="Create a nice icon" readonly></v-checkbox>
    <v-checkbox label="Make calendar events look nicer" readonly></v-checkbox>
    <v-checkbox label="Make chats and messages look nicer" readonly></v-checkbox>
    <v-checkbox label="Edit events: move messages between events" readonly></v-checkbox>
    <v-checkbox label="Event locations" readonly></v-checkbox>
    <v-checkbox label="Chats: add @ pointers to people" readonly></v-checkbox>
    <v-checkbox label="Create new chats" readonly></v-checkbox>
    <v-checkbox label="Create new calendars" readonly></v-checkbox>
    <v-checkbox label="Merge multiple consecutive messages from the same person" readonly></v-checkbox>
    <v-checkbox label="Rate passed events" readonly></v-checkbox>
    <v-checkbox label="Native android app" readonly></v-checkbox>
    <v-checkbox label="Native iOS app" readonly></v-checkbox>
    <v-checkbox label="Automatically convert emoticons in messages (or maybe not ... or maybe a setting)" readonly></v-checkbox>
    <v-checkbox label="Add 'Add emoticon' button, not necessary for mobile but needed for desktop" readonly></v-checkbox>
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
