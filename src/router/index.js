import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Group from '@/components/Group'
import Calendar from '@/components/Calendar'
import Event from '@/components/Event'
import AddEvent from '@/components/AddEvent'
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
    {
      path: '/calendar/:id',
      name: 'Calendar',
      component: Calendar,
    },
    {
      path: '/calendar/:calendarId/event/add',
      name: 'AddEvent',
      component: AddEvent,
    },
    {
      path: '/calendar/:calendarId/event/:id',
      name: 'Event',
      component: Event,
    }
  ]
})
