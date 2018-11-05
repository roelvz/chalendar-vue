<template>
  <v-container fluid grid-list-md>
    <h1>{{loadedGroup.name}}</h1>
    <h1 v-if="this.chatter && (this.chatter.id === 'facebook|10217066011620498' || this.chatter.id === 'facebook|10217386796239913')">{{new Date().toJSON()}}</h1>

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
    console.log(new Date().toTimeString() +': created');
    if (this.chatter) {
      console.log(new Date().toTimeString() +': loading group');
      this.loadGroup({id: this.$route.params.id})
        .then(result => {
          console.log(new Date().toTimeString() +': loaded group, initiating groups');
          return this.initGroups(this.chatter)
            .then(() => {
              console.log(new Date().toTimeString() +': initiated groups');
            });
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
        console.log(new Date().toJSON() +': loading group for route');
        this.loadGroup({id: this.$route.params.id})
          .then(result => {
            console.log(new Date().toJSON() +': loaded group for route, initiating groups');
            // this.initGroups(this.chatter)
            //   .then(() => {
            //     console.log(new Date().toJSON() +': initiated groups for route');
            //   });
          });
      }
    },

    chatter(val) {
      if (val) {
        console.log(new Date().toJSON() +': loading group for chatter');
        this.loadGroup({id: this.$route.params.id})
          .then(result => {
            console.log(new Date().toJSON() +': loaded group for chatter, initiating groups');
            // this.initGroups(this.chatter)
            //   .then(() => {
            //     console.log(new Date().toJSON() +': initiated groups for chatter');
            //   });
          });
      }
    },
  }
}
</script>

<style scoped>

</style>
