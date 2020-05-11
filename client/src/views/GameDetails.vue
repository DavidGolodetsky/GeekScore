<template>
  <div class="game-details">
    <the-title title="Teams" icon="account-group" :props="{ gameId }" component="team-add-dialog" />
    <cards-list
      v-if="teams"
      :items="teams"
      @favorite="toggleFavorite"
      :route="{ name: 'team', params: { teamId: '' } }"
    >
      <template #action="{ item }">
        <team-edit-dialog :team="item" />
      </template>
    </cards-list>
  </div>
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
      teams: null
    };
  },
  watch: {
    getGameTeamsAPI(value) {
      if (value) {
        this.teams = value;
      }
    }
  },
  computed: {
    ...mapGetters("teams", {
      getTeams: "gameTeams",
      getGameTeamsAPI: "gameTeamsAPI"
    }),
    ...mapGetters("games", { getGame: "game" }),
    ...mapGetters("user", ["user"]),
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
      this.teams = this.getTeams(this.gameId);
      if (!this.teams) {
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
