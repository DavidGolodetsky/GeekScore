<template>
  <section class="login-form mt-12">
    <v-card width="400" raised outlined dark color="primary" class="mx-auto my-4 px-4 pt-4">
      <v-form v-model="valid" lazy-validation ref="form" @submit.prevent="onSubmit">
        <div class="d-flex align-items-center">
          <v-icon class="mr-3">{{`mdi-${formProps.icon}`}}</v-icon>
          <h3 class="app-headline">{{ formProps.title }}</h3>
        </div>
        <v-card-text>
          <div id="firebaseui-auth-container"></div>
          <div id="loader" class="text-center">
            <v-progress-circular size="30" indeterminate color="secondary" />
          </div>
          <div class="d-md-flex d-none or-wrapper">
            <span class="or">OR</span>
          </div>
          <v-text-field
            clearable
            label="Email"
            type="email"
            prepend-icon="mdi-email"
            v-model.trim="email"
            :rules="EmailRules"
            required
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="passwordRules"
            required
            v-model.trim="password"
          />
          <v-text-field
            v-if="formProps.signupMode"
            :type="showPassword ? 'text' : 'password'"
            label="Confirm password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            :rules="[comparePasswords]"
            required
            v-model.trim="confirmPassword"
          />
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            class="my-2 py-2 submit-btn"
            color="secondary"
            width="100%"
            ripple
            type="submit"
            :disabled="!valid"
          >Submit</v-btn>
        </v-card-actions>
      </v-form>
      <div class="text-center mb-3">
        <router-link :to="{ name: 'resetPass' }" class="link">Forgot password?</router-link>
      </div>
      <div class="text-center mb-3">
        <span class="mr-3">{{ formProps.redirectText }}</span>
        <router-link :to="formProps.redirectLink" class="link">{{ formProps.redirectLinkText }}</router-link>
      </div>
    </v-card>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import { fbStart } from "@/db";
import {
  EmailField,
  shortPassword,
  onlyWhitespaces,
  requiredField
} from "@/utils/validations";

export default {
  props: {
    formProps: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      valid: true,
      showPassword: false,
      password: "",
      confirmPassword: "",
      email: "",
      EmailRules: [requiredField, EmailField],
      passwordRules: [requiredField, onlyWhitespaces, shortPassword]
    };
  },
  computed: {
    comparePasswords() {
      return this.password === this.confirmPassword || "Passwords don't match";
    },
    loginMethod() {
      return this.formProps.signupMode ? this.signUpUser : this.signInUser;
    }
  },
  mounted() {
    fbStart();
  },
  methods: {
    ...mapActions("user", ["signUpUser", "signInUser"]),
    ...mapActions(["setError"]),
    onSubmit() {
      if (this.valid) {
        const userInfo = {
          email: this.email,
          password: this.password
        };
        this.loginMethod(userInfo);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.login-form {
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
