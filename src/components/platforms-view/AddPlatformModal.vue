<template>
  <div class="modal__wrapper" @click="onCloseModal()">
    <div class="add-platform-modal" @click.stop>
      <img
        class="add-platform-modal__close-icon"
        alt="close-icon"
        src="@/assets/close.png"
        @click="onCloseModal()"
      >
      <h2>Добавление платформы</h2>

      <InputV2 v-model="name" class="add-platform-modal__name" placeholder="Имя" />

      <CommonButton
        :loading="loading"
        class="add-platform-modal__create-btn"
        title="Добавить"
        @click="onSubmit()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import CommonButton from '@/components/common/CommonButton.vue';
import InputV2 from '../common/InputV2.vue';

const store = useStore();

const name = ref("");
const loading = ref(false);

const onCloseModal = () => {
  store.dispatch('app/setModal', null);
};

const onSubmit = () => {
  const body = {
    name: name.value,
  };

  loading.value = true;
  store.dispatch('platforms/createPlatform', body)
    .then(() => {
      store.dispatch('platforms/getPlatforms');
      store.dispatch('app/setModal', null);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style lang="scss" scoped>
$green: #42b983;

.add-platform-modal {
  padding: 32px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;

  &__close-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 16px;
    top: 12px;
    cursor: pointer;
  }

  &__create-btn {
    color: $green;
    border-color: $green;
    padding: 8px 16px;

    &:hover {
      background-color: $green;
      color: white;
    }
  }
}
</style>