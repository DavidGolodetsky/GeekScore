<template>
  <BaseDialog activator-icon="plus" header="Add new game" @submit="submitGame">
    <v-text-field
      v-model.trim="name"
      clearable
      :rules="nameRules"
      prepend-icon="mdi-dice-multiple-outline"
      label="Name"
    />
    <v-switch
      v-model="coop"
      label="Cooperative"
      color="secondary"
      hide-details
    />
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import { standardField, requiredField, uniqueField } from '@/use/validations';

export default defineComponent({
  name: 'GamesAddDialog',
  setup(_, { root: { $store } }) {
    const gamesNames = computed(() => $store.getters['games/getGamesNames']());

    const checkUnique = (v: string) => uniqueField(v, gamesNames.value, true);

    const name = ref('');

    const coop = ref(false);
    const nameRules = ref([...standardField, requiredField, checkUnique]);

    const createGame = () => {
      const game = {
        coop: coop.value,
        name: name.value
      };
      $store.dispatch('games/createGame', game);
    };

    const submitGame = () => {
      createGame();
      name.value = '';
    };

    return {
      submitGame,
      nameRules,
      name,
      coop
    };
  }
});
</script>
