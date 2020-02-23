<template>
  <v-snackbar
    v-model="show"
    color="error"
    :bottom="true"
    :right="true"
    :timeout="6000"
    :vertical="true"
  >
    <span class="text-uppercase">{{ authMessage }}</span>
    <v-btn text @click="hideMessage">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "MessageSnack",
  data() {
    return {
      show: false // Show auth message or not
    };
  },
  computed: {
    ...mapGetters({
      authMessage: "getAuthMessage" // The auth message
    })
  },
  methods: {
    ...mapMutations({
      setAuthMessage: "setAuthMessage" // Sets the auth message
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
     * Whenever auth message changes show it
     */
    authMessage(value) {
      if (value.trim().length > 0) {
        this.show = true;
      }
    },
    /**
     * When ever auth message times out, hide it
     */
    show(value) {
      if (!value) {
        this.setAuthMessage("");
      }
    }
  }
};
</script>
