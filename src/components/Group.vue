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
      this.loadGroup({id: this.$route.params.id})
        .then(result => {
          this.initGroups(this.chatter)
            .then(() => scrollToBottom(this));
        });
    }
  },

  mounted() {
    let temp = this;

    this.$nextTick(function() {
      // Make sure group is loaded when tab receives input
      window.onfocus = function () {
        console.log("onfocus");
        if (temp.loadedGroup) {
          // TODO: should not be a full refresh, only the messages
          temp.loadGroup({id: temp.loadedGroup.id})
            .then(() => scrollToBottom(temp));
        }
      };

      window.onblur = function () {
        console.log("onBlur");
      }
    });
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
        this.loadGroup({id: this.$route.params.id})
          .then(() => scrollToBottom(this));
      }
    },

    chatter(val) {
      if (val) {
        this.loadGroup({id: this.$route.params.id})
          .then(() => scrollToBottom(this));
      }
    },
  }
}
</script>

<style scoped>

</style>
