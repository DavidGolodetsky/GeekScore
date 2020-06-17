
import axios from 'axios'

export default {
    namespaced: true,
    state: {
        games: null,
    },
    mutations: {
        CREATE_GAME(state, payload) {
            if (state.games) {
                state.games = [...state.games, payload]
            } else {
                state.games = [payload]
            }
        },
        SET_GAMES(state, payload) {
            state.games = payload
        },
        UPDATE_GAME(state, payload) {
            const game = state.games.find(game => game._id === payload._id)
            state.games = state.games.filter(game => game._id !== payload._id)
            state.games.push({ ...game, ...payload })
        },
        DELETE_GAME(state, payload) {
            const games = state.games.filter(game => game._id !== payload)
            if (games.length) {
                state.games = games
            } else {
                state.games = null
            }
        }
    },
    actions: {
        async createGame({ commit, rootState }, payload) {
            const user = rootState.user.user.id
            const gamePayload = {
                ...payload,
                user,
                imageUrl: "",
                teams: [],
                favorite: false
            }
            const createdGame = await axios.post('/api/games', gamePayload).catch(e => commit('ERROR', e, { root: true }))
            commit('LOADING', true, { root: true })

            commit("CREATE_GAME", { ...createdGame.data })
            commit('LOADING', false, { root: true })
        },
        async loadGames({ commit, rootState }) {
            const user = rootState.user.user.id
            commit('LOADING', true, { root: true })
            const games = await axios.get('/api/games', { params: { user } }).catch(e => commit('ERROR', e, { root: true }))
            commit('SET_GAMES', games.data)
            commit('LOADING', false, { root: true })
        },
        async updateGame({ commit }, payload) {
            commit('LOADING', true, { root: true })
            await axios.patch(`/api/games/${payload._id}`, payload).catch(e => commit('ERROR', e, { root: true }))
            commit("UPDATE_GAME", payload)
            commit('LOADING', false, { root: true })
        },
        async deleteGame({ commit }, payload) {
            commit('LOADING', true, { root: true })
            await axios.delete(`/api/games/${payload}`).catch(e => commit('ERROR', e, { root: true }))
            commit("DELETE_GAME", payload)
            commit('LOADING', false, { root: true })
        }
    },
    getters: {
        getGames(state) {
            return state.games
        },
        getGame(state) {
            return (gameId) => {
                return state.games.find((game) => {
                    return game._id === gameId
                })
            }
        },
    }
}