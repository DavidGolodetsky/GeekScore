<template>
  <section>
    <the-title
      title="Rounds"
      icon="sword-cross"
      class="mb-4"
      :props="{ teamId: this.team._id, gameId: this.gameId }"
      component="round-add-dialog"
    />
    <div v-if="showTable">
      <v-tabs v-model="tab" background-color="primary" centered dark icons-and-text>
        <v-tabs-slider color="secondary"></v-tabs-slider>

        <v-tab href="#tab-1">
          Table
          <v-icon>mdi-table-large</v-icon>
        </v-tab>

        <v-tab href="#tab-2">
          Statistics
          <v-icon>mdi-chart-bar</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <the-table :team="team" :rounds="rounds" />
        </v-tab-item>
        <v-tab-item value="tab-2">
          <chart-bars :team="team" :rounds="rounds" />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </section>
</template>

<script>
import TheTitle from "@/components/TheTitle";
import TheTable from "@/components/TheTable";
import ChartBars from "@/components/ChartBars";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ChartBars,
    TheTable,
    TheTitle
  },
  props: {
    teamId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tab: null,
      gameId: this.$route.query.gameId
    };
  },
  computed: {
    ...mapGetters("teams", { getTeam: "team" }),
    ...mapGetters("games", { getGame: "game" }),
    ...mapGetters("rounds", { getRounds: "rounds" }),
    team() {
      return this.getTeam(this.teamId);
    },
    rounds() {
      const query = { teamId: this.teamId, gameId: this.gameId };
      return this.getRounds(query);
    },
    game() {
      return this.getGame(this.gameId);
    },
    showTable() {
      if (this.rounds && this.rounds.length) {
        return true;
      }
      return false;
    }
  },
  created() {
    this.loadRounds();
    this.backTitle(`${this.team.name}: ${this.game.name}`);
  },
  methods: {
    ...mapActions(["backTitle"]),
    ...mapActions("rounds", ["loadRounds"])
  }
};
</script>
