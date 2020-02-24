<template>
  <v-list class="mt-5">
    <v-list-item
      v-for="link in links"
      :key="link.text"
      router
      exact
      :to="{ name: link.route }"
    >
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
        { icon: "dashboard", text: "Dashboard", route: "Home" },
        { icon: "person", text: "User", route: "User" },
        { icon: "movie", text: "AddMovie", route: "AddMovie" }
      ]
    };
  }
};
</script>
