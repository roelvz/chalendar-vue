// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueTimeago from 'vue-timeago'
import linkify from 'vue-linkify'
import VueCookies from 'vue-cookies'

Vue.use(Vuetify);
Vue.use(VueCookies);

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'en-US': require('date-fns/locale/en'),
  }
});

Vue.directive('linkified', linkify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
