/**
 * Vuex store
 * In a real project, it is better to break vuex into named modules
 * Author: Tirthamouli Baidya
 */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Http Helpers
import { simpleRequest, authRequest } from "./helpers/httpHelpers";

export default new Vuex.Store({
  state: {
    /**
     * Auth
     */
    auth: null, // Stoes the auth data
    authMessage: "", // Stores auth messages
    loadingAuth: false, // Loading some auth message
    verified: "NOT_CHECKED", // User is verified or not

    /**
     * Common error message
     */
    commonErrorMessage: "", // A common error message
    commonSuccessMessage: "", // A common success message

    /**
     * User
     */
    users: [], // All the users which we have fetched currently,
    usersLoading: false, // Weather users are loading
    addUserLoading: false, // Weather user is being added

    /**
     * Theatre
     */
    theatres: [], // The current theatre list
    theatreLoading: false, // If theatre is loading
    addTheatreLoading: false, // When a new theatre is being added

    /**
     * Movie
     */
    movies: [], // All the movies that we have fetched currently
    moviesLoading: false, // Weather movies are loading
    addMovieLoading: false, // Weather movie is being loaded

    /**
     * City
     */
    cities: [], // All the cities currently searched
    cityLoading: false, // Weather cities are being loaded

    /**
     * Mail
     */
    sendingMail: false // Weather a mail is being sent or not. Only one mail request maybe sent at a time
  },
  getters: {
    // COMMON
    /**
     * Get the common error message
     * @param {Object} state
     */
    getCommonErrorMessage(state) {
      return state.commonErrorMessage;
    },
    /**
     * Get the global success message
     * @param {Object} state
     */
    getCommonSuccessMessage(state) {
      return state.commonSuccessMessage;
    },

    // AUTH GETTERS
    /**
     * Get the auth details
     * @param {Object} state
     */
    getAuth(state) {
      return state.auth;
    },
    /**
     * Weather any auth actions are happening
     * @param {Object} state
     */
    getLoadingAuth(state) {
      return state.loadingAuth;
    },
    /**
     * Returns the auth message
     * @param {Object} state
     */
    getAuthMessage(state) {
      return state.authMessage;
    },
    /**
     * Check if user is verified
     * @param {Object} state
     */
    getIsVerified(state) {
      return state.verified;
    },

    // USER GETTERS
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
     * Weather user is being added
     * @param {State} state
     */
    getAddUserLoading(state) {
      return state.addUserLoading;
    },

    // MOVIE GETTERS
    /**
     * Get all the fetched movies
     * @param {Object} state
     */
    getMovies(state) {
      return state.movies;
    },
    /**
     * Get when movies are being fetched
     * @param {Object} state
     */
    getmoviesLoading(state) {
      return state.moviesLoading;
    },
    /**
     * Check if we are sending an add movie request
     * @param {Object} state
     */
    getAddMovieLoading(state) {
      return state.addMovieLoading;
    },

    // THEATRE GETTERS
    /**
     * Get all the theatres
     * @param {Object} state
     */
    getTheatres(state) {
      return state.theatres;
    },
    /**
     * Get weather theatres are being loaded
     * @param {Object} state
     */
    getTheatreLoading(state) {
      return state.theatreLoading;
    },
    /**
     * Weather add theatre is loading
     * @param {Object} state
     */
    getAddTheatreLoading(state) {
      return state.addTheatreLoading;
    },

    // CITY GETTERS
    /**
     * Get the cities
     * @param {Object} state
     */
    getCities(state) {
      return state.cities;
    },
    /**
     * Get weather city is loading
     * @param {Object} state
     */
    getCityLoading(state) {
      return state.cityLoading;
    },

    // MAIL GETTERS
    /**
     * Get weather mail is being sent or not
     * @param {Object} state
     */
    getSendingMail(state) {
      return state.sendingMail;
    }
  },
  mutations: {
    // Common
    /**
     * Set the common error message
     * @param {Object} state
     * @param {String} value
     */
    setCommonErrorMessage(state, value) {
      state.commonErrorMessage = value;
    },
    /**
     * Set the global success message
     * @param {Object} state
     * @param {String} value
     */
    setCommonSuccessMessage(state, value) {
      state.commonSuccessMessage = value;
    },
    // AUTH
    /**
     * Sets the auth message
     * @param {Object} state
     * @param {String} value
     */
    setAuthMessage(state, value) {
      // Step 1: Check if message is string
      state.authMessage =
        typeof value === "string" ? value : "Incorrect username or password";
    },
    /**
     * Set the token
     * @param {Object} state
     * @param {String} value
     */
    setToken(state, value) {
      // Step 1: Set the token in local storage
      localStorage.setItem("token", value);

      // Step 2: Store it in state
      state.auth = {
        token: value
      };
    },
    /**
     * Set the auth details
     * @param {Object} state
     * @param {Object} value
     */
    setAuthDetails(state, value) {
      // Step 1: Set auth details
      state.auth = { ...state.auth, ...value };

      // Step 2: Set user is verified
      state.verified = "VERIFIED";
    },
    /**
     * Starts the auth loading
     * @param {Object} state
     */
    startAuthLoading(state) {
      state.loadingAuth = true;
    },
    /**
     * Stops the auth loading
     * @param {Object} state
     */
    stopAuthLoading(state) {
      state.loadingAuth = false;
    },
    /**
     * Clears all the data
     * @param {Object} state
     */
    authClear(state) {
      // Step 1: Clear localstorage
      localStorage.clear();

      // Step 2: Clear
      state.auth = null;

      // Step 3: Set user is not verified
      state.verified = "NOT_VERIFIED";
    },

    // USER
    /**
     * Set the user
     * @param {Object} state
     * @param {Array} value
     */
    setUsers(state, value) {
      state.users = value;
    },
    /**
     * Add user to array of user
     * @param {Object} state
     * @param {Object} user
     */
    pushUser(state, user) {
      state.users = [user, ...state.users];
    },
    /**
     * Starts user loading
     * @param {Object} state
     */
    startUserLoading(state) {
      state.usersLoading = true;
    },
    /**
     * Stops user loading
     * @param {Object} state
     */
    stopUserLoading(state) {
      state.usersLoading = false;
    },
    /**
     * Start add user loading
     * @param {Object} state
     */
    startAddUserLoading(state) {
      state.addUserLoading = true;
    },
    /**
     * Stop add user loading
     * @param {Object} state
     */
    stopAddUserLoading(state) {
      state.addUserLoading = false;
    },

    // CITY
    /**
     * Set the cities
     * @param {Object} state
     * @param {Object} value
     */
    setCities(state, value) {
      state.cities = value;
    },
    /**
     * Starts loading city
     * @param {Object} state
     */
    startCityLoading(state) {
      state.cityLoading = true;
    },
    /**
     * Stops loading city
     * @param {Object} state
     */
    stopCityLoading(state) {
      state.cityLoading = false;
    },

    // THEATRE
    /**
     * Set the theatres
     * @param {Object} state
     * @param {Object} value
     */
    setTheatres(state, value) {
      state.theatres = value;
    },
    /**
     * Set the current value
     * @param {Object} state
     * @param {Object} value
     */
    setCurrentTheatre(state, value) {
      state.theatres = [value];
    },
    /**
     * Starts the theatre loading
     * @param {Object} state
     */
    startTheatreLoading(state) {
      state.theatreLoading = true;
    },
    /**
     * Stops the theatre loading
     * @param {Object} state
     */
    stopTheatreLoading(state) {
      state.theatreLoading = false;
    },
    /**
     * Start the add theatre loading
     * @param {Object} state
     */
    startAddTheatreLoading(state) {
      state.addTheatreLoading = true;
    },
    /**
     * Stop the add theatre loading
     * @param {Object} state
     */
    stopAddTheatreLoading(state) {
      state.addTheatreLoading = false;
    },

    // MOVIE
    /**
     * Set movies
     * @param {Object} state
     * @param {Array} value
     */
    setMovies(state, value) {
      state.movies = value;
    },
    /**
     * Start loading
     * @param {Object} state
     */
    startMoviesLoading(state) {
      state.moviesLoading = true;
    },
    /**
     * Stop loading
     * @param {Object} state
     */
    stopMoviesLoading(state) {
      state.moviesLoading = false;
    },
    /**
     * Start add movie loading
     * @param {Object} state
     */
    startAddMovieLoading(state) {
      state.addMovieLoading = true;
    },
    /**
     * Stop add movie loading
     * @param {Object} state
     */
    stopAddMovieLoading(state) {
      state.addMovieLoading = false;
    },
    /**
     * Push movie to the list of movies
     * @param {Object} req
     */
    pushMovie(state, value) {
      state.movies.unshift(value);
    },

    // EMAIL
    /**
     * Start sending mail
     * @param {Object} state
     */
    startSendingMail(state) {
      state.sendingMail = true;
    },
    /**
     * Stop sending mail
     * @param {Object} state
     */
    stopSendingMail(state) {
      state.sendingMail = false;
    },

    // OTHERS
    /**
     * Clear all the lists
     * @param {Object} state
     */
    listsClear(state) {
      state.movies = [];
      state.users = [];
      state.theatres = [];
    }
  },
  actions: {
    /**
     * Login an user
     * @param {Object} context
     * @param {String} email
     * @param {String} password
     */
    async login(context, { username, password }) {
      // Step 0 Check if loading
      if (context.getters.getLoadingAuth) {
        return;
      }

      // Step 0: Start loading
      context.commit("startAuthLoading");

      // Step 1: Send login request
      const res = await simpleRequest({
        url: "/api/auth/login",
        method: "POST",
        payload: {
          username,
          password
        }
      });

      // Step 2: Check if login is successfull
      if (res.code !== 200) {
        context.commit("stopAuthLoading");
        return context.commit("setAuthMessage", false);
      }

      // Step 3: Set the token
      context.commit("setToken", res.token);

      // Step 3: Verify the token
      await context.dispatch("verify");

      // Step -1: Stop loading
      context.commit("stopAuthLoading");
    },
    /**
     * Register a new user
     * @param {Object} context
     * @param {Object} request
     */
    async register(context, req) {
      // Step 0 Check if loading
      if (context.getters.getLoadingAuth) {
        return;
      }

      // Step 1: Start loading
      context.commit("startAuthLoading");

      // Step 2: Send register request
      const res = await simpleRequest({
        url: "/api/auth/register",
        method: "POST",
        payload: req
      });

      // Step 2: Check if register is successfull
      if (res.code !== 200) {
        context.commit("stopAuthLoading");
        return context.commit("setAuthMessage", res.message);
      }

      // Step 3: Set the token
      context.commit("setToken", res.token);

      // Step 3: Verify the token
      await context.dispatch("verify");

      // Step -1: Stop loading
      context.commit("stopAuthLoading");
    },
    /**
     * Verify user details
     * @param {Object} context
     */
    async verify(context) {
      // Step 1: Send verification request
      const res = await authRequest({
        url: "/api/auth/verify",
        method: "GET"
      });

      // Step 2: Set the auth details
      if (res) {
        return context.commit("setAuthDetails", res);
      }
    },
    /**
     * Search for an user by name
     * @param {String} name
     */
    async searchUserByName(context, name) {
      // Step 0: Start loading
      context.commit("startUserLoading");

      // Step 1: Send verification request
      const res = await authRequest({
        url: `/api/user/search?value=${encodeURI(name)}`,
        method: "GET"
      });

      // Step 2: Check if we get a res
      if (!res || res.code !== 200) {
        return context.commit("stopUserLoading");
      }

      // Step 3: Set users
      context.commit("setUsers", res.users);

      // Step 4: Stop loading
      context.commit("stopUserLoading");
    },
    /**
     * Search a city by name
     * @param {Object} context
     * @param {String} value
     */
    async searchCity(context, value) {
      // Step 0: Start loading
      context.commit("startCityLoading");

      // Step 1: Change value
      value = value === null ? "" : value;

      // Step 2: Send request
      const res = await simpleRequest({
        url: `/api/user/city/search?value=${encodeURI(value)}`,
        method: "GET"
      });

      // Step 3: Check response
      if (!res || res.code !== 200) {
        return context.commit("stopCityLoading");
      }

      // Step 4: Set the city
      context.commit("setCities", res.cities);

      // Step 5: Stop loading
      return context.commit("stopCityLoading");
    },
    /**
     * Search theatre by name
     * @param {Object} context
     * @param {String} value
     */
    async searchTheatre(context, value) {
      // Step 0: Start loading
      context.commit("startTheatreLoading");

      // Step 1: Change value
      value = value === null ? "" : value;

      // Step 2: Send request
      const res = await authRequest({
        url: `/api/theatre/search?value=${encodeURI(value)}`,
        method: "GET"
      });

      // Step 3: Check response
      if (!res || res.code !== 200) {
        return context.commit("stopTheatreLoading");
      }

      // Step 4: Set the city
      context.commit("setTheatres", res.theatres);

      // Step 5: Stop loading
      return context.commit("stopTheatreLoading");
    },
    /**
     * Search movie by name
     * @param {Object} context
     * @param {String} value
     */
    async searchMovie(context, value) {
      // Step 0: Start loading
      context.commit("startMoviesLoading");

      // Step 1: Change value
      value = value === null ? "" : value;

      // Step 2: Send request
      const res = await authRequest({
        url: `/api/movie/search?value=${encodeURI(value)}`,
        method: "GET"
      });

      // Step 3: Check response
      if (!res || res.code !== 200) {
        return context.commit("stopMoviesLoading");
      }

      // Step 4: Set the city
      context.commit("setMovies", res.movies);

      // Step 5: Stop loading
      return context.commit("stopMoviesLoading");
    },
    /**
     * Add a new user
     * @param {Object} context
     * @param {Object} req
     */
    async addUser(context, req) {
      // Step 0: Start loading
      context.commit("startAddUserLoading");

      // Step 2: Send request
      const res = await authRequest({
        url: "/api/user/create",
        method: "POST",
        payload: req
      });

      // Step 3: Check response
      if (!res || res.code !== 200) {
        return context.commit("stopAddUserLoading");
      }

      // Step 4: Add the user to the top of user list
      context.commit("pushUser", res.user);

      // Step 5: Stop loading
      return context.commit("stopAddUserLoading");
    },
    /**
     * Add a new theatre
     * @param {Object} context
     * @param {Object} req
     */
    async addTheatre(context, req) {
      // Step 0: Start loading
      context.commit("startAddTheatreLoading");

      // Step 2: Send request
      const res = await authRequest({
        url: "/api/theatre/add",
        method: "POST",
        payload: req
      });

      // Step 3: Check response
      if (!res || res.code !== 200) {
        return context.commit("stopAddTheatreLoading");
      }

      // Step 4: Add the user to the top of user list
      context.commit("setCurrentTheatre", res.theatre);

      // Step 5: Stop loading
      return context.commit("stopAddTheatreLoading");
    },
    /**
     * Add a movie
     * @param {Object} context
     * @param {Object} req
     */
    async addMovie(context, req) {
      // Step 0: Start loading
      context.commit("startAddMovieLoading");

      // Step 2: Send request
      const res = await authRequest({
        url: "/api/movie/add",
        method: "POST",
        payload: req
      });

      // Step 3: Check response
      if (!res || res.code !== 200) {
        return context.commit("stopAddMovieLoading");
      }

      // Step 4: Add the user to the top of user list
      context.commit("pushMovie", res.movie);

      // Step 5: Stop loading
      return context.commit("stopAddMovieLoading");
    },
    /**
     * Send mail to an user
     * @param {Object} context
     * @param {Object} req
     */
    async sendMail(context, req) {
      // Step 1: Check if mail is already being sent
      if (context.getters.getSendingMail) {
        return context.commit(
          "setCommonErrorMessage",
          "only one mail request can be sent at a time"
        );
      }

      // Step 2: Start loading
      context.commit("startSendingMail");

      // Step 3: Send request
      const res = await authRequest({
        url: "/api/user/mail",
        method: "POST",
        payload: req
      });

      // Step 4: Check response
      if (!res || res.code !== 200) {
        context.commit("setCommonErrorMessage", res.message);
        return context.commit("stopSendingMail");
      }

      // Step 5: Set success message
      context.commit("setCommonSuccessMessage", res.message);

      // Step 6: Stop loading
      return context.commit("stopSendingMail");
    },
    /**
     * Send notification request
     * @param {Object} context
     * @param {Object} req
     */
    async sendNotification(context, req) {
      // Step 1: Check if mail is already being sent
      if (context.getters.getSendingMail) {
        return context.commit(
          "setCommonErrorMessage",
          "only one mail request can be sent at a time"
        );
      }

      // Step 2: Start loading
      context.commit("startSendingMail");

      // Step 3: Send request
      const res = await authRequest({
        url: "/api/movie/mail",
        method: "POST",
        payload: req
      });

      // Step 4: Check response
      if (!res || res.code !== 200) {
        context.commit("setCommonErrorMessage", res.message);
        return context.commit("stopSendingMail");
      }

      // Step 5: Set success message
      context.commit("setCommonSuccessMessage", res.message);

      // Step 6: Stop loading
      return context.commit("stopSendingMail");
    },
    /**
     * Logout an user
     * @param {Object} context
     */
    logout(context) {
      // Step 1: Clear the auth
      context.commit("authClear");

      // Step 2: Clear the other lists
      context.commit("listsClear");
    }
  },
  modules: {}
});
