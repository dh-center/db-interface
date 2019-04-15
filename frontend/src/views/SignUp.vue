<template>
  <div class="auth-page">
    <img alt="DH logo" src="../assets/logodh.jpg" class="auth-page__dhlogo">
    <div>
      <form @submit.prevent="signUp">
        <h2>Регистрация</h2>
        <label for="email">E-mail:</label><br>
        <input required v-model="email" id="email" type="email" placeholder="ivanivanov@mail.ru"/><br><br>
        <label for="password">Пароль:</label><br>
        <input required v-model="password" id="password" type="password"/><br><br>
        <hr>
        <button type="submit">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'SignUp',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async signUp() {
        try {
          const data = {
            email: this.email,
            password: this.password
          };
          const response = await axios.post('/sign-up', data);

          if (response.data.error) {
            throw response.data.error;
          } else {
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>

<style>
  @import url("../styles/sign.css");
</style>
