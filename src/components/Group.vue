<template>
  <v-container fluid grid-list-md>
    <h1>{{loadedGroup.name}}</h1>

    <chat :entity="loadedGroup"
          :members="loadedGroup.members"
          :initFunc="initGroups"
          :loadFunc="loadGroup"
          :postFunc="postMessage"></chat>

  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Chat from "@/components/Chat";

export default {
  name: "Group",
  components: {Chat},

  created() {
    if (this.chatter) {
      this.loadGroup({id: this.$route.params.id})
        .then(result => this.initGroups(this.chatter));
    }
  },

  methods: {
    ...mapActions('groupStore', [
      'initGroups',
      'loadGroup',
      'postMessage',
    ]),
  },

  computed: mapState({
    chatter: state => state.userStore.chatter,
    loadedGroup: state => state.groupStore.loadedGroup,
  }),

  watch:{
    $route (to, from){
      if (from.path !== to.path) {
        this.loadGroup({id: this.$route.params.id})
          .then(result => this.initGroups(this.chatter));
      }
    },

    chatter(val) {
      if (val) {
        this.loadGroup({id: this.$route.params.id})
          .then(result => this.initGroups(this.chatter));
      }
    },
  }
}
</script>

<style scoped>

</style>
