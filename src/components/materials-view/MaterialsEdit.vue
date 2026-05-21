<template>
  <div>
    <div
      v-for="(m, index) in modelValue"
      :key="index"
      class="material-edit"
    >
      <div class="material-edit__row">
        <a-input
          v-model:value="m.title"
          placeholder="Заголовок"
          class="material-edit__input"
        />

        <a-popconfirm
          title="Удалить материал?"
          @confirm="removeMaterial(index)"
        >
          <a class="material-edit__delete">Удалить</a>
        </a-popconfirm>
      </div>

      <a-textarea
        v-model:value="m.description"
        placeholder="Описание"
        :rows="3"
        class="material-edit__textarea"
      />

      <!-- LINKS -->
      <div class="material-edit__block">
        <div class="material-edit__block-header">
          <span>Ссылки</span>
          <a @click="addLink(index)">Добавить</a>
        </div>

        <div
          v-for="(link, i) in m.links"
          :key="i"
          class="material-edit__row"
        >
          <a-input
            v-model:value="m.links[i]"
            placeholder="https://..."
            class="material-edit__input"
          />
          <a class="material-edit__delete" @click="removeLink(index, i)">
            Удалить
          </a>
        </div>
      </div>

      <!-- FILES -->
      <div class="material-edit__block">
        <div class="material-edit__block-header">
          <span>Файлы</span>
        </div>

        <div
          v-for="(file, i) in m.files"
          :key="i"
          class="material-edit__file-row"
        >
          <a
            :href="file.link"
            target="_blank"
            rel="noopener noreferrer"
            class="material-edit__file-name"
          >
            {{ file.name }}
          </a>
          <a class="material-edit__delete" @click="removeFile(index, i)">
            Удалить
          </a>
        </div>

        <div class="material-edit__upload">
          <input
            :ref="(el) => setFileInput(el, index)"
            type="file"
            multiple
            :accept="ACCEPTED_EXTENSIONS"
            class="material-edit__file-input"
            @change="onFilesSelected($event, index)"
          >
          <a-button
            shape="round"
            :loading="uploadingIndex === index"
            @click="triggerFileInput(index)"
          >
            Загрузить файлы
          </a-button>
          <span class="material-edit__upload-hint">
            До 15 файлов, до 10MB каждый
          </span>
        </div>
      </div>
    </div>

    <a-button type="dashed" shape="round" @click="addMaterial">
      Добавить материал
    </a-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

import notifications from '@/utils/notifications';

const ACCEPTED_EXTENSIONS =
  '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf,.odt,.ods';
const MAX_FILES_PER_REQUEST = 15;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const store = useStore();

const fileInputs = ref({});
const uploadingIndex = ref(null);

const update = (value) => emit('update:modelValue', value);

const setFileInput = (el, index) => {
  if (el) {
    fileInputs.value[index] = el;
  }
};

const triggerFileInput = (index) => {
  const input = fileInputs.value[index];
  if (input) {
    input.value = '';
    input.click();
  }
};

const addMaterial = () => {
  update([
    ...props.modelValue,
    { title: '', description: '', links: [], files: [] },
  ]);
};

const removeMaterial = (index) => {
  const arr = [...props.modelValue];
  arr.splice(index, 1);
  update(arr);
};

const addLink = (i) => {
  const arr = [...props.modelValue];
  arr[i].links.push('');
  update(arr);
};

const removeLink = (i, linkIndex) => {
  const arr = [...props.modelValue];
  arr[i].links.splice(linkIndex, 1);
  update(arr);
};

const removeFile = (i, fileIndex) => {
  const arr = [...props.modelValue];
  arr[i].files.splice(fileIndex, 1);
  update(arr);
};

const onFilesSelected = async (event, index) => {
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

  uploadingIndex.value = index;
  try {
    const uploaded = await store.dispatch(
      'documents/uploadDocuments',
      selected,
    );

    if (uploaded && uploaded.length) {
      const arr = [...props.modelValue];
      arr[index].files = [...(arr[index].files || []), ...uploaded];
      update(arr);
    }
  } finally {
    uploadingIndex.value = null;
  }
};
</script>

<style scoped lang="scss">
.material-edit {
  padding: 16px;
  margin-bottom: 16px;
  background: #fafafa;
  border-radius: 8px;

  &__row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  &__file-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }

  &__input {
    flex: 1;
  }

  &__textarea {
    margin-bottom: 12px;
  }

  &__delete {
    margin-left: 8px;
    color: #ff4d4f;
    cursor: pointer;
  }

  &__block {
    margin-top: 12px;
  }

  &__block-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
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

  &__upload {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }

  &__file-input {
    display: none;
  }

  &__upload-hint {
    font-size: 12px;
    color: #8c8c8c;
  }
}
</style>
