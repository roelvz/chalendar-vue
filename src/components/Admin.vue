<template>
  <v-container v-if="isAdmin()">
    <v-form>
      <v-select
        v-model="selectedChatter"
        label="user"
        item-text="firstName"
        item-value="id"
        :items="allChatters">
      </v-select>

      <v-select
        v-model="selectedGroup"
        label="group"
        item-text="name"
        item-value="id"
        :items="allGroups">
      </v-select>
      <v-btn @click="addToGroup()">Add user to group</v-btn>

      <v-select
        v-model="selectedCalendar"
        label="calendar"
        item-text="name"
        item-value="id"
        :items="allCalendars">
      </v-select>
      <v-btn @click="addToCalendar()">Add user to calendar</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: "Admin",

  data() {
    return {
      selectedChatter: undefined,
      selectedGroup: undefined,
      selectedCalendar: undefined,
    }
  },

  mounted() {
    this.initAllChatters();
    this.initAllGroups();
    this.initAllCalendars();
  },

  methods: {
    isAdmin() {
      return this.userInfo && this.userInfo.sub === 'facebook|10217066011620498';
    },

    addToGroup() {
      this.addChatterToGroup([this.selectedGroup.id, this.selectedChatter.id]);
    },

    addToCalendar() {
      this.addChatterToCalendar([this.selectedCalendar, this.selectedChatter]);
    },

    ...mapActions('userStore', [
      'initAllChatters',
    ]),

    ...mapActions('groupStore', [
      'initAllGroups',
      'addChatterToGroup',
    ]),

    ...mapActions('calendarStore', [
      'initAllCalendars',
      'addChatterToCalendar',
    ]),
  },

  computed: mapState({
    userInfo: state => state.userStore.userInfo,
    allChatters: state => state.userStore.allChatters,
    allGroups: state => state.groupStore.allGroups,
    allCalendars: state => state.calendarStore.allCalendars,
  }),
}
</script>

<style scoped>

</style>
