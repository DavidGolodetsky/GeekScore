<template>
  <the-dialog
    activator="pencil"
    color="#fff"
    header="Edit team info"
    simple
    :submitLogic="onSubmit"
  >
    <v-text-field clearable :rules="fieldRules" label="Name" v-model="name"></v-text-field>
    <v-switch v-model="isDelete" label="Delete team" color="error" hide-details></v-switch>
  </the-dialog>
</template>

<script>
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
      fieldRules: [
        v => !!v || "Field is required",
        v => (!!v && v.length <= 60) || "Field is too long",
        v =>
          !!(v && v.replace(/\s/g, "").length) ||
          "Field contains only whitespaces"
      ]
    };
  },
  methods: {
    ...mapActions("teams", ["updateTeam", "deleteTeam"]),
    onSubmit() {
      const team = {
        _id: this.team._id,
        gameId: this.team.gameId,
        name: this.name
      };
      if (this.isDelete) {
        this.deleteTeam(this.team._id);
        return;
      }
      this.updateTeam(team);
    }
  },
  errorCaptured(err, vm, info) {
    console.warn(err, vm, info);
    return false;
  }
};
</script>
