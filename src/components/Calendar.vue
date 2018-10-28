<template>
  <v-container fluid>
    <h1>{{loadedCalendar.name}}</h1>

    <v-btn :to="toAddEvent()">Add event</v-btn>

    <v-list>
      <v-divider ></v-divider>
      <template v-for="event in loadedCalendar.events">
        <v-list-tile avatar :key="event.id" :to="toEvent(event.id)">
          <v-list-tile-content>
            <v-badge color="red" v-if="event.newMessages > 0">
              <span slot="badge">{{event.newMessages}}</span>
              <v-list-tile-title>
              <span :style="getEventStyle(event)">
                {{printEvent(event)}}
              </span>
              </v-list-tile-title>
            </v-badge>
            <v-list-tile-title v-else>
              <span :style="getEventStyle(event)">
                {{printEvent(event)}}
              </span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider ></v-divider>
      </template>
    </v-list>

    <v-btn :to="toAddEvent()">Add event</v-btn>

  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { isDateOlderThanToday } from '@/utils/utils';

export default {
  name: "Calendar",

  created() {
    if (this.chatter) {
      this.loadCalendar(this.$route.params.id)
        .then(result => this.initCalendars(this.chatter));
    }
  },

  methods: {
    toAddEvent() {
      return `/calendar/${this.$route.params.id}/event/add`;
    },

    getEventStyle(event) {
      // new Date(event.date) is necessary because it is in JSON format.
      return `color:${isDateOlderThanToday(new Date(event.date)) ? 'grey' : 'white'}`;
    },

    printEvent(event) {
      return `${new Date(event.date).toDateString()}: ${event.name}`
    },

    toEvent(id) {
      return `/calendar/${this.$route.params.id}/event/${id}`;
    },

    ...mapActions('calendarStore', [
      'initCalendars',
      'loadCalendar',
    ]),
  },

  computed: mapState({
    chatter: state => state.userStore.chatter,
    loadedCalendar: state => state.calendarStore.loadedCalendar,
  }),

  watch:{
    $route(to, from){
      if (from.path !== to.path) {
        this.loadCalendar(this.$route.params.id)
          .then(result => this.initCalendars(this.chatter));
      }
    },

    chatter(val) {
      if (val) {
        this.loadCalendar(this.$route.params.id)
          .then(result => this.initCalendars(this.chatter));
      }
    },
  }
}
</script>

<style scoped>

</style>
