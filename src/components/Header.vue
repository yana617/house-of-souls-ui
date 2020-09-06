<template>
  <div id="nav">
    <router-link to="/volunteers">Волонтеры</router-link>
    <router-link class="nav-schedule" to="/">График</router-link>
    <div class="auth-buttons">
      <Button title="Вход" />
      <Button class="register-btn" title="Регистрация" />
    </div>
  </div>
  <router-view/>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'Header',
  components: { Button },
};
</script>

<style scoped lang="scss">

#nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.nav-schedule {
  margin-left: 16px;
}
.auth-buttons {
  position: absolute;
  right: 30px;
}
.register-btn {
  margin-left: 8px;
}
</style>
