<template>

  <the-dialog
    activator-icon="plus"
    header="Add team"
    button-text="Add team"
    :submit-logic="onSubmit"
  >
    <v-tabs v-model="tab">
      <v-tabs-slider color="secondary" />
      <v-tab
        v-for="(tabItem, i) in tabs"
        :key="tabItem.name"
        :href="`#tab-${i}`"
      >
        <span class="mt-2">{{ tabItem.name }}</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <!-- TODO: rename tabs with meaningful names -->
      <v-tab-item value="tab-select">
        <v-select
          v-model="selectedTeam"
          prepend-icon="mdi-account-multiple-plus"
          :items="teams"
          :rules="selectRules"
          item-text="name"
          item-value="_id"
          label="Team"
        />
      </v-tab-item>
      <v-tab-item value="tab-create">
        <v-text-field
          v-model.trim="name"
          clearable
          :rules="nameRules"
          prepend-icon="mdi-account-group"
          label="Name"
        />
        <v-select
          prepend-icon="mdi-account-multiple-plus"
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
            prepend-icon="mdi-account"
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
  </the-dialog>
</template>

<script>
import { requiredField, standardField } from '@/utils/validations'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: "TeamAddDialog",
  props: {
    gameId: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      name: '',
      coop: false,
      players: [],
      nameRules: [...standardField, requiredField],
      playerRules: [...standardField, requiredField],
      selectRules: [requiredField],
      selectedTeam: null,
      tab: null,
      tabs: [
        {
          name: 'Select team',
          href: 'tab-select',
        },
        {
          name: 'Create New',
          href: 'tab-create',
        },
      ],
      // Generates number of players from 1 to N
      numberOfPlayers: Array(8)
        .join(0)
        .split(0)
        .map((v, i) => i + 1),
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('games', ['games']),
    ...mapState('teams', ['teams']),
    ...mapGetters('games', ['getGame',]),
    ...mapGetters('teams', ['getTeam']),
    game () {
      return this.games ?? this.getGame(this.gameId)
    },
    isCoop () {
      return this.game ? this.game.coop || this.coop : null
    },
  },
  created () {
    this.setInitialPlayer()
  },
  methods: {
    ...mapActions('teams', ['createTeam', 'updateTeam']),
    setInitialPlayer () {
      if (this.user?.username) {
        const name = this.user.username ? this.user.username : 'Me'
        this.players.push({ name })
      }
    },
    setPlayers ($ev) {
      let myName = this.user.username ? this.user.username : "Me"
      this.players = [{ name: myName, isMe: true }]
      for (let i = 1; i < $ev; i++) {
        let player = { name: '' }
        this.players.push(player)
      }
      if ($ev === 1) this.coop = true
    },
    isUniqueName ($ev) {
      let duplicatedPlayerName = this.players.filter(
        (player) => player.name === $ev
      )
      const isDuplicated =
        duplicatedPlayerName.length < 2 || 'This field should be unique'
      this.playerRules = [...this.playerRules, isDuplicated]
    },
    onSubmit () {
      this.selectedTeam ? this.addExistingTeam() : this.createNewTeam()
    },
    createNewTeam () {
      const team = {
        games: [this.gameId],
        gameName: this.game.name,
        name: this.name,
        coop: this.isCoop,
        players: this.players,
      }
      this.createTeam(team)
    },
    addExistingTeam () {
      const team = this.getTeam(this.selectedTeam)
      const payload = {
        _id: this.selectedTeam,
        games: [...team.games, this.gameId]
      }
      this.updateTeam(payload)
    }
  },
}
</script>

<style scoped lang="scss">
.v-tabs-items {
  padding: 20px;
}
</style>

