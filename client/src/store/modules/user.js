import firebase from 'firebase/app';
import router from '@/router'
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
        async signUpUser({ commit }, payload) {
            try {
                commit('LOADING', true, { root: true })
                const user = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                const userPayload = { id: user.user.uid }
                await axios.post('/api/users', userPayload)
                commit('SET_USER', userPayload)
            } catch (e) {
                commit('ERROR', e, { root: true })
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async signInUser({ commit }, payload) {
            try {
                commit('LOADING', true, { root: true })
                const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                const userPayload = { id: user.user.uid }
                await axios.post('/api/users', userPayload)
                commit('SET_USER', userPayload)
            } catch (e) {
                commit('ERROR', e, { root: true })
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        autoSignIn({ commit }, payload) {
            commit('LOADING', true, { root: true })
            commit('SET_USER', { id: payload.uid })
            commit('LOADING', false, { root: true })
        },
        async resetPassword({ commit }, payload) {
            try {
                commit('LOADING', true, { root: true })
                await firebase.auth().sendPasswordResetEmail(payload)
                commit('RESET_PASSWORD')
            } catch (e) {
                commit('ERROR', e, { root: true })
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async logout({ commit, rootState }) {
            try {
                rootState.games.games = rootState.teams.teams = null
                await firebase.auth().signOut()
                commit('SET_USER', null)
                router.push("/")
            } catch (e) {
                commit('ERROR', e, { root: true })
            } finally {
                commit('LOADING', false, { root: true })
            }
        }
    },
    getters: {
        getUser(state) {
            return state.user
        },
        isResetPasswordDone(state) {
            return state.resetPassword
        },
    }
}