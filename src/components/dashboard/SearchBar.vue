<template>
  <span>
    <!-- Search bar -->
    <v-layout row class="mb-3 px-5">
      <v-text-field
        v-model="searchValue"
        @input="searchLocal"
        outlined
        label="Search"
        append-icon="search"
      ></v-text-field>
    </v-layout>

    <!-- Loader -->
    <v-progress-linear
      v-show="usersLoading"
      color="primary"
      indeterminate
      rounded
      height="6"
    ></v-progress-linear>
  </span>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeSearchBar",
  data() {
    return {
      searchValue: "", // Stores the search value
      searchTimeout: null // Stores a timeout for searching
    };
  },
  computed: {
    ...mapGetters({
      usersLoading: "getUsersLoading", // Weather users are loading
      users: "getUsers" // The currently fetched user
    })
  },
  methods: {
    ...mapActions({
      searchUserByName: "searchUserByName" // Searches an user by name
    }),
    /**
     * Handle input in search
     */
    searchLocal() {
      // Step 1: Check if search time out is null
      if (this.searchTimeout !== null) {
        // Step 1.1 Clear timeout if exists
        clearTimeout(this.searchTimeout);
      }

      // Step 2: Set the new timeout
      this.searchTimeout = setTimeout(() => {
        // Step 1: Search by name
        this.searchUserByName(this.searchValue);

        // Step 2: Clear the variable
        this.searchTimeout = null;
      }, 500);
    }
  },
  /**
   * Created hook
   */
  created() {
    // Search for user by default when there is no search result
    if (this.users.length <= 0) {
      this.searchUserByName("");
    }
  }
};
</script>
