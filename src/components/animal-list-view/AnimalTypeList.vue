<template>
  <div class="animal-type-list__container">
    <div class="animal-type-list">
      <h1 class="animal-type-list__title">
        {{ title }}
      </h1>
      <p v-if="description" class="animal-type-list__description">
        {{ description }}
      </p>
      <div class="animal-type-list__links">
        <router-link class="animal-type-list__link" to="/">
          Все животные
        </router-link>
        <router-link class="animal-type-list__link" :to="otherType.path">
          {{ otherType.label }}
        </router-link>
      </div>
      <span class="animal-type-list__count">
        По запросу найдено: <b>{{ animals.length }}</b>
      </span>
      <div class="animal-type-list__cards">
        <AnimalCard v-for="animal of animals" :key="animal.id" v-bind="animal" />
      </div>
    </div>
    <GuestFooter />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import AnimalCard from '@/components/animal-list-view/AnimalCard.vue';
import GuestFooter from '@/components/common/GuestFooter.vue';
import AnimalStatus from '@/utils/enums/AnimalStatus';
import AnimalType from '@/utils/enums/AnimalType';

const props = defineProps({
  animalType: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
});

const OTHER_TYPES = {
  [AnimalType.DOG]: { label: 'Коты', path: '/koty' },
  [AnimalType.CAT]: { label: 'Собаки', path: '/sobaki' },
};

const store = useStore();

const animals = computed(() => store.state.animals.list);
const otherType = computed(() => OTHER_TYPES[props.animalType]);

const fetchAnimals = () => {
  store.dispatch('app/setLoading', true);
  store.dispatch('animals/getAnimals', {
    type: props.animalType,
    status: AnimalStatus.HOMELESS,
  })
    .finally(() => {
      store.dispatch('app/setLoading', false);
    });
};

onMounted(fetchAnimals);
</script>

<style scoped lang="scss">
$lightestGrey: #fafafa;
$black1: #232d42;
$grey1: #8a92a6;
$blue: #3f91f7;

.animal-type-list {
  width: 60%;
  color: $black1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 32px;

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $lightestGrey;
    min-height: calc(100vh - 50px);
  }

  &__title {
    margin-top: 32px;
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 0;
  }

  &__description {
    margin: 0 0;
    font-size: 16px;
    line-height: 1.5;
  }

  &__links {
    display: flex;
    gap: 24px;
    margin-top: 16px;
    font-size: 14px;
  }

  &__link {
    color: $blue;
  }

  &__count {
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    color: $grey1;
  }

  &__cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 32px;
    text-align: left;
  }

  @media (max-width: 1500px) {
    width: 70%;
  }

  @media (max-width: 1300px) {
    width: 80%;
  }

  @media (max-width: 1100px) {
    width: 90%;
  }

  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 32px;

    &__cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 700px) {
    &__cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 500px) {
    padding: 0 16px;

    &__cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>
