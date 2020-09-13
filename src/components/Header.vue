<template>
<div id="nav">
  <router-link to="/volunteers">Волонтеры</router-link>
  <router-link class="nav-schedule" to="/">График</router-link>
  <div class="auth-buttons">
    <Button title="Вход" />
    <Button class="register-btn" title="Регистрация" />
    <!-- ADD LOGIC <Button @click="$router.push('profile')" title="Профиль" />
    <Button @click="$router.push('admin')" class="admin-btn" title="Админка" />-->
  </div>
</div>
<router-view />
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'Header',
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
$green: #42b983;

#nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 30px;
  box-shadow: 0 5px 10px 0 rgba(50, 50, 50, .1);
  position: fixed;
  background-color: white;
  width: 100%;
  top: 0;

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

.admin-btn {
  margin-left: 8px;
  color: $green;
  border: 1px solid $green;

  &:hover {
    background-color: $green;
  }
}
</style>
