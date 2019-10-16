<template>
  <div>
    <p>Home view is not implemented yet, but you can logout and change interface language</p>
    <InterfaceLanguageSelect />
    <button @click="logout">
      {{ $t('auth.logout') }}
    </button>
  </div>
</template>

<script>
  import { RESET_STORE } from '../store/actions';
  import InterfaceLanguageSelect from '../components/InterfaceLanguageSelect';

  export default {
    name: 'Home',
    components: {
      InterfaceLanguageSelect
    },
    methods: {
      async logout() {
        await this.$store.dispatch(RESET_STORE);
      }
    }
  };
</script>
