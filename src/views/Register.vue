<template>
  <v-container justify-center class="fill-height">
    <v-layout row justify-center align-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card flat>
          <!-- Heading -->
          <v-card-title class="px-5 pt-5">
            <h2 class="font-weight-light text-uppercase headline primary--text">
              Register
            </h2>
          </v-card-title>

          <!-- Form -->
          <v-card-text class="px-5 pb-5">
            <v-form ref="registerForm" @submit.prevent="submitForm">
              <v-layout row wrap>
                <!-- First name -->
                <v-flex xs12 sm6>
                  <v-text-field
                    type="text"
                    id="firstName"
                    label="First Name"
                    v-model="firstName"
                    prepend-icon="person"
                    :rules="nameRule"
                    :validate-on-blur="validateOnBlur"
                  />
                </v-flex>

                <!-- Last name -->
                <v-flex xs12 sm6>
                  <v-text-field
                    type="text"
                    id="lastName"
                    label="Last Name"
                    v-model="lastName"
                    prepend-icon="person"
                    :rules="nameRule"
                    :validate-on-blur="validateOnBlur"
                  />
                </v-flex>

                <!-- Email -->
                <v-flex xs12>
                  <v-text-field
                    type="email"
                    id="email"
                    label="Email"
                    v-model="email"
                    prepend-icon="email"
                    :rules="emailRule"
                    :validate-on-blur="validateOnBlur"
                  />
                </v-flex>

                <!-- Username -->
                <v-flex xs12>
                  <v-text-field
                    type="text"
                    id="username"
                    label="Username"
                    v-model="username"
                    prepend-icon="perm_identity"
                    :rules="usernameRule"
                    :validate-on-blur="validateOnBlur"
                    autocomplete="username"
                  />
                </v-flex>

                <!-- Password -->
                <v-flex xs12>
                  <v-text-field
                    type="password"
                    id="password"
                    label="Password"
                    v-model="password"
                    prepend-icon="vpn_key"
                    :rules="passwordRule"
                    :validate-on-blur="validateOnBlur"
                    autocomplete="new-password"
                  />
                </v-flex>

                <!-- Repeat Password -->
                <v-flex xs12>
                  <v-text-field
                    type="password"
                    id="repeatPassword"
                    label="Repeat password"
                    v-model="repeatPassword"
                    prepend-icon="vpn_key"
                    :rules="repeatPasswordRule"
                    :validate-on-blur="validateOnBlur"
                    autocomplete="new-password"
                  />
                </v-flex>

                <!-- City -->
                <v-flex xs12>
                  <v-overflow-btn
                    label="City"
                    editable
                    :items="formattedCities"
                    item-value="id"
                    prepend-icon="location_on"
                    v-model="city"
                    :loading="cityLoading"
                    @update:search-input="searchCityLocal"
                  ></v-overflow-btn>
                </v-flex>
              </v-layout>

              <v-btn
                type="submit"
                block
                ripple
                large
                text
                :loading="loading"
                dark
                class="primary ma-0 mt-5"
              >
                <v-icon left>add</v-icon>
                <span>Register</span>
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
            :to="{ name: 'Login' }"
            >Already have an account ?</router-link
          >
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { addUserMixin } from "../mixins/addUserMixin";
import { rulesMixin } from "../mixins/rulesMixin";
import { mapGetters, mapMutations, mapActions } from "vuex";
import ErrorMessage from "../components/login/ErrorMessage";

export default {
  name: "Login",
  mixins: [rulesMixin, addUserMixin],
  components: {
    ErrorMessage
  },
  data() {
    return {
      username: "", // Username of the user
      password: "", // Password of the user
      repeatPassword: "" // Repeat password
    };
  },
  computed: {
    ...mapGetters({
      loading: "getLoadingAuth" // Any auth action is happening
    })
  },
  methods: {
    ...mapActions({
      register: "register" // Register action
    }),
    ...mapMutations({
      setCommonErrorMessage: "setCommonErrorMessage" // Set common error message
    }),
    /**
     * Submit the form
     */
    submitForm() {
      // Step 1: Re-validate inputs
      if (!this.$refs.registerForm.validate()) {
        return false;
      }

      // Step 1.5 Check if city is empty
      if (this.city === "") {
        return this.setCommonErrorMessage("Please add city");
      }

      // Step 2: Get the data
      const firstName = this.firstName.trim();
      const lastName = this.lastName.trim();
      const email = this.email.trim();
      const username = this.username.trim();
      const password = this.password.trim();
      const repeatPassword = this.repeatPassword.trim();
      const cityId = this.city;

      // Step 3: Create request object
      const request = {
        firstName,
        lastName,
        email,
        username,
        password,
        repeatPassword,
        cityId
      };

      // Step 4: Login
      this.register(request);
    }
  },
  watch: {
    /**
     * Clear username and password when loading stops
     */
    loading(value) {
      if (!value) {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.username = "";
        this.password = "";
        this.repeatPassword = "";
      }
    }
  }
};
</script>

<style scoped>
div >>> div.v-input__slot {
  border-top: none !important;
}
</style>
