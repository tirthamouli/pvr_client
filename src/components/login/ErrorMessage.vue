<template>
  <v-snackbar
    v-model="showErrorMessage"
    color="error"
    :bottom="true"
    :right="true"
    :timeout="6000"
    :vertical="true"
  >
    <span class="text-uppercase">{{ errorMessage }}</span>
    <v-btn flat @click="showErrorMessage = false">Close</v-btn>
  </v-snackbar>
</template>
