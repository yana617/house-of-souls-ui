<template>
  <span class="animal-count">
    {{ count }}
  </span>
</template>

<script>
export default {
  name: 'AnimalCount',
  props: {
    count: Number,
  },
};
</script>

<style scoped lang="scss">
.animal-count {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  background-color: white;
  width: 25px;
  padding: 0 8px;
  border-radius: 8px;
}
</style>