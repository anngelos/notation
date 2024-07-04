/* eslint-disable */
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import router from '@/router';

export default createStore({
  state: {
    token: null,
    user: null,
    notes: [],
    searchNote: '',
  },

  getters: {
    getNotes: (state) => state.notes,
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },

    SET_USER(state, user) {
      state.user = user;
    },

    LOGOUT(state) {
      state.token = undefined;
      state.user = '';
      state.notes = [];
    },

    SET_NOTES(state, notes) {
      state.notes = notes;
    },

    SET_SEARCH_NOTE(state, searchNote) {
      state.searchNote = searchNote;
    },

    DELETE_NOTE(state, noteId) {
      state.notes = state.notes.filter(note => note.id !== noteId);
    },
  },

  actions: {
    async loginUser({ commit }, { nickname, password }) {
      try {
        const res = await axios.post("http://localhost:3000/auth/login", {
          nickname,
          password,
        });

        const token = res.data.accessToken;
        commit("SET_TOKEN", token);

        const userDecoded = jwtDecode(token);
        commit("SET_USER", userDecoded);

        return { message: "LOGIN_SUCCESSFUL" };
      } catch (error) {
        throw error;
      }
    },

    async registerUser(_, { name, nickname, email, password }) {
      try {
        await axios.post("http://localhost:3000/users", {
          name,
          nickname,
          email,
          password
        });

        return { message: "USER_REGISTERED_SUCCESSFULLY" }
      } catch (error) {
        throw error;
      }

    },

    async getAllUserNotes({ state, commit }) {
      try {
        const token = state.token;
        const authorNickname = state.user?.nickname;

        const response = await axios.get(`http://localhost:3000/notes/${authorNickname}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        commit("SET_NOTES", response.data);
      } catch (error) {
        throw error;
      }
    },

    async deleteUserNote({ state, commit }, noteId) {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      };

      const data = {
        nickname: state.user.nickname
      };

      try {
        await axios.delete(`http://localhost:3000/notes/${noteId}`, { ...config, data });
        commit("DELETE_NOTE", noteId);
        return { message: "NOTE_REMOVED_SUCCESSFULLY" }
      } catch (error) {
        throw error;
      }
    },

    logout({ commit }) {
      localStorage.removeItem("vuex");
      commit("LOGOUT");
      router.push("/login");
    },
  },

  plugins: [
    createPersistedState({
      key: "notation",
      path: ["token", "user", "notes"],
    }),
  ],
});
