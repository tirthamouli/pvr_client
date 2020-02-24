<template>
  <v-container class="my-5">
    <v-form ref="addMovieForm" @submit.prevent="submitForm">
      <v-layout row wrap>
        <!-- Name -->
        <v-flex xs12>
          <v-text-field
            type="text"
            id="name"
            label="Name"
            v-model="name"
            prepend-icon="movie"
            :rules="relaxedNameRule"
            :validate-on-blur="validateOnBlur"
          />
        </v-flex>

        <!-- Theatre -->
        <theatre @added="addToTheatreList" />

        <!-- Theatre list -->
        <theatre-list :theatres="theatres" :close="removeTheatre" />

        <!-- Description -->
        <v-flex xs12>
          <v-textarea
            label="Description"
            v-model="description"
            prepend-icon="description"
            :rules="anyTextRule"
          ></v-textarea>
        </v-flex>
      </v-layout>

      <v-btn
        type="submit"
        block
        ripple
        large
        text
        dark
        class="primary ma-0 mt-5"
        :loading="loading"
      >
        <v-icon left>add</v-icon>
        <span>Add</span>
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import Theatre from "./Theatre";
import TheatreList from "./TheatreList";
import { rulesMixin } from "../../mixins/rulesMixin";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "AddMovieContent",
  mixins: [rulesMixin],
  components: {
    Theatre,
    TheatreList
  },
  data() {
    return {
      name: "", // Name of the movie
      description: "", // Description of the movie
      validateOnBlur: true, // Validate on blur
      theatres: [], // The theatre array
      theatreId: {} // Duplicate id check
    };
  },
  computed: {
    ...mapGetters({
      loading: "getAddMovieLoading",
      errorMessage: "getCommonErrorMessage"
    })
  },
  methods: {
    ...mapActions({
      addMovie: "addMovie"
    }),
    ...mapMutations({
      setCommonErrorMessage: "setCommonErrorMessage" // Set common error message
    }),
    /**
     * Add value to the theatre list
     */
    addToTheatreList(value) {
      // Step 1: Check if value has already been inserted
      if (value.theatreId in this.theatreId) {
        return this.setCommonErrorMessage("Theatre already inserted");
      }
      this.theatreId[value.theatreId] = true;

      // Step 2: Actually insert it
      this.theatres = [value, ...this.theatres];
    },
    /**
     * Remove the theatre from selected list
     */
    removeTheatre(id) {
      // Step 1: Delete from theareId
      delete this.theatreId[id];

      // Step 2: Filter the list
      this.theatres = this.theatres.filter(theatre => {
        return theatre.theatreId !== id;
      });
    },
    /**
     * Submit Form
     */
    submitForm() {
      // Step 1: Re-validate inputs
      if (!this.$refs.addMovieForm.validate()) {
        return false;
      }

      // Step 2: Check if theatres have been added
      if (this.theatres.length === 0) {
        return this.setCommonErrorMessage("Please select atleast one theatre");
      }

      // Step 2: Generate request
      const req = {
        name: this.name,
        description: this.description.trim(),
        shows: this.theatres
      };

      // Step 3: Add the user
      this.addMovie(req);
    }
  },
  watch: {
    loading(value) {
      if (!value) {
        this.name = "";
        this.description = "";
        this.theatres = [];
        if (this.errorMessage === "") {
          this.$router.push({ name: "Home" });
        }
      }
    }
  }
};
</script>
