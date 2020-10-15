<template>
  <div class="home">
    <Info v-for="info in infos" :key="info.title" v-bind="info" />
  </div>
  <Footer />
</template>

<script>
import {
  mapState,
} from 'vuex';

import Footer from '../components/Footer.vue';
import Info from '../components/Info.vue';

export default {
  name: 'Home',
  components: {
    Footer,
    Info,
  },
  computed: mapState({
    infos: (state) => state.info.actualInfo,
  }),
  created() {
    this.$store.dispatch('info/getInfo');
  },
};
</script>

<style scoped lang="scss">
$headerHeight: 50px;
$footerHeight: 60px;
$footerHeightMobile: 90px;

.home {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - #{$headerHeight + $footerHeight});
  @media (max-width: 500px) {
    min-height: calc(100vh - #{$headerHeight + $footerHeightMobile});
  }
}
</style>
