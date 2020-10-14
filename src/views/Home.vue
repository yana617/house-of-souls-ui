<template>
  <div class="home">
    <span id="title">Главная страница</span>
  </div>
  <Footer />
</template>

<script>
import Footer from '../components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Footer,
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
