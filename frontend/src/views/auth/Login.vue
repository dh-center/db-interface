<template>
  <div class="auth-form">
    <form @submit.prevent="signIn">
      <h2>{{ $t('auth.headers.login') }}</h2>
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
        {{ $t('auth.login') }}
      </button>
    </form>
    <router-link
      to="/sign-up"
      class="auth-form_link"
    >
      {{ $t('auth.registration') }}
    </router-link>
  </div>
</template>

<script>
  import { LOGIN } from '../../store/modules/auth/actionTypes';

  export default {
    name: 'SignIn',
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async signIn() {
        try {
          const { username, password } = this;

          await this.$store.dispatch(LOGIN, { username, password });

          this.$router.push('/');
        } catch (error) {
          this.errorMessage = error.message;
        }
      }
    }
  };
</script>

<style src="../../styles/auth-form.css"></style>
