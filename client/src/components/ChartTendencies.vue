<script>
import { Line } from 'vue-chartjs'


export default {
  name: "ChartTendencies",
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
  data () {
    return {
      stat: []
    }
  },
  mounted () {
    this.getPlayersStat()
    this.setChart()
  },
  methods: {
    setChart () {
      this.renderChart({
        // TODO:refactor that horror
        labels: this.stat.map(data => data.date),
        datasets: this.team.players.map(player => {
          const victories = this.stat.map(data => data[player.name.toLowerCase()])
          let top = Math.round(Math.max.apply(null, victories) + 10 / 10) + 5;
          const r = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
          return {
            label: player.name,
            backgroundColor: `rgba(${r(0, 225)}, ${r(0, 225)}, ${r(0, 225)}, 0.4)`,
            data: [...victories, top]
          }
        })
      })
    },
    getPlayersStat () {
      const groupedByDate = this.rounds.reduce((r, a) => {
        r[a.date] = r[a.date] || [];
        r[a.date].push(a);
        return r;
      }, Object.create(null));

      const players = this.team.players.map(player => player.name.toLowerCase());

      for (let date in groupedByDate) {
        const dateObject = { date }
        players.forEach(player => {
          const playerRes = groupedByDate[date].filter(round => round.winner === player)
          dateObject[player] = playerRes.length
        })
        this.stat.push(dateObject)
      }
    },
  }
}
</script>
