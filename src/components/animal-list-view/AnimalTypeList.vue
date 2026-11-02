<template>
  <div class="animal-type-list__container">
    <div class="animal-type-list">
      <header class="animal-type-list__hero">
        <div class="animal-type-list__hero-head">
          <h1 class="animal-type-list__title">
            {{ title }}
          </h1>
          <span class="animal-type-list__stat">{{ animals.length }}</span>
        </div>
        <p v-if="description" class="animal-type-list__description">
          {{ description }}
        </p>
        <div class="animal-type-list__links">
          <router-link class="animal-type-list__link" to="/">
            Все животные
          </router-link>
          <router-link
            class="animal-type-list__link animal-type-list__link--accent"
            :to="otherType.path"
          >
            {{ otherType.label }}
            <svg
              class="animal-type-list__link-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
        </div>
      </header>

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
$green: #42b983;
$greenDark: #349c6f;

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

  /* ---------- Верхний блок ---------- */

  &__hero {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin: 32px 0;
    padding: 16px;
  }

  &__hero-head {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    width: 100%;
  }

  &__title {
    margin: 0;
    min-width: 0;
    font-size: 28px;
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: $black1;
    text-align: left;
    margin-bottom: 8px;
  }

  &__stat {
    flex-shrink: 0;
    font-size: 40px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.03em;
    color: $green;
  }

  &__description {
    position: relative;
    z-index: 1;
    max-width: 560px;
    font-size: 16px;
    line-height: 1.6;
    color: $grey1;
    text-align: left;
  }

  &__links {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-top: 4px;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    color: $green;
    background: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(66, 185, 131, 0.35);
    transition: transform 0.18s ease, box-shadow 0.18s ease,
      background-color 0.18s ease, border-color 0.18s ease;

    &:hover {
      transform: translateY(-2px);
      background: #fff;
      border-color: rgba(66, 185, 131, 0.7);
      box-shadow: 0 10px 20px -12px rgba(66, 185, 131, 0.9);
    }

    &:focus-visible {
      outline: 2px solid $green;
      outline-offset: 3px;
    }

    &--accent {
      color: #fff;
      border-color: transparent;
      background: linear-gradient(135deg, $green 0%, $greenDark 100%);
      box-shadow: 0 12px 24px -14px rgba(66, 185, 131, 1);

      &:hover {
        background: linear-gradient(135deg, #4ecb90 0%, $greenDark 100%);
        box-shadow: 0 16px 28px -14px rgba(66, 185, 131, 1);
      }
    }
  }

  &__link-icon {
    flex-shrink: 0;
  }

  /* ---------- Карточки ---------- */

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

    &__hero {
      padding: 32px;
    }

    &__title {
      font-size: 32px;
    }
  }

  @media (max-width: 1000px) {
    width: 100%;
    padding: 0 32px;

    &__cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 800px) {
    &__hero {
      padding: 28px;
      border-radius: 20px;
    }

    &__title {
      font-size: 28px;
    }

    &__stat {
      font-size: 32px;
    }
  }

  @media (max-width: 700px) {
    &__cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 500px) {
    padding: 0 16px;

    &__hero {
      padding: 0;
      margin: 20px 0;
    }

    &__hero-head {
      gap: 16px;
    }

    &__title {
      font-size: 24px;
    }

    &__stat {
      font-size: 28px;
    }

    &__description {
      font-size: 15px;
    }

    &__link {
      padding: 10px 18px;
    }

    &__cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>