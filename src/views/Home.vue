<template>
  <div class="home">
    <!-- Heading -->
    <h1 class="subtitle-1 grey--text">Movies</h1>

    <!-- Content -->
    <content-vue />

    <!-- Pagination loader -->
    <v-progress-linear
      v-show="moviePagination.loading"
      color="red lighten-2"
      buffer-value="0"
      stream
      height="6"
    ></v-progress-linear>
  </div>
</template>

<script>
import ContentVue from "../components/dashboard/Content";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      timeout: null // Set the scroll timeout
    };
  },
  components: {
    ContentVue
  },
  computed: {
    ...mapGetters({
      moviePagination: "getMoviePagination"
    })
  },
  methods: {
    ...mapActions({
      searchMovieNext: "searchMovieNext" // Search the next
    }),
    /**
     * Handles the scroll behaviour
     */
    scrollBehaviour() {
      // Step 1: Get scroll details
      var d = document.documentElement;
      var offset = d.scrollTop + window.innerHeight;
      var height = d.offsetHeight;

      // Step 2: Check if we reached bottom
      if (offset >= height - 20) {
        // Step 2.1: Clear timeout if required
        if (this.timeout !== null) {
          clearTimeout(this.timeout);
        }

        // Step 2.1: Set new timeout
        this.timeout = setTimeout(() => {
          this.searchMovieNext();
        }, 500);
      }
    }
  },
  /**
   * Add event listener when added
   */
  mounted() {
    window.addEventListener("scroll", this.scrollBehaviour);
  },
  /**
   * Remove event listener when done
   */
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollBehaviour);
  }
};
</script>

<style scoped>
.v-btn {
  margin: 10px !important;
}

.v-progress-linear {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
