<template>
  <div class="register-fields-control">
    <span class="register-fields-control__title">Поля регистрации</span>
    <div class="register-fields-control__fields-container">
      <div class="register-fields-control__default-fields">
        <span class="register-fields-control__field__title">Имя</span>
        <span class="register-fields-control__field__description">обязательное поле</span>
        <span class="register-fields-control__field__title">Фамилия</span>
        <span class="register-fields-control__field__description">обязательное поле</span>
        <span class="register-fields-control__field__title">Дата рождения</span>
        <span class="register-fields-control__field__description">обязательное поле</span>
        <span class="register-fields-control__field__title">Телефон</span>
        <span class="register-fields-control__field__description">обязательное поле</span>
        <span class="register-fields-control__field__title">Пароль</span>
        <span class="register-fields-control__field__description">обязательное поле</span>
      </div>
      <div class="register-fields-control__additional-fields">
        <span class="register-fields-control__additional-fields__title">Дополнительные поля</span>
        <AdditionalField
          v-for="field in fields"
          :key="field.id"
          v-bind="field"
        />
        <span v-if="noAft" class="register-fields-control__no-aft">-</span>
      </div>
    </div>
    <div class="register-fields-control__additional-fields__add-btn__container">
      <CommonButton
        v-if="hasPermissions('CREATE_ADDITIONAL_FIELD_TEMPLATE')"
        class="register-fields-control__additional-fields__add-btn"
        title="Добавить новое поле"
        @click="openModal()"
      />
      <NewAdditionalFieldModal v-if="isModalOpen" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import CommonButton from '@/components/common/CommonButton.vue';
import AdditionalField from '@/components/register-fields-control-view/AdditionalField.vue';
import NewAdditionalFieldModal from '@/components/register-fields-control-view/NewAdditionalFieldModal.vue';
import { MODAL } from '@/utils/constants';

export default {
  name: 'RegisterFieldsControl',
  components: { CommonButton, AdditionalField, NewAdditionalFieldModal },
  computed: mapState({
    additionalFields: (state) => state.additionalFields.current,
    permissions: (state) => state.permissions.my,
    modal: (state) => state.app.modal,
    fields() {
      if (!this.additionalFields) return [];
      return this.additionalFields.map((field) => ({ ...field, edit: false }));
    },
    isModalOpen() {
      return this.modal === MODAL.ADDITIONAL_FIELD;
    },
    noAft() {
      return !this.additionalFields || this.additionalFields.length === 0;
    },
  }),
  created() {
    this.$store.dispatch('app/setLoading', true);
    this.$store.dispatch('additionalFields/getAdditionalFields').finally(() => {
      this.$store.dispatch('app/setLoading', false);
    });
  },
  methods: {
    openModal() {
      this.$store.dispatch('app/setModal', MODAL.ADDITIONAL_FIELD);
    },
    hasPermissions(permission) {
      return this.permissions.includes(permission);
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;
$lightGrey: #ccc;
$darkGrey: #999;

.register-fields-control {
  display: flex;
  align-items: flex-start;
  width: 100%;
  flex-direction: column;
  padding: 16px 32px;

  &__fields-container {
    display: flex;
    margin-top: 16px;
    width: 100%;
  }

  &__default-fields {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 32px;
    border-right: 1px solid $lightGrey;
    width: 50%;
  }

  &__additional-fields {
    width: 50%;
    padding-left: 32px;

    &__title {
      display: flex;
      margin-top: 8px;
      font-size: 16px;
      color: black;
    }

    &__add-btn {
      color: black;
      border-color: black;

      &:hover {
        border-color: $green;
        color: $green;
      }
      &__container {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 32px 16px;
      }
    }
  }

  &__title {
    display: flex;
    align-self: center;
    font-size: 18px;
    font-weight: bold;
  }

  &__field {
    &__title {
      color: black;
      font-size: 16px;
      margin-top: 8px;
    }
    &__description {
      font-size: 12px;
      color: $darkGrey;
    }
  }

  &__no-aft {
    display: block;
    text-align: left;
  }

  @media (max-width: 768px) {
    &__fields-container {
      flex-direction: column;
    }
    &__default-fields {
      border-right: none;
      border-bottom: 1px solid $lightGrey;
      width: 100%;
      padding-right: 0;
      align-items: center;
      padding-bottom: 32px;
    }
    &__additional-fields {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      padding-left: 0;
    }
  }
}
</style>
