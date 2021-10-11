<template>
  <section>
    <v-card v-if="!isResetPasswordDone" raised outlined dark class="auth-card">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="onSubmit"
      >
        <v-card-title class="pb-10">
          <div class="d-flex align-center">
            <v-icon class="mr-3">mdi-lock-reset</v-icon>
            <h3 class="app-headline">Reset Password</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            clearable
            label="Email"
            type="email"
            prepend-icon="mdi-email-outline"
            :rules="EmailRules"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn ripple class="submit-btn" type="submit" :disabled="!valid"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
    <template v-else>
      <h3 class="mb-5">Check your email for a new password</h3>
      <BaseBackBtn title="Back to Sign in" />
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import { emailField, requiredField } from '../use/validations'

export default defineComponent({
  name: 'ResetPassword',
  setup(_, ctx) {
    const store = ctx.root.$store
    const valid = ref(false)
    const isResetPasswordDone = ref(false)
    const email = ref('')
    const EmailRules = [requiredField, emailField]

    const resetPassword = (email: string) =>
      store.dispatch('user/resetPassword', email)

    const onSubmit = async () => {
      await resetPassword(email.value)
      isResetPasswordDone.value = true
    }

    return {
      valid,
      email,
      EmailRules,
      isResetPasswordDone,
      onSubmit
    }
  }
})
</script>
