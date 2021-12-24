<template>
  <TheLoginForm :form-props="formProps" />
</template>

<script lang="ts">
import { AuthForm } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SignInPage',
  components: {
    TheLoginForm: () => import('@/components/TheLoginForm.vue')
  },
  setup() {
    const formProps: AuthForm = {
      title: 'Sign In',
      icon: 'login',
      redirectText: "Don't have account-outline yet?",
      redirectLink: { name: 'signUp' },
      redirectLinkText: 'Sign Up'
    };

    return {
      formProps
    };
  }
});
</script>
