<template>
  <div class="forgot-password">
    <form :onsubmit="forgotPassword">
      <label>Восстановление пароля</label>
      <a-typography-text type="secondary" class="forgot-password__description">
        Вам на почту придет ссылка, перейдя по которой можно будет поменять пароль
      </a-typography-text>
      <a-input type="email" size="large" v-model:value="email" placeholder="Почта" />
      <span class="forgot-password__error">{{ getError('email') }}</span>
      <Button class="forgot-password__btn" title="Отправить запрос" />
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Button from '@/components/common/Button.vue';

export default {
  name: 'ForgotPassword',
  components: { Button },
  data() {
    return {
      email: '',
    };
  },
  computed: mapState({
    errors: (state) => state.users.forgotPasswordValidationErrors,
  }),
  methods: {
    forgotPassword() {
      this.$store.dispatch('users/forgotPassword', { email: this.email });
      return false;
    },
    getError(field) {
      if (!this.errors || !this.errors.some((err) => err.param === field)) {
        return '';
      }
      const error = this.errors.find((err) => err.param === field);
      return error.msg;
    },
  },
};
</script>

<style scoped lang="scss">
$cyan: rgb(27, 147, 245);
$blueGrey: rgb(235, 245, 255);

.forgot-password {
  background-color: $blueGrey;
  height: calc(100vh - 50px);
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    padding: 40px;
    background-color: white;
    display: flex;
    flex-direction: column;
    border: 1px solid $cyan;

    label {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 16px;
      display: block;
    }

    input {
      width: 300px;
    }
  }

  &__description {
    max-width: 300px;
    margin-top: -12px;
    margin-bottom: 16px;
  }

  &__btn {
    color: white;
    background-color: $cyan;
    margin-top: 16px;
    padding: 12px;

    &:hover {
      color: $cyan;
      border-color: $cyan;
    }
  }

  &__error {
    text-align: left;
    color: rgba(255, 0, 0, 0.8);
    font-size: 13px;
  }

  @media (max-width: 400px) {
    form {
      border-left: none;
      border-right: none;
      input {
        width: 100%;
      }
    }
  }
}
</style>
