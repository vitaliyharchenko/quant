<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr>
    <h2>Как зарегистироваться</h2>
    <ul>
      <li>1. Вспомнить адрес электронной почты</li>
      <li>2. Если его нет, завести его по ссылке на <a href="https://accounts.google.com/SignUp">Google</a></li>
      <li>3. <a href="/app/reg">Зарегистрироваться</a> по ссылке</li>
    </ul>
    <br>
    <hr>
    <h2>Обнаружили ошибку?</h2>
    <p>Напишите <a href="https://vk.com/write17610278">сообщение</a></p>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Образовательная платформа "Квант"'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>
