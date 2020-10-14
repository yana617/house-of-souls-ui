<template>
  <div class="registration">
    <div class="registration__wrapper">
      <input id="name" v-model="name" type="text" name="name" placeholder="Имя" />
      <input id="surname" v-model="surname" type="text" name="surname" placeholder="Фамилия" />
      <input id="egida-nick" v-model="egidaNick" type="text" name="egida-nick" placeholder="Ник на Эгиде" />
      <PhoneInput @onchange="onChangePhone" id="phone" placeholder="Телефон" />
      <input id="password" v-model="password" type="password" name="password" placeholder="Пароль" />
      <Checkbox @onchange="onChangeCheckbox" name="delya" :selected="delya" label="Деля" />
      <Checkbox @onchange="onChangeCheckbox" name="key" :selected="key" label="Ключ" />
      <Button @click="submitRegistration" class="registration__submit-btn" title="Зарегистрироваться" />
    </div>
  </div>
</template>

<script>
import Checkbox from './Checkbox.vue';
import Button from './Button.vue';
import PhoneInput from './PhoneInput.vue';

export default {
  name: 'Registration',
  components: { Checkbox, PhoneInput, Button },
  data() {
    return {
      name: null,
      surname: null,
      egidaNick: null,
      phone: null,
      password: null,
      delya: false,
      key: false,
    };
  },
  methods: {
    submitRegistration() {
      const body = {
        name: this.name,
        surname: this.surname,
        egidaNick: this.egidaNick,
        phone: this.phone,
        delya: this.delya,
        key: this.key,
        password: this.password,
      };
      this.$store.dispatch('users/register', body);
    },
    onChangePhone(updatedPhone) {
      const phone = updatedPhone.replace(/[-+()_\s]/g, '');
      this.phone = phone;
    },
    onChangeCheckbox(name, value) {
      this[name] = value;
    },
  },
};
</script>

<style lang="scss">
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
    border-bottom: 1px solid #ccc;
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
