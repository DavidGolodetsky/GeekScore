<template>
  <section>
    <!-- TODO:add cta to update profile info -->
    <the-title
      title="Profile"
      icon="account-details"
    />
    <div
      v-if="isUsername"
      class="d-flex mb-4"
    >
      <span class="mr-3">Username:</span>
      <span>{{ user.username }}</span>
    </div>
    <!-- TODO:remove winRates if none -->
    <div
      v-if="winRates"
      class="mb-7"
    >
      <h3 class="mb-3">Win rates</h3>
      <ol class="columns">
        <li
          v-for="(rate, game) in winRates"
          :key="game"
        >
          <span class="mr-3">{{ game }}:</span>
          <span>{{ rate }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
import TheTitle from '@/components/TheTitle';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'ProfilePage',
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
    ...mapActions('user', ['loadWinRates']),
  },
};
</script>
