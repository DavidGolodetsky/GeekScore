<template>
  <section>
    <the-title title="Tools" icon="hammer-screwdriver" />
    <tools-card :items="tools">
      <template #action="{ item }">
        <dice-roller-dialog v-if="item.id === 'dice'" :tool="item" />
        <timer-dialog v-if="item.id === 'clock'" :tool="item" />
      </template>
    </tools-card>
  </section>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import ToolsCard from "@/components/Cards/ToolsCard";
import DiceRollerDialog from "@/components/Dialogs/DiceRollerDialog";
import TimerDialog from "@/components/Dialogs/TimerDialog";

export default {
  name: "ToolsPage",
  components: {
    TheTitle,
    ToolsCard,
    DiceRollerDialog,
    TimerDialog,
  },
  data() {
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
