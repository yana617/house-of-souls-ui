<template>
  <button>{{title}}</button>
</template>

<script>

export default {
  name: 'Button',
  props: {
    title: String,
  },
};

</script>

<style scoped lang="scss">
$grey-blue: #2c3e50;

button {
  background-color: transparent;
  color: $grey-blue;
  border: 1px solid $grey-blue;
  border-radius: 4px;
  outline: none;
  padding: .375rem .75rem;
  font-weight: 400;
  text-align: center;
  font-family: Helvetica, Avenir, Arial, sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: $grey-blue;
    color: white;
  }
}

</style>
