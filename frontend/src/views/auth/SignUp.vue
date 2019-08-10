<template>
  <div class="auth-form">
    <form @submit.prevent="signUp">
      <h2>{{ $t('auth.headers.registration') }}</h2>
      <label for="username">{{ $t('auth.username') }}:</label>
      <input
        id="username"
        v-model="username"
        class="auth-form_input"
        required
        type="text"
        :placeholder="$t('auth.username')"
      >
      <label for="password">{{ $t('auth.password') }}:</label>
      <input
        id="password"
        v-model="password"
        class="auth-form_input"
        required
        type="password"
        :placeholder="$t('auth.password')"
      >
      <div class="auth-form_errmsg">
        {{ errorMessage }}
      </div>
      <button
        class="auth-form_button"
        type="submit"
      >
        {{ $t('auth.registration') }}
      </button>
    </form>
    <router-link
      to="/login"
      class="auth-form_link"
    >
      {{ $t('auth.loginLink') }}
    </router-link>
  </div>
</template>

<script>
  import { SIGN_UP } from '../../store/modules/auth/actionTypes';

  export default {
    name: 'SignUp',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async signUp() {
        try {
          const { username, password } = this;

          await this.$store.dispatch(SIGN_UP, { username, password });

          this.$router.push('/login');
        } catch (error) {
          this.errorMessage = error.message;
        }
      }
    }
  };
</script>

<style src="../../styles/auth-form.css"></style>
