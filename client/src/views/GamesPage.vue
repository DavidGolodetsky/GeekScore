<template>
  <section>
    <the-title
      title="Games"
      icon="dice-multiple"
      component="games-add-dialog"
    />
    <the-cards-list
      v-if="games"
      :route="gameRoute"
      :items="games"
      @favorite="toggleFavoriteGame"
    >
      <template #action="{ item }">
        <games-edit-dialog :game="item" />
      </template>
    </the-cards-list>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import TheTitle from "@/components/TheTitle";
import GamesEditDialog from "@/components/GamesEditDialog";
import TheCardsList from "@/components/TheCardsList";

export default defineComponent({
  name: "GamesPage",
  components: {
    TheTitle,
    GamesEditDialog,
    TheCardsList,
  },
  setup(_, ctx) {
    const store = ctx.root.$store;
    // TODO: add types
    const updateGame = (game) => store.dispatch("games/updateGame", game);

    const loadGames = () => store.dispatch("games/loadGames");

    const gameRoute = { name: "game", params: { gameId: "" } };

    const games = computed(() => store.state.games.games);

    const toggleFavoriteGame = (game: any) => updateGame(game);

    (() => games?.value ?? loadGames())();

    return {
      gameRoute,
      games,
      toggleFavoriteGame,
    };
  },
});
</script>
