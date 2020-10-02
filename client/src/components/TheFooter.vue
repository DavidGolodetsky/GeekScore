<template>
  <v-footer class="the-footer" padless>
    <v-layout primary white--text>
      <v-container>
        <span class="mr-6" data-test-copy>&copy; {{ copy }}</span>
        <span>
          Build by
          <a class="link" href="https://twitter.com/david_go__" target="_blank">@David_Go__</a>
        </span>
      </v-container>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  computed: {
    year() {
      const date = new Date();
      return date.getFullYear();
    },
    copy() {
      return ` ${this.year} — Geek Score`
    }
  }
};
</script>

<style scoped lang="scss">
.the-footer {
  .layout {
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 8px 0;
  }
  .container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: $app-max-width;
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