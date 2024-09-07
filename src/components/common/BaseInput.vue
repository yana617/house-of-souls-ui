<template>
  <label v-show="label">{{ label }}</label>
  <span v-show="description">{{ description }}</span>
  <input
    v-if="!isTextarea"
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
  <textarea
    v-if="isTextarea"
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  props: {
    label: String,
    isTextarea: Boolean,
    description: String,
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue'],
};
</script>

<style lang="scss" scoped>
$lightGrey: #ccc;

label {
  margin: 12px 0 8px;
  font-weight: bold;
}

span {
  margin-bottom: 8px;
}

input,
textarea {
  outline: none;
  border: 1px solid $lightGrey;
  padding: 4px 8px;
  border-radius: 4px;
  resize: none;
  margin-bottom: 4px;
}
</style>
