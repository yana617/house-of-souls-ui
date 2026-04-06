<template>
  <div class="stats">
    <div v-if="!!usersPerMonthStats" class="stats__item">
      <h2>Количество уникальных волонтеров каждый месяц</h2>
      <UsersPerMonthChart />
    </div>
    <div class="stats__separator" />
    <div v-if="!!animalsPerAgeStats" class="stats__item">
      <h2>Возрастное распределение среди животных</h2>
      <AnimalsPerAgeChart />
    </div>
    <div class="stats__separator" />
    <div v-if="!!adoptedPerMonthStats" class="stats__item">
      <h2>Количество пристройств</h2>
      <AdoptedPerMonthChart />
    </div>
    <div class="stats__separator" />
    <div v-if="!!adsPerWeekStats && !!adsPerMonthStats" class="stats__item">
      <h2>Реклама</h2>
      <AdsPerTimeCharts />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import UsersPerMonthChart from '@/components/stats-view/UsersPerMonthChart.vue';
import AnimalsPerAgeChart from '@/components/stats-view/AnimalsPerAgeChart.vue';
import AnimalStatus from '@/utils/enums/AnimalStatus';
import AdoptedPerMonthChart from '@/components/stats-view/AdoptedPerMonthChart.vue';
import AdsPerTimeCharts from '@/components/stats-view/AdsPerTimeCharts.vue';

const store = useStore();

const usersPerMonthStats = computed(() => store.state.stats.usersPerMonth);
const animalsPerAgeStats = computed(() => store.state.stats.animalsPerAge);
const adoptedPerMonthStats = computed(() => store.state.stats.adoptedPerMonth);
const adsPerWeekStats = computed(() => store.state.stats.adsPerWeek);
const adsPerMonthStats = computed(() => store.state.stats.adsPerMonth);

onMounted(async () => {
  store.dispatch('app/setLoading', true);

  await Promise.all([
    store.dispatch('stats/getUsersPerMonth'),
    store.dispatch('stats/getAnimalsPerAge'),
    store.dispatch('stats/getAdoptedPerMonth'),
    store.dispatch('stats/getAdsPerWeek'),
    store.dispatch('stats/getAdsPerMonth'),
    store.dispatch('animals/getAnimals', { status: `${AnimalStatus.HOMELESS},${AnimalStatus.PREPARATION}` })
  ]);

  store.dispatch('app/setLoading', false);
});

onUnmounted(() => {
  store.dispatch('stats/clearStats');
})
</script>

<style lang="scss" scoped>
$lightGrey: #ccc;

.stats {
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin: 0 0 32px;
  }

  &__item {
    margin: 16px 0;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
  }

  &__separator {
    width: 70%;
    height: 1px;
    background-color: $lightGrey;
    margin: 32px 0;
  }

  @media (max-width: 1023px) {
    &__item {
      max-width: 100%;
    }
  }

  @media (max-width: 767px) {
    &__item {
      align-items: center;
    }
  }
}
</style>
