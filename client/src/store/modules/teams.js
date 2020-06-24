import axios from 'axios'

export default {
    namespaced: true,
    state: {
        teams: null,
    },
    mutations: {
        CREATE_TEAM(state, payload) {
            state.teams
                ? state.teams = [...state.teams, payload]
                : state.teams = [payload]
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
            teams.length
                ? state.teams = teams
                : state.teams = null
        }
    },
    actions: {
        async createTeam({ commit, rootState }, payload) {
            try {
                const user = rootState.user.user.id
                const teamPayload = {
                    ...payload,
                    user,
                    favorite: false
                }
                commit('LOADING', true, { root: true })
                const createdTeam = await axios.post('/api/teams', teamPayload)
                commit("CREATE_TEAM", { ...createdTeam.data })
            } catch (e) {
                throw new Error(e)
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async loadTeams({ commit, rootState }) {
            try {
                const user = rootState.user.user.id
                commit('LOADING', true, { root: true })
                const teams = await axios.get('/api/teams', { params: { user } })
                commit('SET_TEAMS', teams.data)
            } catch (e) {
                throw new Error(e)
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async updateTeam({ commit }, payload) {
            try {
                commit('LOADING', true, { root: true })
                await axios.patch(`/api/teams/${payload._id}`, payload)
                commit("UPDATE_TEAM", payload)
            } catch (e) {
                throw new Error(e)
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
        async deleteTeam({ commit }, payload) {
            try {
                commit('LOADING', true, { root: true })
                await axios.delete(`/api/teams/${payload}`)
                commit("DELETE_TEAM", payload)
            } catch (e) {
                throw new Error(e)
            } finally {
                commit('LOADING', false, { root: true })
            }
        },
    },
    getters: {
        getTeam(state) {
            return (teamId) => state.teams && state.teams.find(team => team._id === teamId)
        },
        getGameTeams(state) {
            return (gameId) => state.teams && state.teams.filter(team => team.games.includes(gameId))
        },
    },
}