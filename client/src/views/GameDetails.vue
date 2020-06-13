<template>
  <section class="game-details">
    <the-title title="Teams" icon="account-group" :props="{ gameId }" component="team-add-dialog" />
    <cards-list
      v-if="teams"
      :items="teams"
      @favorite="toggleFavorite"
      :route="{ name: 'team', params: { teamId: '' }, query: { gameId } }"
    >
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
  data() {
    return {
      teamsFromCache: null
    };
  },
  computed: {
    ...mapGetters("teams", {
      getTeams: "gameTeams"
    }),
    ...mapGetters("games", { getGame: "game" }),
    ...mapGetters("user", ["user"]),
    teams() {
      return this.getTeams(this.gameId);
    },
    game() {
      return this.getGame(this.gameId);
    },
    gameName() {
      return this.game.name;
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
  }
};
</script>

<style lang="scss">
.game-details {
  .title-wrap {
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
