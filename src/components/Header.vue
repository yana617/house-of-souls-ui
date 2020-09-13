<template>
<div class="header">
  <Dropdown class="header__dropdown" :items="links" :selected="selected" />
  <div class="header__nav-menu">
    <router-link to="/volunteers">Волонтеры</router-link>
    <router-link class="header__nav-menu__schedule-btn" to="/">График</router-link>
  </div>
  <div class="header__auth">
    <Button title="Вход" />
    <Button class="header__auth__register-btn" title="Регистрация" />
    <!-- ADD LOGIC <Button @click="$router.push('profile')" title="Профиль" />
    <Button @click="$router.push('admin')" class="header__auth__admin-btn" title="Админка" />-->
  </div>
</div>
<router-view />
</template>

<script>
import Button from './Button.vue';
import Dropdown from './Dropdown.vue';

const paths = {
  '/': 'schedule',
  '/volunteers': 'volunteers',
};

const LINKS = [{
  url: '/volunteers',
  label: 'Волонтеры',
  slug: 'volunteers',
}, {
  url: '/',
  label: 'График',
  slug: 'schedule',
}];

export default {
  name: 'Header',
  components: {
    Button,
    Dropdown,
  },
  data() {
    return {
      links: LINKS,
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
    selected() {
      return paths[this.path] || null;
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
