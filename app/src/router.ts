import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Registratie from './components/Registratie.vue'
import TeamView from './components/Team.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registratie
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/teamview',
      name: 'teamview',
      component: TeamView//,
      //meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile//,
      //meta: { requiresAuth: true }
    },
  ]

});

// router.beforeEach((to, from, next) => {
//   // const currentUser = firebase.auth().currentUser;
//   // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//   // if (requiresAuth && !currentUser) next('login');
//   // else if (!requiresAuth && currentUser) next("home");
//   // else next();
// });

export default router;