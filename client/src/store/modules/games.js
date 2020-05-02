
import axios from 'axios'

export default {
    namespaced: true,
    state: {
        games: [],
    },
    mutations: {
        SET_LOADED_GAMES(state, payload) {
            state.games = payload
        },
        CREATE_GAME(state, payload) {
            state.games.push(payload)
        },
        UPDATE_GAME(state, payload) {
            const game = state.games.find(game => game._id === payload._id)
            state.games = state.games.filter(game => game._id !== payload._id)
            state.games.push({ ...game, ...payload })
        },
        DELETE_GAME(state, payload) {
            state.games = state.games.filter(game => game._id !== payload)
        }
    },
    actions: {
        loadGames({ commit }) {
            commit('SET_LOADING', true, { root: true })
            axios.get('http://localhost:3000/games')
                .then((res) => {
                    const games = res.data
                    commit('SET_LOADED_GAMES', games)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        createGame({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            const game = {
                ...payload,
                imageUrl: "",
                teams: [],
                favorite: false
            }
            axios.post('http://localhost:3000/games', game)
                .then((res) => {
                    const _id = res.data._id
                    commit("CREATE_GAME", { ...game, _id })
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        updateGame({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            axios.put(`http://localhost:3000/games/${payload._id}`, payload)
                .then(() => {
                    commit("UPDATE_GAME", payload)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        deleteGame({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            axios.delete(`http://localhost:3000/games/${payload._id}`)
                .then(() => {
                    commit("DELETE_GAME", payload._id)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
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