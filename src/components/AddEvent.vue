<template>
  <v-container fluid grid-list-xl>
    <v-form>
      <v-text-field label="name" v-model="name"></v-text-field>
      <v-textarea label="description" v-model="description"></v-textarea>
      <v-date-picker label="date" v-model="date"></v-date-picker>
      <v-btn @click="addEvent()">Save</v-btn>
      <v-btn :to="toCalendar()">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import NotificationApi from "../api/NotificationApi";
const notificationApi = new NotificationApi();

export default {
  name: "AddEvent",

  data() {
    return {
      name: "",
      description: "",
      date: "",
    }
  },

  methods: {
    addEvent() {
      // TODO: check if required fields are filled in
      this.postEvent([this.name, this.description, this.date])
        .then(() => {
          notificationApi.sendNotification(`New event: ${this.name}`, this.loadedCalendar.members, this.chatter, this.toCalendar());

          this.$router.push({
            path: this.toCalendar(),
          })
        });
    },

    toCalendar() {
      return `/calendar/${this.loadedCalendar.id}`
    },

    ...mapActions('calendarStore', [
      'postEvent',
    ]),
  },

  computed: mapState({
    chatter: state => state.userStore.chatter,
    loadedCalendar: state => state.calendarStore.loadedCalendar,
  }),
}
</script>

<style scoped>

</style>

