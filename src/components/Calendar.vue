<template>
  <v-container fluid>
    <h1>{{loadedCalendar.name}}</h1>

    <v-btn :to="toAddEvent()">Add event</v-btn>

    <v-list>
      <v-divider ></v-divider>
      <template v-for="event in loadedCalendar.events">
        <v-list-tile :key="event.id" :to="toEvent(event.id)">
          <v-list-tile-content>
            <v-list-tile-title>{{new Date(event.date).toDateString()}}: {{event.name}}</v-list-tile-title>
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
    this.loadCalendar(this.$route.params.id);
  },

  methods: {
    toAddEvent() {
      return `/calendar/${this.$route.params.id}/event/add`;
    },

    toEvent(id) {
      return `/calendar/${this.$route.params.id}/event/${id}`;
    },

    ...mapActions('calendarStore', [
      'loadCalendar',
    ]),
  },

  computed: mapState({
    loadedCalendar: state => state.calendarStore.loadedCalendar,
  }),
}
</script>

<style scoped>

</style>
