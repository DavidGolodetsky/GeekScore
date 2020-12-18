<template>
  <section class="the-login-form mt-12">
    <v-card
      raised
      outlined
      dark
      class="auth-card"
    >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="onSubmit"
      >
        <div class="d-flex align-items-center">
          <v-icon class="mr-3">{{ `mdi-${formProps.icon}` }}</v-icon>
          <h3 class="app-headline">{{ formProps.title }}</h3>
        </div>
        <v-card-text>
          <div id="firebaseui-auth-container" />
          <div
            id="loader"
            class="text-center"
          >
            <v-progress-circular
              size="30"
              indeterminate
              color="secondary"
            />
          </div>
          <div class="d-md-flex d-none or-wrapper">
            <span class="or">OR</span>
          </div>
          <v-text-field
            v-model.trim="email"
            clearable
            label="Email"
            type="email"
            prepend-icon="mdi-email"
            :rules="EmailRules"
          />
          <v-text-field
            v-if="formProps.signUp"
            v-model.trim="username"
            clearable
            label="Username"
            type="text"
            prepend-icon="mdi-account"
          />
          <v-text-field
            v-model.trim="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            autocomplite="on"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            v-if="formProps.signUp"
            v-model.trim="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            label="Confirm password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="comparePasswords"
            @click:append="showPassword = !showPassword"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            class="submit-btn"
            ripple
            type="submit"
            :disabled="!valid"
          >Submit</v-btn>
        </v-card-actions>
      </v-form>
      <div class="text-center mb-3">
        <router-link
          v-if="!formProps.signUp"
          :to="{ name: 'resetPass' }"
          class="link"
        >Forgot password?</router-link>
      </div>
      <div class="text-center mb-3">
        <span class="mr-3">{{ formProps.redirectText }}</span>
        <router-link
          :to="formProps.redirectLink"
          class="link"
        >{{
          formProps.redirectLinkText
        }}</router-link>
      </div>
    </v-card>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { fbStart } from '@/auth';
import { emailField, standardField, requiredField, shortPassword } from '@/utils/validations';

export default {
  name: 'TheLoginForm',
  props: {
    formProps: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      valid: false,
      showPassword: false,
      password: '',
      confirmPassword: '',
      email: '',
      EmailRules: [requiredField, emailField],
      username: '',
      passwordRules: [...standardField, requiredField, shortPassword],
    };
  },
  computed: {
    comparePasswords () {
      return [
        this.password === this.confirmPassword || "Passwords don't match",
      ];
    },
    loginMethod () {
      return this.formProps.signUp ? this.signUpUser : this.signInUser;
    },
  },
  mounted () {
    fbStart();
  },
  methods: {
    ...mapActions('user', ['signUpUser', 'signInUser']),
    onSubmit () {
      const userInfo = {
        email: this.email,
        username: this.username,
        password: this.password,
      };
      this.loginMethod(userInfo)
    },
  },
};
</script>

<style scoped lang="scss">
.the-login-form {
  .or-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px 0 30px 0;
  }
  .or {
    width: 53px;
    height: 53px;
    font-weight: 700;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
    &::after {
      content: "";
      z-index: -1;
      position: absolute;
      background-color: #fff;
      height: 1px;
      width: 300px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
