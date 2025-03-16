<template>
  <a-checkbox v-model:checked="input" class="checkbox-v2">
    {{ label }}
  </a-checkbox>
  <span v-show="description" class="checkbox-v2__description">{{ description }}</span>
</template>

<script setup>
import { toRef } from 'vue';

const props = defineProps({
  label: String,
  description: String,
  modelValue: Boolean,
});

const input = toRef(() => props.modelValue);

</script>

<style lang="scss">
$grey1: #8a92a6;

.checkbox-v2 {
  margin: 12px 0;

  &__description {
    color: $grey1;
    line-height: 1em;
    margin-top: 4px;
  }
}
</style>