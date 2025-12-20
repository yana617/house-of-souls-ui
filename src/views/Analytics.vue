<template>
  <div class="analytics">
    <a-tabs v-model:active-key="activeKey" class="analytics__tabs ant-tabs-centered" @change="handleTabChange">
      <a-tab-pane key="rating" tab="Посещения">
        <router-view />
      </a-tab-pane>
      <a-tab-pane key="stats" tab="Статистика">
        <router-view />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const activeKey = ref('rating');

watch(
  () => route.path,
  (newPath) => {
    if (newPath.includes('stats')) {
      activeKey.value = 'stats';
    } else {
      activeKey.value = 'rating';
    }
  },
  { immediate: true },
);

const handleTabChange = (key) => {
  router.push(`/analytics/${key}`);
};
</script>

<style lang="scss" scoped>
$lightGrey: #ccc;
$greyBlue: #2c3e50;

.router-link-active {
  color: white !important;
  background-color: #233241;
}

.analytics {
  width: 100%;

  &__tabs {
    :deep(.ant-tabs-nav) {
      margin: 0;
    }
  }
}
</style>
