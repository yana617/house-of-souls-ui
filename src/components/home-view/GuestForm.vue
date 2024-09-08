<template>
  <input
    :value="name"
    type="text"
    placeholder="Имя"
    @input="$emit('update:name', $event.target.value)"
  >
  <input
    :value="surname"
    type="text"
    placeholder="Фамилия"
    @input="$emit('update:surname', $event.target.value)"
  >
  <input
    :value="phone"
    type="text"
    placeholder="Телефон"
    @input="$emit('update:phone', $event.target.value)"
  >
</template>

<script>
export default {
  props: {
    name: String,
    surname: String,
    phone: String,
  },
  emits: ['update:surname', 'update:phone', 'update:name'],
};
</script>

<style scoped lang="scss">
$lightGrey: #ccc;

input {
  outline: none;
  border: 1px solid $lightGrey;
  padding: 4px 8px;
  border-radius: 4px;
  margin: 2px 0;
}
</style>
