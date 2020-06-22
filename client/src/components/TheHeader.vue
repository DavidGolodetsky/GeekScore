<template>
  <div class="the-header">
    <v-app-bar app color="primary" dense dark>
      <v-container class="d-flex align-center app-container space-between">
        <the-go-back v-if="backTitle" :title="backTitle" />
        <router-link v-else class="d-flex align-center" :to="{ name: 'home' }">
          <v-img class="logo" :src="require(`@/assets/img/logo.svg`)" alt="Geek Score"></v-img>
          <span class="header-title">Geek Score</span>
        </router-link>
        <v-spacer />
        <template v-if="getUser">
          <nav>
            <ul class="d-none d-sm-flex">
              <li v-for="{icon, text, link} in navItems" :key="text">
                <v-btn :small="$vuetify.breakpoint.smOnly" :to="link" text>
                  <v-icon left>mdi-{{ icon }}</v-icon>
                  {{ text }}
                </v-btn>
              </li>
              <li>
                <v-btn :small="$vuetify.breakpoint.smOnly" text @click="onLogout">
                  <v-icon>mdi-logout</v-icon>Log out
                </v-btn>
              </li>
            </ul>
          </nav>
          <v-app-bar-nav-icon class="d-sm-none" @click.stop="sideNav = !sideNav"></v-app-bar-nav-icon>
        </template>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer app right dark fixed temporary v-model="sideNav">
      <v-list>
        <v-list-item :to="link" v-for="{text, icon, link} in navItems" :key="text">
          <v-list-item-icon>
            <v-icon>mdi-{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ text }}</v-list-item-content>
        </v-list-item>
        <v-list-item @click="onLogout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Log out</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    ...mapGetters(["backTitle"]),
    navItems() {
      return [
        {
          text: "Games",
          icon: "dice-multiple",
          link: "/games"
        }
      ];
    }
  },
  methods: {
    ...mapActions("user", ["logout"]),
    onLogout() {
      if (this.$route.fullPath === "/") this.sideNav = false;
      this.logout();
    }
  }
};
</script>

<style scoped lang="scss">
.the-header {
  .logo {
    width: 35px;
    height: 35px;
    margin-right: 5px;
  }
}
</style>