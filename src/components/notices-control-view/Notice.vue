<template>
  <div class="notice">
    <label for="title">Заголовок</label>
    <input
      id="notice-title"
      v-model="title"
      :disabled="!edit"
      class="notice__title"
      :class="{ notice__title__background: !title }"
    >
    <span v-if="edit" class="notice__error">{{ getError('title') }}</span>
    <label for="description">Подробности</label>
    <textarea
      v-model="description"
      :disabled="!edit"
      :class="{ notice__description__background: !description }"
      class="notice__description"
    />
    <span v-if="edit" class="notice__error">{{ getError('description') }}</span>
    <label for="animal_id">Для животного</label>
    <Select
      v-model="animalId"
      :disabled="!edit"
      :options="animalsShort"
      class="notice__animal-id"
    />
    <span v-if="edit" class="notice__error">{{ getError('animal_id') }}</span>
    <div class="notice__checkbox-container">
      <div class="notice__authorized-label">
        Видно только волонтерам:
      </div>
      <a-switch v-model:checked="internalOnly" :disabled="!edit" />
    </div>
    <div class="notice__btn-container">
      <CommonButton
        v-if="!edit && hasPermissions('EDIT_NOTICE')"
        class="notice__edit-btn"
        title="редактировать"
        @click="onEdit"
      />
      <CommonButton
        v-if="edit && hasPermissions('EDIT_NOTICE')"
        :loading="loading"
        class="notice__update-btn"
        title="сохранить"
        @click="onUpdate"
      />
      <CommonButton
        v-if="edit"
        :disabled="loading"
        class="notice__cancel-btn"
        title="отменить"
        @click="onCancel"
      />
      <CommonButton
        v-if="hasPermissions('DELETE_NOTICE')"
        :disabled="loading"
        class="notice__delete-btn"
        title="удалить"
        @click="onDelete"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import CommonButton from '@/components/common/CommonButton.vue';
import { findError } from '@/utils/validation';

const { noticeId } = defineProps({
  noticeId: {
    type: String,
    required: true
  },
});

const store = useStore();
const edit = ref(false);
const loading = ref(false);

const notices = computed(() => store.state.notices.data);
const notice = computed(() => notices.value[noticeId] || {});
const animalsShort = computed(
  () => {
    const animals = store.state.animals.shortList || [];
    const mappedAnimals = animals.map((animal) => ({ label: animal.name, value: animal.id }));
    return [{ label: "Не выбрано", value: null }, ...mappedAnimals];
  });

const errors = computed(() => store.state.notices.updateErrors);
const permissions = computed(() => store.state.permissions.my);

const title = ref('');
const description = ref('');
const internalOnly = ref(false);
const animalId = ref('');

watch(notice, (newNotice) => {
  if (newNotice) {
    title.value = newNotice.title || '';
    description.value = newNotice.description || '';
    internalOnly.value = newNotice.internalOnly || false;
    animalId.value = newNotice.animal_id || null;
  }
}, { immediate: true });

onMounted(() => {
  if (!notice.value?.title) {
    store.dispatch('notices/getNoticeById', { _id: noticeId });
  }
});

const onEdit = () => {
  edit.value = true;
};

const onUpdate = () => {
  loading.value = true;
  store.dispatch('notices/updateNotice', {
    _id: noticeId,
    title: title.value,
    description: description.value,
    internalOnly: internalOnly.value,
    animal_id: animalId.value,
  }).then(() => {
    if (this.errors.length === 0) {
      edit.value = false;
    }
  }).finally(() => {
    loading.value = false;
  });
};

const onCancel = () => {
  title.value = notice.value.title || '';
  description.value = notice.value.description || '';
  internalOnly.value = notice.value.internalOnly || false;
  animalId.value = notice.value.animal_id || '';
  edit.value = false;
};

const onDelete = () => {
  loading.value = true;
  store.dispatch('notices/deleteNotice', { _id: noticeId })
    .then(() => store.dispatch('notices/getNotices'))
    .finally(() => loading.value = false)
};

const getError = (field) => findError(errors.value, field);
const hasPermissions = (permission) => permissions.value.includes(permission);
</script>

<style lang="scss" scoped>
$green: #42b983;
$lightGrey: #ccc;
$lightestGrey: #f0f0f0;

.notice {
  display: flex;
  text-align: left;
  flex-direction: column;
  padding: 8px 16px;
  border: 1px solid $lightGrey;
  border-radius: 2px;
  margin: 8px 0;
  width: 100%;

  label {
    font-weight: bold;
  }

  &__title {
    padding: 4px 12px;
    margin: 8px 0;
    width: 100%;
    outline: none;
    border: 1px solid $lightGrey;
    border-radius: 4px;
    font-size: 14px;

    &:disabled {
      background-color: rgba(0, 0, 0, 0.05);
      border-color: $lightestGrey;
    }

    &__background {
      height: 50px;
      animation: rainbow 3s infinite;
    }
  }

  &__description {
    padding: 4px 12px;
    resize: none;
    height: fit-content;
    outline: none;
    min-height: 80px;
    width: 100%;
    margin: 8px 0;
    border: 1px solid $lightGrey;
    border-radius: 4px;
    font-size: 14px;

    &:disabled {
      background-color: rgba(0, 0, 0, 0.05);
      border-color: $lightestGrey;
    }

    &__background {
      height: 40px;
      animation: rainbow 3s infinite;
      border: none;
    }
  }

  &__animal-id {
    margin: 8px 0;
  }

  &__btn-container {
    display: flex;
    width: 100%;
  }

  &__edit-btn {
    color: blue;
    border-color: blue;
    margin: 8px 4px;

    &:hover {
      background-color: blue;
      color: white;
    }
  }

  &__update-btn {
    color: $green;
    background-color: white;
    border-color: $green;
    margin: 8px 4px;

    &:hover {
      background-color: $green;
      color: white;
    }
  }

  &__cancel-btn,
  &__delete-btn {
    color: red;
    border-color: red;
    margin: 8px 4px;

    &:hover {
      background-color: red;
      color: white;
    }
  }

  &__delete-btn {
    margin-left: auto;
    margin-right: 0;
  }

  &__checkbox-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &__authorized-label {
    margin: 4px 8px 4px 0;
    font-weight: bold;
  }

  &__error {
    text-align: left;
    color: rgba(255, 0, 0, 0.8);
    font-size: 13px;
    margin-top: 0px;
    margin-bottom: 4px;
  }

  @media (max-width: 767px) {
    &__title {
      min-width: unset;
    }
  }
}
</style>
