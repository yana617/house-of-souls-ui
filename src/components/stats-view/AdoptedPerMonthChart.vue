<template>
  <div class="adopted-per-month-chart">
    <div class="adopted-per-month-chart__cards">
      <InfoCard title="Всего пристройств" :result="allAdoptionsCount" />
      <InfoCard
        title="Самый активный месяц"
        :result="bestMonth?.month"
        :difference="bestMonth?.count"
        :difference-description="bestMonth?.count === 1 ? 'пристроенное животное': 'пристроенных животных'"
        :is-up="true"
      />
    </div>
    <div class="adopted-per-month-chart__container">
      <canvas ref="adoptedPerMonthChart" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Chart, registerables } from 'chart.js';
import InfoCard from './InfoCard.vue';

const adoptedPerMonthChart = ref(null);
const store = useStore();

const statsAdoptedPerMonth = computed(() => store.state.stats.adoptedPerMonth || []);
const allAdoptionsCount = computed(() => statsAdoptedPerMonth.value.reduce((acc, row) => acc + row.count, 0))
const bestMonth = computed(
  () => statsAdoptedPerMonth.value
    .reduce((acc, row) => row.count >= acc.count ? row : acc, statsAdoptedPerMonth.value[0]),
);

Chart.register(...registerables);

const renderChart = () => {
  if (!adoptedPerMonthChart.value) return;

  new Chart(adoptedPerMonthChart.value, {
    type: 'bar',
    data: {
      labels: statsAdoptedPerMonth.value.map((row) => row.month),
      datasets: [{
        label: "Количество животных",
        data: statsAdoptedPerMonth.value.map((row) => row.count),
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
.adopted-per-month-chart {
  width: 100%;
  display: flex;

  &__container {
    width: 100%;
    max-width: 100%;
    margin-left: 32px;
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