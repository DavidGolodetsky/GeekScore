<template>
  <the-dialog
    activator="pencil"
    color="#fff"
    header="Edit game info"
    simple
    :submitLogic="onSubmit"
  >
    <v-text-field
      clearable
      :rules="fieldRules"
      prepend-icon="mdi-dice-multiple"
      label="Name"
      v-model="name"
    ></v-text-field>
    <v-text-field
      clearable
      :rules="linkRules"
      label="Board geek game URL"
      prepend-icon="mdi-cards"
      v-model="bggURL"
    ></v-text-field>
    <v-text-field
      clearable
      :rules="linkRules"
      label="Melodice URL"
      prepend-icon="mdi-music"
      v-model="melodiceURL"
    ></v-text-field>
    <v-text-field
      clearable
      :rules="linkRules"
      label="Rules URL"
      prepend-icon="mdi-book-open-variant"
      v-model="rulesURL"
    ></v-text-field>
    <v-text-field
      clearable
      :rules="linkRules"
      prepend-icon="mdi-image"
      label="Image URL"
      v-model="imageUrl"
    ></v-text-field>
    <v-img v-if="imageUrl" :src="imageUrl" height="200" contain></v-img>
    <v-switch v-model="isDelete" label="Delete game" color="error" hide-details></v-switch>
  </the-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      name: this.game.name,
      bggURL: this.game.bggURL ? this.game.bggURL : "",
      melodiceURL: this.game.melodiceURL ? this.game.melodiceURL : "",
      rulesURL: this.game.rulesURL ? this.game.rulesURL : "",
      isDelete: false,
      imageUrl: this.game.imageUrl,
      imageFile: null,
      fieldRules: [v => (!!v && v.length <= 60) || "Field is too long"],
      linkRules: [
        v => {
          if (v) {
            const link = v.match(/(https?:\/\/[^\s]+)/g);
            return !!link || "Please provide a correct link";
          } else return true;
        }
      ]
    };
  },
  methods: {
    ...mapActions("games", ["updateGame", "deleteGame"]),
    onSubmit() {
      const game = {
        name: this.name,
        imageUrl: this.imageUrl,
        id: this.game.id,
        bggURL: this.bggURL,
        melodiceURL: this.melodiceURL,
        rulesURL: this.rulesURL
      };
      if (this.isDelete) {
        this.deleteGame(game);
        return;
      }
      this.updateGame(game);
    }
  }
};
</script>
