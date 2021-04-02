<template>
  <div class="header">
    <Dropdown class="header__dropdown" :items="headerLinks" :selected="selected" />
    <div class="header__nav-menu">
      <router-link to="/volunteers">Волонтеры</router-link>
      <router-link class="header__nav-menu__schedule-btn" to="/">График</router-link>
    </div>
    <div class="header__auth">
      <Button v-if="!user" @click="setModal(MODAL.LOGIN)" title="Вход" />
      <Button
        v-if="!user"
        @click="setModal(MODAL.REGISTRATION)"
        class="header__auth__register-btn"
        title="Регистрация"
      />
      <Button v-if="user" @click="$router.push('/profile')" title="Профиль" />
      <Button
        v-if="user"
        @click="$router.push('/admin/volunteers-requests')"
        class="header__auth__admin-btn"
        title="Админка"
      />
      <AuthModal />
    </div>
  </div>
  <router-view />
</template>

<script>
import Button from './Button.vue';
import Dropdown from './Dropdown.vue';
import AuthModal from '../header-component/AuthModal.vue';
import { PATHS, HEADER_LINKS, ADMIN_LINKS } from '../../router/constants';
import { MODAL } from '../../utils/constants';

export default {
  name: 'Header',
  components: {
    Button,
    Dropdown,
    AuthModal,
  },
  data() {
    return {
      MODAL,
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
    selected() {
      return PATHS[this.path] || null;
    },
    user() {
      return this.$store.state.users.user;
    },
    headerLinks() {
      if (this.user) {
        return [...HEADER_LINKS, ...ADMIN_LINKS];
      }
      return HEADER_LINKS;
    },
  },
  methods: {
    setModal(modalName) {
      this.$store.dispatch('app/setModal', modalName);
    },
  },
};
</script>

<style scoped lang="scss">
$green: #42b983;
$header-color: #1d1d1f;

.header {
  display: flex;
  z-index: 5;
  align-items: center;
  justify-content: center;
  padding: 16px 30px;
  position: fixed;
  background-color: $header-color;
  width: 100%;
  top: 0;
  height: 50px;

  &__dropdown {
    display: none;
  }

  a {
    font-size: 15px;
    font-weight: 400;
    letter-spacing: -0.01em;
    font-family: 'SF Pro Text', 'Myriad Set Pro', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    color: #f5f5f7;
    text-decoration: none;

    &.router-link-exact-active {
      color: $green;
    }
  }

  &__nav-menu {
    &__schedule-btn {
      margin-left: 16px;
    }
  }

  &__auth {
    position: absolute;
    right: 30px;

    &__register-btn {
      margin-left: 8px;
    }

    &__admin-btn {
      margin-left: 8px;
      color: $green;
      border: 1px solid $green;

      &:hover {
        background-color: $green;
      }
    }
  }

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 8px 12px;

    &__auth {
      position: relative;
      right: unset;

      &__admin-btn {
        display: none;
      }
    }

    &__nav-menu {
      display: none;
    }
    &__dropdown {
      display: flex;
    }
  }

  @media (max-width: 330px) {
    padding: 8px;
  }
}
</style>
