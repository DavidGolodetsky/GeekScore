<template>
  <div class="the-table">
    <v-card class="mb-4">
      <v-card-title class="table-title">
        <v-spacer class="d-none d-sm-flex"></v-spacer>
        <v-text-field
          class="search pt-0"
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
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
            <div class="turn" v-if="item.turn">First turn: {{ item.turn }}</div>
            <div v-if="item.comment">Comment: {{ item.comment }}</div>
          </td>
        </template>
        <template #item.action="{ item }">
          <round-edit-dialog :item="item" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import RoundEditDialog from "@/components/RoundEditDialog";

export default {
  components: {
    RoundEditDialog
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
      search: "",
      expanded: []
    };
  },
  computed: {
    headers() {
      const headers = this.team.players.map(player => ({
        text: player.name,
        value: player.name.toLowerCase()
      }));
      const fields = [
        this.team.coop
          ? { text: "Result", value: "result" }
          : { text: "Tie", value: "tie" },
        { text: "Date", value: "date" },
        { text: "Actions", value: "action", sortable: false }
      ];
      headers.push(...fields);
      return headers;
    }
  }
};
</script>

<style scoped lang="scss">
.the-table {
  .app-table,
  .table-title {
    background-color: $light-grey;
  }
  .search {
    background-color: $light-grey;
    @media #{$tablet} {
      max-width: 300px;
    }
  }
}
</style>
