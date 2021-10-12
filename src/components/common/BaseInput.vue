<template>
  <label>{{ label }}</label>
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
};
</script>

<style lang="scss" scoped>
$lightGrey: #ccc;

label {
  margin: 16px 0 8px;
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
}
</style>
