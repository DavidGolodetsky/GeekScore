<template>
  <the-dialog
    activator-icon="pencil"
    color="#fff"
    header="Edit game info"
    simple
    :submit-logic="onSubmit"
  >
    <v-card v-if="item">
      <dice-roller-card v-if="item.name === 'Dice Roller'" />
    </v-card>
    <!-- TODO: for later -->
    <!-- <scores-table /> -->
  </the-dialog>
</template>

<script>
import DiceRollerCard from "@/components/Cards/DiceRollerCard";
export default {
  name: "ToolsDialog",
  components: {
    DiceRollerCard,
  },
  data() {
    return {
      open: false,
      item: null,
    };
  },
  watch: {
    open(open) {
      if (!open) {
        // cleanup
        this.item = null;
      }
    },
  },
  methods: {
    show(item) {
      this.open = true;
      this.item = item;
    },
    onSubmit(){
      console.log("test");
    }
  },
};
</script>
