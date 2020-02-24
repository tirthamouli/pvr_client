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

      <!-- Add theatre -->
      <add-theatre />

      <!-- Start date -->
      <v-flex xs12 sm6>
        <v-menu
          max-width="290"
          v-model="startDateMenu"
          :close-on-content-click="false"
        >
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
            :max="endDate"
          ></v-date-picker>
        </v-menu>
      </v-flex>

      <!-- End date -->
      <v-flex xs12 sm6>
        <v-menu
          max-width="290"
          v-model="endDateMenu"
          :close-on-content-click="false"
        >
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
            :min="startDate"
          ></v-date-picker>
        </v-menu>
      </v-flex>

      <!-- Add Button -->
      <v-flex xs12 class="px-5">
        <v-btn
          @click="addTheatreToList"
          rounded
          block
          ripple
          text
          class="ma-0 mt-5"
        >
          <v-icon left>add</v-icon>
          <span>Add theatre to list</span>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddTheatre from "./AddTheatre";
import { mapGetters, mapMutations, mapActions } from "vuex";
import format from "date-fns/format";

export default {
  name: "AddMovieTheatre",
  components: {
    AddTheatre // Add a new theatre menu
  },
  data() {
    return {
      startDateMenu: false, // Start date menu
      startDate: null, // Start date
      endDateMenu: false, // End date menu
      endDate: null, // End date
      prevSearchedTheatre: "", // Stores the previously searched theatres
      theatre: "", //The current selected theatre
      searchTheatreTimeout: null // Stores current timeout
    };
  },
  computed: {
    ...mapGetters({
      theatreLoading: "getTheatreLoading",
      addTheatreLoading: "getAddTheatreLoading",
      theatres: "getTheatres"
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
      return this.theatres.map(theatre => {
        return {
          text: theatre.name,
          id: theatre.id
        };
      });
    }
  },
  methods: {
    ...mapActions({
      searchTheatre: "searchTheatre"
    }),
    ...mapMutations({
      setCommonErrorMessage: "setCommonErrorMessage" // Set common error message
    }),
    /**
     * Search theatre by value
     */
    searchTheatreLocal(value) {
      // Step 0: Detect a change
      if (value === this.prevSearchedTheatre) {
        return false;
      }
      this.prevSearchedTheatre = value;

      // Step 1: Clear city timeout if not null
      if (this.searchTheatreTimeout !== null) {
        clearTimeout(this.searchTheatreTimeout);
      }

      // Step 2: Create a new timeout
      this.searchTheatreTimeout = setTimeout(() => {
        this.searchTheatre(value);
      }, 500);
    },
    /**
     * Add theatre to list
     */
    addTheatreToList() {
      // Step 1: Check if theatre is selected
      if (this.theatre === "") {
        return this.setCommonErrorMessage("Please select a theatre");
      }

      // Step 2: Check if start date is selected
      if (this.startDate === null) {
        return this.setCommonErrorMessage("Please select start date");
      }

      // Step 3: Check if end date is selected
      if (this.endDate === null) {
        return this.setCommonErrorMessage("Please select end date");
      }

      // Step 4: Emit event in case all are selected
      this.$emit("added", {
        start: this.startDate,
        end: this.endDate,
        theatreId: this.theatre,
        name: this.theatres.find(cur => {
          return this.theatre === cur.id;
        }).name
      });

      // Step 5: Empty the input
      this.theatre = "";
      this.startDate = null;
      this.endDate = null;
    }
  },
  watch: {
    /**
     * Update when stop adding
     */
    addTheatreLoading(value) {
      if (!value) {
        this.prevSearchedTheatre = this.theatres[0].name;
        this.theatre = this.theatres[0].id;
      }
    }
  }
};
</script>

<style scoped>
div >>> div.v-input__slot {
  border-top: none !important;
}
</style>
