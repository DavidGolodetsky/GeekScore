<template>
  <BaseDialog
    activator-icon="pencil-outline"
    color="#fff"
    header="Edit team info"
    simple
    @submit="submitTeam"
  >
    <v-text-field v-model="name" clearable :rules="nameRules" label="Name" />
    <v-switch
      v-model="toDelete"
      label="Delete team"
      color="error"
      hide-details
    />
  </BaseDialog>
</template>

<script lang="ts">
import { standardField, requiredField, uniqueField } from '@/use/validations';
import { defineComponent, computed, toRefs, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'TeamsEditDialog',
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  setup(props, { root: { $store } }) {
    const { team }: any = toRefs(props);

    const teamsNames = computed(() => $store.getters['games/getTeamsNames']());

    const checkUnique = (v: any) => {
      return v !== team.value.name
        ? uniqueField(v, teamsNames.value, true)
        : true;
    };

    const nameRules = ref([...standardField, requiredField, checkUnique]);

    const toDelete = ref(false);

    const name = ref(team.value.name);

    const updateTeam = () => {
      const teamPayload = {
        _id: team.value._id,
        gameId: team.value.gameId,
        name: name.value
      };
      $store.dispatch('teams/updateTeam', teamPayload);
    };

    const submitTeam = () => {
      if (!toDelete.value) return updateTeam();
      $store.dispatch('teams/deleteTeam', team.value._id);
    };

    return {
      submitTeam,
      nameRules,
      toDelete,
      name
    };
  }
});
</script>
