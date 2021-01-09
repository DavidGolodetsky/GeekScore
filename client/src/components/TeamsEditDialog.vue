<template>
  <the-dialog
    activator-icon="pencil"
    color="#fff"
    header="Edit team info"
    simple
    :submit-logic="onSubmit"
  >
    <v-text-field v-model="name" clearable :rules="nameRules" label="Name" />
    <v-switch
      v-model="toDelete"
      label="Delete team"
      color="error"
      hide-details
    />
  </the-dialog>
</template>

<script lang="ts">
import { standardField, requiredField } from "@/use/validations";
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  name: "TeamsEditDialog",
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  setup(props, ctx) {
    const store = ctx.root.$store;

    //DATA
    const name = ref(props.team.name);
    const toDelete = ref(false);
    const nameRules = [...standardField, requiredField];

    //FUNCTIONS
    const updateTheTeam = () => {
      const team = {
        _id: props.team._id,
        gameId: props.team.gameId,
        name: name.value,
      };
      store.dispatch("teams/updateTeam", team);
    };

    const onSubmit = () => {
      if (toDelete.value)
        return store.dispatch("teams/deleteTeam", props.team._id);
      updateTheTeam();
    };

    return { name, toDelete, nameRules, onSubmit };
  },
});
</script>
