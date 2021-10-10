<template>
  <BaseDialog
    activator-icon="pencil"
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
    const { team }: any = toRefs(props)

    const store = ctx.root.$store

    const state = reactive({
      name: team.value.name,
      toDelete: false,
      nameRules: [...standardField, requiredField]
    })

    const updateTeam = () => {
      const teamPayload = {
        _id: team.value._id,
        gameId: team.value.gameId,
        name: state.name
      }
      store.dispatch('teams/updateTeam', teamPayload)
    }

    const submitTeam = () => {
      if (!state.toDelete) return updateTeam()
      store.dispatch('teams/deleteTeam', team.value._id)
    }

    return {
      submitTeam,
      ...toRefs(state)
    }
  }
})
</script>
