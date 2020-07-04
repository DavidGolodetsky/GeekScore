<template>
  <section class="the-alert">
    <transition appear name="fade-down">
      <v-alert v-if="showAlert" dismissible value :type="type" @input="onClose()">{{ text }}</v-alert>
    </transition>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  // TODO:refactored
  props: {
    type: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showAlert: true
    };
  },
  mounted() {
    window.navigator.vibrate(300);
    this.autoHide();
  },
  methods: {
    ...mapActions(["setError"]),
    onClose() {
      this.showAlert = false;
      this.setError();
      this.$emit("dismissed");
    },
    autoHide() {
      setTimeout(() => (this.showAlert = false), 5000);
    }
  }
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
}
</style>
