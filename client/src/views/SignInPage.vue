<template>
  <the-login-form :form-props="formProps" />
</template>

<script>
import TheLoginForm from "@/components/TheLoginForm.vue";

export default {
  name: "SignInPage",
  components: {
    TheLoginForm
  },
  data () {
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