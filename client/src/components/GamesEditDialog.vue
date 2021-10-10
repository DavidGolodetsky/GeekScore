<template>
  <BaseDialog
    activator-icon="pencil"
    color="#fff"
    header="Edit game info"
    simple
    @submit="submitGame"
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
    <v-switch
      v-model="toDelete"
      label="Delete game"
      color="error"
      hide-details
    />
  </BaseDialog>
</template>

<script>
import { standardField, requiredField, linkField } from '@/use/validations'
import { mapActions } from 'vuex'

export default {
  name: 'GamesEditDialog',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      toDelete: false,
      fields: {
        name: {
          label: 'Name',
          icon: 'dice-multiple',
          value: this.game.name,
          rules: [...standardField, requiredField]
        },
        bggURL: {
          label: 'Board geek game URL',
          icon: 'cards',
          // TODO:refactor
          value: this.game.bggURL === undefined ? '' : this.game.bggURL,
          rules: [linkField]
        },
        melodiceURL: {
          label: 'Melodice URL',
          icon: 'music',
          value:
            this.game.melodiceURL === undefined ? '' : this.game.melodiceURL,
          rules: [linkField]
        },
        rulesURL: {
          label: 'Rules URL',
          icon: 'book-open-variant',
          value: this.game.rulesURL === undefined ? '' : this.game.rulesURL,
          rules: [linkField]
        },
        imageUrl: {
          label: 'Image URL',
          icon: 'image',
          value: this.game.imageUrl === undefined ? '' : this.game.imageUrl,
          rules: [linkField]
        }
      }
    }
  },
  methods: {
    ...mapActions('games', ['updateGame', 'deleteGame']),
    submitGame() {
      if (this.toDelete) return this.deleteGame(this.game._id)
      this.updateTheGame()
    },
    updateTheGame() {
      const game = {
        _id: this.game._id,
        name: this.fields.name.value,
        bggURL: this.fields.bggURL.value,
        melodiceURL: this.fields.melodiceURL.value,
        rulesURL: this.fields.rulesURL.value,
        imageUrl: this.fields.imageUrl.value
      }
      this.updateGame(game)
    }
  }
}
</script>
