<template>
  <v-footer class="the-footer" padless>
    <v-layout primary white--text>
      <v-container>
        <span class="mr-6" data-test-copy>&copy; {{ copyright }}</span>
        <div>
          By
          <a
            class="link"
            href="https://twitter.com/dvdgld"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span class="mr-2">@dvdgld</span>
          </a>
        </div>
      </v-container>
    </v-layout>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'TheFooter',
  setup() {
    const currentYear = new Date().getFullYear();
    const copyright = `2020 - ${currentYear}`;

    return {
      copyright
    };
  }
});
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
