<template>
  <div class="door" :class="{ vertical: isVertical }" />
</template>

<script>
export default {
  name: 'Door',
  props: {
    isVertical: Boolean,
  },
};
</script>

<style scoped lang="scss">
.door {
  position: absolute;
  width: 40px;
  height: 5px;
  background-color: grey;
  bottom: -2px;

  &.vertical {
    right: -2px;
    bottom: unset;
    width: 5px;
    height: 40px;
  }
}
</style>