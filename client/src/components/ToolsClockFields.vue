<template>
  <v-row class="mx-auto">
    <v-col class="col">
      <!-- TODO:loop over inputs -->
      <v-text-field
        :value="hours"
        maxlength="2"
        dense
        label="Hours"
        outlined
        :disabled="disabledField"
        @input="$emit('update:hours', $event)"
      />
    </v-col>
    <v-col class="col">
      <v-text-field
        :value="minutes"
        maxlength="2"
        dense
        label="Minutes"
        outlined
        :disabled="disabledField"
        @input="$emit('update:minutes', $event)"
      />
    </v-col>
    <v-col class="col">
      <v-text-field
        :value="seconds"
        maxlength="2"
        dense
        label="Seconds"
        outlined
        :disabled="disabledField"
        @input="$emit('update:seconds', $event)"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ToolsClockFields",
  props: {
    hours: {
      type: [String, Number],
      required: true,
    },
    minutes: {
      type: [String, Number],
      required: true,
    },
    seconds: {
      type: [String, Number],
      required: true,
    },
    disabledField: {
      type: Boolean,
    },
  },
};
</script>
