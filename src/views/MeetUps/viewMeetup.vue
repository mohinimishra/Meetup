<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h5 class="primary--text">{{ meetup.title }}</h5>
            <v-spacer></v-spacer>
            <template v-if="userIsCreater">
              <v-spacer></v-spacer>
            </template>
          </v-card-title>
          <v-img v-bind:src="meetup.imageUrl" height="400px"> </v-img>
          <v-card-text>
            <div class="info--text">
              {{ meetup.date }} {{ meetup.location }}
            </div>
            <div>
              {{ meetup.description }}
            </div>
          </v-card-text>
          <v-card-actions>
            <app-edit v-bind:meetup="meetup"></app-edit>
            <v-spacer></v-spacer>
            <app-register v-bind:meetupId="meetup.id"></app-register>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import Edit from "./EditMeetup/edit.vue";
import Register from "../Register/register";
export default {
  components: {
    "app-edit": Edit,
    "app-register": Register,
  },
  props: ["id"],

  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userISAuthenticate() {
      return (
        this.$store.getters.validateUser != null &&
        this.$store.getters.validateUser !== undefined
      );
    },
    userIsCreater() {
      if (!this.userISAuthenticate) {
        return false;
      }
      return this.$store.getters.validateUser.id === this.meetup.createrId;
    },
  },
};
</script>