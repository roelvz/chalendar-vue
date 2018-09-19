import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Group from '@/components/Group'
import Callback from '@/components/callback'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
    },
    {
      path: '/group/:id',
      name: 'Group',
      component: Group,
    },
  ]
})
