<template>
  <BarChart :chart-data="chartData" />
</template>

<script lang="ts">
import { defineComponent, computed, toRefs } from '@vue/composition-api';
import { BarChart } from 'vue-chart-3'
import { Chart, ChartData, registerables } from "chart.js";
import { Player } from '@/types';

Chart.register(...registerables);

export default defineComponent({
  name: 'TheBarsChart',
  components: { BarChart },
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

    const getCoopStat = () => {
      let victories: any = null;
      let defeats: any = null;
      Object.values(rounds.value).forEach((round: any) => {
        round.result === 'VICTORY' ? victories++ : defeats++;
      });
      const data = [victories, defeats];
      let top = Math.round(Math.max.apply(null, data) + 10 / 10) + 5;
      return [victories, defeats, 0, top];
    };

    function getPlayers() {
      return team.value.players.map((player: Player) => player.name);
    };

    function getPlayersStat() {
      const players: string[] = getPlayers();
      const data: any = players.map((player: string) => {
        let playerRes: number = 0;
        let formattedPlayer: string = player.toLowerCase();
        Object.keys(rounds.value).forEach((round: string) => {
          if (rounds.value[round][formattedPlayer]) playerRes++;
        });
        return playerRes;
      });

      let top: number = Math.ceil(Math.max.apply(null, data) / 10) * 10;

      return [...data, 0, top];
    };

    const chartData = computed<ChartData<'bar'>>(() => ({
      labels: team.value.coop ? ['Victories', 'Defeats'] : getPlayers(),
      datasets: [
        {
          label: 'Victories',
          backgroundColor: '#ec8506',
          data: team.value.coop ? getCoopStat() : getPlayersStat()
        }
      ]
    }))

    return { chartData };
  },
})
</script>
