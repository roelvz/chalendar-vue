<template>
  <v-container fluid>
    <v-btn :to="toAddEvent()">Add event</v-btn>

    <v-layout row justify-space-around>
      <!--<v-btn small v-if="entity.messageCount > entity.messages.length" @click="loadOlderMessages">Older</v-btn>-->
      <v-btn small @click="switchShowOldEvents">{{loadOldEvents ? 'Hide older' : 'Show older'}}</v-btn>
    </v-layout>

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

  data() {
    return {
      loadOldEvents: false,
    }
  },

  mounted() {
    let temp = this;

    this.$nextTick(function() {
      // Make sure calendar is loaded when tab receives input
      window.onfocus = function () {
        console.log("onfocus calendar");
        if (temp.loadedCalendar) {
          // TODO: should not be a full refresh, only the new events
          temp.loadCalendar([temp.loadedCalendar.id, this.loadOldEvents]);
        }
      };

      window.onblur = function () {
        console.log("onBlur calendar");
      }
    });
  },

  created() {
    if (this.chatter) {
      this.reloadCalendar();
    }
  },

  methods: {
    switchShowOldEvents() {
      this.loadOldEvents = !this.loadOldEvents;
      this.reloadCalendar();
    },

    reloadCalendar() {
      this.loadCalendar([this.$route.params.id, this.loadOldEvents])
        .then(result => this.initCalendars(this.chatter));
    },

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
        this.reloadCalendar();
      }
    },

    chatter(val) {
      if (val) {
        this.reloadCalendar();
      }
    },
  }
}
</script>

<style scoped>

</style>
