<template>
  <input :value="name" @input="$emit('update:name', $event.target.value)" type="text" placeholder="Имя" />
  <input :value="surname" type="text" placeholder="Фамилия" @input="$emit('update:surname', $event.target.value)" />
  <input :value="phone" type="text" placeholder="Телефон" @input="$emit('update:phone', $event.target.value)" />
</template>

<script>
export default {
  props: {
    name: String,
    surname: String,
    phone: String,
  },
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
