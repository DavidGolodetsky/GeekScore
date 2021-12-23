<template>
  <section class="rounds-table">
    <v-card>
      <v-card-title class="table-title">
        <v-spacer class="d-none d-sm-flex" />
        <v-text-field
          v-model="search"
          class="search pt-0"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :headers="tableHeaders"
        :items="rounds"
        :search="search"
        :single-expand="true"
        :items-per-page="5"
        :expanded.sync="expanded"
        show-expand
        item-key="_id"
        class="app-table elevation-1"
      >
        <template #expanded-item="{ item, headers }">
          <td :colspan="headers.length">
            <div v-if="item.turn" class="turn">First turn: {{ item.turn }}</div>
            <div v-if="item.comment">Comment: {{ item.comment }}</div>
          </td>
        </template>
        <template #item.action="{ item }">
          <RoundsEditDialog :round="item" />
        </template>
      </v-data-table>
    </v-card>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from '@vue/composition-api';
import { Player } from '@/types';

export default defineComponent({
  name: 'RoundsTable',
  components: {
    RoundsEditDialog: () => import('@/components/RoundsEditDialog.vue')
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
    const { team } = toRefs(props);

    const tableHeaders: any = ref([]);

    const countPlayers = () => {
      const players = team.value.players.map((player: Player) => ({
        text: player.name,
        value: player.name.toLowerCase()
      }));
      tableHeaders.value.push(...players);
    };

    const cookHeaders = () => {
      const fields = [
        team.value.coop
          ? { text: 'Result', value: 'result' }
          : { text: 'Tie', value: 'tie' },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: 'action', sortable: false }
      ];
      if (!team.value.coop) countPlayers();
      tableHeaders.value.push(...fields);
    };

    cookHeaders();

    const search = ref('');

    const expanded = ref([]);

    return { search, expanded, tableHeaders };
  }
});
</script>

<style scoped lang="scss">
.rounds-table {
  .app-table,
  .table-title {
    background-color: $lightgrey;
  }
  .search {
    background-color: $lightgrey;
    @media #{$tablet} {
      max-width: 300px;
    }
  }
}
</style>
