<template>
  <v-container class="my-5">
    <!-- Search bar -->
    <search-bar />

    <!-- Add user -->
    <add-user />

    <!-- List -->
    <template v-if="users.length > 0">
      <v-card flat class="py-4 px-5 mb-1" v-for="user in users" :key="user.id">
        <v-layout row wrap class="py-3 px-5">
          <!-- Name -->
          <v-flex xs12 sm12 md4>
            <div class="caption grey--text">Name</div>
            <div>{{ user.firstName }} {{ user.lastName }}</div>
          </v-flex>

          <!-- City -->
          <v-flex xs12 sm6 md4>
            <div class="caption grey--text">City</div>
            <div>{{ user.city }}</div>
          </v-flex>

          <!-- Email -->
          <v-flex xs12 sm6 md4>
            <div class="caption grey--text">Email</div>
            <div>
              <send-mail :user="user" />
            </div>
          </v-flex>
          <v-divider></v-divider>
        </v-layout>
      </v-card>
    </template>

    <!-- Nothing to show message -->
    <h1 class="caption text-uppercase text-center" v-else>
      Nothing to show! Add new users
    </h1>
  </v-container>
</template>

<script>
import SearchBar from "./SearchBar";
import AddUser from "./AddUser";
import SendMail from "./SendMail";
import { mapGetters } from "vuex";

export default {
  name: "UserContent",
  computed: {
    ...mapGetters({
      users: "getUsers" // The fetched users
    })
  },
  components: {
    SearchBar, // Search bar for searching user
    AddUser, // Add a new user
    SendMail // The send mail dialog
  }
};
</script>
