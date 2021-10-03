<template>
  <v-row class="mx-auto">
    <v-col class="col">
      <!-- TODO:loop over inputs -->

      <v-text-field
        :value="padValue(hours)"
        maxlength="2"
        dense
        label="Hours"
        outlined
        :disabled="disabled"
        @change="$emit('update:hours', $event)"
      />
    </v-col>
    <v-col class="col">
      <v-text-field
        :value="padValue(minutes)"
        maxlength="2"
        dense
        label="Minutes"
        outlined
        :disabled="disabled"
        @change="$emit('update:minutes', $event)"
      />
    </v-col>
    <v-col class="col">
      <v-text-field
        :value="padValue(seconds)"
        maxlength="2"
        dense
        label="Seconds"
        outlined
        :disabled="disabled"
        @change="$emit('update:seconds', $event)"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ToolsClockFields',
  props: {
    hours: {
      type: [String, Number],
      required: true
    },
    minutes: {
      type: [String, Number],
      required: true
    },
    seconds: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean
    }
  },
  setup() {
    const padValue = (value: number | string) => {
      return value < 10 ? `0${value}` : value
    }
    return {
      padValue
    }
  }
})
</script>
