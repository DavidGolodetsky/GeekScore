<template>
  <the-dialog activator-icon="plus" header="Add new game" :submit-logic="onSubmit">
    <v-text-field
      v-model.trim="name"
      clearable
      :rules="nameRules"
      prepend-icon="mdi-dice-multiple"
      label="Name"
    />
    <v-switch v-model="coop" label="Cooperative" color="secondary" hide-details />
  </the-dialog>
</template>

<script>
import { standardField } from "@/utils/validations";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      coop: false,
      nameRules: standardField
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
      this.name = "";
    }
  }
};
</script>
