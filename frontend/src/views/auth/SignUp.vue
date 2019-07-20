<template>
  <div class="signUpForm">
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

          console.log(response);
          if (response.data.error) {
            this.errorMessage = 'Пользователь с таким именем уже существует!';
          }
        } else {
          this.errorMessage = 'Пароли не совпадают!';
        }
      }
    }
  };
</script>

<style scoped>
  .signUpForm {
    width: 270px;
    margin: 0 auto;

    input {
      width: 100%;
      margin-top: 3px;
      margin-bottom: 10px;
    }

    .errorMessage {
      width: 100%;
      text-align: center;
      color: red;
    }

    button {
      margin-top: 3px;
    }
  }
</style>
