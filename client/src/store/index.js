import Vue from 'vue'
import Vuex from 'vuex'
import games from "./modules/games"
import teams from "./modules/teams"
import user from "./modules/user"


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    games,
    teams,
    user
  },
  state: {
    error: null,
    backTitle: null,
    loading: false
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    CLEAR_ERROR(state) {
      state.error = null
    },
    CLEAR_BACK_TITLE(state) {
      state.backTitle = null
    },
    BACK_TITLE(state, payload) {
      state.backTitle = payload
    }
  },
  actions: {
    clearError({ commit }) {
      commit('CLEAR_ERROR')
    },
    backTitle({ commit }, payload) {
      commit('BACK_TITLE', payload)
    },
    clearBackTitle({ commit }) {
      commit('CLEAR_BACK_TITLE')
    }
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