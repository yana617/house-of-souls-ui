<template>
  <div class="registration">
    <div class="registration__wrapper">
      <input id="name" v-model="name" type="text" name="name" placeholder="Имя" />
      <input id="surname" v-model="surname" type="text" name="surname" placeholder="Фамилия" />
      <input id="egida-nick" v-model="egidaNick" type="text" name="egida-nick" placeholder="Ник на Эгиде" />
      <PhoneInput @onchange="onChangePhone" id="phone" placeholder="Телефон" />
      <input id="password" v-model="password" type="password" name="password" placeholder="Пароль" />
      <Checkbox
        v-for="field in additionalFields"
        :key="field.id"
        v-bind="field"
        :value="selected[field.id]"
        @input="value => selected[field.id] = value"
      />
      <Button @click="submitRegistration" class="registration__submit-btn" title="Зарегистрироваться" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Checkbox from '../common/Checkbox.vue';
import Button from '../common/Button.vue';
import PhoneInput from '../common/PhoneInput.vue';

export default {
  name: 'Registration',
  components: { Checkbox, PhoneInput, Button },
  computed: mapState({
    additionalFields: (state) => state.additionalFields.current,
  }),
  data() {
    return {
      name: null,
      surname: null,
      egidaNick: null,
      phone: null,
      password: null,
      selected: {},
    };
  },
  created() {
    this.$store.dispatch('additionalFields/getAdditionalFields').then(() => {
      this.additionalFields.forEach((field) => {
        this.selected[field.id] = false;
      });
    });
  },
  methods: {
    submitRegistration() {
      const body = {
        name: this.name,
        surname: this.surname,
        egidaNick: this.egidaNick,
        phone: this.phone,
        password: this.password,
        additionalFields: Object.keys(this.selected).map((additionalFieldId) => ({
          id: additionalFieldId,
          value: this.selected[additionalFieldId],
        })),
      };
      this.$store.dispatch('users/register', body);
    },
    onChangePhone(updatedPhone) {
      const phone = updatedPhone.replace(/[-+()_\s]/g, '');
      this.phone = phone;
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
}
</style>
