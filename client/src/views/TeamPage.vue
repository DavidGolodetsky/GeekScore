<template>
  <section class="team-details">
    <the-title
      title="Rounds"
      icon="sword-cross"
      class="mb-4"
      :props="{ teamId, gameId }"
      component="rounds-add-dialog"
    />
    <div v-if="showTable">
      <v-tabs
        v-model="currentTab"
        background-color="primary"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider color="secondary" />
        <v-tab
          v-for="(tab, i) in tabs"
          :key="i"
          :href="`#tab-${i}`"
        >
          <span class="mt-2">{{ tab.name }}</span>
          <v-icon>{{ `mdi-${tab.icon}` }}</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item
          v-for="(tabItem, i) in tabs"
          :key="i"
          :value="`tab-${i}`"
        >
          <component
            :is="tabItem.component"
            v-bind="{team, rounds}"
          />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </section>
</template>

<script>
import TheTitle from '@/components/TheTitle.vue';
import RoundsTable from '@/components/RoundsTable.vue';
import TheBarsChart from '@/components/TheBarsChart.vue';
import TheTendenciesChart from '@/components/TheTendenciesChart.vue';
import rounds from '@/store/modules/rounds';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: "TeamPage",
  components: {
    TheBarsChart,
    RoundsTable,
    TheTitle,
    TheTendenciesChart
  },
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      currentTab: null,
      gameId: this.$route.query.gameId,
      tabs: [
        {
          name: 'Table',
          icon: 'table-large',
          component: 'rounds-table'
        },
        {
          name: 'Statistics',
          icon: 'chart-bar',
          component: 'the-bars-chart'
        },
        {
          name: 'Tendencies',
          icon: 'chart-line',
          component: 'the-tendencies-chart'
        },
      ],
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
  watch: {
    teams: {
      handler (val) {
        if (val) {
          this.setBackTitle(`${this.team.name}: ${this.game.name}`);
        }
      },
      immediate: true
    }
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
      this.games ?? this.loadGames();
      this.teams ?? this.loadTeams()
      this.loadRoundsData()
    },
    loadRoundsData () {
      const isRounds = this.$store.hasModule('rounds');
      isRounds || this.$store.registerModule('rounds', rounds);
      this.loadRounds();
    }
  },
};
</script>

