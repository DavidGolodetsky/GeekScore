<template>
  <the-dialog
    activator="pencil"
    color="#607d8b"
    header="Edit round info"
    simple
    :submitLogic="onSubmit"
  >
    <v-switch v-model="isDelete" label="Delete round" color="error" hide-details></v-switch>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    round: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDelete: false
    };
  },
  methods: {
    ...mapActions("rounds", ["deleteRound"]),
    onSubmit() {
      if (this.isDelete) {
        this.deleteRound(this.round._id);
      }
    }
  },
  errorCaptured(err, vm, info) {
    console.warn(err, vm, info);
    return false;
  }
};
</script>
