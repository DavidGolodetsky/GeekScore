<template>
  <BaseDialog header="Clock Tools" simple>
    <template #activator>
      <v-card dark raised class="mx-auto card-pointer">
        <div class="title-wrap">
          <v-card-title class="d-flex">
            <v-icon class="mr-2" dark>mdi-timer</v-icon>
            <span class="label_text">Clock Tools</span>
          </v-card-title>
        </div>
      </v-card>
    </template>
    <v-tabs v-model="currentTab">
      <v-tabs-slider color="secondary" />
      <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#tab-${i}`">
        <span class="mt-2">{{ tab }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab" class="pt-4 px-4">
      <v-tab-item v-for="(tabItem, i) in tabs" :key="i" :value="`tab-${i}`">
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
          {{ pause ? 'mdi-play' : 'mdi-pause' }}
        </v-icon>
        {{ pause ? 'Play' : 'Pause' }}
      </v-btn>
      <!-- TODO:Stop rename to Reset. Add Stop btn -->
      <v-btn color="secondary darken-1" outlined @click="stopTimer">
        <v-icon dark> mdi-stop </v-icon>
        Stop
      </v-btn>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watch,
  onUnmounted
} from '@vue/composition-api'
import ToolsClockFields from './ToolsClockFields.vue'
import { vibrate } from '../use/common'

export default defineComponent({
  name: 'ToolsTimerDialog',
  components: {
    ToolsClockFields
  },
  setup() {
    const tabs = reactive(['Timer', 'Countdown'])
    const currentTab = ref('tab-0')
    const hours = ref(0)
    const minutes = ref(0)
    const seconds = ref(0)
    const pause = ref(true)
    let playInterval: any = null

    const timerMethod = () => {
      seconds.value++
      if (seconds.value > 59) {
        seconds.value = 0
        minutes.value++
        if (minutes.value > 59) {
          minutes.value = 0
          hours.value++
        }
      }
    }

    const countdownMethod = () => {
      seconds.value--
      if (hours.value === 0 && minutes.value === 0 && seconds.value <= 0) {
        stopTimer()
        vibrate()
      } else {
        if (seconds.value < 0) {
          seconds.value = 59
          minutes.value >= 1 ? minutes.value-- : (minutes.value = 0)
          if (minutes.value <= 0 && hours.value > 0) {
            minutes.value = 59
            hours.value >= 1 ? hours.value-- : (hours.value = 0)
          }
        }
      }
    }

    const playPauseTimer = () => {
      pause.value = !pause.value

      if (!pause.value) {
        playInterval = setInterval(() => {
          currentTab.value === 'tab-0' ? timerMethod() : countdownMethod()
        }, 1000)
      } else {
        clearInterval(playInterval)
      }
    }

    const stopTimer = () => {
      pause.value = true
      hours.value = 0
      minutes.value = 0
      seconds.value = 0
      clearInterval(playInterval)
    }

    watch(
      () => tabs,
      () => {
        stopTimer()
      }
    )

    onUnmounted(() => {
      stopTimer()
    })

    return {
      hours,
      minutes,
      seconds,
      pause,
      stopTimer,
      tabs,
      currentTab,
      playPauseTimer
    }
  }
})
</script>
