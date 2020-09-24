<template>
  <v-app
    v-cloak
    v-scroll="onScroll"
    class="app"
  >
    <the-header />
    <v-main>
      <v-container class="app-container">
        <the-alert
          v-if="showAlert"
          :type="alertType"
          :text="alertText"
        />
        <transition
          name="slide"
          mode="out-in"
        >
          <router-view />
        </transition>
        <div
          v-if="loading"
          class="loader-wrap"
        >
          <v-progress-circular
            :size="50"
            indeterminate
            color="secondary"
          />
        </div>
        <v-btn
          v-if="showTop"
          class="go-top"
          aria-label="Go to top"
          dark
          fab
          @click="$vuetify.goTo(0, options)"
        >
          <v-icon dark>mdi-chevron-up</v-icon>
        </v-btn>
      </v-container>
    </v-main>
    <the-footer />
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
import TheAlert from "@/components/TheAlert";
import { mapState, mapActions, mapGetters } from "vuex";
import { VueOfflineMixin } from "vue-offline";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    TheAlert
  },
  mixins: [VueOfflineMixin],
  data: () => ({
    showTop: false,
    offlineText: "Geek Score is offline. Some features might be disabled",
    options: {
      duration: 300,
      offset: 0,
      easing: "easeInOutCubic"
    }
  }),
  computed: {
    ...mapGetters(["loading", "error"]),
    // TODO: do we need this?
    ...mapState("user", ["user"]),
    showAlert () {
      return this.isOffline || this.error;
    },
    alertType () {
      return this.isOffline ? "warning" : "error";
    },
    alertText () {
      return this.isOffline ? this.offlineText : this.error.message;
    }
  },
  watch: {
    showAlert (val) {
      if (val) setTimeout(() => (this.setError()), 10000);
    }
  },
  methods: {
    ...mapActions(["setError"]),
    onScroll () {
      if (window.pageYOffset > 500) this.showTop = true;
      if (this.showTop && window.pageYOffset < 500) this.showTop = false;
    }
  }
};
</script>

<style scoped lang="scss">
.app {
  .loader-wrap {
    width: 100%;
    z-index: 1000;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .go-top {
    position: fixed;
    z-index: 10;
    opacity: 0.8;
    transition: 0.3;
    right: 10px;
    bottom: 20px;
    background-color: lighten($primary, 15%);
    @media #{$tablet} {
      right: 50px;
      bottom: 80px;
    }
  }
}
</style>
