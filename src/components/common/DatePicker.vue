<template>
  <div class="date-picker">
    <label v-show="label">{{ label }}</label>
    <a-date-picker
      v-model:value="inputValue"
      class="date-picker__picker"
      placeholder="Дата"
    />
    <span v-show="description">{{ description }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const props = defineProps({
  description: String,
  label: String,
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get() {
    return props.modelValue ? dayjs(props.modelValue) : null;
  },
  set(newValue) {
    if (!newValue) {
      emit('update:modelValue', '');
      return;
    }
    const isoString = dayjs(newValue)
      .utc()
      .hour(12)
      .minute(0)
      .second(0)
      .millisecond(0)
      .format();
    emit('update:modelValue', isoString);
  },
});
</script>

<style lang="scss" scoped>
$lightGrey: #ccc;
$grey1: #8a92a6;

.date-picker {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-weight: bold;
  }

  span {
    color: $grey1;
    line-height: 1em;
    margin-top: 4px;
  }

  &__picker {
    padding: 4px 8px;
    margin-bottom: 4px;
    min-width: 300px;
    width: 100%;
  }

  textarea {
    min-height: 300px;
  }
}
</style>