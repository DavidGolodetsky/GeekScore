<template>
  <the-dialog
    activator="pencil"
    color="#607d8b"
    header="Edit round info"
    simple
    :submitLogic="onSubmit"
  >
    <v-switch
      v-model="isDelete"
      label="Delete round"
      color="error"
      hide-details
    ></v-switch>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    item: {
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
    ...mapActions("teams", ["deleteRound"]),
    onSubmit() {
      const round = {
        gameId: this.item.gameId,
        teamId: this.item.teamId,
        roundId: this.item.id
      };
      if (this.isDelete) {
        this.deleteRound(round);
      }
    }
  }
};
</script>
