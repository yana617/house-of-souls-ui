<template>
  <div class="modal__wrapper" @click="onCloseModal()">
    <div class="new-notice-modal" @click.stop>
      <img
        class="new-notice-modal__close-icon"
        alt="close-icon"
        src="@/assets/close.png"
        @click="onCloseModal()"
      >
      <h2>Добавление новости</h2>
      <input v-model="title" class="new-notice-modal__title" placeholder="Заголовок">
      <span class="new-notice-modal__title__description">
        Не нужно указывать кличку животного, если вы выбрали животное ниже (будет дублироваться)
      </span>
      <span class="new-notice-modal__error">{{ getError('title') }}</span>
      <textarea v-model="description" class="new-notice-modal__description" placeholder="Подробности" />
      <span class="new-notice-modal__error">{{ getError('description') }}</span>
      <Select v-model="animalId" :options="animalsShort" class="new-notice-modal__animal-id" />
      <span class="new-notice-modal__error">{{ getError('animal_id') }}</span>
      <label for="authorized-switch" class="new-notice-modal__authorized">
        Только для волонторов
        <a-switch id="authorized-switch" v-model:checked="internalOnly" />
      </label>
      <CommonButton
        :loading="loading"
        class="new-notice-modal__create-btn"
        title="Добавить"
        @click="onSubmit()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { findError } from '@/utils/validation';
import CommonButton from '@/components/common/CommonButton.vue';

const store = useStore();

const title = ref("");
const description = ref("");
const internalOnly = ref(false);
const animalId = ref(null);
const loading = ref(false);

const errors = computed(() => store.state.notices.createErrors);
const animalsShort = computed(
  () => {
    const animals = store.state.animals.shortList || [];
    const mappedAnimals = animals.map((animal) => ({ label: animal.name, value: animal.id }));
    return [{ label: "Не выбрано", value: null }, ...mappedAnimals];
  });

const onCloseModal = () => {
  store.dispatch('app/setModal', null);
};

const onSubmit = () => {
  const body = {
    title: title.value,
    description: description.value,
    internalOnly: internalOnly.value,
    animal_id: animalId.value,
  };

  loading.value = true;
  store.dispatch('notices/createNotice', body)
    .then(() => {
      if (errors.value.length === 0) {
        store.dispatch('notices/getNotices');
        store.dispatch('app/setModal', null);
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const getError = (field) => {
  return findError(errors.value, field);
};

onUnmounted(() => {
  store.dispatch('notices/clearCreateErrors');
});
</script>

<style lang="scss" scoped>
$green: #42b983;
$lightGrey: #ccc;

.new-notice-modal {
  width: 600px;
  padding: 16px 0 8px 0;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;

  &__close-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 16px;
    top: 12px;
    cursor: pointer;
  }

  &__title,
  &__description {
    display: flex;
    width: 80%;
    border: 1px solid $lightGrey;
    outline: none;
    padding: 8px 16px;
    margin: 8px;
    border-radius: 8px;
  }

  &__animal-id {
    display: flex;
    width: 80%;
    margin: 8px 8px 16px 8px;
    border-radius: 8px;
    text-align: left;
  }

  &__authorized {
    width: 80%;
    text-align: left;
  }

  &__description {
    resize: none;
    height: 160px;
  }

  &__create-btn {
    color: $green;
    border-color: $green;
    margin-top: 16px;
    margin-bottom: 8px;
    padding: 8px 16px;

    &:hover {
      background-color: $green;
      color: white;
    }
  }

  &__error {
    width: 80%;
    text-align: left;
    color: rgba(255, 0, 0, 0.8);
    font-size: 13px;
    margin-top: -6px;
    margin-bottom: 4px;
  }

  &__title {
    &__description {
      text-align: left;
      width: 80%;
      font-size: 12px;
      margin-top: -4px;
      margin-bottom: 4px;
    }
  }
}
</style>
