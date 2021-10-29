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
import TheTitle from '@/components/TheTitle.vue';
import GamesEditDialog from '@/components/GamesEditDialog.vue';
import TheCardsList from '@/components/TheCardsList.vue';
import { Game } from '@/types';

export default defineComponent({
  name: 'Games',
  components: {
    TheTitle,
    GamesEditDialog,
    TheCardsList
  },
  setup(_, ctx) {
    const store = ctx.root.$store;

    const games = computed(() => store.state.games.games);

    const isLoadGames = () => games?.value ?? loadGames();

    const loadGames = () => store.dispatch('games/loadGames');

    isLoadGames();

    const updateGame = (game: Game) => store.dispatch('games/updateGame', game);

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
