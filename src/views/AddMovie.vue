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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddMovie",
  components: {
    ContentVue
  },
  computed: {
    ...mapGetters({
      movies: "getMovies"
    })
  },
  methods: {
    ...mapActions({
      searchMovie: "searchMovie" // Search for movie
    })
  },
  /**
   * Created hook
   */
  created() {
    // Search for movies by default when there is no search result
    if (this.movies.length <= 0) {
      this.searchMovie("");
    }
  }
};
</script>
