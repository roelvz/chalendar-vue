<template>
  <v-layout>
    <v-flex xs12>
      <chat :entity="loadedGroup"
            :members="loadedGroup.members"
            :initFunc="initGroups"
            :loadFunc="loadGroup"
            :postMessageFunc="postMessage"
            :postLikeFunc="postLike"
            :deleteLikeFunc="deleteLike"></chat>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Chat from "@/components/Chat";
import {scrollToBottom} from "@/utils/utils";

export default {
  name: "Group",
  components: {Chat},

  created() {
    if (this.chatter) {
      console.log("LOADGROUP CREATED");
      this.loadGroup({id: this.$route.params.id})
        .then(result => {
          this.initGroups(this.chatter)
            .then(() => {
              scrollToBottom(this);
            })
        });
    }
  },

  mounted() {
  },

  methods: {
    ...mapActions('groupStore', [
      'initGroups',
      'loadGroup',
      'postMessage',
      'postLike',
      'deleteLike',
    ]),
  },

  computed: mapState({
    chatter: state => state.userStore.chatter,
    loadedGroup: state => state.groupStore.loadedGroup,
  }),

  watch:{
    $route (to, from){
      if (from.path !== to.path) {
        console.log("LOADGROUP ROUTE");
        this.loadGroup({id: this.$route.params.id})
          .then(() => {
            scrollToBottom(this);
          })
      }
    },

    chatter(val) {
      if (val) {
        console.log("LOADGROUP CHATTER");
        this.loadGroup({id: this.$route.params.id});
      }
    },
  }
}
</script>

<style scoped>

</style>
