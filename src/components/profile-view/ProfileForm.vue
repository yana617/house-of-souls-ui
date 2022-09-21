<template>
  <div v-if="user" class="profile-form">
    <h3>Основные данные</h3>
    <div class="profile-form__main-info-container">
      <label>Имя</label>
      <input v-model="profile.name" :disabled="!edit" class="profile-form__input" placeholder="Имя" />
      <span class="profile-form__error">{{ getError('name') }}</span>
      <label>Фамилия</label>
      <input v-model="profile.surname" :disabled="!edit" class="profile-form__input" placeholder="Фамилия" />
      <span class="profile-form__error">{{ getError('surname') }}</span>
      <label>Телефон</label>
      <input v-model="profile.phone" :disabled="!edit" class="profile-form__input" placeholder="Телефон" />
      <span class="profile-form__error">{{ getError('phone') }}</span>
      <label>E-mail</label>
      <input v-model="profile.email" :disabled="!edit" class="profile-form__input" placeholder="E-mail" />
      <span class="profile-form__error">{{ getError('email') }}</span>
      <label>Дата рождения</label>
      <a-date-picker
        v-model:value="birthday"
        size="large"
        placeholder="Дата рождения"
        class="profile-form__date-picker"
        :disabled="!edit"
      />
      <span class="profile-form__error">{{ getError('birthday') }}</span>
    </div>
    <h3>Дополнительные данные</h3>
    <div class="profile-form__additional-fields-container">
      <div v-for="uaf in getUserAdditionalFields" :key="uaf.id" class="profile-form__additional-field__container">
        <label>{{ uaf.label }}</label>
        <a-switch v-model:checked="userAF[uaf.id].value" style="width: 44px" :disabled="!edit" />
      </div>
      <span v-if="noUaf()">-</span>
    </div>
    <div class="profile-form__btns-container">
      <CommonButton v-if="edit" :loading="loading" class="profile-form__save-btn" title="сохранить" @click="save" />
      <CommonButton v-if="!edit" class="profile-form__edit-btn" title="редактировать" @click="edit = true" />
      <CommonButton v-if="edit" :disabled="loading" class="profile-form__cancel-btn" title="отменить" @click="cancel" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapState } from 'vuex';
import moment from 'moment';

import { findError } from '@/utils/validation';
import CommonButton from '../common/CommonButton.vue';

export default {
  name: 'ProfileForm',
  components: { CommonButton },
  props: {
    userId: String,
  },
  data() {
    return {
      birthday: ref(),
      edit: false,
      userAF: [],
      profile: {},
      findError,
      loading: false,
    };
  },
  computed: mapState({
    user: (state) => state.auth.user,
    additionalFieldsTemplates: (state) => state.additionalFields.current,
    userAdditionalFields: (state) => state.userAdditionalFields.current,
    getUserAdditionalFields() {
      if (!this.additionalFieldsTemplates || !this.userAdditionalFields) return null;
      this.setFields();
      return Object.values(this.userAF);
    },
    updateErrors: (state) => state.users.userUpdateErrors,
  }),
  created() {
    this.$store.dispatch('additionalFields/getAdditionalFields');
    this.$store.dispatch('userAdditionalFields/getUserAdditionalFields');
    this.loadProfile();
  },
  methods: {
    setFields() {
      this.userAdditionalFields.forEach((userAF) => {
        const field = this.additionalFieldsTemplates.find((aft) => aft.id === userAF.additional_field_template_id);
        this.userAF[userAF.id] = { ...field, ...userAF };
      });
    },
    cancel() {
      this.loadProfile();
      this.setFields();
      this.edit = false;
    },
    async save() {
      const body = {
        ...this.profile,
        birthday: this.birthday.toISOString(),
      };
      this.loading = true;
      await this.$store.dispatch('users/updateUser', body);
      const updatingUaf = Object.values(this.userAF).map((uaf) => this.$store
        .dispatch('userAdditionalFields/updateUserAdditionalField', {
          id: uaf.id,
          value: uaf.value,
        }));
      await Promise.all(updatingUaf);
      if (this.updateErrors.length === 0) {
        this.edit = false;
        this.loadProfile();
      }
      this.loading = false;
    },
    noUaf() {
      const uaf = this.getUserAdditionalFields;
      return !uaf || uaf.length === 0;
    },
    getError(field) {
      return this.findError(this.updateErrors, field);
    },
    loadProfile() {
      this.profile = { ...this.user };
      this.birthday = moment(this.user.birthday);
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;
$greyBlue: #2c3e50;
$lightGrey: #ccc;
$blue: #1890ff;

.profile-form {
  display: flex;
  flex-direction: column;
  padding: 8px 35% 16px 35%;

  &__error {
    text-align: left;
    color: rgba(255, 0, 0, 0.8);
    font-size: 13px;
    margin-bottom: 4px;
  }

  h3 {
    text-align: left;
    margin: 8px 0;
    color: $greyBlue;
  }

  &__main-info-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;
  }

  &__additional-fields-container {
    display: flex;

    label {
      margin: 8px 0;
    }
  }

  &__input {
    width: 100%;
    padding: 8px 16px;
    margin: 4px 0;
    outline: none;
    border: 1px solid $lightGrey;
    border-radius: 4px;
  }

  &__date-picker {
    margin: 4px 0;
    width: 100%;
    border-radius: 4px;
  }

  &__date-picker input {
    color: black;
  }

  &__additional-field {
    &__container {
      display: flex;
      flex-direction: column;
      margin-right: 8px;
    }
  }

  &__btns-container {
    margin-left: auto;
    margin-top: 4px;
  }

  &__save-btn {
    color: $green;
    border-color: $green;
    margin-right: 8px;

    &:hover {
      background-color: $green;
      color: white;
    }
  }

  &__edit-btn {
    color: $blue;
    border-color: $blue;

    &:hover {
      background-color: $blue;
      color: white;
    }
  }

  &__cancel-btn {
    color: red;
    border-color: red;

    &:hover {
      background-color: red;
      color: white;
    }
  }

  @media (max-width: 768px) {
    padding: 8px 16px 16px 16px;
  }
}
</style>
