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
      <label for="passwordRepeat">{{ $t('auth.passwordRepeat') }}:</label>
      <input
        id="passwordRepeat"
        v-model="passwordRepeat"
        class="auth-form_input"
        required
        type="password"
        :placeholder="$t('auth.passwordRepeat')"
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
  import axios from 'axios';
  import { LOGIN } from '../../store/actions/auth';
  import i18n from '../../localization/i18next';

  export default {
    name: 'SignUp',
    data() {
      return {
        username: '',
        password: '',
        passwordRepeat: '',
        errorMessage: ''
      };
    },
    methods: {
      async signUp() {
        try {
          if (this.password === this.passwordRepeat) {
            this.errorMessage = '';
            const response = await axios.post('/sign-up', {
              username: this.username,
              password: this.password
            });

            if (response.status === 200) {
              const { username, password } = this;

              await this.$store.dispatch(LOGIN, { username, password });
              this.$router.push('/');
            }
          } else {
            this.errorMessage = 'Пароли не совпадают!';
          }
        } catch (error) {
          this.errorMessage = i18n.t([`error.${error.response.status}`, 'error.unspecific']);
        }
      }
    }
  };
</script>

<style src="../../styles/auth-form.css"></style>
