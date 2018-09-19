<template>
  <v-container fluid>
    <div>{{loadedGroup.name}}</div>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: "Group",

  created() {
    this.loadGroup(this.$route.params.id);
  },

  methods: {
    ...mapActions('groupStore', [
      'loadGroup',
    ]),
  },

  computed: mapState({
    loadedGroup: state => state.groupStore.loadedGroup,
  }),
}
</script>

<style scoped>

</style>
