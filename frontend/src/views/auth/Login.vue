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
  import { LOGIN } from '../../store/actions/auth';
  import i18n from '../../localization/i18next';

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

          const result = await this.$store.dispatch(LOGIN, { username, password });

          if (result.status === 200) {
            this.$router.push('/');
          } else {
            throw result;
          }
        } catch (error) {
          this.errorMessage = i18n.t([`error.${error.response.status}`, 'error.unspecific']);
        }
      }
    }
  };
</script>

<style src="../../styles/auth-form.css"></style>
