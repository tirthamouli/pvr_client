<template>
  <v-app>
    <!-- Nav bar -->
    <navbar v-if="currentRoute !== null && currentRoute !== 'Login'" />

    <!-- Routes -->
    <v-content class="mx-4 mb-4">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/navbar/Navbar";

export default {
  name: "App",
  data: () => ({
    currentRoute: "" // Stores the current route
  }),
  components: {
    Navbar
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
