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
            const team = state.teams.find(team => team.id === payload.id)
            state.teams = state.teams.filter(team => team.id !== payload.id)
            state.teams.push({ ...team, ...payload })
        },
        DELETE_TEAM(state, payload) {
            state.teams = state.teams.filter(team => team.id !== payload.id)
        },
        DELETE_ROUND(state, payload) {
            state.teams = state.teams.map(team => {
                const round = team.rounds[payload.roundId];
                if (round) delete team.rounds[payload.roundId];
                return { ...team }
            })
        },
        CREATE_ROUND(state, payload) {
            const team = state.teams.find((team) => team.id === payload.teamId);
            const round = {
                [payload.id]: payload
            }
            Vue.set(team, 'rounds', { ...team.rounds, ...round })
        }
    },
    actions: {
        loadTeams({ commit }) {
            commit('SET_LOADING', true, { root: true })
            // TODO:user specific
            axios.get('http://localhost:3000/teams')
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
        createTeam({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            // const user = rootState.user.user.id
            // TODO:remove image
            const imageUrl = 'https://www.talismanisland.com/bigbang_s01e17_tal1.jpg'
            // TODO:map with games
            const team = {
                ...payload,
                imageUrl,
                rounds: {},
                favorite: false
            }
            axios.post('http://localhost:3000/teams', team)
                .then((res) => {
                    const id = res.data._id
                    commit("CREATE_TEAM", { ...team, id })
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        updateTeam({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            // eslint-disable-next-line no-unused-vars
            const getTeam = ({ gameId, ...rest }) => rest
            db.database().ref('users').child(user).child('games').child(payload.gameId).child('teams').child(payload.id).update(getTeam(payload))
                .then(() => {
                    commit("UPDATE_TEAM", payload)
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        updateTeamImage({ commit, rootState }, payload) {
            commit('SET_LOADING', true, { root: true })
            const user = rootState.user.user.id
            const ext = payload.ext
            let imageUrl
            const imagePath = db.storage().ref('users').child(user).child('teams').child(`${payload.id}${ext}`)
            if (db.storage().ref('users').child(user).child('teams').child(`${payload.teamId}${ext}`)) {
                db.storage().ref('users').child(user).child('teams').child(`${payload.teamId}${ext}`).delete()
            }
            imagePath.put(payload.image)
                .then(() => {
                    return imagePath.getDownloadURL()
                })
                .then((url) => {
                    imageUrl = url
                    return db.database().ref('users').child(user).child('games').child(payload.gameId).child('teams').child(payload.id).update({ imageUrl })
                })
                .then(() => {
                    commit("UPDATE_TEAM", { ...payload, ext, imageUrl })
                    commit('SET_LOADING', false, { root: true })
                })
                .catch((e) => {
                    commit('SET_LOADING', false, { root: true })
                    console.log(e)
                })
        },
        deleteTeam({ commit }, payload) {
            commit('SET_LOADING', true, { root: true })
            axios.delete(`http://localhost:3000/teams/${payload._id}`)
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
            return (teamId) => {
                return state.teams.find((team) => {
                    return team.id === teamId
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