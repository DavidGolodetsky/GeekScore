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
          v-if="isAlert"
          v-bind="{alertType, alertText}"
        />
        <transition
          name="slide"
          mode="out-in"
        >
          <router-view />
        </transition>
        <div
          v-if="isLoading"
          class="loader-wrap"
        >
          <v-progress-circular
            :size="50"
            indeterminate
            color="secondary"
          />
        </div>
        <v-btn
          v-if="isGoTopBtn"
          class="go-top"
          aria-label="Go to top"
          dark
          fab
          @click="$vuetify.goTo(0, GoTopBtnOtions)"
        >
          <v-icon dark>mdi-chevron-up</v-icon>
        </v-btn>
      </v-container>
    </v-main>
    <the-footer />
  </v-app>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  watch,
  computed,
  onMounted,
} from "@vue/composition-api";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheAlert from "@/components/TheAlert.vue";
// import { VueOfflineMixin } from 'vue-offline';
import { setupFb } from "@/auth";

export default defineComponent({
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    TheAlert,
  },
  // TODO: composition-api with mixins?
  // mixins: [VueOfflineMixin],
  setup(_, ctx) {
    const store = ctx.root.$store;

    const error = computed(() => store.getters["error"]);

    const state = reactive({
      isGoTopBtn: false,
      // TODO: remove after VueOfflineMixin is fixed
      isOffline: false,
      GoTopBtnOtions: {
        duration: 300,
        offset: 0,
        easing: "easeInOutCubic",
      },
      isLoading: computed(() => store.getters.loading),
    });

    const offlineMessage =
      "Geek Score is offline. Some features might be disabled";

    const alertType = computed(() => (state.isOffline ? "warning" : "error"));
    const alertText = computed(() =>
      state.isOffline ? offlineMessage : error.value.message
    );
    const isAlert = computed(() => state.isOffline || error.value);

    watch(isAlert, (val) => {
      if (val) {
        setTimeout(() => setError(), 10000);
      }
    });

    onMounted(() => setupFb());

    const onScroll = () => {
      if (window.pageYOffset > 500) {
        state.isGoTopBtn = true;
      } else if (state.isGoTopBtn && window.pageYOffset < 500) {
        state.isGoTopBtn = false;
      }
    };

    const setError = () => store.dispatch("setError");

    return {
      alertType,
      alertText,
      isAlert,
      onScroll,
      ...toRefs(state),
    };
  },
});
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
