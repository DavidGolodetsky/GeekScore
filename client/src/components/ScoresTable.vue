<template>
  <div class="scores-table">
    <div v-if="!isActive" class="activator">
      <v-btn small id="scores-table" fab text color="#607d8b" @click="isActive = true">
        <v-icon dark>mdi-plus-minus-variant</v-icon>
      </v-btn>
      <label for="scores-table" class="label_text">Scores Calculator</label>
    </div>
    <div v-else class="calculator">
      <div class="row_between mb-2">
        <h3 class="label_text">Table fields</h3>
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
          <v-select dense v-model="selectedOperator" :items="operators" />
        </template>
      </v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      selectedOperator: "+",
      operators: ["+", "-"],
      fields: 1
    };
  },
  methods: {
    addField() {
      this.fields++;
    }
  }
};
</script>

<style lang="scss" scoped>
.scores-table {
  .activator {
    margin-left: -10px;
  }
  .calculator {
    border: 1px solid $label;
    padding: 10px;
    border-radius: $border-radius;
  }
  .scores-input {
    margin-bottom: 10px;
    ::v-deep .v-input__prepend-inner {
      width: 15%;
      margin-right: 10px;
    }
  }
}
</style>