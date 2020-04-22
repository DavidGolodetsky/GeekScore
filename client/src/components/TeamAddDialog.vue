<template>
  <the-dialog
    activator="plus"
    header="Add new team"
    button-text="New team"
    :submitLogic="onSubmit"
  >
    <v-text-field
      clearable
      :rules="fieldRules"
      prepend-icon="mdi-account-group"
      label="Name"
      v-model="name"
    ></v-text-field>
    <v-select
      prepend-icon="mdi-account-multiple-plus"
      :rules="selectRules"
      :items="numberOfPlayers"
      @change="setPlayers"
      label="Number of players"
    ></v-select>
    <template v-if="players.length">
      <v-text-field
        v-for="(player, i) in players"
        v-model="player.name"
        :readonly="isMe(player)"
        :clearable="!isMe(player)"
        prepend-icon="mdi-account"
        :rules="fieldRules"
        :key="i"
        :label="`Player #${i + 1}`"
      ></v-text-field>
    </template>
    <v-switch
      v-if="!game.coop"
      v-model="coop"
      label="Cooperative"
      color="secondary"
      hide-details
    ></v-switch>
  </the-dialog>
</template>

<script>
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
      players: [],
      fieldRules: [
        v => !!v || "Field is required",
        v => v.length <= 40 || "Field is too long",
        v => {
          let pl = this.players.filter(player => player.name === v);
          return (!!v && pl.length < 2) || "Player name should be unique";
        }
      ],
      selectRules: [v => !!v || "Field is required"]
    };
  },
  computed: {
    ...mapGetters("games", { getGame: "game" }),
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
        gameId: this.gameId,
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
