import Vue from 'vue'
import Vuex from 'vuex'
require('firebase/auth')
require('firebase/database');

import Meetup from './meetup/index'
import User from './user/index'
import Shared from './shared/index'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    meetup: Meetup,
    user: User,
    shared: Shared
  }
})