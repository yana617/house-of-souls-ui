<template>
  <div class="notice">
    <label for="title">Заголовок</label>
    <input
      v-model="notice.title"
      :disabled="!edit"
      class="notice__title"
      :class="{ notice__title__background: !title }"
      id="notice-title"
    />
    <span v-if="edit" class="notice__error">{{ getError('title') }}</span>
    <label for="description">Подробности</label>
    <textarea
      v-model="notice.description"
      :disabled="!edit"
      :class="{ notice__description__background: !description }"
      class="notice__description"
    />
    <span v-if="edit" class="notice__error">{{ getError('description') }}</span>
    <div class="notice__checkbox-container">
      <div class="notice__authorized-label">
        Видно только волонтерам:
      </div>
      <a-switch v-model:checked="notice.internalOnly" :disabled="!edit" />
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
      <CommonButton v-if="edit" :disabled="loading" class="notice__cancel-btn" title="отменить" @click="onCancel" />
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

<script>
import { ref } from 'vue';
import { mapState } from 'vuex';

import CommonButton from '@/components/common/CommonButton.vue';
import { findError } from '@/utils/validation';

export default {
  name: 'Notice',
  components: { CommonButton },
  props: {
    noticeId: String,
    title: String,
    description: String,
    internalOnly: Boolean,
  },
  data() {
    return {
      notice: {
        _id: this.noticeId,
        title: this.title,
        description: this.description,
        internalOnly: ref(this.internalOnly),
      },
      edit: false,
      loading: false,
      findError,
    };
  },
  computed: mapState({
    errors: (state) => state.notices.updateErrors,
    permissions: (state) => state.permissions.my,
  }),
  watch: {
    title(newValue) {
      this.notice.title = newValue;
    },
    description(newValue) {
      this.notice.description = newValue;
    },
    internalOnly(newValue) {
      this.notice.internalOnly = ref(newValue);
    },
  },
  created() {
    if (!this.title) {
      this.$store.dispatch('notices/getNoticeById', { _id: this.noticeId });
    }
  },
  methods: {
    onEdit() {
      this.edit = true;
    },
    onUpdate() {
      this.loading = true;
      this.$store
        .dispatch('notices/updateNotice', this.notice)
        .then(() => {
          if (this.errors.length === 0) {
            this.edit = false;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onCancel() {
      this.notice = {
        _id: this.noticeId,
        title: this.title,
        description: this.description,
        internalOnly: ref(this.internalOnly),
      };
      this.edit = false;
    },
    onDelete() {
      this.loading = true;
      this.$store
        .dispatch('notices/deleteNotice', { _id: this.noticeId })
        .then(() => {
          this.$store.dispatch('notices/getNotices');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getError(field) {
      return this.findError(this.errors, field);
    },
    hasPermissions(permission) {
      return this.permissions.includes(permission);
    },
  },
};
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
      background-color: transparent;
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
      background-color: transparent;
      border-color: $lightestGrey;
    }

    &__background {
      height: 40px;
      animation: rainbow 3s infinite;
      border: none;
    }
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

  @media (max-width: 768px) {
    &__title {
      min-width: unset;
    }
  }
}
</style>
