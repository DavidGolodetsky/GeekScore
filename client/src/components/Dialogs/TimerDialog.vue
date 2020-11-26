<template>
  <the-dialog
    activator-icon="timer"
    color="#fff"
    :header="tab === 'tab-0' ? 'Timer' : 'Countdown'"
    simple
    :footer="false"
    :close-on-submit="false"
  >
    <v-tabs v-model="tab" background-color="#d9d9d8">
      <v-tabs-slider color="secondary" />
      <v-tab
        v-for="(tabItem, i) in tabs"
        :key="tabItem.name"
        :href="`#tab-${i}`"
      >
        <span class="mt-2">{{ tabItem.name }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-0" />
      <v-tab-item value="tab-1" />
      <span class="d-flex justify-center">
        <v-text-field
          v-model="time"
          label="Time"
          style="max-width: 150px;"
          outlined
          :disabled="tab === 'tab-0' ? true : false"
        />
      </span>
      <span class="d-flex row_between">
        <v-btn
          style="max-width: 150px;"
          class="submit-btn"
          ripple
          @click="playPauseTimer"
          >Play/Pause</v-btn
        >
        <v-btn
          style="max-width: 150px;"
          class="submit-btn"
          ripple
          @click="stopTimer"
          >Stop</v-btn
        >
      </span>
    </v-tabs-items>
  </the-dialog>
</template>

<script>
export default {
  name: "TimerDialog",
  props: {
    tool: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      time: 0,
      tab: null,
      pause: true,
      playInterval: false,
      tabs: [
        {
          name: "Timer",
          href: "tab-0",
        },
        {
          name: "Countdown",
          href: "tab-1",
        },
      ],
    };
  },
  watch: {
    tab() {
      this.stopTimer();
    },
  },
  methods: {
    playPauseTimer() {
      this.pause = !this.pause;

      if (!this.pause) {
        this.playInterval = setInterval(() => {
          if (this.tab === "tab-0") {
            this.time++;
          } else {
            this.time > 0 ? this.time-- : this.stopTimer();
          }
        }, 1000);
      } else {
        clearInterval(this.playInterval);
      }
    },
    stopTimer() {
      this.time = 0;
      this.pause = true;
      clearInterval(this.playInterval);
      window.navigator.vibrate(1000);
    },
  },
};
</script>

<style scoped lang="scss">
.v-tabs-items {
  padding: 20px;
}
</style>
