<template>
  <section>
    <the-title
      title="Tools"
      icon="hammer-screwdriver"
    />
    <v-row>
      <v-col
        v-for="(tool, i) in tools"
        :key="i"
        sm="6"
        md="4"
        cols="12"
      >
        <component :is="tool" />
      </v-col>
    </v-row>
  </section>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import ToolsDiceDialog from "@/components/ToolsDiceDialog";
import ToolsTimerDialog from "@/components/ToolsTimerDialog";
import ToolsCalcDialog from "@/components/ToolsCalcDialog";

export default {
  name: "ToolsPage",
  components: {
    TheTitle,
    ToolsDiceDialog,
    ToolsTimerDialog,
    ToolsCalcDialog,
  },
  data () {
    return {
      tools: ['tools-dice-dialog', 'tools-timer-dialog', 'tools-calc-dialog'],
    };
  }
};
</script>
