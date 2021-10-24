<script>
import { Bar } from 'vue-chartjs';

export default {
  name: 'TheBarsChart',
  // TODO:refactor
  extends: Bar,
  props: {
    team: {
      type: Object,
      required: true
    },
    rounds: {
      type: Array,
      required: true
    }
  },
  computed: {
    chartdata() {
      return {
        labels: this.team.coop ? ['Victories', 'Defeats'] : this.getPlayers(),
        datasets: [
          {
            label: 'Victories',
            backgroundColor: '#ec8506',
            data: this.team.coop ? this.getCoopStat() : this.getPlayersStat()
          }
        ]
      };
    }
  },
  watch: {
    rounds() {
      this.updateChart();
    }
  },
  mounted() {
    this.setChart();
  },
  methods: {
    updateChart() {
      if (!this.$data._chart) return;
      this.$data._chart.data = this.chartdata;
      this.$data._chart.update();
    },
    setChart() {
      this.renderChart(this.chartdata, {
        responsive: true,
        maintainAspectRatio: false
      });
    },
    getCoopStat() {
      let victories = null;
      let defeats = null;
      Object.values(this.rounds).forEach(round => {
        round.result === 'VICTORY' ? victories++ : defeats++;
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
          if (this.rounds[round][formattedPlayer]) playerRes++;
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
