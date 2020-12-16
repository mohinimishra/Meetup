<template>
  <v-container>
    <v-layout row class="mt-16" v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert
          @dismiseed="onDismiss"
          v-bind:text="error.message"
        ></app-alert
      ></v-flex>
    </v-layout>
    <v-layout row class="mt-5">
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form v-on:submit.prevent="onSignUp">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirm password"
                      v-model="confirmPassword"
                      type="password"
                      v-bind:rules="[comparePassword]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn text type="submit" class="blue lighten-5">
                      Sign Up
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
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    comparePassword() {
      return this.password !== this.confirmPassword
        ? "password do not match!"
        : "";
    },
    user() {
      return this.$store.getters.validateUser;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
  },
  methods: {
    onSignUp() {
      this.$store.dispatch("User", {
        email: this.email,
        password: this.password,
      });
    },
    onDismiss() {
      console.log("dismissed alert");
      this.$store.dispatch("clearError");
    },
  },
};
</script>