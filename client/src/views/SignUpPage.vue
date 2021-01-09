<template>
  <the-login-form :form-props="formProps" />
</template>

<script>
import TheLoginForm from "@/components/TheLoginForm.vue";

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
        redirectLink: { name: "signIn" },
        redirectLinkText: "Sign In",
        signUp: true
      }
    };
  }
};
</script>
