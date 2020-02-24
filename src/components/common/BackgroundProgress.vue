<template>
  <v-progress-linear
    v-show="sendingMail"
    color="red lighten-2"
    buffer-value="0"
    stream
  ></v-progress-linear>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BackgroundLoader",
  computed: {
    ...mapGetters({
      sendingMail: "getSendingMail"
    })
  }
};
</script>

<style scoped>
.v-progress-linear {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6;
}
</style>
