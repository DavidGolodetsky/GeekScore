<template>
  <the-dialog
    activator-icon="timer"
    color="#fff"
    :header="tab === 'tab-timer' ? 'Timer' : 'Countdown'"
    simple
    :footer="false"
    :close-on-submit="false"
  >
    <v-tabs
      v-model="tab"
      background-color="#d9d9d8"
    >
      <v-tabs-slider color="secondary" />
      <v-tab
        v-for="tabItem in tabs"
        :key="tabItem.name"
        :href="`#${tabItem.href}`"
      >
        <span class="mt-2">{{ tabItem.name }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-timer">
        <!-- TODO:decouple -->
        <v-text-field
          v-model="time"
          label="Time"
          outlined
          disabled
        />
        <div class="d-flex justify-space-around">
          <v-btn
            color="secondary darken-1"
            outlined
            @click="playPauseTimer"
          >{{
          pause ? "Play" : "Pause"
        }}</v-btn>
          <v-btn
            color="secondary darken-1"
            outlined
            @click="stopTimer"
          >Stop</v-btn>
        </div>
      </v-tab-item>
      <v-tab-item value="tab-countdown">
        <v-text-field
          v-model="time"
          label="Time"
          outlined
        />
        <div class="d-flex justify-space-around">
          <v-btn
            color="secondary darken-1"
            outlined
            @click="playPauseTimer"
          >{{
          pause ? "Play" : "Pause"
        }}</v-btn>
          <v-btn
            color="secondary darken-1"
            outlined
            @click="stopTimer"
          >Stop</v-btn>
        </div>
      </v-tab-item>
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
  data () {
    return {
      time: 0,
      tab: null,
      pause: true,
      playInterval: false,
      tabs: [
        {
          name: "Timer",
          href: "tab-timer",
        },
        {
          name: "Countdown",
          href: "tab-countdown",
        },
      ],
    };
  },
  watch: {
    tab () {
      this.stopTimer();
    },
  },
  destroyed () {
    this.stopTimer();
  },
  methods: {
    playPauseTimer () {
      this.pause = !this.pause;

      if (this.pause) {
        clearInterval(this.playInterval);
      } else {
        this.playInterval = setInterval(() => {
          if (this.tab === "tab-timer") {
            this.time++;
          } else {
            this.time > 0 ? this.time-- : this.stopTimer();
          }
        }, 1000);
      }
    },
    stopTimer () {
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
.v-text-field {
  max-width: 150px;
}
</style>
