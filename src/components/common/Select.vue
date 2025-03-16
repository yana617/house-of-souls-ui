<template>
  <label v-show="label">{{ label }}</label>
  <a-select
    :value="input"
    class="common-select"
    :options="options"
    @change="(value) =>$emit('update:modelValue', value)"
  />
  <span v-show="description" class="common-select__description">{{ description }}</span>
</template>

<script setup>
import { toRef } from 'vue';

const props = defineProps({
  label: String,
  options: Array,
  description: String,
  modelValue: [String, Number],
});

defineEmits(["update:modelValue"]);

const input = toRef(() => props.modelValue);

</script>

<style lang="scss">
$grey1: #8a92a6;

label {
  margin: 12px 0 4px;
  font-weight: bold;
}

.common-select {
  min-width: 300px;
  width: 100%;

  &__description {
    color: $grey1;
    line-height: 1em;
    margin-top: 4px;
  }
}
</style>