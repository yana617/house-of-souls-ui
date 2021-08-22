<template>
  <div class="forgot-password">
    <form :onsubmit="forgotPassword">
      <label>Восстановление пароля</label>
      <a-typography-text type="secondary" class="forgot-password__description">
        Вам на почту придет ссылка, перейдя по которой можно будет поменять пароль
      </a-typography-text>
      <a-input type="email" size="large" v-model:value="email" placeholder="Почта" />
      <Button class="forgot-password__btn" title="Отправить запрос" />
    </form>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';

export default {
  name: 'ForgotPassword',
  components: { Button },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    forgotPassword() {
      this.$store.dispatch('users/forgotPassword', { email: this.email }).then(() => {
        this.$router.push('/reset-password');
      });
      return false;
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
