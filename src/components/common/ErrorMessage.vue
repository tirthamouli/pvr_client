<template>
  <v-snackbar
    v-model="show"
    color="error"
    :bottom="true"
    :right="true"
    :timeout="6000"
    :vertical="true"
  >
    <span class="text-uppercase">{{ errorMessage }}</span>
    <v-btn text @click="hideMessage">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ErrorMessage",
  data() {
    return {
      show: false // Show error message or not
    };
  },
  computed: {
    ...mapGetters({
      errorMessage: "getCommonErrorMessage" // The error message
    })
  },
  methods: {
    ...mapMutations({
      setCommonErrorMessage: "setCommonErrorMessage" // Sets the error message
    }),
    /**
     * Hides the message
     */
    hideMessage() {
      this.show = false;
    }
  },
  watch: {
    /**
     * Whenever error message changes show it
     */
    errorMessage(value) {
      if (value.trim().length > 0) {
        this.show = true;
      }
    },
    /**
     * When ever error message times out, hide it
     */
    show(value) {
      if (!value) {
        this.setCommonErrorMessage("");
      }
    }
  }
};
</script>
