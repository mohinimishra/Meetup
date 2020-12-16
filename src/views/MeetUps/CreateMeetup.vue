<template>
  <v-container>
    <v-layout row class="mt-3">
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="grey--text mb-5">Create a New MeetUps</h1>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-form>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                v-model="title"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 mb-3>
              <v-btn raised class="primary" @click="onPickFile">
                Upload Image</v-btn
              >
              <input
                type="file"
                style="display: none"
                ref="inputFile"
                accept="image/*"
                @change="onChangeImage"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 v-show="image">
              <img :src="imageUrl" height="200px" width="200" />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date" class="mr-5"></v-date-picker>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                required
                label="description"
                rows="1"
                id="description"
                v-model="description"
              >
              </v-textarea>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                v-on:click.prevent="oncreateMeetup"
                class="blue lighten-4"
                v-bind:disabled="!isValidate"
                >Create MeetUp</v-btn
              >
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: " ",
      location: "",
      imageUrl: "",
      description: "",
      date: new Date().toISOString().substr(0, 10),
      time: new Date().getHours(),
      image: null,
    };
  },
  computed: {
    isValidate() {
      return (
        this.title != "" &&
        this.location != "" &&
        this.imageUrl != "" &&
        this.description != ""
      );
    },
    submitableDateTime() {
      return `${this.date}  ${this.time}`;
    },
  },
  methods: {
    oncreateMeetup() {
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submitableDateTime,
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onPickFile() {
      this.$refs.inputFile.click();
    },
    onChangeImage(event) {
      console.log(event.target.files);
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        alert("Please upload a valid file.");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
  },
};
</script>