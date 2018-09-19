<template>
  <v-dialog v-model="shouldLogin" width="500" persistent>
    <v-container>
      <v-form @submit="doLogin()">
        <v-layout row>
          <v-flex xs12>
            <v-text-field
              label="Email"
              v-model="email"
              required></v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              required></v-text-field>
            <v-btn type="submit">Login</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-container>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: "Login",

  data () {
    return {
      email: '',
      password: '',
    }
  },

  methods: {
    doLogin() {
      this.login({email: this.email, password: this.password});
    },

    ...mapActions('auth', [
      'login',
      'logout',
    ]),

    ...mapActions('groupStore', [
      'initGroups',
    ]),
  },

  computed: {
    shouldLogin: {
      get() { return !this.$store.state.auth.loggedIn; },
      set(value) {}
    },
  }
}
</script>

<style scoped>

</style>
