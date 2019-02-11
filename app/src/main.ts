import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import cors from 'cors';

Vue.use(ElementUI);
Vue.config.productionTip = false;

cors({
  origin:['http://192.168.10.115'],
  methods:['POST'],
  credentials: true // enable set cookie
});

let app = '';

// firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
// });