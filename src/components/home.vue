<template>
  <v-container>
    <v-layout row wrap mb-3 mt-3>
      <v-flex xs12 sm6 class="text-sm-right text-xs-center">
        <v-btn
          xs12
          sm6
          large
          router
          to="/meetups"
          class="blue lighten-5 text-sm-right mr-5"
        >
          View Meetups
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-sm-left text-xs-center">
        <v-btn
          xs12
          sm6
          large
          router
          to="/meetup/new"
          class="blue lighten-5 text-sm-left"
        >
          Organize Meetup
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="item in meetup"
            :key="item.id"
            :src="item.imageUrl"
            height="200px"
            reverse-transition="fade-transition"
            transition="fade-transition"
            @click="onLoadMeetup(item.id)"
          >
            <div class="title">{{ item.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap mb-3 mt-3>
      <v-flex xs12 sm6 class="text-sm-right text-xs-center ml-12">
        <v-btn xs12 large router to="/meetups" class="blue lighten-5">
          View Meetups
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  methods: {
    onLoadMeetup: function (id) {
      this.$router.push("/meetups/" + id);
    },
  },
  computed: {
    meetup() {
      return this.$store.getters.featuredMeetups;
    },
  },
};
</script>

<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  left: 40%;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 50px;
}
</style>
