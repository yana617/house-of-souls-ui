<template>
  <div class="additional-field">
    <div v-if="false" class="additional-field__icon-change-container">
      <div class="additional-field__icon-change-sub-container" :class="{ 'additional-field__no-icon': !icon }">
        <img class="additional-field__icon" :src="icon" />
      </div>
      <Button v-if="edit" @click="uploadIcon()" class="additional-field__update-icon-btn" title="обновить иконку" />
      <input
        id="additional-field-icon-input"
        type="file"
        accept="image/*"
        class="additional-field__unvisible-input"
        @change="onIconChange"
      />
    </div>
    <input :disabled="!edit" class="additional-field__label" v-model="labelModel" />
    <span class="additional-field__error">{{ getError('label') }}</span>
    <textarea :disabled="!edit" class="additional-field__description" v-model="descriptionModel" />
    <span class="additional-field__error">{{ getError('description') }}</span>
    <div class="additional-field__control-btns">
      <Button
        class="additional-field__edit-btn"
        v-if="!edit"
        :loading="loading"
        @click="edit = true"
        title="редактировать"
      />
      <Button v-if="edit" :loading="loading" class="additional-field__save-btn" @click="update()" title="сохранить" />
      <Button
        v-if="!edit"
        class="additional-field__delete-btn"
        :loading="loading"
        @click="deleteField()"
        title="удалить"
      />
      <Button v-if="edit" class="additional-field__cancel-btn" :disabled="loading" @click="cancel()" title="отменить" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Button from '../common/Button.vue';
import { findError } from '@/utils/validation';

export default {
  name: 'AdditionalField',
  components: { Button },
  props: {
    id: String,
    icon: String,
    label: String,
    description: String,
  },
  data() {
    return {
      edit: false,
      labelModel: this.label,
      iconModel: this.icon,
      descriptionModel: this.description,
      findError,
      loading: false,
    };
  },
  computed: mapState({
    uploadedIcon: (state) => state.additionalFields.new.icon,
    errors: (state) => state.additionalFields.updateErrors,
  }),
  methods: {
    uploadIcon() {
      document.getElementById('additional-field-icon-input').click();
    },
    update() {
      const body = {
        id: this.id,
        icon: this.iconModel,
        label: this.labelModel,
        description: this.descriptionModel,
      };
      this.loading = true;
      this.$store
        .dispatch('additionalFields/updateAdditionalField', body)
        .then(() => {
          if (this.errors.length === 0) {
            this.edit = false;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancel() {
      this.labelModel = this.label;
      // this.iconModel = this.icon;
      this.descriptionModel = this.description;
      this.edit = false;
    },
    deleteField() {
      this.loading = true;
      this.$store
        .dispatch('additionalFields/deleteAdditionalField', { id: this.id })
        .then(() => {
          this.$store.dispatch('additionalFields/getAdditionalFields');
        })
        .finally(() => {
          this.loading = false;
        });
    },
    onIconChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      const [icon] = files;
      const formData = new FormData();
      formData.append('icon', icon);
      this.$store.dispatch('additionalFields/uploadIcon', formData).then(() => {
        const newIcon = this.uploadedIcon;
        const updatedField = {
          icon: newIcon,
          label: this.labelModel,
          description: this.descriptionModel,
        };
        this.$store.dispatch('additionalFields/localUpdateAdditionalField', { field: updatedField, id: this.id });
      });
    },
    getError(field) {
      return this.findError(this.errors, field);
    },
  },
};
</script>

<style lang="scss" scoped>
$green: #42b983;

.additional-field {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  padding: 8px 0;

  &__unvisible-input {
    display: none;
  }

  &__icon {
    display: flex;
    width: 24px;
    height: 24px;
  }

  &__label {
    padding: 4px 8px;
    margin: 8px 0;
  }

  &__description {
    padding: 4px 8px;
    resize: none;
  }

  &__control-btns {
    display: flex;
    margin-top: 8px;
  }

  &__edit-btn,
  &__save-btn,
  &__delete-btn,
  &__cancel-btn {
    color: blue;
    border-color: blue;
    padding: 4px 8px;
    width: 50%;

    &:hover {
      color: rgb(132, 0, 255);
      border-color: rgb(132, 0, 255);
    }
  }

  &__cancel-btn,
  &__delete-btn {
    margin-left: 8px;
  }

  &__delete-btn {
    color: red;
    border-color: red;

    &:hover {
      background-color: red;
      border-color: red;
      color: white;
    }
  }

  &__icon-change-container {
    display: flex;
  }

  &__update-icon-btn {
    display: flex;
    margin-left: 16px;
    padding: 0px 8px !important;
    color: $green;
    border-color: transparent;
    &:hover {
      color: blue;
    }
  }

  &__error {
    text-align: left;
    color: rgba(255, 0, 0, 0.8);
    font-size: 13px;
    margin-top: -4px;
    margin-bottom: 4px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 300px;
  }
}
</style>
