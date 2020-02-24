<template>
  <v-container class="my-5">
    <!-- Search bar -->
    <search-bar />

    <!-- Add new button -->
    <v-layout row class="mb-2" justify-center>
      <v-btn outlined text fab :to="{ name: 'AddMovie' }">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>

    <!-- List -->
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="movie in movies" :key="movie.id">
        <v-card flat class="text-center ma-3">
          <!-- Avatar -->
          <v-responsive class="pt-4">
            <v-avatar color="primary" size="100">
              <span
                class="headline font-weight-light text-uppercase white--text"
              >
                {{ movie.name[0] }}
              </span>
            </v-avatar>
          </v-responsive>

          <!-- Text -->
          <v-card-text>
            <div class="caption text-uppercase grey-text">
              {{ movie.name }}
            </div>
          </v-card-text>

          <!-- Action -->
          <v-card-actions>
            <v-btn
              text
              color="grey"
              @click="sendNotification({ movieId: movie.id })"
            >
              <v-icon small left>message</v-icon>
              <span>Notify</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SearchBar from "./SearchBar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeContent",
  computed: {
    ...mapGetters({
      movies: "getMovies"
    })
  },
  components: {
    SearchBar // Home search bar
  },
  methods: {
    ...mapActions({
      sendNotification: "sendNotification"
    })
  }
};
</script>
