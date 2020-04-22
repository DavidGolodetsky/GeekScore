<template>
  <div>
    <the-title title="Games" icon="dice-multiple" component="game-add-dialog" />
    <cards-list
      v-if="games.length"
      :items="games"
      @favorite="toggleFavorite"
      :route="{name: 'game', params: {gameId: ''}}"
    >
      <template #action="{ item }">
        <game-edit-dialog :game="item" />
      </template>
    </cards-list>
  </div>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import GameEditDialog from "@/components/GameEditDialog";
import CardsList from "@/components/CardsList";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    TheTitle,
    GameEditDialog,
    CardsList
  },
  computed: {
    ...mapGetters("games", ["games"]),
    ...mapGetters("user", ["user"])
  },
  created() {
    this.shouldLoadGames();
    this.clearBackTitle();
  },
  methods: {
    ...mapActions("games", ["loadGames", "updateGame"]),
    ...mapActions(["clearBackTitle"]),
    toggleFavorite(data) {
      this.updateGame(data);
    },
    shouldLoadGames() {
      this.games.length ? "" : this.loadGames();
    }
  }
};
</script>
