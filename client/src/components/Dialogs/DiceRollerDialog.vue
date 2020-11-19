<template>
  <the-dialog
    activator-icon="dice-d20"
    color="#fff"
    header="Dice Roller"
    simple
    :submit-logic="rollDice"
    :footer="false"
    :close-on-submit="false"
  >
    <v-card-text
      v-for="(field, index) in fields"
      :key="index"
      class="row_between"
    >
      <v-icon large color="grey darken-1" @click="field.function('minus')">
        mdi-minus
      </v-icon>

      <v-text-field
        v-model="field.model"
        :label="field.label"
        :disabled="true"
      />
      <v-icon large color="grey darken-1" @click="field.function('plus')">
        mdi-plus
      </v-icon>
    </v-card-text>

    <v-card-actions>
      <v-btn class="submit-btn" ripple type="submit" @click="rollDice"
        >Roll</v-btn
      >
    </v-card-actions>
    <v-card-text class="pt-5">
      <v-text-field v-model="totalValue" label="Result" disabled />
    </v-card-text>
  </the-dialog>
</template>

<script>
export default {
  name: "DiceRollerDialog",
  props: {
    tool: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      totalValue: "",
      fields: {
        diceSide: {
          function: this.changeSide,
          label: "Dice Sides",
          model: 3,
        },
        rollNumber: {
          function: this.changeRoll,
          label: "Roll Numbers",
          model: 1,
        },
      },
    };
  },
  methods: {
    changeSide(operator) {
      if (operator === "plus") {
        if (this.fields.diceSide.model < 20) {
          this.fields.diceSide.model++;
        }
      } else if (operator === "minus") {
        if (this.fields.diceSide.model > 3) {
          this.fields.diceSide.model--;
        }
      }
    },
    changeRoll(operator) {
      if (operator === "plus") {
        if (this.fields.rollNumber.model < 10) {
          this.fields.rollNumber.model++;
        }
      } else if (operator === "minus") {
        if (this.fields.rollNumber.model > 1) {
          this.fields.rollNumber.model--;
        }
      }
    },
    rollDice() {
      this.totalValue =
        this.fields.rollNumber.model +
        Math.floor(
          Math.random() *
            (this.fields.diceSide.model * this.fields.rollNumber.model -
              this.fields.rollNumber.model +
              1)
        );
    },
  },
};
</script>
