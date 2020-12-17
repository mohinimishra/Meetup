import Vue from 'vue'
import Vuex from 'vuex'
import { firebase } from '@firebase/app'
require('firebase/auth')
require('firebase/database');
require('firebase/firebase-auth')
// import emailjs from 'emailjs-com'




Vue.use(Vuex)

export default {
    state: {
        user: null,
        error: null,
        sucess: null
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
        // updatePass(payload) {
        //     const updateObj = {}

        //     if (payload.password) {
        //         updateObj.password = payload.password
        //     }
        //     let user = firebase.auth().getInstance().getCurrentUser()
        //     user.updatePassword(updateObj)
        //     // firebase.default.auth().ref('/users/').update(updateObj)
        //     //     .then((data) => {
        //     //         commit('setUser', payload)
        //     //         console.log(payload)
        //     //         console.log(data)

        //     //     })
        //     //     .catch((err) => {
        //     //         console.log(err)
        //     //     })
        // },
        passReset({ commit }, payload) {
            firebase.auth().sendPasswordResetEmail(payload.email)
                .then((data) => {
                    console.log(data, "sucessfull reset");
                })
                .catch(err => {
                    commit('setError', err)
                    console.log(err)
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
        },
        // verifyOTP({ commit }, payload) {

        //     firebase.default.auth().fetchSignInMethodsForEmail(payload.email).then((data) => {
        //         if (data.length > 0) {
        //             let RandomNumber = parseInt(Math.random() * (9999 - 1000) + 1000)
        //             console.log(RandomNumber)
        //             localStorage.setItem(payload.email, RandomNumber);

        //             emailjs.send('service_ruxgjce', 'template_q4duchq',
        //                 {
        //                     message: `Your otp is ${RandomNumber}`,
        //                     email_to: payload.email
        //                 }, 'user_FA0LIMJPCS8ymSLUgovSu').then((response) => {
        //                     console.log(response.text, response.status)

        //                     commit('setSucess', { msg: 'OTP sent sucessfully' })


        //                 }).catch(err => console.log(err))

        //         } else {
        //             commit('setError', new Error('Email is not valid or not register with us'))

        //         }
        //     }).catch(err => {
        //         commit('setError', err)
        //     })

        // },
        // confirmOTP({ commit }, payload) {
        //     var data = parseInt(localStorage.getItem(payload.email))
        //     if (data == payload.OTP) {
        //         console.log("Sucess")
        //     } else {
        //         console.log("error")
        //         commit('setError', new Error('OTP is not valid.'))
        //     }
        // }

    },
    getters: {
        validateUser(state) {
            return state.user
        },


    }
}