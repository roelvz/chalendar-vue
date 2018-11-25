<template>
  <v-layout>
    <v-flex xs12 v-if="loadedEvent">
      <v-container fluid>
        <h1> {{loadedEvent.name}}  </h1>
        <h2>{{new Date(loadedEvent.date).toDateString()}}</h2>
        <h5>{{addedInformationString()}}</h5>
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
            :postMessageFunc="postMessage"
            :postLikeFunc="postLike"
            :deleteLikeFunc="deleteLike"></chat>
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
    if (this.chatter) {
      this.setLoadedEvent(undefined);
      this.loadEvent({id: this.$route.params.id})
        .then(result => this.initCalendars(this.chatter));
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

    addedInformationString() {
      let result = "";

      /*
      @Roel this.loadedEvent.creator is alijd null, ook wanneer this.loadedEvent.creatorId is ingevuld. (Ik vul creator_id nu in "Calendar.Api" bij het aanmaken van een nieuw event)
      creator zou moeten bestaan om dat creatorId is gelinked aan Chatter in model "event.json", of zo begrijjp ik het allesins. 
      Klopt het niet wat ik doe? Of moet ik nog iets extra doen?      
      */
      if (this.loadedEvent.creator != null) 
        result += " Added by " + this.loadedEvent.creator.firstName;

      if (this.loadedEvent.creationDate != null) 
        result += " Added on " + new Date(this.loadedEvent.creationDate).toDateString() ;

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
      'postLike',
      'deleteLike',
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
