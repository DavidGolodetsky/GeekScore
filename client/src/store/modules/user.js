import firebase from 'firebase/app';
import router from '@/router';
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    user: null,
    resetPassword: false,
  },
  mutations: {
    SET_USER(state, payload) {
      if (payload?.id) {
        window.localStorage.setItem('userId', payload?.id);
      } else {
        localStorage.clear();
      }
      state.user = payload;
    },
    RESET_PASSWORD(state) {
      state.resetPassword = true;
    },
  },
  actions: {
    async signUpUser({ commit }, payload) {
      try {
        commit('LOADING', true, { root: true });
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        const userPayload = { id: user.user.uid, username: payload.username};
        await axios.post('/api/users', userPayload);
        commit('SET_USER', userPayload);
      } catch (e) {
        commit('ERROR', e, { root: true });
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
        var userInfo;
        await axios.get('/api/users').then(function(response){
          userInfo = response.data.filter(x => x.id === user.user.uid)
        })
        const userPayload = { id: userInfo[0].id, username: userInfo[0].username };
        await axios.post('/api/users', userPayload);
        commit('SET_USER', userPayload);
      } catch (e) {
        commit('ERROR', e, { root: true });
      } finally {
        commit('LOADING', false, { root: true });
      }
    },
    autoSignIn({ commit }, payload) {
      commit('LOADING', true, { root: true });
      commit('SET_USER', { id: payload.uid });
      commit('LOADING', false, { root: true });
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
        await firebase.auth().signOut();
        router.push('/');
        commit('games/SET_GAMES', null, { root: true });
        commit('teams/SET_TEAMS', null, { root: true });
        commit('SET_USER', null);
      } catch (e) {
        commit('ERROR', e, { root: true });
      } finally {
        commit('LOADING', false, { root: true });
      }
    },
  },
};
