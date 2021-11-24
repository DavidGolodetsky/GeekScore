<template>
  <BaseDialog header="Dice Roller" simple>
    <template #activator>
      <v-card dark raised class="mx-auto card-pointer">
        <div class="title-wrap">
          <v-card-title class="d-flex">
            <v-icon class="mr-2" dark>mdi-dice-d20-outline</v-icon>
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
      <v-icon large color="grey darken-1" @click="field.func('minus')">
        mdi-minus
      </v-icon>

      <v-text-field
        :value="field.model"
        :label="field.label"
        class="mx-2"
        readonly
      />
      <v-icon large color="grey darken-1" @click="field.func('plus')">
        mdi-plus
      </v-icon>
    </v-card-text>

    <div
      :class="show ? 'boxRotate box-transition' : 'box-transition'"
      class="dice"
    >
      <span>
        {{ totalValue ? totalValue : 0 }}
      </span>
    </div>

    <template #footer>
      <v-btn color="secondary darken-1" outlined @click="rollDice">
        <v-icon class="mr-1" dark> mdi-dice-6-outline </v-icon>Roll
      </v-btn>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'ToolsDiceDialog',

  setup() {
    const show = ref(true);
    const totalValue = ref(0);
    const fields = ref({
      diceSide: {
        label: 'Dice Sides',
        model: 3,
        func: (type: string) => {
          if (type === 'plus' && fields.value.diceSide.model < 20) {
            fields.value.diceSide.model++;
          } else if (type === 'minus' && fields.value.diceSide.model > 3) {
            fields.value.diceSide.model--;
          }
        }
      },
      rollNumber: {
        label: 'Number of dices',
        model: 1,
        func: (type: string) => {
          if (type === 'plus' && fields.value.rollNumber.model < 10) {
            fields.value.rollNumber.model++;
          } else if (type === 'minus' && fields.value.rollNumber.model > 1) {
            fields.value.rollNumber.model--;
          }
        }
      }
    });

    const rollDice = () => {
      show.value = !show.value;
      totalValue.value =
        fields.value.rollNumber.model +
        Math.floor(
          Math.random() *
            (fields.value.diceSide.model * fields.value.rollNumber.model -
              fields.value.rollNumber.model +
              1)
        );
    };

    return {
      show,
      totalValue,
      fields,
      rollDice
    };
  }
});
</script>

<style scoped lang="scss">
.v-text-field {
  max-width: 100px;
}

.dice {
  height: 60px;
  width: 60px;
  border-radius: 5px;
  background-color: #2f4858;
  color: $secondary;
  font-size: 30px;
  text-align: center;
  line-height: 2;
  margin: auto;
  border: 3px solid #07add9;
}

.boxRotate {
  transform: rotate(360deg);
}

.box-transition {
  transition: all 0.5s ease-in-out;
}
</style>
