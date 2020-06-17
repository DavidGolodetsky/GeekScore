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
            commit('LOADING', true, { root: true })
            const user = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .catch(e => commit('ERROR', e, { root: true }))
            const userPayload = { id: user.user.uid }
            await axios.post('/api/users', userPayload).catch(e => commit('ERROR', e, { root: true }))
            commit('SET_USER', userPayload)
            commit('LOADING', false, { root: true })
        },
        async signInUser({ commit }, payload) {

            commit('LOADING', true, { root: true })
            const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .catch(e => commit('ERROR', e, { root: true }))
            const userPayload = { id: user.user.uid }
            await axios.post('/api/users', userPayload).catch(e => commit('ERROR', e, { root: true }))
            commit('SET_USER', userPayload)
            commit('LOADING', false, { root: true })
        },
        autoSignIn({ commit }, payload) {
            commit('LOADING', true, { root: true })
            commit('SET_USER', { id: payload.uid })
            commit('LOADING', false, { root: true })
        },
        async resetPassword({ commit }, payload) {
            commit('LOADING', true, { root: true })
            await firebase.auth().sendPasswordResetEmail(payload).catch(e => commit('ERROR', e, { root: true }))
            commit('RESET_PASSWORD')
            commit('LOADING', false, { root: true })
        },
        async logout({ commit, rootState }) {
            rootState.games.games = rootState.teams.teams = []
            await firebase.auth().signOut().catch(e => commit('ERROR', e, { root: true }))
            commit('SET_USER', null)
            commit('LOADING', false, { root: true })
            router.push("/")
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