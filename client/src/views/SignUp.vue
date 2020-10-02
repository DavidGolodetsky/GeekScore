<template>
  <login-form :form-props="formProps" />
</template>

<script>
import LoginForm from "@/components/LoginForm";

export default {
  name: "SignUp",
  components: {
    LoginForm
  },
  data() {
    return {
      formProps: {
        title: "Sign Up",
        icon: "account-circle",
        redirectText: "Already have account?",
        redirectLink: { name: "signIn" },
        redirectLinkText: "Sign In",
        signUp: true
      }
    };
  }
};
</script>
