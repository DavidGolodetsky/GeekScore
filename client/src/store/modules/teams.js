import axios from 'axios'

export default {
    namespaced: true,
    state: {
        teams: null,
        gameTeams: null
    },
    mutations: {
        CREATE_TEAM(state, payload) {
            if (state.gameTeams) {
                state.gameTeams.push(payload)
            }
            if (state.teams) {
                state.teams = [...state.teams, payload]
            } else {
                state.teams = [payload]
            }
        },
        LOAD_TEAMS(state, payload) {
            state.teams = payload
        },
        LOAD_GAME_TEAMS(state, payload) {
            state.gameTeams = payload
        },
        // TODO: is it works?
        UPDATE_TEAM(state, payload) {
            const team = state.teams.find(team => team._id === payload._id)
            state.teams = state.teams.filter(team => team._id !== payload._id)
            state.teams.push({ ...team, ...payload })
        },
        DELETE_TEAM(state, payload) {
            const teams = state.teams.filter(team => team._id !== payload)
            if (teams.length) {
                state.teams = teams
            } else {
                state.teams = null
            }
        },
    },
    actions: {
        createTeam({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            const team = {
                ...payload,
                user,
                rounds: {},
                favorite: false
            }
            axios.post('/api/teams', team)
                .then((res) => {
                    const _id = res.data._id
                    commit("CREATE_TEAM", { ...team, _id })
                })
                .catch(e => console.log(e))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        },
        loadTeams({ commit, rootState }) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            axios.get('/api/teams', { params: { user } })
                .then((res) => {
                    if (res.data.length) commit('LOAD_TEAMS', res.data)
                })
                .catch(e => console.log(e))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        },
        loadGameTeams({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            const gameId = payload
            axios.get("/api/teams/game", { params: { user, gameId } })
                .then((res) => {
                    if (res.data.length) commit('LOAD_GAME_TEAMS', res.data)
                })
                .catch(e => console.log(e))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        },
        updateTeam({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            axios.put(`/api/teams/${payload._id}`, payload)
                .then(() => commit("UPDATE_TEAM", payload))
                .catch(e => console.log(e))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        },
        deleteTeam({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            axios.delete(`/api/teams/${payload._id}`)
                .then(() => commit("DELETE_TEAM", payload))
                .catch(e => console.log(e))
                .finally(() => commit('SET_LOADING', false, { root: true }))

        },
    },
    getters: {
        teams(state) {
            return state.teams
        },
        gameTeams(state) {
            return (gameId) => {
                if (state.teams) {
                    return state.teams.filter(team => team.games.includes(gameId))
                }
            }
        },
        gameTeam(state) {
            return (teamId) => {
                if (state.gameTeams) {
                    return state.gameTeams.find(team => team._id === teamId)
                }
            }
        },
        gameTeamsAPI(state) {
            return state.gameTeams
        },
    },
}