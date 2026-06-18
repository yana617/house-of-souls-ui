<template>
  <div class="health-records">
    <div class="health-records__header">
      <span class="health-records__title">Медицинская карта</span>
      <button v-permission="'EDIT_ANIMAL'" class="health-records__add-btn" @click="showModal = true">
        <div class="health-records__add-icon">
          <div style="display: flex;">
            +
          </div>
        </div>
        Добавить
      </button>
    </div>

    <div ref="timelineRef" class="health-records__timeline-wrapper">
      <div class="health-records__timeline">
        <div class="health-records__line" />

        <a-popover
          v-for="record in allRecords"
          :key="record.id"
          trigger="hover"
          placement="bottom"
          overlay-class-name="health-records__popover"
        >
          <template #content>
            <HealthRecordTooltip
              :record="record"
              :on-delete="handleDelete"
            />
          </template>

          <div class="health-records__record">
            <div class="health-records__record-type">
              {{ typeTitle[record.type] }}
            </div>
            <div
              class="health-records__dot"
              :class="{ 'health-records__dot--future': isFuture(record.date) }"
            />
            <div class="health-records__record-info">
              <div class="health-records__record-date">
                {{ formatDate(record.date) }}
              </div>
              <div v-if="record.drug_name" class="health-records__record-name">
                {{ record.drug_name }}
              </div>
            </div>
          </div>
        </a-popover>
      </div>
    </div>

    <HealthRecordModal
      v-if="showModal"
      :on-submit="handleCreate"
      :on-close="() => (showModal = false)"
    />
  </div>
</template>

<script setup>
import {
  ref, computed, onMounted, watch, nextTick,
} from 'vue';
import { useStore } from 'vuex';

import { HealthRecordType } from '@/api/health-records';
import { parseDateWithNumbers } from '@/utils/date';
import HealthRecordModal from './HealthRecordModal.vue';
import HealthRecordTooltip from './HealthRecordTooltip.vue';

const store = useStore();

const animal = computed(() => store.state.animals.current);
const records = computed(() => animal.value?.health_records || []);

const showModal = ref(false);

const sections = [
  { type: HealthRecordType.VACCINE, title: 'Вакцинация' },
  { type: HealthRecordType.FLEAS_AND_TICKS, title: 'Обработка от блох/клещей' },
  { type: HealthRecordType.DEWORMING, title: 'Обработка от глистов' },
  { type: HealthRecordType.VET_VISIT, title: 'Посещение ветклиники' },
  { type: HealthRecordType.LAB_TEST, title: 'Анализы' },
];

const typeTitle = Object.fromEntries(sections.map((s) => [s.type, s.title]));

const allRecords = computed(() => records.value
  .slice()
  .sort((a, b) => new Date(a.date) - new Date(b.date)));

const formatDate = (date) => parseDateWithNumbers(date);

const isFuture = (date) => new Date(date) > new Date();

const timelineRef = ref(null);

const scrollToEnd = () => {
  const el = timelineRef.value;
  if (el && el.scrollWidth > el.clientWidth) {
    el.scrollLeft = el.scrollWidth;
  }
};

onMounted(() => {
  nextTick(scrollToEnd);
});

watch(allRecords, () => {
  nextTick(scrollToEnd);
});

const handleCreate = async (body) => {
  await store.dispatch('healthRecords/createHealthRecord', {
    animalId: animal.value.id,
    body,
  });
  await store.dispatch('animals/getAnimalById', { id: animal.value.id });
  showModal.value = false;
};

const handleDelete = async (recordId) => {
  await store.dispatch('healthRecords/deleteHealthRecord', {
    animalId: animal.value.id,
    recordId,
  });
  await store.dispatch('animals/getAnimalById', { id: animal.value.id });
};
</script>

<style scoped lang="scss">
@use 'sass:color';
$black1: #232d42;
$grey1: #8a92a6;
$grey2: #f4f6f9;
$green: #65b687;
$darkBlue: #2f3e4e;

.health-records {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 8px 64px rgba(15, 34, 67, 0.03), 0px 0px 1px rgba(15, 34, 67, 0.08);
  border-radius: 8px;
  width: 100%;
  color: $black1;
  box-sizing: border-box;
  margin-top: 32px;
  padding: 32px;
  gap: 24px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__title {
    font-weight: 500;
    font-size: 28px;
    line-height: 100%;
    text-align: left;
  }

  &__add-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: $grey2;
    border: none;
    border-radius: 26px;
    padding: 12px 20px;
    font-size: 16px;
    color: $black1;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: color.adjust($grey2, $lightness: -5%);
    }
  }

  &__add-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: $darkBlue;
    color: white;
    font-size: 16px;
    line-height: 1;
    font-weight: 400;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      transform: translateY(-1px);
    }
  }

  &__timeline-wrapper {
    overflow-x: auto;
    padding: 40px 0 40px;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: $grey2;
      border-radius: 3px;
    }
  }

  &__timeline {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 60px;
    gap: 120px;
    padding: 0 34px 0 44px;
    min-width: max-content;
  }

  &__line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: $darkBlue;
    z-index: 0;
  }

  &__record {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }

  &__dot {
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: $green;
    border: 2px solid white;
    box-shadow: 0 0 0 1px $green;
    cursor: pointer;

    &--future {
      background: white;
      box-shadow: 0 0 0 2px $darkBlue;
    }
  }

  &__record-type {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    max-width: 90px;
    font-size: 12px;
    font-weight: 500;
    color: $black1;
    white-space: normal;
    text-align: center;
    line-height: 1.3;
  }

  &__record-info {
    position: absolute;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    white-space: nowrap;
  }

  &__record-date {
    font-size: 14px;
    font-weight: 500;
    color: $black1;
  }

  &__record-name {
    font-size: 12px;
    color: $grey1;
    margin-top: 2px;
  }

  @media (max-width: 479px) {
    padding: 24px 16px;
    box-shadow: none;

    &__title {
      font-size: 22px;
    }
  }
}
</style>