<template>
  <div class="login">
    <div class="login__wrapper">
      <PhoneInput @onchange="onChangePhone" id="phone" placeholder="Телефон" />
      <input id="password" v-model="password" type="password" name="password" placeholder="Пароль" />
      <Button @click="submitLogin" class="login__submit-btn" title="Войти" />
      <router-link @click="closeModal" class="login__forgot-password-label" to="/restore-password">
        забыли пароль?
      </router-link>
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
    closeModal() {
      this.$store.dispatch('app/setModal', null);
    },
  },
};
</script>

<style lang="scss">
$lightGrey: #ccc;
$blue-link: rgba(0, 180, 255, 0.7);

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

  &__forgot-password-label {
    margin-top: 8px;
    color: $blue-link;
  }
}
</style>
