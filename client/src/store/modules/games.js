
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
            commit('LOADING', true, { root: true })
            const user = rootState.user.user.id
            const gamePayload = {
                ...payload,
                user,
                imageUrl: "",
                teams: [],
                favorite: false
            }
            try {
                const createdGame = await axios.post('/api/games', gamePayload)
                // TODO:rename _id to id
                commit("CREATE_GAME", { ...gamePayload, _id: createdGame.data._id })
            } catch (e) {
                throw new Error(e)
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async loadGames({ commit, rootState }) {
            commit('LOADING', true, { root: true })
            const user = rootState.user.user.id
            try {
                const games = await axios.get('/api/games', { params: { user } })
                if (games) commit('SET_GAMES', games.data)
            } catch (e) {
                throw new Error(e)
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async updateGame({ commit }, payload) {
            commit('LOADING', true, { root: true })
            try {
                await axios.patch(`/api/games/${payload._id}`, payload)
                commit("UPDATE_GAME", payload)
            } catch (e) {
                throw new Error(e)
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async deleteGame({ commit }, payload) {
            commit('LOADING', true, { root: true })
            try {
                await axios.delete(`/api/games/${payload}`)
                commit("DELETE_GAME", payload)
            } catch (e) {
                throw new Error(e)
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