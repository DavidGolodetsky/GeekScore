<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      rounds: this.team.rounds
    };
  },
  mounted() {
    this.renderChart(
      {
        labels: this.team.coop ? ["Victories", "Defeats"] : this.getPlayers(),
        datasets: [
          {
            label: "Victories",
            backgroundColor: "#ec8506",
            data: this.team.coop ? this.getCoopStat() : this.getPlayersStat()
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );
  },
  methods: {
    getCoopStat() {
      let victories = null;
      let defeats = null;
      Object.values(this.rounds).forEach(round => {
        round.result === "VICTORY" ? victories++ : defeats++;
      });
      const data = [victories, defeats];
      let top = Math.round(Math.max.apply(null, data) + 10 / 10) + 5;
      return [victories, defeats, 0, top];
    },
    getPlayersStat() {
      const players = this.getPlayers();
      const data = players.map(player => {
        let playerRes = 0;
        let formattedPlayer = player.toLowerCase();
        Object.keys(this.rounds).forEach(round => {
          if (this.rounds[round][formattedPlayer]) {
            playerRes++;
          }
        });
        return playerRes;
      });

      let top = Math.ceil(Math.max.apply(null, data) / 10) * 10;

      return [...data, 0, top];
    },
    getPlayers() {
      return this.team.players.map(player => player.name);
    }
  }
};
</script>


<style scoped lang="scss">
canvas#bar-chart {
  background-color: $light-grey;
}
</style>