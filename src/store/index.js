import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Http Helpers
import { simpleRequest } from "./helpers/httpHelpers";

export default new Vuex.Store({
  state: {
    auth: null, // Stoes the auth data
    loadingAuth: false,
    users: [
      {
        id: 1,
        firstName: "Tirthamouli",
        lastName: "Baidya",
        email: "btirthamouli@gmail.com",
        city: "Kolkata"
      },
      {
        id: 2,
        firstName: "Monkey",
        lastName: "Luffy",
        email: "luffy@op.com",
        city: "Whales"
      },
      {
        id: 3,
        firstName: "Roronoa",
        lastName: "Zoro",
        email: "zoro@op.com",
        city: "Tiger"
      },
      {
        id: 4,
        firstName: "Vinsmoke",
        lastName: "Sanji",
        email: "sanji@op.com",
        city: "Lily"
      }
    ], // All the users which we have fetched currently,
    usersLoading: false, // Weather users are loading
    movies: [
      { id: 1, name: "Avenger Infinity wars" },
      { id: 2, name: "Star wars" },
      { id: 3, name: "Life of pie" },
      { id: 4, name: "Transformers" },
      { id: 5, name: "Matrix" }
    ], // All the movies that we have fetched currently
    moviesLoading: false // Weather movies are loading
  },
  getters: {
    /**
     * Weather any auth actions are happening
     * @param {Object} state
     */
    getLoadingAuth(state) {
      return state.loadingAuth;
    },
    /**
     * Get all the fetched users
     * @param {Object} state
     */
    getUsers(state) {
      return state.users;
    },
    /**
     * Get weather users are loading or not
     * @param {Object} state
     */
    getUsersLoading(state) {
      return state.usersLoading;
    },
    /**
     * Get all the fetched movies
     * @param {Object} state
     */
    getMovies(state) {
      return state.movies;
    }
  },
  mutations: {},
  actions: {
    /**
     * Login an user
     * @param {Object} context
     * @param {String} email
     * @param {String} password
     */
    async login(context, { username, password }) {
      // Step 1: Send login request
      const res = await simpleRequest({
        url: "/api/auth/login",
        method: "POST",
        payload: {
          username,
          password
        }
      });

      console.log(res);
      // Step 2: Set the token
      // context.commit("setToken", res.token);

      // Step 3: Verify the token
      // context.dispatch("verify");
    }
  },
  modules: {}
});
