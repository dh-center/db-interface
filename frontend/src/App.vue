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
        to="/"
      >
        Home
      </router-link>
      <router-link
        class="app__header-link"
        :to="{name: 'persons-overview'}"
      >
        Persons
      </router-link>
    </header>
    <router-view />
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'App',
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

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body {
    padding: 0;
    margin: 0;
  }

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
  }
</style>
