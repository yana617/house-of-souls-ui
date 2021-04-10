<template>
  <div v-if="user" class="profile-form">
    <h3>Основные данные</h3>
    <div class="profile-form__main-info-container">
      <label>Имя</label>
      <input :disabled="!edit" class="profile-form__input" placeholder="Имя" v-model="profile.name" />
      <label>Фамилия</label>
      <input :disabled="!edit" class="profile-form__input" placeholder="Фамилия" v-model="profile.surname" />
      <label>Телефон</label>
      <input :disabled="!edit" class="profile-form__input" placeholder="Телефон" v-model="profile.phone" />
      <label>День рождения</label>
      <a-date-picker
        size="large"
        placeholder="День рождения"
        class="profile-form__date-picker"
        :disabled="!edit"
        v-model:value="birthday"
      />
    </div>
    <h3>Дополнительные данные</h3>
    <div class="profile-form__additional-fields-container">
      <div v-for="uaf in getUserAdditionalFields" :key="uaf._id" class="profile-form__additional-field__container">
        <label>{{ uaf.label }}</label>
        <a-switch :disabled="!edit" v-model:checked="userAF[uaf._id].value" />
      </div>
    </div>
    <div class="profile-form__btns-container">
      <Button v-if="edit" class="profile-form__save-btn" title="сохранить" @click="save" />
      <Button v-if="!edit" class="profile-form__edit-btn" title="редактировать" @click="edit = true" />
      <Button v-if="edit" class="profile-form__cancel-btn" title="отменить" @click="cancel" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mapState } from 'vuex';
import moment from 'moment';

import Button from '../common/Button.vue';

export default {
  name: 'ProfileForm',
  props: {
    userId: String,
  },
  components: { Button },
  data() {
    return {
      birthday: ref(),
      edit: false,
      userAF: [],
      profile: {},
    };
  },
  computed: mapState({
    user: (state) => state.users.user,
    additionalFieldsTemplates: (state) => state.additionalFields.current,
    userAdditionalFields: (state) => state.userAdditionalFields.current,
    getUserAdditionalFields() {
      if (!this.additionalFieldsTemplates || !this.userAdditionalFields) return null;
      this.setFields();
      return Object.values(this.userAF);
    },
  }),
  created() {
    this.$store.dispatch('additionalFields/getAdditionalFields');
    this.$store.dispatch('userAdditionalFields/getUserAdditionalFields', { userId: this.userId });

    this.profile = { ...this.$store.state.users.user };
    this.birthday = moment(this.profile.birthday);
  },
  methods: {
    setFields() {
      this.userAdditionalFields.forEach((userAF) => {
        const field = this.additionalFieldsTemplates.find((aft) => aft._id === userAF.additional_field_template_id);
        this.userAF[userAF._id] = { ...field, ...userAF };
      });
    },
    cancel() {
      this.profile = { ...this.$store.state.users.user };
      this.setFields();
      this.edit = false;
    },
    save() {
      const body = {
        ...this.profile,
        birthday: this.birthday.toISOString(),
      };
      this.$store.dispatch('users/updateUser', body);
      Object.values(this.userAF).forEach((uaf) => {
        this.$store.dispatch('userAdditionalFields/updateUserAdditionalField', { _id: uaf._id, value: uaf.value });
      });
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
  padding: 0 35%;

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

  &__additional-field {
    &__container {
      display: flex;
      flex-direction: column;
      margin-right: 8px;
    }
  }

  &__btns-container {
    margin-left: auto;
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
    padding: 8px 16px;
  }
}
</style>
