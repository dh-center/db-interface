<template>
  <div>
    <p>Home view is not implemented yet, but you can logout</p>
    <button @click="logout">
      {{ $t('auth.logout') }}
    </button>
  </div>
</template>

<script>
  import { RESET_STORE } from '../store/actions';

  export default {
    name: 'Home',
    methods: {
      async logout() {
        await this.$store.dispatch(RESET_STORE);
      }
    }
  };
</script>
