<template>
  <the-dialog activator-icon="plus" header="Add new game" :submit-logic="onSubmit">
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

<script>
import {
  requiredField,
  onlyWhitespaces,
  tooLongField
} from "@/utils/validations";
import { mapActions } from "vuex";
// TODO:refactored
export default {
  data() {
    return {
      name: "",
      coop: false,
      fieldRules: [requiredField, tooLongField, onlyWhitespaces]
    };
  },
  methods: {
    ...mapActions("games", ["createGame"]),
    onSubmit() {
      const game = {
        coop: this.coop,
        name: this.name
      };
      this.createGame(game);
    }
  }
};
</script>
