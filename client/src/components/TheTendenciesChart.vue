<template>
  <LineChart :chart-data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from '@vue/composition-api';
import { LineChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { Round, Player } from '@/types';

Chart.register(...registerables);

export default defineComponent({
  name: 'TheTendenciesChart',
  components: {
    LineChart
  },
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
  setup(props) {
    const { rounds, team }: any = toRefs(props);
    const playersStat = computed(() => {
      const groupedByDate: any = rounds.value.reduce((r: any, a: Round) => {
        const month = new Date(a.date).toLocaleString('default', {
          month: 'short'
        });
        r[month] = r[month] || [];
        r[month].push(a);
        return r;
      }, Object.create(null));

      const players: string[] = team.value.players.map((player: Player) =>
        player.name.toLowerCase()
      );

      const stat = [];

      for (let date in groupedByDate) {
        const dateObject: any = { date };
        players.forEach((player: string) => {
          const playerRes: any = groupedByDate[date].filter(
            (round: Round) => round.winner === player
          );
          dateObject[player] = playerRes.length;
        });
        stat.push(dateObject);
      }
      return stat;
    });

    const chartData = computed<ChartData<'line'>>(() => ({
      // TODO:refactor that horror
      labels: playersStat.value.map((data: any) => data.date),
      datasets: team.value.players.map((player: Player) => {
        const victories: number[] = playersStat.value.map(
          (data: any) => data[player.name.toLowerCase()]
        );
        let top: number =
          Math.round(Math.max.apply(null, victories) + 10 / 10) + 5;
        const r = (min: number, max: number) =>
          Math.floor(Math.random() * (max - min + 1) + min);
        return {
          label: player.name,
          borderColor: `rgba(${r(0, 225)}, ${r(0, 225)}, ${r(0, 225)}, 0.4)`,
          backgroundColor: 'transparent',
          data: [...victories, top]
        };
      })
    }));

    const chartOptions: ChartOptions<'line'> = {
      responsive: true,
      maintainAspectRatio: false
    };

    return { chartData, chartOptions };
  }
});
</script>
