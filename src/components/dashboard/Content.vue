<template>
  <v-container class="my-5">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3>
        <v-card flat class="text-center ma-3">
          <!-- Avatar -->
          <v-responsive class="pt-4">
            <v-avatar color="primary" size="100">
              <span
                class="headline font-weight-light text-uppercase white--text"
              >
                T
              </span>
            </v-avatar>
          </v-responsive>

          <!-- Text -->
          <v-card-text>
            <div class="caption text-uppercase grey-text">
              The shining
            </div>
          </v-card-text>

          <!-- Action -->
          <v-card-actions>
            <v-btn text color="grey">
              <v-icon small left>message</v-icon>
              <span>Notify</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
