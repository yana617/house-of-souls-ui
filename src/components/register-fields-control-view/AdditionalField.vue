<template>
  <div class="additional-field">
    <IconInput v-if="false" v-model="iconModel" />
    <BaseInput :disabled="!edit" v-model="labelModel" />
    <span class="additional-field__error">{{ getError('label') }}</span>
    <BaseInput is-textarea :disabled="!edit" v-model="descriptionModel" />
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

import Button from '@/components/common/Button.vue';
import BaseInput from '@/components/common/BaseInput.vue';
import { findError } from '@/utils/validation';

export default {
  name: 'AdditionalField',
  components: { Button, BaseInput },
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
    uploadedIcon: (state) => state.additionalFields.icon,
    errors: (state) => state.additionalFields.updateErrors,
  }),
  unmounted() {
    this.$store.dispatch('additionalFields/clearIcon');
  },
  methods: {
    update() {
      const body = {
        id: this.id,
        icon: this.uploadedIcon || this.iconModel,
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

  &__control-btns {
    display: flex;
    margin-top: 8px;
  }

  &__edit-btn,
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

  &__save-btn {
    color: $green;
    border-color: $green;
    padding: 4px 8px;
    width: 50%;

    &:hover {
      color: white;
      background-color: $green;
    }
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

  &__cancel-btn,
  &__delete-btn {
    margin-left: 8px;
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
