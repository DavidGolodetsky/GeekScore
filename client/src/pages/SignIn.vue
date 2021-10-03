<template>
  <the-login-form :form-props="formProps" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import TheLoginForm from '@/components/TheLoginForm.vue'
import { AuthForm } from '@/types'

export default defineComponent({
  name: 'SignIn',
  components: {
    TheLoginForm
  },
  setup() {
    const formProps: AuthForm = {
      title: 'Sign In',
      icon: 'login',
      redirectText: "Don't have account yet?",
      redirectLink: { name: 'signUp' },
      redirectLinkText: 'Sign Up'
    }

    return {
      formProps
    }
  }
})
</script>
