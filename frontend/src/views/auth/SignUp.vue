<template>
  <div class="auth-form">
    <form @submit.prevent="signUp">
      <h2>Регистрация</h2>
      <label for="username">Имя пользователя:</label>
      <input required type="text" id="username" v-model="username" placeholder="Username">
      <label for="password">Пароль:</label>
      <input required type="password" id="password" v-model="password">
      <label for="passwordRepeat">Повторите пароль:</label>
      <input required type="password" id="passwordRepeat" v-model="passwordRepeat">
      <div class="errorMessage">{{errorMessage}}</div>
      <button type="submit">Зарегистрироваться</button>
    </form>
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
            this.$router.push('/form');
          }
        } else {
          this.errorMessage = 'Пароли не совпадают!';
        }
      }
    }
  };
</script>

<style scoped>
  @import url("../../styles/auth-form.css");
</style>
