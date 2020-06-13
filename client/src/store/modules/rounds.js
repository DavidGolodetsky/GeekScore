import axios from 'axios'

export default {
    namespaced: true,
    state: {
        rounds: null,
    },
    mutations: {
        CREATE_ROUND(state, payload) {
            if (state.rounds) {
                state.rounds = [...state.rounds, payload]
            } else {
                state.rounds = [payload]
            }
        },
        SET_ROUNDS(state, payload) {
            state.rounds = payload
        },
        DELETE_ROUND(state, payload) {
            const rounds = state.rounds.filter(round => round._id !== payload)
            if (rounds.length) {
                state.rounds = rounds
            } else {
                state.rounds = null
            }
        },
    },
    actions: {
        createRound({ commit, rootState }, payload) {
            commit('LOADING', true, { root: true })
            const user = rootState.user.user.id
            const round = {
                ...payload,
                user
            }
            axios.post('/api/rounds', round)
                .then((res) => {
                    const _id = res.data._id
                    commit("CREATE_ROUND", { ...round, _id })
                })
                .catch(e => console.log(e))
                .finally(() => commit('LOADING', false, { root: true }))
        },
        loadRounds({ commit, rootState }) {
            commit('LOADING', true, { root: true })
            const user = rootState.user.user.id;
            axios.get('/api/rounds', { params: { user } })
                .then((res) => {
                    if (res.data.length) commit('SET_ROUNDS', res.data)
                })
                .catch(e => console.log(e))
                .finally(() => commit('LOADING', false, { root: true }))
        },
        deleteRound({ commit }, payload) {
            commit('LOADING', true, { root: true })
            axios.delete(`/api/rounds/${payload}`)
                .then(() => commit("DELETE_ROUND", payload))
                .catch(e => console.log(e))
                .finally(() => commit('LOADING', false, { root: true }))
        },
    },
    getters: {
        getRounds(state) {
            return (query) => {
                if (state.rounds) {
                    const teamRounds = state.rounds.filter(round => round.teamId === query.teamId)
                    return teamRounds.filter(round => round.gameId === query.gameId)
                }
            }
        },
    }
}