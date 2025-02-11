/* eslint-disable */
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import router from "@/router";

export default createStore({
  state: {
    token: null,
    user: null,
    notes: [],
    searchNote: "",
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
      state.user = "";
      state.notes = [];
    },

    SET_NOTES(state, notes) {
      state.notes = notes;
    },

    SET_SEARCH_NOTE(state, searchNote) {
      state.searchNote = searchNote;
    },

    DELETE_NOTE(state, noteId) {
      state.notes = state.notes.filter((note) => note.id !== noteId);
    },

    UPDATE_NOTE(state, updatedNote) {
      const index = state.notes.findIndex((note) => note.id === updatedNote.id);
      if (index !== -1) {
        state.notes.splice(index, 1, updatedNote);
      }
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
          password,
        });

        return { message: "USER_REGISTERED_SUCCESSFULLY" };
      } catch (error) {
        throw error;
      }
    },

    async getAllUserNotes({ state, commit }) {
      try {
        const token = state.token;
        const authorNickname = state.user?.nickname;

        const response = await axios.get(
          `http://localhost:3000/notes/${authorNickname}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        commit("SET_NOTES", response.data);
      } catch (error) {
        throw error;
      }
    },

    async deleteUserNote({ state, commit }, noteId) {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const data = {
        nickname: state.user.nickname,
      };

      try {
        await axios.delete(`http://localhost:3000/notes/${noteId}`, {
          ...config,
          data,
        });
        commit("DELETE_NOTE", noteId);
        return { message: "NOTE_REMOVED_SUCCESSFULLY" };
      } catch (error) {
        throw error;
      }
    },

    async editUserNote({ state, commit }, payload) {
      try {
        const { id, title, content, authorNickname } = payload;

        const config = {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        };

        const data = {
          title,
          content,
          authorNickname: state.user.nickname,
        };

        await axios.patch(`http://localhost:3000/notes/${id}`, data, config);

        commit("UPDATE_NOTE", {
          id: id,
          title: title,
          content: content,
          authorNickname: authorNickname,
        });
        return { message: "NOTE_EDITED_SUCCESSFULLY" };
      } catch (error) {
        throw error;
      }
    },

    async createUserNote({ state, commit }, payload) {
      try {
        const { title, content } = payload;

        const config = {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        };

        const data = {
          title,
          content,
          authorNickname: state.user.nickname,
        };

        await axios.post("http://localhost:3000/notes", data, config);
        return { message: "NOTE_CREATED_SUCCESSFULLY" };
      } catch (error) {
        throw error;
      }
    },

    async updateUser({ state, commit }, payload) {
      const { name, nickname, email, password } = payload;

      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const id = state.user.id;

      const obj = {
        name,
        nickname,
        email,
        password,
      };
      
      const data = {};

      for (const key in obj) {
        if (obj[key].length !== 0) {
          data[key] = obj[key];
        }
      }

      const propertyCount = Object.keys(data).length;

      if (propertyCount < 1) {
        return { message: "EDIT_USER_ERROR" };
      }

      await axios.patch(`http://localhost:3000/users/${id}`, data, config);
      return { message: "USER_EDITED_SUCCESSFULLY" };
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
