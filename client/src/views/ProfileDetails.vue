<template>
  <section>
    <!-- TODO:add cta to update profile info -->
    <the-title
      title="Profile"
      icon="account-details"
    />
    <div
      v-if="isUsername"
      class="d-flex"
    >
      <span class="mr-3">Username:</span>
      <span>{{ user.username }}</span>
    </div>
    <div class="mb-7">
      <h3 class="mb-3">Win rates</h3>
      <ol class="columns-2">
        <li
          v-for="(rate, game) in winRates"
          :key="game"
        >
          <span class="mr-3">{{ game }}:</span>
          <span>{{ rate }}</span>
        </li>
      </ol>
    </div>
    <v-btn
      color="secondary"
      @click="onLogout"
    >
      <v-icon left>mdi-logout</v-icon>
      Logout
    </v-btn>
  </section>
</template>

<script>
import TheTitle from '@/components/TheTitle';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ProfileDetails',
  components: {
    TheTitle,
  },
  computed: {
    ...mapState('user', ['user', 'winRates']),
    isUsername () {
      return this.user && this.user.username
    }
  },
  created () {
    this.loadWinRates()
  },
  methods: {
    ...mapActions('user', ['logout', 'loadWinRates']),
    onLogout () {
      this.logout();
    },
  },
};
</script>
