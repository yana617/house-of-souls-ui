<template>
  <div class="rating">
    <a-tabs v-model:activeKey="activeKey" class="rating__tabs" tabBarStyle="margin: 0; padding-top: 8px;">
      <a-tab-pane key="1" tab="Посещения">
        <ClaimsRating />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Реклама"> Нет данных </a-tab-pane>
    </a-tabs>
  </div>
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
$lightestGrey: #eff1f3;

.rating {
  background-color: $lightestGrey;
  min-height: calc(100vh - 50px);

  &__tabs {
    background-color: white;
  }
}
</style>
