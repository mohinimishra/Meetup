import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import * as firebase from 'firebase'
import { firebase } from '@firebase/app'
import Alert from './views/sharedComp/alert.vue'
require('firebase/auth')



Vue.config.productionTip = false
Vue.component('app-alert', Alert)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBpmNrllruWfYlLrvyhn_fZfRLR9h50xAc",
      authDomain: "vue-js-90f39.firebaseapp.com",
      databaseURL: "https://vue-js-90f39.firebaseio.com",
      projectId: "vue-js-90f39",
      storageBucket: "gs://vue-js-90f39.appspot.com",
      messagingSenderId: "857437786314",
      appId: "1:857437786314:web:421f45f98c830a1659a433",
      measurementId: "G-BEQDPHBSQF"
    })
    firebase.default.auth().onAuthStateChanged((validateUser) => {
      this.$store.dispatch('autoSignin', validateUser)
      this.$store.dispatch('fetchUserDate')

    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
