<template>
  <section class="round-add">
    <the-dialog activator-icon="plus" header="Add new round" :submit-logic="onSubmit">
      <v-row>
        <v-col cols="6">
          <v-radio-group
            v-if="team.coop"
            label="Result:"
            class="mb-4"
            :rules="fieldRules"
            v-model="result"
          >
            <v-radio label="Defeat" value="DEFEAT"></v-radio>
            <v-radio label="Victory" value="VICTORY"></v-radio>
          </v-radio-group>
          <v-radio-group label="Result:" v-else class="mb-4" :rules="fieldRules" v-model="result">
            <v-radio v-for="{name} in team.players" :key="name" :label="name" :value="name"></v-radio>
            <v-radio label="Tie" value="tie"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="6">
          <v-radio-group
            v-if="team.players.length > 1"
            label="First turn:"
            class="mb-4"
            v-model="turn"
          >
            <v-radio v-for="{name} in team.players" :key="name" :label="name" :value="name"></v-radio>
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
          <template #activator-icon="{ on }">
            <v-text-field
              v-model="date"
              :rules="fieldRules"
              label="Date"
              prepend-icon="mdi-calendar"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="datepicker = false"></v-date-picker>
        </v-menu>
      </v-row>
      <v-row>
        <v-textarea
          class="comment"
          label="Comment"
          v-model.trim="comment"
          auto-grow
          filled
          clearable
          prepend-icon="mdi-comment"
        ></v-textarea>
      </v-row>
    </the-dialog>
  </section>
</template>

<script>
import {
  requiredField,
  tooLongField,
  onlyWhitespaces
} from "@/utils/validations";
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    teamId: {
      type: String,
      required: true
    },
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      datepicker: false,
      comment: "",
      turn: "",
      result: null,
      date: new Date().toISOString().substr(0, 10),
      fieldRules: [requiredField, tooLongField, onlyWhitespaces]
    };
  },
  computed: {
    ...mapGetters("teams", ["getTeam"]),
    team() {
      return this.getTeam(this.teamId);
    }
  },
  methods: {
    ...mapActions("rounds", ["createRound"]),
    onSubmit() {
      const round = this.cookRound();
      this.createRound(round);
    },
    cookRound() {
      const round = {
        date: this.date,
        turn: this.turn,
        gameId: this.gameId,
        teamId: this.teamId,
        comment: this.comment,
        winner: this.result.toLowerCase()
      };
      if (this.team.coop) {
        round.result = this.result;
      } else if (this.result === "tie") {
        round.tie = "TIE";
      }
      return round;
    }
  }
};
</script>
