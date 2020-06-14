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
        async createRound({ commit, rootState }, payload) {
            try {
                const user = rootState.user.user.id
                const roundPayload = {
                    ...payload,
                    user
                }
                commit('LOADING', true, { root: true })
                const createdRound = await axios.post('/api/rounds', roundPayload)
                commit("CREATE_ROUND", { ...createdRound.data })
            } catch (e) {
                commit('ERROR', e, { root: true })
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async loadRounds({ commit, rootState }) {
            try {
                const user = rootState.user.user.id;
                commit('LOADING', true, { root: true })
                const rounds = await axios.get('/api/rounds', { params: { user } })
                commit('SET_ROUNDS', rounds.data)
            } catch (e) {
                commit('ERROR', e, { root: true })
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async deleteRound({ commit }, payload) {
            try {
                commit('LOADING', true, { root: true })
                await axios.delete(`/api/rounds/${payload}`)
                commit("DELETE_ROUND", payload)
            } catch (e) {
                commit('ERROR', e, { root: true })
            } finally {
                commit('LOADING', false, { root: true })
            }
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