<template>
  <div class="modal__wrapper" @click="onClose()">
    <div class="new-ad-modal" @click.stop>
      <h2>Дата обьявления</h2>

      <DatePicker
        v-model="selectedDate"
        label="Укажите дату"
        description="Дата подачи обьявления / последнего поднятия (по дефолту - сегодня)"
        class="new-ad-modal__picker"
      />

      <CommonButton
        class="new-ad-modal__create-btn"
        title="Добавить"
        @click="onSubmit(selectedDate)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CommonButton from '@/components/common/CommonButton.vue';
import DatePicker from '../common/DatePicker.vue';

const { onSubmit, onClose } = defineProps({
  onSubmit: {
    type: Function,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

const selectedDate = ref(new Date().toISOString());
</script>

<style lang="scss" scoped>
$green: #42b983;

.new-ad-modal {
  padding: 32px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  gap: 16px;

  h2 {
    padding: 0;
    margin: 0;
  }

  &__picker {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 300px;
    text-align: left;
  }

  &__create-btn {
    color: $green;
    border-color: $green;
    padding: 8px 16px;
    margin-top: 16px;

    &:hover {
      background-color: $green;
      color: white;
    }
  }
}
</style>
