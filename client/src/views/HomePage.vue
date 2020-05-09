<template>
  <div class="home-page">
    <h1 class="app-headline text-center mb-6">Welcome to Geek Score!</h1>
    <v-timeline class="mb-10" dark align-top :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item
        v-for="(item, i) in items"
        :key="i"
        color="secondary"
        :icon="`mdi-${item.icon}`"
        fill-dot
      >
        <v-card color="silver" light>
          <v-card-title class="title">{{ item.title }}</v-card-title>
          <v-card-text class="white text--primary">
            <p>{{ item.text }}</p>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <div class="d-flex justify-center">
      <v-btn
        class="my-2 py-2 submit-btn"
        color="secondary"
        ripple
        width="100%"
        type="submit"
        :to="{name: user ? 'games' : 'signIn'}"
      >{{ user ? 'Games' : 'Sign In' }}</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    items: [
      {
        title: "Games",
        text:
          "Add your favorite board games. Add more info about this awesome game!",
        color: "warning",
        icon: "dice-multiple"
      },
      {
        title: "Teams",
        text:
          "Create team of buddies to dive in the world of board games! You can add as many teams per game as you want.",
        color: "accent",
        icon: "account-group"
      },
      {
        title: "Rounds",
        text:
          "When team is ready to play - roll the dice! Add result of your game to rounds table which is there per team in this game.",
        color: "info",
        icon: "sword-cross"
      },
      {
        title: "Statistics",
        text: "Check out statistics - see who is the best!",
        color: "success",
        icon: "chart-bar"
      }
    ]
  }),
  computed: {
    ...mapGetters("user", ["user"])
  }
};
</script>


<style scoped lang="scss">
.home-page {
  padding-top: 20px;
}
</style>
