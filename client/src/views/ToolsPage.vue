<template>
  <section>
    <the-title title="Tools" icon="hammer-screwdriver" />
    <tools-card :items="tools">
      <template #action="{ item }">
        <dice-roller-dialog :tool="item" />
      </template>
    </tools-card>
  </section>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import ToolsCard from "@/components/Cards/ToolsCards";
import DiceRollerDialog from "@/components/Dialogs/DiceRollerDialog";

export default {
  name: "ToolsPage",
  components: {
    TheTitle,
    ToolsCard,
    DiceRollerDialog,
  },
  data() {
    return {
      tools: [
        {
          _id: 0,
          name: "Dice Roller"
        },
      ],
    };
  },
};
</script>
