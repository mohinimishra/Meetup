<template>
  <v-dialog v-model="dialog" persistent max-width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="blue lighten-5" v-bind="attrs" v-on="on" @click="getOTP">
        Get OTP
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Enter OTP"
                v-model="OTP"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <app-pass v-bind:OTP="OTP"> </app-pass>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Password from "../Users/newPassword.vue";
export default {
  props: ["email"],
  components: {
    "app-pass": Password,
  },
  data() {
    return {
      // editedTitle: this.meetup.title,
      // editedDescription: this.meetup.description,
      // editedLocation: this.meetup.location,
      // editedDate: this.meetup.date,
      // editedTime: this.meetup.time,
      dialog: false,
      show: false,
      disable: false,
      OTP: "",
    };
  },
  methods: {
    getOTP() {
      console.log("done");
      if (!this.error) {
        this.disable = true;
      }
      this.$store.dispatch("verifyOTP", {
        email: this.email,
      });
    },
    verifyOTP() {
      this.$store.dispatch("confirmOTP", {
        email: this.email,
        OTP: this.OTP,
      });
      if (!this.error) {
        this.$router.push("/newpassword");
      }
    },
    //     onSave() {
    //       this.dialog = false;
    //       this.$store.dispatch("updateMeetupData", {
    //         id: this.meetup.id,
    //         title: this.editedTitle,
    //         location: this.editedLocation,
    //         description: this.editedDescription,
    //         date: this.editedDate,
    //         time: this.editedTime,
    //       });
    //     },
    //   },
  },
};
</script>

