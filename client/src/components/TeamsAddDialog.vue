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
          v-model="selectedTeam"
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

<script>
import { getNames, generateNumberOfPlayers } from '@/use/common';
import { requiredField, standardField, uniqueField } from '@/use/validations';
import { mapActions, mapGetters, mapState } from 'vuex';
import { computed, toRefs } from '@vue/composition-api';

export default {
  name: 'TeamsAddDialog',
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: '',
      coop: false,
      players: [],
      nameRules: [...standardField, requiredField],
      playerRules: [...standardField, requiredField],
      selectRules: [requiredField],
      selectedTeam: null,
      currentTab: null,
      tabs: ['Select team', 'Create New'],
      numberOfPlayers: generateNumberOfPlayers(8)
    };
  },
  setup(props, { root: { $store } }) {
    const { gameId } = toRefs(props);

    const uniqueRule = (list, isOnly) => [
      field => uniqueField(field, getNames(list), isOnly)
    ];

    const getGameTeams = () =>
      $store.getters['teams/getGameTeams'](gameId.value);

    const gameTeams = computed(() => (gameId.value ? getGameTeams() : null));

    return {
      gameTeams,
      uniqueRule
    };
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('games', ['games']),
    ...mapState('teams', ['teams']),
    ...mapGetters('games', ['getGame']),
    ...mapGetters('teams', ['getTeam']),
    game() {
      return this.games ?? this.getGame(this.gameId);
    },
    isCoop() {
      return this.game ? this.game.coop || this.coop : null;
    },
    isSelectTeamTab() {
      return this.currentTab === 'tab-0';
    },
    filteredTeams() {
      let teamNames =
        this.gameTeams &&
        this.gameTeams.map(team => {
          return team.name;
        });

      return this.teams
        ? this.teams.filter(item => !teamNames.includes(item.name))
        : [];
    }
  },
  methods: {
    ...mapActions('teams', ['createTeam', 'updateTeam']),
    setPlayers($ev) {
      let myName = this.user?.username ? this.user.username : 'Me';
      this.players = [{ name: myName, isMe: true }];
      for (let i = 1; i < $ev; i++) {
        let player = { name: '' };
        this.players.push(player);
      }
      if ($ev === 1) this.coop = true;
    },
    updatePlayers() {
      this.playerRules = [
        ...this.playerRules,
        ...this.uniqueRule(this.players)
      ];
    },
    submitTeam() {
      if (this.name || this.selectedTeam) {
        this.selectedTeam ? this.addExistingTeam() : this.createNewTeam();
      }
      this.resetForm();
    },
    resetForm() {
      this.team = null;
      this.name = '';
      this.numberOfPlayers = generateNumberOfPlayers(8);
      this.selectedTeam = null;
    },
    createNewTeam() {
      const team = {
        games: [this.gameId],
        gameName: this.game.name,
        name: this.name,
        coop: this.isCoop,
        players: this.players
      };
      this.createTeam(team);
    },
    addExistingTeam() {
      const team = this.getTeam(this.selectedTeam);
      const payload = {
        _id: this.selectedTeam,
        games: [...team.games, this.gameId]
      };
      this.updateTeam(payload);
    }
  }
};
</script>
