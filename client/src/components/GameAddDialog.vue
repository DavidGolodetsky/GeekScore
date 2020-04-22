<template>
  <the-dialog activator="plus" header="Add new game" :submitLogic="onSubmit">
    <v-text-field
      clearable
      :rules="fieldRules"
      prepend-icon="mdi-dice-multiple"
      label="Name"
      v-model="name"
    ></v-text-field>
    <v-switch v-model="coop" label="Cooperative" color="secondary" hide-details></v-switch>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      name: "",
      coop: false,
      fieldRules: [
        v => !!v || "Field is required",
        v => (!!v && v.length <= 40) || "Field is too long"
      ]
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
