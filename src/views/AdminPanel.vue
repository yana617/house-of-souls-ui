<template>
  <div class="admin">
    <div class="admin__dropdown-container">
      <Dropdown class="admin__dropdown" :items="links" :selected="selected" />
    </div>
    <div class="admin__nav-panel">
      <span class="admin__nav-panel__title">Управление</span>
      <router-link v-for="link in links" :key="link.slug" class="admin__nav-panel__link" :to="link.url">
        {{ link.label }}
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Dropdown from '@/components/common/Dropdown.vue';
import { ADMIN_LINKS, PATHS } from '@/router/constants';

export default {
  name: 'AdminPanel',
  components: { Dropdown },
  data() {
    return {
      links: ADMIN_LINKS,
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
    selected() {
      return PATHS[this.path] || null;
    },
  },
};
</script>

<style lang="scss" scoped>
$headerHeight: 50px;
$lightGrey: #ccc;
$greyBlue: #2c3e50;

.router-link-active {
  color: white !important;
  background-color: #233241;
}

.admin {
  display: flex;
  flex-direction: row;
  padding-left: 260px;

  &__nav-panel {
    display: flex;
    flex-direction: column;
    width: 260px;
    min-width: 260px;
    margin-left: -260px;
    height: calc(100vh - #{$headerHeight});
    border-right: 1px solid $lightGrey;
    background-color: #20242a;
    padding-top: 16px;
    position: fixed;

    &__title {
      color: white;
      font-weight: bold;
      padding-bottom: 12px;
      font-size: 18px;
    }

    &__link {
      display: flex;
      color: rgba(200, 200, 200, 0.7);
      font-size: 14px;
      padding: 12px 16px;
      text-decoration: none;

      &:hover {
        color: $lightGrey;
      }
    }
  }

  &__dropdown-container {
    display: none;
  }

  @media (max-width: 800px) {
    flex-direction: column;
    padding-left: 0px;

    &__nav-panel {
      display: none;
    }

    &__dropdown-container {
      display: flex;
      background-color: $greyBlue;
      width: 100%;
      padding: 8px;
      align-items: center;
      justify-content: center;
    }

    &__dropdown {
      width: fit-content;
      min-width: 300px;
    }
  }
  @media (max-width: 450px) {
    &__dropdown {
      min-width: 210px;
      margin-left: 90px;
    }
  }
}
</style>
