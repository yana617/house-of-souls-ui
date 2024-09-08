<template>
  <div class="login">
    <div class="login__wrapper">
      <input
        id="email"
        v-model="email"
        type="text"
        name="email"
        placeholder="E-mail"
      >
      <input
        id="password"
        v-model="password"
        type="password"
        name="password"
        placeholder="Пароль"
      >
      <CommonButton
        :disabled="loading"
        class="login__submit-btn"
        title="Войти"
        @click="submitLogin"
      />
    </div>
  </div>
</template>

<script>
import CommonButton from '@/components/common/CommonButton.vue';

export default {
  name: 'Login',
  components: { CommonButton },
  data() {
    return {
      email: null,
      password: null,
      loading: false,
    };
  },
  mounted() {
    this.$router.push('/');
  },
  methods: {
    async submitLogin() {
      const body = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      this.$store
        .dispatch('auth/login', body)
        .then(() => {
          this.$store.dispatch('permissions/getMyPermissions');
          this.$store.dispatch('notices/getNotices');
        })
        .finally(() => {
          this.loading = false;
        });
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
  flex: 1;

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
