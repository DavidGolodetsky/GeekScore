<template>
  <div>
    <h1>Not Found</h1>
    <p>
      Ooops couldn't find this page. Try to go
      <router-link class="link" :to="{name: 'home'}">home</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  created() {
    this.clearBackTitle();
  },
  methods: {
    ...mapActions(["clearBackTitle"])
  }
};
</script>