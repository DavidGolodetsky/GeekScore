<template>
  <BaseDialog
    header="Clock Tools"
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
            >mdi-timer</v-icon>
            <span class="label_text">Clock Tools</span>
          </v-card-title>
        </div>
      </v-card>
    </template>
    <v-tabs v-model="currentTab">
      <v-tabs-slider color="secondary" />
      <v-tab
        v-for="(tab, i) in tabs"
        :key="i"
        :href="`#tab-${i}`"
      >
        <span class="mt-2">{{ tab }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="currentTab"
      class="pt-4 px-4"
    >
      <v-tab-item
        v-for="(tabItem, i) in tabs"
        :key="i"
        :value="`tab-${i}`"
      >
        <tools-clock-fields
          :hours.sync="hours"
          :minutes.sync="minutes"
          :seconds.sync="seconds"
          :disabled="i === 0"
        />
      </v-tab-item>
    </v-tabs-items>
    <template #footer>
      <v-btn
        color="secondary darken-1"
        outlined
        class="mr-2"
        @click="playPauseTimer"
      >
        <v-icon dark>
          {{ pause ? "mdi-play" : "mdi-pause" }}
        </v-icon>
        {{ pause ? "Play" : "Pause" }}
      </v-btn>
      <!-- TODO:Stop rename to Reset. Add Stop btn -->
      <v-btn
        color="secondary darken-1"
        outlined
        @click="stopTimer"
      >
        <v-icon dark> mdi-stop </v-icon>
        Stop
      </v-btn>
    </template>
  </BaseDialog>
</template>

<script>
import ToolsClockFields from "@/components/ToolsClockFields.vue";

export default {
  name: "ToolsTimerDialog",
  components: {
    ToolsClockFields,
  },
  data () {
    return {
      hours: "00",
      minutes: "00",
      seconds: "00",
      pause: true,
      playInterval: false,
      currentTab: null,
      tabs: ["Timer", "Countdown"],
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

      if (!this.pause) {
        this.playInterval = setInterval(() => {
          this.tab === "tab-timer" ? this.timerMethod() : this.countdownMethod();
        }, 1000);
      }
      clearInterval(this.playInterval);
    },
    // TODO:use from use/common
    vibrate (time = 300) {
      if (window.innerWidth < 600) {
        window.navigator.vibrate(time);
      }
    },
    stopTimer () {
      this.hours = "00";
      this.minutes = "00";
      this.seconds = "00";
      this.pause = true;
      clearInterval(this.playInterval);
    },
    timerMethod () {
      this.seconds++;
      if (this.seconds > 59) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes > 59) {
          this.minutes = 0;
          this.hours++;
          if (this.hours < 10) {
            this.hours = "0" + this.hours;
          }
        }

        if (this.minutes < 10) {
          this.minutes = "0" + this.minutes;
        }
      }
      if (this.seconds < 10) {
        this.seconds = "0" + this.seconds;
      }
    },
    countdownMethod () {
      this.seconds--;
      if (
        this.hours === "00" &&
        this.minutes === "00" &&
        this.seconds <= "00"
      ) {
        this.stopTimer();
        this.vibrate()
      } else {
        if (this.seconds < 0) {
          this.seconds = "59";
          this.minutes >= 1 ? this.minutes-- : (this.minutes = "00");
          if (this.minutes <= 0 && this.hours > "00") {
            this.minutes = "59";
            this.hours >= 1 ? this.hours-- : (this.hours = "00");
          }
        }
        if (this.seconds < 10) {
          this.seconds = "0" + this.seconds;
        }

        if (this.minutes < 10 && this.minutes.toString().length <= 1) {
          this.minutes = "0" + this.minutes;
        }

        if (this.hours < 10 && this.hours.toString().length <= 1) {
          this.hours = "0" + this.hours;
        }
      }
    },
  },
};
</script>
