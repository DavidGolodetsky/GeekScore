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
        <tools-dice-dialog />
      </v-col>
      <v-col
        sm="6"
        md="4"
        cols="12"
      >
        <tools-timer-dialog />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import ToolsDiceDialog from "@/components/ToolsDiceDialog";
import ToolsTimerDialog from "@/components/ToolsTimerDialog";

export default {
  name: "ToolsPage",
  components: {
    TheTitle,
    ToolsDiceDialog,
    ToolsTimerDialog,
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
