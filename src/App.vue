<template>
  <v-app>
    <navbar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/navbar/Navbar";

export default {
  name: "App",
  data: () => ({
    //
  }),
  components: {
    Navbar
  }
};
</script>

<style scoped>
.v-application {
  background-color: #f5f5f5 !important;
}
</style>
