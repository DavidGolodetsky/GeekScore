<template>
  <v-app class="app" v-scroll="onScroll">
    <the-header />
    <v-content>
      <v-container class="app-container">
        <the-alert v-if="isOffline" type="warning" :text="offlineText" />
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
        <div v-if="loading" class="loader-wrap">
          <v-progress-circular :size="50" indeterminate color="secondary"></v-progress-circular>
        </div>
        <v-btn
          :class="{ active: showTop }"
          class="go-top"
          aria-label="Go to top"
          dark
          fab
          @click="$vuetify.goTo(0, options)"
        >
          <v-icon dark>mdi-chevron-up</v-icon>
        </v-btn>
      </v-container>
    </v-content>
    <the-footer />
  </v-app>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
import { mapGetters } from "vuex";
import { VueOfflineMixin } from "vue-offline";

export default {
  name: "App",
  mixins: [VueOfflineMixin],
  components: {
    TheHeader,
    TheFooter
  },

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
    ...mapGetters(["loading"]),
    ...mapGetters("user", ["user"])
  },
  watch: {
    user(value) {
      if (!value && this.$route.fullPath !== "/") {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onScroll() {
      if (window.pageYOffset > 500) {
        this.showTop = true;
      } else {
        this.showTop = false;
      }
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
    opacity: 0;
    transition: 0.3;
    right: 10px;
    bottom: 20px;
    background-color: lighten($primary, 15%);
    @media #{$tablet} {
      right: 50px;
      bottom: 80px;
    }
    &.active {
      transition: 0.3;
      opacity: 0.8;
    }
  }
}
</style>
