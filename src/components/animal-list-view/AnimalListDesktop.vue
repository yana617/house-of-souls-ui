<template>
  <div class="animal-list__title-container">
    <span class="animal-list__title">Наши животные</span>
    <a-button
      v-if="hasCreateAnimalPermission"
      type="primary"
      shape="round"
      class="animal-list__add-button"
      @click="onAddClick"
    >
      Добавить
    </a-button>
  </div>
  
  <span v-if="!hasViewAnimalPermission" class="animal-list__description">
    {{ animalListDescription }}
  </span>
  <FilterViaImages />

  <div class="animal-list__filters-cards-container" :class="{ 'volunteer-view': hasViewAnimalPermission }">
    <Filters />

    <div class="animal-list__cards-container" :class="{ 'volunteer-view': hasViewAnimalPermission }">
      <div class="animal-list__animal-count-and-sorting-container">
        <span>
          По запросу найдено: <b>{{ animals.length }}</b>
        </span>
        <Sorting v-if="hasViewAnimalPermission" />
      </div>
      <div class="animal-list__cards-sub-container" :class="{ 'volunteer-view': hasViewAnimalPermission }">
        <AnimalCard v-for="animal of animals" :key="animal.id" v-bind="animal" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { animalListDescription } from '@/utils/pr-texts';
import FilterViaImages from './FilterViaImages.vue';
import Filters from './Filters.vue';
import AnimalCard from './AnimalCard.vue';
import Sorting from './Sorting.vue';

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
      return this.permissions.includes('VIEW_ANIMALS');
    },
    hasCreateAnimalPermission() {
      return this.permissions.includes('CREATE_ANIMAL');
    },
  }),
  methods: {
    onAddClick() {
      this.$router.push({ path: '/animals/create' });
    }
  }
};
</script>

<style scoped lang="scss">
$grey1: #8a92a6;
$green: #42b983;

.animal-list {
  &__add-button {
    margin-left: 24px;
    background-color: $green;
    border-color: $green;
  }

  &__title-container {
    margin-top: 32px;
    display: flex;
    align-items: center;
  }

  &__title {
    font-size: 36px;
  }

  &__description {
    margin-top: 16px;
    font-size: 14px;
    text-align: left;
  }

  &__cards-container {
    color: $grey1;
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
