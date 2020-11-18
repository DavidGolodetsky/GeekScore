<template>
  <v-container class="pb-0">
    <v-row>
      <v-card-text class="row_between">
        <v-icon large color="grey darken-1" @click="changeSide('minus')">
          mdi-minus
        </v-icon>

        <v-text-field
          v-model.number="diceSides"
          label="Dice Sides"
          :disabled="true"
        />
        <v-icon large color="grey darken-1" @click="changeSide('plus')">
          mdi-plus
        </v-icon>
      </v-card-text>
    </v-row>
    <v-row>
      <v-card-text class="row_between">
        <v-icon large color="grey darken-1" @click="changeRoll('minus')">
          mdi-minus
        </v-icon>

        <v-text-field
          v-model.number="rollNumbers"
          label="Roll Numbers"
          :disabled="true"
        />
        <v-icon large color="grey darken-1" @click="changeRoll('plus')">
          mdi-plus
        </v-icon>
      </v-card-text>
    </v-row>
    <v-card-actions>
      <v-btn class="submit-btn" ripple type="submit" @click="rollDice"
        >Roll</v-btn
      >
    </v-card-actions>
    <v-card-text class="pt-5">
      <v-text-field v-model="totalValue" label="Result" disabled />
    </v-card-text>
  </v-container>
</template>

<script>
export default {
  name: "DiceRollerCard",
  data() {
    return {
      diceSides: 3,
      rollNumbers: 1,
      totalValue: "",
    };
  },
  methods: {
    changeSide(operator) {
      if (operator === "plus") {
        if (this.diceSides < 20) {
          this.diceSides++;
        }
      } else if (operator === "minus") {
        if (this.diceSides > 3) {
          this.diceSides--;
        }
      }
    },
    changeRoll(operator) {
      if (operator === "plus") {
        if (this.rollNumbers < 10) {
          this.rollNumbers++;
        }
      } else if (operator === "minus") {
        if (this.rollNumbers > 1) {
          this.rollNumbers--;
        }
      }
    },
    rollDice() {
      this.totalValue =
        this.rollNumbers +
        Math.floor(
          Math.random() *
            (this.diceSides * this.rollNumbers - this.rollNumbers + 1)
        );
    },
  },
};
</script>
