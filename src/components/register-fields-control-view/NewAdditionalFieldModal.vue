<template>
  <div @click="closeModal()" class="modal__wrapper">
    <div class="new-additional-field-modal" @click.stop>
      <img
        @click="closeModal()"
        class="new-additional-field-modal__close-icon"
        src="@/assets/close.png"
        alt="close"
      />
      <h2>Новое дополнительное поле</h2>
      <input
        class="new-additional-field-modal__label"
        placeholder="Короткое название (желательно одно слово)"
        v-model="label"
      />
      <span class="new-additional-field-modal__error">{{ getError('label') }}</span>
      <input
        class="new-additional-field-modal__label"
        placeholder="Иконка (для отображения в графике)"
        v-model="icon"
      />
      <span class="new-additional-field-modal__error">{{ getError('icon') }}</span>
      <textarea
        class="new-additional-field-modal__description"
        v-model="description"
        placeholder="Описание"
      />
      <span class="new-additional-field-modal__error">{{ getError('description') }}</span>
      <Button
        :loading="loading"
        class="new-additional-field-modal__btn__save"
        @click="create()"
        title="Добавить"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { findError } from '@/utils/validation';
import Button from '../common/Button.vue';

export default {
  name: 'NewAdditionalFieldModal',
  components: { Button },
  computed: mapState({
    errors: (state) => state.additionalFields.createErrors,
  }),
  data() {
    return {
      label: null,
      icon: null,
      description: null,
      findError,
      loading: false,
    };
  },
  unmounted() {
    this.$store.dispatch('additionalFields/clearCreateErrors');
  },
  methods: {
    closeModal() {
      this.$store.dispatch('app/setModal', null);
    },
    create() {
      const body = {
        label: this.label,
        icon: this.icon,
        description: this.description,
      };
      this.loading = true;
      this.$store
        .dispatch('additionalFields/createAdditionalField', body)
        .then(() => {
          if (this.errors.length === 0) {
            this.$store.dispatch('additionalFields/getAdditionalFields');
            this.$store.dispatch('app/setModal', null);
          }
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
$lightGrey: #ccc;

.new-additional-field-modal {
  width: 700px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;
  padding: 16px;

  &__close-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 16px;
    top: 12px;
    cursor: pointer;
  }

  &__label,
  &__description {
    display: flex;
    width: 80%;
    border: 1px solid $lightGrey;
    outline: none;
    padding: 8px 16px;
    margin: 8px;
  }

  &__description {
    resize: none;
  }

  &__btn {
    &__upload-icon {
      color: black !important;
      border-color: black !important;
    }
    &__save {
      margin-top: 12px;
      color: $green !important;
      border-color: $green !important;
    }
  }

  &__icon-container {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  &__icon-sub-container {
    display: flex;
    margin-right: 16px;
    max-width: 40px;
    max-height: 40px;
    min-height: 40px;
    min-width: 40px;
  }

  &__icon {
    max-width: 40px;
    max-height: 40px;
  }

  &__no-icon {
    background-color: $lightGrey;
    border-radius: 4px;
  }

  &__unvisible-input {
    display: none;
  }

  &__error {
    width: 80%;
    text-align: left;
    color: rgba(255, 0, 0, 0.8);
    font-size: 13px;
    margin-top: -4px;
    margin-bottom: 4px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 16px;
      margin-bottom: 16px;
    }
  }
}
</style>
