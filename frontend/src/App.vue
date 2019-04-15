<template>
  <div id="app">
    <div class="app__header">
      <nav class="app__nav">
        <router-link to="/">Catalog</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/sign-up">Sign-Up</router-link>
        <router-link to="/sign-in">Sign-In</router-link>
        <router-link to="/sign-out">Sign-Out</router-link>
      </nav>
    </div>

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.app__nav {
  padding-top: 15px;
  height: 50px;
}
.app__header {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 50px;
  background-color: #adb67c;
}
.app__nav a {
  font-weight: bold;
  color: #ffffff;
}
a {
  text-decoration: none;
  margin-right: 10px;
  margin-left: 10px;
}
.app__nav a.router-link-exact-active {
  color: #312656;
}
body{
  padding: 0;
  margin: 0;
}
</style>
