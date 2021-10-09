<template>
  <label class="base-input__label">
    <b>{{ label }}</b>
  </label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="base-input__field"
  />
</template>

<script>
export default {
  props: {
    label: String,
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
$lightGrey: #ccc;

.base-input {
  &__label {
    margin: 16px 0 8px;
  }
  &__field {
    outline: none;
    border: 1px solid $lightGrey;
    padding: 4px 8px;
    border-radius: 4px;
  }
}
</style>
