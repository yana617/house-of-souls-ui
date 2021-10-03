<template>
  <div class="registration">
    <div class="registration__wrapper">
      <input id="name" v-model="name" type="text" name="name" placeholder="Имя" />
      <span class="registration__error">{{ getError('name') }}</span>
      <input id="surname" v-model="surname" type="text" name="surname" placeholder="Фамилия" />
      <span class="registration__error">{{ getError('surname') }}</span>
      <PhoneInput @onchange="onChangePhone" id="phone" placeholder="Телефон" />
      <span class="registration__error">{{ getError('phone') }}</span>
      <input id="email" v-model="email" type="text" name="email" placeholder="Почта" />
      <span class="registration__error">{{ getError('email') }}</span>
      <a-date-picker size="large" placeholder="День рождения" class="registration__birthday" v-model:value="birthday" />
      <span class="registration__error">{{ getError('birthday') }}</span>
      <input id="password" v-model="password" type="password" name="password" placeholder="Пароль" />
      <span class="registration__error">{{ getError('password') }}</span>
      <div v-if="loading && !additionalFields" class="registration__loader-wrapper">
        <Loader className="registration__loader" />
      </div>
      <Checkbox
        v-for="field in additionalFields"
        :key="field.id"
        v-bind="field"
        :value="selected[field.id]"
        @input="(value) => (selected[field.id] = value)"
      />
      <Button @click="submitRegistration" class="registration__submit-btn" title="Зарегистрироваться" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ref } from 'vue';

import Loader from '../common/Loader.vue';
import Checkbox from '../common/Checkbox.vue';
import Button from '../common/Button.vue';
import PhoneInput from '../common/PhoneInput.vue';
import { findError } from '@/utils/validation';

export default {
  name: 'Registration',
  components: {
    Checkbox,
    PhoneInput,
    Button,
    Loader,
  },
  computed: mapState({
    additionalFields: (state) => state.additionalFields.current,
    registerErrors: (state) => state.users.registerErrors,
  }),
  data() {
    return {
      name: null,
      surname: null,
      phone: null,
      email: null,
      password: null,
      selected: {},
      birthday: ref(),
      loading: false,
      findError,
    };
  },
  created() {
    this.loading = true;
    this.$store.dispatch('additionalFields/getAdditionalFields').then(() => {
      this.loading = false;
      this.additionalFields.forEach((field) => {
        this.selected[field.id] = false;
      });
    });
  },
  methods: {
    async submitRegistration() {
      const body = {
        name: this.name,
        surname: this.surname,
        phone: this.phone,
        email: this.email,
        birthday: this.birthday,
        password: this.password,
        additionalFields: Object.keys(this.selected).map((additionalFieldId) => ({
          additionalFieldTemplateId: additionalFieldId,
          value: this.selected[additionalFieldId],
        })),
      };
      await this.$store.dispatch('users/register', body);
      this.$store.dispatch('users/getUser');
      this.$store.dispatch('permissions/getMyPermissions');
    },
    onChangePhone(updatedPhone) {
      const phone = updatedPhone.replace(/[-+()_\s]/g, '');
      this.phone = phone;
    },
    getError(field) {
      return this.findError(this.registerErrors, field);
    },
  },
};
</script>

<style lang="scss">
$lightGrey: #ccc;

.registration {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  width: 100%;
  height: 100%;

  input {
    width: 300px;
    padding: 8px 16px;
    outline: none;
    border: none;
    margin: 4px 0;
    background-color: transparent;
    border-bottom: 1px solid $lightGrey;
    color: white;
    &::placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
  }

  &__birthday {
    input {
      &::placeholder {
        font-size: 13.3px;
      }
      margin: 4px 0px;
      line-height: 1 !important;
    }
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 2px;
  }

  &__submit-btn {
    margin-top: 16px;
  }

  &__loader-wrapper {
    width: 100%;
    padding: 16px;
  }

  &__error {
    padding-left: 8px;
    text-align: left;
    color: rgba(255, 0, 0, 0.8);
    font-size: 13px;
  }
}
</style>
