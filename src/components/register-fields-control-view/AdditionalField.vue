<template>
  <div class="additional-field">
    <div class="additional-field__icon-change-container">
      <!-- <img class="additional-field__icon" :src="icon" /> -->
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
    <textarea :disabled="!edit" class="additional-field__description" v-model="descriptionModel" />
    <div class="additional-field__control-btns">
      <Button class="additional-field__edit-btn" v-if="!edit" @click="edit = true" title="редактировать" />
      <Button v-if="edit" class="additional-field__save-btn" @click="save()" title="сохранить" />
      <Button v-if="!edit" class="additional-field__delete-btn" @click="deleteField()" title="удалить" />
      <Button v-if="edit" class="additional-field__cancel-btn" @click="cancel()" title="отменить" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Button from '../common/Button.vue';

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
    };
  },
  computed: mapState({
    uploadedIcon: (state) => state.additionalFields.new.icon,
  }),
  methods: {
    uploadIcon() {
      document.getElementById('additional-field-icon-input').click();
    },
    save() {
      const body = {
        icon: this.iconModel,
        label: this.labelModel,
        description: this.descriptionModel,
      };
      this.$store.dispatch('additionalFields/updateAdditionalField', body).then(() => {
        this.$store.dispatch('additionalFields/getAdditionalFields');
        this.edit = false;
      });
    },
    cancel() {
      this.labelModel = this.label;
      // this.iconModel = this.icon;
      this.descriptionModel = this.description;
      this.edit = false;
    },
    deleteField() {
      this.$store.dispatch('additionalFields/deleteAdditionalField', { id: this.id });
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
          id: this.id,
          icon: newIcon,
          label: this.labelModel,
          description: this.descriptionModel,
        };
        console.log(this.id);
        this.$store.dispatch('additionalFields/localUpdateAdditionalField', { field: updatedField, id: this.id });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
    color: #42b983;
    border-color: transparent;
    &:hover {
      color: blue;
    }
  }

  @media (max-width: 700px) {
    max-width: 100%;
    min-width: 300px;
  }
}
</style>
