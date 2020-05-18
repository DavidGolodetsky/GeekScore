<template>
  <v-footer class="the-footer" padless>
    <v-layout justify-space-between py-2 wrap primary text-center white--text xs12>
      <v-container class="d-flex flex-wrap justify-space-between footer-text">
        <span class="mr-6">&copy; {{ new Date().getFullYear() }} — Geek Score</span>
        <span>
          Build by
          <a class="link" href="https://twitter.com/david_go__">@David_Go__</a>
        </span>
      </v-container>
    </v-layout>
  </v-footer>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.the-footer {
  .footer-text {
    font-size: 12px;
    @media #{$tablet} {
      font-size: 14px;
    }
  }
  .link {
    color: $secondary;
    margin-left: 5px;
    text-decoration: none;
  }
}
</style>