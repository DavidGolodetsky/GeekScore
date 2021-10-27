<template>
  <BaseDialog
    activator-icon="pencil-outline"
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
import { standardField, requiredField, linkField } from '@/use/validations';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'GamesEditDialog',
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const store = ctx.root.$store;
    const toDelete = ref(false);
    const fields = ref({
      name: {
        label: 'Name',
        icon: 'dice-multiple-outline',
        value: props.game.name,
        rules: [...standardField, requiredField]
      },
      bggURL: {
        label: 'Board geek game URL',
        icon: 'cards-outline',
        // TODO:refactor
        value: props.game.bggURL === undefined ? '' : props.game.bggURL,
        rules: [linkField]
      },
      melodiceURL: {
        label: 'Melodice URL',
        icon: 'music-outline',
        value:
          props.game.melodiceURL === undefined ? '' : props.game.melodiceURL,
        rules: [linkField]
      },
      rulesURL: {
        label: 'Rules URL',
        icon: 'book-open-variant-outline',
        value: props.game.rulesURL === undefined ? '' : props.game.rulesURL,
        rules: [linkField]
      },
      imageUrl: {
        label: 'Image URL',
        icon: 'image-outline',
        value: props.game.imageUrl === undefined ? '' : props.game.imageUrl,
        rules: [linkField]
      }
    });

    const submitGame = () => {
      if (toDelete.value)
        return store.dispatch('games/deleteGame', props.game._id);
      updateTheGame();
    };

    const updateTheGame = () => {
      const game = {
        _id: props.game._id,
        name: fields.value.name.value,
        bggURL: fields.value.bggURL.value,
        melodiceURL: fields.value.melodiceURL.value,
        rulesURL: fields.value.rulesURL.value,
        imageUrl: fields.value.imageUrl.value
      };
      return store.dispatch('games/updateGame', game);
    };

    return { toDelete, fields, submitGame, updateTheGame };
  }
});
</script>
