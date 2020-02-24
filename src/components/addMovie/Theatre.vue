<template>
  <v-container>
    <h1 class="subtitle-1 text-uppercase font-weight-light primary--text">
      Theatre
    </h1>
    <v-layout row wrap class="pa-5" align-center>
      <!-- Theatre selector -->
      <v-flex xs9>
        <!-- Selector -->
        <v-overflow-btn
          label="Theatre"
          editable
          :items="formattedTheatres"
          item-value="id"
          prepend-icon="location_on"
          v-model="theatre"
          :loading="theatreLoading"
          @update:search-input="searchTheatreLocal"
        ></v-overflow-btn>
      </v-flex>

      <v-flex xs3>
        <v-layout row justify-center>
          <!-- Add new -->
          <v-btn right outlined rounded ripple small text>
            <v-icon left>add</v-icon>
            <span>New</span>
          </v-btn>
        </v-layout>
      </v-flex>

      <!-- Start date -->
      <v-flex xs12 sm6>
        <v-menu v-model="startDateMenu" :close-on-content-click="false">
          <!-- Activator -->
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="formattedStartDate"
              v-on="on"
              clearable
              label="Start date"
              @click:clear="startDate = null"
              prepend-icon="date_range"
            ></v-text-field>
          </template>

          <!-- Date picker -->
          <v-date-picker
            v-model="startDate"
            @change="startDateMenu = false"
          ></v-date-picker>
        </v-menu>
      </v-flex>

      <!-- End date -->
      <v-flex xs12 sm6>
        <v-menu v-model="endDateMenu" :close-on-content-click="false">
          <!-- Activator -->
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="formattedEndDate"
              v-on="on"
              clearable
              label="End date"
              @click:clear="endDate = null"
              prepend-icon="date_range"
            ></v-text-field>
          </template>

          <!-- Date picker -->
          <v-date-picker
            v-model="endDate"
            @change="endDateMenu = false"
          ></v-date-picker>
        </v-menu>
      </v-flex>

      <!-- Add Button -->
      <v-flex xs12 class="px-5">
        <v-btn rounded block ripple text class="ma-0 mt-5">
          <v-icon left>add</v-icon>
          <span>Add theatre to list</span>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import format from "date-fns/format";

export default {
  name: "AddMovieTheatre",
  data() {
    return {
      startDateMenu: false, // Start date menu
      startDate: null, // Start date
      endDateMenu: false, // End date menu
      endDate: null, // End date
      prevSearchedTheatre: "", // Stores the previously searched theatres
      theatre: "" //The current selected theatre
    };
  },
  computed: {
    ...mapGetters({
      theatreLoading: "getTheatreLoading"
    }),
    /**
     * Start date shown to user
     */
    formattedStartDate() {
      return this.startDate !== null
        ? format(new Date(this.startDate), "do MMM yyyy")
        : "";
    },
    /**
     * Start date shown to user
     */
    formattedEndDate() {
      return this.endDate !== null
        ? format(new Date(this.endDate), "do MMM yyyy")
        : "";
    },
    /**
     * List of searched theatres
     */
    formattedTheatres() {
      return [];
    }
  },
  methods: {
    searchTheatreLocal(value) {
      console.log(value);
    }
  }
};
</script>

<style scoped>
div >>> div.v-input__slot {
  border-top: none !important;
}
</style>
