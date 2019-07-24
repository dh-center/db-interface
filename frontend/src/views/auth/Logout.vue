<template>
  <div class="auth-form">
    <form @submit.prevent="logout">
      <h2>{{ $t('auth.headers.logout') }}</h2>
      <button
        class="auth-form_button"
        type="submit"
      >
        {{ $t('auth.logout') }}
      </button>
    </form>
  </div>
</template>

<script>
  import { RESET_STORE } from '../../store/actions';

  export default {
    name: 'Logout',
    methods: {
      logout: function () {
        this.$store.commit(RESET_STORE);
        this.$router.push('/login');
      }
    }
  };
</script>

<style scr="../../styles/auth-form.css"></style>
