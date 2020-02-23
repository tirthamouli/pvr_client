<template>
  <v-layout column align-center>
    <v-flex class="mt-5" v-if="auth !== null && 'firstName' in auth">
      <v-avatar size="150" color="orange">
        <span class="headline font-weight-light text-uppercase white--text">
          {{ auth.firstName[0] + auth.lastName[0] }}
        </span>
      </v-avatar>
      <p class="white--text subtitle-1 nt-1">
        {{ auth.firstName }} {{ auth.lastName }}
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Avatar",
  computed: {
    ...mapGetters({
      auth: "getAuth"
    })
  }
};
</script>
