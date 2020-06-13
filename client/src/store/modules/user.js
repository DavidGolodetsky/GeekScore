import firebase from 'firebase/app';
import axios from 'axios'


export default {
    namespaced: true,
    state: {
        user: null,
        resetPassword: false
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        },
        RESET_PASSWORD(state) {
            state.resetPassword = true
        }
    },
    actions: {
        signUpUser({ commit }, payload) {
            commit('LOADING', true, { root: true })
            commit('ERROR', null, { root: true })
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    if (user.user) {
                        const newUser = {
                            id: user.user.uid,
                        }
                        axios.post('/api/users', newUser)
                            .then(() => commit('SET_USER', newUser))
                            .catch(e => console.log(e))
                            .finally(() => commit('LOADING', false, { root: true }))
                    }
                }
                )
                .catch(e => commit('ERROR', e, { root: true }))
                .finally(() => commit('LOADING', false, { root: true }))
        },
        signInUser({ commit }, payload) {
            commit('LOADING', true, { root: true })
            commit('ERROR', null, { root: true })
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    if (user.user) {
                        const loggedUser = {
                            id: user.user.uid,
                        }
                        commit('SET_USER', loggedUser)
                    }
                })
                .catch(e => commit('ERROR', e, { root: true }))
                .finally(() => commit('LOADING', false, { root: true }))
        },
        autoSignIn({ commit }, payload) {
            commit('LOADING', true, { root: true })
            commit('SET_USER', { id: payload.uid })
            commit('LOADING', false, { root: true })
        },
        resetPassword({ commit }, payload) {
            commit('LOADING', true, { root: true })
            firebase.auth().sendPasswordResetEmail(payload)
                .then(() => commit('RESET_PASSWORD'))
                .catch(e => commit('ERROR', e, { root: true }))
                .finally(() => commit('LOADING', false, { root: true }))
        },
        logout({ commit, rootState }) {
            rootState.games.games = rootState.teams.teams = []
            firebase.auth().signOut()
            commit('SET_USER', null)
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        resetPassword(state) {
            return state.resetPassword
        },
    }
}