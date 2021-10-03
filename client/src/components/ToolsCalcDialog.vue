<template>
  <BaseDialog header="Score Calculator" simple>
    <template #activator>
      <!-- TODO:decouple to a separete component -->
      <v-card dark raised class="mx-auto card-pointer">
        <div class="title-wrap">
          <v-card-title class="d-flex">
            <v-icon class="mr-2" dark>mdi-calculator-variant-outline</v-icon>
            <span class="label_text">Score Calculator</span>
          </v-card-title>
        </div>
      </v-card>
    </template>
    <v-tabs v-model="currentTab">
      <v-tabs-slider color="secondary" />
      <v-tab v-for="(tabItem, i) in tabs" :key="i" :href="`#tab-${i}`">
        <span class="mt-2">{{ tabItem.name }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab" class="pt-4 px-4">
      <v-tab-item v-for="(tabItem, i) in tabs" :key="i" :value="`tab-${i}`">
        <component :is="tabItem.component" />
      </v-tab-item>
    </v-tabs-items>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import ToolsCalc from '@/components/ToolsCalc.vue'
import { ToolsDialogTab } from '@/types'

export default defineComponent({
  name: 'ToolsDialog',
  components: {
    ToolsCalc
  },
  setup() {
    const currentTab = ref(null)
    const tabs: ToolsDialogTab[] = [
      {
        name: 'Select Calculator',
        component: ''
      },
      {
        name: 'Create New',
        component: 'tools-calc'
      }
    ]
    return {
      currentTab,
      tabs
    }
  }
})
</script>
