<template>
  <div class="home">
    <!-- Heading -->
    <h1 class="subtitle-1 grey--text">Movies</h1>

    <!-- Content -->
    <content-vue />
  </div>
</template>

<script>
import ContentVue from "../components/dashboard/Content";

export default {
  name: "Home",
  components: {
    ContentVue
  }
};
</script>

<style scoped>
.v-btn {
  margin: 10px !important;
}
</style>
