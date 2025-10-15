<template>
  <div class="create-animal">
    <div class="create-animal__sub-container">
      <h2>Добавление животного</h2>
      <AnimalForm @onsubmit="onSubmit" />
    </div>
  </div>
</template>

<script setup>
import { toRaw } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import AnimalForm from '@/components/common/AnimalForm.vue';

const store = useStore();
const router = useRouter();

function onSubmit(values) {
  store.dispatch('app/setLoading', true);
  store
    .dispatch(`animals/createAnimal`, toRaw(values))
    .then(() => {
      router.push(`/`);
    })
    .finally(() => {
      store.dispatch('app/setLoading', false);
    });
}

</script>

<style scoped lang="scss">
$lightestGrey: #fafafa;
$black1: #232d42;

.create-animal {
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