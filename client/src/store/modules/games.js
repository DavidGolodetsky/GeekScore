
import axios from 'axios'

export default {
    namespaced: true,
    state: {
        games: null,
    },
    mutations: {
        CREATE_GAME(state, payload) {
            state.games
                ? state.games = [...state.games, payload]
                : state.games = [payload]
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
            games.length ? state.games = games : state.games = null
        }
    },
    actions: {
        async createGame({ commit, rootState }, payload) {
            try {
                const user = rootState.user.user.id
                const gamePayload = {
                    ...payload,
                    user,
                    imageUrl: "",
                    teams: [],
                    favorite: false
                }
                const createdGame = await axios.post('/api/games', gamePayload)
                commit('LOADING', true, { root: true })
                commit("CREATE_GAME", { ...createdGame.data })
            } catch (e) {
                commit('ERROR', e, { root: true })
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async loadGames({ commit, rootState }) {
            try {
                const user = rootState.user.user.id
                commit('LOADING', true, { root: true })
                const games = await axios.get('/api/games', { params: { user } })
                commit('SET_GAMES', games.data)
            } catch (e) {
                commit('ERROR', e, { root: true })
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async updateGame({ commit }, payload) {
            try {
                commit('LOADING', true, { root: true })
                await axios.patch(`/api/games/${payload._id}`, payload)
                commit("UPDATE_GAME", payload)
            } catch (e) {
                commit('ERROR', e, { root: true })
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async deleteGame({ commit }, payload) {
            try {
                commit('LOADING', true, { root: true })
                await axios.delete(`/api/games/${payload}`)
                commit("DELETE_GAME", payload)
            } catch (e) {
                commit('ERROR', e, { root: true })
            } finally {
                commit('LOADING', false, { root: true })
            }
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