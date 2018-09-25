<template>
  <v-container fluid>
    <h1>{{loadedCalendar.name}}</h1>
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
