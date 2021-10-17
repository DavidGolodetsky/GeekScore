<template>
  <section class="team-details">
    <the-title
      title="Rounds"
      icon="sword-cross"
      class="mb-4"
      :props="{ teamId, gameId }"
      component="rounds-add-dialog"
    />
    <div v-if="showTable">
      <v-tabs
        v-model="currentTab"
        background-color="primary"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider color="secondary" />
        <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#tab-${i}`">
          <span class="mt-2">{{ tab.name }}</span>
          <v-icon>{{ `mdi-${tab.icon}` }}</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item v-for="(tabItem, i) in tabs" :key="i" :value="`tab-${i}`">
          <component :is="tabItem.component" v-bind="{ team, rounds }" />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watch,
  onUnmounted,
  ComputedRef,
  toRefs
} from '@vue/composition-api'
import TheTitle from '@/components/TheTitle.vue'
import RoundsTable from '@/components/RoundsTable.vue'
import TheBarsChart from '@/components/TheBarsChart.vue'
import TheTendenciesChart from '@/components/TheTendenciesChart.vue'
import roundsModule from '@/store/modules/rounds'
import { Game, Round, Team } from '@/types'
import { Store } from 'vuex'

// TODO:refactor
export default defineComponent({
  name: 'Team',
  components: {
    TheBarsChart,
    RoundsTable,
    TheTitle,
    TheTendenciesChart
  },
  props: {
    teamId: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const { teamId }: any = toRefs(props)

    const store = ctx.root.$store
    const route = ctx.root.$route

    loadRoundsData(store)

    const currentTab = 'tab-0'
    const gameId = route.query.gameId

    const games: ComputedRef<Game[]> = computed(() => store.state.games)
    const getGame: ComputedRef<Game> = computed(() =>
      store.getters['games/getGame'](gameId)
    )
    const game: ComputedRef<Game | null> = computed(() =>
      games ? getGame.value : null
    )

    const teams: ComputedRef<Team[]> = computed(() => store.state.teams)
    const getTeams: ComputedRef<Team> = computed(() =>
      store.getters['teams/getTeam'](teamId.value)
    )
    const team: ComputedRef<Team | null> = computed(() =>
      teams ? getTeams.value : null
    )

    const gameTeam = computed(() => game && team)

    const rounds: ComputedRef<Round[]> = computed(() => {
      const query = { teamId: teamId.value, gameId: gameId }
      const rounds: Round[] = store.getters['rounds/getRounds'](query)
      if (rounds) {
        rounds.forEach((round: any) => (round[round.winner] = 'VICTORY'))
      }

      return rounds
    })

    const tabs = computed(() => {
      const tabsToShow = [
        {
          name: 'Table',
          icon: 'table-large',
          component: 'rounds-table'
        },
        {
          name: 'Statistics',
          icon: 'chart-bar',
          component: 'the-bars-chart'
        }
      ];
      const roundsMonths = rounds.value
        .map((round: any) => round.date && new Date(round.date).getMonth())
        .filter((hasValue: any) => hasValue);
      const hasRoundsInDifferentMonths = new Set(roundsMonths).size > 1;

      if (hasRoundsInDifferentMonths) {
        tabsToShow.push({
          name: 'Tendencies',
          icon: 'chart-line',
          component: 'the-tendencies-chart'
        });
      }

      return tabsToShow;
    });

    const showTable = computed(() => gameTeam && rounds.value?.length)

    onUnmounted(() => store.dispatch('setBackTitle'))

    watch(
      teams,
      val => {
        if (val && !!game.value && !!team.value) {
          store.dispatch(
            'setBackTitle',
            `${team.value.name}: ${game.value.name}`
          )
        }
      },
      {
        immediate: true,
        deep: true
      }
    )

    return {
      currentTab,
      gameId,
      tabs,
      game,
      team,
      gameTeam,
      rounds,
      showTable
    }
  }
})

const loadRoundsData = (store: Store<any>) => {
  const isRounds = store.hasModule('rounds')
  isRounds || store.registerModule('rounds', roundsModule)
  store.dispatch('rounds/loadRounds')
}
</script>
