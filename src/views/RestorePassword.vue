<template>
  <div class="restore-password">
    <form :onsubmit="restorePassword">
      <label>Восстановление пароля</label>
      <a-input type="email" size="large" v-model:value="email" placeholder="Почта" />
      <Button class="restore-password__btn" title="Отправить запрос" />
    </form>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';

export default {
  name: 'RestorePassword',
  components: { Button },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    restorePassword() {
      this.$store.dispatch('users/restorePassword', { email: this.email }).then(() => {
        this.$router.push('/');
      });
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
$cyan: rgb(27, 147, 245);
$blueGrey: rgb(235, 245, 255);

.restore-password {
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
}
</style>
