<template>
  <section class="the-alert">
    <transition
      appear
      name="fade-down"
    >
      <v-alert
        dismissible
        value
        :type="alertType"
        @input="onClose()"
      >
        {{ alertText }}
      </v-alert>
    </transition>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "TheAlert",
  props: {
    alertType: {
      type: String,
      required: true,
    },
    alertText: {
      type: String,
      required: true,
    },
  },
  mounted () {
    this.vibrate()

  },
  methods: {
    ...mapActions(['setError']),
    // TODO:extract to utilities composable api
    vibrate (time = 300) {
      if (window.innerWidth < 600) {
        window.navigator.vibrate(time);
      }
    },

    onClose () {
      this.setError();
      this.$emit('dismissed');
    },
  },
};
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
