<template>
  <v-container class="my-5">
    <v-form ref="registerForm" @submit.prevent="submitForm">
      <v-layout row wrap>
        <!-- Name -->
        <v-flex xs12>
          <v-text-field
            type="text"
            id="name"
            label="Name"
            v-model="name"
            prepend-icon="movie"
            :rules="inputRule"
            :validate-on-blur="validateOnBlur"
          />
        </v-flex>

        <!-- Theatre -->
        <theatre />

        <!-- Theatre list -->

        <!-- Description -->
        <v-flex xs12>
          <v-textarea
            label="Description"
            v-model="description"
            prepend-icon="description"
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
      >
        <v-icon left>add</v-icon>
        <span>Register</span>
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import Theatre from "./Theatre";

export default {
  name: "AddMovieContent",
  components: {
    Theatre
  },
  data() {
    return {
      name: "", // Name of the movie
      description: "", // Description of the movie
      validateOnBlur: true, // Validate on blur
      theatres: [], // The theatre array
      /**
       * Name input rule
       */
      inputRule: [
        v => {
          return /^[a-z0-9_+\- ]+$/i.test(v) || "Not a valid input";
        }
      ]
    };
  }
};
</script>