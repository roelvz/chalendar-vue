<template>
  <v-layout>
    <v-flex xs12>
      <v-container fluid>
        <h2>{{new Date(loadedEvent.date).toLocaleDateString()}}</h2>
        <v-radio-group v-model="attendance">
          <!--TODO: constants-->
          <v-radio :label="goingString()" value="going"></v-radio>
          <v-radio :label="maybeString()" value="maybe"></v-radio>
          <v-radio :label="cannotGoString()" value="cannot_go"></v-radio>
          <v-radio :label="notGoingString()" value="not_going"></v-radio>
        </v-radio-group>

        <h2>Messages</h2>
      </v-container>

      <chat :entity="loadedEvent"
            :members="loadedCalendar.members"
            :initFunc="initCalendars"
            :loadFunc="loadEvent"
            :postFunc="postMessage"></chat>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Chat from "@/components/Chat";

export default {
  name: "Event",
  components: {Chat},

  data() {
    return {
      inputMessage: "",
      attendanceLocal: "",
    }
  },

  created() {
    this.setLoadedEvent(undefined);
    this.loadEvent({id: this.$route.params.id})
      .then(result => this.initCalendars(this.chatter));
  },

  methods: {
    goingString() {
      let result = 'Going: ';
      for (let i = 0; i < this.going().length; i++) {
        let name = this.going()[i].chatter.firstName;
        if (i > 0) { result += ", "; }
        result += name;
      }
      return result;
    },

    maybeString() {
      let result = 'Maybe: ';
      for (let i = 0; i < this.maybe().length; i++) {
        let name = this.maybe()[i].chatter.firstName;
        if (i > 0) { result += ", "; }
        result += name;
      }
      return result;
    },

    cannotGoString() {
      let result = "Can't make it: ";
      for (let i = 0; i < this.cannotGo().length; i++) {
        let name = this.cannotGo()[i].chatter.firstName;
        if (i > 0) { result += ", "; }
        result += name;
      }
      return result;
    },

    notGoingString() {
      let result = "Not going: ";
      for (let i = 0; i < this.notGoing().length; i++) {
        let name = this.notGoing()[i].chatter.firstName;
        if (i > 0) { result += ", "; }
        result += name;
      }
      return result;
    },

    ...mapGetters('calendarStore', [
      'going',
      'maybe',
      'cannotGo',
      'notGoing',
    ]),

    ...mapActions('calendarStore', [
      'initCalendars',
      'loadEvent',
      'setAttendance',
      'postMessage',
    ]),

    ...mapMutations('calendarStore', [
      'setLoadedEvent',
    ]),
  },

  computed: {
    attendance: {
      get() { return this.attendanceLocal },
      set(value) {
        this.setAttendance([this.chatter.id, value])
          .then(() => this.attendanceLocal = value);
      }
    },

    ...mapState({
      chatter: state => state.userStore.chatter,
      loadedEvent: state => state.calendarStore.loadedEvent,
      loadedCalendar: state => state.calendarStore.loadedCalendar,
    }),
  },

  watch:{
    $route (to, from){
      if (from.path !== to.path) {
        this.loadEvent({id: this.$route.params.id});
      }
    },

    loadedEvent (event) {
      if (event) {
        let attendee = event.attendees.find(a => a.chatterId === this.chatter.id);
        if (attendee) {
          this.attendanceLocal = attendee.attendance;
        }
      }
    },
  }
}
</script>

<style scoped>

</style>
