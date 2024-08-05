<template>
  <div class="filters-mobile">
    <div class="filters-mobile__header">
      <div class="filters-mobile__back-arrow" @click="handleClose" />
      <h4 class="filters-mobile__header__title">Фильтр</h4>
      <h4 class="filters-mobile__clear-btn" @click="handleClearFilters">Очистить</h4>
    </div>
    <Sorting v-if="hasViewAnimalPermission" class="filters-mobile__sorting" />
    <div
      v-for="filter of filters"
      :key="filter.title"
      class="filters-mobile__item"
      :class="{
        'display-none': !isVisible(filter),
      }"
      @click="openSelectOption(filter.filterName)"
    >
      <span>{{ translatedFilterValue(filter) || filter.title }}</span>
      <img
        class="filters-mobile__item__arrow-icon"
        alt="arrow-bottom"
        src="@/assets/arrow-bottom.png"
      />
    </div>
    <CommonButton
      class="filters-mobile__confirm-btn"
      title="Показать результат"
      @click="handleClose()"
    />
  </div>
  <FilterSelectOptions
    v-if="selectOptionsFor"
    :filter-name="selectOptionsFor"
    @on-close="handleSelectOptionsClose"
  />
</template>

<script>
import filters from '@/utils/maps/filters';
import CommonButton from '@/components/common/CommonButton.vue';
import { isFilterVisible } from '@/utils/is-filter-visible';

import Sorting from './Sorting.vue';
import FilterSelectOptions from './FilterSelectOptions.vue';

export default {
  name: 'FiltersMobile',
  components: { FilterSelectOptions, CommonButton, Sorting },
  props: {
    hasViewAnimalPermission: Boolean,
  },
  emits: ['on-close'],
  data() {
    return { filters, selectOptionsFor: null };
  },
  computed: {},
  methods: {
    isVisible({ filterName, forVolunteersOnly }) {
      return isFilterVisible({
        filterName,
        forVolunteersOnly,
        routeQuery: this.$route.query,
        hasViewAnimalPermission: this.hasViewAnimalPermission,
      });
    },
    translatedFilterValue(filter) {
      const filterValue = this.$route.query[filter.filterName];
      const filterOption = filter.options?.find(({ value }) => value === filterValue);
      return filterOption?.label;
    },
    openSelectOption(filterName) {
      this.selectOptionsFor = filterName;
    },
    handleSelectOptionsClose() {
      this.selectOptionsFor = null;
    },
    handleClearFilters() {
      this.$router.push({ path: '/animals', query: '' });
    },
    handleClose() {
      this.$emit('on-close');
    },
  },
};
</script>

<style scoped lang="scss">
$grey1: #8a92a6;
$blue: #3f91f7;
$black1: #232d42;
$darkBlue: #2f3e4e;

.filters-mobile {
  position: fixed;
  left: 0;
  z-index: 10;
  width: 100%;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  background-color: white;

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-bottom: 1px solid rgba($color: $grey1, $alpha: 0.2);
    margin-bottom: 12px;
    padding: 8px 16px;

    &__title {
      font-size: 16px;
    }

    h4 {
      margin: 0;
      font-family: Helvetica, Avenir, Arial, sans-serif;
    }
  }

  &__back-arrow {
    border: solid $black1;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 4px;
    margin: 2px 6px 0 2px;
    position: absolute;
    left: 16px;

    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  &__clear-btn {
    color: $grey1;
    position: absolute;
    right: 16px;
  }

  &__item {
    display: flex;
    padding: 16px;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 18px 32px rgba(208, 210, 218, 0.15);
    color: $grey1;
    cursor: pointer;
    margin: 4px 16px;

    &.display-none {
      display: none;
    }

    &__arrow-icon {
      width: 10px;
      -webkit-transition: all 0.5s ease;
      transition: all 0.5s ease;
      transform: rotate(-90deg);
    }
  }

  &__confirm-btn {
    background-color: $darkBlue;
    color: white;
    border-color: $darkBlue;
    margin: 16px;
    margin-top: auto;
    border-radius: 24px;
    padding: 12px;
    &:hover {
      background-color: white;
      color: $darkBlue;
    }
  }

  &__sorting {
    margin: 4px 16px;
    color: $grey1;
  }
}
</style>
