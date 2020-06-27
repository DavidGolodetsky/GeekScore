<template>
  <the-dialog
    activator-icon="pencil"
    color="#fff"
    header="Edit game info"
    simple
    :submit-logic="onSubmit"
  >
    <v-text-field
      v-for="field in fields"
      :key="field.label"
      v-model.trim="field.value"
      clearable
      :rules="field.rules"
      :prepend-icon="`mdi-${field.icon}`"
      :label="field.label"
    />
    <v-img
      v-if="fields.imageUrl.value"
      :src="fields.imageUrl.value"
      :alt="fields.name.value"
      height="200"
      contain
    />
    <v-switch v-model="isDelete" label="Delete game" color="error" hide-details />
  </the-dialog>
</template>

<script>
import {
  standardField,
  onlyWhitespaces,
  tooLongField,
  linkField
} from "@/utils/validations";
import { mapActions } from "vuex";

export default {
  // TODO:refactored
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDelete: false,
      linkRules: [onlyWhitespaces, tooLongField, linkField],
      fields: {
        name: {
          label: "Name",
          icon: "dice-multiple",
          value: this.game.name,
          rules: standardField
        },
        bggURL: {
          label: "Board geek game URL",
          icon: "cards",
          value: this.game.bggURL || "",
          rules: this.linkRules
        },
        melodiceURL: {
          label: "Melodice URL",
          icon: "music",
          value: this.game.melodiceURL || "",
          rules: this.linkRules
        },
        rulesURL: {
          label: "Rules URL",
          icon: "book-open-variant",
          value: this.game.rulesURL || "",
          rules: this.linkRules
        },
        imageUrl: {
          label: "Image URL",
          icon: "image",
          value: this.game.imageUrl,
          rules: this.linkRules
        }
      }
    };
  },
  methods: {
    ...mapActions("games", ["updateGame", "deleteGame"]),
    onSubmit() {
      this.isDelete && this.deleteGame(this.game._id);
      this.updateTheGame();
    },
    updateTheGame() {
      const game = {
        _id: this.game._id,
        name: this.fields.name.value,
        bggURL: this.fields.bggURL.value,
        melodiceURL: this.fields.melodiceURL.value,
        rulesURL: this.fields.rulesURL.value,
        imageUrl: this.fields.imageUrl.value
      };
      this.updateGame(game);
    }
  }
};
</script>
