<template>
  <the-login-form :form-props="formProps" />
</template>

<script>
import TheLoginForm from "@/components/TheLoginForm";

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
        redirectLink: { name: "SignUpPage" },
        redirectLinkText: "Sign Up"
      }
    };
  }
};
</script>