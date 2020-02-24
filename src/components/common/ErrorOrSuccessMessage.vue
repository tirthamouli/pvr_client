<template>
  <v-snackbar
    v-model="show"
    :color="errorOrSuccess"
    :bottom="true"
    :right="true"
    :timeout="6000"
    :vertical="true"
  >
    <span class="text-uppercase">{{ message }}</span>
    <v-btn text @click="hideMessage">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ErrorOrSuccessMessage",
  data() {
    return {
      show: false, // Show error message or not
      errorOrSuccess: "", // Stores if it is error or success
      message: "" // The message to be shown
    };
  },
  computed: {
    ...mapGetters({
      errorMessage: "getCommonErrorMessage", // The error message
      commonSuccessMessage: "getCommonSuccessMessage" // The success message
    })
  },
  methods: {
    ...mapMutations({
      setCommonErrorMessage: "setCommonErrorMessage", // Sets the error message
      setCommonSuccessMessage: "setCommonSuccessMessage" // Sets the common success message
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
        this.errorOrSuccess = "error";
        this.message = value;
        this.show = true;
      }
    },
    /**
     * When ever we get a success message, show it
     */
    commonSuccessMessage(value) {
      if (value.trim().length > 0) {
        this.errorOrSuccess = "success";
        this.message = value;
        this.show = true;
      }
    },
    /**
     * When ever error message times out, hide it
     */
    show(value) {
      if (!value) {
        this.setCommonErrorMessage("");
        this.setCommonSuccessMessage("");
        this.message = "";
      }
    }
  }
};
</script>
