import firebase from 'firebase/app';


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
        logout({ commit }) {
            firebase.auth().signOut()
            commit('SET_USER', null)
        },
        signUpUser({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            commit('CLEAR_ERROR', null, { root: true })
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('SET_LOADING', false, { root: true })
                        if (user.user) {
                            const newUser = {
                                id: user.user.uid,
                            }
                            commit('SET_USER', newUser)
                        }
                    }
                )
                .catch(
                    error => {
                        commit('SET_LOADING', false, { root: true })
                        commit('SET_ERROR', error, { root: true })
                    }
                )
        },
        signInUser({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            commit('CLEAR_ERROR', null, { root: true })
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('SET_LOADING', false, { root: true })
                        if (user.user) {
                            const loggedUser = {
                                id: user.user.uid,
                            }
                            commit('SET_USER', loggedUser)
                        }
                    }
                )
                .catch(
                    error => {
                        commit('SET_LOADING', false, { root: true })
                        commit('SET_ERROR', error, { root: true })
                    }
                )
        },
        autoSignIn({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            commit('SET_USER', { id: payload.uid })
            commit('SET_LOADING', false, { root: true })
        },
        resetPassword({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            firebase.auth().sendPasswordResetEmail(payload)
                .then(() => {
                    commit('RESET_PASSWORD');
                    commit('SET_LOADING', false, { root: true })
                })
                .catch(
                    error => {
                        commit('SET_ERROR', error, { root: true })
                        commit('SET_LOADING', false, { root: true })
                    }
                )
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