<template>
  <section>
    <h1>Not Found</h1>
    <p>
      Ooops couldn't find this page. Try to go
      <router-link class="link" :to="{ name: 'home' }">home</router-link>
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NotFoundPage'
});
</script>
