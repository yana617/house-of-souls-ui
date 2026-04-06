<template>
  <div class="ads-per-time-chart">
    <div class="ads-per-time-chart__item">
      <canvas ref="adsPerWeekChart" />
    </div>
    <div class="ads-per-time-chart__item">
      <canvas ref="adsPerMonthChart" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Chart, registerables } from 'chart.js';

const adsPerWeekChart = ref(null);
const adsPerMonthChart = ref(null);
const store = useStore();

const statsAdsPerWeek = computed(() => store.state.stats.adsPerWeek);
const statsAdsPerMonth = computed(() => store.state.stats.adsPerMonth);

Chart.register(...registerables);

const renderCharts = () => {
  if (!adsPerWeekChart.value || !adsPerMonthChart.value) return;

  const options = {
    borderRadius: 8,
    backgroundColor: "#42b983",
    maintainAspectRatio: false,
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      }
    },
  };

  new Chart(adsPerWeekChart.value, {
    type: 'bar',
    data: {
      labels: statsAdsPerWeek.value.stats.map((row) => row.week),
      datasets: [{
        label: `Количество обьявлений [ всего ${statsAdsPerWeek.value.total} ]`,
        data: statsAdsPerWeek.value.stats.map((row) => row.count),
      }]
    },
    options,
  });

  new Chart(adsPerMonthChart.value, {
    type: 'bar',
    data: {
      labels: statsAdsPerMonth.value.stats.map((row) => row.month),
      datasets: [{
        label: `Количество обьявлений [ всего ${statsAdsPerMonth.value.total} ]`,
        data: statsAdsPerMonth.value.stats.map((row) => row.count),
      }]
    },
    options,
  });
};

onMounted(async () => {
  renderCharts();
});
</script>

<style lang="scss" scoped>
.ads-per-time-chart {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__item {
    width: 100%;
    max-width: 100%;
    height: 300px;
  }
}
</style>