<template>
  <BaseDialog
    activator-icon="plus"
    header="Add team"
    button-text="Add team"
    @submit="submitTeam"
  >
    <v-tabs v-model="currentTab" @change="reset">
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
          :rules="currentTab === 'tab-0' ? selectRules : []"
          item-text="name"
          item-value="_id"
          label="Team"
          autofocus
        />
      </v-tab-item>
      <v-tab-item value="tab-1">
        <v-text-field
          v-model.trim="name"
          clearable
          :rules="currentTab === 'tab-1' ? nameRules : []"
          prepend-icon="mdi-account-group-outline"
          label="Name"
          autofocus
        />
        <v-select
          prepend-icon="mdi-account-multiple-plus-outline"
          :items="numberOfPlayers"
          :rules="currentTab === 'tab-1' ? selectRules : []"
          label="Number of players"
          autofocus
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
            :rules="currentTab === 'tab-1' && !player.isMe ? playerRules : []"
            :label="`Player #${i + 1}`"
            @input="updatePlayers"
            autofocus
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
import { getNames, generateNumberOfPlayers } from "@/use/common";
import { requiredField, standardField, uniqueField } from '@/use/validations'
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
      numberOfPlayers: generateNumberOfPlayers()
    }
  },
  setup(props, ctx) {

    const uniqueRule = (list, isOnly) => [field => uniqueField(field, getNames(list), isOnly)]

    const store = ctx.root.$store

    const getGameTeams = () => store.getters['teams/getGameTeams'](props.gameId)

    const gameTeams = computed(() => (props.gameId ? getGameTeams() : null))

    return {
      gameTeams,
      uniqueRule
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
      this.nameRules = [...this.nameRules, ...this.uniqueRule(this.teams, true)]
      if (!this.user?.username) return
      const name = this.user.username ? this.user.username : 'Me'
      this.players.push({ name })
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
    updatePlayers($ev) {
      this.playerRules = [...this.playerRules, ...this.uniqueRule(this.players)]
    },
    submitTeam() {
      if(this.name || this.selectedTeam) {
      this.selectedTeam ? this.addExistingTeam() : this.createNewTeam()
      }
      this.reset()
    },
    reset() {
    this.team = null
    this.name = ''
    this.numberOfPlayers = generateNumberOfPlayers()
    this.selectedTeam = null
    this.setInitialPlayer()
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
