<template>
  <TheDialog
    activator-icon="plus"
    header="Add new game"
    :submit-logic="onSubmit"
  >
    <v-text-field
      v-model.trim="name"
      clearable
      :rules="nameRules"
      prepend-icon="mdi-dice-multiple"
      label="Name"
    />
    <v-switch
      v-model="coop"
      label="Cooperative"
      color="secondary"
      hide-details
    />
  </TheDialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import { standardField, requiredField } from '@/use/validations'

export default defineComponent({
  name: 'GamesAddDialog',

  setup(_, ctx) {
    const store = ctx.root.$store

    const state = reactive({
      name: '',
      coop: false,
      nameRules: [...standardField, requiredField]
    })

    const createGame = (game: any) => store.dispatch('games/createGame', game)

    const onSubmit = () => {
      const game = {
        coop: state.coop,
        name: state.name
      }
      createGame(game)
      state.name = ''
    }

    return {
      onSubmit,
      ...toRefs(state)
    }
  }
})
</script>
