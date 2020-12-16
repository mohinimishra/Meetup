import Vue from 'vue'
import Vuex from 'vuex'
require('firebase/auth')
require('firebase/database');

Vue.use(Vuex)

export default {
    state: {
        error: null
    },
    mutations: {
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        clearError({ commit }) {
            commit('clearError')
        },

    },
    getters: {
        error(state) {
            return state.error
        },

    }
}