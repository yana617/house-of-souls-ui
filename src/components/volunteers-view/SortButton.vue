<template>
  <button
    type="button"
    class="sort-button"
    :class="{ 'is-sort-param': isSortParam }"
    @click="onChangeSort"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: 'SortButton',
  props: {
    title: String,
    name: String,
    sortBy: String,
    first: Boolean,
    last: Boolean,
    isSortParam: Boolean,
  },
  methods: {
    onChangeSort() {
      this.$emit('change-sort', this.name);
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;
$greyBlue: #2c3e50;

.sort-button {
  color: $greyBlue;
  border: 1px solid $greyBlue;
  background-color: white;
  padding: 4px 8px;
  width: 80px;
  outline: none;
  cursor: pointer;

  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none !important;
  }

  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left: none !important;
  }

  &.is-sort-param {
    color: white;
    background-color: $green;
  }
}
</style>
