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

<script lang="ts">
import {
  defineComponent, computed, onMounted
} from '@vue/composition-api'
import TheTitle from '../components/TheTitle.vue';

export default defineComponent({
  name: 'Profile',
  components: {
    TheTitle,
  },
  setup(_, ctx) {
    const store = ctx.root.$store
    const user = store.state.user

    const isUsername = computed(() => store.state.user.user?.username)
    const winRates = computed(() => store.state.user.winRates)

    const loadWinRates = () => (store.dispatch('user/loadWinRates'))

    onMounted(() => {
      loadWinRates()
    })

    return {
      user,
      winRates,
      isUsername
    }
  }
});
</script>
