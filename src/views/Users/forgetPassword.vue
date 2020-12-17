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
              <form>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Enter Your Email "
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 class="text-sm-right text-xs-center">
                    <v-btn
                      xs12
                      sm6
                      large
                      router
                      class="blue lighten-5 text-sm-right mr-5"
                      v-on:click.prevent="getOTP"
                      v-bind:disabled="!isValidate"
                    >
                      Get OTP
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
      email: "",
      show: false,
      disable: false,
      OTP: "",
    };
  },

  methods: {
    getOTP() {
      if (!this.error) {
        this.disable = true;
      }
      this.$store.dispatch("passReset", {
        email: this.email,
      });
    },
    verifyOTP() {
      this.$store.dispatch("confirmOTP", {
        email: this.email,
        OTP: this.OTP,
      });
      if (!this.error) {
        this.$router.push("/newPassword");
      }
    },
    onDismiss() {
      this.$store.dispatch("clearError");
    },
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    sucess() {
      return this.$store.getters.sucess;
    },
    isValidate() {
      return this.email != "";
    },
  },
};
</script>