<template>
  <div class="signIpForm">
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
      signIn() {

      }
    }
  };
</script>

<style scoped>

</style>
