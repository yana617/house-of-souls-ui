<template>
  <div v-if="anotherUserProfile" class="forgot-password">
    <form :onsubmit="forgotPassword">
      <p>Сгенерировать ссылку для {{ userNameSurname }}</p>
      <a-typography-text type="secondary" class="forgot-password__description" v-html="description" />
      <Button v-if="!resetLink" class="forgot-password__generate-btn" title="Сгенерировать ссылку" />
      <Button
        v-if="resetLink"
        type="button"
        @click="onCopyLink"
        class="forgot-password__copy-btn"
        title="Скопировать ссылку"
      />
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import notifications from '@/utils/notifications';
import Button from '@/components/common/Button.vue';

const description = `После нажатия кнопки будет сгенерирована ссылка для смены пароля. 
Ссылка действительна в течении <b>20 минут</b>. 
После появления ссылки скопируйте ее и отправьте пользователю.`;

export default {
  name: 'ForgotPassword',
  components: { Button },
  data() {
    return { description };
  },
  mounted() {
    if (this.userId) {
      this.loadUser();
    }
  },
  computed: mapState({
    anotherUserProfile: (state) => state.users.userProfile,
    resetLink: (state) => state.auth.resetLink,
    userId() {
      return this.$route.query.userId;
    },
    userNameSurname() {
      if (this.anotherUserProfile) {
        const { name, surname } = this.anotherUserProfile;
        return `${name} ${surname}`;
      }
      return null;
    },
  }),
  methods: {
    loadUser() {
      this.$store.dispatch('app/setLoading', true);
      this.$store
        .dispatch('users/getUserProfile', { userId: this.userId })
        .finally(() => {
          this.$store.dispatch('app/setLoading', false);
        });
    },
    forgotPassword() {
      this.$store.dispatch('app/setLoading', true);
      this.$store
        .dispatch('auth/forgotPassword', { userId: this.userId })
        .finally(() => {
          this.$store.dispatch('app/setLoading', false);
        });
      return false;
    },
    async onCopyLink() {
      try {
        await navigator.clipboard.writeText(this.resetLink);
        notifications.success('Успешно скопировано!');
      } catch (e) {
        notifications.error('Ошибка копирования :(');
      }
    },
  },
};
</script>

<style scoped lang="scss">
$cyan: rgb(27, 147, 245);
$blueGrey: rgb(235, 245, 255);
$green: #42b983;

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
      margin-bottom: 24px;
      display: block;
      max-width: 300px;
    }

    input {
      width: 300px;
    }
  }

  &__description {
    max-width: 300px;
    margin-bottom: 16px;
    text-align: justify;
  }

  &__generate-btn,
  &__copy-btn {
    color: white;
    margin-top: 16px;
    padding: 12px;
  }

  &__generate-btn {
    background-color: $cyan;

    &:hover {
      color: $cyan;
      border-color: $cyan;
    }
  }

  &__copy-btn {
    background-color: $green;

    &:hover {
      color: $green;
      border-color: $green;
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
