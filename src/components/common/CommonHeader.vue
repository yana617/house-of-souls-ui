<template>
  <div class="header">
    <Dropdown v-if="$matchMedia.tablet" :items="headerLinks" :selected="selected" />
    <div class="header__nav-menu">
      <router-link v-if="hasPermissions('VIEW_USERS')" to="/volunteers">
        Волонтеры
      </router-link>
      <router-link class="header__nav-menu__right-btn" to="/animals">
        Животные
      </router-link>
      <router-link v-if="hasPermissions('VIEW_PROFILE')" class="header__nav-menu__right-btn" to="/schedule">
        График
      </router-link>
      <router-link v-if="hasPermissions('VIEW_PROFILE')" class="header__nav-menu__right-btn" to="/profile">
        Профиль
      </router-link>
      <router-link v-if="hasPermissions('VIEW_RATING')" class="header__nav-menu__right-btn" to="/rating">
        Рейтинг
      </router-link>
      <!-- <router-link v-if="hasPermissions('VIEW_ANIMALS')" class="header__nav-menu__right-btn" to="/map">
        Карта
      </router-link> -->
    </div>
    <div v-if="hasPermissions('VIEW_PROFILE') || isSchedulePath" class="header__auth">
      <CommonButton
        v-if="permissionsLoaded && !hasPermissions('VIEW_PROFILE')"
        title="Вход"
        class="header__auth__login-btn"
        @click="setModal(MODAL.LOGIN)"
      />
      <CommonButton
        v-if="permissionsLoaded && !hasPermissions('VIEW_PROFILE')"
        class="header__auth__register-btn"
        title="Регистрация"
        @click="setModal(MODAL.REGISTRATION)"
      />
      <CommonButton
        v-if="hasAdminPermissions()"
        class="header__auth__admin-btn"
        title="Админка"
        @click="$router.push('/admin/volunteers-requests')"
      />
      <CommonButton
        v-if="hasPermissions('VIEW_PROFILE')"
        class="header__auth__logout-btn"
        title="Выход"
        @click="logout()"
      />
      <AuthModal />
    </div>
  </div>
  <router-view />
</template>

<script>
import { mapState } from 'vuex';

import { clearStorage } from '@/utils/sessionStorage';
import CommonButton from '@/components/common/CommonButton.vue';
import { MODAL } from '@/utils/constants';
import { PATHS, HEADER_LINKS, ADMIN_LINKS } from '@/router/constants';
import Dropdown from './Dropdown.vue';
import AuthModal from '../header-component/AuthModal.vue';

export default {
  name: 'CommonHeader',
  components: {
    CommonButton,
    Dropdown,
    AuthModal,
  },
  data() {
    return {
      MODAL,
    };
  },
  computed: mapState({
    user: (state) => state.auth.user,
    path() {
      return this.$route.path;
    },
    selected() {
      return PATHS[this.path] || null;
    },
    headerLinks() {
      if (this.user) {
        return [...HEADER_LINKS, ...ADMIN_LINKS];
      }
      return HEADER_LINKS;
    },
    permissions: (state) => state.permissions.my,
    permissionsLoaded: (state) => state.permissions.loaded,
    isSchedulePath() {
      return this.$route.path === '/schedule';
    },
  }),
  methods: {
    setModal(modalName) {
      this.$store.dispatch('app/setModal', modalName);
    },
    logout() {
      clearStorage();
      this.$store.dispatch('users/clearUser');
      this.$store.dispatch('permissions/resetPermissions');
      this.$store.dispatch('notices/getNotices');
      this.$router.push('/');
    },
    hasPermissions(permission) {
      return this.permissions.includes(permission);
    },
    hasAdminPermissions() {
      const adminPermissions = [
        'CREATE_NOTICE',
        'EDIT_NOTICE',
        'DELETE_NOTICE',
        'CREATE_ADDITIONAL_FIELD_TEMPLATE',
        'EDIT_ADDITIONAL_FIELD_TEMPLATE',
        'DELETE_ADDITIONAL_FIELD_TEMPLATE',
      ];
      return adminPermissions.some((permission) => this.permissions.includes(permission));
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
  padding: 0 30px;
  position: fixed;
  background-color: $header-color;
  width: 100%;
  top: 0;
  height: 50px;

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
    &__right-btn {
      margin-left: 16px;
    }
  }

  &__auth {
    position: absolute;
    right: 30px;

    &__register-btn,
    &__logout-btn {
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
    padding: 0 12px;

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
  }

  @media (max-width: 330px) {
    padding: 8px;
  }
}
</style>
