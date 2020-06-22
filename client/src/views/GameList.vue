<template>
  <section>
    <the-title title="Games" icon="dice-multiple" component="game-add-dialog" />
    <cards-list v-if="games" :items="games" @favorite="toggleFavorite" :route="gameRoute">
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
import { mapState, mapActions } from "vuex";

export default {
  components: {
    TheTitle,
    GameEditDialog,
    CardsList
  },
  data() {
    return {
      gameRoute: { name: "game", params: { gameId: "" } }
    };
  },
  computed: {
    ...mapState("games", ["games"]),
    ...mapState("teams", ["teams"])
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
      this.games || this.loadGames();
      this.teams || this.loadTeams();
    }
  }
};
</script>
