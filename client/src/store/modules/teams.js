import db from "@/db";
import axios from 'axios'
import Vue from "vue";

export default {
    namespaced: true,
    state: {
        teams: []
    },
    mutations: {
        LOAD_TEAMS(state, payload) {
            state.teams = payload
        },
        CREATE_TEAM(state, payload) {
            state.teams.push(payload)
        },
        UPDATE_TEAM(state, payload) {
            const team = state.teams.find(team => team._id === payload._id)
            state.teams = state.teams.filter(team => team._id !== payload._id)
            state.teams.push({ ...team, ...payload })
        },
        DELETE_TEAM(state, payload) {
            state.teams = state.teams.filter(team => team._id !== payload._id)
        },
        DELETE_ROUND(state, payload) {
            state.teams = state.teams.map(team => {
                const round = team.rounds[payload.roundId];
                if (round) delete team.rounds[payload.roundId];
                return { ...team }
            })
        },
        // TODO:rewrite this part as separete table for rounds
        CREATE_ROUND(state, payload) {
            const team = state.teams.find((team) => team._id === payload.teamId);
            const round = {
                [payload._id]: payload
            }
            Vue.set(team, 'rounds', { ...team.rounds, ...round })
        }
    },
    actions: {
        loadTeams({ commit, rootState }) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            axios.get('api/teams', { params: { user } })
                .then((res) => {
                    const teams = res.data
                    commit("LOAD_TEAMS", teams)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        createTeam({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            const team = {
                ...payload,
                user,
                imageUrl: "",
                rounds: {},
                favorite: false
            }
            axios.post('api/teams', team)
                .then((res) => {
                    const _id = res.data._id
                    commit("CREATE_TEAM", { ...team, _id })
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        updateTeam({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            axios.put(`api/teams/${payload._id}`, payload)
                .then(() => {
                    commit("UPDATE_TEAM", payload)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        deleteTeam({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            axios.delete(`api/teams/${payload._id}`)
                .then(() => {
                    commit("DELETE_TEAM", payload)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })

        },
        createRound({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            db.database().ref('users').child(user).child('games')
                .child(payload.gameId)
                .child('teams')
                .child(payload.teamId)
                .child('rounds')
                .push(payload)
                .then((data) => {
                    const key = data.key;
                    commit("CREATE_ROUND", { ...payload, id: key })
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        deleteRound({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            db.database().ref('users').child(user).child('games').child(payload.gameId).child('teams').child(payload.teamId).child('rounds').child(payload.roundId).remove()
                .then(() => {
                    commit("DELETE_ROUND", payload)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })

        },
    },
    getters: {
        teams(state) {
            return state.teams
        },
        team(state) {
            return (teamId) => state.teams.find((team) => team.id === teamId)
        },
        gameTeams(state) {
            return (gameId) => {
                return state.teams.filter((team) => {
                    return team.games.includes(gameId)
                })
            }
        },
        rounds(state) {
            return (teamId) => {
                const team = state.teams.find((team) => team.id === teamId)
                return team.rounds ? team.rounds : null
            }
        }
    }
}