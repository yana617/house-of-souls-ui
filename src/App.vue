<template>
  <div id="app-sub-container">
    <Header />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>

<style lang="scss">
$headerHeight: 50px;

html,
body {
  margin: 0;
  padding: 0;
}
html {
  min-height: 100vh;
}
body {
  min-height: calc(100vh - headerHeight);
}
* {
  box-sizing: border-box;
  font-family: 'SF Pro Text', 'Myriad Set Pro', 'SF Pro Icons', 'Helvetica Neue',
    'Helvetica', 'Arial', sans-serif;
}
#app {
  font-family: Helvetica, Avenir, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100% - headerHeight);
}

#app-sub-container {
  margin-top: $headerHeight;
}

#title {
  display: block;
  font-size: 18px;
  color: #2c3e50;
  font-weight: bold;
  padding: 16px;
}
</style>
