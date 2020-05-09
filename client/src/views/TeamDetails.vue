<template>
  <div>
    <the-title
      title="Rounds"
      icon="sword-cross"
      class="mb-4"
      :props="{ teamId: this.team.id }"
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
          <v-card>
            <chart-bars :key="statistics" :team="team" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
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
      statistics: 0,
      tab: null
    };
  },
  computed: {
    ...mapGetters("teams", { getTeam: "team", getRounds: "rounds" }),
    team() {
      return this.getTeam(this.teamId);
    },
    showTable() {
      if (this.rounds && this.rounds.length) {
        return true;
      }
      return false;
    },
    rounds() {
      const rounds = this.getRounds(this.teamId);
      if (rounds) {
        return Object.keys(rounds).map(key => {
          return { ...rounds[key], id: key };
        });
      }
      return [];
    }
  },
  mounted() {
    this.backTitle(`${this.team.name}: ${this.team.gameName}`);
  },
  methods: {
    ...mapActions(["backTitle"])
  },
  watch: {
    rounds(value, newValue) {
      if (newValue) {
        this.statistics++;
      }
    }
  }
};
</script>
