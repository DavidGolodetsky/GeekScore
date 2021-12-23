<template>
  <BaseDialog
    activator-icon="pencil-outline"
    color="#607d8b"
    header="Edit round info"
    simple
    @submit="submitRound"
  >
    <v-switch
      v-model="toDelete"
      label="Delete round"
      color="error"
      hide-details
    />
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'RoundsEditDialog',
  props: {
    round: {
      type: Object,
      required: true
    }
  },
  setup(props, { root: { $store } }) {
    const { round }: any = toRefs(props);

    const toDelete = ref(false);

    const submitRound = () => {
      if (!toDelete.value) return;
      $store.dispatch('rounds/deleteRound', round.value._id);
    };

    return {
      submitRound,
      toDelete
    };
  }
});
</script>
