<template>
  <section class="game-details">
    <the-title title="Teams" icon="account-group" :props="{ gameId }" component="team-add-dialog" />
    <cards-list v-if="teams" :items="teams" @favorite="toggleFavorite" :route="teamRoute">
      <template #action="{ item }">
        <team-edit-dialog :team="item" />
      </template>
    </cards-list>
  </section>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import TeamEditDialog from "@/components/TeamEditDialog";
import CardsList from "@/components/CardsList";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    TheTitle,
    TeamEditDialog,
    CardsList
  },
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters("teams", ["getGameTeams"]),
    ...mapGetters("games", ["getGame"]),
    teams() {
      return this.getGameTeams(this.gameId);
    },
    game() {
      return this.getGame(this.gameId);
    },
    teamRoute() {
      return {
        name: "team",
        params: { teamId: "" },
        query: { gameId: this.gameId }
      };
    }
  },
  created() {
    this.setBackTitle(this.game.name);
  },
  methods: {
    ...mapActions(["setBackTitle"]),
    ...mapActions("teams", ["updateTeam", "loadGameTeams"]),
    toggleFavorite(teamInfo) {
      const team = {
        ...teamInfo,
        gameId: this.gameId
      };
      this.updateTeam(team);
    }
  },
  beforeDestroy() {
    this.setBackTitle();
  }
};
</script>


