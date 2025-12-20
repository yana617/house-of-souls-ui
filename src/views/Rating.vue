<template>
  <div class="rating">
    <ClaimsRating />
  </div>
</template>

<script setup>
import ClaimsRating from '@/components/rating-view/ClaimsRating.vue';
</script>

<style scoped lang="scss">
$lightestGrey: #eff1f3;

.rating {
  background-color: $lightestGrey;
  min-height: calc(100vh - 50px);
  width: 100%;
}
</style>
