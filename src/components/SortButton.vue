<template>
  <button
    :class="['btn-group__button', first && 'btn-group__first', last && 'btn-group__last', isSortParam && 'sort-param']"
    @click="changeSort"
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
    changeSort() {
      this.$emit('change-sort', this.name);
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;

.btn-group {
  &__button {
    color: #2c3e50;
    border: 1px solid #2c3e50;
    background-color: white;
    padding: 4px 8px;
    width: 80px;
    outline: none;
    cursor: pointer;
  }

  &__first {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: none !important;
  }

  &__last {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left: none !important;
  }
}

.sort-param {
  color: white;
  background-color: $green;
}
</style>
