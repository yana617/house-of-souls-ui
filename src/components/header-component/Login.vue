<template>
  <div class="login">
    <div class="login__wrapper">
      <PhoneInput @onchange="onChangePhone" id="phone" placeholder="Телефон" />
      <input id="password" v-model="password" type="password" name="password" placeholder="Пароль" />
      <Button @click="submitLogin" class="login__submit-btn" title="Войти" />
    </div>
  </div>
</template>

<script>
import PhoneInput from '../common/PhoneInput.vue';
import Button from '../common/Button.vue';

export default {
  name: 'Login',
  components: { PhoneInput, Button },
  data() {
    return {
      phone: null,
      password: null,
    };
  },
  methods: {
    onChangePhone(updatedPhone) {
      const phone = updatedPhone.replace(/[-+()_\s]/g, '');
      this.phone = phone;
    },
    submitLogin() {
      const body = {
        phone: this.phone,
        password: this.password,
      };
      this.$store.dispatch('users/login', body);
    },
  },
};
</script>

<style lang="scss">
.login {
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
