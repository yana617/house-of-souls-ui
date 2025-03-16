<template>
  <label v-show="label">{{ label }}</label>
  <input v-if="!isTextarea" v-model="inputValue">
  <textarea v-else v-model="inputValue" />
  <span v-show="description" class="input-v2__description">{{ description }}</span>
  <span class="input-v2__error">{{ error }}</span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: String,
  options: Array,
  description: String,
  isTextarea: Boolean,
  modelValue: [String, Number],
  error: String,
});

const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  }
});
</script>

<style lang="scss" scoped>
$lightGrey: #ccc;
$grey1: #8a92a6;

.input-v2 {
  &__description {
    color: $grey1;
    line-height: 1em;
    margin-top: 4px;
  }

  &__error {
    color: red;
    margin-top: 4px;
  }
}

label {
  margin: 12px 0 4px;
  font-weight: bold;
}

input,
textarea {
  outline: none;
  border: 1px solid $lightGrey;
  padding: 4px 8px;
  border-radius: 4px;
  resize: none;
  margin-bottom: 4px;
  min-width: 300px;
  width: 100%;
}

textarea {
  min-height: 300px;
}
</style>