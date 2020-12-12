<template>
  <section>
    <the-title
      title="Games"
      icon="dice-multiple"
      component="games-add-dialog"
    />
    <the-cards-list
      v-if="games"
      :route="gameRoute"
      :items="games"
      @favorite="toggleFavorite"
    >
      <template #action="{ item }">
        <games-edit-dialog :game="item" />
      </template>
    </the-cards-list>
  </section>
</template>

<script>
import TheTitle from '@/components/TheTitle';
import GamesEditDialog from '@/components/GamesEditDialog';
import TheCardsList from '@/components/TheCardsList';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'GamesPage',
  components: {
    TheTitle,
    GamesEditDialog,
    TheCardsList,
  },
  data () {
    return {
      gameRoute: { name: 'game', params: { gameId: '' } },
    };
  },
  computed: {
    ...mapState('games', ['games']),
  },
  created () {
    this.loadData();
  },
  methods: {
    ...mapActions('games', ['loadGames', 'updateGame']),
    toggleFavorite (game) {
      this.updateGame(game);
    },
    loadData () {
      this.games ?? this.loadGames();
    },
  },
};
</script>
