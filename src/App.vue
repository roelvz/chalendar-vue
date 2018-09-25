<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer"
                         :clipped="$vuetify.breakpoint.mdAndUp"
                         app>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Groups
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list v-if="!shouldLogin()" dense class="pt-0">
        <v-list-tile
          v-for="group in groups"
          :key="group.id"
          :to="to(group.id)"
          @click="">
          <v-list-tile-action>
            <v-icon>group</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ group.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app
               :clipped-left="$vuetify.breakpoint.mdAndUp"
               fixed>
      <v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span>Chalendar</span>
      </v-toolbar-title>
      <v-toolbar-title v-if="shouldLogin()">
        <v-btn @click="handleLogin()">Login</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-title v-if="userInfo">
        <v-avatar :tile="false" size="56px" color="grey lighten-4">
          <img :src="userInfo.picture" alt="avatar">
        </v-avatar>
      </v-toolbar-title>
      <v-btn v-if="!shouldLogin()" @click="handleLogout()">Logout</v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer fixed app>
      <span>&copy; 2018 - Roel Van Zeebroeck</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { isLoggedIn, login, logout, getAccessToken, getIdToken, setUserInfo } from './utils/auth';

import Group from "./components/Group";

export default {
  name: 'App',
  components: {Group},
  data () {
    return {
      drawer: null,
    }
  },

  mounted() {
    if (isLoggedIn()) {
      setUserInfo(this);
      this.initGroups();
    }
  },

  methods: {
    handleLogin() {
      login();
      if (isLoggedIn()) {
        setUserInfo(this);
        this.initGroups();
      }
    },
    handleLogout() {
      logout();
    },
    shouldLogin() {
      return !isLoggedIn();
    },

    to(id) { return `/group/${id}`; },

    ...mapActions('groupStore', [
      'initGroups',
    ]),
  },

  computed: mapState({
    groups: state => state.groupStore.groups,
    userInfo: state => state.userStore.userInfo,
  }),
}

</script>
