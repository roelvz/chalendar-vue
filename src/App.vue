<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer"
                         :clipped="$vuetify.breakpoint.mdAndUp"
                         app>
      <v-divider></v-divider>

      <v-list v-if="!shouldLogin()" dense class="pt-0">
        <v-list-tile
          v-for="group in groups"
          :key="group.id"
          :to="toGroup(group.id)"
          @click="">
          <v-list-tile-action>
            <v-badge color="red" v-if="group.newMessages > 0">
              <span slot="badge">{{group.newMessages}}</span>
              <v-icon>group</v-icon>
            </v-badge>
            <v-icon v-else>group</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{group.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list v-if="!shouldLogin()" dense class="pt-0">
        <v-list-tile
          v-for="calendar in calendars"
          :key="calendar.id"
          :to="toCalendar(calendar.id)"
          @click="">
          <v-list-tile-action>
            <v-badge color="red" v-if="calendar.newMessages > 0">
              <span slot="badge">{{calendar.newMessages}}</span>
              <v-icon>calendar_today</v-icon>
            </v-badge>
            <v-icon v-else>calendar_today</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{calendar.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list v-if="isAdmin()" dense class="pt-0">
        <v-list-tile to="/admin">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Admin</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app
               :clipped-left="$vuetify.breakpoint.mdAndUp"
               fixed>
      <v-toolbar-title>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span><a href="/">Chalendar</a></span>
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
    }
  },

  methods: {
    handleLogin() {
      login();
      if (isLoggedIn()) {
        setUserInfo(this);
      }
    },
    handleLogout() {
      logout();
    },
    shouldLogin() {
      return !isLoggedIn();
    },

    isAdmin() {
      return this.userInfo && this.userInfo.sub === 'facebook|10217066011620498';
    },

    toGroup(id) { return `/group/${id}`; },

    toCalendar(id) { return `/calendar/${id}`; },

    ...mapActions('groupStore', [
      'initGroups',
    ]),

    ...mapActions('calendarStore', [
      'initCalendars',
    ]),
  },

  computed: mapState({
    userInfo: state => state.userStore.userInfo,
    groups: state => state.groupStore.groups,
    calendars: state => state.calendarStore.calendars,
  }),

  watch: {
    userInfo: function(val) {
      if (val) {
        let temp = this;
        OneSignal.push(function() {
          OneSignal.sendTag("chalendar_user", temp.userInfo.sub);
        });

        OneSignal.push(function() {
          // TODO: refactor
          let given_name = temp.userInfo.given_name;
          if (!temp.userInfo.given_name) {
            if (temp.userInfo.family_name) {
              given_name = temp.userInfo.family_name;
            } else if (email) {
              given_name = temp.userInfo.email;
            } else {
              given_name = 'Unknown';
            }
          }
          if (given_name) {
            OneSignal.sendTag("chalendar_name", given_name);
          }
        });

        this.initGroups(this.userInfo);
        this.initCalendars(this.userInfo);
      }
    },
  }
}

</script>
<style scoped>
a {
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
}
</style>
