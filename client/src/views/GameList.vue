<template>
  <section>
    <the-title title="Games" icon="dice-multiple" component="game-add-dialog" />
    <cards-list
      v-if="getGames"
      :items="getGames"
      @favorite="toggleFavorite"
      :route="{name: 'game', params: {gameId: ''}}"
    >
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
    ...mapGetters("teams", ["getTeams"])
  },
  created() {
    this.shouldLoadData();
    this.setBackTitle();
  },
  methods: {
    ...mapActions("games", ["loadGames", "updateGame"]),
    ...mapActions("teams", ["loadTeams"]),
    ...mapActions(["setBackTitle"]),
    toggleFavorite(game) {
      this.updateGame(game);
    },
    shouldLoadData() {
      this.getGames ? "" : this.loadGames();
      this.getTeams ? "" : this.loadTeams();
    }
  }
};
</script>
