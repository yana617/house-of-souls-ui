<template>
  <div id="app-sub-container">
    <Header />
    <div v-if="loading" class="loader__wrapper">
      <Loader />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Header from '@/components/common/Header.vue';
import Loader from '@/components/common/Loader.vue';

export default {
  name: 'App',
  components: {
    Header,
    Loader,
  },
  computed: mapState({
    loading: (state) => state.app.loading,
  }),
  created() {
    this.$store.dispatch('permissions/getMyPermissions');
  },
};
</script>

<style lang="scss">
$headerHeight: 50px;
$greyBlue: #2c3e50;
$lightGrey: #ccc;
$lightestGrey: #f0f0f0;

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
  height: unset !important;
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
  color: $greyBlue;
  height: calc(100% - #{$headerHeight});
}

#app-sub-container {
  margin-top: $headerHeight;
}

#title {
  display: block;
  font-size: 18px;
  color: $greyBlue;
  font-weight: bold;
  padding: 16px;
}

.modal__wrapper {
  position: fixed;
  z-index: 10;
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

@-webkit-keyframes rainbow {
  0% {
    background-color: $lightestGrey;
  }
  50% {
    background-color: $lightGrey;
  }
  100% {
    background-color: $lightestGrey;
  }
}
</style>
