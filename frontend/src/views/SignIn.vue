<template>
  <div class="auth-page">
    <img alt="DH logo" src="../assets/logodh.jpg" class="auth-page__dhlogo">
    <form class="login" @submit.prevent="signIn">
      <h1>Sign in</h1><br>
      <label>User name</label><br>
      <input required v-model="email" type="email" placeholder=""/><br>
      <label>Password</label><br>
      <input required v-model="password" type="password" placeholder="Password"/>
      <br>
      <hr/>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  import { AUTH_REQUEST } from '../store/actions/auth';

  export default {
    name: 'SignIn',
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async signIn() {
        const { email, password } = this;

        await this.$store.dispatch(AUTH_REQUEST, { email, password });
        this.$router.push('/about');
      }
    }
  };
</script>

<style>
  @import url("../styles/sign.css");
</style>
