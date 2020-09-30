<template>
  <section class="the-alert">
    <transition
      appear
      name="fade-down"
    >
      <v-alert
        dismissible
        value
        :type="type"
        @input="onClose()"
      >
        {{ text }}
      </v-alert>
    </transition>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  mounted () {
    window.navigator.vibrate(300);
  },
  methods: {
    ...mapActions(['setError']),

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
