<template>
  <v-dialog v-model="dialog" persistent max-width="350px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="blue lighten-5" v-bind="attrs" v-on="on"> Get Otp</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit MeetUp</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Title*"
                v-model="editedTitle"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Locaton*"
                v-model="editedLocation"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Description"
                v-model="editedDescription"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-date-picker v-model="editedDate" class="mr-5"></v-date-picker>
              <v-time-picker v-model="editedTime" format="24hr"></v-time-picker>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="onSave"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      editedLocation: this.meetup.location,
      editedDate: this.meetup.date,
      editedTime: this.meetup.time,
      dialog: false,
    };
  },
  methods: {
    onSave() {
      this.dialog = false;
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        location: this.editedLocation,
        description: this.editedDescription,
        date: this.editedDate,
        time: this.editedTime,
      });
    },
  },
};
</script>

