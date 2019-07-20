<template>
  <div class="auth-form">
    <form @submit.prevent="signUp">
      <h2>Регистрация</h2>
      <label for="username">Имя пользователя:</label>
      <input
        id="username"
        v-model="username"
        class="auth-form_input"
        required
        type="text"
        placeholder="Username"
      >
      <label for="password">Пароль:</label>
      <input
        id="password"
        v-model="password"
        class="auth-form_input"
        required
        type="password"
      >
      <label for="passwordRepeat">Повторите пароль:</label>
      <input
        id="passwordRepeat"
        v-model="passwordRepeat"
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
        Зарегистрироваться
      </button>
    </form>
    <a
      href="/login"
      class="auth-form_link"
    >Войти со своим логином</a>
  </div>
</template>

<script>
  import axios from 'axios';
  import { LOGIN } from '../../store/actions/auth';

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
        if (this.password === this.passwordRepeat) {
          this.errorMessage = '';
          const response = await axios.post('/sign-up', {
            username: this.username,
            password: this.password
          });

          if (response.data.error) {
            this.errorMessage = 'Пользователь с таким именем уже существует!';
          } else {
            const { username, password } = this;

            await this.$store.dispatch(LOGIN, { username, password });
            this.$router.push('/');
          }
        } else {
          this.errorMessage = 'Пароли не совпадают!';
        }
      }
    }
  };
</script>

<style src="../../styles/auth-form.css"></style>
