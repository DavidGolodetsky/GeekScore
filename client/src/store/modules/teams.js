import axios from 'axios'

export default {
    namespaced: true,
    state: {
        teams: null,
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
        updateTeam({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            axios.patch(`/api/teams/${payload._id}`, payload)
                .then(() => commit("UPDATE_TEAM", payload))
                .catch(e => console.log(e))
                .finally(() => commit('SET_LOADING', false, { root: true }))
        },
        deleteTeam({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            axios.delete(`/api/teams/${payload}`)
                .then(() => commit("DELETE_TEAM", payload))
                .catch(e => console.log(e))
                .finally(() => commit('SET_LOADING', false, { root: true }))

        },
    },
    getters: {
        teams(state) {
            return state.teams
        },
        team(state) {
            return (teamId) => {
                if (state.teams) {
                    return state.teams.find(team => team._id === teamId)
                }
            }
        },
        gameTeams(state) {
            return (gameId) => {
                if (state.teams) {
                    return state.teams.filter(team => team.games.includes(gameId))
                }
            }
        }
    },
}