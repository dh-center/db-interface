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
        placeholder="Username"
      >
      <label for="password">{{ $t('auth.password') }}:</label>
      <input
        id="password"
        v-model="password"
        class="auth-form_input"
        required
        type="password"
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

          if (!result.data.error) {
            this.$router.push('/');
          } else {
            throw result.data.error;
          }
        } catch (error) {
          if (error === 'Wrong password') {
            this.errorMessage = 'Неправильный пароль';
          } else if (error === 'No user with such username') {
            this.errorMessage = 'Пользователя с таким именем не существует';
          } else {
            this.errorMessage = error;
          }
        }
      }
    }
  };
</script>

<style src="../../styles/auth-form.css"></style>
