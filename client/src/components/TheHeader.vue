<template>
  <div class="the-header">
    <v-app-bar
      app
      color="primary"
      dense
      dark
    >
      <v-container class="row_between app-container">
        <BaseBackBtn
          v-if="backTitle"
          :title="backTitle"
        />
        <router-link
          v-else
          class="d-flex align-center"
          :to="{ name: 'home' }"
        >
          <v-img
            class="logo"
            :src="require(`@/assets/img/logo.svg`)"
            alt="Geek Score"
          />
          <span class="header-title">Geek Score</span>
        </router-link>
        <v-spacer />
        <template v-if="user">
          <nav>
            <ul class="d-none d-sm-flex">
              <li
                v-for="{ icon, text, link } in navItems"
                :key="text"
              >
                <v-btn
                  :small="$vuetify.breakpoint.smOnly"
                  :to="link"
                  text
                >
                  <v-icon left>mdi-{{ icon }}</v-icon>
                  {{ text }}
                </v-btn>
              </li>
              <li>
                <v-btn
                  :small="$vuetify.breakpoint.smOnly"
                  text
                  @click="onLogout"
                >
                  <v-icon>mdi-logout</v-icon>Log out
                </v-btn>
              </li>
            </ul>
          </nav>
          <v-app-bar-nav-icon
            class="d-sm-none"
            @click.stop="isSideNav = !isSideNav"
          />
        </template>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-model="isSideNav"
      app
      right
      dark
      fixed
      temporary
    >
      <v-list>
        <v-list-item
          v-for="{ text, icon, link } in navItems"
          :key="text"
          :to="link"
        >
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

<script lang="ts">
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'TheHeader',

  setup(_, ctx) {
    const store = ctx.root.$store

    const route = ctx.root.$route

    const user = computed(() => store.state.user.user)

    const backTitle = computed(() => store.getters['backTitle'])

    const isSideNav = ref(false)

    const logout = () => store.dispatch('user/logout')

    const onLogout = () => {
      if (route.fullPath === '/') {
        isSideNav.value = false
      }
      logout()
    }

    const navItems = [
      {
        text: 'Games',
        icon: 'dice-multiple',
        link: '/games'
      },
      {
        text: 'Tools',
        icon: 'hammer-screwdriver',
        link: '/tools'
      },
      {
        text: 'Profile',
        icon: 'account-details',
        link: '/profile'
      }
    ]

    return {
      isSideNav,
      backTitle,
      user,
      navItems,
      onLogout
    }
  }
})
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
