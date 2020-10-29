<template>
  <section>
    <the-title
      title="Rounds"
      icon="sword-cross"
      class="mb-4"
      :props="{ teamId, gameId }"
      component="round-add-dialog"
    />
    <div v-if="showTable">
      <v-tabs
        v-model="tab"
        background-color="primary"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider color="secondary" />
        <v-tab
          v-for="(tabItem, i) in tabs"
          :key="tabItem.name"
          :href="`#tab-${i}`"
        >
          <span class="mt-2">{{ tabItem.name }}</span>
          <v-icon>{{ `mdi-${tabItem.icon}` }}</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(component, i) in tabComponents"
          :key="i"
          :value="`tab-${i}`"
        >
          <component
            :is="component"
            :team="team"
            :rounds="rounds"
          />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </section>
</template>

<script>
import TheTitle from '@/components/TheTitle';
import MainTable from '@/components/MainTable';
import ChartBars from '@/components/ChartBars';
import ChartTendencies from '@/components/ChartTendencies';
import rounds from '@/store/modules/rounds';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: "TeamDetails",
  components: {
    ChartBars,
    MainTable,
    TheTitle,
    ChartTendencies
  },
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      tab: null,
      gameId: this.$route.query.gameId,
      tabs: [
        {
          name: 'Table',
          href: 'tab-1',
          icon: 'table-large',
        },
        {
          name: 'Statistics',
          href: 'tab-2',
          icon: 'chart-bar',
        },
        {
          name: 'Tendencies',
          href: 'tab-3',
          icon: 'chart-line',
        },
      ],
      tabComponents: ['main-table', 'chart-bars', 'chart-tendencies'],
    };
  },
  computed: {
    ...mapState('teams', ['teams']),
    ...mapState('games', ['games']),
    ...mapGetters('teams', ['getTeam']),
    ...mapGetters('games', ['getGame']),
    ...mapGetters('rounds', ['getRounds']),
    game () {
      return this.games ? this.getGame(this.gameId) : null;
    },
    team () {
      return this.teams ? this.getTeam(this.teamId) : null;
    },
    gameTeam () {
      return this.game && this.team;
    },
    rounds () {
      const query = { teamId: this.teamId, gameId: this.gameId };
      const rounds = this.getRounds(query);
      if (rounds) rounds.forEach((round) => (round[round.winner] = 'VICTORY'));
      return rounds;
    },

    showTable () {
      return this.gameTeam && this.rounds?.length;
    },
  },
  created () {
    this.loadData();
  },
  beforeDestroy () {
    this.setBackTitle();
  },
  methods: {
    ...mapActions(['setBackTitle']),
    ...mapActions('games', ['loadGames']),
    ...mapActions('teams', ['loadTeams']),
    ...mapActions('rounds', ['loadRounds']),
    loadData () {
      this.games || this.loadGames();
      this.teams || this.loadTeams().then(() => {
        this.setBackTitle(`${this.team.name}: ${this.game.name}`);
      });
      const isRounds = this.$store.hasModule('rounds');
      isRounds || this.$store.registerModule('rounds', rounds);
      this.loadRounds();

      if (this.teams != null) this.setBackTitle(`${this.team.name}: ${this.game.name}`);
    },
  },
};
</script>

