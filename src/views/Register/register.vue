<template>
  <v-dialog v-model="registerDialog" persistent width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="blue lighten-5"
        class="blue lighten-5"
        v-bind="attrs"
        v-on="on"
      >
        {{ isUserRegisterd ? "UnRegister" : "Register" }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title v-if="isUserRegisterd">
        <span class="headline">Unregister from Meetup?</span>
      </v-card-title>
      <v-card-title v-else>
        <span class="headline">Register for Meetup?</span>
      </v-card-title>
      <v-card-text>You can always change Your decision later on.</v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="registerDialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="onAgree"> Confirm </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["meetupId"],
  data() {
    return {
      registerDialog: false,
    };
  },
  computed: {
    isUserRegisterd() {
      return (
        this.$store.getters.validateUser.registerId.findIndex((meetupId) => {
          return meetupId === this.meetupId;
        }) >= 0
      );
    },
  },
  methods: {
    onAgree() {
      if (this.isUserRegisterd) {
        (this.registerDialog = false),
          this.$store.dispatch("unregisterUserForMeetup", this.meetupId);
      } else {
        (this.registerDialog = false),
          this.$store.dispatch("registerUserForMeetup", this.meetupId);
      }
    },
  },
};
</script>
