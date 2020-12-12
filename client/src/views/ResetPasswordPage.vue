<template>
  <section>
    <v-card
      v-if="!isResetPasswordPageDone"
      raised
      outlined
      dark
      class="auth-card"
    >
      <v-form
        ref="form"
        v-model="valid"
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
            prepend-icon="mdi-email"
            :rules="EmailRules"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            ripple
            class="submit-btn"
            type="submit"
            :disabled="!valid"
          >Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <template v-else>
      <h3 class="mb-5">Check your email for a new password</h3>
      <the-go-back title="Back to Sign in" />
    </template>
  </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { emailField, requiredField } from "@/utils/validations";

export default {
  name: "ResetPasswordPage",
  data () {
    return {
      valid: false,
      email: "",
      resetted: false,
      EmailRules: [requiredField, emailField]
    };
  },
  computed: {
    ...mapState("user", ["ResetPasswordPage"])
  },
  methods: {
    ...mapActions("user", ["ResetPasswordPage"]),
    onSubmit () {
      this.ResetPasswordPage(this.email);
    }
  }
};
</script>
