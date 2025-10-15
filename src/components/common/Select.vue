<template>
  <div class="select">
    <label v-show="label">{{ label }}</label>
    <a-select
      :value="input"
      class="select__input"
      :options="options"
      :disabled="disabled"
      @change="(value) =>$emit('update:modelValue', value)"
    />
    <span v-show="description" class="select__description">{{ description }}</span>
  </div>
</template>

<script setup>
import { toRef } from 'vue';

const props = defineProps({
  label: String,
  options: Array,
  description: String,
  disabled: Boolean,
  modelValue: [String, Number],
});

defineEmits(["update:modelValue"]);

const input = toRef(() => props.modelValue);
</script>

<style lang="scss">
$grey1: #8a92a6;

.select {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;

  label {
    font-weight: bold;
  }

  &__input {
    min-width: 300px;
    width: 100%;  
  }
  
  &__description {
    color: $grey1;
    line-height: 1em;
    margin-top: 4px;
  }
}
</style>