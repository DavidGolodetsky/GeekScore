<template>
  <div class="game-details">
    <the-title title="Teams" icon="account-group" :props="{ gameId }" component="team-add-dialog" />
    <cards-list
      v-if="getGameTeams"
      :items="getGameTeams"
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
import axios from "axios";

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
  computed: {
    ...mapGetters("teams", { getTeams: "gameTeams" }),
    ...mapGetters("games", { getGame: "game" }),
    ...mapGetters("user", ["user"]),
    game() {
      return this.getGame(this.gameId);
    },
    getGameTeams() {
      return this.teams ? this.teams : "";
    },
    gameName() {
      return this.game.name;
    }
  },
  mounted() {
    this.setTeams();
    this.backTitle(this.game.name);
  },
  methods: {
    ...mapActions(["backTitle"]),
    ...mapActions("teams", ["updateTeam"]),
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
        this.getTeamsFromApi().then(res => (this.teams = res.data));
      }
    },
    getTeamsFromApi() {
      const gameId = this.gameId;
      const user = this.user;
      return axios.get("/api/teams/game", { params: { user, gameId } });
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
