<template>
  <v-container>
    <v-layout row wrap v-for="item in meetup" :key="item.id" class="mb-3">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="blue lighten-5">
          <v-container fluid>
            <v-layout row>
              <v-flex xs-5 sm4 md3>
                <v-img
                  class="ml-3"
                  height="130px"
                  :src="item.imageUrl"
                  max-width="450"
                ></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h3 class="dark--text mb-0">{{ item.title }}</h3>
                    <div>{{ item.date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn text v-bind:to="'/meetups/' + item.id">
                    <v-icon left>arrow_forward</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetups;
    },
  },
};
</script>
