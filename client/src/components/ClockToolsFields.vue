<template>
  <v-container>
    <v-row class="mx-auto">
      <v-col class="col">
        <v-text-field
          :value="hours"
          @input="$emit('update:hours', $event)"
          maxlength="2"
          dense
          label="Hours"
          outlined
          :disabled="disabledField"
        />
      </v-col>
      <v-col class="col">
        <v-text-field
          :value="minutes"
          @input="$emit('update:minutes', $event)"
          maxlength="2"
          dense
          label="Minutes"
          outlined
          :disabled="disabledField"
        />
      </v-col>
      <v-col class="col">
        <v-text-field
          :value="seconds"
          @input="$emit('update:seconds', $event)"
          maxlength="2"
          dense
          label="Seconds"
          outlined
          :disabled="disabledField"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ClockToolsFields",
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
      required: true,
    },
  },
};
</script>
