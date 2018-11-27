<template>
  <v-container fluid grid-list-xl  v-if="isCreator()">
    <v-form>
      <h1>Edit event</h1>
      <v-text-field label="name" v-model="name" ></v-text-field>
      <v-textarea label="description" v-model="description"></v-textarea>
      <v-date-picker label="date" v-model="date"></v-date-picker>

      <v-btn @click="saveEvent()">Save</v-btn>
      <v-btn :to="toEvent()">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import NotificationApi from "../api/NotificationApi";
const notificationApi = new NotificationApi();

export default {
  name: "EditEvent",

  //TODO how to set data to default value of loadedEvent?
  data() {
    return {
      name: "",
      description: "",
      date: "",
    }
  },

  created() {
    if (this.chatter) {
      this.setLoadedEvent(undefined);
        this.loadEvent({id: this.$route.params.id});
    }
  },

  mounted() {
    let temp = this;

    this.$nextTick(function() {
      // Make sure event is loaded when tab receives input
      window.onfocus = function () {
        console.log("onfocus event");
        if (temp.loadedEvent) {
          // TODO: should not be a full refresh, only the messages
          temp.loadEvent({id: temp.loadedEvent.id});
        }
      };

      window.onblur = function () {
        console.log("onBlur event");
      }
    });
  },

  methods: {
   isCreator() {
     //TODO remove line
       return true;
      return this.loadedEvent.creator === this.chatter;
    },

    saveEvent() {
      // TODO: check if required fields are filled in
      this.putEvent([this.loadedCalendar.id, this.loadedEvent.id, this.name, this.description, this.date])
        .then(() => {
          //TODO not sure why but with this line event is not updated and $router doesnt work
          //notificationApi.sendNotification(`Event updated: ${this.name}`, this.loadedCalendar.members, this.chatter, this.toEvent());
           this.$router.push({path: this.toEvent()})
        });
    },

    toEvent() {
      return (this.loadedCalendar && this.loadedEvent) ? `/calendar/${this.loadedCalendar.id}/event/${this.loadedEvent.id}` : '';
    },

    ...mapActions('calendarStore', [
      'initCalendars',
      'putEvent',
      'loadEvent',
    ]),

    ...mapMutations('calendarStore', [
      'setLoadedEvent',
    ]),

  },

  computed: {
    ...mapState({
      chatter: state => state.userStore.chatter,
      loadedEvent: state => state.calendarStore.loadedEvent,
      loadedCalendar: state => state.calendarStore.loadedCalendar,
    }),
  },

  watch: {
    $route(to, from) {
      if (from.path !== to.path) {
        this.loadEvent({id: this.$route.params.id});
      }
    },

    loadedEvent(event) {
      if (event) {
        this.name = event.name;
        this.description = event.description;
        this.date = new Date(event.date).toISOString().substr(0, 10);
        //this.date.date = new Date(event.date).toJSON();
        //this.date.time = new Date(event.date).toJSON();
      }
    },

    chatter(val) {
      if (val) {
        this.loadEvent({id: this.$route.params.id});
      }
    },
  }
}
</script>

<style scoped>

</style>

