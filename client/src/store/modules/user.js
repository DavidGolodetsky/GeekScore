import firebase from 'firebase/app';
import axios from 'axios'


export default {
    namespaced: true,
    state: {
        user: null,
        resettedPassword: false
    },
    mutations: {
        SET_USER(state, payload) {
            state.user = payload
        },
        RESET_PASSWORD(state) {
            state.resettedPassword = true
        }
    },
    actions: {
        logout({ commit, rootState }) {
            rootState.games.games = rootState.teams.teams = []
            firebase.auth().signOut()
            commit('SET_USER', null)
        },
        signUpUser({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            commit('CLEAR_ERROR', null, { root: true })
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    if (user.user) {
                        const newUser = {
                            id: user.user.uid,
                        }
                        axios.post('/api/users', newUser)
                            .then(() => commit('SET_USER', newUser))
                            .catch(e => console.log(e))
                            .finally(() => commit('SET_LOADING', false, { root: true }))
                    }
                }
                )
                .catch(e => commit('SET_ERROR', e, { root: true }))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        },
        signInUser({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            commit('CLEAR_ERROR', null, { root: true })
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    if (user.user) {
                        const loggedUser = {
                            id: user.user.uid,
                        }
                        commit('SET_USER', loggedUser)
                    }
                }
                )
                .catch(e => commit('SET_ERROR', e, { root: true }))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        },
        autoSignIn({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            commit('SET_USER', { id: payload.uid })
            commit('SET_LOADING', false, { root: true })
        },
        resetPassword({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            firebase.auth().sendPasswordResetEmail(payload)
                .then(() => commit('RESET_PASSWORD'))
                .catch(e => commit('SET_ERROR', e, { root: true }))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        }
    },
    getters: {
        user(state) {
            return state.user
        },
        resettedPassword(state) {
            return state.resettedPassword
        },
    }
}