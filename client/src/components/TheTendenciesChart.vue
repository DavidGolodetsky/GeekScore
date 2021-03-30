<script>
import { Line } from 'vue-chartjs'


export default {
  name: "TheTendenciesChart",
  extends: Line,
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
    playersStat () {
      const groupedByDate = this.rounds.reduce((r, a) => {
        const month = new Date(a.date).toLocaleString('default', { month: 'short' })
        r[month] = r[month] || [];
        r[month].push(a);
        return r;
      }, Object.create(null));

      const players = this.team.players.map(player => player.name.toLowerCase());

      const stat = []

      for (let date in groupedByDate) {
        const dateObject = { date }
        players.forEach(player => {
          const playerRes = groupedByDate[date].filter(round => round.winner === player)
          dateObject[player] = playerRes.length
        })
        stat.push(dateObject)
      }
      return stat
    },
    chartdata () {
      return {
        // TODO:refactor that horror
        labels: this.playersStat.map(data => data.date),
        datasets: this.team.players.map(player => {
          const victories = this.playersStat.map(data => data[player.name.toLowerCase()])
          let top = Math.round(Math.max.apply(null, victories) + 10 / 10) + 5;
          const r = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
          return {
            label: player.name,
            borderColor: `rgba(${r(0, 225)}, ${r(0, 225)}, ${r(0, 225)}, 0.4)`,
            backgroundColor: 'transparent',
            data: [...victories, top]
          }
        })
      }
    },
  },
  watch: {
    rounds () {
      this.updateChart()
    }
  },
  mounted () {
    this.setChart()
  },
  methods: {
    setChart () {
      this.renderChart(
        this.chartdata,
        {
          responsive: true,
          maintainAspectRatio: false
        }
      )
    },
    updateChart () {
      if (!this.$data._chart) return
      this.$data._chart.data = this.chartdata;
      this.$data._chart.update();
    },
  }
}
</script>
