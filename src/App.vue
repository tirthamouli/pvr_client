<template>
  <v-app>
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
import { mapGetters } from "vuex";
import Navbar from "./components/navbar/Navbar";
import ErrorMessage from "./components/common/ErrorMessage";

export default {
  name: "App",
  data: () => ({
    currentRoute: "" // Stores the current route
  }),
  components: {
    Navbar,
    ErrorMessage
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
