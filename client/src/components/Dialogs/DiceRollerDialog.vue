<template>
  <the-dialog
    color="#fff"
    header="Dice Roller"
    simple
  >
    <template #activator>
      <v-card
        dark
        raised
        class="mx-auto card-pointer"
      >
        <div class="title-wrap">
          <v-card-title class="d-flex">
            <v-icon
              class="mr-2"
              dark
            >mdi-dice-d20</v-icon>
            <span class="label_text">Dice Roller</span>
          </v-card-title>
        </div>
      </v-card>
    </template>
    <v-card-text
      v-for="(field, index) in fields"
      :key="index"
      class="d-flex justify-center"
    >
      <v-icon
        large
        color="grey darken-1"
        @click="field.func('minus')"
      >
        mdi-minus
      </v-icon>

      <v-text-field
        :value="field.model"
        :label="field.label"
        class="mx-2"
        readonly
      />
      <v-icon
        large
        color="grey darken-1"
        @click="field.func('plus')"
      >
        mdi-plus
      </v-icon>
    </v-card-text>
    <div class="pt-5">
      <h4>Result: {{ totalValue }} </h4>
      <v-divider />
    </div>

    <template #footer>
      <v-btn
        color="secondary darken-1"
        outlined
        @click="rollDice"
      >Roll</v-btn>
    </template>
  </the-dialog>
</template>

<script>
export default {
  name: "DiceRollerDialog",
  data () {
    return {
      totalValue: "",
      fields: {
        diceSide: {
          func: this.changeSide,
          label: "Dice Sides",
          model: 3,
        },
        rollNumber: {
          func: this.changeRoll,
          label: "Roll Numbers",
          model: 1,
        },
      },
    };
  },
  methods: {
    changeSide (operator) {
      if (operator === "plus") {
        if (this.fields.diceSide.model < 20) {
          this.fields.diceSide.model++;
        }
      } else {
        if (this.fields.diceSide.model > 3) {
          this.fields.diceSide.model--;
        }
      }
    },
    changeRoll (operator) {
      if (operator === "plus") {
        if (this.fields.rollNumber.model < 10) {
          this.fields.rollNumber.model++;
        }
      } else {
        if (this.fields.rollNumber.model > 1) {
          this.fields.rollNumber.model--;
        }
      }
    },
    rollDice () {
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

<style scoped lang="scss">
.v-text-field {
  max-width: 100px;
}
</style>