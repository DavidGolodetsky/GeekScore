import axios from 'axios'

export default {
    namespaced: true,
    state: {
        teams: null,
    },
    mutations: {
        CREATE_TEAM(state, payload) {
            if (state.teams) {
                state.teams = [...state.teams, payload]
            } else {
                state.teams = [payload]
            }
        },
        SET_TEAMS(state, payload) {
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
        async createTeam({ commit, rootState }, payload) {
            const user = rootState.user.user.id
            const teamPayload = {
                ...payload,
                user,
                favorite: false
            }
            commit('LOADING', true, { root: true })
            const createdTeam = await axios.post('/api/teams', teamPayload).catch(e => commit('ERROR', e, { root: true }))
            commit("CREATE_TEAM", { ...createdTeam.data })
            commit('LOADING', false, { root: true })
        },
        async loadTeams({ commit, rootState }) {
            const user = rootState.user.user.id
            commit('LOADING', true, { root: true })
            const teams = await axios.get('/api/teams', { params: { user } }).catch(e => commit('ERROR', e, { root: true }))
            commit('SET_TEAMS', teams.data)
            commit('LOADING', false, { root: true })
        },
        async updateTeam({ commit }, payload) {
            commit('LOADING', true, { root: true })
            await axios.patch(`/api/teams/${payload._id}`, payload).catch(e => commit('ERROR', e, { root: true }))
            commit("UPDATE_TEAM", payload)
            commit('LOADING', false, { root: true })
        },
        async deleteTeam({ commit }, payload) {
            commit('LOADING', true, { root: true })
            await axios.delete(`/api/teams/${payload}`).catch(e => commit('ERROR', e, { root: true }))
            commit("DELETE_TEAM", payload)
            commit('LOADING', false, { root: true })
        },
    },
    getters: {
        getTeams(state) {
            return state.teams
        },
        getTeam(state) {
            return (teamId) => {
                if (state.teams) {
                    return state.teams.find(team => team._id === teamId)
                }
            }
        },
        getGameTeams(state) {
            return (gameId) => {
                if (state.teams) {
                    return state.teams.filter(team => team.games.includes(gameId))
                }
            }
        }
    },
}