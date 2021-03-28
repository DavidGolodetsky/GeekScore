<template>
  <BaseDialog
    activator-icon="pencil"
    color="#fff"
    header="Edit team info"
    simple
    :submit-logic="onSubmit"
  >
    <v-text-field
      v-model="name"
      clearable
      :rules="nameRules"
      label="Name"
    />
    <v-switch
      v-model="toDelete"
      label="Delete team"
      color="error"
      hide-details
    />
  </BaseDialog>
</template>

<script lang="ts">
import { standardField, requiredField } from '@/use/validations'
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

export default defineComponent({
  name: 'TeamsEditDialog',
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  setup(props, ctx) {
    const store = ctx.root.$store

    const state = reactive({
      name: props.team.name,
      toDelete: false,
      nameRules: [...standardField, requiredField]
    })

    const updateTeam = () => {
      const team = {
        _id: props.team._id,
        gameId: props.team.gameId,
        name: state.name
      }
      store.dispatch('teams/updateTeam', team)
    }

    const onSubmit = () => {
      if (state.toDelete) {
        store.dispatch('teams/deleteTeam', props.team._id)
      } else {
        updateTeam()
      }
    }

    return {
      onSubmit,
      ...toRefs(state)
    }
  }
})
</script>
