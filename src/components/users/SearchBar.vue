<template>
  <span>
    <!-- Search bar -->
    <v-layout row class="mb-3 px-5">
      <v-text-field outlined label="Search" append-icon="search"></v-text-field>
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
import { mapGetters } from "vuex";

export default {
  name: "UserSearchBar",
  computed: {
    ...mapGetters({
      usersLoading: "getUsersLoading"
    })
  }
};
</script>
