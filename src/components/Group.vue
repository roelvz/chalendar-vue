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
    console.log(new Date() + ': created');
    if (this.chatter) {
      console.log(new Date() + ': loading group');
      this.loadGroup({id: this.$route.params.id})
        .then(result => {
          console.log(new Date() + ': loaded group, initiating groups');
          return this.initGroups(this.chatter)
            .then(() => new Date() + ': initiated groups');
        });
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
        console.log(new Date() + ': loading group for route');
        this.loadGroup({id: this.$route.params.id})
          .then(result => {
            console.log(new Date() + ': loaded group for route, initiating groups');
            this.initGroups(this.chatter)
              .then(() => new Date() + ': initiated groups for route');
          });
      }
    },

    chatter(val) {
      if (val) {
        console.log(new Date() + ': loading group for chatter');
        this.loadGroup({id: this.$route.params.id})
          .then(result => {
            console.log(new Date() + ': loaded group for chatter, initiating groups');
            this.initGroups(this.chatter)
              .then(() => new Date() + ': initiated groups for chatter');
          });
      }
    },
  }
}
</script>

<style scoped>

</style>
