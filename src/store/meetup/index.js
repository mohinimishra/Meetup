import Vue from 'vue'
import Vuex from 'vuex'
import { firebase } from '@firebase/app'
require('firebase/auth')
require('firebase/database');

Vue.use(Vuex)

export default {
    state: {
        loadedMeetups: [
        ],
        user: null,
        error: null
    },
    mutations: {
        setLoadedMeetups(state, payload) {
            state.loadedMeetups = payload
        },
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        },
        updateMeetup(state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if (payload.title) {
                meetup.title = payload.title
            }
            if (payload.description) {
                meetup.description = payload.description
            }
            if (payload.location) {
                meetup.location = payload.location
            }
            if (payload.date) {
                meetup.date = payload.date
            }
        },
    },
    actions: {
        loadMeetups({ commit }) {
            firebase.database().ref('meetups').once('value').then((data) => {
                const meetups = []
                const obj = data.val()
                for (let key in obj) {
                    meetups.push({
                        id: key,
                        title: obj[key].title,
                        description: obj[key].description,
                        location: obj[key].location,
                        imageUrl: obj[key].imageUrl,
                        date: obj[key].date,
                        createrId: obj[key].createrId
                    })
                } commit('setLoadedMeetups', meetups)
            }).catch((err) => {
                console.log(err)
            })
        },
        createMeetup({ commit }, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                createrId: this.getters.validateUser.id
            }
            firebase.database().ref('meetups').push(meetup).then((data) => {
                const key = data.key
                commit('createMeetup', { ...meetup, id: key })
            }).catch((err) => {
                console.log(err)
            })
        },
        updateMeetupData({ commit }, payload) {
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.location) {
                updateObj.location = payload.location
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
                .then((data) => {
                    commit('updateMeetup', payload)
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find((Meetup) => {
                    return Meetup.id == meetupId
                })
            }
        },
    }
}