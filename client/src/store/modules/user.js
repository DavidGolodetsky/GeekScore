import firebase from 'firebase/app';
import router from '@/router';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: null,
    winRates: null,
    resetPassword: false
  },
  mutations: {
    SET_USER(state, payload) {
      localStorage.setItem('userId', payload?.id);
      state.user = payload;
    },
    CLEAR_USER(state) {
      localStorage.clear();
      state.user = null;
    },
    RESET_PASSWORD(state) {
      state.resetPassword = true;
    },
    SET_WIN_RATES(state, payload) {
      state.winRates = payload;
    }
  },
  actions: {
    async signUpUser({ commit }, payload) {
      try {
        commit('LOADING', true, { root: true });
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        await user.user.updateProfile({ displayName: payload.username });
        const userPayload = {
          id: user.user.uid,
          username: payload.username
        };
        await axios.post('/api/users', userPayload);
        router.push({ name: 'games' });
        commit('SET_USER', userPayload);
      } catch (e) {
        commit('ERROR', e, { root: true });
        throw e;
      } finally {
        commit('LOADING', false, { root: true });
      }
    },
    async signInUser({ commit }, payload) {
      try {
        commit('LOADING', true, { root: true });
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        const userPayload = {
          id: user.user.uid,
          username: user.user.displayName
        };
        router.push({ name: 'games' });
        await commit('SET_USER', userPayload);
      } catch (e) {
        commit('ERROR', e, { root: true });
      } finally {
        commit('LOADING', false, { root: true });
      }
    },
    autoSignIn({ commit }, payload) {
      commit('LOADING', true, { root: true });
      const userPayload = {
        id: payload.uid,
        username: payload.displayName
      };
      commit('SET_USER', userPayload);
      if (router.currentRoute.path === '/') {
        router.push({ name: 'games' });
      }
      commit('LOADING', false, { root: true });
    },
    async updateUser({ commit }, { id, username }) {
      try {
        commit('LOADING', true, { root: true });
        await axios.put(`/api/users/${id}`, {
          id,
          username
        });
        commit('SET_USER', { id, username });
      } catch (e) {
        commit('ERROR', e, { root: true });
      } finally {
        commit('LOADING', false, { root: true });
      }
    },
    async resetPassword({ commit }, payload) {
      try {
        commit('LOADING', true, { root: true });
        await firebase.auth().sendPasswordResetEmail(payload);
        commit('RESET_PASSWORD');
      } catch (e) {
        commit('ERROR', e, { root: true });
      } finally {
        commit('LOADING', false, { root: true });
      }
    },
    async logout({ commit }) {
      try {
        commit('LOADING', true, { root: true });
        await firebase.auth().signOut();
        if (router.currentRoute.path !== '/') router.push('/');
        commit('games/SET_GAMES', null, { root: true });
        commit('teams/SET_TEAMS', null, { root: true });
        commit('CLEAR_USER');
      } catch (e) {
        commit('ERROR', e, { root: true });
      } finally {
        commit('LOADING', false, { root: true });
      }
    },
    async loadWinRates({ commit }) {
      try {
        commit('LOADING', true, { root: true });
        const user = localStorage.getItem('userId');
        const winRate = await axios.get(`/api/users/win-rate/${user}`);
        commit('SET_WIN_RATES', winRate.data);
      } catch (e) {
        commit('ERROR', e, { root: true });
      } finally {
        commit('LOADING', false, { root: true });
      }
    }
  }
};
