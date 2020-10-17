<template>
<div class="header">
  <Dropdown class="header__dropdown" :items="links" :selected="selected" />
  <div class="header__nav-menu">
    <router-link to="/volunteers">Волонтеры</router-link>
    <router-link class="header__nav-menu__schedule-btn" to="/">График</router-link>
  </div>
  <div class="header__auth">
    <Button v-if="!user" @click="setModal('login')" title="Вход" />
    <Button v-if="!user" @click="setModal('registration')" class="header__auth__register-btn" title="Регистрация" />
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
import AuthModal from './AuthModal.vue';
import { PATHS, HEADER_LINKS } from '../router/constants';

export default {
  name: 'Header',
  components: {
    Button,
    Dropdown,
    AuthModal,
  },
  data() {
    return {
      links: HEADER_LINKS,
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
$header-color: #1D1D1F;

.header {
  display: flex;
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
    letter-spacing: -.01em;
    font-family: "SF Pro Text","Myriad Set Pro","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
    color: #f5f5f7;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
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

  @media (max-width: 700px) {
    justify-content: space-between;
    padding: 8px 16px;

    &__auth {
      position: relative;
      right: unset;
    }
  }

  @media (max-width: 450px) {
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
