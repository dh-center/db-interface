<template>
  <div class="auth-form">
    <form @submit.prevent="signIn">
      <h2>Вход в систему</h2>
      <label for="username">Имя пользователя:</label>
      <input required type="text" id="username" v-model="username" placeholder="Username">
      <label for="password">Пароль:</label>
      <input required type="password" id="password" v-model="password">
      <div class="errorMessage">{{errorMessage}}</div>
      <button type="submit">Войти</button>
    </form>
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

          console.log(result);
          if (!result.data.error) {
            this.$router.push('/form');
          } else {
            throw result.data.error;
          }
        } catch (error) {
          if (error == 'Wrong password') {
            this.errorMessage = 'Неправильный пароль';
          } else {
            this.errorMessage = error;
          }
        }
      }
    }
  };
</script>

<style scoped>
  @import url("../../styles/auth-form.css");
</style>
