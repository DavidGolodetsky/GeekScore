<template>
  <section>
    <!-- TODO:add cta to update profile info -->
    <the-title title="Profile" icon="account-details-outline" />
    <div v-if="isUsername" class="d-flex mb-4">
      <span class="mr-3">Username:</span>
      <span>{{ user.user.username }}</span>
    </div>
    <div v-if="winRates && Object.keys(winRates).length" class="mb-7">
      <h3 class="mb-3">Win rates</h3>
      <ol class="columns">
        <li v-for="(rate, game) in winRates" :key="game">
          <span class="mr-3">{{ game }}:</span>
          <span>{{ rate }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from '@vue/composition-api';

export default defineComponent({
  name: 'Profile',
  components: {
    TheTitle: () => import('@/components/TheTitle.vue')
  },
  setup(_, ctx) {
    const store = ctx.root.$store;
    const user = store.state.user;

    const isUsername = computed(() => user.user?.username);
    const winRates = computed(() => user.winRates);

    const loadWinRates = () => store.dispatch('user/loadWinRates');

    onMounted(() => {
      loadWinRates();
    });

    return {
      user,
      winRates,
      isUsername
    };
  }
});
</script>
