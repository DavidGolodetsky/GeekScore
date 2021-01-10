<template>
  <section
    class="home-page"
    aria-labelledby="greeting"
  >
    <h1
      id="greeting"
      class="app-headline text-center mb-6"
    >
      Welcome to Geek Score!
    </h1>
    <v-timeline
      class="mb-10"
      dark
      align-top
      :dense="$vuetify.breakpoint.smAndDown"
    >
      <v-timeline-item
        v-for="{title, icon, text} in demoSteps"
        :key="title"
        color="secondary"
        :icon="`mdi-${icon}`"
        fill-dot
      >
        <v-card
          color="silver"
          light
        >
          <v-card-title class="title">
            {{ title }}
          </v-card-title>
          <v-card-text class="white text--primary">
            <p>{{ text }}</p>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <div class="row_center">
      <v-btn
        class="submit-btn"
        ripple
        type="submit"
        :to="{name: loggedInUser ? 'games' : 'signIn'}"
      >
        {{ loggedInUser ? 'Games' : 'Sign In' }}
      </v-btn>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

export default defineComponent({
  name: 'HomePage',
  setup(_, ctx) {
    // TODO:rewrite with useStore later
    const store = ctx.root.$store

    const loggedInUser = computed(() => store.state.user.user)

    const demoSteps = [
      {
        title: 'Games',
        text:
          'Add your favorite board games. Add more info about this awesome game!',
        color: 'warning',
        icon: 'dice-multiple'
      },
      {
        title: 'Teams',
        text:
          'Create team of buddies to dive in the world of board games! You can add as many teams per game as you want.',
        color: 'accent',
        icon: 'account-group'
      },
      {
        title: 'Rounds',
        text:
          'When team is ready to play - roll the dice! Add result of your game to rounds table which is there per team in this game.',
        color: 'info',
        icon: 'sword-cross'
      },
      {
        title: 'Statistics',
        text: 'Check out statistics - see who is the best!',
        color: 'success',
        icon: 'chart-bar'
      }
    ]

    // TODO:figure out how to use map helpers with vuex

    return {
      loggedInUser,
      demoSteps
    }
  }
})
</script>


