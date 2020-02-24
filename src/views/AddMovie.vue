<template>
  <div class="theatre">
    <!-- Heading -->
    <h1 class="subtitle-1 grey--text">Add movie</h1>

    <!-- Content -->
    <content-vue />
  </div>
</template>

<script>
import ContentVue from "../components/addMovie/Content";

export default {
  name: "AddMovie",
  components: {
    ContentVue
  }
};
</script>
