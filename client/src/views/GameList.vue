<template>
  <section>
    <the-title title="Games" icon="dice-multiple" component="game-add-dialog" />
    <cards-list v-if="getGames" :items="getGames" @favorite="toggleFavorite" :route="gameRoute">
      <template #action="{ item }">
        <game-edit-dialog :game="item" />
      </template>
    </cards-list>
  </section>
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
    ...mapGetters("games", ["getGames"]),
    ...mapGetters("teams", ["getTeams"]),
    gameRoute() {
      return { name: "game", params: { gameId: "" } };
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    ...mapActions("games", ["loadGames", "updateGame"]),
    ...mapActions("teams", ["loadTeams"]),
    toggleFavorite(game) {
      this.updateGame(game);
    },
    loadData() {
      this.getGames || this.loadGames();
      this.getTeams || this.loadTeams();
    }
  }
};
</script>
