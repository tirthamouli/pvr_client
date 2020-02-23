<template>
  <div class="user">
    <!-- Heading -->
    <h1 class="subtitle-1 grey--text">User</h1>

    <!-- Content -->
    <content-vue />
  </div>
</template>

<script>
import ContentVue from "../components/users/Content";

export default {
  name: "User",
  components: {
    ContentVue //Lists the users
  }
};
</script>
