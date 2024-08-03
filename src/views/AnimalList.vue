<template>
  <div class="animal-list">
    Список животных
    <div class="animal-list__animal" v-for="animal in animals" :key="animal.id">
      <router-link :to="`/animals/${animal.id}`">
      {{ animal.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimalList',
  components: {},
  data() {
    return {
      animals: [{
        id: '1',
        name: 'Мартин',
      }],
    };
  },
};
</script>

<style scoped lang="scss">
$lightestGrey: #FAFAFA;

.animal-list {
  background-color: $lightestGrey;
  min-height: calc(100vh - 50px);

  &__animal {
    margin: 16px;
  }
}
</style>
