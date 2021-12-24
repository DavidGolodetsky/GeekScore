<template>
  <BaseDialog
    activator-icon="plus"
    header="Add team"
    button-text="Add team"
    @submit="submitTeam"
  >
    <v-tabs v-model="currentTab" @change="resetForm">
      <v-tabs-slider color="secondary" />
      <v-tab v-for="(tab, i) in tabs" :key="i" :href="`#tab-${i}`">
        <span class="mt-2">{{ tab }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab" class="pt-4 px-4">
      <v-tab-item value="tab-0">
        <v-select
          v-model="selectedTeamId"
          prepend-icon="mdi-account-multiple-plus-outline"
          autofocus
          :items="filteredTeams"
          :rules="isSelectTeamTab ? selectRules : []"
          item-text="name"
          item-value="_id"
          label="Team"
        />
      </v-tab-item>
      <v-tab-item value="tab-1">
        <v-text-field
          v-model.trim="name"
          clearable
          autofocus
          :rules="isSelectTeamTab ? [] : nameRules"
          prepend-icon="mdi-account-group-outline"
          label="Name"
        />
        <v-select
          prepend-icon="mdi-account-multiple-plus-outline"
          :items="numberOfPlayers"
          :rules="isSelectTeamTab ? [] : selectRules"
          label="Number of players"
          @change="setPlayers"
        />
        <span>
          <v-text-field
            v-for="(player, i) in players"
            :key="i"
            v-model.trim="player.name"
            :readonly="player.isMe"
            :clearable="!player.isMe"
            prepend-icon="mdi-account-outline"
            :rules="isSelectTeamTab && player.isMe ? [] : playerRules"
            :label="`Player #${i + 1}`"
            @input="updatePlayers"
          />
        </span>
        <v-switch
          v-model="coop"
          label="Cooperative"
          color="secondary"
          hide-details
        />
      </v-tab-item>
    </v-tabs-items>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, ref } from '@vue/composition-api';
import { getNames, generateNumberOfPlayers } from '@/use/common';
import { requiredField, standardField, uniqueField } from '@/use/validations';
import { Team } from '@/types';

export default defineComponent({
  name: 'TeamsAddDialog',
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  setup(props, { root: { $store } }) {
    const { gameId } = toRefs(props);

    const name = ref('');
    const coop = ref(false);
    const players: any = ref([]);
    const nameRules = ref([...standardField, requiredField]);
    const playerRules = ref([...standardField, requiredField]);
    const selectRules = ref([requiredField]);
    const selectedTeamId = ref(null);
    const currentTab = ref(null);
    const tabs = ref(['Select team', 'Create New']);
    const numberOfPlayers = ref(generateNumberOfPlayers(8));

    const uniqueRule = (list: any, isOnly: boolean) => [
      (field: any) => uniqueField(field, getNames(list), isOnly)
    ];

    const getGameTeams = () =>
      $store.getters['teams/getGameTeams'](gameId.value);

    const getGame = (gameId: string) => $store.getters['games/getGame'](gameId);
    const getTeam = (teamId: string) => $store.getters['teams/getTeam'](teamId);

    const gameTeams = computed(() => (gameId.value ? getGameTeams() : null));

    const games = computed(() => $store.state.games.games);
    const user = computed(() => $store.state.user.user);
    const teams = computed(() => $store.state.teams.teams);

    const game = computed(() => games.value ?? getGame(gameId.value));

    const isSelectTeamTab = computed(() => currentTab.value === 'tab-0');

    const isCoop = computed(() => {
      if (!game.value) return null;
      return game.value.coop || coop.value;
    });

    const filteredTeams = computed(() => {
      let teamNames = gameTeams.value?.map((team: Team) => team.name);
      return teams.value
        ? teams.value.filter((t: Team) => !teamNames.includes(t.name))
        : [];
    });

    const setPlayers = ($ev: any) => {
      if ($ev === 1) coop.value = true;
      let myName = user.value?.username ? user.value.username : 'Me';
      players.value = [{ name: myName, isMe: true }];
      for (let i = 1; i < $ev; i++) {
        let player = { name: '' };
        players.value.push(player);
      }
    };

    const updatePlayers = () => {
      // @ts-ignore
      playerRules.value = [...playerRules.value, ...uniqueRule(players.value)];
    };

    const resetForm = () => {
      name.value = '';
      numberOfPlayers.value = generateNumberOfPlayers(8);
      selectedTeamId.value = null;
    };

    const createNewTeam = () => {
      const team = {
        games: [gameId.value],
        gameName: game.value.name,
        name: name.value,
        coop: isCoop.value,
        players: players.value
      };
      $store.dispatch('teams/createTeam', team);
    };

    const addExistingTeam = () => {
      const team = getTeam(selectedTeamId.value!);
      const payload = {
        _id: selectedTeamId.value,
        games: [...team.games, gameId.value]
      };
      $store.dispatch('teams/updateTeam', payload);
    };

    const submitTeam = () => {
      if (name.value || selectedTeamId.value) {
        selectedTeamId.value ? addExistingTeam() : createNewTeam();
      }
      resetForm();
    };

    return {
      gameTeams,
      uniqueRule,
      isSelectTeamTab,
      submitTeam,
      updatePlayers,
      setPlayers,
      filteredTeams,
      nameRules,
      playerRules,
      selectRules,
      tabs,
      name,
      coop,
      players,
      selectedTeamId,
      currentTab,
      resetForm,
      numberOfPlayers
    };
  }
});
</script>
