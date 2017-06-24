<template>
  <div id="app">
    <md-toolbar>
      <h1 class="md-title">
        <router-link to="/" class="title">
          News
        </router-link>
      </h1>
    </md-toolbar>
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  .title {
    color: white !important;
    text-decoration: none !important;
  }
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
</style>
