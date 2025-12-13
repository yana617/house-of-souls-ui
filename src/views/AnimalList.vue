<template>
  <div class="animal-list__container">
    <div class="animal-list">
      <AnimalListDesktop v-if="!$matchMedia.mobile" />
      <AnimalListMobile v-if="$matchMedia.mobile" />
    </div>
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import AnimalListDesktop from '@/components/animal-list-view/AnimalListDesktop.vue';
import AnimalListMobile from '@/components/animal-list-view/AnimalListMobile.vue';
import AnimalStatus from '@/utils/enums/AnimalStatus';
import logger from '../utils/logger';

const statusesForVolunteerUser = `${AnimalStatus.HOMELESS},${AnimalStatus.PREPARATION},${AnimalStatus.ON_PROBATION}`;

const route = useRoute();
const store = useStore();

const permissions = computed(() => store.state.permissions.my);

const fetchAnimals = () => {
  const statusesIfNotDefined = permissions.value?.includes('VIEW_ANIMALS')
    ? statusesForVolunteerUser
    : undefined;

  store.dispatch('app/setLoading', true);
  store.dispatch('animals/getAnimals', {
    ...route.query,
    status: route.query.status || statusesIfNotDefined,
  })
    .finally(() => {
      store.dispatch('app/setLoading', false);
    });
};

watch(
  () => route.query,
  () => {
    if (route.path === '/') {
      fetchAnimals();
    }
  }
);

watch(
  permissions,
  (newPermissions) => {
    if (newPermissions?.includes('VIEW_ANIMALS')) {
      fetchAnimals();
    }
  }
);

onMounted(() => {
  fetchAnimals();

  if (window.gtag) {
    logger.log('gtag is available');
  } else {
    logger.error('gtag is NOT available');
  }
});
</script>

<style scoped lang="scss">
$lightestGrey: #fafafa;
$black1: #232d42;

.animal-list {
  width: 60%;
  color: $black1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  &__container {
    display: flex;
    justify-content: center;
    background-color: $lightestGrey;
    min-height: calc(100vh - 50px);
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
  }

  @media (max-width: 360px) {
    padding: 0 16px;
  }
}
</style>
