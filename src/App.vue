<template>
  <div id="app-sub-container">
    <Header />
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';

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
  min-height: calc(100vh - #{$headerHeight});
}
* {
  box-sizing: border-box;
  font-family: 'SF Pro Text', 'Myriad Set Pro', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}
#app {
  font-family: Helvetica, Avenir, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: calc(100% - #{$headerHeight});
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

.modal__wrapper {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
}
</style>
