<template>
  <section class="game">
    <TheTitle
      title="Teams"
      icon="account-group-outline"
      :props="{ gameId }"
      component="teams-add-dialog"
    />
    <div v-if="winRate" class="win-rate">
      <v-icon dark color="primary" class="mr-3">mdi-brightness-percent</v-icon>
      <span>Your win rate is: {{ winRate }}</span>
    </div>
    <TheCardsList
      v-if="gameTeams"
      :card-items="gameTeams"
      :card-route="teamRoute"
      @favorite="toggleFavoriteTeam"
    >
      <template #action="{ item }">
        <TeamsEditDialog :team="item" />
      </template>
    </TheCardsList>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watchEffect,
  onBeforeUnmount,
  toRefs
} from '@vue/composition-api';

export default defineComponent({
  name: 'GamePage',
  components: {
    TheTitle: () => import('@/components/TheTitle.vue'),
    TheCardsList: () => import('@/components/TheCardsList.vue'),
    // TODO:lazy load when edit is clicked
    TeamsEditDialog: () => import('@/components/TeamsEditDialog.vue')
  },
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  setup(props, { root: { $store } }) {
    const { gameId }: any = toRefs(props);

    const allTeams = computed(() => $store.state.teams.teams);

    const allGames = computed(() => $store.state.games.games);

    const loadGames = () => $store.dispatch('games/loadGames');

    const loadWinRate = () =>
      $store.dispatch('games/loadWinRate', gameId.value);

    const loadTeams = () => $store.dispatch('teams/loadTeams');

    const loadData = () => {
      allTeams?.value ?? loadTeams();
      allGames?.value ?? loadGames();
      loadWinRate();
    };

    loadData();

    const winRate = computed(() => $store.state.games.winRate);

    const getGameTeams = () =>
      $store.getters['teams/getGameTeams'](gameId.value);

    const gameTeams = computed(() => (allTeams?.value ? getGameTeams() : null));

    const getGame = () => $store.getters['games/getGame'](gameId.value);

    const teamRoute = computed(() => ({
      name: 'team',
      params: { teamId: '' },
      query: { gameId: gameId.value }
    }));

    const updateTeam = (team: any) => $store.dispatch('teams/updateTeam', team);

    const toggleFavoriteTeam = (teamInfo: any) => {
      const team = {
        ...teamInfo,
        gameId: gameId.value
      };
      updateTeam(team);
    };

    const setBackTitle = (backTitle?: string) =>
      $store.dispatch('setBackTitle', backTitle);

    onBeforeUnmount(() => setBackTitle());

    watchEffect(() => {
      if (!allGames.value) return;
      const { name: gameName } = getGame();
      setBackTitle(gameName);
    });

    return {
      winRate,
      gameTeams,
      teamRoute,
      toggleFavoriteTeam
    };
  }
});
</script>

<style lang="scss">
.game {
  .win-rate {
    background-color: $secondary;
    padding: 15px;
    font-weight: 600;
    display: grid;
    place-items: center;
    margin-bottom: $space-2;
    color: $primary;
  }
}
</style>
