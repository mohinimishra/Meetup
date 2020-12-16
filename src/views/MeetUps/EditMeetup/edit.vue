<template>
  <v-dialog v-model="dialog" persistent max-width="3500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="blue lighten-5" v-bind="attrs" v-on="on"> Edit </v-btn>
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
  <!-- <v-list>
    <v-list-item v-if="clicked" v-on:click="onClicked">
      <v-list-item-action>
        <v-btn text class="blue lighten-5">
          <v-icon left>edit</v-icon>
          Edit
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-container v-if="!clicked">
      <v-layout row class="mt-3">
        <v-flex xs12 sm6 offset-sm3>
          <h1 class="grey--text mb-5">Edit MeetUps</h1>
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
                  required
                >
                </v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row>
              <v-flex xs12 sm6 offset-sm3>
                <v-textarea
                  required
                  label="description"
                  rows="1"
                  id="description"
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
  </v-list> -->
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

