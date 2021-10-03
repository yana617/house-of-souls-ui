<template>
  <div class="notice">
    <label>Заголовок</label>
    <input
      :disabled="!edit"
      class="notice__title"
      :class="{ notice__title__background: !title }"
      v-model="titleModel"
    />
    <label>Подробности</label>
    <textarea
      :disabled="!edit"
      class="notice__description"
      :class="{ notice__description__background: !description }"
      v-model="descriptionModel"
    />
    <div class="notice__checkbox-container">
      <div class="notice__authorized-label">Видно только волонтерам:</div>
      <a-switch v-model:checked="authorizedModel" :disabled="!edit" />
    </div>
    <div class="notice__btn-container">
      <Button v-if="!edit" @click="onEdit" class="notice__edit-btn" title="редактировать" />
      <Button v-if="edit" @click="onUpdate" class="notice__update-btn" title="сохранить" />
      <Button v-if="edit" @click="onCancel" class="notice__cancel-btn" title="отменить" />
      <Button @click="onDelete" class="notice__delete-btn" title="удалить" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

import Button from '@/components/common/Button.vue';

export default defineComponent({
  name: 'Notice',
  props: {
    noticeId: String,
    title: String,
    description: String,
    authorized: Boolean,
  },
  components: { Button },
  created() {
    this.$store.dispatch('notices/getNoticeById', { _id: this.noticeId });
  },
  data() {
    return {
      edit: false,
      titleModel: this.title,
      descriptionModel: this.description,
      authorizedModel: ref(this.authorized),
    };
  },
  methods: {
    onEdit() {
      this.edit = true;
    },
    onUpdate() {
      const body = {
        _id: this.noticeId,
        title: this.titleModel,
        description: this.descriptionModel,
        authorized: this.authorizedModel,
      };
      this.$store.dispatch('notices/updateNotice', body).then(() => {
        this.edit = false;
      });
    },
    onCancel() {
      this.titleModel = this.title;
      this.descriptionModel = this.description;
      this.authorizedModel = this.authorized;
      this.edit = false;
    },
    onDelete() {
      this.$store.dispatch('app/setLoading', true);
      this.$store
        .dispatch('notices/deleteNotice', { _id: this.noticeId })
        .then(() => {
          this.$store.dispatch('notices/getNotices');
        })
        .finally(() => {
          this.$store.dispatch('app/setLoading', false);
        });
    },
  },
  watch: {
    title(newValue) {
      this.titleModel = newValue;
    },
    description(newValue) {
      this.descriptionModel = newValue;
    },
    authorized(newValue) {
      this.authorizedModel = ref(newValue);
    },
  },
});
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

  @media (max-width: 768px) {
    &__title {
      min-width: unset;
    }
  }
}
</style>
