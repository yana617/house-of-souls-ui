<template>
  <button :disabled="loading || disabled">{{ loading ? 'Загрузка..' : title }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    title: String,
    loading: Boolean,
    disabled: Boolean,
  },
};
</script>

<style scoped lang="scss">
$greyBlue: #2c3e50;
$lightGrey: #f8f8f8;

button {
  line-height: 1.15;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 4px;
  outline: none;
  padding: 0.375rem 0.75rem;
  font-weight: 400;
  text-align: center;
  font-family: Helvetica, Avenir, Arial, sans-serif;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: white;
    color: $greyBlue;
  }

  &:hover:disabled {
    background-color: $lightGrey !important;
    color: grey !important;
  }

  &:disabled {
    background-color: $lightGrey;
    border-color: grey;
    color: grey;
    cursor: default;
  }

  @media (max-width: 360px) {
    font-size: 13px;
  }
}
</style>
