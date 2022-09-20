<template>
  <span class="animal-list__title">Наши животные</span>
  <span v-if="!hasViewAnimalPermission" class="animal-list__description">{{ animalListDescription }}</span>
  <FilterViaImages :hasViewAnimalPermission="hasViewAnimalPermission" />

  <div class="animal-list__filters-cards-container" :class="{ 'volunteer-view': hasViewAnimalPermission }">
    <Filters :hasViewAnimalPermission="hasViewAnimalPermission" />

    <div class="animal-list__cards-container" :class="{ 'volunteer-view': hasViewAnimalPermission }">
      <div class="animal-list__animal-count-and-sorting-container">
        <span>По запросу найдено: <b>{{ animals.length }}</b></span>
        <Sorting v-if="hasViewAnimalPermission" />
      </div>
      <div class="animal-list__cards-sub-container" :class="{ 'volunteer-view': hasViewAnimalPermission }">
        <AnimalCard
          v-for="animal of animals"
          :key="animal.id"
          v-bind="animal"
          :hasViewAnimalPermission="hasViewAnimalPermission"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import FilterViaImages from './FilterViaImages.vue';
import Filters from './Filters.vue';
import AnimalCard from './AnimalCard.vue';
import Sorting from './Sorting.vue';

import { animalListDescription } from '@/utils/pr-texts';

export default {
  name: 'AnimalList',
  components: {
    FilterViaImages,
    Filters,
    AnimalCard,
    Sorting,
  },
  data() {
    return { animalListDescription };
  },
  computed: mapState({
    animals: (state) => state.animals.list,
    permissions: (state) => state.permissions.my,
    hasViewAnimalPermission() {
      return this.hasPermission('VIEW_ANIMAL');
    },
  }),
  methods: {
    hasPermission(permission) {
      return this.permissions.includes(permission);
    },
  },
};
</script>

<style scoped lang="scss">
$grey2: #8a92a6;

.animal-list {
  &__title {
    margin-top: 32px;
    font-size: 36px;
  }

  &__description {
    margin-top: 16px;
    font-size: 14px;
    text-align: left;
  }

  &__cards-container {
    color: $grey2;
    margin-top: 16px;
    width: 100%;
    text-align: left;

    &.volunteer-view {
      width: 75%;
      margin-left: 12px;
    }
  }

  &__cards-sub-container {
    width: 100%;
    margin-bottom: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 24px;

    &.volunteer-view {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  &__filters-cards-container {
    width: 100%;
    display: flex;
    flex-direction: column;

    &.volunteer-view {
      flex-direction: row;
    }
  }

  &__animal-count-and-sorting-container {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin-bottom: 16px;
  }

  @media (max-width: 900px) {
    &__cards-sub-container {
      grid-template-columns: 1fr 1fr 1fr;

      &.volunteer-view {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  @media (max-width: 700px) {
    &__cards-sub-container {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 500px) {
    &__cards-sub-container {
      grid-template-columns: 1fr;
      width: 300px;
    }
  }
}
</style>
