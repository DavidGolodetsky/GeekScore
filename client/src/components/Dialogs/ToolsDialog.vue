<template>
  <v-dialog v-model="open" max-width="300">
    <v-card v-if="item">
      <v-card-title class="justify-center">
        {{ item.name }}
      </v-card-title>
      <dice-roller-card v-if="item.name === 'Dice Roller'" />
    </v-card>
  </v-dialog>
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
