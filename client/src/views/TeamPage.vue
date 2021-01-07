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
        <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#tab-${i}`">
          <span class="mt-2">{{ tab.name }}</span>
          <v-icon>{{ `mdi-${tab.icon}` }}</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab">
        <v-tab-item v-for="(tabItem, i) in tabs" :key="i" :value="`tab-${i}`">
          <component :is="tabItem.component" v-bind="{ team, rounds }" />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  watchEffect,
  onMounted,
  onUnmounted,
  ref,
  onBeforeMount,
} from "@vue/composition-api";
import TheTitle from "@/components/TheTitle.vue";
import RoundsTable from "@/components/RoundsTable.vue";
import TheBarsChart from "@/components/TheBarsChart.vue";
import TheTendenciesChart from "@/components/TheTendenciesChart.vue";
import roundsModule from "@/store/modules/rounds";
import { mapActions } from "vuex";

export default defineComponent({
  name: "TeamPage",
  components: {
    TheBarsChart,
    RoundsTable,
    TheTitle,
    TheTendenciesChart,
  },
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const store = ctx.root.$store;
    const route = ctx.root.$route;

    //DATA
    const currentTab = "tab-0";
    const gameId = route.query.gameId;
    const tabs = [
      {
        name: "Table",
        icon: "table-large",
        component: "rounds-table",
      },
      {
        name: "Statistics",
        icon: "chart-bar",
        component: "the-bars-chart",
      },
      {
        name: "Tendencies",
        icon: "chart-line",
        component: "the-tendencies-chart",
      },
    ];

    //COMPUTED
    const games = computed(() => store.state.games);
    const getGame = computed(() => store.getters["games/getGame"](gameId));
    const game = computed(() => (games ? getGame : null));

    const teams = computed(() => store.state.teams);
    const getTeams = computed(() =>
      store.getters["teams/getTeam"](props.teamId)
    );
    const team = computed(() => (teams ? getTeams.value : null));

    const gameTeam = computed(() => game && team);

    const rounds = computed(() => {
      const query = { teamId: props.teamId, gameId: gameId };
      const rounds = store.getters["rounds/getRounds"](query);
      if (rounds) rounds.forEach((round) => (round[round.winner] = "VICTORY"));
      return rounds;
    });
    // rounds() {
    //   const query = { teamId: this.teamId, gameId: this.gameId };
    //   const rounds = this.getRounds(query);
    //   if (rounds) rounds.forEach((round) => (round[round.winner] = "VICTORY"));
    //   return rounds;
    // },

    const showTable = computed(() => gameTeam && rounds.value?.length);

    //WATCH
    // watchEffect(() => {});

    //LIFECYCLE HOOKS
    // onUnmounted(() => setBackTitle());

    //METHODS
    // const setBackTitle = store.dispatch("setBackTitle");
    // const loadGames = store.dispatch("games/loadGames");
    // const loadTeams = store.dispatch("teams/loadTeams");
    // const loadRounds = store.dispatch("rounds/loadRounds");

    // const loadData = () => {
    //   store.dispatch("games/loadGames");
    //   store.dispatch("teams/loadTeams");
    //   loadRoundsData();
    // };

    // const loadRoundsData = () => {
    //   const isRounds = store.hasModule("rounds");
    //   isRounds || store.registerModule("rounds", roundsModule);
    //   store.dispatch("rounds/loadRounds");
    // };

    loadData(store);
    return {
      currentTab,
      gameId,
      tabs,
      game,
      team,
      gameTeam,
      rounds,
      showTable,
      loadRoundsData,
    };
  },
  computed: {
    // ...mapState("teams", ["teams"]),
    // ...mapState("games", ["games"]),
    // ...mapGetters("teams", ["getTeam"]),
    // ...mapGetters("games", ["getGame"]),
    // ...mapGetters("rounds", ["getRounds"]),
    // game() {
    //   return this.games ? this.getGame(this.gameId) : null;
    // },
    // team() {
    //   return this.teams ? this.getTeam(this.teamId) : null;
    // },
    // gameTeam() {
    //   return this.game && this.team;
    // },
    // rounds() {
    //   const query = { teamId: this.teamId, gameId: this.gameId };
    //   const rounds = this.getRounds(query);
    //   if (rounds) rounds.forEach((round) => (round[round.winner] = "VICTORY"));
    //   return rounds;
    // },
    // showTable() {
    //   return this.gameTeam && this.rounds?.length;
    // },
  },
  watch: {
    teams: {
      handler(val) {
        if (val) {
          this.setBackTitle(`${this.team.name}: ${this.game.name}`);
        }
      },
      immediate: true,
    },
  },
  // created() {
  //   this.loadData();
  // },
  // beforeDestroy() {
  //   this.setBackTitle();
  // },
  methods: {
    ...mapActions(["setBackTitle"]),
    // ...mapActions("games", ["loadGames"]),
    // ...mapActions("teams", ["loadTeams"]),
    // ...mapActions("rounds", ["loadRounds"]),
    // loadData() {
    //   console.log("1");
    //   this.games ?? this.loadGames();
    //   this.teams ?? this.loadTeams();
    //   this.loadRoundsData();
    // },
    // loadRoundsData() {
    //   const isRounds = this.$store.hasModule("rounds");
    //   isRounds || this.$store.registerModule("rounds", rounds);
    //   this.loadRounds();
    // },
  },
});

const loadRoundsData = (store) => {
  const isRounds = store.hasModule("rounds");
  isRounds || store.registerModule("rounds", roundsModule);
  store.dispatch("rounds/loadRounds");
};

const loadData = (store) => {
  console.log(store);
  store.dispatch("games/loadGames");
  store.dispatch("teams/loadTeams");
  loadRoundsData(store);
};
</script>
