<template>
  <v-dialog max-width="600px" v-model="showDialog">
    <!-- Activator -->
    <template v-slot:activator="{ on }">
      <v-flex xs3>
        <v-layout row justify-center>
          <!-- Add new -->
          <v-btn v-on="on" right outlined rounded ripple small text>
            <v-icon left>add</v-icon>
            <span>New</span>
          </v-btn>
        </v-layout>
      </v-flex>
    </template>

    <!-- Card -->
    <v-card>
      <!-- Title -->
      <v-card-title>
        <h2 class="subtitle-1 text-uppercase">Add a new theatre</h2>
      </v-card-title>

      <!-- Form -->
      <v-card-text class="mt-4">
        <v-form ref="addTheatreForm" @submit.prevent="submitForm">
          <v-layout row wrap>
            <!-- Name -->
            <v-flex xs12>
              <v-text-field
                id="theatreName"
                type="text"
                label="Theatre name"
                v-model="name"
                prepend-icon="movie"
                :rules="relaxedNameRule"
                :validate-on-blur="validateOnBlur"
              />
            </v-flex>

            <!-- City -->
            <v-flex xs12>
              <v-overflow-btn
                label="City"
                editable
                :items="formattedCities"
                item-value="id"
                prepend-icon="location_on"
                v-model="city"
                :loading="cityLoading"
                @update:search-input="searchCityLocal"
              ></v-overflow-btn>
            </v-flex>
          </v-layout>

          <v-btn
            type="submit"
            block
            ripple
            :loading="addTheatreLoading"
            large
            text
            dark
            class="primary ma-0 mt-5"
          >
            <v-icon left>add</v-icon>
            <span>Add</span>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { addUserMixin } from "../../mixins/addUserMixin";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { rulesMixin } from "../../mixins/rulesMixin";

export default {
  name: "AddTheatre",
  mixins: [rulesMixin, addUserMixin],
  data() {
    return {
      name: "" // Stores the theatre name
    };
  },
  computed: {
    ...mapGetters({
      errorMessage: "getCommonErrorMessage",
      addTheatreLoading: "getAddTheatreLoading"
    })
  },
  methods: {
    ...mapActions({
      addTheatre: "addTheatre" // Add a new user
    }),
    ...mapMutations({
      setCommonErrorMessage: "setCommonErrorMessage" // Set common error message
    }),
    /**
     * Add new user
     */
    submitForm() {
      // Step 1: Re-validate inputs
      if (!this.$refs.addTheatreForm.validate()) {
        return false;
      }

      // Step 1.5 Check if city is empty
      if (this.city === "") {
        return this.setCommonErrorMessage("Please add city");
      }

      // Step 2: Generate request
      const req = {
        name: this.name,
        cityId: this.city
      };

      // Step 3: Add the user
      this.addTheatre(req);
    }
  },
  watch: {
    addTheatreLoading(value) {
      if (!value) {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        if (this.errorMessage === "") {
          this.showDialog = false;
        }
      }
    }
  }
};
</script>

<style scoped>
div >>> .v-input__slot {
  border-top: none !important;
}
</style>
