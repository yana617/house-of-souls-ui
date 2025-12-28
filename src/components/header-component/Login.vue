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

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import CommonButton from '@/components/common/CommonButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const email = ref(null);
const password = ref(null);
const loading = ref(false);

onMounted(() => {
  router.push('/schedule');
});

const submitLogin = async () => {
  const body = {
    email: email.value,
    password: password.value,
  };
  
  loading.value = true;
  
  try {
    await store.dispatch('auth/login', body);
    await Promise.all([
      store.dispatch('permissions/getMyPermissions'),
      store.dispatch('notices/getNotices')
    ]);
  } finally {
    loading.value = false;
  }
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
