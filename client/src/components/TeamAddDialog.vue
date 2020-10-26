<template>
  <the-dialog
    activator-icon="plus"
    header="Add new team"
    button-text="New team"
    :submit-logic="onSubmit"
  >
    <v-text-field
      v-model.trim="name"
      clearable
      :rules="nameRules"
      prepend-icon="mdi-account-group"
      label="Name"
    />
    <v-select
      prepend-icon="mdi-account-multiple-plus"
      :rules="selectRules"
      :items="numberOfPlayers"
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
      players: [{ name: 'Me' }],
      nameRules: standardField,
      playerRules: standardField,
      selectRules: [requiredField],
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
    ...mapGetters('games', ['getGame']),
    game () {
      return this.games ? this.getGame(this.gameId) : null
    },
    isCoop () {
      return this.game ? this.game.coop || this.coop : null
    },
  },
  methods: {
    ...mapActions('teams', ['createTeam']),
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
      const team = {
        games: [this.gameId],
        gameName: this.game.name,
        name: this.name,
        coop: this.isCoop,
        players: this.players,
      }
      this.createTeam(team)
    },
  },
}
</script>
