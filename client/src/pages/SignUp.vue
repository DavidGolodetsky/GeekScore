<template>
  <the-login-form :form-props="formProps" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TheLoginForm from '@/components/TheLoginForm.vue'
import { AuthForm } from '@/types'

export default defineComponent({
  name: 'SignUp',
  components: {
    TheLoginForm
  },
  setup() {
    const formProps: AuthForm = {
      title: 'Sign Up',
      icon: 'account-circle',
      redirectText: 'Already have account?',
      redirectLink: { name: 'signIn' },
      redirectLinkText: 'Sign In',
      signUp: true
    }

    return {
      formProps
    }
  }
})
</script>
