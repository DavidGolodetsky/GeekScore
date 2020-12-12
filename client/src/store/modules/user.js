import firebase from "firebase/app";
import router from "@/router";
import axios from "axios";

export default {
  namespaced: true,
  state: {
    user: null,
    winRates: null,
    ResetPasswordPage: false,
  },
  mutations: {
    SET_USER(state, payload) {
      if (payload?.id) {
        localStorage.setItem("userId", payload?.id);
      } else {
        localStorage.clear();
      }
      state.user = payload;
    },
    RESET_PASSWORD(state) {
      state.ResetPasswordPage = true;
    },
    SET_WIN_RATES(state, payload) {
      state.winRates = payload;
    },
  },
  actions: {
    async SignUpPageUser({ commit }, payload) {
      try {
        commit("LOADING", true, { root: true });
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password);
        console.log(user);
        await user.user.updateProfile({ displayName: payload.username });
        const userPayload = { id: user.user.uid, username: payload.username };
        await axios.post("/api/users", userPayload);
        commit("SET_USER", userPayload);
      } catch (e) {
        commit("ERROR", e, { root: true });
        throw e;
      } finally {
        commit("LOADING", false, { root: true });
      }
    },
    async SignInPageUser({ commit }, payload) {
      try {
        commit("LOADING", true, { root: true });
        const user = await firebase
          .auth()
          .SignInPageWithEmailAndPassword(payload.email, payload.password);
        const userInfo = await axios.get(`/api/users/${user.user.uid}`);
        const userPayload = {
          id: userInfo.data[0].id,
          username: userInfo.data[0].username,
        };
        await commit("SET_USER", userPayload);
      } catch (e) {
        commit("ERROR", e, { root: true });
      } finally {
        commit("LOADING", false, { root: true });
      }
    },
    autoSignInPage({ commit }, payload) {
      commit("LOADING", true, { root: true });
      commit("SET_USER", { id: payload.uid, username: payload.displayName });
      if (router.currentRoute.path === "/") {
        router.push("/games");
      }
      commit("LOADING", false, { root: true });
    },
    async updateUser({ commit }, { id, username }) {
      try {
        commit("LOADING", true, { root: true });
        await axios.put(`/api/users/${id}`, {
          id,
          username,
        });
        commit("SET_USER", { id, username });
      } catch (e) {
        commit("ERROR", e, { root: true });
      } finally {
        commit("LOADING", false, { root: true });
      }
    },
    async ResetPasswordPage({ commit }, payload) {
      try {
        commit("LOADING", true, { root: true });
        await firebase.auth().sendPasswordResetEmail(payload);
        commit("RESET_PASSWORD");
      } catch (e) {
        commit("ERROR", e, { root: true });
      } finally {
        commit("LOADING", false, { root: true });
      }
    },
    async logout({ commit }) {
      try {
        commit("LOADING", true, { root: true });
        await firebase.auth().signOut();
        if (router.currentRoute.path !== "/") router.push("/");
        commit("games/SET_GAMES", null, { root: true });
        commit("teams/SET_TEAMS", null, { root: true });
        commit("SET_USER", null);
      } catch (e) {
        commit("ERROR", e, { root: true });
      } finally {
        commit("LOADING", false, { root: true });
      }
    },
    async loadWinRates({ commit }) {
      try {
        commit("LOADING", true, { root: true });
        const user = localStorage.getItem("userId");
        const winRate = await axios.get(`/api/users/win-rate/${user}`);
        commit("SET_WIN_RATES", winRate.data);
      } catch (e) {
        commit("ERROR", e, { root: true });
      } finally {
        commit("LOADING", false, { root: true });
      }
    },
  },
};
