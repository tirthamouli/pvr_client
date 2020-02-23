<template>
  <v-container justify-center class="fill-height">
    <v-layout row justify-center align-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card flat>
          <!-- Heading -->
          <v-card-title class="px-5 pt-5">
            <h2 class="font-weight-light text-uppercase headline primary--text">
              Login
            </h2>
          </v-card-title>

          <!-- Form -->
          <v-card-text class="px-5 pb-5">
            <v-form
              ref="loginForm"
              @submit.prevent="submitForm"
              autocomplete="on"
            >
              <!-- User name -->
              <v-text-field
                id="username"
                autocomplete="username"
                auto-complete="on"
                v-model="username"
                label="Username"
                prepend-icon="account_box"
                :rules="inputRules"
              />

              <!-- Password -->
              <v-text-field
                id="password"
                autocomplete="current-password"
                v-model="password"
                type="password"
                label="Password"
                prepend-icon="vpn_key"
                :rules="inputRules"
              />

              <!-- Submit button -->
              <v-btn
                type="submit"
                block
                ripple
                :loading="loading"
                large
                text
                dark
                class="primary ma-0 mt-5"
              >
                <v-icon left>fast_forward</v-icon>
                <span>Login</span>
              </v-btn>
            </v-form>

            <!-- Error message snackbar -->
            <error-message />
          </v-card-text>
        </v-card>

        <!-- Register link -->
        <p class="text-center mt-5">
          <router-link
            class="font-weight-bold primary--text"
            :to="{ name: 'Register' }"
            >Create account ?</router-link
          >
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ErrorMessage from "../components/login/ErrorMessage";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    ErrorMessage
  },
  data() {
    return {
      username: "", // Username of the user
      password: "", // Password of the user
      /**
       * Input rules for input fields
       */
      inputRules: [
        v => {
          return v.length > 0 || "Please enter some value";
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      loading: "getLoadingAuth" // Any auth action is happening
    })
  },
  methods: {
    ...mapActions({
      login: "login" // Login action
    }),
    /**
     * Submit the form
     */
    submitForm() {
      // Step 1: Re-validate inputs
      if (!this.$refs.loginForm.validate()) {
        return false;
      }

      // Step 2: Trim username and password
      const username = this.username.trim();
      const password = this.password.trim();

      // Step 3: Create request object
      const request = {
        username,
        password
      };

      // Step 4: Login
      this.login(request);
    }
  },
  watch: {
    /**
     * Clear username and password when loading stops
     */
    loading(value) {
      if (!value) {
        this.username = "";
        this.password = "";
      }
    }
  }
};
</script>
