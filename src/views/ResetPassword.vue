<template>
  <div class="reset-password">
    <form :onsubmit="resetPassword">
      <label>Восстановление пароля</label>
      <a-input type="password" size="large" v-model:value="password" placeholder="Пароль" />
      <span class="reset-password__error">{{ getError('password') }}</span>
      <a-input type="password" size="large" v-model:value="repeatPassword" placeholder="Подтвердите пароль" />
      <span class="reset-password__error">{{ getError('token') }}</span>
      <span class="reset-password__error">{{ getError('userId') }}</span>
      <Button class="reset-password__btn" title="Отправить запрос" />
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import notifications from '@/utils/notifications';
import Button from '@/components/common/Button.vue';

export default {
  name: 'ResetPassword',
  components: { Button },
  data() {
    return {
      password: '',
      repeatPassword: '',
    };
  },
  computed: mapState({
    errors: (state) => state.users.resetPasswordValidationErrors,
  }),
  methods: {
    resetPassword() {
      if (this.password !== this.repeatPassword) {
        notifications.error('Пароли отличаются');
        return false;
      }
      const { token, userId } = this.$route.query;
      this.$store.dispatch('users/resetPassword', { password: this.password, token, userId });
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

.reset-password {
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
      margin-bottom: 8px;
    }
  }

  &__btn {
    color: white;
    background-color: $cyan;
    padding: 12px;
    margin-top: 8px;

    &:hover {
      color: $cyan;
      border-color: $cyan;
    }
  }

  &__error {
    text-align: left;
    color: rgba(255, 0, 0, 0.8);
    font-size: 13px;
    width: 300px;
    margin-top: -4px;
    margin-bottom: 8px;
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
