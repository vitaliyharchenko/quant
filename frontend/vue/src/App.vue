<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p>
      <!-- используйте компонент router-link для создания ссылок -->
      <!-- входной параметр `to` определяет путь для перехода -->
      <!-- `<router-link>` по умолчанию преобразуется в тег `<a>` -->
      <router-link to="/">Index</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/task">Task</router-link>
    </p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
