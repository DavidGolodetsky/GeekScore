<template>
  <section>
    <the-title
      title="Tools"
      icon="hammer-screwdriver"
    />
    <v-row>
      <!-- TODO:loop over tools -->
      <v-col
        sm="6"
        md="4"
        cols="12"
      >
        <dice-roller-dialog />
      </v-col>
      <v-col
        sm="6"
        md="4"
        cols="12"
      >
        <timer-dialog />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import DiceRollerDialog from "@/components/DiceRollerDialog";
import TimerDialog from "@/components/TimerDialog";

export default {
  name: "ToolsPage",
  components: {
    TheTitle,
    DiceRollerDialog,
    TimerDialog,
  },
  data () {
    return {
      tools: [
        {
          id: "dice",
          name: "Dice Roller",
        },
        {
          id: "clock",
          name: "Clock Tools",
        },
      ],
    };
  }
};
</script>
