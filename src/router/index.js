import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthRoute from './authRouter'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/meetups',
    name: 'meetups',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MeetUps/meetup.vue')
  },
  {
    path: '/meetup/new',
    name: 'create',
    component: () => import('../views/MeetUps/CreateMeetup.vue'),
    beforeEnter: AuthRoute
  },
  {
    path: '/meetups/:id',
    name: 'Meetup',
    props: true,
    component: () => import('../views/MeetUps/viewMeetup.vue'),
    beforeEnter: AuthRoute

  },
  {
    path: '/profile',
    name: 'profile',
    beforeEnter: AuthRoute,
    component: () => import('../views/Users/profile.vue')
  },
  {
    path: '/signin',
    name: 'signin',

    component: () => import('../views/Users/signIn.vue')
  },
  {
    path: '/signup',
    name: 'signup',

    component: () => import('../views/Users/signup.vue')
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
