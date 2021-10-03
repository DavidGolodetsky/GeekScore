<template>
  <section class="the-alert">
    <transition appear name="fade-down">
      <v-alert dismissible value :type="alertType" @input="onClose()">
        {{ alertText }}
      </v-alert>
    </transition>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api'
import { vibrate } from '@/use/common'
export default defineComponent({
  name: 'TheAlert',
  props: {
    alertType: {
      type: String,
      required: true
    },
    alertText: {
      type: String,
      required: true
    }
  },
  setup(_, ctx) {
    const store = ctx.root.$store

    onMounted(() => vibrate())

    const setError = () => store.dispatch('setError')

    const onClose = () => {
      setError()
      ctx.emit('dismissed')
    }

    return {
      onClose
    }
  }
})
</script>

<style lang="scss">
.the-alert {
  .v-alert.warning {
    .v-alert__wrapper,
    .v-icon,
    .v-btn--icon {
      color: $primary;
    }
  }
  position: -webkit-sticky;
  position: sticky;
  top: 77px;
  z-index: 2;
}
</style>
