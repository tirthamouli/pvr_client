<template>
  <v-dialog max-width="600px" v-model="showDialog">
    <!-- Activator -->
    <template v-slot:activator="{ on }">
      <v-btn small rounded outlined color="primary" v-on="on">
        {{ user.email }}
        <v-icon right small>send</v-icon>
      </v-btn>
    </template>

    <!-- Card -->
    <v-card>
      <!-- Title -->
      <v-card-title>
        <h2 class="subtitle-1 text-uppercase">
          Send mail to {{ user.firstName }}
        </h2>
      </v-card-title>

      <!-- Form -->
      <v-card-text class="mt-4">
        <v-form ref="sendEmailForm" @submit.prevent="submitForm">
          <v-layout row wrap>
            <!-- Title -->
            <v-flex xs12>
              <v-text-field
                type="text"
                id="title"
                label="Title"
                v-model="title"
                prepend-icon="title"
                :rules="relaxedNameRule"
                :validate-on-blur="validateOnBlur"
              />
            </v-flex>

            <!-- Body -->
            <v-flex xs12>
              <v-textarea
                label="Body"
                v-model="body"
                prepend-icon="description"
                :rules="anyTextRule"
              ></v-textarea>
            </v-flex>
          </v-layout>

          <!-- Submit button -->
          <v-btn
            type="submit"
            block
            ripple
            large
            text
            dark
            class="primary ma-0 mt-5"
          >
            <v-icon left>send</v-icon>
            <span>Send</span>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { rulesMixin } from "../../mixins/rulesMixin";

export default {
  name: "SendMail",
  props: {
    user: Object
  },
  data() {
    return {
      title: "", // Title of the mail
      body: "", // Body of the mail
      showDialog: false, // Show dialog or not
      validateOnBlur: true // Weather to validate on blur
    };
  },
  mixins: [rulesMixin],
  methods: {
    ...mapActions({
      sendMail: "sendMail" // Send mail to an user
    }),
    /**
     * Send mail to an user
     */
    submitForm() {
      // Step 1: Re-validate inputs
      if (!this.$refs.sendEmailForm.validate()) {
        return false;
      }

      // Step 2: Generate request
      const req = {
        id: [this.user.id],
        title: this.title,
        body: this.body
      };

      // Step 3: Add the user
      this.sendMail(req);

      // Step 4: Hide the dialog
      this.showDialog = false;
    }
  }
};
</script>
