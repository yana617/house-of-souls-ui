<template>
  <AnimalNavigation v-if="!showImageFilters" class="animal-list-mobile__nav" />
  <span class="animal-list-mobile__title">Наши животные</span>
  <Search v-if="hasViewAnimalPermission" />
  <span v-if="!hasViewAnimalPermission && showImageFilters" class="animal-list-mobile__description">
    {{ animalListDescription }}
  </span>
  <FilterViaImages v-if="showImageFilters" :has-view-animal-permission="hasViewAnimalPermission" />

  <div v-if="!showImageFilters" class="animal-list-mobile__sub-container">
    <AnimalTypeAgeMobileFilter />
    <div class="animal-list-mobile__count-filter-container">
      <span>По запросу найдено: {{ animals.length }}</span>
      <img class="animal-list-mobile__filter-icon" alt="filter" src="@/assets/filter.png" @click="filtersOpen = true" />
    </div>
    <AnimalCard
      v-for="animal of animals"
      :key="animal.id"
      v-bind="animal"
      :has-view-animal-permission="hasViewAnimalPermission"
      class="animal-list-mobile__animal-card"
    />
  </div>
  <FiltersMobile
    v-if="filtersOpen"
    :has-view-animal-permission="hasViewAnimalPermission"
    @on-close="handleCloseFilters"
  />
</template>

<script>
import { mapState } from 'vuex';

import AnimalNavigation from '@/components/animal-view/AnimalNavigation.vue';
import { animalListDescription } from '@/utils/pr-texts';
import FilterViaImages from './FilterViaImages.vue';
import AnimalCard from './AnimalCard.vue';
import AnimalTypeAgeMobileFilter from './AnimalTypeAgeMobileFilter.vue';
import FiltersMobile from './FiltersMobile.vue';
import Search from './Search.vue';

const ANIMALS_PAGE_VISIT_KEY = 'animalsPageVisited';

export default {
  name: 'AnimalList',
  components: {
    FilterViaImages,
    AnimalCard,
    AnimalNavigation,
    AnimalTypeAgeMobileFilter,
    FiltersMobile,
    Search,
  },
  data() {
    return { animalListDescription, filtersOpen: false };
  },
  computed: mapState({
    visitingFirstTime: () => !localStorage.getItem(ANIMALS_PAGE_VISIT_KEY),
    animals: (state) => state.animals.list,
    permissions: (state) => state.permissions.my,
    hasViewAnimalPermission() {
      return this.hasPermission('VIEW_ANIMAL');
    },
    showImageFilters() {
      const { query } = this.$route;
      return this.visitingFirstTime && Object.keys(query).length === 0;
    },
  }),
  beforeUnmount() {
    if (this.visitingFirstTime) {
      localStorage.setItem(ANIMALS_PAGE_VISIT_KEY, true);
    }
  },
  methods: {
    hasPermission(permission) {
      return this.permissions.includes(permission);
    },
    handleCloseFilters() {
      this.filtersOpen = false;
    },
  },
};
</script>

<style scoped lang="scss">
$grey1: #8a92a6;

.animal-list-mobile {
  &__nav {
    margin-left: 0;
    margin-top: 24px;
    margin-bottom: -24px;
  }

  &__title {
    margin-top: 32px;
    font-size: 36px;
  }

  &__description {
    margin-top: 16px;
    font-size: 14px;
    text-align: left;
  }

  &__sub-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    height: fit-content;
  }

  &__count-filter-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $grey1;
    font-size: 16px;
  }

  &__filter-icon {
    width: 24px;
    height: 24px;
  }

  &__animal-card {
    margin: 12px 0;
  }
}
</style>
