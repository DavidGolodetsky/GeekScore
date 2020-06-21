<template>
  <the-dialog
    activator-icon="plus"
    header="Add new team"
    button-text="New team"
    :submit-logic="onSubmit"
  >
    <v-text-field
      clearable
      :rules="fieldRules"
      prepend-icon="mdi-account-group"
      label="Name"
      v-model.trim="name"
    ></v-text-field>
    <v-select
      prepend-icon="mdi-account-multiple-plus"
      :rules="selectRules"
      :items="numberOfPlayers"
      @change="setPlayers"
      label="Number of players"
    ></v-select>
    <v-text-field
      v-for="(player, i) in players"
      v-model.trim="player.name"
      :readonly="isMe(player)"
      :clearable="!isMe(player)"
      prepend-icon="mdi-account"
      :rules="playerRules"
      :key="i"
      :label="`Player #${i + 1}`"
    ></v-text-field>
    <v-switch v-if="!game.coop" v-model="coop" label="Cooperative" color="secondary" hide-details></v-switch>
  </the-dialog>
</template>

<script>
import {
  requiredField,
  onlyWhitespaces,
  tooLongField,
  uniqueField
} from "@/utils/validations";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: "",
      coop: false,
      numberOfPlayers: [1, 2, 3, 4, 5, 6, 7, 8],
      players: null,
      fieldRules: [requiredField, tooLongField, onlyWhitespaces],
      playerRules: [requiredField, tooLongField, onlyWhitespaces, uniqueField],
      selectRules: [requiredField]
    };
  },
  computed: {
    ...mapGetters("games", ["getGame"]),
    game() {
      return this.getGame(this.gameId);
    }
  },
  methods: {
    ...mapActions("teams", ["createTeam"]),
    setPlayers(event) {
      this.players = [{ name: "Me" }];
      for (let i = 1; i < event; i++) {
        let player = { name: "" };
        this.players.push(player);
      }
      event === 1 ? (this.coop = true) : "";
    },
    isMe(player) {
      return player.name === "Me" ? true : false;
    },
    setCoop() {
      let coop;
      if (this.players.length === 1) {
        coop = true;
      } else {
        coop = this.coop || this.game.coop;
      }
      return coop;
    },
    onSubmit() {
      const team = {
        games: [this.gameId],
        gameName: this.game.name,
        name: this.name,
        coop: this.setCoop(),
        players: this.players
      };
      this.createTeam(team);
    }
  }
};
</script>
