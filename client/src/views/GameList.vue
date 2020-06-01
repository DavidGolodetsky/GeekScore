<template>
  <section>
    <the-title title="Games" icon="dice-multiple" component="game-add-dialog" />
    <cards-list
      v-if="games"
      :items="games"
      @favorite="toggleFavorite"
      :route="{name: 'game', params: {gameId: ''}}"
    >
      <template #action="{ item }">
        <game-edit-dialog :game="item" />
      </template>
    </cards-list>
  </section>
</template>

<script lang='ts'>
import Vue from "vue";

import TheTitle from "@/components/TheTitle";
import GameEditDialog from "@/components/GameEditDialog";
import CardsList from "@/components/CardsList";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
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
    this.shouldLoadData();
    this.clearBackTitle();
  },
  methods: {
    ...mapActions("games", ["loadGames", "updateGame"]),
    ...mapActions(["clearBackTitle"]),
    toggleFavorite(game) {
      this.updateGame(game);
    },
    shouldLoadData() {
      this.games ? "" : this.loadGames();
    }
  }
});
</script>
