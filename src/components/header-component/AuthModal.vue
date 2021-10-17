<template>
  <div v-if="isModalOpen" class="modal__wrapper">
    <div class="auth-modal">
      <img class="auth-modal__background-image" src="@/assets/auth-modal-back.jpg" />
      <img class="auth-modal__background-image mobile" src="@/assets/auth-modal-mobile.jpg" />
      <img @click="setModal(null)" class="auth-modal__header__close-icon" src="@/assets/close.png" />
      <div class="auth-modal__header">
        <span
          @click="setModal(MODAL.LOGIN)"
          class="auth-modal__header__title"
          :class="{ selected: modal === MODAL.LOGIN }"
        >
          Вход
        </span>
        <span
          @click="setModal(MODAL.REGISTRATION)"
          class="auth-modal__header__title"
          :class="{ selected: modal === MODAL.REGISTRATION }"
        >
          Регистрация
        </span>
      </div>
      <Login v-if="modal === MODAL.LOGIN" />
      <Registration v-if="modal === MODAL.REGISTRATION" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Registration from './Registration.vue';
import Login from './Login.vue';
import { MODAL } from '../../utils/constants';

export default {
  name: 'AuthModal',
  components: { Registration, Login },
  computed: mapState({
    modal: (state) => state.app.modal,
    isModalOpen() {
      return this.modal === MODAL.REGISTRATION || this.modal === MODAL.LOGIN;
    },
  }),
  data() {
    return { MODAL };
  },
  methods: {
    setModal(modalName) {
      this.$store.dispatch('app/setModal', modalName);
    },
  },
};
</script>

<style lang="scss">
$green: #42b983;

.auth-modal {
  width: 700px;
  height: 550px;
  position: relative;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
  line-height: 1.2;

  &__background-image {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;

    &.mobile {
      display: none;
    }
  }

  &__header {
    display: flex;
    padding: 4px 16px;
    justify-content: center;

    &__title {
      display: flex;
      padding: 4px 0px;
      margin: 8px;
      font-size: 18px;
      color: white;
      cursor: pointer;

      &.selected {
        border-bottom: 2px solid $green;
      }
    }

    &__close-icon {
      position: absolute;
      width: 32px;
      height: 32px;
      right: 16px;
      top: 12px;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;

    &__background-image {
      display: none;

      &.mobile {
        display: flex;
      }
    }
  }
}
</style>
