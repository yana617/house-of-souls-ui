<template>
  <span id="title">Рейтинг</span>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Посещения">
      <ClaimsRating />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Реклама"> Нет данных </a-tab-pane>
  </a-tabs>
</template>

<script>
import { ref } from 'vue';

import ClaimsRating from '@/components/rating-view/ClaimsRating.vue';

export default {
  name: 'Rating',
  components: { ClaimsRating },
  data() {
    return {
      activeKey: ref('1'),
    };
  },
};
</script>

<style scoped lang="scss">
</style>
