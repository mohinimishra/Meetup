import Vue from 'vue'
import Vuex from 'vuex'
import { firebase } from '@firebase/app'
require('firebase/auth')
require('firebase/database');

Vue.use(Vuex)

export default {
    state: {
        user: null,
        error: null
    },
    mutations: {
        registerUserForMeetup(state, payload) {
            const id = payload.id
            if (state.user.registerId.findIndex(meetup => meetup.id === id) >= 0) {
                return
            }
            state.user.registerId.push(id)
            state.user.fbKeys[id] = payload.fbKey
        },
        unregisterUserForMeetup(state, payload) {
            const registerId = state.user.registerId
            registerId.splice(registerId.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fbKeys, payload)
        },

        setUser(state, payload) {
            state.user = payload
        },
    },
    actions: {
        registerUserForMeetup({ commit, getters }, payload) {
            const user = getters.validateUser
            firebase.database().ref('/users/' + user.id).child('/registrations/')
                .push(payload)
                .then((data) => {
                    commit('registerUserForMeetup', { id: payload, fbKey: data.key })
                })
                .catch((err) => { console.log(err) })
        },
        unregisterUserForMeetup({ commit, getters }, payload) {
            const user = getters.validateUser
            if (!user.fbKeys) {
                return
            }
            const fbKey = user.fbKeys[payload]
            firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey).remove()
                .then(() => {
                    commit('unregisterUserForMeetup', payload)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        User({ commit }, payload) {
            commit('clearError')
            firebase.default.auth().createUserWithEmailAndPassword(payload.email, payload.password).then((data) => {
                const newUser = {
                    id: data.uid,
                    registerId: [],
                    fbKeys: {},
                }
                commit('setUser', newUser)
            }).catch((err) => {
                commit('setError', err)
            })
        },
        autoSignin({ commit }, payload) {
            commit('setUser', { id: payload.uid, registerId: [], fbKeys: {} })
        },
        fetchUserDate({ commit, getters }) {
            firebase.database().ref('/users/' + getters.validateUser.id + '/registrations').once('value').the((data) => {
                const value = data.val()
                let registerdMeetups = []
                let swappedVal = {}
                for (let key in value) {
                    registerdMeetups.push(value[key])
                    swappedVal[value[key]] = key
                }
                const updateUser = {
                    id: getters.validateUser.id,
                    registerdMeetups: registerdMeetups,
                    fbKeys: swappedVal
                }
                commit('setUser', updateUser)
            }).catch((err) => { console.log(err) })
        },
        logout({ commit }) {
            firebase.auth().signOut()
            commit('setUser', null)
        },

        signInUser({ commit }, payload) {
            commit('clearError')
            firebase.default.auth().signInWithEmailAndPassword(payload.email, payload.password).then((data) => {
                const newUser = {
                    id: data.uid,
                    registerId: [],
                    fbKeys: {},
                }
                commit('setUser', newUser)
            }).catch(err => {
                commit('setError', err)
                console.log(err)
            })
        }
    },
    getters: {
        validateUser(state) {
            return state.user
        },


    }
}