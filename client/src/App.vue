<template>
  <v-app v-cloak v-scroll="onScroll" class="app">
    <TheHeader />
    <v-main>
      <v-container class="app-container">
        <TheAlert v-if="isAlert" v-bind="{ alertType, alertText }" />
        <transition name="slide" mode="out-in">
          <router-view />
        </transition>
        <div v-if="isLoading" class="loader-wrap">
          <v-progress-circular :size="50" indeterminate color="secondary" />
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
    <TheFooter />
  </v-app>
</template>

<script lang="ts">
import {
  defineComponent,
  // defineAsyncComponent,
  onMounted,
  ref,
  watch,
  computed
} from '@vue/composition-api';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheAlert from '@/components/TheAlert.vue';
import { setupFb } from '@/auth';
// import { VueOfflineMixin } from 'vue-offline';
// TODO: load async
// const TheAlert = defineAsyncComponent(() => import('@/components/TheAlert.vue'))

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
    TheAlert
  },
  // TODO: composition-api with mixins?
  // mixins: [VueOfflineMixin],
  setup(_, ctx) {
    const store = ctx.root.$store;

    const isGoTopBtn = ref(false);

    const isOffline = ref(false);

    const GoTopBtnOtions = ref({
      duration: 300,
      offset: 0,
      easing: 'easeInOutCubic'
    });

    onMounted(() => setupFb());

    const isLoading = computed(() => store.getters['loading']);

    const error = computed(() => store.getters['error']);

    const isAlert = computed(() => isOffline.value || error.value);

    const setError = () => store.dispatch('setError');

    watch(isAlert, val => {
      if (val) {
        setTimeout(() => setError(), 10000);
      }
    });

    const offlineMessage =
      'Geek Score is offline. Some features might be disabled';

    const alertType = computed(() => (isOffline.value ? 'warning' : 'error'));

    const alertText = computed(() =>
      isOffline.value ? offlineMessage : error.value.message
    );

    const onScroll = () => {
      if (window.pageYOffset > 500) return (isGoTopBtn.value = true);

      if (isGoTopBtn.value && window.pageYOffset < 500) {
        isGoTopBtn.value = false;
      }
    };

    return {
      alertType,
      alertText,
      isAlert,
      onScroll,
      isLoading,
      isGoTopBtn,
      isOffline,
      GoTopBtnOtions
    };
  }
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
    display: grid;
    place-items: center;
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
