<template>
  <div class="scores-table">
    <div class="activator" v-if="!isActive">
      <v-btn
        small
        fab
        id="scores-table"
        aria-label="Open modal"
        text
        color="#607d8b"
        @click="isActive = true"
      >
        <v-icon dark>mdi-plus-minus-variant</v-icon>
      </v-btn>
      <label for="scores-table" class="label_text">Scores Calculator</label>
    </div>
    <div v-else class="calculator">
      <v-row>
        <v-col cols="2">
          <v-select v-model="selectedOperator" :items="operators" />
        </v-col>
        <v-col>
          <v-text-field placeholder="Parameter" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      selectedOperator: "+",
      operators: ["+", "-"]
    };
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
    border-radius: $border-radius;
  }
}
</style>