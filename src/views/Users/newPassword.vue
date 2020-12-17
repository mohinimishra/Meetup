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
              <form v-on:submit.prevent="onSave">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Enter Email"
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
                      name="email"
                      label="Enter Password"
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
                      name="confirm password"
                      label="ConfirmPassword"
                      id="Cpassword"
                      v-model="confirmPassword"
                      type="password"
                      required
                      v-bind:rules="[comparePassword]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn text type="submit" class="blue lighten-5">
                      Save
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
      password: "",
      dialog: false,
      confirmPassword: "",
    };
  },
  methods: {
    onSave() {
      this.dialog = false;
      this.$store.dispatch("updatePass", {
        email: this.email,
        password: this.password,
      });
    },
  },
  computed: {
    comparePassword() {
      return this.password !== this.confirmPassword
        ? "password do not match!"
        : "";
    },
    error() {
      return this.$store.getters.error;
    },
  },
};
</script>