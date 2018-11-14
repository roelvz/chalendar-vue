<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer"
                         :clipped="$vuetify.breakpoint.mdAndUp"
                         app>
      <v-divider></v-divider>

      <v-list v-if="!shouldLogin() && !loadingGroups" dense class="pt-0">
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
      <div v-if="loadingGroups">
        <span>Loading groups ...</span>
        <v-progress-circular :size="20" color="primary" indeterminate></v-progress-circular>
      </div>

      <v-list v-if="!shouldLogin() && !loadingCalendars" dense class="pt-0">
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
      <div v-if="loadingCalendars">
        <span>Loading calendars ...</span>
        <v-progress-circular :size="20" color="primary" indeterminate></v-progress-circular>
      </div>

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
        <span>{{title}}</span>
      </v-toolbar-title>
      <v-toolbar-title v-if="shouldLogin()">
        <v-btn @click="handleLogin()">Login</v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title v-if="!shouldLogin()">
        <v-menu v-if="chatter" >
          <v-avatar slot="activator" :tile="false" size="56px" color="grey lighten-4">
            <img :src="chatter.picture" alt="avatar">
          </v-avatar>
          <v-list>
            <v-list-tile v-for="(item, index) in profileMenuItems" :key="index" :to="item.to" @click="item.onClick()">
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <div v-else>
          <span>Logging in ...</span>
          <v-progress-circular :size="20" color="primary" indeterminate></v-progress-circular>
        </div>
      </v-toolbar-title>
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
import { setVue, isLoggedIn, login, logout, getAccessToken, getIdToken, setUserInfo } from './utils/auth';

import Group from "./components/Group";

export default {
  name: 'App',
  components: {Group},
  data () {
    return {
      loadingGroups: false,
      loadingCalendars: false,
      drawer: null,
      profileMenuItems: [
        {
          title: 'Profile',
          to: '/profile',
          onClick(){},
        },
        {
          title: 'Logout',
          to: '',
          onClick: this.handleLogout,
        },
      ]
    }
  },

  created() {
    console.log("CREARTED APP");
  },

  mounted() {
    console.log("MOUNTED APP");

    this.$cookies.config('30d');
    setVue(this);
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
      return this.chatter && (this.chatter.id === 'facebook|10217066011620498' || this.chatter.id === 'facebook|10217386796239913');
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
    chatter: state => state.userStore.chatter,
    groups: state => state.groupStore.groups,
    calendars: state => state.calendarStore.calendars,
    title: state => state.userStore.title,
  }),

  watch: {
    chatter: function(val) {
      if (val) {
        let temp = this;
        OneSignal.push(function() {
          OneSignal.sendTag("chalendar_user", temp.chatter.id);
        });

        OneSignal.push(function() {
          if (temp.chatter.firstName) {
            OneSignal.sendTag("chalendar_name", temp.chatter.firstName);
          }
        });

        this.loadingGroups = true;
        this.initGroups(this.chatter)
          .then(() => { this.loadingGroups = false });

        this.loadingCalendars = true;
        this.initCalendars(this.chatter)
          .then(() => { this.loadingCalendars = false });
      }
    },
  }
}

</script>
<style scoped>
</style>
