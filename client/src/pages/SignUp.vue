<template>
  <the-login-form :form-props="formProps" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { AuthForm } from '@/types';

export default defineComponent({
  name: 'SignUp',
  components: {
    TheLoginForm: () => import('@/components/TheLoginForm.vue')
  },
  setup() {
    const formProps: AuthForm = {
      title: 'Sign Up',
      icon: 'account-circle',
      redirectText: 'Already have account?',
      redirectLink: { name: 'signIn' },
      redirectLinkText: 'Sign In',
      signUp: true
    };

    return {
      formProps
    };
  }
});
</script>
