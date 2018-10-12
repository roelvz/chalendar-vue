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
                {{printEvent(event)}}
              </v-list-tile-title>
            </v-badge>
            <v-list-tile-title v-else>
              {{printEvent(event)}}
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
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: "Calendar",

  created() {
    this.loadCalendar(this.$route.params.id)
      .then(result => this.initCalendars(this.userInfo));
  },

  methods: {
    toAddEvent() {
      return `/calendar/${this.$route.params.id}/event/add`;
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
    userInfo: state => state.userStore.userInfo,
    loadedCalendar: state => state.calendarStore.loadedCalendar,
  }),

  watch:{
    $route (to, from){
      if (from.path !== to.path) {
        this.loadCalendar(this.$route.params.id)
          .then(result => this.initCalendars(this.userInfo));
      }
    }
  }
}
</script>

<style scoped>

</style>
