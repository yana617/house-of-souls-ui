<template>
  <div class="users-per-month-chart">
    <div class="users-per-month-chart__cards">
      <InfoCard title="Среднее количество волонтеров" :result="averageUsersPerMonth" />
      <InfoCard
        title="Самый худший месяц"
        :result="`${baddestMonthName} (${baddestMonthCount})`"
        :difference="greatestMonthCount - baddestMonthCount"
        difference-description="разница с лучшим месяцев"
        :is-up="false"
      />
    </div>
    <div class="users-per-month-chart__container">
      <canvas ref="usersPerMonthChart" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { Chart, registerables } from 'chart.js';
import InfoCard from './InfoCard.vue';

const usersPerMonthChart = ref(null);
const store = useStore();

const statsUsersPerMonth = computed(() => store.state.stats.usersPerMonth);

const averageUsersPerMonth = computed(
  () => Math.round(statsUsersPerMonth.value
    .reduce((acc, monthData) => acc + monthData.usersCount, 0) / statsUsersPerMonth.value.length)
);

const baddestMonthCount = computed(
  () => statsUsersPerMonth.value.reduce((acc, monthData) => Math.min(acc, monthData.usersCount), Infinity)
);

const greatestMonthCount = computed(
  () => statsUsersPerMonth.value.reduce((acc, monthData) => Math.max(acc, monthData.usersCount), 0)
);

const baddestMonthName = computed(
  () => [...statsUsersPerMonth.value]
    .reverse().find((monthData) => monthData.usersCount === baddestMonthCount.value)?.month
);

Chart.register(...registerables);

const renderChart = () => {
  if (!usersPerMonthChart.value) return;

  new Chart(usersPerMonthChart.value, {
    type: 'bar',
    data: {
      labels: statsUsersPerMonth.value.map((monthData) => monthData.month),
      datasets: [{
        label: "Количество волонтеров",
        data: statsUsersPerMonth.value.map((monthData) => monthData.usersCount),
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
.users-per-month-chart {
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