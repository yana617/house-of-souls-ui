<template>
  <div class="health-record-tooltip">
    <button
      v-permission="'EDIT_ANIMAL'"
      class="health-record-tooltip__delete"
      @click="onDelete(record.id)"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 4H3.5H14.5"
          stroke="#B66565"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          :d="trashIconPath"
          stroke="#B66565"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div class="health-record-tooltip__block">
      <div class="health-record-tooltip__label">
        Дата
      </div>
      <div class="health-record-tooltip__value">
        {{ formatDate(record.date) }}
      </div>
    </div>

    <div v-if="record.drug_name" class="health-record-tooltip__block">
      <div class="health-record-tooltip__label">
        Препарат
      </div>
      <div class="health-record-tooltip__value">
        {{ record.drug_name }}
      </div>
    </div>

    <div v-if="record.next_due_date" class="health-record-tooltip__block">
      <div class="health-record-tooltip__label">
        Следующая
      </div>
      <div class="health-record-tooltip__value">
        {{ formatDate(record.next_due_date) }}
      </div>
    </div>

    <div v-if="record.notes" class="health-record-tooltip__block">
      <div class="health-record-tooltip__label">
        Заметки
      </div>
      <div class="health-record-tooltip__value">
        {{ record.notes }}
      </div>
    </div>

    <div v-if="record.files?.length" class="health-record-tooltip__block">
      <div class="health-record-tooltip__label">
        Файлы
      </div>
      <a
        v-for="(file, i) in record.files"
        :key="i"
        :href="file.link"
        target="_blank"
        rel="noopener noreferrer"
        class="health-record-tooltip__file"
      >
        {{ file.name }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { parseDateWithNumbers } from '@/utils/date';

defineProps({
  record: {
    type: Object,
    required: true,
  },
  onDelete: {
    type: Function,
    required: true,
  },
});

const trashIconPath = 'M5.5 4V3C5.5 2.6 5.6 2.3 5.9 2C6.2 1.7 6.5 1.5 7 1.5H9'
  + 'C9.5 1.5 9.8 1.7 10.1 2C10.4 2.3 10.5 2.6 10.5 3V4M12.5 4V14.5'
  + 'C12.5 14.9 12.4 15.2 12.1 15.5C11.8 15.8 11.5 16 11 16H5'
  + 'C4.5 16 4.2 15.8 3.9 15.5C3.6 15.2 3.5 14.9 3.5 14.5V4H12.5Z';

const formatDate = (date) => parseDateWithNumbers(date);
</script>

<style lang="scss" scoped>
$black1: #232d42;
$grey3: #b5bac9;

.health-record-tooltip {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 200px;
  max-width: 260px;
  padding-right: 24px;

  &__delete {
    position: absolute;
    top: -4px;
    right: -4px;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.7;
    }
  }

  &__block {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__label {
    color: $grey3;
    font-size: 13px;
    font-weight: 400;
  }

  &__value {
    color: $black1;
    font-size: 15px;
    font-weight: 400;
    word-break: break-word;
  }

  &__file {
    display: block;
    color: #1677ff;
    font-size: 14px;
    text-decoration: none;
    word-break: break-all;
    margin-top: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>