<template>
  <a-spin
    :class="loaderClassName"
    tip="Загрузка..."
  />
</template>

<script>
export default {
  name: 'Loader',
  props: {
    className: String,
  },
  computed: {
    loaderClassName() {
      return this.className || 'loader';
    },
  },
};
</script>

<style lang="scss">
.loader {
  margin-top: 40vh !important;

  &__wrapper {
    width: 100vw;
    height: calc(100vh - 50px);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    margin-top: 50px;
    backdrop-filter: blur(5px);
  }
}
</style>
