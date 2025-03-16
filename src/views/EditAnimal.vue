<template>
  <div class="edit-animal">
    <div class="edit-animal__sub-container">
      <h2>Редактирование животного</h2>
      <AnimalForm v-if="animal.name" :initial-values="animal" @onsubmit="onSubmit" />
    </div>
  </div>
</template>

<script setup>
import { toRaw, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import AnimalForm from '@/components/common/AnimalForm.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const animalId = route.params.id;
const animal = computed(() => store.state.animals.current);
const errors = computed(() => store.state.animals.errors);

store.dispatch('app/setLoading', true);
store.dispatch('animals/getAnimalById', { id: animalId }).finally(() => {
  store.dispatch('app/setLoading', false);
});

function onSubmit(values) {
  store.dispatch('app/setLoading', true);
  store
    .dispatch(`animals/updateAnimal`, { id: animalId, body: toRaw(values) })
    .then(() => {
      if (errors.value.length === 0) {
        router.push(`/animals/${animalId}`);
      }
    })
    .finally(() => {
      store.dispatch('app/setLoading', false);
    });
}

</script>

<style scoped lang="scss">
$lightestGrey: #fafafa;
$black1: #232d42;

.edit-animal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;

  &__sub-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>