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
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
</template>

<script>
  export default {
    name: 'SignUp'
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
  }
</style>
