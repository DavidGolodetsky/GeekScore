import Vue from 'vue'
import Vuex from 'vuex'
import games from './modules/games'
import teams from './modules/teams'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    user,
    games,
    teams
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

export default store
