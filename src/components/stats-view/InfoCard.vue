<template>
  <div class="info-card">
    <span class="info-card__title">{{ title }}</span>
    <span class="info-card__result">{{ result }}</span>
    <div v-if="difference" class="info-card__compare-container">
      <span class="info-card__compare-container__num" :class="{ up: isUp }">{{ difference }}</span>
      <span class="info-card__compare-container__description">{{ differenceDescription }}</span>
    </div>
  </div>
</template>

<script setup>
const { title, result, difference, differenceDescription, isUp } = defineProps({
  title: String,
  result: [String, Number],
  difference: [String, Number],
  differenceDescription: String,
  isUp: Boolean,
})
</script>

<style lang="scss" scoped>
$grey1: #8a92a6;
$greyBlue: #2c3e50;

.info-card {
  display: flex;
  flex-direction: column;
  width: 310px;
  padding: 16px;
  align-items: flex-start;
  color: $greyBlue;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  &__title {
    font-size: 18px;
    font-weight: 600;
    text-align: left;
  }

  &__result {
    font-size: 32px;
    font-weight: 800;
    padding: 8px 0;
  }

  &__compare-container {
    display: flex;
    align-items: center;
    gap: 12px;

    &__num {
      color: red;
      font-weight: 600;
      background-color: rgb(255, 226, 226);
      padding: 2px 8px;
      text-wrap: nowrap;

      &.up {
        color: green;
        background-color: rgb(186, 255, 204);
      }
    }

    &__description {
      color: $grey1;
      text-align: left;
    }
  }

}
</style>