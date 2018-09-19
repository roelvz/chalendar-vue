<template>
  <v-app dark>
    <login></login>

    <v-navigation-drawer fixed clipped app>
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

      <v-list dense class="pt-0">
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
import Login from "./components/Login";
import Group from "./components/Group";

export default {
  name: 'App',
  components: {Login, Group},
  data () {
    return {
    }
  },

  methods: {
    to(id) { return `/group/${id}`; },
  },

  computed: mapState({
    groups: state => state.groupStore.groups,
  }),
}

</script>
