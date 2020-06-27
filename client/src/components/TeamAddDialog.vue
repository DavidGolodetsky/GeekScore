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
      :rules="fieldRules"
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
    <v-text-field
      v-for="(player, i) in players"
      :key="i"
      v-model.trim="player.name"
      :readonly="isMe"
      :clearable="!isMe"
      prepend-icon="mdi-account"
      :rules="playerRules"
      :label="`Player #${i + 1}`"
    />
    <v-switch v-if="!game.coop" v-model="coop" label="Cooperative" color="secondary" hide-details />
  </the-dialog>
</template>

<script>
import { requiredField, standardField } from "@/utils/validations";
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
      fieldRules: standardField,
      playerRules: standardField,
      selectRules: [requiredField]
    };
  },
  computed: {
    ...mapGetters("games", ["getGame"]),
    game() {
      return this.getGame(this.gameId);
    },
    isMe() {
      return this.players.length === 1 && this.players[0].name === "Me";
    }
    // TODO:finalize
    // isUniqueName() {
    //   if (this.players) {
    //     const lastName = this.players[this.players.length - 1];
    //     let pl = this.players.filter(player => player.name === lastName);
    //     return pl.length >= 2 && "This field should be unique";
    //   }
    //   return "";
    // }
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
    setCoop() {
      let coop;
      this.players.length === 1
        ? (coop = true)
        : (coop = this.coop || this.game.coop);
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
