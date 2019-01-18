import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Registratie from './components/Registratie.vue'
import CreateTeam from './components/CreateTeam.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/registration',
      name: 'registration',
      component:Registratie
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/createteam',
      name: 'createteam',
      component: CreateTeam
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
  ]
})
