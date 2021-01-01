<template>
  <v-footer
    class="the-footer"
    padless
  >
    <v-layout
      primary
      white--text
    >
      <v-container>
        <span
          class="mr-6"
          data-test-copy
        >&copy; {{ copyright }}</span>
        <a
          class="link"
          href="https://github.com/DavidGolodetsky/GeekScore-2"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span class="mr-2">Repo</span>
          <v-icon
            size="18"
            dark
          >mdi-code-tags</v-icon>
        </a>
      </v-container>
    </v-layout>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'TheFooter',
  setup() {
    const copyright = `2020 - ${new Date().getFullYear()}`

    return {
      copyright
    }
  }
})
</script>

<style scoped lang="scss">
.the-footer {
  .layout {
    justify-content: space-between;
    flex-wrap: wrap;
    padding: $space-base 0;
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