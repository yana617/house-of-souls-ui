<template>
  <div class="notice">
    <label>Заголовок</label>
    <input :disabled="!edit" class="notice__title" v-model="titleModel" />
    <label>Подробности</label>
    <textarea :disabled="!edit" class="notice__description" v-model="descriptionModel" />
    <div class="notice__checkbox-container">
      <div class="notice__authorized-label">Видно только волонтерам:</div>
      <a-switch v-model:checked="authorizedModel" :disabled="!edit" />
    </div>
    <div>
      <Button
        @click="onEditSave"
        class="notice__edit-btn"
        :class="{ 'notice__save-btn': edit }"
        :title="firstBtnLabel"
      />
      <Button @click="onCancelDelete" class="notice__delete-btn" :title="secondBtnLabel" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Notice',
  props: {
    id: String,
    title: String,
    description: String,
    authorized: Boolean,
  },
  components: { Button },
  data() {
    return {
      edit: false,
      titleModel: this.title,
      descriptionModel: this.description,
      authorizedModel: ref(this.authorized),
    };
  },
  computed: {
    firstBtnLabel() {
      if (this.edit) {
        return 'сохранить';
      }
      return 'редактировать';
    },
    secondBtnLabel() {
      if (this.edit) {
        return 'отменить';
      }
      return 'удалить';
    },
  },
  methods: {
    onEditSave() {
      if (!this.edit) {
        this.edit = true;
        return;
      }
      const body = {
        id: this.id,
        title: this.titleModel,
        description: this.descriptionModel,
        authorized: this.authorizedModel,
      };
      this.$store.dispatch('notices/updateNotice', body).then(() => {
        this.$store.dispatch('notices/getNotices');
        this.edit = false;
      });
    },
    onCancelDelete() {
      if (this.edit) {
        this.titleModel = this.title;
        this.descriptionModel = this.description;
        this.authorizedModel = this.authorized;
        this.edit = false;
        return;
      }

      this.$store.dispatch('notices/deleteNotice', { id: this.id }).then(() => {
        this.$store.dispatch('notices/getNotices');
      });
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
  border: 1px solid $lightestGrey;
  border-radius: 2px;
  margin: 8px 0;
  width: 100%;

  label {
    font-weight: bold;
  }

  &__title {
    padding: 4px 12px;
    margin: 8px 0;
    min-width: 500px;
    outline: none;
    max-width: 600px;
    border: 1px solid $lightGrey;
    border-radius: 4px;

    &:disabled {
      background-color: transparent;
      border: none;
    }
  }

  &__description {
    padding: 4px 12px;
    resize: none;
    height: fit-content;
    outline: none;
    min-height: 80px;
    max-width: 600px;
    margin: 8px 0;
    border: 1px solid $lightGrey;
    border-radius: 4px;

    &:disabled {
      background-color: transparent;
    }
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
  &__delete-btn {
    color: red;
    border-color: red;
    margin: 8px 4px;

    &:hover {
      background-color: red;
      color: white;
    }
  }
  &__save-btn {
    color: $green;
    background-color: white;
    border-color: $green;

    &:hover {
      background-color: $green;
      color: white;
    }
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
