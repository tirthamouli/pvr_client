<template>
  <v-list>
    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
      <!-- Icon -->
      <v-list-item-action>
        <v-icon class="white--text">{{ link.icon }}</v-icon>
      </v-list-item-action>

      <!-- Text -->
      <v-list-item-content>
        <v-list-item-title class="white--text">
          {{ link.text }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "Drawer",
  data() {
    return {
      /**
       * All the links
       */
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "person", text: "Add User", route: "/add/user" },
        { icon: "movie", text: "Add Movie", route: "/add/movie" }
      ]
    };
  }
};
</script>
