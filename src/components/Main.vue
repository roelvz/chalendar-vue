<template>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Group from "./Group";

export default {
  name: 'Main',
  components: {Group},

  methods: {
    ...mapActions('auth', [
    'isLoggedIn',
    ])
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
