<template>
  <section>
    <the-title title="Tools" icon="hammer-screwdriver" />

      <tools-card :items="tools" />
  </section>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import ToolsCard from "@/components/Cards/ToolsCards";

export default {
  name: "Tools",
  components: {
    TheTitle,
    ToolsCard,
  },
  data() {
    return {
      tools: [
        {
          _id: 0,
          name: "Dice Roller",
          img: "game",
          icon: "mdi-dice-d20"
        }
      ],
    };
  },
};
</script>
