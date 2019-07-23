<template>
  <div id="app">
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
            this.$router.push('/login');
          } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          }
        });
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

body{
  padding: 0;
  margin: 0;
}
</style>
