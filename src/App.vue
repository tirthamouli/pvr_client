<template>
  <v-app>
    <!-- Background progress -->
    <background-progress />

    <!-- Nav bar -->
    <navbar
      v-if="
        currentRoute !== null &&
          currentRoute !== 'Login' &&
          currentRoute !== 'Register'
      "
    />

    <!-- Routes -->
    <v-content class="mx-4 mb-4">
      <router-view />
    </v-content>

    <!-- Error message snack -->
    <error-message />
  </v-app>
</template>

<script>
import Navbar from "./components/navbar/Navbar";
import ErrorMessage from "./components/common/ErrorOrSuccessMessage";
import BackgroundProgress from "./components/common/BackgroundProgress";
import { mapGetters } from "vuex";

export default {
  name: "App",
  data: () => ({
    currentRoute: "" // Stores the current route
  }),
  components: {
    Navbar, // Navbar
    ErrorMessage, // Common error message
    BackgroundProgress // Background progress
  },
  computed: {
    ...mapGetters({
      isVerified: "getIsVerified"
    })
  },
  watch: {
    /**
     * Watch to change routes
     */
    isVerified(current, prev) {
      if (current === "VERIFIED" && prev === "NOT_VERIFIED") {
        this.$router.push({ name: "Home" });
      } else if (current === "NOT_VERIFIED" && prev === "VERIFIED") {
        this.$router.push({ name: "Login" });
      }
    }
  },
  /**
   * Updated hook
   */
  updated() {
    // Updating the current route
    this.currentRoute = this.$router.history.current.name;
  }
};
</script>

<style scoped>
.v-application {
  background-color: #f5f5f5 !important;
}
</style>
