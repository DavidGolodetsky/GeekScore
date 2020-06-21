<template>
  <the-dialog
    activator-icon="pencil"
    color="#fff"
    header="Edit team info"
    simple
    :submit-logic="onSubmit"
  >
    <v-text-field clearable :rules="fieldRules" label="Name" v-model="name"></v-text-field>
    <v-switch v-model="isDelete" label="Delete team" color="error" hide-details></v-switch>
  </the-dialog>
</template>

<script>
import {
  requiredField,
  onlyWhitespaces,
  tooLongField
} from "@/utils/validations";
import { mapActions } from "vuex";

export default {
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: this.team.name,
      isDelete: false,
      fieldRules: [requiredField, tooLongField, onlyWhitespaces]
    };
  },
  methods: {
    ...mapActions("teams", ["updateTeam", "deleteTeam"]),
    onSubmit() {
      this.isDelete && this.deleteTeam(this.team._id);
      this.updateTheTeam();
    },
    updateTheTeam() {
      const team = {
        _id: this.team._id,
        gameId: this.team.gameId,
        name: this.name
      };
      this.updateTeam(team);
    }
  }
};
</script>
