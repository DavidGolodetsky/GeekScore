<template>
  <the-dialog activator="plus" header="Add new game" :submitLogic="onSubmit">
    <v-text-field
      clearable
      :rules="fieldRules"
      prepend-icon="mdi-dice-multiple"
      label="Name"
      v-model.trim="name"
    ></v-text-field>
    <v-switch v-model="coop" label="Cooperative" color="secondary" hide-details></v-switch>
  </the-dialog>
</template>

<script lang='ts'>
import Vue from "vue";

import { mapActions } from "vuex";
import { Game } from "@/types";

export default Vue.extend({
  data() {
    return {
      name: "",
      coop: false,
      fieldRules: [
        v => !!v || "Field is required",
        v => (!!v && v.length <= 40) || "Field is too long",
        v =>
          !!(v && v.replace(/\s/g, "").length) ||
          "Field contains only whitespaces"
      ]
    };
  },
  methods: {
    ...mapActions("games", ["createGame"]),
    onSubmit() {
      const game: Game = {
        coop: this.coop,
        name: this.name
      };
      this.createGame(game);
    }
  },
  errorCaptured(err, vm, info) {
    console.warn(err, vm, info);
    return false;
  }
});
</script>
