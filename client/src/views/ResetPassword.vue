<template>
  <section>
    <v-card v-if="!isResetPasswordDone" raised outlined dark class="auth-card">
      <v-form v-model="valid" lazy-validation ref="form" @submit.prevent="onSubmit">
        <v-card-title class="pb-10">
          <div class="d-flex align-items-center">
            <v-icon class="mr-3">mdi-lock-reset</v-icon>
            <h3 class="app-headline">Reset Password</h3>
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field
            clearable
            label="Email"
            type="email"
            prepend-icon="mdi-email"
            v-model="email"
            :rules="EmailRules"
            required
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn ripple class="submit-btn" type="submit" :disabled="!valid">Submit</v-btn>
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

export default {
  props: {
    signupMode: {
      type: Boolean
    }
  },
  data() {
    return {
      valid: true,
      email: "",
      resetted: false,
      EmailRules: [
        v => !!v || "Field is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  computed: {
    ...mapState("user", ["resetPassword"])
  },
  methods: {
    ...mapActions("user", ["resetPassword"]),
    onSubmit() {
      this.valid && this.resetPassword(this.email);
    }
  }
};
</script>
