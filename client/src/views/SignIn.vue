<template>
  <login-form :form-props="formProps" />
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
  components: {
    LoginForm
  },
  data() {
    return {
      formProps: {
        title: "Sign In",
        icon: "login",
        redirectText: "Don't have account yet?",
        redirectLink: { name: "signUp" },
        redirectLinkText: "Sign Up"
      }
    };
  }
};
</script>