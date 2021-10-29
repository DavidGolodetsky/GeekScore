<template>
  <section>
    <TheTitle
      title="Games"
      icon="dice-multiple-outline"
      component="games-add-dialog"
    />
    <TheCardsList
      v-if="games"
      :card-route="gameRoute"
      :card-items="games"
      @favorite="toggleFavoriteGame"
    >
      <template #action="{ item }">
        <GamesEditDialog :game="item" />
      </template>
    </TheCardsList>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { Game } from '@/types';

export default defineComponent({
  name: 'Games',
  components: {
    TheTitle: () => import('@/components/TheTitle.vue'),
    TheCardsList: () => import('@/components/TheCardsList.vue'),
    // TODO:lazy load when edit is clicked
    GamesEditDialog: () => import('@/components/GamesEditDialog.vue')
  },
  setup(_, { root: { $store } }) {
    const games = computed(() => $store.state.games.games);

    const isLoadGames = () => games?.value ?? loadGames();

    const loadGames = () => $store.dispatch('games/loadGames');

    isLoadGames();

    const updateGame = (game: Game) =>
      $store.dispatch('games/updateGame', game);

    const gameRoute = {
      name: 'game',
      params: { gameId: '' }
    };

    const toggleFavoriteGame = (game: Game) => updateGame(game);

    return {
      gameRoute,
      games,
      toggleFavoriteGame
    };
  }
});
</script>
