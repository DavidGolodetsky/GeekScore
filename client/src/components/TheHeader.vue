<template>
  <div>
    <v-app-bar app color="primary" dense dark>
      <v-container class="d-flex align-center app-container space-between">
        <the-go-back v-if="backTitle" :title="backTitle" />
        <router-link v-else class="d-flex align-center" :to="{ name: 'home' }">
          <v-img class="mr-1" :src="require(`@/assets/img/logo.svg`)" height="35" width="35"></v-img>
          <span class="header-title">Geek Score</span>
        </router-link>
        <v-spacer />
        <template v-if="user">
          <div class="d-none d-sm-flex">
            <v-btn
              v-for="(item, index) in navItems"
              :key="index"
              :small="$vuetify.breakpoint.smOnly"
              :to="item.link"
              text
              rounded
            >
              <v-icon left>mdi-{{ item.icon }}</v-icon>
              {{ item.text }}
            </v-btn>
            <v-btn :small="$vuetify.breakpoint.smOnly" text rounded @click="onLogout">
              <v-icon>mdi-logout</v-icon>Log out
            </v-btn>
          </div>
          <v-app-bar-nav-icon class="d-sm-none" @click.stop="sideNav = !sideNav"></v-app-bar-nav-icon>
        </template>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer app right dark fixed temporary v-model="sideNav">
      <v-list>
        <v-list-item :to="item.link" v-for="(item, index) in navItems" :key="index">
          <v-list-item-icon>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>{{ item.text }}</v-list-item-content>
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
    ...mapGetters("user", ["user"]),
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
      if (this.$route.fullPath === "/") {
        this.sideNav = false;
      }
      this.logout();
    }
  }
};
</script>
