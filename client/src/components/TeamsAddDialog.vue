<template>
  <BaseDialog
    activator-icon="plus"
    header="Add team"
    button-text="Add team"
    @submit="submitTeam"
  >
    <v-tabs v-model="currentTab" @change="resetSelectedTeam">
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
          :items="filteredTeams"
          :rules="selectedTeam ? selectRules : []"
          item-text="name"
          item-value="_id"
          label="Team"
        />
      </v-tab-item>
      <v-tab-item value="tab-1">
        <v-text-field
          v-model.trim="name"
          clearable
          :rules="nameRules"
          prepend-icon="mdi-account-group-outline"
          label="Name"
        />
        <v-select
          prepend-icon="mdi-account-multiple-plus-outline"
          :items="numberOfPlayers"
          :rules="selectRules"
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
            :rules="playerRules"
            :label="`Player #${i + 1}`"
            @input="isUniqueName"
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
import { requiredField, standardField } from '@/use/validations'
import { mapActions, mapGetters, mapState } from 'vuex'
import { computed } from '@vue/composition-api'

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
      // Generates number of players from 1 to N
      numberOfPlayers: Array(8)
        .join(0)
        .split(0)
        .map((v, i) => i + 1)
    }
  },
  setup(props, ctx) {
    const store = ctx.root.$store

    const getGameTeams = () => store.getters['teams/getGameTeams'](props.gameId)

    const gameTeams = computed(() => (props.gameId ? getGameTeams() : null))

    return {
      gameTeams
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('games', ['games']),
    ...mapState('teams', ['teams']),
    ...mapGetters('games', ['getGame']),
    ...mapGetters('teams', ['getTeam']),
    game() {
      return this.games ?? this.getGame(this.gameId)
    },
    isCoop() {
      return this.game ? this.game.coop || this.coop : null
    },
    filteredTeams() {
      let teamNames =
        this.gameTeams &&
        this.gameTeams.map(team => {
          return team.name
        })

      return this.teams
        ? this.teams.filter(item => !teamNames.includes(item.name))
        : []
    }
  },
  created() {
    this.setInitialPlayer()
  },
  methods: {
    ...mapActions('teams', ['createTeam', 'updateTeam']),
    setInitialPlayer() {
      if (!this.user?.username) return
      const name = this.user.username ? this.user.username : 'Me'
      this.players.push({ name })
    },
    resetSelectedTeam() {
      if (this.selectedTeam) this.selectedTeam = ''
    },
    setPlayers($ev) {
      let myName = this.user.username ? this.user.username : 'Me'
      this.players = [{ name: myName, isMe: true }]
      for (let i = 1; i < $ev; i++) {
        let player = { name: '' }
        this.players.push(player)
      }
      if ($ev === 1) this.coop = true
    },
    isUniqueName($ev) {
      let duplicatedPlayerName = this.players.filter(
        player => player.name === $ev
      )
      // set variable to determine which rule will be used: unique-field-rule or required-field-rule
      const playerLastRules = (duplicatedPlayerName.length > 1) ? 'This field should be unique' : requiredField
      // update the last part of player-rules
      this.playerRules[Object.keys(this.playerRules).length-1] = playerLastRules
    },
    submitTeam() {
      this.selectedTeam ? this.addExistingTeam() : this.createNewTeam()
    },
    createNewTeam() {
      const team = {
        games: [this.gameId],
        gameName: this.game.name,
        name: this.name,
        coop: this.isCoop,
        players: this.players
      }
      this.createTeam(team)
    },
    addExistingTeam() {
      const team = this.getTeam(this.selectedTeam)
      const payload = {
        _id: this.selectedTeam,
        games: [...team.games, this.gameId]
      }
      this.updateTeam(payload)
    }
  }
}
</script>
