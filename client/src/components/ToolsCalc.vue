<template>
  <div class="tools-scores-table">
    <div class="row_between mb-2">
      <span>Table fields</span>
      <v-btn small fab text @click="addField">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </div>
    <v-text-field
      v-for="(field, i) in fields"
      :key="i"
      hide-details
      dense
      rounded
      filled
      class="scores-input"
      placeholder="Parameter"
    >
      <template #prepend-inner>
        <v-select v-model="selectedOperator" dense :items="operators" />
      </template>
    </v-text-field>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'ToolsCalc',
  setup() {
    const selectedOperator = ref('+');
    const operators = ref(['+', '-']);
    const fields = ref(1);

    const addField = () => fields.value++;

    return {
      addField,
      selectedOperator,
      operators,
      fields
    };
  }
});
</script>

<style lang="scss" scoped>
.tools-scores-table {
  border: 1px solid $label;
  padding: 10px;
  border-radius: $border-radius;

  .scores-input {
    margin-bottom: 10px;
    ::v-deep .v-input__prepend-inner {
      width: 15%;
      margin-right: 10px;
    }
  }
}
</style>
