<template>
  <section class="round-add">
    <the-dialog
      v-if="team"
      activator-icon="plus"
      header="Add new round"
      :submit-logic="onSubmit"
    >
      <v-row>
        <v-col cols="6">
          <v-radio-group
            v-model="result"
            :rules="resultRules"
            label="Result:"
            class="mb-4"
          >
            <v-radio
              v-for="option in resultOptions"
              :key="option"
              :label="option"
              :value="option"
            />
          </v-radio-group>
        </v-col>
        <v-col cols="6" v-if="!team.coop">
          <v-radio-group
            v-if="team.players.length > 1"
            v-model="turn"
            label="First turn:"
            class="mb-4"
          >
            <v-radio
              v-for="{ name } in team.players"
              :key="name"
              :label="name"
              :value="name"
            />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-menu
          v-model="datepicker"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template #activator="{ on }">
            <v-text-field
              v-model="date"
              label="Date"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            />
          </template>
          <v-date-picker v-model="date" @input="datepicker = false" />
        </v-menu>
      </v-row>
      <v-row>
        <v-textarea
          v-model.trim="comment"
          class="comment"
          label="Comment"
          auto-grow
          filled
          clearable
          prepend-icon="mdi-comment"
        />
      </v-row>
    </the-dialog>
  </section>
</template>

<script>
import { requiredField } from '@/utils/validations'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'RoundAddDialog',
  // TODO:refactor
  props: {
    teamId: {
      type: String,
      required: true,
    },
    gameId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      datepicker: false,
      comment: '',
      turn: '',
      result: null,
      date: new Date().toISOString().substr(0, 10),
      resultRules: [requiredField],
    }
  },
  computed: {
    ...mapState('teams', ['teams']),
    ...mapGetters('teams', ['getTeam']),
    team() {
      return this.teams ? this.getTeam(this.teamId) : null
    },
    resultOptions() {
      if (this.team) {
        if (this.team.coop) return ['Victory', 'Defeat']
        const options = this.team.players.map((player) => player.name)
        return [...options, 'Tie']
      }
      return null
    },
  },
  methods: {
    ...mapActions('rounds', ['createRound']),
    onSubmit() {
      const round = this.cookRound()
      this.createRound(round)
    },
    cookRound() {
      const round = {
        date: this.date,
        turn: this.turn,
        gameId: this.gameId,
        teamId: this.teamId,
        comment: this.comment,
        winner: this.result.toLowerCase(),
      }
      if (this.team.coop) round.result = this.result.toUpperCase()
      // TODO: highlight result, maybe with icon, not VICTORY
      return round
    },
  },
}
</script>
