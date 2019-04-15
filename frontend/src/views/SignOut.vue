<template>
  <div class="auth-page">
    <img alt="DH logo" src="../assets/logodh.jpg" class="auth-page__dhlogo">
    <form class="sign-out" @submit.prevent="signOut">
      <button type="submit">Выйти</button>
    </form>
  </div>
</template>

<script>
  import { AUTH_LOGOUT } from '../store/actions/auth';
  export default {
    name: 'SignOut',
    methods: {
      signOut() {
        this.$store.commit(AUTH_LOGOUT);
      }
    }
  };
</script>

<style>
  @import url("../styles/sign.css");
</style>
