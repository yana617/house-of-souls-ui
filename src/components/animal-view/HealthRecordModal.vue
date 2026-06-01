<template>
  <div class="modal__wrapper" @click="onClose()">
    <div class="health-record-modal" @click.stop>
      <h2>Новая запись</h2>

      <Select
        v-model="form.type"
        label="Тип"
        :options="typeOptions"
        class="health-record-modal__field"
      />

      <DatePicker
        v-model="form.date"
        label="Дата"
        class="health-record-modal__field"
      />

      <BaseInput
        v-if="needsDrugName"
        v-model="form.drug_name"
        label="Название препарата"
        class="health-record-modal__field"
      />

      <DatePicker
        v-if="needsDrugName"
        v-model="form.next_due_date"
        label="Следующая дата"
        class="health-record-modal__field"
      />

      <BaseInput
        v-model="form.notes"
        label="Заметки"
        is-textarea
        class="health-record-modal__field"
      />

      <div v-if="needsFiles" class="health-record-modal__field">
        <label class="health-record-modal__label">Файлы *</label>

        <div
          v-for="(file, i) in form.files"
          :key="i"
          class="health-record-modal__file-row"
        >
          <a
            :href="file.link"
            target="_blank"
            rel="noopener noreferrer"
            class="health-record-modal__file-name"
          >
            {{ file.name }}
          </a>
          <a class="health-record-modal__delete" @click="removeFile(i)">
            Удалить
          </a>
        </div>

        <div class="health-record-modal__upload">
          <input
            ref="fileInputRef"
            type="file"
            multiple
            :accept="ACCEPTED_EXTENSIONS"
            class="health-record-modal__file-input"
            @change="onFilesSelected($event)"
          >
          <a-button
            shape="round"
            :loading="uploading"
            @click="triggerFileInput()"
          >
            Загрузить файлы
          </a-button>
        </div>

        <span class="health-record-modal__upload-hint">
          Минимум 1 файл. До 15 файлов, до 10MB каждый.
        </span>
      </div>

      <CommonButton
        class="health-record-modal__submit-btn"
        title="Добавить"
        :disabled="!isValid"
        @click="handleSubmit()"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';

import CommonButton from '@/components/common/CommonButton.vue';
import DatePicker from '@/components/common/DatePicker.vue';
import BaseInput from '@/components/common/BaseInput.vue';
import Select from '@/components/common/Select.vue';
import notifications from '@/utils/notifications';
import { HealthRecordType } from '@/api/health-records';

const ACCEPTED_EXTENSIONS = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf,.odt,.ods,.jpg,.jpeg,.png';
const MAX_FILES_PER_REQUEST = 15;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

const store = useStore();

const typeOptions = [
  { value: HealthRecordType.VACCINE, label: 'Вакцинация' },
  { value: HealthRecordType.DEWORMING, label: 'От глистов' },
  { value: HealthRecordType.FLEAS_AND_TICKS, label: 'От блох и клещей' },
  { value: HealthRecordType.VET_VISIT, label: 'Осмотр в ветклинике' },
  { value: HealthRecordType.LAB_TEST, label: 'Анализы' },
];

const form = ref({
  type: HealthRecordType.VACCINE,
  date: new Date().toISOString(),
  drug_name: '',
  next_due_date: '',
  notes: '',
  files: [],
});

const fileInputRef = ref(null);
const uploading = ref(false);

const needsDrugName = computed(() => [
  HealthRecordType.VACCINE,
  HealthRecordType.DEWORMING,
  HealthRecordType.FLEAS_AND_TICKS,
].includes(form.value.type));

const needsFiles = computed(() => [
  HealthRecordType.VET_VISIT,
  HealthRecordType.LAB_TEST,
].includes(form.value.type));

const computeNextDueDate = (type, date) => {
  if (!date) return '';
  const base = dayjs(date);
  if (type === HealthRecordType.VACCINE) {
    return base.add(1, 'year').subtract(1, 'day').toISOString();
  }
  if (type === HealthRecordType.FLEAS_AND_TICKS) {
    return base.add(90, 'day').toISOString();
  }
  return '';
};

watch(
  () => [form.value.type, form.value.date],
  () => {
    form.value.next_due_date = computeNextDueDate(form.value.type, form.value.date);
  },
  { immediate: true },
);

const isValid = computed(() => {
  if (!form.value.type || !form.value.date) return false;
  if (needsDrugName.value && !form.value.drug_name) return false;
  if (needsFiles.value && form.value.files.length === 0) return false;
  return true;
});

const triggerFileInput = () => {
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
    fileInputRef.value.click();
  }
};

const removeFile = (index) => {
  form.value.files.splice(index, 1);
};

const onFilesSelected = async (event) => {
  const selected = Array.from(event.target.files || []);
  if (!selected.length) return;

  if (selected.length > MAX_FILES_PER_REQUEST) {
    notifications.error(`Максимум ${MAX_FILES_PER_REQUEST} файлов за раз`);
    return;
  }

  const tooLarge = selected.find((file) => file.size > MAX_FILE_SIZE);
  if (tooLarge) {
    notifications.error('Размер каждого файла не должен превышать 10MB');
    return;
  }

  uploading.value = true;
  try {
    const uploaded = await store.dispatch('documents/uploadDocuments', selected);
    if (uploaded && uploaded.length) {
      form.value.files = [...form.value.files, ...uploaded];
    }
  } finally {
    uploading.value = false;
  }
};

const handleSubmit = () => {
  const payload = {
    type: form.value.type,
    date: form.value.date,
  };
  if (form.value.drug_name) payload.drug_name = form.value.drug_name;
  if (form.value.next_due_date) payload.next_due_date = form.value.next_due_date;
  if (form.value.notes) payload.notes = form.value.notes;
  if (form.value.files.length) {
    payload.files = form.value.files.map(({ name, link }) => ({ name, link }));
  }
  props.onSubmit(payload);
};
</script>

<style lang="scss" scoped>
$green: #65b687;
$grey1: #8a92a6;

.health-record-modal {
  padding: 32px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  gap: 8px;
  min-width: 360px;
  max-width: 480px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;

  h2 {
    padding: 0;
    margin: 0 0 8px;
  }

  &__field {
    width: 100%;
    text-align: left;
  }

  &__label {
    font-weight: bold;
    display: block;
    margin: 12px 0 8px;
  }

  &__file-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  &__file-name {
    flex: 1;
    color: #1677ff;
    text-decoration: none;
    word-break: break-all;

    &:hover {
      text-decoration: underline;
    }
  }

  &__delete {
    color: #ff4d4f;
    cursor: pointer;
  }

  &__upload {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
  }

  &__file-input {
    display: none;
  }

  &__upload-hint {
    font-size: 12px;
    color: $grey1;
    margin-top: 4px;
  }

  &__submit-btn {
    color: $green;
    border-color: $green;
    padding: 8px 16px;
    margin-top: 16px;
    align-self: stretch;

    &:hover {
      background-color: $green;
      color: white;
    }
  }
}
</style>