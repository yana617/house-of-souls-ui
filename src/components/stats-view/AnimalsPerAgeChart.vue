<template>
  <div class="animals-per-age-chart">
    <div class="animals-per-age-chart__container">
      <canvas ref="animalsPerAgeChart" />
    </div>
    <div class="animals-per-age-chart__cards">
      <InfoCard title="Медианный возраст (лет)" :result="medianAge" />
      <InfoCard
        title="Самое старое животное"
        :result="`${oldestAnimal.name} (${animalAge})`"
        :difference="`${ageDifference} лет`"
        difference-description="разница с самым молодым животным"
        :is-up="true"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Chart, registerables } from 'chart.js';
import InfoCard from './InfoCard.vue';
import { calculateMedianAge } from '@/utils/calculate-median-age';
import { calculateAge } from '@/utils/date';
import { computeYearTranslate } from '@/utils/computedTranslates';

const animalsPerAgeChart = ref(null);
const store = useStore();

const statsAnimalsPerAge = computed(() => store.state.stats.animalsPerAge);
const animals = computed(() => store.state.animals.list);

const medianAge = computed(
  () => calculateMedianAge(statsAnimalsPerAge.value)
);

const oldestAnimal = computed(
  () => animals.value.reduce((oldest, current) => {
    const currentBirthday = new Date(current.birthday);
    const oldestBirthday = new Date(oldest.birthday);

    if (currentBirthday < oldestBirthday) {
      return current;
    }
    return oldest;
  })
);

const youngestAnimal = computed(
  () => animals.value.reduce((youngest, current) => {
    const currentBirthday = new Date(current.birthday);
    const youngestBirthday = new Date(youngest.birthday);

    if (currentBirthday > youngestBirthday) {
      return current;
    }
    return youngest;
  })
);

const ageDifference = computed(
  () => calculateAge(oldestAnimal.value.birthday) - calculateAge(youngestAnimal.value.birthday),
)

const animalAge = computed(() => {
  let age = calculateAge(oldestAnimal?.value.birthday);
  const description = computeYearTranslate(age);
  age = age ? `${age} ` : '';
  return `${age}${description}`;
})

Chart.register(...registerables);

const renderChart = () => {
  if (!animalsPerAgeChart.value) return;

  new Chart(animalsPerAgeChart.value, {
    type: 'bar',
    data: {
      labels: statsAnimalsPerAge.value.map((row) => row.age),
      datasets: [{
        label: "Количество животных",
        data: statsAnimalsPerAge.value.map((row) => row.count),
      }]
    },
    options: {
      borderRadius: 8,
      backgroundColor: "#42b983",
      maintainAspectRatio: false,
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        }
      },
    },
  });
};

onMounted(async () => {
  renderChart();
});
</script>

<style lang="scss" scoped>
.animals-per-age-chart {
  width: 100%;
  display: flex;

  &__container {
    width: 100%;
    max-width: 100%;
    margin-right: 32px;
  }

  &__cards {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media (max-width: 1023px) {
    flex-direction: column;
    align-items: center;

    &__cards {
      flex-direction: row;
    }

    &__container {
      margin: 16px 32px;
    }
  }

  @media (max-width: 767px) {
    &__cards {
      flex-direction: column;
    }

    &__container {
      margin-top: 32px;
      height: 300px;
    }
  }
}
</style>