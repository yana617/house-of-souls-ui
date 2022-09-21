<template>
  <div class="sorting__container">
    <span>Сортировать по:</span>
    <div
      v-for="sortOption in sortByOptions"
      :key="sortOption.value"
      class="sorting__option"
      :class="{
        selected: currentSortBy === sortOption.value,
        'display-none': sortOption.value === 'height' && !dogOlderYearSelected,
      }"
      @click="handleSortBy(sortOption.value)"
    >
      {{ sortOption.label }}
    </div>
    <img
      v-if="currentSortBy && currentOrder === 'asc'"
      class="sorting__order-icon"
      src="@/assets/sort-asc.png"
      alt="sort-asc"
      @click="handleOrder('desc')"
    />
    <img
      v-if="currentSortBy && currentOrder === 'desc'"
      class="sorting__order-icon"
      src="@/assets/sort-desc.png"
      alt="sort-desc"
      @click="handleOrder('asc')"
    />
  </div>
</template>

<script>
import AnimalType from '@/utils/enums/AnimalType';
import AnimalAge from '@/utils/enums/AnimalAge';

const sortByOptions = [
  {
    label: 'Возрасту',
    value: 'birthday',
  },
  {
    label: 'Росту',
    value: 'height',
  },
  {
    label: 'Дате поступления',
    value: 'second_birthday',
  },
];

export default {
  name: 'Sorting',
  data() {
    return { sortByOptions };
  },
  computed: {
    currentSortBy() {
      return this.$route.query?.sortBy;
    },
    currentOrder() {
      return this.$route.query?.order;
    },
    dogOlderYearSelected() {
      const { type, age } = this.$route.query;
      return type === AnimalType.DOG && age === AnimalAge.OLDER_YEAR;
    },
  },
  methods: {
    handleSortBy(sortByValue) {
      const { query } = this.$route;
      const requestQuery = { ...query, sortBy: sortByValue, order: 'asc' };
      this.$router.push({ path: '/animals', query: requestQuery });
    },
    handleOrder(orderValue) {
      const { query } = this.$route;
      this.$router.push({ path: '/animals', query: { ...query, order: orderValue } });
    },
  },
};
</script>

<style scoped lang="scss">
$grey2: #f4f6f9;
$darkBlue: #2f3e4e;

.sorting {
  &__container {
    display: flex;
    align-items: center;
    max-width: 90%;
    flex-wrap: wrap;
  }

  &__option {
    font-size: 13px;
    padding: 6px 20px;
    border-radius: 24px;
    background-color: $grey2;
    margin-left: 12px;
    margin-bottom: 4px;
    cursor: pointer;

    &.selected {
      background-color: $darkBlue;
      color: white;
    }

    &.display-none {
      display: none;
    }
  }

  &__order-icon {
    display: flex;
    height: 24px;
    cursor: pointer;
    margin-left: 8px;
  }
}
</style>
