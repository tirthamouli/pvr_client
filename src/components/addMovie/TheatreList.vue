<template>
  <v-container class="my-5">
    <!-- Heading -->
    <h1 class="subtitle-1 text-uppercase font-weight-light primary--text">
      List
    </h1>

    <!-- List -->
    <v-layout row wrap>
      <v-chip
        v-for="theatre in theatres"
        :key="theatre.theatreId"
        class="ma-2"
        close
        color="teal"
        text-color="white"
        close-icon="mdi-delete"
        @click:close="close(theatre.theatreId)"
      >
        <v-avatar left>
          <v-icon>play_circle_filled</v-icon>
        </v-avatar>
        {{ theatre.name }}
      </v-chip>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "TheatreList",
  props: {
    theatres: Array,
    close: Function
  }
};
</script>
