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
import { standardField, requiredField, linkField, uniqueField } from '@/use/validations';
import { defineComponent, ref, toRefs, reactive } from '@vue/composition-api';

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
    const { game } = toRefs(props);

    const getGameNames = () => {
      return store.state.games.games?.map((g: Game) => {return g.name});
    }
    const checkUnique = (v: any) => {
      return uniqueField(v, getGameNames())
    }

    const fields = reactive({
      name: {
        label: 'Name',
        icon: 'dice-multiple-outline',
        value: game.value.name,
        rules: [...standardField, requiredField, checkUnique]
      },
      bggURL: {
        label: 'Board geek game URL',
        icon: 'cards-outline',
        // TODO:refactor
        value: game.value.bggURL === undefined ? '' : game.value.bggURL,
        rules: [linkField]
      },
      melodiceURL: {
        label: 'Melodice URL',
        icon: 'music-outline',
        value:
          game.value.melodiceURL === undefined ? '' : game.value.melodiceURL,
        rules: [linkField]
      },
      rulesURL: {
        label: 'Rules URL',
        icon: 'book-open-variant-outline',
        value: game.value.rulesURL === undefined ? '' : game.value.rulesURL,
        rules: [linkField]
      },
      imageUrl: {
        label: 'Image URL',
        icon: 'image-outline',
        value: game.value.imageUrl === undefined ? '' : game.value.imageUrl,
        rules: [linkField]
      }
    });

    const submitGame = () => {
      if (toDelete.value)
        return store.dispatch('games/deleteGame', game.value._id);
      updateTheGame();
    };

    const updateTheGame = () => {
      const updatedGame = {
        _id: game.value._id,
        name: fields.name.value,
        bggURL: fields.bggURL.value,
        melodiceURL: fields.melodiceURL.value,
        rulesURL: fields.rulesURL.value,
        imageUrl: fields.imageUrl.value
      };
      return store.dispatch('games/updateGame', updatedGame);
    };

    return { toDelete, fields, submitGame, updateTheGame };
  }
});
</script>
