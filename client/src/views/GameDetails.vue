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
      getTeamsfromCache: "gameTeams",
      getGameTeamsAPI: "gameTeamsAPI"
    }),
    ...mapGetters("games", { getGame: "game" }),
    ...mapGetters("user", ["user"]),
    teams() {
      if (this.teamsFromCache) {
        return this.teamsFromCache;
      } else {
        return this.getGameTeamsAPI;
      }
    },
    game() {
      return this.getGame(this.gameId);
    },
    gameName() {
      return this.game.name;
    }
  },
  created() {
    this.setTeams();
  },
  mounted() {
    this.backTitle(this.game.name);
  },
  methods: {
    ...mapActions(["backTitle"]),
    ...mapActions("teams", ["updateTeam", "loadGameTeams"]),
    toggleFavorite(data) {
      const payload = {
        ...data,
        gameId: this.gameId
      };
      this.updateTeam(payload);
    },
    setTeams() {
      this.teamsFromCache = this.getTeamsfromCache(this.gameId);
      if (!this.teamsFromCache) {
        this.loadGameTeams(this.gameId);
      }
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
