<template>
  <section>
    <the-alert v-if="error" type="error" @dismissed="onDismiss" key="singin" :text="error.message" />
    <div v-if=" resetPassword">
      <h3 class="mb-5">Check your email for a new password</h3>
      <the-go-back title="Back to Sign in" />
    </div>
    <v-card v-else width="400" raised outlined dark color="primary" class="mx-auto my-4 px-4 pt-4">
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
          <v-btn
            ripple
            class="my-2 py-2 submit-btn"
            color="secondary"
            width="100%"
            type="submit"
            :disabled="!valid"
          >Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
    ...mapGetters(["error"]),
    ...mapGetters("user", [" resetPassword"])
  },
  beforeDestroy() {
    this.onDismiss();
  },
  methods: {
    ...mapActions(["setError"]),
    ...mapActions("user", ["resetPassword"]),
    onDismiss() {
      this.setError();
    },
    onSubmit() {
      const valid = this.$refs.form.validate();
      if (valid) this.resetPassword(this.email);
    }
  }
};
</script>
