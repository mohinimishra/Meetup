<template>
  <v-sucess type="sucess" dismissible v-on:input="onClose" v-bind:value="true">
    {{ text }}
  </v-sucess>
</template>

<script>
export default {
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dismiseed");
    },
  },
};
</script>