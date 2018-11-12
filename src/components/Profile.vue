<template>
  <v-container fluid v-if="chatter">
    <v-text-field label="First name" v-model="firstName" :value="chatter.firstName"></v-text-field>
    <v-text-field label="Last name" v-model="lastName" :value="chatter.lastName"></v-text-field>
    <v-text-field label="E-mail" v-model="email" :value="chatter.email"></v-text-field>
    <v-btn @click="save()">Save</v-btn>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: "Profile",

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
    }
  },

  mounted() {
    if (this.chatter) {
      this.firstName = this.chatter.firstName;
      this.lastName = this.chatter.lastName;
      this.email = this.chatter.email;
    }
  },

  methods: {
    save() {
      this.updateChatter({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      })
        .then(alert('Profile saved'));
    },

    ...mapActions('userStore', [
      'updateChatter',
    ]),
  },

  computed: mapState({
    chatter: state => state.userStore.chatter,
  }),

  watch: {
    chatter(val) {
      if (val) {
        this.firstName = val.firstName;
        this.lastName = val.lastName;
        this.email = val.email;
      }
    },
  }
}
</script>

<style scoped>

</style>
