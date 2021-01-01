<template>
  <section>
    <TheTitle
      title="Games"
      icon="dice-multiple"
      component="games-add-dialog"
    />
    <TheCardsList
      v-if="games"
      :route="gameRoute"
      :items="games"
      @favorite="toggleFavoriteGame"
    >
      <template #action="{ item }">
        <GamesEditDialog :game="item" />
      </template>
    </TheCardsList>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import TheTitle from '@/components/TheTitle'
import GamesEditDialog from '@/components/GamesEditDialog'
import TheCardsList from '@/components/TheCardsList'

export default defineComponent({
  name: 'GamesPage',
  components: {
    TheTitle,
    GamesEditDialog,
    TheCardsList
  },
  setup(_, ctx) {
    const store = ctx.root.$store

    const games = computed(() => store.state.games.games)

    const isLoadGames = () => games?.value ?? loadGames()

    const loadGames = () => store.dispatch('games/loadGames')

    isLoadGames()

    // TODO: add types
    const updateGame = (game: any) => store.dispatch('games/updateGame', game)

    const gameRoute = {
      name: 'game',
      params: { gameId: '' }
    }

    const toggleFavoriteGame = (game: any) => updateGame(game)

    return {
      gameRoute,
      games,
      toggleFavoriteGame
    }
  }
})
</script>
