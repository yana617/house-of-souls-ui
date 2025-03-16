<template>
  <label v-show="label">{{ label }}</label>
  <a-date-picker
    v-model:value="inputValue"
    class="date-picker"
    placeholder="Дата"
  />
  <span v-show="description">{{ description }}</span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  description: String,
  label: String,
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue.toISOString())
  }
});
</script>

<style lang="scss" scoped>
$lightGrey: #ccc;
$grey1: #8a92a6;

label {
  margin: 12px 0 4px;
  font-weight: bold;
}

span {
  color: $grey1;
  line-height: 1em;
  margin-top: 4px;
}

.date-picker {
  padding: 4px 0;
  margin-bottom: 4px;
  min-width: 300px;
  width: 100%;
}

textarea {
  min-height: 300px;
}
</style>