<template>
  <section class="game-details">
    <the-title
      title="Teams"
      icon="account-group"
      :props="{ gameId }"
      component="teams-add-dialog"
    />
    <div
      v-if="winRate"
      class="win-rate"
    >
      <v-icon
        dark
        class="mr-3"
      >mdi-brightness-percent</v-icon>
      <span>Your win rate is: {{ winRate }}</span>
    </div>
    <the-cards-list
      v-if="gameTeams"
      :items="gameTeams"
      :route="teamRoute"
      @favorite="toggleFavorite"
    >
      <template #action="{ item }">
        <teams-edit-dialog :team="item" />
      </template>
    </the-cards-list>
  </section>
</template>

<script>
import TheTitle from '@/components/TheTitle';
import TeamsEditDialog from '@/components/TeamsEditDialog';
import TheCardsList from '@/components/TheCardsList';
import { mapActions, mapGetters, mapState } from 'vuex';
import { VueOfflineMixin } from 'vue-offline';

export default {
  name: "GamePage",
  components: {
    TheTitle,
    TeamsEditDialog,
    TheCardsList,
  },
  mixins: [VueOfflineMixin],
  props: {
    gameId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('teams', ['teams']),
    ...mapState('games', ['games', 'winRate']),
    ...mapGetters('teams', ['getGameTeams']),
    ...mapGetters('games', ['getGame']),
    gameTeams () {
      return this.teams ? this.getGameTeams(this.gameId) : null;
    },
    game () {
      return this.games ? this.getGame(this.gameId) : null;
    },
    teamRoute () {
      return {
        name: 'team',
        params: { teamId: '' },
        query: { gameId: this.gameId },
      };
    },
  },
  created () {
    this.isOffline ? this.loadFromCache() : this.loadData();
  },
  beforeDestroy () {
    this.setBackTitle();
  },
  methods: {
    ...mapActions(['setBackTitle']),
    ...mapActions('games', ['loadGames', 'loadGamesOffline', 'loadWinRate']),
    ...mapActions('teams', ['updateTeam', 'loadTeams', 'loadGameTeams']),
    toggleFavorite (teamInfo) {
      const team = {
        ...teamInfo,
        gameId: this.gameId,
      };
      this.updateTeam(team);
    },
    loadData () {
      this.games ?? this.loadGames().then(() => {
        this.setBackTitle(this.getGame(this.gameId).name);
      });
      this.teams ?? this.loadTeams();
      this.loadWinRate(this.gameId)
    },
    loadFromCache () {
      this.games ?? this.loadGamesOffline().then(() => {
        this.setBackTitle(this.getGame(this.gameId).name);
      });
    }
  },
};
</script>

<style lang="scss">
.game-details {
  .win-rate {
    background-color: $secondary;
    padding: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
  }
}
</style>