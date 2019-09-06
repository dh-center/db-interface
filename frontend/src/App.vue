<template>
  <div
    id="app"
    class="app"
  >
    <header
      v-if="$store.getters.isAuthenticated"
      class="app__header"
    >
      <router-link
        class="app__header-link"
        :to="{name: 'home'}"
      >
        Home
      </router-link>
      <router-link
        class="app__header-link"
        :to="{name: 'persons-overview'}"
      >
        Persons
      </router-link>
      <DataLanguageSelect class="app__data-language-select"/>
    </header>
    <router-view />
  </div>
</template>

<script>
  import axios from 'axios';
  import DataLanguageSelect from './components/DataLanguageSelect';

  export default {
    name: 'App',
    components: {
      DataLanguageSelect
    },
    created() {
      if (this.$store.state.auth.accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.auth.accessToken}`;
      }

      this.$store.watch(
        state => state.auth.accessToken,
        accessToken => {
          if (!accessToken) {
            delete axios.defaults.headers.common['Authorization'];
            this.$router.push('/login');
          } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          }
        }
      );
    }
  };
</script>

<style src="./styles/base.css"></style>

<style>
  .app {
    &__header {
      display: flex;
      align-items: center;
      height: 50px;
      border-bottom: 1px solid black;
    }

    &__header-link {
      color: blue;
      margin-left: 20px;
      text-decoration: none;
    }

    &__data-language-select {
      margin-left: auto;
    }

    .router-link-active {
      text-decoration: underline;
    }
  }
</style>
