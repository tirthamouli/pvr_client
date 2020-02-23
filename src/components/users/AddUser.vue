<template>
  <v-dialog max-width="600px" v-model="showDialog">
    <!-- Activator -->
    <template v-slot:activator="{ on }">
      <v-layout row class="mt-4" justify-center>
        <v-btn outlined v-on="on" text fab>
          <v-icon>add</v-icon>
        </v-btn>
      </v-layout>
    </template>

    <!-- Card -->
    <v-card>
      <!-- Title -->
      <v-card-title>
        <h2 class="subtitle-1 text-uppercase">Add a new user</h2>
      </v-card-title>

      <!-- Form -->
      <v-card-text class="mt-4">
        <v-form ref="addUserForm" @submit.prevent="submitForm">
          <v-layout row wrap>
            <!-- First name -->
            <v-flex xs12 sm6>
              <v-text-field
                outlined
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
                outlined
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
                outlined
                id="email"
                type="email"
                label="Email"
                v-model="email"
                prepend-icon="email"
                :rules="emailRule"
                :validate-on-blur="validateOnBlur"
              />
            </v-flex>

            <!-- City -->
            <v-flex xs12>
              <v-overflow-btn
                outlined
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
            :loading="addUserLoading"
            large
            text
            dark
            class="primary ma-0 mt-5"
          >
            <v-icon left>add</v-icon>
            <span>Add</span>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { addUserMixin } from "../../mixins/addUserMixin";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddUser",
  mixins: [addUserMixin],
  computed: {
    ...mapGetters({
      errorMessage: "getCommonErrorMessage",
      addUserLoading: "getAddUserLoading"
    })
  },
  methods: {
    ...mapActions({
      addUser: "addUser" // Add a new user
    }),
    /**
     * Add new user
     */
    submitForm() {
      // Step 1: Re-validate inputs
      if (!this.$refs.addUserForm.validate()) {
        return false;
      }

      // Step 2: Generate request
      const req = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        cityId: this.city
      };

      // Step 3: Add the user
      this.addUser(req);
    }
  },
  watch: {
    addUserLoading(value) {
      if (!value) {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        if (this.errorMessage === "") {
          this.showDialog = false;
        }
      }
    }
  }
};
</script>
