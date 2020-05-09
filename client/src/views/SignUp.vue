<template>
  <div>
    <the-alert v-if="error" type="error" @dismissed="onDismiss" key="singup" :text="error.message" />
    <login-form class="mt-12" signup-mode>
      <template #title>
        <div class="d-flex align-items-center">
          <v-icon class="mr-3">mdi-account-circle</v-icon>
          <h3 class="app-headline">Sign Up</h3>
        </div>
      </template>
      <template #forgot>
        <div class="text-center mb-3">
          <router-link :to="{ name: 'resetPass' }" class="link">Forgot password?</router-link>
        </div>
      </template>
      <template #redirect>
        <div class="text-center mb-3">
          <span class="mr-3">Already have account?</span>
          <router-link :to="{ name: 'signIn' }" class="link">Sign In</router-link>
        </div>
      </template>
    </login-form>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["clearError", "clearBackTitle"]),
    onDismiss() {
      this.clearError();
    }
  },
  watch: {
    user(value) {
      if (value) {
        this.$router.push("/games");
      }
    }
  },
  computed: {
    ...mapGetters("user", ["user"]),
    ...mapGetters(["error"])
  },
  created() {
    this.clearBackTitle();
  },
  beforeDestroy() {
    this.onDismiss();
  }
};
</script>
