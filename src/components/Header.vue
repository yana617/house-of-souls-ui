<template>
  <div id="nav">
    <router-link to="/volunteers">Волонтеры</router-link>
    <router-link to="/">График</router-link>
  </div>
  <router-view/>
</template>

<script>

export default {
  name: 'Header',
};

</script>

<style lang="scss">

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin-right: 15px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
