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

    <div v-for="section in visibleSections" :key="section.type" class="health-records__section">
      <div class="health-records__section-title">
        {{ section.title }}
      </div>

      <div
        :ref="(el) => setTimelineRef(el, section.type)"
        class="health-records__timeline-wrapper"
      >
        <div class="health-records__timeline">
          <div class="health-records__line" />

          <a-popover
            v-for="record in getRecordsByType(section.type)"
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
  { type: HealthRecordType.FLEAS_AND_TICKS, title: 'Антипаразитарная обработка от блох и клещей' },
  { type: HealthRecordType.DEWORMING, title: 'Антипаразитарная обработка от глистов' },
  { type: HealthRecordType.VET_VISIT, title: 'Осмотр в ветклинике' },
  { type: HealthRecordType.LAB_TEST, title: 'Анализы' },
];

const getRecordsByType = (type) => records.value
  .filter((r) => r.type === type)
  .slice()
  .sort((a, b) => new Date(a.date) - new Date(b.date));

const visibleSections = computed(() => sections.filter(
  (s) => getRecordsByType(s.type).length > 0,
));

const formatDate = (date) => parseDateWithNumbers(date);

const isFuture = (date) => new Date(date) > new Date();

const timelineRefs = ref({});
const setTimelineRef = (el, type) => {
  if (el) {
    timelineRefs.value[type] = el;
  }
};

const scrollAllToEnd = () => {
  Object.values(timelineRefs.value).forEach((el) => {
    if (el && el.scrollWidth > el.clientWidth) {
      el.scrollLeft = el.scrollWidth;
    }
  });
};

onMounted(() => {
  nextTick(scrollAllToEnd);
});

watch(visibleSections, () => {
  nextTick(scrollAllToEnd);
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
      background: darken($grey2, 5%);
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

  &__section {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid $grey2;

    &:first-of-type {
      border-top: none;
      padding-top: 0;
    }
  }

  &__section-title {
    font-weight: 500;
    font-size: 16px;
    color: $black1;
    align-self: flex-start;
    text-align: left;
  }

  &__timeline-wrapper {
    overflow-x: auto;
    padding: 16px 0 40px;

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
    gap: 80px;
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
    font-size: 13px;
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