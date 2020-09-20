<template>
  <section class="game-details">
    <the-title
      title="Teams"
      icon="account-group"
      :props="{ gameId }"
      component="team-add-dialog"
    />
    <cards-list
      v-if="gameTeams"
      :items="gameTeams"
      :route="teamRoute"
      @favorite="toggleFavorite"
    >
      <template #action="{ item }">
        <team-edit-dialog :team="item" />
      </template>
    </cards-list>
  </section>
</template>

<script>
import TheTitle from '@/components/TheTitle';
import TeamEditDialog from '@/components/TeamEditDialog';
import CardsList from '@/components/CardsList';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  components: {
    TheTitle,
    TeamEditDialog,
    CardsList,
  },
  props: {
    gameId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('teams', ['teams']),
    ...mapState('games', ['games']),
    ...mapGetters('teams', ['getGameTeams']),
    ...mapGetters('games', ['getGame']),
    gameTeams() {
      return this.teams ? this.getGameTeams(this.gameId) : null;
    },
    game() {
      return this.games ? this.getGame(this.gameId) : null;
    },
    teamRoute() {
      return {
        name: 'team',
        params: { teamId: '' },
        query: { gameId: this.gameId },
      };
    },
  },
  watch: {
    game(value) {
      if (value) this.setBackTitle(this.game.name);
    },
  },
  created() {
    this.loadData();
  },
  beforeDestroy() {
    this.setBackTitle();
  },
  methods: {
    ...mapActions(['setBackTitle']),
    ...mapActions('games', ['loadGames']),
    ...mapActions('teams', ['updateTeam', 'loadTeams', 'loadGameTeams']),
    toggleFavorite(teamInfo) {
      const team = {
        ...teamInfo,
        gameId: this.gameId,
      };
      this.updateTeam(team);
    },
    loadData() {
      this.games || this.loadGames();
      this.teams || this.loadTeams();
    },
  },
};
</script>
