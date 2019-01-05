import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Registratie from './components/Registratie.vue'
import CreateTeam from './components/CreateTeam.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/registratie',
      name: 'registratie',
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
  ]
})
