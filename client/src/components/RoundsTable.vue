<template>
  <section class="the-table">
    <v-card class="mb-4">
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
        :headers="headers"
        :items="rounds"
        :search="search"
        single-expand
        :items-per-page="5"
        :expanded.sync="expanded"
        show-expand
        class="app-table elevation-1"
      >
        <template #expanded-item="{ item, headers }">
          <td :colspan="headers.length">
            <div v-if="item.turn" class="turn">First turn: {{ item.turn }}</div>
            <div v-if="item.comment">Comment: {{ item.comment }}</div>
          </td>
        </template>
        <template #item[action]="{ item }">
          <rounds-edit-dialog :round="item" />
        </template>
      </v-data-table>
    </v-card>
  </section>
</template>

<script>
import RoundsEditDialog from '@/components/RoundsEditDialog.vue'

export default {
  name: 'RoundsTable',
  // TODO:refactor
  components: {
    RoundsEditDialog
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
  data() {
    return {
      search: '',
      expanded: [],
      headers: []
    }
  },
  created() {
    this.cookHeaders()
  },
  methods: {
    cookHeaders() {
      const fields = [
        this.team.coop
          ? { text: 'Result', value: 'result' }
          : { text: 'Tie', value: 'tie' },
        { text: 'Date', value: 'date' },
        { text: 'Actions', value: 'action', sortable: false }
      ]
      if (!this.team.coop) this.countPlayers()
      this.headers.push(...fields)
    },
    countPlayers() {
      const players = this.team.players.map(player => ({
        text: player.name,
        value: player.name.toLowerCase()
      }))
      this.headers.push(...players)
    }
  }
}
</script>

<style scoped lang="scss">
.the-table {
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
