<template>
  <TheLoginForm :form-props="formProps" />
</template>

<script lang="ts">
import { AuthForm } from '@/types';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'SignUpPage',
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
