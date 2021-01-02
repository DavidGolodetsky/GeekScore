<template>
  <section class="game-page">
    <TheTitle
      title="Teams"
      icon="account-group"
      :props="{ gameId }"
      component="teams-add-dialog"
    />
    <div
      v-if="winRate"
      class="win-rate"
    >
      <v-icon
        dark
        color="primary"
        class="mr-3"
      >mdi-brightness-percent</v-icon>
      <span>Your win rate is: {{ winRate }}</span>
    </div>
    <TheCardsList
      v-if="gameTeams"
      :card-items="gameTeams"
      :card-route="teamRoute"
      @favorite="toggleFavoriteTeam"
    >
      <template #action="{ item }">
        <TeamsEditDialog :team="item" />
      </template>
    </TheCardsList>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watchEffect,
  onBeforeUnmount
} from '@vue/composition-api'
import TheTitle from '@/components/TheTitle'
import TheCardsList from '@/components/TheCardsList'
// TODO:load aync
import TeamsEditDialog from '@/components/TeamsEditDialog'

export default defineComponent({
  name: 'GamePage',
  components: {
    TheTitle,
    TeamsEditDialog,
    TheCardsList
  },
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  setup(props, ctx) {
    const store = ctx.root.$store

    const allTeams = computed(() => store.state.teams.teams)

    const allGames = computed(() => store.state.games.games)

    const loadGames = () => store.dispatch('games/loadGames')

    const loadWinRate = () => store.dispatch('games/loadWinRate', props.gameId)

    const loadTeams = () => store.dispatch('teams/loadTeams')

    const loadData = () => {
      allTeams?.value ?? loadGames()
      allGames?.value ?? loadTeams()
      loadWinRate()
    }

    loadData()

    const winRate = computed(() => store.state.games.winRate)

    const getGameTeams = () => store.getters['teams/getGameTeams'](props.gameId)

    const gameTeams = computed(() => (allTeams?.value ? getGameTeams() : null))

    const getGame = () => store.getters['games/getGame'](props.gameId)

    const teamRoute = computed(() => ({
      name: 'team',
      params: { teamId: '' },
      query: { gameId: props.gameId }
    }))

    const updateTeam = (team: any) => store.dispatch('teams/updateTeam', team)

    const toggleFavoriteTeam = (teamInfo: any) => {
      const team = {
        ...teamInfo,
        gameId: props.gameId
      }
      updateTeam(team)
    }

    const setBackTitle = (backTitle?: string) =>
      store.dispatch('setBackTitle', backTitle)

    onBeforeUnmount(() => setBackTitle())

    watchEffect(() => {
      if (allGames.value) {
        const { gameName } = getGame()
        setBackTitle(gameName)
      }
    })

    return {
      winRate,
      gameTeams,
      teamRoute,
      toggleFavoriteTeam
    }
  }
})
</script>

<style lang="scss">
.game-page {
  .win-rate {
    background-color: $secondary;
    padding: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    margin-bottom: $space-2;
    color: $primary;
  }
}
</style>