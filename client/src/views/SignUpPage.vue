<template>
  <the-login-form :form-props="formProps" />
</template>

<script>
import TheLoginForm from "@/components/TheLoginForm";

export default {
  name: "SignUpPage",
  components: {
    TheLoginForm
  },
  data () {
    return {
      formProps: {
        title: "Sign Up",
        icon: "account-circle",
        redirectText: "Already have account?",
        redirectLink: { name: "SignInPage" },
        redirectLinkText: "Sign In",
        SignUpPage: true
      }
    };
  }
};
</script>
