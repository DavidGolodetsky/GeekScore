import Vue from 'vue'
import Vuex from 'vuex'
import rounds from "./modules/rounds"
import games from "./modules/games"
import teams from "./modules/teams"
// TODO:rename to users?
import user from "./modules/user"


Vue.use(Vuex)

export default new Vuex.Store({
  // TODO:  uncomment and fix issues
  // strict: process.env.NODE_ENV !== 'production',

  modules: {
    user,
    games,
    teams,
    rounds
  },
  state: {
    error: null,
    backTitle: null,
    loading: false
  },
  mutations: {
    LOADING(state, payload) {
      state.loading = payload
    },
    ERROR(state, payload) {
      state.error = payload
    },
    BACK_TITLE(state, payload) {
      state.backTitle = payload
    }
  },
  actions: {
    setError({ commit }, payload = null) {
      commit('ERROR', payload)
    },
    setBackTitle({ commit }, payload = null) {
      commit('BACK_TITLE', payload)
    },
    setLoading({ commit }, payload = null) {
      commit('LOADING', payload)
    },
  },
  getters: {
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    },
    backTitle(state) {
      return state.backTitle
    }
  }
})