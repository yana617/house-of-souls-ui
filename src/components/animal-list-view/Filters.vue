<template>
  <div class="filters" :class="{ 'volunteer-view': hasViewAnimalPermission }">
    <Search v-if="hasViewAnimalPermission" />
    <div class="filters__title">
      <span class="filters__title__text">Фильтр</span>
      <span
        v-if="hasViewAnimalPermission"
        class="filters__title__clear-btn"
        @click="handleClearFilters"
      >
        Очистить
      </span>
    </div>
    <div class="filters__sub-container">
      <div
        v-for="filter of filters"
        :key="filter.title"
        class="filters__item"
        :class="{
          visible: isVisible(filter.filterName),
          'display-none': !isVisible(filter),
          'no-margin': filter.filterName === Filters.HEIGHT,
        }"
      >
        <div class="filters__item__title" @click="toggleFilter(filter.filterName)">
          <span>{{ translatedFilterValue(filter) || filter.title }}</span>
          <img
            class="filters__item__arrow-icon"
            :class="{ rotated: openFilterName === filter.filterName }"
            alt="arrow-bottom-icon"
            src="@/assets/arrow-bottom.png"
          >
        </div>
        <div
          class="filters__item__options-container"
          :class="{ visible: openFilterName === filter.filterName }"
        >
          <div
            v-for="option of filter.options"
            :key="option.value"
            :value="option.value"
            class="filters__item__option"
            :class="{ selected: selectedFilterValue(filter.filterName) === option.value }"
            @click="select(filter.filterName, option.value)"
          >
            {{ option.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import filters from '@/utils/maps/filters';
import Filters from '@/utils/enums/Filters';
import { isFilterVisible } from '@/utils/is-filter-visible';

import Search from './Search.vue';

export default {
  name: 'Filters',
  components: { Search },
  data() {
    return { filters, openFilterName: null, Filters };
  },
  computed: mapState({
    permissions: (state) => state.permissions.my,
    hasViewAnimalPermission() {
      return this.permissions.includes('VIEW_ANIMAL');
    },
  }),
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
    selectedFilterValue(filterName) {
      return this.$route.query[filterName];
    },
    select(filterName, value) {
      this.openFilterName = null;
      const { query } = this.$route;
      const requestQuery = { ...query, [filterName]: value === 'all' ? undefined : value };

      this.$router.push({ path: '/animals', query: requestQuery });
    },
    toggleFilter(filterName) {
      if (this.openFilterName === filterName) {
        this.openFilterName = null;
        return;
      }
      this.openFilterName = filterName;
    },
    handleClearFilters() {
      this.$router.push({ path: '/animals', query: '' });
    },
  },
};
</script>

<style scoped lang="scss">
$grey1: #8a92a6;
$blue: #3f91f7;
$black1: #232d42;

.filters {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  &.volunteer-view {
    width: 25%;
    padding-right: 12px;
  }
  &.volunteer-view &__sub-container {
    flex-direction: column;
  }
  &.volunteer-view &__item {
    width: 100%;
    margin-right: 0px;
    margin-top: 6px;

    &__options-container {
      position: relative;
      top: unset;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
  }

  &__sub-container {
    width: 100%;
    display: flex;
  }

  &__item {
    position: relative;
    width: 25%;
    margin-right: 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &.no-margin {
      margin-right: 0;
    }

    &.display-none {
      display: none;
    }

    &__title {
      display: flex;
      width: 100%;
      padding: 12px 16px;
      background-color: white;
      border-radius: 8px;
      margin-bottom: 8px;
      box-shadow: 0px 18px 32px rgba(208, 210, 218, 0.15);
      color: $grey1;
      cursor: pointer;

      align-items: center;
      justify-content: space-between;
    }

    &__options-container {
      display: none;
      flex-direction: column;
      width: 100%;
      align-items: flex-start;
      padding: 12px 16px;
      background-color: white;
      border-radius: 8px;
      margin-bottom: 8px;
      box-shadow: 0px 18px 32px rgba(208, 210, 218, 0.15);
      position: absolute;
      top: 50px;

      &.visible {
        display: flex;
      }
    }

    &__option {
      width: 100%;
      text-align: left;
      padding: 4px 0;
      cursor: pointer;
      color: $grey1;

      &.selected {
        color: $black1 !important;
      }

      &:hover {
        color: $blue;
      }
    }

    &__arrow-icon {
      width: 8px;
      height: 8px;
      -webkit-transition: all 0.5s ease;
      transition: all 0.5s ease;

      &.rotated {
        transform: rotate(180deg);
      }
    }
  }

  &__title {
    width: 100%;
    display: flex;
    font-size: 16px;
    margin-bottom: 4px;

    &__text {
      font-weight: 500;
    }

    &__clear-btn {
      color: $grey1;
      font-size: 14px;
      margin-left: auto;
      cursor: pointer;
    }
  }
}
</style>
