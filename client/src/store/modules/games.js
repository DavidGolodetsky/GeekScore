
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
        SET_LOADED_GAMES(state, payload) {
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
        createGame({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            const game = {
                ...payload,
                user,
                imageUrl: "",
                teams: [],
                favorite: false
            }
            axios.post('/api/games', game)
                .then((res) => {
                    const _id = res.data._id
                    commit("CREATE_GAME", { ...game, _id })
                })
                .catch(e => console.log(e))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        },
        loadGames({ commit, rootState }) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            axios.get('/api/games', { params: { user } })
                .then((res) => {
                    if (res.data.length) commit('SET_LOADED_GAMES', res.data)
                })
                .catch(e => console.log(e))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        },
        updateGame({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            axios.put(`/api/games/${payload._id}`, payload)
                .then(() => commit("UPDATE_GAME", payload))
                .catch(e => console.log(e))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        },
        deleteGame({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            axios.delete(`/api/games/${payload._id}`)
                .then(() => commit("DELETE_GAME", payload._id))
                .catch(e => console.log(e))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        }
    },
    getters: {
        games(state) {
            return state.games
        },
        game(state) {
            return (gameId) => {
                return state.games.find((game) => {
                    return game._id === gameId
                })
            }
        },
    }
}