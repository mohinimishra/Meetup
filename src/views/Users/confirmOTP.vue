<template>
  <v-container>
    <v-layout row class="mt-16" v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert
          @dismiseed="onDismiss"
          v-bind:text="error.message"
        ></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-5">
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form v-on:submit.prevent="ConfirmOTP">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Enter OTP"
                      id="email"
                      v-model="confirmOTP"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn text type="submit" class="blue lighten-5">
                      Confirm OTP
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["text"],
  data() {
    return {
      confirmOTP: "",
    };
  },
  methods: {
    ConfirmOTP() {
      this.$store.dispatch("confirmOTP", {
        confirmOTP: this.confirmOTP,
      });
    },
    onDismiss() {
      this.$store.dispatch("clearError");
    },
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    getEmail() {
      return this.$store.getters.sucess;
    },
  },
};
</script>